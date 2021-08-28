<template>
    <div class="settled selCommon">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px">
            <el-form-item label="有效日期："  class="form_item_mt10 ">
                <el-date-picker
                    v-model="date"
                    type="daterange"
                    @change="dateChange"
                    style='width:200px;'
                    placeholder="选择日期范围">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="受益用户：" class="form_item_mt10">
               <el-input v-model="formInline.customer"  style='width:200px;'></el-input>
            </el-form-item>
            <el-form-item label="手机号：" class="form_item_mt10">
               <el-input v-model="formInline.phoneNumber"  style='width:200px;'></el-input>
            </el-form-item>
            <el-form-item label="用户类型：" class="form_item_mt10">
               <el-select v-model="formInline.type">
                   <el-option label="全部" value=""></el-option>
                   <el-option label="网络" value=""></el-option>
                   <el-option label="分享" value=""></el-option>
                   <el-option label="激活" value=""></el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="" class="form_item_mt10 form_item_wh280">
                <el-button type="primary" @click="search" class="searchBtn" icon="search">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" max-height="600" class="min_table smt"
         v-loading="loading" @sort-change = 'sortChange' show-summary >
            <el-table-column prop="orderDate " label="用户编号" min-width="100"></el-table-column>
            <el-table-column prop="payDate  " label="受益用户" min-width="200"></el-table-column>
            <el-table-column prop="hospitalName" label="用户名" min-width="100"  ></el-table-column>
            <el-table-column prop="receiveBranchName" label="手机号" min-width="100"  ></el-table-column>
            <el-table-column prop="customerName" label="用户类型" min-width="100" ></el-table-column>
            <el-table-column prop="num" label="线上付款订单数" min-width="100">
                <template slot-scope="scope">
                    <el-button type="text" @click="showDet(scope.row,6,'订单时间','线上付款订单数')">{{scope.row.num}}</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="num" label="分享开单业绩总数" min-width="100">
                 <template slot-scope="scope">
                    <el-button type="text" @click="showDet(scope.row,7,'订单','分享开单业绩总数')">{{scope.row.num}}</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="num" label="分享开单业绩总金额" min-width="100" ></el-table-column>
            <el-table-column prop="num" label="代理金额" min-width="100"></el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="block">
            <el-pagination
                 @size-change="handleSizeChange"
                 @current-change="handleCurrentChange"
                 :current-page="currentPage"
                 :page-sizes="[10, 30, 50, 100]"
                 :page-size="size"
                 layout="total, sizes, prev, pager, next, jumper"
                 :total="total">
             </el-pagination>
        </div>

        <el-dialog :title="title" :visible.sync="dialogTableVisible" size=''>
            <dialogTbale :dialogMes="dialogMes" v-if="dialogTableVisible" style="width:900px;"></dialogTbale>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
import dialogTbale from './com/account.vue'
import {GetDropDownPermission,GetBranchReceiveList,getBaseDataByCode,getServiceManAllByPage} from "@/api/myData"
import "@/style/selfCommon.less"
    export default {
        data () {
            return {
                dialogMes:{
                    type:""
                },
                dialogTableVisible:false,
                date:"",
                total:1,
                size:10,
                currentPage:1,
                HospitalList:[],
                formInline: {
                    customer:"",
                    startDate:"",
                    endDate:"",
                    phoneNumber:"",
                    type:"",
                },
                tableData:[{num:1}],
                loading:false,
                title:"",
            }
        },
        computed: {
            
        },
       
        mounted(){
            this.getSupplierByPage()
        },
        methods: {
            sortChange(column, prop, order){
                
            },
            dateChange(val){
                if(val){
                    val = val.formatDates()
                    this.formInline.startDate = val.substring(0,10)
                    this.formInline.endDate = val.substring(13)
                }else{
                    this.formInline.startDate = ""
                    this.formInline.endDate = ""
                }
            },
            // 弹窗
            showDet(data,type,title){
                
                this.title = title
                this.dialogMes = data
                this.dialogMes.type = type
                this.dialogTableVisible = true
            },
           
            async getSupplierByPage(){
                this.serTypes = await getBaseDataByCode("0014")
                let res = await GetDropDownPermission({typeId:1})
                this.formInline.Hospital = res.data[0].code
                this.HospitalList = res.data
                // this.search()
            },
            search(){
                this.currentPage = 1
                this.submit()
            },
            submit(){
                this.loading = true
                this.getServiceManAllByPage({
                    serviceName: '',
                    hospitalCode: '',
                    serTypeCode:"",
                    jobs: '',
                    title: '',
                    skillCode: '',
                    startDate: '',
                    endDate: '',
                    pageIndex: 1,
                    pageSize:10
                })
            },
            async getServiceManAllByPage(params){
                let res = await getServiceManAllByPage(params)
                this.tableData = res
                this.loading = false
            },

            handleSizeChange(val) {
                this.size = val
                this.submit()
             },
             handleCurrentChange(val) {
                this.currentPage = val
                this.submit()
             },
        },
        components: {
            // Recommend,
            // Combo,
            // projectList
            dialogTbale
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
