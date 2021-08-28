<template>
    <div class="hospital selCommon">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="分类：" required style="margin-bottom: 10px">
                <el-form-item prop="classify1" style="float: left;">
                    <el-select v-model="ruleForm.classify1" placeholder="请选择" @change='getClass()'>
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
                <el-input v-model="ruleForm.number" style="width: 400px;float:none"></el-input>
                <el-button type="primary" @click="getNum(1)"  style="margin-left:5px;">自动获取</el-button>
            </el-form-item>

            <el-form-item label="商品名称：" prop="projectName" style="margin-bottom: 10px">
                <el-input v-model="ruleForm.projectName" style="width: 400px;float:none"></el-input>
            </el-form-item>

            <el-form-item label="商品别名：" prop="goodsAlias" style="margin-bottom: 10px">
                <el-input v-model="ruleForm.goodsAlias" style="width: 400px;float:none"></el-input>
            </el-form-item>

            <el-form-item label="拼音" style="margin-bottom: 10px">
                <el-input v-model="ruleForm.pinYin" style="width: 400px"></el-input>
            </el-form-item>
            <el-form-item label="搜索关键字" style="margin-bottom: 10px">
                <el-input v-model="ruleForm.keyWords" style="width: 400px" placeholder="多个关键词用逗号隔开"></el-input>
            </el-form-item>
            <el-form-item label="是否针剂：" style="margin-bottom: 10px">
                <el-radio class="radio" v-model="ruleForm.IsMany" label="1">是</el-radio>
                <el-radio class="radio" v-model="ruleForm.IsMany" label="0">否</el-radio>
            </el-form-item>

            <el-form-item label="是否有效：" style="margin-bottom: 10px">
                <el-radio class="radio" v-model="ruleForm.isEnable" label="1">有效</el-radio>
                <el-radio class="radio" v-model="ruleForm.isEnable" label="0">无效</el-radio>
            </el-form-item>

            <el-form-item label="医院：" prop="hospital" required style="margin-bottom: 10px">
                <el-select v-model="ruleForm.hospital" placeholder="请选择" @change="selectHs" style="width: 400px;float:none">
                    <el-option v-if="item.code" v-for="item in hospital" :label="item.supplierName" :value="item.code" :key="item.code"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="科室：" style="margin-bottom: 10px">
                <el-select v-model="ruleForm.deptCode" style="width: 400px">
                   <el-option v-for="(item,index) in deptList" :key="index" :label="item.deptName+'('+item.deptCode+')'"
                    :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="项目类型：" style="margin-bottom: 10px" prop="itemType">
                <el-select v-model="ruleForm.itemType" style="width: 400px;float:none">
                    <el-option label="微整" value="1"></el-option>
                    <el-option label="手术" value="2"></el-option>
                    <el-option label="无痕眼袋" value="3"></el-option>
                </el-select>
            </el-form-item>

             
            <el-form-item label="医生：" prop="doctor" required style="margin-bottom: 10px">
                <el-select v-model="ruleForm.doctor" placeholder="请选择" style="width: 400px;float:none">
                    <el-option v-for="(item,index) in doctor" :label="item.ServiceName" :value="item.Code" :key="index"></el-option>
                </el-select>
                <span style="line-height: 36px">专家费比例{{FarePercent}}%</span>
            </el-form-item>
            <el-form-item label="属性：" style="margin-bottom: 10px">
                <el-row :span="24" style="background: #EEF1F6;padding: 5px 0">
                    <attr :cap="cap" @attrChange="reciveAttr"></attr>
                </el-row>
            </el-form-item>
            <el-form-item label="自定义属性：" style="margin-bottom: 10px">
                <el-table :data="tableData" border style="width: 900px">
                    <el-table-column prop="date" label="名称" min-width="180">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.propertyName"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="内容" min-width="380">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.propertyValue" placeholder="添加属性内容，多项内容用空格分隔，帮助你更好地整理内容"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="" min-width="100">
                        <template slot-scope="scope">
                            <el-button size="small" type="danger" @click="tableData.splice(scope.$index,1)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="text" @click="addSelfAttr">添加</el-button>
            </el-form-item>
            <el-form-item label="标签：" style="margin-bottom: 10px">
                <el-checkbox-group v-model="ruleForm.labelList" style="line-height: 40px">
                    <el-checkbox v-for="(item,index) in tagList" :key="index" :label="item.code"> {{item.tagName}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="原价：" prop="origionPrice" style="margin-bottom: 10px;width: 400px">
                <el-input v-model="ruleForm.origionPrice" @change="priChange"></el-input>
            </el-form-item>
            <el-form-item label="价格：" prop="salePrice" style="margin-bottom: 10px;width: 400px">
                <el-input v-model="ruleForm.salePrice" @change="priChange"></el-input>
            </el-form-item>
            <el-form-item label="线上价格：" prop="OnlinePrice" style="margin-bottom: 10px;width: 400px">
                <el-input-number v-model="ruleForm.OnlinePrice" placeholder="" :controls="false" :min=0 style="width:300px"></el-input-number>
            </el-form-item>
            <el-form-item label="规格：" required style="margin-bottom: 10px">
                <el-checkbox v-model="ruleForm.checked1">
                    统一设置价格
                    <el-input v-model="ruleForm.price" type="text" @change="setChange('price')" style="float: none;width: 100px;margin-left: 10px"></el-input>
                </el-checkbox>
                <el-checkbox v-model="ruleForm.checked2">
                    统一设置订金
                    <el-input v-model="ruleForm.deposit" type="text" @change="setChange('deposit')" style="float: none;width: 100px;margin-left: 10px"></el-input>
                </el-checkbox>
                <el-table :data="ruleForm.tableData" border style="width: 1100px;margin-top: 10px">
                    <el-table-column prop="unitName" label="规格" min-width="150">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.unitName" placeholder="例如：S"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="Course" label="疗程" min-width="80">
                        <template slot-scope="scope">
                            <el-input-number v-model="scope.row.Course" placeholder="" :controls="false" :min=1 style="width:100%"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column prop="Price" label="价格" min-width="100">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.Price" @change="change(ruleForm.tableData,scope.$index,1)"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="Price" label="线上价格" min-width="100">
                        <template slot-scope="scope">
                            <el-input-number v-model="scope.row.OnlinePrice" placeholder="" :controls="false" :min=0 style="width:100%"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column prop="DownPayment" label="订金" min-width="120">
                        <template slot-scope="scope">
                            <el-input-number :min=0 v-model="scope.row.DownPayment" @change="change(ruleForm.tableData,scope.$index,2)" :controls="false"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column prop="ServiceFare" label="专家费（元）" min-width="120">
                    </el-table-column>
                    
                    <el-table-column prop="UnitCode" label="规格编码" min-width="120">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.UnitCode"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="BarCode" label="商品条形码" min-width="180">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.BarCode"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" min-width="120">
                        <template slot-scope="scope">
                            <el-button type="text" @click="deleteRow(scope.$index,ruleForm.tableData)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="text" @click="addSpec">添加规格</el-button>
            </el-form-item>
            <el-form-item label="积分抵现：" required style="margin-bottom: 10px">
                <el-radio class="radio" v-model="ruleForm.radio2" label="0">不限</el-radio>
                <el-radio class="radio" v-model="ruleForm.radio2" label="1">限额</el-radio>
                <el-input v-model.number="ruleForm.integral" :disabled="ruleForm.radio2 == 0" style="width: 120px;float: none"></el-input>
            </el-form-item>
            <el-form-item label="图片：" prop="fileList2" class="form_item_mt10">
                <div style="color:red">请上传800*800px以上图片，小于1M,图片过大将严重影响app端加载速度</div>
                <el-row>
                    <div style="width:150px;margin-right:5px;float: left">
                        <div class="main" style="width:150px;">
                            <span class="pic-tit">封面</span>
                            <el-upload :action="action" :accept="acceptImage" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove0" style='line-height:20px' :file-list="fileList0" :before-upload="beforeAvatarUpload" :on-success="handleSuccess0">
                                <i class="el-icon-plus"></i><br/>
                            </el-upload>
                            <el-dialog v-model="dialogVisible" size="tiny">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </div>
                    </div>
                    <div style="width:150px;margin-right:5px;float: left">
                        <div class="main" style="width:150px;">
                            <span class="pic-tit">主图</span>
                            <el-upload :action="action" :accept="acceptImage" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove1" style='line-height:20px' :file-list="fileList3" :before-upload="beforeAvatarUpload" :on-success="handleSuccess1">
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
                            <el-upload :action="action" :accept="acceptImage" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove2" style='line-height:20px' :file-list="fileList4" :multiple="true" :on-success="handleSuccess" :before-upload="beforeAvatarUpload" >
                                <i class="el-icon-plus"></i><br/>
                            </el-upload>
                        </div>
                        <ul class="" v-if="fileList4.length > 1" style="height: 60px;">
                            <li style="display: inline-block;width: 98px;margin-right: 8px;" class="" v-for="(item,index) in fileList4" :key="index">
                                <el-button type="text">
                                    <i class="el-icon-arrow-left" @click="move('left',index)"></i>
                                </el-button>
                                <el-button type="text">
                                    <i class="el-icon-arrow-right" @click="move('right',index)"></i>
                                </el-button>
                            </li>
                        </ul>
                    </div>
                </el-row>
            </el-form-item>
            <el-form-item label="使用规则：" prop="content" class="form_item_mt10">
                <el-input type="textarea" :rows="4" placeholder="本项目适用" style="width:500px;" v-model="ruleForm.useRules"></el-input>
            </el-form-item>
            <!-- <el-form-item label="使用规则：" prop="content" class="form_item_mt10">
                <el-input type="textarea" :rows="4" placeholder="所有项目使用" style="width:500px;" v-model="ruleForm.useRulesAll"></el-input>
            </el-form-item> -->
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

<script type="text/ecmascript-6">
import { VueEditor } from 'vue2-editor'
import { baseImgPath } from '@/config/env'
import { acceptImage } from '@/config/common'
import axios from 'axios'
import attr from "./attr"
import { getCookie } from "@/config/mUtils"
import {  GetCatelogByColumnCode, GetColumnAll, GetTagByPage,GetDeptAllByHospitalCode,GetDropDownPermission,DelImg,
GetPropertyByKeywords, AddGoods, GetServiceManByHspCode, getTopBranch} from "../../../api/myData"
export default {
    // name: 'hospital',
    data() {
        var classify1 = (rule, value, callback) => {
            if (value == "" && this.Categories.length != 0) {
                return callback(new Error('请选择大类'));
            } else {
                callback()
            }
        };
        var classify2 = (rule, value, callback) => {
            if (value == "" && this.subClass.length != 0) {
                return callback(new Error('请选择中类'));
            } else {
                callback()
            }
        };
        var classify3 = (rule, value, callback) => {
            if (value == "" && this.label.length != 0) {
                return callback(new Error('请选择小类'));
            } else {
                callback()
            }
        };
        return {
            saveLoading:false,
            tagList: [],
            supply: [],//医院
            dynamicTags: [],
            inputVisible: false,
            inputValue: '',
            action: "",
            acceptImage: "",
            column: [],
            columnIndex: 0,
            catelog: "",
            classId: "",
            subClass: {},
            label: {},
            hospital: [],
            doctor: [],
            recAttr: [],
            cap: [{}],
            FarePercent: "",
            goodsCodeIndex: 0,
            // agent: [],
            tableData: [],
            ruleForm: {
                isEnable:"1",
                OnlinePrice:0,
                IsMany:"0",
                classify1: "",
                classify2: "",
                classify3: "",
                number: "",
                projectName: "",
                goodsAlias: "",
                radio1: 1,
                // agentList: [],
                HospitalList: [],
                hospital: "",
                supplierCode: "",
                doctor: "",
                serviceMan: "",
                labelList: [],
                tableData: [{
                    unitName: "",
                    Price: "",
                    Course: "1",
                    DownPayment: "",
                    UnitCode: "1000",
                    BarCode: "",
                    ServiceFare: 0
                }],
                salePrice: "",
                origionPrice: "",
                checked1: false,
                checked2: false,
                price: "",
                deposit: "",
                radio2: "0",
                integral: "",
                fileList2: [],
                content: "",
                pinYin: "",
                deptCode:{},
                itemType:"",
                useRulesAll:'',
                useRules:'',

                keyWords:'',
            },
            deptList:[],//科室列表
            dialogVisible: false,
            dialogImageUrl: '',
            //                主图附图集合
            fileList3: [],
            fileList4: [],
            fileList0: [],
            rules: {
                classify1: [
                    { validator: classify1, trigger: 'change' }
                ],
                classify2: [
                    { validator: classify2, trigger: 'change' }
                ],
                classify3: [
                    { validator: classify3, trigger: 'change' }
                ],
                number: [
                    { required: true, message: '请填写编码', trigger: 'blur' }
                ],
                projectName: [
                    { required: true, message: '请填写商品名称', trigger: 'blur' }
                ],
                hospital: [
                    { required: true, message: '请选择医院', trigger: 'change' }
                ],
                salePrice: [
                    { required: true, message: '请填写售价', trigger: 'blur' }
                ],
                origionPrice: [
                    { required: true, message: '请填写原价', trigger: 'blur' }
                ],
                integral: [
                    { required: true, message: '请填写积分抵扣额', trigger: 'blur' }
                ],
                doctor: [
                    { required: true, message: '请选择医生', trigger: 'change' }
                ],
                OnlinePrice:[
                    { required: true,type:'number', message: '请填写价格', trigger: 'blur' }
                ],
                goodsAlias:[
                    { required: true, message: '请填别名', trigger: 'blur' }
                ],
                itemType:[{
                    required: true, message: '请选择类型', trigger: 'change'
                }]
            }
        };
    },
    computed: {
        Categories() {
            
            return this.parentCode("")
        },
    },
    watch: {
        "ruleForm.checked1": {
            handler(curVal, oldVal) {
                if (curVal == true) {
                    this.commonSet("price")
                }
            },
            deep: true
        },
        "ruleForm.checked2": {
            handler(curVal, oldVal) {
                if (curVal == true) {
                    this.commonSet("deposit")
                }
            },
            deep: true
        },
        "ruleForm.price": {
            handler(curVal, oldVal) {
                if (this.ruleForm.checked1 == true) {
                    this.commonSet("price")
                    this.ruleForm.tableData.forEach(row => {
                        row.ServiceFare = Math.floor(Number(row.Price) * Number(this.FarePercent)) / 100
                    })
                    this.ruleForm.tableData.push()
                }
            },
            deep: true
        },
        
         "ruleForm.OnlinePrice": {
            handler(curVal, oldVal) {
                if (this.ruleForm.checked1 == true) {
                    this.commonSet("OnlinePrice")
                }
            },
            deep: true
        },
        "ruleForm.deposit": {
            handler(curVal, oldVal) {
                if (this.ruleForm.checked2 == true) {
                    this.commonSet("deposit")
                }
            },
            deep: true
        },
        "ruleForm.radio2": {
            handler(curVal, oldVal) {
                if (curVal == 0) {
                    this.ruleForm.integral = ""
                }
            },
            deep: true
        },
        "ruleForm.doctor": {
            handler(curVal, oldVal) {
                this.doctor.forEach(row => {
                    if (row.Code == this.ruleForm.doctor) {
                        this.FarePercent = row.FarePercent
                    }
                })
            },
            deep: true
        },
        "FarePercent": {
            handler(curVal, oldVal) {
                this.ruleForm.tableData.forEach(row => {
                    row.ServiceFare = Math.floor(Number(row.Price) * Number(this.FarePercent)) / 100
                })
                this.ruleForm.tableData.push()
            },
            deep: true
        },
    },
    mounted: function() {
        this.action = baseImgPath + "/api/Image/UploadImg?op=goods"
        this.acceptImage = acceptImage
        this.getColumn()
    },
    methods: {
        change(data, index, num) {
            let vm = this
            setTimeout(function() {
                if (num == 1) {
                    vm.ruleForm.tableData[index].Price = (data[index].Price.match(/\d+(\.\d{0,2})?/)||[''])[0]
                    vm.ruleForm.tableData[index].ServiceFare = Math.floor(Number(data[index].Price) * Number(vm.FarePercent)) / 100
                    vm.ruleForm.tableData.push()
                } else {
                    vm.ruleForm.tableData[index].DownPayment = (data[index].DownPayment.match(/\d+(\.\d{0,2})?/)||[''])[0]
                }
            }, 50)
        },
        setChange(set) {
            let vm = this
            setTimeout(function() {
                     vm.ruleForm.price = (vm.ruleForm.price.match(/\d+(\.\d{0,2})?/)||[''])[0]
                     vm.ruleForm.deposit = (vm.ruleForm.deposit.match(/\d+(\.\d{0,2})?/)||[''])[0]
            }, 50)
        },
        priChange() {
            let vm = this
            setTimeout(function() {
                    vm.ruleForm.salePrice = (vm.ruleForm.salePrice.match(/\d+(\.\d{0,2})?/)||[''])[0]
                    vm.ruleForm.origionPrice = (vm.ruleForm.origionPrice.match(/\d+(\.\d{0,2})?/)||[''])[0]
            }, 50)
        },
        //            获取所有栏目
        async getColumn() {
            try {
                let column = await GetColumnAll();
                this.column = column
                this.getCatelog({ code: this.column[0].CloumnCode })
            } catch (err) {
                console.log('获取数据失败', err);
            }
        },
        //            获取医院
        async GetSupplierBySupTypeCode() {
            try {
                let [result,hos] = await Promise.all([GetTagByPage({ "TypeCode": "2", "pageIndex": 1, "pageSize": 100, "keywords": "" }),GetDropDownPermission({typeId: 1})])
                this.hospital = hos.data
                this.ruleForm.hospital = hos.data[0].code
                this.GetServiceManByHspCode({ hospitalCode: this.ruleForm.hospital })
                this.tagList = result.data
            } catch (err) {
                console.log('获取数据失败', err);
            }
        },
        //            获取医生
        async GetServiceManByHspCode(data) {
            try {
                let dept = await GetDeptAllByHospitalCode(data)
                for(let item of dept.data){
                    item["name"] = item.deptName+'('+item.deptCode+')'
                    item["value"] = item.deptCode
                }
                this.deptList = dept.data
                let res = await GetServiceManByHspCode(data);
                this.doctor = []
                res.forEach(ele=>{
                    // 一对多医务人员筛选
                    let hosCodes = ele.HospitalCode.split(",")
                    if(hosCodes.indexOf(data.hospitalCode)>=0){
                        if(ele.SerTypeCode == '001'){
                            this.doctor.push(ele)
                        }
                    }
                })
            } catch (err) {
                console.log('获取数据失败', err);
            }
        },
        //  获取所有分类
        async getCatelog(data) {
            try {
                let res = await GetCatelogByColumnCode(data);
                this.catelog = res.data
                this.GetSupplierBySupTypeCode()
            } catch (err) {
                console.log(err)
            }
        },
        //    添加商品接口
        async addGoods(data) {
            try {
                this.saveLoading = true
                let res = await AddGoods(data);
                if (res.success) {
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                }
                this.saveLoading = false
            } catch (err) {
                this.$message.error('添加失败');
            }
        },
        //    查询属性
        async getProperty(data) {
            try {
                let res = await GetPropertyByKeywords(data);
                this.cap = this.capsCheck(res)
            } catch (err) {
                console.log(err)
            }
        },
        //    大类
        getClass() {
            this.ruleForm.classify2 = ""
            this.ruleForm.classify3 = ""
            this.label = {}
            this.getProperty({
                keywords: "",
                "columncode": "100",
                "catelogcode": this.ruleForm.classify1
            })
            this.subClass = this.parentCode(this.ruleForm.classify1)
        },

        //1.用正则HtmlUtil表达式实现html转码
        htmlEncode(str) {
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
            // 数据库部分分类绑定path有误无法直接使用 catLogCode需拼接 格式：|code1|code2|code3|
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
                        if (this.speCheck()) {
                            let label = this.ruleForm.labelList.join(",")
                            let obj = {
                                ColumnCode: 100,
                                supplierCode: this.ruleForm.hospital,
                                serviceMan: this.ruleForm.doctor,
                                catalogCode: catLogCode,
                                name: this.ruleForm.projectName,
                                GoodsCode: this.ruleForm.number,
                                goodsAlias: this.ruleForm.goodsAlias||"",
                                pinYin: this.ruleForm.pinYin,
                                imgMainUrl: this.getUrl(this.fileList3[0]),
                                imgAssUrl1: this.getUrl(this.fileList4[0]),
                                imgAssUrl2: this.getUrl(this.fileList4[1]),
                                imgAssUrl3: this.getUrl(this.fileList4[2]),
                                imgAssUrl4: this.getUrl(this.fileList4[3]),
                                ImgCoverUrl:this.getUrl(this.fileList0[0]),
                                Price: this.ruleForm.origionPrice,
                                OnlinePrice:this.ruleForm.OnlinePrice,
                                priceSale: this.ruleForm.salePrice,
                                Ismall: "0",
                                IsMany:this.ruleForm.IsMany,
                                isLimit: this.ruleForm.radio2,
                                goodsTag: label,
                                RichText: this.htmlEncode(this.ruleForm.content),
                                CreateUserCode: getCookie("userCode"),
                                CreateBy:getCookie('userName'),
                                CreateDate: new Date().formatDate("yyyy-MM-dd"),
                                // isPublic: this.ruleForm.radio1,
                                goodsPropertyList: JSON.stringify(this.recAttr.concat(this.tableData)),
                                goodsUnitList: JSON.stringify(this.ruleForm.tableData),
                                limitAmount: this.ruleForm.integral,
                                state: 0,
                                ApproveState: 0,
                                // goodsBranchList: JSON.stringify(this.getBranchList(this.ruleForm.agentList)),
                                deptCode:this.ruleForm.deptCode.deptCode||"",
                                itemType:this.ruleForm.itemType||"",
                                isEnable:this.ruleForm.isEnable,
                                UseRules :this.ruleForm.useRules,
                                UseRulesAll  :this.ruleForm.useRulesAll ,
                                keyWords:this.ruleForm.keyWords,
                                
                            }
                            this.addGoods(obj)
                        } else {
                            this.$message({ message: '请完善规格信息，保持规格信息完整', type: 'warning' });
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
        //单选框切换
        // handleRadioChange(val) {
        //     if (val == 1) {
        //         this.ruleForm.agentList = this.agent
        //         this.ruleForm.HospitalList = this.hospital
        //     }
        // },
        //    小类
        getLabel() {
            this.ruleForm.classify3 = ""
            this.label = {}
            this.getProperty({
                keywords: "",
                "columncode": "100",
                "catelogcode": this.ruleForm.classify2
            })
            this.label = this.parentCode(this.ruleForm.classify2)
        },
        getLabelCap() {
            this.getProperty({
                keywords: "",
                "columncode": "100",
                "catelogcode": this.ruleForm.classify3
            })
        },
        // 添加规格
        addSpec() {
            //
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
                    unitName: "",
                    OnlinePrice:this.ruleForm.OnlinePrice,
                    Price: price,
                    Course: "1",
                    DownPayment: deposit,
                    UnitCode: unitCode,
                    BarCode: barCode,
                    ServiceFare: 0,
                })
            } else {
                this.$alert('请先生成商品编码', '提示', {
                    confirmButtonText: '确定',
                    type: 'warning',
                });
            }
        },
        //删除规格
        deleteRow(index, data) {
            data.splice(index, 1)
            this.tableNumChange()
        },

        // 统一设置价格订金
        commonSet(attr) {
            var len = this.ruleForm.tableData.length
            for (let i = 0; i < len; i++) {
                if (attr == "price") {
                    this.ruleForm.tableData[i].Price = this.ruleForm.price
                }
                if(attr == 'price'){
                    this.ruleForm.tableData[i].DownPayment = this.ruleForm.deposit
                }
                if(attr == 'OnlinePrice'){
                    this.ruleForm.tableData[i].OnlinePrice = this.ruleForm.OnlinePrice
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
            this.fileList4 = fileList
        },

        // 删除图片操作
        handleRemove0(file, fileList) {
            if(file.response){
                this.DelImg(file.response)
            }
            this.fileList0 = fileList
        },

        // 删除原图片/视频
        async DelImg(filepath){
            let res = await DelImg({filepath:filepath})
            if(!res.status){        
                this.$message({message: '原图片删除失败！'+res.errorMessage,type: 'warning'});
            }
        },
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 1;
            let isLimit = true
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 1MB!');
            }
            if (this.fileList4.length > 4) {
                isLimit = false
            }
            return isLt2M && isLimit;
        },
        
        handleSuccess1(response, file, fileList) {// 主图
            this.fileList3 = fileList
        },
        handleSuccess(response, file, fileList) {//附图
            this.fileList4 = fileList
        },
        handleSuccess0(response, file, fileList) {//封面
            this.fileList0 = fileList
        },
        //图片位置切换
        move(flag, index) {
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
        parentCode(code) {
            var arr = []
            for (let i = 0; i < this.catelog.length; i++) {
                if (code == this.catelog[i].parentCode) {
                    arr.push(this.catelog[i])
                }
            }
            return arr
            
        },
        getNum(num) {
            let header = ""
            if (num == 1) {
                header = "YM"
            }
            else {
                header = "SC"
            }
            let date = new Date()
            this.ruleForm.number = header + this.formatDate(date)
            if (this.ruleForm.tableData.length != 0 && this.goodsCodeIndex == 0) {
                
                this.tableNumChange()
            }
            this.goodsCodeIndex = 1
        },
        // 时间格式转化
        formatTen(num) {
            return num > 9 ? (num + "") : ("0" + num)
        },
        formatDate(date) {
            if (date === '') {
                return ''
            } else {
                let year = date.getFullYear()
                let month = date.getMonth() + 1
                let day = date.getDate()
                let hour = date.getHours()
                let minute = date.getMinutes()
                let second = date.getSeconds()
                return "" + year + this.formatTen(month) + this.formatTen(day) + this.formatTen(hour) + this.formatTen(minute) + this.formatTen(second)
            }
        },
        //    添加自定义属性
        addSelfAttr() {
            this.tableData.push({ propertyCode: 99999, propertyName: "", propertyValue: "" })
        },

        pictureCheck() {
            if (this.ruleForm.fileList3.length == 1 && this.ruleForm.filestList4.length == 5) {
                return true
            } else {
                return false
            }
        },
        tableNumChange() {
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
        capsCheck(data) {
            let arr = []
            data.forEach(row => {
                if (row.IsChecked == 1) {
                    arr.push(row)
                }
            })
            return arr
        },
        reciveAttr(val) {
            //
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
        arrTurn(data) {
            if (data instanceof Array) {
                //
                return data.join(",")
            } else {
                return data
            }
        },
        selectHs() {
            this.ruleForm.doctor = ""
           
            this.GetServiceManByHspCode({ hospitalCode: this.ruleForm.hospital })
        },
        speCheck() {
            if (this.ruleForm.tableData.length == 0) {
                return false
            } else {
                for (let i = 0; i < this.ruleForm.tableData.length; i++) {
                    if (this.ruleForm.tableData[i].unitName.length == 0 || this.ruleForm.tableData[i].Price.length == 0 || this.ruleForm.tableData[i].DownPayment.length == 0) {
                        return false
                    } else {
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
                headers: { 'Content-Type': 'multipart/form-data' },
                data: formData
            }).then((result) => {
                let url = result.data
                Editor.insertEmbed(cursorLocation, 'image', baseImgPath + url);
            }).catch((err) => {
                console.log(err);
            })
        },
        getUrl(data) {
            if (!data) {
                return ""
            } else {
                return data.response
            }
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
        nameCode(data) {
            data.forEach(row => {
                row.nameCode = row.BranchName + "," + row.Code
            })
            return data
        },
        getBranchList(data) {
            let arr = []
            data.forEach(row => {
                arr.push({
                    GoodsCode: this.ruleForm.number,
                    branchName: row.split(",")[0],
                    branchCode: row.split(",")[1]
                })
            })
            return arr
        }
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

.addCap {
    margin-left: 60px;
    cursor: pointer;
}

.addCap:hover,
.delete:hover {
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
    padding: 0 3px;
    ;
}

</style>
