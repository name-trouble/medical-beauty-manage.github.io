<template>
    <div class="settled selCommon">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px">
            <!-- <el-form-item label="选择日期："  class="form_item_mt10 ">
                <el-date-picker
                    v-model="date"
                    type="daterange"
                    @change="dateChange"
                    style='width:200px;'
                    placeholder="选择日期范围">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="用户名：" class="form_item_mt10">
               <el-input v-model="formInline.customer"  style='width:200px;'></el-input>
            </el-form-item>
            <el-form-item label="手机号：" class="form_item_mt10">
               <el-input v-model="formInline.phoneNumber"  style='width:200px;'></el-input>
            </el-form-item> -->
             <el-form-item label="用户名：" class="form_item_mt10">
               <el-input v-model="formInline.keyWords" placeholder="用户名/手机号"  style='width:200px;'></el-input>
            </el-form-item>
            <el-form-item label="认证状态：" class="form_item_mt10">
                <el-select v-model="formInline.status">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="认证中" value="1"></el-option>
                    <el-option label="拒绝" value="2"></el-option>
                    <el-option label="已认证" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="" class="form_item_mt10 form_item_wh280">
                <el-button type="primary" @click="search" class="searchBtn" icon="search">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" max-height="600" class="min_table smt" v-loading="loading">
            <el-table-column prop="userName" label="用户名" min-width="100" ></el-table-column>
            <el-table-column prop="cardImage_A" label="身份证（正）" min-width="100"   align="center">
                <template slot-scope="scope">
                    <div @click="viewPhoto(scope.row.cardImage_A)">
                        <img :src="baseImgPath+scope.row.cardImage_A" alt="" width="100" height="50">
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="cardImage_B" label="身份证（反）" min-width="100"   align="center">
                <template slot-scope="scope">
                    <div @click="viewPhoto(scope.row.cardImage_B)">
                        <img :src="baseImgPath+scope.row.cardImage_B" alt="" width="100" height="50">
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="idCard" label="身份证号" min-width="100"   align="center"></el-table-column>
            <el-table-column prop="invitedCode" label="地址" min-width="200"  >
                <template slot-scope="scope">
                    <span>{{scope.row.province}}{{scope.row.city}}{{scope.row.area}}{{scope.row.address}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="idCard" label="认证状态" min-width="100" align="center">
                <template slot-scope="scope">
                    <el-tag type="warning" v-if="scope.row.status == 1">认证中</el-tag>
                    <el-tag type="danger" v-if="scope.row.status == 2">拒绝</el-tag>
                    <el-tag type="success" v-if="scope.row.status == 3">已认证</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="orders" label="操作" min-width="100">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="verfy(scope.row,'3')">认证</el-button>
                    <el-button type="primary" size="small" @click="verfy(scope.row,'2')">拒绝</el-button>
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
        <el-dialog title="认证详情" :visible.sync="verfyDialog" size=''>
            <div @click="translate">
                <img :src="baseImgPath+dialogUrl" alt="" width="400">
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
import {baseImgPath} from "@/config/env"
import { VerifyReview,GetFullUserVerifyInfo } from "@/api/myData"
import "@/style/selfCommon.less"
    export default {
        data () {
            return {
                dialogUrl:'',
                verfyDialog:false,
                date:"",
                total:0,
                size:10,
                currentPage:1,
                formInline: {
                    customer:"",
                    startDate:"",
                    endDate:"",
                    phoneNumber:"",
                    status:'',
                    keyWords:'',
                },
                tableData:[],
                loading:false,
                form:{

                },
                allData:[],
                baseImgPath,
            }
        },
        computed: {
            
        },
       
        mounted(){
            this.search()
        },
        methods: {
            translate(){

            },
            viewPhoto(data){
                this.verfyDialog = true
                this.dialogUrl = data
            },
            verfy(data,ope){
                let mes = ope == '2'?'拒绝':'通过'
                this.$confirm('此操作将'+mes+'该认证申请, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.VerifyReview({
                        userId:data.userId,
                        status:ope,
                        memo:'',
                    })
                })
            },
            async VerifyReview(params){
                let res = await VerifyReview(params)
                if(res.status == true){
                    this.$message({message: '操作成功', type: 'success'});
                    this.search()
                }else{
                    this.$message.error('操作失败!'+res.errorMessage);
                }
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
         
            search(){
                this.currentPage = 1
                this.submit()
            },
            submit(){
                this.loading = true
                this.GetFullUserVerifyInfo({
                    // name:this.formInline.customer,
                    // mobile:this.formInline.phoneNumber,
                    // date1: this.formInline.startDate,
                    // date2: this.formInline.endDate,
                    status:this.formInline.status,
                    pageIndex: this.currentPage,
                    pageSize:this.size,
                    keyWords:this.formInline.keyWords,
                })
                
            },
            async GetFullUserVerifyInfo(params){
                let res = await GetFullUserVerifyInfo(params)
                if(res.status){
                    this.total = res.count
                    this.tableData = res.data
                    // this.getPageData()
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
            // getPageData(){
            //     this.tableData = this.allData.slice((this.currentPage-1)*this.size,this.currentPage*this.size)
            // },

        },
        components: {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
