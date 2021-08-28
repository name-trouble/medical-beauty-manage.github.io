<template>
    <div class="recAllocation selCommon">
        <el-form :inline="true" class="form_search" label-width="80px">
            <el-form-item label="总代理：" class="form_item_mt10">
                <el-select v-model="search" @change="submit">
                    <el-option value="全部" label=""></el-option>
                    <el-option v-for="(item,index) in setTopList" :key="index" :value="item.BranchCode" :label="item.BranchName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="策略：" class="form_item_mt10">
                <el-select v-model="TypeId" @change="submit">
                    <el-option value="全部" label=""></el-option>
                    <el-option value="1" label="新策略"></el-option>
                    <el-option value="2" label="老策略"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="" label-width="20px">
                <el-button type="primary" class="searchBtn" @click="submit">搜索</el-button>
            </el-form-item>
            
        </el-form>
        <div class="table_container">
            <el-table ref="multipleTable" :data="ticketData" max-height="560" class="min_table smt"  border style="width: 100%" v-loading="loading">
                <el-table-column type="index" width="70"></el-table-column>
                <el-table-column prop="BranchName" label="总代" min-width="100">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.BranchNameCode" class="form_item" filterable  size="small">
                            <el-option value="0|默认" label="0|默认"></el-option>
                            <el-option v-for="(item,index) in topBranchList" :key="index" :label="item.Code+'|'+item.BranchName" :value="item.Code+'|'+item.BranchName"></el-option>
                        </el-select>
                    </template>recAllocation
                </el-table-column>
                <el-table-column prop="TypeId" label="提成类型" min-width="120">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.TypeId" size="small">
                            <el-option value="1" label="新策略"></el-option>
                            <el-option value="2" label="老策略"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="ShareCount" label="是否金额" min-width="100">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.IsAmount"  size="small">
                            <el-option value="true" label="是"></el-option>
                            <el-option value="false" label="否"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="UpgradeOrderNum" label="升级等级" min-width="100">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.UpgradeOrderNum"  size="small"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="BranchOrderNum" label="推荐人等级序号" min-width="100">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.BranchOrderNum"  size="small"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="Rate" label="比例" min-width="100">
                    <template slot-scope="scope">
                        <!-- <div v-if="scope.row.Rate||scope.row.Rate=='0'">
                                <span v-if="scope.row.IsAmount">{{scope.row.Rate}}</span>
                                <span v-else>{{scope.row.Rate.mul(100)}}%</span>
                            </div>-->
                        <el-input v-model="scope.row.tableRate"  size="small">
                            <template slot="append" v-if="scope.row.IsAmount=='false'">%</template>
                        </el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button @click="edit(scope.$index,ticketData)" size="small" type="primary" icon="edit">保存</el-button>
                        <el-button @click="deleteRow(scope.$index,ticketData)" size="small" icon="delete">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button @click="add" type="primary">添加</el-button>
        </div>

        <el-dialog title="添加" :visible.sync="dialogFormVisible" size="">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
                <el-form-item label="总代理：" prop="branch" class="form_item_mt10">
                    <el-select v-model="ruleForm.branch" class="form_item" filterable>
                        <el-option v-for="(item,index) in topBranchList" :key="index" :label="item.Code+'|'+item.BranchName" :value="item.Code+'|'+item.BranchName"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="提成类型：" prop="type" class="form_item_mt10">
                    <el-select v-model="ruleForm.type" class="form_item">
                        <el-option value="1" label="新策略"></el-option>
                        <el-option value="2" label="老策略"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否金额：" prop="IsAmount" class="form_item_mt10">
                    <el-select v-model="ruleForm.IsAmount" class="form_item">
                        <el-option value="true" label="是"></el-option>
                        <el-option value="false" label="否"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="升级等级：" prop="UpgradeOrderNum" class="form_item_mt10">
                    <el-input-number v-model="ruleForm.UpgradeOrderNum" class="form_item" :controls="false"></el-input-number>
                </el-form-item>
                <el-form-item label="推荐人等级序号：" prop="BranchOrderNum" class="form_item_mt10">
                    <el-input-number v-model="ruleForm.BranchOrderNum" class="form_item" :controls="false"></el-input-number>
                </el-form-item>
                <el-form-item label="提成分配：" prop="rate" class="form_item_mt10">
                    <el-input v-model.Number="ruleForm.rate" class="form_item" @change="numCheck(ruleForm.rate)" style="margin: 5px 5px 0 0">
                        <template slot="append" v-if="ruleForm.IsAmount=='false'">%</template>
                    </el-input>
                </el-form-item>
            </el-form>
            <div class="el-dialog__footer ">
                <el-button @click="sure('ruleForm')" type="primary">确定</el-button>
                <el-button @click="cancel('ruleForm')">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
