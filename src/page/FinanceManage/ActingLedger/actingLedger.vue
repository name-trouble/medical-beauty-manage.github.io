<template>
    <div class="actingLedger selCommon">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px" >
            <el-form-item label="结算日期："  class="form_item_mt10 ">
                <!-- <el-date-picker v-model="formInline.date" @change="dateForm1" type="daterange" placeholder="选择日期范围" class="wt200"></el-date-picker> -->
                    <el-select v-model="year" placeholder="选择年份" style="width:100px;float:left">
                        <el-option v-for="(item,index) in yearList" :key="index" :label="item" :value="item"></el-option>
                    </el-select>
                    <el-select v-model="month" placeholder="选择月份" style="width:100px;float:left">
                        <el-option v-for="(item,index) in monthList" :key="index" :label="item" :value="item"></el-option>
                    </el-select>
            </el-form-item>
            <!-- <el-form-item label="医院："  class="form_item_mt10 form_item_wh280">
                  <el-select v-model="formInline.Hospital" placeholder="" style="width: 200px;">
                      <el-option v-for="(item,index) in HospitalList" :key="item.code" :label="item.supplierName" :value="item.code"></el-option>
                  </el-select>
              </el-form-item> -->
            <!-- <el-form-item label="销售公司："  class="form_item_mt10 form_item_wh280">
                <el-select v-model="formInline.branch" placeholder="" style="width: 200px;">
                    <el-option v-for="(item,index) in branchList" :key="item.branchName" :label="item.branchName" :value="item.code"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="转入客户："  class="form_item_mt10 form_item_wh280">
                <el-select v-model="formInline.type" placeholder="" style="width: 200px;" @change="change">
                    <el-option label="全部" value=""></el-option>
                    <!-- <el-option label="医院" value="1"></el-option> -->
                    <el-option label="销售公司" value="2"></el-option>
                    <el-option label="消费商" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="医院："  class="form_item_mt10 form_item_wh280" v-if="formInline.type == 1">
                <el-select v-model="formInline.keywords" placeholder="" style="width: 200px;">
                    <el-option v-for="item in HospitalList" :key="item.code" :label="item.supplierName" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="销售公司："  class="form_item_mt10 form_item_wh280" v-if="formInline.type == 2">
                <el-select v-model="formInline.keywords" placeholder="" style="width: 200px;">
                    <el-option v-for="item in branchList" :key="item.code" :label="item.branchName" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="关键字："  class="form_item_mt10 form_item_wh280" v-if="formInline.type == 3">
                <el-input v-model="formInline.keywords" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item label=" " class="form_item_mt10 form_item_wh280">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
                <Export :tHeader="tHeader" :filterVal=' filterVal' :tableData1='tableData1' :name='name'></Export>
            </el-form-item>
        </el-form>
        <!-- 信息表 -->
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" class="smt min_table" max-height="660" v-loading="tableLoading" show-summary :summary-method="getSummaries">
            <!-- <el-table-column prop="branchName" label="结算日期" min-width="120">
                <template slot-scope="scope">
                    <span>{{scope.row.branchName}}</span>
                </template>
            </el-table-column> -->
            <el-table-column prop="branchName" label="客户" min-width="120">
                <template slot-scope="scope">
                    <span>{{scope.row.branchName}}</span><br/>
                    <span>[{{scope.row.branchCode}}]</span>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="province" label="银行卡" min-width="120"></el-table-column> -->
            <el-table-column prop="branchGradeName" label="等级" min-width="100"></el-table-column>
            <el-table-column prop="recA" label="推荐提成" min-width="120" align="right">
                <template slot-scope="scope">
                    <span v-if="scope.row.recA">￥{{scope.row.recA.toQFW()}}</span>
                    <span v-else>￥0</span>
                </template>
            </el-table-column>
            <el-table-column prop="consumeOrderAmount" label="消费提成" min-width="120"  align="right">
                <template slot-scope="scope">
                    <span v-if="scope.row.consumeA">￥{{scope.row.consumeA.toQFW()}}</span>
                    <span v-else>￥0</span>
                </template>
            </el-table-column>
            <el-table-column prop="debitAmount" label="补扣款" min-width="120"  align="right">
                <template slot-scope="scope">
                    <span v-if="scope.row.debitAmount">￥{{scope.row.debitAmount.toQFW()}}</span>
                    <span v-else>￥0</span>
                </template>
            </el-table-column>
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
    </div>
</template>

