<template>
    <div class="rechargeList selCommon">
        <el-form :inline="true" :model="form" class="demo-form-inline form_search" >
            <el-form-item label="关键字：" class="form_item_mt10" label-width="80px">
                <el-input v-model="form.keyWords" style="width: 200px;" placeholder="姓名/编号/卡号/手机号"  v-on:keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            <el-form-item label="医院:" class="form_item_mt10"  label-width="80px">
                <el-select v-model="form.hospital"  style='width:200px;' @change="onSubmit">
                    <el-option v-for="(item,index) in hospitalList" :key="index" :label="item.supplierName" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="充值时间:" class="form_item_mt10"  label-width="80px">
                <el-date-picker  v-model="date"  type="daterange"  @change="dateSelect"  style="width: 200px" placeholder="选择日期范围"> </el-date-picker>
            </el-form-item> 
            <el-form-item label="类型:" class="form_item_mt10"  label-width="80px">
                <el-select v-model="form.payType"  style='width:200px;' @change="onSubmit">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="预付款" value="1"></el-option>
                    <el-option label="医院积分" value="2"></el-option>
                    <el-option label="纹绣积分" value="3"></el-option>
                    <el-option label="APP积分" value="4"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="" class="form_item_mt10">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
                <!-- <el-button @click="add" class="searchBtn">账户充值</el-button> -->
                <!-- <el-button @click="exportEX" class="searchBtn" :loading="portLoading">导出报表</el-button>
                <Export :tHeader="tHeader" ref="export" :filterVal=' filterVal' :tableData1='reportData' :name='reportName' v-show="false"></Export> -->
            </el-form-item>
        </el-form>
        <!-- 信息表 -->
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" class="min_table smt" v-loading="loading">
            <el-table-column prop="branchName" label="账户" min-width="150">
                <template slot-scope="scope">
                    <span v-if="scope.row.branchName">{{scope.row.branchName}}[{{scope.row.branchCode}}]</span>
                </template>
            </el-table-column>
            <el-table-column prop="hospitalName" label="医院" min-width="150"></el-table-column>
            <el-table-column prop="remainSystemPoints" label="医院积分" min-width="80"></el-table-column>
            <!-- 纹绣积分未开辟新字段  remainGoldCoin-->
            <el-table-column prop="remainGoldCoin" label="纹绣积分" min-width="80"></el-table-column>
            <el-table-column prop="remainReturnPoints" label="APP积分" min-width="80">
                <template slot-scope='scope'>
                    <el-button @click="viewhis(scope.row)" v-if="scope.row.remainReturnPoints!=0">{{scope.row.remainReturnPoints}}</el-button>
                    <span v-else>0</span>
                </template>
            </el-table-column>
            <el-table-column prop="remainAmount" label="余额" min-width="80"></el-table-column>
            <el-table-column prop="createOn" label="最近充值日期" min-width="150">
                <template slot-scope="scope">
                    <span v-if="scope.row.modifiedOn">{{scope.row.modifiedOn.substring(0,10)}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="view(scope.$index,tableData)" >查看流水</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 信息表 -->
        <!-- 分页 -->
        <div class="">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import "@/style/selfCommon.less"
    import Export from '@/components/export'
    import {} from "@/api/myData"
    import { getCookie } from '@/config/mUtils'
    export default {
        data () {
            return {
                tableData:[],
                allData:[],
                total:0,
                currentPage:1,
                size:10,
                form:{

                },
            }
        },
        computed: {
            /* 导出报表参数 tHeader,filterVal,tableData2*/
            tHeader(){
                return ['账户','账户编号','医院','积分',  '返现', '余额', '最近充值日期']
            },
            filterVal(){
                return ['branchName','branchCode','hospitalName', 'remainSystemPoints', 'remainReturnPoints', 'remainAmount','modifiedOn']
            },
            reportData(){
                return this.allData
            },
            reportName(){
                return '积分充值'
            },
            /*导出报表参数 tHeader,filterVal,reportData*/
        },
        mounted(){
        },
        methods: {
            dateChange(val){
                if(val){
                    val = val.formatDates()
                    this.startDate = val.substring(0,10),
                    this.endDate = val.substring(13)
                }else{
                    this.startDate = val.substring(0,10),
                    this.endDate = val.substring(13)
                }
            },

            async GetUserAccount(params,ope){
                try {
                    let res = await GetUserAccount(params)
                    if(ope){
                         
                        this.portData = res.data
                        this.$refs.export.handleDownload()
                    }else{
                        this.total = res.count
                        this.tableData = res.data
                        this.loading = false
                    }
                    this.portLoading = false
                } catch (err) {
                    console.log(err)
                }
            },
            onSubmit(){
                this.currentPage = 1
                this.search()
            },
            search(){
                this.loading = true
                // this.GetUserAccount({
                //     keyWords:this.form.keyWords.removeSP(),
                //     hospitalCode:this.form.hospital,
                //     pageIndex: this.currentPage,
                //     pageSize: this.size,
                //     startDate:this.form.date1,
                //     endDate:this.form.date2,
                //     payType:this.form.payType
                // })
            },

            // 分页页面展示数据条数改变触发事件
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.size = val
                this.search()
            },

            // 分页当前页码改变触发事件
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val
                this.search()
            },
            // 报表导出
            exportEX(){
                this.portLoading = true
                this.GetUserAccount({
                    keyWords:this.form.keyWords.removeSP(),
                    hospitalCode:this.form.hospital,
                    pageIndex:1,
                    pageSize: this.total,
                    startDate:this.form.date1,
                    endDate:this.form.date2,
                    payType:this.form.payType
                },'port')
            }
        },
        components: {
            Export
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
