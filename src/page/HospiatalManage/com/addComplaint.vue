<template>
    <div>
        <el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="投诉人姓名：" prop="customerId" class="form_item_mt10" >
                <el-autocomplete v-model="customer" :fetch-suggestions="queryCus" placeholder="请输入内容"
                class="form_item_ipt" :trigger-on-focus="false" @select="selectCus">
                    <template v-slot="{item}">
                        <my-item-conMember :item="item"></my-item-conMember>
                    </template>
                </el-autocomplete>
            </el-form-item>
            <el-form-item label="性别：" prop="sex" class="form_item_mt10" >
                <el-radio-group v-model="ruleForm.sex">
                    <el-radio :label="'1'">男</el-radio>
                    <el-radio :label="'0'">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="年龄：" prop="" class="form_item_mt10" >
                <el-input v-model="ruleForm.age" class="form_item_ipt"></el-input>
            </el-form-item>
            <el-form-item label="事由科室：" class="form_item_mt15" prop="dept">
                <el-select v-model="ruleForm.dept" class="form_item_ipt">
                    <el-option v-for="(item,index) in deptList" :key="index"  :label="item.deptName" :value="item.deptName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="联系电话：" prop="phone" class="form_item_mt10">
                <el-input v-model="ruleForm.phone" class="form_item_ipt"></el-input>
            </el-form-item>
            <el-form-item label="手术医生：" prop="doctor" class="form_item_mt15">
                <el-select v-model="ruleForm.doctor" filterable class="form_item_ipt">
                    <el-option v-for="(item,index) in doctorList" filterable :key="index" :label="item.text" :value="item.name+'|'+item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="治疗项目：" prop="" class="form_item_mt10">
                <el-autocomplete v-model="project" class="form_item_ipt" :fetch-suggestions="queryPro"
                                 placeholder="请输入内容"
                                 :trigger-on-focus="false"
                                 @select="selectPro">
                    <template v-slot="{item}">
                        <my-item-conPro :item="item"></my-item-conPro>
                    </template>
                </el-autocomplete>
            </el-form-item>
            <el-form-item label="设计师：" class="form_item_mt15">
                <el-select v-model="ruleForm.consultant" filterable class="form_item_ipt">
                    <el-option v-for="(item,index) in designerList" filterable :key="index" :label="item.text" :value="item.name+'|'+item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="顾客地址：" prop="" class="form_item_mt10">
                <el-input v-model="ruleForm.cusAddress" class="form_item_ipt"></el-input>
            </el-form-item>
            <el-form-item label="初诊日期：" prop="date" class="form_item_mt10">
                <el-date-picker  v-model="date"  type="date" class="form_item_ipt"  @change="dateChange" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="处理进度：" prop="complaintState" class="form_item_mt10">
                <el-select v-model="ruleForm.complaintState" class="form_item_ipt">
                    <el-option label="待解决" value="0"></el-option>
                    <el-option label="未解决" value="2"></el-option>
                    <el-option label="已解决" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="投诉方式：" prop="way" class="form_item_mt10">
                <el-radio-group v-model="ruleForm.way">
                    <el-radio :label="'0'">来电</el-radio>
                    <el-radio :label="'1'">来访</el-radio>
                    <el-radio :label="'2'">来信</el-radio>
                    <el-radio :label="'3'">其他</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="原因分析：" prop="" class="form_item_mt10" style="width:100%">
                <el-input type="textarea" v-model="ruleForm.anasDesc" style="width:520px" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="调查核实情况：" prop="" class="form_item_mt10" style="width:100%">
                <el-input type="textarea" v-model="ruleForm.verifReasons" style="width:520px" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="处理结果：" prop="" class="form_item_mt10" style="width:100%">
                <el-input type="textarea" v-model="ruleForm.procResult" style="width:520px" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="反馈结果：" prop="" class="form_item_mt10" style="width:100%">
                <el-input type="textarea" v-model="ruleForm.feedResult" style="width:520px" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="备注：" prop="" class="form_item_mt10" style="width:100%">
                <el-input type="textarea" v-model="ruleForm.memo" style="width:520px" :rows="3"></el-input>
            </el-form-item>
        </el-form>
        <div class="form_footer">
            <el-button @click="add('ruleForm')" type="primary" :loading="saveLoading">确定</el-button>
            <el-button @click="cancel('ruleForm')">取消</el-button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {AddComplaint,GetServiceManList,GetDeptAllByHospitalCode,GetGoodsByKeywords,GetUserAllByKeywords,UpdateComplaint} from "@/api/myData";
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
                customer:'',
                project:'',
                ruleForm: {
                    anasDesc:'',
                    verifReasons:'',
                    procResult:'',
                    feedResult:'',
                    dept:'',
                    age:'',
                    sex:'',
                    date: "",
                    customerName: "",
                    customerId:'',
                    projectId:'',
                    projectName:'',
                    memo: "",
                    way:"",
                    phone:'',
                    doctor:'',
                    consultant:'',
                    project:'',
                    reason:'',
                    cusAddress:'',
                    complaintState:'',
                },
                loading: false,
                doctorList: [],
                designerList:[],
                deptList:[],
                projectList:[],
                customerList:[],
                rules: {
                    doctor:[{required: true, message: "请选择", trigger: "change"}],
                    sex:[{required: true, message: "请选择", trigger: "change"}],
                    way: [{required: true, message: "请选择", trigger: "change"}],
                    customerId: [{required: true, message: "请选择投诉人", trigger: "change"}],
                    date: [{required: true, message: "请选择", trigger: "change"}],
                    complaintState:[{required: true, message: "请选择", trigger: "change"}],
                    dept:[{required: true, message: "请选择", trigger: "change"}],
                },
            };
        },
        props:{
            reportMes:{},
            editMes:{},
        },
        created(){
            this.getServiceMan();
        },
        mounted() {
            this.date = new Date();
            this.ruleForm.date = new Date();
        },
        methods: {
            async AddComplaint(params) {
                this.saveLoading = true
                let ope = this.editMes.id?'编辑':'添加',res
                if(this.editMes.id){
                    res = await UpdateComplaint(params)
                }else res = await AddComplaint(params);
                if (res.status) {
                    this.$message({
                        message: ope+'成功',
                        type: 'success'
                    });
                    this.cancel()
                    this.$emit("close", true);
                } else {
                    this.$message.error(ope+'失败！'+res.errorMessage);
                }
                this.saveLoading = false
            },

            //获的医护人员
            async getServiceMan() {
                let hospitalCode = getCookie("hospitalCode")
                let [dept,res] = await Promise.all([GetDeptAllByHospitalCode({HospitalCode: hospitalCode}),GetServiceManList()])
                this.deptList = dept.data
                for (let item of res.data) {
                    let hosCodes = item.hospitalCode.split(",")
                    if ((hospitalCode == ""||hosCodes.indexOf(hospitalCode)>=0) && item.serTypeCode === "001") {//医生
                        this.doctorList.push({
                            code: item["code"],
                            name: item["serviceName"],
                            text: item["serviceName"] + "(" + item["code"] + ")"
                        });
                    }
                    if((hospitalCode == ""||hosCodes.indexOf(hospitalCode)>=0) && item.serTypeCode === "002"){// 设计师
                        this.designerList.push({ 'code': item["code"], 'name': item["serviceName"], text: item["serviceName"] + '(' + item["code"] + ')' })
                    }
                }
                if(this.editMes.id){
                    this.copyData(this.editMes)
                }
                if(this.reportMes){
                    this.getMember(this.reportMes.CustomerId,1)
                    this.ruleForm.projectId = this.reportMes.ProjectId;
                    this.ruleForm.projectName = this.reportMes.ProjectName;
                    this.project = this.reportMes.ProjectName
                    this.ruleForm.consultant = this.reportMes.Designer?this.reportMes.DesignerName+'|'+this.reportMes.Designer:''
                    this.ruleForm.doctor = this.reportMes.ServiceManId?this.reportMes.ServiceManName+'|'+this.reportMes.ServiceManId:''
                }
            },

            copyData(data){
                for(let key in data){
                    if(data[key] == null){
                        data[key] = ''
                    }
                }
                this.customer = data.customerName
                this.project = data.projectName
                this.ruleForm = {
                    anasDesc:data.anasDesc,
                    verifReasons:data.verifReasons,
                    procResult:data.procResult,
                    feedResult:data.feedResult,
                    dept:data.deptName,
                    age:data.age,
                    sex:data.sex+'',
                    date: data.firstDate,
                    customerName: data.customerName,
                    customerId:data.customerId,
                    projectId:data.projectId,
                    projectName:data.projectName,
                    memo: data.memo,
                    way:data.complaintType+'',
                    phone:data.phoneNumber,
                    doctor:data.doctorCode?data.doctorName+'|'+data.doctorCode:'',
                    consultant:data.marketConsultantCode?data.marketConsultantName+'|'+data.marketConsultantCode:'',
                    cusAddress:data.cusAddress,
                    complaintState:data.complaintState+'',
                }
                let date = data.firstDate?data.firstDate:''
                this.date = date?new Date(date.substring(0,4),date.substring(5,7)-1,date.substring(8,10)):''
            },

            dateChange(val) {
                if(val){
                    this.ruleForm.date = val;
                }else this.ruleForm.date = ''
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
                        let obj = {
                            "complaintType": this.ruleForm.way,
                            "customerId": this.ruleForm.customerId,
                            "customerName": this.ruleForm.customerName,
                            "sex": this.ruleForm.sex,
                            "age": this.ruleForm.age,
                            "cusAddress": this.ruleForm.cusAddress,
                            "phoneNumber": this.ruleForm.phone,
                            "deptName": this.ruleForm.dept,
                            "projectId": this.ruleForm.projectId,
                            "projectName":this.ruleForm.projectName,
                            "doctorCode": this.getMes(this.ruleForm.doctor,1),
                            "doctorName": this.getMes(this.ruleForm.doctor,0),
                            "marketConsultantCode": this.getMes(this.ruleForm.consultant,1),
                            "marketConsultantName": this.getMes(this.ruleForm.consultant,0),
                            "firstDate": this.ruleForm.date,
                            "anasDesc": this.ruleForm.anasDesc,
                            "verifReasons": this.ruleForm.verifReasons,
                            "procResult": this.ruleForm.procResult,
                            "feedResult": this.ruleForm.feedResult,
                            "memo": this.ruleForm.memo,
                            complaintState:this.ruleForm.complaintState,
                        };
                        if(this.editMes.id){
                            obj.modifiedUserId = getCookie("userId")
                            obj.modifiedBy = getCookie("userName")
                            let editObj = Object.assign({},this.editMes,obj)
                            this.AddComplaint(editObj);
                        }else{
                            obj.createUserId = getCookie("userId")
                            obj.createBy = getCookie("userName")
                            this.AddComplaint(obj);
                        }
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            },

            getMes(val,index){
                if(val){
                    return val.split("|")[index]
                }else{
                    return ''
                }
            },

            //查找项目  下拉补全
            async queryPro(queryString, cb) {
                this.projectList = [];
                if (queryString !== "" && queryString != undefined) {
                    let res = await GetGoodsByKeywords({keywords: queryString.removeSP(), IsMall: 0});
                    this.getProject(res);
                }
                this.ruleForm.projectId = '';
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
                        this.projectList.push({
                            value: "(" +item["GoodsEntity"]["Code"] + ")" + item["GoodsEntity"]["GoodsAlias"],
                            code: item["GoodsEntity"]["Code"],
                            Name: item["GoodsEntity"]["Name"],
                            GoodsAlias: item["GoodsEntity"]["GoodsAlias"],
                            priceRange: item["PriceRange"],
                            SupplierName: item["GoodsEntity"]["SupplierName"],
                        });
                    }
                }
            },
            //点击获取 项目信息  Oject
            selectPro(item) {
                this.ruleForm.projectId = item.code
                this.ruleForm.projectName = item.GoodsAlias
            },

            async getMember(str,ope){
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
                            cardNO: item["CardNO"] ? item["CardNO"] : "",
                            address:item.Address,
                            province:item.Province,
                            city:item.City,
                            area:item.Area,
                            sex:item.Sex,
                            birthday:item.Birthday,
                        })
                    }
                }
                if(ope){
                    setTimeout(()=>{
                        this.selectCus(this.customerList[0])
                        this.customer = this.ruleForm.customerName
                    },50)
                }
            },
            //查找会员 下拉补全
            queryCus(queryString, cb) {
                this.customerList = []
                if (queryString !== '' && queryString != undefined) {
                    this.getMember(queryString)
                }
                this.ruleForm.customerName = ''
                this.ruleForm.customerId = ''
                this.ruleForm.phone = ''
                this.ruleForm.sex = ''
                this.ruleForm.cusAddress = ''
                this.ruleForm.age = ''
                let _this = this
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    cb(_this.customerList);
                }, 1000);
            },
            //点击获取 会员信息  Oject
            selectCus(item) {
                for(let key in item){
                    if(item[key] == null){
                        item[key] = ''
                    }
                }
                this.ruleForm.customerName = item.name
                this.ruleForm.customerId = item.code
                this.ruleForm.phone = item.phone
                this.ruleForm.sex = item.sex
                this.ruleForm.cusAddress = item.province+item.city+item.area+item.address
                this.ruleForm.age = item.birthday?new Date().getFullYear()-item.birthday.substring(0,4):''
            },
        }
    };
</script>

<style scoped>
    .form_item_ipt {
        width: 220px;
    }

    .form_footer {
        text-align: center;
    }
</style>


