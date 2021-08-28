<template>
    <div class="settled selCommon">
        <el-form :inline="true">
            <el-form-item label="总金额：" class="form_item_mt10">
                <span>{{amountTotal}}</span>
            </el-form-item>
            
            <el-form-item label="收款账户：" class="form_item_mt10" v-if="selAccount">
                <el-select v-model="account">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="(item,index) in accountList" :key="index" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="" class="form_item_mt10">
                <el-button @click="search" class="searchBtn" v-if="selAccount">搜索</el-button>
                <Export :tHeader="tHeader" :filterVal='filterVal'  class="searchBtn" :tableData1='tableData1' :name='name'></Export>
            </el-form-item>
        </el-form>
        <el-table :data="allData" border style="width: 100%;margin-bottom:10px;" height="460">
            <el-table-column prop="fxCode" min-width="100" label="订单编号" ></el-table-column>
            <el-table-column prop="payTypeName" min-width="100" label="支付方式" ></el-table-column>
            <el-table-column prop="realAmount" label="支付金额" min-width="120" align="right" sortable>
                <template slot-scope="scope">
                    {{scope.row.realAmount.toQFW()}}
                </template>
            </el-table-column>
            <el-table-column prop="typeId" label="积分类型" v-if="isPoint" min-width="100" align="right"></el-table-column>
            <el-table-column prop="receiveAccount" label="收款账户" min-width="100" ></el-table-column>
            <el-table-column prop="projectName" label="项目" min-width="120" ></el-table-column>
            <el-table-column prop="customerName" label="客户" min-width="120"></el-table-column>
            <el-table-column prop="memo" label="备注" min-width="120" show-overflow-tooltip></el-table-column>
        </el-table>
        共{{detDate.length}}条数据
    </div>
</template>

<script type="text/ecmascript-6">
    import Export from '@/components/export'
    import {} from "@/api/myData"
    import "@/style/selfCommon.less"
    export default {
         computed: {
            /* 导出报表参数 tHeader,filterVal,tableData1*/
            tHeader(){
                if(this.isPoint) {
                    return["订单编号",'支付方式','积分类型','支付金额','收款账户','项目','客户']}
                else{
                    return ["订单编号",'支付方式','支付金额','收款账户','项目','客户']
                }
            },
            filterVal(){
                if(this.isPoint){
                    return ['fxCode','payTypeName','typeId','realAmount','receiveAccount','projectName','customerName']
                }else{
                    return ['fxCode','payTypeName','realAmount','receiveAccount','projectName','customerName']
                }
            },
            name(){
                return '明细'
            },
            tableData1(){
                let arr = JSON.parse(JSON.stringify(this.allData))
                return arr
            },
            "amountTotal"(){
                let amount = 0
                this.allData.forEach(row=>{
                    row.procFee = row.procFee>=0?row.procFee:0
                    amount = amount.add(row.realAmount).add(row.procFee)
                })
                return amount
            },
        },
        props:{
            detDate:Array,
            propTotal:"",
            selAccount:Boolean,
            from:Boolean,
        },       
         data () {
            return {
                account:"",
                accountList:[],
                allData:[],
                isPoint:false,
                // amountTotal:"",
            }
        },
       
        mounted(){
            this.allData = JSON.parse(JSON.stringify(this.detDate))
            this.allData.forEach(row=>{
                if(row.typeId){
                    row.typeId = this.getTypeName(row.typeId)
                }
            })
            this.allData.push()
            this.isPoint = this.detDate.length>0&&this.detDate[0].payType == '009'?true:false
            if(this.selAccount){
                 let arr = []
                this.detDate.forEach(ele => {
                    arr.push(ele.receiveAccount)
                });
                this.accountList = arr.uniquelize()
            }
        },
        methods: {
            getTypeName(val){
                switch(val){
                    case 2:return '医院积分';
                    case 3:return '纹绣积分';
                    case 4:return '皮肤科积分';
                    case 5:return 'VIP积分';
                }
            },
            search(){
                let _this = this
                if(this.account == ""){
                    this.allData = JSON.parse(JSON.stringify(this.detDate))
                    this.amountTotal = this.propTotal
                }else{
                    this.allData = this.detDate.filter(function(item){
                        return item.receiveAccount === _this.account;
                    });
                }
            }
        },
        components: {Export}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
