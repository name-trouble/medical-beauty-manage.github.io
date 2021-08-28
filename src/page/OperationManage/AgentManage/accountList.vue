<template>
    <div class="rechargeList selCommon">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" >
             <el-form-item label="注册时间：" class="form_item_mt10"  label-width="80px">
                <el-date-picker  v-model="date"  type="daterange"  @change="dateSelect"  style="width: 200px" placeholder="选择日期范围"> </el-date-picker>
            </el-form-item> 
            <el-form-item label="消费商：" class="form_item_mt10" label-width="80px">
                <el-input v-model="formInline.keyWords" style="width: 200px;" placeholder="姓名/编号/卡号/手机号"  v-on:keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            <el-form-item label="医院：" class="form_item_mt10"  label-width="80px">
                <el-select v-model="formInline.hospital"  style='width:200px;' @change="onSubmit">
                    <el-option v-for="(item,index) in hospitalList" :key="index" :label="item.supplierName" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
           
            <el-form-item label="代理等级：" class="form_item_mt10"  label-width="80px">
                <el-select v-model="formInline.grade" placeholder="请选择" style='width:200px;' @change="onSubmit">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in gradeList" :label="item.BranchGradeName" :value="item.Code"
                               :key="item.Code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label=" " class="form_item_mt10">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
            </el-form-item>
        </el-form>
        <!-- 信息表 -->
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" class="min_table smt" v-loading="loading" :summary-method="getSummaries" show-summary>
            <el-table-column prop="branchName" label="代理商" min-width="100">
                <template slot-scope="scope">
                    <span v-if="scope.row.branchName">{{scope.row.branchName}}[{{scope.row.branchCode}}]</span>
                </template>
            </el-table-column>
            <el-table-column prop="branchGradeName" label="代理商等级" min-width="100"></el-table-column>
            <el-table-column prop="hospitalName" label="医院" min-width="100"></el-table-column>
            <el-table-column prop="disCountTicketCount" label="折扣券余额" min-width="100">
                <template slot-scope="scope">
                    <span v-if="scope.row.disCountTicketCount==0">0</span>
                    <el-button type="text" v-else @click="getDet(scope.row,1,'折扣券')">{{scope.row.disCountTicketCount}}</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="entranceTicketCount" label="门票余额" min-width="100">
                <template slot-scope="scope">
                    <span v-if="scope.row.entranceTicketCount==0">0</span>
                    <el-button type="text" v-else  @click="getDet(scope.row,3,'门票')">{{scope.row.entranceTicketCount}}</el-button> 
                </template>
            </el-table-column>
            <el-table-column prop="cashTicketCount" label="现金券余额" min-width="100">
                <template slot-scope="scope">
                    <span v-if="scope.row.cashTicketCount==0">0</span>
                    <el-button type="text" v-else  @click="getDet(scope.row,2,'现金券')">{{scope.row.cashTicketCount}}</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="remainSystemPoints" label="医院积分" min-width="100">
                <template slot-scope="scope">
                    <span v-if="scope.row.remainSystemPoints==0">0</span>
                    <el-button type="text" v-else  @click="getListDet(scope.row,2,'医院积分流水')">{{scope.row.remainSystemPoints}}</el-button>
                </template>
            </el-table-column>
            <!-- 纹绣积分未开辟新字段  remainGoldCoin-->
            <el-table-column prop="remainGoldCoin" label="纹绣积分" min-width="100">
                <template slot-scope="scope">
                    <span v-if="scope.row.remainGoldCoin==0">0</span>
                    <el-button type="text" v-else  @click="getListDet(scope.row,3,'纹绣积分流水')">{{scope.row.remainGoldCoin}}</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="balances" label="APP积分" min-width="100">
                <template slot-scope="scope">
                    <span v-if="scope.row.balances==0">0</span>
                    <el-button type="text" v-else  @click="getAppDet(scope.row,2,'APP积分流水')">{{scope.row.balances}}</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="remainAmount" label="余额" min-width="100">
                <template slot-scope="scope">
                    <span v-if="scope.row.remainAmount==0">0</span>
                    <el-button type="text" v-else  @click="getListDet(scope.row,1,'余额流水')">{{scope.row.remainAmount}}</el-button>
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
        <el-dialog :title="title" :visible.sync="dialogFormVisible" size="">
            <div style="width:500px">
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane :label="title+'余额'" name="first"></el-tab-pane>
                    <el-tab-pane :label="'全部'+title" name="second"></el-tab-pane>
                </el-tabs>
            </div>
            <el-table :data="detData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" class="min_table smt" v-loading="loading">
                <el-table-column prop="tickInfoCode" label="券种编号" min-width="150"></el-table-column>
                <el-table-column prop="createOn" label="登记日期" min-width="100"></el-table-column>
                <el-table-column prop="createBy" label="登记人" min-width="100"></el-table-column>
                <el-table-column prop="tickName" label="券名称" min-width="150"></el-table-column>
                <el-table-column prop="hospitalName" label="数量" min-width="80"></el-table-column>
                <el-table-column prop="totalTimes" label="总次数" min-width="90"></el-table-column>
                <el-table-column prop="usedTimes" label="已用次数" min-width="90"></el-table-column>
                <!-- <el-table-column prop="hospitalName" label="有效期" min-width="150"></el-table-column> -->
            </el-table>
            <div class="block">
                <el-pagination
                    @size-change="handleSizeChange1"
                    @current-change="handleCurrentChange1"
                    :current-page="currentPage1"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="size1"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total1">
                </el-pagination>
            </div>
        </el-dialog>

        <el-dialog :title="listTitle" :visible.sync="dialogList"  size=''>
            <!-- 信息表 -->
            <div style="width:970px">
                <el-table :data="listData" border style="width: 950px;margin-top:15px;margin-bottom:10px;" height="350">
                    <el-table-column prop="createOn" label="充值日期" width="100">
                        <template slot-scope="scope">
                            <span v-if="scope.row.createOn">  {{scope.row.createOn.substring(0,10)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="fromBranchName" label="来源" min-width="70"></el-table-column>
                    <el-table-column prop="intoBranchName" label="转到" min-width="70"></el-table-column>
                    <el-table-column prop="fromBranchName" label="类型" width="70">
                        <template slot-scope="scope">
                            <span v-if="scope.row.payType == 1">预付款</span>
                            <span v-if="scope.row.payType == 2">医院积分</span>
                            <span v-if="scope.row.payType == 3">纹绣积分</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="spendAmount" label="金额" width="80"></el-table-column>
                    <el-table-column prop="isCommission" label="提成" width="60">
                        <template slot-scope="scope">
                            <span v-text="scope.row.isCommission == 1?'是':'否'"></span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="systemPoints" label="积分" min-width="80"></el-table-column>
                    <el-table-column prop="amount" label="预付款" width="80"></el-table-column>
                    <el-table-column prop="createBy" label="操作人" min-width="80"></el-table-column>
                    <el-table-column prop="memo" label="备注" min-width="120" show-overflow-tooltip=""></el-table-column>
                </el-table>
                共计：{{totalDetail}}条数据<br/>
            </div>
        </el-dialog>

        <el-dialog title="APP积分流水" v-model="appDialog" size="">
            <div class="dialogRecLi header">
                    <span class="li_header">积分获取时间</span>
                    <span class="li_header">金额</span>
                    <span class="li_header">积分来源</span>
                    <span class="li_header">描述</span>
            </div>
            <ul style="width:700px;max-height:600px;overflow:auto">
                <li v-for="(item,index) in dialogData"  :key="index"  class="dialogRecLi" :class="{'red':item.sourceType==5||item.sourceType==4}">
                    <span class="li_tb">{{item.createOn}}</span>
                    <span class="li_tb">{{item.sourceType==5||item.sourceType==4?'-':''}}{{item.quantity}}</span>
                    <span class="li_tb">{{item.friendMobile}}</span>
                    <span class="li_tb">{{item.description}}</span>
                </li>
            </ul>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import "@/style/selfCommon.less"
    import "@/page/FinanceManage/ReportManage/lib/report.less"
    import {GetBranchAccountAll,GetDropDownPermission,getBaseDataByCode,GetBranchGradeAll,GetBranchTicketDetail,GetAccountDetail,GetOnlinePointsRecords} from "@/api/myData"
    import { getCookie } from '@/config/mUtils'
    export default {
        data () {
            return {
                date:"",
                total: 0,
                size: 10,
                currentPage: 1,
                
                dialogData:[],
                appDialog:false,

                listTitle:'',
                totalDetail:0,
                listData:[],
                dialogList:false,

                total1: 0,
                size1: 10,
                currentPage1: 1,
                loading:false,
                dialog:false,
                title:'',
                activeName:'first',
                dialogFormVisible:false,
                formInline: {
                    date1:"",
                    date2:"",
                    type:"",
                    keyWords: "",
                    hospital:"",
                    payType:"",

                    grade:'',
                },
                startDate:"",
                endDate:"",
                tableData:[],

                detData:[],
                detDataAll:[],
                placeData:[],

                hospitalList:[],
                gradeList:[],

                sumdata:[],//合计数据

            }
        },
        mounted(){
            this.GetDropDownPermission()
        },
        methods: {

            getSummaries(param){
                return ['合计','','',this.sumdata[0].disCountTicketCount,this.sumdata[0].entranceTicketCount,this.sumdata[0].cashTicketCount,
                this.sumdata[0].remainSystemPoints,this.sumdata[0].remainGoldCoin,this.sumdata[0].balances,this.sumdata[0].remainAmount]
            },

            async getAppDet(data){
                this.appDialog = true
                let res1 = await GetOnlinePointsRecords({mobile: data.phoneNumber});
                this.dialogData = res1.data
            },

            async getListDet(data,ope,title){
                this.listData = []
                this.listTitle = title
                this.dialogList = true
                let res = await GetAccountDetail({
                    branchCode:data.branchCode,
                    startDate:'',
                    endDate:'',
                })
                let listData = res.data.filter(row=>{
                    if(row.payType == ope){
                        return row
                    }
                })
                this.listData = listData
            },
            handleClick(tab, event){
                // 
                // let isUsed = tab.index==0?false:true
                if(tab.index==0){
                    this.placeData = this.detDataAll.filter(row=>{
                        if(row.usedTimes != row.totalTimes){//剩余
                            return row
                        }
                    })
                }else{
                    this.placeData = JSON.parse(JSON.stringify(this.detDataAll))
                }
                this.currentPage1 = 1
                this.getPageData()
            },

            async GetBranchTicketDetail(params){
                let res = await GetBranchTicketDetail(params)
                this.total1 = res.count
                this.detDataAll = res.data
                this.handleClick({index:0})
            },
            getPageData(){
                this.detData = this.placeData.slice((this.currentPage1-1)*this.size1,this.currentPage1*this.size1)
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
          
             async GetDropDownPermission(params){
                let [payWayList,res,grade] = await Promise.all([getBaseDataByCode("0006"),GetDropDownPermission({typeId: 1}),GetBranchGradeAll()])
                this.payWayList = payWayList
                this.hospitalList = res.data
                this.gradeList = grade
                this.search()
            },
            
            async GetBranchAccountAll(params){
                try {
                    let res = await GetBranchAccountAll(params)
                        this.sumdata = res.sumdata
                        this.total = res.count
                        this.tableData = res.data
                        this.loading = false
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
                this.GetBranchAccountAll({
                    keyWords:this.formInline.keyWords.removeSP(),
                    hospitalCode:this.formInline.hospital,
                    pageIndex: this.currentPage,
                    pageSize: this.size,
                    startDate:this.formInline.date1,
                    endDate:this.formInline.date2,
                    GradeCode:this.formInline.grade,
                })
            },

            // 分页页面展示数据条数改变触发事件
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.size = val
                this.search()
            },

            // 分页当前页码改变触发事件
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val
                this.search()
            },


            handleSizeChange1(val) {
                console.log(`每页 ${val} 条`);
                this.size1 = val
                
                this.getPageData()
            },

            // 分页当前页码改变触发事件
            handleCurrentChange1(val) {
                console.log(`当前页: ${val}`);
                this.currentPage1 = val
                this.getPageData()
            },

            async getDet(data,ope,title){
                this.title = title
                this.dialogFormVisible = true
                this.activeName = 'first'
                this.placeData = []
                this.GetBranchTicketDetail({
                    BranchCode:data.branchCode,
                    TicketsType:ope
                })

            }
         
        },
        components: {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dialogRecLi{
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    display: flex;
    background: #c9ecc9;
}
.dialogRecLi.header{
    background: #dfe6ec;
}
.li_header,.li_tb{
    flex: 1;
}
.li_tb{
    border-bottom: 1px solid #f9f9f9;
}
.dialogRecLi.red{
    background:#ecaeae
}
</style>
