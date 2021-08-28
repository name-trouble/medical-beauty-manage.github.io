<template>
    <div class="royaltyAllocate selCommon">
        <el-form :inline="true" class="form_search" label-width="80px">
            <el-form-item label="总代理：">
                <el-select v-model="search" @change="submit">
                    <el-option value="全部" label=""></el-option>
                    <el-option v-for="(item,index) in setTopList" :key="index" :value="item.BranchCode" :label="item.BranchName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="医院：">
                <el-select v-model="search_hos" @change="submit">
                    <el-option value="全部" label=""></el-option>
                    <el-option v-for="(item,index) in hospital" :key="index" :value="item.SupplierName+'|'+item.Code" :label="item.SupplierName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="" label-width="20px">
                <el-button type="primary" @click="submit">搜索</el-button>
            </el-form-item>
        </el-form>
        <div class="table_container">
            <el-table ref="multipleTable" :data="ticketData" max-height="450" border style="width: 100%">
                <el-table-column type="index" width="70"></el-table-column>
                <el-table-column prop="BranchName" label="总代" min-width="100">
                    <template slot-scope="scope">
                        <span v-if="scope.row.BranchCode">{{scope.row.BranchCode}}</span>
                        <span v-if="scope.row.BranchName">[{{scope.row.BranchName}}]</span>
                    </template>
                </el-table-column>
                <el-table-column prop="ConsumeTypeName" label="提成类型" min-width="100"></el-table-column>
                <el-table-column prop="ShareCount" label="分成人数" min-width="100"></el-table-column>
                <el-table-column prop="Rate1" label="比例1" min-width="100">
                    <template slot-scope="scope">
                        <span v-if="scope.row.Rate1||scope.row.Rate1=='0'">{{scope.row.Rate1.mul(100)}}%</span>
                    </template>
                </el-table-column>
                <el-table-column prop="Rate2" label="比例2" min-width="100">
                    <template slot-scope="scope">
                        <span v-if="scope.row.Rate2||scope.row.Rate2=='0'">{{scope.row.Rate2.mul(100)}}%</span>
                    </template>
                </el-table-column>
                <el-table-column prop="Rate3" label="比例3" min-width="100">
                    <template slot-scope="scope">
                        <span v-if="scope.row.Rate3||scope.row.Rate3=='0'">{{scope.row.Rate3.mul(100)}}%</span>
                    </template>
                </el-table-column>
                <el-table-column prop="Rate4" label="比例4" min-width="100">
                    <template slot-scope="scope">
                        <span v-if="scope.row.Rate4||scope.row.Rate4=='0'">{{scope.row.Rate4.mul(100)}}%</span>
                    </template>
                </el-table-column>
                <el-table-column prop="Rate5" label="比例5" min-width="100">
                    <template slot-scope="scope">
                        <span v-if="scope.row.Rate5||scope.row.Rate5=='0'">{{scope.row.Rate5.mul(100)}}%</span>
                    </template>
                </el-table-column>
                <el-table-column prop="Rate6" label="比例6" min-width="100">
                    <template slot-scope="scope">
                        <span v-if="scope.row.Rate6||scope.row.Rate6=='0'">{{scope.row.Rate6.mul(100)}}%</span>
                    </template>
                </el-table-column>
                <el-table-column prop="Rate7" label="比例7" min-width="100">
                    <template slot-scope="scope">
                        <span v-if="scope.row.Rate7||scope.row.Rate7=='0'">{{scope.row.Rate7.mul(100)}}%</span>
                    </template>
                </el-table-column>
                <el-table-column prop="CompanyRate" label="分公司比例" min-width="100">
                    <template slot-scope="scope">
                        <span v-if="scope.row.CompanyRate||scope.row.CompanyRate=='0'">{{scope.row.CompanyRate.mul(100)}}%</span>
                    </template>
                </el-table-column>
                <el-table-column prop="HospitalRate" label="医院比例" min-width="100">
                    <template slot-scope="scope">
                        <span v-if="scope.row.HospitalRate||scope.row.HospitalRate=='0'">{{scope.row.HospitalRate.mul(100)}}%</span>
                    </template>
                </el-table-column>
                <el-table-column prop="HospitalLevel" label="医院分配" min-width="100">
                   <!-- <template slot-scope="scope">
                        <span v-if="scope.row.HospitalRate||scope.row.HospitalRate=='0'">{{scope.row.HospitalRate.mul(100)}}%</span>
                    </template>-->
                </el-table-column>
                <el-table-column prop="" label="操作" min-width="170">
                    <template slot-scope="scope">
                        <el-button @click="edit(scope.$index,ticketData)" size="small" type="primary" icon="edit">编辑</el-button>
                        <el-button @click="deleteRow(scope.$index,ticketData)" size="small" icon="delete">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button @click="add" type="primary">添加</el-button>
        </div>
        <el-dialog :title="title" :visible.sync="dialogFormVisible" size="">
            <el-form v-if="dialogFormVisible" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
                <el-form-item label="总代理：" prop="branch" class="form_item_mt10">
                    <el-select v-model="ruleForm.branch" class="form_item" filterable >
                        <el-option label="默认" value="0|默认"></el-option>
                        <el-option v-for="(item,index) in topBranchList" :key="index" :label="item.BranchName" :value="item.Code+'|'+item.BranchName"></el-option>
                    </el-select>
                </el-form-item>
               <!-- <el-form-item label="医院：" prop="branch" class="form_item_mt10">
                    <el-select v-model="ruleForm.hospital" disabled="true" class="form_item" filterable >
                        <el-option v-for="(item,index) in topBranchList" :key="index" :label="item.Code+'|'+item.BranchName" :value="item.Code+'|'+item.BranchName"></el-option>
                    </el-select>
                </el-form-item>-->
                <el-form-item label="提成类型：" prop="num" class="form_item_mt10">
                    <el-select v-model="ruleForm.type" class="form_item">
                        <el-option v-for="item in consumeList" :label="item.DataName" :value="item.DataCode" :key="item.DataCode"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="提成分配人数：" prop="num" class="form_item_mt10">
                    <el-select v-model="ruleForm.num" @change="numChange"  class="form_item">
                        <el-option label="1" value="1"></el-option>
                        <el-option label="2" value="2"></el-option>
                        <el-option label="3" value="3"></el-option>
                        <el-option label="4" value="4"></el-option>
                        <el-option label="5" value="5"></el-option>
                        <el-option label="6" value="6"></el-option>
                        <el-option label="7" value="7"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="提成分配比率：" prop="num" class="form_item_mt10">
                    <span v-for="(item,index) in rateList" :key="index">
                         <el-input v-model.Number="item.rate" class="form_item" @change="numCheck(item.rate,index)" style="margin: 5px 5px 0 0">
                             <template slot="append">%</template>
                         </el-input>
                    </span>
                </el-form-item>
                <el-form-item label="总代是否提成：" prop="num" class="form_item_mt10">
                    <el-checkbox v-model="ruleForm.check"></el-checkbox>
                </el-form-item>
                <el-form-item label="分公司等级：" prop="num" class="form_item_mt10">
                    <el-input v-model="ruleForm.comGrade" class="form_item"></el-input>
                </el-form-item>
                <el-form-item label="分公司提成比率：" prop="num" class="form_item_mt10">
                    <el-input v-model="ruleForm.compRate" class="form_item"> <template slot="append">%</template></el-input>
                </el-form-item>
                <el-form-item label="医院提成比率：" prop="num" class="form_item_mt10">
                    <el-input v-model="ruleForm.hospitalRate" class="form_item"> <template slot="append">%</template></el-input>
                </el-form-item>
                <el-form-item label="医院分配：" prop="num" class="form_item_mt10">
                    <el-select v-model="ruleForm.HospitalLevel" multiple placeholder="请选择">
                        <el-option
                            class="form_item"
                            v-for="(item,index) in rateList"
                            :key="index"
                            :label="index+1+'级'"
                            :value="index">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div class="el-dialog__footer ">
                <el-button @click="sure('ruleForm')" type="primary">确定</el-button>
                <el-button @click="cancel('ruleForm')">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import "@/style/selfCommon.less"
    import { getCookie, delCookie } from '@/config/mUtils'
    import {getTopBranch,AddExpendSet,GetExpendSetByCode,getBaseDataByCode,GetNameExpendSet,UpdateExpendSet,DeleteExpendSet,GetSupplierBySupTypeCode} from "@/api/myData"
    export default {
        // name:"royaltyAllocate",
        data () {
            return {
                title:"",
                search:"",
                search_hos:"",
                dialogFormVisible:false,
                consumeList:[],
                ticketData:[],
                labelPosition: 'right',
                formLabelAlign: {},
                setTopList:[],
                hospital:[],
                ruleForm:{
                    branch:"",
                    num:1,
                    check:false,
                    rate:"",
                    comGrade:"",
                    compRate:"",
                    type:"",
                    hospitalRate:"",
                    HospitalLevel:[],
                },
                ope:"",
                rateList:[{rate:""}],
                topBranchList:[],
                rules: {
                    name: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                    ],
                    region: [
                        { required: true, message: '请选择活动区域', trigger: 'change' }
                    ],
                    date1: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    type: [
                        { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                    ],
                }
            }
        },
        watch: {
            "ruleForm.check": {
                handler(curVal, oldVal){
                    if(curVal.length == false){
                      this.ruleForm.rate = ""
                    }
                },
                deep: true
            }
        },
        computed:{
        
        },
        mounted(){
            this.getTopBranch()
        },
        methods: {
//            添加
            async AddExpendSet(params){
                try{
                    let res = await AddExpendSet(params)
                    if (res.success) {
                        this.$message({message: '添加成功', type: 'success'});
                        this.$refs['ruleForm'].resetFields();
                        this.rateList = [{}]
                        this.dialogFormVisible = false
                        this.GetExpendSetByCode()
                        this.reset()
                    } else {
                        this.$message.error('添加失败');
                    }
                }catch(err){
                    console.log(err)
                    this.$message.error('添加失败');
                }
            },
            async UpdateExpendSet(params){
                try{
                    let res = await UpdateExpendSet(params)
                    if (res.success) {
                        this.$message({message: '编辑成功', type: 'success'});
                        this.$refs['ruleForm'].resetFields();
                        this.rateList = [{}]
                        this.dialogFormVisible = false
                        this.GetExpendSetByCode()
                    } else {
                        this.$message.error('编辑失败');
                    }
                }catch(err){
                    console.log(err)
                    this.$message.error('编辑失败');
                }
            },
            async DeleteExpendSet(params){
                try{
                    let res = await DeleteExpendSet(params)
                    if (res.success) {
                        this.$message({message: '删除成功', type: 'success'});
                        this.GetExpendSetByCode()
                    } else {
                        this.$message.error('删除失败');
                    }
                }catch(err){
                    console.log(err)
                    this.$message.error('删除失败');
                }
            },
//            获取列表
            async GetExpendSetByCode(){
                try {
                     let res = await  GetExpendSetByCode({BranchCode:this.search})
                    this.ticketData = this.dealType(res)
                } catch (err) {
                    console.log(err)
                }
            },
//            获取总代
            async getTopBranch(){
                try {
                    this.topBranchList = await getTopBranch()
                    this.consumeList = await getBaseDataByCode("0017")
                    this.setTopList = await GetNameExpendSet()
                    this.hospital = await GetSupplierBySupTypeCode({SupTypeCode: "001"});
                    this.dealData( this.consumeList)
                    this.GetExpendSetByCode()
                }catch(err){
                    console.log(err)
                    this.$message.error('获取信息失败');
                }
            },
            numCheck(data,index){
                if(index||index == 0){
                    let vm = this
                    setTimeout(()=>{
                        
                        if(!isNaN(Number(data))){
                            vm.rateList[index].rate = data
                        }else{
                            this.$message.error('请输入数字');
                        }
                    },100)
                    this.rateList.push()
                }else{
                    
                  /*  this.ruleForm.rate = data.replace(/\D/g, '').replace(/^0/g, '')*/
                    let a = data.replace(/\D/g, '')
                    this.$set(this.ruleForm,'rate',Number(a))
                }

            },
            edit(index,data){
                
                this.title = "编辑"
                let a = JSON.parse(JSON.stringify(data[index]))
                this.copyWorth(a)
                this.ope = "edit"
                this.dialogFormVisible = true
            },
            sure(name){
                let rates = this.dealRate()
                
                let obj = {
                    branchCode:this.ruleForm.branch.split("|")[0],
                    consumeTypeId:this.ruleForm.type,
                    shareCount:this.ruleForm.num,
                    rate1:this.getRate(rates[0]),
                    rate2:this.getRate(rates[1]),
                    rate3:this.getRate(rates[2]),
                    rate4:this.getRate(rates[3]),
                    rate5:this.getRate(rates[4]),
                    rate6:this.getRate(rates[5]),
                    rate7:this.getRate(rates[6]),
                    companyGradeNum:this.ruleForm.comGrade,
                    companyRate:Number(this.ruleForm.compRate).div(100),
                    createUserId:getCookie("userId"),
                    createBy:getCookie("userName"),
                    branchName:this.ruleForm.branch.split("|")[1],
                    isAllocation:this.ruleForm.check,
                    hospitalRate:Number(this.ruleForm.hospitalRate).div(100),
                    HospitalLevel:this.ruleForm.HospitalLevel.join(",")
                }
                
                if(this.ope == "add"){
                    this.AddExpendSet(obj)
                }else{
                    obj.id = this.ruleForm.Id
                    this.UpdateExpendSet(obj)
                }
            },
            getRate(num){
                
                if(! isNaN(Number(num))){
                    return num
                }else{
                    return ""
                }
            },
            cancel(name){
                this.$refs[name].resetFields();
                this.rateList = [{}]
                this.dialogFormVisible = false
                this.reset()
            },
            deleteRow(index,data){
                this.DeleteExpendSet({
                    id:data[index].Id
                })
            },
            numChange(){
                
                let len = Number(this.ruleForm.num)
                this.rateList=[]
                for(let i = 0;i<len;i++){
                    this.rateList.push({
                        rate:"",
                    })
                }
            },
            add(){
                this.reset()
                this.title = "添加"
                this.ope = "add"
                this.dialogFormVisible = true
            },
            dealData(data){
                
                let arr = []
                this.consumeList.forEach(row=>{
                    if(row.DataCode != '6'){
                        arr.push(row)
                    }
                })
                this.consumeList = arr
            },
            dealRate(){
                let arr = []
                this.rateList.forEach(row=>{
                    arr.push(Number(row.rate).div(100))
                })
                return arr
            },
            submit(){
                this.GetExpendSetByCode({BranchCode:this.search})
            },
            dealType(data){
                data.forEach(row=>{
                    
                    for(let i = 0;i<this.consumeList.length;i++){
                        if(row.ConsumeTypeId == this.consumeList[i].DataCode){
                            row.ConsumeTypeName= this.consumeList[i].DataName
                        }
                    }
                })
                return data
            },
            copyWorth(data){
                
                for(var p in data){
                    if( data[p] == null){
                        data[p] = ""
                    }
                }
                this.ruleForm.Id = data.Id
                this.ruleForm.branch = data.BranchCode+ "|"+data.BranchName
                this.ruleForm.type = data.ConsumeTypeId+""
                this.ruleForm.num = data.ShareCount
                this.rateList = this.getRateList(data.Rate1,data.Rate2,data.Rate3,data.Rate4,data.Rate5,data.Rate6,data.Rate7)
                this.ruleForm.type = data.ConsumeTypeId+""
                this.ruleForm.comGrade= data.CompanyGradeNum+""
                this.ruleForm.compRate =Number(data.CompanyRate).mul(100)
                this.ruleForm.hospitalRate =Number(data.HospitalRate).mul(100)
                this.ruleForm.HospitalLevel =data.HospitalLevel.split(",")
            },
            getRateList(){
                let arr = []
                let arg = arguments
                for(let i = 0;i<arg.length;i++){
                    
                    if(arg[i]>0||arg[i] === 0){
                        arr.push({
                            rate:arg[i].mul(100)
                        })
                    }
                }
                return arr
            },
            reset (){
                this.ruleForm = {
                    branch: "",
                    num: 1,
                    check: false,
                    rate: "",
                    comGrade: "",
                    compRate: "",
                    type: "",
                    hospitalRate: "",
                    HospitalLevel: [],
                }
                this.rateList=[{}]
            }
        },
        components: {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .dialog-footer{
        text-align: center;
    }
    .table_container{
        width: 100%;
        margin-top: 20px;
     /*   max-width: 600px;*/
    }
    .demo-ruleForm{
        min-width: 400px;
        max-width: 600px;
    }
    .form_item{
        width: 200px;
    }
</style>
