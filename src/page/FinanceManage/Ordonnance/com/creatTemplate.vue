<template>
   <div class="ord">
        <el-form :model="ruleForm" :rules="rules" :inline="true" ref="ruleForm" label-width="90px" class="">
            <!-- <el-form-item label="姓名：" prop="customerId" class="form_item_wt255 form_item_mt10">
                <el-autocomplete v-model="customer" :fetch-suggestions="queryCus" placeholder="请输入内容"
                                     :trigger-on-focus="false" custom-item="my-item-ordon" @select="selectCus" style="width:260px;float:left">
                </el-autocomplete>
            </el-form-item> -->
             <!-- <el-form-item label="性别：" class="form_item_wt255 form_item_mt10">
                <el-radio class="radio" v-model="ruleForm.sex" label="0">女</el-radio>
                <el-radio class="radio" v-model="ruleForm.sex" label="1">男</el-radio>
            </el-form-item>
             <el-form-item label="年龄：" class="form_item_wt255 form_item_mt10">
                <el-input-number v-model="ruleForm.age" style="width:260px" :controls="false"></el-input-number>
            </el-form-item> -->
            <el-form-item label="模板名称：" class="form_item_wt255 form_item_mt10">
                <span>{{ruleForm.templateName}}</span> 
            </el-form-item>
             <el-form-item label="医院：" class="form_item_wt255 form_item_mt10">
                <span>{{ruleForm.hospital}}</span>
                <!-- <el-select v-model="ruleForm.hospital" style="width:260px;"  @change="hosChange">
                    <el-option v-for="(item,index) in hospitalList" :key="index" :label="item.supplierName" :value="item.code+'|'+item.supplierName"></el-option>
                </el-select> -->
            </el-form-item>

            <!-- <el-form-item label="科室：" class="form_item_wt255 form_item_mt10" >
                <el-select v-model="ruleForm.dpt" class="form_item_ipt153" @change="dptChange">
                    <el-option v-for="(item,index) in deptList" :key="index" :label="item.deptName" :value="item.deptCode+'|'+item.deptName"></el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="临床诊断：" class="form_item_wt255 form_item_mt10" >
                    <el-select v-model="ruleForm.diag" style="width:260px;float:left;">
                        <el-option v-for="(item,index) in diaList" :key="index" :label="item" :value="item"></el-option>
                    </el-select>
            </el-form-item>
             <el-form-item label="服务者：" class="form_item_wt255 form_item_mt10">
                <el-select v-model="ruleForm.nurse" style="width:260px;" @change="nurseSelect" filterable>
                    <el-option value="" label="空"></el-option>
                    <el-option v-for="(item,$index) in nurseList" :key="$index" :label="item.text" :value="item.code+'|'+item.name"></el-option>
                </el-select>
            </el-form-item> -->
             <!-- <el-form-item label="日期：" class="form_item_wt255 form_item_mt10">
                <el-date-picker
                    v-model="date"
                    type="date"
                    @change="dateChange"
                    style="width:260px"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item> -->
             <!-- <el-form-item label="费别：" class="form_item_wt255 form_item_mt10">
                <el-select v-model="ruleForm.fb" style="width:260px">
                    <el-option label="空" value=""></el-option>
                    <el-option label="自费" value="自费"></el-option>
                </el-select>
            </el-form-item> -->
            <br/>
            <el-form-item label="药品信息："  label-width="100px" class=" form_item_mt0"></el-form-item>
            <el-form-item label=" "  label-width="20px" class=" form_item_mt10">
                <el-table :data="tableData" height="250" border style="width: 920px;margin-bottom:10px">
                    <el-table-column prop="catalogId" label="组别" min-width="60"> </el-table-column>
                    <el-table-column prop="productName" label="药品名称" min-width="120"> </el-table-column>
                    <el-table-column prop="unitName" label="规格" min-width="90"> </el-table-column>
                    <el-table-column prop="quantity" label="数量" min-width="70">
                        <template slot-scope="scope">
                             <el-input-number v-if="editMes.footerShow" v-model="scope.row.quantity" :max="scope.row.max" @change="NumChange(scope.$index,scope.row.quantity)" style="width:90%" :controls="false"></el-input-number>
                            <span v-else>{{scope.row.quantity}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="price" label="价格"  min-width="70"> </el-table-column> 
                    <el-table-column prop="dwName" label="单位"  min-width="70"> </el-table-column>
                    <el-table-column prop="usage" label="用法"  min-width="90"> </el-table-column>
                    <el-table-column prop="frequency" label="频次"  min-width="70"> </el-table-column>
                    <el-table-column prop="days" label="天数"  min-width="70"> </el-table-column>
                    <el-table-column prop="memo" label="备注"  min-width="90"> </el-table-column>
                    <el-table-column prop="address" label="操作"  min-width="80" v-if="editMes.footerShow">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="del(scope.$index,tableData)" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="primary" @click="add" size="small" v-if="editMes.footerShow">添加药品</el-button><br/>
                <!-- <span>药品金额：{{totalPrice}}</span> -->
            </el-form-item>
            <!-- <el-form-item label="备注：" class="form_item_mt10">
                <el-input type="textarea" v-model="ruleForm.memo" :rows="3" style="width:784px"></el-input>
            </el-form-item> -->
        </el-form>
        <div class="form_footer" v-if="editMes.footerShow">
            <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
        </div>
   </div>
</template>

<script>
    import { getCookie } from "@/config/mUtils";
    import {GetUserAllByKeywords,getUserById,GetDeptAllByHospitalCode,GetDropDownPermission,GetGoodsByKeywords,GetWarehouse,GetPrintDetailList,
    GetServiceManList,GetGoodsByKeywords2,AddPrintDetail} from "@/api/myData"
    import Vue from "vue"
    import "../lib/ord.less"
    // Vue.component('my-item-ordon', {
    //     functional: true,
    //     render: function(h, ctx) {
    //         var item = ctx.props.item;
    //         return h('li', ctx.data, [
    //             h('p', { attrs: { class: 'select_name'+item.Type, title: item.name } }, ['名字：' + item.MemberName]),
    //             h('p', { attrs: { class: 'select_name'+item.Type, title: item.name} }, ['编号：' + item.Code]),
    //             h('p', { attrs: { class: 'select_name'+item.Type, title: item.name} }, ['手机号：' + item.PhoneNumber]),
    //             h('p', { attrs: { class: 'select_name'+item.Type, title: item.name} }, ['卡号：' + item.CardNO]),
    //         ]);
    //     },
    //     props: {
    //         item: { type: Object, required: true }
    //     }
    // });
    // Vue.component('my-item-reportProject', {
    //     functional: true,
    //     render: function(h, ctx) {
    //         var item = ctx.props.item;
    //         return h('li', ctx.data, [
    //             h('p', { attrs: { class: 'select_name', title: item.Name } }, ['名称：' + item.GoodsAlias]),
    //             h('p', { attrs: { class: 'select_code', title: item.Name } }, ['编号：' + item.GoodsCode]),
    //             h('p', { attrs: { class: 'select_code', title: item.Name } }, ['医院：' + item.SupplierName]),
    //             h('p', { attrs: { class: 'select_code', title: item.Name } }, ['价格区间：' + item.priceRange])
    //         ]);
    //     },
    //     props: {
    //         item: { type: Object, required: true }
    //     }
    // });
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
                    templateName:"",
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
                },
                nurseList:[],
                allWhlist:[],
                whList:[],
        };
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
    props:{
        editMes:{},
    },
    mounted(){
        this.date = new Date()
        if(this.editMes.id){
            this.ruleForm.templateName = this.editMes.templatName
            this.ruleForm.hospital = this.editMes.hospitalName
            this.getTable()
        }
    },
    methods: {
        async getTable(){
            let res = await GetPrintDetailList({id:this.editMes.id})
            this.tableData = res.data
        },
        // 修改数量联动总价和出库单变化
        NumChange(index,data,num){
            let vm = this
            setTimeout(function() {
               vm.tableData[index].realAmount = vm.tableData[index].quantity.mul(vm.tableData[index].price)
            }, 50)
        },
        async AddPrintDetail(params){
            
            this.saveLoading = true
            let res = await AddPrintDetail(params)
            
            if(res.status){
                this.$message({ type: 'success', message: '操作成功!' })
                this.$emit("addClose",true)
            }else{
                this.$message({ type: 'warning', message: '添加失败!'+res.errorMessage })
            }
            // this.saveLoading = false
        },
        //获的医护人员
        // async getServiceMan() {
        //     let [Hos,res,whList] = await Promise.all([GetDropDownPermission({typeId: 1}),GetServiceManList(),
        //     GetWarehouse({"hospitalCode": "",pageIndex:1,pageSize:100,keywords:"",typeId:1})])
        //     this.hospitalList = Hos.data
        //     let hospitalCode = getCookie("hospitalCode")
        //     if(hospitalCode){
        //         this.hospitalList.forEach(ele=>{
        //             if(ele.code == hospitalCode){
        //                 this.ruleForm.hospital = ele.code+'|'+ele.supplierName
        //             }
        //         })
        //     }
        //     for (let item of res.data) {
        //         let hosCodes = item.hospitalCode.split(",")
        //         if ((hospitalCode == ""||hosCodes.indexOf(hospitalCode)>=0)) {
        //             this.nurseList.push({
        //                 code: item["code"],
        //                 name: item["serviceName"],
        //                 text: item["serviceName"] + "(" + item["code"] + ")",
        //             });
        //         }
        //     }
        //     this.allWhlist =JSON.parse(JSON.stringify(whList.data))
        // },
        // dateChange(val){
        //     this.ruleForm.date = val
        // },
        // async getMember(str) {
        //     let res = await GetUserAllByKeywords({ 'keywords': str.removeSP() })
        //     if (res instanceof Array && res.length > 0) {
        //         for (let item of res) {
        //             item.value =item["MemberName"]
        //             item.name = item["MemberName"],
        //             item.Type = item.Type == 1?"black":"red"
        //             item.CardNO = item["CardNO"]?item["CardNO"]:""
        //             this.customerList.push(item)
        //         }
        //     }
        // },
            //查找会员 下拉补全
            // queryCus(queryString, cb) {
            //     // queryString=enCode(queryString)
            //     this.customerList = []
            //     if (queryString !== '' && queryString != undefined) {
            //         this.getMember(queryString)
            //     }
            //     this.ruleForm.refrenceBranchCode = ''
            //     this.ruleForm.refrenceBranchName = ''
            //     this.ruleForm.customerId = ""
            //     this.ruleForm.customerName = ''
            //     this.ruleForm.customerGradeName = ""
            //     let _this = this
            //     clearTimeout(this.timeout);
            //     this.timeout = setTimeout(() => {
            //         cb(_this.customerList);
            //     }, 1000 * Math.random());
            // },

            //点击获取 会员信息  Oject
            // selectCus(item) {
            //     
            //     console.log(this.customer)
            //     for(var p in item){
            //         if(item[p] == null||item[p] == undefined){
            //             item[p] = ""
            //         }
            //     }
            //     item["Address"] = item["Province"]+item["City"]+item["Area"]+item["Address"].split(",").join("")
            //     if(item["Birthday"].length>0&&item["Birthday"].substring(0,10) != 1900){
            //         this.ruleForm.age = (new Date()).getFullYear() - Number(item["Birthday"].substring(0,4))
            //     }else{
            //         this.ruleForm.age = ""
            //     }
            //     this.ruleForm.customerName = item["MemberName"]
            //     this.ruleForm.customerId = item["Code"]
            //     this.ruleForm.customerGradeName = item["CustomerGradeName"]
            //     
            //     this.ruleForm.address = item["Address"]
            //     item["sex"] = item["Sex"]
            //     this.ruleForm.phone = item["PhoneNumber"]
            //     this.ruleForm.refrenceBranchCode = item.ReferrerCode? item.ReferrerCode:""
            //     this.ruleForm.refrenceBranchName = item.ReferrerName? item.ReferrerName:""
            //     
            //     this.ruleForm.cardNo = item.CardNO?item.CardNO:""
            // },
            // nurseSelect(){
            //     
            //     if(this.ruleForm.nurse.length==0){
            //         this.ruleForm.nurseId = ""
            //         this.ruleForm.nurseName = ""
            //     }else{
            //         this.ruleForm.nurseId = this.ruleForm.nurse.split("|")[0]
            //         this.ruleForm.nurseName = this.ruleForm.nurse.split("|")[1]
            //     }
            // },

            // async hosChange(){
            //     
            //     if(this.ruleForm.hospital.length==0){
            //         this.ruleForm.hospitalCode = ""
            //         this.ruleForm.hospitalName = ""
            //     }else{
            //         this.ruleForm.hospitalCode = this.ruleForm.hospital.split("|")[0]
            //         this.ruleForm.hospitalName = this.ruleForm.hospital.split("|")[1]
            //     }
            //     let dept = await GetDeptAllByHospitalCode({HospitalCode:this.ruleForm.hospitalCode})
            //     if(this.ruleForm.hospitalCode!=""){
            //         this.deptList = dept.data
            //     }else{
            //         this.deptList = []
            //     }
            //     this.allWhlist.forEach(ele=>{
            //         if(ele.hospitalCode == this.ruleForm.hospitalCode){
            //             this.whList.push(ele)
            //         }
            //     })
            // },

            // dptChange(){
            //     if(this.ruleForm.dpt.length==0){
            //         this.ruleForm.DeptCode = ""
            //         this.ruleForm.DeptName = ""
            //     }else{
            //         this.ruleForm.DeptCode = this.ruleForm.dpt.split("|")[0]
            //         this.ruleForm.DeptName = this.ruleForm.dpt.split("|")[1]
            //     }
            // },

        add(){
            this.$emit('openSelDrug',true,'add',{
                "warehouseId": '',
                "hospitalCode": this.editMes.hospitalCode,
            })
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let obj = {//产品单数据
                        "jsonStr": JSON.stringify(this.tableData),
                        'code':this.editMes.id,
                    }
                    this.AddPrintDetail(obj)
                }
            });
        },
        resetForm(formName) {
            this.$emit("addClose",false)
        },
        addDrugs(obj){
                    // 判断表格中是否存在相同药品
                    let flg = true
                    this.tableData.forEach(ele=>{
                        if(ele.unitId == obj.unitId){
                            if(ele.catalogId == obj.catalogId){
                                flg = false
                                this.$message({message: '列表已存在相同药品请直接修改数量',type: 'warning'});
                            }
                        }
                         if(ele.usage == '口服'&&obj.usage=='外用'||ele.usage == '外用'&&obj.usage=='口服'){
                                flg = false
                                this.$message({message: '口服和外用不能存在同一张处方单中！',type: 'warning'});
                                return false
                        }
                        if((ele.usage == '口服'&&obj.usage=='口服')&&(ele.catalogId == obj.catalogId)){
                            flg = false
                            this.$message({message: '口服同一组别只能存在一个！',type: 'warning'});
                            return false
                        }
                    })
                    if(flg){
                        obj.templatId = this.editMes.id
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
    width: 260px
}
.form_item_wt255{
    width: 300px
}
</style>

