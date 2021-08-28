<template>
    <div class="tag selCommon">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px">
            <el-form-item label="医院：" class="form_item_mt10">
                <el-select v-model="formInline.hospitalCode"  style='width:200px;' @change="hosChange">
                    <el-option v-for="(item,index) in hospitalList" :key="index" :label="item.supplierName" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="仓库：" class="form_item_mt10">
                <el-select v-model="formInline.wareHouse" style='width:200px;'>
                    <el-option v-for="(item,index) in whList" :key="index" :label="item.warehouseName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            
            <el-form-item label="关键字：" class="form_item_mt10">
                <el-input v-model="formInline.keywords" placeholder="请输入" style="width: 200px;" v-on:keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
             <!-- <el-form-item label="有效期：" class="form_item_mt10">
                <el-date-picker
                    v-model="date"
                    style="width: 200px;"
                    type="daterange"
                    @change="dateChange"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item> -->
            <el-form-item label="前缀：" class="form_item_mt10">
                <el-checkbox v-model="checked" @change="checkC"></el-checkbox>
            </el-form-item>
            <el-form-item label="零库存：" class="form_item_mt10">
                <el-checkbox v-model="formInline.remainNum" @change="onSubmit"></el-checkbox>
            </el-form-item>
            <el-form-item label="" class="form_item_mt10">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
                <Export :tHeader="tHeader" ref="exportTable" :filterVal=' filterVal' :tableData1='tableData1' :name='name' ></Export>
            </el-form-item>
        </el-form>
        <!-- 信息表 -->
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" max-height="560"  class="smt min_table" 
        v-loading="loading" show-summary  :summary-method="getSummaries">
            <el-table-column prop="warehouseName" label="仓库" min-width="90"></el-table-column>
            <el-table-column prop="ticketName" label="卡券名称" min-width="90"></el-table-column>
            <el-table-column prop="ticketPrefixCode" label="前缀" min-width="90" align="center"></el-table-column>
            <el-table-column prop="numCount" label="流水号位数" min-width="90" align="center"></el-table-column>
            <el-table-column prop="salePrice" label="价格" min-width="90" align="center"></el-table-column>
            <el-table-column prop="quantityIn" label="入库总数" min-width="90" align="right">
                <template slot-scope="scope">
                    <el-button type="text" @click="showNumDet(scope.row,1,'入库')">{{scope.row.quantityIn}}</el-button>
                </template>
            </el-table-column>
            
            <el-table-column prop="quantityOut" label="出库总数" min-width="90" align="right">
                <template slot-scope="scope">
                    <el-button type="text" @click="showNumDet(scope.row,2,'出库')">{{scope.row.quantityOut}}</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="remainingCount" label="库存数量" min-width="90" align="right">
                <template slot-scope="scope">
                    <el-button type="text" @click="showReaminDet(scope.row,'库存')">{{scope.row.remainingCount}}</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="remainAmount" label="库存金额" min-width="90" align="right"></el-table-column>
            
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

        <el-dialog :title="title+'详情'" :visible.sync="inOutDet" size="">
            <el-table :data="detData" border style="width: 1000px;margin-top:15px;margin-bottom:10px;" height="460" v-loading="detLoading" show-summary>
                <el-table-column prop="drugOutCode" :label="title+'编号'" min-width="90">
                    <template slot-scope="scope">
                        <span v-text="scope.row.ticketInCode?scope.row.ticketInCode:scope.row.ticketOutCode"></span>
                    </template>
                </el-table-column>
                <el-table-column prop="drugInType" :label="title+'日期'" min-width="90">
                    <template slot-scope="scope">
                        <span v-text="scope.row.ticketInDate?scope.row.ticketInDate.substring(0,10):scope.row.ticketOutDate.substring(0,10)"></span>
                    </template>
                </el-table-column>
                <el-table-column prop="drugInType" :label="title+'方式'" min-width="90">
                    <template slot-scope="scope">
                        <span v-text="scope.row.ticketInType?scope.row.ticketInType:scope.row.ticketOutType"></span>
                    </template>
                </el-table-column>
                <el-table-column prop="warehouseName" label="仓库" min-width="90">
                    <template slot-scope="scope">
                        <span v-text="scope.row.warehouseName?scope.row.warehouseName:scope.row.warehouseName"></span>
                    </template>
                </el-table-column>
                <el-table-column prop="ticketName" label="卡券名称" min-width="150"></el-table-column>
                <el-table-column prop="ticketPrefixCode" label="前缀" min-width="90"></el-table-column>
                <el-table-column prop="ticketName" label="流水号位数" min-width="90">
                    <template slot-scope="scope">
                        <span>{{scope.row.numCount}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="ticketName" label="价格" min-width="90" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.salePrice}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="quantity" label="数量" min-width="90" align="right"></el-table-column>
                <el-table-column prop="ticketName" label="操作" min-width="90">
                    <template slot-scope="scope">
                        <el-button @click="viewTickets(scope.row)" type="primary" >查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <el-dialog :title="title+'卡券详情'" :visible.sync="ticketsDet" size="">
            <Export :tHeader="tHeader" ref="exportTable" :filterVal=' filterVal' :tableData1='tableData1' :name='name' ></Export>
            <div style="width: 820px;min-height:250px;max-height:600px;overflow:auto" v-if="ticketsDet">
                <el-tag v-for="tag in dynamicTags" :key="tag.code"  class="tag" type="success" >{{tag.code}} </el-tag>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import {baseImgPath} from "@/config/env"
    import  "@/style/selfCommon.less"
    import { getCookie, delCookie } from '@/config/mUtils'
    import {GetDropDownPermission,GetWarehouse,GetStockTicket,GetTicketInOutRecord,GetTicketInDetail,GetTicketOutDetail,GetRemainTicketCode} from "@/api/myData"
    import Export from '@/components/export'
    export default {
        data () {
            return {
                date:"",
                editMes:[],
                loading:false,
                detLoading:false,
                ticketsDet:false,
                title:"",
                inOutDet:false,
                total:0,
                size:10,
                currentPage:1,
                checked:false,
                formInline: {
                    startDate:"",
                    endDate:"",
                    keywords: '',
                    typeCode:'',
                    hospitalCode:"",
                    wareHouse:"",
                    IsEnable:"",
                    rangeDetailInJson:false,
                    batchNumber:false,
                },
                allData:[],
                tableData:[],
                hospitalList:[],
                supplierList:[],
                whList:[],
                allWhList:[],
                detData:[],
                sum:{
                    quantityIn:"",
                    quantityOut:'',
                    remainCount:'',
                },
                dynamicTags:[],
            }
        },
        computed: {
            /* 导出报表参数 tHeader,filterVal,tableData1*/
            tHeader(){
                if(this.ticketsDet){
                    return ['卡号']
                }else{
                    return ['仓库', '卡券名称', '前缀', '入库总数', '出库总数', '库存数量']
                }
            },
            filterVal(){
                if(this.ticketsDet){
                    return ['code']
                }else{
                    return ['warehouseName', 'ticketName', 'ticketPrefixCode', 'quantityIn','quantityOut','remainingCount']
                }
            },
            tableData1(){
                if(this.ticketsDet){
                    
                    return this.dynamicTags
                }else{
                    return this.allData
                }
            },
            name(){
                if(this.ticketsDet){
                   return '剩余库存'
                }else{
                    return '卡券库存'
                }
            },
            /*导出报表参数 tHeader,filterVal,tableData1*/
        },
        mounted(){
            this.date = [new Date(),new Date()]
            this.GetDropDownPermission()
        },
        methods:{
            hosChange(val){
                this.whList = []
                this.formInline.wareHouse = ''
                this.allWhList.forEach(ele=>{
                    if(ele.hospitalCode == val){
                        this.whList.push(ele)
                    }
                })
            },
            async showReaminDet(data,title){
                this.title = title
                this.dynamicTags = []
                this.ticketsDet = true
                let res = await GetRemainTicketCode({
                    TicketId:data.ticketId,
                    // BatchNumber:data.batchNumber,
                    TicketCodePre:data.ticketPrefixCode,
                    numcount:data.numCount,
                    warehouseId:data.warehouseId,
                })
                res.data.forEach(ele=>{
                    this.dynamicTags.push({code:ele.ticketCode})
                }) 
            },
            async viewTickets(data){
                this.ticketsDet = true
                this.dynamicTags = []
                let arr = data.ticketCodes?data.ticketCodes.split(","):[]
                
                arr.forEach(row=>{
                    this.dynamicTags.push({code:row})
                })
                // let res
                // if(this.title == '入库'){
                //     res = await GetTicketInDetail({id:data.ticketInId})//退券入库和报增入库取值不同  需判断
                    
                //     res.dynamicTags = res.data.stockTicketDetailList.length>0?res.data.stockTicketDetailList:res.data.stockTicketInDetailList
                // }else{
                //     res = await GetTicketOutDetail({id:data.ticketOutId})
                //     res.dynamicTags = res.data.stockTicketDetailList
                // }
                
                // // 过滤数据
                // let dynamicTags = res.dynamicTags.filter(ele=>{//返回数据为一批共同录入的集合，需要筛选出当前id的券
                //     if(data.ticketId == ele.ticketId){ return ele}
                // })
                // if(dynamicTags[0].ticketCodes){
                //     this.dynamicTags = dynamicTags[0].ticketCodes.split(",")
                // }else{
                //     dynamicTags.forEach(ele=>{
                //         this.dynamicTags.push(ele.ticketCode)
                //     })
                // }
            },

            getSummaries(param) {
                let arr = ['总合计'],len = this.checked?4:4
                for(let i = 0;i<len;i++){
                    arr.push("")
                }
                return arr.concat([Math.round(this.sum.quantityIn).toQFW(),Math.round(this.sum.quantityOut).toQFW(),
                Math.round(this.sum.remainCount).toQFW(),Math.round(this.sum.remainAmount).toQFW()])
            },
            async GetDropDownPermission(){
                let res1 = await GetDropDownPermission({typeId: 1});
                this.hospitalList = res1.data
                let whList = await GetWarehouse({
                    "hospitalCode": "",
                    pageIndex:1,
                    pageSize:100,
                    keywords:"",
                    typeId:2//药房
                })
                this.allWhList = whList.data
                this.formInline.hospitalCode = this.hospitalList[0].code
            },
            async GetStockTicket(params,ope){
                try{
                    this.loading = true
                    let res = await GetStockTicket(params)
                    this.allData = res.data
                    this.total = res.count
                    this.loading = false
                    this.getTotal()
                }catch(err){
                    console.log(err)
                }
            },
            
            onSubmit(){
                this.currentPage = 1
                this.search()
            },
            search(){
                this.sum = {
                    quantityIn:0,
                    quantityOut:0,
                    remainCount:0,
                    remainAmount:0
                }
                this.GetStockTicket({
                    pageIndex:this.currentPage,
                    pageSize:this.size,
                    keywords:this.formInline.keywords.removeSP(),
                    warehouseId:this.formInline.wareHouse,
                    hospitalCode:this.formInline.hospitalCode,
                    IsShowBatch:this.checked?1:0,
                    IsShowZero:this.formInline.remainNum?1:0,
                })

            },
            handleSizeChange(val) {
                this.size = val
                this.pageChange()
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.pageChange()
            },
            checkC(val){
                this.search()
            },
            showNumDet(data,type,title){
                this.title = title
                this.inOutDet = true
                this.detLoading = true
                this.GetTicketInOutRecord({
                    TypeId:type,//1入库 2 出库
                    WarehouseId:data.warehouseId,
                    // BatchNumber:data.batchNumber,
                    TicketId:data.ticketId,
                    Keywords:"",
                    ticketPrefixCode:data.ticketPrefixCode,
                    numCount:data.numCount
                })
            },
            async GetTicketInOutRecord(params){
                let res = await GetTicketInOutRecord(params)
                this.detData = res.data
                this.detLoading = false
            },
            pageChange(data){
                this.tableData = this.allData.slice((this.currentPage-1)*this.size,this.currentPage*this.size)
            },
            getTotal(){
                this.allData.forEach(row=>{
                    
                    row.remainAmount = row.remainingCount.mul(row.salePrice)
                    this.sum.quantityIn = row.quantityIn.add( this.sum.quantityIn)
                    this.sum.quantityOut = row.quantityOut.add( this.sum.quantityOut)
                    this.sum.remainCount = row.remainingCount.add( this.sum.remainCount)
                    this.sum.remainAmount += row.remainingCount.mul(row.salePrice)
               })
               this.pageChange()
            },
        },
        components: {
            Export,
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tag{
    margin: 5px;
}
</style>
