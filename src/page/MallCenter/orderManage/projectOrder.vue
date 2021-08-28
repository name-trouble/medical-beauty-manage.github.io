<template>
    <div class="selCommon projectOrder">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px" >
            <el-form-item label="订单时间："  class="form_item_mt10 ">
                <el-date-picker v-model="date1" @change="dateForm1" type="daterange" placeholder="选择日期范围" class="form_item_ipt220"></el-date-picker>
            </el-form-item>
            <el-form-item label="关键字：" class="form_item_mt10 form_item_wh280">
                <el-input v-model="formInline.fxCode" placeholder="订单编号/客户/商品名称/代理商/手机号" class="form_item_ipt220" :maxlength=10000 v-on:keyup.enter.native="onSubmit"></el-input>
            </el-form-item>

            <el-form-item label="医院：" class="form_item_mt10 form_item_wh280">
                <el-select v-model="formInline.hospital"  class="form_item_ipt220" @change="onSubmit">
                    <el-option v-for="(item,index) in hospitalList" :key="index" :label="item.supplierName" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="销售公司：" class="form_item_mt10 form_item_wh280">
                <el-select v-model="formInline.branch"  class="form_item_ipt220" @change="onSubmit">
                    <el-option v-for="(item,index) in branchList" :key="index" :label="item.branchName" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="支付方式：" class="form_item_mt10 form_item_wh280">
                <el-select v-model="formInline.payType"  class="form_item_ipt220" @change="onSubmit">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="支付宝" value="1"></el-option>
                    <el-option label="微信" value="2"></el-option>
                    <el-option label="余额支付" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态：" class="form_item_mt10 form_item_wh280">
                <el-select v-model="formInline.status" multiple  class="form_item_ipt220 front_ipt">
                    <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
                <el-input v-model="formInline.statusMes" placeholder="请选择" class="form_item_ipt220 back_ipt" ></el-input>
            </el-form-item>
            <br/>
            <el-form-item label=" " class="form_item_mt10 form_item_wh280">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
                <Export ref="exportCom" :tHeader="tHeader" :filterVal=' filterVal' :tableData1='tableData1' :name='name' style="display:none"></Export>
                <el-button class="searchBtn" @click="exportData">导出报表</el-button>
            </el-form-item>
        </el-form>
        <!--信息表-->
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" class="min_table" :loading="loading">
            <el-table-column prop="orderCode" label="合并订单号" min-width="100"></el-table-column>
            <el-table-column prop="subOrderCode" label="订单编号" min-width="100">
                <template slot-scope="scope">
                    <el-button type="text" @click="view(scope.row.subOrderCode)">{{scope.row.subOrderCode}}</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="contactName" label="客户" min-width="100">
                 <template slot-scope="scope">
                    <span :style="{'color':scope.row.isBranch?'black':'red'}" >{{scope.row.contactName}}</span>
                </template>
            </el-table-column>

            <el-table-column prop="branchName" label="消费商" min-width="80"></el-table-column>
            <!-- <el-table-column prop="contactPhone" label="手机号" min-width="80"></el-table-column> -->
            <el-table-column prop="createDate" label="订单时间" min-width="120">
                <template slot-scope="scope">
                    <span v-if="scope.row.createDate">{{scope.row.createDate}}</span>
                </template>
            </el-table-column>
             <el-table-column prop="offlineDate" label="线下开单日期" min-width="80" show-overflow-tooltip>
                 <template slot-scope="scope">
                    <span v-if="scope.row.offlineDate">{{scope.row.offlineDate}}</span>
                </template>
             </el-table-column>
            <el-table-column prop="source" label="来源" min-width="80" show-overflow-tooltip></el-table-column>
            <el-table-column prop="payType" label="支付方式" min-width="80" show-overflow-tooltip>
                <template slot-scope="scope">
                    <span v-if="scope.row.payType == 1">支付宝</span>
                    <span v-if="scope.row.payType == 2">微信</span>
                    <span v-if="scope.row.payType == 3">余额支付</span>
                </template>
            </el-table-column>
            <el-table-column prop="activityTypes" label="类型" min-width="80" show-overflow-tooltip>
                <template slot-scope="scope">
                    <span v-if="scope.row.activityTypes == 1">限时秒杀</span>
                    <span v-if="scope.row.activityTypes == 2">体验专区</span>
                    <span v-if="scope.row.activityTypes == 3">特惠项目</span>
                    <span v-if="scope.row.activityTypes == 4">量贩专区</span>
                    <span v-if="scope.row.activityTypes == 5">398特惠</span>
                    <span v-if="scope.row.activityTypes == null||scope.row.activityTypes == 0">原价</span>
                </template>
            </el-table-column>
            <el-table-column prop="goodsName" label="商品名称" min-width="150" show-overflow-tooltip></el-table-column>
            <el-table-column prop="price" label="价格" min-width="80" align="right">
                <template slot-scope="scope">
                    {{scope.row.price}}
                </template>
            </el-table-column>
            <el-table-column prop="pay" label="最低支付金额" min-width="100" align="right"></el-table-column>
            <el-table-column prop="points" label="最高可抵扣积分" min-width="100" align="right"></el-table-column>
            <el-table-column prop="deposit" label="订金" min-width="90"  align="right">
                <template slot-scope="scope">
                    <span v-if="scope.row.deposit"> {{scope.row.deposit}}</span>
                    <span v-else>0</span>
                </template>
            </el-table-column>
            
            <!-- 线上订单状态{0待付款/1已付款/2已确认/3待评价/4已完成/5已关闭/6退款} -->
            <!-- {0已提交/1已付款/2已确认/3已评价/4已关闭/5已退款/6已取消} -->
            <el-table-column prop="status" label="状态" min-width="80" align="center">
                <template slot-scope="scope">
                        <el-tag type="gray" v-if="scope.row.status == 0">待付款</el-tag>
                        <el-tag type="success" v-if="scope.row.status == 1">已付款</el-tag>
                        <el-tag type="success" v-if="scope.row.status == 2">已确认</el-tag>
                        <el-tag type="success" v-if="scope.row.status == 3">待评价</el-tag>
                        <el-tag type="danger" v-if="scope.row.status == 4">已关闭</el-tag>
                        <el-tag type="danger" v-if="scope.row.status == 5">已退款</el-tag>
                        <el-tag type="danger" v-if="scope.row.status == 6">已取消</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="grade" label="操作" min-width="170">
                <template slot-scope="scope">
                    <!--确认后退款-->
                    <el-button @click="refund(scope.$index,tableData)" type="primary" :disabled="scope.row.status != 1&&scope.row.status != 2"  v-if="scope.row.status != 6" size="small">退款</el-button>
                    <!-- 付款后确认 -->
                    <el-button type="primary" size="small" @click="makeSure(scope.row)" :disabled="scope.row.status != 1">确认</el-button>
                    <el-button type="primary" size="small" @click="translate(scope.row)" >订单转移</el-button>
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
        <el-dialog size="" :visible.sync="dialogVisible" title="订单详情">
            <orderDet :code="viewFxCode" :isRefund="IsRefund" v-if="dialogVisible" @close = 'closeReport'></orderDet>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
