<template>
    <div>
        <el-checkbox-group v-model="state" size="large" :min="1" :max="1" style="margin-bottom:10px;">
            <!-- <el-checkbox-button @click.native="selectState(item.code)" v-for="item in states" :label="item.code" :key="item.code">
                <span>{{item.text}}</span>
            </el-checkbox-button> -->
            <ul style="display: inline-block">
                <li class="shelve" v-for="(item,index) in states" :key="index" :class="{'active':currentIndex===index}" @click="selectState(item.code,index)">{{item.text}}</li>
            </ul>
            <div style="display: inline-block">
                <span style="margin:0 10px;">关键字:</span>
                <el-input  style="width:300px;" v-model="keyWord" @keyup.enter.native="search" placeholder="用户名/手机号码/真是姓名"></el-input>
                <el-button  icon="search" @click="search" class="searchBtn">查询</el-button>
            </div>
            
        </el-checkbox-group>

        <el-table v-show="state==1" :data="branchList" class="min_table smt" v-loading="loading"
         ref="multipleTable" max-height="500" style="margin:10px 0;width:820px;" border row-key="id" @row-click="rowClick" highlight-current-row>
            <el-table-column prop="realName" label="状态" min-width="70">
                <template slot-scope="scope">
                    <input type="checkbox" :checked="scope.row.Id==selectId">
                </template>
            </el-table-column>
            <el-table-column prop="Code" label="编号" min-width="100"></el-table-column>

            <el-table-column prop="BranchName" label="名称" min-width="120"></el-table-column>

            <el-table-column prop="BranchGradeName" label="代理等级" min-width="120"></el-table-column>

            <el-table-column label="性别" min-width="120">
                <template slot-scope="scope">
                    {{ scope.row.Sex==1?"男":"女"}}
                </template>
            </el-table-column>

            <el-table-column prop="PhoneNumber" label="联系方式" min-width="120"></el-table-column>

        </el-table>

        <el-table v-show="state==2" :data="tableData" ref="multipleTable" class="min_table smt"
         max-height="500" style="margin:10px 0;width:100%;" border row-key="id" @row-click="rowClick" highlight-current-row>
            <el-table-column prop="realName" label="状态" min-width="70">
                <template slot-scope="scope">
                    <input type="checkbox" :checked="scope.row.Id==selectId">
                </template>
            </el-table-column>

            <el-table-column prop="realName" label="头像" min-width="100">
                <template slot-scope="scope">
                    <img v-bind:src="baseImgPath+scope.row.ImgUrl" style="margin-top:5px;height:50px;width:50px;">
                </template>
            </el-table-column>

            <el-table-column prop="Code" label="编号" min-width="100"></el-table-column>

            <el-table-column prop="ServiceName" label="姓名" min-width="120"></el-table-column>

            <el-table-column prop="HospitalName" label="所属医院" min-width="170"></el-table-column>

            <el-table-column prop="SerTypeName" label="职位" min-width="120"></el-table-column>

            <el-table-column prop="TitleName" label="职称" min-width="120"></el-table-column>

        </el-table>

        <div class="block">
            <el-pagination @size-change="pageSizeChange" @current-change="pageIndexChange" :total="state==1?dataCount_branch:dataCount_user" :current-page.sync="currentPage" :page-size="pageSize" row-class-name="tbRow" :page-sizes="[10, 20, 50]" layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
        </div>

        <div class="btn-box">
            <el-button class="" type="info" @click="finish(1)" style="width:120px;">确认</el-button>
            <el-button @click="finish(0)" style="width:120px;">取消</el-button>
        </div>

    </div>
</template>
<script>
import { getServiceManAllByPage, GetBranchByConditions } from '@/api/myData'
import { baseImgPath } from '@/config/env'
export default {
    props: {},
    data() {
        return {
            baseImgPath,
            selectId: "",
            selectCode: "",
            tableData: [],
            Data: [],
            dataCount_user: 0, //总数
            dataCount_branch: 0,
            currentPage: 1,   //当前页面index
            pageSize: 10,  //每页显示条数

            states: [
                { text: "服务者", code: "2" },
                { text: "代理商", code: "1" }
            ],
            state: ["2"],
            branchList: [], //代理商列表
            realName: "",

            keyWord: "",
            currentIndex:0,
            loading:false,
        }
    },



    created() {
        this.getUserInfo()
    },
    methods: {

        async getUserInfo() {
            let data = {
                pageIndex: this.currentPage,
                pageSize: this.pageSize,
                serviceName: this.keyWord
            }
            this.tableData = await getServiceManAllByPage(data)
            this.loading = false
            this.dataCount_user = parseInt(this.tableData[0]["RecordCount"])
        },

        selectState(val,index) {
            this.currentIndex = index
            this.state = []
            this.state.push(val)
            if (val === "1" && this.branchList.length === 0) {
                this.currentPage = 1   //当前页面index
                this.pageSize = 10  //每页显示条数
                this.keyWord = ""
                this.getBranch()
            }
        },

        async getBranch() {
            let data = {
                pageIndex: this.currentPage,
                pageSize: this.pageSize,
                branchName: this.keyWord
            }
            this.branchList = await GetBranchByConditions(data)
            this.loading = false
            this.dataCount_branch = parseInt(this.branchList[0]["RecordCount"])
        },

        //row单击事件
        rowClick(row, event, column) {

            this.selectId = row.Id
            this.selectCode = row.Code
            this.realName = row["ServiceName"] || row["BranchName"]
        },

        pageIndexChange(index) {
            this.getData()
        },

        pageSizeChange(size) {
            this.pageSize = size
            this.getData()
        },

        init() {
            this.currentPage = 1
            this.getData()
        },

        getData() {
            this.loading = true
            if (this.state == 1) this.getBranch()
            else this.getUserInfo()
        },

        finish(val) {
            this.$emit('onFinish', { code: this.selectCode, name: this.realName, type: this.state[0]}, val)
        },

        //关键字查询
        search() {
            this.currentPage = 1   //当前页面index
            this.pageSize = 10  //每页显示条数
            this.getData()
        },
    },
}
</script>

<style scoped>
.block {
    text-align: right;
    display: inline-block
}

.btn-box {
    text-align: center;
}
</style>