import "@/style/selfCommon.less"
import { getCookie, delCookie } from '@/config/mUtils'
import { getTopBranch, getBaseDataByCode, DeleteRecomSet, UpdateRecomSet, GetRecomSetByCode, AddRecomSet, GetNameRecomSet } from "@/api/myData"
export default {
    // name: "recAllocation",
    data() {
        return {
            search: "",
            TypeId: "",
            dialogFormVisible: false,
            consumeList: [],
            ticketData: [],
            labelPosition: 'right',
            formLabelAlign: {},
            setTopList: [],
            loading:false,
            ruleForm: {
                branch: "",
                UpgradeOrderNum: 0,
                BranchOrderNum: 0,
                rate: 0,
                type: "",
                IsAmount: "",

            },
            ope: "",
            topBranchList: [],
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                ],
                region: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ],
                date1: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                /* type: [
                     { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                 ],*/
            }
        }
    },
    watch: {
        "ruleForm.check": {
            handler(curVal, oldVal) {
                if (curVal.length == false) {
                    this.ruleForm.rate = ""
                }
            },
            deep: true
        }
    },
    computed: {
        /*packData(){
         return this.packSub
         }*/
    },
    mounted() {
        this.getTopBranch()
    },
    methods: {
        //            添加
        async AddRecomSet(params) {
            try {
                let res = await AddRecomSet(params)
                if (res.success) {
                    this.$message({ message: '添加成功', type: 'success' });
                    this.$refs['ruleForm'].resetFields();
                    this.dialogFormVisible = false
                    this.GetRecomSetByCode()
                } else {
                    this.$message.error('添加失败');
                }
            } catch (err) {
                console.log(err)
                this.$message.error('添加失败');
            }
        },
        async UpdateRecomSet(params) {
            try {
                let res = await UpdateRecomSet(params)
                if (res.success) {
                    this.$message({ message: '编辑成功', type: 'success' });
                    this.GetRecomSetByCode()
                } else {
                    this.$message.error('编辑失败');
                }
            } catch (err) {
                console.log(err)
                this.$message.error('编辑失败');
            }
        },
        async DeleteRecomSet(params) {
            try {
                let res = await DeleteRecomSet(params)
                if (res.success) {
                    this.$message({ message: '删除成功', type: 'success' });
                    this.GetRecomSetByCode()
                } else {
                    this.$message.error('删除失败');
                }
            } catch (err) {
                console.log(err)
                this.$message.error('删除失败');
            }
        },
        //            获取列表
        async GetRecomSetByCode() {
            this.loading = true
            try {
                let res = await GetRecomSetByCode({ BranchCode: this.search, TypeId: this.TypeId })
                this.loading = false
                this.ticketData = this.dealType(res)
            } catch (err) {
                console.log(err)
            }
        },
        //            获取总代
        async getTopBranch() {
            try {
                this.topBranchList = await getTopBranch()
                this.setTopList = await GetNameRecomSet()
                this.dealData(this.consumeList)
                this.GetRecomSetByCode()
            } catch (err) {
                console.log(err)
                this.$message.error('编辑失败');
            }
        },
        numCheck(data) {
            let a, vm = this
            if ((data).length > 1) {
                a = data.replace(/\D/g, '').replace(/^0/g, '')
            } else {
                a = data.replace(/\D/g, '')
            }
            setTimeout(() => {
                vm.ruleForm.rate = a
            }, 100)
        },
        edit(index, data) {
            this.UpdateRecomSet({
                id: data[index].Id,
                branchCode: data[index].BranchCode,
                branchName: data[index].BranchName,
                TypeId: Number(data[index].TypeId),
                isAmount: data[index].IsAmount == 'true' ? true : false,
                upgradeOrderNum: data[index].UpgradeOrderNum,
                branchOrderNum: data[index].BranchOrderNum,
                rate: data[index].IsAmount == 'true' ? Number(data[index].tableRate) : Number(data[index].tableRate).div(100),
                modifiedUserId: getCookie("userId"),
                modifiedBy: getCookie("userName"),
            })
        },
        sure(name) {
            let obj = {
                branchCode: this.ruleForm.branch.split("|")[0],
                branchName: this.ruleForm.branch.split("|")[1],
                TypeId: Number(this.ruleForm.type),
                isAmount: this.ruleForm.isAmount == 'true' ? true : false,
                upgradeOrderNum: this.ruleForm.UpgradeOrderNum,
                branchOrderNum: this.ruleForm.BranchOrderNum,
                rate: Number(this.ruleForm.rate).div(100),
                createUserId: getCookie("userId"),
                createBy: getCookie("userName"),
            }
            this.AddRecomSet(obj)
        },
        cancel(name) {
            this.$refs[name].resetFields();
            this.dialogFormVisible = false
        },
        deleteRow(index, data) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
               this.DeleteRecomSet({
                id: data[index].Id
                 })
            }).catch(() => {
            
            });
        },
        add() {
            this.ope = "add"
            this.dialogFormVisible = true
        },
        dealData(data) {
            let arr = []
            this.consumeList.forEach(row => {
                if (row.DataCode != '6' && row.DataCode != '1') {
                    arr.push(row)
                }
            })
            this.consumeList = arr
        },

        submit() {
            this.GetRecomSetByCode()
        },
        dealType(data) {
            
            data.forEach(row => {
                row.TypeId = row.TypeId + ""
                row.BranchNameCode = row.BranchCode + "|" + row.BranchName
                row.IsAmount = row.IsAmount + ""
                row.tableRate = row.IsAmount == 'true' ? row.Rate : row.Rate.mul(100)
            })
            return data
        },
        copyWorth(data) {
            this.ruleForm.Id = data.Id
            this.ruleForm.branch = data.BranchCode + "|" + data.BranchName
            this.ruleForm.type = data.ConsumeTypeId + ""
            this.ruleForm.num = data.ShareCount
            this.ruleForm.type = data.ConsumeTypeId + ""
            this.ruleForm.comGrade = data.CompanyGradeNum + ""
            this.ruleForm.compRate = Number(data.CompanyRate).mul(100)
        },
        getRateList() {
            let arr = []
            let arg = arguments
            for (let i = 0; i < arg.length; i++) {
                if (arg[i]) {
                    arr.push({
                        rate: arg[i].mul(100)
                    })
                }
            }
            return arr
        }
    },
    components: {

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dialog-footer {
    text-align: center;
}

.table_container {
    width: 100%;
    margin-top: 20px;
    /*   max-width: 600px;*/
}

.demo-ruleForm {
    min-width: 400px;
    max-width: 600px;
}

.form_item {
    width: 150px;
}
</style>
