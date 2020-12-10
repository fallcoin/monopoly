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
                            <div class="shop-item-inputnumber">
                                <div>购买数量：{{item.number}}</div>
                            </div>
                            <div class="shop-item-date">
                                <div>购买时间</div>
                                <div>{{item.date}}</div>
                            </div>
                            <el-popover
                                placement="left"
                                width="300"
                                trigger="click">
                            <div>
                                <el-form
                                    label-position="right"
                                    label-width="80px"
                                    :model="item.customerInfo"
                                    class="form"
                                    :disabled="true"
                                    v-loading="loading"
                                >
                                    <el-form-item label="用户名" prop="username">
                                        <el-input v-model="customerInfo.username"></el-input>
                                    </el-form-item>
                                    <el-form-item label="电话" prop="phone">
                                        <el-input v-model="customerInfo.phone"></el-input>
                                    </el-form-item>
                                    <el-form-item label="年级" prop="grade">
                                        <el-input v-model="customerInfo.grade"></el-input>
                                    </el-form-item>
                                    <el-form-item label="学院" prop="academy">
                                        <el-input v-model="customerInfo.academy"></el-input>
                                    </el-form-item>
                                    <el-form-item label="性别" prop="sex">
                                        <el-radio
                                            v-model="customerInfo.sex"
                                            label="male"
                                            >男</el-radio
                                        >
                                        <el-radio
                                            v-model="customerInfo.sex"
                                            label="female"
                                            >女</el-radio
                                        >
                                    </el-form-item>
                                </el-form>
                            </div>
                            <el-button type="primary" slot="reference" icon="el-icon-user-solid" @click="showInfo(item.stu_id)" circle></el-button>
                        </el-popover>
                        </div>
                    </el-card>
                </div>
            </div>
            <div v-else>
                <h1>无已售出商品</h1>
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
            shopList: [],
            customerInfo: {
                academy: '',
                sex: '',
                grade: '',
                phone: '',
                username: ''
            },
            loading: true
        }
    },
    async created() {
        let res = await this.$api.GET_ORDER()
        console.log(res);
        if (res.code == 200) {
            this.shopList = res.List
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
        },
        async showInfo(id) {
            let res = await this.$api.GET_SELLER_INFO({
                sellerid: id
            })
            console.log(res);
            this.customerInfo = res.sellerInfo
            this.loading = false
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