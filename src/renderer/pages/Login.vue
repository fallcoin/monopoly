<template>
    <div class="content">
        <div class="title">大富翁</div>
        <transition name="slide-show">
            <div class="form" v-if="show">
                <el-form :model="userLogin" label-width="60px">
                    <span class="form-title">登录</span>
                    <el-form-item label="学号">
                        <el-input
                            v-model="userLogin.stuId"
                            clearable
                            prefix-icon="el-icon-user-solid"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input
                            v-model="userLogin.password"
                            prefix-icon="el-icon-key"
                            clearable
                            show-password
                        ></el-input>
                    </el-form-item>
                    <div class="form-commit">
                        <el-button
                            type="primary"
                            @click="login"
                            class="form-commit-login"
                            >登录</el-button
                        >
                        <el-button
                            @click="register"
                            class="form-commit-register"
                            >注册</el-button
                        >
                    </div>
                </el-form>
            </div>
        </transition>
    </div>
</template>

<script>
const { ipcRenderer } = require("electron")
export default {
    data() {
        return {
            userLogin: {
                stuId: "",
                password: "",
            },
            show: false,
        }
    },
    methods: {
        login() {
            this.$router.push("/homePage/home")
        },
        register() {
            ipcRenderer.send('add-register-window')
        },
    },
    mounted() {
        this.show = !this.show
    },
}
</script>

<style scoped>
.content {
    background-image: url("http://image.fallcoin.xyz/blog/20200109/P5Ss0bGlA405.jpg");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
}
.title {
    font-size: 80px;
    color: #54a0ff;
    font-style: italic;
    font-weight: bold;
    margin-top: 50px;
    margin-left: 50px;
}
.form {
    background-color: #fff;
    width: 300px;
    height: 220px;
    border-radius: 20px;
    padding: 20px;
    top: 180px;
    left: 55%;
    position: absolute;
}
.form-title {
    color: #0984e3;
    font-size: 2em;
    margin-bottom: 10px;
    margin-left: 15px;
    display: inline-block;
}
.form-commit {
    margin-left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-around;
}
.form-commit-login {
    margin-right: 20px;
}
.form-commit-register {
    margin-left: 20px;
}
.slide-show-enter {
    opacity: 0;
    transform: translateY(-50px);
}
.slide-show-enter-active {
    transition: all 1s ease;
}
.slide-show-enter-to {
    opacity: 1;
}
</style>
