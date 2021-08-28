<template>
    <div style="margin:10px">
        <el-form :model="formData" ref="ruleForm" label-width="120px">
            <el-form-item label="分期信息：" class="form_item_mt10" v-if="stagePay.orderType == 3">
                 <span>总金额：{{stagePay.stageM}}</span>
                <span>总期数：{{stagePay.course}}</span> <span>已付期数：{{stagePay.currentC}}</span>
            </el-form-item>
            <el-form-item label="支付方式：" class="form_item_mt10" prop="PayType" :rules="[ { required: true, message: '不能为空'}]">
                <el-select v-model="formData.PayType" @change="seChange" style="width:300px;float:none">
                    <!-- 套餐为零禁选，线下订单禁选APP订金和app积分 -->
                    <el-option v-for="(item,$index) in payWays" :key="$index" :label="item.DataName" :value="item.DataCode"
                    :disabled="(item.DataCode=='010' && pagelist.length==0)||(orderType==2&&(item.DataCode=='021'||item.DataCode=='019'))"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="支付期数：" class="form_item_mt10"  v-if="stagePay.orderType == 3">
                <el-select v-model="formData.currentC" @change="courseChange" style="width:300px;float:none">
                    <el-option v-for="(item,index) in courseList" :key="index" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <!-- 普通卡券 -->
            <div v-if="formData.PayType=='008'">
                <el-form-item label="券号：" prop="TicketsCode" class="form_item_mt10">
                    <el-autocomplete
                        v-if="!scan"
                        popper-class="my-autocomplete"
                        v-model="formData.TicketsCode"
                        :fetch-suggestions="querySearch"
                        placeholder="请输入券号"
                        @select="handleSelect"
                        style="width:300px;"
                        icon="edit">
                        <template v-slot="{item}">
                            <my-item-pay :item="item"></my-item-pay>
                        </template>
                    </el-autocomplete>
                    <el-input v-model="formData.TicketsCode" @change="changeQH" style="width:300px" v-show="false"></el-input>

                    <!-- <el-input v-model="formData.TicketsCode" placeholder="点击获取焦点进行扫描" style="width:300px;float:none" @keydown="ticketScan($event)" v-if="scan"></el-input> -->
                    <input type="text" v-model="formData.TicketsCode" class="el-input__inner" placeholder="点击获取焦点进行扫描" @keydown="ticketScan($event)" v-if="scan">
                    <el-button @click="scan = !scan" size="small" type="primary" v-text="scan?'人工录入':'扫描券号'"></el-button>
                    <div style="color:red" v-if="scan">(扫码时请切换至英文输入法，中文输入可能导致无法正确扫码！)</div>
                </el-form-item>
                <el-form-item label="券抵扣金额：" prop="RealAmount" required class="form_item_mt10">
                    <el-input v-model="formData.RealAmount" style="width:300px;float:none"></el-input>
                </el-form-item>
                <el-form-item label=" " class="form_item_mt0 2" style="margin-top:-20px" v-if="Number(formData.RealAmount)>Number(price)">
                    <span style="color:red">支付金额已超额</span>
                </el-form-item>
            </div>

            <el-form-item label="积分余额：" class="form_item_mt10" v-if="formData.PayType == '009'||formData.PayType == '021'">
               <span v-if="formData.PayType == '009'"> 医院积分：{{jifen}},</span>
               <span v-if="formData.PayType == '009'"> 纹绣积分：{{wxjf}},</span>
               <span v-if="formData.PayType == '009'"> 皮肤科积分：{{SkinRemainAmount}},</span>
               <span v-if="formData.PayType == '009'"> 至尊VIP：{{VIPRemainPoints}},</span>
               <span v-if="formData.PayType == '021'"> app积分：{{jifenOnline}}</span>
               <span>{{Prompt}}</span>
            </el-form-item>
            <!-- 文秀积分由报单的规则类型限制 -->
            <el-form-item label="使用积分类型：" class="form_item_mt10" v-if="(formData.PayType == '009'||formData.PayType == '021')&&jfType!=3">
                <el-select style="width:300px" v-model="formData.typeId" placeholder="请选择" @change="jftypeChange">
                    <el-option label="医院积分" value="2" ></el-option>
                    <el-option label="皮肤科积分" value="4" ></el-option>
                    <el-option label="至尊VIP" value="5" ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="支付金额：" prop="RealAmount" class="form_item_mt10 1" :rules="[ { required: true, message: '不能为空'}]"
            v-if="formData.PayType!='008' &&  formData.PayType!='010' && formData.PayType!='011'&&formData.PayType!='020'&&formData.PayType!='019'">
                <el-input-number v-model="formData.RealAmount" style="width:300px;float:none;height:36px" :controls="false" :debounce="debounce"></el-input-number>
                <!-- 积分超额判断 -->
                <div v-if="formData.PayType == '009'&&Number(formData.RealAmount)>Number(jf)||formData.PayType == '021'&&Number(formData.RealAmount)>Number(jf)" style="color: red;line-height: 20px">积分超额</div>
            </el-form-item>
             <el-form-item label="" class="form_item_mt0 1"  style="margin-top:-15px"
             v-if="formData.PayType!='008' &&  formData.PayType!='010' && formData.PayType!='011'&& formData.PayType!='020'&&Number(formData.RealAmount)>Number(price)">
                <span style="color:red">支付金额已超额</span>
            </el-form-item>
            <el-form-item label="收款账户：" prop="RealAmount" class="form_item_mt10"
            v-if="formData.PayType!='008' &&  formData.PayType!='010' && formData.PayType!='011'&& formData.PayType!='001'&& formData.PayType!='009'&&
            formData.PayType!='018'&&formData.PayType!='020'&&formData.PayType!='021'&&formData.PayType!='019'">
                <el-select style="width:300px"
                    v-model="formData.ReceiveAccount"
                    filterable
                    allow-create
                    placeholder="请选择">
                    <el-option v-for="item in accountList" :label="item.shortName" :value="item.shortName" :key="item.shortName"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="预付款余额：" class="form_item_mt10" v-if="formData.PayType == '018'">
               {{RemainAmount}}
            </el-form-item>
            <!-- 套餐 -->
            <div v-if="formData.PayType=='010'">
                <el-form-item label="套餐券编号：" prop="TicketsCode" class="form_item_mt10" :rules="[ { required: true, message: '不能为空'}]">
                    <el-select v-model="formData.TicketsCode" @change="selectTicket" style="width:300px">
                        <el-option v-for="(item,index) in pagelist" :key="index" :label="item.TickName" :value="item.TickInfoCode"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="券抵扣金额：" prop="RealAmount" class="form_item_mt10" required>
                    <el-input v-model="formData.RealAmount" style="width:300px;float:none"></el-input>
                    <div v-if="ticekInfo.TicketsType==1">
                        折扣: {{ ticekInfo.Discount }}%
                    </div>
                    <div v-if="ticekInfo.TicketsType==2">
                        券面值: ￥{{ ticekInfo.FaceValue }}
                    </div>
                </el-form-item>
                <el-form-item label=" " class="form_item_mt0 3" style="margin-top:-20px" v-if="Number(formData.RealAmount)>Number(price)">
                    <span style="color:red">支付金额已超额</span>
                </el-form-item>
            </div>
            <!-- 门票 -->
            <div v-if="formData.PayType=='011'">
                <el-form-item label="门票券号：" prop="TicketsCode"  class="form_item_mt10"  >
                     <el-autocomplete
                        v-if="!scan"
                        popper-class="my-autocomplete"
                        v-model="formData.TicketsCode"
                        :fetch-suggestions="querySearch"
                        placeholder="请输入券号"
                        @select="handleSelectM"
                        style="width:300px"
                        icon="edit">
                         <template v-slot="{item}">
                             <my-item-pay :item="item"></my-item-pay>
                         </template>
                    </el-autocomplete>
                    <el-input v-model="formData.TicketsCode" @change="changeMP" style="width:300px" v-show="false"></el-input>

                    <input type="text" v-model="formData.TicketsCode" class="el-input__inner" placeholder="点击获取焦点进行扫描" @keydown="ticketScan($event)" v-if="scan">
                    <!-- <el-input v-model="formData.TicketsCode" placeholder="点击获取焦点进行扫描" style="width:300px;float:none" @keydown="ticketScan($event)" disabled="true" v-if="scan"></el-input> -->
                    <el-button @click="scan = !scan" size="small" type="primary" v-text="scan?'人工录入':'扫描券号'"></el-button>
                    <div style="color:red" v-if="scan">(扫码时请切换至英文输入法，中文输入可能导致无法正确扫码！)</div>
                </el-form-item>
                <el-form-item label="抵扣金额：" prop="RealAmount" class="form_item_mt10" required>
                    <el-input v-model="formData.RealAmount" style="width:300px;float:none"></el-input>
                </el-form-item>
                <el-form-item label=" " class="form_item_mt0 4" style="margin-top:0px" v-if="Number(formData.RealAmount)>Number(price)">
                    <span style="color:red">支付金额已超额</span>
                </el-form-item>
            </div>

            <!-- 线上支付卡券 -->
            <!-- 线上订金 线上卡券 -->
            <div v-if="formData.PayType=='020'||formData.PayType=='019'">
                <el-form-item label="扫描订单：" prop="OnlineOrderCheck" class="form_item_mt10" :rules="[ { required: true, message: '该订单无效'}]">
                    <input type="text" v-model="formData.OnlineOrderMes" class="el-input__inner" placeholder="使用扫描枪扫描订单或填写订单号回车查询" @keydown="change($event)">
                    <div>(扫码时请切换至英文输入法，中文输入可能导致无法正确扫码！)</div>
                </el-form-item>
                <el-form-item label=" " class="form_item_mt0" style="margin-top:-20px" v-if="formData.PayType=='020'">
                    <span>{{ticekInfo.TickName}}</span>
                </el-form-item>
                <el-form-item label="抵扣金额：" prop="RealAmount" class="form_item_mt10" required>
                    <!-- <el-input v-model="formData.RealAmount" style="width:300px;float:none"></el-input> -->
                    {{formData.RealAmount}}
                </el-form-item>
                <el-form-item label=" " class="form_item_mt0" style="margin-top:-20px" v-if="Number(formData.RealAmount)>Number(price)">
                    <span style="color:red">支付金额已超额</span>
                </el-form-item>
            </div>

             <el-form-item label="支付时间：" class="form_item_mt10">
                <el-date-picker type="date" placeholder="选择日期" v-model="PayDate" style="width: 300px;"></el-date-picker>
            </el-form-item>
           <el-form-item label="备注： " class="form_item_mt10">
                   <el-input type="textarea" :rows="3" v-model="formData.Memo" style="width:300px"></el-input>
            </el-form-item>

            <div class="" style="text-align:center">
                <el-button type="success" @click="save">确定 </el-button>
                <el-button @click="cancel" >取消 </el-button>
            </div>
        </el-form>
        <!-- <input id="shadowIpt" v-model="shadowIptVal" @keydown="ticketScan($event)"> -->
    </div>
