
<template>
    <div class="tag selCommon">
        <el-form :inline="true"  class="demo-form-inline form_search" label-width="80px">
            <!-- <el-form-item label="截止日期：" class="form_item_mt10">
                    <el-date-picker
                        v-model="date"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
            </el-form-item>
            <el-form-item label="医院：" class="form_item_mt10">
                <el-select v-model="hospitalCode"  style='width:200px;' @change="onSubmit" >
                    <el-option v-for="(item,index) in hospitalList" :key="index" :label="item.supplierName" :value="item.code"></el-option>
                </el-select>
            </el-form-item> -->
            <!-- <el-form-item label="关键字：" class="form_item_mt10">
                <el-input v-model="keywords" placeholder=""></el-input>
            </el-form-item> -->
            <el-form-item label="消费商：" class="form_item_mt10">
                    <el-autocomplete v-model="branch" :fetch-suggestions="queryCus" placeholder="请输入内容" :trigger-on-focus="false" @select="selectCus" style="width:250px;">
                        <template v-slot="{item}">
                            <my-item-extraMember :item="item"></my-item-extraMember>
                        </template>
                    </el-autocomplete>
                </el-form-item>
            <el-form-item label=" " class="form_item_mt10">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
            </el-form-item>
        </el-form>
         <el-table  :data="tableData" border style="width: 100%;margin-top:20px" max-height="560" class="min_table" v-loading="loading" >
            <el-table-column prop="payDate" label="日期" min-width="80" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.payDate">{{scope.row.payDate.substring(0,10)}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="branchName" label="消费商" min-width="80"></el-table-column>
            <el-table-column prop="payTypeName" label="支付方式" min-width="80"></el-table-column>
            <el-table-column prop="realAmount" label="支付金额" min-width="80"></el-table-column>
            <el-table-column prop="receiveBranchName" label="销售公司" min-width="90" ></el-table-column>
            <el-table-column prop="receiveAccount" label="收款账户" min-width="80"></el-table-column>
            <el-table-column prop="memo" label="备注" min-width="150" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="customerName" label="操作" min-width="80">
                <template slot-scope="scope">
                    <el-button @click="upDate(scope.row)" size="small" type="primary">编辑</el-button>
                    <el-button @click="del(scope.row)" size="small" type="primary">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
        <el-dialog title="编辑" :visible.sync="dialogView"  top="10%"  size="" :close-on-click-modal="false">
            <updateDialog :editMes="editMes" @close='editClose' style="width: 450px" v-if="dialogView"></updateDialog>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import  "@/style/selfCommon.less"
    import updateDialog from "./com/updateExtra"
    import { getCookie, delCookie } from '@/config/mUtils'
    import {GetBranchOrderPayExt, DeleteBranchOrderPayExt, UpdateBranchOrderPayExt,GetBranchByKeywords} from "@/api/myData"
    import Vue from "vue"
    Vue.component('my-item-extraMember', {
        functional: true,
        render: function(h, ctx) {
            var item = ctx.props.item;
            return h('div', ctx.data, [
                h('p', { attrs: { class: 'select_name'+item.Type, title: item.name } }, ['名字：' + item.name]),
                h('p', { attrs: { class: 'select_name'+item.Type, title: item.name} }, ['编号：' + item.code]),
                h('p', { attrs: { class: 'select_name'+item.Type, title: item.name} }, ['手机号：' + item.phone]),
            ]);
        },
        props: {
            item: { type: Object, required: true }
        }
    });
    export default {
        // name: "VideoManage",
        data () {
            return {
                dialogView:false,
                allLoading:false,
                loading:false,
                date:new Date(),
                currentPage:1,
                total:0,
                pageSize:10,
                branch:'',
                formInline:{
                    BranchCode:'',
                },
                tableData:[],
                customerList:[],
                editMes:{},
            }
        },
        computed:{

        },

        mounted(){
            this.onSubmit()
        },
        methods:{
            //查找会员 下拉补全
            queryCus(queryString, cb) {
                this.customerList = []
                this.formInline.BranchCode = ""
                if (queryString !== '' && queryString != undefined) {
                    this.getBranchByKeywords({ 'keywords': queryString.removeSP() })
                }

                let _this = this
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    cb(_this.customerList);
                }, 1000);
            },
            selectCus(item) {
                this.formInline.BranchCode = item.code? item.code:""
            },

            //            搜索代理
            async getBranchByKeywords(params){
                try {
                    let res = await GetBranchByKeywords(params)
                    if (res instanceof Array && res.length > 0) {
                    for (let item of res) {
                         let tagName = ""
                        if(item["BranchTags"] != ''&&item["BranchTags"] != null&&item["BranchTags"] != undefined){
                            tagName = '('+item["BranchTags"]+')'
                        }
                        this.customerList.push({
                            value: item["BranchName"]+tagName,
                            phone: item["PhoneNumber"],
                            code: item["Code"],
                            name: item["BranchName"]+tagName,
                            hospitalCode: item['HospitalCode'],
                            hospitalName: item['HospitalName'],
                        })
                    }
                }
                    this.loading1 = false
                } catch (err) {
                    console.log(err)
                }
            },

            handleSizeChange(val) {
                this.pageSize = val
                this.search()
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.search()
            },

            async GetBranchOrderPayExt(params) {
                let res = await GetBranchOrderPayExt(params)
                if(res.status){
                    this.total = res.count
                    this.tableData = res.data
                }
            },

            onSubmit(){
                this.currentPage = 1
                this.search()
            },
            search(){
                this.GetBranchOrderPayExt({
                    BranchCode:this.formInline.BranchCode,
                    pageIndex:this.currentPage,
                    pageSize:this.pageSize,
                })
            },
            editClose(val){
                this.dialogView = false
                if(val){
                    this.search()
                }
            },
            upDate(data){
                this.editMes = JSON.parse(JSON.stringify(data))
                this.dialogView = true
            },
            del(data){
                this.$confirm('是否确定删除该数据?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.DeleteBranchOrderPayExt({id:data.id})
                })
            },

            async DeleteBranchOrderPayExt(params){
                let res = await DeleteBranchOrderPayExt(params)
                if(res.status){
                     this.$message({ type: 'success', message: '删除成功' })
                     this.search()
                }else{
                     this.$message({ type: 'warning', message: '删除失败!'+res.errorMessage })
                }
            },

        },
        components: {
            updateDialog
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
