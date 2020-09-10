<template>
    <div>
        <el-input
            placeholder="请输入你想查询的内容"
            :v-model="keyWord"
            clearable
            class="searchBox"
            prefix-icon="el-icon-search"
        >
        </el-input>
        <el-carousel :interval="5000" arrow="always" class="swiper">
            <el-carousel-item v-for="(item,index) in swipers" :key="index">
                <img :src="item" alt="" />
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {
    data() {
        return {
            swipers: [
                "http://image.fallcoin.xyz/blog/20200909/4dovRgoCnbcj.jpg",
                "http://image.fallcoin.xyz/blog/20200909/4dovRgoCnbcj.jpg",
                "http://image.fallcoin.xyz/blog/20200909/4dovRgoCnbcj.jpg",
            ],
            keyWord: "",
        }
    },
    created() {
    },
}
</script>

<style scoped>
.searchBox {
    margin-top: 20px;
    width: 300px;
    margin-left: 50%;
    transform: translateX(-50%);
}
.swiper {
    margin-top: 20px;
    width: 600px;
    height: 300px;
    margin-left: 50%;
    transform: translateX(-50%);
}
.swiper img {
    height: 100%;
    width: 100%;
}
</style>
