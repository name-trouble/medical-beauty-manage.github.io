<template>
<!-- 药品库存汇总表 -->
    <div class="tag selCommon">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="90px">
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
            <el-form-item label="年月：" class="form_item_mt10">
                <el-select v-model="formInline.year" style='width:95px;'>
                    <el-option v-for="item in yearList" :key="item" :label="item" :value="item"></el-option>
                </el-select>
                <el-select v-model="formInline.month" style='width:95px;'>
                    <el-option v-for="item in monthList" :key="item" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="按批号显示：" class="form_item_mt10">
                <el-select v-model="formInline.batch"  style='width:200px;'>
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="关键字：" class="form_item_mt10">
                <el-input v-model="formInline.keywords" placeholder="请输入" style="width: 200px;" v-on:keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            <el-form-item label=" " class="form_item_mt10">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
                <Export :tHeader="tHeader"  ref="exportTable" :filterVal=' filterVal' :tableData1='tableData1' :name='name'></Export>
            </el-form-item>
        </el-form>
        <!-- 信息表 -->
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" 
        max-height="660" class="smt min_table" show-summary :summary-method="getSummaries" v-loading="loading">
            <el-table-column prop="warehouseName" label="仓库" min-width="70"></el-table-column>
            <!-- <el-table-column prop="drugCateName" label="类别" min-width="60"></el-table-column> -->
            <el-table-column prop="drugId" label="药品编号" min-width="70"></el-table-column>
            <el-table-column prop="drugName" label="药品名称" min-width="90"></el-table-column>
            <el-table-column prop="unitName" label="规格" min-width="90"></el-table-column>
            <el-table-column prop="batchNumber" label="批号" min-width="90"></el-table-column>
            <el-table-column prop="jiType" label="剂型" min-width="60"></el-table-column>
            <el-table-column prop="dwName" label="单位" min-width="50"></el-table-column>
            <el-table-column prop="originAddress" label="产地" min-width="50"></el-table-column>
            <el-table-column prop="manufacturer" label="厂商" min-width="110"></el-table-column>
            <el-table-column prop="dwName" label="上月结余" min-width="70">
                <el-table-column prop="preQuantity" label="数量" min-width="60"></el-table-column>
                <!-- <el-table-column prop="dwName" label="单价" min-width="70">
                    <el-table-column prop="preRealPrice" label="进价" min-width="60"></el-table-column>
                    <el-table-column prop="preSalePrice" label="零售价" min-width="60"></el-table-column>
                </el-table-column> -->
                <el-table-column prop="dwName" label="总金额" min-width="70">
                    <el-table-column prop="preRealPriceTotal" label="进价" min-width="80"></el-table-column>
                    <el-table-column prop="preSalePriceTotal" label="零售价" min-width="80"></el-table-column>
                </el-table-column>
            </el-table-column>
            <el-table-column prop="dwName" label="本月入库" min-width="70">
                <el-table-column prop="curInQuantity" label="数量" min-width="60"></el-table-column>
                <!-- <el-table-column prop="dwName" label="单价" min-width="70"></el-table-column>
                    <el-table-column prop="curInRealPrice" label="进价" min-width="60"></el-table-column>
                    <el-table-column prop="curInSalePrice" label="零售价" min-width="60"></el-table-column>
                </el-table-column> -->
                <el-table-column prop="dwName" label="总金额" min-width="70">
                    <el-table-column prop="curInRealPriceTotal" label="进价" min-width="80"></el-table-column>
                    <el-table-column prop="curInSalePriceTotal" label="零售价" min-width="80"></el-table-column>
                </el-table-column>
            </el-table-column>
            <el-table-column prop="dwName" label="本月出库" min-width="70">
                <el-table-column prop="curOutQuantity" label="数量" min-width="60"></el-table-column>
                <!-- <el-table-column prop="dwName" label="单价" min-width="70">
                    <el-table-column prop="curOutRealPrice" label="出库价" min-width="60"></el-table-column>
                    <el-table-column prop="curOutSalePrice" label="零售价" min-width="60"></el-table-column>
                </el-table-column> -->
                <el-table-column prop="dwName" label="总金额" min-width="70">
                    <el-table-column prop="curOutRealPriceTotal" label="出库价" min-width="80"></el-table-column>
                    <el-table-column prop="curOutSalePriceTotal" label="售价" min-width="80"></el-table-column>
                </el-table-column>
            </el-table-column>
            <el-table-column prop="dwName" label="本月结存" min-width="70">
                <el-table-column prop="curQuantity" label="数量" min-width="60"></el-table-column>
                <!-- <el-table-column prop="dwName" label="单价" min-width="70">
                    <el-table-column prop="curRealPrice" label="进价" min-width="60"></el-table-column>
                    <el-table-column prop="curSalePrice" label="零售价" min-width="60"></el-table-column>
                </el-table-column> -->
                <el-table-column prop="dwName" label="总金额" min-width="70">
                    <el-table-column prop="curRealPriceTotal" label="进价" min-width="80"></el-table-column>
                    <el-table-column prop="curSalePriceTotal" label="零售价" min-width="80"></el-table-column>
                </el-table-column>
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
import '../lib/lib.less'
    import { getCookie, delCookie } from '@/config/mUtils'
    import {GetDropDownPermission,GetWarehouse,GetStockDrugRep} from "@/api/myData"
    import Export from '@/components/export'
    export default {
        data () {
            return {
                yearList:[],
                monthList:['01','02','03','04','05','06','07','08','09',10,11,12],
                loading:false,
                total:0,
                size:10,
                currentPage:1,
                formInline: {
                    batch:"",
                    year:new Date().getFullYear(),
                    month:"",
                    keywords: '',
                    typeCode:'',
                    hospitalCode:"",
                    wareHouse:"",
                },
                tableData:[],
                hospitalList:[],
                supplierList:[],
                whList:[],
                allData:[],
                allData:[],
                sum:{
                    preQuantity:0,
                    preRealPriceTotal:0,
                    preSalePriceTotal:0,

                    curInQuantity:0,
                    curInRealPriceTotal:0,
                    curInSalePriceTotal:0,


                    curOutQuantity:0,
                    curOutRealPriceTotal:0,
                    curOutSalePriceTotal:0,

                    curQuantity:0,
                    curRealPriceTotal:0,
                    curSalePriceTotal:0,
                },
            }
        },
        computed: {
            /* 导出报表参数 tHeader,filterVal,tableData1*/
            tHeader(){
                return ['仓库', '药品编号', '药品名称', '规格', '批号', '剂型', '单位', '产地', '（上月结余）数量','（上月结余）进价总额','（上月结余）售价总额',
                 '（本月入库）数量','（本月入库）进价总额','（本月入库）售价总额',
                  '（本月出库）数量','（本月出库）进价总额','（本月出库）售价总额',
                   '（本月结存）数量','（本月结存）进价总额','（本月结存）售价总额',]
            },
            filterVal(){
                return ['warehouseName', 'drugId', 'drugName','unitName','batchNumber','jiType','dwName','originAddress',
                'preQuantity','preRealPriceTotal','preSalePriceTotal',
                'curInQuantity','curInRealPriceTotal','curInSalePriceTotal',
                'curOutQuantity','curOutRealPriceTotal','curOutSalePriceTotal',
                'curQuantity','curRealPriceTotal','curSalePriceTotal'
                ]
            },
            tableData1(){
                return this.allData
            },
            name(){
                return '进销存汇总'
            },
            /*导出报表参数 tHeader,filterVal,tableData1*/
        },
        mounted(){
            let year = new Date().getFullYear()
            let month = new Date().getMonth()+1
            this.formInline.year = year
            this.formInline.month =  month>=10?month:'0'+month
            for(let i = 0;i<4;i++){
                this.yearList.push(year-i)
            }
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
                return ['总合计','','','','','','','','',Math.round(this.sum.preQuantity),Math.round(this.sum.preRealPriceTotal),Math.round(this.sum.preSalePriceTotal),
                Math.round(this.sum.curInQuantity), Math.round(this.sum.curInRealPriceTotal), Math.round(this.sum.curInSalePriceTotal),
                Math.round(this.sum.curOutQuantity), Math.round(this.sum.curOutRealPriceTotal), Math.round(this.sum.curOutSalePriceTotal),
                Math.round(this.sum.curQuantity), Math.round(this.sum.curRealPriceTotal), Math.round(this.sum.curSalePriceTotal),
                ];
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
            async GetStockDrugRep(params){
                try{
                    this.loading = true
                    let res = await GetStockDrugRep(params)
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
                for(var key in this.sum){
                    this.sum[key] = 0
                }
                this.currentPage = 1
                this.search()
            },
            search(){
                this.sum={
                    preQuantity:0,
                    preRealPriceTotal:0,
                    preSalePriceTotal:0,

                    curInQuantity:0,
                    curInRealPriceTotal:0,
                    curInSalePriceTotal:0,


                    curOutQuantity:0,
                    curOutRealPriceTotal:0,
                    curOutSalePriceTotal:0,

                    curQuantity:0,
                    curRealPriceTotal:0,
                    curSalePriceTotal:0,
                }
                this.GetStockDrugRep({
                    "hospitalCode": this.formInline.hospitalCode,
                    "warehouseId": this.formInline.wareHouse,
                    "isBatch": this.formInline.batch,
                    "currentDate": this.formInline.year+'-'+this.formInline.month,
                    'keywords':this.formInline.keywords
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
                let _this = this
                data.forEach(ele=>{
                    
                    
                        _this.sum.preQuantity = _this.sum.preQuantity.add(ele.preQuantity)
                        _this.sum.preRealPriceTotal = _this.sum.preRealPriceTotal.add(ele.preRealPriceTotal)
                        _this.sum.preSalePriceTotal = _this.sum.preSalePriceTotal.add(ele.preSalePriceTotal)

                        _this.sum.curInQuantity = _this.sum.curInQuantity.add(ele.curInQuantity)
                        _this.sum.curInRealPriceTotal = _this.sum.curInRealPriceTotal.add(ele.curInRealPriceTotal)
                        _this.sum.curInSalePriceTotal = _this.sum.curInSalePriceTotal.add(ele.curInSalePriceTotal)

                        _this.sum.curOutQuantity = _this.sum.curOutQuantity.add(ele.curOutQuantity)
                        _this.sum.curOutRealPriceTotal = _this.sum.curOutRealPriceTotal.add(ele.curOutRealPriceTotal)
                        _this.sum.curOutSalePriceTotal = _this.sum.curOutSalePriceTotal.add(ele.curOutSalePriceTotal)

                        _this.sum.curQuantity = _this.sum.curQuantity.add(ele.curQuantity)
                        _this.sum.curRealPriceTotal = _this.sum.curRealPriceTotal.add(ele.curRealPriceTotal)
                        _this.sum.curSalePriceTotal = _this.sum.curSalePriceTotal.add(ele.curSalePriceTotal)
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
