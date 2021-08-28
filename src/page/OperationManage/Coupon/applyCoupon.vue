<template>
    <div>
        <div class="select">
          <el-form :inline="true" v-model="filterModel" class="demo-form-inline form_search" label-width="100px">

                <el-form-item label="创建日期：" class="form_item_mt10">
                    <el-date-picker v-model="date" type="daterange" @change="dateSelect" class="form_item_ipt220" placeholder="选择日期范围" ></el-date-picker>
                </el-form-item>

                <el-form-item label="券名称：" class="form_item_mt10">
                    <el-input v-model="filterModel.tickName" class="form_item_ipt220"  v-on:keyup.enter.native="onSubmit"></el-input>
                </el-form-item>

                <!-- <el-form-item label="券类型：" class="form_item_mt10">
                    <el-select v-model="filterModel.ticketsType" class="form_item_ipt220">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="折扣券" value="1"></el-option>
                        <el-option label="现金券" value="2"></el-option>
                        <el-option label="门票" value="3"></el-option>
                    </el-select>
                </el-form-item> -->

                <el-form-item label="适用医院：" class="form_item_mt10">
                    <el-select v-model="filterModel.hospitalCodes" class="form_item_ipt220" @change="onSubmit">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="(item,$index) in hospList" :key="$index" :label="item.SupplierName"
                                   :value="item.Code"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="适用项目：" class="form_item_mt10">
                   
                    <el-select
                        v-model="filterModel.projCodes"
                        class="form_item_ipt220"
                        filterable
                        remote
                        @change="onSubmit"
                        placeholder="请输入关键词"
                        :remote-method="remoteMethod"
                        :loading="loading">
                        <el-option v-for="item in projectList"  :key="item.id"  :label="item.name" :value="item.id"> </el-option>
                    </el-select>
                </el-form-item>


                <el-form-item label=" " class="form_item_mt10">
                    <el-button type="primary" icon="search" @click="onSubmit" class="searchBtn">查询</el-button>
                    <!-- <el-button type="info" icon="plus" @click="apply" style="width:123px"> 申请</el-button> -->
                    <!-- <Export :tHeader="tHeader" :filterVal=' filterVal' :tableData1='tableData1' :name="name"></Export> -->
                </el-form-item>
            </el-form>
        </div>

        <el-table :data="tableData" ref="multipleTable" style="width: 100%;margin-top:10px;margin-bottom:10px;" border stripe height="600" row-key="id" v-loading="tabLoading"> 
            
             <el-table-column prop="TickInfoCode" label="券正面" width="120">
                <template slot-scope="scope">
                    <img :src="url+scope.row.FrontPicUrl" alt="" height="50" width="82">
                </template>
            </el-table-column>

            <el-table-column prop="TickInfoCode" label="券种编号" min-width="100">
            </el-table-column>

            <el-table-column prop="CreateOn" label="创建日期"  min-width="120">
                <template slot-scope="scope">
                    {{scope.row.CreateOn.substring(0,10)}}
                </template>
            </el-table-column>

            <el-table-column prop="TickName" label="券名称" min-width="100">
            </el-table-column>

            <el-table-column label="券类型" width="90">
                <template slot-scope="scope">
                    <span v-if="scope.row.TicketsType==1">
                        折扣券
                    </span>
                    <span v-if="scope.row.TicketsType==2">
                        代金券
                    </span>
                    <span v-if="scope.row.TicketsType==3">
                        门票
                    </span>
                </template>
            </el-table-column>

            <el-table-column label="有效期" min-width="170">
               <template slot-scope="scope">
                    <span
                        v-if="scope.row.PrdOfVal!='' && scope.row.PrdOfVal!=null "> {{ '售后'+ scope.row.PrdOfVal +'天'}}</span>
                    <span v-else>
                        开始时间： <span v-if="scope.row.StartDate">
                           {{scope.row.StartDate.substring(0,10)}}
                        </span><br/>
                        结束时间：<span v-if="scope.row.EndDate">
                            {{scope.row.EndDate.substring(0,10)}}
                        </span>
                    </span>
                </template>
            </el-table-column>

            <el-table-column prop="Price" label="售价" min-width="100">
                <template slot-scope="scope">
                    {{ '￥'+scope.row.Price }}
                </template>
            </el-table-column>

            <el-table-column prop="PointLimit" label="积分限额" min-width="100">
            </el-table-column>

            <el-table-column label="操作" min-width="100px">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" icon="edit" @click="add(scope.row,scope.$index)"> 申请</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="block" style="margin-bottom:10px">
            <el-pagination @size-change="pageSizeChange" @current-change="pageIndexChange" :total="dataCount" :current-page.sync="currentPage" :page-size="pageSize" :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
        </div>

        <el-dialog title="消费券申请" size="" :visible.sync="isPopApply" @close="getTicketsList">
            <el-form label-width="100px" class="demo-ruleForm" label-position="left">
                <el-form-item label="消费券名称：" class="form_item_mt10">
                    <el-tag type="success">{{currentData.TickName}}</el-tag>
                </el-form-item>
                <el-form-item label="申请数量：" class="form_item_mt10">
                    <el-input-number v-model="applyNum" :min="1"></el-input-number>
                </el-form-item>
                <el-form-item label="原价：" class="form_item_mt10">
                    <span>{{price}}</span>
                </el-form-item>
                <el-form-item label="售价：" class="form_item_mt10">
                    <el-input-number v-model="realPrice" :min="0" :controls="false"></el-input-number>
                </el-form-item>
            </el-form>
            <div style="text-align:center;margin-bottom:10px">
                <el-button type="info" @click="apply" style="width:100px;" :loading="saveLoading"> 确认申请</el-button>
                <el-button @click="cancel" style="width:100px;"> 取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {baseImgPath} from "@/config/env"
