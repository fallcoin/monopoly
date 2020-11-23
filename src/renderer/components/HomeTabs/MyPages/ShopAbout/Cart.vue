<template>
    <el-container class="container">
        <el-main class="shop-list">
            <div v-infinite-scroll="load">
                <el-card v-for="(item, index) in shopList" :key="index" class="shop-card" :body-style="{ padding: '0px' }">
                    <div class="shop-item">
                        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="shop-item-img">
                        <div class="shop-item-desc">
                            <div class="shop-item-desc-name" @click="toDetail">{{item.name}}</div>
                        </div>
                        <div class="shop-item-price">
                            <div>￥{{item.price}}</div>
                        </div>
                        <div class="shop-item-inputnumber">
                            <el-input-number v-model="item.num" :max="10" size="mini"></el-input-number>
                        </div>
                        <div class="shop-item-operate">
                            <el-button type="text">移入收藏夹</el-button>
                            <el-button type="text">删除</el-button>
                        </div>
                        <el-checkbox v-model="item.checked"></el-checkbox>
                    </div>
                </el-card>
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
                    <el-button type="primary">结算</el-button>
                </div>
            </el-card>
        </el-footer>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            shopList: [
                {
                    name: '汉堡',
                    price: 20,
                    num: 3,
                    checked: false
                },
                {
                    name: '汉堡',
                    price: 20,
                    num: 3,
                    checked: false
                },
                {
                    name: '汉堡',
                    price: 20,
                    num: 3,
                    checked: false
                },
                {
                    name: '汉堡',
                    price: 20,
                    num: 3,
                    checked: true
                },
                {
                    name: '汉堡',
                    price: 20,
                    num: 3,
                    checked: true
                },
                {
                    name: '汉堡',
                    price: 20,
                    num: 3,
                    checked: false
                },
                {
                    name: '汉堡',
                    price: 20,
                    num: 3,
                    checked: false
                },
                {
                    name: '汉堡',
                    price: 20,
                    num: 3,
                    checked: false
                },
                {
                    name: '汉堡',
                    price: 20,
                    num: 3,
                    checked: false
                }
            ],
            chooseAll: false
        }
    },
    methods: {
        load() {
            
        },
        toDetail() {

        }
    },
    computed: {
        count() {
            return this.shopList.reduce((total, item) => {
                return total += item.checked ? item.num * item.price : 0;
            }, 0)
        }
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