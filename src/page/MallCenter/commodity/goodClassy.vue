<template>
    <div class="selCommon">
        <div style="margin-left:20px">
            <div class="classification">
                <div class="classify-tittle">栏目</div>
                <ul class="classify_container">
                    <li v-for='(item,index) in column' class="classify-list" :key="index" :class="{'active':currentIndex[0]===index}"
                        @click='selectColumn(item,0,index)'>{{item.Name}}
                    </li>
                </ul>
                <div class="classify-footer"></div>
            </div>
            <div class="classification">
                <div class="classify-tittle">大类</div>
                <ul class="classify_container">
                    <li v-for='(item,index) in items[0]' class="classify-list" :key="index" :class="{'active':currentIndex[1]===index}"
                        @click='select(item,1,index)'>{{item.name}}
                    </li>
                </ul>
                <div class="classify-footer">
                    <el-button class='edit-btn' type="primary" size='small' icon="plus" @click='add(1)'></el-button>
                    <el-button class='edit-btn' type="primary" size='small' icon="edit" @click='edit(1)'></el-button>
                    <el-button class='edit-btn' type="primary" size='small' icon="delete" @click='del(1)'></el-button>
                </div>
            </div>
            <div class="classification">
                <div class="classify-tittle">中类</div>
                <ul class="classify_container">
                    <li v-for='(item,index) in items[1]' class="classify-list" :key="index" :class="{'active':currentIndex[2]===index}"
                        @click='select(item,2,index)'>{{item.name}}
                    </li>
                </ul>
                <div class="classify-footer">
                    <el-button class='edit-btn' type="primary" size='small' icon="plus" @click='add(2)'></el-button>
                    <el-button class='edit-btn' type="primary" size='small' icon="edit" @click='edit(2)'></el-button>
                    <el-button class='edit-btn' type="primary" size='small' icon="delete" @click='del(2)'></el-button>
                </div>
            </div>
            <div class="classification">
                <div class="classify-tittle">小类</div>
                <ul>
                    <li v-for='(item,index) in items[2]' class="classify-list" :key="index" :class="{'active':currentIndex[3]===index}"
                        @click='select(item,3,index)'>{{item.name}}
                    </li>
                </ul>
                <div class="classify-footer">
                    <el-button class='edit-btn' type="primary" size='small' icon="plus" @click='add(3)'></el-button>
                    <el-button class='edit-btn' type="primary" size='small' icon="edit" @click='edit(3)'></el-button>
                    <el-button class='edit-btn' type="primary" size='small' icon="delete" @click='del(3)'></el-button>
                </div>
            </div>
        </div>
        