import "@/style/selfCommon.less"
import Export from '@/components/export'
import orderDet from './com/orderDet'
import {GetOnLineOrders,ConfirmReach,ConfirmRefund,GetOrderInfoByCode,GetDropDownPermission,GeneratorMemberConsume} from "@/api/myData"
import { getCookie, getStore } from '../../../config/mUtils';
export default {
        // name:"projectOrder",
        data () {
            return {
                loading:false,
                date1:'',
                typeCode:getStore('typeCode'),
                IsRefund:false,
                dialogVisible:false,
                dialogVisible1:false,
                currentIndex:0,
                formInline:{
                    startTime:"",
                    endTime:"",
                    fxCode:"",
                    name:"",
                    rec:"",
                    customer:"",
                    hospital:"",
                    branch:'',
                    // status:'',
                    payType:'',
                    status:[],
                    statusMes:'全部',
                },
                status:[],
                statusList:[{label:'全部',value:''},{label:'待付款',value:'0'},{label:'已付款',value:'1'},{label:'已确认',value:'2'},
                {label:'已评价',value:'3'},{label:'已关闭',value:'4'},{label:'已退款',value:'5'},{label:'已取消',value:'6'},],
                tableData:[],
                currentPage:1,
                size:10,
                total:0,
                form:{
                    createDate:''
                },
                hospitalList:[],
                branchList:[],
                viewFxCode:"",
                allData:[],
            }
        },
        computed: {

            /* 导出报表参数 tHeader,filterVal,tableData1*/
            tHeader(){
                return ['合并订单号','订单编号', '客户','手机号','消费商','订单时间','来源','类型', '商品名称', '价格', '最低支付金额', '最高可抵扣积分',"订金","状态"]
            },
            filterVal(){
                return ['orderCode',  'subOrderCode', 'contactName','contactPhone', 'branchName',  'createDate', 'source', 'activityTypes', 'goodsName' ,'price', 'pay' ,'points', 'deposit' ,'status']
            },
            tableData1(){
                let data = JSON.parse(JSON.stringify(this.allData))
                data.forEach(ele=>{
                    ele.activityTypes = this.getTypeName(ele.activityTypes)
                    ele.status = this.getStatus(ele.status)
                })
                return data
            },
            name(){
                return '订单审核'
            },
            /*导出报表参数 tHeader,filterVal,tableData1*/
        },
        watch:{
            'formInline.status':{
                handler(curVal,oldVal){
                    let text = ''
                    if(curVal.length == 0){
                        text = '全部'
                    }
                    curVal.forEach(row=>{
                        if(row === ''){
                            text = '全部'
                            this.formInline.status = []
                            return true
                        }else{
                            this.statusList.forEach(ele=>{
                                if(row == ele.value){
                                    text += ele.label
                                }
                            })
                        }
                        
                    })
                    this.formInline.statusMes = text
                },
                deep:true
            }
        },
        
        mounted(){
            this.getHospital()
        },
        methods: {
            translate(data){
                this.$confirm('此操作将修改订单受益人，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.GeneratorMemberConsume({
                        SubOrderCode:data.subOrderCode
                    })
                })
            },
            async GeneratorMemberConsume(params){
                let res = await GeneratorMemberConsume(params)
                if(res.status){
                        this.$message({message: '转移成功', type: 'success'});
                        this.search()
                    }else{
                        this.$message.error('转移失败!'+res.errorMessage)
                    }
            },
            getTypeName(type){
                switch(type){
                    case null:return '限时秒杀';break;
                    case 1:return '体验专区';break;
                    case 2:return '特惠项目';break;
                    case 3:return '量贩专区';break;
                    case 4:return '原价';break;
                }
            },
             getStatus(status){
                switch(status){
                    case 0:return '待付款';break;
                    case 1:return '已付款';break;
                    case 2:return '已确认';break;
                    case 3:return '已评价';break;
                    case 4:return '已关闭';break;
                    case 5:return '已退款';break;
                    case 6:return '已取消';break;
                }
            },
            exportData(){
                this.getProofOrder({
                    pageIndex: 1,
                    pageSize: this.total,
                    CreateDate1:this.formInline.startTime,
                    CreateDate2:this.formInline.endTime,
                    HospitalCode:this.formInline.hospital,
                    branchCode:this.formInline.branch,
                    Keyword:this.formInline.fxCode,
                    status:this.formInline.status.join(','),
                    userId:getCookie("userId"),
                    UserBranchCode:getCookie("BranchCode"),
                    ReportClass:getCookie("reportClass"),
                    payType:this.formInline.payType
                },1)
            },
            async getHospital(){
                let [res, res1] = await Promise.all([GetDropDownPermission({typeId: 1}),GetDropDownPermission({typeId: 2})])
                this.hospitalList = res.data
                this.formInline.hospital = this.hospitalList[0].code
                this.branchList = res1.data
                if(this.typeCode == '03'){//医院账户需添加全部选项
                    this.branchList.unshift({
                        branchName:'全部',
                        code:'',
                    })
                }
                this.formInline.branch = this.branchList[0].code
            },
            
            closeReport(val){
                this.dialogVisible = false
                if(val){
                    this.search()
                }
            },
