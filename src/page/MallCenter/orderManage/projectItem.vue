<template>
    <div class="selCommon projectOrder">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px" >
            <el-form-item label="订单时间："  class="form_item_mt10 ">
                <el-date-picker v-model="date1" @change="dateForm1" type="daterange" placeholder="选择日期范围" class="form_item_ipt220"></el-date-picker>
            </el-form-item>
            <el-form-item label="关键字：" class="form_item_mt10 form_item_wh280">
                <el-input v-model="formInline.fxCode" placeholder="" class="form_item_ipt220" :maxlength=10000 v-on:keyup.enter.native="onSubmit"></el-input>
            </el-form-item>

            <el-form-item label="医院：" class="form_item_mt10 form_item_wh280">
                <el-select v-model="formInline.hospital"  class="form_item_ipt220" @change="onSubmit">
                    <el-option v-for="(item,index) in hospitalList" :key="index" :label="item.supplierName" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label=" " class="form_item_mt10 form_item_wh280">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
                <Export ref="exportCom" :tHeader="tHeader" :filterVal=' filterVal' :tableData1='tableData1' :name='name' style="display:none"></Export>
                <el-button class="searchBtn" @click="exportData">导出报表</el-button>
            </el-form-item>
        </el-form>

        <!--信息表-->
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" max-height="500" class="min_table smt" show-summary>
            <el-table-column prop="projectName" label="项目" min-width="100"></el-table-column>
            <el-table-column prop="consultingCount" label="咨询人数" min-width="100"></el-table-column>
            <el-table-column prop="dealCount" label="成交人数" min-width="100"></el-table-column>
            <el-table-column prop="noDealCount" label="未成交人数" min-width="100">
                <template slot-scope="scope">
                    <span>{{scope.row.noDealCount}}</span>
                </template>
            </el-table-column>

            <el-table-column prop="projectName" label="成交率" min-width="80">
                <template slot-scope="scope">
                    <span>{{scope.row.dealRate}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="projectName" label="成交客单价" min-width="120">
                <template slot-scope="scope">
                    <span>{{scope.row.customerPrice}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="orderAmount" label="合计成交业绩" min-width="80"></el-table-column>
            <el-table-column prop="firstCount" label="初诊人数" min-width="80"></el-table-column>
            <el-table-column prop="secondCount" label="复诊人数" min-width="80"></el-table-column>
            <el-table-column prop="checkCount" label="复查人数" min-width="80"></el-table-column>
            <el-table-column prop="consumeCount" label="再消费人数" min-width="80"></el-table-column>
            <el-table-column prop="otherCount" label="其他" min-width="80"></el-table-column>
        </el-table>
        <!-- 分页 -->
        <!-- <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div> -->
        <!-- 分页 -->
    </div>
</template>

<script type="text/ecmascript-6">
import "@/style/selfCommon.less"
import Export from '@/components/export'
import {GetDropDownPermission,OrderProjectReport} from "@/api/myData"
import { getCookie, getStore } from '../../../config/mUtils';
export default {
        // name:"projectOrder",
        data () {
            return {
                date1:'',
                formInline:{
                    startTime:"",
                    endTime:"",
                    fxCode:"",
                    name:"",
                    rec:"",
                    customer:"",
                    hospital:"",
                    branch:'',
                    // status:'',
                    payType:'',
                    status:[],
                    statusMes:'全部',
                },
                tableData:[],
                currentPage:1,
                size:10,
                total:0,
                hospitalList:[],
                allData:[],
            }
        },
        computed: {

            /* 导出报表参数 tHeader,filterVal,tableData1*/
            tHeader(){
                return ['项目','咨询人数', '成交人数','未成交人数','成交率','客单价','合计成交业绩','初诊人数','复诊','复查人数','再消费','其他']
            },
            filterVal(){
                return ['projectName',  'consultingCount', 'dealCount','noDealCount', 'dealRate','customerPrice', 'orderAmount', 'firstCount', 'secondCount','checkCount','consumeCount','otherCount']
            },
            tableData1(){
                let data = JSON.parse(JSON.stringify(this.allData))
                data.forEach(ele=>{
                    ele.activityTypes = this.getTypeName(ele.activityTypes)
                    ele.status = this.getStatus(ele.status)
                })
                return data
            },
            name(){
                return '品项'
            },
            /*导出报表参数 tHeader,filterVal,tableData1*/
        },
        
        mounted(){
            let date = new Date()
            date.setDate("01")
            this.date1 = [date,new Date()]
            this.getHospital()
        },
        methods: {
            exportData(){
                this.OrderProjectReport({
                    pageIndex: 1,
                    pageSize: this.total,
                   "startDate": this.formInline.startTime,
                    "endDate": this.formInline.endTime,
                    HospitalCode:this.formInline.hospital,
                    Keyword:this.formInline.fxCode,
                },1)
            },
            async getHospital(){
                let [res, res1] = await Promise.all([GetDropDownPermission({typeId: 1})])
                this.hospitalList = res.data
                this.formInline.hospital = this.hospitalList[0].code
            
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
            onSubmit(val){
                this.currentPage = 1
                this.search()
            },
            search(){
               this.OrderProjectReport({
                    "startDate": this.formInline.startTime,
                    "endDate": this.formInline.endTime,
                    HospitalCode:this.formInline.hospital,
                    pageIndex: this.currentPage,
                    pageSize: this.size,
                    Keyword:this.formInline.fxCode,
               })
            },
            async OrderProjectReport(params,ope){
                let res = await OrderProjectReport(params)
                if(ope){
                    this.allData = this.dealData(res.data)
                    this.$refs.exportCom.handleDownload()
                }else{
                    this.total = res.count
                    this.tableData = this.dealData(res.data)
                }
            },
            dealData(data){
                data.forEach(row=>{
                    
                    row.noDealCount = row.consultingCount - row.dealCount
                    row.dealRate = String((row.dealCount).div(row.consultingCount).mul(100)).substring(0,5)+'%'
                    row.customerPrice = Math.round((row.orderAmount).div(row.consultingCount))
                })
                return data
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
        },
        components: {
            Export
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.front_ipt{
    opacity: 0;
    z-index: 2
}
.back_ipt{
    margin-left: -220px;
    z-index: 1
}
</style>
