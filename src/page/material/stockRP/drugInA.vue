<template>
<!-- 药品入库汇总 -->
    <div class="tag selCommon">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px" >
            <el-form-item label="医院：" class="form_item_mt10">
                <el-select v-model="formInline.hospitalCode"  style='width:200px;'>
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
            <el-form-item label="供应商：" class="form_item_mt10">
                <el-select v-model="formInline.supplier" style='width:200px;' filterable>
                     <el-option label="全部" value=""></el-option>
                    <el-option v-for="(item,index) in allSupplierList" :key="index" :label="item.stockSupplierName" :value="item.stockSupplierCode"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="入库类别：" class="form_item_mt10">
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
            <!-- <el-table-column prop="drugCateName" label="分类" min-width="90"></el-table-column> -->
            <el-table-column prop="drugName" label="名称" min-width="90"></el-table-column>
            <el-table-column prop="unitName" label="规格" min-width="90"></el-table-column>
            <el-table-column prop="dwName" label="单位" min-width="90"></el-table-column>
            <el-table-column prop="quantity" label="数量" min-width="90"></el-table-column>
            <el-table-column prop="totalAmount" label="金额" min-width="90"></el-table-column>
            <el-table-column prop="avgPrice" label="均价" min-width="90"></el-table-column>
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
    import {GetDropDownPermission,GetWarehouse,GetSupplier,GetStockDrugInRep} from "@/api/myData"
    import Export from '@/components/export'
    export default {
        data () {
            return {
                date:"",
                typeList:['报增入库','调拨入库','盘盈入库','其他入库','退货入库','退药入库','外购入库','在用物资科室间调拨','自制入库'],
                editMes:[],
                isDrug:false,
                saveLoading:false,
                loading:false,
                title:"",
                tag:false,
                total:0,
                size:10,
                currentPage:1,
                formInline: {
                    startDate:"",
                    endDate:"",
                    supplier:"",
                    drugInType:"",
                    keywords: '',
                    typeCode:'',
                    hospitalCode:"",
                    wareHouse:"",
                },
                tableData:[],
                hospitalList:[],
                supplierList:[],
                allSupplierList:[],
                whList:[],
                sum:{
                    quantity:0,
                    totalAmount:0,
                },
                allData:[],
            }
        },
        computed: {
            /* 导出报表参数 tHeader,filterVal,tableData1*/
            tHeader(){
                return ['名称', '规格', '单位', '数量', '金额', '均价']
            },
            filterVal(){
                return ['drugName', 'unitName', 'dwName', 'quantity', 'totalAmount','avgPrice']
            },
            tableData1(){
                return this.allData
            },
            name(){
                return '药品入库汇总'
            },
            /*导出报表参数 tHeader,filterVal,tableData1*/
        },
        mounted(){
            this.date = [new Date(),new Date()]
            this.GetDropDownPermission()
        },
        methods:{
             getSummaries(param) {
              return ['总合计','','',this.sum.quantity,Math.round(this.sum.totalAmount)];
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
                    keywords:""
                })
                this.whList = whList.data
                let sup = await GetSupplier({ hospitalCode:"",pageIndex:1,pageSize:1000,keywords:""})
                this.allSupplierList = sup.data
            },
            async GetStockDrugInRep(params){
                try{
                    this.loading = true
                    let res = await GetStockDrugInRep(params)
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
                    quantity:0,
                    totalAmount:0,
                }
                this.currentPage = 1
                this.search()
            },
            search(){
                this.GetStockDrugInRep({
                    "stockSupplierCode": this.formInline.supplier,
                    // "deptCode": "sample string 7",
                    warehouseInId:this.formInline.wareHouse,
                    keywords:this.formInline.drugInType.removeSP(),
                    startDate:this.formInline.startDate,
                    endDate:this.formInline.endDate,
                    hospitalCode:this.formInline.hospitalCode
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
                    this.sum.quantity = this.sum.quantity.add(ele.quantity)
                    this.sum.totalAmount = this.sum.totalAmount.add(ele.totalAmount)
                })
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
