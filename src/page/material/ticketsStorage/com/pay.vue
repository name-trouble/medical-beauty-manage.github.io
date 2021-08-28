<template>
   <div class="">
        <el-form :model="ruleForm" :rules="rules" :inline="true" ref="ruleForm" label-width="100px" class="">
            <el-form-item label="支付方式：" class="form_item_mt10" prop="PayType">
                <el-select v-model="ruleForm.payType" style="width:300px;float:none">
                    <el-option v-for="(item,$index) in payWayList" :key="$index" :label="item.DataName" :value="item.DataCode" ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="金额：" class="form_item_mt10" prop="realAmount">
                <el-input  v-model="ruleForm.realAmount" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="手续费：" class="form_item_mt0">
                    <el-input-number v-model="ruleForm.ProcFee" :debounce="debounce" :controls="false"
                                     style="width: 300px"></el-input-number>
                </el-form-item>
            <el-form-item label="销售公司：" prop="topBranch" class="form_item_mt10">
                    <el-select style="width:300px" v-model="ruleForm.topBranch" @change="selBranch" filterable placeholder="请选择">
                        <el-option v-for="(item,index) in topBranchList" :label="item.branchName" :value="item.branchName+'|'+item.code" :key="index"></el-option>
                    </el-select>
                </el-form-item>
            <el-form-item label="收款账户：" class="form_item_mt10" v-if="ruleForm.payType != '001'">
                 <el-select style="width:300px" v-model="ruleForm.receiveAccount"  filterable  allow-create placeholder="请选择">
                    <el-option v-for="item in accountList" :label="item.shortName" :value="item.shortName" :key="item.DataName"></el-option>
                </el-select>
                <!-- <el-select style="width:200px"
                               v-model="form.ReceiveAccount"
                               filterable
                               allow-create
                               placeholder="请选择">
                        <el-option v-for="(item,index) in accountList" :label="item.DataName" :value="item.DataName" :key="index"></el-option>
                    </el-select> -->
            </el-form-item>
            <el-form-item label="支付时间：" class="form_item_mt10">
                <el-date-picker type="date" placeholder="选择日期" v-model="payDate" style="width: 300px;" ></el-date-picker>
            </el-form-item>
            <el-form-item label="备注：" class="form_item_mt10">
                <el-input type="textarea" v-model="ruleForm.memo" :rows="3" style="width:300px"></el-input>
            </el-form-item>
        </el-form>
        <div class="form_footer">
            <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
        </div>
   </div>
</template>

<script>
import { getCookie } from "@/config/mUtils";
import {getBaseDataByCode,GetDropDownPermission,GetBaseBranchAccount} from "@/api/myData"
export default {
    props:{
        editMes:{},
        id:"",
        hospitalCode:"",
        itemType:'',//支付类型 5服务商
    },
    data() {
        return {
            debounce:1000,
            payWayList:[],
            accountList:[],
            topBranchList:[],
            payDate:"",
            ruleForm: {
                memo:"",
                receiveAccount:"",
                payType:"",
                payTypeName:"",
                realAmount:"",
                payDate:"",
                ProcFee:"",
                topBranch:"",
                receiveBranchCode:"",
                receiveBranchName:"",
            },
            rules:{
                topBranch:[
                    {required: true, message: '请选择', trigger: 'change'}
                ],
                payType: [{ required: true, message: '请选择', trigger: 'change' }],
                realAmount: [{ required: true, message: '请填写' }],
            }
        };
    },
    
    mounted(){
        this.payDate = new Date()
        this.ruleForm.payDate = new Date()
        this.getPayWay()
    },
    methods: {

         async GetBaseBranchAccount(params){
            let res = await GetBaseBranchAccount(params)
            this.accountList = res.data
        },
        selBranch(){
                if(this.ruleForm.topBranch.length>0){
                    this.ruleForm.receiveBranchCode = this.ruleForm.topBranch.split("|")[1]
                    this.ruleForm.receiveBranchName = this.ruleForm.topBranch.split("|")[0]
                    this.GetBaseBranchAccount({
                        keywords:this.ruleForm.receiveBranchCode
                    })
                }else{
                    this.ruleForm.receiveBranchCode = ""
                    this.ruleForm.receiveBranchName = ""
                }
            },
        //获取支付方式
        async getPayWay() {
            let res0 = await GetDropDownPermission({typeId: 2})
            
            if(res0.data[0].code == ""){
                this.topBranchList = res0.data.slice(1)
            }else{
                this.topBranchList = res0.data
            }
            let res = await getBaseDataByCode("0006")
            if(res.constructor==Array){
                res.forEach(row => {
                    if(row.DataCode !='008'&&row.DataCode !='009'&&row.DataCode !='010'&&row.DataCode !='011'&&row.DataCode !='018'){
                        this.payWayList.push(row)
                    }
                });
            }
            if(this.editMes.payDate){
                this.initData(this.editMes)
            }
        },
        
        initData(data){
            
            this.ruleForm={
                memo:data.memo,
                receiveAccount:data.receiveAccount,
                payType:data.payType,
                payTypeName:"",
                realAmount:data.realAmount,
                ProcFee:data.procFee,
                topBranch:data.receiveBranchName.length>0?data.receiveBranchName+'|'+data.receiveBranchCode:"",
                receiveBranchCode:"",
                receiveBranchName:"",
                payDate:"",
            }
            
            this.payDate = data.payDate.length>0?new Date(data.payDate.substring(0,4),data.payDate.substring(5,7)-1,data.payDate.substring(8,10)):new Date()
        },
        submitForm(formName) {
            let _this = this
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    for(let item of _this.payWayList){
                        if(_this.ruleForm.payType == item.DataCode){
                            _this.ruleForm.payTypeName = item.DataName
                        }
                    }
                    if(this.payDate.formatDate("yyyy-MM-dd") == new Date().formatDate("yyyy-MM-dd")){
                         this.ruleForm.payDate = new Date().formatDate("yyyy-MM-dd hh:mm:ss")
                    }else{
                         this.ruleForm.payDate = this.payDate.formatDate("yyyy-MM-dd hh:mm:ss")
                    }
                    if(this.editMes.payDate){
                        if(_this.payDate.formatDate("yyyy-MM-dd") == _this.editMes.payDate.substring(0,10)){
                            _this.ruleForm.payDate = _this.editMes.payDate
                        }
                        _this.$emit("payOpe",_this.ruleForm,false,true)
                    }else{
                       _this.$emit("payOpe",_this.ruleForm,true)
                    }
                }
            });
        },
        resetForm(formName) {
            this.$emit("payOpe",this.ruleForm,false,false)
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

