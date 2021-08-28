<template>
    <div class="settled selCommon">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px"    >
            <el-form-item label="支付日期："  class="form_item_mt10 ">
                <el-date-picker
                    v-model="date"
                    type="daterange"
                    @change="dateChange"
                    style='width:200px;'
                    placeholder="选择日期范围">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="医院:" class="form_item_mt10">
                <el-select v-model="formInline.Hospital"  style='width:200px;' @change="search">
                    <el-option v-for="(item,index) in HospitalList" :key="index" :label="item.supplierName" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="销售公司："  class="form_item_mt10 form_item_wh280">
                <el-select v-model="formInline.branch" placeholder="" style="width: 200px;">
                    <el-option v-for="item in branchList" :key="item.branchName" :label="item.branchName" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="项目类型："  class="form_item_mt10 form_item_wh280">
                <el-select v-model="formInline.itemType" placeholder="" style="width: 200px;">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="代理费" value="1"></el-option>
                    <el-option label="券" value="2"></el-option>
                    <el-option label="充值" value="3"></el-option>
                    <el-option label="升级" value="4"></el-option>
                    <el-option label="额外费" value="5"></el-option>
                    <el-option label="服务商注册费" value="6"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="项目明细："  class="form_item_mt10 form_item_wh280">
                <el-select v-model="formInline.itemDetail" placeholder="" style="width: 200px;">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="买套餐" value="买套餐"></el-option>
                    <el-option label="卡券" value="卡券"></el-option>
                    <el-option label="充值" value="充值"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label=" " class="form_item_mt10 form_item_wh280">
                <el-button type="primary" @click="search" class="searchBtn">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" max-height="600" :summary-method="getSummaries"
        show-summary  class="min_table smt" v-loading="loading">
        <el-table-column prop="orderDate " label="开单日期" min-width="100">
                <template slot-scope="scope">
                      <span v-if="scope.row.payDate">
                          {{scope.row.payDate.substring(0,10)}}
                      </span>
                </template>
            </el-table-column>
            <el-table-column prop="payDate  " label="支付日期" min-width="100">
                <template slot-scope="scope">
                      <span v-if="scope.row.payDate ">
                          {{scope.row.payDate.substring(0,10)}}
                      </span>
                </template>
            </el-table-column>
            <el-table-column prop="hospitalName" label="医院" min-width="100"  ></el-table-column>
            <el-table-column prop="receiveBranchName" label="代理商" min-width="100"  ></el-table-column>
            <el-table-column prop="customerName" label="客户" min-width="100" ></el-table-column>
            <el-table-column prop="customerName" label="项目类型" min-width="100" >
                <template slot-scope="scope">
                    <span v-if="scope.row.itemType == 1">代理费</span>
                    <span v-if="scope.row.itemType == 2">券</span>
                    <span v-if="scope.row.itemType == 3">充值</span>
                    <span v-if="scope.row.itemType == 4">升级</span>
                    <span v-if="scope.row.itemType == 6">服务商费用</span>
                </template>
            </el-table-column>
            <el-table-column prop="itemDetail" label="项目明细" min-width="100"  show-overflow-tooltip></el-table-column>
            <el-table-column prop="customerName" label="项目备注" min-width="100" show-overflow-tooltip="">
                <template slot-scope="scope">
                      <span v-if="scope.row.memo ">
                          {{scope.row.memo}}
                      </span>
                </template>
            </el-table-column>
            <el-table-column prop="realAmount" label="金额" min-width="100" align="right">
                <template slot-scope="scope">
                    <span style="float: right">
                          {{scope.row.realAmount.toQFW()}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="procFee" label="手续费" min-width="100" align="right">
                <template slot-scope="scope">
                    <span style="float: right">
                          {{scope.row.procFee.toQFW()}}
                    </span>
                </template>
            </el-table-column>
        
            <el-table-column prop="amount" label="合计" min-width="100" align="right" >
                <template slot-scope="scope">
                      <span style="float: right">
                          {{scope.row.amount.toQFW()}}
                      </span>
                </template>
            </el-table-column>
           
        </el-table>
        <div>共计 {{total}} 条数据</div>
        <!-- 分页 -->
    </div>
</template>

<script type="text/ecmascript-6">
    import {GetDropDownPermission,GetBranchReceiveList} from "@/api/myData"
    import "@/style/selfCommon.less"
    export default {
        data () {
            return {
                date:"",
                total:0,
                size:10,
                currentPage:1,
                HospitalList:[],
                branchList:[],
                formInline: {
                    branch:"",
                    Hospital:"",
                    startDate:"",
                    endDate:"",
                    itemType:"",
                    itemDetail:"",
                },
                tableData:[],
                loading:false
            }
        },
        computed: {
         
        },
       
        mounted(){
            let date1 = new Date()
            date1.setDate(1)
            this.date = [date1,new Date()]
            this.getSupplierByPage()
        },
        methods: {
            getSummaries(param) {
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '合计';
                    return;
                }
                const values = data.map(item => Number(item[column.property]));

                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                    const value = Number(curr);
                    if (!isNaN(value)) {
                        return prev.add(curr);
                    } else {
                        return prev;
                    }
                    }, 0);
                    sums[index] = sums[index].toQFW();
                } else {
                     sums[index] = '';
                }
                });
                return sums;
            },
            
            dateChange(val){
                if(val){
                    val = val.formatDates()
                    this.formInline.startDate = val.substring(0,10)
                    this.formInline.endDate = val.substring(13)
                }else{
                    this.formInline.startDate = ""
                    this.formInline.endDate = ""
                }
            },
            async GetBranchReceiveList(params){
                try {
                    
                    let res = await GetBranchReceiveList(params)
                    this.loading = false
                    if(res.status){
                        this.total = res.data.length
                        res.data.forEach(row=>{
                            row.amount = row.realAmount+row.procFee
                        })
                        this.tableData = res.data
                    }else{
                        this.$message({ type: 'error', message: '查询失败!'+res.errorMessage })
                    }
                    
                } catch (err) {
                    console.log(err)
                }
            },
            async getSupplierByPage(){
                let res0 = await GetDropDownPermission({typeId:2})
                this.branchList = res0.data
                this.formInline.branch = res0.data[0].code
                let res = await GetDropDownPermission({typeId:1})
                this.formInline.Hospital = res.data[0].code
                this.HospitalList = res.data
                // this.submit()
            },
            search(){
                this.currentPage = 1
                this.submit()
            },
            submit(){
                this.loading = true
                this.GetBranchReceiveList({
                   startDate :this.formInline.startDate,
                   endDate:this.formInline.endDate,
                   pageIndex:this.currentPage,
                   pageSize:this.size,
                   branchCode:this.formInline.branch,
                   hospitalcode:this.formInline.Hospital,
                   itemType:this.formInline.itemType,
                   itemDetail:this.formInline.itemDetail
                })
            },

            handleSizeChange(val) {
                this.size = val
                this.submit()
             },
             handleCurrentChange(val) {
                this.currentPage = val
                this.submit()
             },

        },
        components: {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
