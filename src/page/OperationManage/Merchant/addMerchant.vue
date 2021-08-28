<template>
    <div class="selCommon">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="商户logo：" required>
                <el-upload
                    class="avatar-uploader"
                    :action="action"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="商户全称：" prop="name" class="form_item_wt400">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="商户简称：" prop="alias" class="form_item_wt400">
                <el-input v-model="ruleForm.alias" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="代理商：" prop="branch" class="form_item_wt400">
                <el-select v-model="ruleForm.branch" filterable remote placeholder="请输入关键词"
                           :remote-method="remoteMethod" :loading="loading">
                    <el-option v-for="item in UserList" :key="item.Code" :value="item.BranchName+'|'+item.Code" :label="item.BranchName+'|'+item.PhoneNumber"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商户分类：" prop="type" class="form_item_wt400">
                <el-checkbox-group v-model="ruleForm.type">
                    <el-checkbox v-for="(item,index) in tagsList" :key="index" :label="item.code" :name="item.code">{{item.tagName}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="联系人：" class="form_item_wt400">
                <el-input v-model="ruleForm.person"></el-input>
            </el-form-item>
            <el-form-item label="联系方式：" class="form_item_wt400">
                <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="商户地址：">
                <el-col :span="24">
                    <el-select v-model="ruleForm.province" class="form_item_sel" @change="change('province')">
                        <el-option v-for="(item,index) in provinceList" :key="index" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                    <el-select v-model="ruleForm.city" class="form_item_sel" @change="change('city')">
                        <el-option v-for="(item,index) in cityList" :key="index" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                    <el-select v-model="ruleForm.area" class="form_item_sel">
                        <el-option v-for="(item,index) in areaList" :key="index" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="24">
                    <el-input v-model="ruleForm.address" class="form_item_ipt"></el-input>
                    <!--<el-button @click="searchAddr">搜索地图</el-button>-->
                </el-col>
            </el-form-item>
            <el-form-item label="地图定位：">
                <el-form-item label="经度" class="form_item_wt400">
                    <input v-model.number="center.lng">
                </el-form-item>
                <el-form-item label="纬度" class="form_item_wt400">
                    <input v-model.number="center.lat">
                </el-form-item>

               <!-- <label>关键词：<input v-model="keyword"></label>-->
                <baidu-map class="" ak="j6WqzmEcGzkuqr9cfYaBSFhYC5PnZtfs">
                    <!--<bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>-->
                    <!-- <bm-local-search :keyword="keywords" :auto-viewport="true" :location="location" :panel="false"></bm-local-search> -->
                    <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                </baidu-map>
                <baidu-map
                    class="bm-view"
                    :center="center"
                    
                    ak="j6WqzmEcGzkuqr9cfYaBSFhYC5PnZtfs"
                    @moving="syncCenterAndZoom"
                    @moveend="syncCenterAndZoom"
                    @zoomend="syncCenterAndZoom"
                   :zoom="15">
                    <bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE"></bm-marker>
                    <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                    <bm-local-search :keyword="keywords" :auto-viewport="true" :panel="false"></bm-local-search>
                </baidu-map>
            </el-form-item>
            <el-form-item label="商户介绍：" class="form_item_wt400">
                <el-input type="textarea" v-model="ruleForm.desc" :rows="rows" style="width:400px"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" :loading="saveLoading">保存</el-button>
                <el-button @click="resetForm('ruleForm')">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script type="text/ecmascript-6">
    import { baseImgPath} from '@/config/env'
    import "@/style/selfCommon.less"
    import addr from "../../../../static/addresss.json"
    import { getCookie, delCookie } from '@/config/mUtils'
    import {GetTagByPage,AddBranchShop,GetBranchByKeywords,DelImg} from "@/api/myData"
    import {BaiduMap,BmGeolocation,BmLocalSearch,BmNavigation,BmMarker,BmLabel} from 'vue-baidu-map'
    export default {
        // name: "",
        data() {
            return {
                rows:4,
                saveLoading:false,
                center: {
                    lng: "",
                    lat: ""
                },
                zoom: 15,
                imageUrl: '',
                action:"",
                UserList:[],
                loading:false,
                ruleForm: {
                    img: "",
                    alias: "",
                    branch: "",
                    type: [],
                    person: "",
                    phone: "",
                    province: "",
                    city: "",
                    area: "",
                    address: "",
                    name: '',
                    desc: '',
                    location: '',
                    keyword: '杭州',
                },
                tagsList:[],
                provinceList:[],
                cityList:[],
                areaList:[],
                rules: {
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'},
                    ],
                    alias: [
                        {required: true, message: '请输入名称', trigger: 'blur'},
                    ],
                    type:[
                        {type: 'array', required: true, message: '请至少选择一个', trigger: 'change'}
                    ],
                    branch:[
                        {required: true, message: '请选择', trigger: 'change'}
                    ],
                }
            };
        },
        computed:{
            keywords(){
                
                if(this.ruleForm.province.length==0){
                    return "杭州"
                }else{
                    return this.ruleForm.province+"" + this.ruleForm.city+this.ruleForm.area+this.ruleForm.address
                }
            }
        },
        mounted(){
            
            this.action = baseImgPath + "/api/Image/UploadImg?op=goods"
            this.GetTagByPage()
            this.provinceList = addr.area
        },
        methods: {
            syncCenterAndZoom (e) {
                const {lng, lat} = e.target.getCenter()
                this.center.lng = lng
                this.center.lat = lat
                this.zoom = e.target.getZoom()
            },

            handleAvatarSuccess(res, file) {
                if(this.ruleForm.img!=''){
                    this.DelImg(this.ruleForm.img)
                }
                this.ruleForm.img = res
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            
            // 删除原图片/视频
            async DelImg(filepath){
                let res = await DelImg({filepath:filepath})
                if(!res.status){
                    this.$message({message: '原图片删除失败！'+res.errorMessage,type: 'warning'});
                }
                
            },

            async AddBranchShop(params){
                try{
                    this.saveLoading = true
                    let res = await AddBranchShop(params)
                    if(res.success){
                        this.$message({ type: 'success', message: '添加成功!' })
                    }else{
                        this.$message.error('添加失败');
                    }
                    this.saveLoading = false
                }catch(err){
                    console.log(err)
                    this.$message.error('添加失败');
                }
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.AddBranchShop({
                            shopName:this.ruleForm.name,
                            shopShortName:this.ruleForm.alias,
                            shopLogo:this.ruleForm.img,
                            branchCode:this.ruleForm.branch.split("|")[1],
                            branchName:this.ruleForm.branch.split("|")[0],
                            shopTags:this.ruleForm.type.join(","),
                            contactPerson:this.ruleForm.person,
                            mobile:this.ruleForm.phone,
                            province:this.ruleForm.province,
                            city: this.ruleForm.city,
                            area: this.ruleForm.area,
                            addrDetail: this.ruleForm.address,
                            mapAddress:this.center.lng+","+this.center.lat,
                            shopDesc:this.ruleForm.desc,
                            createUserId: getCookie("userId"),
                            createBy:getCookie("userName"),
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            change(addr){
                if(addr == "province"){
                    if(this.ruleForm.province!=""){
                        this.provinceList.forEach(row=>{
                            if(row.name == this.ruleForm.province){
                                this.cityList = row.sub
                                return
                            }
                        })
                    }
                    this.ruleForm.city = ""
                    this.areaList = []
                }else{
                    if(this.ruleForm.city!=""){
                        this.cityList.forEach(row=>{
                            if(row.name == this.ruleForm.city){
                                
                                this.areaList = row.sub
                                return
                            }
                        })
                    }
                    this.ruleForm.area = ""
                }
            },
            /*  beforeAvatarUpload(file) {
             //                const isJPG = file.type === 'image/jpeg';
             const isLt2M = file.size / 1024 / 1024 < 2;

             /!*if (!isJPG) {
             this.$message.error('上logo像图片只能是 JPG 格式!');
             }*!/
             if (!isLt2M) {
             this.$message.error('上传头像图片大小不能超过 2MB!');
             }
             return isJPG && isLt2M;
             },*/
//            获取标签
            async GetTagByPage(){
                try{
                    let res = await GetTagByPage({TypeCode:"1", pageIndex:1, pageSize:100, keywords:""})
                    this.tagsList = res.data
                }catch(err){
                    console.log(err)
                }
            },
            async GetBranchByKeywords(params){
                try{
                    this.UserList = await GetBranchByKeywords(params)
                    this.loading = false;
                }catch(err){
                    console.log(err)
                }
            },

            remoteMethod(query) {
                
                if (query !== '') {
                    this.loading = true;
                    this.GetBranchByKeywords({
                        keyWords:query.removeSP()
                    })
                } else {

                }
            },
        },
        components: {
            BaiduMap,
            BmLocalSearch,
            BmNavigation,
            BmMarker,
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .form_item_wt400 {
        width: 400px;
    }

    .form_item_ipt {
        width: 300px;
    }
    .form_item_sel{
        width: 200px;
    }
    .bm-view {
        width: 100%;max-width: 1000px;
        height: 300px;
    }
</style>
