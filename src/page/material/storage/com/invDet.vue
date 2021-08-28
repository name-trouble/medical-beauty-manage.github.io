<template>
    <div class="tag selCommon">
        <!-- 信息表 -->
        <Export :tHeader="tHeader"  ref="exportTable" :filterVal=' filterVal' :tableData1='tableData1' :name='name'></Export>
        <el-button type="primary" class="searchBtn" @click="print" :disabled="tableData.length == 0">盘点打印</el-button>
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" height="400" class="smt min_table" v-loading="loading">
             <el-table-column prop="drugName" label="药品名称" min-width="80"></el-table-column>
             <el-table-column prop="batchNumber" label="批号" min-width="80"></el-table-column>
            <el-table-column prop="unitName" label="规格" min-width="80"></el-table-column>
            <el-table-column prop="effectiveDate" label="有效期" min-width="80">
                <template slot-scope="scope">
                    <span v-if="scope.row.effectiveDate">{{scope.row.effectiveDate.substring(0,10)}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="originAddress" label="产地" min-width="80" show-overflow-tooltip></el-table-column>
            <el-table-column prop="jiType" label="剂型" min-width="70"></el-table-column>
            <el-table-column prop="createOn" label="盘点日期" min-width="90">
                <template slot-scope="scope">
                    <span v-if="scope.row.createOn">{{scope.row.createOn.substring(0,10)}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="warehouseName" label="盘点仓库" min-width="90"></el-table-column>
            <!-- <el-table-column prop="hospitalName" label="医院" min-width="90"></el-table-column> -->
            <el-table-column prop="bookAmount" label="账面金额" min-width="80"></el-table-column>
            <el-table-column prop="bookQuantity" label="账面数量" min-width="80"></el-table-column>
            <el-table-column prop="inventoryAmount" label="盘点金额" min-width="80"></el-table-column>
            <el-table-column prop="inventoryQuantity" label="盘点数量" min-width="80"></el-table-column>
            <el-table-column prop="profitLossAmount" label="差异金额" min-width="80"></el-table-column>
            <el-table-column prop="profitLossQuantity" label="差异数量" min-width="80">
                <template slot-scope="scope">
                    {{scope.row.profitLossQuantity}}
                </template>
            </el-table-column>
             <!-- <el-table-column prop="createBy" label="盘点人" min-width="90"></el-table-column> -->
        </el-table>
        <!-- 信息表 -->
        <!-- 分页 -->
        <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
        <!-- 分页 -->
    </div>
</template>

<script type="text/ecmascript-6">
    import Export from '@/components/export'
    import  "@/style/selfCommon.less"
    export default {
        // name: "VideoManage",
        data () {
            return {
                date:'',
                loading:false,
                total:0,
                size:10,
                currentPage:1,
                tableData:[],
                allData:[],
            }
        },
        watch:{
             dialogData:{
                handler(curVal,oldVal){
                    this.allData = this.dialogData
                    this.total = this.dialogData.length
                    this.pageChange()   
                    this.loading = false
                },
                deep:true
            },
        },
        computed: {
            /* 导出报表参数 tHeader,filterVal,tableData1*/
            tHeader(){
                return ['药品名称', '批号', '规格','进价','有效期', '产地', '剂型', '盘点日期', '盘点仓库', '账面金额','账面数量',"盘点金额",'盘点数量','差异金额','差异数量','盘点人']
            },
            filterVal(){
                return ['drugName', 'batchNumber', 'unitName','price', 'effectiveDate', 'originAddress', 'jiType','createOn','warehouseName','bookAmount','bookQuantity','inventoryAmount',
                'inventoryQuantity','profitLossAmount','profitLossQuantity','createBy']
            },
            tableData1(){
                return this.allData
            },
            name(){
                return '盘点详情'
            },
            /*导出报表参数 tHeader,filterVal,tableData1*/
        },
        props:{
            dialogData:Array,
            propMonth:'',
            propYear:'',
            propHospitalCode:''
        },
        mounted(){
            this.loading = true
            this.allData = this.dialogData
            this.total = this.dialogData.length
            this.pageChange()
        },
        methods:{
           
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
            print(){
                let url = document.location.protocol + "//" + document.location.hostname + ((80 == document.location.port || "" == document.location.port) ? "" : ":" + document.location.port) + "/"
                let newWin = window.open(url+'print/printInv.html?date='+this.propYear+'-'+this.propMonth+'&hospitalCode='+this.propHospitalCode+'&type=2')
            },
        },
        components: {
            Export
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.block{
    margin-bottom: 10px;
}
</style>
