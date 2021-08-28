<template>
    <div>
        <el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" label-width="100px"
                 class="demo-ruleForm">
           
            <el-form-item label="客户姓名：" prop="customerCode" class="form_item_mt15">
                <div class="form_item_ipt">{{ruleForm.customer}}</div>
             
            </el-form-item>
         
            <el-form-item label="推荐人：" prop="refer" class="form_item_mt15">
                <div class="form_item_ipt">{{ruleForm.referrer}}</div>
               
            </el-form-item>
            <el-form-item label="项目：" prop="project" class="form_item_mt15">
                <div class="form_item_ipt">{{ruleForm.project}}</div>
                <!-- <el-autocomplete v-model="ruleForm.project" class="form_item_ipt" :fetch-suggestions="queryPro"
                                 placeholder="请输入内容"
                                 custom-item="my-item-conPro" :trigger-on-focus="false"
                                 @select="selectPro"></el-autocomplete> -->
            </el-form-item>
             <el-form-item label="预约日期：" prop="date" class="form_item_mt15">
                <el-date-picker
                    v-model="date"
                    type="date"
                    class="form_item_ipt"
                    @change="dateChange"
                    placeholder="选择日期">
                </el-date-picker>
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
            <el-form-item label="成交金额：" prop="" style="width:100%">
                <el-input  v-model="ruleForm.realAmount" class="form_item_ipt"></el-input>
            </el-form-item>
            <el-form-item label="备注：" prop="" style="width:100%">
                <el-input type="textarea" :rows="4" v-model="ruleForm.message" style="width:520px"></el-input>
            </el-form-item>
        </el-form>
        <div class="form_footer">
            <el-button @click="add('ruleForm')" type="primary" :loading="saveLoading">确定</el-button>
            <el-button @click="cancel('ruleForm')">取消</el-button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {AddConsulting,GetUserAllByKeywords,GetGoodsByKeywords,GetServiceManList,UpdateDiagInvitations,AddDiagInvitations} from "@/api/myData";
    import Vue from "vue";
    import { getCookie } from "@/config/mUtils";
    // Vue.component("my-item-conPro", {
    //     functional: true,
    //     render: function (h, ctx) {
    //         var item = ctx.props.item;
    //         return h("li", ctx.data, [
    //             h("p", {attrs: {class: "select_name", title: item.Name}}, ["名称：" + item.GoodsAlias]),
    //             h("p", {attrs: {class: "select_code", title: item.Name}}, ["编号：" + item.code]),
    //             h("p", {attrs: {class: "select_code", title: item.Name}}, ["医院：" + item.SupplierName]),
    //             // h("p", {attrs: {class: "select_code", title: item.Name}}, ["医生：" + item.ServiceManName]),
    //             h("p", {attrs: {class: "select_code", title: item.Name}}, ["价格区间：" + item.priceRange])
    //         ]);
    //     },
    //     props: {
    //         item: {type: Object, required: true}
    //     }
    // });
    // Vue.component('my-item-conMember', {
    //     functional: true,
    //     render: function (h, ctx) {
    //         var item = ctx.props.item;
    //         return h('li', ctx.data, [
    //             h('p', {attrs: {class: 'select_name' + item.Type, title: item.name}}, ['名字：' + item.name]),
    //             h('p', {attrs: {class: 'select_name' + item.Type, title: item.name}}, ['编号：' + item.code]),
    //             h('p', {attrs: {class: 'select_name' + item.Type, title: item.name}}, ['手机号：' + item.phone]),
    //             h('p', {attrs: {class: 'select_name' + item.Type, title: item.name}}, ['卡号：' + item.cardNO]),
    //         ]);
    //     },
    //     props: {
    //         item: {type: Object, required: true}
    //     }
    // });

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
                    projectCode: "",
                    designer: "",
                    designerAssist: "",
                    realAmount:'',
                },
                loading: false,
                designerList: [],
                designerAssistList: [],
                branhcList: [],
                projectList: [],
                customerList: [],
                proList: [],
                rules: {
                    customerCode: [{required: true, message: "请输入客户", trigger: "blur"}],
                    phone: [{required: true, message: "请输入电话", trigger: "blur"}],
                    project: [{required: true, message: "请选择", trigger: "blur"}],
                    date: [{required: true, message: "请选择", trigger: "change"}],
                },
            };
        },
        props:{
            revisitData:{},
        },
        created(){
            this.getServiceMan();
        },
        mounted() {
            this.assignment(this.revisitData)
        },
        methods: {
            assignment(data){
                for(var key in data){
                    if(data[key] == null){
                        data[key] = ''
                    }
                }
                
                this.ruleForm = {//添加和编辑时传过来的数值不同
                    date: '',
                    customer: data.customerName,
                    customerCode: data.customerId?data.customerId:data.customerCode,
                    message: data.memo?data.memo:'',
                    referrerCode: data.refrenceBranchCode?data.refrenceBranchCode:data.referrerCode,
                    referrer: data.refrenceBranchName?data.refrenceBranchName:data.referrerName,
                    project: data.projectName,
                    projectCode: data.projectId?data.projectId:data.projectCode,
                    designer: data.designerName?data.designerName+'|'+data.designer:'',
                    designerAssist: data.designerAssistName?data.designerAssistName+'|'+data.designerAssist:'',
                    realAmount:data.realAmount
                }
                let diagDate = data.diagDate?data.diagDate:''
                this.date = diagDate?new Date(diagDate.substring(0,4),diagDate.substring(5,7)-1,diagDate.substring(8,10)):new Date()
            },
            async AddDiagInvitations(params,ope) {
                this.saveLoading = true
                let res
                if(this.revisitData.id){
                    res = await UpdateDiagInvitations(params)
                }else{
                    res = await AddDiagInvitations(params)
                }
                if (res.status) {
                    this.$message({message: ope+'成功',type: 'success'});
                    this.$emit("close", true);
                } else {
                    this.$message.error(ope+'失败'+res.errorMessage);
                }
                this.saveLoading = false
            },

            //获的医护人员
            async getServiceMan() {
                let hospitalCode = getCookie("hospitalCode")
                let res = await GetServiceManList();
                for (let item of res.data) {
                    let hosCodes = item.hospitalCode.split(",")
                    if ((hospitalCode == ""||hosCodes.indexOf(hospitalCode)>=0)&& item.serTypeCode === "002") {//设计师
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
            // async queryPro(queryString, cb) {
            //     this.projectList = [];
            //     if (queryString !== "" && queryString != undefined) {
            //         let res = await GetGoodsByKeywords({keywords: queryString.removeSP(), IsMall: 0});
            //         this.getProject(res);
            //     }
            //     let _this = this;
            //     clearTimeout(this.timeout);
            //     this.timeout = setTimeout(() => {
            //         cb(_this.projectList);
            //     }, 1000 * Math.random());
            // },
            // 获取项目
            // getProject(res) {
            //     if (res instanceof Array && res.length > 0) {
            //         for (let item of res) {
            //             ;
            //             this.projectList.push({
            //                 value: "(" +
            //                 item["GoodsEntity"]["Code"] +
            //                 ")" +
            //                 item["GoodsEntity"]["GoodsAlias"],
            //                 code: item["GoodsEntity"]["Code"],
            //                 Name: item["GoodsEntity"]["Name"],
            //                 GoodsAlias: item["GoodsEntity"]["GoodsAlias"],
            //                 ServiceMan: item["GoodsEntity"]["ServiceMan"],
            //                 ServiceManName: item["GoodsEntity"]["ServiceManName"],

            //                 price: item["GoodsEntity"]["PriceSale"],
            //                 priceRange: item["PriceRange"],
            //                 FarePercent: item["GoodsEntity"]["FarePercent"],

            //                 SupplierCode: item["GoodsEntity"]["SupplierCode"],
            //                 SupplierName: item["GoodsEntity"]["SupplierName"],
            //                 GUList: item["GUList"]
            //             });
            //         }
            //     }
            // },

            //点击获取 项目信息  Oject
            // selectPro(item) {
            //     this.proList.push(item)
            //     this.ruleForm.projectCode = item.code;
            //     this.ruleForm.projectName = item.GoodsAlias;
            // },

            dateChange(val) {
                this.ruleForm.date = val;
            },
            cancel(formName) {
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
                            diagDate: this.ruleForm.date,
                            customerName: this.ruleForm.customer,
                            customerCode: this.ruleForm.customerCode,
                            // phoneNumber: this.ruleForm.phone,
                            referrerCode: this.ruleForm.referrerCode,
                            referrerName: this.ruleForm.referrer,
                            projectCode: this.revisitData.projectId||this.revisitData.projectCode,
                            projectName: this.revisitData.projectName,
                            designer: designer,
                            designerName: designerName,
                            designerAssist: designerAssist,
                            designerAssistName: designerAssistName,
                            memo: this.ruleForm.message,
                            createUserId: getCookie("userId"),
                            createBy: getCookie("userName"),
                            hospitalCode: this.revisitData.hospitalId||this.revisitData.hospitalCode,
                            hospitalName:this.revisitData.hospitalName,
                            realAmount:this.ruleForm.realAmount,
                        }, ope=this.revisitData.id?'编辑':'添加'
                        if(this.revisitData.id){
                            obj.diagStatus = this.revisitData.diagStatus
                            obj.id = this.revisitData.id
                            obj.modifiedUserId =  getCookie("userId")
                            obj.modifiedBy =  getCookie("userName")
                        }else{
                            obj.diagStatus = 0,
                            obj.createUserId =  getCookie("userId")
                            obj.createBy =  getCookie("userName")
                        }
                        this.AddDiagInvitations(obj,ope);
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


