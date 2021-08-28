<template>
    <div class="tag selCommon">
        <el-button @click="SearchStockException(1)" type="primary" size="small">错误数据检测</el-button>
        <el-button @click="updateData()" type="primary" size="small">数据修正</el-button>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="入库数据" name="first">
            <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" max-height="560" class="smt min_table" v-if="activeName == 'first'">
                <el-table-column prop="warehouseName" label="仓库" min-width="80"></el-table-column>
                <el-table-column prop="drugName" label="药品名称" min-width="110"></el-table-column>
                <el-table-column prop="unitName" label="规格" min-width="90"></el-table-column>
                <el-table-column prop="batchNumber" label="批号" min-width="90" ></el-table-column>
                <el-table-column prop="drugId" label="药品编号" min-width="80"></el-table-column>
                <el-table-column prop="quantityIn" label="入库数量" min-width="90" align="right">
                </el-table-column>
                <el-table-column prop="quantity" label="正确数量" min-width="90" align="right">
                </el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="出库数据" name="second">
            <el-table :data="tableData1" border style="width: 100%;margin-top:15px;margin-bottom:10px;" max-height="560" class="smt min_table" v-if="activeName == 'second'">
                <el-table-column prop="warehouseName" label="仓库" min-width="80"></el-table-column>
                <el-table-column prop="drugName" label="药品名称" min-width="110"></el-table-column>
                <el-table-column prop="unitName" label="规格" min-width="90"></el-table-column>
                <el-table-column prop="batchNumber" label="批号" min-width="90" ></el-table-column>
                <el-table-column prop="drugId" label="药品编号" min-width="80"></el-table-column>
                <el-table-column prop="quantityIn" label="出库数量" min-width="90" align="right">
                </el-table-column>
                <el-table-column prop="quantity" label="正确数量" min-width="90" align="right">
                </el-table-column>
            </el-table>
        </el-tab-pane>
    </el-tabs>
        
    </div>
</template>

<script type="text/ecmascript-6">
    import  "@/style/selfCommon.less"
    import { getCookie, delCookie } from '@/config/mUtils'
    import {SearchStockException} from "@/api/myData"
    export default {
        data () {
            return {
               activeName:'first',
               tableData:[],
               tableData1:[],
               loading:false,
            }
        },
        computed: {
            
        },
        mounted(){

        },
        methods:{
             handleClick(tab, event) {//数据为空时切换tab会出现table不显示的情况 data.push()來更新视图
            },
            
            updateData(){
                this.$confirm('确定进行数据修证吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.SearchStockException(2)
                }).catch(() => {

                });
            },

            async SearchStockException(ope){//0查询 1修正
                this.errorData = true
                let mes = ope==1?'查询':'修正'
                let res = await SearchStockException({typeId:ope})
                if(res.status){
                    if(ope==1){
                        this.tableData = res.data.stockInList
                        this.tableData1 = res.data.stockOutList
                        
                    }else{
                        this.$message({message: mes+'成功', type: 'success'});
                    }
                }else{
                    this.$message.error(mes+'失败'+res.errorMessage);
                }
            },
        },
        components: {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
