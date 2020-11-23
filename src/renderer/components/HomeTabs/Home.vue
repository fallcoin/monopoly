<template>
    <div class="content">
        <div class="search">
            <el-input
                placeholder="请输入你想查询的内容"
                v-model.trim="keyWord"
                clearable
                class="search-input"
                prefix-icon="el-icon-search"
                @input="showKeyWord(keyWord)"
            />
            <el-button type="primary" @click="search">查询</el-button>
        </div>
        <el-carousel :interval="5000" arrow="always" class="swiper">
            <el-carousel-item v-for="(item, index) in swipers" :key="index">
                <img :src="item" alt="" />
            </el-carousel-item>
        </el-carousel>

        <div class="float-btn">
            <el-button
                icon="el-icon-plus"
                class="float-btn-publish"
                type="primary"
                @click="toPublish"
                circle
            ></el-button>
        </div>
    </div>
</template>

<script>
import { throttle } from '../../utils/util.js'
import * as api from '../../api/index'
const { ipcRenderer } = require("electron");
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
    methods: {
        showKeyWord: throttle((keyWord) => {
            // 根据输入的内容显示查询关键词
        }, 500),
        async search() {
            if (this.keyWord) {
                ipcRenderer.send("add-shoplist-window", this.keyWord)
            }
        },
        toPublish() {
            ipcRenderer.send("add-publish-window")
        },
    },
    created() {},
}
</script>

<style scoped>
.content {
    background-color: #fff;
    height: 100%;
}
.search {
    display: flex;
    padding-top: 20px;
    width: 300px;
    margin-left: 50%;
    transform: translateX(-50%);
}
.search-input {
    width: 250px;
    margin-right: 20px;
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
.float-btn {
    position: fixed;
    bottom: 75px;
    right: 75px;
}
.float-btn-publish {
    width: 60px;
    height: 60px;
}
</style>
