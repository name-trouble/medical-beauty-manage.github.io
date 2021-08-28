<template>
    <div>
        <div class="select">
            <el-form :inline="true" v-model="filterModel" class="demo-form-inline form_search" label-width="110px">

                <el-form-item label="创建日期：" class="form_item_mt10">
                    <el-date-picker
                        v-model="date"
                        type="daterange"
                        @change="dateSelect"
                        style="width: 220px"
                        placeholder="选择日期范围">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="关键字：" class="form_item_mt10">
                    <el-input v-model="filterModel.tickName" style="width: 220px"  placeholder="券种编号/申请人/券名" v-on:keyup.enter.native="search"></el-input>
                </el-form-item>

                <el-form-item label="券类型：" class="form_item_mt10">
                    <el-select v-model="filterModel.ticketsType"  class="form_item_ipt220" @change="search">
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
                <el-form-item label="启用状态：" class="form_item_mt10">
                    <el-select v-model="filterModel.tickState" class="form_item_ipt220" @change="search">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="未启用" value="0"></el-option>
                        <el-option label="已启用" value="1"></el-option>
                        <el-option label="已冻结" value="2"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="上架状态：" class="form_item_mt10">
                    <el-select v-model="filterModel.IsEnable" class="form_item_ipt220" @change="search">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="未上架" value="0"></el-option>
                        <el-option label="已上架" value="1"></el-option>
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
                    <el-button type="primary" @click="search" class="searchBtn">查询</el-button>
                </el-form-item>
            </el-form>
        </div>

        <!-- <ul>
            <li class="shelve" v-for="(item,index) in states" :key="index" :class="{'active':currentIndex===index}" @click="selectState(item.code,index)">{{item.text}}</li>
        </ul> -->

        <el-table :data="tableData" ref="multipleTable" style="width: 100%;margin-top:10px;margin-bottom:10px;" border class="min_table smt" v-loading="tabLoading"
                  stripe max-height="600" row-key="id">
            <el-table-column prop="MainPicUrl" label="券封面" width="120">
                <template slot-scope="scope">
                    <img v-if="scope.row.MainPicUrl" :src="url+scope.row.MainPicUrl" alt="" width="82" style="vertical-align:middle">
                </template>
            </el-table-column>
            <el-table-column prop="FrontPicUrl" label="券正面" width="120">
                <template slot-scope="scope">
                    <div style="height:52px;overflow:hidden"> 
                        <div style="height: 52px;display: table-cell;vertical-align: middle;">
                            <img :src="url+scope.row.FrontPicUrl" alt="" width="82" style="vertical-align:middle">
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="TickInfoCode" label="券种编号" width="120">
            </el-table-column>

            <el-table-column prop="CreateBy" label="创建人" width="100">
            </el-table-column>

            <el-table-column prop="CreateOn" label="创建日期" width="100">
                <template slot-scope="scope">
                    {{scope.row.CreateOn.substring(0,10)}}
                </template>
            </el-table-column>

            <el-table-column prop="TickName" label="券名称" min-width="160" show-overflow-tooltip></el-table-column>

            <el-table-column prop="TickSubTitle" label="副标题" min-width="100" show-overflow-tooltip></el-table-column>

            <el-table-column label="有效期" min-width="160">
                <template slot-scope="scope">
                    <span v-if="scope.row.PrdOfVal!='' && (scope.row.PrdOfVal+'')!='null' "> {{ '售后'+ scope.row.PrdOfVal +'天'}}</span>
                    <div v-else>
                        <p>开始：{{ scope.row.StartDate&&scope.row.StartDate.substr(0,10) }} </p>
                        <p>结束：{{ scope.row.EndDate&&scope.row.EndDate.substr(0,10) }} </p>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="券类型" min-width="100">
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

            <el-table-column prop="Price" label="售价" width="100">
                <template slot-scope="scope">
                    {{ '￥'+scope.row.Price }}
                </template>
            </el-table-column>
            <el-table-column prop="TickName" label="启用状态" min-width="100" align="center">
                <template slot-scope="scope">
                    <el-tag type="gray" v-if="scope.row.TickState=='0'">未启用</el-tag>
                    <el-tag type="success" v-if="scope.row.TickState=='1'">已启用</el-tag>
                    <el-tag type="warning" v-if="scope.row.TickState=='2'">冻结</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="TickName" label="上架状态" min-width="100" align="center">
                <template slot-scope="scope">
                    <el-tag type="gray" v-if="!scope.row.IsEnable">未上架</el-tag>
                    <el-tag type="success" v-else>已上架</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="200px">
                <template slot-scope="scope">
                    <div v-if="scope.row.TickState=='0' || scope.row.TickState==null">
                        <el-button type="primary" size="mini" icon="edit"
                                   @click="active(scope.row.Id,'1',scope.$index)"> 启用
                        </el-button>
                        <el-button type="primary" size="mini" icon="delete" @click="editRow(scope.row)">编辑</el-button>
                        
                    </div>

                    <div v-if="scope.row.TickState=='1'">
                        <el-button type="primary" size="mini" icon="edit"
                                   @click="active(scope.row.Id,'2',scope.$index)"> 冻结
                        </el-button>
                        <el-button type="primary" size="mini" icon="delete" @click="editRow(scope.row)">编辑</el-button>
                        <!-- <el-button size="mini" v-if="!scope.row.IsEnable" type="primary" @click="onSelf(scope.row.Id,1)">上架</el-button> -->
                        <!-- <el-button size="mini" v-else type="danger" @click="onSelf(scope.row.Id,0)">下架</el-button> -->
                    </div>

                    <div v-if="scope.row.TickState=='2'">
                        <el-button type="primary" size="mini" icon="edit"
                                   @click="active(scope.row.Id,'1',scope.$index)"> 激活
                        </el-button>
                    </div>
                    <el-button type="primary" size="mini" icon="delete" @click="deleteRow(scope.row.Id,scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="block">
            <el-pagination @size-change="pageSizeChange" @current-change="pageIndexChange" :total="dataCount"
                           :current-page.sync="currentPage" :page-size="pageSize" :page-sizes="[10, 20, 50, 100]"
                           layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
        </div>

        <el-dialog title="消费券编辑" :visible.sync="ispopEdit" @close="getTicketsList" size="">
            <pop-edit :data="currentData" :on-close="colseEdit" style="width:950px;" v-if="ispopEdit"></pop-edit>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import PopEdit from './couponEdit'
    import { getTicketsInfoByPage, getSupplierBySupType, GetGoodsByKeywords, delTicket, activeTicket,UpdateTicketsInfoOnSale } from '@/api/myData'
    import './lib/coupon.less'
    import { getCookie } from '@/config/mUtils'
    import {baseImgPath} from "@/config/env"
    export default {
        // name: '',
        components: {
            PopEdit,
        },
        data() {
            return {
                tabLoading:false,
                currentIndex:0,
                url:"",
                date:"",
                loading:false,
                ispopEdit: false,
                filterModel: {
                    tickName: "",
                    ticketsType: "",
                    hospitalCodes: "",
                    projCodes: "",
                    tickState: "0",
                    startDate: "",
                    endDate: "",
                    pageIndex: 1,
                    pageSize: 10,
                    tickState:"",
                    IsEnable:"",
                },

                userInfo: {},
                filterWord: "",
                tableData: [],
                selectData: [],

                dataCount: 0, //总数
                currentPage: 1,   //当前页面index
                pageSize: 20, //每页显示条数
                // states: [
                //     {text: "未启用", code: "0"},
                //     {text: "已启用", code: "1"},
                //     {text: "已冻结", code: "2"},
                // ],
                state: ["0"],
                hospList: [],
                projectList: [],
                currentData: "",

            }
        },

        computed: {
        //     tHeader(){
        //         return ['券种编号', '创建人','创建日期', '券名称', '券类型','医院范围','项目','有效期','售价']
        //     },
        //     filterVal(){
        //         return ['TickInfoCode', 'CreateBy', 'CreateOn', 'TickName', 'TicketsType','HospitalName','ProjectName','validity','Price']
        //     },
        //     tableData1(){
        //         let arr = JSON.parse(JSON.stringify(this.tableData))
        //         arr.forEach(row=>{
        //             row.TicketsType = this.getName(row.TicketsType)
        //             row.validity = this.getData(row)
        //         })
        //         return arr
        //     },
        //     name(){
        //         return "服务者列表"
        //     }
        },

        mounted() {
            this.url = baseImgPath
            // this.getTicketsList()
            this.$nextTick(function () {
                this.dropInfo()
            })
        },

        methods: {
            onSelf(id,state){
               
               let mes= state?"上架":"下架"
                this.$confirm('是否确定'+mes+'?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.UpdateTicketsInfoOnSale(id,state)
                })
            },
            async UpdateTicketsInfoOnSale(id,state){
                
                let res = await UpdateTicketsInfoOnSale({id:id,IsEnable:state})
                if(res.status){
                    this.$message({ type: 'success', message: '添加成功!' })
                    this.getTicketsList()
                }else{
                    this.$message({ type: 'error', message: '添加成功!' + res.errorMessage})
                }
            },

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
                this.tabLoading = true
                this.filterModel.pageIndex = this.currentPage
                this.filterModel.pageSize = this.pageSize
                let res = await getTicketsInfoByPage(this.filterModel)
                this.tableData = []
                if (res instanceof Array) {
                    this.tableData = res
                    if(res.length>0){
                    this.dataCount = parseInt(this.tableData[0]["RecordCount"])
                    }else{
                        this.dataCount = 0
                    }
                }
                this.tabLoading = false
            },

            async dropInfo() {
                this.hospList = await getSupplierBySupType("001")
            },

            // selectState(val,index) {
            //     this.currentIndex = index
            //     this.state = []
            //     this.state.push(val)
            //     this.initFilter()
            //     this.getTicketsList()
            //     this.filterModel.tickState = val
            //     window.event.preventDefault()
            // },
            // initFilter() {
            //     this.filterModel.tickName = ""
            //     this.filterModel.ticketsType = ""
            //     this.filterModel.hospitalCodes = ""
            //     this.filterModel.projCodes = ""
            //     this.filterModel.tickState = ""
            //     this.filterModel.startDate = ""
            //     this.filterModel.endDate = ""
            //     this.filterModel.pageIndex = 1
            //     this.filterModel.pageSize = this.pageSize
            // },

            dateSelect(val){
                if(val.length){
                    val = val.formatDates()
                    this.filterModel.startDate = val.substring(0,10)
                    this.filterModel.endDate = val.substring(13)
                }else{
                    this.filterModel.startDate = ""
                    this.filterModel.endDate = ""
                }
                this.search()
                
            },

            editRow(val) {
                this.currentData = val
                this.ispopEdit = true
            },

            colseEdit() {
                this.ispopEdit = false
            },

            search() {
                this.currentPage = 1
                this.getTicketsList()
            },

            //删除事件
            deleteRow(id, index) {
                this.$confirm('确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteTicket(id, index)
                }).catch(() => {
                    this.$message({type: 'info', message: '已取消删除'})
                })
            },

            async deleteTicket(id, index) {
                let res = await delTicket(id)
                if (res.success > 0) {
                    this.$message({type: 'success', message: '删除成功!'})
                    this.getTicketsList()
                    // this.tableData.splice(index, 1)
                }
                else {
                    this.$message({type: 'warning', message: '删除失败!'})
                }
            },

            active(id, state, index) {
                let str = "启用"
                if (state == 2) str = "冻结"
                this.$confirm('确定' + str + '?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.activeTicket(id, state, index)
                }).catch(() => {
                    this.$message({type: 'info', message: '已取消'})
                })
            },

            async activeTicket(id, state, index) {
                let uid = getCookie("userId")
                let res = await activeTicket(id, state, uid)
                if (res.success && res.success > 0) {
                    // this.tableData.splice(index, 1)
                    this.getTicketsList()
                    this.$message({type: 'success', message: '操作成功!'})
                } else {
                    this.$message({type: 'warning', message: '操作失败!'})
                }
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
