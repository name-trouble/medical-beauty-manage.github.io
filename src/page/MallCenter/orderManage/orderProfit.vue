<template>
    <div class="selCommon projectOrder">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px" >
            <el-form-item label="申请时间："  class="form_item_mt10 ">
                <el-date-picker v-model="date1" @change="dateForm1" type="daterange" placeholder="选择日期范围" class="form_item_ipt220"></el-date-picker>
            </el-form-item>
            <el-form-item label="关键字：" class="form_item_mt10 form_item_wh280">
                <el-input v-model="formInline.keywords" placeholder="APP昵称/手机号" class="form_item_ipt220" :maxlength=10000 v-on:keyup.enter.native="onSubmit"></el-input>
            </el-form-item>

            <el-form-item label="销售公司："  class="form_item_mt10 form_item_wh280">
                <el-select v-model="formInline.branch" placeholder="" style="width: 200px;" @change="submit">
                    <el-option v-for="item in branchList" :key="item.branchName" :label="item.branchName" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <br/>
            <el-form-item label=" " class="form_item_mt10 form_item_wh280">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
                <Export ref="exportCom" :tHeader="tHeader" :filterVal=' filterVal' :tableData1='tableData1' :name='name' style="display:none"></Export>
                <el-button class="searchBtn" @click="exportData">导出报表</el-button>
            </el-form-item>
        </el-form>
        <!--信息表-->
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" class="min_table" max-height="600px" :summary-method="getSummaries" show-summary>
            <el-table-column prop="benefitName" label='APP昵称' min-width="90"></el-table-column>
            <el-table-column prop="benefitGradeName" label='客户等级' min-width="90">
                <template slot-scope="scope">
                    <span>{{scope.row.typeCode|filterFun}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="mobile" label="手机号" min-width="80"></el-table-column>
            <el-table-column prop="branchName" label="最近代理商" min-width="80"></el-table-column>
            <el-table-column prop="realAmount" label="累计收益" min-width="80" align="right"></el-table-column>
            <el-table-column prop="extFee" label="手续费" min-width="80" align="right"></el-table-column>
            <el-table-column prop="usedAmount" label="已提现" min-width="80" align="right">
                <template slot-scope="scope">
                    <el-button @click="viewDet(scope.row,1,2)" type="text" size="small"> {{scope.row.usedAmount?scope.row.usedAmount:''}}</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="transAmount" label="待提现" min-width="80" align="right">
                <template slot-scope="scope">
                    <el-button @click="viewDet(scope.row,1,1)" type="text" size="small"> {{scope.row.transAmount?scope.row.transAmount:''}}</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="grade" label="操作" min-width="100" align="center">
                <template slot-scope="scope">
                    <el-button @click="viewDet(scope.row,2)" type="primary" size="small"> 查看收益明细</el-button>
                </template>
            </el-table-column>
        </el-table>
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
        <el-dialog size="" :visible.sync="dialogVisible" title="收益记录" top="20%">
            <el-table :data="detData" border style="width: 900px;margin-top:15px;margin-bottom:10px;" class="min_table" v-loading="detLoading">
                <el-table-column prop="customerName" label='客户' min-width="90"></el-table-column>
                <el-table-column prop="subOrderCode" label="订单编号" min-width="80" align="center"></el-table-column>
                <el-table-column prop="createDate" label="订单日期" min-width="100" show-overflow-tooltip></el-table-column>
                <el-table-column prop="goodsName" label="项目名称" min-width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="price" label="订单金额" min-width="80" align="right"></el-table-column>
                <el-table-column prop="realAmount" label="奖励金额" min-width="80" align="right"></el-table-column>
                <el-table-column prop="status" label="发放状态" min-width="80" align="right"></el-table-column>
            </el-table>
            <div class="block" style="margin-bottom:20px;">
                <el-pagination
                    @size-change="handleSizeChange1"
                    @current-change="handleCurrentChange1"
                    :current-page="detPageIndex"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="detPageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="detTotal">
                </el-pagination>
            </div>
        </el-dialog>

        <el-dialog size="" :visible.sync="putDialog" title="申请记录" top="20%">
            <el-table :data="detData" border style="width: 1000px;margin-top:15px;margin-bottom:10px;" class="min_table" v-loading="detLoading">
                <el-table-column prop="createOn" label="申请日期" min-width="110">
                    <template slot-scope="scope">
                        <span v-if="scope.row.createOn">{{scope.row.createOn.substring(0,10)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="realName" label="申请人" min-width="100"></el-table-column>
                <el-table-column prop="mobile" label="手机号" min-width="100"></el-table-column>
                <el-table-column prop="applyAmount" label="申请提现金额" min-width="100"></el-table-column>
                <el-table-column prop="extFee" label="手续费" min-width="100"></el-table-column>
                <el-table-column prop="recevieAmount" label="到账金额" min-width="100"></el-table-column>
                <el-table-column prop="status" label="状态" min-width="100" align="center">
                    <template slot-scope="scope">
                        <el-tag type="gray" v-if="scope.row.applyStatus == 1">未审核</el-tag>
                        <el-tag type="success" v-if="scope.row.applyStatus == 2">已审核</el-tag>
                        <el-tag type="danger" v-if="scope.row.applyStatus == 3">拒绝</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="modifiedOn" label="审核时间" min-width="100">
                    <template slot-scope="scope">
                        <span>{{scope.row.modifiedOn == scope.row.createOn?'':scope.row.modifiedOn}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="memo" label="备注" min-width="150" show-overflow-tooltip></el-table-column>
            </el-table>
            <div class="block" style="margin-bottom:20px;">
                <el-pagination
                    @size-change="handleSizeChange1"
                    @current-change="handleCurrentChange1"
                    :current-page="detPageIndex"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="detPageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="detTotal">
                </el-pagination>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
import "@/style/selfCommon.less"
import Export from '@/components/export'
// import orderDet from './com/orderDet'
import {ApproveCashApply,GetDropDownPermission,GetMemberConsume, GetMemberConsumeDetail,GetCashApplyListByUser} from "@/api/myData"
import { getCookie, getStore } from '../../../config/mUtils';
export default {
        // name:"projectOrder",
        data () {
            return {
                date1:'',
                detLoading:false,
                dialogVisible:false,
                putDialog:false,
                currentIndex:0,
                formInline:{
                    startTime:"",
                    endTime:"",
                    keywords:"",
                    name:"",
                    rec:"",
                    customer:"",
                    hospital:"",
                    branch:'',
                    status:'',
                },
                tableData:[],
                currentPage:1,
                size:10,
                total:0,

                hospitalList:[],
                branchList:[],

                allData:[],
                sumdata:{
                    realAmount:0,
                    usedAmount:0,
                },
                viewData:{},
                detData:[],
                detAllData:[],
                detPageIndex:0,
                detPageSize:10,
                detTotal:0,
            }
        },
        computed: {
            /* 导出报表参数 tHeader,filterVal,tableData1*/
            tHeader(){
                return ['会员','客户等级','手机号','最近代理商','累计收益','手续费','已提现','未提现']
            },
            filterVal(){
                return ['benefitName','typeCode', 'mobile','branchName', 'realAmount',  'extFee', 'usedAmount','transAmount']
            },
            tableData1(){
                let data = JSON.parse(JSON.stringify(this.allData))
                data.forEach(ele=>{
                    ele.typeCode = this.getStatus(ele.typeCode)
                })
                return data
            },
            name(){
                return '订单收益'
            },
            /*导出报表参数 tHeader,filterVal,tableData1*/
        },
        filters:{
            filterFun(val){
                switch(val){
                    case '02':return '代理商';
                    case '04':return '会员';
                    case '06':return '线上app会员';
                }
            }
        },
        mounted(){
            this.getHospital()
        },
        methods: {
            getStatus(status){
                switch(val){
                    case '02':return '代理商';
                    case '04':return '会员';
                    case '06':return '线上app会员';
                }
            },
            async GetCashApplyListByUser(){
                let res = await GetCashApplyListByUser({
                    "benefitId": this.viewData.benefitId,
                    'applyStatus':this.viewData.status,
                })
                this.detLoading = false
                this.detAllData = res.data
                this.detTotal = res.count
                this.getPageData()
            },
            getSummaries(param) {
                return ['总合计：','','','',this.sumdata.realAmount,this.sumdata.extFee,this.sumdata.usedAmount,this.sumdata.transAmount];
            },
            viewDet(data,ope,status){
                this.detPageIndex = 1
                this.detPageSize = 10
                this.detTotal = 0
                this.detData = []
                this.detAllData = []
                this.viewData = data
                this.viewData.status = status
                this.detLoading = true
                if(ope == 1){
                    this.putDialog = true
                    this.GetCashApplyListByUser()
                }else{
                    this.dialogVisible = true
                    this.getDetData()
                }
            },
            async getDetData(){
                let res = await GetMemberConsumeDetail({
                    'pageIndex': this.detPageIndex,
                    'pageSize': this.detPageSize,
                    "topBranchCode": this.formInline.branch,
                    "benefitId": this.viewData.benefitId,
                    'Keyword':this.formInline.keywords,
                    "startDate": this.formInline.startTime,
                    "endDate": this.formInline.endTime,
                })
                this.detLoading = false
                this.detAllData = res.data
                this.detTotal = res.count
                this.getPageData()
            },

            getPageData(){
                this.detData = this.detAllData.slice((this.detPageIndex-1)*this.detPageSize,this.detPageIndex*this.detPageSize)
            },
            
            async approveStatus(params){
                let res = await ApproveCashApply(params)
                if(res.status){
                    this.$message({message: '操作成功', type: 'success'});
                    this.search()
                }else{
                    this.$message.error('操作失败!'+res.errorMessage)
                }
            },
            
            exportData(){
                this.GetMemberConsume({
                    pageIndex: 1,
                    pageSize: this.total,
                    "topBranchCode": this.formInline.branch,
                    "benefitId": "",
                    Keyword:this.formInline.keywords,
                    "startDate": this.formInline.startTime,
                    "endDate": this.formInline.endTime,
                },1)
            },
            async getHospital(){
                let [res, res1] = await Promise.all([GetDropDownPermission({typeId: 1}),GetDropDownPermission({typeId: 2})])
                this.hospitalList = res.data
                this.formInline.hospital = this.hospitalList[0].code
                this.branchList = res1.data
                this.formInline.branch = this.branchList[0].code
            },
            
            closeReport(val){
                this.dialogVisible = false
                if(val){
                    this.search()
                }
            },
//            退款
            async OnlineOrderRefund(params){
                try{
                    let res = await ConfirmRefund(params)
                    if(res.status){
                        this.$message({message: '退款成功', type: 'success'});
                        this.search()
                    }else{
                        this.$message.error('退款失败!'+res.errorMessage)
                    }
                }catch(err){
                    this.$message.error('退款失败')
                }
            },
            submit(){
                this.pageIndex = 1
                this.search()
            },
            async GetMemberConsume(params,ope){
                try {
                    let res = await GetMemberConsume(params)
                    if(ope){
                        this.allData = res.data
                        this.$refs.exportCom.handleDownload()
                    }else{
                        this.total = res.count
                        this.tableData = res.data
                        this.sumdata = res.sumdata[0]
                    }
                } catch (err) {
                    console.log(err)
                }
            },
            // dealData(data){
            //     data.forEach(row=>{
            //         row.Surplus =  row.OrderAmount - row.RealAmount
            //     })
            //     return data
            // },
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
                this.GetMemberConsume({
                    "topBranchCode": this.formInline.branch,
                    "benefitId": "",
                    'pageIndex': this.currentPage,
                    'pageSize': this.size,
                    "keywords": this.formInline.keywords,
                    "startDate": this.formInline.startTime,
                    "endDate": this.formInline.endTime,
                })
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

            // 弹窗分页
            handleSizeChange1(val) {
                console.log(`每页 ${val} 条`);
                this.detPageSize = val
                this.getPageData()
            },
            handleCurrentChange1(val) {
                console.log(`当前页: ${val}`);
                this.detPageIndex = val
                this.getPageData()
            },
        },
        components: {
            // orderDet,
            Export
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
