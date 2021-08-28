<template>
    <div class="hospital">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="分类：" required style="margin-bottom: 10px">
                <el-form-item style="float: left">
                    <el-select v-model="ruleForm.classify1"  prop="" placeholder="请选择" @change='getClass()'>
                        <el-option v-for="(item,index) in Categories" :key="index" :label="item.name" :value="item.code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="float: left">
                    <el-select v-model="ruleForm.classify2"  placeholder="请选择" @change='getLabel()'>
                        <el-option v-for="(item,index) in subClass" :key="index" :label="item.name" :value="item.code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="float: left">
                    <el-select v-model="ruleForm.classify3"  placeholder="请选择" @change="getLabelCap">
                        <el-option v-for="(item,index) in label" :key="index" :label="item.name" :value="item.code"></el-option>
                    </el-select>
                </el-form-item>
            </el-form-item>
            <el-form-item label="商品编号：" prop="number" required style="margin-bottom: 10px">
                <el-input v-model="ruleForm.number" :disabled="true" style="width: 400px"></el-input>
                <el-button @click="getNum(1)" type="primary" style="margin-left:5px;">自动获取</el-button>
            </el-form-item>
            <el-form-item label="商品名称：" prop="projectName" required style="margin-bottom: 10px">
                <el-input v-model="ruleForm.projectName" style="width: 400px"></el-input>
            </el-form-item>
            <el-form-item label="商品别名：" prop="goodsAlias" style="margin-bottom: 10px">
                <el-input v-model="ruleForm.goodsAlias" style="width: 400px"></el-input>
            </el-form-item>

            <el-form-item label="拼音" prop="" style="margin-bottom: 10px">
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
                    <el-option v-if="item.code" v-for="(item,index) in hospital" :label="item.supplierName" :value="item.code" :key="index"></el-option>
                </el-select>
            </el-form-item>
              <el-form-item label="科室：" style="margin-bottom: 10px">
                <el-select v-model="ruleForm.deptCode" style="width: 400px">
                   <el-option v-for="(item,index) in deptList" :key="index" :label="item.deptName+'('+item.deptCode+')'"
                    :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="项目类型：" style="margin-bottom: 10px" prop="itemType">
                <el-select v-model="ruleForm.itemType" style="width: 400px">
                    <el-option label="微整" value="1"></el-option>
                    <el-option label="手术" value="2"></el-option>
                    <el-option label="无痕眼袋" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="医生：" prop="doctor" required style="margin-bottom: 10px">
                <el-select v-model="ruleForm.doctor" placeholder="请选择"  style="width: 400px;float:none">
                    <el-option v-for="(item,index) in doctor" :label="item.ServiceName" :value="item.Code" :key="index"></el-option>
                </el-select>
                <span style="line-height: 36px">专家费比例{{FarePercent}}%</span>
            </el-form-item>
            <el-form-item label="属性：" style="margin-bottom: 10px;">
                <el-row :span="24" style="background: #EEF1F6;padding: 5px 0;width:900px">
                    <attr :cap="cap" :getCaps="getCaps" @attrChange="reciveAttr"></attr>
                </el-row>
            </el-form-item>
            <el-form-item label="自定义属性：" style="margin-bottom: 10px">
                <el-table :data="tableData" border  style="width: 900px;margin-top: 10px">
                    <el-table-column prop="date" label="名称" min-width="180">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.PropertyName"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="内容" min-width="380">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.PropertyValue" placeholder="添加属性内容，多项内容用空格分隔，帮助你更好地整理内容"></el-input>
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
                <el-checkbox-group v-model="dynamicTags" style="line-height: 40px">
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
                    <el-input v-model.number="ruleForm.price" type="text" @change="setChange('price')"
                              style="float: none;width: 100px;margin-left: 10px"></el-input>
                </el-checkbox>
                <el-checkbox v-model="ruleForm.checked2">
                    统一设置库存
                    <el-input v-model.number="ruleForm.deposit" type="text" @change="setChange('deposit')"
                              style="float: none;width: 100px;margin-left: 10px"></el-input>
                </el-checkbox>
                <el-table :data="ruleForm.tableData" border style="width: 1100px;margin-top: 10px">
                    <el-table-column prop="UnitName" label="规格" min-width="100">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.UnitName" placeholder="例如：白色300ml"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="Course" label="疗程" min-width="80">
                        <template slot-scope="scope">
                            <el-input-number v-model="scope.row.Course" placeholder="" :controls="false" :min=1 style="width:100%"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column prop="Price" label="价格" min-width="120">
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
                            <el-input-number :min=0 :controls="false" v-model="scope.row.DownPayment" style="width:100%" @change="change(ruleForm.tableData,scope.$index,2)"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column prop="ServiceFare" label="专家费（元）" min-width="120"></el-table-column>
                    <el-table-column prop="UnitCode" label="规格编码" min-width="120">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.UnitCode"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="BarCode" label="商品条形" min-width="170">
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
                <el-input v-model="ruleForm.integral" :disabled="ruleForm.radio2 == 0" style="width: 120px;float: none"></el-input>
            </el-form-item>
            <el-form-item label="图片：" required class="form_item_mt10">
                <div style="color:red">请上传800*800px以上图片，小于1M，图片过大将严重影响app端加载速度</div>
                <el-row>
                    <div style="width:150px;margin-right:5px;float: left">
                        <div class="main" style="width:150px;">
                            <span class="pic-tit">封面</span>
                            <el-upload :action="action" 
                            :accept="acceptImage" 
                            list-type="picture-card" 
                            :on-preview="handlePictureCardPreview" 
                            :on-remove="handleRemove0" 
                            style='line-height:20px' 
                            :file-list="fileList0" 
                            :before-upload="beforeAvatarUpload" 
                            :on-success="handleSuccess0">
                                <i class="el-icon-plus"></i><br/>
                            </el-upload>
                        </div>
                    </div>
                    <div style="width:150px;margin-right:5px;float: left">
                        <div class="main" style="width:150px;">
                            <span class="pic-tit">主图</span>
                            <el-upload
                                :action="action"
                                :accept="acceptImage"
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove1" style='line-height:20px'
                                :file-list="fileList3"
                                :before-upload="beforeAvatarUpload"
                                :on-change="handleChange1">
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
            <el-form-item label="使用规则：" prop="content" class="form_item_mt10">
                <el-input type="textarea" :rows="4" placeholder="本项目适用" style="width:500px;" v-model="ruleForm.useRules"></el-input>
            </el-form-item>
            <!-- <el-form-item label="使用规则：" prop="content" class="form_item_mt10">
                <el-input type="textarea" :rows="4" placeholder="所有项目使用" style="width:500px;" v-model="ruleForm.useRulesAll"></el-input>
            </el-form-item> -->
            <el-form-item label="商品详情" prop="content" class="form_item_mt10">
                <VueEditor v-model="ruleForm.content" useCustomImageHandler @image-added="handleImageAdded"></VueEditor>
            </el-form-item>
            <el-form-item label-width="100px">
                <el-button type="primary" @click="submitForm('ruleForm',0)" :loading="saveLoading" v-if="from == 'edit'">编辑完成</el-button>
                <el-button type="primary" @click="submitForm('ruleForm',1)" :loading="saveLoading" v-if="from == 'copy'">复制到其他医院</el-button>
                <el-button @click="resetForm('ruleForm')">取消</el-button>
                <el-button @click="back('ruleForm')">返回商品列表</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script type="text/ecmascript-6">
    import { VueEditor } from 'vue2-editor'
    import { baseImgPath } from '@/config/env'
    import { acceptImage } from '@/config/common'
    import axios from 'axios'
    import attr from "./editAttr"
    import {getCookie} from "@/config/mUtils"
    import {GetCatelogByColumnCode,GetColumnAll,DeleteCatelogById,GetTagByPage,GetDeptAllByHospitalCode,DelImg,
        GetPropertyByKeywords,AddGoods,UpdateGoods,GetServiceManByHspCode,GetDropDownPermission,getTopBranch} from "../../../api/myData"
    export default {
        // name: 'hospital',
        props:{
            hospitalMes:{},
            type:"",
            from:''
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
                isHos:getCookie('hospitalCode'),
                saveLoading :false,
                code:"",
                dynamicTags: [],
                inputVisible: false,
                inputValue: '',
                action:"",
                acceptImage:"",
                time:0,
                goodsId:"",
                column:[],
//                当前column index值据此筛选添加商品所属columnId
                columnIndex:0,
//                存放所有分类
                catelog:"",
                classCode:"",
                classId:"",
//                中类集合
                subClass:{},
//                小类集合
                label:{},
                FarePercent:"",
                supplier:[],
//                子组件传过来的属性数组
                recAttr:[],
                cap:[{}],
                getCaps:[],
//  标签
                tableData:[],
                ruleForm: {
                    isEnable:"",
                    IsMany:"0",
                    classify1:"",
                    classify2:"",
                    classify3:"",
                    number:"",
                    projectName:"",
                    goodsAlias:"",
                    hospital:"",
                    supplierCode:"",
                    doctor:"",
                    serviceMan:"",
//  标签数组
                    tableData:[],
//                    售价
                    salePrice:"",
//                    原价
                    origionPrice:"",
                    checked1:false,
                    checked2:false,
                    price:"",
                    OnlinePrice:0,
                    deposit:"",
                    radio2:"",
                    integral:"",
                    fileList2:[],
                    content: "<p>Some initial content</p>",
                    name: '',
                    region: '',
                    desc: '',
                    pinYin: "",
                    deptCode:{},
                    itemType:"",
                    useRulesAll:'',
                    useRules:'',
                    keyWords:'',
                },
                doctor:[],
                hospital:[],
                tagList:[],
                deptList:[],
                dialogVisible:false,
                dialogImageUrl: '',
                editorOption: {
                    // some quill options
                },
//                主图附图集合
                fileList3: [],
                fileList4: [],
                fileList0:[],
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
                    number: [
                        {required: true, message: '请填写编码', trigger: 'blur'}
                    ],
                    projectName: [
                        {required: true, message: '请填写商品名称', trigger: 'blur'}
                    ],
                    hospital: [
                        {required: true, message: '请选择医院', trigger: 'change'}
                    ],
                    salePrice: [
                        {required: true, message: '请填写售价', trigger: 'blur'}
                    ],
                    origionPrice: [
                        {required: true, message: '请填写原价', trigger: 'blur'}
                    ],
                    integral: [
                        {required: true, message: '请填写积分抵扣额', trigger: 'blur'}
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
            Categories(){
                return this.parentCode("")
            },
        },
        watch: {
            hospitalMes:{
                handler(curVal, oldVal){
                    this.copyWorth(curVal)
                }
            },
            "catelog":{
                handler(curVal, oldVal){
                    if(curVal.length>0){
                        setTimeout(()=>{
                            this.classSplit(this.hospitalMes.GoodsEntity.CatalogCode)
                        },200)
                    }
                },
                deep:true
            },
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
            "ruleForm.OnlinePrice":{
                handler(curVal,oldVal){
                    if(this.ruleForm.checked1 == true){this.commonSet("OnlinePrice")}
                },
                deep:true
            },
            "ruleForm.deposit":{
                handler(curVal,oldVal){
                    if(this.ruleForm.checked2 == true){this.commonSet("deposit")}
                },
                deep:true
            },
            "ruleForm.radio2":{
                handler(curVal,oldVal){
                    if(curVal == 0){this.ruleForm.integral =""}
                },
                deep:true
            },
            "ruleForm.doctor":{
                handler(curVal,oldVal){
                    this.doctor.forEach(row=>{
                        if(row.Code == this.ruleForm.doctor){
                            this.FarePercent = row.FarePercent
                        }
                    })
                },
                deep:true
            },
            "FarePercent":{
                handler(curVal,oldVal){
                    this.ruleForm.tableData.forEach(row=>{
                        row.ServiceFare = Math.floor(Number(row.Price)*Number(this.FarePercent))/100
                    })
                    this.ruleForm.tableData.push()
                },
                deep:true
            },
        },
        mounted: function () {
            // this.copyWorth(this.hospitalMes)
            
            this.from
            this.action = baseImgPath + "/api/Image/UploadImg?op=goods"
            this.acceptImage = acceptImage
            this.getColumn()
        },
        methods: {
            back(){
                this.$router.back()
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
                // if (this.ruleForm.tableData.length != 0 && this.goodsCodeIndex == 0) {
                    this.tableNumChange()
                // }
                // this.goodsCodeIndex = 1
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
            copyWorth(curVal){
                 for(var p in curVal.GoodsEntity){
                        if(curVal.GoodsEntity[p] == null||curVal.GoodsEntity[p] == undefined){
                            curVal.GoodsEntity[p]=""
                        }
                    }
                    this.goodsId = curVal.GoodsEntity.Id
                    this.code =  curVal.GoodsEntity.Code
                    this.classCode = curVal.GoodsEntity.CatalogCode
                    this.ruleForm.number = curVal.GoodsEntity.GoodsCode
                    this.classId = curVal.GoodsEntity.CatalogCode
                    this.ruleForm.projectName = curVal.GoodsEntity.Name
                    this.ruleForm.tableData = curVal.GUList
                    this.ruleForm.pinYin = curVal.GoodsEntity.PinYin
                    this.ruleForm.IsMany = curVal.GoodsEntity.IsMany+''
                    this.ruleForm.salePrice = curVal.GoodsEntity.PriceSale+""
                    this.ruleForm.origionPrice = curVal.GoodsEntity.Price+""
                    this.ruleForm.OnlinePrice = curVal.GoodsEntity.OnlinePrice
                    this.ruleForm.radio2 = curVal.GoodsEntity.IsLimit+""
                    this.ruleForm.isEnable = curVal.GoodsEntity.IsEnable+''
                    this.ruleForm.content = curVal.GoodsEntity.RichText? this.htmlDecode(curVal.GoodsEntity.RichText)+ "":""
                    this.ruleForm.goodsAlias = curVal.GoodsEntity.GoodsAlias+""
                    this.ruleForm.integral = curVal.GoodsEntity.LimitAmount+"",
                    this.ruleForm.deptCode = curVal.GoodsEntity.DeptCode
                    this.ruleForm.itemType = curVal.GoodsEntity.ItemType+""
                    this.dynamicTags = curVal.GoodsEntity.GoodsTag.split(",")
                    this.fileList0 = curVal.GoodsEntity.ImgCoverUrl.length>0?[{response:curVal.GoodsEntity.ImgCoverUrl,url:baseImgPath+curVal.GoodsEntity.ImgCoverUrl,isNew:0}]:[]
                    this.fileList3 = curVal.GoodsEntity.ImgMainUrl.length>0?[{response:curVal.GoodsEntity.ImgMainUrl,url:baseImgPath+curVal.GoodsEntity.ImgMainUrl,isNew:0}]:[]
                    this.fileList4 = this.pictureTurn(curVal.GoodsEntity)
                    this.attrSplit(curVal.GPList)
                    // this.setSupplier(curVal.GoodsEntity.SupplierCode)
                    this.ruleForm.hospital = curVal.GoodsEntity.SupplierCode
                    this.ruleForm.useRules = curVal.GoodsEntity.UseRules
                    this.ruleForm.useRulesAll = curVal.GoodsEntity.UseRulesAll
                    this.ruleForm.keyWords = curVal.GoodsEntity.KeyWords
            },
            change(data,index,num){
                let vm = this
                setTimeout(function(){
                    if(num == 1){
                        vm.ruleForm.tableData[index].Price =  (data[index].Price.match(/\d+(\.\d{0,2})?/)||[''])[0]
                        vm.ruleForm.tableData[index].ServiceFare = Math.floor(Number(data[index].Price)*Number(vm.FarePercent))/100
                    }else{
                        vm.ruleForm.tableData[index].DownPayment = (data[index].DownPayment.match(/\d+(\.\d{0,2})?/)||[''])[0]
                    }
                },50)
            },
            setChange(set){
                let vm = this
                setTimeout(function(){
                    if(set == "price"){
                        vm.ruleForm.price = (vm.ruleForm.price.match(/\d+(\.\d{0,2})?/)||[''])[0]
                    }else{
                        vm.ruleForm.deposit = (vm.ruleForm.deposit.match(/\d+(\.\d{0,2})?/)||[''])[0]
                    }
                },50)
            },
            priChange(){
                let vm = this
                setTimeout(function(){
                    vm.ruleForm.salePrice = (vm.ruleForm.salePrice.match(/\d+(\.\d{0,2})?/)||[''])[0]
                    vm.ruleForm.origionPrice = (vm.ruleForm.origionPrice.match(/\d+(\.\d{0,2})?/)||[''])[0]
                },50)
            },
//            获取所有栏目
            async getColumn(){
                try{
                    // let column = await GetColumnAll();
                    // this.column = column
                    // this.getCatelog({code:this.column[0].CloumnCode})
                    let [res,hos,result] = await Promise.all([GetCatelogByColumnCode({code:100}),GetDropDownPermission({typeId:1}),
                    GetTagByPage({"TypeCode":"2","pageIndex":1,"pageSize":100,"keywords":""})])
                    this.catelog = res.data
                    this.hospital = hos.data
                    this.selectHs()
                    // let result = await GetTagByPage({"TypeCode":"2","pageIndex":1,"pageSize":100,"keywords":""})//TypeCode 2医美项目
                    this.tagList = result.data
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
       
            nameCode(data){
                data.forEach(row=>{
                    row.nameCode = row.BranchName+","+row.Code
                })
                return data
            },
//            获取医生
            async GetServiceManByHspCode(data){
                try {
                     let dept = await GetDeptAllByHospitalCode(data)
                    for(let item of dept.data){
                        item["name"] = item.deptName+'('+item.deptCode+')'
                        item["value"] = item.deptCode
                    }
                    this.deptList = dept.data
                    let res = await GetServiceManByHspCode(data);
                    this.doctor = res

                    if (this.time == 0) {
                        let vm = this
                        setTimeout(()=> {
                            this.ruleForm.doctor = this.hospitalMes.GoodsEntity.ServiceMan
                        }, 50)
                        this.time = 1
                    }else{
                        setTimeout(()=> {
                            this.ruleForm.doctor = " "
                        }, 50)
                    }
                } catch (err) {
                    console.log('获取数据失败', err);
                }
            },
            //  获取所有分类
            async getCatelog(data){
                try{
                    let [res,hos] = await Promise.all([GetCatelogByColumnCode(data),GetDropDownPermission({typeId:1})])
                    this.catelog = res.data
                    this.hospital = hos.data
                }catch(err){
                    console.log(err)
                }
            },
            //    更新商品接口
            async updateGoods(data){
                try{
                    this.saveLoading = true
                    let res = await UpdateGoods(data);
                    if(res.success){
                        this.$message({message: '修改成功', type: 'success'});
                    }else{
                        this.$message.error('修改失败');
                    }
                    this.saveLoading = false
                }catch(err){
                    console.log(err)
                }
            },
            // 复制添加到新医院
            async AddGoods(params){
                let res = await AddGoods(params)
                if(res.success){
                    this.$message({message: '操作成功', type: 'success'});
                }else{
                    this.$message.error('操作失败');
                }
            },
            //    查询属性
            async getProperty(data){
                try{
                    let res = await GetPropertyByKeywords(data);
                    this.cap = this.capsCheck(res)
                }catch(err){
                    console.log(err)
                }
            },
            //    大类
            getClass () {
                this.ruleForm.classify2 = ""
                this.ruleForm.classify3 = ""
                this.label = {}
                let code = ""
                this.getProperty({keywords: "","columncode": "100","catelogcode": this.ruleForm.classify1})
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
            /*2.用正则表达式实现html解码*/
            htmlDecode(str) {
                var s = "";
                if (str.length == 0) return "";
                s = str.replace(/&amp;/g, "&");
                s = s.replace(/&lt;/g, "<");
                s = s.replace(/&gt;/g, ">");
                s = s.replace(/&nbsp;/g, " ");
                s = s.replace(/&#39;/g, "\'");
                s = s.replace(/&quot;/g, "\"");
                return s;
            },
            submitForm(formName,ope){
                if(ope == 1){
                    this.$confirm('确定对本项目进行复制？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.submitData(formName,ope)
                    })
                }else{
                    this.submitData(formName,ope)
                }
            },
            //      表单提交
            submitData(formName,ope) {
                    let catalogCode = this.getCode()
                    let picture1 =this.getPictureUrl(this.fileList3)
                    let picture2 =this.getPictureUrl(this.fileList4)
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            let obj = {
                                ColumnCode: 100,
                                code:this.code,
                                supplierCode: this.ruleForm.hospital,
                                serviceMan:this.ruleForm.doctor,
                                catalogCode: catalogCode,
                                name: this.ruleForm.projectName,
                                goodsCode:this.ruleForm.number,
                                goodsAlias:this.ruleForm.goodsAlias,
                                pinYin:this.ruleForm.pinYin,
                                imgMainUrl: this.getUrl(picture1[0]),
                                imgAssUrl1: this.getUrl(picture2[0]),
                                imgAssUrl2: this.getUrl(picture2[1]),
                                imgAssUrl3: this.getUrl(picture2[2]),
                                imgAssUrl4: this.getUrl(picture2[3]),
                                ImgCoverUrl:this.fileList0.length>0?this.fileList0[0].response:'',
                                Price: this.ruleForm.origionPrice,
                                OnlinePrice:this.ruleForm.OnlinePrice,
                                priceSale: this.ruleForm.salePrice,
                                Ismall: "0",
                                goodsTag: this.dynamicTags.join(","),
                                RichText: this.htmlEncode(this.ruleForm.content),
                                CreateUserCode: getCookie("userCode"),
                                CreateDate: new Date().formatDate("yyyy-MM-dd"),
                                IsLimit:this.ruleForm.radio2,
                                goodsPropertyList: JSON.stringify(this.moveNull(this.recAttr.concat(this.tableData))),
                                goodsUnitList: JSON.stringify(this.moveNull(this.ruleForm.tableData)),
                                limitAmount:this.ruleForm.integral,
                                state:this.hospitalMes.GoodsEntity.State,
                                ApproveState:this.hospitalMes.GoodsEntity.ApproveState,
                                deptCode:this.ruleForm.deptCode||"",
                                itemType:this.ruleForm.itemType||"",
                                IsMany:this.ruleForm.IsMany,
                                isEnable:this.ruleForm.isEnable,
                                UseRules :this.ruleForm.useRules,
                                UseRulesAll  :this.ruleForm.useRulesAll ,
                                keyWords:this.ruleForm.keyWords,
                            }
                            
                            if(ope == 0){
                                obj.id = this.goodsId,
                                obj.ModifiedUserId = getCookie('userId')
                                obj.ModifiedBy= getCookie('userName')
                                this.updateGoods(obj)
                            }
                            if(ope == 1){
                                obj.createdUserId = getCookie('userId')
                                obj.createdBy = getCookie('userName')
                                this.AddGoods(obj)
                            }
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
            },

            //            表单重置
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            moveNull(data){
                if(data.length>0){
                    data.forEach(row=>{
                        for(var p in row){
                            if(!row[p]||row[p] == undefined){
                                row[p] = ""
                            }
                        }
                    })
                }else{}
                return data
            },
            //    小类
            getLabel () {
                this.ruleForm.classify3 = ""
                this.label = {}
                if(this.ruleForm.classify2 == ""){
                }else{
                    this.getProperty({keywords: "","columncode": "100","catelogcode": this.ruleForm.classify2})
                    this.label = this.parentCode(this.ruleForm.classify2)
                }
            },
            getLabelCap(val){
                if(val){
                    this.getProperty({keywords: "","columncode": "100","catelogcode": this.ruleForm.classify3})
                }
            },
            //    获取分类叶子节点的code
            getCode (name) {
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
                return catLogCode
            },
            // 添加规格
            addSpec(){
                if (this.ruleForm.number != "") {
                    let price = ""
                    let deposit = ""
                    if (this.ruleForm.checked1 == true) {
                        price = this.ruleForm.price
                    } else {price = ""}
                    if (this.ruleForm.checked2 == true) {
                        deposit = this.ruleForm.deposit
                    } else {deposit = ""}
                    let unitCode = this.ruleForm.tableData.length + 1000
                    let barCode = this.ruleForm.number + unitCode
                    this.ruleForm.tableData.push({unitName: "",OnlinePrice:this.ruleForm.OnlinePrice, Price: price,Course:"1", DownPayment: deposit, UnitCode: unitCode, BarCode: barCode})
                } else {
                    this.$alert('请先生成商品编码', '提示', {
                        confirmButtonText: '确定',
                        type: 'warning',
                    });
                }
            },
            //删除规格
            deleteRow (index,data) {
                data.splice(index,1)
                this.tableNumChange()
            },

            // 统一设置价格订金
            commonSet(attr){
                var len = this.ruleForm.tableData.length
                if(this.ruleForm.price != ""){
                    if(!isNaN(parseInt(this.ruleForm.price))){
                        for (let i = 0; i<len; i++) {
                            if(attr == "price"){
                                this.ruleForm.tableData[i].Price = this.ruleForm.price
                            }
                            if(attr == 'deposit'){
                                this.ruleForm.tableData[i].DownPayment = this.ruleForm.deposit
                            }
                            if(attr == 'OnlinePrice'){
                                this.ruleForm.tableData[i].OnlinePrice = this.ruleForm.OnlinePrice
                            }
                            this.ruleForm.tableData.push()
                        }
                    }else{
                        this.$message({
                            message: '价格必须是数字类型',
                            type: 'warning'
                        });
                    }
                }
            },

            // 图片预览
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },

            // 删除图片操作
            handleRemove1(file, fileList) {
                this.DelImg(file,3,fileList)
            },

            handleRemove0(file, fileList) {
                this.DelImg(file,0,fileList)
            },

            handleRemove2(file, fileList) {//删除后台图片
                this.DelImg(file,4,fileList)
            },
             // 删除原图片/视频
            async DelImg(file,index,fileList){//点击删除后，组件返回fileList已将该数据删除，需要在确认是否删除后在进行赋值操作
                if(file.isNew == 0){//新加图片不需要提示
                    this.$confirm('此操作将永久删除该图片,删除后需保存编辑,否则将出现空白图，是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this['fileList'+index] = fileList
                        this.delImg(file.response)
                    }).catch(() => {
                        this['fileList'+index].push()
                    });
                }else{
                    this['fileList'+index] = fileList
                    this.delImg(file.response)
                }
            },
            
            async delImg(filepath){
                let res = await DelImg({filepath:filepath})
                if(!res.status){        
                    this.$message({message: '原图片删除失败！'+res.errorMessage,type: 'warning'});
                }
            },

            beforeAvatarUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 1;
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 1MB!');
                }
                return isLt2M;
            },
            
            handleChange1(file, fileList) {// 主图
                this.fileList3 = fileList
            },
           
            handleChange2(file, fileList) { // 幅图
                this.fileList4 = fileList
            },

            handleSuccess0(response, file, fileList) {//封面
                this.fileList0 = fileList
            },
            //图片位置切换
            move(flag,index){
                var temp = null
                var file = []
                if (flag == "left" && index != 0) {
                    temp = this.fileList4[index]
                    this.fileList4[index] = this.fileList4[index-1]
                    this.fileList4[index-1] = temp
                    this.fileList4.push()
                    console.log(this.fileList4)
                }
                if (flag == "right" && index != this.fileList4.length-1) {
                    temp = this.fileList4[index]
                    this.fileList4[index] = this.fileList4[index+1]
                    this.fileList4[index+1] = temp
                    this.fileList4.push()
                    console.log(this.fileList4)
                }
            },
            parentCode (code) {
                var arr =[]
                for(let i =0;i<this.catelog.length;i++){
                    if(code == this.catelog[i].parentCode){
                        arr.push(this.catelog[i])
                    }
                }
                return arr
            },

            //    添加自定义属性
            addSelfAttr(){
                this.tableData.push({
                    propertyCode:99999,
                    propertyName:"",
                    propertyValue:"",
                })
            },

            pictureCheck(){
                if(this.ruleForm.fileList3.length==1&&this.ruleForm.filestList4.length == 5){return true}
                else{return false}
            },
            tableNumChange(){
                let len = this.ruleForm.tableData.length
                for(let i = 0;i< len;i++){
                    this.ruleForm.tableData[i].UnitCode =1000+i
                    this.ruleForm.tableData[i].BarCode = this.ruleForm.number +""+this.ruleForm.tableData[i].UnitCode
                }
                this.ruleForm.tableData.push()
            },
            //    属性检测
            capsCheck(data){
                let arr = []
                data.forEach(row =>{
                    if(row.IsChecked == 1){arr.push(row)}
            })
                return arr
            },
            reciveAttr (val){
                if(val.length!=0){
                    let arr = []
                    let len = val.length
                    for(let i = 0 ;i<len;i++){
                        arr.push({"propertyCode":val[i].propertyCode, "propertyValue":this.arrTurn(val[i].propertyValue), "propertyName":val[i].Name,})
                    }
                    this.recAttr = arr
                }else{
                    this.recAttr = val
                }
            },
            //   自定义属性和属性分离
            attrSplit (data) {
                let arr=[]
                let len = data.length
                for(let i = 0;i < len;i++) {
                    if(data[i].PropertyCode ==99999){this.tableData.push(data[i])}
                    else{arr.push(data[i])}
                }
                this.getCaps = arr
            },
            arrTurn(data){
                if(data instanceof Array){
                    return data.join(",")
                }else{
                    return data
                }
            },
            // strTurn(data){
            //     if(data&&data !=""){
            //         return data.split(",")
            //     }else{
            //         return []
            //     }
            // },
            classSplit(data){
                data=data.substring(1,data.length-1).split("|")
                this.ruleForm.classify1 =data[0]
                var vm = this
                setTimeout(function(){
                    if(data[1]){vm.ruleForm.classify2 =data[1]}
                },50)
                setTimeout(function(){
                    if(data[2]){vm.ruleForm.classify3 =data[2]}
                },50)
            },
            // getImgName(url){
            //     let reg=/\//g
            //     let arr
            //     let lastIndex=""
            //     while((arr = reg.exec(url)) !=null){
            //         lastIndex = arr.index
            //     }
            //     if(url){
            //         let name = url.substring(lastIndex+1)
            //     }else{
            //         let name = ""
            //     }
            //     return name
            // },
            pictureTurn(data){
                let arr = [data.ImgAssUrl1, data.ImgAssUrl2, data.ImgAssUrl3, data.ImgAssUrl4]
                let arr1 = []
                arr.forEach(row=> {
                    if (row) {
                        arr1.push({ url: baseImgPath + row,response:row,isNew:0})
                    }
                })
                return arr1
            },
            getPictureUrl(data){
                let arr =[]
                for(let i =0;i<data.length;i++){
                    arr.push(data[i].response)
                }
                return arr
            },
            selectHs(){
                this.ruleForm.doctor = ""
                this.GetServiceManByHspCode({hospitalCode:this.ruleForm.hospital})
            },
            getHospital(code){
                let hospital = ""
                if(code){
                    this.hospital.forEach(data=>{
                        if(code == data.Code){
                            hospital = data.SupplierName
                        }
                    })
                }
                return hospital
            },
            getDoctor(code){
                let doctor = ""
                if (code) {
                    this.doctor.forEach(data=> {
                        if (code == data.Code) {
                            doctor = data.ServiceName
                        }
                    })
                }
                return doctor
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
                return data?data:''
            },
            setSupplier(data){
                this.ruleForm.hospital = data
            },
        },
        components: {
            attr,
            VueEditor
        },
        }
</script>

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
