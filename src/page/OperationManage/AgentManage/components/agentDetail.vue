<template>
    <div class="upGrade">
        <div class="clear">
            <div class="pic left">
                <img src="" alt="">
            </div>
            <div class="mes left">
                <span class="">{{ruleForm.BranchName}}&nbsp;&nbsp;{{ruleForm.Sex}}</span><br/>
                <span>代理编号：{{ruleForm.Code}}</span> &nbsp;&nbsp;
                <span>代理等级：{{ruleForm.BranchGradeName}}&nbsp;&nbsp;手机号码：{{ruleForm.PhoneNumber}}</span>&nbsp;&nbsp;
                <span>创建人：{{createBy}}</span> &nbsp;&nbsp;
            </div>
        </div>
        <div class="clear" style="margin-top: 20px">
            <el-form :model="ruleForm" :inline="true" ref="ruleForm" label-width="110px" class="demo-ruleForm">
                <el-form-item label="" style="margin-bottom: 0px">
                    <span style="font-weight: bold;font-size: 16px">代理详情</span>
                </el-form-item>
                <el-col :span="24" style="background: #F2F2F2">
                    <el-form-item label="注册时间：" class="form_item_half"><span>{{ruleForm.RegistDate}}</span></el-form-item>
                    <el-form-item label="邮箱：" class="form_item_half"><span>{{ruleForm.Email}}</span></el-form-item>
                    <el-form-item label="地区：" class="form_item_half"><span>{{ruleForm.Address}}</span></el-form-item>
                    <el-form-item label="来源渠道：" class="form_item_half"><span>{{ruleForm.SourcWayeCode}}</span></el-form-item>
                    <el-form-item label="身份证号：" class="form_item_half"><span>{{ruleForm.IDCard}}</span></el-form-item>
                    <el-form-item label="卡号：" class="form_item_half"><span>{{allMes.CardNO}}</span></el-form-item>
                    <el-form-item label="生日：" class="form_item_half"><span>{{ruleForm.Birthday}}</span></el-form-item>
                    <el-form-item label="推荐人：" class="form_item_half" v-if="ruleForm.ReferrerName.length>0"><span>{{ruleForm.ReferrerName}}</span></el-form-item>
                    <el-form-item label="前推荐人：" class="form_item_half"  v-if="ruleForm.OldReferrerName.length>0"><span>{{ruleForm.OldReferrerName}}</span></el-form-item>
                    <el-form-item label="服务商：" v-if="allMes.BranchType == 2" class="form_item_half">
                        <span v-if="ServiceInfo.ServiceInfoName">{{ServiceInfo.ServiceInfoName}}（{{ServiceInfo.PhoneNumber}}）</span>
                    </el-form-item>
                    <el-form-item label="医院：" class="form_item_half"><span>{{ruleForm.hospital}}</span></el-form-item>
                    <el-form-item label="代理类型：" class="form_item_half">
                        <span v-if="allMes.BranchType == 1">个人</span>
                        <span v-if="allMes.BranchType == 2">店铺</span>
                    </el-form-item>
                    <el-form-item label="店铺：" class="form_item_half" v-if="allMes.BranchType == 2">
                        <span v-if="allMes.ShopName.length>0">{{allMes.ShopName}}</span>  <span>{{allMes.ShopArea}}m²</span>
                    </el-form-item>
                    <el-form-item label="凭证：" class="form_item_half" v-if="allMes.BranchType == 2">
                        <el-button @click="uploadImg" size="small">查看图片</el-button>
                    </el-form-item>
                    <el-form-item label="专家日提成：" class="form_item_half" prop="" v-if="allMes.BranchType == 2">
                        <span v-if="allMes.IsExpert == 0">无</span>
                        <span v-if="allMes.IsExpert == 1">有</span>
                    </el-form-item>
                    <el-form-item label="生效时间：" class="form_item_half" v-if="allMes.IsExpert == 1&&allMes.BranchType == 2">
                        <span v-if="allMes.ShopEffectiveDate">{{allMes.ShopEffectiveDate.substring(0,10)}}</span>
                    </el-form-item>
                    <el-form-item label="专家日提成比例：" class="form_item_half" v-if="allMes.IsExpert == 1&&allMes.BranchType == 2">
                        <span v-if="allMes.ExpertRate">{{allMes.ExpertRate.mul(100)}}%</span>
                    </el-form-item>
                    <el-form-item label="策略：" class="form_item_half">
                        <span v-if="allMes.IdentityType == 1">新策略</span>
                        <span v-if="allMes.IdentityType == 2">老策略</span>
                    </el-form-item>
                    <el-form-item label="订单号：" class="form_item_half" v-if="allMes.IdentityType == 1">
                        <span v-if="allMes.IdentityType == 1">{{allMes.FormNO}}</span>
                    </el-form-item>
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
                        <el-table ref="singleTable" :data="tableData" border highlight-current-row style="width: 750px">
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
                 <el-form-item style="width: 100%;margin: 0" label="" label-width="70px">
                    <span style="font-weight: bold;font-size: 16px">支付信息</span>
                </el-form-item>
                <el-col :span="24" style="background: #F2F2F2;padding-top: 10px">
                    <el-form-item label=" " style="width: 100%;margin-bottom: 10px" label-width="50px">
                        <el-table ref="singleTable" :data="payTable" border style="width: 800px">
                            <el-table-column prop="PayTypeName" min-width="100" label="支付方式">
                                <!-- <template slot-scope="scope">
                                    <span v-if="scope.row.PayType == 1">微信/支付宝</span>
                                    <span v-if="scope.row.PayType == 2">现金</span>
                                    <span v-if="scope.row.PayType == 3">银行卡</span>
                                    <span v-if="scope.row.PayType == 4">分期</span>
                                </template> -->
                            </el-table-column>
                            <el-table-column prop="PayDate" label="支付日期" min-width="120">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.PayDate">
                                        {{scope.row.PayDate.substring(0,10)}} {{scope.row.PayDate.substring(11,19)}}
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="ReceiveAccount" label="收款账户" min-width="100"></el-table-column>
                            <el-table-column prop="ProcFee" label="手续费" min-width="80"></el-table-column>
                            <el-table-column prop="ItemDetail" label="来源" min-width="80"></el-table-column>
                            <el-table-column prop="Memo" label="备注" min-width="100" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="RealAmount" label="实际金额" min-width="100">
                                <template slot-scope="scope">
                                    {{scope.row.RealAmount.toQFW()}}
                                </template>
                            </el-table-column>
                        </el-table>
                        <!-- 总额：￥{{total}}<br/> -->
                    </el-form-item>
                </el-col>
            </el-form>
        </div>
        <el-dialog title="凭证图片" :visible.sync="dialogImg" :modal="false" size="">
            <div style="width:650px;">
                <div class="imgList" v-for="item in fileList" :key="item.Id">
                    <img :src="baseImgPath+item.ImgUrl" alt="" class="imgShow">
                    <div class="layer">
                        <i @click="imgShow(baseImgPath+item.ImgUrl)" class="el-icon-view view"></i>
                        <!-- <a style="color:#fff" :href="api+item.url" download="凭证" v-if="downLoadApi">
                            <i class="icon iconfont icon-xiazai"></i>
                        </a> -->
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import { xmxUrl, baseImgPath } from '@/config/env'
    import {GetBranchGradeAll,GetPackageOrderNumAll,GetTicketsAll,GetBranchByCode} from "../../../../api/myData"
    export default {
        // name:"upGrade",
        props:{
            detailCode:""
        },
        data () {
            return {
                dialogImg:false,
                baseImgPath,
                fileList:[],
                allMes:{},
                integral:0,
                payTable:[],
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
                    PhoneNumber:"",
                    OldReferrerName:"",
                    ReferrerName:"",
                },
                createBy:"",
                ServiceInfo:{}
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
            imgShow(url){
                this.$emit("photoShow",url)
            },
            uploadImg(){this.dialogImg = true},
            //  获取所有等级 套餐等级 所有券 代理商信息
            async getBranchGradeAll(){
                try {
                    let [grade,gradePack,tickets,branchMes] = await Promise.all([GetBranchGradeAll(),GetPackageOrderNumAll(),GetTicketsAll(),
                    GetBranchByCode({branchcode:this.detailCode})])
                    this.gradeList = grade
                    this.packageAll = gradePack
                    this.ticketsList = tickets
                    this.getBranchByCode(branchMes)
                } catch (err) {
                    console.log(err)
                }
            },
            // 获取单个代理商详情
            getBranchByCode(res){
                this.fileList = res.CommonPhotoList
                this.allMes = res
                this.ServiceInfo = res.ServiceInfo?res.ServiceInfo:{}
                this.copyWorth(res.Branch)
                this.tableData = res.CPOList
                this.payTable = res.BranchOrderPayList.filter(row=>{
                    if(row.ItemType == 1||row.ItemType == 4){
                        return row
                    }
                })
            },

            copyWorth(data){
                for(var p in data){
                    if(!data[p]||data[p] == 'null'||data[p] == undefined||data[p] == 'undefined'){
                        data[p] = ""
                    }
                }
                this.allMes = data
                this.ruleForm.Sex = this.getSex(data.Sex)
                this.ruleForm.Code = data.Code
                this.ruleForm.BranchName = data.BranchName
                this.ruleForm.BranchGradeName = this.getGradeName(data.BranchGradeCode)
                this.ruleForm.PhoneNumber = data.PhoneNumber
                this.ruleForm.SourcWayeCode = data.SourcWayeCode
                this.ruleForm.RegistDate = data.RegistDate.substring(0,10)
                this.ruleForm.ReferrerName = data.ReferrerName
                this.ruleForm.OpenBankName = data.OpenBankName
                this.ruleForm.OpenBankCode = data.OpenBankCode
                this.ruleForm.Income = data.Income
                this.ruleForm.IDCard = data.IDCard
                this.ruleForm.Email = data.Email
                this.ruleForm.BankCardId = data.BankCardId
                this.ruleForm.Birthday = data.Birthday
                this.ruleForm.BankCardHolder = data.BankCardHolder
                this.ruleForm.Address = data.Province+data.City+data.Area+data.Address.split(",").join("")
                this.ruleForm.hospital = data.HospitalName
                this.ruleForm.OldReferrerName = data.OldReferrerName?data.OldReferrerName:"",
                this.packageVal = this.packNamTurn(data.ConPackage)              
                this.createBy = data.CreateBy
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
            packNamTurn(data){
                let arr = data.split(",")
                let arr1 = []
                for(let i = 0;i<arr.length;i++){
                    for(let j = 0;j<this.packageAll.length;j++){
                        if(arr[i] == this.packageAll[j].ConPacCode){
                            arr1.push(this.packageAll[j].ConPacName)
                            this.integral +=  this.packageAll[j].JifenRecharge
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
        background: url("../../../../assets/img/person.jpg") center;
        background-size: 100%;
    }
    .form_item_half{
        width: 48%;
        margin-bottom: 0px;
    }
    .upGrade{
        height: 750px;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .mes{
        margin-left: 20px;
        line-height: 26px;
    }
    .imgList{
        width:100px;
        height:100px;
        border: 1px dashed #c0ccda;
        display: inline-block;
        border-radius: 6px;
        margin-right: 5px;
        position: relative;
    }
    .layer{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        width: 100%;
        height: 100px;
        background-color: rgba(0, 0, 0, 0.3);
        text-align: center;
        line-height: 100px;
        opacity: 0;
        color: #ffffff;
        border: none;
    }
    .imgShow{
        width:100px;
        height:100px;
        
    }
     .imgList:hover .layer {
    opacity: 1;
  }
  .view{
      cursor: pointer;
  }
</style>
