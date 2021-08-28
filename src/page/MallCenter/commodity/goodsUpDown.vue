<template>
    <div class="goodsUpDown selCommon">
        <!-- 查询信息 -->
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px" >
            <el-form-item label="栏目：" class="form_item_mt10">
                <el-select v-model="formInline.column" placeholder="请选择" style='width:200px;' @change="columnChange">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in column" :label="item.Name" :value="item.CloumnCode" :key="item.Code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="大类：" class="form_item_mt10">
                <el-select v-model="formInline.class1" placeholder="请选择" style='width:200px;' @change="classChange">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in class1" :label="item.name" :value="item.code" :key="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="中类：" class="form_item_mt10">
                <el-select v-model="formInline.class2" placeholder="请选择" style='width:200px;' @change="class2Change">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in class2" :label="item.name" :value="item.code" :key="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="小类：" class="form_item_mt10">
                <el-select v-model="formInline.class3" placeholder="请选择" style='width:200px;'>
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in class3" :label="item.name" :value="item.code" :key="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="价格区间：" class="form_item_mt10">
                <el-input v-model="formInline.startPrice" placeholder="" style="width: 82px;"></el-input>
                <span style="display:inline-block;float:left;margin-right:5px;">-</span>
                <el-input v-model="formInline.endPrice" placeholder="" style="width: 82px;"></el-input>
            </el-form-item>
            <el-form-item label="医院：" class="form_item_mt10">
                <el-select v-model="formInline.supplier" placeholder="请选择" filterable style='width:200px;'>
                    <el-option v-for="item in supplierList" :label="item.supplierName" :value="item.code" :key="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="医生：" class="form_item_mt10">
                <el-select v-model="formInline.doctor" placeholder="请选择" style='width:200px;'>
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in doctorList" :label="item.ServiceName" :value="item.Code" :key="item.Code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商户：" class="form_item_mt10">
                <el-select style="width: 200px"
                    v-model="formInline.shop" filterable remote placeholder="请输入关键词" :remote-method="remoteMethod" :loading="loading">
                    <el-option v-for="item in shopList" :key="item.value" :label="item.ShopName" :value="item.ShopCode"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品名称：" class="form_item_mt10">
                <el-input v-model="formInline.name" style="width: 200px"  v-on:keyup.enter.native="search"></el-input>
            </el-form-item>
            <br/>
            <el-form-item label="    " class="form_item_mt10">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
            </el-form-item>
        </el-form>
        <!-- 查询信息 -->
        <ul>
            <li class="shelve" v-for="(item,index) in shelveList" :key="index" :class="{'active':currentIndex===index}" @click="select(index)">{{item}}</li>
        </ul>

        <el-table :data="tableData"  border style="width: 100%;margin-top:10px;margin-bottom:10px;" max-height="470"  v-loading="tabloading" class="min_table smt"
                      ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="ImgMainUrl" label="图片"  min-width="70">
                    <template slot-scope='scope'>
                        <img style="vertical-align: middle" width="50px" height="50px" :src="scope.row.ImgMainUrl" alt="">
                    </template>
                </el-table-column>
                <el-table-column prop="goodsCode" label="商品编号" min-width="150"></el-table-column>
                <el-table-column prop="name" label="商品名称" min-width="270"></el-table-column>
                <el-table-column prop="keyWords" label="搜索关键字" min-width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="grade" label="分类" min-width="150">
                    <template slot-scope="scope">
                        {{scope.row.cloumnName}}/{{scope.row.catalogName}}
                    </template>
                </el-table-column>
                <el-table-column prop="supplierName" label="医院/供方" min-width="150"></el-table-column>
                <el-table-column prop="priceRange" label="售价" min-width="120"></el-table-column>
                <el-table-column prop="limitAmount" label="积分抵现"  min-width="100"></el-table-column>
                <el-table-column prop="sortCode" label="排序" min-width="100"></el-table-column>
                <el-table-column fixed="right" prop="grade" label="操作" min-width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row, 2)" type="primary"  size="small" v-if="scope.row.state == 1">下架</el-button>
                         <el-button @click="handleClick(scope.row, 1)" type="primary"  size="small" v-else>上架</el-button>
                        <el-button @click="sortCode(scope.row)" type="primary"  size="small">排序</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-button @click="batchState" type="primary" v-text="currentIndex == 1?'批量下架':'批量上架'"></el-button>
            <div class="block">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                               :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
                               layout="total, sizes, prev, pager, next, jumper" :total="totalPage">
                </el-pagination>
            </div>
 
        <el-dialog title="消费券排序" :visible.sync="ispopEdit" size="">
            <el-form  v-model="formInline" class="demo-form-inline" label-width="80px">
                <el-form-item label="排序：" class="form_item_mt0">
                    <el-input v-model.number="formInline.sortCode" style="width: 220px"  placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="" class="form_item_mt10">
                    <span style="color:red">默认为0，数字越大排序越靠前</span>
                </el-form-item>
                <el-form-item label="" label-width="0px" style="text-align:center">
                    <el-button type="primary" @click="sure">确定</el-button>
                    <el-button @click="ispopEdit=false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import '@/style/selfCommon.less';
    import {baseImgPath} from "@/config/env"
    import {GetGoodsByConditions,GetColumnAll,GetCatelogByColumnCode,GetShopByPage,GetDropDownPermission,ModifyGoodScortCode,
        UpdateGoodsState,BatchModifyGoodsState,GetServiceManByHspCode}  from "@/api/myData"
