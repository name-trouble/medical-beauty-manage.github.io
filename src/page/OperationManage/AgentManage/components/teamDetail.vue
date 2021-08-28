<template>
    <div class="teamDetail">
        <div style="margin-bottom: 10px;height: 40px">
            <span style="float: left;line-height: 46px;width:80px">人数：{{teamCount}}人</span>
            <span style="float: left;line-height: 46px;margin-left:10px">消费商等级：</span>
            <el-select v-model="grade">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="item in gradeList" :label="item.BranchGradeName" :value="item.Code"
                               :key="item.Code"></el-option>
            </el-select>
            <el-button class="searchBtn" @click="search">搜索</el-button>
            <Export :tHeader="tHeader" :filterVal=' filterVal' :tableData1='tableData1' :name='title' style="float: right;"></Export>
        </div>
        <el-table :data="tableData" border style="width: 100%;"  height="460" v-loading="loading">
            <el-table-column prop="RegistDate" label="注册日期" width="110">
                <template slot-scope="scope">
                    <span v-if="scope.row.RegistDate">
                         {{scope.row.RegistDate.substring(0,10)}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="BranchName" label="代理人" min-width="140">
                <template slot-scope="scope">
                    <el-button type="text" @click="view(scope.row)" v-if="scope.row.BranchName">{{scope.row.BranchName}}[{{scope.row.Code}}]</el-button>
                </template>
            </el-table-column>
          <el-table-column prop="ReferrerName" label="推荐人" min-width="140">
                <template slot-scope="scope">
                     <span v-if="scope.row.ReferrerName">
                    {{scope.row.ReferrerName}}{{scope.row.ReferrerCode|filterFun}}
                     </span>
                </template>
            </el-table-column>
            <el-table-column prop="PhoneNumber" label="联系电话" min-width="120">
                 <template slot-scope="scope">
                    <span v-if="scope.row.PhoneNumber">{{scope.row.PhoneNumber.substring(0,3)+'****'+scope.row.PhoneNumber.substring(7)}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="BranchGradeName" label="代理等级" min-width="120"></el-table-column>
            <el-table-column prop="PayAmount" label="缴纳会费" min-width="100">
                <template slot-scope="scope">
                    <span v-if="scope.row.PayAmount">￥{{scope.row.PayAmount.toQFW()}}</span>
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
    </div>
</template>

<script type="text/ecmascript-6">
    import "../../../../style/selfCommon.less"
    import Export from '../../../../components/export'
    import {GetBranchTeamList,GetBranchTeamDetailList,GetBranchGradeAll} from "@/api/myData"
    export default {
        // name:"teamDetail",
        props:{
            title:"",
            teamMes:"",
            gradeList:{
                type:Array
            },
        },
        data () {
            return {
                grade:"",
                loading:false,
                tableData: [],
                currentPage: 1,
                total: 0,
                size: 10,
                teamCount:0,
                allData:[],
            }
        },
        filters:{
            filterFun(value){
                if(value&&String(value).length!=0){
                    let referrer = "["+value+"]"
                    return referrer
                }else{
                    return ""
                }
            },
           /* filterGrade(value,gradeList){

                for(let i = 0;i<gradeList.length;i++){
                    if(gradeList[i].Code == value){
                        return gradeList[i].BranchGradeName
                    }
                }
            }*/
        },
        computed: {
            tHeader(){
                return ['代理编号', '注册日期', '代理人', '联系电话', '身份证号', '来源渠道', '代理等级', '缴纳会费', '缴纳押金','推荐人']
            },
            filterVal(){
                return ['Code', 'RegistDate', 'BranchName', 'PhoneNumber', 'IDCard','SourcWayeCode','BranchGradeCode','grade','grade','ReferrerName']
            },
            tableData1(){
                return this.tableData
            },
        },
        mounted(){
            this.search()
            // this.getBranchGradeAll()
        },
        methods:{
            view(data){
                this.$emit("viewBranch",data)
            },
             //            获取所有代理等级
            async getBranchGradeAll(){
                try {
                    let res = await GetBranchGradeAll()
                    this.gradeList = res
                    
                    this.search()
                } catch (err) {
                    console.log(err)
                }
            },
            //            条件查询
            async GetBranchTeamDetailList(params){
                try {
                    let res = await GetBranchTeamDetailList(params)
                    
                    this.loading = false
                    this.total = res.length
                    this.allData = JSON.parse(JSON.stringify(res))
                    this.getPage()
                    this.teamCount = res.length
                } catch (err) {
                    console.log(err)
                }
            },

            // 分页页面展示数据条数改变触发事件
            handleSizeChange(val) {
                this.loading = true
                console.log(`每页 ${val} 条`);
                this.size = val
                this.getPage()
            },

            // 分页当前页码改变触发事件
            handleCurrentChange(val) {
                this.loading = true
                console.log(`当前页: ${val}`);
                this.currentPage = val
                this.getPage()
            },
            search(){
                
                this.loading = true
                this.GetBranchTeamDetailList({
                    BranchCode: this.teamMes,
                    BranchGradeCode:this.grade
                })
            },
             getPage(){
                
                this.loading = true 
                this.tableData = this.allData.slice((this.currentPage-1)*this.size,this.currentPage*this.size)
                setTimeout(()=>{
                    this.loading = false
                },50)
            },
        },
        components: {
            Export
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.block{
    margin: 20px 0 10px 0;
}
.searchBtn{
    margin-right: 10px;
}
</style>
