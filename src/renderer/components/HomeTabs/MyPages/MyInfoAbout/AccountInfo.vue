<template>
    <div>
        <el-card class="box-card">
            <el-container>
                <el-header>
                    <h2>账号信息</h2>
                </el-header>
                <el-main>
                    <el-form
                        label-position="right"
                        label-width="80px"
                        :model="accountModel"
                        :rules="accountFormRules"
                        ref="accountFormRef"
                        class="form"
                    >
                        <el-form-item label="账号" prop="stu_id">
                            <el-input v-model="accountModel.stu_id" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password" clearable>
                            <el-input
                                v-model="accountModel.password"
                                show-password
                            ></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit"
                                >修改</el-button
                            >
                            <el-button>取消</el-button>
                        </el-form-item>
                    </el-form>
                </el-main>
            </el-container>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            accountModel: {
                stu_id: "",
                password: "",
            },
            accountFormRules: {
                password: [
                    {
                        min: 8,
                        max: 12,
                        message: "请输入正确的密码",
                        trigger: "blur",
                    },
                ]
            }
        }
    },
    async created() {
        // 获取账号信息
        let res = await this.$api.GET_USER_PASSWORD()
        if (res.code == 200) {
            this.accountModel.stu_id = res.stu_id
            this.accountModel.password = res.password
        } else {
            this.$message.error("获取失败")
        }
    },
    methods: {
        onSubmit() {
            this.$refs.accountFormRef.validate(async (valid) => {
                if (!valid) {
                    return
                }
                let res = await this.$api.UPDATE_USER_PASSWORD({
                    password: this.accountModel.password
                })
                if (res.code == 200) {
                    this.$message({
                        message: "修改成功",
                        type: "success"
                    })
                } else {
                    this.$message.error("修改失败")
                }
            })
        }
    }
}
</script>

<style scoped>
.box-card {
    height: 70vh;
}
.form {
    width: 300px;
}
</style>
