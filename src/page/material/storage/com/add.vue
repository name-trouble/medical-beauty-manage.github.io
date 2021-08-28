<template>
    <div class="selCommon editRegister">
        <el-form :model="ruleForm" ref="ruleForm" :inline="true" label-width="85px" class="demo-ruleForm">
            <el-form-item label="入库日期：" class="form_item_mt10">
                 <el-date-picker
                    v-model="ruleForm.date"
                    type="date"
                    :disabled="typeCode != '01'"
                    style='width:200px;'
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="医院：" class="form_item_mt10"  prop="hospital" :rules="[{ required: true, message: '不能为空'}]">
                <el-select v-model="ruleForm.hospital"  style='width:200px;' @change="hosChange">
                    <!-- <el-option label="空" value=""></el-option> -->
                    <el-option v-for="(item,index) in hospitalList" :key="index" v-if="item.code"  :label="item.supplierName" :value="item.supplierName+'|'+item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="供应商：" class="form_item_mt10">
                <el-select v-model="ruleForm.supplier" style='width:200px;'>
                    <el-option label="空" value=""></el-option>
                    <el-option v-for="(item,index) in supplierList" :key="index" :label="item.stockSupplierName" :value="item.stockSupplierName+'|'+item.stockSupplierCode"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="入库类别："  class="form_item_mt10" prop="drugInType" :rules="[{ required: true, message: '不能为空'}]">
                <el-select v-model="ruleForm.drugInType" style='width:200px;'>
                    <el-option v-for="(item,index) in typeList" :key="index" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="入库仓库："  class="form_item_mt10" prop="wareHouse" :rules="[{ required: true, message: '不能为空'}]">
                <el-select v-model="ruleForm.wareHouse" style='width:200px;'>
                    <el-option v-for="(item,index) in whList" :key="index" :label="item.warehouseName" :value="item.warehouseName+'|'+item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="会员：" class="form_item_mt10" v-if="ruleForm.drugInType == '退药入库'">
                 <el-autocomplete v-model="customer" :fetch-suggestions="queryCus" placeholder="请输入内容"
                :trigger-on-focus="false" @select="selectCus" style="width:200px">
                     <template v-slot="{item}">
                         <my-item-member :item="item"></my-item-member>
                     </template>
                 </el-autocomplete>
            </el-form-item>
            <el-form-item label="调拨医院：" class="form_item_mt10" v-if="ruleForm.drugInType == '调拨入库'">
                <el-select v-model="ruleForm.fromHospital" @change="FromHS"  style='width:200px;'>
                    <el-option label="空" value=""></el-option>
                    <el-option v-for="(item,index) in fromHospitalList" :key="index" :label="item.SupplierName" :value="item.SupplierName+'|'+item.Code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="调拨仓库：" class="form_item_mt10" v-if="ruleForm.drugInType == '调拨入库'" prop="fromWareHouse">
                <el-select v-model="ruleForm.fromWareHouse" style='width:200px;'>
                    <el-option v-for="(item,index) in fromWhlist" :key="index" :label="item.warehouseName" :value="item.warehouseName+'|'+item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="采购员："  class="form_item_mt10" >
                <el-select v-model="ruleForm.buyer" style='width:200px;' filterable >
                    <el-option label="空" value=""></el-option>
                    <el-option v-for="(item,index) in serviceList" :key="index" :label="item.ServiceName" :value="item.ServiceName+'|'+item.Code"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="付款状态："  class="form_item_mt10">
                <el-radio-group v-model="ruleForm.isPayoff" style='width:200px;'>
                    <el-radio label="1">已付清</el-radio>
                    <el-radio label="0">未付清</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="有无发票："  class="form_item_mt10" prop="isInvoice">
                <el-radio-group v-model="ruleForm.isInvoice" style='width:200px;'>
                    <el-radio label="1">有</el-radio>
                    <el-radio label="0">无</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="操作人："  class="form_item_mt10">
                <div style='width:200px;'>{{ruleForm.operator}}</div>
            </el-form-item>
            <el-form-item label=" "  class="form_item_mt10" label-width="20px">
                <el-table :data="tableData" border style="width: 950px;margin-top:15px;margin-bottom:10px;" max-height="400">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="商品编号：" style="margin-right:25px;line-height:30px">
                                    <span class="form_span">{{ props.row.drugId }}</span>
                                </el-form-item>
                                <el-form-item label="剂型：" style="margin-right:25px;line-height:30px">
                                    <span class="form_span">{{ props.row.jiType }}</span>
                                </el-form-item>
                                <el-form-item label="单位：" style="margin-right:25px;line-height:30px">
                                    <span class="form_span">{{ props.row.dwName }}</span>
                                </el-form-item>
                                <el-form-item label="生产日期：" style="margin-right:25px;line-height:30px">
                                     <span v-if="props.row.productionDate" class="form_span">{{ props.row.productionDate.substring(0,10) }}</span>
                                </el-form-item>
                                <el-form-item label="有效期：" style="margin-right:25px;line-height:30px">
                                    <el-date-picker v-if="props.row.isEdit" v-model="props.row.editEffectiveDate" type="date" @change="tableDateCha" style='width:200px;' placeholder="选择日期"></el-date-picker>
                                    <span v-if="props.row.effectiveDate" class="form_span" @dblclick="dateClick(props.row,props.$index)">{{ props.row.effectiveDate.substring(0,10) }}</span>
                                </el-form-item>
                                <el-form-item label="生产厂家：" style="margin-right:25px;line-height:30px">
                                    <span class="form_span">{{ props.row.manufacturer}}</span>
                                </el-form-item>
                                <el-form-item label="产地：" style="margin-right:25px;line-height:30px">
                                    <span class="form_span">{{ props.row.originAddress }}</span>
                                </el-form-item>
                                <el-form-item label="批准文号：" style="margin-right:25px;line-height:30px">
                                    <span class="form_span">{{ props.row.approvalNumber }}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column prop="drugName" label="药品名称" min-width="100"></el-table-column>
                    <el-table-column prop="unitName" label="规格" min-width="90"></el-table-column>
                    <el-table-column prop="quantity" label="数量" min-width="70">
                        <template slot-scope="scope">
                            <el-input-number v-model="scope.row.quantity" placeholder="" :debounce='1000' :controls="false" :min=0 style="width:65px" @change="numChange(scope.$index,scope.row)"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column prop="realPrice" label="采购进价" min-width="70">
                        <template slot-scope="scope">
                            <el-input-number v-model="scope.row.realPrice" placeholder="" :debounce='1000' :controls="false" :min=0 style="width:65px" @change="numChange(scope.$index,scope.row)"></el-input-number>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="price" label="基础进价" min-width="70"></el-table-column> -->
                    <el-table-column prop="totalAmount" label="金额" min-width="70">
                        <template slot-scope="scope">
                            <el-input-number v-model="scope.row.totalAmount" placeholder="" :debounce='1000' :controls="false" :min=0 style="width:65px"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column prop="salePrice" label="售价" min-width="70">
                        <template slot-scope="scope">
                            <el-input-number v-model="scope.row.salePrice" placeholder="" :debounce='1000' :controls="false" :min=0 style="width:65px"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column prop="batchNumber" label="批号" min-width="80">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.batchNumber" style="width:75px"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="drugName" label="数量预警" min-width="70">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.warningCount"  style="width:65px"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="drugName" label="有效期预警" min-width="70">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.WarningDay" @change="dateC(scope.row)" style="width:65px"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label="操作" width="70" v-if="!editMes.view">
                        <template slot-scope="scope">
                            <el-button @click="deleteRow(scope.$index,tableData)" type="primary" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button v-if="!editMes.view" @click="addDrug" type="success" size="small">添加药品</el-button>
            </el-form-item>
             <el-form-item label="备注：" class="form_item_mt1">
                <el-input v-model="ruleForm.memo" type="textarea" :rows="4" style="width:500px"></el-input>
            </el-form-item>
        </el-form>
        <div class="form_footer" v-if="!editMes.view">
            <el-button type="primary" @click="sure('ruleForm')" :loading="saveLoading">保存</el-button>

            <el-button @click="cancel('ruleForm')">取消</el-button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import { getCookie, delCookie,getStore } from '@/config/mUtils'
    import {GetWarehouse,GetGoodsByKeywords2,GetUserAllByKeywords,GetDrugInDetail,
    GetDropDownPermission,getSupplierByPage,getServiceManAll,AddStockDrugIn,UpdateStockDrugIn,GetSupplier} from "@/api/myData"
    import Vue from "vue"
    Vue.component('my-item-member', {
        functional: true,
        render: function(h, ctx) {
            var item = ctx.props.item;
            return h('div', ctx.data, [
                h('p', { attrs: { class: 'select_name'+item.Type, title: item.name } }, ['名字：' + item.name]),
                h('p', { attrs: { class: 'select_name'+item.Type, title: item.name} }, ['编号：' + item.code]),
                h('p', { attrs: { class: 'select_name'+item.Type, title: item.name} }, ['手机号：' + item.phone]),
                h('p', { attrs: { class: 'select_name'+item.Type, title: item.name} }, ['卡号：' + item.CardNO]),
            ]);
        },
        props: {
            item: { type: Object, required: true }
        }
    });
    export default {
        props:{
            editMes:{},
        },
        data () {
            return {
                typeCode:getStore("typeCode"),
                disabled:false,
                saveLoading:false,
                customer:"",
                isDrug:false,
                ruleForm: {
                    isPayoff:'',
                    isInvoice:'',
                    customerId:"",
                    customerName:"",
                    supplier:"",
                    wareHouse:"",
                    drugInType:"",
                    buyer:"",
                    date:new Date(),
                    fromHospital:"",
                    hospital:"",
                    operator:getCookie("userName"),
                    memo:"",
                    fromWareHouse:"",
                },
                typeList:['报增入库','调拨入库','盘盈入库','其他入库','退货入库','退药入库','外购入库','在用物资科室间调拨','自制入库'],
                tableData:[],
                hospitalList:[],//医院
                fromHospitalList:[],
                fromWhlist:[],
                whList:[],//仓库
                allWhlist:[],
                fromWhlist:[],
                serviceList:[],
                allService:[],
                supplierList:[],
                allSupplierList:[],
                customerList:[],
                editIndex:"",
            }
        },
        mounted(){
            this.ruleForm.drugInType = this.typeList[0]
            this.GetBaseDataAll()
        },
        watch:{
            'ruleForm.hospital':{
                handler(curVal,oldVal){
                    if(oldVal != ""){
                        this.ruleForm.supplier = ""
                        this.ruleForm.wareHouse = ""
                    }
                    this.hosSel()
                },
                deep:true
            },
            'ruleForm.fromHospital':{
                handler(curVal,oldVal){
                    if(oldVal != ""){
                        // this.ruleForm.supplier = ""
                    }
                    this.FromHS()
                },
                deep:true
            }
        },
        methods: {
            dateClick(data,index){
                this.editIndex = index
                data.isEdit = true
                data.editEffectiveDate = new Date(data.effectiveDate.substring(0,4),data.effectiveDate.substring(5,7)-1,data.effectiveDate.substring(8,10))
                this.tableData.push()
            },
            tableDateCha(val){
                if(val){
                    this.tableData[this.editIndex].effectiveDate = val
                    this.tableData.push()
                }
            },
            hosChange(val){
                this.ruleForm.wareHouse = ""
                let hosCode = val.split("|")[1]
                if(hosCode){
                    this.whList = []
                    this.allWhlist.forEach(ele=>{

                        if(ele.hospitalCode == hosCode){
                            this.whList.push(ele)
                            this.ruleForm.wareHouse = this.whList[0].warehouseName+'|'+this.whList[0].id
                        }
                    })
                }else{
                    this.whList = JSON.parse(JSON.stringify(this.allWhlist))
                }
            },
            FromHS(val){
                let hosCode = this.ruleForm.fromHospital.split("|")[1]
                this.fromWhlist = []
                this.allWhlist.forEach(ele=>{
                    if(ele.hospitalCode == hosCode){
                        this.fromWhlist.push(ele)
                    }
                })
            },
            numChange(index,data){
                window.clearTimeout()
                setTimeout(()=>{
                    if(!isNaN(data.quantity)){
                        this.tableData[index].totalAmount = data.quantity.mul(data.realPrice)
                    }
                    this.tableData.push()
                },100)
            },
            async GetDrugInDetail(id){
                let res = await GetDrugInDetail({id:id})
                this.tableData = this.getWarningDay(res.data.stockDrugInDetailList)
            },
            getWarningDay(data){
                data.forEach(ele=>{
                    ele.editEffectiveDate = ''
                    ele.WarningDay = this.DateDiff(ele.effectiveDate,ele.warningDate)
                })
                return data
            },
            // 计算日期天数差值
            DateDiff(sDate1,  sDate2){
                if(sDate1!=null&&sDate2 != null){
                    //sDate1和sDate2是2002-12-18格式
                    var  aDate,  oDate1,  oDate2,  iDays
                    aDate  =  sDate1.split("-")
                    oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])    //转换为12-18-2002格式
                    aDate  =  sDate2.split("-")
                    oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])
                    iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24)    //把相差的毫秒数转换为天数
                    return  iDays
                }else{
                    return ''
                }
            },

            getMember(res) {
                // let res = await GetUserAllByKeywords({ 'keywords': str.removeSP() })
                if (res instanceof Array && res.length > 0) {
                    for (let item of res) {
                        this.customerList.push({
                            value: '(' + item["Code"] + ')' + item["MemberName"],
                            phone: item["PhoneNumber"],
                            code: item["Code"],
                            name: item["MemberName"],
                            referrerCode: item['ReferrerCode'],
                            referrerName: item['ReferrerName'],
                            Type:item.Type == 1?"black":"red",
                            CardNO:item["CardNO"]?item["CardNO"]:"",
                            MarketConsultantCode:item["MarketConsultantCode"],
                            MarketConsultantName:item["MarketConsultantName"]
                        })
                    }
                }
            },
            //查找会员 下拉补全
            async queryCus(queryString, cb) {
                this.customerList = []
                if (queryString !== '' && queryString != undefined) {
                    let res = await GetUserAllByKeywords({ 'keywords': queryString.removeSP() })
                    this.getMember(res)
                }
                this.ruleForm.customerId = ''
                this.ruleForm.customerName = ''
                let _this = this
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    cb(_this.customerList);
                }, 100);
            },

            //点击获取 会员信息  Oject
            selectCus(item) {
                this.ruleForm.customerId = item.code
                this.ruleForm.customerName = item.name
            },
            hosSel(){
                // 筛选医院服务人员
                if(this.ruleForm.hospital.length>0){
                    let hosCode = this.ruleForm.hospital.split("|")[1]
                    // this.whList = []
                    this.serviceList = []
                    this.supplierList = []
                    this.allService.forEach(ele => {
                        if(ele.HospitalCode == hosCode){
                            this.serviceList.push(ele)
                        }
                    });
                    this.allSupplierList.forEach(ele=>{
                        if(ele.hospitalCode == hosCode){
                            this.supplierList.push(ele)
                        }
                    })
                }else{
                    this.serviceList = JSON.parse(JSON.stringify(this.allService))
                    this.supplierList = JSON.parse(JSON.stringify(this.allSupplierList))
                }
            },
            addDrug(){
                this.$emit("addDrug",true)
            },

            addTable(data){
                // 预警日期计算
                data.WarningDate = this.GetDateStr(data.WarningDay,data.effectiveDate)
                this.tableData.push(data)
            },

            async GetBaseDataAll(){
                try{
                    let data = {startdate:"",enddate: "",suppliername: "",suptypecode: "",phonenumber: "",pageindex: 1,pagesize: 1000,}
                    let res = await  getSupplierByPage(data)
                    this.fromHospitalList = res
                    let hos = await GetDropDownPermission({typeId:1})

                    this.hospitalList = hos.data
                    let service = await getServiceManAll();

                    service.forEach(ele=>{
                        if(ele.SerTypeCode == "010"){
                            this.allService.push(ele)
                        }
                    })
                    this.serviceList = JSON.parse(JSON.stringify(this.allService))
                    let whList = await GetWarehouse({
                    "hospitalCode": "",
                        pageIndex:1,
                        pageSize:100,
                        keywords:"",
                        typeId:1//药房
                    })
                    if(getCookie('hospitalCode')){
                        whList.data.forEach(ele=>{
                            if(ele.hospitalCode == getCookie('hospitalCode')){
                                this.whList.push(ele)
                            }
                        })
                    }else{
                        this.whList = whList.data
                    }
                    this.allWhlist = JSON.parse(JSON.stringify(whList.data))
                    let sup = await GetSupplier({ hospitalCode:"",pageIndex:1,pageSize:1000,keywords:""})
                    this.allSupplierList = sup.data
                    if(this.editMes.drugInCode){
                        this.GetDrugInDetail(this.editMes.id)
                        this.copyData(this.editMes)
                    }
                    // 添加时设置默认值
                    if(this.editMes.id){
                    }else{
                        this.ruleForm.hospital = this.hospitalList[0].code?this.hospitalList[0].supplierName+'|'+this.hospitalList[0].code:''
                    }

                }catch(err){
                    console.log(err)
                }
            },
            copyData(data){
                for(var key in data){
                    if(data[key] == null){
                        data[key] = ""
                    }
                }
                this.ruleForm = {
                    id:data.id,
                    drugInCode:data.drugInCode,
                    customerId:data.customerId,
                    customerName:data.customerName,
                    supplier:data.stockSupplierName.length>0?data.stockSupplierName+'|'+data.stockSupplierCode:"",
                    wareHouse:data.warehouseInName.length>0?data.warehouseInName+'|'+data.warehouseInId:"",
                    drugInType:data.drugInType,
                    buyer:data.buyerName.length>0?data.buyerName+'|'+data.buyerId:"",
                    date:new Date(),
                    fromHospital:data.fromHospitalCode.length>0?data.fromHospitalName+'|'+data.fromHospitalCode:"",
                    hospital:data.hospitalCode.length>0?data.hospitalName+'|'+data.hospitalCode:"",
                    operator:data.createBy,
                    memo:data.memo,
                    fromWareHouse:data.fromWarehouseName.length>0?data.fromWarehouseName+'|'+data.fromWarehouseId:"",
                    isInvoice:data.isInvoice==null?'':data.isInvoice+'',
                    isPayoff:data.isPayoff==null?'':data.isPayoff+'',
                }
                if(data.drugInDate){
                    this.$set(this.ruleForm,'date',new Date(data.drugInDate.substring(0,4),Number(data.drugInDate.substring(5,7))-1,data.drugInDate.substring(8,10)))
                }
                this.customer = '('+data.customerId+')'+data.customerName
                // if(data.drugInDate == new Date().formatDate("yyyy-MM-dd")&&getStore("typeCode") == '01'){//入库日期为当天时 只有平台权限可以修改日期
                //     this.disabled = true
                // }
            },
            deleteRow(index,data){
                data.splice(index,1)

            },
            sure(form){
                let _this = this
                 this.$refs[form].validate((valid) => {
                    if (valid) {
                        let obj = {
                            DrugInDate:this.ruleForm.date.formatDate('yyyy-MM-dd'),
                            "hospitalCode": this.getIdOrName(this.ruleForm.hospital,1),
                            "hospitalName": this.getIdOrName(this.ruleForm.hospital,0),
                            "drugInType": this.ruleForm.drugInType,
                            "warehouseInId": this.getIdOrName(this.ruleForm.wareHouse,1),
                            "wareHouseInName":this.getIdOrName(this.ruleForm.wareHouse,0),
                            "stockSupplierCode": this.getIdOrName(this.ruleForm.supplier,1),
                            "stockSupplierName": this.getIdOrName(this.ruleForm.supplier,0),
                            "customerId": this.ruleForm.customerId,
                            "customerName": this.ruleForm.customerName,
                            "fromHospitalCode": this.getIdOrName(this.ruleForm.fromHospital,1),
                            "fromHospitalName": this.getIdOrName(this.ruleForm.fromHospital,0),
                            "buyerName": this.getIdOrName(this.ruleForm.buyer,0),
                            "buyerId": this.getIdOrName(this.ruleForm.buyer,1),
                            "memo": this.ruleForm.memo,
                            'drugInDetailList':JSON.stringify(this.tableData),
                            fromWarehouseId:this.getIdOrName(this.ruleForm.fromWareHouse,1),
                            fromWarehouseName:this.getIdOrName(this.ruleForm.fromWareHouse,0),
                            isInvoice:Number(this.ruleForm.isInvoice),
                            isPayoff:Number(this.ruleForm.isPayoff),
                        }

                        if(!_this.checkBatchNum()){//检查批号
                            return false
                        }
                        this.saveLoading = true
                        // 编辑
                        if(this.editMes.drugInCode){
                            obj.id = this.ruleForm.id
                            obj.drugInCode = this.ruleForm.drugInCode
                            obj.modifiedUserId = getCookie("userId")
                            obj.modifiedBy = getCookie("userName")
                            this.UpdateStockDrugIn(obj)
                        }else{
                            // 添加
                            obj.createUserId = getCookie("userId")
                            obj.createBy = getCookie("userName")
                            this.AddStockDrugIn(obj)
                        }
                    } else {
                        return false;
                    }
                });
            },
            checkBatchNum(){
                let bol = true
                this.tableData.forEach(ele=>{
                    if(ele.batchNumber == ''||ele.batchNumber == null){
                        this.$message({message: '请所有的药品添加批号',type: 'warning'})
                        bol = false
                    }
                })
                return bol
            },
            async AddStockDrugIn(params){
                let res =await AddStockDrugIn(params)
                if(res.status){
                    this.$message({message: '添加成功', type: 'success'});
                    this.$emit("addClose",true)
                }else{
                    this.$message.error('添加失败'+res.errorMessage);
                }
                this.saveLoading = false
            },
            async UpdateStockDrugIn(params){
                let res = await UpdateStockDrugIn(params)
                if(res.status){
                    this.$message({message: '编辑成功', type: 'success'});
                    this.$emit("addClose",true)
                }else{
                    this.$message.error('编辑失败'+res.errorMessage);
                }
                this.saveLoading = false
            },
            getIdOrName(data,index){
                    if(data.length>0){
                        return data.split("|")[index]
                    }else{
                        return ""
                    }
            },
            cancel(form){
                this.$emit("addClose",false)
            },
            dateC(data){
                data.WarningDate = this.GetDateStr(data.WarningDay,data.effectiveDate)
            },
             // 计算N天前后日期
            GetDateStr(AddDayCount,currentDate) {

                if(AddDayCount&&currentDate){
                    var dd = new Date(currentDate.substring(0,4),currentDate.substring(5,7),currentDate.substring(8,10)-1);
                    dd.setDate(-AddDayCount);//获取AddDayCount天后的日期
                    var y = dd.getFullYear();
                    var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0
                    var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0
                    return y+"-"+m+"-"+d;
                }else{
                    return ""
                }
            },
        },
        components: {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form_span{
    display: block;
    line-height: 40px;
}
</style>
