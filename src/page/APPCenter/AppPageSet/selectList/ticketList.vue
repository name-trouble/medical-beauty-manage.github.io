<template>
    <div class="goodsList" style="text-align: left">
        <div class="select">
            <el-form :inline="true" v-model="filterModel" label-width="80px">
                <el-form-item label="券名称：">
                    <el-input v-model="filterModel.tickName" v-on:keyup.enter.native="search"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-button type="info" @click="search" class="searchBtn"> 查询</el-button>
                </el-form-item>
            </el-form>
        </div>

        <el-table :data="tableData" ref="multipleTable" style="width: 100%;margin-top:10px;margin-bottom:10px;" border
                  stripe height="600" row-key="id">
            <el-table-column prop="FrontPicUrl" label="券正面" width="120">
                <template slot-scope="scope">
                    <img :src="url+scope.row.FrontPicUrl" alt="" height="50" width="82">
                </template>
            </el-table-column>
            <el-table-column prop="TickInfoCode" label="券种编号" width="120">
            </el-table-column>
            <el-table-column prop="TickName" label="券名称" min-width="100">
            </el-table-column>
            <el-table-column label="券类型" min-width="60">
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

            <el-table-column label="有效期" width="160">
                <template slot-scope="scope">
                    <span v-if="scope.row.PrdOfVal!='' && (scope.row.PrdOfVal+'')!='null' "> {{ '售后'+ scope.row.PrdOfVal +'天'}}</span>
                    <div v-else>
                        <p>开始：{{ scope.row.StartDate&&scope.row.StartDate.substr(0,10) }} </p>
                        <p>结束：{{ scope.row.EndDate&&scope.row.EndDate.substr(0,10) }} </p>
                    </div>
                </template>
            </el-table-column>

            <el-table-column prop="Price" label="售价" width="100">
                <template slot-scope="scope">
                    {{ '￥'+scope.row.Price }}
                </template>
            </el-table-column>

             <el-table-column prop="ApplyNum" label="操作" min-width="160" align="center">
                <template slot-scope="scope">
                    <el-button  size="mini" icon="edit" @click="select(scope)"> 选择</el-button>
                    <!-- <el-button  size="mini" icon="delete" @click="unSelect(scope.$index)">取消选择</el-button> -->
                </template>
            </el-table-column>
        </el-table>

        <div class="block">
            <el-pagination @size-change="pageSizeChange" @current-change="pageIndexChange" :total="dataCount"
                           :current-page.sync="currentPage" :page-size="pageSize" :page-sizes="[10, 20, 50, 100]"
                           layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
        </div>

       
    </div>
</template>

<script type="text/ecmascript-6">

    import { getTicketsInfoByPage, getSupplierBySupType, getProjectAll, delTicket, activeTicket } from '@/api/myData'
    // import './lib/coupon.less'
    import { getCookie } from '@/config/mUtils'
    import {baseImgPath} from "@/config/env"
    export default {
        // name: '',
        components: {
            
        },
        data() {
            return {
                currentIndex:0,
                url:"",
                date:"",
             /*   options4: [],
                value9: [],
                list: [],
                loading: false,*/
                ispopEdit: false,
                filterModel: {
                    tickName: "",
                    ticketsType: "",
                    hospitalCodes: "",
                    projCodes: "",
                    tickState: "",
                    startDate: "",
                    endDate: "",
                    pageIndex: 1,
                    pageSize: 10,
                    IsEnable:1,//1上架
                },

                userInfo: {},
                filterWord: "",
                tableData: [],
                selectData: [],

                dataCount: 0, //总数
                currentPage: 1,   //当前页面index
                pageSize: 20, //每页显示条数
                states: [
                    {text: "未启用", code: "0"},
                    {text: "已启用", code: "1"},
                    {text: "已冻结", code: "2"},
                ],
                state: ["0"],
                hospList: [],
                projectList: [],
                currentData: "",

            }
        },

        computed: {
            tHeader(){
                return ['券种编号', '创建人','创建日期', '券名称', '券类型','医院范围','项目','有效期','售价']
            },
            filterVal(){
                return ['TickInfoCode', 'CreateBy', 'CreateOn', 'TickName', 'TicketsType','HospitalName','ProjectName','validity','Price']
            },
            tableData1(){
                let arr = JSON.parse(JSON.stringify(this.tableData))
                arr.forEach(row=>{
                    row.TicketsType = this.getName(row.TicketsType)
                    row.validity = this.getData(row)
                })
                return arr
            },
            name(){
                return "服务者列表"
            }
        },

        mounted() {
            this.url = baseImgPath
            this.getTicketsList()
            this.$nextTick(function () {
                this.dropInfo()
            })
        },

        methods: {
            select(item) {
                // item.column.type='primary';
                this.$emit('TicketSelectInfo',item.row.Id, item.row.FrontPicUrl,item.row.TickName)
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
                this.filterModel.tickState = ''
                this.filterModel.pageIndex = this.currentPage
                this.filterModel.pageSize = this.pageSize

                let res = await getTicketsInfoByPage(this.filterModel)
                this.tableData = []
                if (res instanceof Array) {
                    this.tableData = res
                    this.dataCount = parseInt(this.tableData[0]["RecordCount"])
                }
            },

            async dropInfo() {
                this.hospList = await getSupplierBySupType("001")
                console.log('医院', this.hospList)
                this.projectList = await getProjectAll()
                console.log('项目', this.projectList)
            },

            selectState(val,index) {
                this.currentIndex = index
                this.state = []
                this.state.push(val)
                this.initFilter()
                this.getTicketsList()
                this.filterModel.tickState = val
                window.event.preventDefault()
            },
            initFilter() {
                this.filterModel.tickName = ""
                this.filterModel.ticketsType = ""
                this.filterModel.hospitalCodes = ""
                this.filterModel.projCodes = ""
                this.filterModel.tickState = ""
                this.filterModel.startDate = ""
                this.filterModel.endDate = ""
                this.filterModel.pageIndex = 1
                this.filterModel.pageSize = this.pageSize
            },

            dateSelect(val){
                if(val.length!=0){
                    this.filterModel.startDate = val.substring(0,10)
                    this.filterModel.endDate = val.substring(13)
                }else{
                    this.filterModel.startDate = ""
                    this.filterModel.endDate = ""
                }
                
            },

            editRow(val) {
                this.currentData = val
                this.ispopEdit = true
            },

            colseEdit() {
                this.ispopEdit = false
            },

            search() {
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
                    this.tableData.splice(index, 1)
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
                    this.tableData.splice(index, 1)
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
            submited(res) {
            },
            remoteMethod(query) {
                if (query !== '') {
                    this.loading = true;
                    setTimeout(() => {
                        this.loading = false;
                        this.options4 = this.list.filter(item => {
                            return item.label.toLowerCase()
                                    .indexOf(query.toLowerCase()) > -1;
                        });
                    }, 200);
                } else {
                    this.options4 = [];
                }
            }
        }

    }
</script>

<style lang="less" scoped>
    .select {
      
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
        margin-right: 30px;
        padding-right: 0 !important;
    }

    .el-checkbox-button__inner {
        width: 150px;
    }

</style>
