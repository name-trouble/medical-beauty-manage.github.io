<template>
    <div class="selCommon">

        <div v-if="!isFinished" style="margin-bottom:10px">
            <span>&nbsp;&nbsp;结算金额：{{setAmount}}</span>
            <el-button type="primary" @click="settle" style="margin-left:10px">结算</el-button>
            <el-button @click="reportData" style="margin-left:10px">导出报表</el-button>
        </div>

        <el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark" style="width: 100%"
        @selection-change="handleSelectionChange" class="min_table smt" max-height="560" v-loading="loading">
            <el-table-column type="selection" align="center" min-width="55"></el-table-column>
            <el-table-column label="提成来源名称" min-width="100">
                <template slot-scope="scope">
                    <span>{{scope.row.consumeSourceName}}</span>
                </template>
            </el-table-column>
            <el-table-column label="单号" min-width="100">
                <template slot-scope="scope">
                    <el-button type="text" @click="getPD(scope.row)">{{scope.row.fxCode}}</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="customerName" label="客户" min-width="80"> </el-table-column>
            <el-table-column prop="toName" label="提成受益人" min-width="80">
                <template slot-scope="scope">
                    <span >{{scope.row.toName}}</span><br/>
                    <span>{{scope.row.toCode}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="conLevel" label="提成等级" min-width="50"> </el-table-column>
            <!--<el-table-column prop="hospitalName" label="医院" min-width="150"> </el-table-column>-->
            <!--<el-table-column prop="toName" label="转到" min-width="85"> </el-table-column>-->
            <!--<el-table-column prop="orderAmount" label="订单金额" min-width="85" align="right">-->
                <!--<template slot-scope="scope">-->
                    <!--<span v-if="scope.row.orderAmount"> ￥{{scope.row.orderAmount.toQFW()}}</span>-->
                    <!--<span v-else> ￥0</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column prop="realAmount" label="提成总额" min-width="85"  align="right">-->
                 <!--<template slot-scope="scope">-->
                    <!--<span v-if="scope.row.realAmount"> ￥{{scope.row.realAmount.toQFW()}}</span>-->
                    <!--<span v-else> ￥0</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column prop="rate" label="比例" min-width="85">
                <template slot-scope="scope">
                    {{scope.row.rate.mul(100)}}%
                </template>
            </el-table-column>
            <el-table-column prop="consumeAmount" label="提成金额" min-width="85" align="right">
                <template slot-scope="scope">
                    <span v-if="scope.row.consumeAmount"> ￥{{scope.row.consumeAmount.toQFW()}}</span>
                    <span v-else> ￥0</span>
                </template>
            </el-table-column>
            <el-table-column prop="consumeAmount" label="操作" min-width="85" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" @click="backOpe(scope.row)" size="small">撤回审核</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="clear">
            <div class="block">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
            </div>
        </div>
        <!--<span>共 {{tableData.length}} 条数据</span>-->
    </div>
</template>

<script type="text/ecmascript-6">
    import {GetHospitalOutDetail2,GetHospitalOutDetailHis,HospitalDetailSettlement2,RevokeApprove2} from "@/api/myData"
    export default {
        // name: "",
        props: {
            mes:Object,
            date: null,
            isFinished: false
        },
        watch: {

        },
        computed:{
            setAmount(){
                let amount = 0
                this.multipleSelection.forEach(ele => {
                    amount = amount.add(ele.consumeAmount)
                });
                return amount
            },
        },
        mounted(){
            this.GetHospitalOutDetail()
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
                pageIndex: 1,
                pageSize: 10
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
                        fxCode:data.fxCode||'',
                        customerCode:data.customerCode||'',
                        consumeSource:data.consumeSource||''
                    })
                }).catch(() => {

                });
            },
            async RevokeApprove(params){
                let res = await RevokeApprove2(params)
                    if(res.status){
                        this.$message({message: '撤回成功', type: 'success'});
                        this.GetHospitalOutDetail()
                    }else{
                        this.$message.error('撤回失败')
                    }
            },
            async GetHospitalOutDetail(){
                this.loading = true
                let res = await GetHospitalOutDetail2({
                    branchCode:this.mes.branchCode,
                    consumeSource:this.mes.consumeSource,
                    startDate:(this.date||[])[0] || '',
                    endDate:(this.date||[])[1] || '',
                    type:this.isFinished?1:0,
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize
                })
                this.loading = false
                this.tableData = res.data
                this.total = res.count
            },

            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            getPD(data){
                this.$emit("openRP",data)
            },
            // 部分结算
            settle(){
                if (!this.multipleSelection || this.multipleSelection.length === 0) {
                    this.$alert('请选择需要结算的单据 !', '提示', {
                        confirmButtonText: '确定',
                        type: 'warning',
                        callback: action => {}
                    });
                    return;
                }
                this.$confirm('确定进行结算操作？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let item = {}
                    // a、b为consumeSource  后接符合这个类型的数据id
                    // 拼接格式为 a@id,id2|b@id1,id2,id3
                    this.multipleSelection.forEach(ele=>{
                        if(item[''+ele.consumeSource]){
                            item[''+ele.consumeSource].push(ele.id)
                        }else{
                            item[''+ele.consumeSource] = []
                            item[''+ele.consumeSource].push(ele.id)
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
                let res = await HospitalDetailSettlement2({ids:ids})
                if(res.status){
                    this.$message({message: '结算成功', type: 'success'});
                    this.$emit("detSettle")
                }else{
                    this.$message.error('结算失败')
                }
            },
            handleSizeChange(val) {
                if (this.pageSize == val) return;
                this.pageSize = val;
                this.GetHospitalOutDetail()
            },
            handleCurrentChange (val) {
                if (this.pageIndex == val) return;
                this.pageIndex = val;
                this.GetHospitalOutDetail()
            }
        },
        components: {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
