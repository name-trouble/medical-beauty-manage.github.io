<template>
    <div class="tag selCommon">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px">
            <el-form-item label="入库日期：" class="form_item_mt10">
                <el-date-picker
                    v-model="date"
                    style="width: 200px;"
                    type="daterange"
                    @change="dateChange"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="入库编号：" class="form_item_mt10">
                <el-input v-model="formInline.keywords" placeholder="请输入" style="width: 200px;" v-on:keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            <el-form-item label="医院：" class="form_item_mt10">
                <el-select v-model="formInline.hospitalCode"  style='width:200px;' @change="hosChange">
                    <el-option v-for="(item,index) in hospitalList" :key="index" :label="item.supplierName" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="仓库：" class="form_item_mt10">
                <el-select v-model="formInline.warehouseId" style='width:200px;'>
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="(item,index) in whList" :key="index" :label="item.warehouseName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="入库类别：" class="form_item_mt10">
                <el-select v-model="formInline.ticketInType"  style='width:200px;'>
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="(item,index) in typeList" :key="index" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label=" " class="form_item_mt10">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
                <el-button type="primary" class="searchBtn" @click="addTag('添加入库')">添加入库</el-button>
                <el-button type="primary" class="searchBtn" @click="exportTbale">导出报表</el-button>
                <Export :tHeader="tHeader" ref="exportTable" :filterVal=' filterVal' :tableData1='tableData1' :name='name' style="display:none"></Export>
            </el-form-item>
        </el-form>
        <!-- 信息表 -->
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" max-height="560" class="smt min_table"
         v-loading="loading" @row-dblclick='dbClick'>
            <el-table-column prop="ticketInCode" label="入库编号" min-width="90"></el-table-column>
            <el-table-column prop="ticketInDate" label="入库日期" min-width="90">
                <template slot-scope="scope">
                    <span v-if="scope.row.ticketInDate">{{scope.row.ticketInDate.substring(0,10)}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="hospitalName" label="医院" min-width="120"></el-table-column>
            <el-table-column prop="ticketInType" label="入库类别" min-width="90" align="center"></el-table-column>
            <el-table-column prop="warehouseName" label="入库仓库" min-width="90"></el-table-column>
            <el-table-column prop="ticketName" label="券名称" min-width="130"></el-table-column>
            <el-table-column prop="quantity" label="入库数量" min-width="90"></el-table-column>
            <el-table-column prop="ticketInAmount" label="入库金额" min-width="90"></el-table-column>
            <el-table-column prop="createBy" label="入库人" min-width="90"></el-table-column>
            <!-- <el-table-column prop="createOn" label="填制日期" min-width="90">
                <template slot-scope="scope">
                    <span v-if="scope.row.createOn">{{scope.row.createOn.substring(0,10)}}</span>
                </template>
            </el-table-column> -->
            <el-table-column prop="memo" label="备注" min-width="180" show-overflow-tooltip></el-table-column>
            <el-table-column prop="status" label="操作" width="250" align="center">
                <template slot-scope="scope">
                    <el-button @click="addTag('详情',scope.$index,tableData)" type="primary" size="small" style="margin-left:0">查看</el-button>
                    <el-button @click="addTag('编辑入库',scope.$index,tableData)" type="primary" size="small" style="margin-left:0">编辑</el-button>
                    <el-button @click="deleteRow(scope.$index,tableData)" type="primary" size="small" style="margin-left:0">删除</el-button>
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

        <el-dialog :title="title" :visible.sync="dialogAdd" size="">
            <add v-if="dialogAdd" style="width:1000px" ref="addS" @openScan="openScan" :editMes="editMes" @addClose="addClose"></add>
        </el-dialog>

        <el-dialog title="扫描券号" :visible.sync="ticketsInfo" size="" top="10%" :close-on-click-modal='false'>
            <scan v-if="ticketsInfo" ope="in" @scanTick="scanTick" style="width:600px;max-height:1000px;" ref="scanDialog"></scan>
        </el-dialog>

        <el-dialog title="修改备注" :visible.sync="dialogMemo" size="">
            <el-input v-model="editMes.memo" type="textarea" :rows="4" style="width:500px" ></el-input>
            <div class="form_footer">
                <el-button type="primary" @click="UpdateMemo()">保存</el-button>
                <el-button @click="cancel()">取消</el-button>
            </div>
        </el-dialog>

        <el-dialog title="详情" :visible.sync="dialogView" size="" top="10%" :close-on-click-modal='false'>
            <!-- <addView v-if="ticketsInfo" @scanTick="scanTick" style="width:600px;max-height:1000px;" ref="scanDialog"></addView> -->
            <addView v-if="dialogView" style="width:1000px" ref="addS" @viewTicket="viewTicket" :editMes="editMes" ></addView>
        </el-dialog>
        
        <el-dialog title="卡券详情" :visible.sync="ticketsDet" size="">
            <div style="width: 820px;min-height:250px;max-height:600px;overflow:auto" v-if="ticketsDet">
                <el-tag v-for="ticket in ticketList" :key="ticket"  class="tag" type="success" >{{ticket}} </el-tag>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import {baseImgPath} from "@/config/env"
    import  "@/style/selfCommon.less"
    import { getCookie, delCookie } from '@/config/mUtils'
    import add from "./com/add.vue"
    import addView from "./com/addView.vue"
    import scan from './com/scan.vue'
    import viewDialog from './com/view'
    import {DeleteStockTicketInById,GetTicketIn,GetDropDownPermission,GetWarehouse,UpdateMemo,GetTicketInDetail} from "@/api/myData"
    import Export from '@/components/export'
    export default {
        data () {
            return {
                ticketList:[],
                ticketsDet:false,

                dialogView:false,
                ticketsInfo:false,

                date:"",
                editMes:[],
                loading:false,
                title:"",
                dialogAdd:false,
                dialogMemo:false,
                total:0,
                size:10,
                typeList:['印制入库','调拨入库'],
                currentPage:1,
                formInline: {
                    warehouseId:"",
                    stockSupplierCode:"",
                    keywords: '',
                    typeCode:'',
                    hospitalCode:"",
                    ticketInType:'',
                },
                tableData:[],
                hospitalList:[],
                // supplierList:[],
                whList:[],
                allwhList:[],
                allData:[],
            }
        },
        computed: {
            /* 导出报表参数 tHeader,filterVal,tableData1*/
            tHeader(){
                return ['入库编号', '入库日期', '医院', '入库类别', '入库仓库', '入库金额', '入库人', '填制日期', '备注']
            },
            filterVal(){
                return ['ticketInCode', 'ticketInDate', 'hospitalName', 'ticketInType', 'warehouseName','ticketInAmount','createBy','createOn','memo']
            },
            tableData1(){
                return this.allData
            },
            name(){
                return '卡券入库'
            },
            /*导出报表参数 tHeader,filterVal,tableData1*/
        },
        mounted(){
            this.date = [new Date(),new Date()]
            this.GetDropDownPermission()
        },
        methods:{
            viewTicket(val){
                this.ticketsDet = true
                this.ticketList = val
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


            hosChange(val){
                this.formInline.warehouseId = ""
                this.whList = []
                this.allwhList.forEach(ele => {
                    if(val == ele.hospitalCode){
                        this.whList.push(ele)
                    }
                });
            },
            async UpdateMemo(){
                this.updateMes.memo = this.editMes.memo
                let res = await UpdateMemo(this.updateMes)
                if(res.status){
                    this.$message({message: '修改成功', type: 'success'});
                    this.search()
                    this.dialogMemo = false
                }else{
                    this.$message.error('修改失败'+res.errorMessage);
                }
            },
            cancel(){
                this.dialogMemo = false
            },
            dbClick(row, event){
                this.editMes = JSON.parse(JSON.stringify(row))
                this.dialogMemo = true
                this.GetTicketInDetail(row.id)
            },
            async GetTicketInDetail(id){
                let res = await GetTicketInDetail({id:id})
                this.updateMes = res.data.stockTicketIn
                this.upTableData = res.data.stockTicketInDetailList
            },
            exportTbale(){
                this.GetTicketIn({
                    "hospitalCode": this.formInline.hospitalCode,
                    "startDate": this.formInline.startDate,
                    "endDate": this.formInline.endDate,
                    pageIndex:this.currentPage,
                    pageSize:this.total,
                    ticketInType:this.formInline.ticketInType,
                    keywords:this.formInline.keywords.removeSP()
                },'export')
            },
            print(data){
                let url = document.location.protocol + "//" + document.location.hostname + ((80 == document.location.port || "" == document.location.port) ? "" : ":" + document.location.port) + "/"
                let newWin = window.open(url+'print/printTickets.html?id='+data.id)
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
            async GetDropDownPermission(){
                let res1 = await GetDropDownPermission({typeId: 1});
                this.hospitalList = res1.data
                this.formInline.hospitalCode = res1.data[0].code
                let whList = await GetWarehouse({
                    "hospitalCode": "",
                    pageIndex:1,
                    pageSize:100,
                    keywords:"",
                    typeId:2//卡券
                })
                this.allwhList = whList.data
            },
            // 删除
            async DeleteStockTicketInById(params){
                try{
                    let res = await DeleteStockTicketInById(params)
                    if(res.status){
                        this.$message({message: '删除成功', type: 'success'});
                        this.search()
                    }else{
                        this.$message.error('删除失败');
                    }
                }catch(err){
                    console.log(err)
                    this.$message.error('删除失败');
                }
            },
            async GetTicketIn(params,ope){
                try{
                    let res = await GetTicketIn(params)
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
                this.GetTicketIn({
                    "hospitalCode": this.formInline.hospitalCode,
                    "startDate": this.formInline.startDate,
                    "endDate": this.formInline.endDate,
                    pageIndex:this.currentPage,
                    pageSize:this.size,
                    ticketInType:this.formInline.ticketInType,
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
                this.title = ope
                if(data){
                    this.editMes = JSON.parse(JSON.stringify(data[index]))
                    this.editMes.view = true
                }else{
                    this.editMes = {}
                }

                if(ope == '详情'){
                    this.dialogView = true
                }else{
                    this.dialogAdd = true
                }
            },
//            删除
            deleteRow(index,data){
                this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    
                    this.DeleteStockTicketInById({
                        id:data[index].id
                    })
                }).catch(() => {

                });
            },

            addClose(val){
                this.dialogAdd = false
                if(val){
                    this.search()
                }
            },
     
        },
        components: {
            Export,viewDialog,
            add,scan,addView,
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form_footer{
    margin-top: 10px;
    text-align: center;
}
.tag{
    margin: 5px;
}
</style>