<script type="text/ecmascript-6">
    import "@/style/selfCommon.less"
    import Export from '@/components/export'
    import {GetBranchGradeAll,GetDropDownPermission,GetBranchFinanceSummary} from "@/api/myData"
    export default {
        // name:"actingLedger",
        data () {
            return {
                tableLoading:false,
                size:10,
                total:0,
                currentPage:1,
                agentList:[],
                tableData:[],
                allData:[],
                HospitalList:[],
                branchList:[],
                formInline: {
                    Hospital:"",
                    branch:"",
                    date:"",
                    startTime: "",
                    endTime: "",
                    type:'',
                    branch:"",
                    keywords:"",
                },
                year:(new Date).getFullYear(),
                month:"",
                yearList:[],
                monthList:[],
                sum:{
                    systemPointsTotal:0,
                    pointAmount:0,
                    remainSystemPoints:0,
                    cardCount:0,
                    cardAmount:0,
                    conAmount:0,
                    consumeOrderAmount:0,
                    unConsumeOrderAmount:0,
                    recAmount:0,
                    recomAmount:0,
                    unRecomAmount:0,
                    debitAmount:0,
                }
            }
        },
        computed: {
            /* 导出报表参数 tHeader,filterVal,tableData1*/
            tHeader(){
                return ['客户','等级','推荐提成','消费提成','补扣款']
            },
            filterVal(){
                return ['branchName', 'branchGradeName', 'recA', 'consumeA', 'debitAmount']
            },
            tableData1(){
                return this.allData
            },
            name(){
                return '消费提成'
            },
            /*导出报表参数 tHeader,filterVal,tableData1*/
        },
        mounted(){
            this.getBaseDate()
            this.GetDropDownPermission()
        },
        methods: {
            change(){
                this.formInline.keywords = ""
            },
            getBaseDate(){
                this.yearList = [new Date().getFullYear()+1,new Date().getFullYear(),new Date().getFullYear()-1,new Date().getFullYear()-2]
                for(let i = 1 ;i<13;i++){
                    if(i<10){
                        this.monthList.push("0"+i)
                    }else{
                        this.monthList.push(i)
                    }
                }
                
                let m = new Date().getMonth()
                if(m>9){
                    this.month = m
                }else{
                    if(m == 0){
                        this.year = new Date().getFullYear()-1
                        this.month = 12
                    }else{
                        this.month = "0"+m
                    }
                }
            },
            async GetDropDownPermission(){
                try {
                    let res0 = await GetDropDownPermission({typeId:2})
                    this.branchList = res0.data
                    let res1 = await GetDropDownPermission({typeId:1})
                    this.HospitalList = res1.data
                } catch (err) {
                    console.log(err)
                }
            },
            handleSizeChange(val) {
                this.size = val
                this.pageChange()
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.pageChange()
            },
            onSubmit(){
                this.currentPage = 1
                for(var key in this.sum){
                    this.sum[key] = 0
                }
                this.GetBranchFinanceSummary()
            },
           
            async GetBranchFinanceSummary(){
                this.tableLoading = true
                let res = await GetBranchFinanceSummary({
                    Keywords:this.formInline.keywords,
                    // HospitalId:this.formInline.Hospital,
                    TypeId:this.formInline.type,
                    CommissionDate:this.year+'-'+this.month,
                })
                if(res.status){
                    // this.tableData = res.data
                    res.data.forEach(row=>{
                        for(var key in row){
                            if(row[key] == null){
                                row[key] = 0
                            }
                        }
                        row.recAmount = row.recomAmount.add(row.unRecomAmount)
                        row.conAmount = row.unConsumeOrderAmount.add(row.consumeOrderAmount)
                    })
                    this.allData = res.data
                    this.total = res.count
                    this.getTotal()
                    this.pageChange()
                }else{
                    this.$message.error('查询失败')
                }
                this.tableLoading = false
            },
            getSummaries(param) {
                return ["总合计",'',this.sum.recomAmount.toQFW(),this.sum.consumeOrderAmount.toQFW(),this.sum.debitAmount.toQFW()];
            },
            pageChange(){
                this.tableData = this.allData.slice((this.currentPage-1)*this.size,this.currentPage*this.size)
            },
            getTotal(){
                this.allData.forEach(row=>{
                    
                    row.recA = row.unRecomAmount.add(row.recomAmount)
                    row.consumeA = row.unConsumeOrderAmount.add(row.consumeOrderAmount)
                    // this.sum.systemPointsTotal = this.sum.systemPointsTotal.add(row.systemPointsTotal)
                    // this.sum.pointAmount = this.sum.pointAmount.add(row.pointAmount)
                    // this.sum.remainSystemPoints = this.sum.remainSystemPoints.add(row.remainSystemPoints)
                    // this.sum.cardCount = this.sum.cardCount.add(row.cardCount)
                    // this.sum.cardAmount = this.sum.cardAmount.add(row.cardAmount)
                    // this.sum.conAmount = this.sum.conAmount.add(row.conAmount)
                    // this.sum.consumeOrderAmount = this.sum.consumeOrderAmount.add(row.consumeOrderAmount)
                    // this.sum.unConsumeOrderAmount = this.sum.unConsumeOrderAmount.add(row.unConsumeOrderAmount)
                    // this.sum.recAmount = this.sum.recAmount.add(row.recAmount)
                    this.sum.recomAmount = this.sum.recomAmount.add(row.recA)
                    // this.sum.unRecomAmount = this.sum.unRecomAmount.add(row.unRecomAmount)
                    this.sum.consumeOrderAmount = this.sum.consumeOrderAmount.add(row.consumeA)
                    this.sum.debitAmount = this.sum.debitAmount.add(row.debitAmount)
               })
            },
        },
        components: {
            Export
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form_item_mt10{
    margin-right: 0;
}
</style>
