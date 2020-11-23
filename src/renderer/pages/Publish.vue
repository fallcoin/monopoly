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
                <el-form-item label="数量" prop="num">
                    <el-input v-model.number="commodityForm.num"></el-input>
                </el-form-item>
                <el-form-item label="封面">
                    <el-upload
                        class="upload-demo"
                        action
                        :auto-upload="false"
                        :multiple="true"
                        :on-change="changeFile"
                        :file-list="fileList"
                        list-type="picture"
                    >
                        <el-button size="small" type="primary"
                            >点击上传</el-button
                        >
                        <div slot="tip" class="el-upload__tip">
                            只能上传jpg/png文件，且每张不超过2M
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
export default {
    data() {
        return {
            commodityForm: {
                name: "",
                price: "",
                num: "",
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
                num: [
                    { required: true, message: "请输入商品数量", trigger: "blur" }
                ]
            },
            editor: null,
            fileList: []
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
        onSubmit() {
            console.log(this.editor.txt.html());
        },
        cancel() {

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
                let res = await this.$api.UPLOAD({
                    chunk: encodeURIComponent(result),
                    filename: file.name
                })
                if (res.code == 200) {
                    
                }
            }
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
