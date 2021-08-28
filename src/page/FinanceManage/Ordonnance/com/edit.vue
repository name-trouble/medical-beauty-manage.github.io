<template>
   <div class="ord">
        <el-form :model="ruleForm" :rules="rules" :inline="true" ref="ruleForm" label-width="100px" class="">
            <el-form-item label="姓名：" prop="customerId" class="form_item_wt255 form_item_mt10">
                <el-autocomplete v-model="customer" :fetch-suggestions="queryCus" placeholder="请输入内容"  :disabled="payMesShow"
                                     :trigger-on-focus="false" @select="selectCus" style="width:260px;float:left">
                    <template v-slot="{item}">
                        <my-item-ordon :item="item"></my-item-ordon>
                    </template>
                </el-autocomplete>
            </el-form-item>
             <el-form-item label="性别：" class="form_item_wt255 form_item_mt10" :disabled="payMesShow">
                <el-radio class="radio" v-model="ruleForm.sex" label="0">女</el-radio>
                <el-radio class="radio" v-model="ruleForm.sex" label="1">男</el-radio>
            </el-form-item>
             <el-form-item label="年龄：" class="form_item_wt255 form_item_mt10">
                <el-input v-model="ruleForm.age" :disabled="payMesShow" style="width:260px"></el-input>
            </el-form-item>
            <el-form-item label="医院：" class="form_item_wt255 form_item_mt10">
                <el-select v-model="ruleForm.hospital" style="width:260px;" :disabled="payMesShow">
                    <el-option v-for="(item,index) in hospitalList" :key="index" :label="item.supplierName" :value="item.code+'|'+item.supplierName"></el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="科室：" class="form_item_wt255 form_item_mt10">
                <el-select v-model="ruleForm.dpt" class="form_item_ipt153" @change="dptChange" :disabled="payMesShow">
                    <el-option v-for="(item,index) in deptList" :key="index" :label="item.deptName" :value="item.deptCode+'|'+item.deptName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="临床诊断：" class="form_item_wt255 form_item_mt10">
                <el-select v-model="ruleForm.diag" filterable="" allow-create style="width:260px;float:left;" :disabled="payMesShow">
                    <el-option v-for="(item,index) in diaList" :key="index" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="服务者：" class="form_item_wt255 form_item_mt10">
                <el-select v-model="ruleForm.nurse" style="width:260px;" @change="nurseSelect" :disabled="payMesShow" filterable>
                    <el-option value="" label="空"></el-option>
                    <el-option v-for="(item,$index) in nurseList" :key="$index" :label="item.text" :value="item.code+'|'+item.name"></el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="日期："  class="form_item_wt255 form_item_mt10">
                <el-date-picker
                :disabled="payMesShow"
                    v-model="date"
                    type="date"
                    @change="dateChange"
                    style="width:260px"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
             <el-form-item label="费别：" class="form_item_wt255 form_item_mt10">
                 <el-select v-model="ruleForm.fb" style="width:260px" :disabled="payMesShow">
                    <el-option label="空" value=""></el-option>
                    <el-option label="自费" value="自费"></el-option>
                </el-select>
                <!-- <el-input v-model="ruleForm.fb" :disabled="payMesShow"></el-input> -->
            </el-form-item>

             <el-form-item label="联系电话：" class="form_item_wt255 form_item_mt10">
                <el-input v-model="ruleForm.phone" :disabled="payMesShow" style="width:260px"></el-input>
            </el-form-item>
             <!-- <el-form-item label="地址：" class="">
                <el-input v-model="ruleForm.address" style="width:260px" :disabled="payMesShow"></el-input>
            </el-form-item> -->
            <el-form-item label="卡号：" class="form_item_wt255 form_item_mt10">
                <el-input v-model="ruleForm.cardNO" style="width:260px" :disabled="payMesShow"></el-input>
            </el-form-item>
            <el-form-item label="地址：" class="form_item_wt255 form_item_mt10">
                <el-input v-model="ruleForm.address" style="width:260px" :disabled="payMesShow"></el-input>
            </el-form-item>
            <!-- <el-form-item label="药品模板：" class="form_item_wt255 form_item_mt10">
                <el-select v-model="ruleForm.module" style="width:260px" @change="templateChange">
                    <el-option label="不选择模板" value=""></el-option>
                    <el-option v-for="(item,index) in moduleList" :key="index" :label="item.templatName" :value="item.id"></el-option>
                </el-select>
            </el-form-item> -->
            <br/>
            <el-form-item label="药品信息："  label-width="100px" class=" form_item_mt0"></el-form-item>
            <el-form-item label=" "  label-width="20px">
                <el-table :data="tableData"  border style="width: 920px;margin-bottom:10px">
                    <el-table-column prop="catalogId" label="组别" min-width="60"> </el-table-column>
                    <el-table-column prop="productName" :label="goodsType==1?'药品名称':'产品名称'" min-width="120" show-overflow-tooltip> </el-table-column>
                    <el-table-column prop="unitName" label="规格" min-width="110" show-overflow-tooltip> </el-table-column>
                    <el-table-column prop="quantity" label="数量" min-width="60">
                        <template slot-scope="scope">
                            <el-input-number v-if="!payMesShow" v-model="scope.row.quantity" @change="NumChange(scope.$index,scope.row.quantity)" style="width:90%" :controls="false"></el-input-number>
                            <span v-else>{{scope.row.quantity}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="price" label="价格"  min-width="60">
                        <template slot-scope="scope">
                            <el-input-number v-if="!payMesShow" v-model="scope.row.price" @change="NumChange(scope.$index,scope.row.price)" style="width:90%" :controls="false"></el-input-number>
                            <span v-else>{{scope.row.price}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="dwName" label="单位"  min-width="60"> </el-table-column>
                    <el-table-column prop="usage" label="用法"  min-width="90"> </el-table-column>
                    <el-table-column prop="frequency" label="频次"  min-width="70"> </el-table-column>
                    <el-table-column prop="days" label="天数"  min-width="60"> </el-table-column>
                    <el-table-column prop="memo" label="备注"  min-width="90" show-overflow-tooltip> </el-table-column>
                    <el-table-column prop="address" label="操作"  min-width="80">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="del(scope.$index,tableData)" size="small" :disabled="payMesShow">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="primary" @click="add('med')" size="small"  :disabled="payMesShow"  v-text="goodsType==1?'添加药品':'添加产品'"></el-button><br/>
                <span>药品金额：{{totalPrice}}</span>
            </el-form-item>
            <el-form-item label="支付信息："  label-width="100px" v-if="payMesShow">
                <el-table :data="payData" border style="width: 784px;margin-bottom:10px">
                    <el-table-column prop="payTypeName" label="支付方式" min-width="100"></el-table-column>
                    <el-table-column prop="receiveAccount" label="收款账户" min-width="80"> </el-table-column>
                    <el-table-column prop="realAmount" label="支付金额" min-width="80"> </el-table-column>
                    <el-table-column prop="payDate" label="支付日期" min-width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.payDate">{{scope.row.payDate.substring(0,10)}} {{scope.row.payDate.substring(11,19)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="memo" label="备注"  min-width="80"> </el-table-column>
                    <el-table-column prop="address" label="操作"  min-width="80">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="editPay(scope.$index,payData)" size="small">编辑</el-button>
                            <el-button type="danger" @click="del(scope.$index,payData)" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="primary" @click="add('pay')" size="small">添加支付信息</el-button><br/>
                <span>支付金额：{{totalPay}}</span>
            </el-form-item>
            <el-form-item label="备注：" class="form_item_mt10">
                    <el-input type="textarea" v-model="ruleForm.memo" :rows="3" style="width:784px"></el-input>
            </el-form-item>
        </el-form>
        <div class="form_footer">
            <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
        </div>
         <el-dialog title="支付" :visible.sync="payDialog" :close-on-click-modal="false" size="" :modal="false">
            <pay v-if="payDialog" @payOpe="payOpe" style="width:450px" :code = "ruleForm.customerId" :hospital-code="ruleForm.hospitalCode" :editMes="editMes"></pay>
        </el-dialog>
   </div>
</template>

<script>
import addr from "../../../../../static/address.json"
import { getCookie } from "@/config/mUtils";
    import {GetUserAllByKeywords,getUserById,GetDeptAllByHospitalCode,GetProofOrderProDet,GetDropDownPermission,UpdateProofOrderProduct,GetPrintTemplatList,GetPrintDetailList,
    getBaseDataByCode,GetWarehouse,UpdateStockDrugOut,
    GetServiceManList,GetGoodsByKeywords2,ProofOrderProductPay} from "@/api/myData"
    import "../lib/ord.less"
    import pay from "./pay.vue"
    export default {
        components:{
            pay
        },
        props:{
            mesCode:"",
            id:"",
            payMesShow:Boolean,
            goodsType:{//1 处方单  4产品单
                default:1
            }
        },
        data() {
        return {
            saveLoading : false,
            editMes:{},
            editIndex:"",
            date:"",
            customer:"",
            payData:[],
            tableData:[],
            project:"",
            projectList:[],
            hospitalList:[],
            diaList:['重睑术后','重睑修复术后','隆鼻修复术后','注射隆鼻术后', '假体隆鼻术后', '面部软组织萎缩术后', '下颏短小术后', '眼袋术后', '上睑皮肤松弛术后',
            '内眦赘皮术后', '腹部脂肪堆积术后', '双上臂脂肪堆积术后', '双大腿脂肪堆积术后', '面颊脂肪堆积术后', '下巴脂肪堆积术后','线雕术后','小乳术后','隆胸术后'],
                ruleForm: {
                    customerId:"",
                    customerName: '',
                    sex:"0",
                    date:"",
                    age:"",
                    address:"",
                    phone:"",
                    dpt:"",
                    diag:"",
                    fb:"",
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
                    cardNO:"",
                    module:'',
                },
                deptList:[],//科室
                customerList:[],
                dialogFormVisible:false,
                payDialog:false,
                rules: {
                    name: [
                        { required: true, message: '请输入', trigger: 'change' },
                    ],
                },
                nurseList:[],
                payWayList:[],
                allWhlist:[],
                whList:[],
                moduleList:[],
            };
        },
    computed:{
        totalPrice(){
            if(this.tableData.length == 0){
                return 0
            }else{
                let sum = 0
                this.tableData.forEach(row => {
                    sum+=Number(row.price).mul(Number(row.quantity)).mul(row.days)
                });
                return sum
            }
        },
        totalPay(){
            if(this.payData.length == 0){
                return 0
            }else{
                let sum = 0
                this.payData.forEach(row => {
                    sum= sum.add(row.realAmount)
                });
                return sum
            }
        }
    },
    watch:{
        'ruleForm.hospital':{
            handler(curVal,oldVal){
                this.hosChange()
            },
            deep:true
        }
    },

    mounted(){
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
        // 添加支付信息回调
        payOpe(val,ope,isEdit){
            if(ope){
                if(val.constructor == Object){
                    this.payData.push(val)
                }
            }else{
                if(isEdit){
                    this.payData[this.editIndex] = val
                    this.payData.push()
                }
            }
            this.payDialog = false
        },
        async hosChange(){
                if(this.ruleForm.hospital.length == 0){
                    this.ruleForm.hospitalCode = ""
                    this.ruleForm.hospitalName = ""
                }else{
                    this.ruleForm.hospitalCode = this.ruleForm.hospital.split("|")[0]
                    this.ruleForm.hospitalName = this.ruleForm.hospital.split("|")[1]
                }
                this.deptList = []
                let dept = await GetDeptAllByHospitalCode({HospitalCode:this.ruleForm.hospitalCode})
                if(this.ruleForm.hospitalCode!=""){
                    this.deptList = dept.data
                }else{
                    this.deptList = []
                }
                this.whList = []
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

        async GetProofOrderProDet(params){// 获取详情
            let res = await GetProofOrderProDet(params)
            if(res.status){
                this.init(res.data.proofOrderProduct,res.data.proofOrderProductDetailList)
                this.tableData = res.data.proofOrderProductDetailList
                this.payData = this.deal(res.data.proofOrderPaylList)
            }
        },
        deal(data){
            data.forEach(row=>{
                this.payWayList.forEach(ele=>{
                    if(row.payType == ele.DataCode){
                        row.payTypeName = ele.DataName
                        return
                    }
                })
            })
            return data
        },
        init(data,list){
            for(var p in data){
                if(data[p] == null||data[p] == "null"||data[p] == undefined||data[p] == "undefined"){
                    data[p] = ""
                }
            }
            this.ruleForm =  {
                    customerId:data.customerId,
                    customerName: data.customerName,
                    sex:data.sex+"",
                    date:"",
                    age:data.age+"",
                    address:data.customerAddress?data.customerAddress:this.address[Math.floor(Math.random()*167+0)].Address,
                    phone:data.phoneNumber,
                    diag:data.diagnosis,
                    fb:data.costCategory,
                    refrenceBranchCode:data.refrenceBranchCode,
                    refrenceBranchName:data.refrenceBranchName,
                    memo:data.memo,
                    nurse:data.nurseId.length>0?data.nurseId+"|"+data.nurseName:"",
                    nurseId:data.nurseId,
                    nurseName:data.nurseName,
                    dpt:data.deptCode.length>0?data.deptCode+"|"+data.deptName:"",
                    DeptCode:data.deptCode,
                    DeptName:data.deptName,
                    hospital:data.hospitalCode.length>0?data.hospitalCode+"|"+data.hospitalName:"",
                    hospitalName:data.hospitalName,
                    hospitalCode:data.hospitalCode,
                    cardNO:data.cardNO,
                    module:'',
                }

                this.project = data.diagnosis
                this.customer = data.customerName
                this.date = new Date(data.orderDate.substring(0,4),Number(data.orderDate.substring(5,7))-1,data.orderDate.substring(8,10))
        },
        // 编辑
        async UpdateProofOrderProduct(params,params1){
            this.saveLoading = false
            let res = await UpdateProofOrderProduct(params)
            if(res.status){
                this.$message({ type: 'success', message: '编辑成功!' })
                this.$emit("addClose",true)
            }else{
                this.$message({ type: 'warning', message: '编辑失败!'+res.errorMessage })
            }
            this.saveLoading = false
        },

        // 支付
        async ProofOrderProductPay(params){
            let res = await ProofOrderProductPay(params)
            if(res.status){
                this.$message({ type: 'success', message: '支付成功!' })
                this.$emit("addClose",true)
            }else{
                this.$message({ type: 'warning', message: '支付失败!'+res.errorMessage})
            }
        },
        //获的医护人员
        async getServiceMan() {
            this.address = addr.randomAddress//随机地址
            let [payWay,Hos,res,whList,template] = await Promise.all([getBaseDataByCode("0006"),GetDropDownPermission({typeId: 1}),GetServiceManList(),
            GetWarehouse({"hospitalCode": "",pageIndex:1,pageSize:100,keywords:"",typeId:1}),GetPrintTemplatList({ KeyWords:'',PageSize:1,PageIndex:1,
            hospitalCode:getCookie("hospitalCode")})])
            this.moduleList = template.data
            if(payWay.constructor==Array){
               this.payWayList = payWay
            }
            this.hospitalList = Hos.data
            let hospital = getCookie("hospitalCode")?getCookie("hospitalCode"):'all'
            for (let item of res.data) {
                let hosCodes = item.hospitalCode.split(",")//一对多服务者筛选
                if ((hospital == "all"||hosCodes.indexOf(hospital)>=0)) {
                    //医生
                    this.nurseList.push({
                        code: item["code"],
                        name: item["serviceName"],
                        text: item["serviceName"] + "(" + item["code"] + ")"
                    });
                }
            }
            this.allWhlist =JSON.parse(JSON.stringify(whList.data))
            this.GetProofOrderProDet({
                OrderProductCode:this.mesCode
            })
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
                    this.ruleForm.age = (new Date()).getFullYear() - item["Birthday"]
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
                this.ruleForm.cardNO = item.CardNO?item.CardNO:""
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
        add(dialog){
            if(dialog == 'pay'){
                this.editIndex = ""
                this.editMes = ""
                this.payDialog = true
            }else{
                // this.dialogFormVisible = true
                this.$emit('openSelDrug',true,'edit',{
                    "warehouseId": this.whList.length>0?this.whList[0].id:'',
                    "hospitalCode": this.ruleForm.hospitalCode
                })
            }

        },
        submitForm(formName) {
            let _this = this
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.payMesShow){// 支付
                        let obj = {
                            code:this.mesCode,
                            jsonStr: JSON.stringify(this.payData),
                        }
                        this.ProofOrderProductPay(obj)
                    }else{
                        // 编辑
                        let obj = {
                            'id':_this.id,
                            'orderProductCode':_this.mesCode,
                            'orderDate':_this.ruleForm.date,
                            'age':_this.ruleForm.age,
                            'phoneNumber':_this.ruleForm.phone,
                            'customerAddress':_this.ruleForm.address,
                            'deptCode':_this.ruleForm.DeptCode,
                            'deptName':_this.ruleForm.DeptName,
                            'hospitalCode':_this.ruleForm.hospitalCode,
                            'hospitalName':_this.ruleForm.hospitalName,
                            'sex':_this.ruleForm.sex,
                            "customerId": _this.ruleForm.customerId,
                            "customerName": _this.ruleForm.customerName,
                            "refrenceBranchCode": _this.ruleForm.refrenceBranchCode,
                            "refrenceBranchName": _this.ruleForm.refrenceBranchName,
                            "nurseId": _this.ruleForm.nurseId,
                            "nurseName":  _this.ruleForm.nurseName,
                            "costCategory": _this.ruleForm.fb,
                            "diagnosis": _this.ruleForm.diag,
                            "totalAmount":_this.totalPrice,
                            "memo": _this.ruleForm.memo,
                            "modifiedUserId": getCookie("userId"),
                            "modifiedBy": getCookie("userName"),
                            "productList": JSON.stringify(_this.tableData),
                            'cardNo':_this.ruleForm.cardNO,
                            'goodsType':_this.goodsType,
                        }
                        _this.UpdateProofOrderProduct(obj)
                    }
                }
            });
        },
        resetForm(formName) {
            this.$emit("addClose",false)
        },
        addDrugs(obj){
                    if(this.tableData.length>=5){
                        this.$message({message: '处方单最多添加五种药品',type: 'warning'});
                        return false;
                    }
                    let flg = true
                    this.tableData.forEach(ele=>{
                       if(ele.unitId == obj.unitId&&obj.unitId!=0){
                            if(ele.catalogId == obj.catalogId){
                                flg = false
                                this.$message({message: '列表已存在相同药品且组别相同,请直接修改数量',type: 'warning'});
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
            data.splice(index,1)
        },
        editPay(index,data){
            this.editIndex = index
            this.editMes = data[index]
            this.payDialog = true
        }
    }
  }
</script>

<style scoped>
.demo-ruleForm{
    width: 300px
}
.form_footer{
    text-align: center
}
.form_item_ipt153{
    width: 260px
}
.form_item_wt255{
    width: 400px
}
.ord{
    min-height: 440px
}
</style>

