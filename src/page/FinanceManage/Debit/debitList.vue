<template>
    <div class="debitList selCommon">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px" >
            <el-form-item label="单据时间：" class="form_item_mt10 ">
                <el-date-picker v-model="formInline.date1" @change="dateForm1" type="daterange" placeholder="选择日期范围" class="wt200"></el-date-picker>
            </el-form-item>
            <el-form-item label="单据编号：" class="form_item_mt10 form_item_wh280">
                <el-input v-model="formInline.num" placeholder="" style="width: 200px;"  v-on:keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            <el-form-item label="消费商：" class="form_item_mt10 form_item_wh280">
                <el-input v-model="formInline.name" placeholder="" style="width: 200px;"  v-on:keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            <el-form-item label="类型：" class='form_item_mt10 form_item_wt400'>
                <el-select v-model="formInline.type" @change="onSubmit">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="补款" value="1"></el-option>
                    <el-option label="扣款" value="-1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态：" class="form_item_mt10 form_item_wh280">
                <el-select v-model="formInline.status" placeholder="" style="width: 200px;" @change="onSubmit">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="待结算" value="0"></el-option>
                    <el-option label="已完成" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label=" " class="form_item_mt10 form_item_wh280">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" class="min_table smt" v-loading="loading"  ref="multipleTable" >
            <el-table-column prop="DebitNO" label="单据编号" min-width="100"></el-table-column>
            <el-table-column prop="DebitDate" label="单据日期" width="120">
                <template slot-scope="scope">
                    <span v-if="scope.row.DebitDate">{{scope.row.DebitDate.substring(0,10)}}</span>
                    
                </template>
            </el-table-column>
            <el-table-column prop="BranchName" label="补扣款对象" min-width="100"></el-table-column>
             <el-table-column prop="FromName" label="来源" min-width="100"></el-table-column>
            <el-table-column prop="FxCode" label="关联单据" min-width="80">
                <template slot-scope="scope">
                    <el-button type="text" @click="view(scope.$index,tableData,3)">{{scope.row.FxCode}}</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="DebitReason" label="原因" min-width="80"></el-table-column>
            <el-table-column prop="DebitAmount" label="金额" min-width="80">
                <template slot-scope="scope">
                    <span v-if="scope.row.DebitAmount">￥{{scope.row.DebitAmount.toQFW()}}</span>
                    <span v-else>￥0</span>
                </template>
            </el-table-column>
            <el-table-column prop="Memo" label="备注" min-width="150" show-overflow-tooltip=""></el-table-column>
            <el-table-column prop="CreateBy" label="提交人" min-width="80"></el-table-column>
            <el-table-column prop="IsFinished" label="状态" min-width="80">
                <template slot-scope="scope">
                    <el-tag type="danger" v-if="scope.row.IsFinished == false">待结算</el-tag>
                    <el-tag type="success" v-if="scope.row.IsFinished == true">已完成</el-tag>
                </template>
            </el-table-column>
             <el-table-column prop="IsPositive" label="补扣" min-width="80">
                <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.IsPositive == 1">补款</el-tag>
                    <el-tag type="danger" v-if="scope.row.IsPositive == '-1'">扣款</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="sawCount" label="操作" min-width="80">
                <template slot-scope="scope">
                    <!--<el-button type="text" size="small" @click="edit(scope.$index,tableData)" v-if="scope.row.IsFinished == false">编辑</el-button>-->
                    <el-button type="primary" size="small" @click="deleteRow(scope.$index,tableData)" v-if="scope.row.IsFinished == false">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import "@/style/selfCommon.less"
import { GetDebitOrder, UpdateDebitOrder, DeleteDebitById } from "@/api/myData"
export default {
    // name: "debitList",
    computed: {
        /* 导出报表参数 tHeader,filterVal,tableData1*/
        // tHeader() {
        //     return ["单据编号", '单据日期', '被扣款人', '扣款事项', '关联单据', '扣款原因', "扣款额度", "备注", "提交人", "状态"]
        // },
        // filterVal() {
        //     return ['DebitNO', 'CreateOn', 'BranchName', 'DebitTypeName', 'FxCode', 'DebitReason', 'DebitAmount', 'Memo', 'CreateBy', 'IsFinished']
        // },
        // name() {
        //     return '扣款单'
        // },
        // tableData1() {
        //     return this.tableData
        // }
        /*导出报表参数 tHeader,filterVal,tableData1*/
    },
    data() {
        return {
            loading:false,
            dialogFormVisible: false,
            total: 0,
            size: 10,
            currentPage: 1,
            formInline: {
                reason:"",
                date1: "",
                startTime: "",
                endTime: "",
                num: "",
                name: "",
                type: "",
                status: "",
            },
            tableData: [],
            form: {},
        }
    },
    mounted() {
        this.onSubmit()
    },
    methods: {
        //            编辑单据
        async UpdateDebitOrder(params) {
            try {
                let res = await UpdateDebitOrder(params)
                if (res.success) {
                    this.$message({ message: "修改成功", type: 'success' });
                } else {
                    this.$message.error('修改失败')
                }
            } catch (err) {
                console.log(err)
            }
        },
        //            删除单据
        async DeleteDebitById(params) {
            try {
                let res = await DeleteDebitById(params)
                if (res.success) {
                    this.$message({ message: "删除成功", type: 'success' });
                    this.search()
                } else {
                    this.$message.error('删除失败')
                }
            } catch (err) {
                console.log(err)
            }
        },
        async GetDebitOrder(params) {
            try {
                this.loading = true
                let res = await GetDebitOrder(params)
                this.loading = false
                if(res.status){
                    this.total = res.count
                    this.tableData = res.data
                }else{
                    this.$message.error('获取数据失败')
                }
            } catch (err) {
                console.log(err)
            }
        },
        dateForm1(val) {
            if(val){
                    val = val.formatDates()
                this.formInline.startTime = val.substring(0, 10)
                this.formInline.endTime = val.substring(13)
            }else{
                this.formInline.startTime = ""
                this.formInline.endTime = ""
            }
            this.onSubmit()
        },
        onSubmit() {
            this.currentPage = 1
            this.search()
        },
        search(){
            this.GetDebitOrder({
                debitNO: this.formInline.num,
                branchName: this.formInline.name,
                startDate: this.formInline.startTime,
                endDate: this.formInline.endTime,
                pageIndex: this.currentPage,
                pageSize: this.size,
                IsPositive: this.formInline.type
            })
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.$set(this.size, this.currentIndex, val)
            this.search()
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.$set(this.currentPage, this.currentIndex, val)
            this.search()
        },
        deleteRow(index, data) {
            this.$confirm('是否删除该条数据?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.DeleteDebitById({
                    id: data[index].Id
                })
            }).catch(() => {

            });
        },
        edit(index, data) {
            this.dialogFormVisible = true
        }
    },
    components: {
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
