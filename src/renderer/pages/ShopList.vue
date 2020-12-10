<template>
    <div class="content">
        <div v-if="shopList.length">
            <el-card
                v-for="item in shopList"
                :key="item.com_id"
                class="shop-card"
                :body-style="{ padding: '0px' }"
            >
                <div class="shop-item">
                    <img
                        :src="item.pic1"
                        class="shop-item-img"
                    />
                    <div class="shop-item-desc">
                        <div class="shop-item-desc-name" @click="toDetail(item.com_id)">{{ item.name }}</div>
                    </div>
                    <div class="shop-item-price">
                        <div>￥{{ item.price }}</div>
                    </div>
                    <div class="shop-item-operate">
                        <el-button type="text" @click="addToStarList(item.com_id)">移入收藏夹</el-button>
                        <el-button type="text" @click="addToCart(item.com_id)">加入购物车</el-button>
                    </div>
                </div>
            </el-card>
        </div>
        <div v-else>
            <h1>无任何内容</h1>
        </div>
    </div>
</template>

<script>
import { getQueryVariable, readFile, writeFile } from '../utils/util'
import { imagePrefix } from '../config/index'
const { resolve } = require('path')
const { ipcRenderer } = require('electron')
export default {
    data() {
        return {
            shopList: []
        }
    },
    async created() {
        let keyword = getQueryVariable('keyword');
        let res = await this.$api.GET_SHOP_LIST_BY_KEYWORD({keyword});
        if (res.code == 200) {
            this.shopList = res.list
            this.shopList.forEach(item => {
                item.pic1 = imagePrefix + item.pic1
            })
        } else if (res.code == 201) {
            this.$message({
                type: 'success',
                message: '无任何内容'
            })
        }
    },
    methods: {
        toDetail(com_id) {
            ipcRenderer.send("add-product-window", com_id)
        },
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
            this.$message({
                type: 'success',
                message: '添加成功'
            })
        },
    }
}
</script>

<style scoped>
.shop-card {
    margin-top: 5px;
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
}
.shop-item-desc-name:hover{
    text-decoration: underline;
    cursor: pointer;
}
.shop-item-operate {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
}
.shop-item-operate .el-button {
    margin: 0;
}
</style>
