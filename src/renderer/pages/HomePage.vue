<template>
    <div class="content">
        <header class="header">
            <div class="logo">
                <span>大富翁</span>
            </div>
            <div class="tabs">
                <router-link
                    tag="div"
                    :to="'/homePage/' + item.link"
                    v-for="item in tabs"
                    :key="item.name"
                    >{{ item.name }}</router-link
                >
            </div>
            <div class="option">
                <div class="option-avatar" @click="toMyInfo">
                    <img :src="avatar" alt="" />
                </div>
                <el-button class="option-logout" type="text" @click="logout"
                    >登出</el-button
                >
            </div>
        </header>
        <div class="main">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
const { ipcRenderer } = require("electron")
export default {
    data() {
        return {
            tabs: [
                { name: "首 页", link: "home" },
                { name: "发 现", link: "found" },
                { name: "我 的", link: "my" },
                { name: "关 于", link: "about" },
            ],
            avatar: "",
        }
    },
    async created() {
        this.changeAvatar()
        ipcRenderer.on('changeAvatar', () => {
            this.changeAvatar()
        })
    },
    methods: {
        async changeAvatar() {
            let res = await this.$api.GET_AVATAR()
            if (res.code == 200) {
                this.$store.dispatch("User/SET_AVATAR", res.pic)
                this.avatar = this.$store.getters['User/getAvatar']
            }
        },
        toMyInfo() {
            this.$router.push("/homePage/my/myInfo")
        },
        logout() {
            this.$store.dispatch("User/SET_TOKEN", '')
            this.$store.dispatch("User/SET_USER_ID", '')
            this.$store.dispatch("User/SET_AVATAR", '')
            window.localStorage.removeItem('token')
            window.localStorage.removeItem('stu_id')
            this.$message({
                message: "退出成功",
                type: "success",
                onClose: () => {
                    this.$router.push("/");
                },
                duration: 700
            })
        }
    },
}
</script>

<style scoped>
.header {
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #b2bec3;
    background-color: #fff;
    display: flex;
    justify-content: space-around;
}
.tabs {
    display: flex;
    justify-content: center;
    height: 100%;
    font-size: 20px;
    font-weight: 600;
}
.tabs > div {
    margin-left: 20px;
    margin-right: 20px;
    height: 100%;
    width: 80px;
    text-align: center;
    line-height: 60px;
}
.tabs > div:hover {
    background-color: #95a5a6;
    cursor: pointer;
    color: #fff;
}
.router-link-active {
    color: #2e86de;
}
.logo {
    line-height: 60px;
    font-style: italic;
    font-weight: bold;
    color: #3498db;
    font-size: 25px;
}
.option {
    display: flex;
    align-items: center;
    width: 100px;
    justify-content: space-between;
}
.option-avatar {
    display: flex;
    align-items: center;
}
.option-avatar img {
    height: 45px;
    width: 45px;
    border-radius: 50%;
    cursor: pointer;
}
.option-logout {
    height: 40px;
}
.main {
    width: 100%;
    height: 100%;
    position: relative;
}
</style>
