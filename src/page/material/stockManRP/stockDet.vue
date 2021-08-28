<template>
<!-- 出入库明细 -->
    <div class="tag selCommon">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px">
            <el-form-item label="医院：" class="form_item_mt10">
                <el-select v-model="formInline.hospitalCode"  style='width:200px;' @change="hosSelect">
                    <el-option v-for="(item,index) in hospitalList" :key="index" :label="item.supplierName" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="仓库：" class="form_item_mt10">
                <el-select v-model="formInline.wareHouse" style='width:200px;'>
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="(item,index) in whList" :key="index" :label="item.warehouseName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="关键字：" class="form_item_mt10">
                <el-input v-model="formInline.keywords" placeholder="请输入" style="width: 200px;" v-on:keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            <el-form-item label="账面数量：" class="form_item_mt10">
                <el-select v-model="formInline.bookQ"  style='width:200px;'>
                    <el-option label="全部" value=""></el-option>
                    <el-option label=">0" value="1"></el-option>
                    <!-- <el-option label="<0" value="1"></el-option> -->
                    <el-option label="=0" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="有效期：" class="form_item_mt10">
                <el-date-picker
                    v-model="date"
                    style="width: 200px;"
                    type="daterange"
                    @change="dateChange"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label=" " class="form_item_mt10">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
                <Export :tHeader="tHeader" ref="exportTable" :filterVal=' filterVal' :tableData1='tableData1' :name='name'></Export>
            </el-form-item>
        </el-form>
        <!-- 信息表 -->
        <!-- show-summary :summary-method="getSummaries" -->
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;"
         max-height="560" class="smt min_table" v-loading="loading" >
            <el-table-column prop="warehouseName" label="仓库" min-width="90"></el-table-column>
            <el-table-column prop="drugId" label="药品编号" min-width="90"></el-table-column>
            <el-table-column prop="drugName" label="药品名称" min-width="90"></el-table-column>
            <el-table-column prop="unitName" label="规格" min-width="90"></el-table-column>
            <el-table-column prop="jiType" label="剂型" min-width="90"></el-table-column>
            <el-table-column prop="dwName" label="单位" min-width="90"></el-table-column>
            <el-table-column prop="batchNumber" label="批号" min-width="90"></el-table-column>
            <el-table-column prop="effectiveDate" label="有效期" min-width="90">
                <template slot-scope="scope">
                      <span v-if="scope.row.effectiveDate">{{scope.row.effectiveDate.substring(0,10)}}</span>
                  </template>
            </el-table-column>
            <el-table-column prop="manufacturer" label="生产厂家" min-width="90"></el-table-column>
            <el-table-column prop="originAddress" label="产地" min-width="90"></el-table-column>
            <el-table-column prop="curInQuantity" label="入库数量" min-width="90"></el-table-column>
            <el-table-column prop="curInRealPrice" label="入库单价" min-width="90"></el-table-column> 
            <el-table-column prop="inAmount" label="入库金额" min-width="90"></el-table-column>
            <el-table-column prop="curOutQuantity" label="出库数量" min-width="90"></el-table-column>
            <el-table-column prop="curOutSalePrice" label="出库单价" min-width="90"></el-table-column>
            <el-table-column prop="outAmount" label="出库金额" min-width="90"></el-table-column>
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
    import { getCookie, delCookie } from '@/config/mUtils'
    import {GetDropDownPermission,GetWarehouse,GetStockManageStockInOutDetail} from "@/api/myData"
    import Export from '@/components/export'
    export default {
        data () {
            return {
                editMes:[],
                isDrug:false,
                saveLoading:false,
                loading:false,
                title:"",
                tag:false,
                total:0,
                size:10,
                currentPage:1,
                date:new Date(),
                formInline: {
                    bookQ:"",
                    endDate:"",
                    startDate:"",
                    keywords: '',
                    typeCode:'',
                    hospitalCode:"",
                    wareHouse:"",
                },
                tableData:[],
                hospitalList:[],
                supplierList:[],
                whList:[],
                allWhList:[],
                allData:[],
                sum:{
                    quantityIn:0,
                    inAmount:0,
                    quantityOut:0,
                    outAmount:0,
                }
            }
        },
        computed: {
            /* 导出报表参数 tHeader,filterVal,tableData1*/
            tHeader(){
                return ['仓库', '药品编号', '药品名称', '规格','剂型','单位','批号','有效期','生产厂家','产地','入库数量','入库单价','入库金额',"出库数量",'出库单价','出库金额']
            },
            filterVal(){
                return ['warehouseName', 'drugId', 'drugName', 'unitName', 'jiType','dwName','batchNumber','effectiveDate','manufacturer','originAddress','curInQuantity',
                'curInRealPrice','inAmount','curOutQuantity','curOutSalePrice','outAmount']
            },
            tableData1(){
                return this.allData
            },
            name(){
                return '出入库明细'
            },
            /*导出报表参数 tHeader,filterVal,tableData1*/
        },
        mounted(){
            this.GetDropDownPermission()
        },
        methods:{
            hosSelect(val){
                
                this.whList = []
                this.allWhList.forEach(ele => {
                    
                    if(ele.hospitalCode == val){
                        this.whList.push(ele)
                    }
                });
            },
             getSummaries(param) {
                return ['总合计','','','','','','','','','','','',Math.round(this.sum.quantityIn),'',Math.round(this.sum.inAmount),Math.round(this.sum.quantityOut),'',Math.round(this.sum.outAmount)];
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

            async GetDropDownPermission(){
                let res1 = await GetDropDownPermission({typeId: 1});
                this.hospitalList = res1.data
                let whList = await GetWarehouse({
                    "hospitalCode": "",
                    pageIndex:1,
                    pageSize:100,
                    keywords:"",
                    typeId:1//药房
                })
                this.allWhList = JSON.parse(JSON.stringify(whList.data))
            },
    
            async GetStockManageStockInOutDetail(params){
                try{
                    this.loading = true
                    let res = await GetStockManageStockInOutDetail(params)
                    if(res.status){
                        this.allData = this.GetTotal(res.data)
                        this.getPage(res.data)
                        this.total = res.count
                    }else{
                        this.$message.error('查询失败'+res.errorMessage);
                    }
                }catch(err){
                    console.log(err)
                }
            },
            
            onSubmit(){
                this.sum = {
                    quantityIn:0,
                    inAmount:0,
                    quantityOut:0,
                    outAmount:0,
                }
                this.currentPage = 1
                this.search()
            },
            search(){
                this.GetStockManageStockInOutDetail({
                    "bookQuantity":this.formInline.bookQ,
                    "startDate": this.formInline.startDate,
                    "endDate": this.formInline.endDate,
                    pageIndex:this.currentPage,
                    pageSize:this.size,
                    keywords:this.formInline.keywords.removeSP(),
                    warehouseId:this.formInline.wareHouse,
                    hospitalCode:this.formInline.hospitalCode,
                })
            },
            handleSizeChange(val) {
                this.size = val
                this.getPage()
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.getPage()
            },

            GetTotal(data){
                
                data.forEach(ele=>{ 
                    ele.inAmount = ele.curInQuantity?ele.curInQuantity.mul(ele.curInRealPrice):0
                    ele.outAmount = ele.curOutQuantity?ele.curOutQuantity.mul(ele.curOutSalePrice):0
                    // this.sum.quantityIn = this.sum.quantityIn.add(ele.quantityIn)
                    // this.sum.inAmount = this.sum.inAmount.add(ele.inAmount)
                    // this.sum.quantityOut = this.sum.quantityOut.add(ele.quantityOut)
                    // this.sum.outAmount = this.sum.outAmount.add(ele.outAmount)
                })
                return data
            },

            getPage(){
                this.loading = true 
                this.tableData = this.allData.slice((this.currentPage-1)*this.size,this.currentPage*this.size)
                setTimeout(()=>{
                    this.loading = false
                },50)
            },
        },
        components: {
            Export,
        }
    }
</script>
<style scoped>
.block{
    float:right;
}
</style>
