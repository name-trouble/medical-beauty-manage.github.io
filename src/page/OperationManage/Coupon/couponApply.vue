<template>
    <div>
        <div class="select">

            <el-form :inline="true" v-model="filterModel" class="demo-form-inline form_search" label-width="100px">

                <el-form-item label="创建日期：" class="form_item_mt10">
                    <el-date-picker v-model="date" type="daterange" @change="dateSelect" class="form_item_ipt220" placeholder="选择日期范围" ></el-date-picker>
                </el-form-item>

                <el-form-item label="关键字：" class="form_item_mt10">
                    <el-input v-model="filterModel.tickName" class="form_item_ipt220"  placeholder="券种编号/申请人/券名"  v-on:keyup.enter.native="search"></el-input>
                </el-form-item>

                <el-form-item label="券类型：" class="form_item_mt10">
                    <el-select v-model="filterModel.ticketsType" class="form_item_ipt220" @change="search">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="折扣券" value="1"></el-option>
                        <el-option label="现金券" value="2"></el-option>
                        <el-option label="门票" value="3"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="适用医院：" class="form_item_mt10">
                    <el-select v-model="filterModel.hospitalCodes" class="form_item_ipt220" @change="search">
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
                        @change="search"
                        placeholder="请输入关键词"
                        :remote-method="remoteMethod"
                        :loading="loading">
                        <el-option v-for="item in projectList"  :key="item.id"  :label="item.name" :value="item.id"> </el-option>
                    </el-select>
                </el-form-item>


                <el-form-item label=" " class="form_item_mt10">
                    <el-button type="primary" icon="search" @click="search" class="searchBtn">查询</el-button>
                </el-form-item>
            </el-form>
        </div>


        <ul>
            <li class="shelve" v-for="(item,index) in states" :key="index" :class="{'active':currentIndex===index}" @click="selectState(item.code,index)">{{item.text}}</li>
        </ul>

        <el-table :data="tableData" ref="multipleTable" style="width: 100%;margin-top:10px;margin-bottom:10px;" border  class="min_table" v-loading="tabLoading"
                  stripe row-key="id">
            <el-table-column prop="TickInfoCode" label="券正面" width="120">
                <template slot-scope="scope">
                    <img :src="url+scope.row.FrontPicUrl" alt="" height="50" width="82">
                </template>
            </el-table-column>

            <el-table-column prop="TickInfoCode" label="券种编号" min-width="100">
            </el-table-column>

            <el-table-column prop="ApplyUserName" label="申请人" min-width="100"></el-table-column>

            <el-table-column prop="ApplyOn" label="申请日期" min-width="100">
                <template slot-scope="scope">
                    {{scope.row.ApplyOn.substring(0,10)}}
                </template>
            </el-table-column>

            <el-table-column prop="TickName" label="券名称" min-width="200">
            </el-table-column>

            <el-table-column label="券类型" width="100">
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

            <el-table-column label="有效期" min-width="150">
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
                    {{ '￥'+scope.row.RealPrice }}
                </template>
            </el-table-column>

            <el-table-column prop="ApplyNum" label="申请数量" min-width="100">
            </el-table-column>
             <el-table-column prop="Memo" label="备注" min-width="100" show-overflow-tooltip>
            </el-table-column>
        </el-table>

        <div class="block">
            <el-pagination @size-change="pageSizeChange" @current-change="pageIndexChange" :total="dataCount"
                           :current-page.sync="currentPage" :page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
                           layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
        </div>

    </div>
</template>

