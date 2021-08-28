<template>
<!-- 出库明细 -->
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
            <el-form-item label="日期：" class="form_item_mt10">
                <el-date-picker
                    v-model="date"
                    type="daterange"
                    @change="dateChange"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="出库类别：" class="form_item_mt10">
                <el-select v-model="formInline.outType"  style='width:200px;'>
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="(item,index) in typeList" :key="index" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="关键字：" class="form_item_mt10">
                <el-input v-model="formInline.keywords" placeholder="请输入" style="width: 200px;" v-on:keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            <el-form-item label=" " class="form_item_mt10">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
                <Export :tHeader="tHeader" ref="exportTable" :filterVal=' filterVal' :tableData1='tableData1' :name='name'></Export>
            </el-form-item>
        </el-form>
        <!-- 信息表 -->
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" max-height="560"
         class="smt min_table" show-summary :summary-method="getSummaries" v-loading="loading">
            <el-table-column prop="drugOutCode" label="出库编号" min-width="90"></el-table-column>
            <el-table-column prop="drugId" label="药品编号" min-width="90"></el-table-column>
            <el-table-column prop="drugName" label="药品名称" min-width="90" show-overflow-tooltip></el-table-column>
            <el-table-column prop="stockSupplierName" label="供应商" min-width="120" show-overflow-tooltip></el-table-column>
            
            <el-table-column prop="unitName" label="规格" min-width="90" show-overflow-tooltip></el-table-column>
            <el-table-column prop="drugOutType" label="出库方式" min-width="80"></el-table-column>
            <el-table-column prop="jiType" label="剂型" min-width="90"></el-table-column>
            <el-table-column prop="dwName" label="单位" min-width="90"></el-table-column>
            <el-table-column prop="batchNumber" label="批号" min-width="90"></el-table-column>
            <el-table-column prop="quantity" label="出库数量" min-width="90"></el-table-column>
            <el-table-column prop="realPrice" label="出库单价" min-width="90"></el-table-column>
            <el-table-column prop="totalAmount" label="出库金额" min-width="90"></el-table-column>
            <el-table-column prop="salePrice" label="销售单价" min-width="90"></el-table-column>
            <el-table-column prop="salePriceA" label="销售金额" min-width="90"></el-table-column>
            <el-table-column prop="diffA" label="差额" min-width="90"></el-table-column>
            <el-table-column prop="drugOutDate" label="出库时间" min-width="90">
                <template slot-scope="scope">
                    <span v-if="scope.row.drugOutDate">{{scope.row.drugOutDate.substring(0,10)}}</span>
                </template>
            </el-table-column> 
            <el-table-column prop="effectiveDate" label="有效期限" min-width="90">
                <template slot-scope="scope">
                    <span v-if="scope.row.effectiveDate">{{scope.row.effectiveDate.substring(0,10)}}</span>
                </template>
            </el-table-column> 
            <el-table-column prop="warehouseOutName" label="出库仓库" min-width="90"></el-table-column> 
            <el-table-column prop="customerName" label="领用人" min-width="90"></el-table-column> 
            <el-table-column prop="deptName" label="领用部门" min-width="90"></el-table-column>
            <el-table-column prop="createBy" label="开单人" min-width="90"></el-table-column> 
            <el-table-column prop="buyerName" label="服务者" min-width="90"></el-table-column> 
            <el-table-column prop="memo" label="备注" min-width="130" show-overflow-tooltip></el-table-column> 
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
    import {GetDropDownPermission,GetWarehouse,GetStockManageOutStock,GetSupplier} from "@/api/myData"
    import Export from '@/components/export'
    export default {
        data () {
            return {
                typeList:['报损出库','成本出库','出库调整','发物资出库','产品单出库','发药出库','客户出库','礼品赠送','盘亏出库','退货出库','外调出库','在用物资科室内调拨','正常领用'],
                date:"",
                loading:false,
                total:0,
                size:10,
                currentPage:1,
                formInline: {
                    bookQuantity:"",
                    startDate:"",
                    endDate:"",
                    keywords: '',
                    typeCode:'',
                    hospitalCode:"",
                    stockSupplierCode:"",
                    wareHouse:"",
                    outType:'',
                },
                tableData:[],
                hospitalList:[],
                supplierList:[],
                whList:[],
                allWhList:[],
                allData:[],
                sum:{
                     salePriceA:0,
                    diffA:0,
                    quantity:0,
                    totalAmount:0,
                }
            }
        },
        computed: {
            /* 导出报表参数 tHeader,filterVal,tableData1*/
            tHeader(){
                return ['出库编号', '药品编号', '药品名称', '规格','供应商','出库方试', '剂型', '单位', '批号', '出库数量','出库单价',"出库金额",'销售单价','销售金额','差额','出库时间','有效期','出库仓库','领用人','领用部门','开单人','服务者','备注']
            },
            filterVal(){
                return ['drugOutCode', 'drugId', 'drugName', 'unitName','stockSupplierName','drugOutType', 'jiType','dwName','batchNumber','quantity','realPrice','totalAmount','salePrice','salePriceA','diffA','createOn',
                'effectiveDate','warehouseOutName','customerName','deptName','createBy','buyerName','memo']
            },
            tableData1(){
                return this.allData
            },
            name(){
                return '出库明细'
            },
            /*导出报表参数 tHeader,filterVal,tableData1*/
        },
        mounted(){
            this.date = [new Date(),new Date()]
            this.GetDropDownPermission()
        },
        methods:{
            hosSelect(val){
                
                this.formInline.wareHouse = ""
                this.whList = []
                this.allWhList.forEach(ele => {
                    
                    if(ele.hospitalCode == val){
                        this.whList.push(ele)
                        this.formInline.wareHouse = ele.id
                    }
                });
                this.formInline.stockSupplierCode = ""
                this.supplierList = []
                this.allSupplierList.forEach(ele=>{
                    if(ele.hospitalCode == val){
                        this.supplierList.push(ele)
                        this.formInline.stockSupplierCode = ele.stockSupplierCode
                    }
                })
            },
            getSummaries(param) {
                 return ['总合计','','','','','','','',Math.round(this.sum.quantity),'',Math.round(this.sum.totalAmount),'',Math.round(this.sum.salePriceA),Math.round(this.sum.diffA)];
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
                let sup = await GetSupplier({ hospitalCode:getCookie('hospitalCode'),pageIndex:1,pageSize:1000,keywords:""})
                this.supplierList = sup.data
                this.allSupplierList = sup.data
                this.formInline.hospitalCode = res1.data[0].code
                // this.whList = whList.data
                
            },
          
            async GetStockManageOutStock(params){
                try{
                    this.loading = true
                    let res = await GetStockManageOutStock(params)
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
                    salePriceA:0,
                    diffA:0,
                    quantity:0,
                    totalAmount:0,
                }
                this.currentPage = 1
                this.search()
            },
            search(){
                this.GetStockManageOutStock({
                    "bookQuantity": this.formInline.bookQuantity,
                    "startDate": this.formInline.startDate,
                    "endDate": this.formInline.endDate,
                    keywords:this.formInline.keywords.removeSP(),
                    warehouseId:this.formInline.wareHouse,
                    hospitalCode:this.formInline.hospitalCode,
                    drugOutType:this.formInline.outType,
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
                    ele.totalAmount = ele.realPrice.mul(ele.quantity)
                    ele.salePriceA = ele.salePrice.mul(ele.quantity)
                    this.sum.salePriceA = this.sum.salePriceA.add(ele.salePriceA)
                    ele.diffA = ele.totalAmount.red(ele.salePriceA)
                    this.sum.diffA = this.sum.diffA.add(ele.diffA)
                    this.sum.quantity = this.sum.quantity.add(ele.quantity)
                    this.sum.totalAmount = this.sum.totalAmount.add(ele.totalAmount)
                })
                return data
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
