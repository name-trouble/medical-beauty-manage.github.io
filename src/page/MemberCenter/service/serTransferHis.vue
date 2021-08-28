<template>
    <div class="selCommon MemberManage">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="85px">
            <el-form-item label="日期：" class="form_item_mt10">
                <el-date-picker
                    v-model="date"
                    type="daterange"
                    class="form_sear_ipt"
                    @change="dateSelect"
                    placeholder="选择日期范围">
                </el-date-picker>
            </el-form-item>
           
            <el-form-item label="医院：" class="form_item_mt10">
                <el-select v-model="formInline.hospital" class="form_sear_ipt" @change="onSubmit">
                    <el-option v-for="(item,index) in hospitalList" :key="index" :label="item.supplierName" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="关键字：" class="form_item_mt10">
                <el-input v-model="formInline.keywords" placeholder="" class="form_sear_ipt"  v-on:keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            <el-form-item label=" " class="form_item_mt10">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
                <el-button type="primary" @click="onSubmit">一键确认</el-button>
                <el-button type="primary" @click="onSubmit">一键撤回</el-button>
                <el-button type="" @click="onSubmit">组织图</el-button>
            </el-form-item>
        </el-form>
        <!-- 信息表 -->
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px" class="smt min_table"  v-loading="loading">
            <el-table-column prop="registDate" width="140" label="日期" >
                <template slot-scope="scope">
                    <span v-if="scope.row.registDate">
                        {{scope.row.registDate.substring(0,10)}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="code" width="140" label="姓名" >
                <template slot-scope="scope">
                    <el-button type="text" @click="det(scope.row)">{{scope.row.code}}</el-button>
                </template>
            </el-table-column>
            
            <el-table-column prop="serviceInfoName" label="变更情况" min-width="180"> </el-table-column>
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

        <el-dialog title="服务商详情" :visible.sync="dialogTableVisibleD" size="" :close-on-click-modal="false" top="20%">
            <det style="width: 800px" v-if="dialogTableVisibleD" :mes="mes"></det>
        </el-dialog>

    </div>
</template>

<script type="text/ecmascript-6">
    import  "../../../style/selfCommon.less"
    import { xmxUrl } from '@/config/env'
    import det from "./com/memberDet"
    import {GetDropDownPermission,GetServiceInfo,GetServiceShop} from "@/api/myData"
    import { getStore } from '@/config/mUtils';
    export default {
        data () {
            return {
                xmxUrl,
                loading:true,
                mes:{},
                dialogTableVisibleD:false,
                total:10,
                size:10,
                currentPage:1,
                hospitalList:[],
                date:"",
                formInline:{
                    date1:"",
                    date2:"",
                    hospital:'',
                    keywords:'',
                },
                tableData:[],
            }
        },
        
        computed: {
           
        },
        
        mounted(){
           this.getHospital()
        },
        methods:{
            async getHospital(params){
                try {
                    let [res1] = await Promise.all([GetDropDownPermission({typeId: 1})])
                    this.hospitalList = res1.data
                    this.formInline.hospital = this.hospitalList[0].code
                    this.search()
                } catch (err) {
                    console.log(err)
                }
            },
//            获取会员
            async GetServiceInfo(params){
                try {
                    let res = await GetServiceInfo(params)
                    this.loading = false
                    this.total = res.count
                    this.tableData = res.data
                } catch (err) {
                    console.log(err)
                }
            },

            onSubmit(){
                this.currentPage = 1
                this.search()
            },
           
            search(){
                this.loading = true
                this.GetServiceInfo({
                    pageIndex:this.currentPage,
                    pageSize:this.size,
                    startDate:this.formInline.date1,
                    endDate:this.formInline.date2,
                    hospitalCode:this.formInline.hospital,
                    "isEnable": '',
                    "isPayOff": '',
                    "keywords": this.formInline.keywords,
                })
            },
            dateSelect(val){
                if(val){
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
                this.size = val
                this.search()
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.search()
            },
            
            det(data){
                this.dialogTableVisibleD = true
                this.mes = data
            },
        },
        components: {
            det,
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
