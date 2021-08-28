<template>
    <div class="advtise">
        <el-form :model="formInline" class="demo-form-inline" label-width="100px" :rules="rules" ref="formInline">
            <el-form-item label="模块："  class="form_item_mt0 form_item_wh280" prop="module">
                <el-radio class="radio" v-model="formInline.module" label="1">首页</el-radio>
                <el-radio class="radio" v-model="formInline.module" label="2">医美</el-radio>
                <el-radio class="radio" v-model="formInline.module" label="3">互动</el-radio>
                <el-radio class="radio" v-model="formInline.module" label="4">卡券</el-radio>
                <el-radio class="radio" v-model="formInline.module" label="5">我的</el-radio>
            </el-form-item>
            <el-form-item label="标题：" class="form_item_mt0 form_item_wh280" prop="title">
                <el-input placeholder="请输入广告标题" v-model="formInline.title" style="width:300px;"></el-input>
            </el-form-item>
            <el-form-item label="图片：" class="form_item_mt0 form_item_wh280" prop="imgUrl">
                <span style="color:red">建议上传宽度为610px，高度小于等于940px的图片</span>
                <el-upload
                    class="avatar-uploader"
                    :action="uploadUrl"
                    :acceptImage='acceptImage'
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess">
                    <img v-if="formInline.imgUrl" :src="baseImgPath+formInline.imgUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="广告内容：" class="form_item_mt0 form_item_wh280" required>
                <el-radio class="radio" v-model="formInline.radio" label="1">新建内容</el-radio>
                <el-radio class="radio" v-model="formInline.radio" label="3">链接类型</el-radio>
                <div v-if="formInline.radio == 1">
                    <vue-editor v-model="content" useCustomImageHandler @image-added="handleImageAdded" style=""></vue-editor>
                </div>
                <div v-if="formInline.radio == 3">
                    <el-form-item label="链接类型" class="form_item_mt0 form_item_wh280" label-width="80px">
                        <el-select v-model="formInline.linkName" placeholder="请选择" style="width:200px" >
                            <el-option v-for="(item,index) in pageSetList" :key="index" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="跳转地址" class="form_item_mt0 form_item_wh280" label-width="80px">
                        <el-input  placeholder="请输入内容" v-model="formInline.linkUrl" style="width:200px;" v-show="!(formInline.linkType>2 && formInline.linkType<13)"></el-input>
                        <div  style="width:400px;height:60px;" v-show="formInline.linkType>2 && formInline.linkType<13" @click="selDet">
                            <img style="width:100px;height:60px;border-radius:0px;vertical-align:top" :src="baseImgPath+formInline.img" v-if="formInline.img">
                            <i  class="el-icon-plus sel-uploader-icon" v-else> </i>
                            <span style="vertical-align:top;color:#000">选择内容：{{formInline.selName}}</span>
                        </div>
                    </el-form-item>
                </div>
            </el-form-item>
            <el-form-item label="关闭时间："  class="form_item_mt0 form_item_wh280">
                <el-input placeholder=""  v-model="formInline.seconds" style="width:80px;float:none;margin:0 5px"></el-input>
                <span>秒 （设置几秒后自动关闭）</span>
            </el-form-item>
            <el-form-item label="有效期："  class="form_item_mt0 form_item_wh280">
                <el-date-picker v-model="date" type="daterange" @change="dateChange" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: center">
            <el-button type="primary" @click="sure('formInline')" :loading="saveLoading">确 定</el-button>
            <el-button @click="cancel('formInline')">取 消</el-button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import { xmxUrl, baseImgPath } from '@/config/env'
    import { imgApi, acceptImage,pageSetList } from '@/config/common'
    let uploadUrl = xmxUrl + imgApi + '?op=alertad'
    import { VueEditor } from 'vue2-editor'
    import { getCookie, delCookie } from '@/config/mUtils'
    import {AddNewAdv,ModifyAdv } from "@/api/myData"
    import {getTopBranch,DelImg} from "@/api/myData"
    import axios from 'axios'
