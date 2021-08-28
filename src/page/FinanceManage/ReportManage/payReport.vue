<template>
    <div>
        <reportSearch :searchCondition="searchCondition" ref="search" :filter-back="filter"></reportSearch>
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" max-height="560" class="min_table smt" v-loading="loading">
            <el-table-column prop="FxCode" min-width="100" label="订单编号">
                <template slot-scope="scope">
                   <span class="table_btn" @click="read(scope.$index)" type="text" size="small" >{{scope.row.FxCode}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="OrderType" label="订单来源" min-width="80" align="center">
                <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.OrderType==1">app订单</el-tag>
                    <el-tag type="success" v-if="scope.row.OrderType==2">线下订单</el-tag>
                    <el-tag type="success" v-if="scope.row.OrderType==3">分期</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="OrderType" label="规则类型" width="95">
                <template slot-scope="scope">
                   <el-tag type="success">{{scope.row.ConsumeTypeId|filFun}}</el-tag>
                    <!-- <el-tag type="danger" v-if="scope.row.OrderType == 1">{{scope.row.ConsumeTypeId|filFun}}</el-tag>
                    <el-tag type="success" v-if="scope.row.OrderType == 2">{{scope.row.ConsumeTypeId|filFun}}</el-tag> -->
                </template>
            </el-table-column>
            <el-table-column prop="MedicalTypeId" label="支付类型" width="85">
                <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.MedicalTypeId != null">{{scope.row.MedicalTypeId|filFunM}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="OrderDate" width="90" label="订单日期">
                <template slot-scope="scope">
                     <span v-if="scope.row.OrderDate">
                        {{scope.row.OrderDate.substring(0,10)}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="FormNO" label="纸质单号" min-width="90"></el-table-column>
            <el-table-column prop="HospitalName" label="医院" min-width="150"></el-table-column>
           <el-table-column prop="CustomerName" label="客户" min-width="90">
                <template slot-scope="scope">
                    <el-button type="text" @click="view(scope.$index,tableData)" v-if="scope.row.IsBranch == 1" style="color:black">{{scope.row.CustomerName}}</el-button>
                    <el-button type="text" @click="view(scope.$index,tableData)" v-else style="color:red">{{scope.row.CustomerName}}</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="RefrenceBranchName" label="推荐人" min-width="90">
                <template slot-scope="scope">
                    {{scope.row.RefrenceBranchName}}<span v-if="scope.row.RefrenceBranchTags">({{scope.row.RefrenceBranchTags}})</span>
                </template>
            </el-table-column>
            <el-table-column prop="ProjectName" label="项目名称" min-width="150" show-overflow-tooltip></el-table-column>
            <el-table-column prop="OrderAmount" label="订单金额" min-width="90" align="right" >
                <template slot-scope="scope">
                    <span v-if="scope.row.OrderAmount">￥{{scope.row.OrderAmount.toQFW()}}</span>
                    <span v-else>￥0</span>
                </template>
            </el-table-column>
            <el-table-column prop="Price" label="已支付" min-width="90" align="right" >
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
             <el-table-column label="付款状态" min-width="90">
                <template slot-scope="scope">
                    <div v-if="scope.row.ApproveState !=6&&scope.row.ApproveState!=10">
                        <el-tag type="success" v-if="scope.row.IsPayOff==true">已付清</el-tag>
                        <el-tag type="warning" v-else>未付清</el-tag>
                    </div>
                    <div v-if="scope.row.ApproveState ==6">
                        <el-tag type="danger">已退款</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="CommandState" label="执行状态" min-width="125">
                <template slot-scope="scope">
                    <div style="width: 60px;float: left">
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
            <!-- <el-table-column prop="ApproveState" label="订单状态" width="90">
                <template slot-scope="scope">
                    <el-tag type="warning" v-if="scope.row.ApproveState==0||scope.row.ApproveState==null">未审核</el-tag>
                    <el-tag type="waning" v-if="scope.row.ApproveState==1">部分审核</el-tag>
                    <el-tag type="success" v-if="scope.row.ApproveState==2">审核完毕</el-tag>
                    <el-tag type="danger" v-if="scope.row.ApproveState == 10">已关闭</el-tag>
                    <el-tag type="danger" v-if="scope.row.ApproveState == 6">已退款</el-tag>
                </template>
            </el-table-column> -->
            <el-table-column prop="CommandState" label="操作" fixed="right" min-width="240">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.$index)" type="primary" size="small" :disabled="scope.row.ApproveState==10||scope.row.ApproveState==6">支付</el-button>
                    <el-button @click="refund(scope.$index)" v-if="scope.row.ApproveState !=6" type="primary" size="small" :disabled="scope.row.ApproveState==10">退款</el-button>
                    <el-button @click="refundCan(scope.row)" v-if="scope.row.ApproveState ==6" type="primary" size="small">退款撤销</el-button>
                    <el-button @click="stage(scope.row)" type="primary" size="small" :disabled="scope.row.ApproveState==10||scope.row.ApproveState==6||scope.row.OrderType != 3||scope.row.IsPayOff!=false||scope.row.IsStageOff==1">分期支付</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

        <el-dialog ref="pay" title="支付报单" :visible.sync="ispopEdit" top="5%" @close="ispopEdit=false" size=""  :close-on-click-modal="false">
            <pop-edit v-if="ispopEdit" @popAddClose='editFinish' :ope="ope" :data="selectData" style="width:1000px"></pop-edit>
        </el-dialog>

        <el-dialog ref="pay" title="查看详情" :visible.sync="ispopRead" top="5%" @close="ispopRead=false" size=""  :close-on-click-modal="false">
            <pop-read v-if="ispopRead" :data="selectData" style="width:1000px"></pop-read>
        </el-dialog>

         <el-dialog ref="pay" title="退款" :visible.sync="ispopRefund" top="5%" size=""  :close-on-click-modal="false">
            <PopRefund v-if="ispopRefund" @close='cmdClose' :fx-code="fxCode" style="width:800px;"></PopRefund>
        </el-dialog>

        <el-dialog title="客户详情" :visible.sync="dialogView"  top="5%"  size="" :close-on-click-modal="false">
            <CustomerView :mes="cusMes" style="width: 1100px"  v-if="dialogView"></CustomerView>
        </el-dialog>

        <el-dialog ref="pay" title="支付信息" :modal='false' :visible.sync="ispopPay" top="30%" @close="ispopPay=false" :lock-scroll="false" size="">
            <pop-pay @popClose="getPayInfo" :project-code="stageMes.ProjectId" :accountList="accountList" :payMes="payMes" :stagePay="stagePay"
            :code="stageMes.CustomerId" :price="stageMes.Price" :totalAmount="stageMes.OrderAmount" style="width:500px" v-if="ispopPay"></pop-pay>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import reportSearch from "./com/reportSeach.vue"
    import { GetProofOrder ,ProofOrderClose,getBaseDataByCode,GetHospitalAccountByCode,getProofOrderDetail,OrderRefundReturn} from "@/api/myData"
    import PopEdit from './com/reportEdit.vue'
    import PopRead from './com/reportRead.vue'
     import PopRefund from "./com/refund.vue"
     import CustomerView from "./com/customerDetail.vue"
    import '@/style/yqCom.less'
    import PopPay from "./com/payInfo";
    var _this
    export default {
        components: { reportSearch, PopEdit, PopRead,PopRefund ,CustomerView, PopPay},
        data() {
            return {
                // date:new Date().formatDate("yyyy-MM-dd"),
                ispopPay:false,
                loading:false,
                cusMes:{},
                dialogView:false,
                currentIndex: 0,
                size: 10,
                total: 0,
                currentPage: 1,
                tableData: [],
                searchCondition: {
                    label: "更新时间",
                    type: "0",
                    tHeader: ['订单编号', '订单日期', '纸质单号', '客户', '推荐人', '项目名称', '订单金额', '已支付', '付款状态', '疗程', '已执行', '执行状态', '订单类型'],
                    filterVal: ['FxCode', 'CreateOn', 'FormNO', 'CustomerName', 'RefrenceBranchName', 'ProjectName', 'OrderAmount', 'RealAmount', 'IsPayOff', 'Course','CurrentCourse','CommandState','OrderType'],
                    tableData1: [],
                    name: "报单管理",
                    IsPayOff:"0"//默认付款的搜索条件
                },
                ispopRefund: false,
                ispopEdit: false,
                ispopRead: false,
                selectData: [],
                fxCode: "",  //当前选中的 fxCode
                ope:false,
                consumeList:[],
                medicalList:[],

                accountList:[],
                payMes:{},
                stagePay:{
                    orderType:0,
                    course:0,//期数
                    currentC:0,//当前期数
                    satgeM:0,//分期金额
                    fxCode:'',
                },
                stageMes:{}
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
            },
            filFunM(val){
                let len = _this.medicalList.length
                let list =  _this.medicalList
                for(var i = 0;i<len;i++){
                    if(val == list[i].DataCode){
                        return list[i].DataName
                    }
                }
            },
        },
        mounted() {
            _this = this
            this.getType()
        },
        methods: {
            refundCan(data){
                this.$confirm('确定撤销退款?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.OrderRefundReturn({fxcode:data.FxCode})
                })
            },

            async OrderRefundReturn(params){
                let res = await OrderRefundReturn(params)
                if(res.status){
                        this.$message({message: '操作成功',type: 'success'});
                        this.$refs.search.onSubmit()
                    }else{
                        this.$message.error('操作失败');
                    }
            },
            getPayInfo(){
                this.ispopPay = false
            },
            getFWF(data,code){
                
                let course = 0,currentC=0,stageM = 0
                data.forEach(ele=>{
                    if(ele.TypeId == 2){
                    course = ele.Course
                    currentC +=ele.CurrentCourse
                    stageM = ele.StageAmount
                    }
                })
                this.stagePay.orderType = 3
                this.stagePay.fxCode = code
                this.stagePay.course = course
                this.stagePay.currentC = currentC
                this.stagePay.stageM = stageM
            },

            async stage(data){
                let res = await GetHospitalAccountByCode({
                    hospitalCode: data.HospitalId
                });
                this.accountList = res.data;
                
                let res1 = await getProofOrderDetail(data.FxCode)
                this.getFWF(res1.ProofOrderExtList,data.FxCode)
                this.ispopPay = true
                this.stageMes = data
            },
            view(index,data){
                this.cusMes = data[index]
                this.dialogView = true
            },
            async getType(){
                let [consumeList,medicalList] = await Promise.all([getBaseDataByCode("0017"),getBaseDataByCode("0022")])
                this.consumeList = consumeList
                this.medicalList = medicalList
            },
            async ProofOrderClose(params) {
                
                try {
                    
                    let res = await ProofOrderClose(params)
                    if(res.status){
                        this.$message({message: '成功关闭',type: 'success'});
                        this.$refs.search.onSubmit()
                    }else{
                        this.$message.error('操作失败');
                    }
                } catch (err) {
                }
            },
            async getProofOrder(params, index) {
                
                this.loading = true
                try {
                    let res = await GetProofOrder(params)
                    if(res.status){
                        this.total = res.count
                        this.tableData = res.data
                        this.searchCondition.tableData1 = this.dealData(res.data)
                    }else{
                        this.$message({ type: 'error', message: '获取数据失败!'+res.errorMessage })
                    }
                    this.loading = false
                } catch (err) {
                }
            },

            dealData(data){
                let arr = JSON.parse(JSON.stringify(this.tableData))
                arr.forEach(row=>{
                    row.CommandState =  this.getStep(row.CommandState)
                    row.OrderType = row.OrderType == '1'?'线上':'线下'
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

            editFinish() {
                this.ispopEdit = false
                this.$refs.search.onSubmit()
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
                    isPayOff: val.IsPayOff,
                    commandState: val.CommandState,
                    orderType: val.OrderType,
                    customerName: val.customer,
                    referrerName: val.rec,
                    ApproveState: val.ApproveState,
                    SettState: val.SettState,
                    pageIndex: this.currentPage,
                    pageSize: this.size,
                    hospitalCode:val.hospital,
                    ConsumeTypeId:val.ConsumeTypeId,//提成类型
                    MedicalTypeId:val.MedicalTypeId,//支付类型
                    //  phoneNumber:val.phoneNumber,
                    // cardNO:val.cardNO,
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


            //            编辑
            edit(index) {
                this.selectData = this.tableData[index]
                this.ispopEdit = true
            },

            //            查看
            read(index) {
                this.selectData = this.tableData[index]
                this.ispopRead = true
            },

            // 退款
            cmdClose(data) {
                this.isPopCmd = false
                this.ispopRefund = false
                if (data === 1) this.$refs.search.onSubmit()
            },

            refund(index){
                this.fxCode = this.tableData[index]["FxCode"]
                this.ispopRefund = true
            },

            closePro(index, data) {
                this.$confirm('是否关闭该报单？?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.ProofOrderClose({
                        fxcode: data[index].FxCode
                    })
                }).catch(() => {
            });
            }
        },

    }
</script>

<style scoped>
.block{
    float: right
}
</style>
