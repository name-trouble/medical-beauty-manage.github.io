<template>
    <div>
        <div class="head">
            <span>编辑轮播图</span>
        </div>
        <!-- <div>
            <span class="switch">是否显示：<el-switch on-text="" off-text="" v-model="show" on-color="#13ce66" off-color="#ff4949"></el-switch></span> 
        </div> -->
        <div class="el-card content">
            <div class="item" v-for="(item,$index) in list" :key="$index">
                <!-- <div class="close-btn">
                    <el-button type="text" icon="close" @click="deleteItem($index)"></el-button>
                </div> -->
                <div style="height:20px;"></div>
                <el-upload class="avatar-uploader" :action="uploadUrl" :accept="acceptImage" :show-file-list="false" :on-success="success">
                    <img src="../lib/img_add.png" @click="imgIndex=$index" v-if="item.pictureUrl==''">
                    <img :src="baseImgPath+item.pictureUrl" @click="imgIndex=$index" v-else>
                </el-upload>
                <div class="url-box" style="">
                    <div style="flex:0 100%">
                        <span>链接类型：</span>
                        <el-select v-model="item.linkName" placeholder="请选择" @change="selectUrl(item.linkName,$index)" style="width:50%">
                            <el-option v-for="(item2,seIndex) in pageSetList" :key="seIndex" :label="item2.name" :value="item2.name">
                            </el-option>
                        </el-select>
                    </div>
                   
                    <div style="flex:0 100%" v-show="item.linkType>2 && item.linkType<13">
                        <!-- <span> 链接地址：</span> -->
                        <div  style="width:100px;height:60px;" @click="showSelectList($index,item.linkType)"  >
                            <img style="width:100px;height:60px;border-radius:0px;" :src="baseImgPath + item.describe" v-if="item.describe">
                        
                            <i  class="el-icon-plus avatar-uploader-icon" v-else> </i>
                        <!-- <span  class="nameInput">{{item.name}}</span> -->
                        </div>
                    </div>
                    <div style="flex:0 100%" v-show="item.linkType==0">
                        <span>网页地址：</span>
                        <el-input v-model="item.linkUrl" style="width:50%"></el-input>
                    </div>
                    <div style="flex:0 100%" v-show="item.linkType==0">
                        <span>小程序地址：</span>
                        <el-input v-model="item.linkWeixin" style="width:50%"></el-input>
                    </div>
                </div>
                <el-button type="danger" @click="deleteData(item,$index)" style="margin:10px auto">删除轮播图</el-button>
            </div>

            <div>
                <el-button type="primary"  @click="addItem"  style="margin:20px auto">添加轮播图</el-button>
                
            </div>

            <div class="foot">
                <el-button size="large" type="success" @click="submit" style="width:160px">保存</el-button>
                <el-button size="large" style="width:160px" @click="cancel">取消</el-button>
            </div>

            <!-- 活动列表选择 -->
            <el-dialog  title="活动" :visible.sync="activeListShow" top="10%" size="">
                <active-list @ActiveSelectInfo="ActiveSelectInfo"  style="width:800px;"></active-list>
            </el-dialog>

            <!-- 医生列表选择 -->
            <el-dialog  title="医生" :visible.sync="doctorListShow" top="10%" size="">
                <doctor-list @DoctorSelectInfo="DoctorSelectInfo"  style="width:800px;"></doctor-list>
            </el-dialog>

              <!-- 案例列表选择 -->
            <el-dialog  title="案例" :visible.sync="caseListShow" top="10%" size="">
                <case-list @CaseSelectInfo="CaseSelectInfo"  style="width:800px;"></case-list>
            </el-dialog>

              <!-- 医院列表选择 -->
            <el-dialog  title="医院" :visible.sync="hospitalListShow" top="10%" size="">
                <hospital-list @HospitalSelectInfo="HospitalSelectInfo"  style="width:800px;"></hospital-list>
            </el-dialog>

              <!-- 直播列表选择 -->
            <!-- <el-dialog  title="直播" :visible.sync="liveListShow" top="10%" size="">
                <live-list @LiveSelectInfo="LiveSelectInfo"  style="width:800px;"></live-list>
            </el-dialog> -->

              <!-- 列表选择 -->
            <el-dialog  title="商户" :visible.sync="merchantListShow" top="10%" size="">
                <merchant-list @MerchantSelectInfo="MerchantSelectInfo"  style="width:800px;"></merchant-list>
            </el-dialog>

            <!-- 卡券列表选择 -->
            <el-dialog  title="卡券" :visible.sync="ticketListShow" top="10%" size="">
                <ticket-list @TicketSelectInfo="TicketSelectInfo"  style="width:800px;"></ticket-list>
            </el-dialog>

             <!-- 项目列表选择 -->
            <el-dialog  title="项目" :visible.sync="projectListShow" top="10%" size="">
                <project-list @ProjectSelectInfo="ProjectSelectInfo"  style="width:800px;"></project-list>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { xmxUrl, baseImgPath } from '@/config/env'
