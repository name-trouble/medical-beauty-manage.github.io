<template>
    <div class="selCommon MemberManage">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px">
            <el-form-item label="注册时间：" class="form_item_mt10">
                <el-date-picker
                    v-model="date"
                    type="daterange"
                    class="form_sear_ipt"
                    @change="dateSelect"
                    placeholder="选择日期范围">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="会员：" class="form_item_mt10">
                <el-input v-model="formInline.name" placeholder="" class="form_sear_ipt"  v-on:keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            <el-form-item label="手机号：" class="form_item_mt10">
                <el-input v-model="formInline.phone" placeholder="" class="form_sear_ipt"  v-on:keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            <el-form-item label="推荐人：" class="form_item_mt10">
                <el-input v-model="formInline.rec" placeholder="" class="form_sear_ipt"  v-on:keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            <!-- <el-form-item label="认证状态：" class="form_item_mt10">
                <el-select v-model="formInline.status" @change="onSubmit">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="未认证" value="0"></el-option>
                    <el-option label="已认证" value="1"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="医院：" class="form_item_mt10">
                <el-select v-model="formInline.hospital" class="form_sear_ipt" @change="onSubmit">
                    <el-option v-for="(item,index) in hospitalList" :key="index" :label="item.supplierName" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <br/>
            <el-form-item label=" " class="form_item_mt10">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
            </el-form-item>
        </el-form>
        <!-- 信息表 -->
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" height="460" v-loading="loading">
            <el-table-column prop="Code" width="120" label="会员编号" >
                <template slot-scope="scope">
                    <el-button type="text" @click="det(scope.row)">{{scope.row.Code}}</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="CreateOn" width="110" label="注册日期" >
                <template slot-scope="scope">
                    <span v-if="scope.row.CreateOn">
                        {{scope.row.CreateOn.substring(0,10)}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="MemberName" label="会员" min-width="90"></el-table-column>
            <el-table-column prop="MemberTags" label="类型" min-width="50"></el-table-column>
            <el-table-column prop="PhoneNumber" label="手机号" min-width="100"></el-table-column>
            <el-table-column prop="CardNO" label="卡号" min-width="90"></el-table-column>
            <el-table-column prop="IDCard" label="身份证号" min-width="130"></el-table-column>
            <el-table-column prop="Birthday" label="生日" min-width="100"></el-table-column>
            <el-table-column prop="Sex" label="性别" min-width="70">
                <template slot-scope="scope">
                    <span v-if="scope.row.Sex == 1">男</span>
                    <span v-if="scope.row.Sex == 0">女</span>
                </template>
            </el-table-column>
            <el-table-column prop="ReferrerCode" label="推荐人" min-width="150">
                <template slot-scope="scope">
                    {{scope.row.ReferrerName}} [{{scope.row.ReferrerCode}}]<span v-if="scope.row.BranchTags&scope.row.BranchTags!='undefined'">({{scope.row.BranchTags}})</span>
                </template>
            </el-table-column>
            <el-table-column prop="GradeName" label="推荐人等级" min-width="150"></el-table-column>
            <el-table-column prop="HospitalName" label="医院" min-width="150"></el-table-column>
            <!-- <el-table-column prop="IsAuth" label="认证状态" min-width="100">
                <template slot-scope="scope">
                    <el-tag type="danger" v-if="scope.row.IsAuth == false">未认证</el-tag>
                    <el-tag type="success" v-if="scope.row.IsAuth == true">已认证</el-tag>
                </template>
            </el-table-column> -->
            <!-- <el-table-column prop="IsAuth" label="操作" min-width="100">
                <template slot-scope="scope">
                    <el-button @click="aut(scope.$index,tableData)" type="text"  v-if="scope.row.IsAuth == false">认证</el-button>
                </template>
            </el-table-column> -->
        </el-table>
        <!-- 信息表 -->

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
        <el-dialog title="详情" :visible.sync="dialogTableVisibleD" size="" :close-on-click-modal="false" top="20%">
            <det style="width: 500px" v-if="dialogTableVisibleD" :mes="mes"></det>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import  "../../style/selfCommon.less"
    import det from "./components/memberDet"
    import {GetMembers,UpdateIsAuth,UserRegister,GetDropDownPermission} from "@/api/myData"
    export default {
        // name:"MemberManage",
        data () {
            return {
                loading:true,
                mes:{},
                dialogTableVisibleD:false,
                dialogTableVisible:false,
                dialogTableVisible1:false,
                total:10,
                size:10,
                currentPage:1,
                hospitalList:[],
                date:"",
                formInline:{
                    date1:"",
                    date2:"",
                    status:"",
                    name:"",
                    phone:"",
                    rec:"",
                    IsAuth:"",
                    hospital:''
                },
                tableData:[]
            }
        },
        computed: {
            /* 导出报表参数 tHeader,filterVal,tableData1*/
            // tHeader(){
            //     return ['会员编号','注册日期', '会员', '手机号', '身份证号', '生日', '性别', '推荐人','推荐人等级','医院','认证状态']
            // },
            // filterVal(){
            //     return ['Code', 'CreateOn', 'MemberName', 'PhoneNumber', 'IDCard','Birthday','Sex','ReferrerName','grade','grade','IsAuth']
            // },
            // tableData1(){
            //     return this.tableData
            // },
            // name(){
            //     return '会员管理'
            // },
            /*导出报表参数 tHeader,filterVal,tableData1*/
        },
        filters:{
            filterAddr(val){

                if(val){
                    let add = val.split(",").join("")
                    return add
                }else{
                    return ""
                }
            }
        },
        mounted(){
           this.getHospital()
        },
        methods:{
//            认证注册
            async UserRegister(params){
                try{
                    let res = await UserRegister(params)

                    if(res){
                        this.$message({message: '认证成功', type: 'success'})
                        this.search()
                    }else{
                        this.$message.error('认证失败')
                    }
                }catch(err){
                    console.log(err)
                }
            },
//            认证
//            realname  mobile userPassword=123456
            async UpdateIsAuth(index,data){
                try{
                    let res = await UpdateIsAuth( {id:data[index].Id})
                    if(res.success){
//                       this.UserRegister({realname:data[index].MemberName, mobile:data[index].PhoneNumber, userPassword:"123456",code:data[index].Code})
                        this.$message({message: '认证成功', type: 'success'})
                        this.search()
                    }else{
                        this.$message.error('认证失败')
                    }
                }catch(err){
                    console.log(err)
                    this.$message.error('认证失败')
                }
            },
            async getHospital(params){
                try {
                    let res1 = await GetDropDownPermission({typeId: 1});
                    this.hospitalList = res1.data
                    this.formInline.hospital = this.hospitalList[0].code
                    this.search()
                } catch (err) {
                    console.log(err)
                }
            },
//            获取会员
            async GetMembers(params){
                try {
                    let res = await GetMembers(params)
                    this.loading = false
                    if(res.length!=0){
                        this.total = res[0].RecordCount
                    }else{
                        this.total = 0
                    }
                    this.tableData = res
                } catch (err) {
                    console.log(err)
                }
            },
            onSubmit(){
                this.currentPage = 1
                this.search()
            },
            search(){
                this.loading = true
                this.GetMembers({
                    pageIndex:this.currentPage,
                    pageSize:this.size,
                    memberName:this.formInline.name,
                    phoneNumber:this.formInline.phone,
                    referrerName:this.formInline.rec,
                    startDate:this.formInline.date1,
                    endDate:this.formInline.date2,
                    isAuth:this.formInline.status,
                    hospitalCode:this.formInline.hospital
                })
            },
            dateSelect(val){
                if(val.length){
                    val = val.formatDates()
                    this.formInline.date1 = val.substring(0,10)
                    this.formInline.date2 = val.substring(13)
                }else{
                    this.formInline.date1 = ""
                    this.formInline.date2 = ""
                }
                this.onSubmit()
            },
            edit(index,data){
                this.mes=data[index]
                this.dialogTableVisible1 = true
            },
            aut(index,data){
                // this.$confirm('是否确认该用户的认证?', '提示', {
                //     confirmButtonText: '确定',
                //     cancelButtonText: '取消',
                //     type: 'warning'
                // }).then(() => {
                //     this.UpdateIsAuth(index,data)
                // }).catch(() => {

                // });
                const h = this.$createElement;
                this.$msgbox({
                    title: '提示',
                    message: h('p', null, [
                        h('span', null, '是否进行结算? '),
                    ]),
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = '执行中...';
                            this.UpdateIsAuth(index,data)
                            instance.confirmButtonLoading = false;
                            done();
                        } else {
                            done();
                        }
                    }
                }).then(action => {});
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.size = val
                this.search()
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val
                this.search()
            },
            det(data){
                this.dialogTableVisibleD = true
                this.mes = data
            }
        },
        components: {
            det
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
