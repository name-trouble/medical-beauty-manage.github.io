<template>
    <div class="liveManage">
        <div class="select">
            <el-form :inline="true" v-model="filterModel" class="demo-form-inline" label-width="100px">
                <el-form-item label="注册日期：" class="form_item_mt10">
                    <el-date-picker v-model="dates" type="daterange" @change="timeChange" placeholder="选择日期范围">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="服务者姓名：" class="form_item_mt10">
                    <el-input v-model="filterModel.serviceName"  v-on:keyup.enter.native="search"></el-input>
                </el-form-item>

                <el-form-item label="医院名称：" class="form_item_mt10">
                    <el-select v-model="filterModel.hospitalCode" @change="search">
                       <el-option v-for="(item,$index) in hospitals" :key="$index" :value="item.code" :label="item.supplierName"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="职位：" class="form_item_mt10">
                      <el-select v-model="filterModel.serTypeCode" @change="search">
                          <el-option label="全部" value=""></el-option>
                       <el-option v-for="(item,$index) in serTypes" :key="$index" :value="item.DataCode" :label="item.DataName"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="职称：" class="form_item_mt10">
                      <el-select v-model="filterModel.title" @change="search">
                          <el-option label="全部" value=""></el-option>
                       <el-option v-for="(item,$index) in titles" :key="$index" :value="item.DataCode" :label="item.DataName"></el-option>
                    </el-select>
                    <!-- <el-input v-model="filterModel.jobs"></el-input> -->
                </el-form-item>

                <el-form-item label="职务：" class="form_item_mt10">
                    <el-input v-model="filterModel.jobs"  v-on:keyup.enter.native="search"></el-input>
                </el-form-item>

                <el-form-item label="擅长：" class="form_item_mt10">
                    <el-input v-model="filterModel.skillCode"  v-on:keyup.enter.native="search"></el-input>
                </el-form-item>

                <!-- <el-form-item label="在职状态：" class="form_item_mt10">
                    <el-select v-model="filterModel.IsEnabled" @change="search">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="在职" value="1"></el-option>
                        <el-option label="离职" value="0"></el-option>
                    </el-select>
                </el-form-item> -->

                <el-form-item label=" " class="form_item_mt10">
                    <el-button type="primary" @click="search" class="searchBtn">查询</el-button>
                </el-form-item>
            </el-form>
        </div>

        <el-table :data="tableData" ref="multipleTable" style="width: 100%;margin-top:10px;margin-bottom:10px;" v-loading="loading" class="min_table smt" border max-height="600" row-key="id">
            <el-table-column prop="Id" label="Id" width="80"></el-table-column>

            <el-table-column prop="Code" label="服务者编号" width="100"></el-table-column>

            <el-table-column label="头像" width="100" align="center">
                <template slot-scope="scope">
                    <img v-bind:src="baseImgPath+scope.row.ImgUrl" style="height:50px;width:50px;">
                </template>
            </el-table-column>

            <el-table-column prop="CreateOn" label="注册日期" width="120">
                <template slot-scope="scope">
                    <span v-if="scope.row.CreateOn">
                        {{scope.row.CreateOn.substring(0,10)}}
                    </span>
                </template>
            </el-table-column>

            <el-table-column prop="ServiceName" label="服务者姓名" min-width="100">
            </el-table-column>

            <el-table-column prop="HospitalName" label="所属医院" min-width="150">
            </el-table-column>

            <el-table-column prop="SerTypeName" label="职位" show-overflow-tooltip width="120">
            </el-table-column>

            <el-table-column prop="TitleName" label="职称" min-width="100" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="Jobs" show-overflow-tooltip label="职务" min-width="120">
            </el-table-column>

            <el-table-column prop="SkillCode" label="擅长" show-overflow-tooltip min-width="100">
            </el-table-column>

            <el-table-column prop="IsEnabled" label="在职状态" show-overflow-tooltip width="80">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.IsEnabled" type="success">在职</el-tag>
                    <el-tag v-else type="gray">离职</el-tag>
                </template>
            </el-table-column>
            
            <el-table-column prop="ApplyNum" label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" icon="edit" @click="hosService(scope.row)"> 医院</el-button>
                    <el-button type="primary" size="mini" icon="edit" @click="editRow(scope.row)"> 修改</el-button>
                    <el-button type="primary" size="mini" icon="delete" @click="deleteRow(scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="block">
            <el-pagination @size-change="pageSizeChange" @current-change="pageIndexChange" :total="dataCount" :current-page.sync="currentPage" :page-size="pageSize" :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
        </div>

        <el-dialog ref="add" :title="title" :visible.sync="popAdd" size="" top="10%">
            <servant-add :data="selectData" :on-finish="finish" @closeEdit="closeEdit" style="width:620px;"></servant-add>
        </el-dialog>

        <el-dialog title="服务医院" :visible.sync="serviceHos" size="" top="10%">
            <div style="width:500px;padding:0 20px">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="hosChecked" @change="handleCheckedCitiesChange">
                    <el-checkbox class="checkBox" v-for="(hos,index) in hosList" :label="hos" :key="index">{{hos.SupplierName}}</el-checkbox>
                </el-checkbox-group>
                <div style="text-align:center;padding-top:10px">
                    <el-button type="primary" @click="sure">确定</el-button>
                    <el-button @click="cancel">取消</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">

