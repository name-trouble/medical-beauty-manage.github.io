<template>
    <div>
        <el-form  label-width="140px" :model="ruleForm" ref="ruleForm">
            <span class="title">出库信息</span>
            <el-form-item label="券种编号：" prop="ticketCode" :rules="[ { required: true, message: '不能为空'}]">
                <el-select v-model="tickets" filterable placeholder="搜索" style="width:250px;" @change="ticketS">
                    <el-option v-for="item in TicketOptions"  :key="item.TickInfoCode" :label="item.name" :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="申请数量：" prop="applyNum" :rules="[ { required: true, message: '不能为空'}]">
                <el-input-number style="width:250px;" v-model="ruleForm.applyNum" :min="1"></el-input-number>
            </el-form-item>
            <el-form-item label="原价：">
                <span> {{ruleForm.price}}</span>
            </el-form-item>
            <el-form-item label="售价：" prop="salePrice" :rules="[ { required: true, message: '不能为空'}]">
                <el-input-number style="width:250px;" v-model="ruleForm.salePrice" :min="0"></el-input-number>
            </el-form-item>
            <span class="title">申请人</span>
            <el-form-item label="选择申请人：" prop="realName" :rules="[ { required: true, message: '不能为空'}]">
                <el-button type="success" icon="plus" size="small" @click="selectUser">选择申请人</el-button>
               <span  v-show="ruleForm.realName!=''"> 已选择：<el-tag type="success" style="font-size:14px">{{ ruleForm.realName}}</el-tag></span>
            </el-form-item>
            <el-form-item label="备注：">
                <el-input type="textarea" v-model="ruleForm.memo" style="width:500px"></el-input>
            </el-form-item>
            <el-form-item label="时间：" prop="value1" :rules="[ {  type: 'date',required: true, message: '不能为空'}]">
                <el-date-picker
                    v-model="ruleForm.value1"
                    type="date"
                    @change="change"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label=" ">
                <div class="btn-box">
                    <el-button type="primary" @click="apply('ruleForm')" :loading="saveLoading">确定</el-button>
                    <el-button @click="resetForm('ruleForm')">取消</el-button>
                </div>
            </el-form-item>
        </el-form>

        <!-- <span class="title">出库信息</span>
        <div class="item-box">
            <div> <span>券种编号：</span>
                <el-select v-model="tickets" filterable placeholder="搜索" style="width:250px;" @change="ticketS">
                    <el-option v-for="item in TicketOptions"  :key="item.TickInfoCode" :label="item.name" :value="item">
                    </el-option>
                </el-select>
            </div>
            <div> <span>申请数量：</span>
                <el-input-number style="width:250px;" v-model="applyNum" :min="1"></el-input-number>
            </div>
            <div>
                 <span> 原价：{{price}}</span> <br/>
                <span>售价：</span> 
                <el-input-number style="width:250px;" v-model="salePrice" :min="0" :controls="false"></el-input-number>
            </div>
        </div>

        <span class="title">申请人</span>
        <div class="item-box">
            <div>
                <span>选择申请人： </span> 
                <el-button type="success" icon="plus" size="small" @click="selectUser">选择申请人</el-button>
               <span  v-show="realName!=''"> 已选择：<el-tag type="success" style="font-size:14px">{{ realName}}</el-tag></span>
            </div>
        </div>

        <div class="item-box">
            <div>
                   <span> 备注：</span>
                <el-input type="textarea" v-model="memo"></el-input>
                <span>时间：</span> 
                <el-date-picker
                    v-model="value1"
                    type="date"
                    @change="change"
                    placeholder="选择日期">
                </el-date-picker>
            </div>
        </div> -->

        


        <el-dialog title="选择申请人" :visible.sync="popUser" size="" top="10%" :close-on-click-modal='false'>
            <pop-user @onFinish="finish" style="width:850px"></pop-user>
        </el-dialog>
    </div>
</template>

<script>
import { getAllTicket, addTicketsApply } from '@/api/myData'
import './lib/coupon.less'
import PopUser from './com/selectUser'
import { getCookie } from "@/config/mUtils"
export default {
    components: { PopUser },
    data() {
        return {
            saveLoading:false,
            ruleForm:{
                ticketCode:"",
                value1:"",
                memo:"",
                realName:"",
                applyNum:"",
                price:0,
                salePrice:0,
            },
            value1:"",
            startDate:"",
            memo:"",
            popUser: false,
            ticketCode: "",
            applyNum: 1,

            realName: "",
            branchCode: "",
            typeId: "",
            TicketOptions: [],
            tickets:{},
            price:0,
            salePrice:0,

        }
    },

    mounted() {
        this.getTicket()
    },

    methods: {
        change(val){
            if(val){
                this.ruleForm.startDate = val
            }else{
                this.ruleForm.startDate = ""
            }
            
        },
        async getTicket() {
            let res = await getAllTicket()
            res.forEach(row => {
               row.name = row.TickName
               row.value = row.TickInfoCode
            });
            this.TicketOptions  = res
        },

        selectUser() {
            this.popUser = true
        },

       

        finish(data, state) {
            this.popUser = false
            
            if (state === 1) {
                this.ruleForm.realName = data.name
                this.ruleForm.branchCode = data.code
                this.typeId = data.type
            }
            else return
        },

        apply(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.saveLoading = true
                    this.addTicketsApply()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        async addTicketsApply(){
            let param = {
                applyNum: this.ruleForm.applyNum,
                applyType: 2, // 1.代理商自主申请   2.系统人员手工申请
                checkResult: 1, //1 已经审核 ，0未审核
                ticketsKindCode: this.ruleForm.ticketCode,
                typeId: this.typeId, // 1.总代  2. 设计师
                branchCode: this.ruleForm.branchCode,
                ApplyOn:this.ruleForm.value1.formatDate("yyyy-MM-dd"),
                createBy:getCookie("userName"),
                createUserId:getCookie("userId"),
                memo:this.ruleForm.memo,
                price:this.ruleForm.price,//原价
                realPrice:this.ruleForm.salePrice//售价
            }
            let res = await addTicketsApply(param)
            if (res.success && res.success > 0) {
                this.currentData = ""
                this.isPopApply = false
                this.$message({ type: 'success', message: '申请成功!' })
                // this.resetForm('ruleForm')
            } else {
                this.$message({ type: 'warning', message: '申请失败!' })
            }
            this.saveLoading = false
        },
        reset(formName) {
            this.ruleForm.ticketCode = ""
            this.ruleForm.applyNum = "",
            this.value1 = "",
            this.ruleForm.startDate = "",
            this.ruleForm.memo = ""
        },
        ticketS(){
            this.ruleForm.ticketCode = this.tickets.value
            this.ruleForm.salePrice = this.tickets.Price
            this.ruleForm.price = this.tickets.Price
        },
        
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.tickets = {}
            this.value1 = ""
        }
    }
}
</script>

<style lang="less" scoped>
.title {
    font-size: 16px;
    font-weight: 700;
    margin-left: 10px;
}

.item-box {

    width: 60%; //height: 200px;
    background: #f9f9f9;
    margin: 10px;
    padding: 10px;
    div {
        font-size: 14px;
        margin: 5px 15px;
    }
}

.btn-box {
    text-align: left;
    margin: 10px;
    button {
        width: 120px;
    }
}

.btn-box2 {
    text-align: center;
    width: 100%;
    margin: 15px;
    button {
        width: 120px;
    }
}

.el-checkbox-button__inner {
    width: 150px;
}

.block {
    float: right;
    margin-right: 10px;
    padding-right: 0!important;
}
</style>
