<template>
    <el-container class="container">
        <el-main class="shop-list">
            <div v-if="shopList.length">
                <div v-infinite-scroll="load">
                    <el-card v-for="item in shopList" :key="item.com_id" class="shop-card" :body-style="{ padding: '0px' }">
                        <div class="shop-item">
                            <img :src="item.pic1" class="shop-item-img">
                            <div class="shop-item-desc">
                                <div class="shop-item-desc-name" @click="toDetail(item.com_id)">{{item.name}}</div>
                            </div>
                            <div class="shop-item-price">
                                <div>￥{{item.price}}</div>
                            </div>
                            <div class="shop-item-inputnumber">
                                <el-input-number v-model="item.num" :max="10" size="mini"></el-input-number>
                            </div>
                            <div class="shop-item-operate">
                                <el-button type="text" @click="addToStarList(item.com_id)">移入收藏夹</el-button>
                                <el-button type="text" @click="delItem(item.com_id)">删除</el-button>
                            </div>
                            <el-checkbox v-model="item.checked" @change="calculate(item.checked, item.price, item.num)"></el-checkbox>
                        </div>
                    </el-card>
                </div>
            </div>
            <div v-else>
                <h1>购物车无商品</h1>
            </div>
        </el-main>
        <el-footer>
            <el-card>
                <div class="footer-card">
                    <div>
                        <div>
                            <span>全选</span>
                            <el-checkbox  v-model="chooseAll"></el-checkbox>
                        </div>
                        <div>总价： <span class="count">{{count}}</span> 元</div>
                    </div>
                    <div>
                        <el-button type="primary" @click="purchase">结算</el-button>
                        <el-button type="danger" @click="delSelected">删除</el-button>
                    </div>
                </div>
            </el-card>
        </el-footer>
    </el-container>
</template>

<script>
const {resolve} = require('path')
const { ipcRenderer } = require("electron")
import {imagePrefix} from '../../../../config/index'
import {readFile, writeFile} from '../../../../utils/util'
export default {
    data() {
        return {
            shopList: [],
            chooseAll: false,
            count: 0
        }
    },
    async created() {
        let shopIdList = await readFile(resolve(__dirname, '../../../../assets/cache/cart.js'))
        shopIdList = shopIdList && JSON.parse(shopIdList) || []
        let res = await this.$api.GET_PRODUCT_BY_ID({
            isList: shopIdList
        })
        if (res.code == 200) {
            this.shopList = res.list
            this.shopList.forEach(item => {
                item.pic1 = imagePrefix + item.pic1
                item.num = 1
            })
        }
    },
    methods: {
        load() {
            
        },
        toDetail(com_id) {
            ipcRenderer.send("add-product-window", com_id)
        },
        async delItem(id) {
            let filePath = resolve(__dirname, "../../../../assets/cache/cart.js")
            let trace = await readFile(filePath)
            trace = JSON.parse(trace)
            trace.splice(trace.findIndex(item => item == id), 1)
            await writeFile(filePath, JSON.stringify(trace))
            this.shopList.splice(this.shopList.findIndex(item => item.com_id == id), 1)
            this.$message({
                type: 'success',
                message: '删除成功'
            })
        },
        async purchase() {
            let selectedProducts = this.shopList.filter(item => item.checked == true)
            let shopList = []
            selectedProducts.forEach(item => {
                shopList.push({
                    number: item.num,
                    com_id: item.com_id
                })
            })
            let res = await this.$api.PURCHASE({shopList})
            if (res.code == "200") {
                this.$message({
                    type: 'success',
                    message: '购买成功'
                })
                for (let i = 0; i < res.successid.length; i++) {
                    this.shopList.splice(this.shopList.findIndex(item => item.com_id == res.successid[i]), 1)
                }
            }
        },
        async delSelected() {
            let filePath = resolve(__dirname, "../../../../assets/cache/cart.js")
            let cart = await readFile(filePath)
            cart = JSON.parse(cart)
            
            let delList = this.shopList.filter(item => item.checked == true)
            cart = cart.filter(id => {
                let index = delList.findIndex(delItem => delItem.com_id == id)
                return index == -1
            })
            for (let i = 0; i < delList.length; i++) {
                this.shopList.splice(this.shopList.findIndex(item => item.com_id == delList[i].com_id), 1)
            }
            await writeFile(filePath, JSON.stringify(cart))
            this.$message({
                type: 'success',
                message: '删除成功'
            })
        },
        calculate(f, v, n) {
            this.count += f ? n * v : n * -v
        },
        async delItem(id) {
            let filePath = resolve(__dirname, "../../../../assets/cache/cart.js")
            let cart = await readFile(filePath)
            cart = JSON.parse(cart)
            cart.splice(cart.findIndex(item => item == id), 1)
            await writeFile(filePath, JSON.stringify(cart))
            this.shopList.splice(this.shopList.findIndex(item => item.com_id == id), 1)
            this.$message({
                type: 'success',
                message: '删除成功'
            })
        },
        async addToStarList(id) {
            let res = await this.$api.ADD_TO_STARLIST({com_id: id})
            if (res.code == 200) {
                this.$message({
                    type: 'success',
                    message: '添加成功'
                })
                this.productInfo.isStar = true
            } else if (res.code == 300){
                this.$message.error('商品已存在于收藏夹内')
            } else {
                this.$message.error('添加失败')
            }
        }
    },
    watch: {
        chooseAll(checked) {
            if (checked) {
                this.shopList.forEach(item => {
                    item.checked = true
                })
                this.count = this.shopList.reduce((total, item) => {
                    return total += item.price * item.num
                }, 0)
            } else {
                this.shopList.forEach(item => {
                    item.checked = false
                })
                this.count = 0
            }
        }
    }
}
</script>

<style scoped>
.shop-list {
    /* margin-top: 10px; */
    padding-top: 0;
    overflow: auto;
    height: 430px;
}
.shop-list::-webkit-scrollbar {
    display:none
}
.shop-card {
    margin-bottom: 5px;
}
.shop-item {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100px;
}
.shop-item-img {
    width: 100px;
    height: 100px;
}
.shop-item-desc {
    width: 100px;
    height: 100px;
}
.shop-item-desc-name {
    margin-top: 10px;
    font-size: 1.1em;
    font-weight: 700;
    cursor: pointer;
}
.shop-item-desc-name:hover {
    text-decoration: underline;
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
    display: flex;
    height: 30px;
    justify-content: space-between;
    align-items: center;
}
.count {
    color: red;
}
</style>