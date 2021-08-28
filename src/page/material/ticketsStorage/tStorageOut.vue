<template>
    <div class="tag selCommon">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px">
            <el-form-item label="出库日期：" class="form_item_mt10">
                <el-date-picker
                    v-model="date"
                    style="width: 200px;"
                    type="daterange"
                    @change="dateChange"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="出库编号：" class="form_item_mt10">
                <el-input v-model="formInline.keywords" placeholder="请输入" style="width: 200px;" v-on:keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            <el-form-item label="医院：" class="form_item_mt10" >
                <el-select v-model="formInline.hospitalCode"  style='width:200px;' @change="selHos">
                    <el-option v-for="(item,index) in hospitalList" :key="index" :label="item.supplierName" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <!-- <el-form-item label="仓库：" class="form_item_mt10">
                <el-select v-model="formInline.warehouseId" style='width:200px;'>
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="(item,index) in whList" :key="index" :label="item.warehouseName" :value="item.id"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="出库类别：" class="form_item_mt10">
                <el-select v-model="formInline.outType"  style='width:200px;'>
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="(item,index) in typeList" :key="index" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label=" " class="form_item_mt10">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
                <el-button type="primary" class="searchBtn" @click="addTag('添加出库')">添加出库</el-button>
                <el-button type="primary" class="searchBtn" @click="exportTbale">导出报表</el-button>
                <Export :tHeader="tHeader" ref="exportTable" :filterVal=' filterVal' :tableData1='tableData1' :name='name' style="display:none"></Export>
            </el-form-item>
        </el-form>
        <!-- 信息表 -->
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" max-height="560" class="smt min_table" v-loading="loading" :row-class-name="tableRowClassName">
            <el-table-column prop="ticketOutCode" label="出库编号" min-width="90"></el-table-column>
            <el-table-column prop="ticketOutDate" label="出库日期" min-width="90">
                <template slot-scope="scope">
                    <span v-if="scope.row.ticketOutDate">{{scope.row.ticketOutDate.substring(0,10)}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="hospitalName" label="医院" min-width="120"></el-table-column>
            <el-table-column prop="ticketOutType" label="出库类别" min-width="90"></el-table-column>
            <el-table-column prop="warehouseName" label="出库仓库" min-width="90"></el-table-column>
            <el-table-column prop="ticketOutQuantity" label="出库数量" min-width="90"></el-table-column>
            <el-table-column prop="ticketOutAmount" label="出库金额" min-width="90"></el-table-column>
            <el-table-column prop="customerName" label="领用人" min-width="90"></el-table-column>
            <el-table-column prop="createBy" label="支付状态" min-width="90">
                 <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.isPayOff">已付清</el-tag>
                    <el-tag type="danger" v-else>未付清</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="createBy" label="填制人" min-width="90"></el-table-column>
            <el-table-column prop="memo" label="备注" min-width="90" show-overflow-tooltip></el-table-column>
            <el-table-column prop="status" label="操作" width="250" align="center">
                <template slot-scope="scope">
                    <el-button @click="pay(scope.row,'查看')" type="primary" size="small" style="margin-left:0">查看</el-button>
                    <el-button @click="addTag('编辑出库',scope.$index,tableData)" type="primary" size="small" style="margin-left:0" :disabled="scope.row.isPayOff==1">编辑</el-button>
                    <el-button @click="deleteRow(scope.$index,tableData)" type="primary" size="small" style="margin-left:0">删除</el-button>
                    <el-button @click="pay(scope.row,'支付')" type="primary" size="small" style="margin-left:0">支付</el-button>
                    <el-button @click="print(scope.row)" type="primary" size="small" style="margin-left:0">打印</el-button>
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

        <el-dialog :title="title" :visible.sync="dialogOut" size="">
            <add v-if="dialogOut" style="width:1000px" @openScan="openScan" ref="addS" @openapply='openapply'  @addClose="addClose" :editMes="editMes" @viewTicket="viewTicket"></add>
        </el-dialog>
        <el-dialog :title="title" :visible.sync="payDialog" :modal="true" top="12%" size="">
            <payDialog :mes="mes" :view='view' @viewTicket='viewTicket'  @popAddClose="popAddClose" v-if="payDialog" style="width:750px"></payDialog>
        </el-dialog>

         <el-dialog title="选择申请人" :visible.sync="popUser" size="" top="10%" :close-on-click-modal='false'>
            <pop-user @onFinish="finish" style="width:850px"></pop-user>
        </el-dialog>

        <el-dialog title="扫描券号" :visible.sync="ticketsInfo" size="" top="10%" :close-on-click-modal='false'>
            <scan v-if="ticketsInfo" @scanTick="scanTick" style="width:600px;max-height:1000px;" ref="scanDialog"></scan>
        </el-dialog>

        <el-dialog title="查看券号" :visible.sync="viewDialog" size="" top="10%" :close-on-click-modal='false'>
            <viewDialog v-if="viewDialog" style="width:1000px;" @scanTick="scanTick" class="viewDialog" :viewData="viewData" @changeCodeArr='changeCodeArr' :ope="ope"></viewDialog>
        </el-dialog>
        
    </div>
</template>

<script type="text/ecmascript-6">
    import {baseImgPath} from "@/config/env"
    import  "@/style/selfCommon.less"
    import { getCookie, delCookie } from '@/config/mUtils'
    import add from "./com/storageOut"
    import payDialog from "./com/payDialog.vue"
    import popUser from './com/selectUser'
    import scan from './com/scan.vue'
    import viewDialog from './com/view'
    import {GetTicketOut,DeleteStockTicketOutById,GetDropDownPermission,GetDeptAllByHospitalCode,GetWarehouse} from "@/api/myData"
    import Export from '@/components/export'
    export default {
        // name: "VideoManage",
        data () {
            return {
                ticketsInfo:false,
                popUser:false,
                view:true,
                mes:{},
                payDialog:false,
                typeList:['调拨出库','套餐发放','日常销售','赠送出库','销毁报废','其他出库','退货出库'],
                date:"",
                editMes:{},
                isDrug:false,
                saveLoading:false,
                loading:false,
                title:"",
                dialogOut:false,
                total:0,
                size:10,
                currentPage:1,
                formInline: {
                    warehouseId:"",
                    startDate:"",
                    endDate:"",
                    dept:"",
                    keywords: '',
                    typeCode:'',
                    hospitalCode:"",
                    outType:"",
                },
                allDept:[],
                deptList:[],
                tableData:[],
                hospitalList:[],
                supplierList:[],
                searchMes:{},
                whList:[],
                allData:[],
                viewDialog:false,//查看券号弹窗
                viewData:[],//查看卡券数据
                ope:false,//查看券号编辑确认标志位
            }
        },
        computed: {
            /* 导出报表参数 tHeader,filterVal,tableData1*/
            tHeader(){
                return ['封面', '主题', '发布人', '标签', '视频大小', '发布时间', '浏览人次', '平均浏览时长', '分享','销售额',"商品提成"]
            },
            filterVal(){
                return ['picture', 'title', 'userName', 'tab', 'videoSize','createDate','views','grade','grade','ReferrerName']
            },
            tableData1(){
                return this.allData
            },
            name(){
                return '卡券出库'
            },
            /*导出报表参数 tHeader,filterVal,tableData1*/
        },
        mounted(){
            this.date = [new Date(),new Date()]
            this.GetDropDownPermission()
        },
        methods:{
            tableRowClassName(row, index) {
                
                if (row.ticketOutType == '退货出库') {
                    return 'warning-row';
                } else {
                    return 'positive-row';
                }
            },
            viewTicket(val,ope){
                this.ope = ope
                this.viewData = val
                this.viewDialog = true
            },
            changeCodeArr(data){//修改卡券
                if(data){
                    this.$refs.addS.makeMixCode(data)
                }
                this.viewData = []
                this.viewDialog = false
            },
            print(data){
                let url = document.location.protocol + "//" + document.location.hostname + ((80 == document.location.port || "" == document.location.port) ? "" : ":" + document.location.port) + "/"
                let newWin = window.open(url+'print/printTicketOut.html?id='+data.id)
            },
            exportTbale(){
                this.GetTicketOut({
                    pageIndex:this.currentPage,
                    pageSize:this.total,
                    "hospitalCode": this.formInline.hospitalCode,
                    "startDate": this.formInline.startDate,
                    "endDate": this.formInline.endDate,
                    "ticketOutType": this.formInline.outType,
                    keywords:this.formInline.keywords.removeSP()
                },'export')
            },
            openScan(val){
                this.ticketsInfo = true
                this.$nextTick(()=>{
                    this.$refs.scanDialog.viewData(val)
                })
            },
            scanTick(ope,data){
                this.$refs.addS.scan(data)
                this.ticketsInfo = false
            },
            openapply(){
                this.popUser = true
            },
            finish(data, state) {
                this.popUser = false
                this.$refs.addS.setApply(data)
                // if (state === 1) {
                    // this.ruleForm.realName = data.name
                    // this.ruleForm.branchCode = data.code
                    // this.typeId = data.type
                // }
                // else return
            },
            popAddClose(val){
                if(val){
                    this.search()
                }
                this.payDialog = false
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
            selHos(val){
                this.deptList = []
                this.formInline.dept = ""
                if(val == ""){
                    this.deptList = JSON.parse(JSON.stringify(this.allDept))
                }else{
                    this.allDept.forEach(ele => {
                        if(ele.hospitalCode == val){
                            this.deptList.push(ele)
                        }
                    });
                }
            },
            async GetDropDownPermission(){
                let res1 = await GetDropDownPermission({typeId: 1});
                this.hospitalList = res1.data
                let dept = await GetDeptAllByHospitalCode({hospitalCode:""})
                this.allDept = dept.data
                this.deptList = JSON.parse(JSON.stringify(dept.data))
                let whList = await GetWarehouse({
                    "hospitalCode": "",
                    'pageIndex':1,
                    'pageSize':100,
                    'keywords':"",
                    'typeId':2//卡券
                })
                this.whList = whList.data
            },
            // 删除
            async DeleteStockTicketOutById(params){
                try{
                    let res = await DeleteStockTicketOutById(params)
                    if(res.status){
                        this.$message({message: '删除成功', type: 'success'});
                        this.search()
                    }else{
                        this.$message.error('删除失败'+res.errorMessage);
                    }
                }catch(err){
                    this.$message.error('删除失败');
                }
            },
            async GetTicketOut(params,ope){
                try{
                    let res = await GetTicketOut(params)
                    if(ope){
                        this.allData = res.data
                        this.$refs.exportTable.handleDownload()
                    }else{
                        this.tableData = res.data
                        this.total = res.count
                    }
                    this.loading = false
                }catch(err){
                    console.log(err)
                }
            },
            
            onSubmit(){
                this.currentPage = 1
                this.search()
            },
            search(){
                this.loading = true
                this.GetTicketOut({
                    pageIndex:this.currentPage,
                    pageSize:this.size,
                    // "warehouseId": this.formInline.warehouseId,
                    "hospitalCode": this.formInline.hospitalCode,
                    "ticketOutType": this.formInline.outType,
                    "startDate": this.formInline.startDate,
                    "endDate": this.formInline.endDate,
                    keywords:this.formInline.keywords.removeSP()
                })
            },
            handleSizeChange(val) {
                this.size = val
                this.search()
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.search()
            },

//          添加
            addTag(ope,index,data){
                this.dialogOut = true
                this.title = ope
                if(data){
                    this.editMes = JSON.parse(JSON.stringify(data[index]))
                }else{
                    this.editMes = {}
                }
            },
//            删除
            deleteRow(index,data){
                this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    
                    this.DeleteStockTicketOutById({
                        id:data[index].id
                    })
                }).catch(() => {

                });
            },

            approve(data){

            },
            account(data){
                const h = this.$createElement;
                this.$msgbox({
                    title: '提示',
                    message: h('p', null, [
                        h('div', { style: 'font-weight:bold;line-height:36px' }, '核查信息无误后点击确认'),
                        h('div', { style: 'line-height:36px' }, '收款医院：'+data.fromHospitalName),
                        h('div', { style: 'line-height:36px' }, '金额：'+data.drugInAmount),
                    ]),
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = '执行中...';
                            let obj = {
                                DrugInOutId:data.id,
                                hospitalCode:data.hospitalCode,
                                hospitalName:data.hospitalName,
                                tohospitalCode:data.fromHospitalCode,
                                tohospitalName:data.fromHospitalName,
                                orderAmount:data.drugInAmount,
                                createBy:getCookie("userName"),
                                createUserId:getCookie("userId"),
                            }
                            this.GetDrugPay(obj)
                            instance.confirmButtonLoading = false;
                            done();
                        } else {
                            done();
                        }
                    }
                }).then(action => {
                    // this.$message({
                    //     type: 'info',
                    //     message: 'action: ' + action
                    // });
                });
            },
            addDrug(val){
                this.isDrug = true
                this.searchMes = val
            },
            addClose(val,ope){
                this.dialogOut = false
                if(val){
                    this.search()
                }
            },
            //添加回调
            selSure(val,data){
                if(val){
                    this.$refs.addS.addTable(data)
                    this.isDrug = false
                }else{
                    this.isDrug = false
                }
            },
            pay(data,title){
                
                this.title = title
                this.view = title=='查看'?true:false
                this.payDialog = true
                this.mes = data
            }
        },
        components: {
            Export,
            add,
            payDialog,
            popUser,
            scan,viewDialog
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.viewDialog{
    width:650px;min-height:300px;
    max-height:500px;overflow:auto;
}
.el-table .info-row {
    background: #ff4949;
  }

  .el-table .positive-row {
    background: #ff4949;
  }
</style>
