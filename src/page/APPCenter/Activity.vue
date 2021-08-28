<template>
    <div class="Activity newNotice selCommon">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px">
            <el-form-item label="活动日期："  class="form_item_mt10 ">
                <el-date-picker
                    v-model="date"
                    type="daterange"
                    style="width: 200px"
                    @change="dateSelect"
                    placeholder="选择日期范围">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="发布日期："  class="form_item_mt10 ">
                <el-date-picker
                    v-model="date1"
                    type="daterange"
                    style="width: 200px"
                    @change="dateSelect1"
                    placeholder="选择日期范围">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="发布人："  class="form_item_mt10 form_item_wh280">
                <el-input v-model="formInline.userName" placeholder="" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item label="关键字：" class="form_item_mt10 form_item_wh280">
                <el-input v-model="formInline.abstract" placeholder="" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item label="浏览量："  class="form_item_mt10 form_item_wh280">
                <el-input v-model="formInline.viewsStart" placeholder="" style="width: 92px;"></el-input>
                <span style="float: left;margin-right: 5px">-</span>
                <el-input v-model="formInline.viewsEnd" placeholder="" style="width: 92px;"></el-input>
            </el-form-item>
            <el-form-item label="点赞量："  class="form_item_mt10 form_item_wh280">
                <el-input v-model="formInline.praiseCountStart" placeholder="" style="width: 92px;"></el-input>
                <span style="float: left;margin-right: 5px">-</span>
                <el-input v-model="formInline.praiseCountEnd" placeholder="" style="width: 92px;"></el-input>
            </el-form-item>
            <el-form-item label="评论量：" class="form_item_mt10 form_item_wh280">
                <el-input v-model="formInline.commentCountStart" placeholder="" style="width: 92px;"></el-input>
                <span style="float: left;margin-right: 5px">-</span>
                <el-input v-model="formInline.commentCountEnd" placeholder="" style="width: 92px;"></el-input>
            </el-form-item>
            <el-form-item label="转化量："  class="form_item_mt10 form_item_wh280">
                <el-input v-model="formInline.conversionCountStart" placeholder="" style="width: 92px;"></el-input>
                <span style="float: left;margin-right: 5px">-</span>
                <el-input v-model="formInline.conversionCountEnd" placeholder="" style="width: 92px;"></el-input>
            </el-form-item><br/>
            <el-form-item label=" " class="form_item_mt10 form_item_wh280">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
                <el-button type="primary" @click="publish" class="searchBtn">发布新活动</el-button>
            </el-form-item>
        </el-form>
        <ul>
            <li class="shelve" :class="{'active':currentIndex===0}" @click="select(0)">已发布</li>
            <li class="shelve" :class="{'active':currentIndex===1}" @click="select(1)">已撤回</li>
        </ul>
        <div v-show="currentIndex===0">
            <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;min-height: 400px" max-height="560">
                <el-table-column type="index" width="40"></el-table-column>
                <el-table-column prop="code" label="活动编号" min-width="80"></el-table-column>
                <el-table-column prop="pictureUrl" label="封面图" min-width="80">
                    <template slot-scope="scope">
                        <img :src="scope.row.pictureUrl" alt="" width="50" height="50">
                    </template>
                </el-table-column>
                <el-table-column prop="outTitle" label="外部标题" min-width="120"></el-table-column>
                <el-table-column prop="inTitle" label="内部标题" min-width="200"></el-table-column>
                <el-table-column prop="author" label="作者" min-width="80"></el-table-column>
                <el-table-column prop="abstract" label="摘要" min-width="200" show-overflow-tooltip></el-table-column>
                <el-table-column prop="province" label="活动地区" min-width="150">
                    <template slot-scope="scope">
                        <span v-if="scope.row.province"> {{scope.row.province}}</span>
                        <span v-if="scope.row.city"> {{scope.row.city}}</span>
                        <span v-if="scope.row.area"> {{scope.row.area}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="activeDate" label="活动日期" min-width="120">
                    <template slot-scope="scope">
                        {{scope.row.activeDate.substring(0,10)}}
                    </template>
                </el-table-column>
                <el-table-column prop="views" label="浏览" min-width="60"></el-table-column>
                <el-table-column prop="shareCount" label="分享" min-width="60"></el-table-column>
                <el-table-column prop="createBy" label="发布人" min-width="80"></el-table-column>
                <el-table-column prop="createDate" label="发布时间" min-width="120">
                    <template slot-scope="scope">
                        {{scope.row.createDate.substring(0,10)}}
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="操作" min-width="150">
                    <template slot-scope="scope">
                        <el-button @click="setPublish(scope.$index,tableData,'3')" type="text">撤回</el-button>
                        <!--状态判断-->
                        <el-button @click="setTop(scope.$index,tableData,2)" type="text" v-if="scope.row.status ==1 ">置顶</el-button>
                        <el-button @click="setTop(scope.$index,tableData,1)" type="text" v-if="scope.row.status ==2 ">取消置顶</el-button>
                    </template>
                </el-table-column>
            </el-table>
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
        </div>
        <div v-show="currentIndex===1">
            <el-table :data="tableData2" border style="width: 100%;margin-top:15px;margin-bottom:10px;" max-height="460">
                <el-table-column type="index" width="40" label="序号"></el-table-column>
                <el-table-column prop="code" label="活动编号" min-width="120"></el-table-column>
                <el-table-column prop="pictureUrl" label="封面图" min-width="80">
                    <template slot-scope="scope">
                        <img :src="scope.row.pictureUrl" alt="" width="50" height="50">
                    </template>
                </el-table-column>
                <el-table-column prop="outTitle" label="外部标题" min-width="80"></el-table-column>
                <el-table-column prop="inTitle" label="内部标题" min-width="80"></el-table-column>
                <el-table-column prop="author" label="作者" min-width="80"></el-table-column>
                <el-table-column prop="abstract" label="摘要" min-width="80" show-overflow-tooltip></el-table-column>
                <el-table-column prop="province" label="活动地区" min-width="150">
                    <template slot-scope="scope">
                        <span v-if="scope.row.province"> {{scope.row.province}}</span>
                        <span v-if="scope.row.city"> {{scope.row.city}}</span>
                        <span v-if="scope.row.area"> {{scope.row.area}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="activeDate" label="活动日期" min-width="120"></el-table-column>
                <el-table-column prop="views" label="浏览" min-width="120"></el-table-column>
                <el-table-column prop="shareCount" label="分享" min-width="120"></el-table-column>
                <el-table-column prop="createBy" label="发布人" min-width="120"></el-table-column>
                <el-table-column prop="createDate" label="发布时间" min-width="120"></el-table-column>
                <el-table-column prop="closeBy" label="撤回人" min-width="120"></el-table-column>
                <el-table-column prop="closeDate" label="撤回时间" min-width="120"></el-table-column>
                <el-table-column prop="grade" label="操作" min-width="100">
                    <template slot-scope="scope">
                        <el-button @click="setPublish(scope.$index,tableData2,'1')" type="text">发布</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="block">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage[1]"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="size[1]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total[1]">
                </el-pagination>
            </div>
            <!-- 分页 -->
        </div>
        <!--发布活动-->
        <el-dialog size="" :visible.sync="dialogVisible" title="发布新活动">
            <div v-if="dialogVisible" style="width: 600px">
                <activity @closeAct="closeAct"></activity>
            </div>
        </el-dialog>
        <!--置顶操作-->
        <el-dialog size="" :visible.sync="dialogVisible1" :title="setTopTitle">
            <el-form :model="form" style="width: 400px">
                <el-form-item label="发布人：" class="form_item_mt10 form_item_wh280">
                    <span v-if="form.userName">{{form.userName}}</span></el-form-item>
                <el-form-item label="浏览量：" class="form_item_mt10 form_item_wh280">{{form.views}}</el-form-item>
                <el-form-item label="外部标题：" class="form_item_mt10 form_item_wh280">{{form.outTitle}}</el-form-item>
                <el-form-item label="内部标题：" class="form_item_mt10 form_item_wh280">{{form.inTitle}}</el-form-item>
                <el-form-item label="摘要：" class="form_item_mt10 form_item_wh280">{{form.abstract}}</el-form-item>
                <div v-if="state != 2">
                    <el-form-item label="置顶人：" class="form_item_mt10 form_item_wh280">{{form.modifiedBy}}</el-form-item>
                    <el-form-item label="置顶时间：" class="form_item_mt10 form_item_wh280">{{form.modifiedOn}}</el-form-item>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="sure">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import {baseImgPath} from "@/config/env"
    import { getCookie, delCookie } from '@/config/mUtils'
    import {GetActive,GetCancelActive,ActiveSetStick,ActiveCancelStick,SetActiveNormal,SetActiveClose} from "@/api/myData"
    import  "@/style/selfCommon.less"

    import activity from "./components/newActivity.vue"
    export default {
        data () {
            return {
                date:"",
                date1:"",
                currentIndex:0,
                total:[10,10],
                size:[10,10],
                currentPage:[1,1],
                dialogVisible:false,
                dialogVisible1:false,
                setTopTitle:'',
                state:'',
                formInline: {
                    date1: '',
                    date2: '',
                    date3:'',
                    date4:'',
                    abstract:"",
                    userName:"",
                    viewsStart:"",
                    viewsEnd:"",
                    praiseCountStart:"",
                    praiseCountEnd:"",
                    commentCountStart:"",
                    commentCountEnd:"",
                    conversionCountStart:"",
                    conversionCountEnd:""
                },
                tableData:[],
                tableData2:[],
                form:{}
            }
        },
        computed: {
         
        },
        mounted(){
            this.getActive({
                pageIndex:1,
                pageSize:10
            })
        },
        methods:{
            getName(data){
                let name=""
                if(data.province){
                    name = data.province
                    if(data.city){
                        name += data.city
                        name += data.area?data.area:""
                    }
                }else{}
                return name
            },
//发布
            async SetActiveNormal(params,ope){
                try{
                    let res = await SetActiveNormal(params)
                    if(res.status == true){
                        this.$message({message: '操作成功', type: 'success'});
                        this.search(this.currentIndex)
                    }else{
                        this.$message.error('操作失败');
                    }
                }catch(err){
                    console.log(res)
                    this.$message.error('操作失败');
                }
            },
            async SetActiveClose(params){
                try{
                    let res = await SetActiveClose(params)
                    if(res.status == true){
                        this.$message({message: '操作成功', type: 'success'});
                        this.search(this.currentIndex)
                    }else{
                        this.$message.error('操作失败');
                    }
                }catch(err){
                    console.log(res)
                    this.$message.error('操作失败');
                }
            },
//            置顶
            async activeSetStick(params){
                try{
                    let res = await ActiveSetStick(params)
                    if(res.status == true){
                        this.$message({message: '操作成功', type: 'success'});
                        this.search()
                        this.dialogVisible1 = false
                    }else{
                        this.$message.error('操作失败');
                    }
                }catch(err){
                    console.log(res)
                    this.$message.error('操作失败');
                }
            },
//            取消置顶
            async activeCancelStick(params){
                try{
                    let res = await ActiveCancelStick(params)
                    if(res.status == true){
                        this.$message({message: '操作成功', type: 'success'});
                        this.search()
                        this.dialogVisible1 = false
                    }else{
                        this.$message.error('操作失败');
                    }
                }catch(err){
                    console.log(res)
                    this.$message.error('操作失败');
                }
            },
//            已发布活动
            async getActive(params){
                try{
                    let res = await GetActive(params)
                    if(res.status == true){
                        this.tableData = this.dealData(res.data)
                        this.total[this.currentIndex] = res.count
                    }
                }catch(err){
                    console.log(err)
                }
            },
//            已撤回活动
            async getCancelActive(params){
                try{
                    let res = await GetCancelActive(params)
                    if(res.status == true){
                        this.tableData2=this.dealData(res.data)
                        this.total[this.currentIndex] = res.count
                    }
                    console.log(res)
                }catch(err){
                    console.log(err)
                }
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
            select(num){
                this.currentIndex = num
                this.search(num)
            },
            onSubmit(){
                this.currentPage[this.currentIndex] = 1
                this.search()
            },
            publish(){
                this.dialogVisible = true
            },
            setPublish(index,data,state){
                let ope=""
                if(state == 1){
                    ope = "该操将重新发布活动，是否继续"
                }else{
                    ope = "该操将撤回该活动，是否继续"
                }
                this.$confirm(ope, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if(state ==1){
                        this.SetActiveNormal({
                            id: data[index].id,
                            modifiedUserId: getCookie("userId"),
                            modifiedBy: getCookie("userName"),
                            status:state
                        })
                    }else{
                        this.SetActiveClose({
                            id: data[index].id,
                            modifiedUserId: getCookie("userId"),
                            modifiedBy: getCookie("userName"),
                            status:state
                        })
                    }
                }).catch(() => {
                });
            },
            setTop(index,data,num){
//                2置顶 1取消置顶
                if(num == 2){
                    this.setTopTitle = "置顶"
                }else{
                    this.setTopTitle = "取消置顶"
                }
                this.dialogVisible1 = true
                this.state = num
                this.form = data[index]
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.size[this.currentIndex] = val
                this.search()
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage[this.currentIndex] = val
                this.search()
            },
            closeAct(val){
                this.dialogVisible = false
                this.search()
            },
            sure(){

                let state = this.state
                this.dialogVisible1 = true

                if(this.state == 2){
                    this.activeSetStick({
                        id:this.form.id,
                        modifiedUserId: getCookie("userId"),
                        modifiedBy: getCookie("userName"),
                        status:state
                    })
                }else{
                    this.activeCancelStick({
                        id:this.form.id,
                        modifiedUserId: getCookie("userId"),
                        modifiedBy: getCookie("userName"),
                        status:state
                    })
                }

            },
            cancel(){
                this.dialogVisible1 = false
            },
            search(num){

                if(num==1){
                    this.getCancelActive({
                        pageIndex:this.currentPage[this.currentIndex],
                        pageSize:this.size[this.currentIndex],
                        where:this.getConditions()
                    })
                }  else{
                    this.getActive({
                        pageIndex:this.currentPage[this.currentIndex],
                        pageSize:this.size[this.currentIndex],
                        where:this.getConditions()
                    })
                }
            },
            getConditions(){
                let date1 = this.formInline.date1
                let date2 = this.formInline.date2
                let date3 = this.formInline.date3
                let date4 = this.formInline.date4
                let abstract = this.formInline.abstract
                let abs = abstract.length>0?"inTitle like '%"+abstract+"%' or outTitle like '%"+abstract + "%' or abstract like '%"+abstract+ "%'":""
                let str = this.getStr(date1,date2,"activeDate")+" and "+
                    this.getStr(date3,date4,"createDate")+" and "+
                    this.getNull(this.formInline.userName,"createBy") +" and "+abs+" and "+
                    this.getStr(this.formInline.viewsStart,this.formInline.viewsEnd,"views")+" and " +
                    this.getStr(this.formInline.praiseCountStart,this.formInline.praiseCountEnd,"praiseCount")+" and " +
                    this.getStr(this.formInline.commentCountStart,this.formInline.commentCountEnd,"commentCount")+" and " +
                    this.getStr(this.formInline.conversionCountStart,this.formInline.conversionCountEnd,"conversion")
                return str
            },
            getStr(date1,date2,key){
                if(date1.length!=0&&date2.length!=0){
                    return key+this.getMinStr(date1)+" and " + key + this.getMaxStr(date2)
                }else{
                    if(date1.length!=0){
                        return key+this.getMinStr(date1)
                    }else{
                        if(date2.length!= 0){
                            return key + this.getMaxStr(date2)
                        }else{
                            return ""
                        }
                    }
                }
            },
            getMinStr(data){
                if(data.length !=0){
                    return ">"+"'"+data+"'"
                }else{
                    return ""
                }
            },
            getMaxStr(data){
                if(data.length !=0){
                    return "<"+"'"+data+"'"
                }else{
                    return ""
                }
            },
            getNull(data,key){
                if(data.length!=0){
                    return key+"="+"'"+data+"'"
                }else{
                    return ""
                }
            },
            dealData(data){
                data.forEach(row=>{
                    if(row.pictureUrl){
                        row.pictureUrl = baseImgPath + row.pictureUrl
                    }else{
                        row.pictureUrl = ""
                    }
                })
                return data
            }
        },
        components: {
            activity
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
