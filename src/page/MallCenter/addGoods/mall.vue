<template>
    <div class="mall">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
            <el-form-item label="分类：" required style="margin-bottom: 10px">
                <el-form-item prop="classify1" style="float: left">
                    <el-select v-model="ruleForm.classify1" prop="" placeholder="请选择" @change='getClass()'>
                        <el-option v-for="item in Categories" :key="item.name" :label="item.name" :value="item.code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="classify2" style="float: left">
                    <el-select v-model="ruleForm.classify2" placeholder="请选择" @change='getLabel()'>
                        <el-option v-for="item in subClass" :key="item.name" :label="item.name" :value="item.code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="classify3" style="float: left">
                    <el-select v-model="ruleForm.classify3" placeholder="请选择" @change="getLabelCap">
                        <el-option v-for="item in label" :key="item.name" :label="item.name" :value="item.code"></el-option>
                    </el-select>
                </el-form-item>
            </el-form-item>
            <el-form-item label="商品编号：" prop="number" required style="margin-bottom: 10px">
                <el-input v-model="ruleForm.number" style="width: 400px"></el-input>
                <el-button  type="primary" @click="getNum(1)" style="margin-left:5px;">自动获取</el-button>
            </el-form-item>
            <el-form-item label="商品名称：" prop="projectName" required style="margin-bottom: 10px">
                <el-input v-model="ruleForm.projectName" style="width: 400px;float:none"></el-input>
            </el-form-item>
            <el-form-item label="商品别名：" prop="goodsAlias" style="margin-bottom: 10px">
                <el-input v-model="ruleForm.goodsAlias" style="width: 400px"></el-input>
            </el-form-item>
            <el-form-item label="拼音" prop="" style="margin-bottom: 10px">
                <el-input v-model="ruleForm.pinYin" style="width: 400px"></el-input>
            </el-form-item>
            <el-form-item label="医院：" prop="hospital" required style="margin-bottom: 10px" v-if="type == 3">
                <el-select v-model="hospital" placeholder="请选择" @change="selectHs" style="width: 400px">
                    <el-option v-for="item in hospitalList" :label="item.name" :value="item" :key="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="科室：" style="margin-bottom: 10px" v-if="type == 3">
                <el-select v-model="ruleForm.deptCode" style="width: 400px">
                   <el-option v-for="(item,index) in deptList" :key="index" :label="item.deptName+'('+item.deptCode+')'"
                    :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="剂型：" style="margin-bottom: 10px" v-if="type == 3">
                <el-select v-model="ruleForm.jiType" style="width: 400px">
                    <el-option label="空" value=""></el-option>
                    <el-option v-for="(item,index) in jitypeList" :key="index" :label="item.DataName" :value="item.DataName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="产地：" style="margin-bottom: 10px" v-if="type == 3" prop="origin">
                <el-input v-model="ruleForm.origin" style="width: 400px"></el-input>
            </el-form-item>
            <el-form-item label="生产厂家：" style="margin-bottom: 10px" v-if="type == 3"  prop="Manufacturer">
                <el-input v-model="ruleForm.Manufacturer" style="width: 400px"></el-input>
            </el-form-item>
             <el-form-item label="计量单位：" style="margin-bottom: 10px" v-if="type == 3">
                <el-input v-model="ruleForm.unit" style="width: 400px"></el-input>
            </el-form-item>
            <!-- <el-form-item label="批准文号：" style="margin-bottom: 10px" v-if="type == 3">
                <el-input v-model="ruleForm.ApprovalNumber" style="width: 400px"></el-input>
            </el-form-item> -->
            <el-form-item label="是否有效：" style="margin-bottom: 10px" v-if="type == 3">
                <el-radio class="radio" v-model="ruleForm.isEnable" label="1">有效</el-radio>
                <el-radio class="radio" v-model="ruleForm.isEnable" label="0">无效</el-radio>
            </el-form-item>
            <el-form-item label="产品类型：" style="margin-bottom: 10px" v-if="type == 3">
                <el-radio class="radio" v-model="ruleForm.GoodsType" label="1">药品</el-radio>
                <el-radio class="radio" v-model="ruleForm.GoodsType" label="2">物资</el-radio>
                <el-radio class="radio" v-model="ruleForm.GoodsType" label="3">特殊</el-radio>
                <el-radio class="radio" v-model="ruleForm.GoodsType" label="4">产品</el-radio>
            </el-form-item>

            <el-form-item label="是否皮试：" style="margin-bottom: 10px" v-if="type == 3">
                <el-radio class="radio" v-model="ruleForm.IsSkinTest" label="1">是</el-radio>
                <el-radio class="radio" v-model="ruleForm.IsSkinTest" label="0">否</el-radio>
            </el-form-item>
            <el-form-item label="是否精二：" style="margin-bottom: 10px" v-if="type == 3">
                <el-radio class="radio" v-model="ruleForm.isJingEr" label="1">是</el-radio>
                <el-radio class="radio" v-model="ruleForm.isJingEr" label="0">否</el-radio>
            </el-form-item>



            <el-form-item label="商户：" style="margin-bottom: 10px" v-if="type == 2">
                <el-select v-model="ruleForm.shop" filterable remote placeholder="请输入关键词" :remote-method="remoteMethod" :loading="loading">
                    <el-option v-for="item in shopList" :key="item.shopCode" :label="item.shopName" :value="item.shopCode"></el-option>
                </el-select>
            </el-form-item>
          <!--  <el-form-item label="适用商户" class="form_item_mt10">
                <el-col :span="24" style="line-height: 36px">
                    <el-radio-group v-model="ruleForm.radio1" @change="handleRadioChange" >
                        <el-radio :label="1">所有商户</el-radio>
                        <el-radio :label="0">部分商户</el-radio>
                    </el-radio-group>
                </el-col>
                <el-col :span="24" v-show="ruleForm.radio1 == 0" style="line-height: 36px">
                    <el-checkbox-group v-model="ruleForm.agentList" class="clear" @change="ruleForm.radio1=0">
                        <el-checkbox v-for="(item,index) in agent" :key="item.Code" :label="item.nameCode" >{{item.BranchName}}</el-checkbox>
                    </el-checkbox-group>
                </el-col>
            </el-form-item>-->
          <!--  <el-form-item label="供方" prop="supplier" required style="margin-bottom: 10px">
                <el-select v-model="ruleForm.supplier" placeholder="请选择">
                    <el-option v-for="(item,index) in supplier" :label="item.SupplierName" :value="item.SupplierName" :key="item.SupplierName"></el-option>
                   &lt;!&ndash; <el-option ></el-option>&ndash;&gt;
                </el-select>
            </el-form-item>-->
            <el-form-item label="自定义属性：" style="margin-bottom: 10px">
                <el-row :span="24" style="background: #EEF1F6;padding: 5px 0">
                    <attr :cap="cap" @attrChange="reciveAttr"></attr>
                </el-row>
            </el-form-item>
            <el-form-item label="属性：" style="margin-bottom: 10px">
                <el-table :data="tableData" border style="width: 900px">
                    <el-table-column label="名称" min-width="180">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.propertyName"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="内容" min-width="380" prop="propertyValue">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.propertyValue" @change="change(tableData,scope.$index)"  placeholder="添加属性内容，多项内容用空格分隔，帮助你更好地整理内容"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="" min-width="100">
                        <template slot-scope="scope">
                            <el-button size="small" type="danger" @click="tableData.splice(scope.$index,1)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="primary" @click="addSelfAttr" size="small">添加</el-button>
            </el-form-item>
            <el-form-item label="标签：" style="margin-bottom: 10px" v-if="type!=3">
                <el-checkbox-group v-model="ruleForm.labelList" style="line-height: 40px">
                    <el-checkbox v-for="item in tagList" :key="item.tagName" :label="item.code"> {{item.tagName}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="原价：" prop="origionPrice" style="margin-bottom: 10px;width: 400px" v-if="type != 3">
                <el-input v-model="ruleForm.origionPrice" @change="priChange"></el-input>
            </el-form-item>
            <el-form-item label="价格：" prop="salePrice" style="margin-bottom: 10px;width: 400px" v-if="type != 3">
                <el-input v-model="ruleForm.salePrice" @change="priChange"></el-input>
            </el-form-item>
            
            <el-form-item label="规格：" required style="margin-bottom: 10px">
                <el-checkbox v-model="ruleForm.checked1">
                    统一设置价格
                    <el-input v-model="ruleForm.price" type="text"
                              style="float: none;width: 100px;margin-left: 10px" @change="setChange('price')"></el-input>
                </el-checkbox>
                <el-checkbox v-model="ruleForm.checked2">
                    统一设置库存
                    <el-input v-model="ruleForm.deposit" type="text" @change="setChange('deposit')"
                              style="float: none;width: 100px;margin-left: 10px"></el-input>
                </el-checkbox>
                <el-table :data="ruleForm.tableData" border style="width: 900px;margin-top: 10px">
                    <el-table-column prop="unitName" label="规格" min-width="130">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.unitName" placeholder="例如：白色300ml"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="ProfitPrice" label="进价" min-width="80">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.ProfitPrice" ></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="Price" label="售价" min-width="80">
                        <template slot-scope="scope">
                            <el-input-number :min=0 v-model="scope.row.Price" :controls="false" @change="change(ruleForm.tableData,scope.$index,1)" ></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column prop="PageQuantity" label="库存" min-width="80">
                        <template slot-scope="scope">
                            <el-input-number :min=0 v-model="scope.row.PageQuantity" :controls="false" @change="change(ruleForm.tableData,scope.$index,2)"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column prop="UnitCode" label="规格编码" min-width="100">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.UnitCode"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="BarCode" label="商品条形" min-width="150">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.BarCode"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="ApprovalNumber" label="批准文号" min-width="120">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.ApprovalNumber"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" min-width="60">
                        <template slot-scope="scope">
                            <el-button type="text" @click="deleteRow(scope.$index,ruleForm.tableData)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="text" @click="addSpec">添加规格</el-button>
            </el-form-item>
            <el-form-item label="积分抵现金额：" prop="integral" style="margin-bottom: 10px"  v-if="type != 3"
                          :rules="[{ required: true, message: '积分抵现不能为空'},{ type: 'number', message: '积分必须为数字值'}]">
                <el-input v-model.number="ruleForm.integral" type="integral" style="width: 120px;float: none"></el-input>
            </el-form-item>
            <el-form-item label="图片：" class="form_item_mt10">
                <div style="color:red">请上传800*800px以上图片，小于1M,图片过大将严重影响app端加载速度</div>
                <el-row>
                    <div style="width:150px;margin-right:5px;float: left">
                        <div class="main" style="width:150px;">
                            <span class="pic-tit">主图</span>
                            <el-upload
                                :headers ="headers"
                                :action="action"
                                :accept="acceptImage"
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove1" 
                                :on-change="handleChange1"
                                style='line-height:20px'
                                :file-list="fileList3"
                                :before-upload="beforeAvatarUpload">
                                <i class="el-icon-plus"></i><br/>
                            </el-upload>
                            <el-dialog v-model="dialogVisible" size="tiny">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </div>
                    </div>
                    <div style="width:650px;float: left">
                        <div class="main" style="width:650px;">
                            <span class="pic-tit">细节图</span>
                            <el-upload
                                :action="action"
                                :accept="acceptImage"
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove2" style='line-height:20px'
                                :file-list="fileList4"
                                :multiple="true"
                                :on-success="handleSuccess"
                                :before-upload="beforeAvatarUpload"
                                :on-change="handleChange2">
                                <i class="el-icon-plus"></i><br/>
                            </el-upload>
                        </div>
                        <ul class="" v-if="fileList4.length > 1" style="height: 60px;">
                            <li style="display: inline-block;width: 98px;margin-right: 8px;" :key="index" class="" v-for="(item,index) in fileList4">
                                <el-button type="text"><i class="el-icon-arrow-left" @click="move('left',index)"></i></el-button>
                                <el-button type="text"><i class="el-icon-arrow-right" @click="move('right',index)"></i></el-button>
                            </li>
                        </ul>
                    </div>
                </el-row>
            </el-form-item>
            <el-form-item label="商品详情：" prop="content" class="form_item_mt10">
                <vue-editor v-model="ruleForm.content" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
            </el-form-item>
            <el-form-item label-width="100px">
                <el-button type="primary" @click="submitForm('ruleForm')" :loading="saveLoading">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script  type="text/ecmascript-6">
    import axios from 'axios'
    import { VueEditor } from 'vue2-editor'
    import { baseImgPath } from '@/config/env'
    import { acceptImage } from '@/config/common'
    import attr from "./attr"
    import {getCookie} from "@/config/mUtils"
    import {GetCatelogByColumnCode,GetColumnAll,GetTagByPage,GetShopByPage,GetDeptAllByHospitalCode,GetDropDownPermission,getBaseDataByCode,DelImg,
        GetPropertyByKeywords,AddGoods,GetServiceManByHspCode,GetSupplierBySupTypeCode,getTopBranch} from "../../../api/myData"
    export default {
        // name: 'mall',
        props:{
            type:""
        },
        data() {
            var classify1 = (rule, value, callback) => {
                if(value==""&&this.Categories.length!=0){
                    return callback(new Error('请选择大类'));
                } else{
                    callback()
                }
            };
            var classify2 = (rule, value, callback) => {
                if(value==""&&this.subClass.length!=0){
                    return callback(new Error('请选择中类'));
                } else{
                    callback()
                }
            };
            var classify3 = (rule, value, callback) => {
                if(value==""&&this.label.length!=0){
                    return callback(new Error('请选择小类'));
                } else{
                    callback()
                }
            };
            return {
                jitypeList:[],
                saveLoading:false,
                loading:false,
                tagList:[],
                shopList:[],
                action:"",
                acceptImage:"",
                dynamicTags: [],
                inputVisible: false,
                inputValue: '',
                headers:{'Access-Control-Allow-Origin': '*'},
                column:[],
                propertyValues:[],
//   当前column index值据此筛选添加商品所属columnId
                columnIndex:0,
                catelog:"",
                classId:"",
                subClass:[],
                picture1:[],
                picture2:[],
                label:[],
                supplier:[],
                recAttr:[],//  子组件传过来的属性数组
                cap:[{}],
                goodsCodeIndex:0,
                tableData:[],
                 deptList:[],//科室列表
                options: [{value: '手术快', label: '手术快'}, {value: '回复时间短', label: '回复时间短'}, {value: '地方', label: '地方'}],
                ruleForm: {
                    Manufacturer:"",
                    jiType:"",
                    isEnable:"1",
                    shop:"",
                    classify1:"",
                    classify2:"",
                    classify3:"",
                    number:"",
                    projectName:"",
                    goodsAlias:"",
                    supplier:"波士邦公司",
                    supplierName:"",
                    labelList: [],//  标签数组
                    tableData:[{unitName:"",Price:"",PageQuantity:"",UnitCode:"",BarCode:""}],
                    salePrice:"",//  售价
                    origionPrice:"",//  原价
                    checked1:false,
                    checked2:false,
                    price:"",
                    deposit:"",
                    integral:"",
                    fileList2:[],
                    content:"",
                    origin:"",//产地
                    unit:"",//计量单位
                    ApprovalNumber:"",//批准文号
                    hospital:"",
                    hospitalCode:"",
                    deptCode:{},
                    pinYin:"",
                    GoodsType:'1',
                    IsSkinTest:'0',
                    isJingEr:'0'
                },
                hospital:{},
                hospitalList:[],//医院列表
                dialogVisible:false,
                dialogImageUrl: '',
                editorOption: {},
//                主图附图集合
                fileList3: [],
                fileList4: [],
                rules: {
                    classify1: [
                        { validator: classify1, trigger: 'blur'}
                    ],
                    classify2: [
                        { validator: classify2, trigger: 'blur'}
                    ],
                    classify3: [
                        { validator: classify3, trigger: 'blur'}
                    ],
                    number: [{required: true, message: '请填写编码', trigger: 'blur'}],
                    projectName: [{required: true, message: '请填写商品名称', trigger: 'blur'}],
                    supplier: [{required: true, message: '请选择供应商', trigger: 'change'}],
                    salePrice: [{required: true, message: '请填写售价', trigger: 'blur'}],
                    origionPrice: [{required: true, message: '请填写原价', trigger: 'blur'}],
                    integral: [{required: true, message: '请填写积分抵扣额', trigger: 'blur'}],
                    goodsAlias:[{required: true, message: '请填写别名', trigger: 'blur'}],
                    origin:[{required: true, message: '请填写', trigger: 'blur'}],
                    Manufacturer:[{required: true, message: '请填写', trigger: 'blur'}],
                }
            };
        },
        computed: {
            Categories(){return this.parentCode("")},
        },
        watch: {
            "ruleForm.checked1":{
                handler(curVal, oldVal){
                    if(curVal == true){this.commonSet("price")}
                },
                deep: true
            },
            "ruleForm.checked2":{
                handler(curVal, oldVal){
                    if(curVal == true){this.commonSet("deposit")}
                },
                deep: true
            },
            "ruleForm.price":{
                handler(curVal,oldVal){
                    if(this.ruleForm.checked1 == true){this.commonSet("price")}
                },
                deep:true
            },
            "ruleForm.deposit":{
                handler(curVal,oldVal){
//
                    if(this.ruleForm.checked2 == true){this.commonSet("deposit")}
                },
                deep:true
            },
            "ruleForm.number":{
                handler(curVal,oldVal){
                    this.tableNumChange()
                },
                deep:true
            }
        },
        mounted: function () {
            this.action = baseImgPath + "/api/Image/UploadImg?op=goods"
            this.acceptImage = acceptImage
            this.getColumn()
        },
        methods: {
            async selectHs() {
                this.ruleForm.deptCode = {}
                this.ruleForm.hospital = this.hospital.name
                this.ruleForm.hospitalCode = this.hospital.value
                let dept = await GetDeptAllByHospitalCode({hospitalCode:this.hospital.value})
                for(let item of dept.data){
                    item["name"] = item.deptName+'('+item.deptCode+')'
                    item["value"] = item.deptCode
                }
                this.deptList = dept.data
            },
            change(data, index, num){
                let vm = this
                setTimeout(function () {
                    if (num == 1) {
                        vm.ruleForm.tableData[index].Price = (data[index].Price.match(/\d+(\.\d{0,2})?/)||[''])[0]
                    } else {
                        vm.ruleForm.tableData[index].PageQuantity = (data[index].PageQuantity.match(/\d+(\.\d{0,2})?/)||[''])[0]
                    }
                }, 50)
            },
            setChange(set){
                let vm = this
                setTimeout(function () {
                    if (set == "price") {
                        vm.ruleForm.price = (vm.ruleForm.price.match(/\d+(\.\d{0,2})?/)||[''])[0]
                    } else {
                        vm.ruleForm.deposit = (vm.ruleForm.deposit.match(/\d+(\.\d{0,2})?/)||[''])[0]
                    }
                }, 50)
            },
            priChange(){
                let vm = this
                setTimeout(function () {
                    vm.ruleForm.salePrice = (vm.ruleForm.salePrice.match(/\d+(\.\d{0,2})?/)||[''])[0]
                    vm.ruleForm.origionPrice = (vm.ruleForm.origionPrice.match(/\d+(\.\d{0,2})?/)||[''])[0]
                }, 50)
            },
//            获取所有栏目
            async getColumn(){
                try {
                    let [res,res1] = await Promise.all([getBaseDataByCode('0024'),GetDropDownPermission({typeId: 1})])
                    this.jitypeList = res
                    for(let item of res1.data){
                        item.value=item.code
                        item.name = item.supplierName
                    }
                    this.hospitalList = res1.data
                    this.hospital = res1.data[0]
                    let code
                    if(this.type == "1"){
                        code = 101
                    }
                    if(this.type == "2"){
                        code = 102
                    }
                    if(this.type == 3){
                        code = 103
                    }
                    this.getCatelog({code: code})
                } catch (err) {
                    console.log('获取数据失败', err);
                }
            },
            //  获取所有分类
            async getCatelog(data){
                try {
                    let res = await GetCatelogByColumnCode(data);
                    this.catelog = res.data
                    this.GetSupplierBySupTypeCode()
                } catch (err) {
                    console.log(err)
                }
            },
            async GetSupplierBySupTypeCode(){
                try {
                    this.supplier = await GetSupplierBySupTypeCode({SupTypeCode: "002,003"});
                    let typeCode
                    if(this.type == 1){typeCode = 3}else{typeCode = 4}
                    let result = await GetTagByPage({"TypeCode":typeCode,"pageIndex":1,"pageSize":100,"keywords":""})//TypeCode 3积分商城  4商户商品
                    this.tagList = result.data
                } catch (err) {
                    console.log('获取数据失败', err);
                }
            },
            //    添加商品接口
            async addGoods(data){
                try {
                    let res = await AddGoods(data);
                    if(res.success){
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                    }
                    this.saveLoading = false
                } catch (err) {
                    console.log(err)
                    this.$message({
                        message: '添加失败',
                        type: "error"
                    });
                }
            },
            async GetShopByPage(params){
                try{
                    let res = await GetShopByPage(params)
                    this.shopList = res.data
                    this.loading = false;
                }catch(err){
                    console.log(err)
                }
            },
            remoteMethod(query) {
                if (query !== '') {
                    this.loading = true;
                    this.GetShopByPage({
                        pageIndex:1,
                        pageSize:20,
                        keywords:query.removeSP()
                    })
                } else {
                    this.options4 = [];
                }
            },
            //    查询属性
            async getProperty(data){
                try {
                    let res = await GetPropertyByKeywords(data);
                    this.cap = this.capsCheck(res)
                } catch (err) {
                    console.log(err)
                }
            },
            //    大类
            getClass () {
                this.ruleForm.classify2 = ""
                this.ruleForm.classify3 = ""
                this.label = []
                        this.getProperty({
                            keywords: "",
                            "columncode": "101",
                            "catelogcode": this.ruleForm.classify1
                        })
                this.subClass = this.parentCode(this.ruleForm.classify1)
            },

            /*1.用正则HtmlUtil表达式实现html转码*/
            htmlEncode (str) {
                var s = "";
                if (str.length == 0) return "";
                s = str.replace(/&/g, "%26amp;");
                s = s.replace(/</g, "%26lt;");
                s = s.replace(/>/g, "%26gt;");
                s = s.replace(/ /g, "%26nbsp;");
                s = s.replace(/\'/g, "%26#39;");
                s = s.replace(/\"/g, "%26quot;");
                return s;
            },

            //      表单提交
            submitForm(formName) {
                let catLogCode = ""
                if (this.ruleForm.classify1 != "") {
                    catLogCode = "|" + this.ruleForm.classify1 + "|"
                }
                if (this.ruleForm.classify2 != "") {
                    catLogCode = catLogCode + this.ruleForm.classify2 + "|"
                }
                if (this.ruleForm.classify3 != "") {
                    catLogCode = catLogCode + this.ruleForm.classify3 + "|"
                }
                // if (this.fileList3.length != 0) {
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            if(this.speCheck()){
                                
                                let column = "10"+this.type
                                if(column == '103'){
                                    this.ruleForm.supplier = this.ruleForm.hospitalCode
                                    this.ruleForm.supplierName =this.ruleForm.hospital
                                }
                                let obj = {
                                    ColumnCode: column,
                                    supplierCode: this.ruleForm.supplier,
                                    SupplierName: this.ruleForm.supplierName,
                                    catalogCode: catLogCode,
                                    name: this.ruleForm.projectName,
                                    GoodsCode: this.ruleForm.number,
                                    goodsAlias: this.ruleForm.goodsAlias,
                                    pinYin:this.ruleForm.pinYin,
                                    imgMainUrl: this.getUrl(this.fileList3[0]),
                                    imgAssUrl1: this.getUrl(this.fileList4[0]),
                                    imgAssUrl2: this.getUrl(this.fileList4[1]),
                                    imgAssUrl3: this.getUrl(this.fileList4[2]),
                                    imgAssUrl4: this.getUrl(this.fileList4[3]),
                                    Price: this.type==3?this.ruleForm.tableData[0].ProfitPrice:this.ruleForm.origionPrice,
                                    priceSale: this.type==3?this.ruleForm.tableData[0].Price:this.ruleForm.salePrice,
                                    Ismall: "1",
                                    goodsTag: this.ruleForm.labelList.join(","),
                                    RichText: this.htmlEncode(this.ruleForm.content),
                                    CreateUserCode: getCookie("userCode"),
                                    CreateBy:getCookie('userName'),
                                    CreateDate: new Date().formatDate("yyyy-MM-dd"),
                                    goodsPropertyList: JSON.stringify(this.recAttr.concat(this.tableData)),
                                    goodsUnitList: JSON.stringify(this.ruleForm.tableData),
                                    limitAmount: this.ruleForm.integral,
                                    state: 0,
                                    ApproveState: 0,
                                    productionAddress:this.ruleForm.origin,
                                    jiType:this.ruleForm.jiType,
                                    unitName:this.ruleForm.unit,
                                    ApprovalNumber:this.ruleForm.ApprovalNumber,
                                    deptCode:this.ruleForm.deptCode.deptCode||"",
                                    isEnable:this.ruleForm.isEnable,
                                    GoodsType:this.ruleForm.GoodsType,
                                    Manufacturer:this.ruleForm.Manufacturer,
                                    IsSkinTest:this.ruleForm.IsSkinTest,
                                    IsJingEr:this.ruleForm.isJingEr
                                }
                                if(this.type == "2"){
                                    obj.shopCode = this.ruleForm.shop
                                }
                                this.saveLoading = true
                                this.addGoods(obj)
                            }else{
                                this.$message({message: '请完善规格信息，保持规格信息完整', type: 'warning'});
                            }
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                // } else {
                //     this.$message({
                //         message: '请选择图片',
                //         type: 'warning'
                //     });
                // }
            },
            //            表单重置
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            //    小类
            getLabel () {
                this.ruleForm.classify3 = ""
                this.label = []
                            this.getProperty({
                                keywords: "",
                                "columncode": "101",
                                "catelogcode":  this.ruleForm.classify2
                            })
                    this.label = this.parentCode( this.ruleForm.classify2)
            },
            getLabelCap(){
                this.getProperty({
                    keywords: "",
                    "columncode":"101",
                    "catelogcode":  this.ruleForm.classify3
                })
            },
            // 添加规格
            addSpec(){
                if (this.ruleForm.number != "") {
                    let price = ""
                    let deposit = ""
                    if (this.ruleForm.checked1 == true) {
                        price = this.ruleForm.price
                    } else {
                        price = ""
                    }
                    if (this.ruleForm.checked2 == true) {
                        deposit = this.ruleForm.deposit
                    } else {
                        deposit = ""
                    }
                    let unitCode = this.ruleForm.tableData.length + 1000
                    let barCode = this.ruleForm.number + unitCode
                    this.ruleForm.tableData.push({
                        ProfitPrice:0,
                        unitName: "",
                        Price: price,
                        PageQuantity: deposit,
                        UnitCode: unitCode,
                        BarCode: barCode
                    })
                } else {
                    this.$alert('请先生成商品编码', '提示', {
                        confirmButtonText: '确定',
                        type: 'warning',
                    });
                }
            },
            //删除规格
            deleteRow (index, data) {
                data.splice(index, 1)
                this.tableNumChange()
            },
            // 统一设置价格订金
            commonSet(attr){
                var len = this.ruleForm.tableData.length
                for (let i = 0; i < len; i++) {
                    if (attr == "price") {
                        this.ruleForm.tableData[i].Price = this.ruleForm.price
                    } else {
                        this.ruleForm.tableData[i].PageQuantity = this.ruleForm.deposit
                    }
                    this.ruleForm.tableData.push()
                }
            },

            // 图片预览
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },

            // 删除图片操作
            handleRemove1(file, fileList) {
                if(file.response){
                    this.DelImg(file.response)
                }
                this.fileList3 = fileList
            },

            handleRemove2(file, fileList) {
                if(file.response){
                    this.DelImg(file.response)
                }
                this.ruleForm.fileList4 = fileList
            },

            // 删除原图片/视频
            async DelImg(filepath){
                let res = await DelImg({filepath:filepath})
                if(!res.status){        
                    this.$message({message: '原图片删除失败！'+res.errorMessage,type: 'warning'});
                }
                
            },
            handleChange1(file, fileList) {
                this.fileList3 = fileList
            },
            // 幅图
            handleChange2(file, fileList) {
                this.fileList4 = fileList
            },
         
            beforeAvatarUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 1;
                let isLimit = true
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 1MB!');
                }
                if(this.fileList4.length>4){
                    isLimit = false
                }
                return isLt2M&&isLimit;
            },
            handleSuccess(response, file, fileList){
                this.fileList4 = fileList
            },
            //图片位置切换
            move(flag, index){
                var temp = null
                var file = []
                if (flag == "left" && index != 0) {
                    temp = this.fileList4[index]
                    this.fileList4[index] = this.fileList4[index - 1]
                    this.fileList4[index - 1] = temp
                    this.fileList4.push()
                }
                if (flag == "right" && index != this.fileList4.length - 1) {
                    temp = this.fileList4[index]
                    this.fileList4[index] = this.fileList4[index + 1]
                    this.fileList4[index + 1] = temp
                    this.fileList4.push()
                }
            },
            parentCode (code) {
                var arr = []
                for (let i = 0; i < this.catelog.length; i++) {
                    if (code == this.catelog[i].parentCode) {
                        arr.push(this.catelog[i])
                    }
                }
                return arr
            },
            getNum(num){
                let header = ""
                if (num == 1) {header = "YM"}else {header = "SC"}
                let date = new Date()
                this.ruleForm.number = header + this.formatDate(date)
                if (this.ruleForm.tableData.length != 0 && this.goodsCodeIndex == 0) {
                    this.tableNumChange()
                }
                this.goodsCodeIndex = 1
            },
            // 时间格式转化
            formatTen (num) {
                return num > 9 ? (num + "") : ("0" + num)
            },
            formatDate(date) {
                if (date === '') {
                    return ''
                } else {
                    var year = date.getFullYear()
                    var month = date.getMonth() + 1
                    var day = date.getDate()
                    var hour = date.getHours()
                    var minute = date.getMinutes()
                    var second = date.getSeconds()
                    return "" + year + this.formatTen(month) + this.formatTen(day) + this.formatTen(hour) + this.formatTen(minute) + this.formatTen(second)
                }
            },
            //    添加自定义属性
            addSelfAttr(){
                this.tableData.push({
                    propertyCode: 99999,
                    propertyName: "",
                    propertyValue: "",
                })
            },
            pictureCheck(){
                if (this.ruleForm.fileList3.length == 1 && this.ruleForm.filestList4.length == 5) {
                    return true
                } else {
                    return false
                }
            },
            tableNumChange(){
                let len = this.ruleForm.tableData.length
                for (let i = 0; i < len; i++) {
                    if (String(this.ruleForm.tableData[i].UnitCode).length == 0) {
                        this.ruleForm.tableData[i].UnitCode = 1000 + i
                    }
                    this.ruleForm.tableData[i].BarCode = this.ruleForm.number + "" + this.ruleForm.tableData[i].UnitCode
                }
                this.ruleForm.tableData.push()
            },
            //    属性检测
            capsCheck(data){
                let arr = []
                data.forEach(row => {
                    if (row.IsChecked == 1) {
                        arr.push(row)
                    }
                })
                return arr
            },
            reciveAttr (val){
                if (val.length != 0) {
                    let arr = []
                    let len = val.length
                    for (let i = 0; i < len; i++) {
                        arr.push({
                            "propertyCode": val[i].propertyCode,
                            "propertyValue": this.arrTurn(val[i].propertyValue),
                            "propertyName": val[i].Name,
                        })
                    }
                    this.recAttr = arr
                }
            },
            arrTurn(data){
                if (data instanceof Array) {
                    return data.join(",")
                } else {
                    return data
                }
            },
            speCheck(){
                if(this.ruleForm.tableData.length == 0){
                    return false
                }else{
                    for(let i = 0;i<this.ruleForm.tableData.length;i++){
                        if(this.ruleForm.tableData[i].unitName.length == 0||this.ruleForm.tableData[i].Price.length == 0){
                            return false
                        }else{
                            return true
                        }
                    }
                }
            },
            handleImageAdded(file, Editor, cursorLocation) {
                var formData = new FormData();
                formData.append('image', file)
                axios({
                    url: baseImgPath + '/api/Image/UploadImg?op=goods',
                    method: 'POST',
                    headers: {'Content-Type': 'multipart/form-data'},
                    data: formData
                }).then((result) => {

                    let url = result.data
                    Editor.insertEmbed(cursorLocation, 'image', baseImgPath + url);
                }).catch((err) => {
                    console.log(err);
                })
            },
            getUrl(data){
                if(!data){return ""}else{return data.response}
            },
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },

            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.dynamicTags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            nameCode(data){
                data.forEach(row=>{
                    row.nameCode = row.BranchName+","+row.Code
                })
                return data
            },
        },
        components: {
            attr,
            VueEditor
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .pic-tit {
        line-height: 40px;
        display: block;
        border-bottom: 1px dotted rgb(242, 242, 242);
        margin-bottom: 5px;
    }
    .main {
        height: 150px;
        overflow: hidden;
    }
    .addCap{
        margin-left: 60px;cursor: pointer;
    }
    .addCap:hover,.delete:hover{
        color: #cda382;
    }
    .delete {
        cursor: pointer;
    }
    .check-ipt {
        float: none;
        width: 30px;
        height: 30px;
        border: 1px solid #bfcbd9;
        border-radius: 4px;
        margin-left: 5px;
        padding: 0 3px;;
    }
</style>
