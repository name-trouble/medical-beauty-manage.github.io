<template>
    <div class="supply">
        <el-form ref="addform" :model="formData" label-width="100px" class="SupplyAdd" :rules="rules">

            <el-form-item label="医院名称：" prop="supplierName">
                <el-input v-model="formData.supplierName"></el-input>
            </el-form-item>

            <el-form-item label="公司名称：" prop="companyName">
                <el-input v-model="formData.companyName"></el-input>
            </el-form-item>

            <el-form-item label="前缀：" prop="prefixCode">
                <el-input v-model="formData.prefixCode"></el-input>
            </el-form-item>

      <!--      <el-form-item label="供方类型" prop="supTypeCode">
                <el-select v-model="formData.supTypeCode" placeholder="请选择">
                    <el-option v-for="(item,$index) in types" :key="$index" :label="item.DataName" :value="item.DataCode">
                    </el-option>
                </el-select>
            </el-form-item>-->

            <el-form-item label="资质等级：" prop="hospLevelCode">
                <el-select v-model="formData.hospLevelCode" placeholder="请选择">
                    <el-option v-for="(item,$index) in levels" :key="$index" :label="item.DataName" :value="item.DataCode">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="省市：" prop="City">
                <el-select v-model="formData.Province" filterable placeholder="请选择" @change="selectCity" class="area">
                    <el-option v-for="item in provinceList" :key="item" :label="item" :value="item">
                    </el-option>
                </el-select>

                <el-select v-model="formData.City" filterable placeholder="请选择" class="area">
                    <el-option v-for="item in cityList" :key="item.name" :label="item.name" :value="item.name">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="详细地址：" prop="address">
                <el-input v-model="formData.address"></el-input>
            </el-form-item>

            <el-form-item label="经纬度：">
                <div>添加经纬度以便于手机端进行定位</div>
                <div>经度：<el-input v-model="formData.longitude" style="width:200px"></el-input></div>
                <div>纬度：<el-input v-model="formData.latitude"  style="width:200px"></el-input></div>
            </el-form-item>

            <el-form-item label="联系电话：" prop="phoneNumber">
                <el-input v-model="formData.phoneNumber"></el-input>
            </el-form-item>

            <el-form-item label="收款账户：" prop="phoneNumber">
                <el-table :data="tableData" style="width:700px" border v-if="tableData.length>0" max-height="300">
                    <el-table-column prop="ShortName" label="别名" width="180"></el-table-column>
                    <el-table-column prop="CardNo" label="卡号" width="180"></el-table-column>
                    <el-table-column prop="AccountHolder" label="开户人"></el-table-column>
                    <el-table-column prop="BankName" label="开户行"></el-table-column>
                    <el-table-column prop="address" label="操作">
                        <template slot-scope="scope">
                            <el-button @click="del(scope.$index,tableData)" size="small" type="danger">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button @click="add" size="small" type="primary" style="margin: 10px">添加</el-button>
            </el-form-item>

            <div style="display:flex;">
                <el-form-item label="主图：" required style="felx:0 45%">
                    <el-upload class="avatar-uploader" :accept="acceptImage" :action="uploadUrl" :on-success="SuccessA" :before-upload="beforeAvatarUpload" :show-file-list="false">
                        <img v-if="mainImgUrl" :src="mainImgUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>

                <el-form-item label="头像：" required style="felx:0 45%">
                    <el-upload class="avatar-uploader" :action="uploadUrl" :on-success="SuccessC" :before-upload="beforeAvatarUpload" :show-file-list="false">
                        <img v-if="imgUrl" :src="imgUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </div>

            <el-form-item label="相册图片：">
                <el-upload class="upload-box" :before-upload="beforeAvatarUpload" :accept="acceptImage" :on-change="imgChange" :action="uploadUrl" list-type="picture-card" :on-success="SuccessB">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>

            <el-form-item label="客服短信功能：">
                <el-switch v-model="IsSMS" on-color="#13ce66" off-color="#ff4949"></el-switch>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit" :loading="saveLoading">注册</el-button>
                <el-button @click="Reset">重置</el-button>
            </el-form-item>
        </el-form>

        <div style="display:none" id="imgtxt">
            <div class="img-text">
                <input type="text" placeholder="图片标题" required />
                <input type="text" placeholder="图片描述" required />
            </div>
        </div>

        <el-dialog title="添加账户" :visible.sync="dialogVisible" size="">
            <el-form label-position="right" label-width="80px" :model="form" ref="form" style="width: 500px" v-if="dialogVisible">
                <el-form-item label="别名" prop="ShortName" :rules="[{ required: true, message: '不能为空'}]">
                    <el-input v-model="form.ShortName"></el-input>
                </el-form-item>
                <el-form-item label="卡号">
                    <el-input v-model="form.CardNo"></el-input>
                </el-form-item>
                <el-form-item label="开户人">
                    <el-input v-model="form.AccountHolder"></el-input>
                </el-form-item>
                <el-form-item label="开户行">
                    <el-input v-model="form.BankName"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="sure">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script type="text/ecmascript-6">

import './lib/supply.less'
import adressList from '../../../static/addresss.json'
import { xmxUrl, baseImgPath } from '@/config/env'
import {  imgApi, acceptImage } from '@/config/common'

let uploadUrl = xmxUrl + imgApi + '?op=supplier'
import { getBaseDataByCode, addSupplier,DelImg } from '@/api/myData'

