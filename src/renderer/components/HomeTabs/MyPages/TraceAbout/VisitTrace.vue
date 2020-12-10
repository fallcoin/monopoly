<template>
    <el-container class="container">
        <el-main class="shop-list">
            <el-card
                v-for="item in shopList"
                :key="item.com_id"
                class="shop-card"
                :body-style="{ padding: '0px' }"
            >
                <div class="shop-item">
                    <div>
                        <img
                            :src="item.pic1"
                            class="shop-item-img"
                        />
                    </div>
                    <div class="shop-item-desc" @click="toDetail(item.com_id)">
                        <div class="shop-item-desc-name">{{ item.name }}</div>
                    </div>
                    <div class="shop-item-price">
                        <div>￥{{ item.price }}</div>
                    </div>
                    <div class="shop-item-operate">
                        <el-button type="text" @click="addToStarList(item.com_id)">加入收藏夹</el-button>
                        <el-button type="text" @click="addToCart(item.com_id)">加入购物车</el-button>
                        <el-button type="text" @click="delItem(item.com_id)">删除</el-button>
                    </div>
                    <div>
                        <el-checkbox v-model="item.checked"></el-checkbox>
                    </div>
                </div>
            </el-card>
        </el-main>
        <el-footer>
            <el-card>
                <div class="footer-card">
                    <div>
                        <span>全选</span>
                        <el-checkbox v-model="chooseAll"></el-checkbox>
                    </div>
                    <el-button type="danger" @click="delSelected">删除</el-button>
                </div>
            </el-card>
        </el-footer>
    </el-container>
</template>

<script>
import { readFile, writeFile } from '../../../../utils/util'
import {imagePrefix} from '../../../../config/index'
const { ipcRenderer } = require("electron")
const { resolve } = require('path')
export default {
    data() {
        return {
            shopList: [],
            chooseAll: false,
        }
    },
    async created() {
        let trace = await readFile(resolve(__dirname, '../../../../assets/cache/trace.js'))
        trace = trace && JSON.parse(trace) || []

        let res = await this.$api.GET_PRODUCT_BY_ID({
            isList: trace
        })

        if (res.code == 200) {
            this.shopList = res.list
            this.shopList.forEach(item => {
                item.pic1 = imagePrefix + item.pic1
            })
        }

    },
    methods: {
        async addToStarList(id) {
            let res = await this.$api.ADD_TO_STARLIST({com_id: id})
            if (res.code == 200) {
                this.$message({
                    type: 'success',
                    message: '添加成功'
                })
            } else if (res.code == 300){
                this.$message.error('商品已存在于收藏夹内')
            } else {
                this.$message.error('添加失败')
            }
        },
        async addToCart(id) {
            let filePath = resolve(__dirname, "../../../../assets/cache/cart.js")
            let cartList = await readFile(filePath)
            cartList = cartList && JSON.parse(cartList) || []
            let index = cartList.findIndex(item => item == id)
            if (index != -1) {
                this.$message.error("该商品已经存在于您的购物车内")
                return
            }
            cartList.push(id)
            await writeFile(filePath, JSON.stringify(cartList))
            this.$message({
                type: 'success',
                message: '添加成功'
            })
        },
        async delItem(id) {
            let filePath = resolve(__dirname, "../../../../assets/cache/trace.js")
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
        async delSelected() {
            let filePath = resolve(__dirname, "../../../../assets/cache/trace.js")
            let trace = await readFile(filePath)
            trace = JSON.parse(trace)
            
            let delItem = this.shopList.filter(item => item.checked == true)
            trace = trace.filter(id => {
                let index = delItem.findIndex(delItem => delItem.com_id == id)
                return index == -1
            })
            await writeFile(filePath, JSON.stringify(trace))
            this.$message({
                type: 'success',
                message: '删除成功'
            })
            this.shopList = []
        },
        toDetail(com_id) {
            ipcRenderer.send("add-product-window", com_id)
        }
    },
    watch: {
        chooseAll(checked) {
            if (checked) {
                this.shopList.forEach((item) => {
                    item.checked = true
                })
            } else {
                this.shopList.forEach((item) => {
                    item.checked = false
                })
            }
        },
    },
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
    display: none;
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
.shop-item-desc {
    width: 100px;
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
    height: 20px;
}
.footer-card {
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
