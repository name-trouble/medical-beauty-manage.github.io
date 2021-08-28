<template>
    <div class="settled selCommon">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px" >
            <!-- <el-form-item label="时间范围："  class="form_item_mt10 ">
                <el-select v-model="year" placeholder="选择年份" style="width:100px;float:left">
                        <el-option v-for="(item,index) in yearList" :key="index" :label="item" :value="item"></el-option>
                    </el-select>
                    <el-select v-model="month" placeholder="选择月份" style="width:100px;float:left">
                        <el-option v-for="(item,index) in monthList" :key="index" :label="item" :value="item"></el-option>
                    </el-select>
            </el-form-item> -->
            <el-form-item label="结算日期："  class="form_item_mt10 ">
                <el-date-picker
                    v-model="date"
                    type="date"
                    @change="dateChange"
                    style="width: 200px;"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="医院："  class="form_item_mt10 form_item_wh280" style="width:285px;position:relative">
                <!-- 模拟多选 -->
                <el-input v-model="formInline.mulHos" style="width: 200px;position:absolute" placeholder="请选择"></el-input>
                <el-select v-model="formInline.Hospital" placeholder="" style="width: 200px;opacity: 0;height:36px;" @change="selMulData" multiple >
                    <el-option v-for="item in HospitalList" :key="item.value" :label="item.name" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="来源客户："  class="form_item_mt10 form_item_wh280">
                <el-select v-model="formInline.branch" placeholder="" style="width: 200px;" @change="change">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="销售公司" value="1"></el-option>
                    <el-option label="消费商" value="2"></el-option>
                </el-select>
            </el-form-item>
            <!-- <el-form-item label="关键字："  class="form_item_mt10 form_item_wh280">
                <el-input v-model="formInline.keywords" style="width: 200px;"></el-input>
            </el-form-item> -->
            <el-form-item label="医院："  class="form_item_mt10 form_item_wh280" v-if="formInline.branch == 1">
                <el-select v-model="formInline.keywords" placeholder="" style="width: 200px;">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in HospitalList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="销售公司："  class="form_item_mt10 form_item_wh280" v-if="formInline.branch == 2">
                <el-select v-model="formInline.keywords" placeholder="" style="width: 200px;">
                    <el-option v-for="item in agentList" :key="item.code" :label="item.branchName" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="关键字："  class="form_item_mt10 form_item_wh280" v-if="formInline.branch == 3">
                <el-input v-model="formInline.keywords" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item label=" " class="form_item_mt10 form_item_wh280">
                <el-button type="primary" @click="submit" class="searchBtn">查询</el-button>
                <Export ref="port" :tHeader="tHeader" :filterVal='filterVal' :tableData1='reportData' :name='name'></Export>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" class="min_table smt" v-loading="loading"
         max-height="660" show-summary :summary-method="getSummaries">
            <el-table-column prop="hospitalName" label="医院" min-width="80"></el-table-column>
            <el-table-column prop="fromName" label="来源客户" min-width="80">
                <template slot-scope="scope">
                    <span>{{scope.row.fromName}}</span><br/>
                    <span>{{scope.row.fromCode}}</span>
                </template>
            </el-table-column>
            <!-- <el-table-column label="开户人" prop="toName" min-width="100">
                <template slot-scope="scope">
                     {{scope.row.bankCardHolder}}
                 </template>
            </el-table-column>
            <el-table-column label="开户行" prop="toName" min-width="100">
                <template slot-scope="scope">
                    <span>{{scope.row.openBankName}}</span>
                </template>
            </el-table-column>
             <el-table-column label="银行卡号" prop="toName" min-width="100">
                 <template slot-scope="scope">
                     {{scope.row.bankCardId}}
                 </template>
             </el-table-column> -->
            <el-table-column label="金额" prop="consumeAmount" min-width="120" align="right" style="color: red">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="det(scope.$index,tableData)"  style="float: right;">{{scope.row.consumeAmount.toQFW()}}</el-button>
                </template>
            </el-table-column>
            <!-- <template slot="append" v-if="tableData.length>0">
                <tr class="last-row">
                    <td class="cell" style="font-weight: bold">合计</td>
                    <td class="cell"></td>
                    <td class="cell"></td>
                    <td class="cell">
                        <span style="float: right;color: red;font-weight: bold">
                         {{totalAmount.toQFW()}}
                    </span>
                    </td>
                    <td class="cell"></td>
                </tr>
            </template> -->
        </el-table>
        <!-- 分页 -->
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="size"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <!-- <div class="">
            共{{total}}条数据
        </div> -->
        <el-dialog title="详情" :visible.sync="dialogTableVisible" size="">
            <det style="width:1000px" :mes="mes" :date="formInline.date " v-if="dialogTableVisible" @openRP="openRP" :isFinished="formInline.type"></det>
        </el-dialog>
        <!-- <el-dialog title="订单详情" :visible.sync="ispopRead" top="5%" size="">
            <report style="width:900px" v-if="ispopRead" :data="selectData" ></report>
        </el-dialog> -->

        <el-dialog title="详情" :visible.sync="detail" size="">
            <span>金额：{{totalAmount}}</span>
            <el-table ref="multipleTable" :data="detailData" border tooltip-effect="dark" style="width: 650px" max-height="560"
            class="min_table smt"  @selection-change="handleSelectionChange">
                <el-table-column type="selection" align="center" min-width="55"> </el-table-column>
                <el-table-column prop="customerName" label="客户" min-width="90"> </el-table-column>
                <el-table-column prop="hospitalName" label="医院" min-width="100"> </el-table-column>
                <el-table-column prop="consumeAmount" label="金额" min-width="100" align="right"> </el-table-column>
            </el-table>
        </el-dialog>

    </div>
