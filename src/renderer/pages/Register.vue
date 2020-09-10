<template>
    <div>
        <span class="title">注册</span>
        <el-form :model="userRegister" class="form" label-width="80px">
            <el-form-item label="学号">
                <el-input
                    v-model="userRegister.stuId"
                    prefix-icon="el-icon-user-solid"
                    clearable
                ></el-input>
            </el-form-item>
            <el-form-item label="年级">
                <el-input v-model="userRegister.grade" clearable></el-input>
            </el-form-item>
            <el-form-item label="学院">
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
            <el-form-item label="性别">
                <el-radio v-model="userRegister.sex" label="male">男</el-radio>
                <el-radio v-model="userRegister.sex" label="female"
                    >女</el-radio
                >
            </el-form-item>
            <el-form-item label="昵称">
                <el-input v-model="userRegister.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input
                    prefix-icon="el-icon-key"
                    v-model="userRegister.password"
                    show-password
                    clearable
                ></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
                <el-input
                    prefix-icon="el-icon-key"
                    v-model="userRegister.confirmPassword"
                    show-password
                    clearable
                ></el-input>
            </el-form-item>
            <el-button type="primary" class="form-commit">注册</el-button>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userRegister: {
                name: "",
                stuId: "",
                sex: "",
                grade: "",
                academy: "",
                password: "",
                confirmPassword: "",
            },
            academyOptions: [{
                label: '计算机学院',
                value: '1'
            }, {
                label: '珠宝学院',
                value: '2'
            }, {
                label: '外国语学院',
                value: '3'
            }]
        }
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
