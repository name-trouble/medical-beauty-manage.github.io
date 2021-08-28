<template>
    <div class="edit">
        <el-form :model="form" style="width: 400px" ref="form">
            <el-form-item label="" class="form_item_mt10">
                <span style="font-weight: bold;font-size: 14px">活动信息</span>
            </el-form-item>
            <el-form-item label="红包名称：" class="form_item_mt10" prop="name" label-width="90px">
                <el-input v-model="form.name" placeholder="" class="form_item_ipt_260"></el-input>
            </el-form-item>
            <el-form-item label="生效时间：" class="form_item_mt10" prop="date" label-width="90px">
               <el-date-picker v-model="date" type="datetimerange" placeholder="选择日期范围" @change="dateForm"
                                class="form_item_ipt_260"></el-date-picker>

                <!-- <dateLink @getDate="getDate" :date="date"></dateLink> -->
            </el-form-item>
            <el-form-item label="发行数量：" class="form_item_mt10" prop="totalCount" label-width="90px">
                <el-input-number v-model="form.totalCount" :min="0" :controls="false"
                                 class="form_item_ipt_60"></el-input-number>
                <span style="float: left">&nbsp;张</span>
            </el-form-item>
            <el-form-item label="" class="form_item_mt10">
                <span style="font-weight: bold;font-size: 14px">红包设置</span>
            </el-form-item>
            <el-form-item label="红包金额：" class="form_item_mt10" label-width="90px">
                <!-- <el-radio class="radio" v-model="form.type" label="0" style="float: left;margin-right: 5px">固定金额</el-radio>
                <el-input-number v-model="form.amount" :min="0" :controls="false"
                                 class="form_item_ipt_60" style="float: left"></el-input-number>
                <el-radio class="radio" v-model="form.type" label="1">随机金额</el-radio> -->
                <div style="float:none;height:40px;">
                    <el-radio class="radio" v-model="form.type" label="0" style="">固定金额</el-radio>
                    <el-input-number v-model="form.amount" :min="0" :controls="false"
                                 class="form_item_ipt_60" style="float: left"></el-input-number>
                </div>
                <div style="float:none;height:40px;">
                    <el-radio class="radio" v-model="form.type" label="1" >随机金额</el-radio>
                    <el-input-number v-model="form.amoutStart" :controls="false" :min=0 class="form_item_ipt_60" style="float:left;"></el-input-number>
                        <div style="float:left;width:20px;text-align:center">~</div>
                    <el-input-number v-model="form.amoutEnd" :controls="false" :min=0 class="form_item_ipt_60" style="float:left"></el-input-number>
                </div>
            </el-form-item>
            <el-form-item label="每人限：" class="form_item_mt10" prop="limitCount" label-width="90px">
                <el-input-number v-model="form.limitCount" :min="0" :controls="false"
                                 class="form_item_ipt_60"></el-input-number>
                <span class="form_item_mes"> 张（默认0表示不限）</span>
            </el-form-item>
            <el-form-item label="使用门槛：" class="form_item_mt10" prop="limitCount" label-width="90px">
                <span style="float: left;margin-right: 5px;line-height: 36px">满</span>
                <el-input-number v-model="form.limitAmount" :min="0" :controls="false"
                                 class="form_item_ipt_60" style="float: left"></el-input-number>
                <span class="form_item_mes"> 元可使用（默认0表示不限）</span>
            </el-form-item>
            <el-form-item label="" class="form_item_mt10">
                <span style="font-weight: bold;font-size: 14px">选择活动范围</span>
            </el-form-item>
            <el-form-item label="适用用户：" class="form_item_mt10"  label-width="90px">
                <el-radio class="radio" v-model="form.users" label="1">全部</el-radio>
                <el-radio class="radio" v-model="form.users" label="2">部分</el-radio>
                <div v-if="form.users == '2'">
                    <!-- <el-checkbox-group v-model="checkList">
                        <el-checkbox v-for="(item,index) in userList" :key="index" :label="item.Code">{{item.BranchGradeName}}</el-checkbox>
                    </el-checkbox-group> -->
                    <el-button type="primary" @click="openSelDialog" size="small">设置用户条件</el-button>
                </div>
            </el-form-item>
            <!-- <el-form-item label="适用栏目：" class="form_item_mt10" prop="limitCount" label-width="90px">
                <el-radio class="radio" v-model="form.CatalogType" label="1">医美</el-radio>
                <el-radio class="radio" v-model="form.CatalogType" label="2">商城</el-radio>
            </el-form-item> -->
            <el-form-item label="适用商品：" class="form_item_mt10" prop="limitCount" label-width="90px">
                <el-radio class="radio" v-model="form.IsAllGoods" label="1">全部</el-radio>
                <el-radio class="radio" v-model="form.IsAllGoods" label="2">部分</el-radio>
                <span v-if="form.IsAllGoods == '2'">
                     <el-button @click="add" type="text">+添加项目</el-button>
                <span class="form_item_mes"> 已选择{{selprojectList.length}}个</span> <br/>
                </span>
                <div style="max-height:300px;overflow:auto">
                     <el-tag v-for="(item,index) in selprojectList" type="primary" class="tag" :title="item.Name"
                        :key="index">{{item.Name}}
                    </el-tag>
                </div>
            </el-form-item>
            <el-form-item label="" class="form_item_mt10">
                <span style="font-weight: bold;font-size: 14px">推广设置</span>
            </el-form-item>
            <el-form-item label="推广方式：" class="form_item_mt10" label-width="90px">
                <el-radio class="radio" v-model="form.channel" label="1">用户领取</el-radio>
                <el-radio class="radio" v-model="form.channel" label="2">系统发放</el-radio>
            </el-form-item>
            <!-- <el-form-item label="分享链接：" class="form_item_mt10" label-width="90px">
                <el-checkbox v-model="form.checked">允许分型链接</el-checkbox>
            </el-form-item> -->
        </el-form>
        <div class="footer_ope">
            <el-button @click="save" type="primary" :loading="saveLoading">保存</el-button>
            <el-button @click="cancel">取消</el-button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import { getCookie } from '@/config/mUtils'
    import dateLink from "@/page/APPCenter/components/DateLinkage.vue"
    import { getProjectCount, getProjectAll , AddRedpacket,GetBranchGradeAll,GetRedpacket,EditRedpacket} from '@/api/myData'
    export default {
        // name: "edit",
        props: {
            selectProject: {
                type: Array
            },
            ProjectId:{
                type: Array
            },
            editMes:{},
        },
        data () {
            return {
                saveLoading:false,
                goodsMes:[],
                date:"",
                radio: "1",
                radio1: "100",
                checkList: [],
                userList:[],
                goodsIds:[],
                selprojectList:[],
                form: {
                    amount:"",
                    name:"",
                    startDate: "",
                    endDate: "",
                    checked: true,
                    channel:"",
                    CatalogType:"1",
                    limitAmount:"",
                    totalcount:1,
                    users:"",
                    type:"",
                    ProjectId:[],
                    limitCount:"",
                    limitUser:"",
                    IsAllGoods:"1",
                    amoutStart:"",
                    amoutEnd:"",
                },
                rule:[

                ]
            }
        },
        watch:{
          "selectProject":{
              handler(curVal,oldVal){
                  this.selprojectList = curVal
                  this.goodsIds = this.getArray(curVal)
              },
              deep:true
            },
            'form.type':{
                handler(curVal,oldVal){
                    if(curVal == "0"){//0固定金额1随机
                        this.form.amoutEnd = 0
                        this.form.amoutStart = 0
                    }else{
                        this.form.amount = 0
                    }
                },
                deep:true
            }
        },
        mounted(){
            this.copyWorth(this.editMes)
            // this.GetBranchGradeAll()
        },
        methods: {
            openSelDialog(){
                this.$emit('openSelDialog')
            },
            // async GetBranchGradeAll(){
            //     try{
            //         let res = await GetBranchGradeAll()
            //         this.goodsMes = await GetRedpacket({id:this.editMes.id})
            //         this.goodsIds = this.goodsMes.data.goodsIds
            //         this.userList = res.concat([{BranchGradeName:"普通会员",Code:"1"},{BranchGradeName:"认证会员",Code:"2"}])
            //         this.getGoods()
            //     }catch(err){
            //         console.log(err)
            //     }
            // },
            async EditRedpacket(params){
                try{
                    this.saveLoading = true
                    let res = await EditRedpacket(params)
                    if (res.status == true) {
                        this.$message({type: 'success', message: '编辑成功!'})
                        this.$emit("closeAdd")
                        this.$refs['form'].resetFields();
                    } else {
                        this.$message({type: 'error', message: '编辑失败!'})
                    }
                    this.saveLoading = false
                }catch(err){
                    console.log(err)
                    this.$message({ type: 'error', message: '编辑失败!' })
                }
            },
            async getGoods(){
                try{
                    //                1项目 2商城
                    // if(this.editMes.catalogType == 1){
                        this.projectList = await getProjectAll()
                    // }else{
                    //     this.projectList = await getProjectAll({IsMall: 1})
                    // }
                    if(this.projectList.length!=0){
                        let arr = this.goodsIds
                        this.projectList.forEach(row=>{
                            for(let i=0;i<arr.length;i++){
                                if(row.Code == arr[i]){
                                    this.selprojectList.push(row)
                                }
                            }
                        })
                    }
                }catch(err){
                    console.log(err)
                }

            },
            dateForm(val){
                if(val){
                    this.form.startDate = val.substring(0,19)
                    this.form.endDate = val.substring(22)
                }else{
                    this.form.startDate = ""
                    this.form.endDate = ""
                }
            },
            save(){
                // if(this.selprojectList.length!=0){
                //     this.goodsIds = this.getArray(this.selectProject)
                // }
               
                this.EditRedpacket({
                    'id': this.editMes.id,
                    "code": this.editMes.Code,
                    name: this.form.name,//名字
                    startTime: this.form.startDate,//开始时间
                    endTime: this.form.endDate,//结束时间
                    amounts: this.form.amount,//红包固定金额
                    minAmounts:this.form.amoutStart,
                    maxAmounts:this.form.amoutEnd,
                    limitTotals: this.form.totalCount,//发行总数量
                    targetGoodsCodes:this.goodsIds.join(","),
                    limitAmounts: this.form.limitAmount,//使用门槛
                    limitUsers: this.form.limitCount,//每人限制个数
                    targetUserRuleId:this.editMes.targetUserRuleId?this.editMes.targetUserRuleId:'',
                    sendMode:this.form.channel,
                    "isDeleted": this.editMes.isDeleted,
                    "submitUserId": getCookie("userId"),
                    "submitUserName":  getCookie("userName"),
                })
            },
            cancel(){
                this.$emit("closeAdd",'cancel')
            },
            add(){
                this.$emit("selectP",[this.form.CatalogType,this.goodsIds])
            },
            getArray(data){
                let arr = []
                data.forEach(row=>{
                    arr.push(row.Code)
                })
                return arr
            },
            copyWorth(data){
                
                this.date = [new Date(data.startTime.substring(0,4),Number(data.startTime.substring(5,7))-1,data.startTime.substring(8,10),data.startTime.substring(11,13),data.startTime.substring(14,16),data.startTime.substring(17,19)),
                new Date(data.endTime.substring(0,4),Number(data.endTime.substring(5,7))-1,data.endTime.substring(8,10),data.endTime.substring(11,13),data.endTime.substring(14,16),data.endTime.substring(17,19))]
                this.form.amount = data.amounts
                this.form.amoutStart = data.minAmounts
                this.form.amoutEnd = data.maxAmounts
                this.form.totalCount = data.limitTotals
                this.form.name = data.name
                this.form.type = data.amounts == 0?"1":"0"
                this.form.limitCount = data.limitUsers
                this.form.limitAmount = data.limitAmounts
                this.form.users = data.targetUserRuleId?"2":"1"
                this.form.channel = data.sendMode+''
                this.form.IsAllGoods = data.targetGoodsCodes?"2":"1"
                
                this.goodsIds = data.targetGoodsCodes?data.targetGoodsCodes.split(","):[]
                // this.form.checked = data.isAllowShare
                // this.form.channel = data.channel+""
                // this.form.CatalogType = data.catalogType+""
                // this.form.limitAmount = data.limitAmount
                // this.form.limitCount = data.limitCount
                // this.form.totalCount = data.totalCount
                // this.form.type = data.type+""
                // this.form.ProjectId = data.amount
                // // setTimeout(()=>{
                // //     this.checkList = data.limitUser.split("|")
                // // },100)
                // this.form.IsAllGoods = data.isAllGoods+""
                this.getGoods()
            },
            getDate(val1,val2){
                this.form.startDate = val1
                this.form.endDate = val2
            },
        },
        components: {
            dateLink
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .form_item_ipt_260 {
        width: 280px;
    }

    .form_item_ipt_60 {
        width: 80px;
    }

    .form_item_mt10 {
        width: 800px;
    }

    .tag {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 160px;
        margin: 5px 5px 0 0;
        float: left;
        cursor: pointer;
    }
    .form_item_mes{
        float: left;
        margin-left: 5px;
    }
    .radio{
        float: left;margin-right: 5px
    }
</style>
