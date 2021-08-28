<template>
    <div class="monthReport selCommon">
        <el-form :inline="true"  class="demo-form-inline form_search" label-width="80px" >
            <el-form-item label="提成日期：" class="form_item_mt10">
                <el-date-picker
                    v-model="date"
                    value-format="yyyy-MM-dd"
                    style='width:200px;'
                    type="daterange"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <!--<el-form-item label="关键字：" class="form_item_mt10">-->
                <!--<el-input v-model="paginationModel.keywords" placeholder="请输入关键字" style='width:200px;'></el-input>-->
            <!--</el-form-item>-->
            <el-form-item label="业绩区间：" class="form_item_mt10">
                <el-input v-model="paginationModel.StartRangeAmount" class="form_item" type="number" style='width:100px;'>
                </el-input>
                -
                <el-input v-model="paginationModel.EndRangeAmount" class="form_item" type="number" style='width:100px;'>
                </el-input>
            </el-form-item>
            <el-form-item label="提成比例：" class="form_item_mt10">
                <el-input v-model="paginationModel.ConsumeReward" class="form_item" type="number" style='width:200px;'>
                    <template slot="append">%</template>
                </el-input>
            </el-form-item>
            <el-form-item label=" " class="form_item_mt10">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
            </el-form-item>
        </el-form>
        <div class="table_container">
            <el-table ref="reportTable" :data="reportData" border style="width: 100%">
                <el-table-column prop="" label="代理编号" min-width="100">
                    <template slot-scope="scope">
                        <span>{{scope.row.Code}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="代理姓名" min-width="100">
                    <template slot-scope="scope">
                        <span>{{scope.row.BranchName}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="代理等级" min-width="100">
                    <template slot-scope="scope">
                        <span>{{scope.row.BranchGradeCode}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="账户" min-width="100">
                    <template slot-scope="scope">
                        <span>{{scope.row.BankCardId}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="账户名" min-width="100">
                    <template slot-scope="scope">
                        <span>{{scope.row.BankCardHolder}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="团队总业绩" min-width="100">
                    <template slot-scope="scope">
                        <span>{{scope.row.TotalConsume}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="提成业绩" min-width="100">
                    <template slot-scope="scope">
                        <span>{{scope.row.ConsumeAmount }}</span>
                    </template>
                </el-table-column>
                <!--<el-table-column prop="" label="提成日期内公司业绩" min-width="100">-->
                    <!--<template slot-scope="scope">-->
                        <!--<span>{{scope.row.ConsumeDate }}</span>-->
                    <!--</template>-->
                <!--</el-table-column>-->
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="paginationModel.PageIndex"
                :page-sizes="[10, 20, 30]"
                :page-size="paginationModel.PageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="paginationModel.total">
            </el-pagination>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import  "@/style/selfCommon.less"
    import { getCookie, delCookie } from '@/config/mUtils'
    import {MonthlyRewardConsume} from "@/api/myData"
    export default {
        data () {
            return {
                reportData: [],
                date: null,
                paginationModel: {PageIndex: 1, PageSize: 10, total: 0, StartRangeAmount: 0, EndRangeAmount: 300000, ConsumeReward: 1}
            }
        },
        mounted(){

        },
        methods:{

            async MonthlyRewardConsume(){
                try{
                    let d = this.date;
                    if (d && d.length > 1) {
                        this.paginationModel.StartDate = d[0];
                        this.paginationModel.EndDate = d[1];
                    }
                    let res = await MonthlyRewardConsume(this.paginationModel);
                    this.reportData = res.data;
                    this.paginationModel.total = res.count;
                    if (res.count === 0) {
                        this.$message.success('查询结束，无奖励');
                    }
                }catch(err){
                    console.log(err)
                }
            },


            onSubmit() {
                this.MonthlyRewardConsume()
            },
            handleSizeChange(e) {
                if (e === this.paginationModel.PageSize) return;
                this.paginationModel.PageSize = e;
                this.MonthlyRewardConsume();
            },
            handleCurrentChange(e) {
                if (e === this.paginationModel.PageIndex) return;
                this.paginationModel.PageIndex = e;
                this.MonthlyRewardConsume();
            }
        },
        components: {

        }
    }
</script>

<style scoped>
    .table_container{width: 100%;margin-top: 20px}
</style>
