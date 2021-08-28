<template>
    <div class="selCommon teamMigrate">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px" >
            <el-form-item label="时间范围：" class="form_item_mt10 ">
                <el-date-picker v-model="formInline.date1" @change="dateForm1" type="daterange" placeholder="选择日期范围" class="wt200"></el-date-picker>
            </el-form-item>
            <el-form-item label="关键字：" class="form_item_mt10 form_item_wh280">
                <el-input v-model="formInline.keywords" placeholder="消费商/前推荐人/后推荐人" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item label=" " class="form_item_mt10 form_item_wh280">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
                <el-button type="primary" @click="move" class="searchBtn">团队迁移</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" style="width: 100%;margin-top:15px;margin-bottom:10px;min-height: 400px" max-height="660" ref="multipleTable" @selection-change="handleSelectionChange">
            <!--  <el-table-column type="selection"   align="center" width="55"></el-table-column>-->
            <el-table-column prop="createOn" label="变迁时间" min-width="100">
                <template slot-scope="scope">
                    {{scope.row.createOn.substring(0,10)}}
                </template>
            </el-table-column>
             <el-table-column prop="branchName" label="消费商" min-width="100">
                <template slot-scope="scope">
                    <span v-if="scope.row.branchName">{{scope.row.branchName}}[{{scope.row.branchCode}}]</span>
                </template>
            </el-table-column>
            <el-table-column prop="beforeRefName" label="前推荐人" min-width="100">
                <template slot-scope="scope">
                    {{scope.row.beforeRefName}}
                    <span v-if="scope.row.beforeRefCode">
                        [{{scope.row.beforeRefCode}}]
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="branchGradeName" label="" min-width="80">
                <template slot-scope="scope">
                    <el-button type="text">
                        <i class="el-icon-d-arrow-right"></i>
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column prop="afterRefName" label="后推荐人" min-width="100">
                <template slot-scope="scope">
                    {{scope.row.afterRefName}}
                    <span v-if="scope.row.afterRefCode">
                        [{{scope.row.afterRefCode}}]
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="changeReason" label="变迁原因" min-width="150"></el-table-column>
            <el-table-column prop="createBy" label="操作人" min-width="100"></el-table-column>
            <el-table-column prop="createBy" label="操作人" min-width="100">
                <template slot-scope="scope">
                    <el-button @click="viewPhoto(scope.row)" type="primary" size="small">查看凭证</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <el-dialog title="迁移" :visible.sync="dialogFormVisible[1]" size="">
            <el-form :model="form" style="width: 500px;" :rules="rules" ref="form" label-width="110px">
                <el-form-item label="消费商：" class="form_item_mt0" prop="branchObj">
                    <!--<span>{{form.BranchName}}[{{form.Code}}]</span>-->
                    <el-select v-model="form.branchObj" filterable remote placeholder="请输入关键词" style="float: none" :remote-method="remoteMethodB" :loading="loading">
                        <el-option v-for="item in optionsB" :key="item.code" :label="item.BranchName+'|'+item.PhoneNumber" :value="
                                item.BranchName+'|'+item.Code+'|'+item.ReferrerName+'|'+item.ReferrerCode">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="推荐人：" class="form_item_mt0">
                    <span>{{form.ReferrerName}}{{form.ReferrerCode}}</span>
                </el-form-item>
                <el-form-item label="推荐人变更为：" class="form_item_mt0" prop="value">
                    <el-select v-model="form.value" filterable remote placeholder="请输入关键词" style="float: none" :remote-method="remoteMethod" :loading="loading">
                        <el-option v-for="item in options" :key="item.Code" :label="item.BranchName+'('+item.Code+')'" :value="item.BranchName+','+item.Code">
                        </el-option>
                    </el-select>
                    <br/>
                    <span style="float: none">请输入推荐人姓名、推荐人编号查找推荐人</span>
                </el-form-item>
                <el-form-item label="迁移原因：" class="form_item_mt0" prop="reason">
                    <el-input type="textarea" v-model="form.reason" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="上传凭证：" class="form_item_mt0" prop="reason">
                    <el-upload
                        :action="uploadUrl"
                        list-type="picture-card"
                        :acceptImage="acceptImage"
                        :on-success="success"
                        :fileList="fileList"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <span style="color: red;line-height: 20px !important">迁移后，消费商“{{form.branchName}}”及其所有直推代理人将全部迁移至新推荐人。请谨慎操作！</span>
            </el-form>
            <div class="footer_ope">
                <el-button @click="sure('form')" type="primary" :loading="saveLoading">确定</el-button>
                <el-button @click="cancel('form')">取消</el-button>
            </div>
        </el-dialog>
        <el-dialog title="查看凭证" v-model="dialogVisible" size="small">
            <img width="100%" v-for="(item,index) in dialogImageUrl" :src="baseImgPath+item" :key="index" alt="" style="height:400px;width:auto">
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
import { xmxUrl, baseImgPath } from '@/config/env'
import { imgApi, acceptImage } from '@/config/common'
let uploadUrl = xmxUrl + imgApi + '?op=branchshop'
import { GetBranchByConditions, GetBranchGradeAll, BranchChange, GetChangeLog, GetBranchByKeywords, GetBranchChangeLogList,DelImg } from "@/api/myData"
import { getCookie } from "@/config/mUtils"
import "@/style/selfCommon.less"
export default {
    // name: "teamMigrate",
    data() {
        return {
            uploadUrl,
            baseImgPath,
            acceptImage,
            dialogVisible:false,
            dialogImageUrl:'',
            fileList:[],
            saveLoading:false,
            loading: false,
            options: [],
            optionsB: [],
            dialogFormVisible: [false, false, false],
            total: 0,
            size: 10,
            currentPage: 1,
            agentList: [],
            formInline: {
                keywords: "",
                date1: "",
                startTime: "",
                endTime: "",
                rec: "",
                grade: "",
                branch: "",
            },
           
            tableData: [],
            form: {
                ReferrerName: "",
                ReferrerCode: "",
                branchName: "",
                branchCode: "",
                value: "",
                reason: "",
                branchObj: "",
            },
            multipleSelection: [],
            rules: {
                branchObj: [
                    { required: true, message: '请选择', trigger: 'blur' }
                ],

                value: [
                    { required: true, message: '请选择', trigger: 'blur' }
                ],
                reason: [
                    { required: true, message: '请填写', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        /* 导出报表参数 tHeader,filterVal,tableData1*/
        tHeader() {
            return ["代理编号", '姓名', '代理等级', '联系电话', '身份证号', '缴纳押金', "推荐人", '状态']
        },
        filterVal() {
            return ['Code', 'BranchName', 'BranchGradeName', 'PhoneNumber', 'IDCard', 'Pledge', 'ReferrerName', 'IsEnable']
        },
        name() {
            return '迁移记录'
        },
        tableData1() {
            let arr = JSON.parse(JSON.stringify(this.tableData))
            arr.forEach(row => {
                if(row.IsEnable == 0){
                        row.IsEnable ="未启用"
                    }
                     if(row.IsEnable == 1){
                        row.IsEnable ="已启用"
                    }
                    if(row.IsEnable == 2){
                        row.IsEnable = "退会"
                    }
            })
            return arr
        }
        /*导出报表参数 tHeader,filterVal,tableData1*/
    },

    watch: {
        "form.branchObj": {
            handler(curVal, oldVal) {
                if (curVal.length > 0) {
                    this.form.ReferrerName = curVal.split("|")[2]
                    this.form.ReferrerCode = curVal.split("|")[3]
                    this.form.branchName = curVal.split("|")[0]
                    this.form.branchCode = curVal.split("|")[1]
                }
            },
            deep: true
        }
    },
    mounted() {
        //            this.onSubmit()
        this.GetBranchGrade()
    },
    methods: {
        viewPhoto(data){
            this.dialogImageUrl = data.imageUrl.split(",")
            this.dialogVisible = true
        },
        success(response, file, fileList){
            
            this.fileList = fileList
        },
        handleRemove(file, fileList) {
            this.DelImg(file)
            this.fileList = fileList
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.response;
            this.dialogVisible = true;
        },
        async DelImg(filepath){
            let res = await DelImg({filepath:filepath})
            if(!res.status){
                this.$message({message: '原图片删除失败！'+res.errorMessage,type: 'warning'});
            }
        },
        async GetBranchByKeywords(params, index) {
            try {
                let res = await GetBranchByKeywords(params)
                if (index == 1) {
                    this.optionsB = res
                } else {
                    this.options = res
                }
                this.loading = false

            } catch (err) {
                console.log(err)
            }
        },
        async GetBranchGrade() {
            try {
                let res = await GetBranchGradeAll()
                this.agentList = res
                // this.onSubmit()
            } catch (err) {
                console.log(err)
            }
        },
        async GetBranchChangeLogList(params) {
            try {
                let res = await GetBranchChangeLogList(params)
                if (res.status) {
                    this.total = res.count
                    this.tableData = res.data
                } else {

                }
            } catch (err) {
                console.log(err)
            }
        },
        //            迁移操作
        async BranchChange(params) {
            try {
                this.saveLoading = true
                let res = await BranchChange(params)
                if (res.success) {
                    this.$message({
                        message: '迁移成功',
                        type: 'success'
                    });
                    this.dialogOpe(1, false)
                    this.search()
                } else {
                    this.$message.error('操作失败' + res.error);
                }
                this.saveLoading = false
            } catch (err) {
                console.log(err)
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.size = val
            this.search()
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val
            this.search()
        },
        dateForm1(val) {
            val = val.formatDates()
            this.formInline.startTime = val.substring(0, 10)
            this.formInline.endTime = val.substring(13)
        },
        search(){
            this.GetBranchChangeLogList({
                // referrerName:this.formInline.rec,
                // branchName:this.formInline.branch,
                // branchGradeCode:this.formInline.grade,
                startDate: this.formInline.startTime,
                endDate: this.formInline.endTime,
                pageIndex: this.currentPage,
                pageSize: this.size,
                Keywords: this.formInline.keywords.removeSP()
            })
        },
        onSubmit() {
            this.currentPage = 1
            this.search()
        },

        log(index, data, num) {
            this.form = data[index]
            this.GetChangeLog({
                branchCode: data[index].Code
            })
            this.dialogOpe(num, true)
        },
        move() {
            this.reset()
            this.reason = ""
            this.value = ""
            this.dialogOpe(1, true)
            // this.form = data[index]
        },
        dialogOpe(index, ope) {
            this.dialogFormVisible[index] = ope
            this.dialogFormVisible.push()
        },
        remoteMethod(query) {
            if (query !== '') {
                this.loading = true;
                this.loading = false;
                this.GetBranchByKeywords({
                    keyWords: query.removeSP()
                }, 2)
            } else {
                this.options = [];
            }
        },
        remoteMethodB(query) {
            if (query !== '') {
                this.loading = true;
                this.loading = false;
                this.GetBranchByKeywords({
                    keyWords: query.removeSP()
                }, 1)
            } else {
                this.options = [];
            }
        },

        sure(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.BranchChange({
                        IsEnable: "1",//1表示不退会 2表示退会
                        branchCode: this.form.branchCode,
                        branchName: this.form.branchName,
                        refCode: this.form.value.split(",")[1],
                        refName: this.form.value.split(",")[0],
                        changeReason: this.form.reason,
                        operatorName: getCookie("userName"),
                        imageUrl:this.getImg()
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        getImg(){
            let arr = []
            this.fileList.forEach(row=>{
                arr.push(row.response)
            })
            return arr.join(",")
        },
        cancel() {
            this.dialogOpe(1, false)
        },
        reset() {
            for (var p in this.form) {
                this.form[p] = ""
            }
            this.branchObj = ""
        }
    },
    components: {
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
