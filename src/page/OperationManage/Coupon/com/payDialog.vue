<template>
    <div class="reportManage selCommon">
        <div>
            <div style="overflow-y:auto;">
                <p style="font-size:16px;font-weight:bold;line-height:36px">卡券信息</p>
                <el-form  label-width="110px" :inline="true" ref="formAdd1">
                    <el-form-item label="券种编号" prop=""  class=" form_item_mt10 w300">
                                <span>{{mes.TickInfoCode}}
                                    </span>
                    </el-form-item>
                    <el-form-item label="申请人" prop=""  class=" form_item_mt10 w300">
                                 <span> {{mes.ApplyCreateBy}}</span>
                    </el-form-item>
                     <el-form-item label="申请日期" prop=""  class=" form_item_mt10 w300">
                                 <span> {{mes.ApplyOn.substring(0,10)}}</span>
                    </el-form-item>
                     <el-form-item label="券名称" prop=""  class=" form_item_mt10 w300">
                                <span>  {{mes.TickName}}</span>
                    </el-form-item>
                     <el-form-item label="券类型" prop=""  class=" form_item_mt10 w300">
                        <span v-if="mes.TicketsType==1">
                            折扣券
                        </span>
                        <span v-if="mes.TicketsType==2">
                            代金券
                        </span>
                        <span v-if="mes.TicketsType==3">
                            门票
                        </span>
                    </el-form-item>
                     <el-form-item label="有效期" prop=""  class=" form_item_mt10 w300">
                        <span v-if="mes.PrdOfVal!='' && mes.PrdOfVal!=null "> {{ '售后'+ mes.PrdOfVal +'天'}}</span>
                        <span v-else>
                            开始时间：
                            <span v-if="mes.StartDate">
                                {{mes.StartDate.substring(0,10)}}
                            </span><br/> 结束时间：
                            <span v-if="mes.EndDate">
                                {{mes.EndDate.substring(0,10)}}
                            </span>
                        </span>
                    </el-form-item>
                     <el-form-item label="售价" prop=""  class=" form_item_mt10 w300">
                                 <span> {{mes.Price}}</span>
                    </el-form-item>
                    <el-form-item label="申请数量" prop=""  class=" form_item_mt10 w300">
                                <span>  {{mes.ApplyNum}}</span>
                    </el-form-item>
                    <el-form-item label="总价" prop=""  class=" form_item_mt10 w300">
                               <span>   {{mes.TotalAmount}}</span>
                    </el-form-item>
                    <el-form-item label="录入数量" prop=""  class=" form_item_mt10 w300">
                                <span>  {{mes.TotInputNum}}</span>
                    </el-form-item>
                    <el-form-item label="支付金额" prop=""  class=" form_item_mt10 w300">
                                <span>  {{mes.PayAmount}}</span>
                    </el-form-item>
                     <el-form-item label="使用次数" prop=""  class=" form_item_mt10 w300">
                                 <span> {{mes.UseCount}}</span>
                    </el-form-item>
                    <el-form-item label="是否付清" prop=""  class=" form_item_mt10 w300">
                        <span v-if="mes.IsPayOff == 0">未付清</span>
                         <span v-else>已付清</span>
                    </el-form-item>
                    <el-form-item label="备注" prop="" class=" form_item_mt10">
                                <div style="width:600px" >  {{mes.Memo}}</div>
                    </el-form-item>
                </el-form>
                <p style="font-size:16px;font-weight:bold;line-height:36px">支付信息</p>
                <el-table :data="payData" border style="width: 784px;margin-bottom:10px">
                    <el-table-column prop="payTypeName" label="支付方式" min-width="100"></el-table-column>
                    <el-table-column prop="receiveAccount" label="收款账户" min-width="80"> </el-table-column>
                    <el-table-column prop="realAmount" label="支付金额" min-width="80"> </el-table-column>
                     <el-table-column prop="ProcFee" label="手续费" min-width="80"> </el-table-column>
                    <el-table-column prop="payDate" label="支付日期" min-width="110">
                        <template slot-scope="scope">
                            <span v-if="scope.row.payDate">{{scope.row.payDate.substring(0,19)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="memo" label="备注"  min-width="80" show-overflow-tooltip> </el-table-column>
                    <el-table-column prop="address" label="操作"  min-width="140">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="editPay(scope.$index,payData)" size="small">编辑</el-button>
                            <el-button type="primary" @click="del(scope.$index,payData)" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <el-button type="success" icon="plus" size="mini" @click="addPay" style="margin:5px">支付信息</el-button>
                <div style="margin: 5px">
                    <!-- 尾款金额：{{Retainage}} -->
                </div>
                
            </div>
        </div>
        <div style="text-align:center;margin-top:20px">
            <el-button type="info" style="width:100px" @click="submit" :loading="saveLoading">保存</el-button>
            <el-button style="width:100px" @click="reset">取消</el-button>
        </div>

        <el-dialog title="支付" :visible.sync="payDialog" :close-on-click-modal="false" size="" :modal="false">
            <pay v-if="payDialog" @payOpe="payOpe" style="width:450px" :hospital-code="hospitalCode" :editMes="editMes"></pay>
        </el-dialog>

    </div>
</template>

<script type="text/ecmascript-6">
import Vue from "vue";
import {getUserById,TicketsPay,GetTicketsPay,} from "@/api/myData";
import { getCookie } from "@/config/mUtils";
import pay from "./pay.vue";
import "@/style/selfCommon.less";
export default {
    components: { pay },
    props: {
            mes: Object,
    },

    data() {
        return {
            saveLoading:false,
            editMes:{},
            editIndex:"",
            hospitalCode:"HZ100014",
            payDialog:false,
            form:{},
            ispopPay: false,
            payData: [], //支付信息列表
        };
    },
    computed: {
    
    },
    mounted() {
        this.initAll();
    },
    methods: {
        // 添加支付信息回调
        payOpe(val,ope,isEdit){
            if(ope){
                if(val.constructor == Object){
                    val.ApplyId = this.mes.ApplyId
                    this.payData.push(val)
                }
            }else{
                if(isEdit){
                    val.ApplyId = this.mes.ApplyId
                    this.payData[this.editIndex] = val
                    this.payData.push()
                }
            }
            this.payDialog = false
        },


        submit() {
            this.TicketsPay({
                jsonStr:JSON.stringify(this.payData),
                code:this.mes.ApplyId
            })
        },

        async initAll() {
           let user = await getUserById(getCookie("userId"))
            this.hospitalCode = user.HospitalCode
            this.GetTicketsPay()
        },

        reset() {
            this.$emit("popAddClose",false);
        },
        async TicketsPay(params){
            this.saveLoading = true
            let res = await TicketsPay(params)
            if(res.status){
                this.$message({ type: 'success', message: 'tuihua成功' })
                this.$emit("popAddClose",true);
            }else{
                this.$message({ type: 'error', message: '支付失败' })
            }
            this.saveLoading = false
        },
        del(index,data){
            data.splice(index,1)
        },
        async GetTicketsPay(){
            let res = await GetTicketsPay({
                ApplyId:this.mes.ApplyId
            })
             this.payData =res.data
        },
        addPay(){
            this.editMes = {}
            this.editIndex = ""
            this.payDialog = true
        },
        editPay(index,data){
            this.editIndex = index
            this.editMes = data[index]
            this.payDialog = true
        }
    }
};
</script>

<style scoped lang="less">
.form_footer{
  margin-top:10px ;
  text-align: center
}
.w300{
    width:300px
}
</style>

