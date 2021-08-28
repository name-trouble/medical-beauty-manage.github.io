<template>
    <div class="gradeStrategy selCommon">

        <div class="table_container">
            <el-table ref="gradeSpecialRewardsListTable" :data="gradeSpecialRewardsList" max-height="450" border style="width: 100%">
                <!--<el-table-column type="index" width="70"></el-table-column>-->
                <el-table-column prop="" label="规则类型" min-width="100">
                    <template slot-scope="scope">
                        <span>{{scope.row.catalogName}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="节点名称" min-width="100">
                    <template slot-scope="scope">
                        <span>{{scope.row.nodeNumber}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="等级名称" min-width="100">
                    <template slot-scope="scope">
                        <span>{{scope.row.branchGradeName}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="等级顺序" min-width="100">
                    <template slot-scope="scope">
                        <span>{{scope.row.restrictionBranchOrderNum}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="佣金" min-width="100">
                    <template slot-scope="scope">
                        <span>{{scope.row.reward}}%</span>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="操作" min-width="170">
                    <template slot-scope="scope">
                        <el-button @click="gradeSpecialRewardsEdit(scope.$index)" size="small" type="primary" icon="edit">编辑</el-button>
                        <el-button @click="gradeSpecialRewardsDelete(scope.$index)" size="small" icon="delete">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="gradeSpecialRewardsPage.current"
                :page-sizes="[10, 20, 30]"
                :page-size="gradeSpecialRewardsPage.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="gradeSpecialRewardsPage.total">
            </el-pagination>
            <el-button @click="gradeSpecialRewardsAddAction" type="primary">添加</el-button>
        </div>
        <el-dialog :title="gradeSpecialRewardsSettings.method==='NEW'?'添加':'编辑'" :visible.sync="gradeSpecialRewardsSettings.visible" size="">
            <el-form v-if="gradeSpecialRewardsSettings.visible" :model="gradeSpecialRewardsModel" ref="gradeSpecialRewardsModel" label-width="110px" class="demo-ruleForm">
                <el-form-item label="规则类型：" class="form_item_mt10">
                    <el-select v-model="gradeSpecialRewardsModel.code" filterable placeholder="请选择">
                        <el-option
                            v-for="item in catelogData"
                            :key="item.catalogPath"
                            :label="item.name"
                            :value="item.catalogPath">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="节点名称：" class="form_item_mt10">
                    <!--<el-input v-model="gradeSpecialRewardsModel.nodeNumber" disabled class="form_item"></el-input>-->
                    <el-select v-model="gradeSpecialRewardsModel.nodeNumber" class="form_item">
                        <el-option v-for="item in nodeData" :label="item" :value="item" :key="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="等级名称：" class="form_item_mt10">
                    <el-select v-model="gradeSpecialRewardsModel.gradeCode" class="form_item">
                        <el-option v-for="item in tableData" :label="item.BranchGradeName" :value="item.Code" :key="item.Id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="等级顺序：" class="form_item_mt10">
                    <el-input v-model="gradeSpecialRewardsModel.restrictionBranchOrderNum" class="form_item" type="number"></el-input>
                </el-form-item>
                <el-form-item label="佣金：" class="form_item_mt10">
                    <el-input v-model="gradeSpecialRewardsModel.reward" class="form_item" type="number">
                        <template slot="append">%</template>
                    </el-input>
                </el-form-item>
            </el-form>
            <div class="el-dialog__footer ">
                <el-button @click="gradeSpecialRewardsIssueAction()" type="primary">确定</el-button>
                <el-button @click="gradeSpecialRewardsCancelAction()">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import "@/style/selfCommon.less"
    import { getCookie, delCookie } from '@/config/mUtils'
    import {AddGradeStrategy,UpdateGradeStrategy,GetGradeStrategy,DeleteGradeStrategy,AUGradeStrategySub,GetBranchGradeAll,GetGradeStrategyDetailById,AddGradeSpecialRewards,UpdateGradeSpecialRewards,GetGradeSpecialRewards,DeleteGradeSpecialRewards,GetCatelogByColumnCode} from "@/api/myData"
    export default {
        // name:"gradeStrategy",
        data () {
            return {
                tableData: [],
                catelogData: [],
                nodeData: ['0','1','2','3','4','5','6'],
                gradeSpecialRewardsList: [],
                gradeSpecialRewardsModel: {},
                gradeSpecialRewardsSettings: {method: '', visible: false, editId: ''},
                gradeSpecialRewardsPage: {total: 0, current: 1, size: 10},
            }
        },
        watch: {

        },
        computed:{

        },
        mounted(){
            this.getBranchGradeAll();
            this.GetCatelogByColumnCode();
            this.GetGradeSpecialRewards();
        },
        methods: {
            async getBranchGradeAll(){
                try{
                    let res = await GetBranchGradeAll();
                    this.tableData = this.numOrder(res);
                }catch(err){
                    console.log(err)
                }
            },
            async AddGradeSpecialRewards(params){
                try{
                    let res = await AddGradeSpecialRewards(params)
                    if (res.status) {
                        this.$message({message: '添加成功', type: 'success'});
                        this.gradeSpecialRewardsCancelAction();
                        this.GetGradeSpecialRewards();
                    } else {
                        this.$message.error('添加失败');
                    }
                }catch(err){
                    console.log(err)
                    this.$message.error('添加失败');
                }
            },
            async UpdateGradeSpecialRewards(params){
                try{
                    let res = await UpdateGradeSpecialRewards(params)
                    if (res.status) {
                        this.$message({message: '编辑成功', type: 'success'});
                        this.gradeSpecialRewardsCancelAction();
                        this.GetGradeSpecialRewards();
                    } else {
                        this.$message.error('编辑失败');
                    }
                }catch(err){
                    console.log(err)
                    this.$message.error('编辑失败');
                }
            },
            async GetGradeSpecialRewards(){
                try{
                    let res = await GetGradeSpecialRewards({pageIndex: this.gradeSpecialRewardsPage.current, pageSize:this.gradeSpecialRewardsPage.size})
                    if (res.status) {
                        this.gradeSpecialRewardsList = res.data;
                        this.gradeSpecialRewardsPage.total = res.count;
                    } else {
                        this.$message.error('获取列表失败');
                    }
                }catch(err){
                    console.log(err)
                    this.$message.error('获取列表失败');
                }
            },
            async DeleteGradeSpecialRewards(params){
                try{
                    let res = await DeleteGradeSpecialRewards(params);
                    if (res.status) {
                        this.$message({message: '删除成功', type: 'success'});
                        this.GetGradeSpecialRewards();
                    } else {
                        this.$message.error('删除失败');
                    }
                }catch(err){
                    console.log(err)
                    this.$message.error('删除失败');
                }
            },
            async GetCatelogByColumnCode(){
                try{
                    let res = await GetCatelogByColumnCode({code:100});
                    this.catelogData = res.data;
                }catch(err){
                    console.log(err)
                }
            },

            numOrder(data){
                let len = data.length
                let arr = []
                for(let i =0;i<len-1;i++){
                    for(let j = i+1;j<len;j++){
                        if(data[i].OrderNum>data[j].OrderNum){
                            let temp = data[i]
                            data[i] = data[j]
                            data[j] = temp
                        }
                    }
                }
                return data
            },

            gradeSpecialRewardsAddAction() {
                this.gradeSpecialRewardsSettings.method = "NEW";
                // this.gradeSpecialRewardsModel.nodeNumber = this.gradeSpecialRewardsList.length + 1;
                this.gradeSpecialRewardsSettings.visible = true
            },
            gradeSpecialRewardsIssueAction() {
                console.log(this.gradeSpecialRewardsModel);
                if (this.gradeSpecialRewardsSettings.method === "NEW") {
                    this.AddGradeSpecialRewards(this.gradeSpecialRewardsModel)
                } else if (this.gradeSpecialRewardsSettings.method === "EDIT") {
                    this.gradeSpecialRewardsModel.id = this.gradeSpecialRewardsSettings.editId;
                    this.UpdateGradeSpecialRewards(this.gradeSpecialRewardsModel)
                }
            },
            gradeSpecialRewardsCancelAction() {
                this.$refs['gradeSpecialRewardsModel'].resetFields();
                this.gradeSpecialRewardsModel = {};
                this.gradeSpecialRewardsSettings.visible = false
            },
            gradeSpecialRewardsEdit(i) {
                this.gradeSpecialRewardsSettings.method = "EDIT";
                this.gradeSpecialRewardsSettings.editId = this.gradeSpecialRewardsList[i].id;
                this.gradeSpecialRewardsModel = this.gradeSpecialRewardsList[i];
                this.gradeSpecialRewardsSettings.visible = true;
            },
            gradeSpecialRewardsDelete(i) {
                this.DeleteGradeSpecialRewards({id: this.gradeSpecialRewardsList[i].id})
            },

            handleSizeChange(e) {
                if (e === this.gradeSpecialRewardsPage.size) return;
                this.gradeSpecialRewardsPage.size = e;
                this.GetGradeSpecialRewards();
            },
            handleCurrentChange(e) {
                if (e === this.gradeSpecialRewardsPage.current) return;
                this.gradeSpecialRewardsPage.current = e;
                this.GetGradeSpecialRewards();
            }

        },
        components: {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .dialog-footer{
        text-align: center;
    }
    .table_container{
        width: 100%;
        margin-top: 20px;
     /*   max-width: 600px;*/
    }
    .demo-ruleForm{
        min-width: 400px;
        max-width: 600px;
    }
    .form_item{
        width: 200px;
    }
</style>
