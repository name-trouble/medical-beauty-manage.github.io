<template>
    <div>
        <div class="select">

            <el-form :inline="true" v-model="filterData" class="demo-form-inline">

                <el-form-item label="注册日期：" label-width="90px" class="form_item_mt10">
                    <el-date-picker v-model="filterData.dates" type="daterange" @change="dateChange" align="left" placeholder="选择日期范围">
                    </el-date-picker>
                </el-form-item>


                <el-form-item label="医院名称：" class="form_item_mt10">
                    <el-select v-model="filterData.name" @change="search">
                        <el-option v-for="(item,$index) in hospitals" :key="$index" :value="item.code" :label="item.supplierName"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="联系电话：" label-width="90px" class="form_item_mt10">
                    <el-input v-model="filterData.PhoneNumber" placeholder="联系电话" v-on:keyup.enter.native="search"></el-input>
                </el-form-item>

                <el-form-item label=" " class="form_item_mt10">
                    <el-button type="primary" @click="search" class="searchBtn">查询</el-button>
                </el-form-item>
            </el-form>

        </div>
        <el-table :data="tableData" ref="multipleTable" style="width: 100%;margin-top:10px;margin-bottom:10px;min-height: 460px" border stripe max-height="600" row-key="id">

            <el-table-column label="图片：" width="100" align="center">
                <template slot-scope="scope">
                    <img v-bind:src="baseImgPath+scope.row.ImgUrl" style="height:60px;width:60px;margin-top:7px">
                </template>
            </el-table-column>

            <el-table-column prop="Code" label="机构编号" width="100"></el-table-column>

            <el-table-column prop="CreateOn" label="注册日期" width="130">
                <template slot-scope="scope"> {{ scope.row.CreateOn && scope.row.CreateOn.substr(0,10) }}</template>
            </el-table-column>

            <el-table-column prop="SupplierName" label="医院名称" min-width="100"></el-table-column>

          <!--  <el-table-column prop="SupTypeName" label="机构类型" min-width="100"></el-table-column>-->

            <el-table-column prop="HospLevelName" label="资质等级" min-width="100"></el-table-column>

            <el-table-column prop="Address" label="地址" min-width="120">
                <template slot-scope="scope">{{ scope.row.Province + scope.row.City + scope.row.Address}}</template>
            </el-table-column>

            <el-table-column prop="PhoneNumber" label="联系电话" min-width="100">
                 <!-- <template slot-scope="scope">
                    <span v-if="scope.row.PhoneNumber">{{scope.row.PhoneNumber.substring(0,3)+'****'+scope.row.PhoneNumber.substring(7)}}</span>
                </template> -->
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="160">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" icon="edit" @click="editRow(scope.$index)"> 修改</el-button>
                    <el-button type="primary" size="mini" icon="delete" @click="deleteRow(scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="block">
            <el-pagination @size-change="pageSizeChange" @current-change="pageIndexChange" :total="dataCount" :current-page.sync="currentPage" :page-size="pageSize" :page-sizes="[10, 20, 50, 100,500 ,1000]" layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
        </div>

        <el-dialog ref="updateDialog" title="修改供方信息" :visible.sync="ispopEdit" size="" top="5%">
            <pop-edit :id="selectId" style="width:700px;" @close="close" v-if="ispopEdit"></pop-edit>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
import PopEdit from './com/EditSupply'
import { setStyle, copyObj } from '../SystemRole/lib/data.js'
import { getSupplierByPage, deleteSupplier,GetDropDownPermission } from '@/api/myData'
import { baseImgPath } from '@/config/env'
import '../SystemRole/lib/role.less'
export default {
    // name: '',
    components: {
        PopEdit,
    },
    data() {
        return {
            ispopEdit: false,

            filterData: {
                dates: "",
                name: "",
                type: "",
                PhoneNumber: ""
            },

            hospitals:[],
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

    computed: {
        tHeader(){
            return ['机构编号', '医院名称', '资质等级','注册日期', '地址', '联系电话']
        },
        filterVal(){
            return ['Code', 'SupplierName', 'HospLevelName', 'CreateOn', 'allAddress','PhoneNumber']
        },
        tableData1(){
           return this.tableData
        },
        name(){
            return "医院列表"
        }
    },

    mounted() {
        this.getHospital()
    },

    methods: {
        async getHospital() {
            let res = await GetDropDownPermission({typeId: 1})
            this.hospitals = res.data
            this.filterData.name = res.data[0].code
            this.getSupplierByPage()
        },
        async getSupplierByPage() {
            let data = {
                startdate: this.filterData.startDate ? this.filterData.startDate : "",
                enddate: this.filterData.endDate ? this.filterData.endDate : "",
                suppliername: this.filterData.name,
                suptypecode: "",
                phonenumber: this.filterData.PhoneNumber,
                pageindex: this.currentPage,
                pagesize: this.pageSize,
            }
            let res = await  getSupplierByPage(data)
            this.tableData = this.concatData(res)
            if (this.tableData.length == 0) return
            this.dataCount = parseInt(this.tableData[0]["RecordCount"])
        },

        concatData(data){
            
            data.forEach(row=> {
                row.allAddress = row.Province + row.City + row.Address
            })
            return data
        },

        dateChange(val){
            if(val){
                val = val.formatDates()
                this.filterData.startDate = val.substring(0, 10)
                this.filterData.endDate = val.substring(13)
            }else{
                this.filterData.startDate = ""
                this.filterData.endDate = ""
            }
            this.search()
        },

        editRow(index) {
            this.selectId = this.tableData[index].Id + ''
            this.ispopEdit = true
        },

        search() {
            this.currentPage = 1
            this.getSupplierByPage()
        },

        close(flag) {
            this.ispopEdit = false
            if (flag) {
                this.init()
            }

        },

        async deleteUser(userId, index) {
            let res = await deleteUser(userId)
            if (res == 1) {
                this.$message({//删除操作
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
    }
}
</script>

<style lang="less" scoped>
.select {
    background: rgb(249, 249, 249);
    padding: 10px;
    border-radius: 5px;
    .el-input {
        width: 200px;
    }

    .el-input--small .el-input__inner {
        height: 35px;
        width: 200px;
    }
}

.block {
    float: right;
    margin-right: 30px;
    padding-right: 0!important;
}
</style>
