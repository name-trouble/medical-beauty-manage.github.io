<template>
    <div class="reportManage selCommon">
        <div>
            <div style="overflow-y:auto;">
                <p style="font-size:16px;font-weight:bold;line-height:36px">卡券信息</p>
                <el-form  label-width="110px" :inline="true" ref="formAdd1">
                     <el-form-item label="出库日期："  class=" form_item_mt10 w300">
                                 <span v-if="ticketOutMes.ticketOutDate"> {{ticketOutMes.ticketOutDate.substring(0,10)}}</span>
                    </el-form-item>
                     <el-form-item label="医院："  class=" form_item_mt10 w300">
                            <span>  {{ticketOutMes.hospitalName}}</span>
                    </el-form-item>
                     <el-form-item label="仓库："  class=" form_item_mt10 w300">
                        <span> {{ticketOutMes.warehouseName}}</span>
                    </el-form-item>
                    <el-form-item label="出库类别：" v-if="ticketOutMes.toHospitalName" class=" form_item_mt10 w300">
                        <span>调拨出库</span>
                    </el-form-item>
                    <el-form-item label="调拨医院：" v-if="ticketOutMes.toHospitalName" class=" form_item_mt10 w300">
                        <span>{{ticketOutMes.toHospitalName}}</span>
                    </el-form-item>
                     <el-form-item label="领用人：" prop=""  class=" form_item_mt10 w300">
                                 <span> {{ticketOutMes.customerName}}</span>
                    </el-form-item>
                    <el-form-item label="出库类型：" prop=""  class=" form_item_mt10 w300">
                                 <span> {{ticketOutMes.ticketOutType}}</span>
                    </el-form-item>
                    
                    <el-form-item label="操作人：" class=" form_item_mt10 w300">
                        <span>   {{ticketOutMes.createBy}}</span>
                    </el-form-item>
                    <el-form-item label="备注：" class=" form_item_mt10">
                        <div style="width:600px" >  {{ticketOutMes.memo}}</div>
                    </el-form-item>
                    <el-form-item label="" label-width="0px" class=" form_item_mt10">
                        <span style="font-size:16px;font-weight:bold;">卡券信息</span>
                    </el-form-item>
                    <el-form-item label="" class=" form_item_mt10" label-width="0px">
                        <el-table :data="tableData" border style="width: 740px;margin-top:15px;margin-bottom:10px;" max-height="400">
                            <el-table-column prop="ticketName" label="券名称" min-width="100"></el-table-column>
                            <el-table-column prop="quantity" label="数量" min-width="70"></el-table-column>
                            <el-table-column prop="salePrice" label="售价" min-width="70"></el-table-column>
                            <el-table-column prop="totalAmount" label="金额" min-width="70"></el-table-column>
                            <!-- <el-table-column prop="batchNumber" label="批号" min-width="80"></el-table-column> -->
                            <el-table-column prop="ticketCodesArr" label="查看卡券" min-width="100">
                                <template slot-scope="scope">
                                    <el-button size="small" type="primary" :disabled="scope.row.quantity==0" @click="viewTicket(scope.row)">查看卡券</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                </el-form>
                <!-- <div v-if="!view"> -->
                <div>
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
                        <el-table-column prop="address" label="操作"  min-width="140" v-if="!view">
                            <template slot-scope="scope">
                                <el-button type="primary" @click="editPay(scope.$index,payData)" size="small">编辑</el-button>
                                <el-button type="primary" @click="del(scope.$index,payData)" size="small">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                    <el-button type="success" icon="plus" size="mini" @click="addPay" style="margin:5px" v-if="!view">支付信息</el-button>
                    <div style="margin: 5px">
                        <!-- 尾款金额：{{Retainage}} -->
                    </div>
                </div>
            </div>
        </div>
        <div style="text-align:center;margin-top:20px" v-if="!view">
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
import {getUserById,TicketsPay,GetTicketsPayByOutId,GetTicketOutDetail} from "@/api/myData";
import { getCookie } from "@/config/mUtils";
import pay from "./pay.vue";
import "@/style/selfCommon.less";
export default {
    components: { pay },
    props: {
        mes: Object,
        view:{
            type:Boolean,
            default:true
        }
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
            tableData:[],
            ticketList:[],
            ticketOutMes:{}
        };
    },
    computed: {
        
    },
    mounted() {
        this.initAll();
    },
    methods: {
        viewTicket(data){
            let codes = []
            data.ticketCodes.split(",").forEach(ele=>{
                codes.push({
                    ticketCode:ele
                })
            })
            this.$emit("viewTicket",codes,false)
        },
        // 添加支付信息回调
        payOpe(val,ope,isEdit){
            if(ope){
                if(val.constructor == Object){
                    val.TicketOutId = this.mes.id
                    this.payData.push(val)
                }
            }else{
                if(isEdit){
                    val.ApplyId = this.mes.ApplyId
                    val.TicketOutId = this.mes.id
                    this.payData[this.editIndex] = val
                    this.payData.push()
                }
            }
            this.payDialog = false
        },

        submit() {
            this.TicketsPay({
                jsonStr:JSON.stringify(this.payData),
                code:this.mes.id
            })
        },

        async initAll() {
           let user = await getUserById(getCookie("userId"))
           let res = await GetTicketOutDetail({id:this.mes.id})
           
           this.tableData = res.data.stockTicketOutDetailList
        //    this.ticketList = res.data.stockTicketDetailList
           this.ticketOutMes = res.data.stockTicketOut
            this.hospitalCode = user.HospitalCode
            this.GetTicketsPayByOutId()
        },

        reset() {
            this.$emit("popAddClose",false);
        },
        async TicketsPay(params){
            this.saveLoading = true
            let res = await TicketsPay(params)
            if(res.status){
                this.$message({ type: 'success', message: '支付成功' })
                this.$emit("popAddClose",true);
            }else{
                this.$message({ type: 'error', message: '支付失败' })
            }
            this.saveLoading = false
        },
        del(index,data){
            data.splice(index,1)
        },
        async GetTicketsPayByOutId(){
            let res = await GetTicketsPayByOutId({
                TicketOutId:this.mes.id
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

