<template>
    <el-container class="container">
        <el-main class="shop-list">
            <div v-if="shopList.length">
                <div v-infinite-scroll="load">
                    <el-card v-for="(item, index) in shopList" :key="index" class="shop-card" :body-style="{ padding: '0px' }">
                        <div class="shop-item">
                            <img :src="item.pic1" class="shop-item-img">
                            <div class="shop-item-desc">
                                <div class="shop-item-desc-name" @click="toDetail">{{item.name}}</div>
                            </div>
                            <div class="shop-item-inputnumber">
                                <div>购买数量：{{item.number}}</div>
                            </div>
                            <div class="shop-item-date">
                                <div>购买时间</div>
                                <div>{{item.date}}</div>
                            </div>
                        </div>
                    </el-card>
                </div>
            </div>
            <div v-else>
                <h1>无已购买商品</h1>
            </div>
        </el-main>
    </el-container>
</template>

<script>
import {imagePrefix} from '../../../../config/index'
const { ipcRenderer } = require("electron")
export default {
    data() {
        return {
            shopList: []
        }
    },
    async created() {
        let res = await this.$api.GET_PURCHASE_TRACE()
        if (res.code == 200) {
            this.shopList = res.list
            this.shopList.forEach(item => {
                item.pic1 = imagePrefix + item.pic1
            })
        }
    },
    methods: {
        load(){
            
        },
        toDetail(com_id) {
            ipcRenderer.send("add-product-window", com_id)
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