<template>
    <div class="settled selCommon">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px" >
            <el-form-item label="筛选日期："  class="form_item_mt10 ">
                <el-date-picker
                    v-model="date"
                    type="daterange"
                    style="width: 200px;"
                    value-format="yyyy-MM-dd"
                    :clearable="false"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="代理等级：" class="form_item_mt10">
                <el-select v-model="formInline.branchGradeCode" class="form_item">
                    <el-option v-for="item in branchGradeList" :label="item.BranchGradeName" :value="item.Code" :key="item.Id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="提成来源：" class="form_item_mt10">
                <el-select v-model="formInline.consumeSource" class="form_item">
                    <el-option v-for="item in baseDataList" :label="item.dataName" :value="item.dataCode" :key="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label=" " class="form_item_mt10 form_item_wh280">
                <el-button type="primary" @click="submit" class="searchBtn">查询</el-button>
                <Export ref="port" :tHeader="tHeader" :filterVal='filterVal' :tableData1='reportData' :name='name'></Export>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" class="min_table smt" v-loading="loading" max-height="660" show-summary :summary-method="getSummaries">
            <el-table-column prop="branchName" label="代理姓名" min-width="80" align="center"></el-table-column>
            <el-table-column prop="branchGradeName" label="代理等级名称" min-width="80"></el-table-column>
            <el-table-column label="开户人" prop="toName" min-width="100">
                <template slot-scope="scope">
                     {{scope.row.bankCardHolder}}
                 </template>
            </el-table-column>
            <el-table-column label="开户行" prop="toName" min-width="100">
                <template slot-scope="scope">
                    <span>{{scope.row.openBankName}}</span>
                </template>
            </el-table-column>
             <el-table-column label="银行卡号" prop="toName" min-width="100" align="center">
                 <template slot-scope="scope">
                     {{scope.row.bankCardId}}
                 </template>
             </el-table-column>
            <el-table-column label="金额" prop="consumeAmount" min-width="120" align="right" style="color: red">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="det(scope.$index,tableData)"  style="float: right;">￥{{scope.row.consumeAmount.toQFW()}}</el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作" prop="toName" width="120" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="settle(scope.$index,tableData)">结算</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="float:left">
            <el-button @click="batchSet" type="primary" :loading="batchLoading">一键审核</el-button>
        </div>
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
        </div>
        <el-dialog title="详情" :visible.sync="dialogTableVisible" size="" @close='dialogClose'>
            <det style="width:1100px" :mes="mes" :date="date" @reportData='childReportData' @detSettle="detSettle" v-if="dialogTableVisible" @openRP="openRP" :is-finished="formInline.type"></det>
        </el-dialog>
        <el-dialog title="订单详情" :visible.sync="ispopRead" top="5%" size="">
            <report style="width:900px" v-if="ispopRead" :data="selectData" ></report>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import det from "./components/branchSD2.vue"
    import report from "@/page/FinanceManage/ReportManage/com/reportRead"
    import Export from '@/components/export'
    import {GetHospitalOut2,GetDropDownPermission,HosOutSettle2,BatchApproveProofOrder,GetSupplierBySupTypeCode,GetBranchGradeAll,GetBaseDataDicByCode} from "@/api/myData"
    import "@/style/selfCommon.less"
    export default {
        data () {
            return {
                batchLoading:false,
                selectData:{},
                ispopRead:false,
                loading:false,
                mes:{},
                branchGradeList: [],
                baseDataList: [],
                dialogTableVisible:false,

                HospitalList:[],
                formInline: {
                    branchGradeCode: '',
                    consumeSource: '',
                    type:false,
                },
                pageDate: null,
                typeList: [{value: 0, key: "未结算"}, {value: 1, key: "已结算"}],
                date: [].pushFullMonth(),
                agentList:[],
                tableData:[],
                year:new Date().getFullYear(),
                month:"",
                yearList:[],
                monthList:[],
                sum:{
                    consumeAmount:0,
                },
                total:0,
                currentPage:0,
                size:10,
                allData:[],
                detData:[],//子组件表格数据
            }
        },
        computed: {
            /* 导出报表参数 tHeader,filterVal,tableData1*/
            tHeader(){
                if(this.detData.length>0){//子组件键值
                    return ['提成来源名称', '单号', '客户', '提成受益人', '提成等级','比例','提成金额']
                }else{
                   return ['代理姓名', '代理等级名称', '开户人', '开户行','银行卡号','金额']
                }
            },
            filterVal(){
                if(this.detData.length>0){//子组件键值
                    return ['consumeSourceName','fxCode','customerName','toName','conLevel','rate','consumeAmount']
                }else{
                    return ['branchName', 'branchGradeName', 'bankCardHolder', 'openBankName','bankCardId','consumeAmount']
                }
            },
            name(){
                return '医院结算'
            },
            reportData(){
                let arr
                if(this.detData.length>0){
                    arr = JSON.parse(JSON.stringify(this.detData))
                    arr.forEach(ele=>{
                        ele.rate = ele.rate.mul(100)+'%'
                    })
                }else{
                    arr = JSON.parse(JSON.stringify(this.allData))
                }
                return arr
            },
            totalAmount(){
                let sum = 0
                this.tableData.forEach(row=>{
                    sum  = sum.add(row.consumeAmount)
                })
                return sum
            }
        },

        mounted(){
            // this.getSupplierByPage()
            this.getBranchGradeAll()
            this.GetBaseDataDicByCode()
        },
        methods: {
            dialogClose(){
                this.submit()
                this.detData = []
            },
            childReportData(obj){
                this.detData = obj
                this.$refs.port.handleDownload()
            },
            getSummaries(param) {
                return ["总合计",'','','','','￥'+this.sum.consumeAmount.toQFW(),''];
            },
            async getBranchGradeAll(){
                try{
                    let res = await GetBranchGradeAll();
                    this.branchGradeList = this.numOrder(res);
                }catch(err){
                    console.log(err)
                }
            },
            numOrder(data){
                let len = data.length
                let arr = []
                for(let i =0;i<len-1;i++){
                    for(let j = i+1;j<len;j++){
                        if(data[i].OrderNum>data[j].OrderNum){
                            let temp = data[i]
                            data[i] = data[j]
                            data[j] = temp
                        }
                    }
                }
                return data
            },
            async GetBaseDataDicByCode(){
                try{
                    let res = await GetBaseDataDicByCode({businessCode: '0040'});
                    this.baseDataList = res.data;
                }catch(err){
                    console.log(err)
                }
            },

//            结算
            async HosOutSettle(params){
                try {
                    if (this.date && this.date.length === 2) {
                        params.startDate = this.date[0];
                        params.endDate = this.date[1];
                    } else {
                        params.startDate = '';
                        params.endDate = '';
                    }
                    if (this.formInline.consumeSource) {
                        params.consumeSource = this.formInline.consumeSource
                    }
                    let res = await HosOutSettle2(params)
                    if(res.status){
                        this.$message({message: '结算成功', type: 'success'});
                        this.search()
                    }else{
                        this.$message.error('结算失败')
                    }
                } catch (err) {
                    console.log(err)
                }
            },
            detSettle(){
                this.dialogTableVisible = false
                this.search()
            },
//            获取信息表
            async GetHospitalOut(params){
                try {
                    this.loading = true
                    if (this.date && this.date.length === 2) {
                        params.startDate = this.date[0];
                        params.endDate = this.date[1];
                    } else {
                        params.startDate = '';
                        params.endDate = '';
                    }
                    params.type = params.type?1:0;
                    params.pageIndex = this.currentPage;
                    params.pageSize = this.size;
                    let res = await GetHospitalOut2(params)
                    this.loading = false
                    if(res.status){
                        this.total = res.count
                        this.allData = res.data
                        this.tableData = res.data
                        this.getTotal()
                    }else{
                        this.$message.error('获取数据失败'+res.errorMessage);
                    }
                } catch (err) {
                    console.log(err)
                }
            },
            submit(){
                this.currentPage = 1
                this.search()
            },
//            搜索
            search(){
                this.sum = {
                    consumeAmount:0,
                }

                this.GetHospitalOut(this.formInline)
            },
//结算事件
            settle(index,data){
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
                            this.HosOutSettle({
                                branchCode: data[index].branchCode
                            })
                            instance.confirmButtonLoading = false;
                            done();
                        } else {
                            done();
                        }
                    }
                }).then(action => {});
            },
            det(index,data){
                this.mes = data[index]
                this.mes.consumeSource = this.formInline.consumeSource
                this.dialogTableVisible = true
            },
            openRP(val){
                this.selectData = val
                this.ispopRead = true
            },
            handleSizeChange(val) {
                if (this.size === val) return;
                this.size = val
                this.search()
            },

            handleCurrentChange(val) {
                if (this.currentPage === val) return;
                this.currentPage = val
                this.search()
            },
            getTotal(){
                this.allData.forEach(row=>{
                   this.sum.consumeAmount = this.sum.consumeAmount.add(row.consumeAmount)
               })
                this.tableData.forEach(row=>{
                    this.sum.consumeAmount = this.sum.consumeAmount.add(row.consumeAmount)
                })
            },
            // 批量审核
            batchSet(){
                if (!this.date || this.date.length !== 2) {
                    this.$alert('请选择需要批量审核的日期区间 ！', '提示', {
                        confirmButtonText: '确定',
                        type: 'warning',
                        callback: action => {}
                    });
                    return;
                }
                this.$confirm(`此操作将批量审核 ${this.date[0]} - ${this.date[1]} 的订单，是否继续?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.batchLoading = true
                    this.BatchApproveProofOrder()
                }).catch(() => {});

            },
            async BatchApproveProofOrder(){
                let res = await BatchApproveProofOrder({
                    startDate: this.date[0],
                    endDate: this.date[1]
                })
                if(res.status){
                    this.allCheckdialog = false
                    this.$message({ type: 'success', message: '审核成功!' })
                    this.search()
                }else{
                    this.$message({ type: 'error', message: '审核失败!'+res.errorMessage })
                }
                this.batchLoading = false
            }
        },
        components: {
            Export,
            det,
            report
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
