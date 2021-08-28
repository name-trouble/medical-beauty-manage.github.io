<template>
    <div style="margin:10px">
        <el-form :model="formData" ref="ruleForm" label-width="120px">
            <el-form-item label="费用类型" prop="TypeId" :rules="[ { required: true, message: '不能为空'}]" class="form_item_mt0">
                <el-select v-model="formData.TypeId" @change="TypeChange()" style="width:300px;float:none">
                    <el-option v-for="(item,$index) in typeList" :key="$index" :label="item.DataName" :value="item.DataCode"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="实际价格：" class="form_item_mt10">
                <span>{{proPrice}}</span>
            </el-form-item>

            <el-form-item label="服务费比例：" prop="rate" :rules="[ { required: true, message: '不能为空'}]" class="form_item_mt0" v-if=" formData.TypeId == 2">
                <el-select v-model="formData.rate" @change="rateChange" style="width:300px;float:none">
                    <el-option label="7.5%" value="7.5"></el-option>
                    <el-option label="10%" value="10"></el-option>
                    <el-option label="15%" value="15"></el-option>
                    <el-option label="20%" value="20"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="是否分期：" class="form_item_mt10" v-if="formData.TypeId == 2">
                <el-radio-group v-model="formData.IsStage" @change="stageC">
                    <el-radio label='0'>否</el-radio>
                    <el-radio label='1'>是</el-radio>
                </el-radio-group>
            </el-form-item>

            <!-- <el-form-item label="附加项名称：" prop="ProofDesc" :rules="[ { required: true, message: '不能为空'}]" class="form_item_mt10">
                <el-input v-model="formData.ProofDesc" style="width:300px;float:none"></el-input>
            </el-form-item> -->

            <el-form-item label="总期数：" class="form_item_mt10" v-if="formData.IsStage== '1'&&formData.TypeId == 2">
                <span>{{formData.Course}}</span>
                <!-- <el-input-number v-model="formData.Course" @change="CourseC" :min="1" :max="maxStage" style="width:300px;float:none"></el-input-number> -->
            </el-form-item>

            <el-form-item label="支付期数：" class="form_item_mt10" v-if="formData.IsStage=='1'&&formData.TypeId == 2">
                <el-select v-model="formData.CurrentCourse" @change="curChange" style="width:300px;float:none">
                    <el-option v-for="(item,index) in courseList" :key="index" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="数量：" prop="Quantity" :rules="[ { required: true, message: '不能为空'}]" class="form_item_mt10" v-if="formData.TypeId != 2">
                <el-input-number v-model="formData.Quantity" :min="1" style="width:300px;float:none"></el-input-number>
            </el-form-item>

            <el-form-item label="单价：" prop="Amount" :rules="[ { required: true, message: '不能为空'}]" class="form_item_mt10">
                <el-input v-model="formData.Amount" style="width:300px;float:none">
                    <template slot="prepend">￥</template>
                </el-input>
            </el-form-item>

            <el-form-item label="是否提成：" prop="IsEffective" :rules="[ { required: true, message: '不能为空'}]" class="form_item_mt0">
                <el-radio-group v-model="formData.IsEffective">
                    <el-radio label='true'>是</el-radio>
                    <el-radio label='false'>否</el-radio>
                </el-radio-group>
            </el-form-item>

            <div class="form_footer" style="text-align:center">
                <el-button type="success" @click="save" style="width:130px;">确定 </el-button>
                <el-button @click="cancel" style="width:130px;">取消 </el-button>
            </div>

        </el-form>
    </div>
</template>

