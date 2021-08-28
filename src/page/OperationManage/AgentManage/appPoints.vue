<template>
    <div class="tag selCommon">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px">
            <el-form-item label="注册日期：" class="form_item_mt10"  label-width="80px">
                <el-date-picker  v-model="date"  type="daterange"  @change="dateSelect"  style="width: 200px" placeholder="选择日期范围"> </el-date-picker>
            </el-form-item> 
            <el-form-item label="手机号：" class="form_item_mt10">
                   <el-input v-model="formInline.keywords" style="width: 200px"></el-input>
                </el-form-item>
            <el-form-item label=" " class="form_item_mt10">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
                <el-button type="primary" class="searchBtn" @click="exportTbale" :loading="ExportLoading">导出报表</el-button>
                <Export :tHeader="tHeader" ref="exportTable" :filterVal='filterVal' :tableData1='tableData1' :name='name' style="display:none"></Export>
            </el-form-item>
        </el-form>
        <el-table  :data="tableData" border style="width: 100%;margin:20px 0" class="min_table smt" v-loading="loading">
            <el-table-column prop="createDate" label="注册时间" min-width="180"></el-table-column>
            <el-table-column prop="realname" label="昵称/用户名"  min-width="180"></el-table-column>
            <el-table-column prop="mobile" label="手机号" min-width="180"></el-table-column>
            <el-table-column prop="totalPoints" label="积分总额" min-width="180"></el-table-column>
            <el-table-column prop="deductPoints" label="消费积分" min-width="180"></el-table-column>
            <el-table-column prop="pointsBalances" label="剩余积分" min-width="180"></el-table-column>
            <!--  -->
            <!-- <el-table-column prop="description" label="来源" min-width="180"></el-table-column> -->
            <el-table-column prop="bankName" label="操作" min-width="180">
                <template slot-scope="scope">
                    <el-button @click="viewHis(scope.row)" type="primary" size="small">查看积分流水</el-button>
                </template>
            </el-table-column>
        </el-table>
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
        <el-dialog title="APP积分流水" v-model="appDialog" size="">
            <!-- <el-radio-group v-model="radio2">
                <el-radio :label="0">备选项</el-radio>
                <el-radio :label="1">备选项</el-radio>
                <el-radio :label="2">备选项</el-radio>
            </el-radio-group> -->
            <div class="dialogRecLi header">
                    <span class="li_header">积分获取时间</span>
                    <span class="li_header">金额</span>
                    <span class="li_header">积分来源</span>
                    <span class="li_header">描述</span>
            </div>
            <ul style="width:700px;max-height:600px;overflow:auto">
                <li v-for="(item,index) in dialogData"  :key="index"  class="dialogRecLi" :class="{'red':item.sourceType==5||item.sourceType==4}">
                    <span class="li_tb">{{item.createOn}}</span>
                    <span class="li_tb">{{item.sourceType==5||item.sourceType==4?'-':''}}{{item.quantity}}</span>
                    <span class="li_tb">{{item.friendMobile}}</span>
                    <span class="li_tb">{{item.description}}</span>
                </li>
            </ul>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import  "@/style/selfCommon.less"
    import Export from '@/components/export'
    import { getCookie, delCookie } from '@/config/mUtils'
    import { GetDropDownPermission,GetOnlinePoints,GetOnlinePointsRecords} from "@/api/myData"
    export default {
        data () {
            return {
                loading:false,
                appDialog:false,
                date:"",
                dialogFormVisible:false,
                currentPage:1,
                total:0,
                size:10,
                formInline:{
                    keywords:'',
                    startDate:'',
                    endDate:'',
                },
                tableData:[],
                dialogData:[],
                radio2:'0',//
                ExportLoading:false,
                allData:[],
            }
        },
       computed: {
            /* 导出报表参数 tHeader,filterVal,tableData1*/
            tHeader(){
                return ['注册时间','昵称/用户名', '手机号', '积分总额', '消费积分','剩余积分']
            },
            filterVal(){
                return ['createDate','realname','mobile','totalPoints', 'deductPoints','pointsBalances']
            },
            tableData1(){
                
                return this.allData
            },
            name(){
                return '积分'
            },
        },
        watch:{
            
        },
        mounted(){

        },
        methods:{
            async exportTbale(){
                this.ExportLoading = true
                let res = await GetOnlinePoints({
                    "mobile": this.formInline.keywords,
                    "createDate1": this.formInline.startDate,
                    "createDate2": this.formInline.endDate,
                    "pageIndex": 1,
                    "PageSize": this.total
                })
                if(res.status){
                    this.allData = res.data
                    this.$refs.exportTable.handleDownload()
                }else{
                    this.$message({ type: 'error', message: '获取所有数据出现问题!'+res.errorMessage })
                }
                this.ExportLoading = false
            },
            viewHis(data){
                this.GetOnlinePointsRecords(data.mobile)
                this.appDialog = true
            },
            dateSelect(val){
                if(val){
                    val = val.formatDates()
                    this.formInline.startDate = val.substring(0,10)
                    this.formInline.endDate = val.substring(13)
                }else{
                    this.formInline.startDate = ''
                    this.formInline.endDate = ''
                }
            },

            async GetOnlinePoints(params,from){
                let res = await GetOnlinePoints(params)
                if(res.status){
                    if(from == 'wildData'){
                        this.total = res.count
                        this.tableData = res.data
                    }else{
                        this.dialogData = res.data
                    }
                }else{
                    this.$message({ type: 'error', message: '获取数据失败!'+res.errorMessage })
                }
            },
          
            async GetOnlinePointsRecords(mobile){
                let res1 = await GetOnlinePointsRecords({mobile: mobile});
                this.dialogData = res1.data
            },

            onSubmit(){
                this.currentPage = 1
                this.search('wildData')
            },
            
           
            handleSizeChange(val) {// 分页页面展示数据条数改变触发事件
                this.size = val
                this.search('wildData')
            },
            
            handleCurrentChange(val) {// 分页当前页码改变触发事件
                this.currentPage = val
                this.search('wildData')
            },

            search(from){
                this.GetOnlinePoints({
                    "mobile": this.formInline.keywords,
                    "createDate1": this.formInline.startDate,
                    "createDate2": this.formInline.endDate,
                    "pageIndex": this.currentPage,
                    "PageSize": this.size
                },from)
            },

        },
        components: {
            Export
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form_footer{
    text-align: center
}
.dialogRecLi{
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    display: flex;
    background: #c9ecc9;
}
.dialogRecLi.header{
    background: #dfe6ec;
}
.li_header,.li_tb{
    flex: 1;
}
.li_tb{
    border-bottom: 1px solid #f9f9f9;
}
.dialogRecLi.red{
    background:#ecaeae
}

</style>
