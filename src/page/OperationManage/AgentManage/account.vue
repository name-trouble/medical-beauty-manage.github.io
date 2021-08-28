<template>
    <div class="tag selCommon">
        <el-form :inline="true"  class="demo-form-inline form_search" label-width="80px">
                <el-form-item label="销售公司：" class="form_item_mt10">
                   <el-input v-model="keywords"></el-input>
                </el-form-item>
            <el-form-item label=" " class="form_item_mt10">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
                <el-button type="primary" @click="add('添加')" class="searchBtn">添加新账户</el-button>
            </el-form-item>
        </el-form>
        <el-table  :data="tableData" border style="width: 100%;margin-top:20px" class="min_table smt" v-loading="loading">
            <el-table-column prop="branchName" label="总代"  min-width="180"></el-table-column>
            <el-table-column prop="shortName" label="账户别名" min-width="180"></el-table-column>
            <el-table-column prop="cardNO" label="卡号" min-width="180"></el-table-column>
            <el-table-column prop="accountHolder" label="开户人" min-width="180"></el-table-column>
            <el-table-column prop="bankName" label="开户行" min-width="180"></el-table-column>
             <el-table-column prop="address" label="操作" width="200">
                 <template slot-scope="scope">
                     <el-button type="primary" @click="edit(scope.row)" size="small">编辑</el-button>
                     <el-button @click="del(scope.$index,tableData)" size="small">删除</el-button>
                 </template>
             </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>

        <el-dialog title="添加账户" :visible.sync="dialogFormVisible" size="">
           <el-form label-position="right" label-width="80px" :model="form" style="width: 400px">
               <el-form-item label="销售公司：" class="form_item_mt10">
                    <el-select style="width:250px" v-model="topBranch" @change="branchSel" filterable placeholder="请选择">
                        <el-option v-for="(item,index) in branchList" :label="item.BranchName" :value="item.Code+'|'+item.BranchName" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="别名" class="form_item_mt10">
                    <el-input v-model="form.ShortName" style="width:250px"></el-input>
                </el-form-item>
                <el-form-item label="卡号" class="form_item_mt10">
                    <el-input v-model="form.CardNo" style="width:250px"></el-input>
                </el-form-item>
                <el-form-item label="开户人" class="form_item_mt10">
                    <el-input v-model="form.AccountHolder" style="width:250px"></el-input>
                </el-form-item>
                <el-form-item label="开户行" class="form_item_mt10">
                    <el-input v-model="form.BankName" style="width:250px"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="sure" :loading="saveLoading">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import  "@/style/selfCommon.less"
    import { getCookie, delCookie } from '@/config/mUtils'
    import {getTopBranch,AddBaseBranchAccount,GetBaseBranchAccount,DeleteBaseBranchAccount,UpdateBaseBranchAccount,
    GetDropDownPermission} from "@/api/myData"
    export default {
        // name: "VideoManage",
        data () {
            return {
                saveLoading:false,
                loading:false,
                keywords:"",
                hospitalCode:"",
                date:"",
                topBranch:"",
                dialogFormVisible:false,
                project:"",
                title:"",
                opeIndex:0,
                currentPage:1,
                total:0,
                pageSize:10,
                keywords:"",
                branchList:[],
                form:{
                    ShortName:"",
                    BankName:"",
                    CardNo:"",
                    AccountHolder:""
                },
                tableData:[],
                allData:[],
                ope:'',
            }
        },
        computed: {
           
        },
        watch:{
            
        },
        mounted(){
            this.GetDropDownPermission()
        },
        methods:{
            handleSizeChange(val) {
                this.pageSize = val
                this.currentPage = 1
                this.search()
            },

            handleCurrentChange(val) {
                this.currentPage = val
                this.search()
            },
            async UpdateBaseBranchAccount(params){
                let res = await UpdateBaseBranchAccount(params)
                 if (res.status) {
                    this.$message({message: '编辑成功', type: 'success'});
                    this.dialogFormVisible = false
                    this.search()
                } else {
                    this.$message.error('编辑失败'+res.errorMessage);
                }
                this.saveLoading = false
            },
            async AddBaseBranchAccount(params){
                this.saveLoading = true
                let res = await AddBaseBranchAccount(params)
                if (res.status) {
                    this.$message({message: '添加成功', type: 'success'});
                    this.dialogFormVisible = false
                    this.search()
                } else {
                    this.$message.error('添加失败'+res.errorMessage);
                }
                this.saveLoading = false
            },

            async GetBaseBranchAccount(params){
                let res = await GetBaseBranchAccount(params)
                if(res.status){
                    this.allData = res.data
                    this.total = res.count
                    this.pageData()
                }else{
                    this.$message({ type: 'error', message: '获取数据失败!'+res.errorMessage })
                }
                
            },
            pageData(){
                this.tableData = this.allData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
            },

            async DeleteBaseBranchAccount(params){
                let res =await DeleteBaseBranchAccount(params)
                if (res.status) {
                        this.$message({message: '删除成功', type: 'success'});
                        this.search()
                    } else {
                        this.$message.error('删除失败'+res.errorMessage);
                    }
            },

            branchSel(){
                
                if(this.topBranch.length>0){
                    this.branchCode = this.topBranch.split("|")[0]
                    this.branchName = this.topBranch.split("|")[1]
                }else{
                    this.branchCode = ""
                    this.branchName = ""
                }
            },
          
            async GetDropDownPermission(){
                this.branchList = await getTopBranch()
                let res1 = await GetDropDownPermission({typeId: 1});
                this.hospitalList = res1.data
                this.hospitalCode = res1.data[0].code
                this.search()
            },

            sure(){
                let obj = {
                    "branchCode": this.branchCode,
                    "branchName": this.branchName,
                    "shortName": this.form.ShortName,
                    "bankName": this.form.BankName,
                    "cardNO": this.form.CardNo,
                    "accountHolder": this.form.AccountHolder,
                }
                if(this.ope == 'add'){
                    obj.createUserId = getCookie("userId")
                    obj.createUserId = getCookie("userName")
                    this.AddBaseBranchAccount(obj)
                }else{
                    obj.id = this.form.id
                    obj.modifiedUserId = getCookie("userId")
                    obj.modifiedBy = getCookie("userName")
                    this.UpdateBaseBranchAccount(obj)
                }
            },
            cancel(){
                this.dialogFormVisible = false
            },

            add(ope){
                this.ope = "add"
                this.dialogFormVisible = true
                this.topBranch = ""
                this.form = {
                    ShortName:"",
                    BankName:"",
                    CardNo:"",
                    AccountHolder:""
                }
            },
          

            del(index,data){
                this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.DeleteBaseBranchAccount({id:data[index].id})
                }).catch(() => {
                    
                });
            },

            onSubmit(){
                this.currentPage = 1
                this.search()
            },
            
            search(){
                this.GetBaseBranchAccount({
                    keywords:this.keywords.removeSP()
                })
            },
            edit(data){
                this.ope = "edit"
                this.dialogFormVisible = true
                this.topBranch = data.branchCode+'|'+data.branchName
                this.branchCode = data.branchCode
                this.branchName =  data.branchName
                for(var key in data){
                    if(data[key] == null ){
                        data[key] = ""
                    }
                }
                this.form = {
                    id:data.id,
                    ShortName:data.shortName,
                    BankName:data.bankName,
                    CardNo:data.cardNO,
                    AccountHolder:data.accountHolder
                }
            }
        },
        components: {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form_footer{
    text-align: center
}
</style>
