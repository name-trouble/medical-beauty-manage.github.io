<template>
    <div class="QAManage selCommon">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="90px">
            <el-form-item label="提问日期：" style='margin-bottom:10px;font-size:12px !important;'>
                <el-date-picker v-model="formInline.date1" @change="dateForm1" type="daterange" placeholder="选择日期范围" class="wt200"></el-date-picker>
            </el-form-item>
            <el-form-item label="提问者角色：" class="form_item_mt10">
                <el-select v-model="formInline.questioner" placeholder="" style="width: 200px;">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="客户" value="客户"></el-option>
                    <el-option label="代理" value="代理"></el-option>
                    <el-option label="医生" value="医生"></el-option>
                    <el-option label="其他" value="其他"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="答疑医生：" class="form_item_mt10">
                <el-input v-model="formInline.doctor" placeholder="" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item label="点赞：" class="form_item_mt10">
                <el-input v-model="formInline.PraiseCountStart" placeholder="" style="width: 80px;"></el-input>
                <span style="float: left;margin-right: 5px">-</span>
                <el-input v-model="formInline.PraiseCountEnd" placeholder="" style="width: 92px;"></el-input>
            </el-form-item>
            <el-form-item label="评论：" class="form_item_mt10">
                <el-input v-model="formInline.CommentCountStart" placeholder="" style="width: 92px;"></el-input>
                <span style="float: left;margin-right: 5px">-</span>
                <el-input v-model="formInline.CommentCountEnd" placeholder="" style="width: 92px;"></el-input>
            </el-form-item>
            <el-form-item label="浏览：" class="form_item_mt10">
                <el-input v-model="formInline.ViewsStart" placeholder="" style="width: 92px;"></el-input>
                <span style="float: left;margin-right: 5px">-</span>
                <el-input v-model="formInline.ViewsEnd" placeholder="" style="width: 92px;"></el-input>
            </el-form-item>
            <el-form-item label="关键字：" class="form_item_mt10">
                <el-input v-model="formInline.keyWords" placeholder="" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item label=" " class="form_item_mt10">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
            </el-form-item>
        </el-form>
        <!-- 信息表 -->
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" max-height="500" class="smt min_table">
            <el-table-column type="index" width="80" label="序号" ></el-table-column>
            <el-table-column prop="createDate" label="提问日期" min-width="150">
                <template slot-scope="scope">
                    <span v-if="scope.row.createDate">{{scope.row.createDate.substring(0,10)}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="userRealName" label="提问者" min-width="100"></el-table-column>
            <el-table-column prop="roleName" label="提问者角色" min-width="100"></el-table-column>
            <el-table-column prop="title" label="问题" min-width="150">
                <template slot-scope="scope">
                    <el-button @click="view(scope.$index,tableData)" type="text">{{scope.row.title}}</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="answers" label="答疑医生" min-width="100">
                <template slot-scope="scope">
                   
                </template>
            </el-table-column>
            <el-table-column prop="answerCount" label="推荐回答" min-width="100"></el-table-column>
            <el-table-column prop="views" label="浏览" min-width="100"></el-table-column>
            <el-table-column prop="praiseCount" label="点赞" min-width="100"></el-table-column>
            <el-table-column prop="answerCount" label="回答" min-width="100"></el-table-column>
            <el-table-column prop="status" label="操作" min-width="150">
                <template slot-scope="scope">
                    <!--状态判断-->
                    <el-button @click="setTop(scope.$index,tableData,1)" type="text" v-if="scope.row.status == 2">取消置顶</el-button>
                    <el-button @click="setTop(scope.$index,tableData,2)" type="text" v-if="scope.row.status == 1||scope.row.status == null">置顶</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 信息表 -->

        <!-- 分页 -->
        <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage[0]"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="size[0]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total[0]">
            </el-pagination>
        </div>
        <!-- 分页 -->
        <el-dialog :visible.sync="dialogFormVisible" size="">
            <el-form :model="form" style="width: 800px" :inline="true">
                <el-form-item label="提问者：" label-width="90px" class="form_item_mt0">
                    {{form.userName}}
                </el-form-item>
                <el-form-item label="问题：" label-width="90px" class="form_item_mt0">
                    {{form.title}}
                </el-form-item>
                <el-table :data="tableData2" border style="width: 100%;margin-top:15px;margin-bottom:10px;" height="460">
                    <el-table-column type="index" width="40" label="序号" ></el-table-column>
                    <el-table-column prop="createDate" label="评论日期" min-width="150"></el-table-column>
                    <el-table-column prop="userName" label="评论者" min-width="80"></el-table-column>
                    <el-table-column prop="tab" label="评论者角色" min-width="80"></el-table-column>
                    <el-table-column prop="content" label="评论内容" min-width="100"></el-table-column>
                    <el-table-column prop="praiseCount" label="点赞量" min-width="70"></el-table-column>
                    <el-table-column prop="views" label="浏览量" min-width="70"></el-table-column>
                    <el-table-column prop="isStick" label="操作" min-width="100">
                        <template slot-scope="scope">
                            <!--状态判断-->
                            <el-button @click="rec(scope.$index,tableData2,1)" type="text" v-if="scope.row.isStick == 2">取消推荐</el-button>
                            <el-button @click="rec(scope.$index,tableData2,2)" type="text" v-if="scope.row.isStick == 1||scope.row.isStick == null">推荐</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination
                        :size="size"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage[1]"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="size[1]"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total[1]">
                    </el-pagination>
                </div>
            </el-form>
        </el-dialog>
        <el-dialog :visible.sync="dialogFormVisible1" size="">
            <el-form :model="form" style="width: 600px" :inline="true">
                <el-form-item label="提问者：" label-width="90px" class="form_item_mt0 form_item_half" >
                    {{form.userName}}
                </el-form-item>
                <el-form-item label="推荐回答用户：" label-width="90px" class="form_item_mt0 form_item_half">
                    {{form.userName}}
                </el-form-item>
                <el-form-item label="提问/评论：" label-width="90px" class="form_item_mt0 form_item_full">
                    {{form.title}}
                </el-form-item>
                <el-form-item label="推荐回答：" label-width="90px" class="form_item_mt0 form_item_full">
                    {{form.userName}}
                </el-form-item>
                <el-form-item label="浏览量：" label-width="90px" class="form_item_mt0 form_item_half" >
                    {{form.views}}
                </el-form-item>
                <el-form-item label="点赞量：" label-width="90px" class="form_item_mt0 form_item_half">
                    {{form.praiseCount}}
                </el-form-item>
                <el-form-item label="回答量：" label-width="90px" class="form_item_mt0 form_item_half">
                    {{form.answerCount}}
                </el-form-item>
                <el-form-item label="置顶人：" label-width="90px" class="form_item_mt0 form_item_half" v-if="status == 1">
                    {{form.pcLastModifiedUserName}}
                </el-form-item>
                <el-form-item label="置顶时间：" label-width="90px" class="form_item_mt0 form_item_half" v-if="status == 1">
                    {{form.pcLastModifiedDate}}
                </el-form-item>
            </el-form>
            <div class="footer_ope">
                <el-button @click="ope('sure')">确定</el-button>
                <el-button @click="ope('cancel')">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import "@/style/selfCommon.less"
    import { getCookie, delCookie } from '../../../config/mUtils'
    import {getQuestionList,setQuestionStick,setAnswerStick} from "@/api/myData"
    export default {
        // name:"QAManage",
        data () {
            return {
                dialogFormVisible1:false,
                dialogFormVisible:false,
                formInline:{
                    date1:"",
                    doctor:"",
                    keyWords:"",
                    questioner:"",
                    startTimeF:"",
                    endTimeF:"",
                    PraiseCountStart:"",
                    PraiseCountEnd:"",
                    CommentCountStart:"",
                    CommentCountEnd:"",
                    ViewsStart:"",
                    ViewsEnd:""
                },
                form:{},
                total:[0,0],
                size:[10,10],
                dialogMes:{},
                currentPage:[1,1],
                tableData:[],
                tableData2:[],
                questionData:[],
                status:"",
            }
        },
        computed: {
            /* 导出报表参数 tHeader,filterVal,tableData1*/
            // tHeader(){
            //     return ['提问日期', '提问者', '提问者角色', '问题', '答疑医生', '推荐回答','浏览','点赞','评论']
            // },
            // filterVal(){
            //     return ['createDate', 'userName', 'roleName', 'title', '','','views','praiseCount','answerCount']
            // },
            // tableData1(){
            //     return this.tableData
            // },
            // name(){
            //     return "问答管理"
            // }
            /*导出报表参数 tHeader,filterVal,tableData1*/
        },
        mounted(){
            this.onSubmit()
        },
        methods: {
            async setAnswerStick(params,index,ope){
                try{
                    let res = await setAnswerStick(params)
                    if(res.status == true){
                        this.$message({message: '置顶成功', type: 'success'});
                        this.search()
                        this.tableData2[index].isStick = ope
                        this.tableData2.push()
                    }else{
                        this.$message.error('置顶失败');
                    }
                }catch(err){
                    console.log(err)
                }
            },
            async setQuestionStick(params){
                try{
                    let res = await setQuestionStick(params)
                    if(res.status == true){
                        this.$message({message: '置顶成功', type: 'success'});
                        this.search()
                        this.dialogFormVisible1 = false
                    }else{
                        this.$message.error('置顶失败');
                    }
                }catch(err){
                    console.log(err)
                }
            },
            async getQuestionList(params){
                try{
                    let res = await getQuestionList(params)
                    this.total[0] = res.count
                    this.total.push()
                    this.tableData = res.data
                }catch(err){
                    console.log(err)
                }
            },
            dateForm1(val){
                    val = val.formatDates()
                this.formInline.startTimeF = val.substring(0,10)
                this.formInline.endTimeF = val.substring(13)
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                if(this.dialogFormVisible == false){
                    this.size[0] = val
                }else{
                    this.size[1] = val
                }
                this.size.push()
                this.search()
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                if(this.dialogFormVisible == false){
                    this.currentPage[0] = val
                }else{
                    this.currentPage[1] = val
                }
                this.currentPage.push()
                this.search()
            },
            view(index,data){

                this.dialogFormVisible = true
                this.form = data[index]
                this.tableData2 = data[index].answers
                this.total[1] = Number(data[index].answerCount)
            },
            onSubmit(){
                this.currentPage[this.currentIndex] = 1
                this.search()
            },
            search(){
                this.getQuestionList({
                    pageIndex:this.currentPage[0],
                    pageSize:this.size[0],
                    where:this.getConditions()
                })
            },
            getConditions(){
                let abstract = this.formInline.keyWords
                let abs = abstract.length>0?"title like '%"+abstract+ "%'":""
                let conditions = ''
                if(this.formInline.startTimeF){conditions+="CreateDate>='"+this.formInline.startTimeF+"'"}
                if(this.formInline.endTimeF){   conditions+=" and CreateDate<='"+this.formInline.endTimeF+"'" }

                if(this.formInline.ViewsStart){conditions+=" and Views>='"+this.formInline.ViewsStart+"'"}
                if(this.formInline.ViewsEnd){conditions+=" and Views<='"+this.formInline.ViewsEnd+"'"}

                if(this.formInline.PraiseCountStart){conditions+="and PraiseCount>='"+this.formInline.PraiseCountStart+"'"}
                if(this.formInline.PraiseCountEnd){conditions+=" and PraiseCount<='"+this.formInline.PraiseCountEnd+"'"}

                if(this.formInline.CommentCountStart){conditions+="and CommentCount>='"+this.formInline.CommentCountStart+"'"}
                if(this.formInline.CommentCountEnd){conditions+=" and CommentCount<='"+this.formInline.CommentCountEnd+"'"}
                if(abstract){conditions+=" and "+abs}
                return conditions
            },
            setTop(index,data,status){
                this.dialogFormVisible1 = true
                this.form = data[index]
                this.status = status

            },
            ope(params){
                if(params == 'sure'){
                    this.setQuestionStick({
                        id:this.form.id,
                        status:this.status,
                        ModifiedUserName:getCookie('userName'),
                        ModifiedUserId:getCookie('userId')
                    })
                }else{
                    this.dialogFormVisible1 = false
                }
            },
            rec(index,data,ope){

                this.setAnswerStick({
                    id:data[index].id,
                    status:ope,
                    ModifiedUserName:getCookie('userName'),
                    ModifiedUserId:getCookie('userId')
                },index,ope)
            }
        },
        components: {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.block{
    margin-bottom: 10px;
}
</style
>
