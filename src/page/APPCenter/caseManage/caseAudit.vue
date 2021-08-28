<template>
    <div class="settled selCommon">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px" >
            <!-- <el-form-item label="订单日期："  class="form_item_mt10 ">
                <el-date-picker
                    v-model="date"
                    type="daterange"
                    @change="dateChange"
                    style='width:200px;'
                    placeholder="选择日期范围">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="上传日期："  class="form_item_mt10 ">
                <el-date-picker
                    v-model="date1"
                    type="daterange"
                    @change="dateChange1"
                    style='width:200px;'
                    placeholder="选择日期范围">
                </el-date-picker>
            </el-form-item> -->
            <el-form-item label="关键字：" class="form_item_mt10">
               <el-input v-model="formInline.name"  style='width:200px;'></el-input>
            </el-form-item>
            <!-- <el-form-item label="订单编号：" class="form_item_mt10">
               <el-input v-model="formInline.fxCode"  style='width:200px;'></el-input>
            </el-form-item>
            <el-form-item label="肖像权：" class="form_item_mt10">
               <el-input v-model="formInline.name"  style='width:200px;'></el-input>
            </el-form-item> -->
            <el-form-item label="案例状态：" class="form_item_mt10">
                <el-select v-model="formInline.status"  style='width:200px;'>
                    <el-option label="全部" value=""></el-option>
                    <el-option label="已通过" value="1"></el-option>
                    <el-option label="未通过" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="" class="form_item_mt10 form_item_wh280">
                <el-button type="primary" @click="search" class="searchBtn" icon="search">查询</el-button>
            </el-form-item>
        </el-form>
        
        <ul class="caseContainer">
            <li class="caseList" v-for="(item,index) in tableData" :key="index">
                <div class="imgCon clear">
                    <!-- <div class="imgLeft left" :style="{backgroundImage:`url(${item.firstPic})`,'background-size':'cover'}"> -->
                    <div class="imgLeft left" >
                        <img class="caseImg" :src="baseImgPath+item.photoUrl1" alt="">
                    </div>
                    <div class="imgRight right">
                        <img class="caseImg" :src="baseImgPath+item.photoUrl3" alt="">
                    </div>
                </div>
                <div style="wdith:100%;padding: 0 15px;box-sizing:border-box;line-height:20px;">
                    <div class="casCus">
                        <span>{{item.customerName}}</span>
                        <span :class="item.class" v-text="item.class=='pass'?'已通过':'未通过'"></span>
                    </div>
                    <div> 项目：{{item.projectName}}</div>
                    <div>订单编号：<el-button type="text" @click="viewReport(item)">{{item.fxCode}}</el-button></div>
                    <div>
                        <span v-if="item.orderDate">{{item.orderDate.substring(0,10)}}</span> 上传
                    </div>
                </div>
                <div class="ope">
                    <el-button size="small" type="primary"  @click="viewPhoto(item)">查看照片</el-button>
                    <el-button size="small" type="primary" :disabled="item.approveState =='1'"  @click="aduit(item,0,'添加案例')">添加案例</el-button>
                    <el-button size="small" type="primary"  @click="aduit(item,1,'添加日记')" :disabled="!item.caseId">添加日记</el-button>
                </div>
            </li>
        </ul>
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
        <el-dialog size="" :visible.sync="dialogVisible1" title="图片详情">
            <viewPhoto v-if="dialogVisible1" @photoShow='photoShow' :opeMes="opeMes" @close='close'></viewPhoto>
        </el-dialog>
        <el-dialog size="" :visible.sync="dialogReject" title="订单详情" top="5%">
            <pop-read v-if="dialogReject" :data="opeMes" style="width:950px"></pop-read>
        </el-dialog>
        <el-dialog size="" :visible.sync="dialogPass" :title="title">
            <AddCase v-if="dialogPass" @photoShow='photoShow' style='width:600px;' :opeMes="opeMes" @close='close'></AddCase>
        </el-dialog>
        <el-dialog size="" :visible.sync="imgDialog" top="10%" title="图片详情">
            <img class="viewImg" :src="imgUrl" alt="">
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
import viewPhoto from "./com/caseView.vue"
import AddCase from './com/addCase.vue'
import { xmxUrl, baseImgPath } from '@/config/env'
import PopRead from '@/page/FinanceManage/ReportManage/com/reportRead.vue'
import {GetDropDownPermission,GetBranchReceiveList,getBaseDataByCode,getServiceManAllByPage,ApprovePortraitureOrderList} from "@/api/myData"
import "@/style/selfCommon.less"
    export default {
        data () {
            return {
                imgUrl:"",
                imgDialog:false,
                baseImgPath,
                // form:{
                //     reason:"",
                //     desc:"",
                //     projectName:"",
                // },
                currentPage:1,
                size:10,
                total:0,
                title:"",
                dialogPass:false,
                dialogReject:false,
                dialogVisible1:false,
                data1:"",
                date:"",
                tableData:[],
                formInline: {
                    startDate:"",
                    endDate:"",
                    startDate1:"",
                    endDate1:"",
                    name:"",
                    fxCode:"",
                    status:"",
                },
                date1:"",
                opeMes:{},
            }
        },
        computed: {
            
        },
       
        mounted(){
            let date1 = new Date()
            date1.setDate(1)
            this.date = [date1,new Date()]
            this.date1 = [date1,new Date()]
        },
        methods: {
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
            dateChange1(val){
                if(val){
                    val = val.formatDates()
                    this.formInline.startDate1 = val.substring(0,10)
                    this.formInline.endDate1 = val.substring(13)
                }else{
                    this.formInline.startDate1 = ""
                    this.formInline.endDate1 = ""
                }
            },

            async ApprovePortraitureOrderList(params){
                let res = await ApprovePortraitureOrderList(params)
                this.total = res.count
                this.tableData = this.turnMes(res.data)
            },

            turnMes(data){
                data.forEach(ele => {
                    ele.firstPic = baseImgPath + ele.photoUrl1
                    ele.lastPic = baseImgPath + ele.photoUrl3
                    ele.class = ele.approveState == '0'?'waiting':'pass'
                });
                return data
            },
           
            search(){
                this.PageIndex = 1
                this.submit()
            },

            submit(){
                this.ApprovePortraitureOrderList({
                    keywords:this.formInline.name,
                    PageSize:this.size,
                    ApproveState:this.formInline.status,
                    PageIndex:this.currentPage
                })
            },

            handleSizeChange(val) {
                this.size = val
                this.submit()
             },

            handleCurrentChange(val) {
                this.currentPage = val
                this.submit()
            },

            viewPhoto(data){
                this.opeMes = data
                this.dialogVisible1 = true
            },

            viewReport(data){
                this.opeMes = data
                this.dialogReject = true
            },

            aduit(data,ope,title){
                // this.opeMes = data
                // this.$confirm('是否通过审核？', '提示', {
                //     confirmButtonText: '确定',
                //     cancelButtonText: '拒绝',
                //     type: 'warning'
                // }).then(() => {
                    this.title = title
                     this.opeMes = data
                     this.opeMes.type = ope 
                    this.dialogPass = true
                // }).catch(() => {
                //     this.dialogReject = true
                // });
            },
            // 驳回确认
            rejectSure(){
                
            },
            // 驳回取消
            rejectCancel(){
                
            },
           
            photoShow(val){
                this.imgDialog = true
                this.imgUrl = val
            },
            close(val){
                this.dialogVisible1 = false
                this.dialogPass = false
            },
        },
        components: {
            viewPhoto,
            AddCase,
            PopRead
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.caseContainer{
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    padding: 20px 0;
    max-height: 600px;
    min-height: 400px;
    overflow:auto;
}
.caseList{
    width: 220px;
    height: 260px;
    border: 1px solid rgba(228, 228, 228, 1);
    box-sizing: border-box;
    margin:0 15px 15px 0;
}
.imgCon{
    width: 100%;height: 110px;
}
.imgLeft,.imgRight{
    width:109px;height: 109px;
    border-bottom: 1px solid rgba(228, 228, 228, 1);
}
.ope{
    width: 100%;
    margin:  0 auto;
    display:flex;
    justify-content: space-evenly;
}
.casCus{
    display: flex;
    justify-content: space-between;
    line-height: 30px;
    margin-top: 5px;
}
.casCus span:first-child{
    font-size: 14px;
    color: #333;
    font-weight: bold;
}
.dialog-footer{
    text-align: center;
}
.waiting{
    color: #F1951C;
}
.pass{
    color: #3B8218;
}
.reject{
    color: #C30016;
}
.caseImg{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.viewImg{
    max-width: 1000px;
    max-height: 1000px;
}
</style>
