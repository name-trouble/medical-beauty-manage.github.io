<template>
    <div class="payFormList selCommon">
        <el-form :inline="true" :model="form" class="demo-form-inline form_search" label-width="80px" >
            <el-form-item label="关键字：" class="form_item_mt10">
                <el-input v-model="form.keyWords" placeholder="" style="width: 200px;" v-on:keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            <el-form-item label=" " class="form_item_mt10">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
            </el-form-item>
        </el-form>
        <!-- 查询信息 -->
        <!-- 信息表 -->
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;min-height: 400px" max-height="660">
            <el-table-column prop="OrderDate" label="日期" min-width="100">
                <template slot-scope="scope">
                    <span v-if="scope.row.OrderDate">{{scope.row.OrderDate.substring(0,10)}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="ExpendNO" label="编号" min-width="100"></el-table-column>
            <!-- <el-table-column prop="ExpendNO" label="收据单号：" min-width="100"></el-table-column>
            <el-table-column prop="ExpendNO" label="支付人" min-width="100"></el-table-column> -->
            <el-table-column prop="DeptName" label="部门" min-width="100"></el-table-column>
            <el-table-column prop="OperatorName" label="经办人" min-width="100"></el-table-column>
            <el-table-column prop="SupplierCompany" label="供应单位" min-width="100"></el-table-column>
            <el-table-column prop="ProjectDetail" label="项目明细" min-width="130" show-overflow-tooltip></el-table-column>
            <el-table-column prop="ProjectType" label="项目类型" min-width="100"></el-table-column>
            <el-table-column prop="BankAccount" label="户名" min-width="100"></el-table-column>
            <el-table-column prop="BankName" label="银行" min-width="100"></el-table-column>
            <el-table-column prop="Amount" label="金额" min-width="100">
                <template slot-scope="scope">
                    {{scope.row.Amount.toQFW()}}
                </template>
            </el-table-column>
            <el-table-column prop="grade" label="操作" width="150">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.$index,tableData)" type="text">编辑</el-button>
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
        <el-dialog title="编辑" :visible.sync="dialogFormVisible" size='' label-width="100px">
            <el-form :model="form" :rules="rules" style="width: 400px" ref="form" label-width="70px">
                <el-form-item label="部门：" class="form_item_mt10" prop="DeptName">
                    <el-select v-model="form.DeptName" placeholder="请选择" class="form_item_ipt_260">
                        <el-option v-for="item in departmentList" :label="item.DataName" :value="item.DataName"
                                   :key="item.BusinessCode"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="经办人：" class="form_item_mt10" prop="OperatorName">
                    <el-input v-model="form.OperatorName" placeholder="" class="form_item_ipt_260"></el-input>
                </el-form-item>
                <el-form-item label="供应单位：" class="form_item_mt10" prop="SupplierCompany">
                    <el-input v-model="form.SupplierCompany" placeholder="" class="form_item_ipt_260"></el-input>
                </el-form-item>
                <el-form-item label="项目明细：" class="form_item_mt10" prop="DeptName">
                    <el-input v-model="form.ProjectDetail" placeholder="" class="form_item_ipt_260"></el-input>
                </el-form-item>
                <el-form-item label="项目类型：" class="form_item_mt10" prop="ProjectType">
                    <el-select v-model="form.ProjectType" placeholder="请选择" class="form_item_ipt_260">
                        <el-option v-for="item in typeList" :label="item.DataName" :value="item.DataName"
                                   :key="item.BusinessCode"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="户名：" class="form_item_mt10" prop="BankAccount">
                    <el-input v-model="form.BankAccount" placeholder="" class="form_item_ipt_260"></el-input>
                </el-form-item>
                <el-form-item label="银行：" class="form_item_mt10" prop="BankName">
                    <el-input v-model="form.BankName" placeholder="" class="form_item_ipt_260"></el-input>
                </el-form-item>
                <el-form-item label="金额：" class="form_item_mt10" prop="Amount">
                    <el-input-number v-model="form.Amount" :min="0" :controls="false"
                                     class="form_item_ipt_260"></el-input-number>
                </el-form-item>
                <el-form-item label=" ">
                    <el-button @click="save('form')" type="primary" :loading="saveLoading">保存</el-button>
                    <el-button @click="cancel('form')" type="">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import "@/style/selfCommon.less"
    import {GetBaseDataAll,GetExpendOrderAll,DeleteExpendOrderById,UpdateExpendOrder} from "@/api/myData"
    import { getCookie } from '@/config/mUtils'
    export default {
        // name: "payFormList",
        data () {
            return {
                saveLoading:false,
                departmentList: [],
                typeList: [],
                dialogFormVisible: false,
                form: {},
                total: 0,
                size: 10,
                currentPage: 1,
                tableData: [],
                form: {
                    keyWords: ""
                },
                rules: {
                    Amount: [
                        {required: true, message: '请输入金额', trigger: 'blur'}
                    ],
                    BankName: [
                        {required: true, message: '请输入银行', trigger: 'blur'}
                    ],
                    BankAccount: [
                        {required: true, message: '请输入账户', trigger: 'blur'}
                    ],
                    ProjectType: [
                        {required: true, message: '请选择类型', trigger: 'change'}
                    ],
                    ProjectDetail: [
                        {required: true, message: '请输入明细', trigger: 'blur'}
                    ],
                    SupplierCompany: [
                        {required: true, message: '请输入供应商', trigger: 'blur'}
                    ],
                    OperatorName: [
                        {required: true, message: '请输入经办人', trigger: 'blur'}
                    ],
                    DeptName: [
                        {required: true, message: '请输入部门', trigger: 'change'}
                    ]
                }
            }
        },
        computed: {
            /* 导出报表参数 tHeader,filterVal,tableData1*/
            // tHeader(){
            //     return ['代理编号', '注册日期', '代理人', '联系电话', '身份证号', '来源渠道', '代理等级', '缴纳会费','已缴会费','是否结清', '缴纳押金','推荐人','状态']
            // },
            // filterVal(){
            //     return ['Code', 'RegistDate', 'BranchName', 'PhoneNumber', 'IDCard','SourcWayeCode','BranchGradeName','PayAmount','RealPayAmount','IsPayOff','Pledge','ReferrerName','IsEnable']
            // },
            // tableData1(){
            //     this.tableData.forEach(row=>{
            //        /* row.RegistDate = row.RegistDate.substring(0,10)*/
            //     })
            //     this.tableData.push()
            //     return this.tableData
            // },
            // name(){
            //     return '代理管理'
            // },
            /*导出报表参数 tHeader,filterVal,tableData1*/
        },
        mounted(){
            this.GetBaseDataAll()
        },
        methods: {
            async UpdateExpendOrder(params){
                try {
                    this.saveLoading = true
                    let res = await UpdateExpendOrder(params)
                    if (res.success) {
                        this.$message({message: '编辑成功', type: 'success'});
                        this.dialogFormVisible = false
                    } else {
                        this.$message.error('编辑失败');
                    }
                    this.saveLoading = false
                } catch (err) {
                    console.log(err)
                    this.$message.error('编辑失败');
                }
            },
            async GetBaseDataAll(){
                try {
                    let res = await GetBaseDataAll()
                    this.getDate(res)
                    this.search()
                } catch (err) {
                    console.log(err)
                }
            },
            getDate(data){
                data.forEach(row=> {
                    if (row.BusinessCode == '0021') {
                        this.departmentList.push(row)
                    }
                    else if (row.BusinessCode == '0020') {
                        this.typeList.push(row)
                    }
                })
            },
            async DeleteExpendOrderById(params){
                try {
                    let res = await DeleteExpendOrderById(params)
                    if (res.success) {
                        this.$message({message: '删除成功', type: 'success'});
                        this.search()
                    } else {
                        this.$message.error('删除失败');
                    }
                } catch (err) {
                    console.log(err)
                }
            },
            async GetExpendOrderAll(params){
                try {
                    let res = await GetExpendOrderAll(params)
                    this.total = res.count
                    this.tableData = res.data
                } catch (err) {
                    console.log(err)
                }
            },
            getDate(data){
                data.forEach(row=> {
                    if (row.BusinessCode == '0021') {
                        this.departmentList.push(row)
                    }
                    else if (row.BusinessCode == '0020') {
                        this.typeList.push(row)
                    }
                })
            },
            // 条件查询
            onSubmit() {
                this.currentPage = 1
                this.search()
            },

            search(){
                this.GetExpendOrderAll({
                    keywords: this.form.keyWords.removeSP(),
                    pageIndex: this.currentPage,
                    pageSize: this.size
                })
            },
            
            // 分页页面展示数据条数改变触发事件
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.size = val
                this.search()
            },

            // 分页当前页码改变触发事件
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val
                this.search()
            },
            edit(index, data){
                this.dialogFormVisible = true
                this.form = JSON.parse(JSON.stringify((data[index])))
            },
            deleteRow(index, data){
                this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.DeleteExpendOrderById({
                        id: data[index].Id
                    })
                }).catch(() => {

                });
            },
            save(formName){
                this.UpdateExpendOrder({
                    id: this.form.Id,
                    expendNO: this.form.ExpendNO,
                    orderDate: this.form.OrderDate,
                    deptName: this.form.DeptName,
                    operatorName: this.form.OperatorName,
                    supplierCompany: this.form.SupplierCompany,
                    projectDetail: this.form.ProjectDetail,
                    projectType: this.form.ProjectType,
                    bankAccount: this.form.BankAccount,
                    bankName: this.form.BankName,
                    amount: this.form.Amount,
                    createUserId: getCookie('userId'),
                    createBy: getCookie('userName')
                })
            },
            cancel(formName){
//                this.$refs[formName].resetFields();
                this.dialogFormVisible = false
            },
        },
        components: {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .form_item_ipt_260 {
        width: 300px;
    }
</style>
