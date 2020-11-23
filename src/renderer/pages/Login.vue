<template>
    <div class="content">
        <div class="title" @click="goto">大富翁</div>
        <transition name="slide-show">
            <div class="form" v-if="show">
                <el-form
                    :model="userLogin"
                    :rules="loginFormRules"
                    ref="loginFormRef"
                    label-width="60px"
                    :hide-required-asterisk="true"
                >
                    <span class="form-title">登录</span>
                    <el-form-item label="学号" prop="stu_id">
                        <el-input
                            v-model="userLogin.stu_id"
                            clearable
                            prefix-icon="el-icon-user-solid"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
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
const { ipcRenderer } = require("electron");

export default {
    data() {
        return {
            userLogin: {
                stu_id: "",
                password: "",
            },
            show: false,
            loginFormRules: {
                stu_id: [
                    { required: true, message: "请输入学号", trigger: "blur" },
                    {
                        len: 12,
                        pattern: new RegExp("^20"),
                        message: "请输入正确的学号",
                        trigger: "blur",
                    },
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    {
                        min: 8,
                        max: 12,
                        message: "请输入正确的密码",
                        trigger: "blur",
                    },
                ],
            },
        }
    },
    methods: {
        login() {
            this.$refs.loginFormRef.validate(async (valid) => {
                if (!valid) {
                    return
                }
                // 登录操作
                let res = await this.$api.LOGIN({
                    ...this.userLogin,
                })
                if (res.code == 200) {
                    this.$message({
                        message: "登录成功",
                        type: "success",
                        onClose: () => {
                            this.$store.dispatch("User/SET_TOKEN", res.Authorization);
                            this.$store.dispatch("User/SET_USER_ID", res.stu_id)
                            window.localStorage.setItem('token', res.Authorization);
                            window.localStorage.setItem('stu_id', res.stu_id);
                            this.$router.push("/homePage/home");
                        },
                        duration: 1000
                    })
                } else {
                    this.$message.error('账号或密码错误');
                }
            })
        },
        register() {
            ipcRenderer.send("add-register-window")
        },
        goto() {
            this.$router.push("/homePage/home");
        }
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
