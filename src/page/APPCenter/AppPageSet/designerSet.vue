<template>
    <div class="settled selCommon">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px">
            <el-form-item label="上架日期："  class="form_item_mt10 ">
                <el-date-picker
                    v-model="date"
                    type="daterange"
                    @change="dateChange"
                    style='width:200px;'
                    placeholder="选择日期范围">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="所属医院:" class="form_item_mt10">
                <el-select v-model="formInline.Hospital"  style='width:200px;'>
                    <el-option v-for="(item,index) in HospitalList" :key="index" :label="item.supplierName" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="服务者职位:" class="form_item_mt10">
                <el-select v-model="formInline.Post"  style='width:200px;'>
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="(item,$index) in serTypes" :key="$index" :value="item.DataCode" :label="item.DataName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="服务者:" class="form_item_mt10">
               <el-input v-model="formInline.name"  style='width:200px;'></el-input>
            </el-form-item>
            <el-form-item label="上架状态:" class="form_item_mt10">
                <el-select v-model="formInline.status"  style='width:200px;'>
                    <el-option label="全部" value=""></el-option>
                    <el-option label="未上架" value="0"></el-option>
                    <el-option label="已上架" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label=" " class="form_item_mt10 form_item_wh280">
                <el-button type="primary" @click="search" class="searchBtn" icon="search">查询</el-button>
                <el-button type="primary" @click="addDes" class="searchBtn" icon="plus">添加设计师</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" max-height="600" class="min_table smt" v-loading="loading">
            <el-table-column prop="sequences" label="排序" width="60"></el-table-column>
            <el-table-column prop="servicerCode" label="服务者编号" min-width="100">
               
            </el-table-column>
            <el-table-column prop="hospitalName" label="设计师主图" min-width="100">
                <template slot-scope="scope"> 
                    <img :src="scope.row.bannerImage1" alt="" width="136" height="60">
                </template>
            </el-table-column>
            <el-table-column prop="servicerName" label="服务者姓名" min-width="100"></el-table-column>
            <el-table-column prop="servicerHospital" label="医院" min-width="100"></el-table-column>
            <!-- <el-table-column prop="customerName" label="组合总数" min-width="100">
                 <template slot-scope="scope">
                      <el-button @click="openRec(scope.row)" type="text">{{scope.row.num}}</el-button>
                </template>
            </el-table-column> -->
            <el-table-column prop="addedStatus" label="上架状态" min-width="100">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.addedStatus == 0" type="danger">未上架</el-tag>
                    <el-tag v-if="scope.row.addedStatus == 1" type="success">已上架</el-tag>
                    <el-tag v-if="scope.row.addedStatus == 2" type="gray">已撤销</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="addedTime" label="上架时间" min-width="100" show-overflow-tooltip="">
                 <template slot-scope="scope">
                      <span v-if="scope.row.addedTime">
                          {{scope.row.addedTime.substring(0,10)}}
                      </span>
                </template>
            </el-table-column>
            <el-table-column prop="amount" label="操作" min-width="150" align="center">
                <template slot-scope="scope">
                    <!-- 编辑 -->
                    <el-button type="primary" @click="openRec(scope.row)" size="small">组合编辑</el-button>
                    <el-button type="primary" @click="desEdit(scope.row)" size="small">设计师修改</el-button>
                    <el-button type="primary" size="small" @click="SetStatusDesigns(scope.row,1)" v-if="scope.row.addedStatus == 0||scope.row.addedStatus == 2">上架</el-button>
                    <el-button type="danger" size="small" @click="SetStatusDesigns(scope.row,0)"  v-if="scope.row.addedStatus == 1">撤销</el-button>
                </template>
            </el-table-column>
           
        </el-table>
        <!-- 分页 -->
        <div class="block">
            <el-pagination
                 @size-change="handleSizeChange"
                 @current-change="handleCurrentChange"
                 :current-page="currentPage"
                 :page-sizes="[10, 30, 50, 100]"
                 :page-size="size"
                 layout="total, sizes, prev, pager, next, jumper"
                 :total="total">
             </el-pagination>
        </div>

        <el-dialog :title="'推荐组合'+title" :visible.sync="dialogView"  top="20%"  size="" :close-on-click-modal="false">
             <Recommend :mes="mes" ref="Recommend" @addComb='addComb' v-if="dialogView"></Recommend>
        </el-dialog>
        <el-dialog title="添加组合" :visible.sync="dialogAdd"  top="5%"  size="" :close-on-click-modal="false">
             <Combo :mes="mes" :viewFlg = "viewFlg" :editMes="editMes" :projectList="selectProjectList" ref="Combo" @addSure='addSure' @addPro="addPro" style="width:700px;" v-if="dialogAdd"></Combo>
        </el-dialog>
        <el-dialog title="选择项目" :visible.sync="dialogPro"  top="10%"  size="" :close-on-click-modal="false">
             <projectList ref="projectList" @selectPro='selectPro' style="width:900px;" v-if="dialogPro"></projectList>
        </el-dialog>
        <el-dialog :title="desTitle" :visible.sync="dialogdes"  top="10%"  size="" :close-on-click-modal="false">
            <el-form :model="form" class="demo-form-inline" label-width="80px" style="width:400px;">
                <el-form-item label="医院:" class="form_item_mt10"  v-if="desTitle != '设计师编辑'">
                    <el-select v-model="form.Hospital"  style='width:200px;'  @change="hosSelect">
                        <el-option v-for="(item,index) in HospitalList" v-if="item.code != ''" :key="index" :label="item.supplierName" :value="item.supplierName+'|'+item.code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="设计师:" class="form_item_mt10" v-if="desTitle != '设计师编辑'">
                    <el-select v-model="form.designer"  style='width:200px;' >
                        <el-option v-for="(item,$index) in designerList" :label="item.ServiceName" :key="$index" :value="item.Code" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="排序:" class="form_item_mt10">
                   <el-input-number :min="1" v-model="form.sequences" style='width:200px;' :controls="false"></el-input-number>
                </el-form-item>
                <el-form-item label="设计主图:" class="form_item_mt10">
                    <el-upload
                        class="avatar-uploader"
                        :action="action"
                        :acceptImage="acceptImage"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="" class="form_item_mt10 form_item_wh280" style="text-align:center" label-width="0px">
                    <el-button type="primary" @click="sure">确定</el-button>
                    <el-button @click="cancel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
