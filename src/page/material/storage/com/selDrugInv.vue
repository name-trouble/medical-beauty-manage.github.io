<template>
    <div class="selCommon editRegister">
        <el-form :model="ruleForm" ref="ruleForm" :inline="true" label-width="85px" class="demo-ruleForm">
            <el-form-item label="药品名称：" class="form_item_mt0">
                <el-autocomplete v-model="drug" :fetch-suggestions="queryPro" placeholder="请输入内容"  style='width:200px;' :trigger-on-focus="false" @select="selectPro">
                    <template v-slot="{item}">
                        <my-item-ordonProOut :item="item"></my-item-ordonProOut>
                    </template>
                </el-autocomplete>
            </el-form-item>
            <el-form-item label="规格：" class="form_item_mt10">
               <!-- <el-select v-model="Spec"  style='width:200px;' @change='unitChange'>
                    <el-option v-for="(item,index) in SpecList" :key="index" :label="item.UnitName" :value="item.BarCode"></el-option>
                </el-select> -->
            </el-form-item>
            <el-form-item label="药品编号：" class="form_item_mt10">
                <div class="wt200">{{ruleForm.drugId}}</div>
            </el-form-item>
            <el-form-item label="剂型："  class="form_item_mt10">
                <div class="wt200">{{ruleForm.jiType}}</div>
            </el-form-item>
             <el-form-item label="单位："  class="form_item_mt10">
                <div class="wt200">{{ruleForm.dwName}}</div>
            </el-form-item>
            <el-form-item label="采购进价：" class="form_item_mt10">
                <div class="wt200">{{ruleForm.realPrice}}</div>
            </el-form-item>
            <el-form-item label="基础进价："  class="form_item_mt10" >
                <div class="wt200">{{ruleForm.price}}</div>
            </el-form-item>
            <el-form-item label="售价："  class="form_item_mt10">
                <div class="wt200">{{ruleForm.salePrice}}</div>
            </el-form-item>
            <el-form-item label="批号："  class="form_item_mt10">
                <div class="wt200">{{ruleForm.batchNumber}}</div>
            </el-form-item>
            <el-form-item label="产地："  class="form_item_mt10">
                <div class="wt200">{{ruleForm.originAddress}}</div>
            </el-form-item>
            <el-form-item label="账面数量："  class="form_item_mt10">
                <el-input-number v-model="ruleForm.bookQuantity" placeholder="" :debounce='1000' :controls="false" :min=0 style="width:200px" @change="calNum"></el-input-number>
            </el-form-item>
            <el-form-item label="账面金额："  class="form_item_mt10">
                <el-input-number v-model="ruleForm.bookAmount" placeholder="" :debounce='1000' :controls="false" :min=0 style="width:200px" @change="calAmount"></el-input-number>
            </el-form-item>
            <el-form-item label="盘点数量："  class="form_item_mt10">
                <el-input-number v-model="ruleForm.inventoryQuantity" placeholder="" :debounce='1000' :controls="false" :min=0 style="width:200px" @change="calNum"></el-input-number>
            </el-form-item>
            <el-form-item label="盘点金额："  class="form_item_mt10" >
                <el-input-number v-model="ruleForm.inventoryAmount" placeholder="" :debounce='1000' :controls="false" :min=0 style="width:200px" @change="calAmount"></el-input-number>
            </el-form-item>
            <el-form-item label="盈亏数量："  class="form_item_mt10" >
                <el-input-number v-model="ruleForm.profitLossQuantity" placeholder="" :debounce='1000' :controls="false"  style="width:200px"></el-input-number>
            </el-form-item>
            <el-form-item label="盈亏金额："  class="form_item_mt10">
                <el-input-number v-model="ruleForm.profitLossAmount" placeholder="" :debounce='1000' :controls="false"  style="width:200px"></el-input-number>
            </el-form-item>
        </el-form>
        <div class="form_footer">
            <el-button type="primary" @click="sure('ruleForm')">保存</el-button>
            <el-button @click="cancel('ruleForm')">取消</el-button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import { getCookie, delCookie } from '@/config/mUtils'
    import {GetGoodsByKeywords2,GetStockDrug,GetStockDrugByKeywords} from "@/api/myData"
    import Vue from "vue"
    Vue.component('my-item-ordonProOut', {
        functional: true,
        render: function(h, ctx) {
            var item = ctx.props.item;

            return h('div', ctx.data, [
                h('p', { attrs: { class: 'select_name', } }, ['名称：' + item.Name]),
                h('p', { attrs: { class: 'select_code', } }, ['批号：' + item.batchNumber]),
                h('p', { attrs: { class: 'select_code', } }, ['仓库：' + item.warehouseName]),
                h('p', { attrs: { class: 'select_code', } }, ['规格：' + item.unitName]),
                h('p', { attrs: { class: 'select_code', } }, ['库存：' + item.remainingCount]),
                h('p', { attrs: { class: 'select_code', } }, ['产地：' + item.originAddress]),
                h('p', { attrs: { class: 'select_code', } }, ['有效期：' + item.effectiveDate.substring(0,10)])
            ]);
        },
        props: {
            item: { type: Object, required: true }
        }
    });
    export default {
        props:{
            addStore:"",
            searchMes:{},
        },
        data () {
            return {
                ruleForm: {
                   quantity:0,
                   bookQuantity:0,
                   profitLossAmount:0,
                   profitLossQuantity:0,
                   inventoryQuantity:0,
                   inventoryAmount:0,
                   bookAmount:0,
                },
                tableData:[],
                drugList:[],
                drug:"",
                Spec:"",
                opeIndex:0,
                SpecList:[],//存放所有项目的规格
            }
        },

        mounted(){

        },
        methods: {
            calAmount(){
                window.clearTimeout()
                setTimeout(()=>{

                    this.ruleForm.profitLossAmount = this.ruleForm.bookAmount.red(this.ruleForm.inventoryAmount)
                },100)
            },
            calNum(){
                window.clearTimeout()
                setTimeout(()=>{

                    this.ruleForm.bookAmount = this.ruleForm.bookQuantity.mul(this.ruleForm.realPrice)
                    this.ruleForm.profitLossQuantity = this.ruleForm.bookQuantity.red(this.ruleForm.inventoryQuantity)
                    this.ruleForm.inventoryAmount = this.ruleForm.inventoryQuantity.mul(this.ruleForm.realPrice)
                    this.ruleForm.profitLossAmount = this.ruleForm.bookAmount.red(this.ruleForm.inventoryAmount)
                },100)
            },

             //点击获取 药品信息  Oject
            selectPro(item) {
                this.ruleForm.drugName = item.Name
                this.ruleForm.drugId = item.code
                this.ruleForm.jiType = item.jiType//剂型
                this.ruleForm.dwName = item.dwName//单位
                this.ruleForm.productionDate = item.productionDate//生产日期
                this.ruleForm.manufacturer = item.manufacturer//生产厂商
                this.ruleForm.originAddress = item.originAddress//产地
                this.ruleForm.quantity = 0//数量
                this.ruleForm.bookQuantity = item.remainingCount//总库存
                this.ruleForm.realPrice = item.realPrice//采购价
                this.ruleForm.price = item.price//基础进价
                this.ruleForm.effectiveDate = item.effectiveDate.substring(0,10)
                this.ruleForm.totalAmount = 0//总价
                this.ruleForm.salePrice = item.salePrice//售价
                this.ruleForm.batchNumber = item.batchNumber//批号
                this.ruleForm.unitName = item.unitName//规格
                this.ruleForm.warehouseId = item.warehouseId//仓库
                this.ruleForm.approvalNumber = item.approvalNumber
                this.calNum()
            },

            queryPro(queryString, cb) {
                this.drugList = []
                if (queryString !== '' && queryString != undefined) {
                    this.getProject(queryString)
                }
                this.cleanData()
                let _this = this
                clearTimeout(this.timeout)
                this.timeout = setTimeout(() => {
                    cb(_this.drugList)
                }, 1000)
            },

            cleanData(){
                this.ruleForm = {
                   quantity:0,
                   bookQuantity:0,
                   profitLossAmount:0,
                   profitLossQuantity:0,
                   inventoryQuantity:0,
                   inventoryAmount:0,
                   bookAmount:0,
                }
            },

            async getProject(str) {
                let mes = JSON.parse(JSON.stringify(this.searchMes))
                mes.keywords = str
                let res = await GetStockDrugByKeywords(mes)
                let arr = []
                if (res.data instanceof Array && res.data.length > 0) {
                    for (let item of res.data) {
                        arr.push({
                            // value: '(' + item["GoodsEntity"]["Code"] + ')' + item["GoodsEntity"]["GoodsAlias"],
                            value: item["drugName"],
                            code: item["drugId"],
                            GoodsCode:item["drugId"],
                            Name: item["drugName"],
                            unitName:item["unitName"],
                            dwName:item["dwName"],
                            batchNumber:item["batchNumber"],
                            manufacturer:item["manufacturer"],
                            effectiveDate:item["effectiveDate"]?item["effectiveDate"]:'',
                            productionDate:item["productionDate"]?item["productionDate"]:'',
                            originAddress:item["originAddress"],
                            realPrice:item["realPrice"],
                            salePrice:item["salePrice"],
                            jiType:item["jiType"],
                            remainingCount:item["remainingCount"],
                            warehouseName:item["warehouseName"],
                            approvalNumber:item['approvalNumber'],
                        })
                    }
                }
                this.drugList = arr
            },

            sure(form){
                this.ruleForm.totalAmount = this.ruleForm.realPrice.mul(this.ruleForm.quantity)
                this.$emit("selSure",true,this.ruleForm)
            },
            cancel(form){
                this.$emit("selSure",false)
            },

        },
        components: {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wt200{
    width:200px
}
</style>
