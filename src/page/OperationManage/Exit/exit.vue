<template>
    <div class="selCommon exit">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px">
            <el-form-item label="时间范围："  class="form_item_mt10 ">
                <el-date-picker v-model="formInline.date1" @change="dateForm1" type="daterange" placeholder="选择日期范围" class="wt200"></el-date-picker>
            </el-form-item>
            <el-form-item label="推荐人：" class="form_item_mt10 form_item_wh280">
                <el-input v-model="formInline.rec" placeholder="" style="width: 200px;"  v-on:keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            <el-form-item label="代理人：" class="form_item_mt10 form_item_wh280">
                <el-input v-model="formInline.branch" placeholder="" style="width: 200px;"  v-on:keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            <el-form-item label="代理等级：" class="form_item_mt10 form_item_wh280">
                <el-select v-model="formInline.grade"  class="form_ipt_200" @change="onSubmit">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in agentList" :key="item.Id" :label="item.BranchGradeName" :value="item.Code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label=" " class="form_item_mt10 form_item_wh280">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
                 <el-button type="primary" class="searchBtn" @click="exit">退会</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;min-height: 400px" max-height="560" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column prop="ModifiedOn" label="退会日期" width="110">
                <template slot-scope="scope">
                    <span v-if="scope.row.ModifiedOn">{{scope.row.ModifiedOn.substring(0,10)}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="BranchName" label="消费商" min-width="130">
                <template slot-scope="scope">
                    <span v-if="scope.row.BranchName">{{scope.row.BranchName}}[{{scope.row.Code}}]</span>
                </template>
            </el-table-column>
             <el-table-column prop="ReferrerName" label="推荐人" min-width="130">
                <template slot-scope="scope">
                    {{scope.row.ReferrerName}}
                    <span v-if="scope.row.ReferrerCode">
                        [{{scope.row.ReferrerCode}}]
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="BranchGradeName" label="代理等级" min-width="80"></el-table-column>
            <el-table-column prop="PhoneNumber" label="联系电话" min-width="80">
                 <template slot-scope="scope">
                    <span v-if="scope.row.PhoneNumber">{{scope.row.PhoneNumber.substring(0,3)+'****'+scope.row.PhoneNumber.substring(7)}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="IDCard" label="身份证号" min-width="150"></el-table-column>
            <el-table-column prop="HospitalName" label="医院" width="200"></el-table-column>
            <el-table-column prop="IsEnable" label="状态" width="100">
                   <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.IsEnable==0">未启用</el-tag>
                    <el-tag type="danger" v-if="scope.row.IsEnable==1">启用</el-tag>
                     <el-tag type="danger" v-if="scope.row.IsEnable==2">退会</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="RefundAmount" label="退会金额" width="100"></el-table-column>
            <el-table-column prop="sawCount" label="操作" min-width="100">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="view(scope.$index,tableData)">详情</el-button>
                    <el-button type="primary" size="small" @click="rebackExit(scope.row)">撤销</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
        <el-dialog title="退会" :visible.sync="dialogFormVisible" size="">
            <el-form :model="form" style="width: 500px;" label-width="110px" :rules="rules" ref="form">
                <el-form-item label="消费商：" class="form_item_mt0" prop="branchObj">
                    <el-select v-model="form.branchObj" filterable remote placeholder="请输入关键词" style="float: none" :remote-method="remoteMethod" :loading="loading">
                        <el-option v-for="item in options" :key="item.code" :label="item.BranchName+'('+item.PhoneNumber+')'" :value="
                                item.BranchName+'|'+item.Code+'|'+item.ReferrerName+'|'+item.ReferrerCode">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="推荐人：" class="form_item_mt0">
                    <span>{{form.ReferrerName}}{{form.ReferrerCode}}</span>
                </el-form-item>
                <el-form-item label="推荐人变更为：" class="form_item_mt0" prop="value">
                    <el-select v-model="form.value" filterable remote placeholder="请输入关键词" style="float: none"
                               :remote-method="remoteMethod" :loading="loading">
                        <el-option v-for="item in options" :key="item.Code" :label="item.BranchName+'('+item.PhoneNumber+')'" :value="item.BranchName+','+item.Code">
                        </el-option>
                    </el-select>
                    <br/>
                    <span style="float: none">请输入推荐人姓名、推荐人编号查找推荐人</span>
                </el-form-item>
                <el-form-item label="退会原因：" class="form_item_mt10" prop="reason">
                    <el-input type="textarea" v-model="form.reason" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="退会金额：" class="form_item_mt0" prop="reason">
                    <el-input  v-model="form.money" style="width: 300px"></el-input>
                </el-form-item>
                <span style="color: red;line-height: 20px !important">退会后，代理人“{{form.branchName}}”关系将被删除，直推代理人将全部迁移至新推荐人。请谨慎操作！</span>
            </el-form>
            <div class="footer_ope">
                <el-button @click="sure('form')" type="primary" :loading="saveLoading">确定</el-button>
                <el-button @click="cancel('form')">取消</el-button>
            </div>
        </el-dialog>

        <el-dialog title="详情" :visible.sync="agentDetail" size="">
            <detail :detailCode="detailCode"  style="width: 920px"></detail>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import {GetBranchByConditions,GetBranchGradeAll,BranchChange,GetChangeLog,GetBranchByKeywords,RevokeBranch} from "@/api/myData"
    import {getCookie} from "@/config/mUtils"
    import detail from "./com/agentDetail.vue"
    import "@/style/selfCommon.less"
    export default {
        // name:"exit",
        data () {
            return {
                saveLoading:false,
                detailCode:"",
                loading:false,
                options:[],
                dialogFormVisible:false,
                agentDetail:false,
                total:0,
                size:10,
                currentPage:1,
                agentList:[],
                formInline:{
                    date1:"",
                    startTime: "",
                    endTime: "",
                    rec:"",
                    grade:"",
                    branch:"",
                },
                tableData:[],
                form:{
                    branchObj:"",
                    ReferrerName:"",
                    ReferrerCode:"",
                    branchName:"",
                    value:"",
                    reason:"",
                    money:"",
                },
                logData:[],
                formMes:{},
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
          watch: {
            "form.branchObj": {
                handler(curVal, oldVal) {
                    if (curVal.length > 0) {
                        this.form.ReferrerName = curVal.split("|")[2]
                        this.form.ReferrerCode = curVal.split("|")[3]
                        this.form.branchName = curVal.split("|")[0]
                        this.form.branchCode = curVal.split("|")[1]
                        this.form.value = this.form.ReferrerName+","+ this.form.ReferrerCode
                    }
                },
                deep: true
            }
        },
        computed: {
            /* 导出报表参数 tHeader,filterVal,tableData1*/
            tHeader(){
                return ["代理编号", '姓名', '代理等级', '联系电话', '身份证号',"推荐人","状态"]
            },
            filterVal(){
                return ['Code', 'BranchName', 'BranchGradeName', 'PhoneNumber', 'IDCard','ReferrerName','IsEnable']
            },
            name(){
                return '退会'
            },
            tableData1(){
                let arr = JSON.parse(JSON.stringify(this.tableData))
                arr.forEach(row=>{
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
        mounted(){
            this.GetBranchGrade()
        },
        methods:{
            rebackExit(data){
                this.$confirm('此操作将撤销退会记录，归还下属会员，确是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.RevokeBranch({
                        id:data.Id
                    })
                })
            },
            async RevokeBranch (params){
                let res = await RevokeBranch(params)
                if(res.status){
                        this.$message({message: '撤销成功',type: 'success'});
                        this.search()
                }else{
                    this.$message.error('操作失败'+res.error);
                    this.$alert(''+res.error, '错误信息', {
                        confirmButtonText: '确定',
                        callback: action => {
                        }
                    });
                }
            },
            async GetBranchByKeywords(params){
                try{
                    let res = await GetBranchByKeywords(params)
                    this.options = res
                }catch(err){
                    console.log(err)
                }
            },
            async GetBranchGrade(){
                try{
                    let res = await GetBranchGradeAll()
                    this.agentList = res
                    // this.search()
                }catch(err){
                    console.log(err)
                }
            },
            async GetBranch(params){
                try{
                    let res = await GetBranchByConditions(params)
                    if(res[0]){
                        this.total = res[0].RecordCount
                    }
                    this.tableData = res
                }catch(err){
                    console.log(err)
                }
            },
//            迁移记录
            async GetChangeLog(params){
                try{
                    let res = await GetChangeLog(params)
                    this.logData = res
                }catch(err){
                    console.log(err)
                }
            },
//            迁移操作
            async BranchChange(params){
                try{
                    this.saveLoading = true
                    let res = await BranchChange(params)
                    if(res.success){
                        this.$message({
                            message: '退会成功',
                            type: 'success'
                        });
                        this.dialogFormVisible = false
                        this.search()
                    }else{
                        this.$message.error('操作失败'+res.error);
                        this.$alert(''+res.error, '错误信息', {
                            confirmButtonText: '确定',
                            callback: action => {

                            }
                        });
                    }
                    this.saveLoading = false
                }catch(err){
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
            dateForm1(val){
                if(val){
                    val = val.formatDates()
                    this.formInline.startTime = val.substring(0,10)
                    this.formInline.endTime = val.substring(13)
                }else{
                    this.formInline.startTime = ""
                    this.formInline.endTime = ""
                }
                this.onSubmit()
            },
            onSubmit(){
                this.currentPage = 1
                this.search()
            },
            search(){
                this.GetBranch({
                    referrerName:this.formInline.rec,
                    branchName:this.formInline.branch,
                    branchGradeCode:this.formInline.grade,
                    startDate:this.formInline.startTime,
                    endDate:this.formInline.endTime,
                    pageIndex:this.currentPage,
                    pageSize:this.size,
                    IsEnable:2
                })
            },
            exit(){
                this.reset()
                this.dialogFormVisible = true
            },
            dialogOpe(index,ope){
                this.dialogFormVisible[index] = ope
                this.dialogFormVisible.push()
            },
            remoteMethod(query) {
                if (query !== '') {
                    this.loading = true;
                    setTimeout(() => {
                        this.loading = false;
                        this.GetBranchByKeywords({
                            keyWords:query.removeSP()
                        })
                    }, 200);
                } else {
                    this.options = [];
                }
            },
            sure(formName){
                 this.$refs[formName].validate((valid) => {
                        if (valid) {
                            let obj={
                                IsEnable:"2",//1表示不退会 2表示退会
                                branchCode: this.form.branchCode,
                                branchName: this.form.branchName,
                                refCode:this.form.value.split(",")[1],
                                refName:this.form.value.split(",")[0],
                                RefundAmount:this.form.money,
                                changeReason:this.form.reason,
                                operatorName:getCookie("userName")
                            }
                            this.BranchChange(obj)
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
            },
            cancel(){
                this.dialogFormVisible = false
            },
            reset(){
                for(var p in this.form){
                    this.form[p] = ""
                }
            },
            view(index,data){
                 this.detailCode = data[index].Code
                this.agentDetail = true
            },
            print(){
                  if (confirm('确定打印吗？')) {
                      
                    var newstr = document.all.item('print').innerHTML;
                    var oldstr = document.body.innerHTML
                    document.body.innerHTML = newstr
                    window.print();
                    window.location.reload();
                    document.body.innerHTML = oldstr
                    return false;
                    }
            }
        },
        components: {
            detail
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
