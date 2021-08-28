<template>
    <div class="settled">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="85px">
            <el-form-item label="回访日期："  class="form_item_mt10 ">
                <el-date-picker
                    v-model="date"
                    type="daterange"
                    @change="dateChange"
                    style='width:200px;'
                    placeholder="选择日期范围">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="用户：" class="form_item_mt10">
               <el-input v-model="formInline.user"  style='width:200px;'></el-input>
            </el-form-item>

            <el-form-item label="消费商：" class="form_item_mt10">
                <el-select v-model="formInline.branch" filterable remote placeholder="请输入关键词" :remote-method="remoteMethod"   :loading="searchLoading" style='width:200px;'>
                    <el-option v-for="item in branchList" :key="item.value" :label="item.BranchName+'('+item.PhoneNumber+')'" :value="item.Code"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="回访状态：" class="form_item_mt10">
               <el-select v-model="formInline.visitStatus" style='width:200px;'>
                    <el-option label="全部" value=""></el-option>
                    <el-option label="已回访" value="1"></el-option>
                    <el-option label="未回访" value="0"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="" class="form_item_mt10 form_item_wh280">
                <el-button type="primary" @click="search" class="searchBtn" icon="search">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" max-height="600" class="min_table smt" v-loading="loading">
            <el-table-column prop="id" label="回访编号" width="80"></el-table-column>
            <el-table-column prop="planDate" label="设置回访日期" min-width="100" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.planDate">{{scope.row.planDate.substring(0,10)}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="planDate" label="实际回访日期" min-width="100" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.factDate">{{scope.row.factDate.substring(0,10)}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="realname" label="昵称/用户名" min-width="100">
                <template slot-scope="scope">
                    <el-button type="text" @click="viewCus(scope.row)">{{scope.row.realname}}</el-button>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="receiveBranchName" label="性别" min-width="100"></el-table-column> -->
            <el-table-column prop="gxqbw" label="兴趣部位" min-width="100"></el-table-column>
            <el-table-column prop="mobile" label="手机号" min-width="100"></el-table-column>
            <el-table-column prop="content" label="回访内容" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="result" label="回访记录" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="num" label="回访状态" min-width="100" align="center">
                <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.isVisited == 1">已回访</el-tag>
                    <el-tag type="danger" v-else>待回访</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="num" label="操作" min-width="100">
                <template slot-scope="scope">
                    <el-button @click="visit(scope.row)" type="primary" size="small">回访</el-button>
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

        <el-dialog title="回访" :visible.sync="dialogTableVisible" size="" top="5%">
            <dialogTbale :mes="dialogMes" v-if="dialogTableVisible" style="width:1000px;" @close="visitClose"></dialogTbale>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
import dialogTbale from './com/appCusVisit.vue'
import {GetDropDownPermission,GetBranchReceiveList,getBaseDataByCode,getServiceManAllByPage,GetList ,appVisitAdd,GetBranchByKeywords} from "@/api/myData"
import "@/style/selfCommon.less"
    export default {
        data () {
            return {
                dialogMes:{},
                dialogTableVisible:false,
                date:"",
                total:1,
                size:10,
                currentPage:1,
                HospitalList:[],
                formInline: {
                    visitStatus:"",
                    times:"",
                    customer:"",
                    startDate:"",
                    endDate:"",
                    phoneNumber:"",
                    ageS:"",
                    ageE:"",
                    branch:'',
                    user:'',
                },
                tableData:[],
                loading:false,
                searchLoading:false,
                branchList:[],
            }
        },
        computed: {
            
        },
       
        mounted(){
            this.getSupplierByPage()
        },
        methods: {
             remoteMethod(query) {
                if (query !== '') {
                this.searchLoading = true;
                    this.GetBranchByKeywords({
                       keywords:query.removeSP()
                   })
                } else {
                    this.formInline.branch = ''
                    this.branchList = [];
                }
            },
            async GetBranchByKeywords(params){
                try{
                    this.branchList = await GetBranchByKeywords(params)
                    this.searchLoading = false
                }catch(err){
                    console.log(err)
                }
            },
            visitClose(val){
                if(val){
                    this.submit()
                }
                this.dialogTableVisible = false
            },
            viewCus(data){
                this.dialogMes = data
                // this.dialogMes.detailUserId = data.userIdNum//多个地方使用该弹窗，但是用户id不同 故在此统一字段
                this.dialogMes.type = false//控制公共弹窗右侧是否显示
                this.dialogTableVisible = true
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
                this.GetList({
                    startDate: this.formInline.startDate,
                    endDate: this.formInline.endDate,
                    pageIndex: this.currentPage,
                    pageSize:this.size,
                    UserId:this.formInline.user,
                    Agent:this.formInline.branch,
                    IsVisited:this.formInline.visitStatus,
                })
            },
            async GetList(params){
                let res = await GetList(params)
                this.total = res.count
                this.tableData = res.data
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
             visit(data){
                 this.dialogMes = data
                //  this.dialogMes.detailUserId = data.userIdNum//多个地方使用该弹窗，但是用户id不同 故在此统一字段
                 this.dialogMes.type = true
                 this.dialogTableVisible = true
             }
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
