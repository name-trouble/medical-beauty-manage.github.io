4<template>
    <div class="selCommon AgentManage">
        <!-- 查询信息 -->
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px">
            <el-form-item label="年月：" class="form_item_mt10">
                <el-select v-model="formInline.year" placeholder="年份" style='width:95px;' @change="yearChange">
                    <el-option label="全部" value="" ></el-option>
                    <el-option v-for="(item,index) in yearList" :label="item" :value="item" :key="index"></el-option>
                </el-select>
                <el-select v-model="formInline.month" placeholder="月份" style='width:95px;' :disabled="!formInline.year">
                    <el-option v-for="(item,index) in monthList" :label="item" :value="item" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="医院：" class="form_item_mt10">
                <el-select v-model="formInline.hospital"  style='width:200px;' @change="onSubmit">
                    <el-option v-for="(item,index) in hospitalList" :key="index" :label="item.supplierName" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
              <el-form-item label="关键字：" class="form_item_mt10">
                <el-input v-model="formInline.keyWords" placeholder="" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item label=" " class="form_item_mt10">
                <el-button type="primary" @click="onSubmit"  class="searchBtn">查询</el-button>
                <Export ref="exportCom" :tHeader="tHeader" :filterVal=' filterVal' :tableData1='tableData1' :name='name' style="display:none"></Export>
                <el-button @click="getAllData" class="searchBtn" :disabled="tableData.length == 0">导出报表</el-button>
            </el-form-item>
        </el-form>
        <!-- 查询信息 -->

        <!-- 信息表 -->
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" class="min_table smt" v-loading="loading"  max-height="660">
            <el-table-column prop="branchName" label="代理商" min-width="120"> </el-table-column>
            <el-table-column prop="branchGradeName" label="等级" min-width="120"></el-table-column>
            <el-table-column prop="province" label="省份" min-width="90"></el-table-column>
            <el-table-column prop="city" label="城市" width="90" align="center"></el-table-column>
            <el-table-column prop="topName" label="所属销售公司" min-width="120"></el-table-column>
            <el-table-column prop="teamCount" label="团队人数" min-width="90"   align="right"></el-table-column>
            <el-table-column prop="ordinaryCount" label="普通会员" min-width="90"  align="right"></el-table-column>
            <el-table-column prop="seniorCount" label="高级会员" min-width="90"  align="right"></el-table-column>
            <el-table-column prop="shopName" label="店家名字" min-width="120"  align="right"></el-table-column>
            <el-table-column prop="expertRate" label="专家提成比例" min-width="90"  align="right"></el-table-column>
            <el-table-column prop="totalAmount" label="总消费业绩" min-width="90"  align="right"> </el-table-column>
            <el-table-column prop="expertAmount" label="专家日业绩" min-width="100" align="right"></el-table-column>
            <el-table-column prop="consumeAmount" label="有提成消费业绩" min-width="100" align="right"></el-table-column>
        </el-table>
        <!-- 信息表 -->
        <!-- 分页 -->
        <div class="block">
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
        <!-- 分页 -->

        <el-dialog title="代理详情" :visible.sync="dialogFormVisible" size='' :close-on-click-modal="false"  top="5%">
            <agentDetail ref="detail" style="width: 920px" :detailCode="detailCode"></agentDetail>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import "@/style/selfCommon.less"
    import Export from '@/components/export'
    import agentDetail from "./components/agentDetail.vue"
    import {GetDropDownPermission,GetBranchCommission} from "@/api/myData"
    export default {
        // name: 'AgentManage',
        data() {
            return {
                hospitalList:"",
                loading:false,
                currentPage: 1,
                detailCode:"",
                dialogFormVisible: false,
                yearList:[],
                monthList:[1,2,3,4,5,6,7,8,9,10,11,12],
                total: 0,
                size: 10,
                formInline: {
                    branchName:'',
                    IsEnable:"1",
                    hospital:'',
                    year:'',
                    month:'',
                    keyWords:'',
                },
                tableData: [],
                allData:[],
            }
        },
        computed: {
            /* 导出报表参数 tHeader,filterVal,tableData1*/
            tHeader(){
                return ['代理商', '等级', '省份', '城市', '所属销售公司', '团队人数', '普通会员', '高级会员','店家名称','专家提成比例', '总消费业绩','专家日业绩','有消费提成业绩']
            },
            filterVal(){
                return ['branchName', 'branchGradeName' , 'province', 'city', 'topName','teamCount','ordinaryCount','seniorCount','shopName','expertRate','totalAmount',
                'expertAmount','consumeAmount']
            },
            tableData1(){
                return this.allData
            },
            name(){
                return '代理商业绩统计'
            },
            /*导出报表参数 tHeader,filterVal,tableData1*/
        },
        mounted: function () {
            
           this.getBranchGradeAll()
        },
        watch:{
           
        },

        methods: {
            yearChange(val){
                if(!val){
                    this.formInline.month = ''
                }
            },
            getAllData(){
                this.GetBranchCommission({
                    Year:this.formInline.year,
                    Month:this.formInline.month,
                    pageIndex: 1,
                    pageSize: this.total,
                    hospitalCode:this.formInline.hospital,
                    keyWords:this.formInline.keyWords
                },'1')
            },
          
            async getBranchGradeAll(){
                let baseYear = 2012,this_year = new Date().getFullYear()
                for(let i=0;i<this_year-baseYear;i++){
                    this.yearList.push(this_year-i)
                }
                try{
                    let [res1] = await Promise.all([GetDropDownPermission({typeId: 1})])
                    this.hospitalList = res1.data
                    this.formInline.hospital = this.hospitalList[0].code
                }catch(err){
                    console.log(err)
                }
            },
//            条件查询
            async GetBranchCommission(params,ope){
                try{
                    let res = await GetBranchCommission(params)
                    
                    if(ope){
                        this.allData = res.data
                        this.$refs.exportCom.handleDownload()
                    }else{
                        this.tableData = res.data
                        // this.getPageData()
                    }
                    this.loading = false
                    this.total = res.count
                }catch(err){
                    console.log(err)
                }
            },

            // 条件查询
            onSubmit() {
                this.currentPage = 1
                this.getTableDate()
            },

            // 分页页面展示数据条数改变触发事件
            handleSizeChange(val) {

                this.size = val
                this.getTableDate()
            },

            // 分页当前页码改变触发事件
            handleCurrentChange(val) {
                this.currentPage = val
                this.getTableDate()
            },
         
            DetailMes(index,data){
                this.detailCode = data[index].code
                this.dialogFormVisible = true
            },

            getTableDate(index){
                this.loading = true
                this.GetBranchCommission({
                    Year:this.formInline.year,
                    Month:this.formInline.month,
                    pageIndex: this.currentPage,
                    pageSize: this.size,
                    hospitalCode:this.formInline.hospital,
                    keyWords:this.formInline.keyWords
                })
            },
            // getPageData(){
            //     this.tableData = this.allData.slice((this.currentPage-1)*this.size,this.currentPage*this.size)
            // }
        },
        components: {
            Export,
            // reportRead,
            agentDetail
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form_footer{
    margin-top: 10px;
}
</style>
