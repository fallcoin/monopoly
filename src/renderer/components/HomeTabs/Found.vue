<template>
    <div class="content">
        <div class="waterfall" ref="waterFall" id="wa">
            <div
                v-for="(item, index) in waterfallList"
                :key="index"
                class="waterfall-item"
                :style="{
                    top: item.imgData.top + 'px',
                    left: item.imgData.left + 'px',
                    width: imgWidth + 'px',
                    height: item.imgData.height + 'px',
                }"
                @click="toProduct"
            >
                <div class="waterfall-item-in">
                    <img :src="item.imgData.src" alt="" />
                    <div class="water-fall-item-desc">
                        <div class="commodity-title"><span>{{item.title}}</span></div>
                        <div class="commodity-price">{{item.price}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const { ipcRenderer } = require("electron")
export default {
    data() {
        return {
            waterfallList: [], // 瀑布流的显示数组
            commodityList: Object.freeze([
                {
                    comId: 0,
                    title: '鼠标',
                    price: 43.2,
                    image: require("../../assets/images/1.png")
                },
                {
                    comId: 1,
                    title: '键盘',
                    price: 43.2,
                    image: require("../../assets/images/2.png")
                },
                {
                    comId: 2,
                    title: '键盘',
                    price: 43.2,
                    image: require("../../assets/images/3.png")
                },
                {
                    comId: 3,
                    title: '键盘',
                    price: 43.2,
                    image: require("../../assets/images/4.png")
                },
                {
                    comId: 4,
                    title: '键盘',
                    price: 43.2,
                    image: require("../../assets/images/5.png")
                },
                {
                    comId: 5,
                    title: '键盘',
                    price: 43.2,
                    image: require("../../assets/images/6.png")
                }
            ]),
            imgWidth: 300, // 图片宽度
            deviationHeight: [], // 高度偏移数组
            screenWidth: 0,
            imgCol: 0,
        }
    },
    created() {
        this.screenWidth = document.body.clientWidth // 窗口宽度
        this.imgCol = parseInt(this.screenWidth / this.imgWidth) // 瀑布流列数
        this.deviationHeight = new Array(this.imgCol) // 高度偏移数组大小等于列数
        const baseHeight = 20
        // 令高度偏移数组中的值为0
        for (let i = 0; i < this.deviationHeight.length; i++) {
            this.deviationHeight[i] = baseHeight
        }
        this.imgPreloading()
    },
    methods: {
        toProduct() {
            ipcRenderer.send("add-product-window")
        },
        imgPreloading() {
            for (let i = 0; i < this.commodityList.length; i++) {
                let img = new Image()
                img.src = this.commodityList[i].image
                img.onload = img.onerror = () => {
                    let imgData = {}
                    imgData.height = (this.imgWidth / img.width) * img.height //按比例计算图片高度
                    imgData.src = this.commodityList[i].image
                    this.waterfallList.push({imgData, ...this.commodityList[i]})
                    this.rankImg(imgData)
                }
            }
        },
        rankImg(imgData) {
            // 将图片渲染上去
            const imgWidthInterval = 20 // 图片宽度间隔
            const imgHeightInterval = 10 // 图片高度间隔
            const baseWidth = (this.screenWidth -this.imgCol * this.imgWidth - (this.imgCol - 1) * imgWidthInterval) / 2// 初始宽度 = （屏幕宽度 - 图片宽度 * 图片数量 - （图片数量 - 1）* 图片宽度间隔）/ 2
            let minCol = this.getMin()
            imgData.left = minCol * (this.imgWidth + imgWidthInterval) + baseWidth // 图片距离左边位置 = 图片所在列数 * （图片宽度 + 图片所在列数）+ 初始宽度
            imgData.top = this.deviationHeight[minCol]
            this.deviationHeight[minCol] += imgData.height + imgHeightInterval
        },
        getMin() {
            // 获取高度最小的一列
            let min = Math.min.apply(null, this.deviationHeight)
            return this.deviationHeight.indexOf(min)
        },
    },
}
</script>

<style scoped>
.waterfall {
    width: 100%;
    height: 100%;
}
.waterfall-item {
    position: absolute;
    transform-style: preserve-3d;
    perspective: 1000;
}
.waterfall-item-in {
    animation-name: rolling-over;
    animation-duration: 1.5s;
    animation-timing-function: linear;
}
.waterfall-item img {
    width: 100%;
    height: 100%;
    vertical-align:top;
    border:none;
}
.water-fall-item-desc {
    width: 100%;
    background-color: gainsboro;
    position: relative;
    height: 60px;
    top: -60px;
    opacity: .7;
    justify-content: space-around;
    align-items: center;
    display: flex;
}
.commodity-title :hover {
    cursor: pointer;
    text-decoration: underline;
}
.commodity-title {
    height: 40px;
    line-height: 40px;
    font-size: 25px;
    font-weight: 700;
}
.commodity-price {
    font-size: 40px;
    color: red;
}

@keyframes rolling-over {
    0% {}
    25% {
        transform: rotateY(90deg);
    }
    50% {

    }
    75% {
        transform: rotateY(-90deg);
    }
}
</style>
