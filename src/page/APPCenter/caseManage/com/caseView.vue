<template>
    <div class="settled selCommon">
        <el-form :model="formInline" class="demo-form-inline" label-width="80px">
            <el-form-item label="术前：" class="form_item_mt10"  style="width:800px">
                    <span style="color:red">(请上传 800*800px以上小于10M的图片, 最多10张)</span>
                        <upload 
                            @onSuccess="onSuccess1" 
                            :fileList="fileListImg1"
                            @onRemove="onRemove1" 
                            :action="action" 
                            @imgView="imgView"
                            :downLoadApi="downLoadApi"
                        style="width:660px">
                        </upload>
                    </el-form-item>
                <!-- <el-form-item label="术中：" class="form_item_mt10" style="width:900px">
                    <span style="color:red">(请上传 800*800px以上小于10M的图片, 最多10张)</span>
                        <upload 
                            @onSuccess="onSuccess2" 
                            :fileList="fileListImg2" 
                            @onRemove="onRemove2" 
                            @imgView="imgView" 
                            :action="action" 
                            :downLoadApi="downLoadApi"
                        style="width:660px">
                        </upload>
                </el-form-item> -->
                <el-form-item label="术后：" class="form_item_mt10" style="width:900px">
                    <span style="color:red">(请上传 800*800px以上小于10M的图片, 最多10张)</span>
                        <upload
                            @onSuccess="onSuccess3"
                            :downLoadApi="downLoadApi"
                            :fileList="fileListImg3"
                            @onRemove="onRemove3"
                            @imgView="imgView"
                            :action="action"
                            style="width:660px">
                        </upload>
                    </el-form-item>
            <el-form-item label="" label-width="0px" style="text-align:center">
                <el-button type="primary" @click="sure">确定</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script type="text/ecmascript-6">
import { getCookie } from '@/config/mUtils'
import upload from '@/components/upload'
import { xmxUrl, baseImgPath } from '@/config/env'
import { imgApi, acceptImage } from '@/config/common'
let uploadUrl = xmxUrl + imgApi + '?op=CusPhoto&customerName='
import {GetDropDownPermission,GetBranchReceiveList,getBaseDataByCode,getServiceManAllByPage,GetPhotoByFxCode,DownLoadImg,AddFxPhoto,DelImg} from "@/api/myData"
import "@/style/selfCommon.less"
    export default {
        data () {
            return {
                downLoadApi:xmxUrl+'/Image/DownLoadImg?filePath=',
                formInline:{},
                beforeList:[],
                ingList:[],
                action:uploadUrl,
                afterList:[],
                fileListImg1:[],
                fileListImg2:[],
                fileListImg3:[],
            }
        },
        props:{
           opeMes:Object,
        },
        computed: {
            
        },
       
        mounted(){
            this.getPhoto()
        },
        methods: {
            async getPhoto(){
                let res =await GetPhotoByFxCode({FxCode:this.opeMes.fxCode})
                this.picturesSplit(res.data)
            },
            onSuccess1(fileList){
                this.fileListImg1 = fileList
            },
            onRemove1(file,fileList){
                this.DelImg(file.url)
                this.fileListImg1 = fileList
            },
            onSuccess2(fileList){
                this.fileListImg2 = fileList
            },
            onRemove2(file,fileList){
                this.DelImg(file.url)
                this.fileListImg2 = fileList
            },
            onSuccess3(fileList){
                this.fileListImg3 = fileList
            },
            onRemove3(file,fileList){
                this.DelImg(file.url)
                this.fileListImg3 = fileList
            },
            async DelImg(filepath){
                let res = await DelImg({filepath:filepath})
                if(!res.status){        
                this.$message({message: '原图片删除失败！'+res.errorMessage,type: 'warning'});
                }
                
            },
            // 图片分离
            picturesSplit(data){
                if(data){
                    data.forEach(ele=>{
                        // 术前
                        if(ele.photoType == 1){
                            this.fileListImg1.push({
                                localUrl:baseImgPath+ele.photoUrl,
                                url:ele.photoUrl,
                            })
                        }
                        // 术中
                        if(ele.photoType == 2){
                            this.fileListImg2.push({
                                localUrl:baseImgPath+ele.photoUrl,
                                url:ele.photoUrl,
                            })
                        }
                        // 术后
                        if(ele.photoType == 3){
                            this.fileListImg3.push({
                                localUrl:baseImgPath+ele.photoUrl,
                                url:ele.photoUrl,
                            })
                        }
                    })
                }
            },
            // 图片预览
            imgView(url) {
                
                this.$emit("photoShow",url)
            },
            sure(){
                this.commandLoding = true
                    // 添加执行
                    if(this.operate == 'command'){
                        this.addData()
                    }else{
                        // 编辑图片
                        this.AddFxPhoto({
                            jsonStr:JSON.stringify(this.getPictures()),
                            code:this.opeMes.fxCode
                        })
                    }
            },
            getPictures(){
                let arr = []
                this.fileListImg1.forEach(ele=>{
                    arr.push({
                        FxCode:this.opeMes.fxCode,
                        customerId:this.opeMes.customerId,
                        customerName:this.opeMes.customerName,
                        photoType:1,
                        photoUrl:ele.url,
                        createUserId:getCookie('userId'),
                        createBy:getCookie('userName')
                    })
                })
                this.fileListImg2.forEach(ele=>{
                    arr.push({
                        FxCode:this.opeMes.fxCode,
                        customerId:this.opeMes.customerId,
                        customerName:this.opeMes.customerName,
                        photoType:2,
                        photoUrl:ele.url,
                        createUserId:getCookie('userId'),
                        createBy:getCookie('userName')
                    })
                })
                this.fileListImg3.forEach(ele=>{
                    arr.push({
                        FxCode:this.opeMes.fxCode,
                        customerId:this.opeMes.customerId,
                        customerName:this.opeMes.customerName,
                        photoType:3,
                        photoUrl:ele.url,
                        createUserId:getCookie('userId'),
                        createBy:getCookie('userName')
                    })
                    
                })
                return arr
            },
            async AddFxPhoto(params){
                let res = await AddFxPhoto(params)
                if(res.status){
                    this.$message({ type: 'success', message: '操作成功！' })
                    this.$emit('close',1)
                }else{
                    this.$message({ type: 'error', message: '操作失败！' })
                }
            },
            cancel(){

            },
            // async DownLoadImg(data){
            //     let res = await DownLoadImg({filepath: '/upload/goodsimg/20180427012718673aa5.jpg'})
            // },
        },
        components: {
            upload
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
