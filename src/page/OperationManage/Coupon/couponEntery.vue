<template>
    <div>
        <div class="select">
            <el-form :inline="true" v-model="filterModel" class="demo-form-inline" label-width="100px">

                <el-form-item label="申请日期：" class="form_item_mt10">
                    <el-date-picker v-model="date" type="daterange" @change="dateSelect" class="form_item_ipt220" placeholder="选择日期范围"></el-date-picker>
                </el-form-item>

                <el-form-item label="关键字：" class="form_item_mt10">
                    <el-input v-model="filterModel.tickName" placeholder="券种编号/申请人/券名" class="form_item_ipt220" v-on:keyup.enter.native="search"></el-input>
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

                <el-form-item label="录入状态：" class="form_item_mt10">
                    <el-select v-model="filterModel.inputState" class="form_item_ipt220" @change="search">
                        <el-option label="未完成" value="0"></el-option>
                        <el-option label="已完成" value="1"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label=" " class="form_item_mt10">
                    <el-button type="primary" icon="search" @click="search" class="searchBtn">查询</el-button>
                </el-form-item>
            </el-form>
        </div>

        <el-table :data="tableData" ref="multipleTable" style="width: 100%;margin-top:10px;margin-bottom:10px;" v-loading="tabLoading" border stripe row-key="id"  class="min_table">
            <el-table-column prop="TickInfoCode" label="券正面" width="100">
                <template slot-scope="scope">
                    <img :src="url+scope.row.FrontPicUrl" alt="" height="50" width="82">
                </template>
            </el-table-column>

            <el-table-column prop="TickInfoCode" label="券种编号" min-width="90">
            </el-table-column>

            <el-table-column prop="ApplyUserName" label="申请人" min-width="80">
            </el-table-column>

            <el-table-column label="申请日期" min-width="90">
                <template slot-scope="scope">
                    {{ scope.row.ApplyOn && scope.row.ApplyOn.substr(0,10) }}
                </template>
            </el-table-column>
            <el-table-column label="最近录入日期" min-width="100">
                <template slot-scope="scope">
                    {{ scope.row.LastWriteDate && scope.row.LastWriteDate.substr(0,10)}}
                </template>
            </el-table-column>

            <el-table-column prop="TickName" label="券名称" min-width="160" show-overflow-tooltip>
            </el-table-column>

            <el-table-column label="券类型" min-width="80">
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
                    <span v-if="scope.row.PrdOfVal!='' && scope.row.PrdOfVal!=null "> {{ '售后'+ scope.row.PrdOfVal +'天'}}</span>
                    <span v-else>
                        开始时间：
                        <span v-if="scope.row.StartDate">
                            {{scope.row.StartDate.substring(0,10)}}
                        </span><br/> 结束时间：
                        <span v-if="scope.row.EndDate">
                            {{scope.row.EndDate.substring(0,10)}}
                        </span>
                    </span>
                </template>
            </el-table-column>

            <el-table-column prop="RealPrice" label="售价" min-width="80">
                <template slot-scope="scope">
                    {{ '￥'+scope.row.RealPrice }}
                </template>
            </el-table-column>

            <el-table-column prop="ApplyNum" label="申请数量" width="80"></el-table-column>

            <el-table-column prop="TotInputNum" label="录入数量" width="80"></el-table-column>
            <el-table-column prop="ApplyCreateBy" label="创建人" width="90"></el-table-column>
            <el-table-column prop="TotalAmount" label="总价" width="80">
                <template slot-scope="scope">{{scope.row.TotalAmount.toQFW()}}</template>
            </el-table-column>
            <el-table-column prop="PayAmount" label="支付金额" width="80">
                <template slot-scope="scope">{{scope.row.PayAmount.toQFW()}}</template>
            </el-table-column>
            <el-table-column prop="IsPayOff" label="是否付清" width="90">
                <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.IsPayOff==1">已付清</el-tag>
                    <el-tag type="danger" v-if="scope.row.IsPayOff==0">未付清</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="Memo" label="备注" min-width="100" show-overflow-tooltip> </el-table-column>
            <el-table-column label="操作" min-width="310px" fixed="right">
                <template slot-scope="scope">
                    <el-button v-show="scope.row.checkState!=0" type="primary" size="small" @click="openCheck(scope.row)"> 录入券号</el-button>
                    <el-button type="primary" size="small" @click="viewTick(scope.$index,tableData)"> 查看券号</el-button>
                    <el-button type="primary" size="small" @click="pay(scope.$index,tableData)"> 支付</el-button>
                    <el-button type="warning" size="small" @click="reback(scope.$index,tableData)"> 退换券</el-button>
                    <el-button type="danger" size="small" @click="delC(scope.row,scope.$index)">删除</el-button>
                </template>
            </el-table-column>
            
        </el-table>

        <div class="block">
            <el-pagination @size-change="pageSizeChange" @current-change="pageIndexChange" :total="dataCount" :current-page.sync="currentPage" :page-size="pageSize" :page-sizes="[10, 20, 30, 40]" layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
        </div>

        <el-dialog title="录入券号" :visible.sync="popEntery" :modal="true" top="12%" size="">
            <pop-entery :data="selectData" :on-finish="finish" style="width:680px"></pop-entery>
        </el-dialog>

        <el-dialog title="录入券号" :visible.sync="view" :modal="true" top="12%" size="">
            <ul style="width:485px;min-height: 300px;max-height:600px;overflow:auto">
                <el-tag v-for="(tag,index) in entryCodes" :key="tag.name" :type="tag.type" style="margin:0 5px 0 0;width: 155px;height:36px;background:#fff;border:none" class="right_tag" >
                    <el-button @click="edit(index,tag.TicketsCode)" style="width:155px;text-align:left" v-if="!tag.edit" :type="tag.type">
                        {{tag.TicketsCode}}<i v-if="tag.IsUsed != 1" class="el-icon-edit el-icon--right"></i>
                    </el-button>
                    <el-input v-focus="focus" v-model="editTag" focus v-on:keyup.enter.native="sure(index,tag.TicketsCode)" v-if="tag.edit" @blur="blur(index,tag.TicketsCode)"></el-input>
                </el-tag>
            </ul>
            <span style="color:red">
                点击券号进行编辑，按回车键确定
            </span>
        </el-dialog>
        <el-dialog title="支付信息" :visible.sync="payDialog" :modal="true" top="12%" size="">
            <pay :mes="mes" @popAddClose="popAddClose" v-if="payDialog" style="width:750px"></pay>
        </el-dialog>

        <el-dialog title="退换" :visible.sync="rebackDialog" :modal="true" top="12%" size="">
            <reback :mes="mes" @popAddClose="popAddClose" v-if="rebackDialog" style="width:750px"></reback>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
