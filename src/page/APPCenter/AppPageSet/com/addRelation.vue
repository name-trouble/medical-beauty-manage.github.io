<template>
    <div class="goodsList selCommon">
        <!-- 查询信息 -->
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px" >                 

            <el-form-item label="商品名称：" class="form_item_mt10" v-if="selectMes.typeId == 1">
                <el-input v-model="formInline.keyWords" style="width: 200px"  v-on:keyup.enter.native="search"></el-input>
            </el-form-item>

            <el-form-item label="关键字：" class="form_item_mt10" v-if="selectMes.typeId == 2">
                <el-input v-model="formInline.keyWords" style="width: 220px"  placeholder="券种编号/申请人/券名" v-on:keyup.enter.native="search"></el-input>
            </el-form-item>
            <el-form-item label="券类型：" class="form_item_mt10" v-if="selectMes.typeId == 2">
                <el-select v-model="formInline.ticketsType"  class="form_item_ipt220">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="折扣券" value="1"></el-option>
                    <el-option label="现金券" value="2"></el-option>
                    <el-option label="门票" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="" class="form_item_mt10" label-width="10px">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
                <el-button type="primary" @click="AddGoodsGift" class="searchBtn">确认添加</el-button>
            </el-form-item>
        </el-form>
        <!-- 商品信息 -->
         <el-row :gutter="20" v-if="selectMes.typeId == 1">
            <el-col :span="12">
                <div class="elCol">列表：</div>
                <el-table :data="tableData" border style="width: 100%;margin-top:10px;margin-bottom:10px;" ref="multipleTable" 
                 v-loading="tabloading" class="min_table smt" max-height="440"  @selection-change="handleSelectionChange" @select='selectCheck' @select-all="selectAll">
                    <el-table-column type="selection" width="55" align="center"></el-table-column>
                    <el-table-column prop="alias" label="商品名称" min-width="100" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="grade" label="分类" min-width="100" show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{scope.row.cloumnName}}/{{scope.row.catalogName}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="supplierName" label="医院/供方" min-width="100"></el-table-column>
                    <el-table-column prop="priceRange" label="售价" min-width="80"></el-table-column>
                </el-table>
            </el-col>
            <el-col :span="12">
                <div  class="elCol">已选：</div>
                <el-table :data="selectData" border style="width: 100%;margin-top:10px;margin-bottom:10px;" 
                 v-loading="tabloading" class="min_table smt" max-height="440">
                    <el-table-column prop="alias" label="商品名称" min-width="100" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="TickName" label="使用限制" min-width="80" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.isShare">
                                <el-option label="自己使用" value="0"></el-option>
                                <el-option label="需要分享" value="1"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column prop="priceRange" label="操作" min-width="80" align="center">
                        <template slot-scope="scope">
                            <el-button @click="selectData.splice(scope.$index,1)" size="small" type="primary">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
         </el-row>
        <!-- 卡券信息表 -->
        <el-row :gutter="20" v-if="selectMes.typeId == 2">
            <el-col :span="12">
                <div>列表：</div>
                <el-table :data="tableData" border style="width: 100%;margin-top:10px;margin-bottom:10px;" ref="multipleTable"  
                v-loading="tabloading" class="min_table smt" max-height="440" @selection-change="handleSelectionChange" @select='selectCheck' @select-all="selectAll">
                    <el-table-column type="selection" width="55" align="center"></el-table-column>
                    <el-table-column prop="TickName" label="券名称" min-width="100" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="grade" label="券类型" min-width="100">
                        <template slot-scope="scope">
                            <span v-if="scope.row.TicketsType==1">
                                    折扣券
                                </span>
                                <span v-if="scope.row.TicketsType==2">
                                    代金券
                                </span>
                                <span v-if="scope.row.TicketsType==3">
                                    门票
                                </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="Price" label="售价" min-width="100" align="right"></el-table-column>
                </el-table>
            </el-col>
            <el-col :span="12">
                <div>已选：</div>
                <el-table :data="selectData" border style="width: 100%;margin-top:10px;margin-bottom:10px;" 
                 v-loading="tabloading" class="min_table smt" max-height="440" >
                    <el-table-column prop="alias" label="券名称" min-width="100" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="TickName" label="使用限制" min-width="80" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.isShare">
                                <el-option label="自己使用" value="0"></el-option>
                                <el-option label="需要分享" value="1"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column prop="priceRange" label="操作" min-width="80" align="center">
                        <template slot-scope="scope">
                            <el-button @click="selectData.splice(scope.$index,1)" size="small" type="primary">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
           
        </el-row>
        
        <!-- 信息表 -->

        <!-- 分页 -->
        <div class="">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalPage">
            </el-pagination>
        </div>
        <!-- 分页 -->
    </div>
</template>

<script type="text/ecmascript-6">
    import '@/style/selfCommon.less';
    import {setStore} from '@/config/mUtils'
    import {GetGoodsByConditions,AddGoodsGift,GetGoodsGift,getTicketsInfoByPage}  from "@/api/myData"
    import { getCookie } from '../../../../config/mUtils';
    export default {
        // name: 'goodsList',
        data() {
            return {
                radio:'0',
                selectData:[],
                multipleSelection:[],
                tabloading:false,
                loading:false,
                currentPage: 1,
                pageSize:10,
                totalPage:10,
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
                    keyWords:'',
                    shop:'',
                    isEnable:'1',
                    ticketsType:'',
                },
                tableData: [],
                otherData:[],//筛选类型后剩余的数据
            }
        },
        watch:{

        },
        props:{
            selectMes:{},
        },
        mounted: function () {
            
            this.GetGoodsGift(this.selectMes.id)
        },
        methods: {
            async GetGoodsGift(id){
                let res = await GetGoodsGift({activityItemId:id}),arr = []
                res.data.forEach(ele=>{
                    ele.id = ele.giftId,
                    ele.alias = ele.giftGoodsName,
                    this.radio = ele.isShare + ''
                })
                res.data.forEach(ele=>{
                    ele.isShare += ''
                    if(ele.typeId == this.selectMes.typeId){//1商品 2卡券
                        arr.push(ele)
                    }else{
                        this.otherData.push(ele)
                    }
                })
                this.selectData = arr
            },
            async AddGoodsGift(){
                let arr = []
                this.selectData.forEach(ele=>{
                    arr.push({
                        typeId:this.selectMes.typeId,
                        ActivityItemId:this.selectMes.id,
                        giftId:ele.id?ele.id:ele.Id,
                        giftGoodsName:ele.alias,
                        isShare:ele.isShare,
                        createUserId:getCookie('userId'),
                        createBy:getCookie('userName')
                    })
                })
                this.otherData.forEach(ele=>{
                    delete(ele.id)
                })
                let res = await AddGoodsGift({
                    jsonStr:JSON.stringify(arr.concat(this.otherData)),
                    code:this.selectMes.id
                })
                if(res.status){
                    this.$message({  message: '添加成功', type: 'success'});
                    this.$emit('close',true)
                }else{
                    this.$message.error('添加失败'+res.errorMessage);
                }
            },
            selectCheck(selection, row,ope){
                if(row.isShare == undefined){
                    row.isShare = '0'
                    if(row.TickName){
                        row.alias = row.TickName
                    }
                }
                let isIn = false,rowIndex = 0
                this.selectData.forEach((ele,index)=>{
                    if(ele.id == row.id){
                        isIn=true
                        rowIndex = index
                    }
                })
                if(!isIn){
                    this.selectData.push(row)
                }else{
                    if(ope){//如果来自全选选中操作 在selectData中不做删除处理
                    }else{
                        this.selectData.splice(rowIndex,1)
                    }
                }
            },
            selectAll(val){
                if(val.length){//全选
                    val.forEach(ele=>{
                        this.selectCheck('',ele,1)
                    })
                }else{//全部取消
                    this.tableData.forEach(ele=>{
                        this.selectCheck('',ele)
                    })
                }
            },
            toggleSelection(row) {//复选框状态改变
                this.tableData.forEach(ele=>{
                    if(ele.id == row.id){
                        this.$refs.multipleTable.toggleRowSelection(ele);
                    }
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            selectShop(data){
                this.selectData.push(data)
            },
            handleClose(data){
               this.selectData.splice(this.selectData.indexOf(data), 1);
               this.toggleSelection(data)
            },

            async getGoods(data,ope){
                try{
                    let res = await GetGoodsByConditions(data)
                    this.totalPage = res.count
                    this.tableData = res.data
                    this.tabloading = false
                    setTimeout(()=>{
                        this.selectData.forEach(ele=>{
                            this.toggleSelection(ele)
                        })
                    },100)
                }catch(err){
                    console.log(err)
                }
            },

            async getTicketsList(params) {
                this.tabLoading = true
                let res = await getTicketsInfoByPage(params)
                this.tableData = []
                this.tabloading = false
                if (res instanceof Array) {
                    this.tableData = res
                    if(res.length>0){
                    this.totalPage = parseInt(this.tableData[0]["RecordCount"])
                        setTimeout(()=>{
                            this.selectData.forEach(ele=>{
                                this.toggleSelection(ele)
                            })
                        },100)
                    }else{
                        this.dataCount = 0
                    }
                }
            },
            // 条件查询
            onSubmit() {
                this.currentPage = 1
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
           
            search(){
                if(this.selectMes.typeId == 1){
                    this.getGoods({
                        columnCode:'',
                        catalogCode:'',
                        startPrice:'',
                        endPrice:'',
                        supplierCode:getCookie('hospitalCode'),
                        keyWords:this.formInline.keyWords.removeSP(),
                        serviceMan:'',
                        pageSize:this.pageSize,
                        pageIndex:this.currentPage,
                        isEnable:this.formInline.isEnable,
                    })
                }else{
                    this.getTicketsList({
                        pageSize:this.pageSize,
                        pageIndex:this.currentPage,
                        IsEnable:"1",
                        endDate:"",
                        hospitalCodes:"",
                        projCodes:"",
                        startDate:"",
                        tickName:this.formInline.keyWords.removeSP(),
                        tickState:"1",
                        ticketsType:this.formInline.ticketsType,
                    })
                }
                
            },


        },
        components: {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .goodsList {
        font-size: 12px;
    }

    .block {
        float: right;
        padding-bottom: 20px;
    }
    .elCol{
        margin: 10px 0;
    }
</style>
