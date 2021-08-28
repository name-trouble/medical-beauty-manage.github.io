<template>
   <div class="">
        <el-form :model="ruleForm" :rules="rules" :inline="true" ref="ruleForm" label-width="110px" class="">
                <el-form-item label="支付方式：" prop="PayType" class="form_item_mt10">
                    <el-select v-model="ruleForm.type" style="width: 200px" @change='paySelect'>
                        <el-option v-for="(item,index) in payWayList" :key="index" :label="item.name" :value="item.name+'|'+item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="实际支付金额：" prop="RealAmount" class="form_item_mt0">
                    <el-input-number v-model="ruleForm.RealAmount" :debounce="debounce"  :controls="false"
                                     style="width: 200px"></el-input-number>
                </el-form-item>
                <el-form-item label="预付款余额：" class="form_item_mt0" v-if="ruleForm.PayType == '018'">
                    <span>{{RemainAmount}}</span>
                </el-form-item>
                <el-form-item label="手续费：" class="form_item_mt0">
                    <el-input-number v-model="ruleForm.ProcFee" :debounce='debounce'  :controls="false"
                                     style="width: 200px"></el-input-number>
                </el-form-item>
                <el-form-item label="收款时间：" class="form_item_mt10">
                    <el-date-picker type="date" placeholder="选择日期" v-model="payDate"
                                    style="width: 200px;"></el-date-picker>
                </el-form-item>
                <el-form-item label="销售公司：" prop="topBranch" class="form_item_mt10" v-if="!isHos">
                    <el-select style="width:200px" v-model="ruleForm.topBranch" @change="selBranch" filterable placeholder="请选择">
                        <el-option v-for="(item,index) in topBranchList" :label="item.branchName" :value="item.branchName+'|'+item.code" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="医院：" prop="topBranch" class="form_item_mt10" v-if="isHos">
                    <el-select style="width:200px" v-model="ruleForm.topBranch" @change="selBranch" filterable placeholder="请选择">
                        <el-option v-for="(item,index) in topBranchList" :label="item.supplierName" :value="item.supplierName+'|'+item.code" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="收款账户：" prop="ReceiveAccount" class="form_item_mt10" v-if="ruleForm.PayType!='001'&&ruleForm.PayType!='018'">
                    <el-select style="width:200px" v-model="ruleForm.ReceiveAccount" filterable placeholder="请选择">
                        <el-option v-for="(item,index) in accountList" :label="item.shortName" :value="item.shortName" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注：" class="form_item_mt10">
                    <el-input type="textarea" v-model="ruleForm.Memo" style="width: 200px"></el-input>
                </el-form-item>
        </el-form>
        <div class="form_footer">
            <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
        </div>
   </div>
</template>

