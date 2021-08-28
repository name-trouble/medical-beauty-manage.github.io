<template>
    <div class="selCommon rebates">
        <ul>
            <li v-for="(item,index) in nav" class="shelve" :class="{'active':currentIndex==index}" :key="index" @click="select(index)">{{item}}
            </li>
            <li style="display: inline-block">
                <el-button @click="add" type="primary">添加返现活动</el-button>
            </li>
        </ul>
        <!-- 信息表 -->
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;min-height: 400px" max-height="560">
            <el-table-column prop="number" label="活动编号" min-width="100"></el-table-column>
            <el-table-column prop="name" label="活动名称" min-width="100"></el-table-column>
            <el-table-column prop="SourcWayeCode" label="有效时间" min-width="150">
                <template slot-scope="scope">
                    <span v-if="scope.row.startDate">
                        开始时间：{{scope.row.startDate.substring(0,10)}}<br/>
                        结束时间：{{scope.row.endDate.substring(0,10)}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="catalogType" label="适用栏目" min-width="100">
                <template slot-scope="scope">
                    <span v-if="scope.row.catalogType == 1">医美</span>
                    <span v-if="scope.row.catalogType == 2">商城</span>
                </template>
            </el-table-column>
            <el-table-column prop="IsAllGoods" label="适用商品" min-width="100">
                <template slot-scope="scope">
                    <span v-if="scope.row.IsAllGoods">全部商品</span>
                    <span v-if="!scope.row.IsAllGoods">部分商品</span>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="活动状态" min-width="100">
                <template slot-scope="scope">
                    <span v-if="scope.row.status == 1">未开始</span>
                    <span v-if="scope.row.status == 2">进行中</span>
                    <span v-if="scope.row.status == 3">已结束</span>
                    <span v-if="scope.row.status == 4">已关闭</span>
                </template>
            </el-table-column>
            <el-table-column prop="grade" label="操作" width="150" v-if="currentIndex !=3">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.$index,tableData)" type="text" v-if="scope.row.status != 3">编辑
                    </el-button>
                    <el-button @click="close(scope.$index,tableData)" type="text" v-if="scope.row.status != 3">关闭
                    </el-button>
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
        <el-dialog title="添加" :visible.sync="dialogFormVisible" size=''>
            <add style="width: 800px" @selectP="selectP" :selectProject="selectProject" @closeAdd="closeAdd"
                 :ProjectId="ProjectId" v-if="dialogFormVisible"></add>
        </el-dialog>
        <el-dialog :modal="true" title="" :visible.sync="dialogFormVisible1" size='' label-width="80px">
            <div class="goodList" style="width: 600px">
                <el-tree :data="data2" show-checkbox :accordion="true" node-key="id" ref="tree" highlight-current
                         :props="defaultProps"
                         element-loading-text="拼命加载中"
                         v-loading.body="loading"></el-tree>
                <div class="footer_ope">
                    <el-button @click="getNode" type="primary">保存</el-button>
                    <el-button @click="cancelProject">取消</el-button>
                </div>
            </div>
        </el-dialog>
        <el-dialog :modal="true" title="编辑" :visible.sync="dialogFormVisibleT" size='' label-width="80px">
            <edit v-if="dialogFormVisibleT" style="width: 800px" :editMes="editMes" @selectP="selectP"
                  :selectProject="selectProject" @closeAdd="closeAdd" :ProjectId="ProjectId"></edit>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import "@/style/selfCommon.less"
    import add from "./components/rebatesAdd.vue"
    import edit from "./components/editRebates.vue"
    import { getProjectCount, getProjectAll,GetReturnPointRuleList ,DeleteReturnPointRule,GetCatelogByColumnCode,GetGoodsByKeywords,CloseReturnPoint} from '@/api/myData'
    export default {
        // name: "rebates",
        data () {
            return {
                total: 0,
                size: 10,
                currentPage: 1,
                loading: true,
                data1: [],
                data2: [],
                editMes: {},
                selectProject: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
//                编辑项目
                editProject:[],
                ProjectId: [],
                projectList: [],
                classList: [],
                dialogFormVisibleT: false,
                dialogFormVisible1: false,
                dialogFormVisible: false,
                currentIndex: 0,
                nav: ['全部', '未开始', '进行中', '已结束'],
                tableData: [],
            }
        },
        mounted(){
            this.search(0)
        },
        methods: {
            async GetReturnPointRuleList(params){
                try {
                    let res = await GetReturnPointRuleList(params)
                    this.total = res.count
                    this.tableData = res.data
                } catch (err) {
                    console.log(err)
                }
            },
            async DeleteReturnPointRule(params){
                try {
                    let res = await DeleteReturnPointRule(params)
                    if (res.status) {
                        this.$message({type: 'success', message: '删除成功!'})
                        this.search(this.currentIndex)
                    } else {
                        this.$message({type: 'error', message: '删除失败!'})
                    }
                } catch (err) {
                    console.log(err)
                    this.$message({type: 'error', message: '删除失败!'})
                }
            },
            async CloseReturnPoint(params){
                try {
                    let res = await CloseReturnPoint(params)
                    if (res.status) {
                        this.$message({type: 'success', message: '关闭成功!'})
                        this.search(this.currentIndex)
                    } else {
                        this.$message({type: 'error', message: '关闭失败!'})
                    }
                } catch (err) {
                    console.log(err)
                    this.$message({type: 'error', message: '关闭失败!'})
                }
            },

            close(index, data){
                this.CloseReturnPoint({
                    id:data[index].id,
                    status:4
                })
            },
            edit(index, data){
                this.dialogFormVisibleT = true
                this.editMes = data[index]
                this.selectProject = []
            },
            deleteRow(index, data){
                this.DeleteReturnPointRule({
                    id: data[index].id
                })
            },
            add(){
                this.dialogFormVisible = true
                this.selectProject = []
            },
            select(index){
                this.currentIndex = index
                this.search(index)

            },
            selectP(val){
                this.loading = true
                if(val.length>1){
                    this.getData(val[0],val[1])
                }else{
                    this.getData(val)
                }
                this.dialogFormVisible1 = true
            },
            cancelProject(){
                this.dialogFormVisible1 = false
            },
            
            search(params){
                let status = ""
                if (params != 0) {
                    status = "status" + params
                }
                this.GetReturnPointRuleList({
                    pageIndex: this.currentPage,
                    pageSize: this.size,
                    where: status
                })
            },
            //            获取选中项目
            getNode(){
                let arr = []
                this.$refs.tree.getCheckedNodes().forEach(row=> {
                    if (row.CatalogPath) {
                        arr.push(row)
                    }
                })
                this.selectProject = arr
                this.ProjectId = this.getParent(this.$refs.tree.getCheckedNodes())
                this.dialogFormVisible1 = false
            },
            getParent(data){
                var len = data.length
                let arr = []
                for (let i = 0; i < len; i++) {
                    for (let j = 0; j < len; j++) {
                        if (data[i].pid == data[j].id) {
                            break
                        } else {
                            if (j == len - 1) {
                                arr.push(data[i])
                            }
                        }
                    }
                }
                return arr
            },
            async getData(index,params) {
                if (index == 1) {
                    this.projectList = await getProjectAll()//xiaoxie
                    let res = await GetCatelogByColumnCode({code: 100})//daxie
                    this.classList = res.data
                } else {
                    this.projectList = await getProjectAll({IsMall: 1})//daxie
                    let res = await GetCatelogByColumnCode({code: 101})//xiaoxie
                    this.classList = res.data
                }
//                编辑传值params
                this.data1 = this.dealData(this.projectList)
                this.data2 = this.getDataTree(this.classList)
                if(params){
                    this.selectProject = this.geteditMes(this.data1,params)
                }
                this.loading = false
                setTimeout(()=>{
                    this.setCheckedKeys(params)
                },500)
            },
            getDataTree(data){
                let arr = [], arr2 = []
                data.forEach(row=> {
                    arr.push({id: row.code, label: row.name, pid: row.parentCode})
                })
                arr2 = this.getdata(this.data1.concat(arr), "")
                return arr2
            },
            dealData(data){
                data.forEach(row=> {
                    let lastCode = row.CatalogPath.split("|")
                    row.pid = lastCode[lastCode.length - 2]
                    row.label = row.Name
                    row.id = row.Code
                })
                return data
            },
            getdata(data, pid) {
                var result = [], temp;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].pid == pid) {
//                        var obj = {"label": data[i].label, "id": data[i].id};
                        var obj = data[i]
                        temp = this.getdata(data, data[i].id);
                        if (temp.length > 0) {
                            obj.children = temp;
                        }
                        result.push(obj);
                    }
                }
                return result;
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.size = val
                this.search(this.currentIndex)
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val
                this.search(this.currentIndex)
            },
            closeAdd(val){
                if (val != 'cancel') {
                    this.search(this.currentIndex)
                }
                this.dialogFormVisible = false
                this.dialogFormVisibleT = false
            },
            geteditMes(data,params){

                let arr = []
                let len = params.length
                let len1 = data.length
                for(let i=0;i<len;i++){
                    for(let j=0;j<len1;j++){
                        if(params[i]==data[j].Code){
                            arr.push(data[j])
                            break;
                        }
                    }
                }
                return arr
            },
            setCheckedKeys(params) {
                this.$refs.tree.setCheckedKeys( params);
            },
        },
        components: {
            add,
            edit
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.rebates{

}
</style>
