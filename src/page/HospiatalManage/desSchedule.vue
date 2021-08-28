<template>
    <div class="MemberManage">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px" >
            <el-form-item label="日期：" class="form_item_mt10" v-if="serTypeCode!='005'&&serTypeCode!='002'">
                <el-date-picker
                    v-model="date"
                    type="daterange"
                    class="form_item_ipt220"
                    @change="dateChange"
                    placeholder="选择日期范围">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="日期：" class="form_item_mt10" v-else>
                <el-date-picker
                    v-model="date"
                    type="date"
                    @change="dateChange"
                    class="form_item_ipt220"
                    placeholder="选择日期范围">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="是否成交：" class="form_item_mt10">
                <el-select v-model="formInline.isDeal" class="form_item_ipt220">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="成交" value="1"></el-option>
                    <el-option label="未成交" value="0"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="就诊类型：" class="form_item_mt10">
                <el-select v-model="formInline.type" placeholder="请选择"  class="form_item_ipt220">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="初诊" value="1"></el-option>
                    <el-option label="复诊" value="2"></el-option>
                    <el-option label="复查" value="3"></el-option>
                    <el-option label="再消费" value="4"></el-option>
                    <el-option label="其他" value="5"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="就诊状态：" class="form_item_mt10">
                <el-select v-model="formInline.state" placeholder="请选择"  class="form_item_ipt220">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="未诊" value="0"></el-option>
                    <el-option label="已诊" value="1"></el-option>
                    <el-option label="作废" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="设计师：" class="form_item_mt10" v-if="serTypeCode!='005'&&serTypeCode!='002'">
                <el-input v-model="formInline.keyWords" class="form_item_ipt220"></el-input>
            </el-form-item>
            <el-form-item label=" " class="form_item_mt10">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
                <!-- <el-button type="primary" @click="setSchedule" class="searchBtn">排班</el-button> -->
                <Export :tHeader="tHeader" :filterVal=' filterVal' v-if="serTypeCode!='005'&&serTypeCode!='002'" :tableData1='tableData1' :name='name'></Export>
            </el-form-item>
        </el-form>
       <el-table :data="listData" border style="margin-top:15px;margin-bottom:10px;" height="460" v-loading="loading2" :row-class-name="tableRowClassName">
                    <el-table-column prop="schedulingDate" label="日期" width="80" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.schedulingDate">{{scope.row.schedulingDate.substring(0,10)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="hospitalName" label="医院" min-width="150"></el-table-column>
                    <el-table-column prop="designerName" label="设计师" min-width="100"></el-table-column>
                    <el-table-column prop="schedulingNo" label="号码" min-width="80" align="center"></el-table-column>
                    <el-table-column prop="customerName" label="客户姓名" min-width="100">
                        <template slot-scope="scope">
                            <el-button type="text" @click="view(scope.row)" :style="{color:scope.row.isBranch == 1?'black':'red'}">{{scope.row.customerName}}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="phoneNumber" label="手机号" min-width="100"></el-table-column>
                    <el-table-column prop="mobile" label="类型" min-width="100" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.typeId == 1">初诊</span>
                            <span v-if="scope.row.typeId == 2">复诊</span>
                            <span v-if="scope.row.typeId == 3">复查</span>
                            <span v-if="scope.row.typeId == 4">再消费</span>
                            <span v-if="scope.row.typeId == 5">其他</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="mobile" label="状态" min-width="100" align="center">
                        <template slot-scope="scope">
                            <el-tag type="warning" v-if="scope.row.state == 0">未诊</el-tag>
                            <el-tag type="success" v-if="scope.row.state == 1">已诊</el-tag>
                            <el-tag type="danger" v-if="scope.row.state == 2">作废</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="isDeal" label="是否成交" min-width="100" align="center">
                        <template slot-scope="scope">
                            <el-tag type="warning" v-if="scope.row.isDeal == 0">未成交</el-tag>
                            <el-tag type="success" v-if="scope.row.isDeal == 1">成交</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="projectName" label="咨询项目" min-width="100" show-overflow-tooltip></el-table-column>
                    <!-- 设计师及助理 -->
                    <el-table-column prop="phoneNumber" label="操作" min-width="120" align="center" v-if="serTypeCode=='005'||serTypeCode=='002'||typeCode=='01'">
                        <template slot-scope="scope">
                            <el-button type="primary" size="small" @click="addConsult(scope.row)">咨询单</el-button>
                            <el-button type="primary" size="small" @click="addReport(scope.row)">开单</el-button>
                            <el-button type="primary" size="small" :disabled="scope.row.state != 0"  @click="discard(scope.row)">作废</el-button>
                        </template>
                    </el-table-column>
                </el-table>
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
        <el-dialog title="客户详情" :visible.sync="dialogView"  top="5%"  size="" :close-on-click-modal="false">
            <CustomerView :mes="cusMes" style="width: 1100px"  v-if="dialogView"></CustomerView>
        </el-dialog>

        <el-dialog title="新增报单" :visible.sync="ispopAdd" top="5%" @close="ispopAdd=false" size="" :close-on-click-modal="false">
            <pop-add v-if="ispopAdd" @popAddClose='ispopAdd = false' style="width:1000px" :customerMes="customer"></pop-add>
        </el-dialog>

        <el-dialog title="咨询单" :visible.sync="dialogTableVisible" size="">
            <addConsult style="width: 650px" v-if="dialogTableVisible" @close="close" :customer="customer"></addConsult>
        </el-dialog>
    </div>
