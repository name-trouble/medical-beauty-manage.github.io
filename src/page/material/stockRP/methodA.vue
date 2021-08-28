<template>
<!-- 入库方式汇总（入库方式） -->
    <div class="tag selCommon">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px"   >
            <el-form-item label="医院：" class="form_item_mt10">
                <el-select v-model="formInline.hospitalCode"  style='width:200px;' @change="hosSelect">
                    <el-option v-for="(item,index) in hospitalList" :key="index" :label="item.supplierName" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="日期范围：" class="form_item_mt10">
                <el-date-picker
                    v-model="date"
                    type="daterange"
                    @change="dateChange"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="仓库：" class="form_item_mt10">
                <el-select v-model="formInline.wareHouse" style='width:200px;'>
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="(item,index) in whList" :key="index" :label="item.warehouseName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="入库方式：" class="form_item_mt10">
                 <el-select v-model="formInline.drugInType" style='width:200px;'>
                     <el-option label="全部" value=""></el-option>
                    <el-option v-for="(item,index) in typeList" :key="index" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label=" " class="form_item_mt10">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
                <Export :tHeader="tHeader"  ref="exportTable" :filterVal=' filterVal' :tableData1='tableData1' :name='name'></Export>
            </el-form-item>
        </el-form>
        <!-- 信息表 -->
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" show-summary max-height="560" :summary-method="getSummaries" class="smt min_table" v-loading="loading">
            <el-table-column prop="drugInType" label="入库方式" min-width="90"></el-table-column>
            <el-table-column prop="warehouseInName" label="仓库" min-width="90"></el-table-column>
            <el-table-column prop="orderCount" label="张数" min-width="90"></el-table-column>
            <el-table-column prop="drugInAmount" label="进价金额" min-width="90"></el-table-column>
            <el-table-column prop="wholesaleAmount" label="批价金额" min-width="90"></el-table-column>
            <el-table-column prop="saleAmount" label="零售金额" min-width="90"></el-table-column>
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
    import {GetDropDownPermission,GetWarehouse,GetStockDrugInTypeRep} from "@/api/myData"
    import Export from '@/components/export'
    export default {
        data () {
            return {
                date:"",
                typeList:['报增入库','调拨入库','盘盈入库','其他入库','退货入库','退药入库','外购入库','在用物资科室间调拨','自制入库'],
                loading:false,
                total:0,
                size:10,
                currentPage:1,
                formInline: {
                    startDate:"",
                    endDate:"",
                    drugInType:"",
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
                sum:{
                    orderCount:0,
                    drugInAmount:0,
                    wholesaleAmount:0,
                    saleAmount:0,
                },
                allData:[],
            }
        },
        computed: {
            /* 导出报表参数 tHeader,filterVal,tableData1*/
            tHeader(){
                return ['入库方式', '仓库', '张数', '进价金额', '批价金额', '零售金额']
            },
            filterVal(){
                return ['drugInType', 'warehouseInName', 'orderCount', 'drugInAmount', 'wholesaleAmount','saleAmount']
            },
            tableData1(){
                return this.allData
            },
            name(){
                return '入库方式汇总'
            },
            /*导出报表参数 tHeader,filterVal,tableData1*/
        },
        mounted(){
            this.date = [new Date(),new Date()]
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
              return ['总合计','',this.sum.orderCount,Math.round(this.sum.drugInAmount),Math.round(this.sum.wholesaleAmount),Math.round(this.sum.saleAmount)];
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
                // this.whList = whList.data
                this.allWhList = JSON.parse(JSON.stringify(whList.data))
            },
          
            async GetStockDrugInTypeRep(params){
                try{
                    this.loading = true
                    let res = await GetStockDrugInTypeRep(params)
                   if(res.status){
                        this.allData = res.data
                        this.GetTotal(res.data)
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
                this.sum={
                    orderCount:0,
                    drugInAmount:0,
                    wholesaleAmount:0,
                    saleAmount:0,
                }
                this.currentPage = 1
                this.search()
            },
            search(){
                this.GetStockDrugInTypeRep({
                    keywords:this.formInline.drugInType,
                    startDate:this.formInline.startDate,
                    endDate:this.formInline.endDate,
                    hospitalCode:this.formInline.hospitalCode,
                    warehouseInId:this.formInline.wareHouse,
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
                    
                    this.sum.orderCount = this.sum.orderCount.add(ele.orderCount)
                    this.sum.drugInAmount = this.sum.drugInAmount.add(ele.drugInAmount)
                    this.sum.wholesaleAmount = this.sum.wholesaleAmount.add(ele.wholesaleAmount)
                    this.sum.saleAmount = this.sum.saleAmount.add(ele.saleAmount)
                })
            },
            getPage(){
                this.loading = true 
                this.tableData = this.allData.slice((this.currentPage-1)*this.size,this.currentPage*this.size)
                setTimeout(()=>{
                    this.loading = false
                },500)
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
