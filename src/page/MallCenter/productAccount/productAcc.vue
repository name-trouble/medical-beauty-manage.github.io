<template>
    <div class="MemberManage">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px">
            <el-form-item label="日期：" class="form_item_mt10">
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
            <el-form-item label="产品名称：" class="form_item_mt10">
                <el-input v-model="formInline.name" placeholder="" class="form_item_ipt220" v-on:keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            <el-form-item label=" " class="form_item_mt10">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
            </el-form-item>
        </el-form>
        <!-- 信息表 -->
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" height="460" >
            <!-- <el-table-column prop="orderDate" width="120" label="日期" >
                <template slot-scope="scope">
                    <span v-if="scope.row.orderDate">
                        {{scope.row.orderDate.substring(0,10)}}
                    </span>
                </template>
            </el-table-column> -->
            <el-table-column prop="hospitalName" label="医院" min-width="120"></el-table-column>
            <el-table-column prop="productName" label="产品名称" min-width="120"></el-table-column>
           <el-table-column prop="designerAssistName" label="批次" min-width="120"></el-table-column>
            <el-table-column prop="unitName" label="规格" min-width="120"></el-table-column>
            <el-table-column prop="price" label="单价" min-width="220"></el-table-column>
            <el-table-column prop="quantity" label="数量" min-width="80"></el-table-column>
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
    import { getCookie } from "@/config/mUtils";
    import {UserRegister,GetDropDownPermission,GetReservation,getUserById,GetOrderProductEveryDay} from "@/api/myData"
    export default {
        // name:"MemberManage",
        data () {
            return {
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
                doctorList:[]
            }
        },
        // computed: {
        //     /* 导出报表参数 tHeader,filterVal,tableData1*/
        //     tHeader(){
        //         return ['会员编号','注册日期', '会员', '手机号', '身份证号', '生日', '性别', '推荐人','推荐人等级','医院','认证状态']
        //     },
        //     filterVal(){
        //         return ['Code', 'CreateOn', 'MemberName', 'PhoneNumber', 'IDCard','Birthday','Sex','ReferrerName','grade','grade','IsAuth']
        //     },
        //     tableData1(){
        //         return this.tableData
        //     },
        //     name(){
        //         return '预约管理'
        //     },
        //     /*导出报表参数 tHeader,filterVal,tableData1*/
        // },
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
            async GetOrderProductEveryDay(params){
                let res = await GetOrderProductEveryDay(params)
                this.total = res.count
                this.tableData = res.data
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
            search(){
            
                this.GetOrderProductEveryDay({
                    "typeId": 1,
                    "keywords": this.formInline.name.removeSP(),
                    "hospitalId": this.formInline.hospital,
                    startDate:this.formInline.date1,
                    enddate:this.formInline.date2,
                    pageIndex:this.currentPage,
                    pageSize:this.size
                })
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
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
