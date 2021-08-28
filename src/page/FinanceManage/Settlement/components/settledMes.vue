<template>
    <div class="selCommon">
        <div v-if="showMes.type == '0'">
            <el-form :model="form" :inline="true" style="width: 800px" label-width="110px">
                <el-form-item label="代理编号：" class="form_item_half form_item_mt0">
                    <span>{{branch.name}}</span>
                </el-form-item>
                <el-form-item label="代理人姓名：" class="form_item_half form_item_mt0">
                    <span>{{branch.BranchName}}|{{branch.BranchCode}}</span>
                </el-form-item>
                <el-form-item label="代理等级：" class="form_item_half form_item_mt0">
                    <span>{{branch.GradeName}}</span>
                </el-form-item>
                <el-form-item label="所属公司：" class="form_item_half form_item_mt0">
                    <span>{{branch.name}}</span>
                </el-form-item>
                <el-form-item label="联系电话：" class="form_item_half form_item_mt0">
                    <span>{{branch.name}}</span>
                </el-form-item>
                <el-form-item label="联系地址：" class="form_item_half form_item_mt0">
                    <span>{{branch.name}}</span>
                </el-form-item>
                <el-form-item label="身份证号码：" class="form_item_half form_item_mt0">
                    <span>{{branch.name}}</span>
                </el-form-item>
                <el-form-item label="银行卡号：" class="form_item_half form_item_mt0">
                    <span>{{branch.name}}</span>
                </el-form-item>
                <el-form-item label="开户行：" class="form_item_half form_item_mt0">
                    <span>{{branch.name}}</span>
                </el-form-item>
                <el-form-item label="开户人姓名：" class="form_item_half form_item_mt0">
                    <span>{{branch.name}}</span>
                </el-form-item>
                <el-form-item label="注册时间：" class="form_item_half form_item_mt0">
                    <span>{{branch.name}}</span>
                </el-form-item>
                <el-form-item label="最近一次开单时间：" class="form_item_half form_item_mt0">
                    <span>{{branch.name}}</span>
                </el-form-item>
                <el-form-item label="" class="form_item_full">
                    <table>
                        <tr><td>积分余额</td><td>{{branch.name}}</td></tr>
                        <tr><td>消费券存量</td><td>{{branch.name}}</td></tr>
                        <tr><td>账户余额</td><td>{{branch.name}}</td></tr>
                        <tr><td>未提现奖金与提成</td><td>{{branch.name}}</td></tr>
                    </table>
                </el-form-item>
            </el-form>
        </div>
        <div v-show="showMes.type == '1'">
            <el-form :model="form" :inline="true" style="width: 1100px" label-width="80px">
                <el-form-item label="代理人：" class=" form_item_mt0">
                    <span>{{showMes.baseMes.BranchName}}|{{showMes.baseMes.BranchCode}}</span>
                </el-form-item>
                <el-form-item label="代理等级：" class=" form_item_mt0">
                    <span>{{showMes.baseMes.GradeName}}</span>
                </el-form-item>
                <el-form-item label="消费提成：" class=" form_item_mt0">
                    <span>{{showMes.baseMes.ConsumeAmount}}</span>
                </el-form-item>
                <el-form-item label="" class="form_item_full">
                    <el-table :data="tableData[0]" border style="width:1100px;margin-top:15px;margin-bottom:10px;" height="400">
                        <el-table-column prop="FxCode" label="单据编号" min-width="100"></el-table-column>
                        <el-table-column prop="OrderType" label="订单来源" min-width="100">
                            <template slot-scope="scope">
                                <span v-if="scope.row.OrderType == 1">线上订单</span>
                                <span v-if="scope.row.OrderType == 2">线下订单</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="ModifiedOn" label="审核日期" min-width="120">
                            <template slot-scope="scope">
                                {{scope.row.ModifiedOn.substring(0,10)}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="CustomerName" label="客户" min-width="100"></el-table-column>
                        <el-table-column prop="ProjectName" label="项目内容" min-width="150"></el-table-column>
                        <el-table-column prop="Price" label="项目金额" min-width="120">
                            <template slot-scope="scope">
                                <span v-if="scope.row.Price"> ￥{{scope.row.Price.toQFW()}}</span>
                                <span v-else> ￥0</span>
                            </template>
                        </el-table-column>
                        <!--<el-table-column prop="ConsumeRate" label="折扣%" min-width="80"></el-table-column>-->
                        <el-table-column prop="OrderAmount" label="订单总额" min-width="100">
                            <template slot-scope="scope">
                                <span v-if="scope.row.OrderAmount"> ￥{{scope.row.OrderAmount.toQFW()}}</span>
                                <span v-else> ￥0</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="CurrentAmount" label="提成总额" min-width="100">
                            <template slot-scope="scope">
                                <span v-if="scope.row.CurrentAmount"> ￥{{scope.row.CurrentAmount.toQFW()}}</span>
                                <span v-else> ￥0</span>
                            </template>
                        </el-table-column>
                      <!--  <el-table-column prop="sawCount" label="券支付" min-width="80"></el-table-column>
                        <el-table-column prop="sawCount" label="积分支付" min-width="80"></el-table-column>
                        <el-table-column prop="sawCount" label="余额支付" min-width="80"></el-table-column>
                        <el-table-column prop="sawCount" label="现金支付" min-width="80"></el-table-column>
                        <el-table-column prop="RefrenceBranchOrderNum" label="提成顺位" min-width="80"></el-table-column>-->
                        <el-table-column prop="ConsumeRate" label="提成比例%" min-width="100">
                            <template slot-scope="scope">
                                {{scope.row.ConsumeRate|filterFuc}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="ConsumeAmount" label="提成金额" min-width="120">
                            <template slot-scope="scope">
                                <span v-if="scope.row.ConsumeAmount"> ￥{{scope.row.ConsumeAmount.toQFW()}}</span>
                                <span v-else> ￥0</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
            </el-form>
        </div>
        <div v-show="showMes.type == 2">
            <el-form :model="form" :inline="true" style="width: 900px" label-width="80px">
                <el-form-item label="代理人：" class=" form_item_mt0">
                    <span>{{showMes.baseMes.BranchName}}|{{showMes.baseMes.BranchCode}}</span>
                </el-form-item>
                <el-form-item label="代理等级：" class=" form_item_mt0">
                    <span>{{showMes.baseMes.GradeName}}</span>
                </el-form-item>
                <el-form-item label="推荐奖：" class=" form_item_mt0">
                    <span>{{showMes.baseMes.RecomAmount}}</span>
                </el-form-item>
                <el-form-item label="" class="form_item_full">
                    <el-table :data="tableData[1]" border style="width:900px;margin-top:15px;margin-bottom:10px;" height="400" :row-class-name="tableRowClassName">
                        <el-table-column prop="CreateOn" label="单据日期" min-width="120">
                            <template slot-scope="scope">
                                {{scope.row.CreateOn.substring(0,10)}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="CustomerName" label="客户" min-width="120">
                            <template slot-scope="scope">
                                {{scope.row.CustomerCode}}|{{scope.row.CustomerName}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="RecommendName" label="推荐人" min-width="120"></el-table-column>
                        <el-table-column prop="CurrentGradeName" label="客户等级" min-width="100">
                            <template slot-scope="scope">
                                <span v-if="scope.row.CurrentGradeName.length == 0">客户</span>
                                <span v-else>{{scope.row.CurrentGradeName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="TargetGradeName" label="升级目标" min-width="100"></el-table-column>
                        <el-table-column prop="UpgradeBonus" label="会费金额" min-width="120">
                            <template slot-scope="scope">
                                <span v-if="scope.row.UpgradeBonus"> ￥{{scope.row.UpgradeBonus.toQFW()}}</span>
                                <span v-else> ￥0</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="Rate" label="提成比例" min-width="100">
                            <template slot-scope="scope">
                               {{scope.row.Rate|filterFucO}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="Bonus" label="推荐奖" min-width="100">
                            <template slot-scope="scope">
                                <span v-if="scope.row.Bonus"> ￥{{scope.row.Bonus.toQFW()}}</span>
                                <span v-else> ￥0</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
            </el-form>
        </div>
        <div v-show="showMes.type == 3">
            <el-form :model="form" :inline="true" style="width: 800px" label-width="80px">
                <el-form-item label="代理人：" class=" form_item_mt0">
                    <span>{{showMes.baseMes.BranchName}}</span>
                </el-form-item>
                <el-form-item label="代理等级：" class=" form_item_mt0">
                    <span>{{showMes.baseMes.GradeName}}</span>
                </el-form-item>
                <el-form-item label="特殊增扣款：" class=" form_item_mt0">
                    <span>{{showMes.baseMes.DebitAmount}}</span>
                </el-form-item>
                <el-form-item label="" class="form_item_full">
                    <el-table :data="tableData[2]" border style="width:800px;margin-top:15px;margin-bottom:10px;" height="400">
                        <el-table-column prop="DebitNO" label="单据编号" min-width="100"></el-table-column>
                        <el-table-column prop="CreateOn" label="单据日期" min-width="100"></el-table-column>
                        <el-table-column prop="DebitTypeName" label="增扣款事项" min-width="120"></el-table-column>
                        <el-table-column prop="FxCode" label="关联单据" min-width="80"></el-table-column>
                        <el-table-column prop="DebitReason" label="增扣款原因" min-width="80"></el-table-column>
                        <el-table-column prop="DebitAmount" label="额度" min-width="80"></el-table-column>
                        <el-table-column prop="Memo" label="备注" min-width="80"></el-table-column>
                        <el-table-column prop="CreateBy" label="提交人" min-width="80"></el-table-column>
                    </el-table>
                    总计：{{total}}条数据
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {GetRecConDetail,GetConsumeDetail,GetBranchByCode,GetDebitOrder} from "@/api/myData"
    import "@/style/selfCommon.less"
    export default {
        // name: "",
        props: {
            mes: {
                type: Object,
                baseMes: {}
            }
        },
        watch: {
            "mes": {
                handler(curVal, oldVal){
                    this.showMes = this.mes
                    this.showMes.type = curVal.type
                    /*  this.$set(this.showMes,"type",curVal.type)*/
                    this.getMes()
                }
            },
            deep: true
        },
        filters:{
            'filterFuc':function(val){

                if(!isNaN(val)){
                    return (100).mul(Number(val))
                }
            },
            'filterFucO':function(val){
                if(!isNaN(val)){
                    if(val>1){
                        return val+"元"
                    }else{
                        return (100).mul(Number(val))+"%"
                    }
                }
            }
        },
        mounted(){
            this.showMes = this.mes
            this.getMes()
        },
        data () {
            return {
                branch:{},
                total:0,
                showMes: {
                    type: "",
                    baseMes: "",
                },
                tableData: [[],[],[]],
            }
        },
        methods: {
//            获取增扣款信息
            async GetDebitOrder(params){
                try {
                    let res = await GetDebitOrder(params)
                    this.total = res.count
                    this.tableData[2]=res.data
                    this.tableData.push()
                } catch (err) {
                    console.log(err)
                }
            },
//            获取代理详情
            async GetBranchByCode(params){
                try {
                    let res = await GetBranchByCode(params)
                } catch (err) {
                    console.log(err)
                }
            },
            //            消费提成
            async GetConsumeDetail(params){
                try {
                    let res = await GetConsumeDetail(params)
                    this.tableData[0] = res
                    this.tableData.push()

                } catch (err) {
                    console.log(err)
                }
            },
            //            推荐奖详情
            async GetRecConDetail(params){
                try {
                    let res = await GetRecConDetail(params)
                    this.tableData[1] = res
                    this.tableData.push()

                } catch (err) {
                    console.log(err)
                }
            },
            getMes(){

                let obj = {
                    gradeCode: this.mes.baseMes.GradeCode,
                    referenceName: this.mes.baseMes.BranchName,
                    refrenceBranchCode: this.mes.baseMes.BranchCode,
                    isFinished:this.mes.isFinished
                }
                if (this.showMes.type == 0) {
//                    接口需调整
                  /*  this.GetBranchByCode({
                        branchcode:this.mes.baseMes.BranchCode
                    })*/
                }
                if (this.showMes.type == 1) {
                    this.GetConsumeDetail(obj)
                }
                if (this.showMes.type == 2) {
                    this.GetRecConDetail(obj)
                }
                if(this.showMes.type == 3){
                    this.GetDebitOrder({
                        branchName:this.mes.baseMes.BranchCode,

                    })
                }
            },
            tableRowClassName(row, index) {
                if (row.Bonus < 0) {
                    return 'warning-row';
                } else if (row.Bonus > 0) {
                    return 'positive-row';
                }
                return '';
            }
        },
        components: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    table {
        width: 600px;
        border-collapse: collapse;
    }

    th {
        border-width: 1px;
        padding: 8px;
        border-style: solid;
        border-color: #999;
        background-color: #dedede;
    }

    td {
        font-size: 12px;
        text-align: center;
        width: 50%;
        border-width: 1px;
        padding: 8px;
        border-style: solid;
        border-color: #999;
        background-color: #ffffff;
    }

</style>
