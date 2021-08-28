<template>
    <div class="addPayForm">
        <el-form :model="formInline" :rules="rules" class="demo-form-inline" ref="formInline" label-width="100px">
            <el-form-item label="单据时间：" class="form_item_mt10" prop="date">
                <el-date-picker v-model="formInline.date" type="date" placeholder="选择日期" class="form_item_ipt_260"></el-date-picker>
            </el-form-item>
            <!-- <el-form-item label="收据单号：" class="form_item_mt10" prop="formNO">
                <el-input v-model="formInline.formNO" placeholder="" class="form_item_ipt_260"></el-input>
            </el-form-item>
            <el-form-item label="支付人：" class="form_item_mt10" prop="payPer">
                <el-input v-model="formInline.payPer" placeholder="" class="form_item_ipt_260"></el-input>
            </el-form-item> -->
            <el-form-item label="部门：" class="form_item_mt10" prop="department">
                <el-select v-model="formInline.department" placeholder="请选择" class="form_item_ipt_260">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in departmentList"  :label="item.DataName" :value="item.DataName" :key="item.BusinessCode"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="经办人：" class="form_item_mt10" prop="Handler">
                <el-input v-model="formInline.Handler" placeholder="" class="form_item_ipt_260"></el-input>
            </el-form-item>
            <el-form-item label="供应单位：" class="form_item_mt10" prop="supplyUnit">
                <el-input v-model="formInline.supplyUnit" placeholder="" class="form_item_ipt_260"></el-input>
            </el-form-item>
            <el-form-item label="项目明细：" class="form_item_mt10" prop="Detailed">
                <el-input v-model="formInline.Detailed" placeholder="" class="form_item_ipt_260"></el-input>
            </el-form-item>
            <el-form-item label="项目类型：" class="form_item_mt10" prop="type">
                <el-select v-model="formInline.type" placeholder="请选择" class="form_item_ipt_260">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in typeList" :label="item.DataName" :value="item.DataName" :key="item.BusinessCode"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="户名：" class="form_item_mt10" prop="name">
                <el-input v-model="formInline.name" placeholder="" class="form_item_ipt_260"></el-input>
            </el-form-item>
            <el-form-item label="银行：" class="form_item_mt10" prop="bank">
                <el-input v-model="formInline.bank" placeholder="" class="form_item_ipt_260"></el-input>
            </el-form-item>
            <el-form-item label="金额："  class="form_item_mt10" prop="money">
                <el-input v-model="formInline.money" placeholder="" class="form_item_ipt_260"></el-input>
            </el-form-item>
            <el-form-item label=" ">
                <el-button @click="save('formInline')" type="primary" :loading="saveLoading">保存</el-button>
                <el-button @click="reset('formInline')" type="">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script type="text/ecmascript-6">
    import "@/style/selfCommon.less"
    import "./lib/lib.less"
    import { getCookie } from '@/config/mUtils'
    import {AddExpendOrder,GetBaseDataAll} from "@/api/myData"
    export default {
        // name:"addPayForm",
        data () {
            return {
                saveLoading:false,
                departmentList:[],
                typeList:[],
                formInline: {
                    payPer:'',
                    formNO:'',
                    date:'',
                    department:'',
                    supplyUnit:'',
                    Handler:'',
                    Detailed:'',
                    type:'',
                    name:'',
                    bank:'',
                    money:''
                },
                rules: {
                    money: [
                        {required: true, message: '请输入金额', trigger: 'blur'},
                    ],
                    bank: [
                        {required: true, message: '请输入银行', trigger: 'blur'},
                    ],
                    name: [
                        {required: true, message: '请输入账户', trigger: 'blur'},
                    ],
                    type: [
                        {required: true, message: '请选择类型', trigger: 'change'},
                    ],
                    Detailed: [
                        {required: true, message: '请输入明细', trigger: 'blur'},
                    ],
                    supplyUnit: [
                        {required: true, message: '请输入供应商', trigger: 'blur'},
                    ],
                    Handler: [
                        {required: true, message: '请输入经办人', trigger: 'blur'},
                    ],
                    department: [
                        {required: true, message: '请输入部门', trigger: 'blur'},
                    ],
                    date: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    formNO:[
                        {required: true, message: '请输入单号', trigger: 'blur'},
                    ],
                    payPer:[
                        {required: true, message: '请填写支付人', trigger: 'blur'},
                    ]
                }
            }
        },
        mounted(){
            this.GetBaseDataAll()
        },
        methods: {
            async GetBaseDataAll(){
              try{
                  let res = await GetBaseDataAll()
                  this.getDate(res)
              }catch(err){
                  console.log(err)
              }
            },
            async AddExpendOrder(params){
                try {
                    this.saveLoading = true
                    let res = await AddExpendOrder(params)
                    if(res.success){
                        this.$message({message: '添加成功', type: 'success'});
                    }else{
                        this.$message.error('添加失败');
                    }
                } catch (err) {
                    console.log(err)
                    this.$message.error('添加失败');
                }
                this.saveLoading = false
            },
            save(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.AddExpendOrder({
                            OrderDate:this.formInline.date.formatDate('yyyy-mm-dd'),
                            deptName:this.formInline.department,
                            operatorName:this.formInline.Handler,
                            supplierCompany:this.formInline.supplyUnit,
                            projectDetail:this.formInline.Detailed,
                            projectType:this.formInline.type,
                            bankAccount:this.formInline.name,
                            bankName:this.formInline.bank,
                            amount:this.formInline.money,
                            createUserId:getCookie('userId'),
                            createBy:getCookie('userName'),
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            reset(formName){
                this.$refs[formName].resetFields();
            },
            getDate(data){
                data.forEach(row=>{
                    if(row.BusinessCode == '0021'){
                        this.departmentList.push(row)
                    }
                    else if(row.BusinessCode == '0020'){
                        this.typeList.push(row)
                    }
                })
            }
        },
        components: {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form_item_ipt_260{
    width: 260px;
}

</style>
