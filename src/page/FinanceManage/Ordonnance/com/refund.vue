<template>
   <div class="ord">
        <el-form :model="ruleForm" :inline="true" ref="ruleForm" label-width="100px" class="">
            <el-form-item label="姓名：" prop="customerId" class="form_item_wt255 form_item_mt0">
                <span>{{customer}}</span>
            </el-form-item>
             <el-form-item label="性别：" class="form_item_wt255 form_item_mt0">
                <span v-text="ruleForm.sex == '0'?'女':'男'"></span>
            </el-form-item>
             <el-form-item label="年龄：" class="form_item_wt255 form_item_mt0">
                <span>{{ruleForm.age}}</span>
            </el-form-item>
            <el-form-item label="医院：" class="form_item_wt255 form_item_mt0">
                <span>{{ruleForm.hospitalName}}</span>
            </el-form-item>
             <el-form-item label="科室：" class="form_item_wt255 form_item_mt0">
                <span>{{ruleForm.DeptName}}</span>
            </el-form-item>
            <el-form-item label="临床诊断：" class="form_item_wt255 form_item_mt0">
                <span>{{ruleForm.diag}}</span>
            </el-form-item>
             <el-form-item label="服务者：" class="form_item_wt255 form_item_mt0">
                <span>{{ruleForm.nurseName}}</span>
            </el-form-item>
             <el-form-item label="日期："  class="form_item_wt255 form_item_mt0">
                <span>{{date}}</span>
            </el-form-item>
             <el-form-item label="费别：" class="form_item_wt255 form_item_mt0">
                <span>{{date.fb}}</span>
            </el-form-item>
             <el-form-item label="联系电话：" class="form_item_wt255 form_item_mt0">
                <span>{{date.phone}}</span>
            </el-form-item>
            <el-form-item label="卡号：" class="form_item_wt255 form_item_mt0">
                <span>{{date.cardNO}}</span>
            </el-form-item>
            <el-form-item label="地址：" class="form_item_wt255 form_item_mt0">
                <span>{{date.address}}</span>
            </el-form-item><br/>
            <el-form-item label="药品信息："  label-width="100px" class=" form_item_mt0"></el-form-item>
            <el-form-item label=" "  label-width="20px" class=" form_item_mt0">
                <el-table :data="tableData"  border style="width: 800px;margin-bottom:10px" @selection-change="handleSelectionChange">
                    <el-table-column type="selection"   align="center" width="55"></el-table-column>
                    <el-table-column prop="productName" label="药品名称" min-width="120"> </el-table-column>
                    <el-table-column prop="unitName" label="规格" min-width="80"> </el-table-column>
                    <el-table-column prop="quantity" label="数量" min-width="70"> </el-table-column>
                    <el-table-column prop="days" label="天数"  min-width="70"></el-table-column>
                    <el-table-column prop="price" label="价格"  min-width="70"> </el-table-column> 
                    <el-table-column prop="dwName" label="单位"  min-width="70"> </el-table-column>
                    <el-table-column prop="memo" label="备注"  min-width="90"> </el-table-column>
                    <el-table-column prop="days" label="总数"  min-width="70">
                        <template slot-scope="scope">
                            <!-- 口服外药品没有天数 -->
                            <span v-if="scope.row.days">{{scope.row.days*scope.row.quantity}}</span>
                            <span v-else>{{scope.row.days}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="address" label="退款数量"  min-width="80">
                        <template slot-scope="scope">
                            <el-input-number v-model="scope.row.refQuantity" :max="scope.row.days!=null?scope.row.quantity*scope.row.days:scope.row.quantity" :controls="false" style="width:65px"></el-input-number>
                        </template>
                    </el-table-column>
                </el-table>
                <span>药品金额：{{totalPrice}}</span>
            </el-form-item>
            <el-form-item label="退款方式：" class="form_item_mt10">
                   <el-select v-model="ruleForm.PayType" style="width:200px;float:none">
                    <el-option v-for="(item,$index) in payWays" :key="$index" :label="item.DataName" :value="item.DataName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="退款金额：" class="form_item_mt10">
                    <el-input-number v-model="refundAmount" :controls="false" style="width:200px" :debounce='1000'></el-input-number>
            </el-form-item>
            <el-form-item label="备注：" class="form_item_mt10">
                    <el-input type="textarea" v-model="ruleForm.memo" :rows="3" style="width:600px"></el-input>
            </el-form-item>
        </el-form>
        <div class="form_footer">
            <el-button type="primary" @click="submitForm('ruleForm')" :loading="saveLoading" :disabled="multipleSelection.length==0">确定</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
        </div>
   </div>
</template>

<script>
import { getCookie } from "@/config/mUtils";
import {GetProofOrderProDet,RefundDrug,getBaseDataByCode} from "@/api/myData"
import "../lib/ord.less"
export default {
    components:{},
    props:{
        mesCode:"",
        id:"",
    },
    data() {
        return {
            saveLoading : false,
            date:"",
            customer:"",
            tableData:[],
            project:"",
            ruleForm: {
                customerId:"",
                customerName: '',
                sex:"0",
                date:"",
                age:"",
                address:"",
                phone:"",
                dpt:"",
                diag:"",
                fb:"",
                refrenceBranchCode:"",
                refrenceBranchName:"",
                memo:"",
                nurse:"",
                nurseId:"",
                nurseName:"",
                DeptCode:"",
                DeptName:"",
                hospital:"",
                hospitalName:"",
                hospitalCode:"",
                cardNO:"",
                PayType:"",

            },
            multipleSelection:[],
            payWays:[],
        };
    },
    computed:{
        totalPrice(){
            if(this.tableData.length == 0){
                return 0
            }else{
                let sum = 0
                this.tableData.forEach(row => {
                    sum+=Number(row.price).mul(Number(row.quantity))
                });
                return sum
            }
        },
        refundAmount(){
            if(this.multipleSelection.length == 0){
                return 0
            }else{
                let amount = 0
                this.multipleSelection.forEach(ele=>{
                    amount+=ele.refQuantity.mul(ele.price)
                })
                return amount
            }
        },
    },
    mounted(){
        this.GetProofOrderProDet({
            OrderProductCode:this.mesCode
        })
    },
    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // 获取详情
        async GetProofOrderProDet(params){
            let [res,ways] = await Promise.all([GetProofOrderProDet(params),getBaseDataByCode("0006")])
            if(res.status){
                this.init(res.data.proofOrderProduct)
                this.tableData =this.addAttr(res.data.proofOrderProductDetailList)
            }
            ways.forEach(ele=>{
                
                if(ele.DataCode<6||ele.DataCode == '018'){
                    this.payWays.push(ele)
                }
            })
        },
        addAttr(data){
            data.forEach(ele=>{
                ele.refQuantity = 0
            })
            return data
        },
        init(data){
            for(var p in data){
                if(data[p] == null||data[p] == "null"||data[p] == undefined||data[p] == "undefined"){
                    data[p] = ""
                }
            }
            this.ruleForm =  {
                    customerId:data.customerId,
                    customerName: data.customerName,
                    sex:data.sex+"",
                    date:"",
                    age:data.age+"",
                    address:data.customerAddress,
                    phone:data.phoneNumber,
                    diag:data.diagnosis,
                    fb:data.costCategory,
                    refrenceBranchCode:data.refrenceBranchCode,
                    refrenceBranchName:data.refrenceBranchName,
                    memo:data.memo,
                    nurse:data.nurseId.length>0?data.nurseId+"|"+data.nurseName:"",
                    nurseId:data.nurseId,
                    nurseName:data.nurseName,
                    dpt:data.deptCode.length>0?data.deptCode+"|"+data.deptName:"",
                    DeptCode:data.deptCode,
                    DeptName:data.deptName,
                    hospital:data.hospitalCode.length>0?data.hospitalCode+"|"+data.hospitalName:"",
                    hospitalName:data.hospitalName,
                    hospitalCode:data.hospitalCode,
                    cardNO:data.cardNO,
                    PayType:""
                }
                this.project = data.diagnosis
                this.customer = data.customerName
                this.date =data.orderDate
        },
        // 编辑
        submitForm(formName) {
            let data = this.joinDrugAttr(this.multipleSelection)
            this.refundOpe(data)
        },
        joinDrugAttr(data){
            let arr =[]
            data.forEach(ele=>{
                arr.push({
                    orderProductCode:ele.orderProductCode,
                    drugId:ele.drugId?ele.drugId:"",
                    drugName:ele.productName,
                    unitId:ele.unitId?ele.unitId:"",
                    unitName:ele.unitName,
                    batchNumber:ele.batchNumber?ele.batchNumber:"",
                    refQuantity:ele.refQuantity,
                    price:ele.price,
                    refAmount:ele.price.mul(ele.refQuantity),
                    createBy:getCookie('userName'),
                    createUserId:getCookie('userId'),
                    PayTypeName:this.ruleForm.PayType,
                    memo:this.ruleForm.memo
                })
            })
            return arr
        },
        async refundOpe(params){
            this.saveLoading = true
            let res = await RefundDrug({jsonStr:JSON.stringify(params),code:this.mesCode})
            if(res.status){
                this.$message({ type: 'success', message: '退款成功!' })
                this.$emit("addClose",true)
            }else{
                this.$message({ type: 'warning', message: '退款失败!'+res.error })
            }
            this.saveLoading = false
        },
        resetForm(formName) {
            this.$emit("addClose",false)
        },
    }
  }
</script>

<style scoped>
.demo-ruleForm{
    width: 300px
}
.form_footer{
    text-align: center
}
.form_item_ipt153{
    width: 260px
}
.form_item_wt255{
    width: 300px
}
.ord{
    min-height: 440px
}
</style>