import { getCookie } from '../../../config/mUtils';
    export default {
        // name: 'goodsUpDown',
        data() {
            return {
                shelveList:['未上架','已上架','已下架'],
                ispopEdit:false,
                tabloading:false,
                loading:false,
                shopList:[],
                doctorList:[],
                currentIndex: 0,
                baseUrl:baseImgPath,
                column:"",
                class1:"",
                class2:"",
                class3:"",
                catLog:"",
                hospitalList:"",
                supplierList:"",
                currentPage:1,
                pageSize:10,
                totalPage:0,
                dialogTableVisible: false,
                dialogFormVisible: false,
                // 弹窗数据绑定
                form: {},
                formLabelWidth: '80px',
                // 查询条件数据绑定
                formInline: {
                    column: '',
                    class1: '',
                    class2: '',
                    class3: '',
                    startPrice: '',
                    endPrice: '',
                    hospital: '',
                    supplier:'',
                    doctor:'',
                    name:'',
                    shop:'',
                    sortCode:'',
                },
                // 表格数据
                // tableDataOn: [],
                // tableDataOff: [],
                // tableDataDown:[],

                tableData:[],
                multipleSelection:[],
            }
        },
        computed: {
            /* 导出报表参数 tHeader,filterVal,tableData1*/
            // tHeader(){
            //     return ['商品编号', '商品名称', '分类', '医院/供方','医生', '售价', '积分抵现','提交']
            // },
            // filterVal(){
            //     return ['goodsCode', 'name', 'catalogName', 'supplierName', 'serviceName','priceRange','limitAmount','createBy']
            // },
            // tableData1(){
            //     if(this.currentIndex == 1){
            //         return this.tableDataOn
            //     }
            //     if(this.currentIndex == 0){
            //         return this.tableDataOff
            //     }else if(this.currentIndex == 2){
            //         return this.tableDataDown
            //     }
            // },
            // name(){
            //     if(this.currentIndex == 1){
            //         return "已上架"
            //     }
            //     if(this.currentIndex == 0){
            //         return "未上架"
            //     }else if(this.currentIndex == 2){
            //         return "已下架"
            //     }
            // }
            /*导出报表参数 tHeader,filterVal,tableData1*/

        },
        watch:{
            'formInline.supplier': {
                handler(curVal,oldVal){
                    this.formInline.doctor = ""
                    this.GetServiceManByHspCode({hospitalCode:curVal})
                },
                deep: true
            }
        },
        mounted: function () {
            this.getColumn()
        },
        methods: {
            sortCode(data){
                this.ispopEdit = true
                this.sortId = data.id
                this.formInline.sortCode = data.sortCode?data.sortCode:''
            },
            async sure(){
                let res = await ModifyGoodScortCode({
                    id:this.sortId,
                    SortCode:this.formInline.sortCode
                })
                if(res.status){
                    this.$message({message: '操作成功',type: 'success'});
                    this.ispopEdit = false
                    this.search()
                }else{
                    this.$message.error('操作失败')
                }
            },
            // 条件查询
            onSubmit() {
                this.currentPage[this.currentIndex] = 1
                this.search()
            },
            // 分页页面展示数据条数改变触发事件
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val
                this.search()
            },
            // 分页当前页码改变触发事件
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val
                this.search()
            },

            async GetShopByPage(params){
                try{
                    let res = await GetShopByPage(params)
                    this.shopList = res.data
                    this.loading = false;
                }catch(err){
                    console.log(err)
                }
            },

            remoteMethod(query) {
                if (query !== '') {
                    this.loading = true;
                    this.GetShopByPage({
                        pageIndex: 1,
                        pageSize: 20,
                        keywords: query.removeSP()
                    })
                } else {
                    this.options4 = [];
                }
            },

            // 上下架操作
            handleClick(data, state) {
                this.updateState({
                    id:data.id,
                    state:state,
                    op:0,//0.上下架操作  1.审核操作
                    createUserCode:getCookie("userId"),
                })
            },
            columnChange (){
                this.formInline.class1 = ""
                this.getCatelog({code: this.formInline.column})
            },
            classChange(){
                this.formInline.class2 = ""
                this.class2 = this.parentCode(this.formInline.class1)
            },
            class2Change(){
                this.formInline.class3 = ""
                this.class3 = this.parentCode(this.formInline.class2)
            },

