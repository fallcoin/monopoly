<template>
    <el-container class="container">
        <el-main class="shop-list">
            <div v-if="shopList.length">
                <el-card v-for="item in shopList" :key="item.com_id" class="shop-card" :body-style="{ padding: '0px' }">
                    <div class="shop-item">
                        <div>
                            <img :src="item.pic1" class="shop-item-img">
                        </div>
                        <div class="shop-item-desc" @click="toDetail">
                            <div class="shop-item-desc-name">{{item.name}}</div>
                        </div>
                        <div class="shop-item-price">
                            <div>￥{{item.price}}</div>
                        </div>
                        <div class="shop-item-operate">
                            <el-button type="text" @click="addToCart(item.com_id)">加入购物车</el-button>
                            <el-button type="text" @click="delFromStarList(item.com_id)">删除</el-button>
                        </div>
                        <div>
                            <el-checkbox v-model="item.checked"></el-checkbox>
                        </div>
                    </div>
                </el-card>
            </div>
            <div v-else>
                <h1>无已收藏商品</h1>
            </div>
        </el-main>
        <el-footer>
            <el-card>
                <div class="footer-card">
                    <div>
                        <span>全选</span>
                        <el-checkbox v-model="chooseAll"></el-checkbox>
                    </div>
                    <el-button type="danger" @click="delSelectedFromStarList">删除</el-button>
                </div>
            </el-card>
        </el-footer>
    </el-container>
</template>

<script>
const { ipcRenderer } = require("electron")
import {imagePrefix} from '../../../../config/index'
export default {
    data() {
        return {
            shopList: [],
            chooseAll: false
        }
    },
    async created() {
        await this.getStarList()
    },
    watch: {
        chooseAll(checked) {
            if (checked) {
                this.shopList.forEach(item => {
                    item.checked = true
                })
            } else {
                this.shopList.forEach(item => {
                    item.checked = false
                })
            }
        }
    },
    methods: {
        async getStarList() {
            let res = await this.$api.GET_STARLIST()
            if (res.code == 200) {
                this.shopList = res.List
                this.shopList.forEach(item => {
                    item.pic1 = imagePrefix + item.pic1
                })
            }
        },
        async addToCart(id) {
            let filePath = resolve(__dirname, "../assets/cache/cart.js")
            let cartList = await readFile(filePath)
            cartList = cartList && JSON.parse(cartList) || []
            let index = cartList.findIndex(item => item == id)
            if (index != -1) {
                this.$message.error("该商品已经存在于您的购物车内")
                return
            }
            cartList.push(id)
            await writeFile(filePath, JSON.stringify(cartList))
        },
        toDetail(com_id) {
            ipcRenderer.send("add-product-window", com_id)
        },
        async delFromStarList(com_id) {
            let res = await this.$api.DEL_FROM_STARLIST({com_id})
            if (res.code == 200) {
                this.$message({
                    type: 'success',
                    message: '删除成功'
                })
                this.shopList.splice(this.shopList.findIndex(item => item.com_id == com_id), 1)
            } else {
                this.$message.error('删除失败')
            }
        },
        async delSelectedFromStarList() {
            let delItems = this.shopList.filter(item => item.checked == true)
            let queue = []
            for (let i = 0; i < delItems.length; i++) {
                queue.push(this.$api.DEL_FROM_STARLIST(delItems[i]))
            }
            let res = await Promise.all(queue)
            if (res.some(item => item.code == 200)) {
                    this.$message({
                    type: 'success',
                    message: '删除成功'
                })
                await this.getStarList()
            }
        }
    }
}
</script>

<style scoped>
.header-tab {
    display: flex;
}
.header-info {
    flex: 2;
    text-align: center;
}
.header-tab div:not(:first-child) {
    flex: 1;
    text-align: center;
}
.shop-list {
    padding-top: 0;
    height: 420px;
}
.shop-list::-webkit-scrollbar {
    display:none
}
.shop-card {
    margin-bottom: 5px;
}
.shop-item {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 100px;
}
.shop-item-img {
    width: 100px;
    height: 100px;
}
.shop-item-operate {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.shop-item-operate .el-button {
    margin: 0;
}
.footer-card {
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>