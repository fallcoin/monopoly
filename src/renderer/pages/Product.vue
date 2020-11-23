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
                        v-for="(item, index) in imgs"
                        :key="index"
                        :src="item"
                        @click="toggles(item)"
                    />
                </div>
            </div>
            <div class="commodity-head-info">
                <h3 class="commodity-head-info-title">{{ title }}</h3>
                <div class="commodity-head-info-param">
                    <span
                        >价格： ￥<span
                            class="commodity-head-info-param-price"
                            >{{ price }}</span
                        ></span
                    >
                    <el-input-number
                        v-model="num"
                        :min="1"
                        :max="10"
                        size="mini"
                        class="commodity-head-info-param-select"
                    ></el-input-number>
                </div>
                <div class="commodity-head-info-btns">
                    <el-button type="primary">购买</el-button>
                    <el-button type="primary" plain>加入购物车</el-button>
                </div>
            </div>
        </div>
        <el-card class="commodity-main">
            <div v-html="content"></div>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: "鼠标",
            imgs: [
                require("../assets/images/5.png"),
                require("../assets/images/1.png"),
                require("../assets/images/2.png"),
            ],
            activeImg: {
                num: 0,
                url: "",
            },
            num: 6,
            price: 45.2,
            selectNum: 0,
            content: `<h1>雷蛇鼠标</h1>
            <h3>超级好用的一款鼠标</h3>`,
        }
    },
    created() {
        this.activeImg.url = this.imgs[0]
        setInterval(() => {
            this.activeImg.url = this.imgs[this.activeImg.num % this.imgs.length]
            this.activeImg.num++
        }, 4000)
    },
    methods: {
        toggles(imgUrl) {
            this.imgs.map((item, index) => {
                if (item == imgUrl) {
                    this.activeImg.url = imgUrl
                    this.activeImg.num = index
                }
            })
        },
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
</style>
