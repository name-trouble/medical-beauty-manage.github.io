<template>
    <div class="projectList selCommon">
        <!-- 查询信息 -->
        <el-form :inline="true" :model="formInline"  >
            <el-form-item label="商品名称：" style='margin-bottom:10px;float:left'>
                <el-input v-model="formInline.name" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="" style='margin-bottom:10px;float:left'>
                <el-button type="primary" @click="onSubmit" class="searchBtn" icon="search">查询</el-button>
                <el-button type="primary" @click="select" class="searchBtn" icon="plus">添加选中商品</el-button>
            </el-form-item>
        </el-form>
        <!-- 查询信息 -->

        <!-- 信息表 -->
        <el-table :data="tableData" border style="width: 100%;margin-top:10px;margin-bottom:10px;" height="500"  @selection-change="handleSelectionChange">
            <el-table-column type="selection" align="center" width="55"></el-table-column>
            <el-table-column prop="imgMainUrl" label="图片" min-width="100">
                <template slot-scope='scope'>
                    <img style="vertical-align: middle" width="50px" height="50px" :src="baseImgPath+scope.row.imgMainUrl" alt="">
                </template>
            </el-table-column>
            <el-table-column prop="goodsCode" label="商品编号" min-width="150"></el-table-column>
            <el-table-column prop="name" label="商品名称" min-width="250" show-overflow-tooltip></el-table-column>
            <el-table-column prop="priceRange" label="售价" min-width="120"></el-table-column>
        </el-table>
        <!-- 信息表 -->

        <!-- 分页 -->
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalPage">
            </el-pagination>
        </div>
        <!-- 分页 -->
    </div>
</template>

<script type="text/ecmascript-6">
    import Vue from 'vue'
    // import VueClipboards from 'vue-clipboards';
    // Vue.use(VueClipboards);
    import {baseImgPath} from "@/config/env"
    import '@/style/selfCommon.less';
    import { setStore} from '@/config/mUtils'
    import {GetGoodsByConditions}  from "@/api/myData"
    export default {
        data() {
            return {
                baseImgPath:baseImgPath,
                baseUrl:baseImgPath,
                currentPage: 1,
                form: {},
                formLabelWidth: '80px',
                pageSize:10,
                totalPage:10,
                formInline: {
                    name:'',
                },
                // 表格数据
                tableData: [],
                multipleSelection:[],
            }
        },

        mounted: function () {
            
        },
        methods: {
            // 返回选择项目
            select(item) {
                // item.column.type='primary';
                ;
                if(this.multipleSelection.length ==0){
                    this.$message({ message: '请先选择项目',type: 'warning'});
                }else{
                    this.$message({ message: '已添加选中项目',type: 'success'});
                    this.multipleSelection.forEach(ele=>{
                        ele.isNew = 1
                    })
                    this.$emit('selectPro',this.multipleSelection)
                }
            },
            // 条件查询
            onSubmit() {
                this.currentPage = 1
              this.search()
            },
            // 分页页面展示数据条数改变触发事件
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val
                this.search()
            },
            // 分页当前页码改变触发事件
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val
                this.search()
            },
//            复制链接
            handleSuccess(e) {
                alert("复制成功")
            },
            handleError(e) {
                
            },
            async getGoods(data){
                try{
                    let res = await GetGoodsByConditions(data)
                    this.totalPage = res.count
                    this.tableData = this.splitUrl(res.data)
                }catch(err){
                    console.log(err)
                }
            },

            search(){
                this.getGoods({
                    columnCode:'100',
                    catalogCode:"",
                    startPrice:"",
                    endPrice:"",
                    supplierCode:"",
                    keyWords:this.formInline.name.removeSP(),
                    serviceMan:"",
                    state:"1",
                    pageSize:this.pageSize,
                    pageIndex:this.currentPage,
                })
            },
            splitUrl(data){
                // data.forEach(row=>{
                //     row.ImgMainUrl = baseImgPath+ row.imgMainUrl
                // })
                return data
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }

        },
        components: {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .goodsList {
        text-align: left;
        font-size: 12px;
    }

    .block {
        padding-bottom: 20px;
    }
</style>
