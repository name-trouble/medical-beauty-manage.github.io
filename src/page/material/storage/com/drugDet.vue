<template>
    <div class="tag selCommon">
        <!-- 信息表 -->
        总数量：{{quantityAll}}
            <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" height="460" v-if="inOutDet" show-summary  :summary-method="getSumDet">
                <el-table-column prop="drugOutCode" :label="title+'编号'" min-width="90" >
                    <template slot-scope="scope">
                        <span v-text="scope.row.drugOutCode?scope.row.drugOutCode:scope.row.drugInCode"></span>
                    </template>
                </el-table-column>
                <el-table-column prop="drugInType" :label="title+'日期'" min-width="90">
                    <template slot-scope="scope">
                        <span v-text="scope.row.drugOutDate?scope.row.drugOutDate.substring(0,10):scope.row.drugInDate.substring(0,10)"></span>
                    </template>
                </el-table-column>
                <el-table-column prop="drugInType" :label="title+'方式'" min-width="90">
                    <template slot-scope="scope">
                        <span v-text="scope.row.drugInType?scope.row.drugInType:scope.row.drugOutType"></span>
                    </template>
                </el-table-column>
                <el-table-column prop="warehouseName" label="仓库" min-width="80">
                    <template slot-scope="scope">
                        <span v-text="scope.row.warehouseInName?scope.row.warehouseInName:scope.row.warehouseOutName"></span>
                    </template>
                </el-table-column>
                <el-table-column prop="warehouseName" label="产品单号" width="100" v-if="title=='出库'">
                     <template slot-scope="scope">
                        <span>{{scope.row.orderProductCode}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="drugName" label="药品名称" min-width="90" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span>{{scope.row.drugName}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="drugName" label="批号" min-width="90">
                    <template slot-scope="scope">
                        <span>{{scope.row.batchNumber}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="drugName" label="规格" min-width="90">
                    <template slot-scope="scope">
                        <span>{{scope.row.unitName}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="drugName" label="剂型" width="70">
                    <template slot-scope="scope">
                        <span>{{scope.row.jiType}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="drugName" label="单位" width="70">
                    <template slot-scope="scope">
                        <span>{{scope.row.dwName}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="drugName" label="有效期" min-width="90">
                    <template slot-scope="scope">
                        <span v-if="scope.row.effectiveDate" class="form_span">{{ scope.row.effectiveDate.substring(0,10)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="drugName" label="厂家" min-width="90">
                    <template slot-scope="scope">
                        <span>{{scope.row.manufacturer}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="drugName" label="产地" min-width="90">
                    <template slot-scope="scope">
                        <span>{{scope.row.originAddress}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="drugName" label="成本价" min-width="70" align="right">
                    <template slot-scope="scope">
                        <span>{{scope.row.realPrice}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="drugName" label="出库价" min-width="70" v-if="title=='出库'" align="right">
                    <template slot-scope="scope">
                        <span>{{scope.row.salePrice}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="quantity" label="数量" min-width="70" align="right">
                    <template slot-scope="scope">
                        <span>{{scope.row.quantity}}</span>
                    </template>
                </el-table-column>
            </el-table>
            
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
    // import {baseImgPath} from "@/config/env"
    import  "@/style/selfCommon.less"
    // import { getCookie, delCookie } from '@/config/mUtils'
    // import {GetDropDownPermission,GetWarehouse,GetStockDrug,GetStockInOutRecord,ModifyIsFrozen} from "@/api/myData"
    // import Export from '@/components/export'
    export default {
        data () {
            return {
                date:"",
                editMes:[],
                loading:false,
                title:"",
                // inOutDet:false,
                total:0,
                size:10,
                currentPage:1,
                checked:false,
                remainNum:false,
                formInline: {
                    startAmount:'',
                    endAmount:'',
                    startDate:"",
                    endDate:"",
                    keywords: '',
                    typeCode:'',
                    hospitalCode:"",
                    wareHouse:"",
                    goodsType:"",
                    EffectiveDay:"",
                    IsFrozen:"",
                },
                tableData:[],
                hospitalList:[],
                supplierList:[],
                whList:[],
                allWhList:[],
                sum:{
                    quantityIn:"",
                    quantityOut:'',
                    remainCount:'',
                    totalAmountOut:"",
                },
                allData:[],
                quantityAll:0,
            }
        },
        props:{
            detData:Array,
            inOutDet:Boolean
        },
        mounted(){
            
            this.allData = JSON.parse(JSON.stringify(this.detData))
            this.allData.forEach(ele=>{
                this.quantityAll+=ele.quantity
            })
            this.total = this.allData.length
            this.pageChange()
        },
        methods:{
            getSumDet(param) {
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
                        return prev + curr;
                    } else {
                        return prev;
                    }
                    }, 0);
                    sums[index] += '';
                } else {
                    sums[index] = '';
                }
                });
                return sums;
            },
           
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
           
        },
        components: {
            
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
