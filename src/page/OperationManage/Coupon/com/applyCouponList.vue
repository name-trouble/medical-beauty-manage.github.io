<template>
    <div>
        <el-table :data="tableData" ref="multipleTable" style="width: 100%;margin-top:10px;margin-bottom:10px;" border stripe height="600" row-key="id">
        
            <el-table-column prop="TickInfoCode" label="券种编号" width="100">
            </el-table-column>

            <el-table-column prop="CreateOn" label="创建日期" width="120">
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

            <el-table-column prop="HospitalName" label="医院范围" min-width="200">
                <template slot-scope="scope">
                    <!-- <el-tag v-for="(item,index) in scope.row.HospitalName.split(',')" :key="index" type="primary" style="margin: 3px">
                        {{item}}
                    </el-tag> -->
                     <div class="overflow_ell" :title="scope.row.HospitalName">
                        {{scope.row.HospitalName}}
                    </div>
                </template>
            </el-table-column>

            <el-table-column prop="ProjectName" label="项目" min-width="200">
                <template slot-scope="scope">
                    <div class="overflow_ell" :title="scope.row.HospitalName">
                        {{scope.row.ProjectName}}
                    </div>
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

        <el-dialog title="消费券申请" size="small" :modal="false" :visible.sync="isPopApply" @close="getTicketsList">
            <el-form label-width="100px" class="demo-ruleForm" label-position="left">
                <el-form-item label="消费券名称：">
                    <el-tag type="success">{{currentData.TickName}}</el-tag>
                </el-form-item>
                <el-form-item label="申请数量：">
                    <el-input-number v-model="applyNum" :min="1"></el-input-number>
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

import { getTicketsInfoByPage, addTicketsApply } from '@/api/myData'
import { getCookie } from '@/config/mUtils'
export default {
    props: {
        onClose: Function
    },
    data() {
        return {
            saveLoading:false,
            tableData: [],
            isPopApply: false,
            dataCount: 0, //总数
            currentPage: 1,   //当前页面index
            pageSize: 20, //每页显示条数

            filterModel: {
                tickState: 1,
                pageIndex: 1,
                pageSize: 10
            },

            applyNum: 1,
            currentData: "",
        }
    },

    mounted() {
        this.getTicketsList()
    },

    methods: {
        async getTicketsList() {
            this.filterModel.pageIndex = this.currentPage
            this.filterModel.pageSize = this.pageSize

            let res = await getTicketsInfoByPage(this.filterModel)
            this.tableData = []
            if (res instanceof Array) {
                this.tableData = res
                this.dataCount = parseInt(this.tableData[0]["RecordCount"])
            }
        },


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

        },

        async apply() {
            let param = {
                applyNum: this.applyNum,
                applyType:1, // 1.代理商自主申请   2.系统人员手工申请
                ticketsKindCode: this.currentData.TickInfoCode,
                branchCode: getCookie("BranchCode"),
                CreateBy:getCookie("userName"),
                CreateUserId:getCookie("userId"),
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
</style>
