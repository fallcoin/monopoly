<template>
    <el-container>
        <el-header>
            <h3 class="header">商品发布</h3>
        </el-header>
        <el-main>
            <el-form
                class="form"
                ref="commodityFormRef"
                :model="commodityForm"
                label-width="80px"
                :rules="commodityFormRules"
            >
                <el-form-item label="商品名称" prop="name">
                    <el-input v-model.trim="commodityForm.name"></el-input>
                </el-form-item>
                <el-form-item label="价格" prop="price">
                    <el-input v-model.number="commodityForm.price"></el-input>
                </el-form-item>
                <el-form-item label="数量" prop="number">
                    <el-input v-model.number="commodityForm.number"></el-input>
                </el-form-item>
                <el-form-item label="封面">
                    <el-upload
                        :on-remove="handleRemove"
                        class="upload-demo"
                        action
                        :auto-upload="false"
                        :multiple="true"
                        :on-change="changeFile"
                        :file-list="fileList"
                        list-type="picture"
                        :limit="3"
                        :on-exceed="exceed"
                    >
                        <el-button size="small" type="primary"
                            >点击上传</el-button
                        >
                        <div slot="tip" class="el-upload__tip">
                            只能上传jpg/png文件，且每张不超过2M
                            需上传3张
                        </div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div id="editor"></div>
            <div class="btns">
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button @click="cancel">取消</el-button>
            </div>
        </el-main>
    </el-container>
</template>

<script>
import E from "wangeditor";
import { fileParse } from '../utils/util';
const { ipcRenderer } = require("electron");
export default {
    data() {
        return {
            commodityForm: {
                name: "",
                price: "",
                number: "",
            },
            commodityFormRules: {
                name: [
                    { required: true, message: "请输入商品名称", trigger: "blur" },
                    {
                        min: 2,
                        max: 10,
                        message: "长度为2-10个字符",
                        trigger: ["change", "blur"],
                    },
                ],
                price: [
                    { required: true, message: "请输入商品价格", trigger: "blur" }
                ],
                number: [
                    { required: true, message: "请输入商品数量", trigger: "blur" }
                ]
            },
            editor: null,
            fileList: [],
            transFiles: [],
            post: false
        }
    },
    created() {
        this.$nextTick(() => {
            this.editor = new E("#editor")
            this.editor.create()
            this.editor.txt.html('<h3>请在这里编辑商品的具体信息</h3>')
        })
    },
    methods: {
        async onSubmit() {
            if (this.post) {
                return
            }
            this.post = true
            if (this.transFiles.length != 3) {
                this.$message.error("商品图片应为3张")
            }
            this.transFiles.map(item => {
                delete item.uid
            })
            let res = await this.$api.PUBLISH({
                commodity: {
                    ...this.commodityForm,
                    descript: this.editor.txt.html(),
                },
                images: this.transFiles
            })
            if (res.code == 200) {
                this.$message({
                    type: 'success',
                    message: '发布成功',
                    onClose: () => {
                        ipcRenderer.send("close-publish-window");
                    },
                    duration: 2000
                })
            } else {
                this.$message.error("发布失败")
            }
            this.post = false
        },
        handleRemove(file) {
            this.transFiles.splice(this.transFiles.findIndex(item => item.uid == file.uid), 1)
        },
        cancel() {
            this.fileList = []
            this.transFiles = []
            this.commodityForm = {
                name: "",
                price: "",
                num: "",
            }
            this.editor.txt.html('<h3>请在这里编辑商品的具体信息</h3>')
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

            this.transFiles.push({
                chunk: encodeURIComponent(result),
                filename: file.uid + file.name.match(/\.\w*/g)[file.name.match(/\.\w*/g).length - 1],
                uid: file.uid
            })
        },
        exceed() {
            this.$message.error("不能选择3张以上的图片")
        }
    }
}
</script>

<style scoped>
.header {
    text-align: center;
}
.form {
    width: 300px;
}
.btns {
    display: flex;
    justify-content: center;
    margin-top: 10px;
}
</style>
