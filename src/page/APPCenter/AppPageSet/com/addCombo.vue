4<template>
    <div class="settled selCommon">
        <el-form :inline="true" :model="form" class="demo-form-inline" label-width="100px" ref="form" :rules="rules">
            <el-form-item label="有效时间："  class="form_item_mt10 wd50" prop="startDate">
                <el-date-picker
                    v-model="date"
                    type="daterange"
                    @change="dateChange"
                    style='width:200px;'
                    placeholder="选择日期范围">
                </el-date-picker>
            </el-form-item>
             <el-form-item label="组合简称：" class="form_item_mt10 wd50" prop="name">
               <el-input v-model="form.name" style='width:200px;'></el-input>
            </el-form-item>
            <el-form-item label="组合头像：" class="form_item_mt10 wd50" prop="imageUrl1">
               <el-upload
                    class="avatar-uploader"
                    :action="action"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess1"
                    :acceptImage="acceptImage"
                    :before-upload="beforeAvatarUpload1">
                    <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="组合主图：" class="form_item_mt10 wd50" prop="imageUrl2">
               <el-upload
                    class="avatar-uploader"
                    :action="action"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess2"
                    :acceptImage="acceptImage"
                    :before-upload="beforeAvatarUpload2">
                    <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="组合标题：" class="form_item_mt10 wd50" prop="title">
               <el-input v-model="form.title" style='width:200px;'></el-input>
            </el-form-item>
            <el-form-item label="组合商品：" class="form_item_mt10 wd50" required>
                <el-button @click="proView" type="text" style="margin-right:10px;">已选择{{len}}个</el-button> <el-button type="text" @click="addPro" icon="plus">添加</el-button>
            </el-form-item>
            <el-form-item label="折扣配置：" class="form_item_mt10 wd100">
                <div style="display:inline-block">
                    <span>2件以上</span><el-input-number v-model="form.discount" style="width:60px;float:none;display:inline-block;vertical-align: middle;" :min="0" :controls="false"></el-input-number>%
                </div><br/>
               <div style="display:inline-block">
                    <span>组合价:</span> <el-input-number v-model="form.price" style="width:60px;float:none;display:inline-block;vertical-align: middle;" :min="0" :controls="false"></el-input-number>%
                </div>
            </el-form-item>
            <el-form-item label="组合详情：" class="form_item_mt10 wd100">
                <vue-editor v-model="form.content" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
            </el-form-item>
            <el-form-item label="" class="form_item_mt10 form_item_wh280 wd100" style="text-align:center"  v-if="viewFlg != 2">
                <el-button type="primary" @click="sure('form')" >确定</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
       <el-dialog title="项目" :visible.sync="dialogPro"  top="20%"  size="" :close-on-click-modal="false" :modal="false">
            <div style="width:400px;">
                <el-tag style="margin:5px" :key="index" v-for="(item,index) in projectArray" :closable="true" :close-transition="false" @close="handleClose(index)">{{item.alias}}</el-tag>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import '../lib/quill.less'
    import { VueEditor } from 'vue2-editor'
    import axios from 'axios'
    import { baseImgPath } from '@/config/env'
    import { acceptImage } from '@/config/common'
    import {AddNewDesignGroups,AlterDesignGroups,GetDesignGroupById,DelImg} from "@/api/myData"
    import { getCookie } from '../../../../config/mUtils';
    export default {
        data () {
            return {
                date:"",
                dialogPro:false,
                action:"",
                acceptImage:acceptImage,
                imageUrl1:"",
                imageUrl2:"",
                len:"0",
                projectArray:[],//存放编辑过来的项目
                form:{
                    date:"",
                    startDate:"",
                    endDate:"",
                    status:"",
                    imageUrl1:"",
                    imageUrl2:"",
                    content:"",
                    name:"",
                    title:"",
                    discount:"",
                    price:"",
                },
                rules: {
                    startDate: [
                        { required: true, message: '请选择有效期', trigger: 'change' }
                    ],
                    name: [
                        { required: true, message: '请填写组合简称', trigger: 'blur' }
                    ],
                    title: [
                        { required: true, message: '请填写组合标题', trigger: 'blur' }
                    ],
                    imageUrl1: [
                        { required: true, message: '请选择组合头像', trigger: 'blur' }
                    ],
                    imageUrl2: [
                        { required: true, message: '请选择组合主图', trigger: 'blur' }
                    ]
                },
                names:[],
            }
        },
        props:{
            mes:Object,
            editMes:Object,
            viewFlg:Number
        },
        computed: {
            
        },
        mounted(){// 编辑
            if(this.editMes.id){
                this.GetDesignGroupById()
            }
            this.action = baseImgPath + "/api/Image/UploadImg?op=goods"
        },
        watch:{
            'form.imageUrl1':{
                handler(curVal,oldVal){
                    if(oldVal!=''){
                        this.DelImg(oldVal)
                    }
                },
                deep:true
            },
            'form.imageUrl2':{
                handler(curVal,oldVal){
                    if(oldVal!=''){
                        this.DelImg(oldVal)
                    }
                },
                deep:true
            }
        },
        methods: {
            async DelImg(filepath){
                let res = await DelImg({filepath:filepath})
                if(!res.status){
                    this.$message({message: '原图片删除失败！'+res.errorMessage,type: 'warning'});
                }
            },
            handleClose(index) {
                this.projectArray.splice(index,1)
                this.len = this.projectArray.length
            },
            async GetDesignGroupById(){
                let res = await GetDesignGroupById({id:this.editMes.id})
                this.copyWorth(res.data)
            },
            addProject(val){
                this.projectArray = this.projectArray.concat(val)
                this.len = this.projectArray.length
            },
            copyWorth(data){
                for(var key in data){
                    if(data[key] == null){
                        data[key] = ''
                    }
                }
                this.len = data.goods.length
                this.projectArray = data.goods
                this.form = {
                    startDate:data.validDate1.substring(0,10),
                    endDate:data.validDate2.substring(0,10),
                    status:'',
                    imageUrl1:data.bannerImage,
                    imageUrl2:data.masterImage,
                    content:data.groupDetails,
                    name:data.groupName,
                    title:data.groupTheme,
                    discount:data.discountRate,
                    price:data.groupPrice,
                }
                this.imageUrl1 = baseImgPath+data.bannerImage 
                this.imageUrl2 = baseImgPath+data.masterImage
                
                this.date = [new Date(data.validDate1.substring(0,4),Number(data.validDate1.substring(5,7))-1,data.validDate1.substring(8,10)),
                new Date(data.validDate2.substring(0,4),Number(data.validDate2.substring(5,7))-1,data.validDate2.substring(8,10))]
            },
            dateChange(val){
                
                if(val){
                    val = val.formatDates()
                    this.form.startDate = val.substring(0,10)
                    this.form.endDate = val.substring(13)
                }else{
                    this.form.startDate = ""
                    this.form.endDate = ""
                }
            },
            sure(formName){
                let _this = this
                let goods = this.getGoodsMes()
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.projectArray.length == 0){
                            this.$message({message: '请至少选择一个商品',type: 'warning'});
                        }else{
                            let obj = {
                                "designId": this.mes.id,
                                "sequences": this.mes.sequences,
                                "groupName": this.form.name,
                                "groupTheme": this.form.title,
                                "validDate1": this.form.startDate,
                                "validDate2": this.form.endDate,
                                "addedStatus": 0,
                                "bannerImage": this.form.imageUrl1,
                                "masterImage": this.form.imageUrl2,
                                "discountRate": this.form.discount,
                                "groupPrice": this.form.price,
                                "groupDetails": this.form.content,
                                'goodsstring':JSON.stringify(goods[0]),
                                "goodsCodes": goods[1],
                                ModifiedUserId:getCookie('userId'),
                                ModifiedBy:getCookie('userName'),
                            }
                            if(this.editMes.id){
                                obj.id = this.editMes.id
                                this.AlterDesignGroups(obj)
                            }else{
                                obj.CreateUserId = getCookie('userId'),
                                obj.CreateBy = getCookie('userName'),
                                this.AddNewDesignGroups(obj)
                            }
                        }
                    } else {}
                });
            },
            getGoodsMes(){
                let data = this.projectArray,arr = []
                let codes = []
                data.forEach(ele => {
                    let obj = {
                        onlinePrice:ele.onlinePrice?ele.onlinePrice:'',
                        bannerImage:ele.imgMainUrl?ele.imgMainUrl:'',
                        alias:ele.alias?ele.alias:'',
                        ModifiedUserId:getCookie('userId'),
                        ModifiedBy:getCookie('userName'),
                        CreateUserId:getCookie('userId'),
                        CreateBy:getCookie('userName'),
                    }
                    if(ele.isNew){
                        obj.goodsId = ele.id
                    }else{
                        arr.push(ele)
                    }
                    arr.push(obj)
                });
                return [arr,codes.join('#')]
            },
            async AddNewDesignGroups(params){
                let res = await AddNewDesignGroups(params)
                if (res.status == true) {
                    this.$message({ message: '添加成功', type: 'success' });
                    this.$emit('addSure',true)
                } else {
                    this.$message.error('添加失败');
                }
            },
            async AlterDesignGroups(params){
                let res = await AlterDesignGroups(params)
                if (res.status == true) {
                    this.$message({ message: '编辑成功', type: 'success' });
                    this.$emit('addSure',true)
                } else {
                    this.$message.error('编辑失败');
                }
            },
            cancel(){
                this.$emit('addSure',true)
            },
            addPro(){
                this.$emit('addPro',true)
            },
            proView(){
                this.dialogPro = true
            },
            handleAvatarSuccess1(res, file) {
                this.imageUrl1 = URL.createObjectURL(file.raw);
                this.form.imageUrl1 = res
            },
            beforeAvatarUpload1(file) {
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!');
                }
                return isLt2M
            },
            handleAvatarSuccess2(res, file) {
                this.imageUrl2 = URL.createObjectURL(file.raw);
                this.form.imageUrl2 = res
            },
            beforeAvatarUpload2(file) {
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isLt2M;
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
        },
        components: {
            VueEditor
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
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
  .wd100{
      width:100%;
  }
  .wd50{
      width:48%;
  }

</style>
