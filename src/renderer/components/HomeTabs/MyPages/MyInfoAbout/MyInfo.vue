<template>
    <div>
        <el-container>
            <el-card class="box-card">
                <el-header>
                    <h2>个人信息</h2>
                </el-header>
                <el-main class="content">
                    <div class="content-form">
                        <el-form
                            label-position="right"
                            label-width="80px"
                            :model="userInfoModel"
                            :rules="userInfoFormRules"
                            ref="userInfoFormRef"
                            class="form"
                        >
                            <el-form-item label="用户名" prop="username">
                                <el-input
                                    v-model="userInfoModel.username"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="电话" prop="phone">
                                <el-input
                                    v-model="userInfoModel.phone"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="年级" prop="grade">
                                <el-input
                                    v-model.number="userInfoModel.grade"
                                    clearable
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="学院" prop="academy">
                                <el-select
                                    v-model="userInfoModel.academy"
                                    placeholder="请选择"
                                >
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
                                <el-radio
                                    v-model="userInfoModel.sex"
                                    label="male"
                                    >男</el-radio
                                >
                                <el-radio
                                    v-model="userInfoModel.sex"
                                    label="female"
                                    >女</el-radio
                                >
                            </el-form-item>
                        </el-form>

                        <div class="upload">
                            <el-upload
                                class="avatar-uploader"
                                action
                                :auto-upload="false"
                                :multiple="false"
                                :show-file-list="false"
                                :on-change="changeFile"
                            >
                                <img
                                    v-if="imageUrl"
                                    :src="imageUrl"
                                    class="avatar"
                                />
                                <i
                                    v-else
                                    class="el-icon-plus avatar-uploader-icon"
                                ></i>
                            </el-upload>
                            <div class="upload-tip">选择头像</div>
                        </div>
                    </div>
                    <div class="content-btn">
                        <el-button type="primary" @click="onSubmit">修改</el-button>
                        <el-button>取消</el-button>
                    </div>
                </el-main>
            </el-card>
        </el-container>
    </div>
</template>

<script>
import { fileParse } from '../../../../utils/util'
import { imagePrefix } from '../../../../config/index'
const { ipcRenderer } = require("electron")
export default {
    data() {
        return {
            imageUrl: "",
            userInfoModel: {
                username: "",
                sex: "",
                grade: "",
                academy: "",
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
            userInfoFormRules: {
                username: [
                    { required: true, message: "请输入昵称", trigger: "blur" },
                    {
                        min: 2,
                        max: 6,
                        message: "长度为2-6个字符",
                        trigger: ["change", "blur"],
                    }
                ],
                phone: [
                    { required: true, message: "请输入联系电话", trigger: "blur" },
                ]
            },
            avatar: {
                chunk: '',
                filename: ''
            }
        }
    },
    async created() {
        // 获取个人信息
        const { code, information } = await this.$api.GET_USER_INFO()
        if (code == 200) {
            const { academy, grade, sex, username, pic, phone } = information
            academy && (this.userInfoModel.academy = academy)
            grade && (this.userInfoModel.grade = grade)
            sex && (this.userInfoModel.sex = sex)
            username && (this.userInfoModel.username = username)
            pic && (this.imageUrl = imagePrefix + pic)
            phone && (this.userInfoModel.phone = phone)
        } else {
            this.$message.error("获取个人信息失败")
        }
    },
    methods: {
        onSubmit() {
            this.$refs.userInfoFormRef.validate(async (valid) => {
                if (!valid) {
                    return
                }
                let res = await this.$api.UPDATE_USER_INFO({
                    avatar: this.avatar.filename ? this.avatar : {},
                    ...this.userInfoModel
                })
                if (res.code == 200) {
                    this.$message({
                        message: "修改成功",
                        type: "success"
                    })
                    ipcRenderer.send('changeAvatar')
                }
            })
        },
        async changeFile(file) {
            file = file.raw;
            let result = await fileParse(file, "base64" , (type, size) => {
                if (!/(png|jpe?g)/i.test(type)) {
                    this.$message.error("文件格式不正确");
                    return false;
                }

                if (size > 5*1024*1024) {
                    this.$message.error("请选择小于5M的文件");
                    return false;
                }

                return true;
            });

            if (result) {
                this.avatar = {
                    chunk: encodeURIComponent(result),
                    filename: file.name
                }
                this.imageUrl = result
            }
        }
    },
}
</script>

<style scoped>
.box-card {
    width: 100%;
    height: 80vh;
}
.content {
    display: flex;
    flex-direction: column;
}
.content-form {
    display: flex;
    justify-content: space-around;
}
.content-btn {
    display: flex;
    justify-content: center;
}
.upload {
    display: flex;
    flex-direction: column;
}
.avatar-uploader-icon {
    /* font-size: 28px; */
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
}
.avatar-uploader-icon:hover {
    border-color: #409eff;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
.upload-tip {
    margin-top: 10px;
    text-align: center;
}
.form {
    width: 300px;
}
</style>
