<template>
    <div class=" debitNote">
        <el-form :inline="true" ref="formInline" :rules="rules" :model="formInline" class="demo-form-inline" label-width="100px">
            <el-form-item label="日期：" prop="date" class='form_item_mt10 form_item_wt400'>
                <el-date-picker type="date" @change="dateForm" v-model="formInline.date" placeholder="选择日期" style='width:260px;'></el-date-picker>
            </el-form-item>
            <el-form-item label="消费商：" prop="value" class='form_item_mt10 form_item_wt400'>
                <el-select v-model="formInline.value" filterable remote placeholder="请输入关键词" :remote-method="remoteMethod" :loading="loading" style="width: 260px">
                    <el-option v-for="item in options" :key="item.Id" :label="item.name" :value="item"></el-option>
                </el-select>
            </el-form-item><br/>
            <!-- <el-form-item label="医院:" class="form_item_mt10">
                <el-select v-model="formInline.hospital"  style='width:200px;'>
                    <el-option v-for="(item,index) in hospitalList" :key="index" :label="item.supplierName" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="销售公司:" class="form_item_mt10">
                <el-select v-model="formInline.branchTop"  style='width:200px;'>
                    <el-option v-for="(item,index) in branchTopList" :key="index" :label="item.supplierName" :value="item.code"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="类型：" prop="type" class='form_item_mt10 form_item_wt400'>
                <el-radio class="radio" v-model="formInline.type" label="1">补款</el-radio>
                <el-radio class="radio" v-model="formInline.type" label="-1">扣款</el-radio>
            </el-form-item>
            <el-form-item label="关联单据：" prop="" class='form_item_mt10 form_item_wt400'>
                <el-input v-model="formInline.fxCode" class="form_ipt_200"></el-input>
            </el-form-item><br/>
            <el-form-item label="原因：" prop="reason" class='form_item_mt10 form_item_wt400'>
                <el-select v-model="formInline.reason" class="form_ipt_200">
                    <el-option v-for="(item,index) in reasonList" :key="index" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item><br/>
            <el-form-item label="金额" prop="debitAmount" class='form_item_mt10 form_item_wt400'>
                <el-input-number v-model="formInline.debitAmount" class="form_ipt_200" :controls="false" style="float:none" :debounce="debounce"></el-input-number>
            </el-form-item><br/>
            <el-form-item label="图片" prop="" class='form_item_mt10' style="width: 100%">
                <el-upload :action="action" list-type="picture-card" :on-preview="handlePictureCardPreview" :accept="acceptImage" 
                :before-upload="before" :file-list="fileList" :on-change="change" :on-remove="handleRemove" :multiple="true" :on-success="handleSuccess">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog v-model="dialogVisible" size="tiny">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item><br/>
            <el-form-item label="备注" prop="" class='form_item_mt10 form_item_wt400'>
                <el-input type="textarea" v-model="formInline.memo" class="form_ipt_200"></el-input>
            </el-form-item><br/>
            <el-form-item label=" " prop="" class='form_item_mt10 form_item_wt400'>
                <el-button type="primary" @click="save('formInline')" :disabled="show" :loading="saveLoading">保存</el-button>
                <el-button type="primary" @click="reset('formInline')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script type="text/ecmascript-6">
