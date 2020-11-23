<template>
    <el-container>
        <el-aside class="aside" width="220px">
            <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
                <el-radio-button :label="false">展开</el-radio-button>
                <el-radio-button :label="true">收起</el-radio-button>
            </el-radio-group>
            <el-menu
                default-active="1-1"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                :collapse="isCollapse"
                @select="showPage"
            >
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-shopping-bag-1"></i>
                        <span slot="title">购物相关</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1">
                            <i class="el-icon-shopping-cart-full"></i>
                            <span>购物车</span>
                        </el-menu-item>
                        <el-menu-item index="1-2">
                            <i class="el-icon-star-on"></i>
                            <span>收藏夹</span>
                        </el-menu-item>
                        <el-menu-item index="1-3">
                            <i class="el-icon-tickets"></i>
                            <span>我的订单</span>
                        </el-menu-item>
                        <el-menu-item index="1-4">
                            <i class="el-icon-tickets"></i>
                            <span>商家订单</span>
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-time"></i>
                        <span slot="title">历史</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="2-1">
                            <i class="el-icon-time"></i>
                            <span>浏览历史</span>
                        </el-menu-item>
                        <el-menu-item index="2-2">
                            <i class="el-icon-time"></i>
                            <span>购买历史</span>
                        </el-menu-item>
                        <el-menu-item index="2-3">
                            <i class="el-icon-time"></i>
                            <span>发布历史</span>
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-user-solid"></i>
                        <span slot="title">个人信息</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="3-1">
                            <i class="el-icon-document"></i>
                            <span>个人资料</span>
                        </el-menu-item>
                        <el-menu-item index="3-2">
                            <i class="el-icon-lock"></i>
                            <span>账号信息</span>
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="4">
                    <i class="el-icon-setting"></i>
                    <span slot="title">设置</span>
                </el-menu-item>
            </el-menu>
        </el-aside>

        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            isCollapse: true,
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            // console.log(key, keyPath)
        },
        handleClose(key, keyPath) {
            // console.log(key, keyPath)
        },
        showPage(index) {
            let destination = ""
            switch (index) {
                case "1-1":
                    {
                        destination = "/homePage/my/cart"
                    }
                    break
                case "1-2":
                    {
                        destination = "/homePage/my/starList"
                    }
                    break
                case "1-3":
                    {
                        destination = "/homePage/my/order"
                    }
                    break
                case "1-4":
                    {
                        destination = "/homePage/my/cargoStatus"
                    }
                    break  
                case "2-1":
                    {
                        destination = "/homePage/my/visitTrace"
                    }
                    break
                case "2-2":
                    {
                        destination = "/homePage/my/shopTrace"
                    }
                    break
                case "2-3":
                    {
                        destination = "/homePage/my/publishTrace"
                    }
                    break
                case "3-1":
                    {
                        destination = "/homePage/my/myInfo"
                    }
                    break
                case "3-2":
                    {
                        destination = "/homePage/my/accountInfo"
                    }
                    break
                case "4":
                    {
                        destination = "/homePage/my/setting"
                    }
                    break
                default:
                    break
            }
            if (this.$router.history.current.fullPath != destination) {
                this.$router.push(destination)
            }
        },
    },
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
.aside {
    margin-top: 10px;
    margin-left: 10px;
}
</style>
