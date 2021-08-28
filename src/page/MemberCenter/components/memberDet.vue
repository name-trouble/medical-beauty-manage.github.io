<template>
    <div class="selCommon editRegister">

        <el-form :model="ruleForm" ref="ruleForm" :inline="true" label-width="85px" class="demo-ruleForm">
             <el-form-item label="会员编号：" class="form_item_mt0">
                 <span>{{ruleForm.num}}</span>
             </el-form-item>
            <el-form-item label="姓名：" class="form_item_mt0">
                <span>{{ruleForm.name}}</span>
            </el-form-item>
            <el-form-item label="联系电话："  required class="form_item_mt0">
                <span>{{ruleForm.phone}}</span>
            </el-form-item>
            <el-form-item label="邮箱："  class="form_item_mt0">
                <span>{{ruleForm.num}}</span>
            </el-form-item>
             <el-form-item label="会员类型："  class="form_item_mt0">
                <span>{{ruleForm.tag}}</span>
            </el-form-item>
            <el-form-item label="会员卡号：" class="form_item_mt0">
                <span>{{ruleForm.cardNO}}</span>
            </el-form-item>
            <el-form-item label="住址：" class="form_item_mt0">
                <span>{{ruleForm.area}}</span>
            </el-form-item>
            <el-form-item label="身份证号："  class="form_item_mt0" >
                <span>{{ruleForm.IdCard}}</span>
            </el-form-item>
            <el-form-item label="生日："  class="form_item_mt0">
                <span>{{ruleForm.date1}}</span>
            </el-form-item>
             <el-form-item label="年龄："  class="form_item_mt0" >
                 <span>{{ruleForm.age}}</span>
            </el-form-item>
            <el-form-item label="性别：" class="form_item_mt0">
                <span v-if="ruleForm.sex == 0">女</span>
                <span v-if="ruleForm.sex == 1">男</span>
            </el-form-item>
            <el-form-item label="推荐人："  class="form_item_mt0" >
                <span>{{ruleForm.recCode}}</span>
                <span v-if="mes.BranchTags">({{mes.BranchTags}})</span>
            </el-form-item>
            <el-form-item label="学历：" class="form_item_mt0">
                <span>{{ruleForm.education}}</span>
            </el-form-item>
            <el-form-item label="行业：" class="form_item_mt0">
                <span>{{ruleForm.industry}}</span>
            </el-form-item>
            <el-form-item label="家庭年收入：" class="form_item_mt0">
                <span>{{ruleForm.income}}</span>
            </el-form-item>
             <el-form-item label="备注：" class="form_item_mt1">
                <span>{{ruleForm.memo}}</span>
            </el-form-item>
        </el-form>
    </div>
</template>

<script type="text/ecmascript-6">
    import addr from "../../../../static/addresss.json"
    import { getCookie, delCookie } from '@/config/mUtils'
    import {GetBaseDataAll,UpdateMembers,GetBranchByKeywords,GetTagByPage} from "@/api/myData"
    export default {
        // name:"editRegister",
        props:{
            mes:{}
        },
        data () {
            return {
                loading1:false,
                options:[],
                province:[],
                city:[],
                area:[],
                eduList:[],//001
                industryList:[],//002
                tagsList:[],
                ruleForm: {
                    tag:"",
                    num:"",
                    phone:"",
                    province:"",
                    city:"",
                    area:"",
                    address:"",
                    email:"",
                    IdCard:"",
                    name: '',
                    date1: '',
                    recCode:"",
                    industry:"",
                    income:"",
                    sex:0,
                    education:"",
                    hospitalName:"",
                    hospitalCode:"",
                    cardNO:"",
                    referrerCode:"",
                    referrerName:"",
                    memo:"",
                    year:"",
                    mounth:"",
                    day:"",
                    age:"",
                },
                customerList:[],
                
            }
        },
        
        mounted(){
            // this.getBirthMes()
            this.copyWorth(this.mes)
            // this.province = addr.area
            this.GetBaseDataAll()
        },
        methods: {
//            获取基础信息
            async GetBaseDataAll(){
                try{
                    let res1 = await GetTagByPage({TypeCode:"6", pageIndex:1, pageSize:100, keywords:""})
                    this.tagsList = res1.data
                }catch(err){
                    console.log(err)
                }
            },
            copyWorth(data){
                
                for(var p in data){
                    if(data[p] == null){
                        data[p] = ""
                    }
                }
                if(data != ""){
                    this.ruleForm.num = data.Code
                    this.ruleForm.phone = data.PhoneNumber
                    
                    this.ruleForm.area = data.Province+data.City+data.Area+data.Address.split(",").join("")
                    this.ruleForm.memo = data.Memo
                    this.ruleForm.email = data.Email
                    this.ruleForm.IdCard = data.IDCard
                    this.ruleForm.name = data.MemberName
                    this.ruleForm.date1 = data.Birthday
                    this.ruleForm.recCode = data.ReferrerName
                    this.ruleForm.referrerName = data.ReferrerName,
                    this.ruleForm.referrerCode = data.ReferrerCode,
                    this.ruleForm.industry = data.ProfessionCode
                    this.ruleForm.income = data.Income
                    this.ruleForm.sex = Number(data.Sex)
                    this.ruleForm.education = data.Education
                    this.ruleForm.hospitalCode = data.HospitalCode?data.HospitalCode:""
                    this.ruleForm.tag = data.MemberTags
                    this.ruleForm.cardNO = data.CardNO
                    
                    this.ruleForm.year = data.Birthday.substring(0,4)
                    this.ruleForm.mounth = data.Birthday.substring(5,7)
                    this.ruleForm.day = data.Birthday.substring(8)
                    this.ruleForm.age = data.Birthday.length == 0?0:Number(this.ruleForm.year).red(new Date().getFullYear())
                }
            },
            // getAddr(addr,index){
            //     if(addr){
            //         let arr = addr.split(",")
            //         if(arr[index] == ""){
            //             return ""
            //         }else{
            //             return arr[index]
            //         }
            //     }
            // }
        },
        components: {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form_item_mt0{
    width:46%
}
.form_item_mt1{
    width:100%
}
</style>
