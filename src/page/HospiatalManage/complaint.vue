<template>
    <div class="MemberManage">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px" >
            <el-form-item label="投诉日期：" class="form_item_mt10">
                <el-date-picker
                    v-model="date"
                    type="daterange"
                     class=" form_item_ipt220"
                    @change="dateSelect"
                    placeholder="选择日期范围">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="处理进度：" class="form_item_mt10">
                <el-select v-model="formInline.complaintState" class="form_item_ipt220">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="待解决" value="0"></el-option>
                    <el-option label="未解决" value="2"></el-option>
                    <el-option label="已解决" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="投诉方式：" class="form_item_mt10">
                <el-select v-model="formInline.complaintType" class="form_item_ipt220">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="来电" value="0"></el-option>
                    <el-option label="来访" value="1"></el-option>
                    <el-option label="来信" value="2"></el-option>
                    <el-option label="其他" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="关键字：" class="form_item_mt10">
                <el-input v-model="formInline.keywords" class="form_item_ipt220" placeholder="姓名"  v-on:keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            <el-form-item label=" " class="form_item_mt10">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
                <el-button type="primary" @click="exportAllData" class="searchBtn" :disabled="tableData.length == 0"  :loading='btnLoading'>导出报表</el-button>
                <Export ref="export" :tHeader="tHeader" :filterVal=' filterVal' :tableData1='tableData1' :name="name" v-show="false"></Export>
               <el-button type="primary" @click="add" class="searchBtn" icon="plus">添加</el-button>
            </el-form-item>
        </el-form>
        <!-- 信息表 -->
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" height="460" v-loading="loading">
            <el-table-column prop="createOn" min-width="90" label="创建日期" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.createOn">
                        {{scope.row.createOn.substring(0,10)}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="customerName" label="客户" min-width="90">
                <template slot-scope="scope">
                    <el-button type="text" @click="view(scope.$index,tableData)">{{scope.row.customerName}}</el-button>
                </template>
            </el-table-column>
            
            <el-table-column prop="sex" label="性别" min-width="80" align="center">
                <template slot-scope="scope">
                    <span v-text="scope.row.sex == '0'?'女':'男'"></span>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="phoneNumber" label="手机号" min-width="100" align="center"></el-table-column> -->
            <el-table-column prop="age" label="年龄" min-width="70"></el-table-column>
            <!-- <el-table-column prop="cusAddress" label="顾客地址" min-width="120"></el-table-column> -->
            <el-table-column prop="deptName" label="事由科室" min-width="100"></el-table-column>
            <el-table-column prop="projectName" label="项目" min-width="120"></el-table-column>
            <el-table-column prop="doctorName" label="医生" min-width="80"></el-table-column>
            <el-table-column prop="firstDate" min-width="90" label="初诊日期" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.firstDate">
                        {{scope.row.firstDate.substring(0,10)}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="complaintType" label="投诉方式" min-width="80" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.complaintType == 0">来电</span>
                    <span v-if="scope.row.complaintType == 1">来访</span>
                    <span v-if="scope.row.complaintType == 2">来信</span>
                    <span v-if="scope.row.complaintType == 3">其他</span>
                </template>
            </el-table-column>
            <el-table-column prop="complaintState" label="处理进度" min-width="80" align="center">
                <template slot-scope="scope">
                    <el-tag type="gray" v-if="scope.row.complaintState == 0">待解决</el-tag>
                    <el-tag type="success" v-if="scope.row.complaintState == 1">已解决</el-tag>
                    <el-tag type="warning" v-if="scope.row.complaintState == 2">未解决</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="anasDesc" label="原因分析" min-width="150" show-overflow-tooltip></el-table-column>
            <el-table-column prop="verifReasons" label="核实情况" min-width="150" show-overflow-tooltip></el-table-column>
            <el-table-column prop="procResult" label="处理结果" min-width="150" show-overflow-tooltip></el-table-column>
            <el-table-column prop="feedResult" label="反馈结果" min-width="150" show-overflow-tooltip></el-table-column>
            
            <el-table-column prop="memo" label="备注" min-width="150" show-overflow-tooltip></el-table-column>
            <el-table-column prop="IsAuth" label="操作" min-width="120" align="center" fixed="right">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row)" type="primary" size="small">编辑</el-button>
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

        <!--注册弹窗-->
       <el-dialog title="添加咨询" :visible.sync="dialogTableVisible" size="" top="5%">
            <add style="width: 700px" @close="close" :editMes='editMes' v-if="dialogTableVisible"></add>
        </el-dialog>
        <!--编辑弹窗-->
        
        <el-dialog title="客户详情" :visible.sync="dialogView"  top="5%"  size="" :close-on-click-modal="false">
            <CustomerView :mes="cusMes" style="width: 1100px"  v-if="dialogView"></CustomerView>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import  "@/style/selfCommon.less"
    import Export from '@/components/export'
    import add from "./com/addComplaint.vue"
    import CustomerView from "@/page/FinanceManage/ReportManage/com/customerDetail.vue"
    import {UserRegister,GetDropDownPermission,GetComplaint,DeleteComplaint} from "@/api/myData"
    export default {
        // name:"MemberManage",
        data () {
            return {
                btnLoading:false,
                editMes:{},
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
                    complaintState:"",
                    name:"",
                    phone:"",
                    hospital:'',
                    keywords:"",
                    complaintState:'',
                    complaintType:'',
                },
                tableData:[],
                allData:[],
            }
        },
        computed: {
            /* 导出报表参数 tHeader,filterVal,tableData1*/
            tHeader(){
                return ['创建日期','客户', '性别', '年龄', '事由科室', '项目', '医生', '初诊日期','投诉方式','处理进度','原因分析','核实情况','处理结果','反馈结果','备注',]
            },
            filterVal(){
                return ['createOn', 'customerName', 'sex', 'age','deptName', 'projectName','doctorName','firstDate','complaintType','complaintState','anasDesc','verifReasons',
                'procResult','feedResult','memo']
            },
            tableData1(){
                let arr = JSON.parse(JSON.stringify(this.allData))
                arr.forEach(row=>{
                    row.sex = row.sex==1?'男':'女'
                    row.complaintType = this.getType(row.complaintType)
                    row.complaintState = this.getState(row.complaintState)
                })
                return arr
            },
            name(){
                return '客诉'
            },
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
            getState(state){
                switch(state){
                    case 0:return '待解决';
                    case 1:return '已解决';
                    case 2:return '未解决';
                }
            },
            getType(Type){
                switch(Type){
                    case 0:return '来电';
                    case 1:return '来访';
                    case 2:return '来信';
                    case 3:return '其他';
                }
            },
            exportAllData(){
                this.btnLoading = true
                this.GetComplaint({
                    keyWords:this.formInline.keywords.removeSP(),
                    startDate:this.formInline.date1,
                    enddate:this.formInline.date2,
                    pageIndex:this.currentPage,
                    pageSize:this.total,
                    complaintState:this.formInline.complaintState,
                    complaintType:this.formInline.complaintType
                },1)
            },
            edit(data){
                this.editMes = JSON.parse(JSON.stringify(data))
                this.dialogTableVisible = true
            },
            view(index,data){
                this.cusMes = data[index]
                this.dialogView = true
            },
            // 删除
            async DeleteComplaint(parmas){
                let res = await DeleteComplaint(parmas)
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
            async GetComplaint(params,ope){
                let res =await GetComplaint(params)
                this.loading = false
                this.btnLoading = false
                if(res.status){
                    if(ope){
                        this.allData = res.data
                            this.$refs.export.handleDownload()
                    }else{
                        this.total = res.count
                        this.tableData = res.data
                    }
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
                this.GetComplaint({
                    keyWords:this.formInline.keywords.removeSP(),
                    startDate:this.formInline.date1,
                    enddate:this.formInline.date2,
                    pageIndex:this.currentPage,
                    pageSize:this.size,
                    complaintState:this.formInline.complaintState,
                    complaintType:this.formInline.complaintType
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

            add(){
                this.editMes = {}
                this.dialogTableVisible = true
            },

            close(val){
                this.dialogTableVisible = false
                if(val){this.search()}
            },
            del(index,data){
                 this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.DeleteComplaint({
                        id:data[index].id
                    })
                })
            }
        },
        components: {
            Export,
            add,
            CustomerView
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
