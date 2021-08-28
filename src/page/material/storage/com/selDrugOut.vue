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
            <el-form-item label="出库数量：" class="form_item_mt10">
                <el-input-number v-model="ruleForm.quantity" placeholder="" :controls="false" :min=0 :max="max" style="width:200px"  :debounce='1000'></el-input-number>
            </el-form-item>
            <el-form-item label="采购进价：" class="form_item_mt10">
                <!-- <div class="wt200">{{ruleForm.realPrice}}</div> -->
                <el-input-number v-model="ruleForm.realPrice" placeholder="" :controls="false" :min=0 style="width:200px"  :debounce='1000'></el-input-number>
            </el-form-item>
            <el-form-item label="售价："  class="form_item_mt10">
                <!-- <div class="wt200">{{ruleForm.salePrice}}</div> -->
                <el-input-number v-model="ruleForm.salePrice" placeholder="" :controls="false" :min=0 style="width:200px" :debounce='1000'></el-input-number>
            </el-form-item>
            <el-form-item label="规格：" class="form_item_mt10">
                <div class="wt200">{{ruleForm.unitName}}</div>
            </el-form-item>
            <el-form-item label="总库存：" class="form_item_mt10">
                <div class="wt200">{{stockQuan}}</div>
            </el-form-item>
            <el-form-item label="药品编号：" class="form_item_mt10">
                <div class="wt200">{{ruleForm.drugId}}</div>
            </el-form-item>
            <el-form-item label="批号："  class="form_item_mt10">
                <div class="wt200">{{ruleForm.batchNumber}}</div>
            </el-form-item>
            <el-form-item label="剂型："  class="form_item_mt10">
                <div class="wt200">{{ruleForm.jiType}}</div>
            </el-form-item>
             <el-form-item label="单位："  class="form_item_mt10">
                <div class="wt200">{{ruleForm.dwName}}</div>
            </el-form-item>
            <!-- <el-form-item label="基础进价："  class="form_item_mt10" >
                <div class="wt200">{{ruleForm.price}}</div>
            </el-form-item> -->

            <el-form-item label="生产日期："  class="form_item_mt10">
                <div class="wt200">{{ruleForm.productionDate}}</div>
            </el-form-item>
            <el-form-item label="有效期："  class="form_item_mt10">
                <div class="wt200">{{ruleForm.effectiveDate}}</div>
            </el-form-item>
            <el-form-item label="生产厂家："  class="form_item_mt10">
                <div class="wt200">{{ruleForm.manufacturer}}</div>
            </el-form-item>
            <el-form-item label="产地："  class="form_item_mt10">
                <div class="wt200">{{ruleForm.originAddress}}</div>
            </el-form-item>
        </el-form>
        <div class="form_footer">
            <el-button type="primary" @click="sure('ruleForm',0)">保存</el-button>
            <el-button type="primary" @click="sure('ruleForm',1)">保存并继续</el-button>
            <el-button @click="cancel('ruleForm')">取消</el-button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import { getCookie, delCookie } from '@/config/mUtils'
    import {GetGoodsByKeywords2,GetStockDrugByKeywords} from "@/api/myData"
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
                h('p', { attrs: { class: 'select_code', } }, ['有效期：' + item.effectiveDate.substring(0,10)]),
                h('p', { attrs: { class: 'select_code', } }, ['产地：' + item.originAddress])
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
                max:0,
                ruleForm: {
                    unitName:"",
                    quantity:0,
                },
                stockQuan:0,
                drugList:[],
                drug:"",
            }
        },

        mounted(){

        },
        methods: {
            //点击获取 药品信息  Oject
            selectPro(item) {
                for(var key in item){
                    if(item[key] == null){
                        item[key] == ''
                    }
                }
                this.ruleForm.drugName = item.Name
                this.ruleForm.drugId = item.code
                this.ruleForm.jiType = item.jiType//剂型
                this.ruleForm.dwName = item.dwName//单位
                this.ruleForm.productionDate = item.productionDate//生产日期
                this.ruleForm.manufacturer = item.manufacturer//生产厂商
                this.ruleForm.originAddress = item.originAddress//产地
                this.ruleForm.quantity = 0//数量
                this.stockQuan = item.remainingCount//总库存
                this.ruleForm.realPrice = item.realPrice//采购价
                this.ruleForm.price = item.price//基础进价
                this.ruleForm.effectiveDate = item.effectiveDate.substring(0,10)
                this.ruleForm.totalAmount = 0//总价
                this.ruleForm.salePrice = item.salePrice//售价
                this.ruleForm.batchNumber = item.batchNumber//批号
                this.ruleForm.unitName = item.unitName//规格
                this.ruleForm.warehouseId = item.warehouseId//仓库
                this.ruleForm.unitId = item.unitId
                this.ruleForm.goodsType = item.goodsType
                this.max = item.remainingCount?item.remainingCount:0
                this.ruleForm.approvalNumber = item.approvalNumber
                this.ruleForm.warehouseName = item.warehouseName
                this.ruleForm.GoodsType = item.GoodsType
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
                for(var key in this.ruleForm){this.ruleForm[key] = ""}
                this.ruleForm.quantity = 0
            },

            async getProject(str) {
                let mes = JSON.parse(JSON.stringify(this.searchMes))
                mes.keywords = str
                mes.IsFrozen = ""
                let res = await GetStockDrugByKeywords(mes)
                let arr = []
                if (res.data instanceof Array && res.data.length > 0) {
                    for (let item of res.data) {
                        // 产品类型
                        // let name = ''
                        // if(item["GoodsEntity"]['GoodsType'] == '1'){
                        //     name = '药品'
                        // }else{
                        //     if(item["GoodsEntity"]['GoodsType'] == '2'){
                        //         name = '物资'
                        //     }
                        //     if(item["GoodsEntity"]['GoodsType'] == '3'){
                        //         name = '特殊'
                        //     }
                        // }

                        if(item.remainingCount != 0){
                            arr.push({
                                value: item["drugName"],
                                code: item["drugId"],
                                GoodsCode:item["drugId"],
                                Name: item["drugName"],
                                unitName:item["unitName"],
                                dwName:item["dwName"],
                                approvalNumber:item['approvalNumber'],
                                batchNumber:item["batchNumber"],
                                manufacturer:item["manufacturer"],
                                effectiveDate:item["effectiveDate"]?item["effectiveDate"]:'',
                                productionDate:item["productionDate"]?item["productionDate"]:'',
                                originAddress:item["originAddress"],
                                realPrice:item["realPrice"],
                                salePrice:item["salePrice"],
                                jiType:item["jiType"],
                                unitId:item["unitId"],
                                remainingCount:item["remainingCount"],
                                warehouseName:item["warehouseName"],
                                goodsType:item["goodsType"],
                            })
                        }
                    }
                }
                this.drugList = arr.sort(this.compare('effectiveDate'))
            },
            // 有效期升序排列
            compare(property){
                return function(obj1,obj2){
                    var value1 = obj1[property].substring(0,3)+obj1[property].substring(5,7)+obj1[property].substring(8,10);
                    var value2 = obj2[property].substring(0,3)+obj2[property].substring(5,7)+obj2[property].substring(8,10);
                    return parseInt(value1) - parseInt(value2);     // 升序
                }
            },
            sure(form,ope){
                this.ruleForm.totalAmount = this.ruleForm.realPrice.mul(this.ruleForm.quantity)
                // this.$emit("selSure",true,this.ruleForm)
                if(ope == 0){
                    this.$emit("selSure",true,true,this.ruleForm)
                }else{
                    this.$emit("selSure",true,false,this.ruleForm)
                    this.initData()
                }
            },
            initData(){
                this.max = 0
                this.ruleForm ={
                    unitName:"",
                    quantity:0,
                }
                this.stockQuan = 0
                this.drugList = []
                this.drug = ""
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
