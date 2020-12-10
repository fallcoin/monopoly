<template>
    <el-container class="container">
        <el-main class="shop-list">
            <div v-if="shopList.length">
                <div v-infinite-scroll="load">
                    <el-card v-for="(item, index) in shopList" :key="index" class="shop-card" :body-style="{ padding: '0px' }">
                        <div class="shop-item">
                            <img :src="item.pic1" class="shop-item-img">
                            <div class="shop-item-desc">
                                <div class="shop-item-desc-name" @click="toDetail(item.com_id)">{{item.name}}</div>
                            </div>
                            <div class="shop-item-price">
                                <div>￥{{item.price}}</div>
                            </div>
                            <div>
                                <div>剩余数量：{{item.number}}</div>
                            </div>
                            <div class="shop-item-date">
                                <div>发布时间</div>
                                <div>{{item.date}}</div>
                            </div>
                            <div class="shop-item-operate">
                                <el-button type="text" @click="delFromPublish(item.com_id)">取消发布</el-button>
                            </div>
                        </div>
                    </el-card>
                </div>
            </div>
            <div v-else>
                <h1>无已发布商品</h1>
            </div>
        </el-main>
    </el-container>
</template>

<script>
const { ipcRenderer } = require("electron")
import {imagePrefix} from "../../../../config/index" 
export default {
    data() {
        return {
            shopList: []
        }
    },
    async created() {
        let list = await this.getPublishList()
        this.shopList = this.shopList.concat(list)
    },
    methods: {
        async getPublishList() {
            let res = await this.$api.GET_PRODUCT_PUBLISH()
            if (res.code == 200) {
                res.list.forEach(item => item.pic1 = imagePrefix + item.pic1)
                return res.list
            }
        },
        load() {},
        toDetail(com_id) {
            ipcRenderer.send("add-product-window", com_id)
        },
        async delFromPublish(com_id) {
            let res = await this.$api.DEL_PRODUCT({com_id})
            if (res.code == 200) {
                this.shopList = await this.getPublishList()
                this.$message({
                    type: "success",
                    message: "删除成功"
                })
            } else {
                this.$message.error("删除失败")
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
    height: 500px;
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
.shop-item-date{
    display: flex;
    flex-direction: column;
}
.shop-item-date div {
    width: 100%;
    align-content: center;
}
.shop-item-operate {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.shop-item-operate .el-button {
    margin: 0;
}
</style>