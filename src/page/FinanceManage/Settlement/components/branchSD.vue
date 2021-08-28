<template>
    <div class="selCommon">
        <div v-if="isFinished == 0" style="margin-bottom:10px">
            <span>结算金额：{{setAmount}}</span>
            <el-button type="primary" @click="settle" style="margin-left:10px">结算</el-button>
            <el-button @click="reportData" style="margin-left:10px">导出报表</el-button>
        </div>
        <el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark" style="width: 100%"
        @selection-change="handleSelectionChange" class="min_table smt" max-height="560" v-loading="loading">
            <el-table-column type="selection" align="center" min-width="55"></el-table-column>
            <el-table-column label="单号" min-width="100">
                <template slot-scope="scope">
                    <el-button type="text" @click="getPD(scope.row)">{{scope.row.fxCode}}</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="customerName" label="客户" min-width="80"> </el-table-column>
            <el-table-column prop="refrenceBranchName" label="推荐人" min-width="80">
                <template slot-scope="scope">
                    <span >{{scope.row.refrenceBranchName}}</span><br/>
                    <span>{{scope.row.refrenceBranchCode}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="hospitalName" label="医院" min-width="150"> </el-table-column>
            <el-table-column prop="toName" label="转到" min-width="85"> </el-table-column>
            <el-table-column prop="orderAmount" label="订单金额" min-width="85" align="right">
                <template slot-scope="scope">
                    <span v-if="scope.row.orderAmount"> ￥{{scope.row.orderAmount.toQFW()}}</span>
                    <span v-else> ￥0</span>
                </template>
            </el-table-column>
            <el-table-column prop="realAmount" label="提成总额" min-width="85"  align="right">
                 <template slot-scope="scope">
                    <span v-if="scope.row.realAmount"> ￥{{scope.row.realAmount.toQFW()}}</span>
                    <span v-else> ￥0</span>
                </template>
            </el-table-column>
            <el-table-column prop="toRate" label="比例" min-width="85">
                <template slot-scope="scope">
                    {{scope.row.toRate.mul(100)}}%
                </template>
            </el-table-column>
            <el-table-column prop="amountOut" label="提成金额" min-width="85" align="right">
                <template slot-scope="scope">
                    <span v-if="scope.row.amountOut"> ￥{{scope.row.amountOut.toQFW()}}</span>
                    <span v-else> ￥0</span>
                </template>
            </el-table-column>
            <el-table-column prop="amountOut" label="操作" min-width="85" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" @click="backOpe(scope.row)" size="small">撤回审核</el-button>
                </template>
            </el-table-column>
        </el-table>
        <span>共 {{tableData.length}} 条数据</span>
    </div>
</template>

<script type="text/ecmascript-6">
    import {GetHospitalOutDetail,GetHospitalOutDetailHis,HospitalDetailSettlement,RevokeApprove} from "@/api/myData"
    export default {
        // name: "",
        props: {
            mes:Object,
            date:"",
            isFinished:""
        },
        watch: {

        },
        computed:{
            setAmount(){
                let amount = 0
                this.multipleSelection.forEach(ele => {
                    amount = amount.add(ele.amountOut)
                });
                return amount
            },
        },
        mounted(){

            if(this.isFinished == 1){
                this.GetHospitalOutDetailHis()
            }else{
                this.GetHospitalOutDetail()
            }
        },
        data () {
            return {
                loading:false,
                branch:{},
                total:0,
                multipleTable:[],
                showMes: {
                    type: "",
                    baseMes: "",
                },
                multipleSelection:[],
                tableData: [],
            }
        },
        methods: {
            reportData(){
                this.$emit('reportData',this.tableData)
            },
            async backOpe(data){
                this.$confirm('此操作将修改该单据为未审核状态，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.RevokeApprove({
                        FxCode:data.fxCode?data.fxCode:'',
                        BranchCode:data.fxCode?"":data.customerId,
                        CommissionDate:data.fxCode?"":this.date
                    })
                }).catch(() => {

                });
            },
            async RevokeApprove(params){
                let res = await RevokeApprove(params)
                    if(res.status){
                        this.$message({message: '撤回成功', type: 'success'});
                        this.GetHospitalOutDetail()
                    }else{
                        this.$message.error('撤回失败')
                    }
            },
            async GetHospitalOutDetail(){
                this.loading = true
                let res = await GetHospitalOutDetail({
                    HospitalId:this.mes.hospitalId,
                    CommissionDate:this.date,
                    ToCode:this.mes.toCode,
                    TypeId:this.mes.typeId,
                    isFinished:this.isFinished,
                    isCurrentMonth:this.mes.isCurrentMonth?1:0
                })
                this.loading = false
                this.tableData = res.data
            },
            // 结算记录详情
            async GetHospitalOutDetailHis(){
                let res = await GetHospitalOutDetailHis({
                    HospitalId:this.mes.hospitalId,
                    startDate:this.mes.startDate,
                    endDate:this.mes.endDate,
                    ToCode:this.mes.toCode,
                    TypeId:this.mes.typeId,
                })
                this.tableData = res.data
            },

            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            getPD(data){
                this.$emit("openRP",data)
            },
            // 部分结算
            settle(){
                this.$confirm('确定进行结算操作？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let item = {}
                    // a、b为settleTypeId  后接符合这个类型的数据id
                    // 拼接格式为 a@id,id2|b@id1,id2,id3
                    this.multipleSelection.forEach(ele=>{
                        if(item[''+ele.settleTypeId]){
                            item[''+ele.settleTypeId].push(ele.id)
                        }else{
                            item[''+ele.settleTypeId] = []
                            item[''+ele.settleTypeId].push(ele.id)
                        }
                    })
                    let codes = []
                    for(var key in item){
                        let ids = item[key].join(",")
                        codes.push(key+'@'+ids)
                    }
                    this.HospitalDetailSettlement(codes.join("|"))
                }).catch(() => {

                });
            },
            async HospitalDetailSettlement(ids){
                let res = await HospitalDetailSettlement({ids:ids})
                if(res.status){
                    this.$message({message: '结算成功', type: 'success'});
                    this.$emit("detSettle")
                }else{
                    this.$message.error('结算失败')
                }
            }
        },
        components: {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
