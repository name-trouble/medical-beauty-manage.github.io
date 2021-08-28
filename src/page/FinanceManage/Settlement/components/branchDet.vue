<template>
    <div class="selCommon">
        <span>结算金额：{{setAmount}}</span>
        <el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark" style="width: 100%" 
        @selection-change="handleSelectionChange" class="min_table smt" max-height="560">
            <el-table-column type="selection" align="center" min-width="55"> </el-table-column>
            <!-- <el-table-column prop="name" label="40%" min-width="120"> </el-table-column>
            <el-table-column prop="name" label="8%" min-width="120"> </el-table-column>-->
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
            <el-table-column prop="toName" label="转到" min-width="120"> </el-table-column>
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
            <el-table-column prop="amountOut" label="提成金额" min-width="85"  align="right">
                <template slot-scope="scope">
                    <span v-if="scope.row.amountOut"> ￥{{scope.row.amountOut.toQFW()}}</span>
                    <span v-else> ￥0</span>
                </template>
            </el-table-column>
        </el-table>
        <!-- <div style="margin-top: 20px">
            <el-button type="primary" @click="settle()">结算</el-button>
        </div> -->
    </div>
</template>

<script type="text/ecmascript-6">
    import {GetHospitalOutDetail} from "@/api/myData"
    export default {
        // name: "",
        props: {
            mes:Object,
            date:""
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
           
          this.GetHospitalOutDetail()
        },
        data () {
            return {
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
            // toggleSelection(rows) {
            //     if (rows) {
            //         rows.forEach(row => {
            //             this.$refs.multipleTable.toggleRowSelection(row);
            //         });
            //     } else {
            //         this.$refs.multipleTable.clearSelection();
            //     }
            // }
            
            async GetHospitalOutDetail(){
                
                let res = await GetHospitalOutDetail({
                    HospitalId:this.mes.hospitalId,
                    CommissionDate:this.date,
                    ToCode:this.mes.toCode,
                })
                this.tableData = res.data
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            settle(){
                
            },
            getPD(data){
                this.$emit("openRP",data)
            }
        },
        components: {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
