<template>
<!-- 药品进销存汇总表 -->
    <div class="tag selCommon">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="90px">
            <el-form-item label="医院：" class="form_item_mt10">
                <el-select v-model="formInline.hospitalCode"  style='width:200px;'>
                    <el-option v-for="(item,index) in hospitalList" :key="index" :label="item.supplierName" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="仓库：" class="form_item_mt10">
                <el-select v-model="formInline.wareHouse" style='width:200px;'>
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="(item,index) in whList" :key="index" :label="item.warehouseName" :value="item.warehouseCode"></el-option>
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
            <el-form-item label="账面数量：" class="form_item_mt10">
                <el-select v-model="formInline.hospitalCode"  style='width:200px;'>
                    <el-option label="显示全部为零" value="1"></el-option>
                    <el-option label="不显示全为零" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="按批号显示：" class="form_item_mt10">
                <el-select v-model="formInline.hospitalCode"  style='width:200px;'>
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label=" " class="form_item_mt10">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
                <!-- <el-button type="primary" class="searchBtn" @click="addTag('添加')">添加入库</el-button> -->
            </el-form-item>
        </el-form>
        <!-- 信息表 -->
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" 
        show-summary :summary-method="getSummaries" max-height="560" class="smt min_table" v-loading="loading">
            <el-table-column prop="warehouseName" label="仓库" min-width="90"></el-table-column>
            <!-- <el-table-column prop="fromHospitalName" label="类别" min-width="80"></el-table-column> -->
            <el-table-column prop="drugId" label="药品编号" min-width="90"></el-table-column>
            <el-table-column prop="drugName" label="药品名称" min-width="90"></el-table-column>
            <el-table-column prop="unitName" label="规格" min-width="90"></el-table-column>
            <el-table-column prop="batchNumber" label="批号" min-width="90"></el-table-column>
            <el-table-column prop="jiType" label="剂型" min-width="80"></el-table-column>
            <el-table-column prop="dwName" label="单位" min-width="80"></el-table-column>
            <el-table-column prop="originAddress" label="产地" min-width="90"></el-table-column>
            <el-table-column prop="remainingCount" label="本月期初数量" min-width="90"></el-table-column>
            <el-table-column prop="remainingCount" label="期初金价金额" min-width="90"></el-table-column>
            <el-table-column prop="remainingCount" label="本月入库" min-width="90"></el-table-column>
            <el-table-column prop="remainingCount" label="本月进价" min-width="90"></el-table-column>
            <el-table-column prop="remainingCount" label="本月出库" min-width="90"></el-table-column>
            <el-table-column prop="remainingCount" label="本月出库进价金额" min-width="100"></el-table-column>
            <el-table-column prop="remainingCount" label="本月结存数量" min-width="90"></el-table-column>
            <el-table-column prop="remainingCount" label="结存进价" min-width="90"></el-table-column>
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

        <!-- <el-dialog title="添加入库" :visible.sync="tag" size="" :close-on-click-modal="false">
            <add v-if="tag" style="width:1000px" ref="addS" @addDrug="addDrug"  :editMes="editMes" @addClose="addClose"></add>
        </el-dialog>
        <el-dialog title="选择药品" :visible.sync="isDrug" size=""  :close-on-click-modal="false">
            <selDrug v-if="isDrug" style="width:600px" @selSure="selSure"></selDrug>
        </el-dialog> -->
    </div>
</template>

<script type="text/ecmascript-6">
    import { getCookie, delCookie } from '@/config/mUtils'
    import {GetDropDownPermission,GetWarehouse,GetStockDrug} from "@/api/myData"
    export default {
        data () {
            return {
                yearList:[],
                monthList:['01','02','03','04','05','06','07','08','09',10,11,12],
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
                sum:{
                    
                }
            }
        },
        computed: {
            /* 导出报表参数 tHeader,filterVal,tableData1*/
            // tHeader(){
            //     return ['封面', '主题', '发布人', '标签', '视频大小', '发布时间', '浏览人次', '平均浏览时长', '分享','销售额',"商品提成"]
            // },
            // filterVal(){
            //     return ['picture', 'title', 'userName', 'tab', 'videoSize','createDate','views','grade','grade','ReferrerName']
            // },
            // tableData1(){
            //     return this.tableData
            // },
            // name(){
            //     return '视频管理'
            // },
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
             getSummaries(param) {
                return ['总合计','',Math.round(this.sum.orderCount),Math.round(this.sum.drugOutAmount),Math.round(this.sum.wholesaleAmount),Math.round(this.sum.saleAmount)];
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
            },
          
            async GetStockDrug(params){
                try{
                    this.loading = true
                    let res = await GetStockDrug(params)
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
                this.currentPage = 1
                this.search()
            },
            search(){
                this.GetStockDrug({
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
                    this.sum.orderCount = this.sum.orderCount.add(ele.orderCount)
                    this.sum.drugOutAmount = this.sum.drugOutAmount.add(ele.drugOutAmount)
                    this.sum.wholesaleAmount = this.sum.wholesaleAmount.add(ele.wholesaleAmount)
                    this.sum.saleAmount = this.sum.saleAmount.add(ele.saleAmount)
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
        }
    }
</script>
<style scoped>

</style>
