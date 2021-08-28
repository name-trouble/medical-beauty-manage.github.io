<template>
    <div class="selCommon projectOrder">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px" >
            <el-form-item label="项目：" class=" form_item_mt0">
                <el-autocomplete v-model="project" :fetch-suggestions="queryPro" placeholder="请输入内容" style="width:220px" :trigger-on-focus="false" @select="selectPro">
                    <template v-slot="{item}">
                        <my-item-transPro :item="item"></my-item-transPro>
                    </template>
                </el-autocomplete>
            </el-form-item>
            <el-form-item label="是否拔单："  class="form_item_mt10 form_item_wh280">
                <el-select v-model="formInline.isOFO" placeholder="" style="width: 200px;" @change="submit">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label=" " class="form_item_mt10 form_item_wh280">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
                <Export ref="exportCom" :tHeader="tHeader" :filterVal=' filterVal' :tableData1='tableData1' :name='name' style="display:none"></Export>
                <el-button class="searchBtn" @click="exportData">导出报表</el-button>
                <span> &nbsp;&nbsp; 拔单数：{{sumData.baDanCount}}</span>
            </el-form-item>
        </el-form>
        <!--信息表-->
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" max-height="560" class="min_table smt" v-loading="tableLoading" :summary-method="getSummaries"
    show-summary>
            <el-table-column prop="orderDate" width="100" label="订单日期">
                <template slot-scope="scope">
                    <span v-if="scope.row.orderDate">
                        {{scope.row.orderDate.substring(0,10)}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="fxCode" width="100" label="订单编号">
                <template slot-scope="scope">
                    <el-button @click="read(scope.$index)" type="text" size="small" >{{scope.row.fxCode}}</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="orderType" label="订单来源" min-width="80" align="center">
                <template slot-scope="scope">
                    <el-tag type="success" v-text="scope.row.orderType==1?'app订单':'线下订单'"></el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="orderType" label="规则类型" width="95">
                <template slot-scope="scope">
                   <el-tag type="success">{{scope.row.consumeTypeId|filFun}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="medicalTypeId" label="支付类型" width="85">
                <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.medicalTypeId != null">{{scope.row.medicalTypeId|filFunM}}</el-tag>
                </template>
            </el-table-column>

            <el-table-column prop="formNO" label="纸质单号" min-width="100"></el-table-column>
            <el-table-column prop="hospitalName" label="医院" width="170"></el-table-column>
            <el-table-column prop="customerName" label="客户" min-width="100">
                <template slot-scope="scope">
                    <el-button type="text" @click="view(scope.row.customerId)" v-if="scope.row.isBranch == 1" style="color:black">{{scope.row.customerName}}</el-button>
                    <el-button type="text" @click="view(scope.row.customerId)" v-else style="color:red">{{scope.row.customerName}}</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="refrenceBranchName" label="推荐人" min-width="100">
                <template slot-scope="scope">
                    <el-button type="text" @click="view(scope.row.refrenceBranchCode)">{{scope.row.refrenceBranchName}}<span v-if="scope.row.refrenceBranchTags">({{scope.row.refrenceBranchTags}})</span></el-button>
                </template>
            </el-table-column>
            <el-table-column prop="projectName" label="项目名称" min-width="150" show-overflow-tooltip></el-table-column>
            <el-table-column prop="goodsName" label="活动项目" min-width="150" show-overflow-tooltip></el-table-column>

            <el-table-column prop="orderAmount" label="订单金额" min-width="90" align="right" >
                <template slot-scope="scope">
                    <span v-if="scope.row.orderAmount"> ￥{{scope.row.orderAmount.toQFW()}}</span>
                    <span v-else> ￥0</span>
                </template>
            </el-table-column>
            <el-table-column prop="realAmount" label="已支付" min-width="90" align="right" >
                <template slot-scope="scope">
                    <span v-if="scope.row.realAmount">￥{{scope.row.realAmount.toQFW()}}</span>
                    <span v-else>￥0</span>
                </template>
            </el-table-column>

            <el-table-column label="付款状态" width="90">
                <template slot-scope="scope">
                    <div v-if="scope.row.approveState !=6&&scope.row.approveState!=10">
                         <el-tag type="success" v-if="scope.row.isPayOff==true">已付清</el-tag>
                        <el-tag type="warning" v-else>未付清</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="commandState" label="执行状态" min-width="150">
                <template slot-scope="scope">
                    <div style="width: 80px;float: left">
                        <el-tag type="gray" v-if="scope.row.commandState == 0">未执行</el-tag>
                        <el-tag type="warning" v-if="scope.row.commandState == 1">执行中</el-tag>
                        <el-tag type="success" v-if="scope.row.commandState == 2">执行完毕</el-tag>
                    </div>
                    <div style="float: left" v-if="scope.row.isPayOff==true">
                        <span v-if="scope.row.currentCourse">{{scope.row.currentCourse}}</span>
                        <span v-else>0</span>
                        <span v-if="scope.row.course">/{{scope.row.course}}</span>
                    </div>
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
        <el-dialog ref="pay" title="查看详情" :visible.sync="ispopRead" top="5%" @close="ispopRead=false" size="">
            <pop-read v-if="ispopRead" :data="selectData" style="width:950px"></pop-read>
        </el-dialog>

        <el-dialog title="客户详情" :visible.sync="dialogView"  top="5%"  size="" :close-on-click-modal="false">
            <CustomerView :mes="cusMes" style="width: 1100px"  v-if="dialogView"></CustomerView>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
import PopRead from '@/page/FinanceManage/ReportManage/com/reportRead.vue'
import CustomerView from "@/page/FinanceManage/ReportManage/com/customerDetail.vue"
    import "@/style/selfCommon.less"
    import Export from '@/components/export'
    import {AppGoodsConsumeSet,GetGoodsByKeywords,SearchAppActivityBenefit,getBaseDataByCode} from "@/api/myData"
    import { getCookie, getStore } from '../../../config/mUtils';
    import Vue from 'vue'
    Vue.component('my-item-transPro', {
        functional: true,
        render: function(h, ctx) {
            var item = ctx.props.item;
            return h('div', ctx.data, [
                h('p', { attrs: { class: 'select_name', title: item.Name } }, ['名称：' + item.Name]),
            ]);
        },
        props: {
            item: { type: Object, required: true }
        }
    });
    let _this
    export default {
        // name:"projectOrder",
        data () {
            return {
                ispopRead:false,
                cusMes:{},
                dialogView:false,
                tableLoading:false,
                formInline:{
                    projectId:'',
                    type:'2',
                    isOFO:'',
                },
                tableData:[],
                currentPage:1,
                size:10,
                total:0,
                allData:[],
                project:'',
                projectList:[],
                consumeList:[],
                medicalList:[],
                sumData:{
                    orderAmount:0,
                    baDanCount:0,
                },
                selectData:{}
            }
        },
        computed: {
            /* 导出报表参数 tHeader,filterVal,tableData1*/
            tHeader(){
                return ['订单编号', '订单日期', '纸质单号', '客户', '推荐人', '项目名称', '订单金额', '已支付', '付款状态', '疗程', '已执行', '执行状态', '订单类型']
            },
            filterVal(){
                return ['fxCode', 'createOn', 'formNO', 'customerName', 'refrenceBranchName', 'projectName', 'orderAmount', 'realAmount', 'isPayOff', 'course','currentCourse','commandState','orderType']
            },
            tableData1(){
                let data = JSON.parse(JSON.stringify(this.allData))
                return data
            },
            name(){
                return '订单转化'
            },
            /*导出报表参数 tHeader,filterVal,tableData1*/
        },
        watch:{
            'project':{
                handler(curVal,oldVal){
                    if(curVal == ''){
                        this.formInline.projectId = ''
                    }
                }
            }
        },
        filters:{
            filFun(val){
                let len = _this.consumeList.length
                let list =  _this.consumeList
                for(var i = 0;i<len;i++){
                    if(val == list[i].DataCode){
                        return list[i].DataName
                    }
                }
            },
            filFunM(val){
                let len = _this.medicalList.length
                let list =  _this.medicalList
                for(var i = 0;i<len;i++){
                    if(val == list[i].DataCode){
                        return list[i].DataName
                    }
                }
            },
        },
        mounted(){
            _this = this
            this.getType()
        },
        methods: {
             getSummaries(param) {

                return ['总计','','','','','','','','','','',this.sumData.orderAmount,this.sumData.realAmount];
            },
            async getType(){
                let [consumeList,medicalList] = await Promise.all([getBaseDataByCode("0017"),getBaseDataByCode("0022")])
                this.consumeList = consumeList
                this.medicalList = medicalList
            },
            async queryPro(queryString, cb) {
                this.projectList = []
                if (queryString !== '' && queryString != undefined) {
                    let res = await AppGoodsConsumeSet({ "keywords": queryString.removeSP(), isMall:0 })
                    this.getProject(res)
                }
                this.formInline.projectId = ""
                let _this = this
                clearTimeout(this.timeout)
                this.timeout = setTimeout(() => {
                    cb(_this.projectList)
                }, 100)
            },
            getProject(res) {
                let arr = []
                if (res.data instanceof Array && res.data.length > 0) {
                    for (let item of res.data) {
                        arr.push({
                            value: item.goodsName,
                            code: item.goodsId,
                            Name: item.goodsName,
                        })
                    }
                }
                this.projectList = arr
            },
            selectPro(item) {
                this.formInline.projectId = item.code
            },

            exportData(){
                this.getProofOrder({
                    'pageIndex': 1,
                    'pageSize': this.total,
                    "goodsId": this.formInline.projectId,
                    "typeId": 2,
                    'isOFO':this.formInline.isOFO
                },1)
            },

            submit(){
                this.pageIndex = 1
                this.search()
            },
            async getProofOrder(params,ope){
                try {
                    this.tableLoading = true
                    let res = await SearchAppActivityBenefit(params)
                    if(ope){
                        this.allData = res.data
                        this.$refs.exportCom.handleDownload()
                    }else{
                        this.total = res.count
                        this.tableData =res.data
                        this.sumData = res.sumdata[0]
                    }
                    this.tableLoading = false
                } catch (err) {
                    console.log(err)
                }
            },

            onSubmit(){
                this.currentPage = 1
                this.search()
            },
            search(){

                this.getProofOrder({
                    'pageIndex': this.currentPage,
                    'pageSize': this.size,
                    "goodsId": this.formInline.projectId,
                    "typeId": 2,
                    'isOFO':this.formInline.isOFO
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
            view(code){//
                this.cusMes = {
                    CustomerId:code
                }
                this.dialogView = true
            },
             read(index) {
                this.selectData = this.tableData[index]
                this.ispopRead = true
            }
        },
        components: {
            Export,CustomerView,PopRead
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
