<template>
    <div class="tag selCommon">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px">
            <el-form-item label="关键字：" class="form_item_mt10">
                <el-input v-model="formInline.keywords" placeholder="请输入" style="width: 200px;" v-on:keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            <el-form-item label="医院：" class="form_item_mt10">
                <el-select v-model="formInline.hospital"  style='width:200px;' @change="selHos">
                        <el-option v-for="(item,index) in allHos" :key="index" :label="item.supplierName" :value="item.code"></el-option>
                    </el-select>
            </el-form-item>

            <el-form-item label=" " class="form_item_mt10">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
                <el-button type="primary" class="searchBtn" @click="addTag('添加')">添加排除项</el-button>
            </el-form-item>
        </el-form>
        <!-- 信息表 -->
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" max-height="560" class="smt min_table" v-loading="loading">
            <el-table-column prop="hospitalName" label="医院" min-width="150"></el-table-column>
            <el-table-column prop="createOn" label="创建时间" min-width="120">
                <template slot-scope="scope">
                    <span v-if="scope.row.createOn">{{scope.row.createOn.substring(0,10)}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="catalogName" label="分类" min-width="150"></el-table-column>
            <el-table-column prop="catalogName" label="启用状态" min-width="150">
                <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.isEnabled == 1">启用</el-tag>
                    <el-tag type="gray" v-if="scope.row.isEnabled == 0">未启用 </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="memo" label="备注" min-width="150"></el-table-column>
            <el-table-column prop="status" label="操作" width="150">
                <template slot-scope="scope">
                    <el-button @click="addTag('编辑',scope.$index,tableData)" type="primary" size="small">编辑</el-button>
                    <el-button @click="deleteRow(scope.$index,tableData)" type="primary" size="small">删除</el-button>
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

        <!--商品提成-->
        <el-dialog :title="title" :visible.sync="tag" size="">
            <el-form :model="form" style="width: 600px" label-width="80px">
                <el-form-item label="医院：" class="form_item_mt10">
                    <el-select v-model="form.hospital"  style='width:200px;' @change="selHos">
                        <el-option v-for="(item,index) in hospitalList" :key="index" :label="item.supplierName" :value="item.supplierName+'|'+item.code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分类：" style=''  class="form_item_mt10">
                    <el-select v-model="form.fClass" placeholder="请选择" style='width:150px;' @change="fChange">
                        <el-option v-for="item in fClassList" :label="item.name" :value="item" :key="item.code"></el-option>
                    </el-select>
                    <el-select v-model="form.sClass" placeholder="请选择" style='width:150px;' @change="sChange">
                        <el-option v-for="item in sClassList" :label="item.name" :value="item" :key="item.code"></el-option>
                    </el-select>
                    <el-select v-model="form.tClass" placeholder="请选择" style='width:150px;' @change="tChange">
                        <el-option v-for="item in tClassList" :label="item.name" :value="item" :key="item.code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否启用：" style=''  class="form_item_mt10">
                    <el-radio class="radio" v-model="form.isEnabled" label="1">是</el-radio>
                    <el-radio class="radio" v-model="form.isEnabled" label="0">否</el-radio>
                </el-form-item>
                <el-form-item label="备注：" style=''  class="form_item_mt10">
                    <el-input type="textarea" :rows="4" v-model="form.memo"></el-input>
                </el-form-item>
            </el-form>
            <div class="footer_ope">
                <el-button @click="sure" type="primary" :loading="saveLoading">确定</el-button>
                <el-button @click="cancel">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import {baseImgPath} from "@/config/env"
    import  "@/style/selfCommon.less"
    import { getCookie, delCookie } from '@/config/mUtils'
    import {GetTagByPage,AddTags,UpdateTags,DeleteTagsById,GetDropDownPermission,GetCatelogByColumnCode,GetExpertParamSet,
    DeleteExpertSetByIdEX,UpdateExpertSetEX,AddExpertParamSet} from "@/api/myData"
    import Export from '@/components/export'
    export default {
        // name: "VideoManage",
        data () {
            return {
                saveLoading:false,
                loading:false,
                title:"",
                tag:false,
                total:0,
                size:10,
                currentPage:1,
                hospitalList:[],
                allHos:[],
                fClassList:[],
                sClassList:[],
                tClassList:[],
                catelogList:[],
                formInline: {
                    keywords: '',
                    hospital:"",
                },
                form:{
                    hospitalName:"",
                    hospitalCode:"",
                    hospital:{},
                    fClass:"",
                    sClass:"",
                    tClass:"",
                    isEnabled:"0",
                    catalogName:"",//分类名称
                    catalogCode:"",//分类编号
                    catalogPath:"",//分类路径
                    memo:"",
                },
                tableData:[],
            }
        },
        computed: {
            /* 导出报表参数 tHeader,filterVal,tableData1*/
            tHeader(){
                return ['封面', '主题', '发布人', '标签', '视频大小', '发布时间', '浏览人次', '平均浏览时长', '分享','销售额',"商品提成"]
            },
            filterVal(){
                return ['picture', 'title', 'userName', 'tab', 'videoSize','createDate','views','grade','grade','ReferrerName']
            },
            tableData1(){
                return this.tableData
            },
            name(){
                return '视频管理'
            },
            /*导出报表参数 tHeader,filterVal,tableData1*/
        },
        mounted(){
            this.GetDropDownPermission()
            this.onSubmit()
        },
        methods:{
            selHos(){
                
                if(this.form.hospital.length>0){
                    this.form.hospitalName = this.form.hospital.split("|")[0]
                    this.form.hospitalCode = this.form.hospital.split("|")[1]
                }else{
                    this.form.hospitalName = ""
                    this.form.hospitalCode = ""
                }
            },
            fChange(){
                
                this.form.sClass = ""
                this.setdata(this.form.fClass.value,this.form.fClass.catalogPath)
                this.sClassList = this.parentCode(this.form.fClass.value)
            },
            sChange(){
                this.form.tClass = ""
                this.setdata(this.form.sClass.value,this.form.sClass.catalogPath)
                this.tClassList = this.parentCode(this.form.sClass.value)
            },
            tChange(){
                this.setdata(this.form.tClass.value,this.form.tClass.catalogPath)
            },
            setdata(code,path){
                this.form.catalogCode = code
                this.form.catalogPath = path
            },

            parentCode(code){
                let arr = []
                for(let i = 0;i<this.catelogList.length;i++){
                    if(this.catelogList[i].parentCode == code){
                        arr.push({
                            name:this.catelogList[i].name,
                            value:this.catelogList[i].code,
                            catalogPath:this.catelogList[i].catalogPath
                        })
                    }
                }
                return arr
            },

            async GetDropDownPermission(){
                let res= await GetCatelogByColumnCode({code:100})
                this.catelogList = res.data
                this.fClassList = this.parentCode("")
                let res1 = await GetDropDownPermission({typeId: 1});
                this.allHos = res1.data
                if(res1.data[0].code == ""){
                    this.hospitalList = res1.data.slice(1)
                }else{
                    this.hospitalList = res1.data
                }
            },
            
            async AddExpertParamSet(params){
                try{
                    this.saveLoading = true
                    let res = await AddExpertParamSet(params)
                    if(res.status){
                        this.$message({message: '添加成功', type: 'success'});
                        this.search()
                        this.tag = false
                    }else{
                        this.$message.error('添加失败');
                    }
                    this.saveLoading = false
                }catch(err){
                    console.log(err)
                    this.$message.error('添加失败');
                }
            },

            async DeleteExpertSetByIdEX(params){
                try{
                    let res = await DeleteExpertSetByIdEX(params)
                    if(res.status){
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

            async GetExpertParamSet(params){
                try{
                    this.loading = true
                    let res = await GetExpertParamSet(params)
                    this.tableData = res.data
                    this.total = res.count
                    this.loading = false
                }catch(err){
                    console.log(err)
                }
            },
            async UpdateExpertSetEX(params){
                try{
                    this.saveLoading = true
                    let res = await UpdateExpertSetEX(params)
                    if(res.status){
                        this.$message({message: '编辑成功', type: 'success'});
                        this.search()
                        this.tag = false
                    }else{
                        this.$message.error('编辑失败');
                    }
                    this.saveLoading = false
                }catch(err){
                    console.log(err)
                    this.$message.error('编辑失败');
                }
            },
            onSubmit(){
                this.currentPage = 1
                this.search()
            },
            search(){
                this.GetExpertParamSet({
                    hospitalCode:this.formInline.hospital,
                    keywords:this.formInline.keywords.removeSP()
                })
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

            sure(){
                let name = ""
                if(this.form.fClass.name){
                    name+=this.form.fClass.name
                }
                if(this.form.sClass.name){
                    name+=this.form.sClass.name
                }
                if(this.form.tClass.name){
                    name+=this.form.tClass.name
                }
                this.form.catalogName = name
                
                 if (this.title == "编辑") {
                    this.form.modifiedBy = getCookie("userName")
                    this.form.modifiedUserId = getCookie("userId")
                    this.form.id = this.editMes.id
                    this.UpdateExpertSetEX(this.form)
                } else {
                    this.form.createBy = getCookie("userName")
                    this.form.createUserId = getCookie("userId")
                    
                    this.AddExpertParamSet(this.form)
                }
            },
            cancel(){
                this.tag = false
            },
//            添加排除项目
            addTag(ope,index,data){
                this.reset()
                this.tag = true
                this.title = ope
                if(data){
                    this.initData(data[index])
                }
            },
            initData(data){
                this.editMes = data
                this.form.hospital = data.hospitalName? data.hospitalName+'|'+data.hospitalCode:""
                this.form.hospitalCode = data.hospitalCode||""
                this.form.hospitalName = data.hospitalName||""
                this.form.memo = data.memo
                let code = data.catalogPath.replace(/^\|+|\|+$/g,'').split("|")
                this.form.isEnabled = data.isEnabled+''
                let _this = this
                if(code[0]){
                    this.fClassList.forEach(ele => {
                        if(code[0] == ele.value){
                            this.form.fClass = ele
                            this.$set(this.form,'fClass',ele)
                            this.fChange()
                            return
                        }
                    });
                }
                setTimeout(()=>{
                    if(code[1]){
                        _this.sClassList.forEach(ele => {
                            if(code[1] == ele.value){
                                _this.form.sClass = ele
                                _this.$set(this.form,'sClass',ele)
                                this.sChange()
                                return
                            }
                        });
                    }
                },100)
                setTimeout(()=>{
                    if(code[2]){
                        _this.tClassList.forEach(ele => {
                            if(code[2] == ele.value){
                                // _this.form.tClass = ele
                                _this.$set(this.form,'tClass',ele)
                                this.tChange()
                                return
                            }
                        });
                    }
                },100)
            },
//            删除
            deleteRow(index,data){
                this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    
                    this.DeleteExpertSetByIdEX({
                        id:data[index].id
                    })
                }).catch(() => {

                });
            },

            reset(){
                this.form ={
                    hospital:"",
                    hospitalName:"",
                    hospitalCode:"",
                    fClass:"",
                    sClass:"",
                    tClass:"",
                    isEnabled:"0",
                    catalogName:"",
                    catalogCode:"",
                    catalogPath:"",
                    memo:"",
                }
            }
        },
        components: {
            Export,
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