<script>
// 券支付、代理注册、编辑、升级和积分充值均使用该组件 请谨慎修改
import { getCookie } from "@/config/mUtils";
import {getBaseDataByCode,GetDropDownPermission,GetBaseBranchAccount,GetHospitalAccountByCode,GetUserAccountByCode} from "@/api/myData"
export default {
    props:{
        isHos:"",//判断医院账户或者销售公司账户
        dialogTableVisible1:Boolean,
        editMes:{},
        code:"",
    },
    data() {
        return {
            debounce:1000,
            payWayList:[],
            accountList:[],
            hosAccount:[],//医院账户
            payDate:"",
            ruleForm: {
                PayDate:"",
                type: "",
                PayTypeName:"",
                PayType:"",
                Memo: "",
                RealAmount: 0,
                ReceiveAccount:"",
                ProcFee:0,
                topBranch:"",
                ReceiveBranchCode:"",
                ReceiveBranchName:"",
            },
            isEdit:true,
            topBranchList:[],
            RemainAmount:0,//账户预付款余额
            rules:{
                topBranch:[
                    {required: true, message: '请选择', trigger: 'change'}
                ],
                RealAmount: [
                    {required: true, type: 'number', message: '请填写实付金额', trigger: 'blur'}
                ],
                ReceiveAccount: [
                    {required: true, message: '请填写收款账户', trigger: 'blur'}
                ],
            }
        };
    },
    watch:{
        "dialogTableVisible1":{
            handler(curVal,oldVal){
                this.init('ruleForm')
            },
            deep:true
        },
        'ruleForm.type':{
            handler(curVal,oldVal){
                if(this.isHos == true){
                    this.accountList = this.hosAccount
                }
            },
            deep:true
        },
        "editMes":{
            handler(curVal,oldVal){

                if(curVal.PayDate){
                    this.initData(this.editMes)
                    this.isEdit = true
                }else{
                    this.isEdit = false
                }
            },
            deep:true
        }
    },
    mounted(){
        this.payDate = new Date()
        this.ruleForm.payDate = new Date()
        this.getPayWay()

        if(this.editMes.PayDate){
                this.initData(this.editMes)
                this.isEdit = true
        }else{
            this.isEdit =false
        }
    },
    methods: {
        initData(data){
            this.payDate = data.PayDate?new Date(data.PayDate.substring(0,4),data.PayDate.substring(5,7)-1,
            data.PayDate.substring(8,10),data.PayDate.substring(11,13),data.PayDate.substring(14,16),data.PayDate.substring(17,19)) :""
            this.ruleForm.type = data.PayTypeName+'|'+data.PayType
            this.ruleForm.RealAmount = data.RealAmount
            this.ruleForm.ReceiveAccount = data.ReceiveAccount
            this.ruleForm.topBranch =data.ReceiveBranchName+'|'+ data.ReceiveBranchCode
            this.ruleForm.ProcFee = data.ProcFee
            this.ruleForm.Memo = data.Memo
        },
        dateChange(val){
            this.ruleForm.payDate = val
        },

        async GetBaseBranchAccount(params){
            let res = await GetBaseBranchAccount(params)
            this.accountList = res.data
        },
        async GetHospitalAccountByCode(id) {
            let res = await GetHospitalAccountByCode({
                hospitalCode: id
            });
            this.hosAccount = res.data
            this.accountList = res.data;
        },
          paySelect(){
                this.ruleForm.PayTypeName = this.ruleForm.type.split("|")[0]
                this.ruleForm.PayType = this.ruleForm.type.split("|")[1]
            },
            selBranch(){
                if(this.ruleForm.topBranch.length>0){
                    this.ruleForm.ReceiveBranchCode = this.ruleForm.topBranch.split("|")[1]
                    this.ruleForm.ReceiveBranchName = this.ruleForm.topBranch.split("|")[0]
                    if(this.isHos){
                        // 平台账户默认为杭州账户
                        this.GetHospitalAccountByCode(this.ruleForm.ReceiveBranchCode)
                    }else{
                        // 获取销售公司账户
                        this.GetBaseBranchAccount({
                            keywords:"" //this.ruleForm.ReceiveBranchCode
                        })
                    }
                }else{
                    this.ruleForm.ReceiveBranchCode = ""
                    this.ruleForm.ReceiveBranchName = ""
                }
            },
        //获取支付方式
        async getPayWay() {

            if(this.code){
                let mes = await GetUserAccountByCode({branchcode:this.code})
                this.RemainAmount = mes.RemainAmount
            }
            let res0 = await GetDropDownPermission({typeId: this.isHos?"1":"2"})

            this.topBranchList = res0.data

            if(res0.data[0].code == ""){
                this.topBranchList.splice(0,1)
            }
            let res = await getBaseDataByCode("0006")
            if(res.constructor==Array){
                res.forEach(row => {

                    if(row.DataCode !='008'&&row.DataCode !='009'&&row.DataCode !='010'&&row.DataCode !='011'){
                        this.payWayList.push({
                            name:row.DataName,
                            value:row.DataCode
                        })
                    }
                });
            }

        },
        submitForm(formName) {
            let _this = this
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.payDate.formatDate("yyyy-MM-dd")==new Date().formatDate("yyyy-MM-dd")){
                        _this.ruleForm.PayDate = new Date().formatDate("yyyy-MM-dd hh:mm:ss")
                    }else{
                        _this.ruleForm.PayDate = this.payDate.formatDate("yyyy-MM-dd hh:mm:ss")
                    }
                    if(_this.isEdit){
                        if(_this.payDate.formatDate("yyyy-MM-dd") == _this.editMes.PayDate.substring(0,10)){
                         _this.ruleForm.PayDate = _this.editMes.PayDate
                        }
                    }
                    _this.$emit("payOpe",_this.ruleForm,_this.isEdit)
                }
            });
        },
        init(formName){
             this.$refs[formName].resetFields();
            this.ruleForm.RealAmount = 0
            this.ruleForm.ProcFee = 0
            this.ruleForm.Memo = ""
            this.ruleForm.type = ""
            this.accountList = [],
            this.payDate = new Date()
        },
        resetForm(formName) {
           this.init(formName)
            this.$emit("payOpe",false)
        },
    }
}
</script>

<style scoped>

.form_footer{
    text-align: center
}
.form_item_ipt153{
    width: 153px
}
.form_item_wt255{
    width: 253px
}

</style>

