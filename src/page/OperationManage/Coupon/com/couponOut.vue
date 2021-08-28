<template>
    <div>
        <span class="title">出库信息</span>
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
                <span>声请人：</span> 
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
        </div>
        
       

        <div class="btn-box">
            <el-button type="primary" @click="add" :loading="saveLoading">确定</el-button>
            <el-button>取消</el-button>
        </div>

    </div>
</template>

<script>
import { getAllTicket, addTicketsApply } from '@/api/myData'
import './lib/coupon.less'
import { getCookie } from "@/config/mUtils"
export default {
    components: {  },
    data() {
        return {
            saveLoading:false,
            value1:"",
            startDate:"",
            memo:"",
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
            this.startDate = val
        },
        async getTicket() {
            let res = await getAllTicket()
            res.forEach(row => {
               row.name = row.TickName
               row.value = row.TickInfoCode
            });
            this.TicketOptions  = res
        },

        add() {
            this.apply()
        },

        finish(data, state) {
            if (state === 1) {
                this.realName = data.name
                this.branchCode = data.code
                this.typeId = data.type
            }
            else return
        },

        async apply() {
            
            if (this.ticketCode === "") {
                this.$notify.info({ title: '提示', message: '请选择券种编号', offset: 100 });
                return
            }
            if (this.selectId === "") {
                this.$notify.info({ title: '提示', message: '请选择申请人', offset: 100 });
                return
            }

            let param = {
                applyNum: this.applyNum,
                applyType: 2, // 1.代理商自主申请   2.系统人员手工申请
                checkResult: 1, //1 已经审核 ，0未审核
                ticketsKindCode: this.ticketCode,
                typeId: this.typeId, // 1.总代  2. 设计师
                branchCode: this.branchCode,
                ApplyOn:this.startDate,
                createBy:getCookie("userName"),
                createUserId:getCookie("userId"),
                memo:this.memo,
                price:this.price,//原价
                realPrice:this.salePrice//售价
            }
            this.saveLoading = true
            let res = await addTicketsApply(param)
            if (res.success && res.success > 0) {
                this.currentData = ""
                this.isPopApply = false
                this.$message({ type: 'success', message: '申请成功!' })
                this.reset()
            } else {
                this.$message({ type: 'warning', message: '申请失败!' })
            }
            this.saveLoading = false
        },
        reset(formName) {
            this.ticketCode = ""
            this.applyNum = "",
            this.value1 = "",
            this.startDate = "",
            this.memo = ""
        },
        ticketS(){
            this.ticketCode = this.tickets.value
            this.salePrice = this.tickets.Price
            this.price = this.tickets.Price
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
