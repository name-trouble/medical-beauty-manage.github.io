<template>
    <div class="CaseManage selCommon">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px"  >
            <el-form-item label="发布时间："  class="form_item_mt10 form_item_wh280">
                <el-date-picker v-model="date" type="daterange" style="width: 200px" @change="dateSelect" placeholder="选择日期范围">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="手术时间：" class="form_item_mt10 form_item_wh280">
                <el-date-picker v-model="date1" type="daterange" style="width: 200px" @change="dateSelect1" placeholder="选择日期范围"></el-date-picker>
            </el-form-item>
            <el-form-item label="发布人："  class="form_item_mt10 form_item_wh280">
                <el-input v-model="formInline.userName" placeholder="" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item label="关键字：" class="form_item_mt10 form_item_wh280">
                <el-input v-model="formInline.keyWords" placeholder="发布人/项目小类/医院/医生" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item label="综合评价：" class="form_item_mt10 form_item_wh280">
                <el-input v-model="formInline.OperationMark" placeholder="" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item label="审核状态：" class="form_item_mt10 form_item_wh280">
                <el-select placeholder="请选择" v-model="formInline.isAudit">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="通过" value="1"></el-option>
                    <el-option label="未通过" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label=" " class="form_item_mt10 form_item_wh280">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
            </el-form-item>
        </el-form>
        <!-- 信息表 -->
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" class="smt min_table" max-height="500">
            <el-table-column prop="firsPic" label="术前" min-width="80">
                <template slot-scope="scope">
                    <span v-if="scope.row.firsPic">
                         <img :src="baseImgPath+scope.row.firsPic" alt="" width="50" height="50" style="vertical-align: middle">
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="lastPic" label="术后" min-width="80">
                <template slot-scope="scope">
                     <span v-if="scope.row.lastPic">
                         <img :src="baseImgPath+scope.row.lastPic" alt="" width="50" height="50" style="vertical-align: middle">
                     </span>
                </template>
            </el-table-column>
            <el-table-column prop="lastRecordContent" label="最新日记" min-width="150" show-overflow-tooltip></el-table-column>
            <el-table-column prop="userRealName" label="发布人" min-width="80"></el-table-column>
            <el-table-column prop="operationDate" label="手术日期" min-width="100">
                <template slot-scope="scope">
                    <span v-if="scope.row.operationDate">
                        {{scope.row.operationDate.substring(0,10)}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="catalogName" label="项目小类" min-width="150" show-overflow-tooltip></el-table-column>
            <el-table-column prop="hospitalName" label="医院" min-width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="designerName" label="设计师" min-width="100"></el-table-column>
            <el-table-column prop="doctorName" label="医生" min-width="100"></el-table-column>
            <el-table-column prop="serviceMark" label="服务评价" min-width="90"></el-table-column>
            <el-table-column prop="doctorMark" label="医生评价" min-width="90"></el-table-column>
            <el-table-column prop="operationMark" label="综合评价" min-width="90"></el-table-column>
            <el-table-column prop="views" label="浏览量" min-width="80"></el-table-column>
            <el-table-column prop="praiseCount" label="点赞量" min-width="80"></el-table-column>
            <el-table-column prop="commentCount" label="评论量" min-width="80">
                <template slot-scope="scope">
                    <el-button type="text" @click="noteView(scope.row,5)" v-if="scope.row.commentCount>0">{{scope.row.commentCount}}</el-button>
                    <span v-else>0</span>
                </template>
            </el-table-column>
            <el-table-column prop="recordCount" label="日记篇数" min-width="90">
                <template slot-scope="scope">
                    <el-button type="text" @click="noteView(scope.row,2)" v-if="scope.row.recordCount>0">{{scope.row.recordCount}}</el-button>
                    <span v-else>0</span>
                </template>
            </el-table-column>
            <el-table-column prop="isAudit" label="审核状态" min-width="100" align="center">
                <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.isAudit == 1">通过</el-tag>
                    <el-tag type="warning" v-if="scope.row.isAudit == 0">未审核</el-tag>
                    <el-tag type="danger" v-if="scope.row.isAudit == 2">拒绝</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="操作" min-width="270" fixed="right">
                <template slot-scope="scope">
                    <!--状态判断-->
                    <el-button @click="setTop(scope.$index,tableData,1)" size="small" type="primary" v-if="scope.row.status == 2">取消置顶</el-button>
                    <el-button @click="setTop(scope.$index,tableData,2)" size="small" type="primary" v-if="scope.row.status == 1">置顶</el-button>
                    <el-button @click="approve(scope.row,1)" size="small" type="primary">通过</el-button>
                    <el-button @click="approve(scope.row,2)" size="small" type="primary">拒绝</el-button>
                    <el-button @click="del(scope.row)" size="small" type="primary">删除</el-button>
                    <el-button @click="replacePho(scope.row,'案例图片')" size="small" type="primary">替换</el-button>
                </template>
            </el-table-column>
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

        <el-dialog title="日记篇数" :visible.sync="dialogTableVisible[2]" size="">
            <!--<div v-if="dialogTableVisible[2]" style="width: 850px">-->
            <el-form  :model="form" :inline="true" class="demo-form-inline" label-width="80px">
                <el-form-item label="发布人："  class="form_item_mt0">
                    <span>{{form.userName}}</span>
                </el-form-item>
                <el-form-item label="项目：" class="form_item_mt0 ">
                    <span>{{form.catalogName}}</span>
                </el-form-item>
                <el-form-item label="医院："  class="form_item_mt0 ">
                    <span>{{form.hospitalName}}</span>
                </el-form-item>
                <el-form-item label="医生："  class="form_item_mt0 ">
                    <span>{{form.doctorName}}</span>
                </el-form-item>
            </el-form>

            <div v-if="dialogTableVisible[2]">
                <noteView ref="noteView" :operationDate="operationDate" :noteMes="noteMes" @addRecord="addRecord" @search="search"></noteView>
            </div>
        </el-dialog>
        <!--置顶操作-->
        <el-dialog title="置顶" :visible.sync="dialogTableVisible[3]" size="">
            <el-form  :model="form" class="demo-form-inline" label-width="80px">
                <el-form-item label="发布人："  class="form_item_mt0 form_item_wh280">
                    {{form.userName}}
                </el-form-item>
                <el-form-item label="点赞量："  class="form_item_mt0 form_item_wh280">
                    {{form.praiseCount}}
                </el-form-item>
                <el-form-item label="发布时间："  class="form_item_mt0 form_item_wh280">
                    {{form.createDate}}
                </el-form-item>
                <el-form-item label="最新日记："  class="form_item_mt0 form_item_wh280">
                    {{form.name}}
                </el-form-item>
                <el-form-item label="浏览量："  class="form_item_mt0 form_item_wh280">
                    {{form.views}}
                </el-form-item>
                <el-form-item label="点赞量："  class="form_item_mt0 form_item_wh280">
                    {{form.praiseCount}}
                </el-form-item>
                <el-form-item label="评论量："  class="form_item_mt0 form_item_wh280">
                    {{form.commentCount}}
                </el-form-item>
                <el-form-item label="置顶人："  class="form_item_mt0 form_item_wh280" v-if="state == 1">
                    {{form.modifiedBy}}
                </el-form-item>
                <el-form-item label="置顶时间："  class="form_item_mt0 form_item_wh280" v-if="state == 1">
                    {{form.modifiedDate}}
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="sure">确定</el-button>
                    <el-button @click="cancel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!--更换图片-->
        <el-dialog :title="title" :visible.sync="dialogTableVisible[4]" size="">
            <editPhoto :caseData="caseData" v-if="dialogTableVisible[4]" @closeDialog="closeDialog"></editPhoto>
        </el-dialog>
        <!-- 评论管理 -->
        <el-dialog title="评论管理" :visible.sync="dialogTableVisible[5]" size="">
            <comment  :themeType="6" v-if="dialogTableVisible[5]" :propsId="propsId" style="width:1000px;" @search="search"></comment>
        </el-dialog>
        <!-- 日记管理 -->
        <el-dialog :title="title" :visible.sync="dialogTableVisible[6]" size="">
            <AddCase v-if="dialogTableVisible[6]" :caseMes="caseMes" @cancel="closeDialog" style="width:600px;"></AddCase>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import { getCookie, delCookie } from '@/config/mUtils'
    import {baseImgPath} from "@/config/env"
    import  "../../../style/selfCommon.less"
    import {Case,CaseComment,SetStick,Audit,caseId,caseDelete} from "@/api/myData"
    import noteView from "./components/noteView.vue"
    import editPhoto from "./components/editPhoto"
    import comment from "./components/commentView.vue"
    import AddCase from "./components/addCase.vue"
    export default {
        // name: "CaseManage",
        data () {
            return {
                baseImgPath,
                date:"",
                date1:"",
                noteMes:[],
                total:0,
                size:10,
                currentPage:1,
                dialogTableVisible:[false,false,false,false,false,false,false],
                formInline: {
                    keyWords:"",
                    date1: '',
                    date2: '',
                    date3:"",
                    date4:"",
                    userName:"",
                    CatalogName:"",
                    HospitalName:"",
                    DoctorName:"",
                    OperationMark:"",
                    ViewsStart:"",
                    ViewsEnd:"",
                    PraiseCountStart:"",
                    PraiseCountEnd:"",
                    CommentCountStart:"",
                    CommentCountEnd:"",
                    grade: '',
                    referrerName:"",
                    branchName:"",
                    region:"",
                    isAudit:'',
                },
                tableData:[],
                gridData:[],
                form:{},
                state:"",//置顶状态 1普通 2置顶 3屏蔽
                caseData:{},
                title:'',
                operationDate:'',
                propsId:'',
            }
        },
        computed: {

        },
        mounted(){
            this.getCase({pageIndex: this.currentPage, pageSIze: this.size,where:""})
        },
        methods:{
            addRecord(caseMes){
                this.dialogOpe(6)
                caseMes.caseData = this.form
                this.caseMes = caseMes
            },
            closeDialog(val,index){

                this.dialogTableVisible[index] = false
                this.dialogTableVisible.push()
                if(val) this.search(index)
            },
            async setStick(params){
                try{
                    let res = await SetStick(params)
                    if(res.status){
                        this.$message({message: '操作成功', type: 'success'});
                        this.search()
                    }else{
                        this.$message.error('操作失败')
                    }
                }catch(err){
                    this.$message.error('操作失败')
                }
            },
            async getCase(params,index){
                try{
                    let res = await Case(params)
                    this.total = res.count
                    this.tableData = this.getPicture(res.data)

                    if(index == 6){//更新日记弹窗数据
                        this.tableData.forEach(row=>{
                            if(this.form.id == row.id){
                                this.noteMes = row.caseRecords
                                this.$refs.noteView.delMes(this.noteMes)//更新组件数据触发视图更新
                            }
                            if(row.id == 1043){

                            }
                        })
                    }
                }catch(err){
                    console.log(err)
                }
            },
            async caseComment(params){
                try{
                    let res = await CaseComment(params)
                }catch(err){
                    console.log(err)
                }
            },
            onSubmit(){
                this.currentPage = 1
                this.search()
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.size = val
                this.search()
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val
                this.search()
            },

            setTop(index,data,num){
//              num  1取消置顶操作 2置顶操作
                this.dialogOpe(3)
                this.state = num
                this.form = data[index]
                this.state = num
            },
//            项目小类
            projectView (index,data) {

            },
//            点赞量
            praiseView (index,data) {
                this.dialogOpe(1)
            },
//          弹窗
            noteView(data,index){
                this.propsId = data.id
                this.noteMes = JSON.parse(JSON.stringify(data.caseRecords))
                this.operationDate = data.operationDate
                this.dialogOpe(index)
                this.form = data
            },
            dialogOpe (index){
                this.dialogTableVisible[index] = true
                this.dialogTableVisible.push()
            },
            sure(){
                this.dialogTableVisible[3] = false
                this.dialogTableVisible.push()
                    this.setStick({
                        id:this.form.id,
                        modifiedUserId:getCookie("userId"),
                        modifiedBy:getCookie("userName"),
                        modifiedOn:new Date().formatDate("yyyy-MM-dd"),
                        status:this.state
                    })
            },
            cancel(){
                this.dialogTableVisible[3] = false
                this.dialogTableVisible.push()
            },

            dateSelect(val){
                if(val.length!=0){
                    val = val.formatDates()
                    this.formInline.date1 = val.substring(0,10)
                    this.formInline.date2 = val.substring(13)
                }else{
                    this.formInline.date1 = ""
                    this.formInline.date2 = ""
                }

            },

            dateSelect1(val){
                if(val.length!=0){
                    val = val.formatDates()
                    this.formInline.date3 = val.substring(0,10)
                    this.formInline.date4 = val.substring(13)
                }else{
                    this.formInline.date3 = ""
                    this.formInline.date4 = ""
                }

            },

            getPicture(data){
                data.forEach(row=>{
                    if( row.pictures){
                        row.pictures = row.pictures.split("#")
                        for(let i = 0;i<row.pictures.length;i++){
                            row.pictures[i] = row.pictures[i]
                        }
                        row.firsPic = row.pictures[0]
                    }

                    if(row.caseRecords){
                        if(row.caseRecords.length !=0){
                            if (row.caseRecords[row.caseRecords.length-1].pictures) {
                                row.lastPic = row.caseRecords[row.caseRecords.length-1].pictures.split("#")[0]
                            }
                        }
                    }else{
                        row.lastPic = ""
                    }
                })

                return data
            },
            search(index){
                this.getCase({
                    pageIndex: this.currentPage,
                    pageSIze: this.size,
                    where:this.getConditions()
                },index)
            },
            getConditions(){
                let date1 = this.formInline.date1
                let date2 = this.formInline.date2
                let date3 = this.formInline.date3
                let date4 = this.formInline.date4
                let abstract = this.formInline.keyWords
                let abs = abstract.length>0?"userName like '%"+abstract+"%' or hospitalName like '%"+abstract +"%' or catalogName like '%"+abstract +"%' or doctorName like '%"+abstract +"%'":""
                let conditions = ''
                if(date1){conditions+="CreateDate>='"+date1+"'"}
                if(date2){conditions+=" and CreateDate<='"+date2+"'"}
                if(date3){conditions+=" and OperationDate>='"+date3+"'"}
                if(date4){conditions+=" and OperationDate<='"+date4+"'"}
                if(this.formInline.isAudit){ conditions+=" and isAudit='"+this.formInline.isAudit+"'"}
                if(this.formInline.OperationMark){conditions+=" and OperationMark='"+this.formInline.OperationMark+"'" }
                if(this.formInline.keyWords){ conditions+=" and "+abs}
                return conditions
            },

            approve(data,status){
                let text = status == 1?'审核通过':'拒绝'
                this.$prompt('备注', text, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                }).then(({ value }) => {
                    this.Audit({
                        id:data.id,
                        isAudit: status,
                        describe: value
                    })
                })
            },
            async Audit(params){
                let res = await Audit(params)
                if(res.status){
                    this.$message({message: '操作成功', type: 'success'});
                    this.search()
                }else{
                    this.$message.error('操作失败'+res.errorMessage)
                }
            },

            del(row){
                this.$confirm('是否确定删除该案例?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.caseDelete(row.id)
                })
            },
            replacePho(row,title){
                this.caseData = JSON.parse(JSON.stringify(row))
                this.title = title
                this.dialogOpe(4)
            },
            async caseDelete(id){
                let res = await caseDelete({caseId:id})
                if(res.status){
                    this.$message({message: '操作成功', type: 'success'});
                    this.search()
                }else{
                    this.$message.error('操作失败'+res.errorMessage)
                }
            }
        },
        components: {
            noteView,
            editPhoto,
            comment,AddCase
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .CaseManage{}
    .form_item_wh280{
        width: 290px;
    }
    .overEllipsis{
        width: 100%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
    }
</style>