import {imgApi, pageSetList, acceptImage } from '@/config/common'

import { AppWidgetListEdit, widgetlist,WidgetDelete } from '@/api/myData'
import activeList from '../selectList/activeList.vue'
import doctorList from '../selectList/doctorList.vue'
import caseList from '../selectList/caseList.vue'

import hospitalList from '../selectList/hospitalList.vue'
import merchantList from '../selectList/merchantList.vue'
import ticketList from '../selectList/ticketList.vue'
import projectList from '../selectList/projectList.vue'
import { getCookie } from '../../../../config/mUtils';
export default {
    components: { activeList,doctorList,caseList,hospitalList,merchantList,ticketList,projectList },
    props: {
        data: Object
    },

    created() {
        this.getData()
    },

    data() {
        return {
            show:true,
            activeListShow : false,
            doctorListShow : false,
            caseListShow : false,
            hospitalListShow : false,
            liveListShow : false,
            merchantListShow : false,
            ticketListShow:false,
            projectListShow:false,
            selectIndex:0,
            list: [],
            star: 5,
            baseImgPath,
            acceptImage,
            uploadUrl: xmxUrl + imgApi + '?op=appset',
            imgIndex: "",
            pageSetList,  //页面 配置  { name: "网页", linkType: "0", linkUrl: "" },
        }
    },

    methods: {

        showSelectList(index,linktype){
            this.selectIndex = index;
            if(linktype == 3)
            {
                this.hospitalListShow = true
            }
            else if(linktype == 4)
            {
                this.doctorListShow = true
            }
            else if(linktype == 7)
            {
                this.caseListShow = true
            }
            else if(linktype == 9)
            {
                this.activeListShow = true
            }
            else if(linktype == 12)
            {
                this.LiveListShow = true
            }
            else if(linktype == 5)
            {
                this.projectListShow = true;
            }
            else if(linktype==8)
            {
                this.ticketListShow = true;
            }
        },
        deleteData(data,index){
            this.$confirm('此操作将删除该信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.WidgetDelete(data.id,index)
            })
        },
        async WidgetDelete(id,index){
            let res =await WidgetDelete({id:id})
            if(res.status){
                this.$message({ type: 'success', message: '删除成功！' })
                this.list.splice(index,1)
            }else{
                this.$message({ type: 'error', message: '删除失败！'+res.errorMessage })
            }
        },
        async getData() {
            let res = await widgetlist(this.data.id)
            this.list = res.data
        },

        submit() {
            this.$confirm('确认修改吗？', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' })
                .then(() => {
                    this.saveData()
                }).catch(() => {
                })
        },

        async saveData() {
            let res = await AppWidgetListEdit(this.list)
            if (res.status && res.status === true) {
                this.$message({ type: 'success', message: '保存成功！' })
                let dataList = []
                for (let temp of this.list) {
                    
                    if (temp.pictureUrl) {
                        dataList.push(temp)
                    }
                }
                this.$emit('update', { 'data': dataList, 'index': 1 })
            }
            else {
                this.$message({ type: 'error', message: '保存失败！' })
            }
        },

        success(res, file) {
            
            this.list[this.imgIndex].pictureUrl = res
        },

        selectUrl(linkName, index) {

            for (let item of this.pageSetList) {
                if (item.name == linkName) {
                    this.list[index]["linkType"] = item.linkType
                    this.list[index]["linkUrl"] = item.linkUrl
                }
            }
            if(this.list.linkType>=3 && this.list.linkType<=12)
            {
                
            }
        },

        submit() {

            this.$confirm('确认修改吗？', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' })
                .then(() => {
                    this.saveData()
                }).catch(() => {
                    this.$message({ type: 'info', message: '已取消！' })
                })
            //  else this.$message({ type: 'warning', message: '保存失败!' })
        },

        cancel() {
            this.$emit('update', { 'data': [], 'index': 0 })
        },

       ActiveSelectInfo(id,img,name)
        {

            this.list[this.selectIndex].linkUrl = id;
            this.list[this.selectIndex].describe =img;
            // this.list[this.activeIndex].linkUrl = id;
            // this.list[this.activeIndex].name = name;
            // this.list[this.activeIndex].pictureUrl = img;
            this.activeListShow = false;
            
        },
         CaseSelectInfo(id,firstImg,lastImg,name,tab)
        {
            this.list[this.selectIndex].linkUrl = id;
            this.list[this.selectIndex].describe =firstImg;
            // this.list[this.caseIndex].linkUrl = id;
            // this.list[this.caseIndex].name = name;
            // this.list[this.caseIndex].pictureUrl = firstImg+'#'+lastImg;
            this.caseListShow = false;
        
        },

        DoctorSelectInfo(id,img,name)
        {
            this.list[this.selectIndex].linkUrl = id;
            this.list[this.selectIndex].describe =img;
            // this.tempDoctorList[this.doctorIndex].doctorId = id;
            // this.tempDoctorList[this.doctorIndex].doctorName = name;
            // this.tempDoctorList[this.doctorIndex].pictureUrl = img;
            // this.list[this.doctorIndex].doctorId = id;
            // this.list[this.doctorIndex].doctorName = name;
            this.doctorListShow = false;
        },

          LiveSelectInfo(id,img,name,sawCount)
        {
            this.list[this.selectIndex].linkUrl = id;
            this.list[this.selectIndex].describe =img;
            // this.list[this.caseIndex].linkUrl = id;
            // this.list[this.caseIndex].name = name;
            // this.list[this.caseIndex].pictureUrl = img;
            // this.list[this.caseIndex].level = sawCount;
            this.liveListShow = false;
            
        },

         MerchantSelectInfo(id,img,name)
        {
            this.list[this.selectIndex].linkUrl = id;
            this.list[this.selectIndex].describe =img;
            // this.list[this.merchantIndex].linkUrl = id;
            // this.list[this.merchantIndex].name = name;
            // this.list[this.merchantIndex].pictureUrl = img;
            this.merchantListShow = false;
        },

        TicketSelectInfo(id,img,name)
        {
            ;
            this.list[this.selectIndex].linkUrl = id;
            this.list[this.selectIndex].describe =img;
            // this.list[this.merchantIndex].linkUrl = id;
            // this.list[this.merchantIndex].name = name;
            // this.list[this.merchantIndex].pictureUrl = img;
            this.ticketListShow = false;
            
        },

        ProjectSelectInfo(id,img,name)
        {
            ;
            this.list[this.selectIndex].linkUrl = id;
            this.list[this.selectIndex].describe =img;
            // this.list[this.merchantIndex].linkUrl = id;
            // this.list[this.merchantIndex].name = name;
            // this.list[this.merchantIndex].pictureUrl = img;
            this.projectListShow = false;
            
        },
          HospitalSelectInfo(id,img,name)
        {
            this.list[this.selectIndex].linkUrl = id;
            this.list[this.selectIndex].describe =img;
            // this.list[this.hospitalIndex].linkUrl = id;
            // this.list[this.hospitalIndex].name = name;
            // this.list[this.hospitalIndex].pictureUrl = img;
            this.hospitalListShow = false;
            
        },
        
        unSelect(caseIndex)
        {
            this.list[caseIndex].linkUrl = null;
            this.list[caseIndex].name = null;
            this.list[caseIndex].pictureUrl = null;
        },
        addItem(){
            this.list.push({
                createBy: getCookie("userName"),
                createOn: '',
                createUserId: getCookie("userId"),
                describe: "",
                doctorId: '',
                doctorName: "",
                hospitalId: '',
                hospitalName: "",
                level: 0,
                linkName: "",
                linkType: '',
                linkUrl: "",
                linkWeixin: '',
                modifiedBy: getCookie("userName"),
                modifiedOn: "2018-10-16 15:53:11",
                modifiedUserId: getCookie("userId"),
                name: "banner1",
                oldPrice: 0,
                partId: 1,
                pictureUrl: "",
                price: 0,
                sort: 0,
                tab: "",
                type: -1,
            })
        }
    },
}
</script>

<style lang="less" scoped>


.head {
    line-height: 40px;
    vertical-align: middle;
    background: #f2f2f2;

    span {
        margin-left: 10px;
        letter-spacing: 2px;
        font-size: 14px;
    }
}

.item {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    margin: 10px 0;
    padding-bottom: 10px;
    border: 1px solid #ddd;
    width: 90%;

    .close-btn {
        padding-right: 10px;
        text-align: right;
    }

    img {
        width: 375px;
        height: 120px;
    }
}


.avatar-uploader .el-upload {
    border: none;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
}

.avatar-uploader-icon {
    font-size: 20px;
    color: #8c939d;
    width: 120px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: #ecf3fc;
}

.url-box {
    div {
        margin-top: 5px;
    }
    span {
        margin-right: 5px;
    }
}

.foot {
    margin: 10px;
}
.switch{
    display: block;
    padding: 10px 0;
    text-indent: 10px;
}
</style>