<script type="text/ecmascript-6">
    import {baseImgPath} from "@/config/env"
    import { getTicketsApply, getSupplierBySupType, getProjectAll,GetGoodsByKeywords } from '@/api/myData'
    import './lib/coupon.less'

    export default {
        // name: '',
        components: {
            
        },
        data() {
            return {
                loading:false,
                date:"",
                currentIndex:0,
                url:"",
                date: "",
                ispopList: false,
                filterModel: {
                    tickName: "",
                    tickState: -1,
                    ticketsType: "",
                    hospitalCodes: "",
                    projCodes: "",
                    checkState: "0",
                    startDate: "",
                    endDate: "",
                    pageIndex: 1,
                    pageSize: 10,
                    
                },

                userInfo: {},
                filterWord: "",
                tableData: [],
                selectData: [],

                dataCount: 0, //总数
                currentPage: 1,   //当前页面index
                pageSize: 10, //每页显示条数
                states: [
                    {text: "审核中", code: "0"},
                    {text: "已通过", code: "1"},
                    {text: "已驳回", code: "2"},
                ],
                state: ["0"],
                hospList: [],
                projectList: [],
                tabLoading:false,
                currentData: "",

            }
        },

        computed: {
            // tHeader(){
            //     return ['券种编号', '券名称','券类型','医院范围','项目','有效期','售价']
            // },
            // filterVal(){
            //     return ['TickInfoCode', 'TickName', 'TicketsType', 'HospitalName', 'ProjectName','validity','Price']
            // },
            // tableData1(){
            //     let arr = JSON.parse(JSON.stringify(this.tableData))
            //     arr.forEach(row=>{
            //         row.TicketsType = this.getName(row.TicketsType)
            //         row.validity = this.getData(row)
            //     })
            //     return arr
            // },
            // name(){
            //     return "消费券上下架"
            // }
        },

        mounted() {
            this.url = baseImgPath
            this.$nextTick(function () {
                this.dropInfo()
            })
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
            getName(data){
                switch (data){
                    case 1: return '折扣券' ;
                    case 2: return '代金券' ;
                    case 3: return '门票' ;
                }
            },
            getData(data){
                if(data.PrdOfVal!='' && (data.PrdOfVal+'')!='null'){
                    return '售后'+ data.PrdOfVal +'天'
                }else{
                    if(data.StartDate&&data.EndDate){
                        return "开始："+data.StartDate.substr(0,10)+'结束：'+data.EndDate.substr(0,10)
                    }else{
                        return ""
                    }
                }
            },
            async getTicketsList() {
                this.filterModel.checkState = this.state[0]
                this.filterModel.pageIndex = this.currentPage
                this.filterModel.pageSize = this.pageSize
                this.tabLoading = true
                let res = await getTicketsApply(this.filterModel)
                this.tableData = []
                this.tabLoading = false
                if (res instanceof Array) {
                    this.tableData = res
                    if(res.length>0){
                        this.dataCount = parseInt(this.tableData[0]["RecordCount"])
                    }else{
                        this.dataCount = 0
                    }
                }
            },

            async dropInfo() {
                this.hospList = await getSupplierBySupType("001")
            },


            selectState(val,index) {
                this.currentIndex = index
                this.state = []
                this.state.push(val)
                this.initFilter()
                this.getTicketsList()
                this.filterModel.checkState = val
                window.event.preventDefault()
            },
            initFilter() {
                this.filterModel.tickName = ""
                this.filterModel.ticketsType = ""
                this.filterModel.hospitalCodes = ""
                this.filterModel.projCodes = ""
                this.filterModel.checkState = ""
                this.filterModel.startDate = ""
                this.filterModel.endDate = ""
                this.filterModel.pageIndex = 1
                this.filterModel.pageSize = this.pageSize
            },

            colseEdit() {
                this.ispopList = false
            },

            apply() {
                this.ispopList = true
            },

            search() {
                this.currentPage = 1
                this.getTicketsList()
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
                this.search()
                
            },

            pageIndexChange(index) {
                this.getTicketsList()
            },
            pageSizeChange(size) {
                this.pageSize = size
                this.getTicketsList()
            },

            init() {
                this.getTicketsList()
                this.currentPage = 1
            },
            submited(res) {
            }
        }
    }
</script>

<style lang="less" scoped>
    .select {
        background: rgb(249, 249, 249);
        padding: 10px;
        border-radius: 5px;

    .el-input {
        width: 270px;
    }

    .el-date-editor {
        width: 128px;
    }

    .el-input--small .el-input__inner {
        height: 35px;
        width: 270px;
    }

    .el-select {
        width: 270px;
    }

    }

    .block {
        float: right;
        margin-right: 30px;
        padding-right: 0 !important;
    }

    .el-checkbox-button__inner {
        width: 150px;
    }
</style>
