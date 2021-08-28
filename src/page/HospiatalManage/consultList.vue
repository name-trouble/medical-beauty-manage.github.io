<template>
    <div class="MemberManage">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px" >
            <el-form-item label="咨询时间：" class="form_item_mt10">
                <el-date-picker
                    v-model="date"
                    type="daterange"
                     class=" form_item_ipt220"
                    @change="dateSelect"
                    placeholder="选择日期范围">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="客户：" class="form_item_mt10">
                <el-input v-model="formInline.name" placeholder="" class="form_item_ipt220"  v-on:keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            <el-form-item label="咨询分类：" class="form_item_mt10">
                <el-select v-model="formInline.status" class="form_item_ipt220" @change="onSubmit">
                    <el-option label="现场咨询" value="现场咨询"></el-option>
                    <el-option label="网络咨询" value="网络咨询"></el-option>
                    <el-option label="代理商" value="代理商"></el-option>
                    <el-option label="朋友介绍" value="朋友介绍"></el-option>
                    <el-option label="市场咨询顾问" value="市场咨询顾问"></el-option>
                    <el-option label="会员中心" value="会员中心"></el-option>
                    <el-option label="危二级市场" value="危二级市场"></el-option>
                    <el-option label="前台咨询" value="前台咨询"></el-option>
                    <el-option label="微信咨询" value="微信咨询"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="就诊类型：" class="form_item_mt10">
                <el-select v-model="formInline.schedulingTypeId" placeholder="请选择"  class="form_item_ipt220">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="初诊" value="1"></el-option>
                    <el-option label="复诊" value="2"></el-option>
                    <el-option label="复查" value="3"></el-option>
                    <el-option label="再消费" value="4"></el-option>
                    <el-option label="其他" value="5"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否成交：" class="form_item_mt10">
                <el-select v-model="formInline.isDeal" class="form_item_ipt220" @change="onSubmit">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="成交" value="1"></el-option>
                    <el-option label="未成交" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="关键字：" class="form_item_mt10">
                <el-input v-model="formInline.keywords" class="form_item_ipt220" placeholder="姓名/编号/卡号/手机号"  v-on:keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            <br/>
            <el-form-item label=" " class="form_item_mt10">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
                <!-- <Export :tHeader="tHeader" :filterVal=' filterVal' :tableData1='tableData1' :name='name'></Export> -->
               <el-button type="primary" @click="add('添加咨询')" class="searchBtn">添加咨询</el-button>
            </el-form-item>
        </el-form>
        <!-- 信息表 -->
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" height="460" v-loading="loading">
            <el-table-column prop="consultingDate" width="120" label="咨询日期" >
                <template slot-scope="scope">
                    <span v-if="scope.row.consultingDate">
                        {{scope.row.consultingDate.substring(0,10)}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="customerName" label="客户" min-width="120">
                <template slot-scope="scope">
                    <el-button type="text" @click="view(scope.$index,tableData)">{{scope.row.customerName}}</el-button>
                    <span>{{scope.row.memberTags}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="IsDeal" label="是否成交" min-width="100" align="center">
                <template slot-scope="scope">
                    <el-tag :type="!scope.row.isDeal?'danger':'success'" v-text="!scope.row.isDeal?'未成交':'成交'"></el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="phoneNumber" label="手机号" min-width="100"></el-table-column>
            <el-table-column prop="referrerName" label="推荐人" min-width="100"></el-table-column>
            <el-table-column prop="typeId" label="就诊类型" min-width="100">
                <template slot-scope="scope">
                            <span v-if="scope.row.typeId == 1">初诊</span>
                            <span v-if="scope.row.typeId == 2">复诊</span>
                            <span v-if="scope.row.typeId == 3">复查</span>
                            <span v-if="scope.row.typeId == 4">再消费</span>
                            <span v-if="scope.row.typeId == 5">其他</span>
                        </template>
            </el-table-column>
            <el-table-column prop="projectName" label="项目" min-width="120">
                <template slot-scope="scope">
                    <span v-if="scope.row.projectName!='undefined'">{{scope.row.projectName}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="designerName" label="设计师" min-width="100"></el-table-column>
            <el-table-column prop="designerAssistName" label="设计师助理" min-width="120"></el-table-column>
            <el-table-column prop="consultingName" label="咨询分类" min-width="110"></el-table-column>
            <el-table-column prop="consultingContent" label="内容" min-width="260"></el-table-column>

            <el-table-column prop="IsAuth" label="操作" min-width="150" align="center">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row,'咨询编辑')" type="primary" size="small">编辑</el-button>
                    <el-button @click="view(scope.$index,tableData)" type="primary" size="small">回访</el-button>
                    <el-button @click="del(scope.$index,tableData)" type="primary" size="small">删除</el-button>
                </template>
            </el-table-column>
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

       <el-dialog :title="title" :visible.sync="dialogTableVisible" size="">
            <add style="width: 650px" v-if="dialogTableVisible" @close="close" :editMes="editMes"></add>
        </el-dialog>

        <el-dialog title="客户详情" :visible.sync="dialogView"  top="5%"  size="" :close-on-click-modal="false">
            <CustomerView :mes="cusMes" style="width: 1100px"  v-if="dialogView"></CustomerView>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import  "@/style/selfCommon.less"
    import add from "./com/addConsult.vue"
    import CustomerView from "./com/visit.vue"
    import {UserRegister,GetDropDownPermission,GetConsulting,DeleteConsulting} from "@/api/myData"
    export default {
        // name:"MemberManage",
        data () {
            return {
                cusMes:{},
                dialogView:false,
                loading:false,
                mes:{},
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
                    hospital:'',
                    keywords:"",
                    isDeal:'',
                    schedulingTypeId:''
                },
                tableData:[],
                editMes:{},
                title:''
            }
        },
        computed: {
            /* 导出报表参数 tHeader,filterVal,tableData1*/
            // tHeader(){
            //     return ['咨询日期','客户', '推荐人', '项目', '设计师', '设计师助理', '咨询分类', '内容']
            // },
            // filterVal(){
            //     return ['consultingDate', 'customerName', 'phoneNumber', 'referrerName', 'projectName','designerName','designerAssistName','consultingName','consultingContent']
            // },
            // tableData1(){
            //     return this.tableData
            // },
            // name(){
            //     return '咨询'
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
            let date = new Date()
            date.setDate("01")
            this.date = [date,new Date()]
           this.getHospital()
        },
        methods:{
            view(index,data){
                this.cusMes = data[index]
                this.dialogView = true
            },
            // 删除
            async DeleteConsulting(parmas){
                let res = await DeleteConsulting(parmas)
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
            // 获取列表
            async GetConsulting(params){
                let res =await GetConsulting(params)
                this.loading = false
                  
                if(res.status){
                    this.total = res.count
                    this.tableData = res.data
                    
                }else{
                    console.log(res)
                }
            },
            // 获取医院
            async getHospital(params){
                try {
                    let res1 = await GetDropDownPermission({typeId: 1});
                    this.hospitalList = res1.data
                    this.formInline.hospital = this.hospitalList[0].code
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
                this.GetConsulting({
                    customerName:this.formInline.name,
                    consultingName:this.formInline.status,
                    keyWords:this.formInline.keywords.removeSP(),
                    startDate:this.formInline.date1,
                    enddate:this.formInline.date2,
                     pageIndex:this.currentPage,
                    pageSize:this.size,
                    isDeal:this.formInline.isDeal,
                    schedulingTypeId:this.formInline.schedulingTypeId
                })
            },
            dateSelect(val){
                if(val.length!=0){
                    val = val.formatDates()
                    this.formInline.date1 = val.substring(0,10)
                    this.formInline.date2 = val.substring(13)
                }else{
                    this.formInline.date1 = ""
                    this.formInline.date2 = ""
                }
                // this.onSubmit()
            },
            edit(data,title){
                this.title = title
                this.editMes=data
                this.dialogTableVisible = true
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

            add(title){
                this.title = title
                this.dialogTableVisible = true
            },
            close(val){
                this.dialogTableVisible = false
                if(val){
                    this.search()
                }
            },
            del(index,data){
                 this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.DeleteConsulting({
                        id:data[index].id
                    })
                }).catch(() => {
                           
                });
                
            }
        },
        components: {
            add,
            CustomerView
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
