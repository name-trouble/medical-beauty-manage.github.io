<template>
    <div>
         <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px" >
            <el-form-item label="选择时间：" style='margin-bottom:10px;font-size:12px !important;'>
                <el-date-picker
                    v-model="date"
                    type="daterange"
                    @change="dateSelect"
                    placeholder="选择日期范围">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="付款状态：" class="form_item_mt10">
                 <el-select v-model="formInline.isPayOff"  style='width:200px;' @change="onSubmit">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="未付清" value="0"></el-option>
                    <el-option label="已付清" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="关键字：" class="form_item_mt10">
                <el-input v-model="formInline.keywords" style="width: 200px;" placeholder="编号/客户/服务者/卡号" v-on:keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            
           <el-form-item label="医院:" class="form_item_mt10">
                <el-select v-model="formInline.hospital"  style='width:200px;' @change="onSubmit">
                    <el-option v-for="(item,index) in hospitalList" :key="index" :label="item.supplierName" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="" class="form_item_mt10">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" border style="width: 100%;margin-top:20px" class="min_table4 smt" v-loading="loading">
            <el-table-column prop="orderProductCode" label="订单编号" min-width="120" align="center">
                 <template slot-scope="scope">
                    <el-button type="text" size="small" @click="views(scope.$index,tableData)">{{scope.row.orderProductCode}}</el-button>
                </template>
            </el-table-column>
            <el-table-column  prop="orderDate" label="订单日期" min-width="120" align="center">
                <template slot-scope="scope">
                     <span v-if="scope.row.orderDate">
                        {{scope.row.orderDate.substring(0,10)}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="customerName" label="客户" min-width="100">
                 <template slot-scope="scope">
                    <el-button type="text" @click="view(scope.$index,tableData)">{{scope.row.customerName}}</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="hospitalName" label="医院" min-width="170" align="center"> </el-table-column>
            <el-table-column  prop="refrenceBranchName" label="推荐人" min-width="180">
                <template slot-scope="scope">
                    <span v-if="scope.row.refrenceBranchName">
                        {{scope.row.refrenceBranchName}}[{{scope.row.refrenceBranchCode}}]
                    </span>
                </template>
            </el-table-column>
            <el-table-column  prop="totalAmount"  label="订单金额" min-width="100" align="right">
                <template slot-scope="scope">
                    <span v-if="scope.row.totalAmount">￥{{scope.row.totalAmount.toQFW()}}</span>
                    <span v-else>￥0</span>
                </template>
            </el-table-column>
            <el-table-column  prop="address"  label="付款状态" min-width="100" align="center">
                <template slot-scope="scope">
                    <div v-if="scope.row.opStatus == 2">
                        <el-tag type="danger">已退款</el-tag>
                        <span>金额：{{scope.row.refundAmount}}</span>
                    </div>
                    <div v-else>
                        <el-tag type="success" v-if="scope.row.isPayoff">已付清</el-tag>
                        <el-tag type="warning" v-else>未付清</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="cardNO" label="卡号" min-width="100"> </el-table-column>
             <el-table-column prop="nurseName" label="服务者" min-width="100"> </el-table-column>
            <el-table-column  prop="address"  label="操作" width="130">
                 <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="del(scope.$index,tableData)" :disabled="scope.row.isPayoff">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-button @click="batchDel" type="primary" :disabled="tableData.length == 0">批量删除</el-button>
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

        <el-dialog title="查看" :visible.sync="readDialog" :close-on-click-modal="false" size="">
            <views v-if="readDialog" :mesCode="mesCode" style="width:900px"></views>
        </el-dialog>

       <el-dialog title="客户详情" :visible.sync="dialogView"  top="5%"  size="" :close-on-click-modal="false">
            <CustomerView :mes="cusMes" style="width: 1100px"  v-if="dialogView"></CustomerView>
        </el-dialog>
    </div>
</template>
<script>
    import "@/style/selfCommon.less"
    import views from "./com/view.vue"
    import CustomerView from "../ReportManage/com/customerDetail.vue"
    import {GetDropDownPermission,GetProofOrderProduct,DeleteProofOrderProduct,BatchCloseProductOrder} from "@/api/myData"
import { getCookie } from '../../../config/mUtils';
    export default {
        // name:"",
        data() {
            return {
                loading:false,
                cusMes:{},
                dialogView:false,
                mesId:"",
                mesCode:"",
                size: 10,
                total: 0,
                currentPage: 1,
                date:"",
                dialogFormVisible:false,
                payMesShow:false,
                readDialog:false,
                editDialog:false,
                tableData:[],
                hospitalList:[],
                formInline: {
                    name: '',
                    startDate:"",
                    endDate:"",
                    keywords:"",
                    isPayOff:"",
                    hospital:"",
                },
            };
        },
        computed: {
            /* 导出报表参数 tHeader,filterVal,tableData1*/
            // tHeader(){
            //     return ['订单编号', '订单日期', '客户', '推荐人', '订单金额', '付款状态', '卡号', '服务者']
            // },
            // filterVal(){
            //     return ['orderProductCode', 'orderDate', 'customerName', 'refrenceBranchName', 'totalAmount', 'isPayoff', 'cardNO', 'PayAmount', 'nurseName']
            // },
            // tableData1(){
            //     let arr = JSON.parse(JSON.stringify(this.tableData))
            //     arr.forEach(row => {
            //         row.isPayoff = row.isPayOff?"已付清":"未付清"
            //     });
            //     return arr
            // },
            // name(){
            //     return '代理管理'
            // },
            /*导出报表参数 tHeader,filterVal,tableData1*/
        },
        mounted(){
            let date = new Date()
            date.setDate("01")
            this.date = [date,new Date()]
            this.GetDropDownPermission()
        },
        methods: {
            async batchDel(params){
                let h = this.$createElement;
                this.$msgbox({
                    title: '提示',
                    message: h('p', null, [
                        h('span', { style: 'color: red' }, '是否确定删除'+this.formInline.startDate+' - '+this.formInline.endDate+'的未付款产品单？'),
                    ]),
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = '删除中...';
                            this.BatchCloseProductOrder()
                            instance.confirmButtonLoading = false;
                            done();
                        } else {
                            done();
                        }
                    }
                }).then(action => {
                    
                });
            },
            async BatchCloseProductOrder(){
                let res = await BatchCloseProductOrder({
                        startdate:this.formInline.startDate,
                        enddate:this.formInline.endDate,
                    })
                    if(res.status){
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.search()
                    }else{
                        this.$message.error('删除失败');
                    }
            },
            view(index,data){
                this.cusMes = data[index]
                this.dialogView = true
            },
            async GetDropDownPermission(){
                let data = {typeId: 1}
                let res = await GetDropDownPermission(data)
                this.hospitalList = res.data
                this.formInline.hospital = getCookie("hospitalCode")?getCookie("hospitalCode"):''
            },
            dateSelect(val){
                if (val) {
                    val = val.formatDates()
                    this.formInline.startDate = val.substring(0, 10)
                    this.formInline.endDate = val.substring(13)
                } else {
                    this.formInline.startDate = ""
                    this.formInline.endDate = ""
                }
                this.onSubmit()
            },
            async DeleteProofOrderProduct(params){
                let res = await DeleteProofOrderProduct(params)
                if(res.status){
                     this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.search()
                }else{
                    this.$message.error('删除失败');
                }
            },
            onSubmit(){
                this.currentPage = 1
                this.search()
            },
            search(){
                this.GetProofOrderProduct({
                    KeyWords:this.formInline.keywords.removeSP(),
                    PageSize:this.size,
                    PageIndex:this.currentPage,
                    "isPayOff": this.formInline.isPayOff,
                    "startDate": this.formInline.startDate,
                    "endDate": this.formInline.endDate,
                    hospitalCode:this.formInline.hospital,
                    goodsType:'',
                })
            },
            async GetProofOrderProduct(params){
                this.loading = true
                let res = await GetProofOrderProduct(params)
                
                if(res.status){
                    this.tableData = res.data
                    this.total = res.count
                }else{
                    this.$message({ type: 'warning', message: '获取数据失败!'+res.errorMessage })
                }
                this.loading = false
            },
            handleSizeChange(val) {
                this.size = val
                this.search()
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.search()
            },
            del(index,data){
                this.$confirm('此操作将删除该订单, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                   this.DeleteProofOrderProduct({
                        id:data[index].id
                    })
                }).catch(() => {
                            
                });
                
            },
            views(index,data){
                
                this.mesCode = data[index].orderProductCode
                this.readDialog = true
            }
        },
        components:{
            views,CustomerView
        }
    }
</script>
<style scoped>
.block{
    margin-top: 20px;
    float: right
}
</style>



