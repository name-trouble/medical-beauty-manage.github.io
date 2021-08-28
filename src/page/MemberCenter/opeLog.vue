<template>
    <div class="selCommon MemberManage">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px">
            <el-form-item label="关键字：" class="form_item_mt10">
                <el-input v-model="formInline.name" placeholder="" class="form_sear_ipt" v-on:keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            <el-form-item label=" " class="form_item_mt10">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
            </el-form-item>
        </el-form>
        <!-- 信息表 -->
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" height="460" v-loading="loading">
           
            <el-table-column prop="createOn" width="110" label="操作时间" >
                <template slot-scope="scope">
                    <span v-if="scope.row.createOn">
                        {{scope.row.createOn.substring(0,10)}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="realname" label="操作人" min-width="90"></el-table-column>
            <el-table-column prop="typeName" label="类型" min-width="50"></el-table-column>
            <el-table-column prop="beforeChange" label="修改前内容" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="afterChange" label="修改后内容" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="content" label="内容" min-width="200" show-overflow-tooltip></el-table-column>
            
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
    import {GetMembers,UpdateIsAuth,UserRegister,GetDropDownPermission,GetOperatedLog} from "@/api/myData"
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
            async GetOperatedLog(params){
                try {
                    let res = await GetOperatedLog(params)
                    this.loading = false
                    this.total = res.count
                    this.tableData = res.data
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
                this.GetOperatedLog({
                    pageIndex:this.currentPage,
                    pageSize:this.size,
                    Keywords:this.formInline.name,
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
