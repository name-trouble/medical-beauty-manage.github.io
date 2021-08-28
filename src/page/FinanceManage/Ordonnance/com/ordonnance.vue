<template>
   <div class="ord">
        <el-form :model="ruleForm" :rules="rules" :inline="true" ref="ruleForm" label-width="90px" class="">
            <el-form-item label="姓名：" prop="customerId" class="form_item_wt255 form_item_mt10">
                <el-autocomplete v-model="customer" :fetch-suggestions="queryCus" placeholder="请输入内容"
                                     :trigger-on-focus="false" @select="selectCus" style="width:280px;float:left">
                    <template v-slot="{item}">
                        <my-item-ordon :item="item"></my-item-ordon>
                    </template>
                </el-autocomplete>
            </el-form-item>
             <el-form-item label="性别：" class="form_item_wt255 form_item_mt10">
                <el-radio class="radio" v-model="ruleForm.sex" label="0">女</el-radio>
                <el-radio class="radio" v-model="ruleForm.sex" label="1">男</el-radio>
            </el-form-item>
             <el-form-item label="年龄：" class="form_item_wt255 form_item_mt10">
                <el-input-number v-model="ruleForm.age" style="width:280px" :controls="false"></el-input-number>
            </el-form-item>

             <el-form-item label="医院：" prop="hospitalCode" class="form_item_wt255 form_item_mt10">
                <el-select v-model="ruleForm.hospital" style="width:280px;"  @change="hosChange">
                    <el-option v-for="(item,index) in hospitalList" :key="index" :label="item.supplierName" :value="item.code+'|'+item.supplierName"></el-option>
                </el-select>
            </el-form-item>

             <el-form-item label="科室：" class="form_item_wt255 form_item_mt10" >
                <el-select v-model="ruleForm.dpt" class="form_item_ipt153" @change="dptChange">
                    <el-option v-for="(item,index) in deptList" :key="index" :label="item.deptName" :value="item.deptCode+'|'+item.deptName"></el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="临床诊断：" class="form_item_wt255 form_item_mt10" >
                    <el-select v-model="ruleForm.diag" filterable="" allow-create style="width:280px;float:left;">
                        <el-option v-for="(item,index) in diaList" :key="index" :label="item" :value="item"></el-option>
                    </el-select>
            </el-form-item>
             <el-form-item label="服务者：" class="form_item_wt255 form_item_mt10">
                <el-select v-model="ruleForm.nurse" style="width:280px;" @change="nurseSelect" filterable>
                    <el-option value="" label="空"></el-option>
                    <el-option v-for="(item,$index) in nurseList" :key="$index" :label="item.text" :value="item.code+'|'+item.name"></el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="日期：" class="form_item_wt255 form_item_mt10">
                <el-date-picker
                    v-model="date"
                    type="date"
                    @change="dateChange"
                    style="width:280px"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
             <el-form-item label="费别：" class="form_item_wt255 form_item_mt10">
                <el-select v-model="ruleForm.fb" style="width:280px">
                    <el-option label="空" value=""></el-option>
                    <el-option label="自费" value="自费"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="联系电话：" class="form_item_wt255 form_item_mt10">
                <el-input v-model="ruleForm.phone" style="width:280px"></el-input>
            </el-form-item>
            <el-form-item label="卡号：" class="form_item_wt255 form_item_mt10">
                <el-input v-model="ruleForm.cardNo" style="width:280px"></el-input>
            </el-form-item>
            <el-form-item label="地址：" prop="address" class="form_item_wt255 form_item_mt10">
                <el-input v-model="ruleForm.address" style="width:280px"></el-input>
            </el-form-item>
            <!-- <el-form-item label="药品模板：" class="form_item_wt255 form_item_mt10">
                <el-select v-model="ruleForm.module" style="width:280px" @change="templateChange">
                    <el-option label="不选择模板" value=""></el-option>
                    <el-option v-for="(item,index) in moduleList" :key="index" :label="item.templatName" :value="item.id"></el-option>
                </el-select>
            </el-form-item> -->
            <br/>
            <el-form-item label="药品信息："  label-width="100px" class=" form_item_mt0"></el-form-item>
            <el-form-item label=" "  label-width="20px" class=" form_item_mt10">
                <el-table :data="tableData" border style="width: 920px;margin-bottom:10px">
                    <el-table-column prop="catalogId" label="组别" min-width="60"> </el-table-column>
                    <el-table-column prop="productName" :label="goodsType==1?'药品名称':'产品名称'" min-width="120" show-overflow-tooltip> </el-table-column>
                    <el-table-column prop="unitName" label="规格" min-width="110" show-overflow-tooltip> </el-table-column>
                    <el-table-column prop="quantity" label="数量" min-width="70">
                        <template slot-scope="scope">
                             <el-input-number v-model="scope.row.quantity" :max="scope.row.max" @change="NumChange(scope.$index,scope.row.quantity)" style="width:90%" :controls="false"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column prop="price" label="价格"  min-width="70">
                        <template slot-scope="scope">
                             <el-input-number v-model="scope.row.price" @change="NumChange(scope.$index,scope.row.price)" style="width:90%" :controls="false"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column prop="dwName" label="单位"  min-width="70"> </el-table-column>
                    <el-table-column prop="usage" label="用法"  min-width="90"> </el-table-column>
                    <el-table-column prop="frequency" label="频次"  min-width="70"> </el-table-column>
                    <el-table-column prop="days" label="天数"  min-width="70"> </el-table-column>
                    <el-table-column prop="memo" label="备注"  min-width="90"> </el-table-column>
                    <el-table-column prop="address" label="操作"  min-width="80">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="del(scope.$index,tableData)" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="primary" @click="add" size="small" v-text="goodsType==1?'添加药品':'添加产品'"></el-button><br/>
                <span>药品金额：{{totalPrice}}</span>
            </el-form-item>
            <el-form-item label="备注：" class="form_item_mt10">
                    <el-input type="textarea" v-model="ruleForm.memo" :rows="3" style="width:784px"></el-input>
                </el-form-item>
        </el-form>
        <div class="form_footer">
            <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
        </div>

   </div>
