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
            <el-form-item label="关键字：" class="form_item_mt10">
                <el-input v-model="formInline.keywords" placeholder="请输入" style="width: 200px;" v-on:keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            <el-form-item label="医院：" class="form_item_mt10">
                <el-select v-model="formInline.hospitalCode"  style='width:200px;' @change="selHos">
                    <el-option v-for="(item,index) in hospitalList" :key="index" :label="item.supplierName" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="仓库：" class="form_item_mt10">
                <el-select v-model="formInline.warehouseId" style='width:200px;'>
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="(item,index) in whList" :key="index" :label="item.warehouseName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="领用部门：" class="form_item_mt10">
                <el-select v-model="formInline.dept"  style='width:200px;'>
                    <el-option label="空" value=""></el-option>
                    <el-option v-for="(item,index) in deptList" :key="index" :label="item.deptName" :value="item.deptCode"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="出库类别：" class="form_item_mt10">
                <el-select v-model="formInline.outType"  style='width:200px;' @change="typeCha">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="(item,index) in typeList" :key="index" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="调往医院：" class="form_item_mt10" v-if="formInline.outType == '调拨出库'||formInline.outType == '外调出库'">
                <el-select v-model="formInline.fromHospitalCode"  style='width:200px;' @change="selHos">
                    <el-option label="空" value=""></el-option>
                    <el-option v-for="(item,index) in allHospital" :key="index" :label="item.SupplierName" :value="item.Code"></el-option>
                </el-select>
            </el-form-item>
            <!-- <el-form-item label="记账状态：" class="form_item_mt10">
                <el-input v-model="formInline.keywords" placeholder="请输入" style="width: 200px;" v-on:keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            <el-form-item label="审核状态：" class="form_item_mt10">
                <el-select v-model="formInline.hospitalCode"  style='width:200px;'>
                    <el-option label="全部" value=""></el-option>
                    <el-option label="未审核" value="0"></el-option>
                    <el-option label="已审核" value="1"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label=" " class="form_item_mt10">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
                <el-button type="primary" class="searchBtn" @click="addTag('添加')">添加出库</el-button>
                <el-button type="primary" class="searchBtn" @click="exportTbale">导出报表</el-button>
                <Export :tHeader="tHeader" ref="exportTable" :filterVal=' filterVal' :tableData1='tableData1' :name='name' style="display:none"></Export>
            </el-form-item>
        </el-form>
        <!-- 信息表 -->
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" max-height="560" class="smt min_table" v-loading="loading">
            
            <el-table-column prop="drugOutCode" label="领用编号" min-width="90">
                <template slot-scope="scope">
                    <el-button type="text" @click="openView(scope.row)">{{scope.row.drugOutCode}}</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="drugOutDate" label="领用日期" min-width="90">
                <template slot-scope="scope">
                    <span v-if="scope.row.drugOutDate">{{scope.row.drugOutDate.substring(0,10)}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="hospitalName" label="医院" min-width="90"></el-table-column>
            <el-table-column prop="fromHospitalName" label="调往医院" min-width="90"></el-table-column>
            <el-table-column prop="drugOutType" label="出库类别" min-width="90"></el-table-column>
            <el-table-column prop="warehouseOutName" label="出库仓库" min-width="90"></el-table-column>
            <el-table-column prop="drugOutAmount" label="领用金额" min-width="90"></el-table-column>
            <el-table-column prop="buyerName" label="领用人" min-width="90"></el-table-column>
            <el-table-column prop="deptName" label="领用部门" min-width="90"></el-table-column>
            <!-- <el-table-column prop="address" label="审核人" min-width="90"></el-table-column>
            <el-table-column prop="address" label="审核日期" min-width="90"> -->

            <!-- </el-table-column> -->
            <el-table-column prop="memo" label="备注" min-width="150" show-overflow-tooltip></el-table-column>
            <!-- <el-table-column prop="address" label="记账状态" min-width="90">
            </el-table-column> -->
            <!-- <el-table-column prop="address" label="审核状态" min-width="90">
            </el-table-column> -->
            <el-table-column prop="customerName" label="会员" min-width="90"></el-table-column>
            <el-table-column prop="createBy" label="填制人" min-width="90"></el-table-column>
            <el-table-column prop="status" label="操作" width="210" fixed="right">
                <template slot-scope="scope">
                    <!-- <el-button @click="account(scope)" type="primary" size="small" style="margin-left:0">记账</el-button>
                    <el-button @click="approve(scope)" type="primary" size="small" style="margin-left:0">审核</el-button> -->
                    <el-button @click="addTag('编辑',scope.$index,tableData)" type="primary" size="small" style="margin-left:0">编辑</el-button>
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

        <el-dialog :title="title" :visible.sync="tag" size="" top="5%">
            <add v-if="tag" style="width:1000px" @addDrug="addDrug" ref="addS" @addClose="addClose" :editMes="editMes"></add>
        </el-dialog>
        <el-dialog title="选择药品" :visible.sync="isDrug" size="">
            <selDrug v-if="isDrug" style="width:640px" @selSure="selSure" :searchMes="searchMes"></selDrug>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import {baseImgPath} from "@/config/env"
    import  "@/style/selfCommon.less"
    import { getCookie, delCookie } from '@/config/mUtils'
    import add from "./com/addDrugOut"
    import selDrug from "./com/selDrugOut"
    import {GetDrugOut,DeleteDrugOutById,UpdateStockDrugOut,AddStockDrugOut,GetDropDownPermission,GetDeptAllByHospitalCode,GetWarehouse,getSupplierByPage} from "@/api/myData"
    import Export from '@/components/export'
    export default {
        // name: "VideoManage",
        data () {
            return {
                typeList:['报损出库','成本出库','出库调整','发物资出库','产品单出库','发药出库','客户出库','礼品赠送','盘亏出库','退货出库','外调出库','在用物资科室内调拨','正常领用'],
                date:"",
                editMes:{},
                isDrug:false,
                saveLoading:false,
                loading:false,
                title:"",
                tag:false,
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
                    fromHospitalCode:''
                },
                selfHospitalCode:getCookie('hospitalCode'),
                allDept:[],
                deptList:[],
                tableData:[],
                hospitalList:[],
                allHospital:[],
                supplierList:[],
                searchMes:{},
                whList:[],
                allWhList:[],
                allData:[],
            }
        },
        computed: {
            /* 导出报表参数 tHeader,filterVal,tableData1*/
            tHeader(){
                return ['领用编号', '领用日期', '医院', '调往医院', '出库类别', '出库仓库', '领用金额', '领用人', '领用部门','备注',"会员",'填制人']
            },
            filterVal(){
                return ['drugOutCode', 'drugOutDate', 'hospitalName', 'fromHospitalName', 'drugOutType','warehouseOutName','drugOutAmount','buyerName','deptName','memo','customerName','createBy','']
            },
            tableData1(){
                return this.allData
            },
            name(){
                return '出库'
            },
            /*导出报表参数 tHeader,filterVal,tableData1*/
        },
        mounted(){
            this.date = [new Date(),new Date()]
            this.GetDropDownPermission()
        },
        methods:{
            typeCha(val){
                this.formInline.fromHospitalCode = ""
            },
            exportTbale(){
                this.GetDrugOut({
                    pageIndex:1,
                    pageSize:this.total,
                    "warehouseId": this.formInline.warehouseId,
                    "hospitalCode": this.formInline.hospitalCode,
                    // "stockSupplierCode": "sample string 3",
                    "drugOutType": this.formInline.outType,
                    "deptCode": this.formInline.dept,
                    "startDate": this.formInline.startDate,
                    "endDate": this.formInline.endDate,
                    fromHospitalCode:this.formInline.fromHospitalCode,
                    keywords:this.formInline.keywords.removeSP()
                },'export')
            },
            // 详情
            openView(data){
                this.editMes = JSON.parse(JSON.stringify(data)) 
                this.editMes.view = true
                this.tag = true
                this.title = '详情'
            },
            print(data){
                let url = document.location.protocol + "//" + document.location.hostname + ((80 == document.location.port || "" == document.location.port) ? "" : ":" + document.location.port) + "/"
                if(baseImgPath.indexOf('192')>=0){
                    let newWin = window.open(url+'print/printOut.html?id='+data.id)
                }else{
                     let newWin = window.open(url+'print/printOut.html?id='+data.id)
                }
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
                this.formInline.warehouseId = ''
                if(this.formInline.hospitalCode == ""){
                    this.deptList = JSON.parse(JSON.stringify(this.allDept))
                }else{
                    this.allDept.forEach(ele => {
                        if(ele.hospitalCode == this.formInline.hospitalCode){
                            this.deptList.push(ele)
                        }
                    });
                }
                this.whList = []
                this.allWhList.forEach(ele => {
                    if(ele.hospitalCode == this.formInline.hospitalCode){
                        this.whList.push(ele)
                    }
                });
            },
            async GetDropDownPermission(){
                let data = {startdate:"",enddate: "",suppliername: "",suptypecode: "",phonenumber: "",pageindex: 1,pagesize: 1000,}
                let res = await  getSupplierByPage(data)
                this.allHospital = res
                let hosList = await GetDropDownPermission({typeId:1})
                this.hospitalList = hosList.data
                let dept = await GetDeptAllByHospitalCode({hospitalCode:""})
                this.allDept = dept.data
                this.deptList = JSON.parse(JSON.stringify(dept.data))
                let whList = await GetWarehouse({
                    "hospitalCode": "",
                    pageIndex:1,
                    pageSize:100,
                    keywords:"",
                   typeId:1//药房
                })
                // this.whList = whList.data
                this.allWhList = JSON.parse(JSON.stringify(whList.data))
                this.formInline.hospitalCode = getCookie('hospitalCode')?getCookie('hospitalCode'):''
            },
            // 删除
            async DeleteDrugOutById(params){
                try{
                    let res = await DeleteDrugOutById(params)
                    if(res.status){
                        this.$message({message: '删除成功', type: 'success'});
                        this.search()
                    }else{
                        this.$message.error('删除失败');
                    }
                }catch(err){
                    this.$message.error('删除失败');
                }
            },
            async GetDrugOut(params,ope){
                try{
                    let res = await GetDrugOut(params)
                    if(ope == 'export'){
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
                this.GetDrugOut({
                    pageIndex:this.currentPage,
                    pageSize:this.size,
                    "warehouseId": this.formInline.warehouseId,
                    "hospitalCode": this.formInline.hospitalCode,
                    // "stockSupplierCode": "sample string 3",
                    "drugOutType": this.formInline.outType,
                    "deptCode": this.formInline.dept,
                    "startDate": this.formInline.startDate,
                    "endDate": this.formInline.endDate,
                    keywords:this.formInline.keywords.removeSP(),
                    fromHospitalCode:this.formInline.fromHospitalCode,
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
                this.tag = true
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
                    
                    this.DeleteDrugOutById({
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
                })
            },
            pay(data){

            },
            addDrug(val){
                this.isDrug = true
                this.searchMes = val
            },
            addClose(val){
                this.tag = false
                if(val){
                    this.search()
                }
            },
            // 药品添加回调
            selSure(val,isDialog,data){
                if(val){
                    this.$refs.addS.addTable(data)
                    if(isDialog){
                        this.isDrug = false
                    }
                    // this.isDrug = false
                }else{
                    this.isDrug = false
                }
            },

        },
        components: {
            Export,
            add,
            selDrug
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
