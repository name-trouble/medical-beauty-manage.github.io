<template>
    <div>
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="推荐人：" prop="name" class="form_item_mt10">
                <span>{{mes.RefrenceBranchName}}</span>
            </el-form-item>
            <el-form-item label="推荐人编号：" prop="region" class="form_item_mt10">
                <span>{{mes.RefrenceBranchCode}}</span>
            </el-form-item>
            <el-form-item label="支付信息：" prop="region" class="form_item_mt10"></el-form-item>
            <el-form-item label=" " prop="region" class="form_item_mt10" label-width="30px">
                <el-table :data="payInfoList" border height="250" >
                    <el-table-column prop="payType" label="支付方式" min-width="90">
                       <template slot-scope="scope">
                           {{scope.row.payType|filterFun}}
                       </template>
                    </el-table-column>
                    <el-table-column prop="commissionDate" label="返款日期" min-width="90"></el-table-column>
                    <el-table-column prop="ticketsCode" label="券号" min-width="100"></el-table-column>
                    <!-- <el-table-column prop="SalePrice" label="购买价" width="110"></el-table-column> -->
                    <el-table-column prop="worthAmount" label="支付金额" min-width="90">
                        <template slot-scope="scope">
                            <span v-if="!scope.row.edit">{{scope.row.worthAmount}}</span>
                            <el-input-number v-model="scope.row.editNum" :controls="false" :min="0" v-if="scope.row.edit" style="width:90%"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column prop="pointAmount" label="使用积分" min-width="90">
                        <template slot-scope="scope">
                            <span v-if="!scope.row.edit">{{scope.row.pointAmount}}</span>
                            <el-input-number v-model="scope.row.JF" :controls="false" :min="0" v-if="scope.row.edit" style="width:90%"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column prop="memo" label="备注" min-width="100" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="IsEffective" label="操作" width="120">
                        <template slot-scope="scope">
                            <el-button type="primary" size="small" icon="edit" v-if="mes.edit&&!scope.row.edit" @click="edit(scope.$index)">编辑</el-button>
                            <el-button type="primary" size="small" v-if="scope.row.edit" @click="editSure(scope.$index)">确认</el-button>
                            <el-button size="small" v-if="scope.row.edit" @click="cancel(scope.$index)">取消</el-button>
                            <el-button type="warning" size="small" icon="delete" v-if="!mes.edit" @click="payInfoList.splice(scope.$index, 1)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item label="" class="form_item_mt10" label-width="20px" v-if="!mes.edit">
               <el-button type="success" size="small" @click="addPay">添加支付信息</el-button>
            </el-form-item>
            <el-form-item label="上传凭证：" class="form_item_mt10">
                <upload @onSuccess="onSuccess3" :fileList="fileListImg3" @onRemove="onRemove3" @imgView="imgView" :action="action" style="width:660px"></upload>
            </el-form-item>
        </el-form>
        <div class="form_footer">
            <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
        </div>
         <el-dialog title="支付信息" :visible.sync="payDialog" size="" top="10%" :modal="false">
             <el-form :model="payForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width:400px">
                <el-form-item label="支付方式：" prop="name" class="form_item_mt10">
                   <el-select v-model="payForm.payType">
                       <el-option label="卡券" value="008"></el-option>
                       <el-option label="套餐" value="010"></el-option>
                       <el-option label="积分" value="009"></el-option>
                   </el-select>
                </el-form-item>
               <el-form-item label="返款日期：" prop="type" class="form_item_mt10">
                    <el-select v-model="year" placeholder="选择年份" style="width:100px;float:left">
                        <el-option v-for="(item,index) in yearList" :key="index" :label="item" :value="item"></el-option>
                    </el-select>
                    <el-select v-model="month" placeholder="选择月份" style="width:100px;float:left">
                        <el-option v-for="(item,index) in monthList" :key="index" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="积分：" class="form_item_mt10" v-if="payForm.payType == '009'">
                    <el-col :span="24">
                        <el-form-item>
                            <el-input-number v-model="payForm.pointAmount" :controls="false" :min="0" :max="jifen"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item >
                            <span> 账户积分余额：{{jifen}}</span>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="卡券：" class="form_item_mt10"  v-if="payForm.payType == '008'">
                        <el-form-item class="form_item_mt10">
                            <el-autocomplete v-model="payForm.ticketsCode" :fetch-suggestions="queryPro" placeholder="请输入券号" style="width:300px;" :trigger-on-focus="false" @select="selectTick">
                                <template v-slot="{item}">
                                    <my-item-ticket :item="item"></my-item-ticket>
                                </template>
                            </el-autocomplete>
                        </el-form-item>
                </el-form-item>
                <el-form-item label="套餐：" class="form_item_mt10"  v-if="payForm.payType == '010'">
                        <el-form-item class="form_item_mt10">
                            <el-select v-model="ticket" @change="packChange">
                                <el-option v-for="(item,index) in pagelist" :key="index" :label="item.name" :value="item"></el-option>
                            </el-select>
                        </el-form-item>
                </el-form-item>
                <el-form-item label=" 抵扣金额：" class="form_item_mt10">
                        <el-input-number v-model="payForm.worthAmount" :controls="false" :min="0" :max="maxAmount"></el-input-number>
                </el-form-item>
                <el-form-item label=" 备注：" class="form_item_mt10" >
                        <el-input type="textarea" v-model="payForm.memo" :rows="3"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="paySure" :loading="saveLoading">确定</el-button>
                    <el-button type="" @click="payCancel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import upload from '@/components/upload'
