<template>
    <div class="settled selCommon">
        <el-form :model="formInline" :rules="rules" ref="formInline" class="demo-form-inlinedemo-form-inline" label-width="80px">
          <el-form-item label="手术日期：" class="form_item_mt10 " v-if="opeMes.type==0">
                    <el-date-picker
                        v-model="formInline.date"
                        type="date"
                        style='width:200px;'
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="关联项目：" class="form_item_mt10" v-if="opeMes.type==0">
                     <span>{{opeMes.projectName}}</span>
                </el-form-item>
                <el-form-item label="医生：" class="form_item_mt10" v-if="opeMes.type==0">
                     <span>{{opeMes.doctorName}}</span>
                </el-form-item>
                <el-form-item label="设计师：" class="form_item_mt10" v-if="opeMes.type==0">
                     <span>{{opeMes.designerName}}</span>
                </el-form-item>
                <el-form-item label="上传日期："  class="form_item_mt10 ">
                    <el-date-picker
                        v-model="formInline.date1"
                        type="date"
                        style='width:200px;'
                        placeholder="选择日期范围">
                    </el-date-picker>
                </el-form-item>
                <!-- <el-form-item label="案例描述：" class="form_item_mt10" v-if="opeMes.type==0">
                    <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 20}"  placeholder="请输入内容" v-model="formInline.desc"></el-input>
                </el-form-item> -->
                <el-form-item label="照片：" class="form_item_mt10" style="width:900px">
                    <span style="color:red">(请上传 800*800px以上小于10M的图片, 最多10张)</span>
                        <upload
                            @onSuccess="onSuccess3"
                            :downLoadApi="downLoadApi"
                            :fileList="fileListImg3"
                            @onRemove="onRemove3"
                            @imgView="imgView"
                            :action="action"
                            :on-remove="handleRemove"
                            style="width:660px">
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
let uploadUrl = xmxUrl + imgApi + '?op=CusPhoto&customerName='
import {GetPhotoByFxCode,addCase,getProofOrderDetail,addCaseRecord,DelImg} from "@/api/myData"
import "@/style/selfCommon.less"
    export default {
        data () {
            return {
                date:'',
                date1:new Date(),
                downLoadApi:xmxUrl+'/Image/DownLoadImg?filePath=',
                formInline:{
                    desc:'',
                    date:'',
                    date1:new Date(),
                },
                beforeList:[],
                ingList:[],
                action:uploadUrl,
                afterList:[],
                fileListImg1:[],
                // fileListImg2:[],
                fileListImg3:[],
                mes:{},
                rules: {
                    date1: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    date2: [
                        { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                    ],
                }
            }
        },
        props:{
           opeMes:Object,
        },
        computed: {
            
        },
       
        mounted(){
            // 添加案例
            let cusName = this.opeMes.customerName?this.opeMes.customerName:'',cusId = this.opeMes.customerId?this.opeMes.customerId:''
            this.action = this.action+cusId+'_'+cusName
            if(this.opeMes.type==0){
                this.getPhoto()
            }
        },
        methods: {
            // handleRemove(file, fileList) {
            //     
            //     this.DelImg(file)
            // },
            async DelImg(filepath){
                let res = await DelImg({filepath:filepath})
                if(!res.status){        
                this.$message({message: '原图片删除失败！'+res.errorMessage,type: 'warning'});
                }
                
            },
            async addCase(params,params1){
                let res = await addCase(params)
                if(res.status){
                    this.$message({ type: 'success', message: '添加案例成功！' })
                    params1.caseId = res.data
                    this.addCaseRecord(params1)
                    
                }else{
                    this.$message({ type: 'error', message: '操作失败！' })
                }
            },
            async addCaseRecord(params){
                let res = await addCaseRecord(params)
                if(res.status){
                    this.$message({ type: 'success', message: '添加日记成功！' })
                    this.$emit('close',1)
                }else{
                    this.$message({ type: 'error', message: '添加日记失败！' })
                }
            },
            async getPhoto(){
                let mes = await getProofOrderDetail(this.opeMes.fxCode)
                this.mes = mes.ProofOrder
                let res =await GetPhotoByFxCode({FxCode:this.opeMes.fxCode})
                this.picturesSplit(res.data)
            },
            onSuccess3(fileList){
                
                this.fileListImg3 = fileList
            },
            onRemove3(file,fileList){
                this.DelImg(file.url)
                
                this.fileListImg3 = fileList
            },
            // 图片分离
            picturesSplit(data){
                if(data){
                    data.forEach(ele=>{
                        // 术前
                        if(ele.photoType == 1){
                            this.fileListImg1.push(ele.photoUrl)
                        }
                        // 术中
                        // if(ele.photoType == 2){
                        //     this.fileListImg2.push({
                        //         localUrl:baseImgPath+ele.photoUrl,
                        //         url:ele.photoUrl,
                        //     })
                        // }
                        // // 术后
                        // if(ele.photoType == 3){
                        //     this.fileListImg3.push({
                        //         localUrl:baseImgPath+ele.photoUrl,
                        //         url:ele.photoUrl,
                        //     })
                        // }
                    })
                }
            },
            // 图片预览
            imgView(url) {
                
                this.$emit("photoShow",url)
            },
            sure(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        
                        let obj1={
                                // "userId": this.opeMes.customerId?this.opeMes.customerId:'',
                                'CreateDate':this.formInline.date1.formatDate('yyyy-MM-dd hh:mm:ss'),//
                                'ModifiedDate':this.formInline.date1.formatDate('yyyy-MM-dd hh:mm:ss'),//
                                "content": this.formInline.desc,
                                "pictures": this.getPictures(this.fileListImg3),
                                "pictureDate": this.formInline.date1.formatDate('yyyy-MM-dd hh:mm:ss'),//
                                "caseId": this.opeMes.caseId,
                                "pcLastModifiedUserId":  getCookie('userId'),
                                'pcLastModifiedUserName':getCookie('userName'),
                            }
                        if(this.opeMes.type==0){
                            let obj = {
                                "fxCode": this.opeMes.fxCode,
                                // "name": "sample string 2",//
                                "catalogId": this.mes.ProjectId,//项目id
                                "catalogName": this.mes.ProjectName,//项目名字
                                // "tab": "sample string 4",//
                                "pictures": this.fileListImg1.join("#"),
                                "pictureDate": this.formInline.date1.formatDate('yyyy-MM-dd hh:mm:ss'),//
                                "operationDate": this.formInline.date.formatDate('yyyy-MM-dd'),//
                                "price":this.mes.Price,
                                "designerId": this.mes.Designer?this.mes.Designer:'',
                                "designerName":this.mes.DesignerName?this.mes.DesignerName:'',
                                "hospitalId": this.mes.HospitalId?this.mes.HospitalId:'',
                                "hospitalName":this.mes.HospitalName?this.mes.HospitalName:'',
                                "userId": this.mes.CustomerId?this.mes.CustomerId:'',
                                "doctorId": this.opeMes.doctorId?this.opeMes.doctorId:'',
                                "doctorName": this.opeMes.doctorName?this.opeMes.doctorName:'',
                                "pcLastModifiedUserId": getCookie('userId'),
                                'pcLastModifiedUserName':getCookie('userName'),
                            }
                            this.addCase(obj,obj1)
                        }else{
                            this.addCaseRecord(obj1)
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
                this.$emit('close',1)
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
