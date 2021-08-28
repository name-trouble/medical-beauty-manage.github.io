<template>
    <div class="settled selCommon">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px">
            <el-form-item label="注册日期："  class="form_item_mt10 ">
                <el-date-picker
                    v-model="date"
                    type="daterange"
                    @change="dateChange"
                    style='width:200px;'
                    placeholder="选择日期范围">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="用户名：" class="form_item_mt10">
               <el-select v-model="formInline.status" style='width:200px;'>
                   <el-option label="全部" value=""></el-option>
                   <el-option label="已确认" value="1"></el-option>
                   <el-option label="未确认" value="0"></el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="销售公司：" class="form_item_mt10">
               <el-select v-model="formInline.branch" style='width:200px;'>
                   <el-option v-for="item in branchList" :key="item.branchName" :label="item.branchName" :value="item.code"></el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="关键字：" class="form_item_mt10">
               <el-input v-model="formInline.keysWords" placeholder="消费商/业务员/邀请人/用户"  style='width:200px;'></el-input>
            </el-form-item>
            <el-form-item label="" class="form_item_mt10 form_item_wh280">
                <el-button type="primary" @click="search" class="searchBtn" icon="search">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" max-height="600" class="min_table smt" 
         v-loading="loading" @sort-change = 'sortChange'>
            <el-table-column prop="branchName" label="代理商" min-width="100" align="center"></el-table-column>
            <el-table-column prop="createBy" label="业务员/等级" min-width="100" >
                <template slot-scope="scope">
                    <span v-if="scope.row.clerkGradeName">{{scope.row.clerkName}}/{{scope.row.clerkGradeName}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="inviterName" label="邀请人/手机" min-width="100">
                <template slot-scope="scope">
                    <span>{{scope.row.inviterName}}/{{scope.row.inviterMobile}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="receiveTime" label="注册日期" min-width="100" >
                <template slot-scope="scope">
                    <span v-if="scope.row.receiveTime">{{scope.row.receiveTime.substring(0,10)}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="sends" label="用户/手机" min-width="100" >
                <template slot-scope="scope">
                    <span>{{scope.row.userName}}/{{scope.row.userMobile}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="pointsBalances" label="积分余额" min-width="100">
                
            </el-table-column>
            <el-table-column prop="orders" label="下单数" min-width="100">
                
            </el-table-column>
            <el-table-column prop="invites" label="邀请人数" min-width="100">
                
            </el-table-column>
            <el-table-column prop="isConfirmed" label="邀请人数" min-width="100" align="center">
                <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.isConfirmed">已确认</el-tag>
                    <el-tag type="warning" v-else>未确认</el-tag>
                </template>
            </el-table-column>
            
            <el-table-column prop="orders" label="操作" min-width="100">
                <template slot-scope="scope">
                    <el-button type="primary" @click="confirm(scope.row)" size="small" :disabled="scope.row.isConfirmed">确认</el-button>
                    <!-- 接口待完善 -->
                    <el-button type="primary"  size="small" >发短信</el-button>
                </template>
            </el-table-column>
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

        <!-- <el-dialog title="订单详情" :visible.sync="viewReport" size=''>
            
        </el-dialog> -->
    </div>
</template>

<script type="text/ecmascript-6">

import {GetDropDownPermission,GetBranchReceiveList,getBaseDataByCode,GetShareConfirmList,ConfirmShared} from "@/api/myData"
import "@/style/selfCommon.less"
    export default {
        data () {
            return {
                dialogMes:{
                    label:"",
                    type:""
                },
                // dialogTableVisible:false,
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
                    status:'',
                    branch:'',
                    keysWords:'',
                },
                tableData:[],
                loading:false,
                title:"",
                branchList:[],
            }
        },
        computed: {
            
        },
       
        mounted(){
            this.getSupplierByPage()
        },
        methods: {
            confirm(data){
                this.$confirm('是否确认该客户?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.ConfirmShared({
                        mobile:data.userMobile
                    })
                })
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
            async ConfirmShared(params){
                let res = await ConfirmShared(params)
                if(res.status == true){
                    this.$message({message: '确认成功', type: 'success'});
                    this.search()
                }else{
                    this.$message.error('确认失败!'+res.errorMessage);
                }
            },
           
            async getSupplierByPage(){
                this.serTypes = await getBaseDataByCode("0014")
                let res = await GetDropDownPermission({typeId:2})
                this.formInline.branch = res.data[0].code
                this.branchList = res.data
            },
            search(){
                this.currentPage = 1
                this.submit()
            },
            submit(){
                this.loading = true
                this.GetShareConfirmList({
                    date1: this.formInline.startDate,
                    date2: this.formInline.endDate,
                    pageIndex: this.currentPage,
                    pageSize:this.size,
                    IsConfirmed:this.formInline.status,
                    SaleBranchCode:this.formInline.branch,
                    Keyword:this.formInline.keysWords,
                    UserInvitedCode:'',
                })
            },
            async GetShareConfirmList(params){
                let res = await GetShareConfirmList(params)
                if(res.data.length>1){
                    this.total = res.count
                    this.tableData = res.data
                }else{
                    this.tableData = []
                }
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

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
