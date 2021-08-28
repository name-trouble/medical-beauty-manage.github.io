<template>
    <div class="system-role">
        <div class="select" id="roleinfo_select">
            <span>关键字：</span>
            <el-input size="small" v-model="filterWord"  v-on:keyup.enter.native="search" placeholder="名称"></el-input>

            <el-button type="primary" size="small" icon="search" @click="search">搜索</el-button>

            <el-button type="primary" size="small" icon="plus" @click="addRow">添加</el-button>

        </div>
        <el-table :data="tableData" ref="multipleTable" style="width: 100%;margin-top:10px;margin-bottom:10px;" border v-loading="loading"
                  stripe min-height="600" row-key="id" @selection-change="selectChange" @row-dblclick="editRow">

            <el-table-column type="index" width="80" label="序号">
            </el-table-column>

            <el-table-column type="selection"   align="center" width="80">
            </el-table-column>

            <el-table-column prop="Code" label="编号" min-width="150">
            </el-table-column>

            <el-table-column prop="Realname" label="名称" min-width="150">
            </el-table-column>

            <el-table-column prop="UserName" label="机构名称" min-width="100">
                <template slot-scope="scope">
                    <span v-if="scope.row.TypeCode == '01'">平台</span>
                <span v-else>
                     {{scope.row.HospitalName}}{{scope.row.HospitalCode}}
                </span>
                </template>
            </el-table-column>

            <el-table-column prop="UserName" label="代理商" min-width="100">
                <template slot-scope="scope">
                    {{scope.row.BranchName}}{{scope.row.BranchCode}}
                </template>
            </el-table-column>

            <el-table-column prop="Description" label="描述" min-width="150">
            </el-table-column>

            <el-table-column prop="Enabled" label="是否有效" min-width="80">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.Enabled === 1 ? 'success' : 'warning'" close-transition
                            v-html="scope.row.Enabled === 1 ? '有效' : '无效'"></el-tag>
                </template>
            </el-table-column>

            <el-table-column fixed="right" label="操作" width="160">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" icon="edit" @click="editRow(scope.$index)">修改</el-button>

                    <el-button type="primary" size="mini" icon="delete" @click="deleteRow(scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="block">
            <el-pagination @size-change="pageSizeChange"
                           @current-change="pageIndexChange"
                           :total="dataCount"
                           :current-page.sync="currentPage"
                           :page-size="pageSize"
                           :page-sizes="[10, 20, 50, 100,500 ,1000]"
                           layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
        </div>
        <!-- 分页 -->

        <el-dialog title="添加角色信息" :visible.sync="ispopAdd" size="tiny" @close="getRoleInfo">
            <pop-add :on-finish="finish"></pop-add>
        </el-dialog>

        <el-dialog ref="updateDialog" title="修改角色信息" :visible.sync="ispopEdit" size="small" width="50%" @close="getRoleInfo">
            <pop-edit :roledata="roleInfo" :on-finish="finish"></pop-edit>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">

    import PopAdd from './com/addRole'
    import PopEdit from './com/editRole'
    import UserRole from './UserRole.vue'
    import { setStyle } from './lib/data.js'
    import { getRoleAll, deleteRole ,GetRoleByPage} from '../../api/myData'
    // import { getCookie} from '@/config/mUtils'
    export default {
        // name: 'RoleInfo',
        components: {
            PopAdd, PopEdit, UserRole
        },
        data() {
            return {
                loading:false,
                dataCount: 0, //总数
                currentPage: 1,   //当前页面index
                pageSize: 20,  //每页显示条数
                ispopAdd: false,
                ispopEdit: false,
                showSet: false,
                roleInfo: {},
                filterWord: "",
                allDate: [],
                tableData: [],
                selectData: [],
            }
        },

        mounted() {
            this.getRoleInfo()
            let styleStr = ".el-table td, .el-table th { height: 32px;}.el-dialog--tiny { width: 25%;min-width:350px}" +
                ".el-form-item {margin-bottom: 10px;}.el-input{float:none!important;} .el-message-box{vertical-align:none;}"
            this.$nextTick(function () {
                setStyle(styleStr, "roleinfo_select")
            })
            let _this = this
            document.onkeyup = function (event) {
                var e = event || window.event;
                var keyCode = e.keyCode || e.which;

                switch (keyCode) {
                    case 13:
                        _this.search()
                        break;
                    default:
                        break;
                }
            }
        },

        methods: {
            async getRoleInfo() {
                this.loading = true
                let res = await GetRoleByPage({
                    keywords:this.filterWord.removeSP(),
                    pageIndex:this.currentPage,
                    pageSize:this.pageSize
                })
                this.dataCount = res.count
                this.allData = res.data
                this.tableData = this.allData.slice(0)
                this.loading = false
            },

            search() {
                this.currentPage = 1
                 this.getRoleInfo()
            },

            pageIndexChange(index) {
                this.getRoleInfo()
            },

            pageSizeChange(size) {
                this.pageSize = size
                this.getRoleInfo()
            },

            addRow() {
                this.ispopAdd = true
            },

            editRow(index) {

                let data = this.tableData[index]
                for (let item in data) {
                    this.$set(this.roleInfo, item, data[item])
                }
                this.ispopEdit = true
            },

            selectChange(val) {
                this.selectData = val
            },

            finish(val) {
                this.ispopAdd = false
                this.ispopEdit = false
            },


            async deleteRole(userId, index) {
                let res = await deleteRole(userId)
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

            //删除事件
            deleteRow(index) {
                this.$confirm('此操作将删除用户信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRole(this.tableData[index]["Id"], index)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            },

        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .select {

    .el-input {
        position: static;
        width: 60px;
        float: none;
    }

    .el-input,
    .el-input__inner {
        width: auto;
    }

    .el-select {
        padding-right: 0;
        float: none;
    }

    }
</style>
