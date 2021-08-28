<template>
    <div class="upGrade">
        <div class="clear">
            <div class="pic left">
                <img src="" alt="">
            </div>
            <div class="mes left">
                <span>{{ruleForm.BranchName}} {{ruleForm.Sex}}</span><br/>
                <span>代理编号：{{ruleForm.Code}}</span>&nbsp;&nbsp;
                <span>代理等级：{{ruleForm.BranchGradeName}}&nbsp;&nbsp;手机号码：{{ruleForm.PhoneNumber}}</span><br/>
                <span>推荐人：{{baseData.ReferrerName}}</span>
            </div>
        </div>
        <el-col :span="24" style="line-height: 36px;font-size: 16px;font-weight: bold">填写升级信息</el-col>
        <div class="clear" style="margin-top: 20px">
            <el-form :model="ruleForm" :rules="rules" :inline="true" ref="ruleForm" label-width="110px"
                     class="demo-ruleForm">
                <el-col :span="24" style="background: #F2F2F2;padding-top: 10px">
                    <el-form-item label="升级等级：" class="form_item form_item_mt10" prop="grade" style="width:100%">
                        <el-select v-model="ruleForm.grade" placeholder="请选择等级" class="form_select_2">
                            <el-option v-for="item in gradeList" :label="item.BranchGradeName"
                                       :value="item.Code+'|'+item.BranchGradeName" :key="item.Code"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="推荐提成策略：" prop="identityType" class="form_item form_item_mt10" style="width:100%">
                        <el-select v-model="ruleForm.identityType" placeholder="请选择" class="form_select_2">
                            <el-option  label="新策略" value="1"></el-option>
                            <el-option  label="老策略" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="医院：" prop="Hospital" class="form_item form_item_mt10" v-if="show" style="width:100%">
                        <!-- <el-input class="form_ipt" v-model="ruleForm.Hospital" :disabled="true"></el-input>-->
                        <el-select v-model="ruleForm.Hospital" class="form_ipt">
                            <el-option v-for="(item,index) in supplyList" :label="item.SupplierName" :value="item.Code+'|'+item.SupplierName" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <br/>
                    <el-form-item label="补交：" class="form_item form_item_mt10" required style="width:100%">
                        <!-- <span style="color: red;line-height: 36px">￥{{ruleForm.payAmount}}</span> -->
                        <el-input-number class="form_ipt" v-model="ruleForm.payAmount" :min="0" :controls="false"></el-input-number>
                    </el-form-item>
                    <!-- <el-form-item label="押金：" class="form_item form_item_mt10" style="width:100%">
                        <span style="color: red;line-height: 36px">￥{{ruleForm.Pledge}}</span>
                    </el-form-item>  -->
                    <br/>
                    <el-form-item label="消费订单：" class="form_item form_item_mt10" style="width:100%">
                        <el-checkbox v-model="ruleForm.order"></el-checkbox>
                    </el-form-item>
                    <el-form-item label="订单编号：" class="form_item form_item_mt10" prop="formNum" v-if="ruleForm.order" style="width:100%">
                        <el-input v-model="ruleForm.formNum" class="form_ipt"></el-input>
                    </el-form-item>
                    <!-- 推荐人变更时显示 -->
                    <el-form-item label="升级后推荐人：" class="form_item form_item_mt10" v-if="referChange" style="width:100%">
                        <span>{{newrefer}}</span>
                    </el-form-item>
                </el-col>
                <el-form-item style="width: 100%;margin: 10px 0" label="" label-width="70px">
                    <span style="font-weight: bold;font-size: 16px">支付信息</span>
                </el-form-item>
                <el-col :span="24" style="background: #F2F2F2;padding-top: 10px">
                    <el-form-item label=" " style="width: 100%;margin-bottom: 10px" label-width="30px">
                        <el-table ref="singleTable" :data="payTable" border style="width: 870px">
                            <el-table-column prop="PayTypeName" min-width="100" label="支付方式"></el-table-column>
                            <el-table-column prop="receiveBranchName" min-width="100" label="销售公司"></el-table-column>
                            <el-table-column prop="ReceiveAccount" label="收款账户" min-width="100"></el-table-column>
                            <el-table-column prop="ProcFee" label="手续费" min-width="80"></el-table-column>
                            <el-table-column prop="Memo" label="备注" min-width="100"></el-table-column>
                            <el-table-column prop="RealAmount" label="实际金额" min-width="120">
                                <template slot-scope="scope">
                                    {{scope.row.RealAmount.toQFW()}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="PayDate" label="支付日期" min-width="100"></el-table-column>
                            <el-table-column prop="" label="操作" min-width="100">
                                <template slot-scope="scope">
                                    <el-button type="primary" size="small" @click="deleteRow(scope.$index,payTable)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        总额：￥{{total}}<br/>
                        <el-button type="success" @click="add" style="margin-top: 10px">添加支付信息</el-button>
                    </el-form-item>
                </el-col>
                <!-- <el-form-item style="width: 100%;margin: 10px 0" label="" label-width="70px">
                    <span style="font-weight: bold;font-size: 16px">套餐信息</span>
                </el-form-item>
                <el-col :span="24" style="background: #F2F2F2;padding-top: 10px" >
                    <el-form-item label="选择套餐组合：" style="margin-bottom: 0px">
                        <el-row>
                            <el-col v-for="(items,index) in packageList" :key="index" style="width: 150px">
                                <el-select v-model="packageVal[index].code" form placeholder="请选择" :disabled="baseData.from == 0">
                                    <el-option v-for="(item,index) in items" :label="item.ConPacName"
                                               :value="item.ConPacCode" :key="item.ConPacCode"></el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="卡券：" style="width: 100%;margin-bottom: 0px">
                        <el-table ref="singleTable" :data="tableData" border
                                  highlight-current-row style="width: 800px">
                            <el-table-column type="index" width="60" label="序号"></el-table-column>
                            <el-table-column prop="ConPacName" label="套餐名称" min-width="100"></el-table-column>
                            <el-table-column prop="TickInfoCode" label="券种编号" min-width="100"></el-table-column>
                            <el-table-column prop="TickName" label="券名称" min-width="120"></el-table-column>
                            <el-table-column prop="Price" label="面值" min-width="80"></el-table-column>
                            <el-table-column prop="TicNum" label="数量" min-width="80"></el-table-column>
                            <el-table-column prop="EndDate" label="有效期" min-width="120"></el-table-column>
                        </el-table>
                    </el-form-item>
                    <el-form-item label="积分：" class="form_item">
                        <span>{{integral}}</span>
                    </el-form-item>
                </el-col> -->
                <el-form-item style="width: 100%;text-align: center;margin-top: 20px" class="form_item_mt0">
                    <el-button type="primary" @click="submitForm('ruleForm')" :loading="saveLoading">保存</el-button>
                    <el-button @click="resetForm('ruleForm')">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-dialog title="添加支付信息" :visible.sync="dialogTableVisible1" :modal="false" size="">
            <payInfo @payOpe="payOpe" :editMes="editMes" style="width: 380px" :dialogTableVisible1="dialogTableVisible1" :isHos="true"></payInfo>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import {GetBranchGradeAll,GetPackageOrderNumAll,GetTicketsAll,UpgradeBranch,getBaseDataByCode,getSupplierByPage,AddBranchUpgradeApply,GetLeastReferrerCode,
    GetBranchGradeFee} from "../../../../api/myData"
    import { getCookie } from '../../../../config/mUtils'
    import payInfo from "./pay.vue"
    export default {
        // name:"upGrade",
        props:{
          baseData:{
              type:Object
          },
        },
        data () {
            return {
                saveLoading:false,
                editMes:{},
                payWayList:[],
                hosForm:{},
                supplyList:[],
                show:false,
                accountList:[],
                IdentityType:"",
                bonusData:[],
                form:{
                    type:"",
                    PayTypeName:"",
                    PayType:"",
                    RealAmount:0,
                    Memo:"",
                    ReceiveAccount:"",
                    sxf:0,
                    payDate:new Date()
                },
                dialogFormVisible:false,
                dialogTableVisible1:false,
                payTable:[],
                ReferrerCode:"",
                integral:0,
                ticketsList:[],
                packageAll:[],
                packageVal:[],
                gradeList:[],
                tableData:[],
                ruleForm:{
                    order:false,
                    formNum:"",
                    Hospital:"",
                    identityType:"",
                    payAmount:"",
                    grade:"",
                    BranchName:"",
                    Sex:"",
                    Code:"",
                    BranchGradeName:"",
                    PhoneNumber:"",
                    Pledge:"",
                },
                packageList:[],
                rules:{
                    Hospital:[ { required: true, message: '请选择', trigger: 'change' }],
                    identityType:[ { required: true, message: '请选择', trigger: 'change' }],
                    grade:[ { required: true, message: '请选择', trigger: 'change' }],
                },
                upgradeMes:{
                    ReferrerCode:''
                },
                referChange:false,//升级后推荐人是否变化
                newrefer:'',
            }
        },
        computed:{
            total(){
                let num = 0
                if(this.payTable&&this.payTable.length>0){
                    this.payTable.forEach(row=>{
                        num += Number(row.RealAmount)
                    })
                }else{
                    num = 0
                }
                return num
            },
        },
        watch:{
            'baseData':{
                handler(curVal,oldVal){
                    // this.getBranchGradeAll()
                    this.copyWorth(this.baseData)
                },
                deep:true
            },
            'ruleForm.grade':{
                handler(curVal,oldVal){

                    let gradeCode = ""
                    if(curVal.length>0){
                        gradeCode = curVal.split("|")[0]
                    }
                    let grade = ""
                    this.gradeList.forEach(data=>{
                        if(data.Code == gradeCode){
                            grade = data.OrderNum

                            if(data.GradeProperty == "终结"){
                                this.show = true
                            }else{
                                this.show = false
                            }
                        }else{}
                    })
                    this.packGradeSelect(grade)
                    this.getBranchGradeFee({
                        MemberCode:this.ruleForm.Code,
                        MemberGradeCode:gradeCode,
                        BranchCode: this.ReferrerCode
                    })
                },
                deep:true
            },
            "packageVal":{
                handler(curVal,oldVal){
                    this.getTickSplit(curVal)
                },
                deep:true
            }
        },
        mounted(){
            this.getBranchGradeAll()
        },
        filters:{
            filterFunB(val){
                let num = 0
                if(val&&val.length>0){
                    val.forEach(row=>{
                        num += Number(row.Bonus)
                    })
                }else{
                    num = 0
                }
                return num
            }
        },
        methods: {
            async AddBranchUpgradeApply(params){
                let res = await AddBranchUpgradeApply(params)
                    if(res.status){
                        this.$message({message: '申请成功', type: 'success'});
                        this.$emit("upClose",close)
                    }else{
                        this.$message.error('升级失败'+res.errorMessage);
                    }
            },
            paySelect(){
                this.form.PayTypeName = this.form.type.name
                this.form.PayType = this.form.type.value
            },
            async getBranchGradeFee(params){
                try{
                    if(params){
                        let res =await GetBranchGradeFee(params)
                        this.ruleForm.payAmount = res.price
                        this.ruleForm.Pledge = res.pledge
                    }else{

                    }
                }catch(err){
                    console.log(err)
                }
            },
            //  升级代理商
            async upgradeBranch(params){
                try{

                    this.saveLoading = true
                    let res = await UpgradeBranch(params)
                    if(res.success){
                        this.$message({message: '升级成功', type: 'success'});
                        this.$emit("upClose",close)
                    }else{
                        this.$message.error('升级失败'+res.error);
                    }
                    this.saveLoading = false
                }catch(err){
                    console.log(err)
                    this.$message.error('升级失败');
                }
            },
//            获取所有被选中的券
            // async getTicketsAll(){
            //     try{
            //         let res = await GetTicketsAll()
            //         this.ticketsList = res
            //         this.copyWorth(this.baseData)
            //     }catch(err){
            //         console.log(err)
            //     }
            // },
            //            等级套餐
            // async getPackageOrderNumAll(){
            //     try{
            //         let res = await GetPackageOrderNumAll()
            //         this.packageAll = res
            //         this.getTicketsAll()
            //     }catch(err){
            //         console.log(err)
            //     }
            // },
            //            获取所有等级
            async getBranchGradeAll(){
                try {
                    let data = {startdate: "", enddate: "", suppliername: "", suptypecode: "", phonenumber: "", pageindex: 1, pagesize: 999}
                    let [gradeList,supplyList,accountList,payWays,PackageOrder,tickets,LeastRefer] = await Promise.all([GetBranchGradeAll(),getSupplierByPage(data),
                    getBaseDataByCode("0019"),getBaseDataByCode("0006"),GetPackageOrderNumAll(),GetTicketsAll(),GetLeastReferrerCode({code:this.baseData.Code})])
                    this.gradeList = await gradeList
                    this.accountList = accountList
                    payWays.forEach(row=>{
                        if(Number(row.DataCode)<7){
                            this.payWayList.push({
                                name:row.DataName,
                                value:row.DataCode
                            })
                        }
                    })
                    this.supplyList = supplyList
                    this.packageAll = PackageOrder
                    this.ticketsList = tickets
                    this.copyWorth(this.baseData)
                    //判断升级后推荐人是否改变
                    this.referChange = LeastRefer.data[0].code == this.baseData.ReferrerCode?false:true
                    this.newrefer = LeastRefer.data[0].code == this.baseData.ReferrerCode?'':LeastRefer.data[0].branchName
                } catch (err) {
                    console.log(err)
                }
            },
//            套餐等级筛选
            packGradeSelect(grade){
//                获取所有套餐筛选等级
                let arr = []
                this.gradeList.forEach(data=>{
                    if(data.OrderNum>=grade){
                        arr.push(data.OrderNum)
                    }
                })
                arr = this.removeDup(arr)
            },

            removeDup(data){//            去重
                let arr = []
                let len = data.length
                data.sort()
                for(let i =0;i<len;i++){
                    if(data[i]!=data[i+1]){
                        arr.push(data[i])
                    }else{
                        if(i>=len-1){
                            arr.push(data[i+1])
                        }
                    }
                }
                this.packageSelect(arr,this.packageAll)
            },
            //            套餐筛选组合
            packageSelect(numList,dataList){
                this.packageList = []
                this.packageVal = []
                for(let i=0;i<numList.length;i++){
                    for(let j = 0;j<dataList.length;j++){
                        if(numList[i] == dataList[j].OrderNum){
                            if(!this.packageList[i]){
                                this.packageList.push([])
                            }
                            this.packageList[this.packageList.length-1].push(dataList[j])
                        }
                    }
                }
                this.packageList.forEach(data=>{
                    this.packageVal.push({code:""})
                })
            },
            getTickSplit(data){

                let arr = []
                for(let i = 0;i<data.length;i++){
                    for(let j = 0;j<this.ticketsList.length;j++){
                        if(data[i].code.length!=0&&data[i].code ==this.ticketsList[j].ConPacCode ){
                            this.ticketsList[j].TickCode=""
                            arr.push(this.ticketsList[j])
                        }
                    }
                }
                this.tableData = this.removeDu(arr)
                this.integral = this.recharge()
            },

            removeDu(data){
                let arr = []
                let pack = JSON.parse(JSON.stringify(data))
                for(var i = 0;i<data.length-1;i++){
                    for(var j = i+1;j<data.length;j++){
                        if(data[i].TickInfoCode == data[j].TickInfoCode){
                            pack[j].TicNum+=pack[i].TicNum
                            pack[i].dul = true
                            break;
                        }
                    }
                }
                pack.forEach(row=>{
                    if(!row.dul){
                        arr.push(row)
                    }
                })

               return arr
            },
            recharge(){
                let arr = []
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
//            提交
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.payTable.forEach(row=>{
                            row.BranchCode = this.baseData.Code
                        })
                            let obj = {
                                formNO:this.ruleForm.formNum,
                                // id:this.baseData.Id,
                                // Pledge:this.ruleForm.Pledge,
                                "branchCode": this.baseData.Code,
                                "branchName": this.baseData.BranchName,
                                identityType:this.ruleForm.identityType,
                                branchOrderPayList: JSON.stringify(this.payTable),
                                createBy:getCookie("userName"),
                                createUserId:getCookie("userId"),
                                "branchGradeCode": this.baseData.BranchGradeCode,
                                branchGradeName:this.ruleForm.BranchGradeName,
                                "targetBranchGradeCode": this.ruleForm.grade.split("|")[0],
                                targetBranchGradeName: this.ruleForm.grade.split("|")[1],
                                "referrerCode": this.baseData.ReferrerCode,
                                "referrerName": this.baseData.ReferrerName,
                                "currentAmount": this.ruleForm.payAmount,
                                "payAmount": this.total,
                            }
                            if (this.show) {
                                obj.hospitalCode = this.ruleForm.Hospital.split("|")[0]
                                obj.hospitalName = this.ruleForm.Hospital.split("|")[1]
                            }
                            this.AddBranchUpgradeApply(obj)
                    } else {
                        return false;
                    }
                });
            },

            packageTurn(data){
                let arr = []
                data.forEach(row=> {
                    arr.push({
                        ConPacCode: row.ConPacCode,
                        createUserId: getCookie("userId"),
                        createBy: getCookie("userName"),
                        TickInfoCode: row.TickInfoCode,
                        TicketCode: row.TicketCode,
                        TicketsType:row.TicketsType,
                        ProjCodes:row.ProjCodes,
                        UseCount:row.UseCount,
                        TicNum:row.TicNum,
                        ProjCodesNames:row.ProjCodesNames
                    })
                })
                return arr
            },
