<template>
    <div class="tag selCommon">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="100px">
            <el-form-item label="日期：" class="form_item_mt10">
                <el-date-picker
                    v-model="date"
                    style="width: 200px;"
                    type="daterange"
                    @change="dateChange"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="用户：" class="form_item_mt10">
                <el-input v-model="formInline.name" placeholder="用户名" style="width: 200px;" v-on:keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            <el-form-item label="手机号：" class="form_item_mt10">
                <el-input v-model="formInline.mobile" placeholder="手机号" style="width: 200px;" v-on:keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            <el-form-item label="等级：" class="form_item_mt10">
                <el-select v-model="formInline.grade"  style='width:200px;'>
                    <el-option v-for="(item,index) in gradeList" :key="index" :label="item.gradeName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="团队消费业绩：" class="form_item_mt10">
                <el-select v-model="formInline.teamAch"  style='width:88px;margin-right:10px;'>
                    <el-option label="大于" value="1"></el-option>
                    <el-option label="小于" value="0"></el-option>
                </el-select>
                <el-input v-model="formInline.teamAchieve" placeholder="" style="width: 100px;"></el-input>
            </el-form-item>
            <el-form-item label="团队人数：" class="form_item_mt10">
                <el-select v-model="formInline.teamNum"  style='width:88px;margin-right:10px;'>
                    <el-option label="大于" value="1"></el-option>
                    <el-option label="小于" value="0"></el-option>
                </el-select>
                <el-input v-model="formInline.teamNumber" placeholder="" style="width: 100px;"></el-input>
            </el-form-item>
            <el-form-item label="" class="form_item_mt10">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
                <!-- <el-button type="primary" @click="makeSumData" class="searchBtn" :loading="makeLoading1">生成分享汇总数据</el-button>
                <el-button type="primary" @click="makeAchData" class="searchBtn" :loading="makeLoading2">生成分享业绩数据</el-button> -->
                <!-- <Export :tHeader="tHeader" ref="exportTable" :filterVal=' filterVal' :tableData1='tableData1' :name='name' ></Export> -->
            </el-form-item>
        </el-form>
        <!-- 信息表 -->
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" max-height="560"  :summary-method="getSummaries"
            show-summary class="smt min_table" v-loading="loading">
            <el-table-column prop="userCode" label="用户Id" min-width="90"></el-table-column>
            <el-table-column prop="userName" label="用户名" min-width="90"></el-table-column>
            <el-table-column prop="gradeName" label="等级" min-width="90" align="center"></el-table-column>
            <el-table-column prop="userMobile" label="手机号" min-width="90"></el-table-column>
            <el-table-column prop="onlineAmounts" label="团队消费业绩" min-width="90" align="right">
                <template slot-scope="scope">
                    <el-button type="text" @click="showAch(scope.row,5,'下单时间','下单量')">{{scope.row.onlineAmounts}}</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="receives" label="团队人数" min-width="90" align="right">
                <template slot-scope="scope">
                    <el-button type="text"  @click="showAch(scope.row,3,'领取时间','团队人数')">{{scope.row.receives}}</el-button>
                    <!-- <span v-else>0</span> -->
                </template>
            </el-table-column>
            
            <el-table-column prop="extractRatio" label="提成比例%" min-width="90">
                <template slot-scope="scope">
                    <el-button type="text" v-if="scope.row.extractRatio!=null">{{scope.row.extractRatio}}%</el-button>
                </template>
            </el-table-column>
            
            <!-- <el-table-column prop="quantityOut" label="操作" min-width="90" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="changeGrade(scope.row)">修改等级</el-button>
                </template>
            </el-table-column> -->
        </el-table>
        <!-- 信息表 -->
        <!-- 分页 -->
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
        <!-- 分页 -->

        <el-dialog title="修改等级" :visible.sync="addGrade" size="">
            <el-form :model="ruleForm" ref="ruleForm2" label-width="80px" class="demo-ruleForm">
                <el-form-item label="等级" prop="pass" class="form_item_mt10">
                    <el-select v-model="ruleForm.grade"  style='width:200px;'>
                        <el-option v-for="(item,index) in gradeList" :key="index" :label="item.gradeName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="优先级" prop="checkPass" class="form_item_mt10">
                    <span>{{ruleForm.priorities}}</span>
                </el-form-item>
                <el-form-item label="提成比例" prop="age" class="form_item_mt10">
                   <span>{{ruleForm.extractRatio}}</span> %
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
         <el-dialog :title="title" :visible.sync="dialogAch" size=''>
            <dialogTbale v-if="dialogAch" :dialogMes="editMes" style="width:900px;"></dialogTbale>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import {baseImgPath} from "@/config/env"
    import  "@/style/selfCommon.less"
    import dialogTbale from '../components/dialog.vue'
    import { getCookie, delCookie } from '@/config/mUtils'
    import {GetDropDownPermission,GetWarehouse,GetStockTicket,GetPerformances,GetGradeList,ModifyUserGrade,
    GenerateSharePerformances,GenerateShareSummaries} from "@/api/myData"
    // import Export from '@/components/export'
    export default {
        data () {
            return {
                date:"",
                dialogAch:false,
                loading:false,
                title:"",
                addGrade:false,
                total:0,
                size:10,
                currentPage:1,
                formInline: {
                    teamAch:'',
                    teamAchieve:'',
                    teamNum:'',
                    teamNumber:'',
                    startDate:"",
                    endDate:"",
                    mobile: '',
                    name:"",
                    grade:'',
                },
                tableData:[],
                gradeList:[],
                ruleForm:{
                    'grade':"",
                    "gradeName": "",
                    "priorities": "",
                    "extractRatio": 0,
                },
                makeLoading1:false,
                makeLoading2:false,
                editMes:{},
                totalData:{},
            }
        },
        computed: {
            /* 导出报表参数 tHeader,filterVal,tableData1*/
            // tHeader(){
            //     return ['仓库', '卡券名称', '前缀', '入库总数', '出库总数', '库存数量']
            // },
            // filterVal(){
            //     return ['warehouseName', 'batchNumber', 'ticketName', 'ticketPrefixCode', 'quantityIn','quantityOut','remainingCount']
            // },
            // tableData1(){
            //     return this.allData
            // },
            // name(){
            //     return '卡券库存'
            // },
            /*导出报表参数 tHeader,filterVal,tableData1*/
        },
        watch:{
            "ruleForm.grade":{
                handler(curVal,oldVal){
                    this.gradeList.forEach(ele=>{
                        
                        if(curVal==ele.id){
                            this.ruleForm.priorities = ele.priorities
                            this.ruleForm.extractRatio = ele.extractRatio
                        }
                    })
                },
                deep:true
            }
        },
        mounted(){
            let date= new Date()
            date = date.setDate(1)
            this.date = [date,new Date()]
            this.GetGradeList()
        },
        methods:{
            getSummaries(param) {
                return ['总合计','','','',this.totalData.onlineAmounts,this.totalData.receives,''];
            },
           showAch(data,type,label,title){
               this.title = title
                this.editMes = data
                this.editMes.type = type
                this.editMes.label = label
                this.dialogAch = true
           },
            
            submitForm(formName){
               this.ModifyUserGrade({
                    "userId": this.editMes.userCode,
                    "gradeId": this.ruleForm.grade,
                    "submitUserId": getCookie("userId"),
                    "submitUserName": getCookie("userName"),
               })
            },
            resetForm(formName){
                this.ruleForm = {
                    grade:"",
                    "gradeName": "",
                    "priorities": "",
                    "extractRatio": 0,
                }
            },
            dateChange(val){
                if(val){
                    val = val.formatDates()
                    this.formInline.startDate = val.substring(0,10)
                    this.formInline.endDate = val.substring(13)
                }else{
                    this.formInline.startDate = ""
                    this.formInline.endDate = ""
                }
            },

            async GetGradeList(){
                let res = await GetGradeList()
                this.gradeList = res.data
            },
           
            async GetPerformances(params,ope){
                try{
                    this.loading = true
                    let res = await GetPerformances(params)
                    
                    if(res.status){
                        this.totalData = res.data[0].userCode?res.data.pop():res.data.shift()
                        this.tableData = res.data
                        this.total = res.count
                    }else{
                        this.$message.error("查询失败，"+res.errorMessage);
                    }
                    this.loading = false
                    
                }catch(err){
                    console.log(err)
                }
            },
            
            onSubmit(){
                this.currentPage = 1
                this.search()
            },
            search(){
                this.GetPerformances({
                    pageIndex: this.currentPage,
                    pageSize: this.size,
                    Date1:this.formInline.startDate,
                    Date2:this.formInline.endDate,
                    Name:this.formInline.name,
                    mobile:this.formInline.mobile,
                    grade:this.formInline.grade,
                })
            },
            handleSizeChange(val) {
                this.size = val
                this.search()
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.search()
            },
            changeGrade(data){
                this.editMes = data
                this.addGrade = true
                this.ruleForm.grade = data.gradeId?data.gradeId:''
                // this.ModifyUserGrade({
                //     "userId": data.Id,
                //     "gradeId": 1,
                //     "submitUserId": 1,
                //     "submitUserName": "sample string 1",
                // })
            },
            async ModifyUserGrade(params){
                let res = await ModifyUserGrade(params)
                if(res.status){
                    this.$message({message: mes+'成功',type: 'success'});
                    this.search()
                }else{
                    this.$message.error("修改失败，"+res.errorMessage);
                }
            },
            
        },
        components: {
            // Export,
            dialogTbale
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