</template>

<script type="text/ecmascript-6">
    import det from "./components/branchSD.vue"
    // import report from "@/page/FinanceManage/ReportManage/com/reportRead"
    import Export from '@/components/export'
    import {GetHospitalIn,GetDropDownPermission,GetHospitalInDetail,GetSupplierBySupTypeCode} from "@/api/myData"
    import "@/style/selfCommon.less"
    export default {
        data () {
            return {
                selectData:{},
                ispopRead:false,
                loading:false,
                mes:{},
                dialogTableVisible:false,
                detail:false,
                total:0,
                HospitalList:[],
                formInline: {
                    keywords:"",
                    Hospital:[],
                    mulHos:"",
                    branch:"",
                    date:"",
                    startTime: "",
                    endTime: "",
                    type:0,
                    hos:"",
                },
                date:"",
                agentList:[],
                tableData:[],
                year:new Date().getFullYear(),
                month:"",
                yearList:[],
                monthList:[],
                mes:"",
                sum:{
                    consumeAmount:0,
                },
                currentPage:0,
                size:10,
                allData:[],
                detailData:[],
                multipleSelection:[],
            }
        },
        computed: {
            /* 导出报表参数 tHeader,filterVal,tableData1*/
            tHeader(){
                return ['医院', '转出客户', '开户人', '开户行','银行卡号','金额']
            },
            filterVal(){
                return ['hospitalName', 'toName', 'bankCardHolder', 'openBankName','bankCardId','consumeAmount']
            },
            name(){
                return '医院结算'
            },
            reportData(){
                let arr = JSON.parse(JSON.stringify(this.allData))
                return arr
            },
            totalAmount(){
                let sum = 0
                this.multipleSelection.forEach(row=>{
                    sum  = sum.add(row.consumeAmount)
                })
                return sum
            }
        },

        mounted(){
            //            设置默认中国时间
            //  this.getBaseDate()
            this.getSupplierByPage()
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            dateChange(val){
                if(val){
                    this.formInline.date = val
                }else this.formInline.date = ""
            },
            change(){
                this.formInline.keywords = ""
            },
            getSummaries(param) {
                return ["总合计",'',this.sum.consumeAmount.toQFW()];
            },

//            获取信息表
            async GetHospitalIn(params){
                try {
                    this.loading = true
                    let res = await GetHospitalIn(params)
                    this.loading = false
                    if(res.status){
                        this.total = res.count
                        this.allData = res.data
                        this.pageChange()
                        this.getTotal()
                    }else{
                        this.$message.error('获取数据失败'+res.errorMessage);
                    }
                } catch (err) {
                    console.log(err)
                }
            },
//            获取医院
            async getSupplierByPage(){
                let res = await GetSupplierBySupTypeCode({SupTypeCode:"001"});
                let arr = []
                res.forEach(row=>{
                    arr.push({
                        name:row.SupplierName,
                        value:row.Code
                    })
                })
                this.HospitalList = arr
                let res1 = await GetDropDownPermission({typeId:2})
                this.agentList = res1.data
                // this.formInline.branch = this.agentList[0].code
            },
            submit(){
                this.currentPage = 1
                this.search()
            },
//            搜索
            search(){
                this.sum = {
                    consumeAmount:0,
                },
                this.GetHospitalIn({
                    HospitalId:this.getHos(this.formInline.Hospital),
                    CommissionDate:(this.formInline.date||this.date).formatDate("yyyy-MM-dd"),
                    IsFinished:this.formInline.type,
                    keywords:this.formInline.keywords.removeSP(),
                    TypeId:this.formInline.branch
                })
            },
            getHos(data){

                let name = []
                data.forEach(row=>{
                    name.push(row.value)
                })
                return name.join(",")
            },
            det(index,data){
                this.mes = data[index]
                this.GetHospitalInDetail({
                    HospitalId:data[index].hospitalId,
                    CommissionDate:this.formInline.date,
                    FromCode:data[index].fromCode,
                    TypeId:this.formInline.branch
                })
                this.detail = true
            },
            async GetHospitalInDetail(params){
                let res = await GetHospitalInDetail(params)
                this.detailData = res.data
            },
            openRP(val){
                this.selectData = val
                this.ispopRead = true
            },
            handleSizeChange(val) {
                this.size = val
                this.pageChange()
            },

            handleCurrentChange(val) {
                this.currentPage = val
                this.pageChange()
            },
            pageChange(data){
                this.tableData = this.allData.slice((this.currentPage-1)*this.size,this.currentPage*this.size)
            },
            getTotal(){
                this.allData.forEach(row=>{
                   this.sum.consumeAmount = this.sum.consumeAmount.add(row.consumeAmount)
               })
            },

            selMulData(){

                if(this.formInline.Hospital.length==1&&this.formInline.Hospital[0].value==""){
                    this.formInline.mulHos = "全部"
                }else{
                    let name = []
                    let selHos = JSON.parse(JSON.stringify(this.formInline.Hospital))
                    let len = selHos.length
                    for(var i =0;i<len;i++){
                        if(selHos[i].value == ""){
                            this.formInline.mulHos = "全部"
                            this.formInline.Hospital = []
                            this.formInline.Hospital.push({
                                name:"全部",
                                value:""
                            })
                            return false
                        }else{
                            name.push(selHos[i].name)
                        }
                    }
                    this.formInline.mulHos = name.join(",")
                }
            },
            getPD(data){
                this.ispopRead = true
                this.selectData = data
            }
        },
        components: {
            Export,
            det,
            // report
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