export default {
    data() {
        return {
            saveLoading:false,
            dialogVisible:false,
            form:{
                ShortName:"",
                BankName:"",
                CardNo:"",
                AccountHolder:""
            },
            tableData:[],
            uploadUrl,
            className: "supply-add-img-txt",


            mainImgUrl: '',
            imgUrl: '',
            imgVisible: false,

            provinceList: [],
            cityList: [],

            acceptImage,
            types: [],
            levels: [],
            imgList: [],
            formData: {
                supplierName: '',
                prefixCode:'',
                phoneNumber: '',
                supTypeCode: "001",
                address: "",
                hospLevelCode: "",
                AccountList:'',
                mainImgUrl: "",
                imgUrl: '',
                City: "",
                Province: "",
                companyName:"",
                IsSMS:"",
                longitude:'',
                latitude:''
            },
            IsSMS:true,
            rules: {
                companyName :[
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                supplierName: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                phoneNumber: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                supTypeCode: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                address: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                prefixCode:[
                    { required: true, message: '不能为空', trigger: 'blur' }
                ]
            },

        }
    },
    mounted() {
        this.getType()
        for (var item of adressList.area) {
            this.provinceList.push(item.name)
        }
    },

    methods: {

        async getType() {
            this.types = await getBaseDataByCode("0013")
            this.getLeve()
        },
        async getLeve() {
            this.levels = await getBaseDataByCode("0010")
        },
        onSubmit() {
            this.$refs["addform"].validate((valid) => {
                if (valid) this.addData()
                else return false;
            })
        },

        selectCity(val) {
            this.cityList = []
            this.formData.City = ''
            for (var item of adressList.area) {
                if (item.name == val) {
                    this.cityList = item['sub']
                    break
                }
            }
        },

        imgChange(file, fileList) {
            let _this = this
            fileList.forEach(item => {
                if (item.response) _this.imgList.push(item.response)
            })
        },

        getPhotoList() {
            var els = document.getElementsByClassName(this.className)
            let imgs = []
            for (let i = 0; i < els.length; i++) {
                let item = els[i]
                let obj = {
                    ImgUrl: this.imgList[i],
                    PhotoTitle: item.children[0].value,
                    PhotoDesc: item.children[1].value
                }
                imgs.push(obj)
            }
            return imgs
        },

        //单张
        SuccessA(res, file) {
            if(this.formData.mainImgUrl!=''){
                this.DelImg(this.formData.mainImgUrl)
            }
            this.mainImgUrl = URL.createObjectURL(file.raw);
            this.formData.mainImgUrl = res
        },

        SuccessC(res, file) {
            if(this.formData.imgUrl!=''){
                this.DelImg(this.formData.imgUrl)
            }
            this.imgUrl = URL.createObjectURL(file.raw);
            this.formData.imgUrl = res
        },

            // 删除原图片/视频
            async DelImg(filepath){
                let res = await DelImg({filepath:filepath})
                if(!res.status){
                    this.$message({message: '原图片删除失败！'+res.errorMessage,type: 'warning'});
                }
            },

        inputText() {
            let node = document.getElementById("imgtxt").firstChild
            let cNode = node.cloneNode(true)
            cNode.className = this.className
            setTimeout(function() {
                var ars = document.getElementsByClassName("el-upload-list__item is-success")
                let ele = ars[ars.length - 1]
                if (ele) {
                    ele.style.overflow = 'visible'
                    ele.appendChild(cNode)
                }
            }, 300)
        },

        //相册
        SuccessB(res, file) {
            this.inputText()
        },

        beforeAvatarUpload(file) {
            const isJPG = file.type.indexOf('image') === 0;
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('只能上传图片!');
            }
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },

        async addData() {
            this.formData.PhotoList = JSON.stringify(this.getPhotoList())
            this.formData.AccountList = JSON.stringify(this.tableData)
            this.formData.IsSMS = this.IsSMS?1:0
            this.formData.MapAddress = this.formData.longitude+','+this.formData.latitude //格式为 经度 ， 纬度
            this.saveLoading = true
            let res = await addSupplier(this.formData)
            if (res.success && res.success > 0) {
                this.$message({ type: 'success', message: '保存成功!' })
                this.formData.Province = ""
                this.formData.City = ""
                this.Reset()
                this.tableData = []
            }
            else {
                this.$message({ type: 'warning', message: '保存失败!' })
            }
            this.saveLoading = false
        },

        Reset() {
            this.$refs["addform"].resetFields();
            this.mainImgUrl = ""
            this.imgUrl = ""
        },
        add(){
            this.dialogVisible = true
        },
        del(index,data){

            data.splice(index,1)
        },
        sure(){
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    this.tableData.push(this.form)
                    this.cancel()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        cancel(){
            this.dialogVisible = false
            this.form = {
                ShortName: "",
                BankName: "",
                CardNo: "",
                AccountHolder: ""
            }
        },

    },
    components:{
        // VueCoreImageUpload
    }
}
</script>

<style scoped lang="less">
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 146px;
    height: 146px;
    line-height: 146px;
    text-align: center;
    border: 1px dashed #c0ccda;
}

.avatar {
    width: 146px;
    height: 146px;
    display: block;
}

.img-txt {
    position: absolute;
    top: 80%;
}

.supply-add-img-txt {
    input {
        border: 1px solid #d9e4d6;
        margin: 5px 0 0 0;
        height: 30px;
        width: 160px;
    }
}


</style>