import Recommend from "./com/addDes.vue"
import projectList from "./com/projectList.vue"
import Combo from "./com/addCombo.vue"
import { baseImgPath } from '@/config/env'
import { acceptImage } from '@/config/common'

import {GetDropDownPermission,GetBranchReceiveList,getBaseDataByCode,getServiceManAllByPage,GetDesigner,AddNew,Alter,SetStatusDesigns,GetServiceManById,DelImg} from "@/api/myData"
import "@/style/selfCommon.less"
import { getCookie } from '../../../config/mUtils';
    export default {
        data () {
            return {
                acceptImage,
                title:"",
                mes:{},
                imageUrl:"",
                dialogdes:false,
                action:"",
                baseImgPath:baseImgPath,
                // acceptImage:acceptImage,
                date:"",
                mes:{},
                dialogPro:false,
                dialogAdd:false,
                dialogView:false,
                total:0,
                size:10,
                currentPage:1,
                HospitalList:[],
                allDes:[],
                branchList:[],
                formInline: {
                    Post:"",
                    startDate:"",
                    endDate:"",
                    itemType:"",
                    itemDetail:"",
                    name:"",
                    status:"",
                },
                agentList:[],
                tableData:[],
                detDate:[],
                loading:false,
                serTypes:[],//职位
                form:{
                    designer:"",
                    Hospital:"",
                    imageUrl:"",
                },
                designerList:[],
                editMes:{},
                selectProjectList:[],
                viewFlg:0,
                desTitle:"",
                desEditMes:{}
            }
        },
        computed: {
            
        },
       
        mounted(){
            this.action = baseImgPath + "/api/Image/UploadImg?op=activity"
            let date1 = new Date()
            date1.setDate(1)
            this.date = [date1,new Date()]
            this.getSupplierByPage()
        },
        methods: {
            hosSelect(val){
                this.designerList=[]
                let code = val.split("|")[1]
                this.allDes.forEach(ele=>{
                    
                    if(ele.HospitalCode.indexOf(code)>=0){
                        this.designerList.push(ele)
                    }
                })
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
           
            async getSupplierByPage(){
                this.serTypes = await getBaseDataByCode("0014")
                let res = await GetDropDownPermission({typeId:1})
                this.formInline.Hospital = res.data[0].code
                this.HospitalList = res.data
                let des = await getServiceManAllByPage({serviceName: '',hospitalCode: '',serTypeCode:"002",
                    jobs: '',title: '',skillCode: '',startDate: '', endDate: '',pageIndex: 1,pageSize:1000
                })
                this.allDes = des
            },
            search(){
                this.currentPage = 1
                this.submit()
            },
            submit(){
                this.loading = true
                this.GetDesigner({
                    "pageSize": this.size,
                    "pageIndex": this.currentPage,
                    "orderBy": "",
                    "AddedTime1": this.formInline.startDate,
                    "AddedTime2": this.formInline.endDate,
                    "servicerHospitalCode": this.formInline.Hospital,
                    "servicerPostCode": this.formInline.Post,
                    "servicerName": this.formInline.name,
                    "addedStatus": this.formInline.status
                })
            },
            async GetDesigner(params){
                let res = await GetDesigner(params)
                if(res.status){
                    this.total = res.count
                    res.data.forEach(ele=>{
                        ele.bannerImage1 = baseImgPath+ele.bannerImage
                    })
                    this.tableData = res.data
                }else{
                    this.$message.error('查询失败'+res.errorMessage);
                }
                this.loading = false
            },

            handleSizeChange(val) {
                this.size = val
                this.submit()
             },
             handleCurrentChange(val) {
                this.currentPage = val
                this.submit()
             },
             openRec(data){
                 this.mes = data
                 this.dialogView = true
                 this.title = '('+data.servicerName+')'
             },
             addComb(ope,data){
                //  新添加
                // if(ope == 0){
                //     this.editMes = {}
                // }
                // if(ope == 1){
                    //  编辑
                //     this.editMes = data
                // }
                
                this.viewFlg = ope
                this.editMes = ope == 0?{}:data
                this.dialogAdd = true
             },
             addSure(){
                this.dialogAdd = false
                this.$refs.Recommend.GetdesGroup()
             },
             addPro(){
                this.dialogPro = true
             },
             selectPro(val){
                 this.$refs.Combo.addProject(val)
             },
             addDes(){
                 this.designerList=[]
                 this.desTitle = "添加设计师"
                 this.dialogdes = true
                  this.form = {
                        designer:"",
                        Hospital:"",
                        imageUrl:"",
                    }
                    this.imageUrl = ""
             },
             handleAvatarSuccess(res, file) {
                if(this.form.imageUrl!=''){
                    this.DelImg(this.form.imageUrl)
                }
                this.form.imageUrl = res
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            async DelImg(filepath){
                let res = await DelImg({filepath:filepath})
                if(!res.status){        
                    this.$message({message: '原图片删除失败！'+res.errorMessage,type: 'warning'});
                }
                
            },
            beforeAvatarUpload(file) {
                // const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                // if (!isJPG) {
                // this.$message.error('上传头像图片只能是 JPG 格式!');
                // }
                if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isLt2M;
            },
            sure(){
                
                let servicerId='',servicerCode='',servicerName='',servicerPost='',servicerPostCode=''

                this.designerList.forEach(ele=>{
                    if(ele.Code == this.form.designer){
                        
                        servicerId = ele.Id
                        servicerCode = ele.Code
                        servicerName = ele.ServiceName
                        servicerPost = ele.JobTitle
                        servicerPostCode = ele.SerTypeCode
                    }
                })
                let obj = {
                    "sequences": this.form.sequences,
                    "servicerId":servicerId ,
                    "servicerCode":servicerCode ,
                    "servicerName":servicerName ,
                    "servicerPost": servicerPost,
                    "servicerPostCode":servicerPostCode,
                    "servicerHospital": this.form.Hospital.length>0?this.form.Hospital.split("|")[0]:"",
                    "servicerHospitalCode": this.form.Hospital.length>0?this.form.Hospital.split("|")[1]:"",
                    "bannerImage": this.form.imageUrl,
                    "addedStatus": 0,
                    "AddedTime": "",
                    'ModifiedUserId':getCookie('userId'),
                    'ModifiedBy':getCookie('userName')
                }
                if(this.desTitle == '设计师编辑'){
                    // 编辑
                    this.desEditMes.sequences = this.form.sequences
                    this.desEditMes.bannerImage = this.form.imageUrl
                    this.desEditMes.servicerPost = servicerPost
                    this.Alter(this.desEditMes)
                }else{
                    // 添加
                    obj.createUserId = getCookie('userId')
                    obj.createBy = getCookie('userName')
                    this.AddNew(obj)
                }
            },
            cancel(){
                this.dialogdes = false
            },
            async AddNew(params){
                let res = await AddNew(params)
                if (res.status == true) {
                    this.$message({ message: '添加成功', type: 'success' });
                    this.submit()
                    this.dialogdes = false
                   
                } else {
                    this.$message.error('添加失败');
                }
            },
            async SetStatusDesigns(data,status){
                let res = await SetStatusDesigns({
                    id:data.id,
                    status:status
                })
                if(res.status){
                    this.$message({ message: '操作成功', type: 'success' });
                    this.submit()
                }else{
                    this.$message.error('操作失败');
                }
            },
            async Alter(params){
                let res = await Alter(params)
                if(res.status){
                    this.$message({ message: '修改成功', type: 'success' });
                    this.submit()
                    this.dialogdes = false
                }else{
                    this.$message.error('修改失败');
                }
            },
            // 修改排序和主图
            async desEdit(data){
                this.designerList=this.allDes
                this.desEditMes = JSON.parse(JSON.stringify(data))
                this.form.sequences = this.desEditMes.sequences
                this.form.imageUrl = this.desEditMes.bannerImage
                this.imageUrl = this.desEditMes.bannerImage1
                this.form.designer = this.desEditMes.servicerCode
                this.desTitle = "设计师编辑"
                this.dialogdes = true
            }
        },
        components: {
            Recommend,
            Combo,
            projectList
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
</style>
