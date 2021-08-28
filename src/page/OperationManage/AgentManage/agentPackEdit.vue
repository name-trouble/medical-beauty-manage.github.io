<template>
    <div class="rechargeList selCommon">
        <el-form :inline="true" :model="form" class="demo-form-inline form_search"  @submit.native.prevent>
            <el-form-item label="消费商：" class="form_item_mt10" label-width="80px">
                <el-autocomplete v-model="customer" :fetch-suggestions="queryCus" placeholder="请输入" :trigger-on-focus="false" @select="selectCus" style="width:260px;float:left;margin-right:5px">
                    <template v-slot="{item}">
                        <my-item-memberB :item="item"></my-item-memberB>
                    </template>
                </el-autocomplete>
            </el-form-item>
            <el-form-item label="" class="form_item_mt10">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
            </el-form-item>
        </el-form>
        <!-- 信息表 -->
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;"
         class="min_table4 smt" max-height="600" v-loading="loading"   @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column type="index" width="60" label="序号" align="center"></el-table-column>
            <el-table-column prop="ConPacName" label="套餐名称" min-width="100"></el-table-column>
            <el-table-column prop="TickInfoCode" label="券种编号" min-width="100"></el-table-column>
            <el-table-column prop="TickName" label="券名称" min-width="120"></el-table-column>
            <el-table-column prop="Price" label="面值" min-width="80"></el-table-column>
            <el-table-column prop="TicNum" label="数量" min-width="80">
                <template slot-scope="scope">
                    <span v-show="scope.row.edit">{{scope.row.TicNum}}</span>
                    <el-input v-model="scope.row.TicNum" v-show="!scope.row.edit"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="UseCount" label="单张使用次数" min-width="80">
                <template slot-scope="scope">
                        <span v-if="scope.row.UseCount">{{scope.row.UseCount}}</span>
                        <span v-else>0</span>
                    </template>
            </el-table-column>
            <el-table-column prop="UsedTimes" label="已用次数" width="150">
                <template slot-scope="scope">
                        <span v-if="scope.row.UsedTimes">
                            {{scope.row.UsedTimes}}
                        </span>
                        <span v-else>0</span>
                        <el-tag v-text="scope.row.UsedTimes?'已使用':'未使用'" :type="scope.row.UsedTimes?'success':'gray'"></el-tag>
                    </template>
            </el-table-column>
            <el-table-column prop="IsUserLimit" label="有效期" min-width="120">
                <template slot-scope="scope">
                    <span v-if="scope.row.PrdOfVal!='' && scope.row.PrdOfVal!=null "> {{ '售后'+ scope.row.PrdOfVal +'天'}}</span>
                    <div v-else>
                        <p>开始：{{ scope.row.StartDate&&scope.row.StartDate.substr(0,10) }}</p>
                        <p>结束：{{ scope.row.EndDate&&scope.row.EndDate.substr(0,10) }}</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" v-show="scope.row.edit" @click="edit(scope.$index,tableData)">编辑</el-button>
                    <el-button type="primary" size="small"  v-show="!scope.row.edit" @click="sure(scope.$index,tableData)">确定</el-button>
                    <el-button type="" size="small"  v-show="!scope.row.edit" @click="cancel(scope.$index,tableData)">取消</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div>
            <el-button @click="add" type="primary">添加卡券</el-button>
            <el-button @click="transfer" type="primary" :disabled="multipleSelection.length == 0">转移套餐</el-button>
        </div>
        <!-- 信息表 -->

        <el-dialog title="卡券添加" :visible.sync="dialogFormVisible" size=''>
            <TickS :branchCode="formLine.code" @close="close" v-if="dialogFormVisible"></TickS>
        </el-dialog>
        <el-dialog title="转移套餐券" :visible.sync="dialogTransfer" size=''>
            <el-form :model="tansForm" ref="tansForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="转移到消费商：" prop="transFerBranchCode" :rules="[{ required: true, message: '请选择'}]">
                    <el-autocomplete v-model="transferMes" :fetch-suggestions="queryCus" placeholder="请输入" :trigger-on-focus="false" @select="selectTrans" style="width:260px;float:left;margin-right:5px">
                        <template v-slot="{item}">
                            <my-item-memberB :item="item"></my-item-memberB>
                        </template>
                    </el-autocomplete>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="transSure('tansForm')">确定</el-button>
                    <el-button @click="dialogTransfer = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import "@/style/selfCommon.less"
    import {GetUserAccount,GetBranchByKeywords,GetUserAccountByCode,GetDropDownPermission,GetBranchByCode,UpdateConsumerPackageOrder,TransferPackage} from "@/api/myData"
    import { getCookie } from '@/config/mUtils'
    import TickS from "./components/packageSet.vue"
    import Vue from 'vue'
     Vue.component('my-item-memberB', {
        functional: true,
        render: function(h, ctx) {
            var item = ctx.props.item;
            return h('div', ctx.data, [
                h('p', null, ['名字：' + item.name]),
                h('p', null, ['编号：' + item.code]),
                h('p', null, ['手机号：' + item.phone]),
                h('p', null, ['推荐人：' + item.referrerName]),
            ]);
        },
        props: {
            item: { type: Object, required: true }
        }
    });
    export default {
        // name:"rechargeList",
        data () {
            return {
                dialogTransfer:false,
                customer:"",
                transferMes:'',
                customerList:[],
                referList: [],
                loading:false,
                dialogFormVisible:false,
                name:"",
                form: {
                    type:"",
                    keyWords: "",
                    hospital:"",
                },
                formLine:{
                    code:"",
                },
                value1:"",
                tableData:[],
                num:0,
                tansForm:{
                    transFerBranchCode:'',
                    transFerBranchName:'',
                },
                multipleSelection:[],
            }
        },
        mounted(){

        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            transSure(formName){

                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.TransferPackage()
                    } else {
                        return false;
                    }
                });
            },
            transfer(){
                this.dialogTransfer = true
            },
            async TransferPackage(){
                let arr = []
                this.multipleSelection.forEach(ele=>{
                    if(arr.indexOf(ele.Id)<0){
                        arr.push(ele.Id)
                    }
                })
                let res = await TransferPackage({
                    branchCodeFrom:this.formLine.code,
                    branchCodeTo:this.tansForm.transFerBranchCode,
                    packageIds:arr.join(","),
                })
                if(res.status){
                    this.$message({message: '转移成功', type: 'success'});
                    this.dialogTransfer = false
                    this.search()
                    this.$refs[formName].resetFields();
                }else{
                    this.$message.error('转移失败');
                }
            },
            getMember(res) {
                // let res = await GetBranchByKeywords({ 'keywords': str.removeSP() })
                if (res instanceof Array && res.length > 0) {
                    for (let item of res) {
                        this.customerList.push({
                            value: '(' + item["Code"] + ')' + item["BranchName"],
                            phone: item["PhoneNumber"],
                            code: item["Code"],
                            name: item["BranchName"],
                            referrerCode: item['ReferrerCode'],
                            referrerName: item['ReferrerName'],
                            // Type:item.Type == 1?"black":"red",
                            // CardNO:item["CardNO"]?item["CardNO"]:""
                        })
                    }
                }
            },

            async UpdateConsumerPackageOrder(params){
                let res = await UpdateConsumerPackageOrder(params)
                if(res.success){
                    this.$message({message: '编辑成功', type: 'success'});
                    this.search()
                }else{
                    this.$message.error('编辑失败');
                }
            },

            //查找会员 下拉补全
            async queryCus(queryString, cb) {
                // queryString=enCode(queryString)
                this.customerList = []
                if (queryString !== '' && queryString != undefined) {
                    let res = await GetBranchByKeywords({ 'keywords': queryString.removeSP() })
                    this.getMember(res)
                }
                this.formLine.memberCode = ''
                this.formLine.memberName = ''
                let _this = this
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    cb(_this.customerList);
                }, 100);
            },

            //点击获取 会员信息  Oject
            selectCus(item) {
                this.formLine.code = item.code
                this.onSubmit()
            },
            // 获取转移代理商信息
            selectTrans(item){

                this.tansForm.transFerBranchCode = item.code
                this.tansForm.transFerBranchName = item.name
            },

            async GetBranchByCode(params){
                try {

                    this.loading = true
                    let res = await GetBranchByCode(params)
                    this.loading = false
                    this.total =  res.CPOList.length
                    res.CPOList.forEach(row=>{
                        row.edit = true
                    })
                    this.tableData = res.CPOList
                } catch (err) {
                    console.log(err)
                }
            },

            onSubmit(){
                this.currentPage = 1
                this.search()
            },
            search(){
                this.multipleSelection = []
                this.GetBranchByCode({
                    branchcode:this.formLine.code,
                })
            },
            save(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            cancel(formName){

            },
            add(){
                this.dialogFormVisible = true
            },
            close(val){
                this.dialogFormVisible = false
                this.search()
            },
            sure(index,data){
                data[index].edit = true
                 this.UpdateConsumerPackageOrder(data[index])
            },
            cancel(index,data){
                 data[index].edit = true
                data[index].TicNum = this.num
                this.tableData.push()
            },
            edit(index,data){
                data[index].edit = false
                this.num = data[index].TicNum
                this.tableData.push()
            }
        },
        components: {
            TickS
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
