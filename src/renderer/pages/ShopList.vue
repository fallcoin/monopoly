<template>
    <div class="content">
        <el-card
            v-for="item in shopList"
            :key="item.com_id"
            class="shop-card"
            :body-style="{ padding: '0px' }"
        >
            <div class="shop-item">
                <img
                    src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                    class="shop-item-img"
                />
                <div class="shop-item-desc">
                    <div class="shop-item-desc-name">{{ item.name }}</div>
                </div>
                <div class="shop-item-price">
                    <div>￥{{ item.price }}</div>
                </div>
                <div class="shop-item-operate">
                    <el-button type="text">移入收藏夹</el-button>
                    <el-button type="text">购买</el-button>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import * as api from '../api/index'
import { getQueryVariable } from '../utils/util'
export default {
    data() {
        return {
            shopList: []
        }
    },
    async created() {
        var keyword = getQueryVariable('keyword');
        let res = await api.GET_SHOP_LIST_BY_KEYWORD({keyword: this.keyWord});
        if (res.code == 200) {
            
        }
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
.shop-item-operate {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.shop-item-operate .el-button {
    margin: 0;
}
</style>
