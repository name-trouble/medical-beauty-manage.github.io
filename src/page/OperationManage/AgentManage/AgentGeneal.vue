<template>
    <div class="selCommon AgentGeneal">
        <!-- 查询信息 -->
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px">
            <el-form-item label="选择时间：" style='margin-bottom:10px;font-size:12px !important;'>
                <el-date-picker
                    v-model="date"
                    type="daterange"
                    @change="dateSelect"
                    placeholder="选择日期范围">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="推荐人：" class="form_item_mt10">
                <el-input v-model="formInline.referrerName" placeholder="" style="width: 200px;" v-on:keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            <el-form-item label="代理人：" class="form_item_mt10">
                <el-input v-model="formInline.branchName" placeholder="" style="width: 200px;" v-on:keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            <el-form-item label="代理等级：" class="form_item_mt10">
                <el-select v-model="formInline.grade" placeholder="请选择" style='width:200px;' @change="onSubmit">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in gradeList" :label="item.BranchGradeName" :value="item.Code"
                               :key="item.Code"></el-option>
                </el-select>
            </el-form-item>

           <el-form-item label="医院：" class="form_item_mt10">
                <el-select v-model="formInline.hospital"  style='width:200px;' @change="onSubmit">
                    <el-option v-for="(item,index) in hospitalList" :key="index" :label="item.supplierName" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="来源渠道：" class="form_item_mt10">
                <el-select v-model="formInline.region" placeholder="请选择" style='width:200px;' @change="onSubmit">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in origionList" :label="item.DataName" :value="item.DataName" :key="item.DataName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label=" " class="form_item_mt10">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
            </el-form-item>
        </el-form>
        <!-- 查询信息 -->

        <!-- 信息表 -->
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" max-height="560" class="min_table" v-loading="loading">
            <el-table-column prop="BranchName" label="代理人" width="200">
                <template slot-scope="scope">
                    <el-button type="text" @click="view(scope.row)" v-if="scope.row.BranchName">{{scope.row.BranchName}}[{{scope.row.Code}}]</el-button>
                </template>
            </el-table-column>
             <el-table-column prop="ReferrerName" label="推荐人" width="200">
                <template slot-scope="scope">
                    <span v-if="scope.row.ReferrerName">
                       {{scope.row.ReferrerName}}{{scope.row.ReferrerCode|filterFun}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="RegistDate" label="注册日期" min-width="120">
                <template slot-scope="scope">
                    <span v-if="scope.row.RegistDate">
                        {{scope.row.RegistDate.substring(0,10)}}
                    </span>
                </template>
            </el-table-column>
            
           
             <el-table-column prop="CCount" label="直推人数" width="100"></el-table-column>
            <el-table-column prop="TeamCount" label="团队人数" width="120">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.TeamCount!=0" @click="team(scope.$index,tableData)" type="text"> {{scope.row.TeamCount}}</el-button>
                    <span v-else>
                        {{scope.row.TeamCount}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="PhoneNumber" label="联系电话" min-width="120">
                 <template slot-scope="scope">
                    <span v-if="scope.row.PhoneNumber">{{scope.row.PhoneNumber.substring(0,3)+'****'+scope.row.PhoneNumber.substring(7)}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="SourcWayeCode" label="来源渠道" min-width="150"></el-table-column>
            <el-table-column prop="BranchGradeName" label="代理等级" width="150"></el-table-column>
           <el-table-column prop="HospitalName" label="医院" width="200"></el-table-column>
            <el-table-column prop="grade" label="团队详情" width="120">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="team(scope.$index,tableData)" >团队详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 信息表 -->

        <!-- 分页 -->
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="size"
                           layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <!-- 分页 -->

        <!--嵌套窗口 -->
        <el-dialog :title="title" :visible.sync="dialogFormVisible" size=''>
            <teamDetail :title="title" :teamMes="teamMes" :gradeList="gradeList" :teamCount="teamCount"
                        style="width: 1000px" v-if="dialogFormVisible" @viewBranch='view'></teamDetail>
        </el-dialog>
        <!-- 嵌套窗口 -->

         <el-dialog title="代理详情" :visible.sync="dialogDet" size='' :close-on-click-modal="false"  top="5%">
            <agentDetail ref="detail" style="width: 920px" :detailCode="detailCode"></agentDetail>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import "@/style/selfCommon.less"
    import teamDetail from "./components/teamDetail.vue"
    import agentDetail from "./components/agentDetail.vue"
    import {GetBranchTeamList,GetBaseDataAll,GetBranchGradeAll,GetDropDownPermission} from "@/api/myData"
    export default {
        // name: 'AgentGeneal',
        data() {
            return {
                detailCode:"",
                dialogDet:false,
                loading:false,
                teamMes: "",
                teamCount: "",
                bankList: [],//004
                eduList: [],//001
                industryList: [],//002
                origionList: [],//003来源
                gradeList: [],
                currentPage: 1,
                total: 0,
                size: 10,
                title: "",
                dialogFormVisible: false,
                formLabelWidth: '90px',
                date: "",
                hospitalList:[],
                formInline: {
                    date1: '',
                    date2: '',
                    grade: '',
                    referrerName: "",
                    branchName: "",
                    region: "",
                    hospital:""
                },
                tableData: []
            }
        },
        filters: {
            filterFun(value){
                if (value && String(value).length != 0) {
                    let referrer = "[" + value + "]"
                    return referrer
                } else {
                    return ""
                }
            }
        },
        computed: {
            /* 导出报表参数 tHeader,filterVal,tableData1*/
            // tHeader(){
            //     return ['代理编号', '注册日期', '代理人', '联系电话', '身份证号', '来源渠道', '代理等级', '缴纳会费', '缴纳押金', '推荐人', '团队人数']
            // },
            // filterVal(){
            //     return ['Code', 'RegistDate', 'BranchName', 'PhoneNumber', 'IDCard', 'SourcWayeCode', 'BranchGradeCode', 'PayAmount', 'Pledge', 'ReferrerName', 'TeamCount']
            // },
            // tableData1(){
            //     return this.tableData
            // },
            // name(){
            //     return '代理管理'
            // },
            /*导出报表参数 tHeader,filterVal,tableData1*/
        },
        mounted: function () {
            this.getBranchGradeAll()
        },
        methods: {
            //获取所有代理等级
            async getBranchGradeAll(){
                try {
                    let [res1,res,baseData] = await Promise.all([GetDropDownPermission({typeId: 1}),GetBranchGradeAll(),GetBaseDataAll()])
                    this.hospitalList = res1.data
                    this.formInline.hospital = this.hospitalList[0].code
                    this.gradeList = res
                    this.baseMesSplit(baseData)
                } catch (err) {
                    console.log(err)
                }
            },
            //            条件查询
            async getBranchTeamList(params, index){
                try {
                    let res = await GetBranchTeamList(params)
                    this.loading = false
                    if (index) {
                    } else {
                        this.tableData = res
                        this.tableData.push()
                        if (res.length != 0) {
                            this.total = res[0].RecordCount
                        }else{
                            this.total = 0
                        }
                    }
                } catch (err) {
                    console.log(err)
                }
            },

            dateSelect(val){
                if (val.length) {
                    val = val.formatDates()
                    this.formInline.date1 = val.substring(0, 10)
                    this.formInline.date2 = val.substring(13)
                } else {
                    this.formInline.date1 = ""
                    this.formInline.date2 = ""
                }
                this.onSubmit()
            },

            // 条件查询
            onSubmit() {
                this.currentPage = 1
                this.getTableDate()
            },

            // 分页页面展示数据条数改变触发事件
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.size = val
                this.getTableDate()
            },

            // 分页当前页码改变触发事件
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val
                this.getTableDate()
            },

            team(index, data){
                this.teamMes = data[index].Code
                this.dialogFormVisible = true
                this.title = data[index].BranchName + "的团队"
                this.teamCount = data[index].TeamCount
            },
            //            基础信息分离
            baseMesSplit(data){
                data.forEach(row=> {
                    if (row.BusinessCode == "0001") {
                        this.eduList.push(row)
                    }
                    if (row.BusinessCode == "0002") {
                        this.industryList.push(row)
                    }
                    if (row.BusinessCode == "0003") {
                        this.origionList.push(row)
                    }
                    if (row.BusinessCode == "0004") {
                        this.bankList.push(row)
                    }
                })
            },
            getTableDate(){
                this.loading = true
                this.getBranchTeamList({
                    referrerName: this.formInline.referrerName.removeSP(),
                    branchName: this.formInline.branchName.removeSP(),
                    branchGradeCode: this.formInline.grade,
                    sourcWayeCode: this.formInline.region,
                    startDate: this.formInline.date1,
                    endDate: this.formInline.date2,
                    pageIndex: this.currentPage,
                    pageSize: this.size,
                    hospitalCode:this.formInline.hospital
                })
            },
            view(data){
                this.dialogDet = true
                this.detailCode = data.Code
            }
        },
        components: {
            teamDetail,
            agentDetail
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
