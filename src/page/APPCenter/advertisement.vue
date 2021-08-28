<template>
    <div class="advtise">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px">
            <el-form-item label="有效日期：" class="form_item_mt10 ">
                <el-date-picker
                    v-model="date"
                    type="daterange"
                    style="width: 200px"
                    @change="dateSelect"
                    placeholder="选择日期范围">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="状态：" class="form_item_mt10 form_item_wh280">
                <el-select v-model="formInline.status" placeholder="" style="width: 200px;">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="未开始" value="1"></el-option>
                    <el-option label="进行中" value="2"></el-option>
                    <el-option label="已过期" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="模块：" class="form_item_mt10 form_item_wh280">
                <el-select v-model="formInline.module" placeholder="" style="width: 200px;">
                    <el-option label="全部" value=""> </el-option>
                    <el-option label="首页" value="0"></el-option>
                    <el-option label="医美" value="1"></el-option>
                    <el-option label="互动" value="2"></el-option>
                    <el-option label="卡券" value="3"></el-option>
                    <el-option label="我的" value="4"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="关键字：" class="form_item_mt10 form_item_wh280">
                <el-input v-model="formInline.abstract" placeholder="主题" style="width: 200px;"></el-input>
            </el-form-item><br/>
            <el-form-item label=" " class="form_item_mt10 form_item_wh280">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
                <el-button type="primary" @click="publish" class="searchBtn">新建广告</el-button>
            </el-form-item>
        </el-form>
        <!--信息表-->
        <div class='advtise_Ul'>
            <div class="advtise_li" v-for="(item,index) in tableData" :key="index">
                <div class="img_con">
                    <div class="adv_status" :class="'adv_status'+item.status">{{item.status|filterFun}}</div>
                    <img class="adv_img" :src="baseImgPath+item.alertImage" alt="">
                </div>
                <div class="adv_mes">
                    <span class="adv_mes_sp">主题：{{item.adTitle}}</span>
                    <span class="adv_mes_sp">模块：{{item.moduleType|filterM}}</span>
                    <span class="adv_mes_sp">有效：<span v-if="item.validTime1">{{item.validTime1.substring(0,10)}}-{{item.validTime2.substring(0,10)}}</span></span>
                    <span class="adv_mes_sp">创建：{{item.submitUserName}}</span>
                </div>
                <div class="adv_ope">
                    <el-button style="float:left;margin-left:10px;" type="primary" @click="edit(item)">编辑</el-button>
                    <el-button style="float:right;margin-right:10px;" @click="del(item)">删除</el-button>
                </div>
            </div>
        </div>
        <!-- 分页 -->
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <!-- 分页 -->
        <el-dialog :visible.sync="dialogVisible" title="新建广告" size="" top="5%">
            <addNewAdv v-if="dialogVisible" style="width:800px;" @selDet="selDet" ref="newAdv" 
            @dialogClose='dialogClose' :editMes="editMes"></addNewAdv>
        </el-dialog>

        <!-- 已下组件为其他人员先前所引用   故未使用 is方法 进行组件切换 并简化传值方式-->
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
            <el-dialog  title="直播" :visible.sync="liveListShow" top="10%" size="">
                <live-list @LiveSelectInfo="LiveSelectInfo"  style="width:800px;"></live-list>
            </el-dialog>

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
</template>

