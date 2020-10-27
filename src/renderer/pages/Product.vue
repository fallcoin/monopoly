<template> 
    <div>
        <div class="commodity-head">
            <img class="commodity-head-img" :src="imgUrl" alt="">
            <div class="commodity-head-info">
                <h3 class="commodity-head-info-title">{{title}}</h3>
                <div class="commodity-head-info-param">
                    <span>价格： ￥{{price}}</span>
                    <el-select class="commodity-head-info-param-select" v-model="selectNum" placeholder="请选择">
                        <el-option
                            v-for="item in num"
                            :key="item"
                            :label="item"
                            :value="item">
                        </el-option>
                    </el-select>
                </div>
                <div class="commodity-head-info-btns">
                    <el-button type="primary">购买</el-button>
                    <el-button type="primary" plain>加入购物车</el-button>
                </div>
            </div>
        </div>
        <div class="commodity-main">
            <div v-html="content"></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: "鼠标",
            imgUrl: require("../assets/images/5.png"),
            num: 36,
            price: 45.2,
            selectNum: 0,
            content: `<h1>雷蛇鼠标</h1>
            <h3>超级好用的一款鼠标</h3>`
        }
    }
}
</script>

<style scoped>
.commodity-head {
    display: flex;
    margin-left: 30px;
    margin-top: 30px;
}
.commodity-head-img {
    width: 200px;
    height: 150px;
}
.commodity-head-info{
    display: flex;
    flex-direction: column;
    margin-left: 30px;
}
.commodity-head-info-param {
    display: flex;
    align-items: center;
}
.commodity-head-info-param-select {
    width: 100px;
    margin-left: 15px;
}
.commodity-head-info-btns {
    display: flex;
    margin-top: 10px;
}
.commodity-main {
    margin-top: 20px;
    margin-left: 30px;
    margin-right: 30px;
}
</style>
