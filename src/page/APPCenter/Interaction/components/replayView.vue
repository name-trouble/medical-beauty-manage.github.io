<template>
    <div class="replayView">
        <span>评论人：{{}}</span> <span>评论：{{}}</span>
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" max-height="460">
            <el-table-column type="index" width="40" label="序号"></el-table-column>
            <el-table-column prop="Code" label="回复时间" min-width="150"></el-table-column>
            <el-table-column prop="RegistDate" label="回复人" min-width="80"></el-table-column>
            <el-table-column prop="RegistDate" label="回复人角色" min-width="80"></el-table-column>
            <el-table-column prop="RegistDate" label="回复内容" min-width="80"></el-table-column>
        </el-table>
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
    </div>
</template>

<script>
    export default {
        // name:"replayView",
        data () {
            return {
                total:10,
                size:10,
                currentPage:1,
                tableData:[]
            }
        },
        methods:{
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.size = val
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val
            },
        },
        components: {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