<script type="text/ecmascript-6">
import './components/lib/lib.less'
import { xmxUrl, baseImgPath } from '@/config/env'
import addNewAdv from './components/addNewAdv'
import activeList from './AppPageSet/selectList/activeList.vue'
import doctorList from './AppPageSet/selectList/doctorList.vue'
import caseList from './AppPageSet/selectList/caseList.vue'
import hospitalList from './AppPageSet/selectList/hospitalList.vue'
import merchantList from './AppPageSet/selectList/merchantList.vue'
import ticketList from './AppPageSet/selectList/ticketList.vue'
import projectList from './AppPageSet/selectList/projectList.vue'
import {GetEntities,DeleteAdv,} from "@/api/myData"
export default {
    data() {
        return {
            baseImgPath,
            date:"",
            userDialog:false,
            dialogVisible: false,
            currentPage: 1,
            size: 10,
            total: 0,
            form: {},
            tableData: [],
            formInline: {
                startDate: "",
                endDate: "",
                userName: "",
                abstract: "",
                status:'',
                module:'',
            },
            currentId:'',
            editMes:{},
            currentView:'',
            selectData:{},
            activeListShow : false,
            doctorListShow : false,
            caseListShow : false,
            hospitalListShow : false,
            liveListShow : false,
            merchantListShow : false,
            ticketListShow:false,
            projectListShow:false,
            editMes:{},//编辑信息 
        }
    },
    computed: {
    
    },
    filters:{
        filterFun(val){
            switch(val){
                case 1: return '未开始' 
                break;
                case 2:return '已开始'
                break;
                case 3:return '已结束'
                break;
            }
        },
        filterM(val){
            
            switch(val){
                case 1: return '首页' 
                break;
                case 2:return '医美'
                break;
                case 3:return '互动'
                break;
                case 4:return '卡券'
                break;
                case 5:return '我的'
                break;
            }
        }
    },
    mounted() {
        this.onSubmit()
    },
    methods: {
        edit(data){
            this.editMes = data
            this.dialogVisible = true
        },
        del(data){
            this.$confirm('是否要删除该广告信息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.DeleteAdv({id:data.id})
            })
        },
        dialogClose(val){
            if(val){
                this.search()
            }
            this.dialogVisible = false
        },
        async DeleteAdv(params) {
            try {
                let res = await DeleteAdv(params)
                if (res.status == true) {
                    this.$message({ message: '删除成功', type: 'success' });
                    this.search()
                } else {
                    this.$message.error('删除失败');
                }
            } catch (err) {
                console.log(err)
            }
        },

        dateSelect(val){
            if(val.length!=0){
                val = val.formatDates()
                this.formInline.startDate = val.substring(0,10)
                this.formInline.endDate = val.substring(13)
            }else{
                this.formInline.startDate = ""
                this.formInline.endDate = ""
            }
        },
        onSubmit() {
            this.currentPage = 1
            this.search()
        },
        search(){
            this.GetEntities({
                pageIndex: this.currentPage,
                pageSize: this.size,
                keyword:this.formInline.abstract,
                status:this.formInline.status,
                module:this.formInline.module,
                validTime1:this.formInline.startDate,
                validTime2:this.formInline.endDate,
            })
        },

        async GetEntities(params){
            let res = await GetEntities(params)
            this.tableData = res.data
            this.total = res.count

        },

        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.size[this.currentIndex] = val
            this.search()
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage[this.currentIndex] = val
            this.search()
        },
        publish(){
            this.editMes = {}//清空编辑保存的信息
            this.dialogVisible = true
        },

        selDet(linktype){
            
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
        
        ActiveSelectInfo(id,img,name){
            this.transParams({linkUrl:id,img:img,name:name})
            this.activeListShow = false;
        },

         CaseSelectInfo(id,firstImg,lastImg,name,tab){
            this.transParams({linkUrl:id,img:firstImg,name:name})
            this.caseListShow = false;
        },

        DoctorSelectInfo(id,img,name){
            this.transParams({linkUrl:id,img:img,name:name})
            this.doctorListShow = false;
        },

          LiveSelectInfo(id,img,name,sawCount){
            this.transParams({linkUrl:id,img:img,name:name})
            this.liveListShow = false;
        },

         MerchantSelectInfo(id,img,name){
            this.transParams({linkUrl:id,img:img})
            this.merchantListShow = false;
        },

        TicketSelectInfo(id,img,name){
            this.transParams({linkUrl:id,img:img,name:name})
            this.ticketListShow = false;
        },

        ProjectSelectInfo(id,img,name){
            this.transParams({linkUrl:id,img:img,name:name})
            this.projectListShow = false;
        },
          HospitalSelectInfo(id,img,name){
            this.transParams({linkUrl:id,img:img,name:name})
            this.hospitalListShow = false;
        },

        transParams(obj){
            this.$refs.newAdv.getData(obj)
        },
    },
    components: {
        addNewAdv,activeList,doctorList,caseList,hospitalList,merchantList,ticketList,projectList 
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.advtise_Ul{
    min-height: 400px;
    max-height: 600px;
    overflow: auto;
    display: flex;
    margin-bottom: 10px;
}
.advtise_li{
    height: 480px;
    width: 200px;
    border: 1px solid #bfbfbf;
    overflow: hidden;
    margin-right: 10px;
}
.img_con{
    position: relative;
    height:350px;
    background: #bfbfbf;
    overflow: hidden;
    text-align: center;
    display: table-cell;
    vertical-align: middle;
}
.adv_mes{
    padding: 5px 5px 0;
    line-height: 20px;
}
.adv_mes_sp{
    display:block;
}

.adv_status{
    position: absolute;
    top:-45px;left: -45px;
    width: 90px;height:90px;
    color: #fff;
    text-align: center;
    line-height: 150px;
    transform:rotate(-45deg);
}
.adv_status1{
background: #d0021b;
}
.adv_status2{
    background: #7ccf22;
}
.adv_status3{
    background: #96a2b5;
}
.adv_img{
    width: 100%;height: auto;

}

</style>