import { xmxUrl, baseImgPath } from '@/config/env'
import { imgApi, acceptImage } from '@/config/common'
let uploadUrl = xmxUrl + imgApi + '?op=cashout'
    import { GetUserAccountByCode ,getTicketsInfoByTicketCode,GetPackageByCode,AddCashOut,GetCashOutList,UpdateCashOut,DelImg,ModifyCashOutImgUrl} from "@/api/myData"
    import '@/style/yqCom.less'
    import Vue from 'vue'
    import { getCookie } from '@/config/mUtils'
    Vue.component('my-item-ticket', {
        functional: true,
        render: function(h, ctx) {
            var item = ctx.props.item;

            return h('div', ctx.data, [
                h('p', { attrs: { class: 'name' } }, ["券名称:"+item.TickName]),
                h('p', { attrs: { class: 'name' } }, ["券号:"+item.value]),
                h('p', { attrs: { class: 'name' } }, ["券面值:"+item.FaceValue]),
                h('p', { attrs: { class: 'name' } }, ["券类型:"+item.Type]),
                h('p', { attrs: { class: 'name' } }, ["折扣:"+item.discount]),
            ]);
        },
        props: {
            item: { type: Object, required: true }
        }
    });
    export default {
        components: { },
        props:{
            mes:{}
        },
        data() {
            return {
                action:uploadUrl,
                baseImgPath,
                date:new Date(),
                saveLoading : false,
                ruleForm:{
                    jifen:"",
                    ticket:"",
                    amount:"",
                },
                jifen:0,
                payDialog:false,
                payForm:{
                    payType:"",
                    ticketsCode:"",
                    worthAmount:"",
                    memo:"",
                    date:"",
                    pointAmount:"",
                },
                year:new Date().getFullYear(),
                month:"",
                yearList:[],
                monthList:[],
                ticket:{},
                payInfoList:[],
                pagelist:[],//卡券包
                maxAmount:0,
                cashout:"",
                img:{
                    typeId:1,
                    refCode:'',
                    imgUrl:'',
                    createBy:getCookie("userName"),
                    createUserId:getCookie("userId"),
                },
                fileListImg3:[],
            }
        },
        watch:{
            "payForm.payType":{
                handler(curVal,oldVal){

                    this.payForm.worthAmount = 0
                    this.payForm.ticketsCode = ""
                    this.payForm.ticketType = ""
                    this.payForm.memo = ""
                },
                deep:true
            }
        },
         filters:{
            filterFun(val){
               switch(val){
                    case '008': return "卡券"; break;
                    case '009': return "积分"; break;
                    case '010': return "套餐"; break;
                }
            }
        },
        mounted() {

            this.maxAmount = this.mes.CommissionAmount
            this.getType()
            this.getBaseDate()
        },
        methods: {
            imgView(url){
                this.$emit("photoShow",url)
            },
            onSuccess3(fileList){
                this.fileListImg3 = fileList
            },
            onRemove3(file,fileList){
                this.DelImg(file.url)
                this.fileListImg3 = fileList
            },
            // 删除原图片/视频
            async DelImg(filepath){
                let res = await DelImg({filepath:filepath})
                if(!res.status){
                    this.$message({message: '原图片删除失败！'+res.errorMessage,type: 'warning'});
                }
            },
            urlSplit(data){

                data.forEach(ele=>{//转换成upoload组件需要的格式
                    ele.localUrl = baseImgPath+ele.imgUrl
                    ele.url = ele.imgUrl
                    this.fileListImg3.push(ele)
                })
            },
            edit(index){
                this.payInfoList[index].edit = 1
                this.payInfoList[index].editNum = JSON.parse(JSON.stringify(this.payInfoList[index].worthAmount))
                this.payInfoList[index].JF = JSON.parse(JSON.stringify(this.payInfoList[index].pointAmount))
                this.payInfoList.push()
            },
            async editSure(index){
                let data = this.payInfoList[index]
                data.modifiedUserId = getCookie("userId")
                data.modifiedBy = getCookie("userName")
                data.worthAmount = data.editNum
                data.pointAmount = data.JF
                let res = await UpdateCashOut(data)
                if(res.status){
                    this.$message({ type: 'success', message: '修改成功!' })
                    this.payInfoList[index].edit = 0
                    this.payInfoList[index].worthAmount= JSON.parse(JSON.stringify(this.payInfoList[index].editNum))
                    this.payInfoList[index].pointAmount= JSON.parse(JSON.stringify(this.payInfoList[index].JF))
                    this.payInfoList.push()
                }else{
                    this.$message({ type: 'error', message: '修改失败!' })
                }
            },
            cancel(index){
                this.payInfoList[index].edit = 0
                this.payInfoList.push()
            },
            getBaseDate(){
                this.monthList = []
                this.yearList = [new Date().getFullYear()+1,new Date().getFullYear(),new Date().getFullYear()-1,new Date().getFullYear()-2]
                for(let i = 1 ;i<13;i++){
                    if(i<10){
                        this.monthList.push("0"+i)
                    }else{
                        this.monthList.push(i)
                    }
                }
                let m = new Date().getMonth()+1
                if(m>9){
                    this.month = m
                }else{
                    this.month = "0"+m
                }
            },
            dateChange(val){
                if(val){
                    this.payForm.date = val
                }else{
                    this.payForm.date = ""
                }
            },
            async AddCashOut(params){
                this.saveLoading = true
                let res =await AddCashOut(params)
                if(res.status){
                    this.$message({ type: 'success', message: '返款成功!' })
                    this.$emit("close",true)
                }else{
                    this.$message({ type: 'error', message: '返款失败!' })
                }
                this.saveLoading = false
            },

             //查找券  下拉补全
            async queryPro(queryString, cb) {
                this.projectList = []
                // this.initProject()
                if (queryString !== '' && queryString != undefined) {
                    let res = await getTicketsInfoByTicketCode({
                        "ticketcode":queryString,"paytype":this.payForm.payType
                    })
                    this.getTick(res)
                }
                let _this = this
                clearTimeout(this.timeout)
                this.timeout = setTimeout(() => {
                    cb(_this.tickList)
                }, 100)
            },

            getTick(res){
                // let res = await getTicketsInfoByTicketCode({
                //     "ticketcode":queryString,"paytype":this.payForm.payType
                // })

                let arr = []
                if (res instanceof Array && res.length > 0) {
                    for (let item of res) {
                        item.Type = this.getTypeName(item.TicketsType)
                        item.FaceValue = item["FaceValue"]?item["FaceValue"]:""
                        item.value = item['TicketsCode']
                        item.discount = item.Discount?item.Discount+"%":""
                        arr.push(item)
                    }
                }
                this.tickList = arr

            },



            getTypeName(type){
                switch(type){
                    case 1: return "折扣券"; break;
                    case 2: return "现金券"; break;
                    case 3: return "门票"; break;
                }
            },
//点击获取 券信息  Oject
            selectTick(item){

                // this.ticekInfo = res
                this.payForm.ticketsCode = item.value
                // this.payForm.ticketType = item.TicketsType
                if (item.TicketsType == 1) {

                    this.payForm.worthAmount = this.mes.OrderAmount * (100-item.Discount) / 100 // 折扣券
                }else{
                      this.payForm.worthAmount = item.FaceValue + ''  //现金券
                }
            },
            selectPack(item){

            },

            packChange(){

                let item = this.ticket
                 this.payForm.ticketsCode = item.value
                 if (item.TicketsType == 1) {

                    this.payForm.worthAmount = this.mes.OrderAmount * (100-item.Discount) / 100 // 折扣券
                }else{
                      this.payForm.worthAmount = item.FaceValue + ''  //现金券
                }
                // this.payForm.ticketsCode
            },

            async getType(){
                this.pagelist = []
                let list = await GetPackageByCode(this.mes.RefrenceBranchCode)
                for(let item of list){
                    item.value = item.TickInfoCode
                    item.name = item.TickName
                    this.pagelist.push(item)
                }
                let res = await GetUserAccountByCode({branchcode:this.mes.RefrenceBranchCode})
                this.jifen = res.RemainSystemPoints

                if(this.mes.edit){
                    let back = await GetCashOutList({fxcode:this.mes.FxCode})
                    this.payInfoList = back.data.orderCashOutList

                    this.urlSplit(back.data.commonPhotoList)
                }
            },

            submitForm(formName) {
                if(this.mes.edit){
                    this.ModifyCashOutImgUrl({
                        "commonPhotoList": this.getImgMes(this.fileListImg3),
                        // "code": ""
                    })
                }else{
                    this.AddCashOut({
                        jsonStr:JSON.stringify(this.payInfoList),
                        // code:"",
                        commonPhotoList:this.getImgMes(this.fileListImg3),
                    })
                }
            },
            async ModifyCashOutImgUrl(params){
                this.saveLoading = true
                let res = await ModifyCashOutImgUrl(params)
                if(res.status){
                    this.$message({ type: 'success', message: '修改成功!' })
                    this.$emit("close",true)
                }else{
                    this.$message({ type: 'error', message: '修改失败!' })
                }
                this.saveLoading = false
            },
            getImgMes(data){
                let arr = []
                data.forEach(ele=>{
                    if(ele.id){
                        arr.push(ele)
                    }else{
                        arr.push({
                            typeId:2,
                            refCode:this.mes.FxCode,
                            imgUrl:ele.url,
                            createBy:getCookie("userName"),
                            createUserId:getCookie("userId"),
                        })
                    }
                })
                return JSON.stringify(arr)
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                 this.$emit("close",false)
            },
            addPay(){
                this.getBaseDate()
                this.payDialog = true
            },
            paySure(){
                let obj = {
                    payType:this.payForm.payType,
                    ticketsCode:this.payForm.ticketsCode,
                    worthAmount:this.payForm.worthAmount,
                    memo:this.payForm.memo,
                    commissionDate:this.year+'-'+this.month,
                    createBy:getCookie("userName"),
                    createUserId:getCookie("userId"),
                    fxCode:this.mes.FxCode,
                    branchcode:this.mes.RefrenceBranchCode,
                    branchName:this.mes.RefrenceBranchName,
                }
                if(this.payForm.payType == '009'){
                    obj.pointAmount = this.payForm.pointAmount
                }
                this.payInfoList.push(obj)
                this.payCancel()
            },
            payCancel(){
                for(var p in this.payForm){
                    this.payForm[p] = ""
                }
                this.payDialog = false
            }
        },
        components:{
            upload,
        }
    }
</script>

<style scoped>
.form_footer{
    text-align: center
}

</style>


