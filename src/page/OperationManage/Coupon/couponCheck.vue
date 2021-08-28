<template>
    <div>
        <div class="select">

            <el-form :inline="true" v-model="filterModel" class="demo-form-inline form_search" label-width="100px">

                <el-form-item label="创建日期："  class="form_item_mt10">
                    <el-date-picker v-model="date" type="daterange" @change="dateSelect" class="form_item_ipt220" placeholder="选择日期范围"></el-date-picker>
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
                        <el-option v-for="(item,$index) in hospList" :key="$index" :label="item.SupplierName" :value="item.Code"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="适用项目：" class="form_item_mt10">
                    <!-- <el-select v-model="filterModel.projCodes" class="form_item_ipt220">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="(item,$index) in projectList" :key="$index" :label="item.Name" :value="item.Id"></el-option>
                    </el-select> -->

                     <el-select
                        v-model="filterModel.projCodes"
                        class="form_item_ipt220"
                        filterable
                        remote
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

      <!--  <el-checkbox-group v-model="state" size="large" :min="1" :max="1" style="margin-bottom:-10px;">
            <el-checkbox-button @click.native="selectState(item.code)" v-for="item in states" :label="item.code" :key="item.code">{{item.text}}</el-checkbox-button>
        </el-checkbox-group>-->
        <ul>
            <li class="shelve" v-for="(item,index) in states" :key="index" :class="{'active':currentIndex===index}" @click="selectState(item.code,index)">{{item.text}}</li>
        </ul>

        <el-table :data="tableData" ref="multipleTable" style="width: 100%;margin-top:10px;margin-bottom:10px;" class="min_table"  v-loading="tabLoading"
                 max-height="1000" border stripe row-key="id">

            <el-table-column prop="TickInfoCode" label="券正面" width="120">
                <template slot-scope="scope">
                    <img :src="url+scope.row.FrontPicUrl" alt="" height="50" width="82">
                </template>
            </el-table-column>
            <el-table-column prop="TickInfoCode" label="券种编号" min-width="100">
            </el-table-column>

            <el-table-column prop="ApplyUserName" label="申请人" min-width="100">
            </el-table-column>

            <el-table-column label="申请日期" min-width="100">
                <template slot-scope="scope">
                    {{ scope.row.ApplyOn && scope.row.ApplyOn.substr(0,10) }}
                </template>
            </el-table-column>

            <el-table-column prop="TickName" label="券名称" min-width="200">
            </el-table-column>

            <el-table-column label="券类型" min-width="100">
                <template slot-scope="scope">
                    <span v-if="scope.row.TicketsType==1">折扣券</span>
                    <span v-if="scope.row.TicketsType==2">代金券</span>
                    <span v-if="scope.row.TicketsType==3">门票</span>
                </template>
            </el-table-column>

            <el-table-column label="有效期" width="170">
                <template slot-scope="scope">
                    <span v-if="scope.row.PrdOfVal!='' && scope.row.PrdOfVal!=null "> {{ '售后'+ scope.row.PrdOfVal +'天'}}</span>
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

            <el-table-column prop="RealPrice" label="售价" min-width="100">
                <template slot-scope="scope">
                    {{ '￥'+scope.row.RealPrice }}
                </template>
            </el-table-column>

            <el-table-column prop="ApplyNum" label="申请数量" min-width="100">
            </el-table-column>

            <el-table-column label="审核" width="100px">
                <template slot-scope="scope" >
                    <el-button :disabled="states[currentIndex].code !=0" type="primary" size="mini" icon="edit" @click="openCheck(scope.row)"> 审核</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="block">
            <el-pagination @size-change="pageSizeChange" @current-change="pageIndexChange"
                           :total="dataCount" :current-page.sync="currentPage" :page-size="pageSize" :page-sizes="[10, 20, 30, 40]" layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
        </div>

        <el-dialog title="消费券审核" :visible.sync="popCheck" size="tiny" :modal="true" top="40%">
            <div style="padding-bottom: 10px;border-bottom:1px solid #ddd">
                <span style="font-size:15px;">申请详情</span>
            </div>
            <div class="flex-box">
                <div class="flex-item">申请编号：{{selectData.ReceiptCode}}</div>
                <div class="flex-item">状态：待审核</div>
                <div class="flex-item">申请人：{{selectData.TickName}}</div>
                <div class="flex-item">申请时间: {{selectData.ApplyOn && selectData.ApplyOn.substr(0,10)}}</div>
                <div class="btn-box">
                    <el-button type="info" @click="popCheck=false ,popOK=true"> 审核通过</el-button>
                    <el-button @click="popCheck=false ,popNo=true">驳回</el-button>
                </div>
            </div>

        </el-dialog>

        <el-dialog title="同意" :visible.sync="popOK" top="40%" size="tiny">
            <div class="row-item">券名称：{{selectData.TickName}}</div>
            <div class="row-item">申请人：{{selectData.BranchCode}}</div>
            <div class="row-item">申请数量：{{selectData.ApplyNum}}</div>
            <div class="btn-box">
                <el-button type="info" @click="check(1)">确认</el-button>
                <el-button @click="cancel">取消</el-button>
            </div>
        </el-dialog>

        <el-dialog title="驳回" :visible.sync="popNo" top="40%" size="tiny">
            <span>券名称：{{selectData.TickName }} </span>
            <span>申请人：{{selectData.BranchCode}}</span>
            <span>申请数量：{{selectData.ApplyNum}}</span>
            <P>驳回原因：</P>
            <el-input type="textarea" :rows="3" placeholder="" v-model="rejectReson">
            </el-input>
            <div class="btn-box">
                <el-button type="info" @click="check(2)">确认驳回</el-button>
                <el-button @click="cancel">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import {baseImgPath} from "@/config/env"
