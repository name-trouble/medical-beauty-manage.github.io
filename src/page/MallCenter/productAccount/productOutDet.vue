<template>
    <div class="MemberManage">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px">
            <el-form-item label="入库日期：" class="form_item_mt10">
                <el-date-picker
                    v-model="date"
                    type="daterange"
                    class="form_item_ipt220"
                    @change="dateSelect"
                    placeholder="选择日期范围">
                </el-date-picker>
            </el-form-item>
            
            <el-form-item label="医院：" class="form_item_mt10">
                 <el-select v-model="formInline.hospital"  class="form_item_ipt220" @change="onSubmit">
                    <el-option v-for="(item,index) in hospitalList" :key="index" :label="item.supplierName" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="关键字：" class="form_item_mt10">
                <el-input v-model="formInline.keywords" placeholder="客户/服务者/产品" class="form_item_ipt220" v-on:keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            <el-form-item label=" " class="form_item_mt10">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
                 <el-button  @click="getdata" class="searchBtn" v-loading="loading">导出数据</el-button>
                <Export :tHeader="tHeader" :filterVal=' filterVal' :tableData1='tableData1' :name='name' ref="export" v-show="false"></Export>

            </el-form-item>
        </el-form>
        <!-- 信息表 -->
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" height="460" >
            <el-table-column prop="orderProductCode" label="单据号" min-width="120"></el-table-column>
            <el-table-column prop="hospitalName" label="医院" min-width="160"></el-table-column>
           <el-table-column prop="customerName" label="客户" min-width="120"></el-table-column>
            <el-table-column prop="nurseName" label="服务者" min-width="120"></el-table-column>
            <el-table-column prop="productName" label="产品名称" min-width="220"></el-table-column>
            <el-table-column prop="narcotization" label="批次" min-width="100"></el-table-column>
            <el-table-column prop="unitName" label="规格" min-width="120"></el-table-column>
            <el-table-column prop="price" label="单价" min-width="120"></el-table-column>
            <el-table-column prop="quantity" label="数量" min-width="120"></el-table-column>
            <el-table-column prop="realAmount" label="金额" min-width="120"></el-table-column>
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
   
    </div>
</template>

<script type="text/ecmascript-6">
    import  "@/style/selfCommon.less"
    import Export from '@/components/export'
    import { getCookie } from "@/config/mUtils";
    import {UserRegister,GetDropDownPermission,GetReservation,getUserById,GetOrderProductEveryDay} from "@/api/myData"
    export default {
        // name:"MemberManage",
        data () {
            return {
                loading:false,
                mes:{},
                total:10,
                size:10,
                currentPage:1,
                hospitalList:[],
                date:"",
                formInline:{
                    doctor:"",
                    date1:"",
                    date2:"",
                    status:"",
                    name:"",
                    phone:"",
                    hospital:'',
                    keywords:""
                },
                tableData:[],
                doctorList:[],
                allData:[],
            }
        },
        computed: {
            /* 导出报表参数 tHeader,filterVal,tableData1*/
            tHeader(){
                return ['日期','单据号', '医院', '客户', '服务者', '产品名称', '批次', '规格','单价','数量','金额']
            },
            filterVal(){
                return ['orderDate', 'orderProductCode', 'hospitalName', 'customerName', 'nurseName','productName','narcotization','unitName','price','quantity','realAmount']
            },
            tableData1(){
                let obj = {
                    orderDate:"合计",
                    orderProductCode:"",
                    hospitalName:"",
                    customerName:"",
                    nurseName:"",
                    productName:"",
                    narcotization:"",
                    unitName:"",
                    price:"",
                    quantity:0,
                    realAmount:0
                }
                this.allData.forEach(row=>{
                    obj.quantity+=row.quantity
                    obj.realAmount+=row.realAmount
                })
                this.allData.push(obj)
                return this.allData
            },
            name(){
                return '产品出库详情'
            },
            /*导出报表参数 tHeader,filterVal,tableData1*/
        },
        filters:{
            filterAddr(val){
                if(val){
                    let addr = val.split(",").join("")
                    return filterAddr
                }else{
                    return ""
                }
            }
        },
        mounted(){
            let date = new Date()
            date.setDate("01")
            this.date = [date,new Date()]
            this.getHospital()
        },
        methods:{
            getSummaries(param) {
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '合计';
                        return;
                    }
                    const values = data.map(item => Number(item[column.property]));
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev.add(curr);;
                        } else {
                            return prev;
                        }
                        }, 0);
                        sums[index];
                    } else {
                        sums[index] = 'N/A';
                    }
                });
                for(var i=1;i<9;i++){
                     sums[i] = ""
                }
               
                return sums;
            },
            getdata(){
                this.loading = true
                this.search(1)
                
            },
            async GetOrderProductEveryDay(params,index){
                let res = await GetOrderProductEveryDay(params)
                 if(index){
                     this.allData = res.data
                     this.loading = false
                     this.$refs["export"].handleDownload()
                 }else{
                     this.total = res.count
                     this.tableData = res.data
                 }
            },
           
            async GetReservation(params){
                let res =await GetReservation(params)
                if(res.status){
                    this.total = res.count
                    this.tableData = res.data
                }else{
                    console.log(res)
                }
            },
            async getHospital(params){
                try {
                    let res1 = await GetDropDownPermission({typeId: 1});
                    this.hospitalList = res1.data
                    this.formInline.hospital = this.hospitalList[0].code
                    this.search()
                } catch (err) {
                    console.log(err)
                }
            },
            onSubmit(){
                this.currentPage = 1
                this.search()
            },
            search(index){
                this.GetOrderProductEveryDay({
                    "typeId": 2,
                    "keywords": this.formInline.keywords.removeSP(),
                    "hospitalId": this.formInline.hospital,
                    startDate:this.formInline.date1,
                    enddate:this.formInline.date2,
                    pageIndex:this.currentPage,
                    pageSize:index?this.total:this.size
                },index)
            },
            dateSelect(val){
                if(val.length!=0){
                    val = val.formatDates()
                    this.formInline.date1 = val.substring(0,10)
                    this.formInline.date2 = val.substring(13)
                }else{
                    this.formInline.date1 = ""
                    this.formInline.date2 = ""
                }
                this.onSubmit()
            },
            
            
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.size = val
                this.search()
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val
                this.search()
            },
        },
        components: {
            Export,
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