//            取消
            resetForm(){
                this.$emit("upClose",close)
                this.ruleForm.grade = ""
            },
            copyWorth(data){
                this.ReferrerCode = data.ReferrerCode
                this.ruleForm.Code = data.Code
                this.ruleForm.BranchName = data.BranchName
                this.ruleForm.BranchGradeCode = data.BranchGradeCode
                this.ruleForm.BranchGradeName = this.getGradeName(data.BranchGradeCode)
                this.ruleForm.PhoneNumber = data.PhoneNumber
                this.ruleForm.Sex = data.Sex == 1?'男':'女'
                this.IdentityType = data.IdentityType
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
                // 筛选掉医院和本等级及以下
                this.gradeList.forEach(row=>{
                    if(row.OrderNum < OrderNum&&row.OrderNum!=0){
                        arr.push(row)
                    }
                })
                this.gradeList = arr
                return name
            },
            conPackSplit(data){
                let arr = []
                /*data.concat(this.baseData.ConPackage)*/
                if(data.length!=0){
                    data.forEach(row=>{
                        arr.push(row.code)
                    })
                    let list = arr.join(",")+","+this.baseData.ConPackage
                    return list
                }else{
                    return ""
                }
            },
            add(){
                this.dialogTableVisible1 = true
                this.form = {
                    type:"",
                    PayTypeName:"",
                    PayType:"",
                    RealAmount:0,
                    Memo:"",
                    ReceiveAccount:"",
                    sxf:0,
                    payDate:new Date()
                }
            },
            paySure(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.payTable.push({
                            // ItemType: 4,//4升级
                            PayType: this.form.PayType,
                            PayTypeName:this.form.PayTypeName,
                            Memo:this.form.Memo,
                            RealAmount:this.form.RealAmount,
                            ReceiveAccount:this.form.ReceiveAccount,
                            ProcFee:this.form.sxf,
                            payDate:this.form.payDate?this.form.payDate.formatDate("yyyy-MM-dd"):""
                        })
                        this.dialogTableVisible1 = false
                        this.$refs['form'].resetFields();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            payCancel(){
                this.dialogTableVisible1 = false
                this.$refs['form'].resetFields();
            },
            deleteRow(index,data){
                data.splice(index,1)
            },
            payOpe(val){
                if(val.PayType){
                    this.payTable.push(JSON.parse(JSON.stringify(val)))
                }
                this.dialogTableVisible1 = false
            },
        },
        components: {
            payInfo
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
        border-radius: 60px;
        background: url("../../../../assets/img/person.jpg") no-repeat center;
        background-size:100% ;
        overflow: hidden;
        margin-right: 10px;
    }
    .mes{
        margin-left: 20px;
        line-height: 26px;
    }
</style>
