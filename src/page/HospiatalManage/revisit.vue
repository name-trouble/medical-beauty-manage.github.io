<template>
    <div class="MemberManage">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px" >
            <el-form-item label="预约时间：" class="form_item_mt10">
                <el-date-picker
                    v-model="date"
                    type="daterange"
                    class="form_sear_ipt form_item_ipt220"
                    @change="dateSelect"
                    placeholder="选择日期范围">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="关键字：" class="form_item_mt10">
                <el-input v-model="formInline.keywords" placeholder="客户 / 设计师 / 设计师助理" class=" form_item_ipt220"  v-on:keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            <el-form-item label="状态：" class="form_item_mt10">
                <el-select v-model="formInline.diagStatus"  class=" form_item_ipt220" @change="onSubmit">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="预约中" value="0"></el-option>
                    <el-option label="未来院" value="1"></el-option>
                    <el-option label="已来院" value="2"></el-option>
                </el-select>
            </el-form-item>
            <br/>
            <el-form-item label=" " class="form_item_mt10">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
               <el-button type="primary" @click="addRevisit" class="searchBtn">添加复诊预约</el-button>
            </el-form-item>
        </el-form>
        <!-- 信息表 -->
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" height="460" v-loading="loading">
            <el-table-column prop="diagDate" width="120" label="预约日期" >
                <template slot-scope="scope">
                    <span v-if="scope.row.diagDate">
                        {{scope.row.diagDate.substring(0,10)}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="changeDate" width="120" label="变更日期" >
                <template slot-scope="scope">
                    <span v-if="scope.row.changeDate">
                        {{scope.row.changeDate.substring(0,10)}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="hospitalName" label="医院" min-width="120"></el-table-column>
            
            <el-table-column prop="designerName" label="预约设计师" min-width="120"></el-table-column>
            <el-table-column prop="designerAssistName" label="设计师助理" min-width="120"></el-table-column>
            <el-table-column prop="customerName" label="客户" min-width="120">
                <template slot-scope="scope">
                    <el-button type="text" @click="view(scope.row)">{{scope.row.customerName}}</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="projectName" label="项目" min-width="220">
                <template slot-scope="scope">
                    <span v-if="scope.row.projectName">{{scope.row.projectName.replace(/\|/g,",")}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="reservationStatus" label="状态" min-width="120">
                <template slot-scope="scope">
                    <el-tag type="danger" v-if="!scope.row.diagStatus">预约中</el-tag>
                    <el-tag type="warning" v-if="scope.row.diagStatus == 1">未来院</el-tag>
                    <el-tag type="success" v-if="scope.row.diagStatus == 2">已来院</el-tag>
                </template>
            </el-table-column>
            
            <el-table-column prop="realAmount" label="成交金额" min-width="100" ></el-table-column>

            <el-table-column prop="memo" label="备注" min-width="150" show-overflow-tooltip></el-table-column>
            
            <el-table-column prop="IsAuth" label="操作" min-width="220">
                <template slot-scope="scope">
                   <el-button @click="edit(scope.$index,tableData)" type="primary" size="small" >编辑</el-button>
                   <el-button @click="editStatus(scope.row)" type="primary" size="small">修改状态</el-button>
                   <el-button @click="del(scope.row)" type="primary" size="small">删除</el-button>
                   <el-button @click="report(scope.row)" type="primary" size="small">开单</el-button>
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

        <!--注册弹窗-->
       <el-dialog title="选择复诊用户" :visible.sync="dialogTableVisible" size="">
            <selCus style="width: 900px" @close="close" v-if="dialogTableVisible" @select='selectCus' @viewCus='view'></selCus>
        </el-dialog>
        <!--编辑弹窗-->

        <el-dialog title="客户详情" :visible.sync="dialogView"  top="5%"  size="" :close-on-click-modal="false">
            <CustomerView :mes="cusMes" style="width: 1100px"  v-if="dialogView"></CustomerView>
        </el-dialog>

        <!-- 添加 -->
        <el-dialog :title="title" :visible.sync="dialogAdd"  top="20%"  size="" :close-on-click-modal="false">
            <addRev :revisitData="revisitData" style="width:650px"  v-if="dialogAdd" @close="closeRev"></addRev>
        </el-dialog>

        <el-dialog title="编辑状态" :visible.sync="dialogStatus"  top="20%"  size="" :close-on-click-modal="false">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="80px" 
                 style='width:350px;'>
                <el-form-item label="预约时间：" class="form_item_mt10">
                    <el-date-picker
                    v-model="diagDate"
                    type="date"
                    class="form_sear_ipt form_item_ipt220"
                    @change="diagDateCha"
                    placeholder="选择日期">
                </el-date-picker>
                </el-form-item>
                <el-form-item label="状态：" class="form_item_mt10">
                    <el-select v-model="form.status"  class=" form_item_ipt220">
                        <el-option label="预约中" value="0"></el-option>
                        <el-option label="未来院" value="1"></el-option>
                        <el-option label="已来院" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注：" prop="" style="width:100%">
                    <el-input type="textarea" :rows="4" v-model="form.memo" style="width:220px"></el-input>
                </el-form-item>
                <div style="text-align:center">
                    <el-button type="primary" @click="SetDiagInvitations" >确认</el-button>
                    <el-button @click="dialogStatus = false" >取消</el-button>
                </div>
            </el-form>
        </el-dialog>
        <el-dialog title="新增报单" :visible.sync="ispopAdd" top="5%" @close="ispopAdd=false" size="" :close-on-click-modal="false">
            <pop-add v-if="ispopAdd" @popAddClose='addFinish' style="width:1000px" :customerMes="customer"></pop-add>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import  "@/style/selfCommon.less"
    import selCus from "./com/selRevisit.vue"
    import addRev from "./com/addRevisit.vue"
    import { getCookie,setSStore} from "@/config/mUtils";
    import PopAdd from '@/page/FinanceManage/ReportManage/com/addReport.vue'
    import CustomerView from "@/page/FinanceManage/ReportManage/com/customerDetail.vue"
    import edit from "./com/editCon"
    import {DeleteDiagInvitations,GetDiagInvitations,SetDiagInvitations} from "@/api/myData"
    export default {
        data () {
            return {
                customer:{},
                ispopAdd:false,
                cusMes:{},
                dialogAdd:false,
                dialogView:false,
                dialogEdit:false,
                dialogStatus:false,
                loading:false,
                dialogTableVisible:false,
                total:10,
                size:10,
                currentPage:1,
                hospitalList:[],
                date:"",
                formInline:{
                    doctor:"",
                    date1:"",
                    date2:"",
                    diagStatus:"",
                    name:"",
                    phone:"",
                    hospital:'',
                    keywords:""
                },
                form:{
                    status:'',
                    date:'',
                    memo:'',
                },
                diagDate:'',
                title:'',
                tableData:[],
                revisitData:{}
            }
        },
        computed: {
            /* 导出报表参数 tHeader,filterVal,tableData1*/
            // tHeader(){
            //     return ['预约日期','时间段', '科室', '预约医生', '客户', '项目', '状态']
            // },
            // filterVal(){
            //     return ['reservationDate', 'startTime', 'deptName', 'doctorName', 'customerName','projectName','reservationStatus']
            // },
            // tableData1(){
            //     let data = JSON.parse(JSON.stringify(this.tableData))
            //     data.forEach(row => {
            //         row.startTime = row.startTime+"-"+row.endTime
            //         row.reservationStatus = this.getStatus(row.reservationStatus)
            //     });
            //     return data
            // },
            // name(){
            //     return '预约管理'
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
            this.date = [new Date(),new Date()]
        },
        methods:{
           
            report(data){
                this.customer = {//属性值大小写和客户详情页面快速开单保持一致
                    Code:data.customerCode,
                    MemberName:data.customerName,
                    designer:data.designer,
                    designerAssist:data.designerAssist,
                    hospitalCode:data.hospitalCode,
                    hospitalName:data.hospitalName,
                }
                this.ispopAdd = true
            },
            addFinish(val){
                if(val){
                    this.search()
                }
                this.ispopAdd = false
            },
            async SetDiagInvitations(){
                let res = await SetDiagInvitations({
                    'id':this.form.id,
                    'DiagStatus':this.form.status+'',
                    'ChangeDate':this.form.date,
                    'memo':this.form.memo,
                })
                this.response(res,'修改')
                if(res.status){
                    this.dialogStatus = false
                }
            },
            editStatus(data){
                this.dialogStatus = true 
                let date = data.changeDate?data.changeDate:data.diagDate
                this.form = {
                    'id':data.id,
                    'status':data.diagStatus+'',
                    'date':date,
                    'memo':'',
                }
                this.diagDate = new Date(date.substring(0,4),date.substring(5,7)-1,date.substring(8,10))
            },
            response(res,ope){
                if(res.status){
                    this.$message({message: ope+'成功',type: 'success'});
                    this.search()
                }else{
                    this.$message.error(ope+'失败'+res.errorMessage);
                }
            },
        
            selectCus(data){
                this.title = '添加复诊预约'
                this.revisitData = JSON.parse(JSON.stringify(data))
                this.dialogAdd = true
            },
            view(data){
                this.cusMes = data
                this.dialogView = true
            },
            // getStatus(code){
            //     switch(code){
            //         case "1": return "未来院";
            //         case "2": return "手术中";
            //         case "3": return "已完成";
            //     }
            // },
            async DeleteDiagInvitations(params){
                let res = await DeleteDiagInvitations({id:params})
                this.response(res,'删除')
            },
           
            async GetDiagInvitations(params){
                let res =await GetDiagInvitations(params)
                this.loading = false
                if(res.status){
                    this.total = res.count
                    this.tableData = res.data
                }else{
                    console.log(res)
                }
            },
        
            onSubmit(){
                this.currentPage = 1
                this.search()
            },
            search(){
                this.loading = true
                this.GetDiagInvitations({
                    'startDate':this.formInline.date1,
                    'enddate':this.formInline.date2,
                    'pageIndex':this.currentPage,
                    'pageSize':this.size,
                    "hospitalCode": getCookie("hospitalCode"),
                    "keywords": this.formInline.keywords,
                    'diagStatus':this.formInline.diagStatus
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
            },
            diagDateCha(val){
                
                if(val){
                    this.form.date = val.substring(0,10)
                }else{
                    this.form.date = ""
                }
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

            addRevisit(){
                this.dialogTableVisible = true
            },
            close(val){
                this.dialogEdit = false
                this.dialogTableVisible = false
                if(val){
                    this.search()
                }
            },
            closeRev(val){
                this.dialogAdd = false
                if(val){
                    this.search()
                }
            },
            del(data){
                 this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.DeleteDiagInvitations(data.id)
                }).catch(() => {
                    
                });
            },
            edit(index,data){
                this.title = '编辑复诊预约'
                this.revisitData = data[index]
                this.dialogAdd = true
            }
        },
        components: {
            selCus,addRev,
            CustomerView,
            edit,
            PopAdd
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