<!--一级添加-->
        <el-dialog title="添加：" :visible.sync="dialogFormVisible[0]" size="">
            <el-form :model="form" :inline='true' style="width: 320px;">
                <el-form-item label="名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off" style='width:200px;'></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addSure(0)">确 定</el-button>
                <el-button @click="cancel(0)">取 消</el-button>
            </div>
        </el-dialog>

        <el-dialog title="编辑" :visible.sync="dialogFormVisible[1]" size="">
            <el-form :model="form" :inline='true' style="width: 320px;">
                <el-form-item label="名称：" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off" style='width:200px;'></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addSure(1)">确 定</el-button>
                <el-button @click="cancel(1)">取 消</el-button>
            </div>
        </el-dialog>

        <div class="clear">
            <p style="line-height: 36px;display:inline-block;margin-top:20px">当前已选分类：“{{selectItem.name}}”,请选择属性：</p>
            <div style="display:inline-block;margin:20px 0">
                <el-input v-model="searMes" type="text" @change="down($event)" placeholder="搜索" style="width:100px;margin:0 10px"></el-input>
                <el-button type="primary" @click="addAttributes">确认添加</el-button>
            </div>
            <el-table ref="multipleTable" :data="tableData3" border tooltip-effect="dark" style="width: 100%;max-width:1000px;margin-bottom: 20px"
                min-height="400px" max-height="500" highlight-current-row  @selection-change="handleSelectionChange">
                <el-table-column type="selection" align="center" width="55" ></el-table-column>
                <el-table-column prop="Code" label="编号" width="65"></el-table-column>
                <el-table-column label="属性名称" min-width="120">
                    <template slot-scope="scope">{{ scope.row.Name }}</template>
                </el-table-column>
                <el-table-column prop="EnterWay" label="属性值的录入方式" min-width="120" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.EnterWay == 1">文本框</span>
                        <span v-if="scope.row.EnterWay == 2">下拉框</span>
                        <span v-if="scope.row.EnterWay == 3">多选</span>
                    </template>
                </el-table-column>
                <el-table-column prop="TextValue" min-width="300" label="可选值列表">
                    <template slot-scope="scope">
                        <span>{{scope.row.TextValue}}</span>
                    </template>
                </el-table-column>
                <el-table-column type="index" width="70" align="center"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import '@/style/selfCommon.less';
    import {GetCatelogByColumnCode,GetColumnAll,DeleteCatelogById,
        GetPropertyByKeywords,GetCatelogChildrensByCode,AddCatalog,UpdateCatalog,BatchSaveCatalogProperty} from "@/api/myData"
    export default {
        // name: 'goodsClassification',
        data () {
            return {
                path:"",
                selectItem:{},
                searMes:'',
                dialogFormVisible0:false,
                dialogFormVisible1:false,
                formLabelWidth: '80px',
                form: {},
                formList:[],
                column:[],
                addIndex:"",
                editIndex:"",
                index0:'',
                index1: '',
                index2: '',
                index3: '',
                currentIndex0: '',
                currentIndex1: '',
                currentIndex2: '',
                currentIndex3: '',
                item1: [],
                item2: [],
                item3: [],
                data:[],
                tableData3:[],
                multipleSelection: [],

                items:[[{}],[{}],[{}]],
                flg:false,//刷新数据标志位
                allCatlog:[],
                currentIndex:['999','999','999','999'],//每个分类当前点击下标 999表示当前分类没有点击项
                dialogFormVisible:[false,false,false],
                opeIndex:0,//当前操作的类别
            }
        },
        mounted: function () {
            this.getColumn()
        },
        computed:{
        },
        methods: {
            refreshData(){//刷新数据
                this.items.push()
                this.currentIndex.push()
                this.dialogFormVisible.push()
            },
            // 清空子节点数据
            emptyData(order){
                this.currentIndex.forEach((ele,index,arr)=>{
                    if(index>order){
                        arr[index] = '999'
                    }
                })
                this.items.forEach((ele,index,arr)=>{
                    if(index>order){
                        arr[index]=[{}]
                    }
                })
                this.refreshData()
            },
            async getColumn(){
                let [column,propety] = await Promise.all([GetColumnAll(),GetPropertyByKeywords({keywords:""})])
                this.column = column
                this.tableData3 = propety
            },
            async selectColumn(data,order,index){// 栏目点击
                this.currentIndex[0] = index
                let res = await GetCatelogByColumnCode({code:data.CloumnCode})
                this.allCatlog = res.data
                this.items[0] = this.getChilrenList('')
                this.emptyData(0)
            },
            select(data,order,index){// 分类点击
                this.selectItem = data
                this.currentIndex[order] = index
                if(order<3){//小类没有下级
                    this.items[order] = this.getChilrenList(data.code)
                    this.emptyData(order)
                }
                this.refreshData()
                this.getProperty({
                    keywords:'',
                    columncode:data.cloumnCode,
                    catelogcode:data.code,
                })
            },

            add(index){
                this.form.name = ""
                if(this.currentIndex[index-1] == '999'){
                    this.$message({message: '警告!，请先选择上一级',type: 'warning'});
                }else{
                    this.opeIndex = index-1
                    this.dialogFormVisible[0] = true
                    this.dialogFormVisible.push()
                }
            },
            edit(index){
                if(this.currentIndex[index]=='999'){
                    this.$message({message: '警告!，请先选择要编辑的选项',type: 'warning'});
                }else{
                    this.form.name = this.items[index-1][this.currentIndex[index]].name
                    this.opeIndex = index-1
                    this.dialogFormVisible[1] =true
                    this.dialogFormVisible.push()
                }
            },
            del(index){
                if(this.currentIndex[index]=='999'){
                    this.$message({message: '警告!，请先选择要删除的选项',type: 'warning'});
                }else{
                    this.opeIndex = index-1
                    let selectData = this.items[index-1][this.currentIndex[index]]
                    this.DeleteCatelogById({
                        id:selectData.id,
                        cloumnCode:selectData.cloumnCode,
                    },selectData.parentCode,index)
                }
            },

            addSure(ope){//0 添加 1编辑 2删除
                if(ope == 0){
                    let selectData
                    if(this.opeIndex == 0){
                        selectData = this.column[this.currentIndex[this.opeIndex]]
                    }else{
                        selectData = this.items[this.opeIndex-1][this.currentIndex[this.opeIndex]]
                    }
                    let catalogPath = ''
                    // catalogPath  部分数据路径有问题所以重新排列
                    if(this.opeIndex == 2){
                        catalogPath = "|"+this.items[0][this.currentIndex[1]].code+"|"+this.items[1][this.currentIndex[2]].code+'|'
                    }else if(this.opeIndex == 1){
                        catalogPath = "|"+this.items[0][this.currentIndex[1]].code+"|"
                    }
                    let params = {
                        cloumnCode:selectData.cloumnCode?selectData.cloumnCode:selectData.CloumnCode,
                        parentCode:selectData.code?selectData.code:'',
                        name:this.form.name,
                        cloumnName:this.column[this.currentIndex[0]].Name,
                        catalogPath:catalogPath,
                    }
                    this.AddCatalog(params,selectData.code?selectData.code:'')
                }else if(ope == 1){
                    let selectData = this.items[this.opeIndex][this.currentIndex[this.opeIndex+1]]
                    this.UpdateCatalog({
                        cloumnCode:selectData.cloumnCode,
                        id:selectData.id,
                        name:this.form.name
                    },selectData.parentCode)
                }
            },

            // 根据父节点获取子数据集合
            getChilrenList(code){
                let arr = []
                this.allCatlog.forEach(ele => {
                    if(ele.parentCode == null){
                        ele.parentCode =''
                    }
                    if(ele.parentCode == code){
                        arr.push(ele)
                    }
                });
                return arr
            },

            async down(){
                this.getProperty({
                    keywords:'',
                    columncode:this.selectItem.cloumnCode,
                    catelogcode:this.selectItem.code,
                })
            },

            async GetCatelogByColumnCode(params,code){
                let res = await GetCatelogByColumnCode(params)
                this.allCatlog = res.data
                
                this.items[this.opeIndex] = this.getChilrenList(code)
                this.refreshData()
            },

            async AddCatalog(params,code){
                let res = await AddCatalog(params)
                if(res.success>0){
                    this.dialogFormVisible[0] = false
                    this.GetCatelogByColumnCode({code:params.cloumnCode},code)
                }
            },
            async UpdateCatalog(params,code){
                let res = await UpdateCatalog(params)
                if(res.success>0){
                    this.dialogFormVisible[1] = false
                    this.GetCatelogByColumnCode({code:params.cloumnCode},code)
                }
            },
            async DeleteCatelogById(params,code,index){
                let res = await DeleteCatelogById(params)
                if(res.success>0){
                    this.GetCatelogByColumnCode({code:params.cloumnCode},code)
                }
                this.currentIndex[index] = '999'//删除后清除当前分类点击下标
                this.currentIndex.push()
            },
            async getProperty(params){
                var res = await GetPropertyByKeywords(params);
                this.tableData3 = res
                var vm =this
                this.$nextTick(()=>{
                     vm.check(res)
                })
            },
            check(list){
                let arr=[]
                this.$refs.multipleTable.clearSelection();
                list.forEach(data=>{
                    if(data.IsChecked == 1){
                        this.$refs.multipleTable.toggleRowSelection(data);
                    }
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                this.multipleSelection.push()
            },
            async addAttributes(){
                let arr = []
                this.multipleSelection.forEach(ele=>{
                    
                    arr.push({
                        columnCode: this.selectItem.cloumnCode,
                        catalogCode: this.selectItem.code,
                        propertyCode: ele.Code,
                        propertyName: ele.Name
                    })
                })
                let res = await BatchSaveCatalogProperty({"JsonStr":JSON.stringify(arr)})
                if(res.success != 0){
                    this.$alert('添加成功', '提示', {confirmButtonText: '确定',type:"success"});
                }
            },
            cancel(index){
                this.dialogFormVisible[index] = false
                this.dialogFormVisible.push()
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .classification {
        display: block;
        float: left;
        width: 240px;
        /* width: 20%; */
        position: relative;
        margin-top: 60px;
        border:1px solid #dedede;
        border-right: none;
        height: 560px;
    }
    .classification:nth-child(4){
        border:1px solid #dedede;
    }

    .classify-tittle {
        position: absolute;
        top: -40px;
        width: 100%;
        height: 40px;
        color: #666;
        text-align: center;
        line-height: 40px;
        font-size: 16px;
    }

    .classification .classify-list{
        cursor: pointer;
        width:100%;
        height:32px;
        line-height: 32px;
        font-size: 14px;
        text-indent: 21px;
        color: #666;
    }
    .classify_container{
        height:513px;
        overflow: auto;
    }
    .classify-footer  {
        position: absolute;
        bottom: 0px;
        width: 100%;
        height: 47px;
        background-color: rgba(242, 242, 242, 1);
        line-height: 48px;
        text-indent: 110px;
    }

    .edit-btn {
        /*float: right;*/
        margin-left: 0px;
    }

    .classify-list.active {
        background:#cda382;
        color: #fff;
    }

    .el-button--primary {
        color: #fff;
        background-color: #cda382;
        border-color: #cda382;
    }
    .clear{
        clear: both;
        margin-left: 20px;
    }
</style>
