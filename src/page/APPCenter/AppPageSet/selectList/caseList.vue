<template>
    <div class="CaseManage selCommon">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="70px">          

            <el-form-item label="关键字" class="form_item_mt10 form_item_wh280">
                <el-input v-model="formInline.abstract" placeholder="医生/设计师/项目小类" style="width: 200px;"></el-input>
            </el-form-item>

            <el-form-item label=" " class="form_item_mt10 form_item_wh280">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
            </el-form-item>
        </el-form>
        <!-- 信息表 -->
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" height="460">
            <el-table-column type="index" width="40" label="序号" ></el-table-column>
            <el-table-column prop="firsPic" label="术前" min-width="65">
                <template slot-scope="scope">
                    <span v-if="scope.row.firsPic">
                         <img :src="baseImgPath+scope.row.firsPic" alt="" width="50" height="50" style="vertical-align: middle">
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="lastPic" label="术后" min-width="65">
                <template slot-scope="scope">
                     <span v-if="scope.row.lastPic">
                         <img :src="baseImgPath+scope.row.lastPic" alt="" width="50" height="50" style="vertical-align: middle">
                     </span>
                </template>
            </el-table-column>

        <el-table-column prop="hospitalName" label="医院" min-width="130"></el-table-column>
        <el-table-column prop="doctorName" label="医生" min-width="80"></el-table-column>
        <el-table-column prop="catalogName" label="项目小类" min-width="100" show-overflow-tooltip=""></el-table-column>
         <el-table-column prop="operationDate" label="手术日期" min-width="90">
             <template slot-scope="scope">
                 <span v-if="scope.row.operationDate">{{scope.row.operationDate.substring(0,10)}}</span>
             </template>
         </el-table-column>
            <!-- <el-table-column prop="userName" label="发布人" min-width="80"></el-table-column> -->
            <!-- <el-table-column prop="catalogName" label="项目小类" min-width="150">
                <template slot-scope="scope">
                    <el-button type="text" @click="projectView(scope.$index,tableData)">{{scope.row.catalogName}}</el-button>
                </template> -->
              <!--  <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>{{ scope.row.catalogName }}</p>
                        <div slot="reference" class="name-wrapper">
                            <span class="overEllipsis">{{ scope.row.catalogName }}</span>
                        </div>
                    </el-popover>
                </template>-->
            <!-- </el-table-column> -->

            <el-table-column prop="status" label="操作" min-width="90">
                <template slot-scope="scope">
                    <!--状态判断-->
                  <el-button  size="mini" icon="edit" @click="select(scope)"> 选择</el-button>
                  <!-- <el-button  size="mini" icon="delete" @click="unSelect(scope.$index)">取消选择</el-button> -->
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


    </div>
</template>

<script type="text/ecmascript-6">
    import { getCookie, delCookie } from '@/config/mUtils'
    import {Case,CaseComment} from "@/api/myData"
    import {baseImgPath} from "@/config/env"
    import  "@/style/selfCommon.less"
    export default {
        data () {
            return {
                baseImgPath:baseImgPath,
                noteMes:[],
                total:0,
                size:10,
                currentPage:1,
                formInline: {
                    abstract:"",
                },
                tableData:[],
                form:{},
            }
        },
        computed: {

        },
        mounted(){
            this.getCase({pageIndex: this.currentPage, pageSIze: this.size,where:""})
        },
        methods:{
             select(item) {
                // item.column.type='primary';
                this.$emit('CaseSelectInfo',item.row.id, item.row.firsPic,item.row.lastPic, item.row.title,item.row.catalogName)
            },


            async getCase(params){
                try{
                    let res = await Case(params)
                    this.total = res.count
                    this.tableData = this.getPicture(res.data)
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

            getPicture(data){

                data.forEach(row=>{
                    if( row.pictures){
                        row.pictures = row.pictures.split("#")

                        row.firsPic = row.pictures[0]
                    }

                    if(row.caseRecords){
                        if(row.caseRecords.length !=0){
                            row.lastPic = row.caseRecords[row.caseRecords.length-1].pictures.split("#")[0]
                        }
                    }else{
                        row.lastPic = ""
                    }
                })

                return data
            },
            search(){

                this.getCase({
                    pageIndex: this.currentPage, pageSIze: this.size,
                    where:this.getConditions()
                })
            },
            getConditions(){
                let abstract = this.formInline.abstract
                let abs = abstract.length>0?"doctorName like '%"+abstract+"%' or catalogName like '%"+abstract + "%' or designerName like '%"+abstract+ "%'":""
                let str = abs
                // this.getStr(date1,date2,"CreateDate")+" and "+
                //     this.getStr(date3,date4,"OperationDate")+" and " +
                //     this.getNull(this.formInline.userName,"userName")+" and "+
                //     this.getNull(this.formInline.CatalogName,"CatalogName")+" and "+
                //     this.getNull(this.formInline.HospitalName,"HospitalName")+" and "+
                //     this.getNull(this.formInline.DoctorName,"DoctorName")+" and "+
                //     this.getNull(this.formInline.OperationMark,"OperationMark")+" and " +
                //     this.getStr(this.formInline.ViewsStart,this.formInline.ViewsEnd,"Views")+" and " +
                //     this.getStr(this.formInline.PraiseCountStart,this.formInline.PraiseCountEnd,"PraiseCount")+" and " +
                //     this.getStr(this.formInline.CommentCountStart,this.formInline.CommentCountEnd,"CommentCount")
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
        },

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .CaseManage{
        text-align: left
    }
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
