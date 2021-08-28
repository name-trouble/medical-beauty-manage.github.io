<template>
    <div class="tag selCommon">
        <el-form :inline="true"  class="demo-form-inline form_search" label-width="80px" >
            <el-form-item label="截止日期：" class="form_item_mt10">
                    <el-date-picker
                        v-model="date"
                        style='width:200px;'
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
            </el-form-item>
            <el-form-item label="推荐医院：" class="form_item_mt10">
                <el-select v-model="hospitalCode"  style='width:200px;' @change="onSubmit" >
                    <el-option v-for="(item,index) in hospitalList" :key="index" :label="item.supplierName" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="执行医院：" class="form_item_mt10">
                <el-select v-model="commandhosCode"  style='width:200px;' @change="onSubmit" >
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="(item,index) in refHospitalList" :key="index" :label="item.SupplierName" :value="item.Code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="关键字：" class="form_item_mt10">
                <el-input v-model="keywords" placeholder="店家" style='width:200px;'></el-input>
            </el-form-item>
            <el-form-item label="显示当月："  class="form_item_mt10 form_item_wh280">
                <el-checkbox v-model="formInline.isCurrentMonth" ></el-checkbox>
            </el-form-item>
            <el-form-item label=" " class="form_item_mt10">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
                <el-button @click="generate" type="danger" :loading="makeLoading" :disabled="computedDate">生成数据</el-button>
            </el-form-item>
        </el-form>
         <el-table  :data="tableData" border style="width: 100%;margin-top:20px" max-height="560" class="min_table" show-summary v-loading="loading"  :summary-method="getSummaries">
            
            <el-table-column prop="refrenceBranchName" label="店家" min-width="80">
                <template slot-scope="scope">
                    <span v-if="scope.row.refrenceBranchName">{{scope.row.refrenceBranchName}}[{{scope.row.refrenceBranchCode}}]</span>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="phoneNumber" label="电话" min-width="80"></el-table-column> -->
            <el-table-column prop="openBankName" label="银行" min-width="80"></el-table-column>
            
            <el-table-column prop="bankCardId" label="银行卡号" min-width="80"></el-table-column>
            
            <el-table-column prop="hospitalName" label="执行医院" min-width="90" ></el-table-column>
            <el-table-column prop="refHospitalName" label="推荐医院" min-width="90" ></el-table-column>
            <el-table-column prop="realAmount" label="提成金额" min-width="80" align="right">
                <template slot-scope="scope">
                    <span>{{scope.row.realAmount.toQFW()}}</span>
                    <!-- <span v-if="scope.row.realAmount == 0">0</span>  -->
                    <!-- <el-button v-else type="text" @click="view(scope.$index,tableData)">{{scope.row.realAmount.toQFW()}}</el-button> -->
                </template>
            </el-table-column>
            <el-table-column prop="expertRate" label="比例" min-width="80">
                <template slot-scope="scope">
                    <span v-if="scope.row.expertRate">{{scope.row.expertRate}}%</span>
                </template>
            </el-table-column>

            <el-table-column prop="mon" label="可提成金额" min-width="80" align="right">
                <template slot-scope="scope">
                    <!-- <span>{{scope.row.mon.toQFW()}}</span> -->
                     <span v-if="scope.row.mon == 0">0</span>
                     <el-button v-else type="text" @click="view(scope.$index,tableData)">{{scope.row.mon.toQFW()}}</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="hospitalName" label="状态" min-width="90" >
                <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.isFinished == 1">已结算</el-tag>
                    <el-tag type="danger" v-else>未结算</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="customerName" label="操作" min-width="80">
                <template slot-scope="scope">
                     <el-button type="primary" size="small" :disabled="scope.row.isFinished==1" @click="settle(scope.$index,tableData)">结算</el-button>
                </template>
            </el-table-column>
        </el-table>
        
        <el-dialog title="详情" :visible.sync="dialogView"  top="5%"  size="" :close-on-click-modal="false">
            <span>总金额：{{totalAmount}}</span>  <span>结算金额：{{settleAmount}}</span>
             <el-button type="primary" style="margin-left:20px" @click="Dsettle">结算</el-button>
            <el-table  :data="detData" border style="width: 100%;margin-top:20px;width:900px" max-height="460" class="min_table"
                    @selection-change="handleSelectionChange">
                <el-table-column type="selection"   align="center" width="55"></el-table-column>
                <el-table-column prop="fxCode" label="单号" min-width="80">
                    <template slot-scope="scope">
                        <el-button type="text" @click="getPD(scope.row)">{{scope.row.fxCode}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="orderDate" label="订单时间" min-width="80">
                    <template slot-scope="scope">
                        <span v-if="scope.row.orderDate">{{scope.row.orderDate.substring(0,10)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="customerName" label="客户" min-width="80"></el-table-column>
                <el-table-column prop="hospitalName" label="医院" min-width="90" ></el-table-column>
                <el-table-column prop="projectName" label="项目名称" min-width="80"></el-table-column>
                <el-table-column prop="refrenceBranchName" label="推荐人" min-width="80"></el-table-column>
                <el-table-column prop="realAmount" label="提成金额" min-width="80" align="right">
                    <template slot-scope="scope">
                        <span v-if="scope.row.realAmount||scope.row.realAmount==0">{{scope.row.realAmount.toQFW()}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="expertRate" label="比例" min-width="80">
                    <template slot-scope="scope">
                        <span v-if="scope.row.expertRate">{{scope.row.expertRate}}%</span>
                    </template>
                </el-table-column>
                
                <el-table-column prop="customerName" label="可提成金额" min-width="80" align="right">
                    <template slot-scope="scope">
                        <span v-if="scope.row.mon||scope.row.mon==0">{{scope.row.expertAmount.toQFW()}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <el-dialog title="订单详情" :visible.sync="ispopRead"  top="5%"  size="" :close-on-click-modal="false">
            <det v-if="ispopRead" :data="selectData" style="width:950px"></det>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import  "@/style/selfCommon.less"
    import det from "@/page/FinanceManage/ReportManage/com/reportRead"
    import { getCookie, delCookie } from '@/config/mUtils'
    import {GetExpertSummaryReport,GetDropDownPermission,GetExpertReportDetail,UpdateExpertIsFinished,GeneratorExpertConsume,UpdateExpertByIds,GetSupplierBySupTypeCode} from "@/api/myData"
    export default {
        // name: "VideoManage",
        data () {
            return {
                allLoading:false,
                ispopRead:false,
                selectData:{},
                totalAmount:"",
                loading:false,
                makeLoading:false,
                hospitalCode:"",
                commandhosCode:'',
                date:new Date(),
                dialogView:false,
                currentPage:1,
                total:0,
                pageSize:10,
                keywords:"",
                formInline:{
                    isCurrentMonth:false,
                    hospital:"",
                    hospitalCode:"",
                    hospitalName:"",
                    date:new Date(),
                    startDate:"",
                    endDate:"",
                    IsFinished:"0",
                },
                tableData:[],
                detData:[],
                hospitalList:[],
                multipleSelection:[],
                refHospitalList:[],
            }
        },
        computed:{
            computedDate(){
                let f = String(this.date).length>0?false:true
                return f
            },
            settleAmount(){
                let amount = 0
                this.multipleSelection.forEach(row=>{
                    amount = amount.add(row.expertAmount)
                })
                return amount
            }
        },

        mounted(){
            this.GetDropDownPermission()
        },
        methods:{
            Dsettle(){
                if(this.multipleSelection.length>0 ){
                    this.$confirm('是否进行结算?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        let  arr = []
                        this.multipleSelection.forEach(row=>{
                            arr.push(row.id)
                        })
                        this.UpdateExpertByIds({
                            ids:arr.join(",")
                        })
                    }).catch(() => {
                });
                }else{
                    this.$message({ type: 'error', message: '请选择要结算的单号' })
                }
            },
            async UpdateExpertByIds(params){
                let res = await UpdateExpertByIds(params)
                if(res.status){
                    this.$message({ type: 'success', message: '结算成功' })
                    this.search()
                    this.dialogView = false
                }else{
                    this.$message({ type: 'warning', message: '结算失败!'+res.errorMessage })
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 结算
            settle(index,data){
                // this.$confirm('是否进行结算?', '提示', {
                //     confirmButtonText: '确定',
                //     cancelButtonText: '取消',
                //     type: 'warning'
                //     }).then(() => {
                //         this.UpdateExpertIsFinished({
                //             "refrenceBranchCode": data[index].refrenceBranchCode,
                //             "refrenceBranchName": data[index].refrenceBranchName,
                //             "hospitalCode": data[index].hospitalCode,
                //             "hospitalName": data[index].hospitalName,
                //             "realAmount": data[index].realAmount,
                //             "expertRate": data[index].expertRate.div(100),
                //             "expertAmount": data[index].expertAmount,
                //             "createUserId": getCookie("userId"),
                //             "createBy": getCookie("userName"),
                //             endDate:this.saveEnd,
                //         })
                //     }).catch(() => {
                // });
                const h = this.$createElement;
                this.$msgbox({
                    title: '提示',
                    message: h('p', null, [
                        h('span', null, '是否进行结算? '),
                    ]),
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = '执行中...';
                            this.UpdateExpertIsFinished({
                                "refrenceBranchCode": data[index].refrenceBranchCode,
                                "refrenceBranchName": data[index].refrenceBranchName,
                                "hospitalCode": data[index].hospitalCode,
                                "hospitalName": data[index].hospitalName,
                                "realAmount": data[index].realAmount,
                                "expertRate": data[index].expertRate.div(100),
                                "expertAmount": data[index].expertAmount,
                                "createUserId": getCookie("userId"),
                                "createBy": getCookie("userName"),
                                endDate:this.saveEnd,
                                isCurrentMonth:this.formInline.isCurrentMonth?1:0
                            })
                            instance.confirmButtonLoading = false;
                            done();
                        } else {
                            done();
                        }
                    }
                }).then(action => {});
            },

            async UpdateExpertIsFinished(params){
                let res = await UpdateExpertIsFinished(params)
                if(res.status){
                    this.$message({ type: 'success', message: '结算成功' })
                    this.search()
                }else{
                    this.$message({ type: 'warning', message: '结算失败!'+res.errorMessage })
                }
            },

            getSummaries(param) {
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '合计';
                        return;
                    }
                    const values = data.map(item => Number(item[column.property]));
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                           return prev.add(curr) ;
                        } else {
                            return prev;
                        }
                        }, 0);
                        sums[index] =sums[index].toQFW();
                    } else {
                        sums[index] = '';
                    }
                });
                sums[1] = ""
                sums[2] = ""
                sums[3] = ""
                sums[4] = ""
                sums[6] = ""
                return sums;
            },

            async GetDropDownPermission(){
                let res1 = await GetDropDownPermission({typeId: 1});
                this.refHospitalList = await GetSupplierBySupTypeCode({SupTypeCode:"001"});
                this.hospitalList = res1.data
                this.hospitalCode = res1.data[0].code
            },

            onSubmit(){
                this.currentPage = 1
                this.search()
            },
            async GetExpertReportDetail(params){
                let res = await GetExpertReportDetail(params)
                this.loading = false
                res.data.forEach(row=>{
                    row.mon = row.expertRate.mul(row.realAmount)
                    row.expertRate = row.expertRate.mul(100)
                })
                 this.detData = JSON.parse(JSON.stringify(res.data))
            },
            async GetExpertSummaryReport(params,index){
                let res = await GetExpertSummaryReport(params)
                this.loading = false
                res.data.forEach(row=>{
                    row.mon = row.expertRate.mul(row.realAmount)
                    row.expertRate = row.expertRate.mul(100)
                })
                this.tableData = JSON.parse(JSON.stringify(res.data))
            },

            search(){
                this.saveHos = this.commandhosCode
                this.saveEnd = String(this.date).length>0?this.date.formatDate("yyyy-MM-dd"):""
                this.finish = this.formInline.IsFinished
                this.loading = true
                this.GetExpertSummaryReport({
                    startDate:"",
                    endDate:String(this.date).length>0?this.date.formatDate("yyyy-MM-dd"):"",
                    RefHospitalCode:this.hospitalCode,
                    HospitalCode:this.commandhosCode,
                    Keywords:this.keywords,
                    IsFinished:this.formInline.IsFinished,
                    isCurrentMonth:this.formInline.isCurrentMonth?1:0
                })
            },
            view(index,data){
                this.multipleSelection = []
                this.dialogView = true
                this.totalAmount = data[index].mon
                this.GetExpertReportDetail({
                    startDate:"",
                    endDate:this.saveEnd,
                    HospitalCode:this.saveHos,
                    // RefHospitalCode:this.commandhosCode,
                    Keywords:data[index].refrenceBranchCode,
                    IsFinished:0
                })
            },
            generate(){
                if(this.commandhosCode ==""){
                    this.$message({
                        message: '请先选择执行医院！',
                        type: 'warning'
                    });
                }else{
                    let data = this.date.formatDate("yyyy-MM-dd")
                    this.$confirm('是否生成截止时间到'+data+'的数据？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        this.makeLoading = true
                        this.GeneratorExpertConsume()
                    }).catch(() => {
                            
                    });
                }
            },
            async GeneratorExpertConsume(){
                let res = await GeneratorExpertConsume({
                    EndDate:String(this.date).length>0?this.date.formatDate("yyyy-MM-dd"):"",
                    hospitalCode:this.commandhosCode
                })
                this.makeLoading = false
                 if(res.status){
                    this.$message({ type: 'success', message: '生成成功' })
                    // this.search()
                }else{
                    this.$message({ type: 'warning', message: '生成失败!'+res.errorMessage })
                }
            },
            getPD(data){
                this.selectData = data
                this.ispopRead = true
            },
        },
        components: {
            det
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