//          获取大类
            getClass(){
                this.class1=this.parentCode("")
            },
            async getGoods(data){
                this.tabloading = true
                try {
                    let res = await GetGoodsByConditions(data)
                    this.tableDataCopy(res.data)
                    this.totalPage = res.count
                    this.tabloading = false
                } catch (err) {
                    console.log(err)
                }
            },
            async batchModifyState(data){

                try {
                    let res = await BatchModifyGoodsState(data)
                    if(res.success){
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        this.search()
                    }else{
                        this.$message.error('操作失败')
                    }
                } catch (err) {
                    console.log(err)
                    this.$message.error('操作失败')
                }
            },
            async getColumn(){
                try {
                    let [res,hos] = await Promise.all([GetColumnAll(),GetDropDownPermission({typeId:1})])
                    this.column = res
                    this.supplierList = hos.data
                    this.formInline.supplier = hos.data[0].code
                    this.search()
                } catch (err) {
                    console.log(err)
                }
            },
            async getCatelog(data){
                try {
                    let res = await GetCatelogByColumnCode(data)
                    this.catelog = res.data
                    this.getClass()
                } catch (err) {
                    console.log(err)
                }
            },
            async updateState(data){
                try {
                    let res = await UpdateGoodsState(data)
                    if(res.success == 1){
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        this.search()
                    }else{
                        this.$message.error('操作失败');
                    }
                } catch (err) {
                    console.log(err)
                    this.$message.error('操作失败');
                }
            },
            parentCode(code){
                let arr = []
                for (let i = 0; i < this.catelog.length; i++) {
                    if (this.catelog[i].parentCode == code) {
                        arr.push(this.catelog[i])
                    }
                }
                return arr
            },
            search(data){
                
                let catelog=""
                if(this.formInline.class3.length !=0){
                    catelog = this.formInline.class3
                }else{
                    if(this.formInline.class2.length!=0){
                        catelog = this.formInline.class2
                    }else{
                        catelog = this.formInline.class1
                    }
                }
                this.getGoods({
                    columnCode: this.formInline.column,
                    catalogCode: catelog,
                    startPrice: this.formInline.startPrice,
                    endPrice: this.formInline.endPrice,
                    supplierCode: this.formInline.supplier,
                    serviceMan: this.formInline.doctor,
                    state: this.currentIndex,
                    keyWords:this.formInline.name.removeSP(),
                    pageSize: this.pageSize,
                    pageIndex: this.currentPage
                })
            },
            select (num) {
                this.currentIndex = num
                this.multipleSelection = []
                this.currentPage = 1
                this.pageSize = 10
                this.totalPage = 0
                this.search()
            },

            handleSelectionChange(val){
                this.multipleSelection = val;
            },
            tableDataCopy(res){
                let data = this.splitUrl(res)
                this.tableData = data
            },
            batchState(num){
                let arr = []
                this.multipleSelection.forEach(data=>{
                    arr.push(data.id)
                })
                let state = 0
                if(this.currentIndex == 1){
                    state = 2
                }else state = 1
                this.batchModifyState({
                    ids:arr.join(","),
                    state:state
                })
            },

//            获取医生
            async GetServiceManByHspCode(data){
                try {
                    let res = await GetServiceManByHspCode(data);
                    this.doctorList = res
                } catch (err) {
                    console.log('获取数据失败', err);
                }
            },

            splitUrl(data){
                data.forEach(row=>{
                    row.ImgMainUrl = baseImgPath+ row.imgMainUrl
                    row.class =  row.cloumnName+"/"+row.catalogName
                })
                return data
            },
        },
        components: {
            // 
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
