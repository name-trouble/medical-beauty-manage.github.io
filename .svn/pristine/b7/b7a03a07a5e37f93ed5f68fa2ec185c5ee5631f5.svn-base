<template>
    <div class="settled selCommon">
        <el-form :model="formInline" :rules="rules" ref="formInline" class="demo-form-inlinedemo-form-inline" label-width="80px">
            <el-form-item label="照片日期："  class="form_item_mt10 ">
                <el-date-picker
                    v-model="formInline.date1"
                    type="date"
                    style='width:200px;'
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="照片：" class="form_item_mt10">
                <span style="color:red">(请上传 800*800px以上小于10M的图片, 最多10张)</span>
                <upload
                @onSuccess="onSuccess3"
                :downLoadApi="downLoadApi"
                :fileList="fileListImg3"
                @onRemove="onRemove3"
                @imgView="imgView"
                :action="action"
                :on-remove="handleRemove">
                </upload>
            </el-form-item>
            <el-form-item label="恢复状况：" class="form_item_mt10">
                <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 20}"  placeholder="记录最近一段时间的恢复状况" v-model="formInline.desc"></el-input>
            </el-form-item>
            <el-form-item label="" label-width="0px" style="text-align:center">
                <el-button type="primary" @click="sure('formInline')">确定</el-button>
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
let uploadUrl = xmxUrl + imgApi + '?op=live'
import {addCaseRecord,DelImg,CaseRecordEdit} from "@/api/myData"
import "@/style/selfCommon.less"
    export default {
        data () {
            return {
                downLoadApi:xmxUrl+'/Image/DownLoadImg?filePath=',
                formInline:{
                    desc:'',
                    date:'',
                    date1:new Date(),
                },
                baseImgPath,
                beforeList:[],
                ingList:[],
                action:uploadUrl,
                afterList:[],
                fileListImg1:[],
                fileListImg3:[],
                mes:{},
                rules: {
                    date1: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    date2: [
                        { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                    ],
                },
                opeType:1,//1 添加日记 2修改日记
            }
        },
        props:{
           caseMes:Object,
        },
        computed: {
            
        },
       
        mounted(){
            console.log(this.caseMes)
            if(this.caseMes.recordMes){
                this.opeType = 2
                this.copyWorth(this.caseMes.recordMes)
            }
        },
        methods: {
            handleRemove(file, fileList) {
                this.DelImg(file.response)
            },
            copyWorth(data){
                for(let key in data){
                    if(data[key] == null){
                        data[key] = ''
                    }
                }
                data.pictures.forEach(row=>{
                    this.fileListImg3.push({
                        url:row,
                        localUrl:baseImgPath+row,
                    })
                })
                this.formInline.date1 = new Date(data.pictureDate.substring(0,4),data.pictureDate.substring(5,7)-1,data.pictureDate.substring(8,10))
                this.formInline.desc = data.content
            },

            async DelImg(filepath){
                let res = await DelImg({filepath:filepath})
                if(!res.status){        
                this.$message({message: '原图片删除失败！'+res.errorMessage,type: 'warning'});
                }
                
            },

            async addCaseRecord(params){
                let res = await addCaseRecord(params)
                if(res.status){
                    this.$message({ type: 'success', message: '添加日记成功！' })
                    this.$emit('cancel',true,6)
                }else{
                    this.$message({ type: 'error', message: '添加日记失败！' })
                }
            },

            async CaseRecordEdit(params){
                let res = await CaseRecordEdit(params)
                if(res.status){
                    this.$message({ type: 'success', message: '修改日记成功！' })
                    this.$emit('cancel',true,6)
                }else{
                    this.$message({ type: 'error', message: '修改日记失败！' })
                }
            },
          
            onSuccess3(fileList){
                this.fileListImg3 = fileList
            },
            onRemove3(file,fileList){
                this.DelImg(file.url)
                this.fileListImg3 = fileList
            },
           
            // 图片预览
            imgView(url) {
                this.$emit("photoShow",url)
            },
            sure(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let obj={
                                // "userId": this.opeMes.customerId?this.opeMes.customerId:'',
                                'CreateDate':this.formInline.date1.formatDate('yyyy-MM-dd hh:mm:ss'),//
                                'ModifiedDate':this.formInline.date1.formatDate('yyyy-MM-dd hh:mm:ss'),//
                                "content": this.formInline.desc,
                                "pictures": this.getPictures(this.fileListImg3),
                                "pictureDate": this.formInline.date1.formatDate('yyyy-MM-dd hh:mm:ss'),//
                                "caseId": this.caseMes.caseData.id,
                                "pcLastModifiedUserId":  getCookie('userId'),
                                'pcLastModifiedUserName':getCookie('userName'),
                            }
                        if(this.opeType==2){
                            obj.id = this.caseMes.recordMes.id
                            this.CaseRecordEdit(obj)
                        }else{
                            
                            this.addCaseRecord(obj)
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            getPictures(data){
                let arr = []
                data.forEach(ele=>{
                    arr.push(ele.url)
                })
                return arr.join("#")
            },
            cancel(){
                this.$emit('cancel',false,6)
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
