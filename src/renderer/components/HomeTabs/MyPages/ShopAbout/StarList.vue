<template>
    <el-container class="container">
        <el-main class="shop-list">
            <el-card v-for="(item, index) in shopList" :key="index" class="shop-card" :body-style="{ padding: '0px' }">
                <div class="shop-item">
                    <div>
                        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="shop-item-img">
                    </div>
                    <div class="shop-item-desc">
                        <div class="shop-item-desc-name">{{item.name}}</div>
                    </div>
                    <div class="shop-item-price">
                        <div>￥{{item.price}}</div>
                    </div>
                    <div class="shop-item-operate">
                        <el-button type="text">加入购物车</el-button>
                        <el-button type="text">删除</el-button>
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
                    <el-button type="danger">删除</el-button>
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
                    checked: false
                },
                {
                    name: '汉堡',
                    price: 20,
                    checked: false
                },
                {
                    name: '汉堡',
                    price: 20,
                    checked: false
                },
                {
                    name: '汉堡',
                    price: 20,
                    checked: true
                },
                {
                    name: '汉堡',
                    price: 20,
                    checked: true
                },
                {
                    name: '汉堡',
                    price: 20,
                    checked: false
                },
                {
                    name: '汉堡',
                    price: 20,
                    checked: false
                },
                {
                    name: '汉堡',
                    price: 20,
                    checked: false
                },
                {
                    name: '汉堡',
                    price: 20,
                    checked: false
                }
            ],
            chooseAll: false
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