</template>

<script>
    import addr from "../../../../../static/address.json"
    import { getCookie } from "@/config/mUtils";
    import {GetUserAllByKeywords,getUserById,GetDeptAllByHospitalCode,GetDropDownPermission,GetGoodsByKeywords,GetWarehouse,GetPrintTemplatList,GetPrintDetailList,
    GetServiceManList,GetGoodsByKeywords2,AddProofOrderProduct} from "@/api/myData"
    import Vue from "vue"
    import "../lib/ord.less"
    Vue.component('my-item-ordon', {
        functional: true,
        render: function(h, ctx) {
            var item = ctx.props.item;
            return h('div', ctx.data, [
                h('p', { attrs: { class: 'select_name'+item.Type, title: item.name } }, ['名字：' + item.MemberName]),
                h('p', { attrs: { class: 'select_name'+item.Type, title: item.name} }, ['编号：' + item.Code]),
                h('p', { attrs: { class: 'select_name'+item.Type, title: item.name} }, ['手机号：' + item.PhoneNumber]),
                h('p', { attrs: { class: 'select_name'+item.Type, title: item.name} }, ['卡号：' + item.CardNO]),
            ]);
        },
        props: {
            item: { type: Object, required: true }
        }
    });
    Vue.component('my-item-reportProject', {
        functional: true,
        render: function(h, ctx) {
            var item = ctx.props.item;
            return h('div', ctx.data, [
                h('p', { attrs: { class: 'select_name', title: item.Name } }, ['名称：' + item.GoodsAlias]),
                h('p', { attrs: { class: 'select_code', title: item.Name } }, ['编号：' + item.GoodsCode]),
                h('p', { attrs: { class: 'select_code', title: item.Name } }, ['医院：' + item.SupplierName]),
                h('p', { attrs: { class: 'select_code', title: item.Name } }, ['价格区间：' + item.priceRange])
            ]);
        },
        props: {
            item: { type: Object, required: true }
        }
    });
    export default {
        data() {
        return {
            saveLoading : false,
            date:"",
            customer:"",
            // project:"",
            tableData:[],
            // catalogList:[1,2,3,4,5,6],
            diaList:['重睑术后', '重睑修复术后','隆鼻修复术后','注射隆鼻术后', '假体隆鼻术后', '面部软组织萎缩术后', '下颏短小术后', '眼袋术后', '上睑皮肤松弛术后',
            '内眦赘皮术后', '腹部脂肪堆积术后', '双上臂脂肪堆积术后', '双大腿脂肪堆积术后', '面颊脂肪堆积术后', '下巴脂肪堆积术后','线雕术后','小乳术后','隆胸术后'],
                ruleForm: {
                    customerId:"",
                    customerName: '',
                    customerGradeName:"",
                    sex:"0",
                    date:"",
                    age:"",
                    address:"",
                    phone:"",
                    dpt:"",
                    diag:"",
                    fb:"自费",
                    refrenceBranchCode:"",
                    refrenceBranchName:"",
                    memo:"",
                    nurse:"",
                    nurseId:"",
                    nurseName:"",
                    DeptCode:"",
                    DeptName:"",
                    hospital:"",
                    hospitalName:"",
                    hospitalCode:"",
                    cardNo:"",
                    module:'',
                },
                deptList:[],//科室
                customerList:[],
                hospitalList:[],
                dialogFormVisible:false,
                rules: {
                    customerId: [
                        { required: true, message: '请输入'},
                    ],
                    hospitalCode: [
                        { required: true, message: '选择', trigger: 'change' },
                    ],
                    address:[
                        { required: true, message: '请填写地址', trigger: 'blur' },
                    ]
                },
                nurseList:[],
                allWhlist:[],
                whList:[],
                moduleList:[],
        };
    },
    props:{
        goodsType:{//1 处方单  4产品单
            default:1
        }
    },
    computed:{
        totalPrice(){
            if(this.tableData.length == 0){
                return 0
            }else{
                let sum = 0
                this.tableData.forEach(row => {
                    sum= sum.add(row.realAmount)
                });
                return sum
            }
        }
    },
    mounted(){
        this.date = new Date()
        this.ruleForm.date = new Date()
        this.getServiceMan()
    },
    methods: {
        async templateChange(val){
            if(val){
                let res = await GetPrintDetailList({id:val})
                this.tableData = res.data
            }else{
                this.tableData = []
            }
        },
        // 修改数量联动总价和出库单变化
        NumChange(index,data,num){
            let vm = this
            setTimeout(function() {
                vm.tableData[index].realAmount = vm.tableData[index].quantity.mul(vm.tableData[index].price).mul(vm.tableData[index].days)
                vm.tableData[index].totalQuantity = vm.tableData[index].quantity.mul(vm.tableData[index].days)
            }, 50)
        },
        async AddProofOrderProduct(params){

            this.saveLoading = true
            let res = await AddProofOrderProduct(params)

            if(res.status){
                this.$message({ type: 'success', message: '操作成功!' })
                this.$emit("addClose",true)
            }else{
                this.$message({ type: 'warning', message: '添加失败!'+res.errorMessage })
            }
            // this.saveLoading = false
        },
        //获的医护人员
        async getServiceMan() {
            this.address = addr.randomAddress//随机地址
            let [Hos,res,whList,template] = await Promise.all([GetDropDownPermission({typeId: 1}),GetServiceManList(),
            GetWarehouse({"hospitalCode": "",pageIndex:1,pageSize:100,keywords:"",typeId:1}),GetPrintTemplatList({ KeyWords:'',PageSize:1,PageIndex:1,
            hospitalCode:getCookie("hospitalCode")})])
            this.hospitalList = Hos.data
            let hospitalCode = getCookie("hospitalCode")
            this.moduleList = template.data
            if(hospitalCode){
                this.hospitalList.forEach(ele=>{
                    if(ele.code == hospitalCode){
                        this.ruleForm.hospital = ele.code+'|'+ele.supplierName
                    }
                })
            }
            for (let item of res.data) {
                let hosCodes = item.hospitalCode.split(",")
                if ((hospitalCode == ""||hosCodes.indexOf(hospitalCode)>=0)) {
                    this.nurseList.push({
                        code: item["code"],
                        name: item["serviceName"],
                        text: item["serviceName"] + "(" + item["code"] + ")",
                    });
                }
            }
            this.allWhlist =JSON.parse(JSON.stringify(whList.data))
        },
        dateChange(val){
            this.ruleForm.date = val
        },
        getMember(res) {
            // let res = await GetUserAllByKeywords({ 'keywords': str.removeSP() })
            if (res instanceof Array && res.length > 0) {
                for (let item of res) {
                    item.value =item["MemberName"]
                    item.name = item["MemberName"],
                    item.Type = item.Type == 1?"black":"red"
                    item.CardNO = item["CardNO"]?item["CardNO"]:""
                    this.customerList.push(item)
                }
            }
        },
            //查找会员 下拉补全
            async queryCus(queryString, cb) {
                // queryString=enCode(queryString)
                this.customerList = []
                if (queryString !== '' && queryString != undefined) {
                    let res = await GetUserAllByKeywords({ 'keywords': queryString.removeSP() })
                    this.getMember(res)
                }
                this.ruleForm.refrenceBranchCode = ''
                this.ruleForm.refrenceBranchName = ''
                this.ruleForm.customerId = ""
                this.ruleForm.customerName = ''
                this.ruleForm.customerGradeName = ""
                let _this = this
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    cb(_this.customerList);
                }, 100);
            },

            //点击获取 会员信息  Oject
            selectCus(item) {
                for(var p in item){
                    if(item[p] == null||item[p] == undefined){
                        item[p] = ""
                    }
                }
                item["Address"] = item["Province"]+item["City"]+item["Area"]+item["Address"].split(",").join("")
                if(item["Birthday"].length>0&&item["Birthday"].substring(0,10) != 1900){
                    this.ruleForm.age = (new Date()).getFullYear() - Number(item["Birthday"].substring(0,4))
                }else{
                    this.ruleForm.age = ""
                }
                this.ruleForm.customerName = item["MemberName"]
                this.ruleForm.customerId = item["Code"]
                this.ruleForm.customerGradeName = item["CustomerGradeName"]
                if(item["Address"]){
                    this.ruleForm.address = item["Address"]
                }else{//使用随机地址
                this.ruleForm.address = ''
                    // this.$message({message: '该会员注册地址不详，将使用随机地址',type: 'warning'});

                    // this.ruleForm.address = this.address[Math.floor(Math.random()*167+0)].Address
                }
                item["sex"] = item["Sex"]
                this.ruleForm.phone = item["PhoneNumber"]
                this.ruleForm.refrenceBranchCode = item.ReferrerCode? item.ReferrerCode:""
                this.ruleForm.refrenceBranchName = item.ReferrerName? item.ReferrerName:""

                this.ruleForm.cardNo = item.CardNO?item.CardNO:""
            },
            nurseSelect(){

                if(this.ruleForm.nurse.length==0){
                    this.ruleForm.nurseId = ""
                    this.ruleForm.nurseName = ""
                }else{
                    this.ruleForm.nurseId = this.ruleForm.nurse.split("|")[0]
                    this.ruleForm.nurseName = this.ruleForm.nurse.split("|")[1]
                }
            },

            async hosChange(){

                if(this.ruleForm.hospital.length==0){
                    this.ruleForm.hospitalCode = ""
                    this.ruleForm.hospitalName = ""
                }else{
                    this.ruleForm.hospitalCode = this.ruleForm.hospital.split("|")[0]
                    this.ruleForm.hospitalName = this.ruleForm.hospital.split("|")[1]
                }
                let dept = await GetDeptAllByHospitalCode({HospitalCode:this.ruleForm.hospitalCode})
                if(this.ruleForm.hospitalCode!=""){
                    this.deptList = dept.data
                }else{
                    this.deptList = []
                }
                this.allWhlist.forEach(ele=>{
                    if(ele.hospitalCode == this.ruleForm.hospitalCode){
                        this.whList.push(ele)
                    }
                })
            },

            dptChange(){
                if(this.ruleForm.dpt.length==0){
                    this.ruleForm.DeptCode = ""
                    this.ruleForm.DeptName = ""
                }else{
                    this.ruleForm.DeptCode = this.ruleForm.dpt.split("|")[0]
                    this.ruleForm.DeptName = this.ruleForm.dpt.split("|")[1]
                }
            },

        add(){
            this.$emit('openSelDrug',true,'add',{
                "warehouseId": this.whList.length>0?this.whList[0].id:'',
                "hospitalCode": this.ruleForm.hospitalCode
            })
            // this.drug = ""
            // this.dialogFormVisible = true
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let obj = {//产品单数据
                        'orderDate':this.ruleForm.date,
                        'age':this.ruleForm.age,
                        'phoneNumber':this.ruleForm.phone,
                        'customerAddress':this.ruleForm.address,
                        'deptCode':this.ruleForm.DeptCode,
                        'deptName':this.ruleForm.DeptName,
                        'hospitalCode':this.ruleForm.hospitalCode,
                        'hospitalName':this.ruleForm.hospitalName,
                        'sex':this.ruleForm.sex,
                        "customerId": this.ruleForm.customerId,
                        "customerName": this.ruleForm.customerName,
                        "refrenceBranchCode": this.ruleForm.refrenceBranchCode,
                        "refrenceBranchName": this.ruleForm.refrenceBranchName,
                        "nurseId": this.ruleForm.nurseId,
                        "nurseName":  this.ruleForm.nurseName,
                        "costCategory": this.ruleForm.fb,
                        "diagnosis": this.ruleForm.diag,
                        "totalAmount":this.totalPrice,
                        "memo": this.ruleForm.memo,
                        "createUserId": getCookie("userId"),
                        "createBy": getCookie("userName"),
                        "productList": JSON.stringify(this.tableData),
                        'isPayOff':0,
                        'cardNo':this.ruleForm.cardNo,
                        goodsType:this.goodsType,
                    }
                    this.AddProofOrderProduct(obj)
                }
            });
        },
        resetForm(formName) {
            this.$emit("addClose",false)
        },
        addDrugs(obj){
                    // 判断表格中是否存在相同药品
                    let flg = true
                    if(this.tableData.length>=5){
                        this.$message({message: '处方单最多添加五种药品',type: 'warning'});
                        return false;
                    }
                    this.tableData.forEach(ele=>{
                        if(ele.unitId == obj.unitId){
                            if(ele.catalogId == obj.catalogId){
                                flg = false
                                this.$message({message: '列表已存在相同药品且组别相同,请直接修改数量',type: 'warning'});
                                return false
                            }
                        }

                            if(ele.usage == '口服'&&obj.usage=='外用'||ele.usage == '外用'&&obj.usage=='口服'){
                                flg = false
                                this.$message({message: '口服和外用不能存在同一张处方单中！',type: 'warning'});
                                return false
                            }
                            if((ele.usage == '口服'&&obj.usage=='口服')&&(ele.catalogId ==obj.catalogId)){
                                flg = false
                                this.$message({message: '口服同一组别只能存在一个！',type: 'warning'});
                                return false
                            }
                    })
                    if(flg){
                        this.tableData.push(JSON.parse(JSON.stringify(obj)))
                        this.$emit('openSelDrug',false)//关闭弹窗
                    }
        },

        del(index,data){

            this.tableData.splice(index,1)
        }
    }
  }
</script>

<style scoped>
.demo-ruleForm{
    width: 300px
}
.form_footer{
    text-align: center;
    padding: 10px 0
}
.form_item_ipt153{
    width: 280px
}
.form_item_wt255{
    width: 400px
}
</style>

