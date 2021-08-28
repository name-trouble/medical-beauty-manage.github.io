<template>
    <div class="tag selCommon">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px">
            
            <el-form-item label="关键字：" class="form_item_mt10">
                <el-input v-model="formInline.keywords" placeholder="商户编号/商户名称/联系人/代理商" style="width: 200px;"  v-on:keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            <el-form-item label=" " class="form_item_mt10">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
            </el-form-item>
        </el-form>
        <!-- 信息表 -->
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" v-loading="loading">
            <el-table-column prop="shopCode" label="商户编号" width="110"></el-table-column>
            <el-table-column prop="code" label="logo" width="80">
                <template slot-scope="scope">
                    <img :src="scope.row.img" alt="" height="40">
                </template>
            </el-table-column>
            <el-table-column prop="shopName" label="商户全称" min-width="150"></el-table-column>
            <el-table-column prop="shopShortName" label="简称" min-width="110"></el-table-column>
            <el-table-column prop="shopTagsName" label="商户分类" min-width="120"></el-table-column>
            <el-table-column prop="code" label="门店地址" min-width="230">
                <template slot-scope="scope">
                    <span v-if="scope.row.province"> {{scope.row.province}}</span>
                    <span v-if="scope.row.city"> {{scope.row.city}}</span>
                    <span v-if="scope.row.area"> {{scope.row.area}}</span>
                    <span v-if="scope.row.addrDetail"> {{scope.row.addrDetail}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="contactPerson" label="联系人" width="100"></el-table-column>
            <el-table-column prop="mobile" label="联系方式" min-width="120"></el-table-column>
            <el-table-column prop="branchName" label="代理商" min-width="100">
                <template slot-scope="scope">
                    <span>{{scope.row.branchCode}}</span><br/>
                    {{scope.row.branchName}}
                </template>
            </el-table-column>
            <el-table-column prop="status" label="操作" min-width="100">
                <template slot-scope="scope">
                    <el-button @click="addTag('编辑',scope.$index,tableData)" type="text">编辑</el-button>
                    <el-button @click="deleteRow(scope.$index,tableData)" type="text">删除</el-button>
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

        <!--编辑-->
        <el-dialog :title="title" :visible.sync="tag" size="">
            <edit :mes="mes" @close="close" v-if="tag" style="width:800px"></edit>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import {baseImgPath} from "@/config/env"
    import  "@/style/selfCommon.less"
    import { getCookie, delCookie } from '@/config/mUtils'
    import {GetShopByPage,AddTags,UpdateTags,DeleteShopById,GetDropDownPermission} from "@/api/myData"
    import edit from "./components/edit.vue"
    export default {
        // name: "merchantList",
        data () {
            return {
                loading:false,
                mes:{},
                title:"",
                tag:false,
                total:0,
                size:10,
                currentPage:1,
                formInline: {
                    keywords: '',
                    typeCode:'',
                    branch:"",
                    hospitalCode:'',
                },
                form:{
                    TypeCode:'',
                    TagName:''
                },
                tableData:[],
                hospitalList:[],
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
            this.getData()
        },
        methods:{
            async getData(){
                let res1 = await GetDropDownPermission({typeId: 1});
                this.hospitalList = res1.data
                this.formInline.hospitalCode = res1.data[0].code
            },
            async AddTags(params){
                try{
                    let res = await AddTags(params)
                    if(res.success){
                        this.$message({message: '添加成功', type: 'success'});
                        this.search()
                        this.tag = false
                    }else{
                        this.$message.error('添加失败');
                    }
                }catch(err){
                    console.log(err)
                    this.$message.error('添加失败');
                }
            },
            async DeleteShopById(params){
                try{
                    let res = await DeleteShopById(params)
                    if(res.success){
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
            async GetShopByPage(params){
                try{
                    this.loading = true
                    let res = await GetShopByPage(params)
                    this.tableData = this.dealData(res.data)
                    this.total = res.count
                    this.loading = false
                }catch(err){
                    console.log(err)
                }
            },
            async UpdateTags(params){
                try{
                    let res = await UpdateTags(params)
                    if(res.success){
                        this.$message({message: '编辑成功', type: 'success'});
                        this.search()
                        this.tag = false
                    }else{
                        this.$message.error('编辑失败');
                    }
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
                this.GetShopByPage({
                    pageIndex:this.currentPage,
                    pageSize:this.size,
                    
                    keywords:this.formInline.keywords.removeSP(),
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
                if (this.title == "编辑") {
                    this.UpdateTags(this.form)
                } else {
                    this.form.isEnable = 1
                    this.AddTags(this.form)
                }
            },
            cancel(){
                this.tag = false
            },
//            发布视频
            addTag(ope,index,data){
                this.reset()
                this.tag = true
                this.title = ope
                if(data){
                    this.mes = JSON.parse(JSON.stringify(data[index]))
                }
            },
//            删除
            deleteRow(index,data){
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    
                    this.DeleteShopById({
                        id:data[index].id
                    })
                }).catch(() => {

                });
            },
            dealData(data){
                data.forEach(row=>{
                    row.img = baseImgPath + row.shopLogo
                })
                console.log(data)
                return data
            },
            reset(){
                this.form = {
                    TypeCode:'',
                    TagName:''
                }
            },
            close(val){
                this.tag = false
                this.search()
            },
        },
        components: {
            edit
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