//            退款
            async OnlineOrderRefund(params){
                try{
                    let res = await ConfirmRefund(params)
                    if(res.status){
                        this.$message({message: '退款成功', type: 'success'});
                        this.search()
                    }else{
                        this.$message.error('退款失败!'+res.errorMessage)
                    }
                }catch(err){
                    this.$message.error('退款失败')
                }
            },
            submit(){
                this.pageIndex = 1
                this.search()
            },
            // search(){
            //     this.getProofOrder({
            //         pageIndex: this.currentPage,
            //         pageSize: this.size,
            //         orderType:1
            //     })
            // },
            async getProofOrder(params,ope){
                try {
                    let res = await GetOnLineOrders(params)
                    if(ope){
                        this.allData = this.dealData(res.data)
                        this.$refs.exportCom.handleDownload()
                    }else{
                        this.total = res.count
                        this.tableData = this.dealData(res.data)
                    }
                    this.loading = false
                } catch (err) {
                    console.log(err)
                }
            },
            dealData(data){
                data.forEach(row=>{
                    row.Surplus =  row.OrderAmount - row.RealAmount
                })
                return data
            },
            dateForm1(val){
                if(val){
                    val = val.formatDates()
                    this.formInline.startTime = val.substring(0,10)
                    this.formInline.endTime = val.substring(13)
                }else{
                    this.formInline.startTime = ""
                    this.formInline.endTime = ""
                } 
                this.onSubmit()
            },
            onSubmit(val){
                this.currentPage = 1
                this.search()
            },
            search(){
                // let status = this.formInline.status.filter(row=>{
                //     return row.value
                // })
                this.loading = true
                this.getProofOrder({
                    pageIndex: this.currentPage,
                    pageSize: this.size,
                    CreateDate1:this.formInline.startTime,
                    CreateDate2:this.formInline.endTime,
                    HospitalCode:this.formInline.hospital,
                    branchCode:this.formInline.branch,
                    Keyword:this.formInline.fxCode,
                    status:this.formInline.status.join(','),
                    userId:getCookie("userId"),
                    UserBranchCode:getCookie("BranchCode"),
                    ReportClass:getCookie("reportClass"),
                    payType:this.formInline.payType
                })
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
            view(code){// 查看订单详情
                this.viewFxCode = code
                this.dialogVisible = true
                this.IsRefund = false
                // this.GetOrderInfoByCode(code)
                // this.form = data[index]
            },
            // async GetOrderInfoByCode(code){
            //     let res = await GetOrderInfoByCode({code:code})
            //     this.form = res.data
            // },
            refund(index,data){
                this.viewFxCode = data[index].subOrderCode
                this.form = data[index]
                this.IsRefund = true
                this.dialogVisible = true
            },
            editSure(ope){//  退款流程
                this.dialogVisible = false
                this.OnlineOrderRefund({
                    code:this.form.subOrderCode,
                })
            },
            editCancel(ope){
                if(ope == 'refund'){//  退款流程
                    this.dialogVisible = false
                }else {//  修改价格流程
                    this.dialogVisible1 = false
                    this.$refs.form.resetFields();
                }
            },
            makeSure(data){
                this.$confirm('是否确认该订单状态?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.ConfirmReach(data)
                })
            },
            async ConfirmReach(data){
                let res =await ConfirmReach({
                    code : data.subOrderCode,
                    userId:getCookie("userId")
                })
                if(res.status){
                    this.$message({message: '确认成功', type: 'success'});
                    this.onSubmit()
                }else{
                    this.$message.error('确认失败!'+res.errorMessage)
                }
            },
        },
        components: {
            orderDet,Export
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.front_ipt{
    opacity: 0;
    z-index: 2
}
.back_ipt{
    margin-left: -220px;
    z-index: 1
}
</style>