import { getTicketsApply, getSupplierBySupType, updateCheckState ,GetGoodsByKeywords} from '@/api/myData'
import { getCookie } from '@/config/mUtils'
//import './lib/coupon.less'
export default {
    components:{
    },
    data() {
        return {
            currentIndex:0,
            url:"",
            loading:false,
            filterModel: {
                tickName: "",
                ticketsType:"",
                tickState: -1,
                hospitalCodes: "",
                projCodes: "",
                checkState: "0",
                startDate: "",
                endDate: "",
                pageIndex: 1,
                pageSize: 10,
              
            },
            tabLoading:false,
            date:"",
            filterWord: "",
            tableData: [],

            dataCount: 0, //总数
            currentPage: 1,   //当前页面index
            pageSize: 10, //每页显示条数
            states: [
                { text: "审核中", code: "0" },
                { text: "已通过", code: "1" },
                { text: "已驳回", code: "2" },
            ],
            state: ["0"],
            hospList: [],
            projectList: [],
            selectData: "",
            popCheck: false,
            popOK: false,
            popNo: false,
            rejectReson: "", //驳回原因
        }
    },

    computed: {
        // tHeader(){
        //     return ['券种编号','申请人','申请日期','券名称','券类型','医院范围','项目','有效期','售价','申请数量']
        // },
        // filterVal(){
        //     return ['TickInfoCode','ApplyUserName','ApplyOn', 'TickName', 'TicketsType', 'HospitalName', 'ProjectName','validity','Price','ApplyNum']
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
        //     return "消费券审核"
        // }
    },

    mounted() {
        this.url = baseImgPath
        // this.getTicketsList()
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
            this.tabLoading= true
            let res = await getTicketsApply(this.filterModel)
            this.tableData = []
            this.tabLoading = false
            if (res instanceof Array) {
                this.tableData = res
                if(this.tableData.length>0){
                    this.dataCount = parseInt(this.tableData[0]["RecordCount"])
                }else this.dataCount = 0
            }
        },

        async dropInfo() {
            this.hospList = await getSupplierBySupType("001")
        },

        openCheck(val) {
            this.selectData = val
            this.popCheck = true
        },

        dateSelect(val){
            if (val.length != 0) {
                    val = val.formatDates()
                this.filterModel.startDate = val.substring(0, 10)
                this.filterModel.endDate = val.substring(13)
            } else {
                this.filterModel.startDate = ""
                this.filterModel.endDate = ""
            }
            
        },

        async check(val) {
            let param = {
                "id": this.selectData.ApplyId,
                "checkResult": val,

                "rejectReson": val == 2 ? this.rejectReson : "", //驳回原因
                "checkUserCode": getCookie("userId")
            }


            let res = await updateCheckState(param)


            if (res.success > 0) {
                this.$message({ type: 'success', message: '操作成功!' })
            }
            else {
                this.$message({ type: 'warning', message: JSON.stringify(res) })
            }

            this.popOK = false
            this.popNo = false
        },

        cancel() {
            this.popCheck = false
            this.popOK = false
            this.popNo = false
            this.$message({ type: 'info', message: '已取消操作!' })
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

        search() {
            this.currentPage = 1
            this.getTicketsList()
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
@import './lib/coupon.less';
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
    padding-right: 0!important;
}

.el-checkbox-button__inner {
    width: 150px;
}

.flex-box {
    display: flex;
    flex-wrap: wrap; //justify-content: center;
    width: 100%; //height: 300px;
    .flex-item {
        flex: 0 50%;
        margin-top: 10px; //text-align: center;
        //align-self: center;
    }
}

.btn-box {
    text-align: center;
    width: 100%;
    margin-top: 15px;
    button {
        width: 120px;
    }
}

.row-item {
    position: relative;
    font-size: 14px;
    text-align: left;
    margin: 10px;
    left: 30%;
}
</style>
