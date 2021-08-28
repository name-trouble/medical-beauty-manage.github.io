<template>
    <div class="addFeedBack">
        <el-form :model="formInline" class="demo-form-inline" label-width="100px" :rules="rules" ref="formInline">
            <el-form-item label="标题：" class="form_item_mt10 form_item_wh280" prop="title">
                <el-input placeholder="请输入标题" v-model="formInline.title" style="width:500px;"></el-input>
            </el-form-item>
            <el-form-item label="医院：" class="form_item_mt10">
                <el-select v-model="formInline.hospital" placeholder="请选择" @change="hosSel" style="width:300px;" >
                    <el-option v-for="item in hospitalList" v-if="item.code" :label="item.supplierName" :value="item.supplierName+'|'+item.code" :key="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="用户：" class="form_item_mt10 form_item_wh280" prop="userName">
                <el-input placeholder="请输入姓名方便与您联系" v-model="formInline.userName" style="width:300px;"></el-input>
            </el-form-item>
            <el-form-item label="电话：" class="form_item_mt10 form_item_wh280" prop="mobile">
                <el-input placeholder="请输入联系电话方便与您联系" v-model="formInline.mobile" style="width:300px;"></el-input>
            </el-form-item>
            <el-form-item label="反馈类型：" class="form_item_mt10">
                <el-select v-model="formInline.feedType" style="width:300px;">
                    <el-option v-for="(item,index) in feedTypeList" :key="index" :label="item.name" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="优先级：" class="form_item_mt10">
                <el-select v-model="formInline.priorityType" style="width:300px;">
                    <el-option v-for="(item,index) in priorityList" :key="index" :label="item.name" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="描述与截图：" class="form_item_mt10 form_item_wh280" >
                <vue-editor v-model="content" useCustomImageHandler @image-added="handleImageAdded" style=""></vue-editor>
            </el-form-item>
            <el-form-item label="反馈信息：" class="form_item_mt0 form_item_wh280" v-if="editMes.id">
                <el-input type="textarea" :rows="5" placeholder="问题解决方案" v-model="formInline.resolveContent" style="width:500px;"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: center;margin-top:10px;">
            <el-button type="primary" @click="sure('formInline')" :loading="saveLoading">确 定</el-button>
            <el-button @click="cancel('formInline')">取 消</el-button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import '../lib/ord.less'
    import { xmxUrl, baseImgPath } from '@/config/env'
    import { imgApi, acceptImage } from '@/config/common'
    let uploadUrl = xmxUrl + imgApi + '?op=alertad'
    import { VueEditor } from 'vue2-editor'
    import { getCookie, delCookie } from '@/config/mUtils'
    import {AddFeedback,UpdateFeedback, } from "@/api/myData"
    import {getTopBranch,DelImg} from "@/api/myData"
    import axios from 'axios'
    export default {
        // name:"newNotice",
        data () {
            return {
                priorityList:[{name:'低',value:'1'},{name:'中',value:'2'},{name:'高',value:'3'},{name:'紧急',value:'4'},{name:'严重',value:'5'}],
                feedTypeList:[{name:'系统错误',value:'1'},{name:'需求变更',value:'2'},{name:'新需求',value:'3'},{name:'其他',value:'4'}],
                date:'',
                baseImgPath,
                uploadUrl,
                acceptImage,
                saveLoading:false,
                content: " ",
                formInline:{
                    title:'',
                    feedType:'',
                    priorityType:'',
                    hospital:'',
                    mobile:'',
                    hospitalName:'',
                    hospitalCode:'',
                    userName:'',
                    resolveContent:'',
                },
                rules:{
                    mobile:[
                        { required: true, message: '请填写手机号' }
                    ],
                    userName:[
                        { required: true, message: '请填写用户名 ' }
                    ],
                    title: [
                        { required: true, message: '请填写标题', trigger: 'blur' }
                    ],
                }
            }
        },
        watch:{
            "formInline.radio":{
                handler(curVal,oldVal){
                    this.content = ""
                },
                deep:true
            }
        },
        props:{
            hospitalList:Array,
            editMes:{},
        },
        mounted(){
            
           this.formInline.hospital = this.hospitalList[0].code?this.hospitalList[0].supplierName+'|'+this.hospitalList[0].code:''
           if(this.editMes.id){
               this.copyData(this.editMes)
            }
        },
        methods:{
            hosSel(val){
                this.formInline.hospitalCode = val.split("|")[1]
                this.formInline.hospitalName = val.split("|")[0]
            },
            copyData(data){//编辑赋值
                this.formInline = {
                    title:data.title,
                    feedType:data.feedType+'',
                    priorityType:data.priorityType+'',
                    hospital:data.hospitalName?data.hospitalName+'|'+data.hospitalCode:'',
                    mobile:data.mobile,
                    hospitalName:data.hospitalName,
                    hospitalCode:data.hospitalCode,
                    userName:data.userName,
                    resolveContent:data.resolveContent?data.resolveContent:''
                }
                setTimeout(()=>{
                    this.content = this.htmlDecode(data.feedContent)
                },100)
            },
            closeChange(){
                this.formInline.seconds = 0
            },
            getData(obj){
                this.formInline.linkUrl = obj.linkUrl
                this.formInline.img = obj.img
                this.formInline.selName = obj.name
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
            
            handleAvatarSuccess(res, file){
                
                if(this.formInline.imgUrl!=''){
                    this.DelImg(this.formInline.imgUrl)
                }
                this.formInline.imgUrl = res
            },
             // 删除原图片/视频
            async DelImg(filepath){
                let res = await DelImg({filepath:filepath})
                if(!res.status){        
                    this.$message({message: '原图片删除失败！'+res.errorMessage,type: 'warning'});
                }
            },
        
            async AddFeedback(params){
                try{
                    this.saveLoading = true
                    let res = await AddFeedback(params)
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
            async UpdateFeedback(params){
                let res = await UpdateFeedback(params)
                if(res.status == true){
                    this.$message({message: '编辑成功', type: 'success'});
                    this.$emit('dialogClose',true)
                }else{
                    this.$message.error('编辑失败');
                }
                this.saveLoading = false
            },
            sure(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let obj = {
                            'title':this.formInline.title,
                            "hospitalCode": this.formInline.hospitalCode,
                            "hospitalName": this.formInline.hospitalName,
                            "mobile":this.formInline.mobile,
                            "feedType": this.formInline.feedType,
                            'userName':this.formInline.userName,
                            "priorityType": this.formInline.priorityType,
                            "feedContent": this.htmlEncode(this.content),
                            'resolveContent':this.formInline.resolveContent
                        }
                        if(this.editMes.id){
                            let newObj = Object.assign({},this.editMes,obj)//合并参数
                            newObj.modifiedUserId = getCookie("userId")
                            newObj.modifiedBy = getCookie("userName")
                            this.UpdateFeedback(newObj)
                        }else{
                            obj.feedState = 0
                            obj.createUserId = getCookie("userId")
                            obj.createBy = getCookie("userName")
                            this.AddFeedback(obj)
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
                this.$emit("dialogClose",false)
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
