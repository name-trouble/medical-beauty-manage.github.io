<template>
    <div class="MemberManage">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px" >
            <el-form-item label="日期：" class="form_item_mt10">
                <el-date-picker
                    v-model="date"
                    type="date"
                    class="form_item_ipt220"
                    placeholder="选择日期范围">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="医院：" class="form_item_mt10">
                <el-select v-model="formInline.hospital" placeholder="请选择" @change="hosCHange"  class="form_item_ipt220">
                    <el-option v-for="item in hospitalList" :label="item.supplierName" :value="item.code?item.code+'|'+item.supplierName:''" :key="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label=" " class="form_item_mt10">
                <el-button type="primary" @click="search" class="searchBtn">查询</el-button>
                <el-button type="primary" @click="setSchedule" class="searchBtn">排班</el-button>
                <Export :tHeader="tHeader" :filterVal=' filterVal' :tableData1='tableData1' :name='name'></Export>
            </el-form-item>
            <el-form-item label='' class="form_item_mt10" label-width="0px">
                <span style="margin-left:10px">总人数：{{sumData.total}}</span><span style="margin-left:20px">已诊人数：{{sumData.diagnosisCount}}</span>
            </el-form-item>
        </el-form>
        <el-row :gutter="24">
            <el-col :span="10">
                <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" height="460" v-loading="loading1" @row-click="rowClick">
                    <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
                    <el-table-column prop="designerName" label="设计师" min-width="100" align="center"></el-table-column>
                    <el-table-column prop="unDiagnosisCount" label="未诊人数" min-width="100" align="center"></el-table-column>
                    <el-table-column prop="diagnosisCount" label="已诊人数" min-width="100" align="center"></el-table-column>
                    <el-table-column prop="IsAuth" label="操作" min-width="100" align="center">
                        <template slot-scope="scope">
                            <el-button @click.stop="getNumber(scope.row)" type="primary" size="small">取号</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>

            <el-col :span="14">
                <el-table :data="listData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" height="460" v-loading="loading2" :row-class-name="tableRowClassName">
                    <el-table-column prop="schedulingNo" label="号码" width="80" align="center"></el-table-column>
                    <el-table-column prop="customerName" label="客户姓名" min-width="100"></el-table-column>
                    <el-table-column prop="mobile" label="就诊类型" min-width="100">
                        <template slot-scope="scope">
                            <span v-if="scope.row.typeId == 1">初诊</span>
                            <span v-if="scope.row.typeId == 2">复诊</span>
                            <span v-if="scope.row.typeId == 3">复查</span>
                            <span v-if="scope.row.typeId == 4">再消费</span>
                            <span v-if="scope.row.typeId == 5">其他</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="phoneNumber" label="手机号" min-width="100"></el-table-column>
                    <el-table-column prop="designerName" label="设计师" min-width="100"></el-table-column>
                    <el-table-column prop="createOn" label="取号时间" min-width="100" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.createOn">{{scope.row.createOn.substring(10)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="state" label="号码状态" min-width="100">
                        <template slot-scope="scope">
                            <el-tag type="warning" v-if="scope.row.state == 0">未诊</el-tag>
                            <el-tag type="success" v-if="scope.row.state == 1">已诊</el-tag>
                            <el-tag type="danger" v-if="scope.row.state == 2">作废</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="IsAuth" label="操作" min-width="100" align="center">
                        <template slot-scope="scope">
                            <el-button @click="transform(scope.row)" :disabled="scope.row.state == 2||scope.row.state == 1" type="primary" size="small">换号</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>

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

        <el-dialog title="取号" :visible.sync="dialogVisible"  top="20%"  size="" :close-on-click-modal="false">
            <el-form :model="formInline" :rules="rules" ref="form" class="demo-form-inline" label-width="90px" style="width:400px">
                <el-form-item label="排诊类型：" prop="type" class="form_item_mt10">
                     <el-radio-group v-model="formInline.type">
                        <el-radio :label="1">初诊</el-radio>
                        <el-radio :label="2">复诊</el-radio>
                        <el-radio :label="3">复查</el-radio>
                        <el-radio :label="4">再消费</el-radio>
                        <el-radio :label="5">其他</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="客户：" prop="customerCode" class="form_item_mt10">
                    <el-autocomplete v-model="formInline.customer" :fetch-suggestions="queryCus" placeholder="请输入内容" style="width:200px"
                                 :trigger-on-focus="false" @select="selectCus">
                        <template v-slot="{item}">
                            <my-item-conMember :item="item"></my-item-conMember>
                        </template>
                    </el-autocomplete>
                </el-form-item>
                <el-form-item label="" prop="phone" label-width="20px" class="form_item_mt10">
                    <span v-if="registerShow" style="color:red">当前手机号码还未注册会员，请先去注册！</span>
                </el-form-item>
                <el-form-item label="" class="form_item_mt10" style="text-align:center" label-width="0px">
                    <el-button type="primary" @click="addNum('form')" class="searchBtn">确定</el-button>
                    <el-button @click="register" >注册</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="换号" :visible.sync="dialogVisibleDes"  top="20%"  size="" :close-on-click-modal="false" max-height="460">
            <el-table :data="designerList" border style="width: 500px;" height="460" >
                    <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
                    <el-table-column prop="designerName" label="设计师" min-width="100" align="center"></el-table-column>
                    <el-table-column prop="unDiagnosisCount" label="未诊人数" min-width="100" align="center"></el-table-column>
                    <el-table-column prop="diagnosisCount" label="已诊人数" min-width="100" align="center"></el-table-column>
                    <el-table-column prop="IsAuth" label="操作" min-width="100" align="center">
                        <template slot-scope="scope">
                            <el-button @click="transFormgNum(scope.row)" type="primary" size="small">取号</el-button>
                        </template>
                    </el-table-column>
                </el-table>
        </el-dialog>
        <el-dialog title="【昕美昕医疗美容】排队凭证" :visible.sync="dialogPrint"  top="20%"  size="" :close-on-click-modal="false">
            <div style="width:320rpx;">
                <div class="column">
                    <div class="col_label">您选择的设计师：</div>
                    <div class="col_text">{{printMes.designerName}}</div>
                </div>
                <div class="column">
                    <div class="col_label">您的排队号码：</div>
                    <div class="col_text">{{printMes.schedulingNo}}</div>
                </div>
                <div class="column">
                    <div class="col_label">姓名：</div>
                    <div class="col_text">{{printMes.customerName}}</div>
                </div>
                <div class="listMes">
                    还有：{{printMes.schedulingCount}} 人未就诊，请到等候区等待呼叫
                </div>
                <div class="listDate">
                    {{formInline.creatOnDate}}
                </div>
                <div class="exeInstall" v-if="!isInstall">
                    <font color='#FF00FF'>
                        打印控件未安装!点击这里
                        <a :href="webSiteBaseURL+'/print/lodop/CLodop_Setup_for_Win32NT.exe'" target='_self'>执行安装</a>,
                        安装后请刷新页面或重新进入。
                    </font>
                </div>
                <div style="text-align:center;margin-top:20px">
                    <el-button @click="print" type="primary">打印</el-button>
                </div>
            </div>
        </el-dialog>
        <el-dialog title="会员注册" :visible.sync="dialogRegister" size="" :close-on-click-modal="false" top="5%">
            <register style="width: 500px" @close="close" v-if="dialogRegister"></register>
        </el-dialog>
        <el-dialog :title="month" :visible.sync="dialogSchedule" size="" :close-on-click-modal="false" top="5%">
            <el-table :data="scheduleData" border style="width:600px;margin-bottom:10px;" max-height="600" class="min_table smt">
                <el-table-column type="index" label="序号" min-width="150" align="center"></el-table-column>
                <el-table-column prop="designerName" label="设计师" min-width="100" show-overflow-tooltip  align="center"></el-table-column>
                <el-table-column prop="designerName" :label="day" min-width="100" align="center">
                    <template slot-scope="scope">
                        <span :style="{color:scope.row.isStay==1?'green':'red'}" v-text="scope.row.isStay==1?'在岗':'休息'"></span>
                    </template>
                </el-table-column>

                <el-table-column prop="CommandState" label="操作" min-width="100" align="center">
                    <template slot-scope="scope">
                        <el-button @click="showSedule(scope.row)" type="primary" size="small" >查看当月排班</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <el-dialog title="排班设置" :visible.sync="dialogSetSchedule" size="" :close-on-click-modal="false" top="10%">
            <div class="dayContainer" :loading="scheduleLoading">
                <div class="schedule" v-for="item in week" :key="item" >{{item}}</div>
                <div @click="desSetSchedule(item,index,item.isStay)" class="schedule" v-for="(item,index) in dayList"
                :key="item.day" :style="{'margin-left':index==0?getdate*60+'px':'0px',color:item.isStay==0?'red':'green',background:item.isStay==0?'#ecb2b2':'#94cc94'}">
                    <div>{{item.day+'日'}}</div>
                    <div v-text="item.isStay==0?'休息':'在岗'"></div>
                </div>
            </div>
            <div style="text-align:center">
                <el-button type="primary"  @click="addScheduleSure">确定</el-button>
                <el-button @click="dialogSetSchedule = false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script type="text/ecmascript-6">
    import  "@/style/selfCommon.less"
    import {getLodop,needCLodop} from '@/config/LodopFuncs'
    let LODOP
    import { baseImgPath } from '@/config/env'
    import { getCookie } from "@/config/mUtils"
    import register from "@/page/MemberCenter/components/register.vue"
    import scheduleModule from "./com/scheduleModule.vue"
    import Export from '@/components/export'
    import {GetUserAllByKeywords,GetDesignerOnDuty, AddScheduling, ChangeScheduling,GetDropDownPermission,GetSchedulingDetail,
    GetDesignerRest,GetDesignerRestDetail,AddDesignerRest} from "@/api/myData"
    import Vue from "vue";
    Vue.component('my-item-conMember', {
        functional: true,
        render: function (h, ctx) {
            var item = ctx.props.item;
            return h('div', ctx.data, [
                h('p', {attrs: {class: 'select_name' + item.Type, title: item.name}}, ['名字：' + item.name]),
                h('p', {attrs: {class: 'select_name' + item.Type, title: item.name}}, ['编号：' + item.code]),
                h('p', {attrs: {class: 'select_name' + item.Type, title: item.name}}, ['手机号：' + item.phone]),
                h('p', {attrs: {class: 'select_name' + item.Type, title: item.name}}, ['卡号：' + item.cardNO]),
            ]);
        },
        props: {
            item: {type: Object, required: true}
        }
    });
    export default {
        data () {
            return {
                webSiteBaseURL:document.location.protocol + "//" + document.location.hostname + ((80 == document.location.port || "" == document.location.port) ? "" : ":" + document.location.port) + "/", // document.location.hostname; // 直接获取IIS站点名称,
                dialogSetSchedule:false,
                scheduleData:[{}],
                scheduleLoading:false,

                dialogSchedule:false,

                dialogRegister:false,

                loading1:false,
                loading2:false,

                dialogPrint:false,
                checkList:[],
                loading:false,
                total:10,
                size:10,
                currentPage:1,
                date:new Date(),

                formInline:{
                    hospital:'',
                    hospitalCode:'',
                    hospitalName:'',
                    date1:"",
                    date2:"",
                    customer:'',
                    customerName:'',
                    customerCode:'',
                    phone:'',
                    type:'',
                    creatOnDate:'',
                },
                sumData:{
                    total:0,
                    diagnosisCount:0,
                },
                printMes:{},
                hospitalList:[],
                tableData:[],
                designerList:[],
                listData:[],
                listAllData:[],
                dialogVisible:false,
                dialogVisibleDes:false,
                customerList:[],
                registerShow:false,
                month:new Date().getMonth()+1+'月份排班',
                rules: {
                    customerCode: [{required: true, message: "请选择客户", trigger: "change"}],
                    phone: [{required: true, message: "请填写手机号", trigger: "blur"}],
                    type:[{required: true,type:'number', message: "请选择类型", trigger: "change"}],
                },
                selectDesigner:{},
                transfomMes:{},
                dayList:[],
                day:new Date().getDate()+'日',
                getdate:'',
                week:["日", "一", "二", "三", "四", "五", "六"],
                isInstall:true,
            }
        },
        computed: {
            /* 导出报表参数 tHeader,filterVal,tableData1*/
            tHeader(){
                return ['号码','客户', '就诊类型', '设计师', '取号时间', '号码状态']
            },
            filterVal(){
                return ['schedulingNo','customerName','typeId','designerName','createOn','state']
            },
            tableData1(){
                let data = JSON.parse(JSON.stringify(this.listAllData))
                data.forEach(row => {
                    row.typeId = this.getType(row.typeId)
                    row.state = this.getState(row.state)
                });
                return data
            },
            name(){
                return this.date.formatDate("yyyy-MM-dd")+' 排诊表'
            },
            /*导出报表参数 tHeader,filterVal,tableData1*/
        },
        mounted(){
            let date = new Date()
            date.setDate(15)
            this.getdate = date.getDay();
            this.mGetDate()
            this.getHospital()
        },
        methods:{
            getState(state){
                switch(state){
                    case 0:return '未诊';
                    case 1:return '已诊';
                    case 2:return '作废';
                }
            },
            getType(type){
                switch(type){
                    case 1:return '初诊';
                    case 2:return '复诊';
                    case 3:return '复查';
                    case 4:return '再消费';
                    case 5:return '其他';
                }
            },
            print() {	//LODOP打印
            let isneed = getLodop();
            this.isInstall = isneed == 0?false:true
                if(isneed!=0){
                    LODOP=getLodop();
                    LODOP.PRINT_INITA(0,0,522,333,"排队打印");
                    LODOP.SET_PRINT_PAGESIZE(0,550,840,"A4");
                    this.AddPrintContent();
                    LODOP.PREVIEW();
                }else{

                }
            },
            AddPrintContent() {
                LODOP=getLodop();
                LODOP.ADD_PRINT_TEXT(15,0,500,25,"波士邦医疗美容排队凭证");
                LODOP.SET_PRINT_STYLEA(2,"FontName","隶书");
                LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
                LODOP.SET_PRINT_STYLEA(2,"FontColor",0);
                LODOP.ADD_PRINT_TEXT(70,0,120,20,"您选择的设计师：");
                LODOP.ADD_PRINT_TEXT(70,120,50,20,this.printMes.designerName);
                // LODOP.SET_PRINT_STYLEA(0,"Alignment",3)//右对齐

                LODOP.ADD_PRINT_TEXT(95,0,200,20,"您的排队号码：");
                LODOP.ADD_PRINT_TEXT(120,0,200,20,this.printMes.schedulingNo);
                LODOP.SET_PRINT_STYLEA(0,"Alignment",2)
                LODOP.SET_PRINT_STYLEA(0,"FontSize",12);

                LODOP.ADD_PRINT_TEXT(145,0,120,20,"姓名：");
                LODOP.ADD_PRINT_TEXT(145,120,50,20,this.printMes.customerName);
                // LODOP.SET_PRINT_STYLEA(0,"Alignment",3)

                LODOP.ADD_PRINT_TEXT(170,0,200,20,"还有："+this.printMes.schedulingCount+" 人未就诊");
                LODOP.ADD_PRINT_TEXT(195,0,200,20,"请到等候区等待呼叫");
                LODOP.ADD_PRINT_TEXT(220,0,300,20,new Date().formatDate("yyyy-MM-dd hh:mm:ss"));
                LODOP.ADD_PRINT_TEXT(265,0,200,20,"过期过号请重新取号！");
            },
            // print(){
            //     let url =  document.location.protocol +"//" + document.location.hostname +(80 == document.location.port || "" == document.location.port ? "": ":" + document.location.port) +"/";
            //     let newWin = window.open(url + "print/printSchedule.html?designer=" + this.printMes.designerName + "&schedulingCount="
            //     + this.printMes.schedulingCount+'&customer='+this.printMes.customerName+'&scheduleNum='+this.printMes.schedulingNo);
            // },
            tableRowClassName(row, index) {
                if (row.state === 1) {
                    return 'complete';
                } else if (row.state === 3) {
                    return 'wait';
                }
                return '';
            },
            async addScheduleSure(){
                let arr= [],_this = this
                this.dayList.forEach(row=>{
                    if(row.isStay == 1){
                        arr.push({
                            dutyDate:row.date,
                            hospitalCode:_this.selectDesigner.hospitalCode,
                            hospitalName:_this.selectDesigner.hospitalName,
                            designerName:_this.selectDesigner.designerName,
                            designerCode:_this.selectDesigner.designerCode,
                            createUserId:getCookie("userId"),
                            createBy:getCookie("userName")
                        })
                    }
                })
                let res = await AddDesignerRest({
                    "jsonStr": JSON.stringify(arr),
                    "code": this.selectDesigner.designerCode
                })
                if(res.status){
                    this.dialogSetSchedule = false
                    this.GetDesignerRest()//刷新数据
                }
                this.response(res,'排班设置',false)
            },
            desSetSchedule(data,index,status){
                if(data.day>=new Date().getDate()){
                    this.dayList[index].isStay = status==0?1:0
                }

            },
            mGetDate(){
                var date = new Date();
                var year = date.getFullYear();
                var month = date.getMonth()+1;
                var d = new Date(year, month, 0);
                let day = d.getDate();
                for(let i = 1;i<=day;i++){
                    let dayString = i<10?"0"+i:i
                    this.dayList.push({
                        day:i,
                        date:d.formatDate("yyyy-MM-dd").substring(0,8)+dayString,
                        isStay:0,
                    })
                }
            },
            async showSedule(data){
                this.scheduleLoading = true
                this.selectDesigner  = data
                this.dialogSetSchedule = true
                let res = await GetDesignerRestDetail({
                    HospitalCode:data.hospitalCode,
                    DesignerCode:data.designerCode
                })
                let arr = []
                res.data.forEach(row=>{
                    let day = Number(row.dutyDate.substring(8,10))
                    arr.push(day)
                })
                this.dayList.forEach(ele=>{

                    if(arr.indexOf(ele.day)>=0){
                        ele.isStay = 1
                    }else{
                        ele.isStay = 0
                    }
                })
                this.scheduleLoading = false
            },
            setSchedule(){

                this.dialogSchedule = true
                this.GetDesignerRest()
            },
            async GetDesignerRest(){
                let res = await GetDesignerRest({
                    HospitalCode:this.formInline.hospitalCode,
                })
                this.scheduleData = res.data
            },

            close(val){
                this.dialogRegister = false
            },
            register(){
                this.dialogRegister = true
            },
            async getHospital(){
                let hospital = await GetDropDownPermission({typeId: 1})
                this.hospitalList = hospital.data
                this.formInline.hospitalCode = hospital.data[0].code
                this.search('')
            },
            async GetDesignerOnDuty(params,ope){
                if(!ope){
                    this.loading1 = true
                }
                let res = await GetDesignerOnDuty(params)
                this.tableData = res.data.sort(function(x,y){//未诊数量排序，从小大到大
                    return x.unDiagnosisCount-y.unDiagnosisCount
                })
                this.sumData = {
                    total:0,
                    diagnosisCount:0,
                }
                res.data.forEach(row=>{//计算当日就诊总数
                    this.sumData.total+=row.diagnosisCount+row.unDiagnosisCount
                    this.sumData.diagnosisCount+=row.diagnosisCount
                })
                this.loading1 = false
            },
            async GetSchedulingDetail(params,ope){
                if(!ope){
                    this.loading2 = true
                }
                let res = await GetSchedulingDetail(params)
                // this.listData = res.data
                this.total = res.count
                this.listAllData = res.data
                this.loading2 = false
                this.getPage()
            },
            getPage(){//分页处理
                this.listData = this.listAllData.slice((this.currentPage-1)*this.size,this.currentPage*this.size)
            },
            async transFormgNum(data){
                let res = await ChangeScheduling({
                    "id": this.transfomMes.id,
                    "schedulingDate": new Date().formatDate("yyyy-MM-dd hh:mm:ss"),
                    "deptCode": "",
                    "deptName": "",
                    "hospitalCode": data.hospitalCode,
                    "hospitalName": data.hospitalName,
                    "designerCode": data.designerCode,
                    "designerName": data.designerName,
                    "customerCode": this.transfomMes.customerCode,
                    "customerName": this.transfomMes.customerName,
                    'phoneNumber':this.transfomMes.phoneNumber,
                    'typeId':this.transfomMes.typeId,
                    "state": 0,
                    "createUserId": getCookie("userId"),
                    "createBy": getCookie("userName"),
                })
                if(res.status){
                    this.printMes = res.data
                }
                this.response(res,'换号',true)
            },

            transform(data){
                this.designerList = this.tableData;
                this.designerList.push()
                this.transfomMes = data
                this.dialogVisibleDes = true
            },
            hosCHange(val){
                if(val){
                    this.formInline.hospitalCode = val.split("|")[0]
                    this.formInline.hospitalName = val.split("|")[1]
                }else{
                    this.formInline.hospitalCode = ''
                    this.formInline.hospitalName = ''
                }
            },

            onSubmit(){
                this.currentPage = 1
                this.search('')
            },
            search(ope){
                this.GetDesignerOnDuty({
                    'SchedulingDate':this.date.formatDate("yyyy-MM-dd"),
                    'HospitalCode':this.formInline.hospitalCode,
                },ope)

                this.GetSchedulingDetail({
                    'startDate':this.date.formatDate("yyyy-MM-dd"),
                    'endDate':this.date.formatDate("yyyy-MM-dd"),
                    'HospitalCode':this.formInline.hospitalCode,
                    "DesignerCode":'',
                    'state':'',
                    'isDeal':'',
                    'typeId':'',
                },ope)
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
            getNumber(data){
                this.selectDesigner = data
                this.formInline.customerName = ''
                this.formInline.customerCode = ''
                this.formInline.phone = ''
                this.formInline.type = ''
                this.formInline.customer = ''
                this.dialogVisible = true
                this.$nextTick(()=>{
                    this.$refs.form.resetFields();
                })
            },
            addNum(formName){
                let _this = this
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        _this.AddScheduling({
                            "schedulingDate": new Date().formatDate("yyyy-MM-dd hh:mm:ss"),
                            "deptCode": "",
                            "deptName": "",
                            "hospitalCode": _this.selectDesigner.hospitalCode,
                            "hospitalName": _this.selectDesigner.hospitalName,
                            'designerName':_this.selectDesigner.designerName,
                            'designerCode':_this.selectDesigner.designerCode,
                            "customerCode": _this.formInline.customerCode,
                            "customerName": _this.formInline.customerName,
                            'phoneNumber':_this.formInline.phone,
                            'typeId':_this.formInline.type,
                            "state": 0,
                            "createUserId": getCookie("userId"),
                            "createBy": getCookie("userName"),
                        })
                    } else {
                        return false;
                    }
                });
            },
            async AddScheduling(params){
                let res = await AddScheduling(params)
                if(res.status){
                    this.printMes = res.data
                }
                this.response(res,'取号',true)
            },
            response(res,ope,closeDialog){
                if(res.status){
                    this.$message({message: ope+'成功',type: 'success'});
                    this.search('loadingFalse')//添加或者换号后刷新数据，去掉loading效果
                    if(closeDialog){
                        this.formInline.creatOnDate = new Date().formatDate("yyyy-MM-dd hh:mm:ss")
                        this.dialogPrint = true
                        this.dialogVisible =false
                        this.dialogVisibleDes = false
                    }
                }else{
                    this.$message.error(ope+'失败'+res.errorMessage);
                }
            },
            //查找会员 下拉补全
            async queryCus(queryString, cb) {
                // queryString=enCode(queryString)
                this.customerList = []
                if (queryString !== '' && queryString != undefined) {
                    let res = await GetUserAllByKeywords({'keywords': queryString.removeSP()})
                    this.getMember(res)
                }
                this.formInline.customerName = ''
                this.formInline.customerCode = ''
                let _this = this
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    cb(_this.customerList);
                }, 100);
            },
            getMember(res){
                // let res = await GetUserAllByKeywords({'keywords': str.removeSP()})
                if (res instanceof Array && res.length > 0) {
                    for (let item of res) {
                        this.customerList.push({
                            value: item["MemberName"],
                            phone: item["PhoneNumber"],
                            code: item["Code"],
                            name: item["MemberName"],
                            referrerCode: item['ReferrerCode'],
                            referrerName: item['ReferrerName'],
                            Type: item.Type == 1 ? "black" : "red",
                            cardNO: item["CardNO"] ? item["CardNO"] : ""
                        })
                    }
                }
                if(this.formInline.customer!=''&&this.customerList.length==0){
                    this.registerShow = true
                }else this.registerShow = false
            },
            //点击获取 会员信息  Oject
            selectCus(item) {
                this.formInline.customerName = item.name
                this.formInline.customerCode = item.code
                this.formInline.phone = item.phone
            },
            rowClick(row, event, column){
                this.GetSchedulingDetail({
                    'startDate':this.date.formatDate("yyyy-MM-dd"),
                    'endDate':this.date.formatDate("yyyy-MM-dd"),
                    'HospitalCode':row.hospitalCode,
                    "DesignerCode":row.designerCode,
                    'state':'',
                    'isDeal':'',
                    'typeId':'',
                })
            }
        },
        components: {
            Export,
            register,scheduleModule
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.column{
    display: flex;
    font-size: 14px;
    line-height: 32px;
    .col_text{
        text-align: right;
        flex: 1;
    }
}
.lisMes,.listDate{
        line-height: 24px;
    }
    .dayContainer{
        width: 450px;
        display: flex;
        flex-flow: row wrap;
        text-align: center;
        .schedule{
            padding-top: 10px;
            box-sizing: border-box;
            cursor: pointer;
            width: 60px;
            height: 60px;
            line-height: 20px;
        }
        .schedule.green{
            color: green;
        }
        .schedule.green{
            color: red;
        }
    }
    .el-table .complete{
        color: #999;
    }
    .el-table .wait{
        // color: #999;
    }
</style>