import { getTicketsInfoByPage, addTicketsApply ,getSupplierBySupType,GetGoodsByKeywords} from '@/api/myData'
import { getCookie } from '@/config/mUtils'
export default {
    props: {
        onClose: Function
    },
    data() {
        return {
            saveLoading:false,
            loading:false,
            tabLoading:false,
            date:"",
            url:"",
            filterModel: {
                    tickName: "",
                    tickState: 1,
                    ticketsType: "",
                    hospitalCodes: "",
                    projCodes: "",
                    checkState: "0",
                    startDate: "",
                    endDate: "",
                    pageIndex: 1,
                    pageSize: 10,
                },
                 hospList: [],
            tableData: [],
            projectList:[],
            isPopApply: false,
            dataCount: 0, //总数
            currentPage: 1,   //当前页面index
            pageSize: 20, //每页显示条数

            applyNum: 1,
            price:"",
            realPrice:0,
            currentData: "",
        }
    },

    mounted() {
        this.url = baseImgPath
        this.dropInfo()
    },

    methods: {
        // 项目远程搜索
            remoteMethod(query) {
                
                if (query !== '') {
                    this.loading = true;
                    this.GetGoodsByKeywords({
                        keywords:query.removeSP(),
                        IsMall:0
                    })
                } else {
                this.projectList = [];
                this.filterModel.projCodes = query
                }
            },
            async GetGoodsByKeywords(params){
                this.projectList = []
                let res = await GetGoodsByKeywords(params)
                for(let item of res){
                    this.projectList.push({
                        name:item.GoodsEntity.GoodsAlias,
                        id:item.GoodsEntity.Id,
                    })
                }
                this.loading = false
            },
        async dropInfo() {
                this.hospList = await getSupplierBySupType("001")
                //  this.getTicketsList()
            },
        dateSelect(val){
                if (val.length) {
                    val = val.formatDates()
                    this.filterModel.startDate = val.substring(0, 10)
                    this.filterModel.endDate = val.substring(13)
                } else {
                    this.filterModel.startDate = ""
                    this.filterModel.endDate = ""
                }
                this.onSubmit()
                
            },

            onSubmit(){
                this.currentPage = 1
                this.getTicketsList()
            },

         async getTicketsList() {
             
                this.tabLoading = true
                this.filterModel.pageIndex = this.currentPage
                this.filterModel.pageSize = this.pageSize
                let res = await getTicketsInfoByPage(this.filterModel)
                this.tableData = []
                this.tabLoading = false
                if (res instanceof Array) {
                    this.tableData = res
                    this.dataCount = parseInt(this.tableData[0]["RecordCount"])
                }
            },

        // async getTicketsList() {
        //     this.filterModel.pageIndex = this.currentPage
        //     this.filterModel.pageSize = this.pageSize

        //     let res = await getTicketsInfoByPage(this.filterModel)
        //     this.tableData = []
        //     if (res instanceof Array) {
        //         this.tableData = res
        //         this.dataCount = parseInt(this.tableData[0]["RecordCount"])
        //     }
        // },

        pageIndexChange(index) {
            this.getTicketsList()
        },

        pageSizeChange(size) {
            this.pageSize = size
            this.getTicketsList()
        },

        add(item, index) {
            this.isPopApply = true
            this.currentData = item
            this.price = item.Price
            this.realPrice = item.Price
        },

        async apply() {
            
            let param = {
                applyNum: this.applyNum,
                applyType:1, // 1.代理商自主申请   2.系统人员手工申请
                ticketsKindCode: this.currentData.TickInfoCode,
                branchCode: getCookie("BranchCode"),
                CreateBy:getCookie("userName"),
                CreateUserId:getCookie("userId"),
                price:this.price,
                realPrice:this.realPrice
            }
            this.saveLoading = true
            let res = await addTicketsApply(param)
            if (res.success && res.success > 0) {
                this.currentData = ""
                this.isPopApply = false
                this.$message({ type: 'success', message: '申请成功!' })
            } else {
                this.$message({ type: 'warning', message: '申请失败!' })
            }
            this.saveLoading = false
        },

        cancel() {
            this.currentData = ""
            this.$message({ type: 'info', message: '已取消' })
            this.isPopApply = false
        },
    }
}
</script>

<style lang="less" scoped>
.block {
    float: right;
    margin-right: 30px;
    padding-right: 0!important;
}
.demo-ruleForm{
    width: 500px
}
</style>
