<template>
    <div>
        <el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" label-width="100px"
                 class="demo-ruleForm">
            <el-form-item label="咨询日期：" prop="date" class="form_item_mt15">
                <el-date-picker
                    v-model="date"
                    type="date"
                    class="form_item_ipt"
                    @change="dateChange"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="咨询分类：" class="form_item_mt15">
                <el-select v-model="ruleForm.type" class="form_item_ipt">
                    <el-option v-for="(item,index) in classify" :key="index" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="客户姓名：" prop="name" class="form_item_mt15">
                <el-autocomplete v-model="ruleForm.name" :fetch-suggestions="queryCus" placeholder="请输入内容"
                                 class="form_item_ipt"
                                 :trigger-on-focus="false"
                                 @select="selectCus">
                    <template v-slot="{item}">
                        <my-item-conMember :item="item"></my-item-conMember>
                    </template>
                </el-autocomplete>
            </el-form-item>
            <el-form-item label="手机号：" prop="phone" class="form_item_mt15">
                <el-input v-model="ruleForm.phone" class="form_item_ipt"></el-input>
            </el-form-item>
            <el-form-item label="推荐人：" prop="refer" class="form_item_mt15">
                <el-autocomplete v-model="ruleForm.refer" :fetch-suggestions="queryCus" placeholder="请输入内容"
                                 class="form_item_ipt"
                                 :trigger-on-focus="false"
                                 @select="selectRef">
                    <template v-slot="{item}">
                        <my-item-conMember :item="item"></my-item-conMember>
                    </template>
                </el-autocomplete>
            </el-form-item>
            <el-form-item label="项目：" prop="projectCode" class="form_item_mt15">
                <el-autocomplete v-model="ruleForm.project" class="form_item_ipt" :fetch-suggestions="queryPro"
                                 placeholder="请输入内容" :trigger-on-focus="false"
                                 @select="selectPro">
                    <template v-slot="{item}">
                        <my-item-conPro :item="item"></my-item-conPro>
                    </template>
                </el-autocomplete>
            </el-form-item>
            <el-form-item label="设计师：" prop="designer" class="form_item_mt15">
                <el-select v-model="ruleForm.designer" filterable class="form_item_ipt">
                    <el-option v-for="(item,index) in designerList" filterable :key="index" :label="item.text"
                               :value="item.name+'|'+item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="设计师助理：" prop="designerAssist" class="form_item_mt15">
                <el-select v-model="ruleForm.designerAssist" filterable class="form_item_ipt">
                    <el-option v-for="(item,index) in designerAssistList" filterable :key="index" :label="item.text"
                               :value="item.name+'|'+item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否成交：" class="form_item_mt15">
                <el-select v-model="ruleForm.isDeal" class="form_item_ipt">
                    <el-option label="成交" value="1"></el-option>
                    <el-option label="未成交" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="就诊类型：" class="form_item_mt10">
                <el-select v-model="ruleForm.typeId" placeholder="请选择"  class="form_item_ipt">
                    <el-option label="初诊" value="1"></el-option>
                    <el-option label="复诊" value="2"></el-option>
                    <el-option label="复查" value="3"></el-option>
                    <el-option label="再消费" value="4"></el-option>
                    <el-option label="其他" value="5"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="咨询内容：" prop="" style="width:100%">
                <el-input type="textarea" v-model="ruleForm.message" style="width:520px"></el-input>
            </el-form-item>
        </el-form>
        <div class="form_footer">
            <el-button @click="add('ruleForm')" type="primary" :loading="saveLoading">确定</el-button>
            <el-button @click="cancel('ruleForm')">取消</el-button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {AddConsulting,GetUserAllByKeywords,GetGoodsByKeywords,GetServiceManList,getBaseDataByCode,GetHospitalAccountByCode,getUserById,UpdateConsulting} from "@/api/myData";
    import Vue from "vue";
    import { getCookie } from "@/config/mUtils";
    Vue.component("my-item-conPro", {
        functional: true,
        render: function (h, ctx) {
            var item = ctx.props.item;
            return h("div", ctx.data, [
                h("p", {attrs: {class: "select_name", title: item.Name}}, ["名称：" + item.GoodsAlias]),
                h("p", {attrs: {class: "select_code", title: item.Name}}, ["编号：" + item.code]),
                h("p", {attrs: {class: "select_code", title: item.Name}}, ["医院：" + item.SupplierName]),
                // h("p", {attrs: {class: "select_code", title: item.Name}}, ["医生：" + item.ServiceManName]),
                h("p", {attrs: {class: "select_code", title: item.Name}}, ["价格区间：" + item.priceRange])
            ]);
        },
        props: {
            item: {type: Object, required: true}
        }
    });
    Vue.component('my-item-conMember', {
        functional: true,
        render: function (h, ctx) {
            var item = ctx.props.item;
            return h('div', ctx.data, [
                h('p', {attrs: {class: 'select_name' + item.Type, title: item.name}}, ['名字：' + item.name]),
                h('p', {attrs: {class: 'select_name' + item.Type, title: item.name}}, ['编号：' + item.code]),
                h('p', {attrs: {class: 'select_name' + item.Type, title: item.name}}, ['手机号：' + item.phone]),
                h('p', {attrs: {class: 'select_name' + item.Type, title: item.name}}, ['卡号：' + item.cardNO]),
            ]);
        },
        props: {
            item: {type: Object, required: true}
        }
    });

    export default {
        data() {
            return {
                saveLoading: false,
                date: "",
                ruleForm: {
                    date: "",
                    type: "",
                    name: "",
                    customer: "",
                    customerCode: "",
                    message: "",
                    phone: "",
                    refer: "",
                    referrerCode: "",
                    referrer: "",
                    project: "",
                    projectName:'',
                    projectCode: "",
                    designer: "",
                    designerAssist: "",
                    isDeal:'0',
                    typeId:'',
                },
                loading: false,
                designerList: [],
                designerAssistList: [],
                branhcList: [],
                projectList: [],
                customerList: [],
                proList: [],
                rules: {
                    name: [{required: true, message: "请输入客户", trigger: "blur"}],
                    phone: [{required: true, message: "请输入电话", trigger: "blur"}],
                    projectCode: [{required: true, message: "请选择", trigger: "change"}],
                    date: [{required: true, message: "请选择", trigger: "change"}],
                },
                classify: [
                    "现场咨询",
                    "网络咨询",
                    "代理商",
                    "朋友介绍",
                    "市场咨询顾问",
                    "会员中心",
                    "二级市场",
                    "前台咨询",
                    "微信咨询"
                ]
            };
        },
        props:{
            editMes:{
                type:Object,
                default:{}
            },
            customer:{
                type:Object,
                default:{}
            },
            reservationId: {}
        },
        created(){
            this.getServiceMan();
        },
        mounted() {

            this.date = new Date();
            this.ruleForm.date = new Date();
            if(this.editMes.id){
                this.copyData(this.editMes)
            }
            if(this.customer.customerCode){//其他页面传递用户信息添加咨询单
                this.quickAdd(this.customer)
            }
        },
        methods: {
            copyData(data){
               for(var key in data){
                   if(data[key] == null||data[key] =='undefined'){
                       data[key] = ''
                   }
               }
                this.ruleForm={
                    typeId:data.typeId?data.typeId+'':'',
                    date: data.consultingDate,
                    type: data.consultingName,
                    name: data.customerName,
                    customer: data.customerName,
                    customerCode: data.customerCode,
                    message: data.consultingContent,
                    phone: data.phoneNumber,
                    refer:  data.referrerName,
                    referrerCode:  data.referrerCode,
                    referrer: data.referrerName,
                    project: data.projectName,
                    projectName:data.projectName,
                    projectCode: data.projectCode,
                    isDeal:!data.isDeal?'0':'1',
                    designer: data.designerName?data.designerName+'|'+data.designer:'',
                    designerAssist: data.designerAssistName?data.designerAssistName+'|'+data.designerAssist:'',
                }

                if(data.consultingDate){
                    this.date = new Date(data.consultingDate.substring(0,4),data.consultingDate.substring(5,7)-1,data.consultingDate.substring(8,10))
                }
            },
            async getMember(str){
                let res = await GetUserAllByKeywords({'keywords': str.removeSP()})
                if (res instanceof Array && res.length > 0) {
                    for (let item of res) {

                        this.customerList.push({
                            value: item["MemberName"],
                            phone: item["PhoneNumber"],
                            code: item["Code"],
                            name: item["MemberName"],
                            referrerCode: item['ReferrerCode'],
                            referrerName: item['ReferrerName'],
                            Type: item.Type == 1 ? "black" : "red",
                            cardNO: item["CardNO"] ? item["CardNO"] : ""
                        })
                    }
                }
                if(this.customer.customerCode&&this.customerList[0]){
                    this.selectCus(this.customerList[0])
                }arguments
            },
            quickAdd(data){
                this.ruleForm.name = data.customerName
                this.ruleForm.designer =data.designerName+'|'+ data.designerCode
                this.ruleForm.typeId = data.typeId?data.typeId+'':''
                this.getMember(data.customerCode)
            },
            //查找会员 下拉补全
            queryCus(queryString, cb) {
                // queryString=enCode(queryString)
                this.customerList = []
                if (queryString !== '' && queryString != undefined) {
                    this.getMember(queryString)
                }
                let _this = this
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    cb(_this.customerList);
                }, 1000);
            },

            //点击获取 会员信息  Oject
            selectCus(item) {
                this.ruleForm.customer = item.name
                this.ruleForm.customerCode = item.code
                this.ruleForm.referrer = item.referrerName ? item.referrerName : ""
                this.ruleForm.referrerCode = item.referrerCode ? item.referrerCode : ""
                this.ruleForm.refer = item.referrerName
                this.ruleForm.phone = item.phone
            },

            selectRef(item){
                this.ruleForm.refrence = item.referrerName ? item.referrerName : ""
                this.ruleForm.referrerCode = item.referrerCode ? item.referrerCode : ""
            },

            async AddConsulting(params) {
                this.saveLoading = true
                let res,message = this.editMes.id?'编辑':'添加'
                params.reservationId = this.reservationId;
                if(this.editMes.id){
                    res = await UpdateConsulting(params)
                }else{
                    res = await AddConsulting(params);
                }
                if (res.status) {
                    this.$message({
                        message: message+'成功',
                        type: 'success'
                    });
                    this.cancel()
                    this.$emit("close", true);
                } else {
                    this.$message.error(message+'失败');
                }
                this.saveLoading = false
            },

            remoteMethod(query) {
                if (query !== "") {
                    this.loading = true;
                    this.getMember({keywords: query.removeSP()});
                } else {
                }
            },
            //获的医护人员
            async getServiceMan() {
                let hospitalCode = getCookie("hospitalCode")
                let res = await GetServiceManList();
                for (let item of res.data) {
                    let hosCodes = item.hospitalCode.split(",")
                    if ((hospitalCode == ""||hosCodes.indexOf(hospitalCode)>=0) && item.serTypeCode === "002") {//设计师
                        this.designerList.push({
                            code: item["code"],
                            name: item["serviceName"],
                            text: item["serviceName"] + "(" + item["code"] + ")"
                        });
                    }
                    if ((hospitalCode == ""||hosCodes.indexOf(hospitalCode)>=0)&& item.serTypeCode === "006") {//设计师助理
                        this.designerAssistList.push({
                            code: item["code"],
                            name: item["serviceName"],
                            text: item["serviceName"] + "(" + item["code"] + ")"
                        });
                    }
                }
            },
            //查找项目  下拉补全
            async queryPro(queryString, cb) {
                this.projectList = [];
                // this.initProject()
                if (queryString !== "" && queryString != undefined) {
                    let res = await GetGoodsByKeywords({keywords: queryString.removeSP(), IsMall: 0});
                    this.getProject(res);
                }
                this.ruleForm.projectCode = '';
                this.ruleForm.projectName = '';
                let _this = this;
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    cb(_this.projectList);
                }, 100);
            },
            // 获取项目
            getProject(res) {
                // let res = await GetGoodsByKeywords({keywords: str.removeSP(), IsMall: 0});
                if (res instanceof Array && res.length > 0) {
                    for (let item of res) {
                        ;
                        this.projectList.push({
                            value: "(" +
                            item["GoodsEntity"]["Code"] +
                            ")" +
                            item["GoodsEntity"]["GoodsAlias"],
                            code: item["GoodsEntity"]["Code"],
                            Name: item["GoodsEntity"]["Name"],
                            GoodsAlias: item["GoodsEntity"]["GoodsAlias"],
                            ServiceMan: item["GoodsEntity"]["ServiceMan"],
                            ServiceManName: item["GoodsEntity"]["ServiceManName"],

                            price: item["GoodsEntity"]["PriceSale"],
                            priceRange: item["PriceRange"],
                            FarePercent: item["GoodsEntity"]["FarePercent"],

                            SupplierCode: item["GoodsEntity"]["SupplierCode"],
                            SupplierName: item["GoodsEntity"]["SupplierName"],
                            GUList: item["GUList"]
                        });
                    }
                }
            },

            //点击获取 项目信息  Oject
            selectPro(item) {
                this.proList.push(item)
                this.ruleForm.projectCode = item.code;
                this.ruleForm.projectName = item.GoodsAlias;
            },

            dateChange(val) {
                ;
                this.ruleForm.date = val;
            },
            cancel(formName) {
                for (var p in this.ruleForm) {
                    this.ruleForm[p] = ""
                }
                this.$emit("close", false);
            },
            add(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        let designer = this.ruleForm.designer.length > 0 ? this.ruleForm.designer.split("|")[1] : ""
                        let designerName = this.ruleForm.designer.length > 0 ? this.ruleForm.designer.split("|")[0] : ""
                        let designerAssist = this.ruleForm.designerAssist.length > 0 ? this.ruleForm.designerAssist.split("|")[1] : ""
                        let designerAssistName = this.ruleForm.designerAssist.length > 0 ? this.ruleForm.designerAssist.split("|")[0] : ""
                        let obj = {
                            consultingDate: this.ruleForm.date,
                            consultingName: this.ruleForm.type,
                            customerName: this.ruleForm.customer,
                            customerCode: this.ruleForm.customerCode,
                            phoneNumber: this.ruleForm.phone,
                            referrerCode: this.ruleForm.referrerCode,
                            referrerName: this.ruleForm.referrer,
                            projectCode: this.ruleForm.projectCode,
                            projectName: this.ruleForm.projectName,
                            designer: designer,
                            isDeal:this.ruleForm.isDeal,
                            designerName: designerName,
                            designerAssist: designerAssist,
                            designerAssistName: designerAssistName,
                            consultingContent: this.ruleForm.message,
                            schedulingTypeId:this.ruleForm.typeId,
                            HospitalCode: getCookie("hospitalCode") ? getCookie("hospitalCode") : "HZ100014",
                        };
                        if(this.editMes.id){
                            obj.id = this.editMes.id
                            obj.schedulingId = this.editMes.schedulingId
                            obj.modifiedUserId= getCookie("userId")
                            obj.modifiedBy = getCookie("userName")
                        }else{
                            obj.createUserId= getCookie("userId")
                            obj.createBy = getCookie("userName")
                        }
                        if(this.customer.concatId){
                           obj.SchedulingId =  this.customer.concatId
                        }
                        this.AddConsulting(obj);
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            }
        }
    };
</script>

<style scoped>
    .form_item_ipt {
        width: 200px;
    }

    .form_footer {
        text-align: center;
    }
</style>


