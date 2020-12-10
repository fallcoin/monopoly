<template>
    <div>
        <div class="commodity-head">
            <div class="commodity-head-exhibit">
                <img
                    class="commodity-head-img-exhibit"
                    :src="activeImg.url"
                />
                <div class="commodity-head-imglist">
                    <img
                        :class="
                            item == activeImg.url
                                ? 'commodity-head-img-active'
                                : 'commodity-head-img'
                        "
                        v-for="item in productInfo.picture"
                        :key="item"
                        :src="item"
                        @click="toggles(item)"
                    />
                </div>
            </div>
            <div class="commodity-head-info">
                <h3 class="commodity-head-info-title">{{ productInfo.name }}</h3>
                <div class="commodity-head-info-param">
                    <span
                        >价格： ￥<span
                            class="commodity-head-info-param-price"
                            >{{ productInfo.price }}</span
                        ></span
                    >
                    <el-input-number
                        v-model="buy.number"
                        :min="1"
                        :max="productInfo.number"
                        size="mini"
                        class="commodity-head-info-param-select"
                    ></el-input-number>
                    <div class="commodity-head-info-param-remain">剩余 {{productInfo.number}} 件</div>
                </div>
                <div class="commodity-head-info-btns">
                    <el-button type="primary" @click="purchase">购买</el-button>
                    <el-button type="primary" plain @click="addToCart">加入购物车</el-button>
                </div>
            </div>
        </div>
        <el-card class="commodity-main">
            <div class="content-head">
                <div class="content-head-info">
                    <el-avatar :size="50" :src="sellerInfo.selleravatar"></el-avatar>
                    <div class="content-head-info-name">{{sellerInfo.sellerName}}</div>
                </div>
                <div>
                    <el-popover
                        placement="left"
                        width="300"
                        trigger="click">
                        <div>
                            <el-form
                                v-loading="loading"
                                label-position="right"
                                label-width="80px"
                                :model="sellerInfo"
                                class="form"
                                :disabled="true"
                            >
                                <el-form-item label="用户名" prop="name">
                                    <el-input v-model="sellerInfo.sellerName"></el-input>
                                </el-form-item>
                                <el-form-item label="电话" prop="phone">
                                    <el-input v-model="sellerInfo.phone"></el-input>
                                </el-form-item>
                                <el-form-item label="年级" prop="grade">
                                    <el-input v-model="sellerInfo.grade"></el-input>
                                </el-form-item>
                                <el-form-item label="学院" prop="academy">
                                    <el-input v-model="sellerInfo.academy"></el-input>
                                </el-form-item>
                                <el-form-item label="性别" prop="sex">
                                    <el-radio
                                        v-model="sellerInfo.sex"
                                        label="male"
                                        >男</el-radio
                                    >
                                    <el-radio
                                        v-model="sellerInfo.sex"
                                        label="female"
                                        >女</el-radio
                                    >
                                </el-form-item>
                            </el-form>
                        </div>
                        <el-button type="primary" slot="reference" icon="el-icon-user-solid" @click="showInfo" circle></el-button>
                    </el-popover>
                    <el-button  slot="reference" :icon="productInfo.isStar == true ? 'el-icon-star-on' :'el-icon-plus'" @click="changeStar" circle></el-button>
                </div>
            </div>
            <hr>
            <div v-html="productInfo.descrpit"></div>
        </el-card>
    </div>
</template>

