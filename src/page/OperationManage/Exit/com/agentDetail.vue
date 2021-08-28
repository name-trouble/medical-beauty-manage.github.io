<template>
    <div class="upGrade">
        <div class="clear">
            <div class="pic left">
                <img src="" alt="">
            </div>
            <div class="mes left">
                <span class="">{{ruleForm.BranchName}}&nbsp;&nbsp;{{ruleForm.Sex}}</span><br/>
                <span>代理编号：{{ruleForm.Code}}</span>
                <span>代理等级：{{ruleForm.BranchGradeName}}&nbsp;&nbsp;手机号码：{{ruleForm.PhoneNumber}}</span>
            </div>
        </div>
        <div class="clear" style="margin-top: 20px">
            <el-form :model="ruleForm" :inline="true" ref="ruleForm" label-width="85px" class="demo-ruleForm">
                <el-form-item label="" style="margin-bottom: 0px">
                    <span style="font-weight: bold;font-size: 16px">代理详情</span>
                </el-form-item>
                <el-col :span="24" style="background: #F2F2F2">
                    <el-form-item label="注册时间：" class="form_item_half"><span>{{ruleForm.RegistDate}}</span></el-form-item>
                    <el-form-item label="邮箱：" class="form_item_half"><span>{{ruleForm.Email}}</span></el-form-item>
                    <el-form-item label="地区：" class="form_item_half"><span>{{ruleForm.Address}}</span></el-form-item>
                    <el-form-item label="来源渠道：" class="form_item_half"><span>{{ruleForm.SourcWayeCode}}</span></el-form-item>
                    <el-form-item label="身份证号：" class="form_item_half"><span>{{ruleForm.IDCard}}</span></el-form-item>
                    <el-form-item label="生日：" class="form_item_half"><span>{{ruleForm.Birthday}}</span></el-form-item>
                    <el-form-item label="推荐人：" class="form_item_half"><span>{{ruleForm.ReferrerName}}</span></el-form-item>
                    <el-form-item label="医院：" class="form_item_half"><span>{{ruleForm.hospital}}</span></el-form-item>
                </el-col>
                <el-form-item style="width: 100%;margin-bottom: 0px" label="">
                    <span style="font-weight: bold;font-size: 16px">组合信息</span>
                </el-form-item>
                <el-col :span="24" style="background: #F2F2F2;padding-top: 10px">
                    <el-form-item label="套餐内容：" style="margin-bottom: 0px">
                        <el-row>
                           <!-- <el-col v-for="(items,index) in packageList" :key="index" style="width: 150px">
                                &lt;!&ndash; <el-select v-model="packageVal[index].code" form placeholder="请选择">
                                     <el-option v-for="(item,index) in items" :label="item.ConPacName"
                                                :value="item.ConPacCode" :key="item.ConPacCode"></el-option>
                                 </el-select>&ndash;&gt;

                            </el-col>-->
                            <span v-for="(item,index) in packageVal" :key="index" style="margin-right: 20px">{{item}}</span>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="卡券：" style="width: 100%;margin-bottom: 0px">
                        <el-table ref="singleTable" :data="tableData" border highlight-current-row style="width: 800px">
                            <el-table-column type="index" width="60" label="序号"></el-table-column>
                            <el-table-column prop="ConPacName" label="套餐名称" min-width="100"></el-table-column>
                            <el-table-column prop="TickInfoCode" label="券种编号" min-width="100"></el-table-column>
                            <el-table-column prop="TickName" label="券名称" min-width="120"></el-table-column>
                            <el-table-column prop="Price" label="面值" min-width="80"></el-table-column>
                            <el-table-column prop="EndDate" label="有效期" min-width="120">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.PrdOfVal!='' && scope.row.PrdOfVal!=null "> {{ '售后'+ scope.row.PrdOfVal +'天'}}</span>
                                    <div v-else>
                                        <p>开始：{{ scope.row.StartDate&&scope.row.StartDate.substr(0,10) }} </p>
                                        <p>结束：{{ scope.row.EndDate&&scope.row.EndDate.substr(0,10) }} </p>
                                    </div>
                                </template>
                            </el-table-column>
                            <!--<el-table-column prop="UsedTimes" label="可用次数" min-width="100"></el-table-column>-->
                            <!--<el-table-column prop="TicketCode" label="编号" min-width="100"></el-table-column>-->
                        </el-table>
                    </el-form-item>
                    <el-form-item label="积分：" class="form_item">
                        <span>{{integral}}</span>
                    </el-form-item>
                </el-col>
                <el-form-item label="" style="margin-bottom: 0px;width: 100%">
                    <span style="font-weight: bold;font-size: 16px">银行信息</span>
                </el-form-item>
                <el-col :span="24" style="background: #F2F2F2;padding-top: 10px">
                    <el-form-item label="银行：" class="form_item_half"><span>{{ruleForm.OpenBankCode}}</span></el-form-item>
                    <el-form-item label="开户支行：" class="form_item_half"><span>{{ruleForm.OpenBankName}}</span></el-form-item>
                    <el-form-item label="银行卡号：" class="form_item_half"><span>{{ruleForm.BankCardId}}</span></el-form-item>
                    <el-form-item label="开户人：" class="form_item_half"><span>{{ruleForm.BankCardHolder}}</span></el-form-item>
                </el-col>
                <el-form-item label="" style="margin-bottom: 0px;width: 100%">
                    <span style="font-weight: bold;font-size: 16px">附加信息</span>
                </el-form-item>
                <el-col :span="24" style="background: #F2F2F2;padding-top: 10px">
                    <el-form-item label="学历：" class="form_item_half"><span>{{ruleForm.Education}}</span></el-form-item>
                    <el-form-item label="行业：" class="form_item_half"><span>{{ruleForm.ProfessionCode}}</span></el-form-item>
                    <el-form-item label="年收入：" class="form_item_half"><span>{{ruleForm.Income}}</span></el-form-item>
                </el-col>
            </el-form>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {GetBranchGradeAll,GetPackageOrderNumAll,GetTicketsAll,GetBranchByCode} from "../../../../api/myData"
    export default {
        // name:"upGrade",
        props:{
            detailCode:""
        },
        data () {
            return {
                integral:"",
                ticketsList:[],
                packageAll:[],
                packageVal:[],
                gradeList:[],
                tableData:[],
                allMes:"",
                ruleForm:{
                    grade:"",
                    BranchName:"",
                    Sex:"",
                    Code:"",
                    BranchGradeName:"",
                    PhoneNumber:""
                }
            }
        },
        watch:{
            'detailCode':{
                handler(curVal,oldVal){
                    this.getBranchGradeAll()
                },
                deep:true
            },
            'ruleForm.grade':{
                handler(curVal,oldVal){
                    let grade = ""
                    this.gradeList.forEach(data=>{
                        if(data.Code == curVal){
                            grade = data.OrderNum
                        }
                    })
//                    this.packGradeSelect(grade)
                },
                deep:true
            },
        },
        mounted(){
            this.getBranchGradeAll()
        },
        methods: {
//            获取所有被选中的券
            async getTicketsAll(){
                try{
                    let res = await GetTicketsAll()
                    this.ticketsList = res
                    this.getBranchByCode({
                        branchcode:this.detailCode
                    })

                }catch(err){
                    console.log(err)
                }
            },
            //            等级套餐
            async getPackageOrderNumAll(){
                try{
                    let res = await GetPackageOrderNumAll()
                    this.packageAll = res
                    this.getTicketsAll()

                }catch(err){
                    console.log(err)
                }
            },
            //            获取所有等级
            async getBranchGradeAll(){
                try {
                    let res = await GetBranchGradeAll()
                    this.gradeList = res
                    this.getPackageOrderNumAll()

                } catch (err) {
                    console.log(err)
                }
            },
            // 获取单个代理商详情
            async getBranchByCode(params){
                try{
                    let res = await GetBranchByCode(params)
                    this.allMes = res
                    this.copyWorth(res.Branch)
                    this.tableData = res.CPOList
                    this.integral = this.recharge(res.Branch.ConPackage)
//                    this.packTableData(res.Branch,res.CPOList)
                }catch(err){
                    console.log(err)
                }
            },
            recharge(data){
                let arr = []
                let arr1=data.split(",")
                let num = 0
                this.packageVal.forEach(row=>{
                    for(let i =0;i<this.packageAll.length;i++){
                        if(row.code ==this.packageAll[i].ConPacCode ){
                            num+=Number(this.packageAll[i].JifenRecharge)
                            break
                        }
                    }
                })
                return num
            },

            copyWorth(data){
                for(var p in data){
                    
                    if(!data[p]||data[p] == 'null'||data[p] == undefined||data[p] == 'undefined'){
                        data[p] = ""
                    }
                }
                this.ruleForm.Sex = this.getSex(data.Sex)
                this.ruleForm.Code = data.Code
                this.ruleForm.BranchName = data.BranchName
                this.ruleForm.BranchGradeName = this.getGradeName(data.BranchGradeCode)
                this.ruleForm.PhoneNumber = data.PhoneNumber
                this.ruleForm.SourcWayeCode = data.SourcWayeCode
                this.ruleForm.RegistDate = data.RegistDate
                this.ruleForm.ReferrerName = data.ReferrerName
                this.ruleForm.OpenBankName = data.OpenBankName
                this.ruleForm.OpenBankCode = data.OpenBankCode
                this.ruleForm.Income = data.Income
                this.ruleForm.IDCard = data.IDCard
                this.ruleForm.Email = data.Email
                this.ruleForm.BankCardId = data.BankCardId
                this.ruleForm.Birthday = data.Birthday
                this.ruleForm.BankCardHolder = data.BankCardHolder
                this.ruleForm.Address = data["Province"]+data["City"]+data["Area"]+data["Address"].split(",").join("")
                this.ruleForm.hospital = data.HospitalName
                this.packageVal = this.packNamTurn(data.ConPackage)
//                ConPackage   BranchGradeCode
            },
            getSex(data){
                if(data){
                    if(data == 1){
                        return "男"
                    }else{
                        return "女"
                    }
                }else{
                    return ""
                }
            },
            getGradeName(data){
                let name = ""
                let arr = []
                let OrderNum = ""
                this.gradeList.forEach(row=>{
                    if(row.Code == data){
                        name = row.BranchGradeName
                        OrderNum = row.OrderNum
                    }
                })
                this.gradeList.forEach(row=>{
                    if(row.OrderNum < OrderNum){
                        arr.push(row)
                    }
                })
                this.gradeList = arr
                return name
            },
        /*    packTableData(data,list){

                let arr = data.ConPackage.split(",")
                this.tableData = []
                for(let i = 0;i<arr.length;i++){
                    for(let j = 0;j<this.ticketsList.length;j++){
                        if(arr[i] == this.ticketsList[j].ConPacCode){
                            this.tableData.push(this.ticketsList[j])
                        }
                    }
                }
                for(let i = 0;i< this.tableData.length;i++){
                    for(let j = 0;j<list.length;j++){
                        if(this.tableData[i].ConPacCode == list[j].ConPacCode&&this.tableData[i].TicketCode === ""){
                            this.tableData[i].TicketCode = list[j].TicketCode
                            break
                        }
                    }
                }
                this.tableData.push()
            },*/
            packNamTurn(data){
                let arr = data.split(",")
                let arr1 = []
                for(let i = 0;i<arr.length;i++){
                    for(let j = 0;j<this.packageAll.length;j++){
                        if(arr[i] == this.packageAll[j].ConPacCode){
                            arr1.push(this.packageAll[j].ConPacName)
                        }
                    }
                }

                return arr1
            }
        },
        components: {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .clear{
        clear: both;
    }
    .pic{
        width: 60px;height: 60px;
        border-radius: 30px;
        overflow: hidden;
        background: url("http://192.168.0.188:8081/upload/goodsimg/20170813105113.png") center;
        background-size: 100%;
    }
    .form_item_half{
        width: 48%;
        margin-bottom: 0px;
    }
    .upGrade{
        height: 600px;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .mes{
        line-height: 30px;
        margin-left: 10px;
    }
</style>