</template>

<script type="text/ecmascript-6">
import { getTicketsInfoByTicketCode, getBaseDataByCode, GetPackageByCode, getTicketsInfo, TicketIsUsed,GetOrderInfoByCode,
        GetUserAccountByCode ,UpdateProofOrderPay,StageProofOrderPay,GetTicketsInfoByCode,GetPoints} from '@/api/myData'
import Vue from "vue"
import { getCookie } from '@/config/mUtils'
 Vue.component('my-item-pay', {
    functional: true,
    render: function (h, ctx) {
      var item = ctx.props.item;
      return h('div', ctx.data, [
        h('p', { attrs: { class: 'name' } }, ["券名称:"+item.TickName]),
        h('p', { attrs: { class: 'name' } }, ["券号:"+item.value]),
        h('p', { attrs: { class: 'name' } }, ["券面值:"+item.FaceValue]),
        h('p', { attrs: { class: 'name' } }, ["券类型:"+item.Type]),
        h('p', { attrs: { class: 'name' } }, ["折扣:"+item.discount]),
      ]);
    },
    props: {
      item: { type: Object, required: true }
    }
  });
export default {
    props: {
        price: "",  //项目价格
        code: String,   //会员编号
        projectCode: "",  //报单项目,
        accountList:[],//账户
        payMes:{},
        totalAmount:"",//总金额
        stagePay:{},
        cusPhoneNumber:"",
        jfType:'',//纹绣类型3，区分纹绣积分和医院积分和皮肤科积分
        orderType:{
            type:String,
            default:'2'
        },
    },
    data() {
        return {
            // shadowIptVal:"",
            scan:false,
            courseList:[],
            flg:0,
            debounce:1000,
            PayDate:"",
            // IsAllProject:false,
            formData: {
                OnlineOrderCode:"",//线上订单号
                OnlineOrderMes:"",
                currentC:0,
                TicketsCode: '',  //券号
                PayType: '', //支付方式
                PayTypeName: '',
                RealAmount: '',  //支付金额
                isNew: true,   //是否为老数据
                ReceiveAccount:"",//收款账户
                Memo:"",
                PayDate:"",
                OnlineOrderCheck:'',
                typeId:'',
            },
            jifen:0,//医院积分
            jifenOnline:0,//app积分
            jf:0,
            wxjf:0,//文秀积分
            SkinRemainAmount:0,//皮肤科积分
            VIPRemainPoints:0,//至尊VIP
            RemainAmount:0,//预付款余额
            payWays: [],
            ticekInfo: "",
            pagelist: [],  //卡券包
            // projectList: [],   //项目
            tickList:[],//卡券列表
            editPoints:0,//保存编辑过来的积分值
            Prompt:'',
            // projectName: [],
        }
    },

    mounted() {

        // 计算剩余期数
        if(this.stagePay.orderType == 3){
            let Surplus = this.stagePay.course - this.stagePay.currentC
            for(let i=1;i<=Surplus;i++){
                this.courseList.push(i)
            }
        }
        if(this.payMes.Id){
            this.inintData(this.payMes)
        }
        this.PayDate = new Date()
        this.formData.PayDate = new Date()
        this.getPayWay()
        let _this = this
        setTimeout(function() {
            _this.getPackageByCode()
        }, 100)
    },

    watch: {
        'payMes':{
            handler(curVal,oldVal){
                if(curVal.Id){
                    this.inintData(curVal)
                }
            },
            deep:true
        },
        code: function() {
            this.getPackageByCode()
        },
        'formData.PayType':{
            handler(curVal,oldVal){
                this.jfChange(curVal)
                this.formData.RealAmount = ''
            },
            deep:true
        },
        'scan':{
            handler(curVal,oldVal){
                this.formData.TicketsCode = ''
                this.ticekInfo = { 'TicketsType': 0 }   //查不到 卡券信息
                this.formData.RealAmount = ''
                this.formData.SalePrice = ''
            },
            deep:true
        }
    },

    methods: {
        jftypeChange(val){
            this.jfChange(this.formData.PayType)
        },
        ticketScan(event){
            let _vm = this
            var evt = event || window.event || arguments.callee.caller.arguments[0];
            if(evt.code == 'Enter'){
                setTimeout(()=>{
                    if(this.formData.TicketsCode.indexOf('code=')){
                        this.formData.TicketsCode = this.formData.TicketsCode.split('&').pop().split("code=")[1]
                    }
                    this.getTick('scan')
                },50)
            }
        },
        // 线上订单详情
        async GetOrderInfoByCode(code,type){
            this.formData.OnlineOrderCheck = ''
            let res = await GetOrderInfoByCode({code:code})
            if(res.status){ // 判断订单使用状态
                if(!this.getStatus(res.data)){this.formData.OnlineOrderCheck = '';return false}
                this.formData.OnlineOrderCheck = '1'
                if(type=="019"){
                    this.formData.RealAmount = res.data.deposit
                    this.formData.LimitPoints = res.data.points//最高抵扣积分
                    this.$emit('getLimitMes',{LimitPoints:this.formData.LimitPoints})
                }else{// 转大写key值 与其他类型保持一致
                    let obj={},ticket = res.data.ticketInfo
                    this.formData.TicketsCode = ticket.id
                    for(var key in ticket){
                        let attr = key.slice(0, 1).toUpperCase() + key.slice(1);
                        obj[attr] = ticket[key]
                    }
                    this.handleSelect(obj)
                }
            }else{
                this.$message({ type: 'error', message: res.errorMessage })
            }
        },
        getStatus(data){
            if(data.isRefund == 1){
                this.$message({ type: 'error', message: '该订单已退款!' })
                return false
            }else{

                if(data.status!=1){
                    this.$message({type: 'error', message: '该订单已使用!'})
                    return false
                }
                // else if(data.mobile != this.cusPhoneNumber){//限制用户与下单人一致
                //     this.$alert('该订单手机号与当前消费客户手机号不一致，无法使用!', '提示', {
                //         confirmButtonText: '确定',
                //         type: 'warning',
                //         callback: action => {}
                //     });
                // }
                else{
                    return true
                }
            }
        },
        change(event){
            var evt = event || window.event || arguments.callee.caller.arguments[0];
            if(evt.code == 'Enter'){
                setTimeout(()=>{
                    this.GetOrderInfoByCode(this.formData.OnlineOrderMes,this.formData.PayType)
                },50)
            }
        },
        courseChange(val){
            this.formData.RealAmount = this.stagePay.stageM.div(this.stagePay.course).mul(val)
        },
        async UpdateProofOrderPay(params){
            let res = await UpdateProofOrderPay(params)
            if(res.status){
                this.$message({ type: 'success', message: '编辑成功!' })
                this.$emit('popClose', JSON.stringify(this.formData),true)
            }else{
                 this.$message({ type: 'error', message: '编辑失败!' })
            }
        },

        async StageProofOrderPay(params){
            let res = await StageProofOrderPay(params)
            if(res.status){
                 this.$message({ type: 'success', message: '支付成功!' })
                 return true
            }else{
                this.$message({ type: 'error', message: '支付失败!' })
                return false
            }
        },
            querySearch(queryString, cb) {
                this.tickList = []
                this.flg = 0
                // this.initProject()
                if (queryString !== '' && queryString != undefined) {
                     this.getTick()
                }
                let _this = this
                clearTimeout(this.timeout)
                this.timeout = setTimeout(() => {
                    cb(_this.tickList)
                }, 1000)
            },
            // 选择卡券
            handleSelect(res){
                this.flg = 1
                this.ticekInfo = res

                if (res.TicketsType == 1) {
                    this.formData.RealAmount = this.price * (100-res.Discount) / 100 // 折扣券
                }else{
                    this.formData.RealAmount = res.FaceValue+ ''  //现金券
                }
                this.formData.SalePrice = res.Price
            },
            // 选择门票
            handleSelectM(res){
                this.flg = 1
                this.ticekInfo = { 'TicketsType': 1 }
                this.formData.RealAmount = this.price
                this.formData.SalePrice = res.Price
            },

        async getTick(ope){
            let res = await getTicketsInfoByTicketCode({ticketcode:this.formData.TicketsCode,paytype:this.formData.PayType})
            if (res instanceof Array && res.length > 0) {
                for (let item of res) {
                    item.Type = this.getType(item.TicketsType)
                    item.FaceValue = item["FaceValue"]?item["FaceValue"]:""
                    item.value = item['TicketsCode']
                    item.discount = item.Discount?item.Discount+"%":""
                    this.tickList.push(item)
                }
                if(ope == 'scan'){
                    this.handleSelect(this.tickList[0])
                }
            }else{
                if(ope == 'scan'){
                    this.$message({ type: 'error', message: '查不到该券信息!'})
                }
            }
        },

        getType(type){
            switch(type){
                case 1: return "折扣券"; break;
                case 2: return "现金券"; break;
                case 3: return "门票"; break;
            }
        },

        //获取支付方式
        async getPayWay() {
            let type = await getBaseDataByCode("0006")
            // 判断是分期支付进入  还是报单支付进入
            if(this.stagePay.orderType == 3){
                type.forEach(ele => {
                    if(ele.DataCode <7){
                        this.payWays.push(ele)
                    }
                });
            }else  this.payWays = type
            let [res,res1] = await Promise.all([GetUserAccountByCode({branchcode:this.code}),GetPoints({mobile:this.cusPhoneNumber})])
            //  线上积分 IsFrozen
            this.Prompt = res.IsFrozen?' (账户已冻结)':''
            this.jifen = res.RemainSystemPoints,
            this.jifenOnline = res1.status?res1.data:0
            this.RemainAmount = res.RemainAmount
            this.wxjf = res.RemainGoldCoin
            this.SkinRemainAmount = res.SkinRemainAmount?res.SkinRemainAmount:0//有为null的情况
            this.VIPRemainPoints = res.VIPRemainPoints?res.VIPRemainPoints:0
            this.jfChange(this.formData.PayType)
        },
        jfChange(curVal){

            if(curVal == '021'){// 线上积分
                this.jf = this.jifenOnline+this.editPoints
            }
            else if(curVal == '009'){// 后台基金
                if(this.jfType == '3'){//纹绣积分
                    this.formData.typeId = "3"
                    this.jf = this.wxjf+this.editPoints
                }else if(this.formData.typeId == 2){//医院积分
                    this.jf = this.jifen+this.editPoints
                } else if(this.formData.typeId == 4){//皮肤科积分
                    this.jf = this.SkinRemainAmount+this.editPoints
                }else if(this.formData.typeId == 5){//至尊VIP积分
                    this.jf = this.VIPRemainPoints+this.editPoints
                }
            }
        },

        //获取套餐信息
        async getPackageByCode() {
            this.formData.TicketsCode = ""
            this.formData.ReceiveAccount = ""
            this.ticekInfo = ""
            this.pagelist = []
            this.pagelist = await GetPackageByCode(this.code)
        },

        //改变套餐 券号
        async selectTicket(val) {
            let res = await getTicketsInfo(val)
            if (res.Id) {   //如果存在卡券
                this.ticekInfo = res
                if (res.TicketsType == 1){
                    this.formData.RealAmount = this.price * (100-res.Discount) / 100 // 折扣券
                } else {
                    this.formData.RealAmount = res.FaceValue + ''  //现金券
                }
                this.formData.SalePrice = res.Price
            }
            else {
                this.ticekInfo = { 'TicketsType': 0 }   //查不到 卡券信息
                this.formData.RealAmount = ''
                this.formData.SalePrice = ''
            }
        },

        //改变门票 券号
        async changeMP() {

            // this.projectList = []
            // this.projectName = []
            if (this.formData.TicketsCode !== '') {
                let res = await getTicketsInfoByTicketCode({ticketcode:this.formData.TicketsCode,paytype:"011"})
                if (res.TickInfoCode) {   //如果存在卡券
                    this.ticekInfo = { 'TicketsType': 1 }
                    this.formData.SalePrice = res.Price
                } else {
                    this.ticekInfo = { 'TicketsType': 0 }   //查不到 卡券信息
                    this.formData.RealAmount = ''
                    this.formData.SalePrice = ''
                }
            }
            else {
                this.ticekInfo = { 'TicketsType': 0 }  //查不到 卡券信息
                this.formData.RealAmount = ''
                this.formData.SalePrice = ''
            }
        },

        //改变 普通券号
        async changeQH(ope) {
            if (this.formData.TicketsCode !== '') {
                try {
                    let res = await getTicketsInfoByTicketCode({ticketcode:this.formData.TicketsCode,paytype:"008"})

                    if (res.TickInfoCode) {   //如果存在卡券
                        this.ticekInfo = res
                        if (res.TicketsType == 1) {
                            this.formData.RealAmount = this.price * (100-res.Discount) / 100 // 折扣券
                        }else{
                            this.formData.RealAmount = res.FaceValue + ''  //现金券
                        }
                        this.formData.SalePrice = res.Price
                    }
                    else {
                        this.ticekInfo = { 'TicketsType': 0 }   //查不到 卡券信息
                        this.formData.RealAmount = ''
                    }
                }
                catch (ex) {
                    this.ticekInfo = { 'TicketsType': 0 }    //查不到 卡券信息
                    this.formData.RealAmount = ''
                    this.formData.SalePrice = ''

                }
            }
            else {
                this.ticekInfo = { 'TicketsType': 0 }  //查不到 卡券信息
                this.formData.RealAmount = ''
            }
        },

        //改变支付类型选项
        seChange(val) {
            this.flg = 0
            this.formData.TicketsCode = ""
            // this.formData.RealAmount = ""
            this.formData.SalePrice = ''
            this.formData.OnlineOrderMes = ""
            this.ticekInfo = ""
//            this.pagelist = []  //卡券包
            // this.projectList = []   //项目
            // this.projectName = []
            for (let item of this.payWays) {
                if (item.DataCode === val) {
                    this.formData.PayTypeName = item.DataName
                    break
                }
            }
        },


        async save() {
            if(this.formData.PayType == '020'||this.formData.PayType == '019'||this.formData.PayType == '021'){//线上订单
                this.formData.OnlineOrderCode = this.cusPhoneNumber+'|'+this.formData.OnlineOrderMes
            }
            if((this.formData.PayType == '009'||this.formData.PayType == '021')&&this.formData.RealAmount>this.jf){// 积分超额限制
                return false
            }
                if(this.ticekInfo.TicketsType==0){
                    return
                }
                else {
                    //判断金额是否填写和是否为有效数字
                    if ( isNaN(this.formData.RealAmount)) {
                        this.$message({ type: 'info', message: '支付金额必须是有效数字!' })
                        return
                    }
                }
                //判断卡券是否用过
                //type  1:卡券  2：套餐    3：门票
                let type = 0
                if (this.formData.PayType == '008') type = 1
                if (this.formData.PayType == '010') type = 2
                if (this.formData.PayType == '011') type = 3
                if (type > 0) {
                    let paramData = {
                        'BranchCode': this.code,
                        'ProjectCode': this.projectCode,
                        'TicCode': this.formData.TicketsCode,
                        'Type': type
                    }
                    let state = await TicketIsUsed(paramData) //返回值 1已使用过的     0未使用
                    if (state.data && state.data == 1) {
                        this.$message({ type: 'info', message: '当前券号已使用！' })
                        return
                    }
                }

                this.$refs["ruleForm"].validate((valid) => {
                    if (this.formData.RealAmount != "")
                        this.formData.SubTotal = this.formData.Quantity * this.formData.Amount
                    if (valid) {
                        if(this.PayDate.formatDate("yyyy-MM-dd") == new Date().formatDate("yyyy-MM-dd")){
                                this.formData.PayDate = new Date().formatDate("yyyy-MM-dd hh:mm:ss")
                            }else{
                                this.formData.PayDate = this.PayDate.formatDate("yyyy-MM-dd hh:mm:ss")
                            }
                        if(this.payMes.Id){//编辑
                            let obj ={
                                "id": this.payMes.Id,
                                "sId": this.payMes.SId,
                                "payDate": this.formData.PayDate,
                                "fxCode": this.payMes.FxCode,
                                "ticketsCode": this.formData.TicketsCode,
                                "payType": this.formData.PayType,
                                "memo": this.formData.Memo,
                                "realAmount":this.formData.RealAmount,
                                "receiveAccount": this.formData.ReceiveAccount,
                                "modifiedUserId": getCookie("userId"),
                                "modifiedBy":  getCookie("userName"),
                                "salePrice": this.formData.SalePrice,
                                'typeId':this.jfType == 3?3:this.formData.typeId,
                            }
                            this.UpdateProofOrderPay(obj)
                        }else{
                            let res
                            if(this.stagePay.orderType == 3){// 分期付款先调用接口
                                this.formData.fxCode = this.stagePay.fxCode
                                res = this.StageProofOrderPay(this.formData)
                            }
                            this.$emit('popClose', JSON.stringify(this.formData),false)
                        }
                    }
                    else return false
                })
        },
        cancel() {
            this.$emit('popClose', '')
        },
        // 编辑初始化
        inintData(res){
            for(var p in res){
                if(res[p] == null){
                    res[p] = ""
                }
            }
            let data = JSON.parse(JSON.stringify(res))
            this.formData = {
                TicketsCode: data.TicketsCode,  //券号
                PayType: data.PayType, //支付方式
                PayTypeName: data.PayTypeName,
                RealAmount: Number(data.RealAmount),  //支付金额
                isNew: data.isNew,   //是否为老数据
                ReceiveAccount:"",
                Memo:data.Memo,
                OnlineOrderMes:data.OnlineOrderCode==null?"":data.OnlineOrderCode.split("|")[1],
                OnlineOrderCode:data.OnlineOrderCode==null?"":data.OnlineOrderCode,

                // SalePrice:
            }
            setTimeout(()=>{
                this.$set(this.formData,"RealAmount",data.RealAmount)
                this.PayDate = data.PayDate.length>1?new Date(data.PayDate.substring(0,4),data.PayDate.substring(5,7)-1,data.PayDate.substring(8,10)):new Date()
                this.formData.PayDate = data.PayDate
                this.formData.TicketsCode = data.TicketsCode
                this.formData.SalePrice = data.SalePrice
                this.formData.ReceiveAccount = data.ReceiveAccount
                this.formData.typeId = data.TypeId+''
            },200)
            if(data.PayType=='009'||data.PayType=='021'){//编辑的积分超额计算
                this.editPoints = data.RealAmount
            }
        },
    },
}
</script>

<style scoped>
span {
    color: #325fc7;
}
.el-input__inner{
    width: 300px;
}
</style>