import { baseImgPath } from "@/config/env"
import { getTicketsApply, getSupplierBySupType, GetGoodsByKeywords, updateCheckState, getTicketsApplySubAll,ModifyTicketsApplySub,DeleteTicketApply } from '@/api/myData'
import { getCookie } from '@/config/mUtils'
import './lib/coupon.less'
import popEntery from './com/entery'
import pay from "./com/payDialog.vue"
import reback from "./com/reback.vue"
import Vue from "vue"
Vue.directive('focus', function (el, option) {
        var defClass = 'el-input', defTag = 'input';
        var value = option.value || true;
        if (typeof value === 'boolean')
            value = { cls: defClass, tag: defTag, foc: value };
        else
            value = { cls: value.cls || defClass, tag: value.tag || defTag, foc: value.foc || false };
        if (el.classList.contains(value.cls) && value.foc)
            el.getElementsByTagName(value.tag)[0].focus();
    });
export default {
    components: { popEntery, 
    pay,reback },
    data() {
        return {
            mes:"",
            currentIndex: 0,
            url: "",
            loading:false,
            tabLoading:false,
            entryCodes: [],
            filterModel: {
                tickName: "",
                ticketsType: "",
                tickState: -1,
                hospitalCodes: "",
                projCodes: "",
                checkState: 1,
                startDate: "",
                endDate: "",
                pageIndex: 1,
                pageSize: 10,
                keywords:"",
                inputState:"0"
            },
            rebackDialog:false,
            view: false,
            payDialog:false,
            date: "",
            filterWord: "",
            tableData: [],

            dataCount: 0, //总数
            currentPage: 1,   //当前页面index
            pageSize: 10, //每页显示条数
            state: ["0"],
            showEdit: true,
            hospList: [],
            projectList: [],
            selectData: "",
            popEntery: false,
            editTag:"",
            focus:false,
        }
    },

    computed: {
        // tHeader() {
        //     return ['券种编号', '申请人', '申请日期', '券名称', '券类型', '医院范围', '项目', '有效期', '售价', '申请数量']
        // },
        // filterVal() {
        //     return ['TickInfoCode', 'ApplyUserName', 'ApplyOn', 'TickName', 'TicketsType', 'HospitalName', 'ProjectName', 'validity', 'Price', 'ApplyNum']
        // },
        // tableData1() {
        //     let arr = JSON.parse(JSON.stringify(this.tableData))
        //     arr.forEach(row => {
        //         row.TicketsType = this.getName(row.TicketsType)
        //         row.validity = this.getData(row)
        //     })
        //     return arr
        // },
        // name() {
        //     return "录入券号"
        // }
    },

    mounted() {
        this.url = baseImgPath
        // this.getTicketsList()
        this.$nextTick(function() {
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
        getName(data) {
            switch (data) {
                case 1: return '折扣券';
                case 2: return '代金券';
                case 3: return '门票';
            }
        },
        getData(data) {
            if (data.PrdOfVal != '' && (data.PrdOfVal + '') != 'null') {
                return '售后' + data.PrdOfVal + '天'
            } else {
                if (data.StartDate && data.EndDate) {
                    return "开始：" + data.StartDate.substr(0, 10) + '结束：' + data.EndDate.substr(0, 10)
                } else {
                    return ""
                }
            }
        },
        viewTick(index, data) {
            this.view = true
            this.getTicketsApplySubAll(data[index].ReceiptCode)
        },
        async getTicketsApplySubAll(id) {
            let res = await getTicketsApplySubAll(id)
            res.forEach(row=>{
                row.edit = false
                row.type = row.IsUsed == 0?"primary":"warning"
            })
            this.entryCodes  = res
        },
        async getTicketsList() {
            // this.filterModel.inputState = this.state[0]
            
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

        openCheck(val) {
            
            this.selectData = val
            this.popEntery = true
        },

        finish() {
            
            this.getTicketsList()
            this.popEntery = false
        },

        // selectState(val, index) {
        //     this.currentIndex = index
        //     this.state = []
        //     this.state.push(val)
        //     this.initFilter()
        //     this.getTicketsList()
        //     window.event.preventDefault()
        // },
        initFilter() {
            this.filterModel.tickName = ""
            this.filterModel.ticketsType = ""
            this.filterModel.hospitalCodes = ""
            this.filterModel.projCodes = ""
            this.filterModel.startDate = ""
            this.filterModel.endDate = ""
            this.filterModel.pageIndex = 1
            this.filterModel.pageSize = this.pageSize
        },

        dateSelect(val) {
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

        search() {
            this.filterModel.pageIndex = 1
            this.getTicketsList()
        },

        pageIndexChange(index) {
            
            this.currentPage = index
            this.filterModel.pageIndex = index
            this.getTicketsList()
        },

        pageSizeChange(size) {
            this.filterModel.pageSize = size
            this.getTicketsList()
        },

        init() {
            this.getTicketsList()
            this.currentPage = 1
        },
        submited(res) {
        },
        pay(index,data){
            this.payDialog = true
            this.mes = data[index]
        },
        reback(index,data){
            this.rebackDialog = true
            this.mes = data[index]
        },
        popAddClose(val){
            this.payDialog = false
            this.rebackDialog = false
            if(val){
                this.getTicketsList()
            }
        },
        edit(index,name){
            if(this.entryCodes[index].IsUsed == 0){
                this.loseF()
                this.index = index
                this.entryCodes[index].edit = true
                this.editTag = JSON.parse(JSON.stringify(name))
                this.entryCodes.push()
                this.focus = true
            }
        },
        sure(index,name){
            this.entryCodes[index].edit = false
            this.entryCodes.push()
            this.focus = false
            this.ModifyTicketsApplySub({
                TicketsCode:this.editTag,
                id:this.entryCodes[index].Id
            },index)
        },
        blur(index){
            this.entryCodes[index].edit = false
            this.entryCodes.push()
            this.focus = false
        },
        loseF(){
            this.entryCodes.forEach(row=>{
                row.edit = false
            })
        },
        async ModifyTicketsApplySub(params,index){
            let res = await ModifyTicketsApplySub(params)
            if(res.status){
                this.entryCodes[index].TicketsCode = this.editTag
                this.$message({ type: 'success', message: '修改成功!' })
            }else{
                this.$message({ type: 'danger', message: '修改失败!'+res.errorMessage })
            }
        },
        
        async delC(data,index){
            this.$confirm('确认删除该券信息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.DeleteTicketApply(data.ApplyId)
            }).catch(() => {
                          
            });
            
        },
        async DeleteTicketApply(id){
             let res = await DeleteTicketApply({id:id})
            if(res.status){
                this.$message({ type: 'success', message: '删除成功!' })
                this.search()
            }else{
                this.$message({ type: 'error', message: '删除失败!'+res.errorMessage })
            }
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
    padding-right: 0!important;
}
</style>