import { BranchChange } from '../../../api/myData';
    export default {
        // name:"newNotice",
        data () {
            var checkMes = (rule, value, callback) => {
                if (this.content==""&&this.formInline.linkName=="") {
                    return callback(new Error('请填写广告内容'));
                }else{
                    callback();
                }
            };
            return {
                pageSetList,
                date:'',
                baseImgPath,
                uploadUrl,
                acceptImage,
                saveLoading:false,
                content: " ",
                formInline:{
                    radio:"1",
                    url:"",
                    module:"1",
                    imgUrl:'',
                    title:'',
                    seconds:3,
                    startDate:'',
                    endDate:'',
                    linkType:'',
                    linkUrl:'',
                    linkName:'',
                    img:'',
                    selName:'',
                },
                rules:{
                    module:[
                        { required: true, message: '请选择' }
                    ],
                    imgUrl:[
                        { required: true, message: '请选择' }
                    ],
                    title: [
                        { required: true, message: '请填写标题', trigger: 'blur' }
                    ],
                    mes:[
                        { validator: checkMes,trigger: 'change'}
                    ],
                }
            }
        },
        watch:{
            "formInline.radio":{
                handler(curVal,oldVal){
                    this.content = ""
                    this.formInline.selName = ''
                    this.formInline.linkName = ''
                    this.formInline.linkType = ''
                    this.formInline.linkUrl = ''
                },
                deep:true
            },
            'formInline.linkName':{
                handler(curVal,oldVal){
                    if(oldVal == ''&&this.editMes.id){//编辑首次赋值时排除类型切换的影响
                    }else{
                        this.selLinkType(curVal)
                    }
                },
                deep:true
            },
        },
        props:{
            editMes:{},
        },
        mounted(){
            if(this.editMes.id){
                this.copyData(this.editMes)
            }
        },
        methods:{
            copyData(data){//编辑赋值
                for(var key in data){
                    if(data[key] == null){
                        data[key] = ''
                    }
                }
                this.formInline = {
                    radio:data.adType+'',
                    module:data.moduleType+'',
                    imgUrl:data.alertImage,
                    title:data.adTitle,
                    seconds:data.showSeconds,
                    startDate:data.validTime1,
                    endDate:data.validTime2,
                    linkName:'',
                    img:'',
                }
                setTimeout(()=>{//formInline.radio切换时会清空值 延迟赋值
                    this.formInline.linkType = data.adLink+''
                    this.formInline.selName = data.linkName+''
                    this.formInline.linkUrl = data.linkUrl+''
                    this.content = this.htmlDecode(data.adHtml)
                    this.setlink(data)
                },100)
                this.date = [new Date(data.validTime1.substring(0,4),data.validTime1.substring(5,7)-1,data.validTime1.substring(8,10)),
                    new Date(data.validTime2.substring(0,4),data.validTime2.substring(5,7)-1,data.validTime2.substring(8,10))]
            },
            setlink(data){
                let arr = []
                this.pageSetList.forEach(ele=>{//当选择的链接为linkType相同的选项时，根据linkUrl判断
                    if(ele.linkType == data.adLink){
                        arr.push(ele)
                    }
                })
                if(arr.length==1){
                    this.formInline.linkName = arr[0].name
                }else{
                    arr.forEach(ele=>{
                        if(ele.linkUrl == data.linkUrl){
                            this.formInline.linkName = ele.name
                        }
                    })
                }
            },
            closeChange(){
                this.formInline.seconds = 0
            },
            getData(obj){
                this.formInline.linkUrl = obj.linkUrl
                this.formInline.img = obj.img
                this.formInline.selName = obj.name
            },
            selDet(){
                this.$emit("selDet",this.formInline.linkType)
            },
            selLinkType(val){
                for (let item of this.pageSetList) {
                    if (item.name == val) {
                        this.formInline.linkType = item.linkType
                        this.formInline.linkUrl = item.linkUrl
                    }
                }
            },
            dateChange(val){
                if(val){
                    val = val.formatDates()
                    this.formInline.startDate = val.substring(0,10)
                    this.formInline.endDate = val.substring(13)
                }else{
                    this.formInline.startDate = ""
                    this.formInline.endDate = ""
                }
            },
            openSelDialog(){
                this.$emit('openSelDialog')
            },
            
            handleAvatarSuccess(res, file){
                if(this.formInline.imgUrl!=''){
                    this.DelImg(this.formInline.imgUrl)
                }
                this.formInline.imgUrl = res
            },
             
            async DelImg(filepath){// 删除原图片/视频
                let res = await DelImg({filepath:filepath})
                if(!res.status){        
                    this.$message({message: '原图片删除失败！'+res.errorMessage,type: 'warning'});
                }
            },
        
            async AddNewAdv(params){
                try{
                    this.saveLoading = true
                    let res = await AddNewAdv(params)
                    if(res.status == true){
                        this.$message({message: '创建成功', type: 'success'});
                        this.$emit('dialogClose',true)
                    }else{
                        this.$message.error('创建失败');
                    }
                    this.saveLoading = false
                }catch(err){
                    console.log(err)
                }
            },
            async ModifyAdv(params){
                let res = await ModifyAdv(params)
                if(res.status == true){
                    this.$message({message: '编辑成功', type: 'success'});
                    this.$emit('dialogClose',true)
                }else{
                    this.$message.error('编辑失败');
                }
                this.saveLoading = false
            },
            sure(formName){
                let _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let obj = {
                            "alertImage": _this.formInline.imgUrl,
                            "moduleType": _this.formInline.module,
                            "adTitle": _this.formInline.title,
                            "adType": _this.formInline.radio,
                            "adHtml": _this.htmlEncode(_this.content),
                            "adLink": _this.formInline.linkType,
                            'linkUrl':_this.formInline.linkUrl,
                            'linkName':_this.formInline.selName,
                            "showSeconds": _this.formInline.seconds,
                            "validTime1": _this.formInline.startDate,
                            "validTime2": _this.formInline.endDate,
                            "submitUserId": getCookie("userId"),
                            "submitUserName": getCookie("userName"),
                        }
                        if(_this.editMes.id){
                            let newObj = Object.assign({},_this.editMes,obj)//合并参数
                            delete newObj['status'];//status传参报错
                            _this.ModifyAdv(newObj)
                        }else{
                            _this.AddNewAdv(obj)
                        }
                    }
                })
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
            cancel(formName){
                this.$emit('dialogClose',false)
            },
            handleImageAdded(file, Editor, cursorLocation) {
                var formData = new FormData();
                formData.append('image', file)
                axios({
                    url: baseImgPath + '/api/Image/UploadImg?op=supplier',
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
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
  .sel-uploader-icon {
    font-size: 20px;
    color: #8c939d;
    width: 120px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: #ecf3fc;
    cursor: pointer;
}
</style>
