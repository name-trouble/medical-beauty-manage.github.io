<template>
    <div class="tag selCommon">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px">
            <el-form-item label="医院：" class="form_item_mt10">
                <el-select v-model="formInline.hospitalCode" style='width:200px;' @change="hosSelect">
                    <el-option v-for="(item,index) in hospitalList" :key="index" :label="item.supplierName" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="仓库：" class="form_item_mt10">
                <el-select v-model="formInline.wareHouse" style='width:200px;'  @change="onSubmit">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="(item,index) in whList" :key="index" :label="item.warehouseName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="类型：" class="form_item_mt10">
                <el-select v-model="formInline.goodsType" style='width:200px;' @change="onSubmit">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="药品" value="1"></el-option>
                    <el-option label="物资" value="2"></el-option>
                    <el-option label="特殊" value="3" v-if="IsSpecial == 1"></el-option>
                    <el-option label="产品" value="4"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="关键字：" class="form_item_mt10">
                <el-input v-model="formInline.keywords" placeholder="请输入" style="width: 200px;" v-on:keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            
            <el-form-item label="零库存：" class="form_item_mt10">
                <el-checkbox v-model="remainNum" @change="checkC"></el-checkbox>
            </el-form-item>
            <el-form-item label="" class="form_item_mt10">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
                <el-button type="primary" class="searchBtn" @click="print" :disabled="allData.length == 0">盘点打印</el-button>
                <Export :tHeader="tHeader"  ref="exportTable" :filterVal=' filterVal' :tableData1='tableData1' :name='name'></Export>
            </el-form-item>
        </el-form>
        <!-- 信息表 -->
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" max-height="560" class="smt min_table"  v-loading="loading">
            <el-table-column prop="warehouseName" label="仓库" min-width="70"></el-table-column>
            <el-table-column prop="batchNumber" label="批号" min-width="90"></el-table-column>
            <!-- <el-table-column prop="fromHospitalName" label="药品编号" min-width="90"></el-table-column> -->
            <el-table-column prop="drugName" label="药品名称" min-width="90"></el-table-column>
            <el-table-column prop="manufacturer" label="厂家" min-width="90"></el-table-column>
            <el-table-column prop="unitName" label="规格" min-width="90"></el-table-column>
            <el-table-column prop="jiType" label="剂型" min-width="70"></el-table-column>
            <el-table-column prop="effectiveDate" label="有效期" min-width="90">
                <template slot-scope="scope">
                    <span v-if="scope.row.effectiveDate">{{scope.row.effectiveDate.substring(0,10)}}</span>
                </template>
            </el-table-column>
           <el-table-column prop="remainingCount" label="账面数量" min-width="80"></el-table-column>
            <el-table-column prop="bookAmount" label="账面金额" min-width="80">
                <!-- <template slot-scope="scope">
                    <span>{{scope.row.realPrice.mul(scope.row.remainingCount)}}</span>
                </template> -->
            </el-table-column>
            
            <el-table-column prop="inventoryQuantity" label="盘点数量" min-width="80">
                <template slot-scope="scope">
                    <el-input-number v-model="scope.row.inventoryQuantity" @change="booKchange(scope.$index)" :debounce='1000' :controls="false" :min="0"  style="width:90%"></el-input-number>
                </template>
            </el-table-column>
            <el-table-column prop="inventoryAmount" label="盘点金额" min-width="80">
                <!-- <template slot-scope="scope">
                    <el-input-number v-model="scope.row.inventoryAmount" :controls="false" :min="0" style="width:90%"></el-input-number>
                </template> -->
            </el-table-column>
            <el-table-column prop="profitLossQuantity" label="盈亏数量" min-width="80">
                <template slot-scope="scope">
                    <span>{{scope.row.profitLossQuantity}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="profitLossAmount" label="盈亏金额" min-width="80">
                <template slot-scope="scope">
                    <span>{{scope.row.profitLossAmount}}</span>
                </template>
            </el-table-column>
        </el-table>
        <!-- 信息表 -->
        <div class="warning">（确认后修改信息将更新库存，请谨慎操作）</div>
        <el-button type="primary" @click="AddStockInventoryDetail" :loading="loadingBtn">确认盘点</el-button>
        <!-- 分页 -->
        <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[50,100]"
                :page-size="size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
        <!-- 分页 -->
    </div>
</template>

<script type="text/ecmascript-6">
    import {baseImgPath} from "@/config/env"
    import  "@/style/selfCommon.less"
    import { getCookie, delCookie } from '@/config/mUtils'
    import {GetDropDownPermission,GetWarehouse,GetStockDrugForInventory,GetStockInOutRecord,AddStockInventoryDetail} from "@/api/myData"
    import Export from '@/components/export'
    export default {
        data () {
            return {
                IsSpecial:getCookie("isSpecial"),
                date:"",
                editMes:[],
                loading:false,
                title:"",
                total:0,
                size:50,
                currentPage:1,
                checked:false,
                remainNum:false,
                formInline: {
                    startDate:"",
                    endDate:"",
                    keywords: '',
                    typeCode:'',
                    hospitalCode:"",
                    wareHouse:"",
                    goodsType:"",
                },
                tableData:[],
                hospitalList:[],
                supplierList:[],
                whList:[],
                allWhList:[],
                allData:[],
                loadingBtn:false,
            }
        },
        computed: {
            /* 导出报表参数 tHeader,filterVal,tableData1*/
            tHeader(){
                return ['仓库','药品名称', '批号', '规格', '厂家', '剂型', '有效期', '账面金额','账面数量',"盘点金额",'盘点数量','差异金额','差异数量']
            },
            filterVal(){
                return ['warehouseName','drugName', 'batchNumber', 'unitName', 'manufacturer', 'jiType','effectiveDate','bookAmount','bookQuantity','inventoryAmount',
                'inventoryQuantity','profitLossAmount','profitLossQuantity']
            },
            tableData1(){
                return this.allData
            },
            name(){
                return '盘点'
            },
            /*导出报表参数 tHeader,filterVal,tableData1*/
        },
        mounted(){
            this.date = [new Date(),new Date()]
            this.GetDropDownPermission()
        },
        methods:{
            print(){
                let obj = {
                    keywords:this.formInline.keywords.removeSP(),
                    warehouseId:this.formInline.wareHouse,
                    hospitalCode:this.formInline.hospitalCode,
                    // IsShowBatch:this.checked?1:0,
                    goodsType:this.formInline.goodsType,
                    IsShowZero:this.remainNum?1:0,
                }
                let url = document.location.protocol + "//" + document.location.hostname + ((80 == document.location.port || "" == document.location.port) ? "" : ":" + document.location.port) + "/"
                let params ,arr = []
                for(var key in obj){
                    arr.push(key+'='+obj[key])
                }
                let newWin = window.open(url+'print/printInvPre.html?'+arr.join("&"))
            },
            booKchange(index){
                // bookAmount
                setTimeout(()=>{
                    this.tableData[index].inventoryAmount = this.tableData[index].inventoryQuantity.mul(this.tableData[index].realPrice)
                    this.tableData[index].profitLossQuantity = this.tableData[index].remainingCount.red(this.tableData[index].inventoryQuantity)
                    this.tableData[index].profitLossAmount = this.tableData[index].bookAmount.red(this.tableData[index].inventoryAmount)
                    this.tableData.push()
                },50)
            },
            // getSummaries(param) {
            //     return ["总合计",'','','','',Math.round(this.sum.quantityIn),Math.round(this.sum.quantityOut),Math.round(this.sum.remainCount),Math.round(this.sum.totalAmountOut)];
            // },
            hosSelect(){
                this.onSubmit()
                this.formInline.wareHouse = ""
                this.whList = []
                this.allWhList.forEach(ele=>{
                    
                    if(ele.hospitalCode == this.formInline.hospitalCode){
                        this.whList.push(ele)
                    }
                })
            },
            async AddStockInventoryDetail(){
                this.loadingBtn = true
                let res = await AddStockInventoryDetail({jsonStr:JSON.stringify(this.allData)})
                if(res.status){
                    this.$message({message: '操作成功', type: 'success'});
                    this.onSubmit()
                }else{
                    this.$message.error('操作失败');
                }
                this.loadingBtn = false
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
                let whList = await GetWarehouse({
                    "hospitalCode": "",
                    pageIndex:1,
                    pageSize:100,
                    keywords:"",
                    typeId:1//药房
                })
                // this.whList =JSON.parse(JSON.stringify(whList.data))
                
                if(getCookie('hospitalCode')){
                    whList.data.forEach(ele=>{
                        
                        if(getCookie('hospitalCode') == ele.hospitalCode){
                            this.whList.push(ele)
                        }
                    })
                    this.allWhList = JSON.parse(JSON.stringify(this.whList))
                }else{
                    this.allWhList = JSON.parse(JSON.stringify(whList.data))
                }
                let res1 = await GetDropDownPermission({typeId: 1});
                this.hospitalList = res1.data
                this.formInline.hospitalCode = res1.data[0].code
            },
        
            async GetStockDrugForInventory(params){
                try{
                    this.loading = true
                    let res = await GetStockDrugForInventory(params)
                    this.total = res.count
                    this.allData = res.data
                    this.loading = false
                    this.allData.forEach(ele=>{
                        ele.bookQuantity = ele.remainingCount
                        ele.bookAmount = ele.remainingCount.mul(ele.realPrice)
                        ele.inventoryAmount = ele.remainingCount.mul(ele.realPrice)
                        ele.profitLossQuantity = 0
                        ele.profitLossAmount = 0
                        ele.inventoryQuantity = ele.remainingCount
                    })
                    this.pageChange()
                    // this.getTotal()
                }catch(err){
                    console.log(err)
                }
            },
            
            onSubmit(){
                this.currentPage = 1
                this.search()
            },
            search(){
                this.sum = {
                    quantityIn:0,
                    quantityOut:0,
                    remainCount:0,
                    totalAmountOut:0,
                },
                this.GetStockDrugForInventory({
                    // pageIndex:this.currentPage,
                    // pageSize:this.size,
                    keywords:this.formInline.keywords.removeSP(),
                    warehouseId:this.formInline.wareHouse,
                    hospitalCode:this.formInline.hospitalCode,
                    // IsShowBatch:this.checked?1:0,
                    goodsType:this.formInline.goodsType,
                    IsShowZero:this.remainNum?1:0,
                })
            },
            handleSizeChange(val) {
                this.size = val
                this.pageChange()
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.pageChange()
            },

            saveData(){
                this.pageChange()
            },

            checkC(val){
                this.search()
            },
         
            pageChange(data){
                this.tableData = this.allData.slice((this.currentPage-1)*this.size,this.currentPage*this.size)
                
            },
            // getTotal(){
            //     this.allData.forEach(row=>{
            //         this.sum.quantityIn = row.quantityIn.add( this.sum.quantityIn)
            //         this.sum.quantityOut = row.quantityOut.add( this.sum.quantityOut)
            //         this.sum.remainCount = row.remainingCount.add( this.sum.remainCount)
            //         this.sum.totalAmountOut = row.remainingAmount.add( this.sum.totalAmountOut)
            //     //    this.sum.totalAmountOut = this.sum.totalAmountOut.add(row.totalAmountOut)
            //    })
            // },
        },
        components: {
            Export,
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.warning{
    color: red;
}
</style>