<script>
import { getBaseDataByCode } from '@/api/myData'
export default {
    props:{
        proPrice:"",
        maxStage:0,
    },
    data() {
        return {
            formData: {
                CurrentCourse:0,
                Course:1,
                rate:"",
                Amount: '',  //单价
                Quantity: 1, //数量
                IsEffective: 'false',  //是否提成
                SubTotal: 0,  //合计
                TypeName: "",  // 附加项名称
                TypeId: "", //附加费用类型
                ProofDesc: "",
                isNew: true,   //是否为老数据
                IsStage:"0",
                StageAmount:0,
            },
            courseList:[],
            typeList: []
        }
    },
    watch: {
        'formData.Amount': {
            handler(newValue, oldValue) {
                let _this = this
                clearTimeout(this.tiemOut)
                this.tiemOut = setTimeout(function() {
                    let res = parseFloat(newValue.toString().replace(/[^\d.]/g, ""))
                    _this.formData.Amount = res.toString() == 'NaN' ? '' : res + ""
                }, 600)
            },
            deep: true
        },
        "formData.TypeId":{
            handler(newValue, oldValue) {
                this.TypeChange()
                this.formData.Quantity = 1
                if(newValue == '3'){//化验费200
                     this.formData.Amount = 200
                }else{
                    this.formData.Amount = 0
                }
                if(newValue == 1){
                    this.formData.IsEffective = "true"
                }else{
                    this.formData.IsEffective = "false"
                }
            },
            deep: true
        }
    },

    mounted() {
        
        if(this.maxStage){
            this.$set(this.formData,'Course',this.maxStage)
            this.CourseC(Number(this.maxStage))
        }
        this.getType()
    },

    methods: {
        stageC(val){
            this.formData.CurrentCourse = 1
            this.formData.Quantity = 1
            if(val==1){
               this.formData.Amount = Math.round(Number(this.formData.rate).mul(Number(this.proPrice)).div(100).div(Number(this.formData.Course)))
            }else{
                this.formData.Amount = Math.round(Number(this.formData.rate).mul(Number(this.proPrice)).div(100))
            }
        },
        
        CourseC(val){
            this.courseList = []
            for(let i = 1;i<val;i++){
                this.courseList.push(i)
            }
            this.amountCalc()
        },
        curChange(val){
            this.amountCalc()
        },
        amountCalc(){
            setTimeout(()=>{
                this.formData.Amount = Math.round(Number(this.formData.rate).mul(Number(this.proPrice)).div(100).div(Number(this.formData.Course)))//分期服务费单价
                this.formData.SubTotal = this.formData.Amount.mul(this.formData.CurrentCourse)
                this.formData.StageAmount = Math.round(Number(this.formData.rate).mul(Number(this.proPrice)).div(100))
            },50)
        },
        rateChange(val){
            if(this.formData.IsStage == '1'){
                this.amountCalc()
            }else{
                this.formData.Amount = Math.round(Number(val).mul(Number(this.proPrice)).div(100))
            }
        },
        TypeChange() {
            for (let item of this.typeList) {
                if (item.DataCode == this.formData.TypeId) {
                    this.formData.TypeName = item.DataName
                    this.formData.ProofDesc =  item.DataName
                    return
                }
            }
        },

        save() {
            this.$refs["ruleForm"].validate((valid) => {
                
                if(this.formData.TypeId == 2&&this.formData.IsStage == '1'){

                }else{
                    this.formData.SubTotal = this.formData.Quantity * this.formData.Amount
                }
                
                if (valid) {
                    if (this.formData.Quantity % 1 === 0 && this.formData.Quantity.toString !== 'NaN') {
                        
                        if(this.formData.TypeId == 2&&this.formData.IsStage == '1'){
                            this.formData.Quantity = this.formData.CurrentCourse
                        }else{
                            this.formData.CurrentCourse = ""
                            this.formData.Course = ""
                            this.formData.StageAmount = ""
                        }
                        
                        this.$emit('popClose', JSON.stringify(this.formData))
                        this.$refs["ruleForm"].resetFields()
                    }
                    else {
                        this.$message({ type: 'info', message: '数量必须是整数!' })
                    }
                }
                else {
                    return false
                }
            })
        },

        async getType() {
            this.typeList = await getBaseDataByCode("0018")
        },

        cancel() {
            this.$refs["ruleForm"].resetFields()
            this.$emit('popClose', '')
        },
    },

}
</script>
