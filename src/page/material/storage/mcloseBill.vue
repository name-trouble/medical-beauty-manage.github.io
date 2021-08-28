<template>
    <div class="tag selCommon">
        <!-- <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px">
            <el-form-item label="入库日期：" class="form_item_mt10">
                <el-input v-model="formInline.keywords" placeholder="请输入" style="width: 200px;" v-on:keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            <el-form-item label="入库编号：" class="form_item_mt10">
                <el-input v-model="formInline.keywords" placeholder="请输入" style="width: 200px;" v-on:keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            <el-form-item label="医院：" class="form_item_mt10">
                <el-select v-model="formInline.hospitalCode"  style='width:200px;'>
                    <el-option v-for="(item,index) in hospitalList" :key="index" :label="item.supplierName" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="供应商：" class="form_item_mt10">
                <el-select v-model="formInline.hospitalCode"  style='width:200px;'>
                    <el-option v-for="(item,index) in supplierList" :key="index" :label="item.supplierName" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="付款状态：" class="form_item_mt10">
                <el-select v-model="formInline.hospitalCode"  style='width:200px;'>
                    <el-option label="全部" value=""></el-option>
                    <el-option label="未付清" value="0"></el-option>
                    <el-option label="已付清" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="记账状态：" class="form_item_mt10">
                <el-input v-model="formInline.keywords" placeholder="请输入" style="width: 200px;" v-on:keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            <el-form-item label="结账状态：" class="form_item_mt10">
                <el-select v-model="formInline.hospitalCode"  style='width:200px;'>
                    <el-option label="全部" value=""></el-option>
                    <el-option label="未结账" value="0"></el-option>
                    <el-option label="已结账" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label=" " class="form_item_mt10">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
                <el-button type="primary" class="searchBtn" @click="addTag('添加')">添加入库</el-button>
            </el-form-item>
        </el-form> -->
        <!-- 信息表 -->
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" max-height="560" class="smt min_table" v-loading="loading">
            
            <el-table-column prop="code" label="结账年份" min-width="90"></el-table-column>
            <el-table-column prop="typeName" label="结账月份" min-width="90"></el-table-column>
            <el-table-column prop="hospitalName" label="产品结账状态" min-width="90">
                <!-- <template slot-scope="scope">
                    <el-tag type="danger"></el-tag>
                    <el-tag type="success"></el-tag>
                </template> -->
            </el-table-column>
            <el-table-column prop="tagName" label="订单结账状态" min-width="90">
                <!-- <template slot-scope="scope">
                    <el-tag type="danger"></el-tag>
                    <el-tag type="success"></el-tag>
                </template> -->
            </el-table-column>
            <el-table-column prop="status" label="操作" width="250" fixed="right">
                <template slot-scope="scope">
                    <el-button @click="approve(scope)" type="primary" size="small" style="margin-left:0">产品结账</el-button>
                    <el-button @click="addTag('编辑',scope.$index,tableData)" type="primary" size="small" style="margin-left:0">订单结账</el-button>
                    <el-button @click="deleteRow(scope.$index,tableData)" type="primary" size="small" style="margin-left:0">撤销</el-button>
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
    import {baseImgPath} from "@/config/env"
    import  "@/style/selfCommon.less"
    import { getCookie, delCookie } from '@/config/mUtils'
    import {GetTagByPage,GetDropDownPermission} from "@/api/myData"
    export default {
        data () {
            return {
                loading:false,
                total:0,
                size:10,
                currentPage:1,
                formInline: {
                    keywords: '',
                    typeCode:'',
                    hospitalCode:"",
                },
                tableData:[],
                hospitalList:[],
                supplierList:[],
            }
        },
        computed: {
            
        },
        mounted(){
            this.GetDropDownPermission()
        },
        methods:{

            async GetDropDownPermission(){
                let res1 = await GetDropDownPermission({typeId: 1});
                this.hospitalList = res1.data
            },
         
            // // 删除
            // async DeleteTagsById(params){
            //     try{
            //         let res = await DeleteTagsById(params)
            //         if(res.success){
            //             this.$message({message: '删除成功', type: 'success'});
            //             this.search()
            //         }else{
            //             this.$message.error('删除失败');
            //         }
            //     }catch(err){
            //         this.$message.error('删除失败');
            //     }
            // },
            async GetTagByPage(params){
                try{
                    this.loading = true
                    let res = await GetTagByPage(params)
                    this.tableData = res.data
                    this.total = res.count
                    this.loading = false
                }catch(err){
                    console.log(err)
                }
            },
          
            onSubmit(){
                this.currentPage = 1
                this.search()
            },
            search(){
                this.GetTagByPage({
                    TypeCode:this.formInline.typeCode,
                    pageIndex:this.currentPage,
                    pageSize:this.size,
                    keywords:this.formInline.keywords.removeSP()
                })
            },
            handleSizeChange(val) {
                this.size = val
                this.search()
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.search()
            },

            deleteRow(index,data){
                this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    
                }).catch(() => {

                });
            },

            approve(data){

            },
            account(data){

            },
            pay(data){

            },
            addDrug(val){
                this.isDrug = true
            },
            
        },
        components: {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