import { AddDebitOrder, GetBranchByKeywords,DelImg } from "@/api/myData"
import "@/style/selfCommon.less"
import "@/config/prototype.js"
import { getCookie } from "@/config/mUtils"
import { baseImgPath } from "@/config/env"
import { acceptImage } from '@/config/common'
export default {
    // name: "debitNote",
    data() {
        return {
            saveLoading:false,
            debounce:1000,
            show: false,
            options: [],
            addReason: ['5000业绩补款', '专家日提成', '公司奖励', '其他'],
            debitList: ['5000业绩扣款', '消费订单退款', '客户退会', '招商会注册', '恶意竞争', '其他'],
            reasonList: [],
            loading: false,
            action: "",
            dialogImageUrl: '',
            dialogVisible: false,
            fileList: [],
            hospitalList:[],
            branchTopList:[],
            acceptImage:"",
            formInline: {
                hospital:"",
                value: "",
                type: "",
                reason: "",
                fxCode: "",
                memo: "",
                debitAmount: "",
                date: "",
                date1: "",
            },
            rules: {
                value: [
                    { type: 'object', required: true, message: '请选择消费商', trigger: 'blur' },
                ],
                date: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                type: [
                    { required: true, message: '请选择', trigger: 'change' }
                ],
                reason: [
                    { required: true, message: '请选择', trigger: 'change' }
                ],
                debitAmount: [
                    { required: true,type:'number', message: '请选择', trigger: 'blur' }
                ]
            }
        }
    },
    watch: {
        "formInline.type": {
            handler(curVal, oldVal) {
                
                if (curVal == 1) {
                    this.reasonList = this.addReason
                } else {
                    this.reasonList = this.debitList
                }
                this.formInline.reason = ""
            }
        }
    },
    mounted() {
        this.acceptImage = acceptImage
        this.formInline.date = new Date()
        this.action = baseImgPath + "/api/Image/UploadImg?op=prooforder"
    },
    methods: {
        async GetBranchByKeywords(params) {
            try {
                let res = await GetBranchByKeywords(params)
                res.forEach(row => {
                    row.name = row.BranchName+'('+row.PhoneNumber+')'
                    row.value = row.Code
                });
                this.options = res
            } catch (err) {
                console.log(err)
            }
        },
        async AddDebitOrder(params) {
            try {
                this.saveLoading = true
                let res = await AddDebitOrder(params)
                if (res.success) {
                    this.$message({ message: "添加成功", type: 'success' });
                    this.show = false
                    this.reset("formInline")
                } else {
                    this.$message.error('添加失败')
                    this.show = false
                }
                this.saveLoading = false
            } catch (err) {
                console.log(err)
                this.$message.error('添加失败')
            }
        },
        dateForm(val) {
            this.formInline.date1 = val
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
            this.fileList = fileList
            if(file.response){
                this.DelImg(file.response)
            }
        },
            // 删除原图片/视频
            async DelImg(filepath){
                let res = await DelImg({filepath:filepath})
                if(!res.status){        
                this.$message({message: '原图片删除失败！'+res.errorMessage,type: 'warning'});
                }
                
            },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        change(file, fileList) {
            this.fileList = fileList
        },
        before(file) {

            if (this.fileList.length > 5) {
                return false
            }
        },
        handleSuccess(response, file, fileList) {
            this.fileList = fileList
        },
        save(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.show = true
                    this.AddDebitOrder({
                        branchCode: this.formInline.value.Code,
                        branchName: this.formInline.value.BranchName,
                        debitReason: this.formInline.reason,
                        fxCode: this.formInline.fxCode,
                        debitAmount: this.formInline.debitAmount,
                        HospitalId: this.formInline.value.HospitalCode,
                        HospitalName: this.formInline.value.HospitalName,
                        imageUrl1: this.getPic(1),
                        imageUrl2: this.getPic(2),
                        imageUrl3: this.getPic(3),
                        imageUrl4: this.getPic(4),
                        imageUrl5: this.getPic(5),
                        createUserId: getCookie("userId"),
                        createBy: getCookie("userName"),
                        DebitDate: this.formInline.date1,
                        memo: this.formInline.memo,
                        IsPositive: this.formInline.type
                    })
                } else {
                    return false;
                }
            });
        },
        reset(formName) {
            this.$refs[formName].resetFields();
            this.fileList = []
        },
        remoteMethod(query) {
            if (query !== '') {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    this.GetBranchByKeywords({
                        keyWords: query.removeSP()
                    })
                }, 200);
            } else {
                this.options = [];
            }
        },
        getPic(num) {
            if (this.fileList[num - 1]) {
                return this.fileList[num - 1].response
            } else {
                return ""
            }
        }
    },
    components: {

    }
}
</script>

<style scoped>
.form_item_wt400 {
    width: 400px;
}

.form_ipt_200 {
    width: 260px;
}
</style>
