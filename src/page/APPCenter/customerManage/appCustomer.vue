<template>
    <div class="settled selCommon">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px">
            <el-form-item label="注册日期："  class="form_item_mt10 ">
                <el-date-picker  v-model="date" type="daterange"  @change="dateChange"  style='width:200px;'  placeholder="选择日期范围"></el-date-picker>
            </el-form-item>

            <!-- <el-form-item label="销售公司：" class="form_item_mt10">
               <el-select v-model="formInline.branch" style='width:200px;'>
                   <el-option v-for="item in topBranchList" :key="item.branchName" :label="item.branchName" :value="item.code"></el-option>
               </el-select>
            </el-form-item> -->

            <el-form-item label="消费商：" class="form_item_mt10">
                <el-select v-model="formInline.branch" filterable remote placeholder="请输入关键词" :remote-method="remoteMethod"   :loading="searchLoading">
                    <el-option v-for="item in branchList" :key="item.value" :label="item.BranchName+'('+item.PhoneNumber+')'" :value="item.Code" @click="selBranch(item.Code)"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="邀请人：" class="form_item_mt10">
               <el-input v-model="formInline.refRealName" placeholder="邀请人"  style='width:200px;'></el-input>
            </el-form-item>
            <el-form-item label="关键字：" class="form_item_mt10">
               <el-input v-model="formInline.keyWords" placeholder="手机号/用户"  style='width:200px;'></el-input>
            </el-form-item>
            <el-form-item label="" class="form_item_mt10 form_item_wh280">
                <el-button type="primary" @click="search" class="searchBtn" icon="search">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" border  ref="multipleTable" style="width: 100%;margin-top:15px;margin-bottom:10px;" max-height="600"
        class="min_table smt" v-loading="loading"  :summary-method="getSummaries" show-summary @selection-change="handleSelectionChange" >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="realname" label="昵称/用户名" min-width="100" align="center">
                <template slot-scope="scope">
                    <el-button type="text" @click="viewMes(scope.row)" size="small" >{{scope.row.realname}}</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="createOn" label="注册时间" min-width="100" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.createOn">{{scope.row.createOn.substring(0,10)}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="mobile" label="手机号" min-width="100" align="center"></el-table-column>
            <el-table-column prop="gxqbw" label="兴趣部位" min-width="150" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="refRealName" label="邀请人" min-width="100" align="center"></el-table-column>
            <el-table-column prop="refTypeName" label="邀请人身份" min-width="100" align="center"></el-table-column>
            <el-table-column prop="leastBranchName" label="所属代理商" min-width="100" align="center"></el-table-column>
            <el-table-column prop="totalPoints" label="累计积分" min-width="100" align="center"></el-table-column>
            <el-table-column prop="deductPoints" label="消费积分" min-width="100" align="center"></el-table-column>
            <el-table-column prop="pointsBalances" label="剩余积分" min-width="100" align="center"></el-table-column>
            <el-table-column prop="orders" label="下单数" min-width="100" align="center"></el-table-column>
            <el-table-column prop="receives" label="邀请人数" min-width="100" align="center">
                <template slot-scope="scope">
                    <el-button type="text" @click="viewInvites(scope.row)" size="small" >{{scope.row.receives}}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-button type="primary" @click="openDialog('',1)" :disabled="multipleSelection.length == 0">用户归属转移</el-button>
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

        <el-dialog title="用户详情" :visible.sync="viewCusDialog" size=''>
            <dialogTbale :mes="dialogMes" v-if="viewCusDialog" style="width:1000px;"></dialogTbale>
        </el-dialog>
        <el-dialog title="邀请客户" :visible.sync="invitesDialog" size=''>
            <el-form :inline="true" :model="dialogForm" class="demo-form-inline form_search" label-width="80px" >
                <el-form-item label="注册日期"  class="form_item_mt10 ">
                    <el-date-picker v-model="dialogDate" type="daterange"  @change="dateChange" style='width:200px;' placeholder="选择日期范围"></el-date-picker>
                </el-form-item>
                <el-form-item label="" class="form_item_mt10">
                    <el-button type="primary" @click="dialogSubmit" class="searchBtn" icon="search">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="dialogFormData" border style="width: 800px;margin:15px 0;" max-height="500" class="min_table smt" v-loading="dialogLoading">
                <el-table-column prop="receiveTime" label="领取时间" min-width="100" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.receiveTime">{{scope.row.receiveTime}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="invitedCode" label="邀请码" min-width="150" align="center"></el-table-column>
                <el-table-column prop="mobile" label="手机号" min-width="100" align="center"></el-table-column>
                <el-table-column prop="shareModule" label="分享模块" min-width="100" align="center"></el-table-column>
            </el-table>
            <div class="block" style="margin-bottom:10px;">
                <el-pagination
                    @size-change="handleSizeChange1"
                    @current-change="handleCurrentChange1"
                    :current-page="currentPage1"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="size1"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total1">
                </el-pagination>
            </div>
        </el-dialog>
        <el-dialog title="用户归属转移" :visible.sync="transDialog" size=''>
            <el-form :model="formInline" ref="formInline" class="demo-form-inline" label-width="80px">
                <el-form-item label="转移到：" prop="refrenceId" class="form_item_wt255 form_item_mt10" :rules="[{ required: true, message: '请选择要转移到的对象' }]">
                    <el-autocomplete v-model="formInline.customer" :fetch-suggestions="queryCus" placeholder="请输入内容" :trigger-on-focus="false" @select="selectCus" style="width:280px;float:left">
                        <template v-slot="{item}">
                            <my-item-appCustomer :item="item"></my-item-appCustomer>
                        </template>
                    </el-autocomplete>
                </el-form-item>
                <el-form-item label="备注：" class="form_item_wt255 form_item_mt10">
                    <el-input type="textarea" :rows="4" v-model="formInline.memo"></el-input>
                </el-form-item>
                <el-form-item label="" class="form_item_mt10 form_item_wh280">
                    <el-button type="primary" @click="sure('formInline')" >确定</el-button>
                    <el-button @click="transDialog = false" >取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
