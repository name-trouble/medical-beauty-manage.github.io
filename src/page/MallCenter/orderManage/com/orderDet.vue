<template>
    <div class="selCommon projectOrder">
            <el-form ref="form" :model="form" label-width="100px" style="width: 600px" :inline="true">
                <el-col :span="24">
                    <span style="font-size:16px;">订单信息：</span>
                </el-col>
                <el-col :span="24" style=" background: rgb(249, 249, 249);" class="form_item_mt10">
                    <el-form-item label="用户：" class="form_item_mt0 form_item_half">
                        <span>{{form.realName}}</span>
                    </el-form-item>
                    <el-form-item label="手机号" class="form_item_mt0 form_item_half">
                        <span>{{form.contactPhone}}</span>
                    </el-form-item>
                    <el-form-item label="订单编号：" class="form_item_mt0 form_item_half">
                        <span>{{form.subOrderCode}}</span>
                    </el-form-item>
                    <el-form-item label="订单日期：" class="form_item_half form_item_mt0">
                        <span v-if="form.createDate">{{form.createDate.substring(0,10)}}</span>
                    </el-form-item>
                    <el-form-item label="订单状态：" class="form_item_half form_item_mt0">

                        <el-tag type="gray" v-if="form.status == 0">待付款</el-tag>
                        <el-tag type="success" v-if="form.status == 1">已付款</el-tag>
                        <el-tag type="success" v-if="form.status == 2">已确认</el-tag>
                        <el-tag type="success" v-if="form.status == 3">待评价</el-tag>
                        <el-tag type="danger" v-if="form.status == 4">已关闭</el-tag>
                    </el-form-item>
                    <el-form-item label="项目类型：" class="form_item_half form_item_mt0">
                        <span>{{form.projectType}}</span>
                    </el-form-item>
                    <el-form-item label="项目名称：" class="form_item_half form_item_mt0">
                        <div style="width:170px;">
                            {{form.goodsName}}
                        </div>
                    </el-form-item>
                    <el-form-item label="订金：" class="form_item_half form_item_mt0">
                        <span>{{form.deposit}}</span>
                    </el-form-item>
                    <el-form-item label="线上价格：" class="form_item_half form_item_mt0">
                        <span>{{form.onlinePrice}}</span>
                    </el-form-item>
                    <el-form-item label="线下需支付：" class="form_item_half form_item_mt0">
                        <span>{{form.deposit.red(form.onlinePrice)}}</span>
                    </el-form-item>
                    <el-form-item label="确认时间：" class="form_item_half form_item_mt0">
                        <!-- <span>{{form.goodsName}}</span> -->
                    </el-form-item>
                    <el-form-item label="操作人：" class="form_item_half form_item_mt0">
                        <!-- <span>{{form.goodsName}}</span> -->
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <span style="font-size:16px;">客户关系：</span>
                </el-col>
                <el-col :span="24" style=" background: rgb(249, 249, 249);" class="form_item_mt10">
                    <el-form-item label="介绍客户：" class="form_item_mt0 form_item_half">
                        <span>{{form.invitUser}}</span>
                    </el-form-item>
                    <el-form-item label="介绍会员：" class="form_item_mt0 form_item_half">
                        <div>
                            {{form.branchUser}}
                            <span v-if="form.branchUserInfo">({{form.branchUserInfo.mobile}})</span>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <span style="font-size:16px;">付款情况：</span>
                </el-col>
                <el-col :span="24" style=" background: rgb(249, 249, 249);">
                    <el-form-item label="现金：" class="form_item_mt0 form_item_half">
                        <span>{{Math.round(form.deposit-form.pointAmount-form.redPacketCount)}}</span>
                    </el-form-item>
                    <el-form-item label="积分支付：" class="form_item_mt0 form_item_half">
                        <span>{{form.pointAmount}}</span>
                    </el-form-item>
                    <el-form-item label="红包：" class="form_item_mt0 form_item_half">
                        <span>{{form.redPacketCount}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="24" v-if="!isRefund" class="form_item_mt10" style=" background: rgb(249, 249, 249);">
                    <el-form-item label="付款时间：" class="form_item_mt0 form_item_half">
                        <span>{{form.abstract}}</span>
                    </el-form-item>
                    <el-form-item label="退款时间：" class="form_item_mt0 form_item_half">
                        <span>{{form.abstract}}</span>
                    </el-form-item>
                    <el-form-item label="退款金额：" class="form_item_mt0 form_item_half">
                        <span>{{form.abstract}}</span>
                    </el-form-item>
                </el-col>
                <el-form-item label="客户备注：" class="form_item_mt0 form_item_full">
                    <el-input v-model="form.Memo" type="textarea" style="width: 400px"></el-input>
                </el-form-item>
                
            </el-form>
            <div slot="footer" class="form_footer" v-if="isRefund">
                <el-button type="primary" @click="editSure('refund')">确 定</el-button>
                <el-button @click="editCancel('refund')">取 消</el-button>
            </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {GetOrderInfoByCode,ConfirmRefund,GetOnlineOrderInfo} from "@/api/myData"
    export default {
        data () {
            return {
                form:{
                    createDate:'',
                    onlinePrice:0,
                    deposit:0,
                }
            }
        },
        computed: {
           
        },
        props:{
            isRefund: {
                type: Boolean,
                default: false
            },
            code:{},
            phoneNum:''
        },
        mounted(){
            this.GetOnlineOrderInfo()
        },
        methods: {
//            退款
            async OnlineOrderRefund(params){
                try{
                    let res = await ConfirmRefund(params)
                    if(res.status){
                        this.$message({message: '退款成功', type: 'success'});
                        this.$emit("close",true)
                    }else{
                        this.$message.error('退款失败!'+res.errorMessage)
                    }
                }catch(err){
                    this.$message.error('退款失败')
                }
            },

            async GetOrderInfoByCode(){
                let res = await GetOrderInfoByCode({code:this.code})
                if(res.status){
                    this.form = res.data
                    this.form.realName = res.data.contactName
                }else{
                    this.$message.error(''+res.errorMessage)
                }
            },
            async GetOnlineOrderInfo(){
                let res = await GetOnlineOrderInfo({code:this.code})
                if(res.status){
                    this.form = res.data
                    this.form.realName = res.data.combineOrderInfo.contactName
                    this.form.branchUser = res.data.branchUserInfo.realname
                    this.form.invitUser = res.data.invitedUserInfo.realname
                    this.form.projectType = res.data.productMaxClassInfo?res.data.productMaxClassInfo.name:''
                    this.form.contactPhone = res.data.combineOrderInfo.contactPhone
                }else{
                    this.$message.error(''+res.errorMessage)
                }
            },
            editSure(ope){
// 退款流程
                this.dialogVisible = false
                this.OnlineOrderRefund({
                    code:this.form.subOrderCode,
                })
            },
            editCancel(ope){
                this.$emit("close",false)
            },
        },
        components: {
            // Export
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form_footer{
    margin: 10px 0 0 0;
}
</style>
