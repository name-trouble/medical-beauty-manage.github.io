<template>
    <div class="gradeStrategy selCommon">
        <div class="table_container">
            <el-table ref="gradeStrategyListTable" :data="gradeStrategyList" max-height="450" border style="width: 100%">
                <!--<el-table-column type="index" width="70"></el-table-column>-->
                <el-table-column prop="" label="类型Id" min-width="100">
                    <template slot-scope="scope">
                        <span>{{scope.row.typeId}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="类型名称" min-width="100">
                    <template slot-scope="scope">
                        <span>{{scope.row.typeName}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="佣金层次" min-width="100">
                    <template slot-scope="scope">
                        <span>{{scope.row.nodes}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="操作" min-width="170">
                    <template slot-scope="scope">
                        <el-button @click="gradeStrategyEdit(scope.$index)" size="small" type="primary" icon="edit">编辑</el-button>
                        <!--<el-button @click="gradeStrategyDelete(scope.$index)" size="small" icon="delete">删除</el-button>-->
                        <el-button @click="gradeStrategyDetail(scope.$index)" size="small" type="info" v-if="gradeStrategySettings.detailIndex===scope.$index">子策略</el-button>
                        <el-button @click="gradeStrategyDetail(scope.$index)" size="small" type="info" v-if="gradeStrategySettings.detailIndex!==scope.$index" plain>子策略</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button @click="gradeStrategyAddAction" type="primary">添加</el-button>
        </div>
        <el-dialog :title="gradeStrategySettings.method==='NEW'?'添加':'编辑'" :visible.sync="gradeStrategySettings.visible" size="">
            <el-form v-if="gradeStrategySettings.visible" :model="gradeStrategyModel" ref="gradeStrategyModel" label-width="110px" class="demo-ruleForm">
                <el-form-item label="类型Id：" class="form_item_mt10">
                    <el-input v-model="gradeStrategyModel.typeId" class="form_item" type="number"></el-input>
                </el-form-item>
                <el-form-item label="类型名称：" class="form_item_mt10">
                    <el-input v-model="gradeStrategyModel.typeName" maxlength="20" class="form_item"></el-input>
                </el-form-item>
                <el-form-item label="佣金层次：" class="form_item_mt10">
                    <el-input v-model="gradeStrategyModel.nodes" class="form_item" type="number"></el-input>
                </el-form-item>
            </el-form>
            <div class="el-dialog__footer ">
                <el-button @click="gradeStrategyIssueAction()" type="primary">确定</el-button>
                <el-button @click="gradeStrategyCancelAction()">取消</el-button>
            </div>
        </el-dialog>

        <div class="table_container" v-if="gradeStrategySettings.detailIndex!==-1" style="margin-bottom: 40px">
            <el-table ref="gradeStrategySubListTable" :data="gradeStrategySubList" max-height="450" border style="width: 100%">
                <!--<el-table-column type="index" width="70"></el-table-column>-->
                <el-table-column prop="" label="类型名称" min-width="100">
                    <template slot-scope="scope">
                        <span>{{scope.row.typeName}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="节点次序" min-width="100">
                    <template slot-scope="scope">
                        <span>{{scope.row.nodeNumber}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="节点等级" min-width="100">
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
                        <el-button @click="gradeStrategySubEdit(scope.$index)" size="small" type="primary" icon="edit">编辑</el-button>
                        <el-button @click="gradeStrategySubDelete(scope.$index)" size="small" icon="delete">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button @click="gradeStrategySubAddAction" type="primary">添加</el-button>
        </div>
        <el-dialog :title="gradeStrategySubSettings.method==='NEW'?'添加':'编辑'" :visible.sync="gradeStrategySubSettings.visible" size="">
            <el-form v-if="gradeStrategySubSettings.visible" :model="gradeStrategySubModel" ref="gradeStrategySubModel" label-width="110px" class="demo-ruleForm">
                <el-form-item label="类型名称：" class="form_item_mt10">
                    <!--<el-select v-model="gradeStrategySubModel.typeId" class="form_item">-->
                        <!--<el-option v-for="item in gradeStrategyList" :label="item.typeName" :value="item.typeId" :key="item.id"></el-option>-->
                    <!--</el-select>-->
                    <el-input v-model="gradeStrategySubModel.typeName" disabled class="form_item"></el-input>
                </el-form-item>
                <el-form-item label="节点次序：" class="form_item_mt10">
                    <el-select v-model="gradeStrategySubModel.nodeNumber" class="form_item">
                        <el-option v-for="item in nodeData" :label="item" :value="item" :key="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="节点等级：" class="form_item_mt10">
                    <el-select v-model="gradeStrategySubModel.gradeCode" class="form_item">
                        <el-option v-for="item in tableData" :label="item.BranchGradeName" :value="item.Code" :key="item.Id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="等级顺序：" class="form_item_mt10">
                    <el-input v-model="gradeStrategySubModel.restrictionBranchOrderNum" class="form_item" type="number"></el-input>
                </el-form-item>
                <el-form-item label="佣金：" class="form_item_mt10">
                    <el-input v-model="gradeStrategySubModel.reward" class="form_item" type="number">
                        <template slot="append">%</template>
                    </el-input>
                </el-form-item>
            </el-form>
            <div class="el-dialog__footer ">
                <el-button @click="gradeStrategySubIssueAction()" type="primary">确定</el-button>
                <el-button @click="gradeStrategySubCancelAction()">取消</el-button>
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
                nodeData: ['0','1','2','3','4','5','6'],
                gradeStrategyList: [],
                gradeStrategyModel: {},
                gradeStrategySettings: {method: '', visible: false, editId: '', detailIndex: -1},
                gradeStrategySubList: [],
                gradeStrategySubModel: {},
                gradeStrategySubSettings: {method: '', visible: false, editId: ''}
            }
        },
        watch: {

        },
        computed:{

        },
        mounted(){
            this.GetGradeStrategy();
            this.getBranchGradeAll();
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
            async AddGradeStrategy(params){
                try{
                    let res = await AddGradeStrategy(params)
                    if (res.status) {
                        this.$message({message: '添加成功', type: 'success'});
                        this.gradeStrategyCancelAction();
                        this.GetGradeStrategy();
                    } else {
                        this.$message.error('添加失败');
                    }
                }catch(err){
                    console.log(err)
                    this.$message.error('添加失败');
                }
            },
            async UpdateGradeStrategy(params){
                try{
                    let res = await UpdateGradeStrategy(params)
                    if (res.status) {
                        this.$message({message: '编辑成功', type: 'success'});
                        this.gradeStrategyCancelAction();
                        this.GetGradeStrategy();
                    } else {
                        this.$message.error('编辑失败');
                    }
                }catch(err){
                    console.log(err)
                    this.$message.error('编辑失败');
                }
            },
            async GetGradeStrategy(){
                try{
                    let res = await GetGradeStrategy()
                    if (res.status) {
                        this.gradeStrategyList = res.data;
                    } else {
                        this.$message.error('获取列表失败');
                    }
                }catch(err){
                    console.log(err)
                    this.$message.error('获取列表失败');
                }
            },
            async GetGradeStrategyDetailById(i){
                if (i === -1) return;
                try{
                    let grade = this.gradeStrategyList[i];
                    let params = {id: grade.id, typeId: grade.typeId};
                    let res = await GetGradeStrategyDetailById(params);
                    if (res.status) {
                        this.gradeStrategySubList = res.data.strategysSubEntitys;
                    } else {
                        this.$message.error('获取列表失败');
                    }
                }catch(err){
                    console.log(err)
                    this.$message.error('获取列表失败');
                }
            },
            async DeleteGradeStrategy(params){
                try{
                    let res = await DeleteGradeStrategy(params);
                    if (res.status) {
                        this.$message({message: '删除成功', type: 'success'});
                        this.GetGradeStrategy();
                    } else {
                        this.$message.error('删除失败');
                    }
                }catch(err){
                    console.log(err)
                    this.$message.error('删除失败');
                }
            },
            async AUGradeStrategySub(params){
                try{
                    let res = await AUGradeStrategySub(params);
                    if (res.status) {
                        this.$message({message: '成功', type: 'success'});
                        this.GetGradeStrategyDetailById(this.gradeStrategySettings.detailIndex);
                        this.gradeStrategySubCancelAction();
                    } else {
                        this.$message.error('失败');
                    }
                }catch(err){
                    console.log(err)
                    this.$message.error('失败');
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
            gradeStrategyAddAction() {
                this.gradeStrategySettings.method = "NEW";
                this.gradeStrategySettings.visible = true
            },
            gradeStrategyIssueAction() {
                console.log(this.gradeStrategyModel);
                if (this.gradeStrategySettings.method === "NEW") {
                    this.AddGradeStrategy(this.gradeStrategyModel)
                } else if (this.gradeStrategySettings.method === "EDIT") {
                    this.gradeStrategyModel.id = this.gradeStrategySettings.editId;
                    this.UpdateGradeStrategy(this.gradeStrategyModel)
                }
            },
            gradeStrategyCancelAction() {
                this.$refs['gradeStrategyModel'].resetFields();
                this.gradeStrategyModel = {};
                this.gradeStrategySettings.visible = false
            },
            gradeStrategyEdit(i) {
                this.gradeStrategySettings.method = "EDIT";
                this.gradeStrategySettings.editId = this.gradeStrategyList[i].id;
                this.gradeStrategyModel = this.gradeStrategyList[i];
                this.gradeStrategySettings.visible = true;
            },
            gradeStrategyDelete(i) {
                this.DeleteGradeStrategy({id: this.gradeStrategyList[i].id})
            },
            gradeStrategyDetail(i) {
                this.gradeStrategySettings.detailIndex = i;
                this.GetGradeStrategyDetailById(i);
            },

            gradeStrategySubAddAction() {
                this.gradeStrategySubSettings.method = "NEW";
                let grade = this.gradeStrategyList[this.gradeStrategySettings.detailIndex];
                this.gradeStrategySubModel.typeId = grade.typeId;
                this.gradeStrategySubModel.typeName = grade.typeName;
                this.gradeStrategySubSettings.visible = true;
            },
            gradeStrategySubIssueAction() {
                console.log(this.gradeStrategySubModel);
                if (this.gradeStrategySubSettings.method === "NEW") {
                    this.gradeStrategySubModel.jsonStr = JSON.stringify(this.gradeStrategySubModel);
                    this.AUGradeStrategySub(this.gradeStrategySubModel)
                } else if (this.gradeStrategySubSettings.method === "EDIT") {
                    this.gradeStrategySubModel.id = this.gradeStrategySubSettings.editId;
                    this.gradeStrategySubModel.jsonStr = JSON.stringify(this.gradeStrategySubModel);
                    this.AUGradeStrategySub(this.gradeStrategySubModel)
                }
            },
            gradeStrategySubCancelAction() {
                this.$refs['gradeStrategySubModel'].resetFields();
                this.gradeStrategySubModel = {};
                this.gradeStrategySubSettings.visible = false
            },
            gradeStrategySubEdit(i) {
                this.gradeStrategySubSettings.method = "EDIT";
                this.gradeStrategySubSettings.editId = this.gradeStrategySubList[i].id;
                this.gradeStrategySubModel = this.gradeStrategySubList[i];
                this.gradeStrategySubSettings.visible = true;
            },
            gradeStrategySubDelete(i) {
                this.AUGradeStrategySub({id: this.gradeStrategySubList[i].id})
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
