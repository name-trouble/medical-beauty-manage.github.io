<template>
    <div>
        <reportSearch :searchCondition="searchCondition" ref="search" :filter-back="filter"></reportSearch>
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" max-height="560" class="min_table" v-loading="loading">
            <el-table-column prop="FxCode" width="120" label="订单编号">
                <template slot-scope="scope">
                     <span class="table_btn" @click="read(scope.$index)" type="text" size="small" >{{scope.row.FxCode}}</span>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="OrderType" label="类型" width="80">
               <template slot-scope="scope">
                    <el-tag type="danger" v-if="scope.row.OrderType == 1">{{scope.row.ConsumeTypeId|filFun}}</el-tag>
                    <el-tag type="success" v-if="scope.row.OrderType == 2">{{scope.row.ConsumeTypeId|filFun}}</el-tag>
                </template>
            </el-table-column> -->
            <el-table-column prop="OrderDate" width="100" label="订单日期">
                <template slot-scope="scope">
                    <span v-if="scope.row.OrderDate">
                        {{scope.row.OrderDate.substring(0,10)}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="FormNO" label="纸质单号" min-width="100"></el-table-column>
            <el-table-column prop="HospitalName" label="医院" width="170"></el-table-column>
            <el-table-column prop="CustomerName" label="客户" min-width="100"></el-table-column>
            <el-table-column prop="RefrenceBranchName" label="推荐人" min-width="100">
                <template slot-scope="scope">
                    {{scope.row.RefrenceBranchName}}<span v-if="scope.row.RefrenceBranchTags">({{scope.row.RefrenceBranchTags}})</span>
                </template>
            </el-table-column>
            <el-table-column prop="ProjectName" label="项目名称" min-width="150" show-overflow-tooltip></el-table-column>
            <el-table-column prop="OrderAmount" label="订单金额" min-width="90" align="right">
                <template slot-scope="scope">
                    <span v-if="scope.row.OrderAmount">￥{{scope.row.OrderAmount.toQFW()}}</span>
                    <span v-else>￥0</span>
                </template>
            </el-table-column>
            <el-table-column prop="Price" label="已支付" min-width="90" align="right">
                <template slot-scope="scope">
                    <span v-if="scope.row.RealAmount">￥{{scope.row.RealAmount.toQFW()}}</span>
                    <span v-else>￥0</span>
                </template>
            </el-table-column>
            <el-table-column prop="RefundAmount" label="退款金额" width="90" align="right">
                <template slot-scope="scope">
                    <span v-if="scope.row.RefundAmount">￥{{scope.row.RefundAmount.toQFW()}}</span>
                    <span v-else>￥0</span>
                </template>
             </el-table-column>
            <el-table-column label="付款状态" width="90">
                <template slot-scope="scope">
                    <div v-if="scope.row.ApproveState !=6&&scope.row.ApproveState!=10">
                         <el-tag type="success" v-if="scope.row.IsPayOff==true">已付清</el-tag>
                        <el-tag type="warning" v-else>未付清</el-tag>
                    </div>
                    <el-tag type="danger" v-if="scope.row.ApproveState ==6">已退款</el-tag>
                    <el-tag type="danger" v-if="scope.row.ApproveState ==10">已关闭</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="CommandState" label="执行状态" min-width="150">
                <template slot-scope="scope">
                    <div style="width: 80px;float: left">
                        <el-tag type="gray" v-if="scope.row.CommandState == 0">未执行</el-tag>
                        <el-tag type="warning" v-if="scope.row.CommandState == 1">执行中</el-tag>
                        <el-tag type="success" v-if="scope.row.CommandState == 2">执行完毕</el-tag>
                    </div>
                    <div style="float: left" v-if="scope.row.IsPayOff==true">
                        <span v-if="scope.row.CurrentCourse">{{scope.row.CurrentCourse}}</span>
                        <span v-else>0</span>
                        <span v-if="scope.row.Course">/{{scope.row.Course}}</span>
                    </div>
                </template>
            </el-table-column>

            <el-table-column prop="IsReturn" label="返款状态" width="100">
                <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.IsReturn">已返款</el-tag>
                    <el-tag type="danger" v-else>未返款</el-tag>
                </template>
             </el-table-column>
               
            <el-table-column prop="CommandState" label="操作" min-width="150">
                <template slot-scope="scope">
                   <el-button @click="back(scope.row,0)" type="primary" size="small" :disabled="scope.row.IsReturn||scope.row.ApproveState ==10||scope.row.ApproveState ==6">返款</el-button>
                   <el-button @click="back(scope.row,1)" type="primary" size="small" :disabled="!scope.row.IsReturn">返款编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

        <el-dialog ref="pay" title="查看详情" :visible.sync="ispopRead" top="5%" @close="ispopRead=false" size="">
            <pop-read v-if="ispopRead" :data="selectData" style="width:950px"></pop-read>
        </el-dialog>
        <el-dialog ref="pay" title="返款信息" :visible.sync="isBack" top="10%" size="">
            <Back v-if="isBack" :mes="mes" @close="close" style="width:800px"></Back>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import reportSearch from "../ReportManage/com/reportSeach.vue"
    import { GetProofOrder,getBaseDataByCode } from "@/api/myData"
    import PopRead from '../ReportManage/com/reportRead.vue'
    import Back from "./components/back.vue"
    import '@/style/yqCom.less'
    var _this 
    export default {
        components: { reportSearch, PopRead,Back },
        data() {
            return {
                loading:false,
                currentIndex: 0,
                size: 10,
                total: 0,
                currentPage: 1,
                tableData: [],
                searchCondition: {
                    label: "更新时间",
                    type: "2",
                    tHeader: ['订单编号', '订单日期', '纸质单号', '客户', '推荐人', '项目名称', '订单金额', '已支付', '付款状态', '疗程', '已执行', '执行状态', '订单类型'],
                    filterVal: ['FxCode', 'CreateOn', 'FormNO', 'CustomerName', 'RefrenceBranchName', 'ProjectName', 'OrderAmount', 'RealAmount', 'IsPayOff', 'Course','CurrentCourse','CommandState','OrderType'],
                    tableData1: [],
                    name: "报单管理",
                    refund:false
                },
                ispopRead: false,
                isBack:false,
                selectData: [],
                mes:{},
                fxCode: "",  //当前选中的 fxCode
                consumeList:[],//提成类型
            }
        },
         filters:{
            filFun(val){
                let len = _this.consumeList.length
                let list =  _this.consumeList
                for(var i = 0;i<len;i++){
                    if(val == list[i].DataCode){
                        return list[i].DataName
                    }
                }
            }
        },
        mounted() {
             _this = this
            this.getType()
        },
        methods: {
            async getProofOrder(params, index) {
                try {
                    this.loading = true
                    let res = await GetProofOrder(params)
                    this.loading = false
                    if(res.status){
                        this.total = res.count
                        this.tableData = res.data
                        this.searchCondition.tableData1 = this.dealData(res.data)
                    }else{
                        this.$message.error('获取数据失败')
                    }
                } catch (err) {
                }
            },

             async getType(){
                this.consumeList = await getBaseDataByCode("0017")
                this.$refs.search.onSubmit()
            },

            dealData(data){
                let arr = JSON.parse(JSON.stringify(this.tableData))
                arr.forEach(row=>{
                    row.CommandState =  this.getStep(row.CommandState)
                    row.OrderType = row.OrderType == '1'?'线上':'线下'
                    if(row.ApproveState == 10){
                        row.IsPayOff = "已关闭"
                    }else if(row.ApproveState == 6){
                        row.IsPayOff = "已退款"
                    }else{
                        if(row.IsPayOff){
                        row.IsPayOff = "已结清"
                        }else{
                            row.IsPayOff = "未结清"
                        }
                    }
                })
                return arr
            },

            getStep(step){
                switch (step){
                    case 0: return '未执行';
                    case 1: return '执行中';
                    case 2: return '执行完毕';
                }
            },

            addFinish() {
                this.ispopAdd = false
                this.$refs.search.onSubmit()
            },

            editFinish() {
                this.ispopEdit = false
                this.$refs.search.onSubmit()
            },

            editRefund(data){

            },

            //            搜索获取条件
            filter(val) {
                this.getProofOrder({
                    startDate: val.startTimeF,
                    endDate: val.endTimeF,
                    mStartDate: val.startTimeS,
                    mEndDate: val.endTimeS,
                    fxCode: val.bill,
                    formNO: val.num,
                    projectName: val.projectName,
                    // isPayOff: val.IsPayOff,
                     isPayOff: 1,//付清
                    commandState: val.CommandState,
                    // commandState: 2,//执行完毕
                    orderType: val.OrderType,
                    customerName: val.customer,
                    referrerName: val.rec,
                    ApproveState: val.ApproveState,
                    // ApproveState: 2,//审核完毕
                    SettState: val.SettState,
                    pageIndex: this.currentPage,
                    pageSize: this.size,
                    hospitalCode:val.hospital,
                    ConsumeTypeId:7,//提成类型 7 返款
                    // ConsumeTypeId:val.ConsumeTypeId,//提成类型
                    IsReturn:val.IsReturn
                })
            },
            handleSizeChange(val) {
                this.size = val
                this.$refs.search.onSubmit()
            },

            handleCurrentChange(val) {
                this.currentPage = val
                this.$refs.search.onSubmit()
            },

            //            查看
            read(index) {
                this.selectData = this.tableData[index]
                this.ispopRead = true
            },
            // 返款
            back(data,ope){
                this.mes = JSON.parse(JSON.stringify(data))
                this.mes.edit = ope
                this.isBack = true
            },
            close(val){
                if(val){
                    this.$refs.search.onSubmit()
                }
                this.isBack = false
            }
        },

    }
</script>

<style scoped>
    .shelve {
        display: inline-block;
        width: 132px;
        height: 36px;
        line-height: 36px;
        font-size: 12px;
        color: #333;
        text-align: center;
        cursor: pointer;
        margin-top: 10px;
        border-radius: 3px;
    }

    .shelve.active {
        color: #fff;
        background: #20a0ff;
    }

    .shelve:hover {
        color: #fff;
        background: #4db3ff;
    }

    .block{
        text-align: right;
    }
    .overflow_col{
        width: 100%;
    }
</style>
