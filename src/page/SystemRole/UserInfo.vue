<template>
    <div class="system-role">
         <el-form :inline="true" class="demo-form-inline form_search" label-width="100px">
            <el-form-item label="注册日期：" class="form_item_mt10">
                <el-date-picker
                    v-model="date"
                    style="width: 200px;"
                    type="daterange"
                    @change="dateChange"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="关键字：" class="form_item_mt10">
                <el-input v-model="filterWord" placeholder="请输入" style="width: 200px;" v-on:keyup.enter.native="init"></el-input>
            </el-form-item>
            <el-form-item label="类型：" class="form_item_mt10">
                <el-select v-model="type"  style='width:200px;'>
                    <el-option value="" label="全部" ></el-option>
                    <el-option label="平台" value="01" ></el-option>
                    <el-option label="代理" value="02" ></el-option>
                    <el-option label="医院" value="03" ></el-option>
                    <el-option label="会员" value="04" ></el-option>
                    <el-option label="平台客服" value="05" ></el-option>
                    <el-option label="线上app会员" value="06" ></el-option>
                    <el-option label="服务商" value="07" ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="机构：" class="form_item_mt10">
                <el-select v-model="hospital"  style='width:200px;'>
                    <el-option v-for="(item,index) in hospitalList" :key="index" :value="item.code" :label="item.supplierName" ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="代理商：" class="form_item_mt10">
                <el-select  v-model="branch" filterable remote placeholder="请输入关键词" :remote-method="remoteMethod" :loading="loading" style="width: 200px;">
                    <el-option v-for="item in branchList" :key="item.value" :label="'('+item.Code+')'+item.BranchName" :value="item.Code"></el-option>
                </el-select>
            </el-form-item>
            <!-- <el-form-item label="所属销售公司：" class="form_item_mt10" v-if="type=='06'">
                <el-select  v-model="belongTop" filterable placeholder="请输入关键词" style="width: 200px;">
                    <el-option v-for="item in topBranchList" :key="item.code" :label="item.branchName" :value="item.code"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="所属消费商：" class="form_item_mt10"  v-if="type=='06'">
                <el-select  v-model="belongBra" filterable remote placeholder="请输入关键词" :remote-method="remoteMethod" :loading="loading" style="width: 200px;">
                    <el-option v-for="item in branchList" :key="item.value" :label="'('+item.Code+')'+item.BranchName" :value="item.Code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label=" " class="form_item_mt10">
                <el-button type="primary" size="small" icon="search" @click="init">搜索</el-button>
                <el-button type="primary" size="small" icon="plus" @click="addRow">添加</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" ref="multipleTable" style="width: 100%;margin-top:10px;margin-bottom:10px;" max-height="560"  class="smt min_table"
                  border stripe row-key="id" @selection-change="selectChange" v-loading="tabLoading">
            <el-table-column prop="Id" label="编号" min-width="100"></el-table-column>
            <el-table-column prop="UserName" label="用户名" min-width="100"></el-table-column>
            <el-table-column prop="CreateOn" label="创建时间" width="100">
                <template slot-scope="scope">
                    <span v-if="scope.row.CreateOn">{{scope.row.CreateOn.substring(0,10)}}</span>
                </template>
            </el-table-column>

            <!-- <el-table-column prop="Mobile" label="手机号码" width="100"></el-table-column> -->
            <el-table-column prop="Realname" label="真实姓名" min-width="150">
                <template slot-scope="scope">
                    <span v-if="scope.row.Realname">{{scope.row.Realname}}<br/>{{scope.row.Mobile}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="ShareCode" label="分享码" min-width="90"></el-table-column>
            <el-table-column prop="CreateOn" label="推荐人" width="150">
                <template slot-scope="scope">
                    <span v-if="scope.row.RefRealName">{{scope.row.RefRealName}}<br/>{{scope.row.RefMobile}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="ServiceManName" label="服务者" min-width="100"></el-table-column>

            <el-table-column prop="TypeCode" label="类型" min-width="90">
                <template slot-scope="scope">
                    <span v-html="getTypeName(scope.row.TypeCode)"></span>
                </template>
            </el-table-column>

            <el-table-column prop="UserName" label="机构名称" min-width="90">
                <template slot-scope="scope">
                    <span v-if="scope.row.TypeCode == '01'">平台</span>
                <span v-else>
                     {{scope.row.HospitalName}}<br/>{{scope.row.HospitalCode}}
                </span>
                </template>
            </el-table-column>

            <el-table-column prop="UserName" label="代理商" min-width="100">
                <template slot-scope="scope">
                    {{scope.row.BranchName}}<br/>{{scope.row.BranchCode}}
                </template>
            </el-table-column>
            <el-table-column prop="LeastBranchName" label="所属代理商" min-width="100">
                <template slot-scope="scope">
                    {{scope.row.LeastBranchName}}<br/>{{scope.row.LeastBranchCode}}
                </template>
            </el-table-column>

            <el-table-column prop="Gender" label="性别" width="80"></el-table-column>
            <el-table-column prop="Email" label="邮箱" min-width="130"></el-table-column>

            <el-table-column prop="Enabled" label="是否有效" min-width="80">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.Enabled === 1 ? 'success' : 'warning'" close-transition v-html="scope.row.Enabled === 1 ? '有效' : '无效'"></el-tag>
                </template>
            </el-table-column>

            <el-table-column fixed="right" label="操作" width="250">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" icon="edit" :disabled="scope.row.TypeCode!='03'" @click="editHos(scope.row)">医院</el-button>
                    <el-button type="primary" size="mini" icon="edit" @click="editRow(scope.$index)">编辑</el-button>
                    <el-button type="primary" size="mini" icon="delete" @click="deleteRow(scope.$index)">删除</el-button>
                    <el-button type="primary" size="mini" icon="edit" @click="changeGrade(scope.row)">修改等级</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="block">
            <el-pagination @size-change="pageSizeChange" @current-change="pageIndexChange" :total="dataCount"
                           :current-page.sync="currentPage" :page-size="pageSize"
                           :page-sizes="[10, 20, 50, 100,500 ,1000]" layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
        </div>

        <el-dialog title="添加用户信息" :visible.sync="ispopAdd" size="" top="10%" @close="pageIndexChange(currentPage)">
            <pop-add v-if="ispopAdd" style="width: 700px"></pop-add>
        </el-dialog>

        <el-dialog ref="updateDialog" title="修改用户信息" :visible.sync="ispopEdit" size="" top="10%" @close="pageIndexChange(currentPage)">
            <pop-edit :dataEdit="userInfo" v-if="ispopEdit" style="width: 700px"></pop-edit>
        </el-dialog>

        <el-dialog title="修改等级" :visible.sync="addGrade" size="">
            <el-form :model="ruleForm" ref="ruleForm2" label-width="80px" class="demo-ruleForm">
                <el-form-item label="等级" prop="pass" class="form_item_mt10">
                    <el-select v-model="ruleForm.grade"  style='width:200px;'>
                        <el-option v-for="(item,index) in gradeList" :key="index" :label="item.gradeName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="优先级" prop="checkPass" class="form_item_mt10">
                    <span>{{ruleForm.priorities}}</span>
                </el-form-item>
                <el-form-item label="提成比例" prop="age" class="form_item_mt10">
                   <span>{{ruleForm.extractRatio}}</span> %
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="服务医院" :visible.sync="serviceHos" size="" top="10%">
            <hosBind v-if="serviceHos" :userInfo="userInfo" @dialogClose="dialogClose"></hosBind>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import hosBind from "./com/hosBind"
    import PopAdd from './com/addUser'
    import PopEdit from './com/editUser'
    import { getCookie, delCookie } from '@/config/mUtils'
    import { setStyle, copyObj } from './lib/data.js'
    import { getUserInfoByPage, deleteUser ,GetBranchByKeywords,GetDropDownPermission,GetGradeList,ModifyUserGrade} from '../../api/myData'
    import './lib/role.less'
    export default {
        // name: '',
        components: {
            PopAdd, PopEdit,hosBind
        },
        data() {
            return {
                topBranchList:[],
                belongTop:'',
                belongBra:'',
                date:'',
                serviceHos:false,
                addGrade:false,
                loading:false,
                type:"",
                branchList:[],
                tabLoading:false,
                hospitalList:[],
                hospital:"",
                branch:"",
                ispopAdd: false,
                ispopEdit: false,
                userInfo: {},
                filterWord: "",
                tableData: [],
                selectData: [],
                dataCount: 0, //总数
                currentPage: 1,   //当前页面index
                pageSize: 10,  //每页显示条数
                startData:'',
                endDate:'',
                ruleForm:{
                    'grade':"",
                    "gradeName": "",
                    "priorities": "",
                    "extractRatio": 0,
                },
                gradeList:[],
            }
        },

        watch:{
            "ruleForm.grade":{
                handler(curVal,oldVal){
                    this.gradeList.forEach(ele=>{
                        if(curVal==ele.id){
                            this.ruleForm.priorities = ele.priorities
                            this.ruleForm.extractRatio = ele.extractRatio
                        }
                    })
                },
                deep:true
            },
            'type':{
                handler(curVal,oldVal){
                    this.belongTop = ''
                    this.belongBra = ''
                },
                deep:true
            }
        },

        mounted() {
            this.getHos()
        },

        methods: {
            dateChange(val){
                if(val){
                    val = val.formatDates()
                    this.startDate = val.substring(0,10)
                    this.endDate = val.substring(13)
                }else{
                    this.startDate = ""
                    this.endDate = ""
                }
            },
            dialogClose(val){
                if(val){
                    this.getUserInfo()
                }
                this.serviceHos = false
            },
            editHos(data){
                this.userInfo = data
                this.serviceHos = true
            },
            async ModifyUserGrade(params){
                let res = await ModifyUserGrade(params)
                if(res.status){
                    this.$message({message: '修改成功',type: 'success'});
                    this.addGrade = false
                    this.getUserInfo()
                }else{
                    this.$message.error("修改失败，"+res.errorMessage);
                }
            },
            changeGrade(data){
                this.userInfo = data
                this.addGrade = true
                this.ruleForm.grade = data.gradeId?data.gradeId:''
            },
            submitForm(formName){
               this.ModifyUserGrade({
                    "userId": this.userInfo.Id,
                    "gradeId": this.ruleForm.grade,
                    "submitUserId": getCookie("userId"),
                    "submitUserName": getCookie("userName"),
               })
            },
            resetForm(formName){
                this.ruleForm = {
                    grade:"",
                    "gradeName": "",
                    "priorities": "",
                    "extractRatio": 0,
                }
            },

            async getHos(){
                let res  = await GetDropDownPermission({typeId:1})
                let top = await GetDropDownPermission({typeId:2})
                this.topBranchList = top.data
                this.belongTop = this.topBranchList[0].code
                this.hospitalList = res.data
                this.hospital = res.data[0].code
                let res1 = await GetGradeList()
                this.gradeList = res1.data
                this.getUserInfo()
            },
            async getUserInfo(){
                this.tabLoading = true
                let data = {
                    pageIndex: this.currentPage,
                    pageSize: this.pageSize,
                    keywords: this.filterWord.removeSP(),
                    hospitalCode:this.hospital,
                    branchCode:this.branch,
                    typeCode:this.type,
                    startDate:this.startDate,
                    endDate:this.endDate,
                    BelongedCode:this.belongBra
                }
                this.tableData = await getUserInfoByPage(data)
                if(this.tableData[0]){
                    this.dataCount = parseInt(this.tableData[0]["RecordCount"])
                }else{
                    this.dataCount = 0
                }
                this.tabLoading = false
            },

            remoteMethod(query) {
                if (query !== '') {
                    this.loading = true;
                   this.GetBranchByKeywords({
                       keywords:query.removeSP()
                   })
                } else {
                    this.branchList = [];
                    this.branch = ""
                    this.belongBra = ''
                    this.belongTop = ''
                }
            },

            async GetBranchByKeywords(params){
                try{
                    this.branchList = await GetBranchByKeywords(params)
                    this.loading = false
                }catch(err){
                    console.log(err)
                }
            },

            editRow(index){
                let data = this.tableData[index]
                // data.type
                for (let item in data) {
                    this.$set(this.userInfo, item, data[item])
                }
                this.ispopEdit = true
            },

            addRow(){
                this.ispopAdd = true
            },


            selectChange(val) {
                this.selectData = val
            },

            async deleteUser(userId, index){
                let res = await
                    deleteUser(userId)
                if (res == 1) {
                    this.$message({type: 'success', message: '删除成功!'})
                    this.tableData.splice(index, 1)
                    this.getUserInfo()
                }
                else this.$message({type: 'warning', message: '删除失败!'})

            } ,

            //删除事件
            deleteRow(index){
                this.$confirm('此操作将删除用户信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteUser(this.tableData[index]["Id"], index)
                }).catch(() => {
                    this.$message({type: 'info', message: '已取消删除'})
                })
            }
            ,

            pageIndexChange(index){
                this.currentPage = index
                this.getUserInfo()
            },


            pageSizeChange(size){
                this.pageSize = size
                this.getUserInfo()
            },

            init() {
                this.getUserInfo()
                this.currentPage = 1
            },

            getTypeName(val){
                if (val == '02') return '代理商'
                else if (val == '01') return '平台'
                else if (val == '03') return '医院'
                else if (val == '04') return '会员'
                else if (val == '05') return '平台客服'
                else if (val == '06') return '线上app会员'
                return ''
            },
        }

    }
</script>

<style lang="less" scoped>
    .select {

    .el-input {
        position: static;
        width: 60px;
        float: none;
    }

    .el-input,
    .el-input__inner {
        width: auto;
    }

    .el-select {
        padding-right: 0;
        float: none;
    }

    }

    .block {
        float: right;
        margin-right: 30px;
        padding-right: 0 !important;
    }
</style>
