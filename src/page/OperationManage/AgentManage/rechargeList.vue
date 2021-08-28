<template>
    <div class="rechargeList selCommon">
        <el-form :inline="true" :model="form" class="demo-form-inline form_search" >
            <el-form-item label="关键字：" class="form_item_mt10" label-width="80px">
                <el-input v-model="form.keyWords" style="width: 200px;" placeholder="姓名/编号/卡号/手机号"  v-on:keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            <el-form-item label="医院：" class="form_item_mt10"  label-width="80px">
                <el-select v-model="form.hospital"  style='width:200px;' @change="onSubmit">
                    <el-option v-for="(item,index) in hospitalList" :key="index" :label="item.supplierName" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="充值时间：" class="form_item_mt10"  label-width="80px">
                <el-date-picker  v-model="date"  type="daterange"  @change="dateSelect"  style="width: 200px" placeholder="选择日期范围"> </el-date-picker>
            </el-form-item>
            <el-form-item label="类型：" class="form_item_mt10"  label-width="80px">
                <el-select v-model="form.payType"  style='width:200px;' @change="onSubmit">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="预付款" value="1"></el-option>
                    <el-option label="医院积分" value="2"></el-option>
                    <!--<el-option label="纹绣积分" value="3"></el-option>-->
                    <!--<el-option label="皮肤科积分" value="4"></el-option>-->
                    <!--<el-option label="至尊VIP" value="5"></el-option>-->
                    <el-option label="APP积分" value="6"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态：" class="form_item_mt10"  label-width="80px">
                <el-select v-model="form.isFrozen"  style='width:200px;' @change="onSubmit">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="未冻结" value="0"></el-option>
                    <el-option label="已冻结" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label=" " class="form_item_mt10">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
                <el-button @click="add" class="searchBtn">账户充值</el-button>
                <el-button @click="exportEX" class="searchBtn" :loading="portLoading">导出报表</el-button>
                <Export :tHeader="tHeader" ref="export" :filterVal=' filterVal' :tableData1='reportData' :name='reportName' v-show="false"></Export>
            </el-form-item>
        </el-form>
        <!-- 信息表 -->
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" class="min_table smt" v-loading="loading">
            <el-table-column prop="branchName" label="账户" min-width="150">
                <template slot-scope="scope">
                    <span v-if="scope.row.branchName">{{scope.row.branchName}}[{{scope.row.branchCode}}]</span>
                </template>
            </el-table-column>
            <el-table-column prop="hospitalName" label="医院" min-width="150"></el-table-column>
            <el-table-column prop="remainSystemPoints" label="医院积分" min-width="80"></el-table-column>
            <!-- 纹绣积分未开辟新字段  remainGoldCoin-->
            <!--<el-table-column prop="remainGoldCoin" label="纹绣积分" min-width="80"></el-table-column>-->
            <el-table-column prop="balances" label="APP积分" min-width="80"></el-table-column>
            <!--<el-table-column prop="skinRemainAmount" label="皮肤科积分" min-width="80"></el-table-column>-->
            <!--<el-table-column prop="vipRemainPoints" label="至尊VIP" min-width="80"></el-table-column>-->
            <el-table-column prop="remainAmount" label="预付款" min-width="80"></el-table-column>
            <el-table-column prop="createOn" label="最近充值日期" min-width="150">
                <template slot-scope="scope">
                    <span v-if="scope.row.modifiedOn">{{scope.row.modifiedOn.substring(0,10)}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="createOn" label="冻结状态" min-width="100">
                <template slot-scope="scope">
                    <el-tag type="success" v-if="!scope.row.isFrozen">未冻结</el-tag>
                    <el-tag type="danger" v-else>已冻结</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="view(scope.$index,tableData)" >查看流水</el-button>
                    <el-button v-if="!scope.row.isFrozen" type="primary" size="small" @click="frozen(scope.row,'冻结','1')" >冻结</el-button>
                    <el-button v-else type="primary" size="small" @click="frozen(scope.row,'解冻','0')" >解冻</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 信息表 -->
        <!-- 分页 -->
        <div class="">
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
        <el-dialog title="充值" :visible.sync="dialogFormVisible" size=''>
            <el-form :model="formLine" :rules="rules" v-bind:style="{ 'width': width + 'px' }" ref="formLine" label-width="100px">
                <el-form-item label="充值账户：" class="form_item_mt0" prop="memberCode">
                     <el-autocomplete v-model="customer" :fetch-suggestions="queryCus" placeholder="请输入内容" :trigger-on-focus="false" @select="selectCus" style="width:260px;float:none;margin-right:5px">
                         <template v-slot="{item}">
                             <my-item-transMember :item="item"></my-item-transMember>
                         </template>
                     </el-autocomplete>
                </el-form-item>
                <el-form-item label="金额：" class="form_item_mt0" prop="money">
                    <el-input-number v-model="formLine.money" :controls="false"
                                     class="form_item_ipt_60" style="float: none;width: 260px"></el-input-number>
                </el-form-item>
                <el-form-item label="类型：" class="form_item_mt0" prop="money">
                    <el-radio class="radio" v-model="formLine.type" label="1">预付款</el-radio>
                    <el-radio class="radio" v-model="formLine.type" label="2">医院积分</el-radio>
                    <!--<el-radio class="radio" v-model="formLine.type" label="3">纹绣积分</el-radio>-->
                    <!--<el-radio class="radio" v-model="formLine.type" label="4">皮肤科积分</el-radio>-->
                    <!--<el-radio class="radio" v-model="formLine.type" label="5">至尊VIP</el-radio>-->
                </el-form-item>
                <el-form-item label="是否提成：" class="form_item_mt0" v-if="formLine.type==2">
                    <el-radio class="radio" v-model="formLine.isM" label="0">否</el-radio>
                    <el-radio class="radio" v-model="formLine.isM" label="1">是</el-radio>
                </el-form-item>
                <el-form-item label="提成日期：" class="form_item_mt0" v-if="formLine.isM == 1" >
                    <!--<el-select v-model="formLine.year" placeholder="选择年份" style="width:150px;float:left">-->
                        <!--<el-option v-for="(item,index) in yearList" :key="index" :label="item" :value="item"></el-option>-->
                    <!--</el-select>-->
                    <!--<el-select v-model="formLine.month" placeholder="选择月份" style="width:150px;float:left">-->
                        <!--<el-option v-for="(item,index) in monthList" :key="index" :label="item" :value="item"></el-option>-->
                    <!--</el-select>-->
                    <el-date-picker v-model="rechargeDate" type="date"></el-date-picker>
                </el-form-item>
                <el-form-item label="图片" class="form_item_mt10" >
                    <el-upload
                        :accept="acceptImage"
                        :action="uploadUrl"
                        list-type="picture-card"
                        :file-list="fileList"
                        :on-preview="handlePictureCardPreview"
                        :on-success="onSuccess"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="备注：" class="form_item_mt10">
                    <el-input type="textarea" v-model="formLine.memo"  class="form_item_ipt_60" style="float: none;width: 260px"></el-input>
                </el-form-item>

                <el-form-item label="积分" class="form_item_mt10" prop="integral" v-if="formLine.type != 1">
                    <el-input-number v-model="formLine.integral" :controls="false" :debounce="debounce"
                                     class="form_item_ipt_60" style="float: none;width: 260px"></el-input-number>
                </el-form-item>
                <el-form-item label="支付信息：" class="form_item_mt0"></el-form-item>
                <el-form-item label=" " class="form_item_mt0" label-width="40px">
                    <el-table ref="singleTable" :data="payTable" border style="width: 800px">
                        <el-table-column prop="PayTypeName" min-width="100" label="支付方式"></el-table-column>
                        <el-table-column prop="ReceiveAccount" label="收款账户" min-width="100"></el-table-column>
                        <el-table-column prop="RealAmount" label="实际金额" min-width="80">
                            <template slot-scope="scope">
                                {{scope.row.RealAmount.toQFW()}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="ProcFee" label="手续费" min-width="80"></el-table-column>
                        <el-table-column prop="PayDate" label="收款时间" min-width="100"></el-table-column>
                        <el-table-column prop="ReceiveBranchName" label="医院（销售公司）" min-width="120"></el-table-column>
                        <el-table-column prop="Memo" label="备注" min-width="100"></el-table-column>
                        <el-table-column prop="" label="操作" min-width="100">
                            <template slot-scope="scope">
                                <el-button @click="deleteRow(scope.$index,payTable)" size="small">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div>支付金额：{{payAmount}}</div>
                    <el-button type="success" @click="addPay('form')" style="margin-top: 10px" size="small">添加支付信息</el-button>
                </el-form-item>
            </el-form>
            <div class="footer_ope">
                <!-- 提成类型必须添加支付信息才可以保存 -->
                <el-button @click="save('formLine')" type="primary" :loading="saveLoading" :disabled="payTable.length==0&&formLine.isM == 1&&formLine.type==2">保存</el-button>
                <el-button @click="cancel('formLine')">取消</el-button>
            </div>
        </el-dialog>
        <el-dialog title="变更流水" :visible.sync="dialogFormVisible1" size='' @close='dialogClose'>
            <!-- 信息表 -->
            <div style="width:970px">
                <span style="float: left;line-height: 46px;"> 账户：{{name}}</span>
                <span style="float: left;line-height: 46px;margin-left:10px">日期：</span>
                <el-date-picker v-model="value1" type="daterange" @change="dateChange" placeholder="选择日期范围"> </el-date-picker>
                <el-button @click="detailSearch" class="searchBtn">搜索</el-button>
                <el-button @click="report">导出报表</el-button>
                <el-table :data="tableData1" border style="width: 950px;margin-top:15px;margin-bottom:10px;" height="250">
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
                            <span v-if="scope.row.payType == 4">皮肤科积分</span>
                            <span v-if="scope.row.payType == 5">至尊VIP</span>
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
                    <el-table-column prop="multiple" label="查看凭证" width="80">
                        <template slot-scope="scope">
                            <el-button @click="viewList(scope.row)" type="text" >查看凭证</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="memo" label="备注" min-width="120" show-overflow-tooltip=""></el-table-column>
                </el-table>
                共计：{{totalDetail}}条数据<br/>
                <span>医院收款：</span>
                <el-table :data="hosTable" border style="width: 950px;margin-top:15px;margin-bottom:10px;" max-height="250">
                    <el-table-column prop="payType" min-width="100" label="支付方式">
                        <template slot-scope="scope">
                            <span>{{scope.row.payType|filterFun}}</span>
                        </template>
                    </el-table-column>
                        <el-table-column prop="receiveAccount" label="收款账户" min-width="100"></el-table-column>
                        <el-table-column prop="realAmount" label="实际金额" min-width="100">
                            <template slot-scope="scope">
                                {{scope.row.realAmount.toQFW()}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="payDate" label="收款时间" min-width="100"></el-table-column>
                        <el-table-column prop="receiveBranchName" label="医院（销售公司）" min-width="100"></el-table-column>
                        <el-table-column prop="memo" label="备注" min-width="100"></el-table-column>
                </el-table>
                <span>销售公司收款：</span>
                <el-table :data="branchTable" border style="width: 950px;margin-top:15px;margin-bottom:10px;" max-height="250">
                    <el-table-column prop="payType" min-width="100" label="支付方式">
                        <template slot-scope="scope">
                            <span>{{scope.row.payType|filterFun}}</span>
                        </template>
                    </el-table-column>
                        <el-table-column prop="receiveAccount" label="收款账户" min-width="100"></el-table-column>
                        <el-table-column prop="realAmount" label="实际金额" min-width="80">
                            <template slot-scope="scope">
                                {{scope.row.realAmount.toQFW()}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="procFee" label="手续费" min-width="80"></el-table-column>
                        <el-table-column prop="payDate" label="收款时间" min-width="100"></el-table-column>
                        <el-table-column prop="receiveBranchName" label="医院（销售公司）" min-width="120"></el-table-column>
                        <el-table-column prop="memo" label="备注" min-width="100" show-overflow-tooltip></el-table-column>
                </el-table>

            </div>
        </el-dialog>
        <el-dialog title="添加支付信息" :visible.sync="dialogTableVisible1"  size="">
            <pay @payOpe="payOpe" v-if="dialogTableVisible1" style="width: 380px" :editMes="editMes" :dialogTableVisible1="dialogTableVisible1" :isHos="isHos"></pay>
        </el-dialog>
        <el-dialog title="查看凭证" v-model="imgView" size="">
            <div style="min-width:600px">
                <el-upload
                        :accept="acceptImage"
                        :action="uploadUrl"
                        list-type="picture-card"
                        :file-list="fileList"
                        :on-preview="handlePictureCardPreview"
                        :on-success="onSuccess"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
            </div>
            <div class="form_footer">
                <el-button type="primary" @click="editImg">确定</el-button>
                <el-button @click="imgView = false">取消</el-button>
            </div>
        </el-dialog>
        <!-- 凭证预览 -->
        <el-dialog v-model="dialogVisible" size="">
            <img width="600px" :src="dialogImageUrl" alt="">
        </el-dialog>

        <el-dialog title="APP积分流水" v-model="appDialog" size="">
            <hisList></hisList>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import "@/style/selfCommon.less"
    import Export from '@/components/export'
    import "@/page/FinanceManage/ReportManage/lib/report.less"
    import { xmxUrl, baseImgPath } from '@/config/env'
    import { imgApi, acceptImage } from '@/config/common'
    let uploadUrl = xmxUrl + imgApi + '?op=prooforder'
    import {AddAccount,GetUserAccount,GetAccountDetail,GetUserAllByKeywords2,GetUserAccountByCode,GetDropDownPermission,DelImg,ModifyUserAccountImgUrl,SetUserAccountFrozen,
    GetHospitalChargePay,GetBranchChargePay,getBaseDataByCode} from "@/api/myData"
    import { getCookie } from '@/config/mUtils'
    import pay from "./components/pay"
    import hisList from "./components/hisList.vue"
    import Vue from 'vue'
     Vue.component('my-item-transMember', {
        functional: true,
        render: function(h, ctx) {
            var item = ctx.props.item;
            return h('div', ctx.data, [
                h('p', { attrs: { class: 'select_name'+item.Type, title: item.name } }, ['名字：' + item.name]),
                h('p', { attrs: { class: 'select_name'+item.Type, title: item.name} }, ['编号：' + item.code]),
                h('p', { attrs: { class: 'select_name'+item.Type, title: item.name} }, ['手机号：' + item.phone]),
                h('p', { attrs: { class: 'select_name'+item.Type, title: item.name} }, ['卡号：' + item.CardNO]),
                h('p', { attrs: { class: 'select_name'+item.Type, title: item.HospitalName} }, ['医院：' + item.HospitalName]),
            ]);
        },
        props: {
            item: { type: Object, required: true }
        }
    });
    var _this
    export default {
        data () {
            return {
                imgList:[],
                imgView:false,
                appDialog:false,
                uploadUrl,
                acceptImage,
                baseImgPath,
                dialogVisible:false,
                dialogImageUrl:"",
                fileList:[],
                portLoading:false,
                saveLoading:false,
                editMes:{},
                debounce:1000,
                date:"",
                isHos:true,//判断医院账户或销售公司账户 选择预付款为医院 积分为否
                payTable:[],
                customer:"",
                customerList:[],
                total: 0,
                size: 10,
                currentPage: 1,
                referList: [],
                loading:false,
                dialogFormVisible:false,
                dialogFormVisible1:false,
                dialogTableVisible1:false,
                rechargeDate: new Date(),
                name:"",
                form: {
                    date1:"",
                    date2:"",
                    type:"",
                    keyWords: "",
                    hospital:"",
                    payType:"",
                    isFrozen:'',
                },
                formLine:{
                    date1:"",
                    date2:"",
                    memberCode:"",
                    memberName:"",
                    amount:"",
                    memo:"",
                    multiple:1,
                    money:0,
                    integral:0,
                    type:"1",
                    isM:"0",
                    CMdate:"",
                    year:new Date().getFullYear(),
                    month:'',

                },
                width:850,
                value1:"",
                startDate:"",
                endDate:"",
                totalDetail:0,
                tableData:[],
                tableData1:[],
                hospitalList:[],
                yearList:[],
                monthList:[],
                month:"",
                hosTable:[],
                branchTable:[],
                rules: {
                    memberCode: [
                        {required: true, message: '请选择', trigger: 'change'}
                    ],
                    amount: [
                        {required: true, message: '请输入'}
                    ],
                     CMdate: [
                        { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                    ],
                },
                payWayList:[],
                portData:[],
                imgId:"",//编辑凭证的流水Id
            }
        },
        filters: {
            filterFun(val){
                let name
                _this.payWayList.forEach(row=>{
                    if(val == row.DataCode){
                        name = row.DataName
                    }
                })
                return name
            }
        },
        watch:{
            "formLine.type":{
                handler(curVal,oldVal){
                    if(curVal == 1){
                        this.isHos = true
                    }else{
                        this.isHos = false
                    }
                    this.payTable = []
                    this.formLine.isM = "0"
                },
                deep:true
            },
            "formLine.money":{
                handler(curVal,oldVal){
                   this.formLine.integral = curVal
                },
                deep:true
            },
        },
        computed: {
            /* 导出报表参数 tHeader,filterVal,tableData2*/
            tHeader(){
                if(this.tableData1.length>0){
                    return ['充值日期','来源','转到','类型',  '金额', '提成', '积分','预付款','操作人']
                }else{
                    return ['账户','医院','医院积分','纹绣积分','APP积分','余额', '最近充值日期','冻结状态']
                }
            },
            filterVal(){
                if(this.tableData1.length>0){
                    return ['createOn','fromBranchName','intoBranchName','payType','spendAmount','isCommission','systemPoints','amount','createBy']
                }else{
                    return ['branchName','hospitalName','remainSystemPoints' , 'remainGoldCoin', 'balances', 'remainAmount', 'createOn' ,'isFrozen']
                }
            },
            reportData(){
                if(this.tableData1.length>0){
                    let arr = JSON.parse(JSON.stringify(this.tableData1))
                    arr.forEach(ele=>{
                        ele.payType = this.getType(ele.payType)
                        ele.isCommission = ele.isCommission?'是':'否'
                    })
                    return arr
                }else{
                    let arr = JSON.parse(JSON.stringify(this.portData))
                    arr.forEach(ele=>{
                        ele.isFrozen = ele.isFrozen?'是':'否'
                    })
                    return arr
                }
            },
            reportName(){
                return '积分充值'
            },
            payAmount(){
                let amount = 0
                this.payTable.forEach(ele=>{
                    amount+=ele.RealAmount
                })
                return amount
            },
            /*导出报表参数 tHeader,filterVal,reportData*/
        },
        mounted(){
            _this = this
            this.GetDropDownPermission()
            this.getBaseDate()
        },
        methods: {
            frozen(data,ope,status){
                this.$confirm('此操作将冻结该账户积分, 冻结后积分无法使用，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.SetUserAccountFrozen({
                        branchCode:data.branchCode,
                        isFrozen:status,
                    },ope)
                })
            },
            async SetUserAccountFrozen(params,ope){
                let res = await SetUserAccountFrozen(params)
                if(res.status){
                    this.$message({message: ope+'成功', type: 'success'});
                    this.search()
                }else{
                    this.$message.error(ope+'失败');
                }
            },

            getType(val){
                switch(val){
                    case 1: return '预付款';break;
                    case 2: return '医院积分' ;break;
                    case 3: return '纹绣积分' ;break;
                    case 4: return '皮肤科积分'; break;
                    case 5: return '至尊VIP'; break;
                    case 6: return 'app积分'; break;
                }
            },
            dialogClose(){
                this.tableData1 = []
            },
            report(){
                this.$refs.export.handleDownload()
            },
            async viewhis(data){
                this.appDialog = true
            },
            async editImg(){//编辑凭证
                let res = await ModifyUserAccountImgUrl({
                    id:this.imgId,
                    imgUrl:this.getUrl(this.fileList)
                })
                if(res.status){
                    this.$message({message: '编辑成功', type: 'success'});
                    this.detailSearch()
                    this.imgView = false
                }else{
                    this.$message.error('编辑失败');
                }
            },
            viewList(data){
                // scope.row.imgUrl
                this.imgId = data.id
                this.fileList = []
                let list = data.imgUrl?data.imgUrl.split("#"):[]
                list.forEach(ele=>{
                    this.fileList.push({
                        url:baseImgPath+ele,
                        response:ele
                    })
                })
                // this.imgList = img.split("#")
                this.imgView = true
            },
            async DelImg(filepath){
                let res = await DelImg({filepath:filepath})
                if(!res.status){
                    this.$message({message: '原图片删除失败！'+res.errorMessage,type: 'warning'});
                }
            },
            onSuccess(response, file, fileList){

                this.fileList = fileList
            },
            handleRemove(file, fileList) {
                if(file.response){
                    this.DelImg(file.response)
                }
                this.fileList = fileList
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            dateSelect(val){
                if(val.length!=0){
                    val = val.formatDates()
                    this.form.date1 = val.substring(0,10)
                    this.form.date2 = val.substring(13)
                }else{
                    this.form.date1 = ""
                    this.form.date2 = ""
                }
            },
            getBaseDate(){
                this.yearList = [new Date().getFullYear()+1,new Date().getFullYear(),new Date().getFullYear()-1,new Date().getFullYear()-2]
                for(let i = 1 ;i<13;i++){
                    if(i<10){
                        this.monthList.push("0"+i)
                    }else{
                        this.monthList.push(i)
                    }
                }
                let m = new Date().getMonth()+1
                if(m>9){
                    this.formLine.month = m
                }else{
                    this.formLine.month = '0'+m
                }
                this.month = this.formLine.month
            },
            payOpe(val){
                if(val.PayType){
                    this.payTable.push(JSON.parse(JSON.stringify(val)))
                }
                this.dialogTableVisible1 = false
            },
            getMember(res) {
                // let res = await GetUserAllByKeywords2({ 'keywords': str.removeSP()})
                if (res instanceof Array && res.length > 0) {
                    for (let item of res) {
                        this.customerList.push({
                            value: '(' + item["Code"] + ')' + item["MemberName"],
                            phone: item["PhoneNumber"],
                            code: item["Code"],
                            name: item["MemberName"],
                            referrerCode: item['ReferrerCode'],
                            referrerName: item['ReferrerName'],
                            Type:item.Type == 1?"black":"red",
                            CardNO:item["CardNO"]?item["CardNO"]:"",
                            HospitalName:item.HospitalName
                        })
                    }
                }
            },

            //查找会员 下拉补全
            async queryCus(queryString, cb) {
                // queryString=enCode(queryString)
                this.customerList = []
                if (queryString !== '' && queryString != undefined) {
                    let res = await GetUserAllByKeywords2({ 'keywords': queryString.removeSP()})
                    this.getMember(res)
                }
                this.formLine.memberCode = ''
                this.formLine.memberName = ''
                let _this = this
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    cb(_this.customerList);
                }, 100);
            },

            //点击获取 会员信息  Oject
            selectCus(item) {
                this.formLine.memberCode = item.code
                this.formLine.memberName = item.name
            },

             async GetDropDownPermission(params){
                let [payWayList,res] = await Promise.all([getBaseDataByCode("0006"),GetDropDownPermission({typeId: 1})])
                this.payWayList = payWayList
                this.hospitalList = res.data
                this.search()
            },

            dateChange(val){
                if(val){
                    val = val.formatDates()
                    this.startDate = val.substring(0,10),
                    this.endDate = val.substring(13)
                }else{
                    this.startDate = val.substring(0,10),
                    this.endDate = val.substring(13)
                }
            },
            // 流水查询
            async GetAccountDetail(params){
                try {
                    let res = await GetAccountDetail(params)
                    let hos = await GetHospitalChargePay({BranchCode:params.branchCode})
                    let com = await GetBranchChargePay({BranchCode:params.branchCode})
                    this.hosTable = hos.data
                    this.branchTable = com.data
                    this.totalDetail = res.count
                    this.tableData1 = res.data
                } catch (err) {
                    console.log(err)
                }
            },
            async GetUserAccount(params,ope){
                try {
                    let res = await GetUserAccount(params)
                    if(ope){

                        this.portData = res.data
                        this.$refs.export.handleDownload()
                    }else{
                        this.total = res.count
                        this.tableData = res.data
                        this.loading = false
                    }
                    this.portLoading = false
                } catch (err) {
                    console.log(err)
                }
            },
            async AddAccount(params){
                try {
                    this.saveLoading = true
                    let res = await AddAccount(params)
                    if(res.success){
                        this.$message({message: '充值成功', type: 'success'});
                        this.dialogFormVisible = false

                        this.cancel("formLine")
                        this.search()
                    }else{
                        this.$message.error('充值失败');
                    }
                    this.saveLoading = false
                } catch (err) {
                    console.log(err)
                    this.$message.error('充值失败');
                }
            },
            onSubmit(){
                this.currentPage = 1
                this.search()
            },
            search(){
                this.loading = true
                this.GetUserAccount({
                    keyWords:this.form.keyWords.removeSP(),
                    hospitalCode:this.form.hospital,
                    pageIndex: this.currentPage,
                    pageSize: this.size,
                    startDate:this.form.date1,
                    endDate:this.form.date2,
                    payType:this.form.payType,
                    isFrozen:this.form.isFrozen,
                })
            },
            add(){
                this.payTable = []
                this.fileList = []
                this.dialogFormVisible = true
            },
            save(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let systemPoints = 0

                        let obj = {
                            fromBranchName:"系统",
                            fromBranchCode:0,
                            intoBranchCode:this.formLine.memberCode,
                            intoBranchName:this.formLine.memberName,
                            payType:this.formLine.type,
                            SpendAmount:this.formLine.money,
                            Multiple:this.formLine.multiple,
                            memo:this.formLine.memo,
                            createBy: getCookie("userName"),
                            createUserId: getCookie("userId"),
                            branchOrderPayList:JSON.stringify(this.getpayData(this.payTable)),
                            isCommission:this.formLine.isM,
                            commissionDate: this.rechargeDate.formatDate("yyyy-MM-dd"),
                            ImgUrl:this.getUrl(this.fileList),
                        }
                        //2是积分
                        if(this.formLine.type != 1){
                            obj.systemPoints = this.formLine.integral
                        }else{
                            obj.amount = this.formLine.money
                        }
                        // if(this.formLine.money==0){
                        //     this.$message.error('金额必须大于0！');
                        //     return false
                        // }
                        this.AddAccount(obj)
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            getUrl(data){
                let arr = []
                data.forEach(ele=>{
                    arr.push(ele.response)
                })
                return arr.join("#")
            },
            getpayData(data){
                if(this.formLine.type == 1){
                    let arr = []
                    data.forEach(row=>{
                        arr.push({
                            branchName:this.formLine.memberName,
                            branchCode:this.formLine.memberCode,
                            hospitalCode:row.ReceiveBranchCode,
                            hospitalName:row.ReceiveBranchName,
                            payDate:row.PayDate,
                            receiveAccount:row.ReceiveAccount,
                            payType:row.PayType,
                            payTypeName:row.PayTypeName,
                            realAmount:row.RealAmount,
                            Memo:row.Memo,
                            createBy:getCookie("userName"),
                            createUserId:getCookie("userId"),
                        })
                    })
                    return arr
                }else{
                    return data
                }
            },
            cancel(formName){
                this.$refs[formName].resetFields();
                this.dialogFormVisible = false
                this.fileList = []
                this.customer = ""
                this.formLine = {
                    memberCode:"",
                    memberName:"",
                    amount:"",
                    memo:"",
                    multiple:0,
                    money:0,
                    integral:0,
                    type:"1",
                    isM:"0",
                    CMdate:"",
                    year:new Date().getFullYear(),
                    month:this.month,
                }
            },
            //            搜索代理
            async GetUserAllByKeywords(params, index){
                try {
                    let res = await GetUserAllByKeywords(params)
                    this.referList = res
                } catch (err) {
                    console.log(err)
                }
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
            view(index,data){
                if(this.branchCode != data[index].branchCode){
                    this.value1 = ""
                    this.endDate = ""
                    this.startDate = ""
                    this.name = data[index].branchName
                    this.branchCode = data[index].branchCode
                }
                this.dialogFormVisible1 = true
                this.detailSearch()
            },
            detailSearch(){
                this.GetAccountDetail({
                    branchCode:this.branchCode,
                    startDate:this.startDate,
                    endDate:this.endDate,
                })
            },
            // 添加支付信息
            addPay(){
                 this.dialogTableVisible1 = true
            },
            deleteRow(index, data){
                data.splice(index, 1)
            },
            // 报表导出
            exportEX(){
                this.portLoading = true
                this.GetUserAccount({
                    keyWords:this.form.keyWords.removeSP(),
                    hospitalCode:this.form.hospital,
                    pageIndex:1,
                    pageSize: this.total,
                    startDate:this.form.date1,
                    endDate:this.form.date2,
                    payType:this.form.payType,
                    isFrozen:this.form.isFrozen,
                },'port')
            },
        },
        components: {
            Export,
            pay,
            hisList
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
