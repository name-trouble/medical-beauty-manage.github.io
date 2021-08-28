<template>
    <div class="DuesDiscount selCommon">
        <!-- 查询信息 -->
        <ul style="margin-bottom: 20px">
            <li class="shelve" :class="{'active':currentIndex===0}" @click="select(0)">总代理折扣</li>
            <li class="shelve" :class="{'active':currentIndex===1}" @click="select(1)">默认折扣</li>
        </ul>
        <div v-show="currentIndex == 0">
            <el-form :inline="true" :model="formInline" class="" label-width="90px"
                     style='background:#f9f9f9;padding-top:10px;margin-bottom: 20px'>
                <el-form-item label="总代理：">
                    <el-input v-model="formInline.name" placeholder=""  v-on:keyup.enter.native="onSubmit"></el-input>
                </el-form-item>
                <el-form-item label="进货名称：">
                    <el-select placeholder="请选择" v-model="formInline.grade" @change="onSubmit">
                        <el-option value="" label="全部"></el-option>
                        <el-option v-for="item in nameList" :label="item.name" :value="item.Code" :key="item.Code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tableData" border style="width: 850px" class="min_table smt" max-height="560">
                <el-table-column prop="BranchCode" label="总代编号" min-width="120"></el-table-column>
                <el-table-column prop="BranchName" label="总代" min-width="120"></el-table-column>
                <el-table-column prop="TypeName" label="进货名称" min-width="120"></el-table-column>
                <el-table-column prop="Discount" label="进货折扣" min-width="120"></el-table-column>
                <el-table-column label="操作" min-width="120">
                    <template slot-scope="scope">
                        <el-button @click="edit(scope.$index,tableData)" type="primary" size="small">修改折扣</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="primary" @click="add" style="float: left;margin-top: 20px">添加总代理</el-button>
            <div class="block" style="float: left;margin-top: 20px">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 20, 40]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
        </div>
        <div v-show="currentIndex == 1">
            <el-table :data="defaultData" border style="width: 400px">
                <el-table-column prop="TypeName" label="进货名称" min-width="120"></el-table-column>
                <el-table-column prop="Discount" label="进货折扣" min-width="120">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.Discount"></el-input>
                    </template>
                </el-table-column>
            </el-table>
            <el-button @click="saveDefault" type="primary" style="margin-top: 20px;">保存</el-button>
        </div>
        <!--编辑弹窗-->
        <el-dialog title="修改折扣" :visible.sync="dialogFormVisible" size="" >
            <el-form :model="form" style="width:400px;">
                <el-form-item label="总代：" :label-width="formLabelWidth" class="dialog_form_item">
                    <span>{{form.BranchName}}</span>
                </el-form-item>
                <el-form-item label="进货名称：" :label-width="formLabelWidth" class="dialog_form_item">
                    <span>{{form.TypeName}}</span>
                </el-form-item>
                <el-form-item label="进货折扣：" :label-width="formLabelWidth" class="dialog_form_item">
                    <el-input v-model="form.Discount" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="editSure()" :loading="saveLoading">确 定</el-button>
                <el-button @click="cancel()">取 消</el-button>
            </div>
        </el-dialog>
        <!--添加代理弹窗-->
        <el-dialog title="添加代理" :visible.sync="dialogDefaultVisible" size="">
            <el-form :model="form" style="width:400px;">
                <el-form-item label="总代理：" :label-width="formLabelWidth" class="dialog_form_item">
                    <el-select v-model="form.branch" filterable >
                        <el-option v-for="item in topBranchList" :label="item.BranchName" :value="item.Code+'|'+item.BranchName" :key="item.Code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="折扣设置：" :label-width="formLabelWidth" class="dialog_form_item">
                    <el-table :data="defaultData" border style="width: 400px">
                        <el-table-column prop="TypeName" label="进货名称" min-width="120"></el-table-column>
                        <el-table-column prop="Discount" label="进货折扣" min-width="120">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.Discount"></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addSure()" :loading="saveLoading">确 定</el-button>
                <el-button @click="addCancel()">取 消</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script type="text/ecmascript-6">
    import "../../style/selfCommon.less"
    import { getCookie, delCookie } from '../../config/mUtils'
    import {GetBranchGradeAll,GetGoodsDiscount,AddBranchGoodsDiscount,getTopBranch,UpdateGoodsDiscount} from "../../api/myData"
    export default {
        // name:"DuesDiscount",
        data () {
            return {
                saveLoading:false,
                nameList:[{name:"医美",Code:"1"}, {name:"美妆",Code:"2"}, {name:"商城",Code:"3"}],
                pageSize:10,
                total:0,
                currentPage: 1,
                currentIndex:0,
                gradeList:[],
                topBranchList:[],
                formInline: {
                    name: '',
                    grade: ''
                },
                formLabelWidth:"90px",
                dialogFormVisible:false,
                dialogDefaultVisible:false,
                form:{branch:""},
                tableData:[],
                defaultData:[],
                loading:true
            }
        },
        mounted(){
            this.getBranchGradeAll()
        },
        computed:{
            tHeader(){
                return ['总代编号', '总代', '进货名称', '进货折扣']
            },
            filterVal(){
                return ['BranchCode', 'BranchName', 'TypeName', 'Discount']
            },
            tableData1(){
                return this.tableData
            },
            name(){
                return "代理消费折扣"
            }
        },
        methods:{
//            更新代理
            async updateDiscount(params){
                try{
                    this.saveLoading = true
                    let res = await UpdateGoodsDiscount(params)
                    if(res.success){
                        this.$message({message: '更新成功', type: 'success'});
                        this.getGoods(0)
                        this.dialogFormVisible = false
                    }else{
                        this.$message.error('更新失败');
                    }
                    this.saveLoading = false
                }catch(err){
                    console.log(err)
                    this.$message.error('更新失败');
                }
            },
            async getTopBranch(){
                try {
                    let res = await getTopBranch()
                    this.topBranchList = res
                } catch (err) {
                    console.log(err)
                }
            },
            getGoods(branch,index){
                let size = 0
                if(index == 0){
                    size = 10
                }else size = 30
                this.getGoodsDiscount({
                    branchName:this.formInline.name, 
                    branchCode:branch,
                    BranchGradeCode:index == 1?"":this.formInline.grade,
                    pageIndex:this.currentPage,
                    pageSize:size
                },index)
            },
//            消费折扣
            async getGoodsDiscount(params,index){

                try{
                    let res = await GetGoodsDiscount(params)
                    if(index == 0){
                        this.tableData = res
                        this.tableData.push()
                        if(res.length!=0){
                            this.total = res[0].RecordCount
                        }else{
                            this.total = 0
                        }
                    }else{
                        this.defaultData = res
                    }
                    this.getTopBranch()
                }catch(err){
                    console.log(err)
                }
            },
//            获取所有等级
            async getBranchGradeAll(){
                try {
                    let res = await GetBranchGradeAll()
                    this.gradeList = res
                    this.getGoods(0)
                } catch (err) {
                    console.log(err)
                }
            },
            async addDiscount(params){
                try{
                    this.saveLoading = true
                    let res = await AddBranchGoodsDiscount(params)
                    if(res.success){
                        this.$message({message: '操作成功', type: 'success'});
                        if(this.currentIndex == 0){
                            this.getGoods(-1,0)
                            // this.getGoodsDiscount({branchName:this.formInline.name, branchCode:-1,BranchGradeCode:this.formInline.grade,pageIndex:this.currentPage, pageSize:this.pageSize},0)
                        }else{
                            this.getGoods(0,1)
                            // this.getGoodsDiscount({branchName:"", branchCode:0, pageIndex:1, pageSize:30},1)
                        }
                    }else{
                        this.$message.error('操作失败');
                    }
                    this.saveLoading = false
                }catch(err){
                    console.log(err)
                    this.$message.error('操作失败');
                }
            },
//            编辑弹窗
            edit (index,data){
                this.dialogFormVisible = true
                this.form = JSON.parse(JSON.stringify(data[index]))
            },
//            编辑确定
            editSure () {
                this.updateDiscount({
                    id:this.form.Id,
                    branchCode:this.form.BranchCode,
                    Discount:this.form.Discount,
                    typeCode:this.form.TypeCode,
                    CreateUserId:getCookie("userId"),
                    CreateBy:getCookie("userName"),
                })
            },
//            编辑取消
            cancel () {
                this.dialogFormVisible = false

            },
            onSubmit() {
                this.currentPage = 1
                this.search()
            },
            search(){
                this.getGoods(-1,0)
            },
            addSure(){
                this.dialogDefaultVisible = false
                let arr = this.attrSplit(this.defaultData)
                this.addDiscount({
                    jsonStr:JSON.stringify(arr)
                })
                this.form.branch = ""
            },
            addCancel(){
                this.dialogDefaultVisible = false
                this.form.branch = ""
            },
            select(num){
                this.currentPage = 1
                this.pageSize = 10
                this.currentIndex = num
                if(num == 0){
                    this.getGoods(-1,0)
                }else{
                    this.getGoods(0,1)
                }
            },
            saveDefault(){
                let data = this.defaultData
                let len = this.defaultData.length
                for(let i = 0;i<len;i++ ){
                    if(!data[i].BranchCode){
                        data[i].BranchCode = 0
                    }
                    if(!data[i].TypeCode){
                        data[i].TypeCode = data[i].TypeId
                    }
                }
                this.nullCheck(this.defaultData)

                this.addDiscount({
                    jsonStr:JSON.stringify(this.defaultData)
                })
            },
            nullCheck(data){
                data.forEach(row=>{
                    if(!row.Discount){
                        return row.Discount = 0
                    }
                })
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val
                this.getGoods(-1,0)
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val
                this.getGoods(-1,0)
            },
            add(){
                this.dialogDefaultVisible = true
                this.getGoods(0,1)
            },
            attrSplit(data){
                let arr = []
                data.forEach(row=>{
                    arr.push({
                        BranchCode:this.form.branch.length>0?this.form.branch.split("|")[0]:"",
                        BranchName:this.form.branch.length>0?this.form.branch.split("|")[1]:"",
                        Discount:row.Discount,
                        TypeCode:row.TypeCode,
                        CreateUserId:getCookie("userId"),
                        CreateBy:getCookie("userName"),
                    })
                })
                return arr
            },
        },
        components: {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .dialog_form_item{
        margin-bottom: 0px;
    }
</style>
