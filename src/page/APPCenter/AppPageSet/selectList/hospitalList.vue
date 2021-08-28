<template>
    <div style="text-align: left">
        <div class="select">
            <el-form :inline="true" v-model="filterData" class="demo-form-inline">
                <el-form-item label="医院名称" class="form_item_mt10">
                    <el-input v-model="filterData.name" placeholder="机构名称" v-on:keyup.enter.native="search"></el-input>
                </el-form-item>
                <el-form-item  class="form_item_mt10">
                    <el-button type="primary" @click="search" class="searchBtn">查询</el-button>
                </el-form-item>
            </el-form>

        </div>
        <el-table :data="tableData" ref="multipleTable" style="width: 100%;margin-top:10px;margin-bottom:10px;" border stripe height="600" row-key="id">


            <el-table-column label="图片" min-width="80" align="center">
                <template slot-scope="scope">
                    <img v-bind:src="baseImgPath+scope.row.ImgUrl" style="height:60px;width:60px;margin-top:7px">
                </template>
            </el-table-column>
            <el-table-column prop="Code" label="机构编号" width="100">
            </el-table-column>

            <el-table-column prop="SupplierName" label="医院名称" min-width="100">
            </el-table-column>


            <el-table-column prop="Address" label="地址" min-width="120">
                <template slot-scope="scope">{{ scope.row.Province + scope.row.City + scope.row.Address}}</template>
            </el-table-column>


            <el-table-column fixed="right" label="操作" width="160">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" icon="edit" @click="select(scope)"> 选择</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="block">
            <el-pagination @size-change="pageSizeChange" @current-change="pageIndexChange" :total="dataCount" :current-page.sync="currentPage" :page-size="pageSize" :page-sizes="[10, 20, 50, 100,500 ,1000]" layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
        </div>


    </div>
</template>

<script>
import { getSupplierByPage, deleteSupplier } from '@/api/myData'
import { baseImgPath } from '@/config/env'

export default {
    // name: '',

    data() {
        return {

            filterData: {
                dates: "",
                name: "",
                type: "",
                PhoneNumber: ""
            },


            selectId: "",
            filterWord: "",
            tableData: [],

            dataCount: 0, //总数
            currentPage: 1,   //当前页面index
            pageSize: 20, //每页显示条数
            ruleForm: [],
            baseImgPath,
        }
    },

    mounted() {
        this.getSupplierByPage()
    },

    methods: {
        select(item) {
                // item.column.type='primary';
                ;
                this.$emit('HospitalSelectInfo',item.row.Id, item.row.ImgUrl,item.row.SupplierName)
            },


        async getSupplierByPage() {
            let data = {
                startdate:  this.filterData.startDate?this.filterData.startDate:"",
                enddate: this.filterData.endDate?this.filterData.endDate:"",
                suppliername: this.filterData.name,
                suptypecode: "",
                phonenumber: this.filterData.PhoneNumber,
                pageindex: this.currentPage,
                pagesize: this.pageSize,
            }
            this.tableData = await getSupplierByPage(data)
            if (this.tableData.length == 0) return
            this.dataCount = parseInt(this.tableData[0]["RecordCount"])
        },

        dateChange(val){
            val = val.formatDates()
            this.filterData.startDate = val.substring(0,10)
            this.filterData.endDate = val.substring(13)
        },

        // editRow(index) {
        //     this.selectId = this.tableData[index].Id + ''
        //     this.ispopEdit = true
        // },

        search() {
            this.getSupplierByPage()
        },

        // close(flag) {
        //     this.ispopEdit = false
        //     if (flag) {
        //         this.init()
        //     }

        // },

        async deleteUser(userId, index) {
            let res = await deleteUser(userId)
            if (res == 1) {
                this.$message({
                    //删除操作
                    type: 'success',
                    message: '删除成功!'
                })
                this.tableData.splice(index, 1)
            }
            else {
                this.$message({
                    type: 'warning',
                    message: '删除失败!'
                })
            }
        },

        formatDate(date) {
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? '0' + m : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            return y + '-' + m + '-' + d;
        },

        //删除事件
        deleteRow(index) {
            this.$confirm('此操作将删除用户信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.delData(this.tableData[index]["Id"], index)
            }).catch(() => {
                this.$message({ type: 'info', message: '已取消删除' })
            })
        },

        async delData(id, index) {
            let res = await deleteSupplier(id, index)
            if (res.success && res.success > 0) {
                this.$message({ type: 'success', message: '删除成功！' })
                this.tableData.splice(index, 1)
            }
        },

        pageIndexChange(index) {
            this.getSupplierByPage()
        },


        pageSizeChange(size) {
            this.pageSize = size
            this.getSupplierByPage()
        },

        init() {
            this.getSupplierByPage()
            this.currentPage = 1
            this.selectId=''
        },

        submited(res) {
        }

    }

}
</script>

<style lang="less" scoped>
.select {
    .el-input {
        width: 200px;
    }

    .el-input--small .el-input__inner {
        height: 35px;
        width: 200px;
    }
}

.block {
    margin-right: 30px;
    padding-right: 0!important;
}
</style>
