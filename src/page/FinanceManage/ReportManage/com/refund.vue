<template>
    <div style="width: 850px">
        <div class="head">
            <span>订单编号：{{data.FxCode}}</span>
            <span>客户：{{data.CustomerName}}</span>
            <span>项目名称：{{ data.ProjectName.substr(0,5)+'...' }}</span>
            <span>项目规格：</span>
            <span>疗程： {{data.Course}}</span>
            <span>执行中： {{ getState(data.CommandState)}}</span>
        </div>

        <div>
            <el-form :model="formData" :inline="true" ref="ruleForm" label-width="120px">
                <el-form-item label="支付信息：" class="form_item_mt10">
                    <el-table :data="payInfoList" border style="width:650px" >
                        <el-table-column type="index" label="序号" width="80"></el-table-column>
                        <el-table-column prop="PayTypeName" label="支付方式" min-width="110">
                            <template slot-scope="scope">
                                <span>{{scope.row.PayTypeName}}</span>
                                <span v-if="scope.row.PayType == '009'">{{scope.row.TypeId|filterTypeId}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="TicketsCode" label="券号" min-width="110"></el-table-column>
                        <el-table-column prop="RealAmount" label="支付金额" min-width="120">
                            <template slot-scope="scope">
                                {{scope.row.RealAmount.toQFW()}}
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
                <el-form-item label="退款日期：" class="form_item_mt10">
                    <el-date-picker v-model="date" @change="dateChange" style="width:200px"></el-date-picker>
                </el-form-item>
                <el-form-item label="退款现金：" class="form_item_mt10">
                    <el-input-number v-model="formData.amount" :controls="false" style="width:200px"></el-input-number>
                </el-form-item>
                <el-form-item label="退还积分：" class="form_item_mt10">
                    <el-input-number v-model="formData.jifen" :controls="false" :max="maxjf" style="width:200px"></el-input-number>
                </el-form-item>
                 <!-- <el-form-item label="退还纹绣积分：" class="form_item_mt10">
                    <el-input-number v-model="formData.wxjifen" :controls="false" :max="maxwxjf" style="width:200px"></el-input-number>
                </el-form-item>
                 <el-form-item label="退还皮肤科积分：" class="form_item_mt10">
                    <el-input-number v-model="formData.pfkjifen" :controls="false" :max="maxpfkjf" style="width:200px"></el-input-number>
                </el-form-item>
                <el-form-item label="退还app积分：" class="form_item_mt10">
                    <el-input-number v-model="formData.appjifen" :controls="false" :max="maxappjf" style="width:200px"></el-input-number>
                </el-form-item> -->
                <el-form-item label="退预付款：" class="form_item_mt10">
                    <el-input-number v-model="formData.refund" :controls="false" style="width:200px"></el-input-number>
                </el-form-item>
                <el-form-item label="退还卡券号：" class="form_item_mt10">
                    <el-input v-model="formData.tickets" placeholder="如：Q123,Q456"  style="width:350px"></el-input>
                </el-form-item>
                <el-form-item label="退款原因：" class="form_item_mt10">
                    <el-select v-model="formData.reason" style="width:350px">
                        <el-option v-for="(item,index) in reasonList" :key="index" :label="item"
                                   :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审核人：" class="form_item_mt10">
                    <el-input v-model="formData.checkMan" style="width:350px"></el-input>
                </el-form-item>
                <el-form-item label="备注：" class="form_item_mt10">
                    <el-input type="textarea" v-model="formData.memo" style="width:450px">
                    </el-input>
                </el-form-item>
                <el-form-item label="退款记录：" class="form_item_mt10">
                    <el-table :data="backList" border min-width="450">
                        <el-table-column type="createOn" label="退款时间" min-width="90">
                            <template slot-scope="scope">
                                <span v-if="scope.row.createOn">{{scope.row.createOn.substring(0,10)}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="payType" label="退款方式" min-width="90">
                            <template slot-scope="scope">
                                <span v-if="scope.row.payType == '001'">现金</span>
                                <span v-if="scope.row.payType == '009'">积分</span>
                                <span v-if="scope.row.payType == '008'">卡券</span>
                                <span v-if="scope.row.payType == '018'">预付款</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="ticketsCode" label="退款券号" min-width="90"></el-table-column>
                        <el-table-column prop="refundAmount" label="退款金额" min-width="90"></el-table-column>
                        <el-table-column prop="createBy" label="操作人" min-width="90"></el-table-column>
                        <el-table-column prop="Memo" label="备注" min-width="150" show-overflow-tooltip></el-table-column>
                    </el-table>
                </el-form-item>
            </el-form>
        </div>

        <div class="dialog_footer">
            <el-button @click="save" type="primary" :loading="saveLoading">确定</el-button>
            <el-button @click="cancel">取消</el-button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import { getProofOrderDetail, addCommandOrder,ProofOrderRefund ,getBaseDataByCode,GetProofOrderRefundList} from "@/api/myData"
    import { getCookie } from '@/config/mUtils'
    export default {
        // name: "refund",
        props: {
            fxCode: String
        },
        data() {
            return {
                backList:[],
                saveLoading:false,
                date:new Date(),
                formData: {
                    reason: "",
                    checkMan: "",
                    amount: 0,
                    memo: "",
                    tickets:"",

                    jifen:0,
                    // wxjifen:0,
                    // pfkjifen:0,
                    // appjifen:0,

                    refund:0,
                    backCourse:0,
                    date:new Date().formatDate("yyyy-MM-dd"),
                    
                },
                maxCourse:0,//限制退款疗程最大值
                payInfoList: [],
                payName: [],
                reasonList: ["更改项目", '计划有变，没时间消费', '预约不到医生', '评价不好', '后悔了，不想要了', '其他'],
                data: {
                    ProjectName: ""
                },

                maxjf:0,
                // maxwxjf:0,
                // maxpfkjf:0,
                // maxappjf:0,
            }
        },

        mounted() {
            this.getData()
        },
        filters: {
            filterTypeId: function (value) {
                switch(value){
                    case 2: return '医院积分';
                    case 3: return '纹绣积分';
                    case 4: return '皮肤科积分';
                }
            }
        },

        methods: {
           
            dateChange(val){
                if(val){
                    this.formData.date = val
                }else{
                    this.formData.date = ""
                }
            },

            async getData() {
                let [payName,res,back] = await Promise.all([getBaseDataByCode("0006"),getProofOrderDetail(this.fxCode),GetProofOrderRefundList({fxcode:this.fxCode})])
                this.payName = payName
                this.data = res['ProofOrder']
                let course = res['ProofOrder']. CurrentCourse
                this.maxCourse =course?course.red(res['ProofOrder'].Course):res['ProofOrder'].Course
                if (res.ProofOrderPayList && res.ProofOrderPayList.length > 0) {  //支付信息 列表
                    for (let item of res.ProofOrderPayList) {
                        for (let data of this.payName) {
                            if (item.PayType === data.DataCode) {
                                item.PayTypeName = data.DataName
                            }
                        }
                    }
                    this.payInfoList = res.ProofOrderPayList
                }
                this.payInfoList.forEach(row=>{
                    if(row.PayType == '009'){
                        this.maxjf+=row.RealAmount
                    }
                })
                if(back.status){
                    this.backList = back.data
                }
            },

            async addData() {//每个方式生成一条记录
                let arr = []
                
                if(this.data.OrderAmount == 0){//订单为0 的返款为保存备注信息 需添加一条
                    arr.push({
                        PayType:"001",//现金
                        refundAmount:0,
                        TicketsCode:"",
                    })
                }
                
                if(this.formData.amount>0){
                    arr.push({
                        PayType:"001",//现金
                        refundAmount:this.formData.amount,
                        TicketsCode:"",
                    })
                }
                
                if(this.formData.jifen>0){
                     arr.push({
                        PayType:"009",//医院积分
                        typeId:2,//区别积分类型
                        refundAmount:this.formData.jifen,
                        TicketsCode:"",
                    })
                }
                
                // 积分暂不做分类型退回，默认原路径全部退回
                // if(this.formData.wxjifen>0){
                //      arr.push({
                //         PayType:"009",//纹绣积分
                //         typeId:3,//积分类型区分
                //         refundAmount:this.formData.wxjifen,
                //         TicketsCode:"",
                //     })
                // }
                // if(this.formData.pfkjifen>0){
                //      arr.push({
                //         PayType:"009",//皮肤科积分
                //         typeId:4,
                //         refundAmount:this.formData.pfkjifen,
                //         TicketsCode:"",
                //     })
                // }
                // if(this.formData.pfkjifen>0){
                //      arr.push({
                //         PayType:"021",//app积分
                //         refundAmount:this.formData.appjifen,
                //         TicketsCode:"",
                //     })
                // }


                if(this.formData.tickets.length>0){
                    arr.push({
                        PayType:"008",//卡券
                        refundAmount:"",
                        TicketsCode:this.formData.tickets
                    })
                }

                if(this.formData.refund>0){
                    arr.push({
                        PayType:"018",//预付款
                        refundAmount:this.formData.refund,
                        TicketsCode:""
                    })
                }
                arr.forEach(row=>{
                    row.refundDate = this.formData.date
                    row.fxCode = this.data.FxCode
                    row.refundReason= this.formData.reason
                    row.memo= this.formData.memo
                    row.approveUserName= this.formData.checkMan
                    row.createUserId= getCookie("userId")
                    row.createBy= getCookie("userName")
                })
                this.saveLoading = true
                let res = await ProofOrderRefund({
                    JsonStr:JSON.stringify(arr),
                    Code:this.data.FxCode
                })
                if (res.status) {
                    this.$message({type: 'success', message: '退款成功！'})
                    this.$emit('close', 1)
                }
                else {
                    this.$message({type: 'error', message: '退款失败！'})
                }
                this.saveLoading = false
            },

            cancel() {
                this.$emit('close', 0)
            },

            save() {
                this.$refs["ruleForm"].validate((valid) => {
                    if (valid) {
                        if(this.getTicketCheck()){
                            this.addData()
                        }else{
                            this.$message({type: 'error', message: '卡券输入有误！'})
                        }
                    }
                    else {
                        this.$message({type: 'info', message: '请填写完整信息!'})
                        return false
                    }
                })
            },

            getTicketCheck(){//校验输入卡券号是否有误，部分卡券名称首尾可能带有空格 需处理
                if(this.formData.tickets.length==0){
                    return true
                }
                else{
                    let arr = []
                    let flg = true
                    let arr1 = this.formData.tickets.replace(/(^\s*)|(\s*$)/g, "").split(",")
                    this.payInfoList.forEach(row=>{
                        if(row.TicketsCode){
                            arr.push(row.TicketsCode.replace(/(^\s*)|(\s*$)/g, ""))
                        }
                    })
                    arr1.forEach(ele=>{
                        if(arr.indexOf(ele)<0){
                            flg = false
                        }
                    })
                    return flg 
                }
            },

            getState(val) {
                if (val == null || val == "" || val == 0) return '未执行'
                if (val == 1) return '执行中'
                if (val == 2) return '执行完毕'
            },
        },

        watch: {
            fxCode: function (val) {
                this.getData()
            },
        }
    }
</script>

<style scoped>
    .head {
        margin: -10px 0 20px 0;
        padding-bottom: 10px;
        border-bottom: 1px solid #ddd;
    }

    .head span {
        margin: 5px 20px;
    }

    .dialog_footer {
        text-align: center;
        margin-top: 10px;
    }
</style>