import dialogTbale from './com/appCusVisit.vue'
import {GetDropDownPermission,GetBranchReceiveList,getBaseDataByCode,ConfirmShared,GetReceivesList,GetUserOnlineOrderReport,
GetBranchByKeywords,GetUserAllByKeywords,ChangeUserRefrence,getUserInfoByPage} from "@/api/myData"
import "@/style/selfCommon.less"
import Vue from "vue"
    Vue.component('my-item-appCustomer', {
        functional: true,
        render: function(h, ctx) {
            var item = ctx.props.item;
            return h('div', ctx.data, [
                h('p', { attrs: { class: 'select_name'+item.Type, title: item.name } }, ['名字：' + item.Realname]),
                h('p', { attrs: { class: 'select_name'+item.Type, title: item.name} }, ['手机号：' + item.Mobile]),
            ]);
        },
        props: {
            item: { type: Object, required: true }
        }
    });
    export default {
        data () {
            return {
                transDialog:false,
                dialogMes:{},
                viewCusDialog:false,
                invitesDialog:false,
                dialogMes:{
                    label:"",
                    type:""
                },
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
                    keyWords:'',
                    refRealName:'',
                    customer:'',
                    refrenceId:'',
                    refrenceName:'',
                    memo:'',
                },
                tableData:[],
                loading:false,
                searchLoading:false,
                title:"",
                topBranchList:[],
                branchList:[],
                editMes:{},
                dialogForm:{
                    startDate:'',
                    endDate:'',

                },
                dialogDate:'',
                dialogLoading:false,
                dialogFormData:[],
                total1:1,
                size1:10,
                currentPage1:1,
                allData:[],
                sumdata:{
                    totalPoints:0, deductPoints:0, pointsBalances:0, orders:0, receives:0,
                },
                multipleSelection:[],
                customerList:[],
            }
        },
        watch:{
            'customer':{
                handler(curVal,oldVal){

                    if(curVal == ''){
                        this.formInline.refrenceId = ''
                        this.formInline.refrenceName = ''
                    }
                }
            }
        },
        computed: {

        },

        mounted(){
            this.getSupplierByPage()
        },
        methods: {
            sure(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let idArr = []
                        this.multipleSelection.forEach(row=>{
                            idArr.push(row.id)
                        })
                        this.translateRef({
                            "userIds": idArr.join(","),
                            "refUserId": this.formInline.refrenceId,
                            "memo": this.formInline.memo,
                        })
                    }
                });
            },
            async translateRef(params){
                let res = await ChangeUserRefrence(params)
                if(res.status == true){
                    this.$message({message: '操作成功', type: 'success'});
                    this.search()
                    this.transDialog =false
                }else{
                    this.$message.error('操作失败!'+res.errorMessage);
                }
            },
            openDialog(data,ope){
                if(ope == 1){
                    this.formInline.memo = ''
                    this.formInline.customer = ''
                    this.transDialog = true
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            getSummaries(param) {
                return ['合计','','','','','','','',this.sumdata.totalPoints,this.sumdata.deductPoints,this.sumdata.pointsBalances,this.sumdata.orders,this.sumdata.receives];
            },
            selBranch(data){

            },
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
            async GetReceivesList(){
                let res = await GetReceivesList({
                    date1:this.dialogForm.startDate,
                    date2:this.dialogForm.endDate,
                    module:"",
                    pageIndex:this.currentPage1,
                    pageSize:this.size1,
                    invitedCode:this.editMes.userOnlyCode
                })
                this.dialogFormData = res.data
                this.total1 = res.count
            },
            dialogSubmit(){
                this.currentPage1 = 1
                this.GetReceivesList()
            },
            viewInvites(data){
                this.editMes = data
                this.invitesDialog = true
            },
            viewMes(data){
                this.dialogMes = data
                // this.dialogMes.detailUserId = data.id//多个地方使用该弹窗，但是表示用户id不同 故在此统一字段
                this.viewCusDialog = true
            },
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
                this.topBranchList = res.data
            },
            search(){
                this.currentPage = 1
                this.submit()
            },
            submit(){
                this.loading = true
                this.GetUserOnlineOrderReport({
                    'startDate': this.formInline.startDate,
                    'endDate': this.formInline.endDate,
                    'pageIndex': this.currentPage,
                    'pageSize':this.size,
                    'keywords':this.formInline.keyWords,
                    "belongedCode": this.formInline.branch,
                    refRealName:this.formInline.refRealName,
                })
            },
            async GetUserOnlineOrderReport(params){
                let res = await GetUserOnlineOrderReport(params)
                if(res.data.length>0){
                    this.total = res.count
                    this.tableData = res.data
                    this.sumdata=res.sumdata[0]
                }else{
                    this.tableData = []
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

            handleSizeChange1(val) {
                this.size1 = val
                this.GetReceivesList()
             },
            handleCurrentChange1(val) {
                this.currentPage1 = val
                this.GetReceivesList()
            },

            getPage(){//前端分页合计
                 this.tableData = this.allData.slice((this.currentPage-1)*this.size,this.currentPage*this.size)
            },
            getMember(res) {
            this.customerList = []
            if (res instanceof Array && res.length > 0) {
                for (let item of res) {
                    item.value = item.Realname
                    this.customerList.push(item)
                }
            }
        },
            //查找会员 下拉补全
            async queryCus(queryString, cb) {
                if (queryString !== '' && queryString != undefined) {
                    let data = {pageIndex: 1,pageSize: 30,keywords: queryString,hospitalCode:'',branchCode:'', typeCode:'',startDate:'',endDate:'',BelongedCode:''}
                    let res = await getUserInfoByPage(data)
                    this.getMember(res)
                }
                this.formInline.refrenceId = ''
                this.formInline.refrenceName = ''
                let _this = this
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    cb(_this.customerList);
                }, 100);
            },

            //点击获取 会员信息  Oject
            selectCus(item) {
                this.formInline.refrenceId = item.Id
            },
        },
        components: {
            dialogTbale
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
