<template>
    <div class="selCommon editRegister">
        <el-form :model="ruleForm" ref="ruleForm" :inline="true" label-width="85px" class="demo-ruleForm">
            <el-form-item label="药品名称：" class="form_item_mt0">
                <!-- <el-autocomplete v-model="drug" :fetch-suggestions="queryPro" placeholder="请输入内容"  style='width:200px;'
                                custom-item="my-item-ordonProD" :trigger-on-focus="false" @select="selectPro"></el-autocomplete> -->
                <el-input v-model="drug" @change="queryPro" style="width:200px"></el-input>
            </el-form-item>
            <el-form-item label="规格：" class="form_item_mt10">
               <el-select v-model="Spec"  style='width:200px;' @change='unitChange'>
                    <el-option v-for="(item,index) in SpecList" :key="index" :label="item.UnitName" :value="item.Id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="批号："  class="form_item_mt10"  v-if="goodType == 2">
                <el-input v-model="ruleForm.batchNumber" style="width:200px"></el-input>
            </el-form-item>
            <el-form-item label="批号："  v-if="goodType != 2" prop="batchNumber" class="form_item_mt10" :rules="[{ required: true, message: '请填写批号', trigger: 'blur' }]">
                <el-input v-model="ruleForm.batchNumber" style="width:200px"></el-input>
            </el-form-item>
            <el-form-item label="数量：" class="form_item_mt10">
                <el-input-number v-model="ruleForm.quantity" placeholder="" :controls="false" :min=0 style="width:200px" :debounce='1000'></el-input-number>
            </el-form-item>
            <el-form-item label="采购进价：" class="form_item_mt10">
                <el-input-number v-model="ruleForm.realPrice" placeholder="" :controls="false" :min=0 style="width:200px" :debounce='1000' ></el-input-number>
            </el-form-item>
            <el-form-item label="售价："  class="form_item_mt10">
                <el-input-number v-model="ruleForm.salePrice" placeholder="" :controls="false" :min=0 style="width:200px" :debounce='1000'></el-input-number>
            </el-form-item>

            <el-form-item label="数量预警：" class="form_item_mt10">
                <el-input-number v-model="ruleForm.warningCount" placeholder="低于此数量预警" :controls="false" :min=0 style="width:200px;" :debounce='1000'></el-input-number>
            </el-form-item>
            <el-form-item label="生产日期："  class="form_item_mt10">
                <el-date-picker
                    style="width:198px"
                    v-model="ruleForm.productionDate"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="有效期："  v-if="goodType != 2" prop="effectiveDate" class="form_item_mt10" :rules="[{ type: 'date',required: true, message: '请选择有效期', trigger: 'change' }]">
                <el-date-picker
                    style="width:198px"
                    v-model="ruleForm.effectiveDate"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <!-- 物资有效期不必填 -->
            <el-form-item label="有效期：" v-if="goodType == 2">
                <el-date-picker
                    style="width:198px"
                    v-model="ruleForm.effectiveDate"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="有效期预警：" class="form_item_mt10">
                <div class="wt200">
                    <el-input-number v-model="ruleForm.WarningDay"  placeholder=""  debounce=1000 :controls="false" :min=0 style="width:160px;float:left"></el-input-number>
                    <span style="float:left;margin-left:5px">天前</span>
                </div>
                
            </el-form-item>
            
            <el-form-item label="剂型："  class="form_item_mt10">
                <!-- <el-input v-model="ruleForm.jiType" style="width:200px"></el-input> -->
                <!-- <span>{{ruleForm.jiType}}</span> -->
                <div class="wt200">{{ruleForm.jiType}}</div>
            </el-form-item>
             <!-- <el-form-item label="基础进价："  class="form_item_mt10" >
                <el-input-number v-model="ruleForm.price" placeholder="" :controls="false" :min=0 style="width:200px"></el-input-number>
            </el-form-item> -->
            <el-form-item label="单位："  class="form_item_mt10">
                <div class="wt200">{{ruleForm.dwName}}</div>
            </el-form-item>
           
            <el-form-item label="药品编号：" class="form_item_mt10">
                <div class="wt200">{{ruleForm.drugId}}</div>
            </el-form-item>
            
            <el-form-item label="生产厂家："  class="form_item_mt10">
                <div class="wt200">{{ruleForm.manufacturer}}</div>
            </el-form-item>
            <el-form-item label="产地："  class="form_item_mt10">
                <div class="wt200">{{ruleForm.originAddress}}</div>
            </el-form-item>
            <el-form-item label="批准文号："  class="form_item_mt10">
                <div class="wt200">{{ruleForm.approvalNumber}}</div>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" height="300" @cell-dblclick='dblclick'>
                    <el-table-column prop="GoodsAlias" label="药品名称" min-width="110"></el-table-column>
                    <el-table-column prop="SupplierName" label="医院" min-width="110"></el-table-column>
                    <el-table-column prop="jiType" label="剂型" min-width="70"></el-table-column>
                    <el-table-column prop="dwName" label="单位" min-width="70"></el-table-column>
                    <el-table-column prop="manufacturer" label="厂家" min-width="100"></el-table-column>
                    <el-table-column prop="realPrice" label="采购进价" min-width="70">
                        <template slot-scope="scope">
                            <span>{{scope.row.realPrice}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="productionDate" label="生产日期" min-width="70">
                        <template slot-scope="scope">
                            <span v-if="scope.row.productionDate">{{scope.row.productionDate.substring(0,10)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="drugName" label="操作" min-width="70">
                        <template slot-scope="scope">
                            <el-button type="primary" size="small" @click="selectPro(scope.row)">选择</el-button>
                        </template>
                    </el-table-column>
                </el-table>
        <div class="form_footer">
            <el-button type="primary" @click="sure('ruleForm',0)">保存</el-button>
            <el-button type="primary" @click="sure('ruleForm',1)">保存并继续</el-button>
            <el-button @click="cancel('ruleForm')">取消</el-button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import { getCookie, delCookie } from '@/config/mUtils'
    import {GetGoodsByKeywords2} from "@/api/myData"
    import Vue from "vue"
    Vue.component('my-item-ordonProD', {
        functional: true,
        render: function(h, ctx) {
            var item = ctx.props.item;
            
            return h('li', ctx.data, [
                h('p', { attrs: { class: 'select_name', title: item.Name } }, ['名称：' + item.GoodsAlias]),
                h('p', { attrs: { class: 'select_code', title: item.Name,  } }, ['编号：' + item.GoodsCode]),
                h('p', { attrs: { class: 'select_code', title: item.Name, } }, ['医院：' + item.SupplierName]),
                h('p', { attrs: { class: 'select_code', title: item.Name, } }, ['价格区间：' + item.priceRange]),
                h('p', { attrs: { class: 'select_code', title: item.Name, } }, ['产品类别：' + item.typeName]),
                h('p', { attrs: { class: 'select_code', title: item.Name, } }, ['产地：' + item.originAddress])
            ]);
        },
        props: {
            item: { type: Object, required: true }
        }
    });
    export default {
        props:{
            addStore:"",
        },
        data () {
            return {
                goodType:1,
                tableData:[],
                ruleForm: {
                    dateNum:0,
                    effectiveDate:"",
                    quantity:0,
                    WarningDay:1,
                    warningCount:0,
                    bookQuantity:0,
                    profitLossAmount:0,
                    profitLossQuantity:0,
                    inventoryQuantity:0,
                    inventoryAmount:0,
                    bookAmount:0,
                    productionDate:"",
                    approvalNumber:"",
                    unitId:"",
                    editEffectiveDate:''
                },
                drugList:[],
                drug:"",
                Spec:"",
                SpecList:[],//存放所有项目的规格
            }
        },
        
        mounted(){
            this.GetBaseDataAll()
        },
        methods: {
            async GetBaseDataAll(){
               
            },
            dblclick(row, column, cell, event){
                this.selectPro(row)
            },
            //点击获取 药品信息  Oject
            selectPro(item) {
                
                this.drug = item.Name
                this.SpecList = item.GUList
                setTimeout(()=>{
                    this.Spec = item.GUList[0]?item.GUList[0].Id:''
                },100)
                
                this.ruleForm.drugName = item.Name
                this.ruleForm.drugId = item.code
                this.ruleForm.jiType = item.jiType//剂型
                this.ruleForm.dwName = item.dwName//单位
                // this.ruleForm.productionDate = ""//生产日期
                this.ruleForm.manufacturer = item.manufacturer//生产厂商
                this.ruleForm.originAddress = item.originAddress//产地
                this.ruleForm.quantity = 0//数量
                this.ruleForm.realPrice = item.realPrice//采购价
                this.ruleForm.price = item.price//基础进价
                this.ruleForm.totalAmount = 0//总价
                this.ruleForm.salePrice = item.salePrice//售价
                this.ruleForm.GoodsType = item.GoodsType
                this.ruleForm.goodType = item.GoodsType
                this.goodType = item.GoodsType
                this.ruleForm.WarningDay = 180
                // if(this.goodType == 1){
                //     this.ruleForm.WarningDay = 180
                // }else{
                //     this.ruleForm.WarningDay = 1
                // }
            },

            unitChange(val){
                this.SpecList.forEach(ele=>{
                    if(ele.Id == val){
                        this.ruleForm.unitName = ele.UnitName
                        this.ruleForm.unitId = ele.Id
                        this.ruleForm.quantity = 0
                        this.ruleForm.salePrice = ele.Price//售价
                        this.$set(this.ruleForm,'approvalNumber',ele.ApprovalNumber)
                        if(ele.ProfitPrice){
                            this.$set(this.ruleForm,'realPrice',ele.ProfitPrice)
                        }
                    }
                })
            },

            queryPro(queryString, cb) {
                this.drugList = []
                this.tableData = []
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
                    dateNum:0,
                    effectiveDate:"",
                    quantity:0,
                    WarningDay:1,
                    warningCount:0,
                    bookQuantity:0,
                    profitLossAmount:0,
                    profitLossQuantity:0,
                    inventoryQuantity:0,
                    inventoryAmount:0,
                    bookAmount:0,
                    productionDate:"",
                    unitId:"",
                    editEffectiveDate:''
                }
            },

            async getProject(str) {
                let res = await GetGoodsByKeywords2({ "keywords": str.removeSP(), 'ConsumeTypeId': 11 })
                let arr = []
                if (res instanceof Array && res.length > 0) {
                    for (let item of res) {
                        let name = ''
                        if(item["GoodsEntity"]['GoodsType'] == '1'){
                            name = '药品'
                        }else{
                            if(item["GoodsEntity"]['GoodsType'] == '2'){
                                name = '物资'
                            }else{
                                name = '特殊'
                            }
                        }
                        arr.push({
                            value: item["GoodsEntity"]["GoodsAlias"],
                            code: item["GoodsEntity"]["Id"],
                            GoodsCode:item["GoodsEntity"]["GoodsCode"],
                            Name: item["GoodsEntity"]["Name"],
                            GoodsAlias:item["GoodsEntity"]["GoodsAlias"],
                            ServiceMan: item["GoodsEntity"]['ServiceMan'],
                            ServiceManName: item["GoodsEntity"]['ServiceManName'],
                            price: item["GoodsEntity"]['Price'],
                            priceRange:item["PriceRange"],
                            FarePercent: item["GoodsEntity"]['FarePercent'],
                            SupplierCode: item["GoodsEntity"]['SupplierCode'],
                            SupplierName: item["GoodsEntity"]['SupplierName'],
                            GUList: item["GUList"],
                            UnitName:item["GoodsEntity"]["UnitName"],
                            dwName:item["GoodsEntity"]["UnitName"],
                            batchNumber:item["GoodsEntity"]["ApprovalNumber"],
                            manufacturer:item['GoodsEntity']['Manufacturer'],
                            productionDate:item["GoodsEntity"]["PublishDate"],
                            originAddress:item["GoodsEntity"]["ProductionAddress"],
                            realPrice:item["GoodsEntity"]["Price"],
                            salePrice:item["GoodsEntity"]["PriceSale"],
                            jiType:item["GoodsEntity"]["JiType"],
                            GoodsType:item["GoodsEntity"]['GoodsType'],
                            typeName:name,
                        })
                    }
                }
                this.drugList = arr
                this.tableData = arr
            },
            sure(form,ope){
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        this.ruleForm.totalAmount = this.ruleForm.realPrice.mul(this.ruleForm.quantity)
                        this.ruleForm.productionDate = this.ruleForm.productionDate.length>0?this.ruleForm.productionDate.formatDate("yyyy-MM-dd"):''
                        this.ruleForm.effectiveDate = this.ruleForm.effectiveDate?this.ruleForm.effectiveDate.formatDate("yyyy-MM-dd"):''
                        if(ope == 0){
                            this.$emit("selSure",true,true,this.ruleForm)
                        }else{
                            this.$emit("selSure",true,false,this.ruleForm)
                            this.initData()
                        }
                        
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                
            },
            initData(){
                this.ruleForm = {
                    dateNum:0,
                    effectiveDate:"",
                    quantity:0,
                    WarningDay:1,
                    warningCount:0,
                    bookQuantity:0,
                    profitLossAmount:0,
                    profitLossQuantity:0,
                    inventoryQuantity:0,
                    inventoryAmount:0,
                    bookAmount:0,
                    productionDate:"",
                    approvalNumber:"",
                    unitId:"",
                    editEffectiveDate:''
                }
                this.drugList = []
                this.drug = ""
                this.Spec = ""
                this.SpecList =[]//存放所有项目的规格
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
