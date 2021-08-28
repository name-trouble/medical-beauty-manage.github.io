<template>
    <div class="tag selCommon">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px">
            <el-form-item label="盘点月份：" class="form_item_mt10">
                <!-- <el-select v-model="formInline.year"  style='width:100px;'>
                    <el-option v-for="item in yearList" :key="item" :label="item" :value="item"></el-option>
                </el-select>
                <el-select v-model="formInline.month"  style='width:100px;'>
                    <el-option v-for="item in monthList" :key="item" :label="item" :value="item"></el-option>
                </el-select> -->
                <el-date-picker
                    v-model="date"
                    type="month"
                    style="width: 200px;"
                    @change="monthChange"
                    placeholder="选择月">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="医院：" class="form_item_mt10">
                <el-select v-model="formInline.hospitalCode"  style='width:200px;'>
                    <el-option v-for="(item,index) in hospitalList" :key="index" :label="item.supplierName" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label=" " class="form_item_mt10">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
                <el-button type="primary" class="searchBtn" @click="invent" >盘点</el-button>
                <!-- <el-button type="primary" class="searchBtn" @click="print" :disabled="tableData.length == 0">盘点打印</el-button> -->
                <!-- <Export :tHeader="tHeader"  ref="exportTable" :filterVal=' filterVal' :tableData1='tableData1' :name='name'></Export> -->
            </el-form-item>
        </el-form>
        <!-- 信息表 -->
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" max-height="560" class="smt min_table" v-loading="loading">
            <el-table-column prop="inventoryDate" label="盘点日期" min-width="90">
                <template slot-scope="scope">
                    <span v-if="scope.row.inventoryDate">{{scope.row.inventoryDate.substring(0,10)}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="warehouseName" label="盘点仓库" min-width="90"></el-table-column>
            <el-table-column prop="hospitalName" label="医院" min-width="90"></el-table-column>

            <el-table-column prop="bookAmount" label="盘点前总金额" min-width="80"></el-table-column>
            <el-table-column prop="profitLossAmount" label="差异金额" min-width="80">
                <template slot-scope="scope">
                    <el-button @click="viewDet(scope.row)" type="text">{{scope.row.profitLossAmount}}</el-button>
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
        <el-dialog title="盘点" :visible.sync="isInvent" size="" top="10%">
            <dialogInv v-if="isInvent" style="width:1200px" @selSure="selSure"></dialogInv>
        </el-dialog>
        <el-dialog title="详情" :visible.sync="invDialog" size="">
            <dialogDet v-if="invDialog" style="width:1200px" :propHospitalCode="viewHospitalCode" 
            :propYear="formInline.year" :propMonth='formInline.month' :dialogData="dialogData"></dialogDet>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import dialogInv from "./drugInv"
    import dialogDet from "./com/invDet"
    import {baseImgPath} from "@/config/env"
    import  "@/style/selfCommon.less"
    import { getCookie, delCookie } from '@/config/mUtils'
    import {DeleteInventoryById,GetDropDownPermission,GetSupplier,GetWarehouse,GetInventoryDetailList} from "@/api/myData"
    import Export from '@/components/export'
    export default {
        data () {
            return {
                date:'',
                loading:false,
                isInvent:false,
                total:0,
                size:10,
                currentPage:1,
                formInline: {
                    year:"",
                    month:"",
                    date:'',
                },
                invDialog:false,
                yearList:[],
                monthList:[],
                tableData:[],
                allData:[],
                hospitalList:[],
                dialogData:[],
                viewHospitalCode:'',
                // supplierList:[],
                // searchMes:{},
                // whList:[],
            }
        },
        computed: {
            /* 导出报表参数 tHeader,filterVal,tableData1*/
            tHeader(){
                return ['药品名称', '批号', '规格', '产地', '剂型', '盘点日期', '盘点仓库', '医院', '账面金额','账面数量',"盘点金额",'盘点数量','差异金额','差异数量','盘点人']
            },
            filterVal(){
                return ['drugName', 'batchNumber', 'unitName', 'originAddress', 'jiType','createOn','warehouseName','hospitalName','bookAmount','bookQuantity','inventoryAmount',
                'inventoryQuantity','profitLossAmount','profitLossQuantity','createBy']
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
            // this.date = [new Date(),new Date()]
            this.GetDropDownPermission()
            // this.date()
            this.date = new Date()
        },
        methods:{
            monthChange(val){
                
                if(val){
                    this.formInline.date = val
                }else{
                    this.date = new Date()
                }
            },
            viewDet(data){
                this.dialogData = []
                this.invDialog = true
                this.viewHospitalCode = data.hospitalCode
                this.GetInventoryDetailList({
                    date:data.inventoryDate,
                    hospitalCode:data.hospitalCode,
                    type:2,
                },2)
            },
            // dateChange(val){
            //     if(val){
            //         this.formInline.startDate = val.substring(0,10)
            //         this.formInline.endDate = val.substring(13)
            //     }else{
            //         this.formInline.startDate = ""
            //         this.formInline.endDate = ""
            //     }
            // },
            async GetDropDownPermission(){
                let res1 = await GetDropDownPermission({typeId: 1});
                this.hospitalList = res1.data
                this.formInline.hospitalCode = res1.data[0].code
                // let sup = await GetSupplier({ hospitalCode:"",pageIndex:1,pageSize:1000,keywords:""})
                
                // this.supplierList = sup.data
                // let whList = await GetWarehouse({
                //     "hospitalCode": "",
                //     pageIndex:1,
                //     pageSize:100,
                //     keywords:"",
                //     typeId:1//药房
                // })
                // this.whList = whList.data
            },
            invent(){
                this.isInvent = true
            },
            selSure(val){
                this.isInvent = true
                if(val){
                    this.search()
                }
            },
            // date(){
            //     let NY = new Date().getFullYear(),NM = new Date().getMonth()+1
            //     this.formInline.year = NY
            //     this.formInline.month = NM>=10?NM:'0'+NM
            //     for(let i = 0;i<5;i++){
            //         this.yearList.push(NY-i)
            //     }
            //     for(let i = 1;i<13;i++){
            //         if(i<10){
            //             this.monthList.push('0'+i)
            //         }else{
            //             this.monthList.push(i)
            //         }
            //     }
            // },
            async GetInventoryDetailList(params,ope){
                try{
                    
                    let res = await GetInventoryDetailList(params)
                    if(ope){
                        this.dialogData = res.data
                    }else{
                        this.allData = JSON.parse(JSON.stringify(res.data))
                        this.pageChange()
                        this.total = res.count
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
                this.loading = true
                this.GetInventoryDetailList({
                    date:this.formInline.date,
                    hospitalCode:this.formInline.hospitalCode,
                    type:1,
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
//          添加
            addTag(ope,index,data){
                this.tag = true
                this.title = ope
                if(data){
                    this.editMes = JSON.parse(JSON.stringify(data[index]))
                }
            },
//            删除
            deleteRow(index,data){
                this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    
                    this.DeleteInventoryById({
                        id:data[index].id
                    })
                }).catch(() => {

                });
            },

            approve(data){

            },
            account(data){

            },
            pay(data){

            },
            addDrug(val){
                this.isDrug = true
                this.searchMes = val
            },
            // 药品添加回调
            selSure(val,data){
                if(val){
                    this.$refs.addS.addTable(data)
                    this.isDrug = false
                }else{
                    this.isDrug = false
                }
            },
            addClose(val){
                this.tag = false
                if(val){
                    this.search()
                }
            },
            print(){
                let url = document.location.protocol + "//" + document.location.hostname + ((80 == document.location.port || "" == document.location.port) ? "" : ":" + document.location.port) + "/"
                let newWin = window.open(url+'print/printInv.html?date='+this.formInline.date+'')
            },
            pageChange(data){
                this.tableData = this.allData.slice((this.currentPage-1)*this.size,this.currentPage*this.size)
            },
        },
        components: {
            Export,
            dialogDet,
            dialogInv
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
