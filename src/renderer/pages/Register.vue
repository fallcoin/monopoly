<template>
    <div>
        <span class="title">注册</span>
        <el-form
            :model="userRegister"
            ref="registerFormRef"
            :rules="userRegisterRules"
            class="form"
            label-width="80px"
        >
            <el-form-item label="学号" prop="stu_id">
                <el-input
                    v-model="userRegister.stu_id"
                    prefix-icon="el-icon-user-solid"
                    clearable
                ></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="phone">
                <el-input
                    v-model="userRegister.phone"
                    clearable
                ></el-input>
            </el-form-item>
            <el-form-item label="年级" prop="grade">
                <el-input
                    v-model.number="userRegister.grade"
                    clearable
                ></el-input>
            </el-form-item>
            <el-form-item label="学院" prop="academy">
                <el-select v-model="userRegister.academy" placeholder="请选择">
                    <el-option
                        v-for="item in academyOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-radio v-model="userRegister.sex" label="male">男</el-radio>
                <el-radio v-model="userRegister.sex" label="female">女</el-radio>
            </el-form-item>
            <el-form-item label="昵称" prop="username">
                <el-input v-model="userRegister.username" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input
                    prefix-icon="el-icon-key"
                    v-model="userRegister.password"
                    show-password
                    clearable
                ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
                <el-input
                    prefix-icon="el-icon-key"
                    v-model="userRegister.confirmPassword"
                    show-password
                    clearable
                ></el-input>
            </el-form-item>
            <el-button type="primary" class="form-commit" @click="register"
                >注册</el-button
            >
        </el-form>
    </div>
</template>

<script>
const { ipcRenderer } = require("electron");
import * as api from '../api/index';
export default {
    data() {
        const checkPassword = (rule, value, callback) => {
            if (this.userRegister.password !== value) {
                callback(new Error("两次密码输入不一致"))
            }
            callback();
        }
        return {
            userRegister: {
                username: "",
                stu_id: "",
                sex: "",
                grade: "",
                academy: "",
                password: "",
                confirmPassword: "",
                phone: ""
            },
            academyOptions: [
                {
                    label: "计算机学院",
                    value: "计算机学院",
                },
                {
                    label: "珠宝学院",
                    value: "珠宝学院",
                },
                {
                    label: "外国语学院",
                    value: "外国语学院",
                },
            ],
            userRegisterRules: {
                stu_id: [
                    { required: true, message: "请输入学号", trigger: "blur" },
                    {
                        len: 12,
                        pattern: /^20[0-9]{10}$/,
                        message: "请输入正确的学号",
                        trigger: ["change", "blur"],
                    },
                ],
                username: [
                    { required: true, message: "请输入昵称", trigger: "blur" },
                    {
                        min: 2,
                        max: 6,
                        message: "长度为2-6个字符",
                        trigger: ["change", "blur"],
                    },
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    {
                        type: "string",
                        min: 8,
                        max: 12,
                        pattern: /[a-zA-Z]+/,
                        message: "长度8-12，至少带有一个字母",
                        trigger: ["change", "blur"],
                    },
                ],
                confirmPassword: [
                    {
                        required: true,
                        message: "请重复输入密码",
                        trigger: "blur",
                    },
                    {
                        validator: checkPassword,
                        trigger: ["change", "blur"],
                    },
                ],
                phone: [
                    { required: true, message: "请输入联系电话", trigger: "blur" },
                ]
            }
        }
    },
    methods: {
        register() {
            this.$refs.registerFormRef.validate(async (valid) => {
                if (!valid) {
                    return;
                }
                // 注册申请
                let res = await api.REGISTER({
                    ...this.userRegister
                });
                if(res.code == 200) {
                    this.$message({
                        message: '注册成功',
                        type: 'success',
                        onClose: () => {
                            ipcRenderer.send("close-register-window");
                        },
                        duration: 2000
                    });
                } else if (res.code == 201) {
                    this.$message.error('账号已存在');
                }
            })
        },
    },
}
</script>

<style scoped>
.form {
    width: 400px;
    height: 100%;
    margin-left: 50%;
    transform: translateX(-50%);
}
.form-commit {
    margin-left: 50%;
    transform: translateX(-50%);
}
.title {
    color: #0984e3;
    font-size: 2em;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 15px;
    display: inline-block;
}
</style>