</template>
<script type="text/ecmascript-6">
    import  "@/style/selfCommon.less"
    import addConsult from "./com/addConsult.vue"
    import Export from '@/components/export'
    import { getCookie,getStore } from "@/config/mUtils"
    import PopAdd from '@/page/FinanceManage/ReportManage/com/addReport.vue'
    import {GetSchedulingDetail,GetDropDownPermission,CancelScheduling} from "@/api/myData"
    import CustomerView from "@/page/FinanceManage/ReportManage/com/customerDetail.vue"
    export default {
        data () {
            return {
                dialogTableVisible:false,
                ispopAdd:false,
                customer:{},
                dialogView:false,
                cusMes:{},
                typeCode:getStore("typeCode"),
                serviceManCode:getCookie("serviceManCode"),
                serTypeCode:getCookie("serTypeCode"),
                loading1:false,
                loading2:false,
                total:10,
                size:10,
                currentPage:1,
                date:'',
                formInline:{
                    hospitalCode:'',
                    date1:"",
                    date2:"",
                    type:'',
                    keyWords:'',
                    state:'0',
                    isDeal:'',
                    type:'',
                },
                hospitalList:[],
                listData:[],
                listAllData:[],
            }
        },
        computed: {
            /* 导出报表参数 tHeader,filterVal,tableData1*/
            tHeader(){
                return ['日期','医院','设计师', '号码', '客户姓名', '手机号', '类型','是否成交','咨询项目']
            },
            filterVal(){
                return ['schedulingDate','hospitalName','designerName', 'schedulingNo', 'customerName', 'phoneNumber','typeName','isDeal','projectName']
            },
            tableData1(){
                let data = JSON.parse(JSON.stringify(this.listAllData))
                data.forEach(row=>{
                    row.typeName = this.getType(row.typeId)
                    row.isDeal = row.isDeal == 0?"未成交":'成交'
                })
                return data
            },
            name(){
                return '设计师品排诊'
            },
            /*导出报表参数 tHeader,filterVal,tableData1*/
        },
        mounted(){
            if(this.typeCode == '01'){
                this.date = [new Date(),new Date()]
            }else{
                this.date = new Date()
            }
            this.getHospital()
        },
        methods:{
            discard(data){
                this.$confirm('确定作废?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.CancelScheduling(data.id)
                })
            },
            async CancelScheduling(id){
                let res = await CancelScheduling({id:id})
                if(res.status){
                    this.$message({message: '操作成功',type: 'success'});
                    this.search()
                }else{
                    this.$message.error('操作失败'+res.errorMessage);
                }
            },
            close(val){
              if(val){
                  this.search()
              }
              this.dialogTableVisible = false
            },
            addReport(data){
                this.customer = {//属性值大小写和客户详情页面快速开单保持一致
                    Code:data.customerCode,
                    MemberName:data.customerName,
                    designer:data.designerCode,
                    designerAssist:'',
                    hospitalCode:data.hospitalCode,
                    hospitalName:data.hospitalName,
                    concatId:data.id,
                }
                this.ispopAdd = true
            },

            addConsult(data){
                this.customer = {
                    customerCode : data.customerCode,
                    customerName : data.customerName,
                    designerCode : data.designerCode,
                    designerName : data.designerName,
                    concatId:data.id,
                    schedulingTypeId:data.typeId,
                }
                this.dialogTableVisible = true
            },
            
            view(data){
                this.cusMes = data
                this.dialogView = true
            },
            dateChange(val){
                
                if(val){
                    val = val.formatDates()
                    this.formInline.date1 = val.substring(0,10)
                    this.formInline.date2 = val.substring(13)
                }else{
                    this.formInline.date1 = ''
                    this.formInline.date2 = ''
                }
            },
            getType(type){
                switch(type){
                    case 1:return '初诊';break;
                    case 2:return '复诊';break;
                    case 3:return '复查';break;
                    case 4:return '再消费';break;
                    case 3:return '其他';break;
                }
            },
            tableRowClassName(row, index) {
                if (row.state === 1) {
                return 'complete';
                } else if (row.state === 3) {
                return 'wait';
                }
                return '';
            },
         
            async getHospital(){
                let hospital = await GetDropDownPermission({typeId: 1})
                this.hospitalList = hospital.data
                this.formInline.hospitalCode = hospital.data[0].code
                this.search()
            },
          
            getPage(){//分页处理
                this.listData = this.listAllData.slice((this.currentPage-1)*this.size,this.currentPage*this.size)
            },
            
            onSubmit(){
                this.currentPage = 1
                this.search()
            },

            search(){
                let isDesigner = this.serTypeCode=='002'?true:false
                this.getData({
                    'StartDate':this.formInline.date1,
                    'EndDate':isDesigner?this.formInline.date1:this.formInline.date2,
                    'HospitalCode':this.formInline.hospitalCode,
                    "DesignerCode":isDesigner?this.serviceManCode:'',
                    'state':this.formInline.state,
                    'hospitalCode':getCookie("hospitalCode"),
                    'keyWords':this.formInline.keyWords,
                    'isDeal':this.formInline.isDeal,
                    'typeId':this.formInline.type
                })
            },

            async getData(params){
                let res = await GetSchedulingDetail(params)
                this.total = res.count
                this.listAllData = res.data
                this.loading2 = false
                this.getPage()
            },

            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.size = val
                this.getPage()
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val
                this.getPage()
            },
           
        },
        components: {
            Export,CustomerView,PopAdd,addConsult,
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.div{
    display:flex;
    justify-content: center;
    align-items: center
}
</style>
