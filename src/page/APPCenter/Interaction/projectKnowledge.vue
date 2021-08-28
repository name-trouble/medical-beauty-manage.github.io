<template>
    <div class="projectKnowledge selCommon">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px">
            <el-form-item label="大类：" class="form_item_mt10">
                <el-select v-model="formInline.class" placeholder="" style="width: 200px;" @change="getSubClass">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in Class" :label="item.name" :value="item.code" :key="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="中类：" class="form_item_mt10">
                <el-select v-model="formInline.subClass" placeholder="" style="width: 200px;" @change="getLabel">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in subClass" :label="item.name" :value="item.code" :key="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="小类：" class="form_item_mt10">
                <el-select v-model="formInline.label" placeholder="" style="width: 200px;">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in label" :label="item.name" :value="item.code" :key="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="关键字：" class="form_item_mt10">
                <el-input v-model="formInline.keyWords" placeholder="" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item label=" " class="form_item_mt10">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
                <!-- <Export :tHeader="tHeader" :filterVal=' filterVal' :tableData1='tableData1' :name='name'></Export> -->
                <el-button @click="add" type="primary">添加</el-button>
            </el-form-item>
        </el-form>
        <!-- 信息表 -->
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;"  class="smt min_table" max-height="500">
            <el-table-column prop="number" label="编号" min-width="150"></el-table-column>
            <el-table-column prop="catalogCloumnName" label="分类" min-width="120">
                <template slot-scope="scope">
                    <span v-if="scope.row.firstCatalogName">{{scope.row.firstCatalogName}}</span>
                    <span v-if="scope.row.secondCatalogName"> /{{scope.row.secondCatalogName}}</span>
                    <span v-if="scope.row.thirdCataloogName"> /{{scope.row.thirdCataloogName}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="createDate" label="创建时间" min-width="150">
                <template slot-scope="scope">
                    {{scope.row.createDate.substring(0,10)}}
                </template>
            </el-table-column>
            <el-table-column prop="createUserRealName" label="创建人" min-width="100"></el-table-column>
            <el-table-column prop="views" label="浏览" min-width="100">
                <template slot-scope="scope">
                    <el-button type="text" @click="view(scope.$index,tableData)">{{scope.row.views}}</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="操作" min-width="150">
                <template slot-scope="scope">
                    <!--状态判断-->
                    <el-button @click="view(scope.$index,tableData,'预览')" type="text">预览</el-button>
                    <el-button @click="edit(scope.$index,tableData,'编辑')" type="text">编辑</el-button>
                    <el-button @click="deleteRow(scope.$index,tableData,3)" type="text">删除</el-button>
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
        <el-dialog :title="title" :visible.sync="dialogFormVisible" size="">
            <el-form :model="form" style="width: 650px" ref="form">
                <el-form-item label="选择分类：" label-width="60px" class="form_item_mt0">
                    <el-select v-model="form.class" placeholder="大类">
                        <el-option v-for="item in Class" :label="item.name" :value="item.code" :key="item.code"></el-option>
                    </el-select>
                    <el-select v-model="form.subClass" placeholder="中类">
                        <el-option v-for="item in subClassList" :label="item.name" :value="item.code" :key="item.code"></el-option>
                    </el-select>
                    <el-select v-model="form.label" placeholder="小类">
                        <el-option v-for="item in labelList" :label="item.name" :value="item.code" :key="item.code"></el-option>
                    </el-select>
                </el-form-item>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="内容：" label-width="60px" class="form_item_mt0"></el-form-item>
                        <el-form-item label="内容：" label-width="60px">
                            <vue-editor v-model="form.content" useCustomImageHandler :editorToolbar="editorToolbar"
                                        @image-added="handleImageAdded"></vue-editor>
                        </el-form-item>
                    </el-col>
                   <!-- <el-dialog title="编辑预览" :visible.sync="preView" size="">
                        <el-form-item label="内容" label-width="60px" class="form_item_mt0" style="width: 600px">
                            <el-input type="textarea" v-model="form.preContent"></el-input>
                        </el-form-item>
                        <el-form-item label=" ">
                            <el-button @click="editSure" type="primary" size="small">确定</el-button>
                            <el-button @click="editCancel" size="small">取消</el-button>
                        </el-form-item>
                   </el-dialog>-->
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel('form')">取 消</el-button>
               <!-- <el-button @click="pre">编辑预览</el-button>-->
                <el-button type="primary" @click="sure('form')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog :title="title" :visible.sync="dialogFormVisible1" size="">
            <ul style="width: 630px">
                <li v-html="content"></li>
            </ul>
        </el-dialog>

        <el-dialog :title="title" :visible.sync="dialogFormVisible2" size="">
            <div>
                <img :src="img.url" alt="" :width="img.wd" :height="img.hd">
                <div>
                    宽：<el-input type="text" v-model="img.wd" style="float: none;width: 200px"></el-input>
                    高：<el-input type="text" v-model="img.hd" style="float: none;width: 200px"></el-input>
                </div>
                <el-button @click="imgSure" type="primary" style="margin-top: 10px">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import { VueEditor } from 'vue2-editor'
    import "@/style/selfCommon.less"
    import { baseImgPath } from '@/config/env'
    import {GetCatelogByColumnCode,KnowledgeAdd,getKnowledgeList,KnowledgeDelete,KnowledgeEdit} from "@/api/myData"
    import {getCookie} from "@/config/mUtils"
    import axios from 'axios'
    export default {
        // name: "projectKnowledge",
        data () {
            return {
                preView:false,
                dialogFormVisible: false,
                dialogFormVisible1:false,
                dialogFormVisible2:false,
                formInline: {
                    class: "",
                    subClass: "",
                    label: "",
                    doctor: "",
                    keyWords: ""
                },
                img:{
                    hd:"",
                    wd:"",
                    url:""
                },
                editorToolbar:[
                    ['bold', 'italic', 'underline', 'strike'],
                    ['blockquote', 'code-block', 'image','code','formula'],
                    [{'list': 'ordered'}, {'list': 'bullet'}],
                    [{'indent': '-1'}, {'indent': '+1'}],
                    [{'header': [1, 2, 3, 4, 5, 6, false]}],
                    [{'color': []}, {'background': []},{'size':[]}],
                    [{'font': []}],
                    [{'align': []}],
                    ['clean']
                ],
                title:"",
                form:{
                    id:"",
                    class:"",
                    subClass:"",
                    label:"",
                    preContent:""
                },
                Class:[],
                subClass:[],
                label:[],
                subClassList:[],
                labelList:[],
                total:0,
                size:10,
                dialogMes:{},
                currentPage:1,
                tableData:[],
                columnData:[],
                content:"",
                mes:{},
            }
        },
        computed:{
            /* 导出报表参数 tHeader,filterVal,tableData1*/
            // tHeader(){
            //     return ["编号", '分类', '创建时间', '创建人', '浏览']
            // },
            // filterVal(){
            //     return ['number', 'catalogCloumnName', 'createDate', 'createUserRealName','views']
            // },
            // name(){
            //     return '医美知识'
            // },
            // tableData1(){
            //     let arr = JSON.parse(JSON.stringify(this.tableData))
            //     arr.forEach(row=>{
            //         row.catalogCloumnName = this.getName(row)
            //     })
            //     return arr
            // },
            /*导出报表参数 tHeader,filterVal,tableData1*/
        },
        watch:{
            'form.class':{
                handler(vurVal,oldVal){
                    this.subClassList = this.getCatelog(this.form.class)
                },
                deep:true
            },
            'form.subClass':{
                handler(vurVal,oldVal){
                    this.labelList = this.getCatelog(this.form.subClass)
                },
                deep:true
            }
        },
        mounted(){
            this.GetCatelogByColumnCode({
                code:"100"//医美100
            })
        },
        methods: {
            getName(data){
                let name=""
                
                if(data.firstCatalogName){
                    name = data.firstCatalogName
                    if(data.secondCatalogName){
                        name += "/"+data.secondCatalogName
                        name +=data.thirdCataloogName?'/'+data.thirdCataloogName:""
                    }
                }else{}
                return name
            },
            async KnowledgeDelete(params){
                try{
                    let res = await KnowledgeDelete(params)
                    if(res.status == true){
                        this.$message({message: '删除成功', type: 'success'});
                        this.search()
                    }else{
                        this.$message.error('删除失败');
                    }
                }catch(err){
                    console.log(err)
                    this.$message.error('删除失败');
                }
            },
            async getKnowledgeList(params){
                try{
                    let res = await getKnowledgeList(params)
                    this.total = res.count
                    this.tableData = res.data
                }catch(err){
                    console.log(err)
                }
            },
            async KnowledgeAdd(params){
                try{
                    let res = await KnowledgeAdd(params)
                    if(res.status == true){
                        this.$message({message: '添加成功', type: 'success'});
                        this.dialogFormVisible = false
                        this.search()
                    }else{
                        this.$message.error('添加失败');
                    }
                }catch(err){
                    console.log(err)
                    this.$message.error('添加失败');
                }
            },
            async GetCatelogByColumnCode(params){
                try{
                    let res = await GetCatelogByColumnCode(params)
                    
                    this.columnData = res.data
                    this.Class = this.getCatelog("")
                    
                    this.search()
                }catch(err){
                    console.log(err)
                }
            },
            async KnowledgeEdit(params){
                try {
                    let res = await KnowledgeEdit(params)
                    if(res.status == true){
                        this.$message({message: '编辑成功', type: 'success'});
                        this.dialogFormVisible = false
                        this.search()
                    }else{
                        this.$message.error('编辑失败');
                    }
                } catch (err) {
                    console.log(err)
                    this.$message.error('编辑失败');
                }
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
            add(){
                this.title = "添加"
                this.dialogFormVisible = true
                for(var p in this.form){
                    this.form[p] = ""
                }
            },
            edit(index,data){
                this.title = "编辑"
                this.dialogFormVisible = true
                for(var p in this.form){
                    this.form[p] = ""
                }
                this.copyWorth(JSON.parse(JSON.stringify(data[index])))
            },
            view(index,data,ope){
                this.mes = data[index]
                this.mes.title = ope
                this.dialogFormVisible1 = true
                this.title = ope
                this.content = this.htmlDecode(data[index].htmlContent)
            },
            deleteRow(index,data){
                this.KnowledgeDelete({
                    id:data[index].id
                })
            },
            onSubmit(){
                this.currentPage = 1
                this.search()
            },
            search(){
                this.getKnowledgeList({
                    pageIndex:this.currentPage,
                    pageSize:this.size,
                    where:""+this.formInline.class+" and "+this.formInline.subClass+" and "+this.formInline.label+" and "+this.formInline.keyWords
                })
            },
            

            /*1.用正则HtmlUtil表达式实现html转码*/
            htmlEncode (str) {
                var s = "";
                if (str.length == 0) return "";
                s = str.replace(/&/g, "%26amp;");
                s = s.replace(/</g, "%26lt;");
                s = s.replace(/>/g, "%26gt;");
                s = s.replace(/ /g, "%26nbsp;");
                s = s.replace(/\'/g, "%26#39;");
                s = s.replace(/\"/g, "%26quot;");
                return s;
            },
            /*2.用正则表达式实现html解码*/
            htmlDecode(str) {
                var s = "";
                if (str.length == 0) return "";
                s = str.replace(/&amp;/g, "&");
                s = s.replace(/&lt;/g, "<");
                s = s.replace(/&gt;/g, ">");
                s = s.replace(/&nbsp;/g, " ");
                s = s.replace(/&#39;/g, "\'");
                s = s.replace(/&quot;/g, "\"");
                return s;
            },
            sure(){
                if(this.form.content.length!=0){
                    let content = this.form.content.replace("<blockquote>","<p style='margin:5px 0 5px 0;border-left:4px solid #FF664F; padding-left: 16px;'>")
                    if(this.title == "添加"){
                        this.KnowledgeAdd({
                            firstCatalogId:this.getId(this.form.class,"code"),
                            secondCatalogId:this.getId(this.form.subClass,"code"),
                            thirdCatalogId:this.getId(this.form.label,"code"),
                            htmlContent:this.htmlEncode(content),
                            createUserId:getCookie("userId"),
                            createUser:getCookie("userName")
                        })
                    }else{
                        this.KnowledgeEdit({
                            id:this.form.id,
                            number:this.mes.number,
                            firstCatalogId:this.getId(this.form.class,"code"),
                            secondCatalogId:this.getId(this.form.subClass,"code"),
                            thirdCatalogId:this.getId(this.form.label,"code"),
                            htmlContent:this.htmlEncode(content),
                        })
                    }
                }else{
                    alert("编辑完整信息")
                }
            },
            cancel(formName){
                this.$refs[formName].resetFields();
                this.dialogFormVisible = false
            },
            getCatelog(pcode){
                let arr = []
                this.columnData.forEach(row=>{
                    if(row.parentCode == pcode){
                        arr.push(row)
                    }
                })
                return arr
            },
            getSubClass(){
                this.subClass = this.getCatelog(this.formInline.class)
            },
            getLabel(){
                this.label = this.getCatelog(this.formInline.subClass)
            },
            handleImageAdded(file, Editor, cursorLocation) {
                var formData = new FormData();
                formData.append('image', file)
                axios({
                    url: baseImgPath + '/api/Image/UploadImg?op=supplier',
                    method: 'POST',
                    headers: {'Content-Type': 'multipart/form-data'},
                    data: formData
                }).then((result) => {
                    let url = result.data
                    
                    Editor.insertEmbed(cursorLocation, 'image', baseImgPath + url);
                    this.dialogFormVisible2 = true
                    this.img.url = baseImgPath + result.data
                }).catch((err) => {
                    console.log(err);
                })
            },
            deleteData(index){
                this.knowList.splice(index,1)
            },

            imgSure(){
                
//                this.img.url+"width="+this.img.wd+"height="+this.img.hd
                this.form.content = this.form.content.replace(this.img.url+"\"",this.img.url+"\""+" width="+this.img.wd+" height="+this.img.hd)
                this.dialogFormVisible2=false
                this.img = {
                    wd:"",
                    hd:"",
                    url:"",
                }
            },

            pre(){
                this.preView = true
                this.form.preContent = JSON.stringify(this.htmlDecode(this.form.content))
            },
            editSure(){
                this.form.content = JSON.parse(this.htmlDecode(this.form.preContent))
                this.preView = false
            },
            editCancel(){
                this.preView = false
            },
            close(){
                this.dialogFormVisible1 = false
            },
            getId(code,params){
                
                let id = "",classCode=""
                if(params == "code"){
                    this.columnData.forEach(row=>{
                        if(row.code == code){
                            id = row.id
                        }
                    })
                    return id
                }else{
                    this.columnData.forEach(row=>{
                        if(row.id == code){
                            classCode = row.code
                        }
                    })
                    return classCode
                }
            },
            copyWorth(val){
                for(var p in val){
                    if(!val[p]){
                        val[p] = ""
                    }
                }
                this.form.class = this.getId(val.firstCatalogId,"id")
                setTimeout(()=>{
                    
                    this.form.subClass = this.getId(val.secondCatalogId,"id")
                },200)
                setTimeout(()=>{
                    
                    this.form.label = this.getId(val.thirdCatalogId,"id")
                },200)
                this.form.content = this.htmlDecode(val.htmlContent)
            }
        },
        components: {
            VueEditor,
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dialog-footer{
   float: none;
}
</style>