<script>
import { getQueryVariable, readFile, writeFile } from '../utils/util'
import { imagePrefix } from '../config/index'
const { resolve } = require('path')
export default {
    data() {
        return {
            activeImg: {
                num: 0,
                url: "",
            },
            productInfo: {
                com_id: '',
                name: '',
                price: 0,
                number: 0,
                picture: [],
                descrpit: '',
                isStar: ''
            },
            sellerInfo: {
                sellerid: '',
                sellerName: '',
                selleravatar: '',
                academy: '',
                sex: '',
                grade: '',
                phone: ''
            },
            buy: {
                number: 0
            },
            loading: true
        }
    },
    async created() {
        // 添加浏览记录
        let com_id = getQueryVariable('com_id')
        let filePath = resolve(__dirname, "../assets/cache/trace.js")
        let trace = await readFile(filePath)
        trace = trace && JSON.parse(trace) || []
        let index = trace.findIndex(item => item == com_id)
        index != -1 && trace.splice(index, 1)
        trace.unshift(com_id)
        await writeFile(filePath, JSON.stringify(trace))

        // 获取商品信息
        let res = await this.$api.GET_PRODUCT_DETAIL({com_id})
        if (res.code != 200) {
            this.$message.error("找不到内容")
            return
        }

        this.productInfo = res.productInfo
        this.productInfo.isStar = res.productInfo.isStar == 'true'
        this.productInfo.picture = this.productInfo.picture.map(item => imagePrefix + item)
        this.sellerInfo = res.sellerInfo
        this.sellerInfo.selleravatar = imagePrefix + this.sellerInfo.selleravatar

        // 展示
        this.activeImg.url = this.productInfo.picture[0]
        setInterval(() => {
            this.activeImg.url = this.productInfo.picture[this.activeImg.num % this.productInfo.picture.length]
            this.activeImg.num++
        }, 4000)
    },
    methods: {
        toggles(imgUrl) {
            this.productInfo.picture.map((item, index) => {
                if (item == imgUrl) {
                    this.activeImg.url = imgUrl
                    this.activeImg.num = index
                }
            })
        },
        async showInfo() {
            let res = await this.$api.GET_SELLER_INFO({
                sellerid: this.sellerInfo.sellerid
            })
            this.sellerInfo.sex = res.sellerInfo.sex
            this.sellerInfo.grade = res.sellerInfo.grade
            this.sellerInfo.academy = res.sellerInfo.academy
            this.sellerInfo.phone = res.sellerInfo.phone
            this.loading = false
        },
        async addToCart() {
            let filePath = resolve(__dirname, "../assets/cache/cart.js")
            let cartList = await readFile(filePath)
            cartList = cartList && JSON.parse(cartList) || []
            let index = cartList.findIndex(item => item == this.productInfo.com_id)
            if (index != -1) {
                this.$message.error("该商品已经存在于您的购物车内")
                return
            }
            cartList.push(this.productInfo.com_id)
            await writeFile(filePath, JSON.stringify(cartList))
        },
        async purchase() {
            let res = await this.$api.PURCHASE({
                shopList: [
                    {
                        com_id: this.productInfo.com_id,
                        number: this.buy.number
                    }
                ]
            })
            if (res.code == 200) {
                this.$message({
                    type: 'success',
                    message: '购买成功'
                })
            } else {
                this.$message.error('购买失败')
            }
        },
        async changeStar() {
            let res
            if (this.productInfo.isStar == true) {
                res = await this.$api.DEL_FROM_STARLIST({com_id: this.productInfo.com_id})
                if (res.code == 200) {
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    })
                    this.productInfo.isStar = false
                } else {
                    this.$message.error('删除失败')
                }
            } else {
                res = await this.$api.ADD_TO_STARLIST({com_id: this.productInfo.com_id})
                if (res.code == 200) {
                    this.$message({
                        type: 'success',
                        message: '添加成功'
                    })
                    this.productInfo.isStar = true
                } else {
                    this.$message.error('添加失败')
                }
            }
        }
    },
}
</script>

<style scoped>
.commodity-head {
    display: flex;
    justify-content: space-between;
    margin: 30px;
}
.commodity-head-exhibit {
    display: flex;
}
.commodity-head-img-exhibit {
    width: 230px;
    height: 180px;
}
.commodity-head-imglist {
    border: 2px solid #95a5a6;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: scroll;
    height: 180px;
    margin-left: 10px;
}
.commodity-head-imglist::-webkit-scrollbar {
    display: none;
}
.commodity-head-imglist > img {
    height: 50px;
    width: 50px;
    cursor: pointer;
}
.commodity-head-img {
    border: 3px solid #fff;
}
.commodity-head-img-active {
    border: 3px solid #00a8ff;
}
.commodity-head-info {
    display: flex;
    flex-direction: column;
    margin-left: 30px;
}
.commodity-head-info-param {
    display: flex;
    flex-direction: column;
    justify-content: left;
}
.commodity-head-info-param-price {
    color: red;
}
.commodity-head-info-param-select {
    margin-top: 5px;
}
.commodity-head-info-param-remain {
    margin-top: 10px;
}
.commodity-head-info-btns {
    display: flex;
    margin-top: 10px;
}
.commodity-main {
    margin-top: 20px;
    margin-left: 30px;
    margin-right: 30px;
    min-height: 60vh;
}
.content-head {
    display: flex;
    justify-content: space-between;
}
.content-head-info {
    display: flex;
}
.content-head-info-name {
    margin-left: 20px;
    display: flex;
    align-items: center;
    font-size: 2em;
}
</style>