import { getServiceManAllByPage, deleteServiceMan, getBaseDataByCode, getSupplierBySupType ,GetServiceManHospital,
GetDropDownPermission,GetSupplierBySupTypeCode,AddServiceManHospital} from '@/api/myData'
import '@/style/yqCom.less'
import { getCookie } from '@/config/mUtils'
import { baseImgPath } from '@/config/env'
import ServantAdd from './com/editServant'

export default {
    components: { 
        ServantAdd ,
    },
    data() {
        return {
            hosChecked:[],
            checkAll:false,
            hosList:[],
            isIndeterminate: true,
            serviceHos:false,
            loading:false,
            ispopList: false,
            filterModel: {
                serviceName: '',
                hospitalCode: '',
                serTypeCode:"",
                jobs: '',
                title: '',
                skillCode: '',
                IsEnabled:"1",
                startDate: '',
                endDate: '',

                pageIndex: 1,
                pageSize: 20
            },

            currentView: "",

            title: "注册服务者",


            filterWord: "",
            tableData: [],
            selectData: "",
            popAdd: false,

            dataCount: 0, //总数
            currentPage: 1,   //当前页面index
            pageSize: 20, //每页显示条数
            dates: '',
            baseImgPath,

            serTypes: [],   // 职位
            titles: [], //职称
            hospitals: []   //医院
        }
    },

    computed: {
        tHeader(){
            return ['服务者编号', '注册日期','服务者姓名', '所属医院', '职位','职称','职务','擅长']
        },
        filterVal(){
            return ['Code', 'CreateOn', 'ServiceName', 'HospitalName', 'SerTypeName','TitleName','Jobs','SkillCode']
        },
        tableData1(){
            return this.tableData
        },
        name(){
            return "服务者列表"
        }
    },

    created() {
        this.getData()
        this.getServantType()
    },

    methods: {
        async getServantType() {
            this.serTypes = await getBaseDataByCode("0014")
            this.titles = await getBaseDataByCode("0011")
            let res = await GetDropDownPermission({typeId:1})
            this.hospitals = res.data
            this.filterModel.hospitalCode = getCookie("hospitalCode")
            this.hosList = await GetSupplierBySupTypeCode({SupTypeCode:"001,002,003"});
        },

        async getData() {
            this.loading = true
            this.filterModel.pageIndex = this.currentPage
            this.filterModel.pageSize = this.pageSize
            let res = await getServiceManAllByPage(this.filterModel)
            this.tableData = []
            if (res instanceof Array && res.length > 0) {
                this.tableData = res
                this.dataCount = parseInt(this.tableData[0]["RecordCount"])
            }
            this.loading = false
        },

        editRow(item) {
            this.title = "编辑服务者信息"
            this.selectData = item
            this.popAdd = true
        },


        //删除事件
        deleteRow(index) {
            this.$confirm('此操作将删除用户信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteData(this.tableData[index]["Id"], index)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        },

        async deleteData(userId, index) {
            let res = await deleteServiceMan(userId)
            if (res.success && res.success > 0) {
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

        finish() {
            this.popAdd = false
        },

        closeEdit(val){
            this.popAdd = false
        },

        close() {
            this.getData()
        },

        search() {
            this.currentPage = 1
            this.getData()
        },

        timeChange(val) {
            if(val){
                this.filterModel.startDate = val.slice(0, 10)
             this.filterModel.endDate = val.slice(-10)
            }else{
                this.filterModel.startDate = ""
             this.filterModel.endDate = ""
            }
            this.search()
        },

        pageIndexChange(index) {
            this.getData()
        },
        pageSizeChange(size) {
            this.pageSize = size
            this.getData()
        },

        init() {
            this.getData()
            this.currentPage = 1
        },
        hosService(data){
            this.ServiceManCode = data.Code
            
            this.ServiceManName = data.ServiceName
            this.serviceHos = true
            this.checkAll = false

            this.GetServiceManHospital({
                ServiceManCode:data.Code
            })
        },
        handleCheckAllChange(val) {
            
            if( val.target.checked){
                // let arr = [] 
                // this.hosList.forEach(ele=>{
                //     arr.push(ele.Code)
                // })
                this.hosChecked = this.hosList
            }else{
                this.hosChecked = []
            }
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.hosList.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.hosList.length;
        },
        sure(){
            let arr = []
            this.hosChecked.forEach(ele=>{
                arr.push({
                    ServiceManCode:this.ServiceManCode,
                    ServiceManName:this.ServiceManName,
                    hospitalCode:ele.Code,
                    hospitalName:ele.SupplierName,
                    createUserId:getCookie('userId'),
                    createUserName:getCookie("userName")
                })
            })
            this.AddServiceManHospital({
                jsonStr:JSON.stringify(arr),
                code:this.ServiceManCode
            })
        },
        cancel(){
            this.serviceHos = false
            this.hosChecked = []
            this.checkAll = false
            
        },
        async AddServiceManHospital(params){
            let res = await AddServiceManHospital(params)
            if(res.status){
                 this.$message({type: 'success',message: '保存成功!'})
            }else{
                this.$message({type: 'error',message: '保存失败!'})
            }
            this.serviceHos = false
        },
        async GetServiceManHospital(params){
            this.hosChecked = []
            let res = await GetServiceManHospital(params)
            res.data.forEach(ele=>{
                this.hosList.forEach(hos=>{
                    if(ele.hospitalCode == hos.Code){
                        this.hosChecked.push(hos)
                    }
                })
            })
            
            if(this.hosChecked.length == this.hosList.length){
                this.checkAll = true
                this.isIndeterminate = false
            }
            if(this.hosChecked.length == 0){
                this.isIndeterminate = false;
            }
        }

    }
}
</script>

<style lang="less" scoped>
.select {
    background: rgb(249, 249, 249);
    padding: 10px;
    border-radius: 5px;
    .el-input {
        width: 220px;
    }

    .el-date-editor {
        width: 220px;
    }

    .el-input--small .el-input__inner {
        height: 35px;
        width: 220px;
    }

    .el-select {
        width: 220px;
    }
}

.pop-span {
    color: #02a0ff;
    cursor: pointer;
    line-height: 50px;
    display: block;
}

.block {
    float: right;
    margin-right: 30px;
    padding-right: 0!important;
}
.checkBox{
    width:44%;

}
</style>
