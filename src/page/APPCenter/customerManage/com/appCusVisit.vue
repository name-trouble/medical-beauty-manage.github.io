<template>
    <div>
        <div class="mes">
            <div class="mes_left">
                <div class="column">
                    <span class="wt150">姓名：{{customer.realname}}</span>
                    <span class="wt150">年龄：{{customer.age}}</span>
                    <span class="wt150">编号：{{customer.code}}</span>
                </div>
                <div class="column">
                    <span class="wt150">性别：{{customer.sex}}</span>
                    <span class="wt150">生日：{{customer.birthday}}</span>
                    <span class="wt200">联系方式：{{customer.mobile}}</span>
                </div>
                <div class="column">
                    <span class="wt300">推荐人：{{customer.leastBranchName}}[{{customer.leastBranchCode}}]</span>
                    <span class="wt200">积分余额：{{customer.pointsBalances}}</span>
                </div>
                <div class="column">
                    <span>兴趣部位：{{customer.gxqbw}}</span>
                </div>
            </div>
            <div class="mes_right" v-if="mes.type">
                <div class="column">
                    <span>回访内容：{{customer.content}}</span>
                </div>
                <div class="column">
                    <span class="ipt_lab">回访记录：</span>
                    <span style="display:inline-block"><el-input type="textarea" v-model="newRecord" :rows="4" style="width:300px;"></el-input></span>
                </div>
                 <div class="column">
                    <span class="ipt_lab">是否满意：</span>
                    <span>
                        <el-radio class="radio" v-model="Satisfied" label="1">满意</el-radio>
                        <el-radio class="radio" v-model="Satisfied" label="0">不满意</el-radio>
                    </span>
                     <span v-if="Satisfied == 0">
                         <el-select v-model="kf">
                            <el-option v-for="(item,index) in kfList" :key="index" :label="item.text" :value="item.name+'|'+item.code"></el-option>
                        </el-select>
                    </span>
                </div>
                 <div class="column" style="margin-top:10px">
                    <el-button type="primary" @click="save">保存</el-button>
                    <el-button type="primary" @click="creat">新建回访</el-button>
                    <el-button type="" @click="cancel">取消</el-button>
                    <el-button type="success" @click="openSend" :disabled="!customer.mobile">发送短信</el-button>
                </div>
            </div>
            <div style="clear: both;"></div>
        </div>
        <ul style="margin-top:20px">
            <li class="tabs"  v-for="(item,index) in list" :class="{'active':currentIndex == item.state}" :key="index" @click="select(index,item.state)">{{item.name}}</li>
        </ul>
        <!-- 回访记录 -->
         <el-table :data="tableData" border style="width: 100%;margin-top:20px" v-show="currentIndex == 0" class="min_table4" max-height="500">
            <el-table-column prop="createBy" label="回访人" min-width="150"></el-table-column>
            <el-table-column prop="content" label="回访内容" min-width="180" show-overflow-tooltip></el-table-column>
            <el-table-column prop="result" label="回访结果"  min-width="150" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="factDate" label="回访时间" min-width="120"></el-table-column>
            <el-table-column prop="planDate" label="回访设置时间" min-width="120">
                 <template slot-scope="scope">
                    <span v-if="scope.row.planDate">{{scope.row.planDate.substring(0,10)}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="isVisited" label="回访状态" min-width="120">
                <template slot-scope="scope">
                    <el-tag type="danger" v-if="scope.row.isVisited == 0||scope.row.isVisited == null">待回访</el-tag>
                    <el-tag type="success" v-if="scope.row.isVisited == 1">已回访</el-tag>
                </template>
            </el-table-column>
        </el-table>
<!-- 订单内容 -->
         <el-table :data="tableData" border style="width: 100%;margin-top:20px"  v-show="currentIndex == 1" class="min_table smt" max-height="500">
            <el-table-column prop="orderCode" label="订单编号" min-width="100"> </el-table-column>
            <el-table-column prop="createDate" label="订单日期" min-width="100">
                <template slot-scope="scope">
                    <span v-if="scope.row.createDate">{{scope.row.createDate.substring(0,10)}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="projectName" label="订单类型" min-width="100">
                <template slot-scope="scope">
                    <span v-if="scope.row.activityTypes == 1">限时秒杀</span>
                    <span v-if="scope.row.activityTypes == 2">体验专区</span>
                    <span v-if="scope.row.activityTypes == 3">特惠项目</span>
                    <span v-if="scope.row.activityTypes == 4">量贩专区</span>
                    <span v-if="scope.row.activityTypes == null">原价</span>
                </template>
            </el-table-column>
            <el-table-column prop="projectName" label="来源" min-width="100"> </el-table-column>
            <el-table-column prop="goodsName" label="项目" min-width="150" show-overflow-tooltip> </el-table-column>
            <!-- <el-table-column  prop="onlinePrice" label="原价" min-width="90"></el-table-column> -->
            <el-table-column  prop="price" label="订单价" min-width="90"></el-table-column>
            <el-table-column  prop="deposit" label="订金" min-width="90"></el-table-column>
            <el-table-column  prop="status" label="订单状态" min-width="90">
                <template slot-scope="scope">
                        <el-tag type="gray" v-if="scope.row.status == 0">待付款</el-tag>
                        <el-tag type="success" v-if="scope.row.status == 1">已付款</el-tag>
                        <el-tag type="success" v-if="scope.row.status == 2">已确认</el-tag>
                        <el-tag type="success" v-if="scope.row.status == 3">已评价</el-tag>
                        <el-tag type="danger" v-if="scope.row.status == 4">已关闭</el-tag>
                        <el-tag type="danger" v-if="scope.row.status == 5">已退款</el-tag>
                        <el-tag type="danger" v-if="scope.row.status == 6">已取消</el-tag>
                </template>
            </el-table-column>
        </el-table>
        <!-- 积分情况 -->
        <el-table :data="tableData" border style="width: 100%;margin-top:20px" v-show="currentIndex == 2"
         class="min_table smt" max-height="500">
            <el-table-column prop="id" label="编号" min-width="120"></el-table-column>
            <el-table-column prop="description" label="内容" min-width="250" show-overflow-tooltip></el-table-column>
            <el-table-column prop="quantity" label="积分" min-width="160"></el-table-column>
            <el-table-column prop="receiveTime" label="时间" min-width="100" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.receiveTime">{{scope.row.receiveTime.substring(0,10)}}</span>
                </template>
            </el-table-column>
        </el-table> 

        <el-dialog ref="pay" title="新建回访" :visible.sync="visit" top="10%" size="" :modal="false">
            <el-form :model="visitForm"  ref="visitForm" label-width="100px" class="demo-ruleForm" style="width:400px">
                <el-form-item label="回访时间：" class="form_item_mt10">
                    <el-date-picker type="date" placeholder="选择日期" v-model="visitForm.dateInit" style="width: 220px;"></el-date-picker>
                </el-form-item>
                <el-form-item label="回访内容：" class="form_item_mt10">
                    <el-input type="textarea" v-model="visitForm.content" :rows="4" ></el-input>
                </el-form-item>
            </el-form>
            <div class="form_footer">
                <el-button type="primary" @click="submitForm('visitForm')" :loading="saveLoading">提交</el-button>
                <el-button @click="resetForm('visitForm')">取消</el-button>
            </div>
        </el-dialog>
        <!-- <el-dialog title="手术照片" :visible.sync="dialogFormVisible" :modal="false" size="">
            <el-form label-width="100px" style="width:640px;max-height:480px;overflow-y: auto;">
                <el-form-item label="术前：" class="form_item_mt0">
                    <span class="imgContainer" v-for="(item,index) in fileList1" :key="index">
                        <img width="100px" :src="item.url" alt="">
                    </span>
                </el-form-item>
                <el-form-item label="术中：" class="form_item_mt0">
                    <span class="imgContainer" v-for="(item,index) in fileList2" :key="index">
                        <img width="100px" :src="item.url" alt="">
                    </span>
                </el-form-item>
                <el-form-item label="术后：" class="form_item_mt0">
                    <span class="imgContainer" v-for="(item,index) in fileList3" :key="index">
                        <img width="100px" :src="item.url" alt="">
                    </span>
                </el-form-item>
            </el-form>
        </el-dialog> -->
        <el-dialog title="发送短信" :visible.sync="messageDialog" :modal="false" size="">
            <el-form label-width="100px" style="width:500px;max-height:480px;overflow-y: auto;">
                <el-form-item label="收件人：" class="form_item_mt0">
                    <el-input v-model="customer.MemberName" style="width:200px;"></el-input>
                </el-form-item>
                <el-form-item label="电话：" class="form_item_mt0">
                    <el-input v-model="visitForm.mobile" style="width:200px;"></el-input>
                </el-form-item>
                <el-form-item label="信息预览：" class="form_item_mt10">
                    <div>{{visitForm.message}}</div>
                    <!-- <el-input  type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="visitForm.message"></el-input> -->
                </el-form-item>
            </el-form>
            <div class="form_footer">
                <el-button type="primary" @click="sureSend('visitForm')" :loading="saveLoading">发送</el-button>
                <el-button @click="cancelSend('visitForm')">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {GetOrderCommandByCus2,GetUserAllByKeywords,SendMsg,GetVisitByCus,UpdateVisit,GetOnlinePointsRecords,appVisitAdd,GetListByUserId,updateAppVisit,
    getUserById,GetSubOrdersList} from "@/api/myData"
    import { getCookie } from "@/config/mUtils";
    var _this 
    export default {
        props:{
            mes:{
                type:Object
            }
        },
        data() {
            return {
                messageDialog:false,
                dialogFormVisible:false,
                saveLoading:false,
                fileList1:[],
                fileList2:[],
                fileList3:[],
                newRecord:"",
                Satisfied:"1",
                kf:"",
                visitForm:{
                    dateInit:"",
                    date:"",
                    content:"",
                    kf:"",
                    mobile:"",
                    message:'',
                    type:""
                },
                visit:false,
                customer:{},
                currentIndex:0,
                list:[{name:"回访记录",state:0},{name:'订单详情',state:1},{name:'积分详情',state:2}],
                tableData: [],
                total:0,
                payWays:[],
                kfList:[],
            }
        },
        watch:{

        },
        filters:{
            filterFun(val){
                
            }
        },
        mounted(){
            _this = this
            this.GetUserAllByKeywords()
        },
        methods: {
            
            openSend(){
                this.messageDialog = true
                let customer = this.customer,mes = this.mes
                this.visitForm.mobile = this.customer.PhoneNumber
                this.visitForm.message = `亲爱的${customer.MemberName}女士/先生，感谢您选择${mes.hospitalName}，项目操作后我们为您提供了一份专属注意事项，敬请遵医嘱执行，如有不适请及时联系本院客服（18966488519），我们将全心全意的为您提供优质的医疗服务，波士邦期待您的再次光临。`  
            },
            async sureSend(params){
                let res = await SendMsg({
                    JsonStr:JSON.stringify({
                        mobile:this.visitForm.mobile,
                        hospitalcode:this.mes.hospitalCode,
                        username:this.customer.MemberName
                    })
                })
                if(res.status){
                    this.$message({ type: 'success', message: '发送成功!' })
                    this.messageDialog = false
                }else{
                    this.$message({ type: 'error', message: '发送失败!'+res.errorMessage })
                }
            },
            cancelSend(){
                this.messageDialog = false
            },
            async GetUserAllByKeywords(){
                
                let res = await getUserById(this.mes.userIdNum)
                for(var key in res){//大小写处理
                    res[key.substring(0,1).toLowerCase()+key.substring(1)] = res[key];
                    delete(res[key])
                }
                    this.customer = JSON.parse(JSON.stringify(res))
                    for(var p in this.customer){
                        if(this.customer[p] == null || this.customer[p] == undefined){
                            this.customer[p] =""
                        }
                    }
                    // this.customer["Address"] = this.customer["Province"]+this.customer["City"]+this.customer["Area"]
                    this.customer.age = this.customer.birthday?new Date().getFullYear()-this.customer.birthday.substring(0,4):''
                    if(this.customer["sex"] == 0){
                        this.customer["sex"] == "女"
                    }else if(this.customer["sex"] == 1){
                        this.customer["sex"] == "男"
                    }
                //  this.getServer()
                
                this.select(0,0)
            },
           select(index,status){
               
                this.currentIndex = status
                if(status==0){
                    this.GetVisitByCus({CustomerCode:this.mes.customerCode})
                }
                if(status==1){
                   this.GetOrderCommandByCus(this.mes.userIdNum,status)
                }
                if(status==2){
                    this.GetOnlinePointsRecords(this.mes.mobile,status)
                }
            },
            // 积分
            async GetOnlinePointsRecords(mobile,index){
                let res1 = await GetOnlinePointsRecords({mobile: mobile});
                this.total = res1.count
                this.tableData =  res1.data
                // this.tableData[index] = res1.data
            },
            //回访记录
            async GetVisitByCus(params){
                let res1 = await GetListByUserId({userId:this.mes.userIdNum})
                this.total = res1.count
                this.tableData = res1.data
            },
            //订单情况
            async GetOrderCommandByCus(code,status){
                let res = await GetSubOrdersList({UserId:code,GetMode:1})
                if(res.status){
                    this.total = res.count
                    this.tableData = res.data
                }
            },
            
            // async getServer(){
            //     let ourHospitalCode = getCookie("hospitalCode")
            //     let res = await GetServiceManList(),des = []
            //     for(let item of res.data){
            //         let hosCodes = item.hospitalCode.split(",")
            //         if(!ourHospitalCode||hosCodes.indexOf(ourHospitalCode)>=0){
            //            if(item.serTypeCode == "009"){//客服
            //                 this.kfList.push({
            //                     code: item["code"],
            //                     name: item["serviceName"],
            //                     text: item["serviceName"] + "(" + item["code"] + ")"
            //                 });
            //             }
            //             if(item.serTypeCode == "006"){
            //                 des.push({
            //                     code: item["code"],
            //                     name: item["serviceName"],
            //                     text: item["serviceName"] + "(" + item["code"] + ")"
            //                 });
            //             }
            //         }
            //     } 
            //     if(this.kfList.length == 0){
            //        this.kfList = des
            //     }
            //      this.select(0,0)
            // },
            async UpdateVisit(params){
                let res = await updateAppVisit(params)
                if (res.status) {
                    this.$message({message: '保存成功',type: 'success'});
                    this.$emit("close",true)
                } else {
                    this.$message.error('保存失败');
                }
            },
            submitForm(forName){
                let obj = {
                    "createUserId": getCookie("userId"),
                    "createBy": getCookie("userName"),
                    'hospitalCode':getCookie("hospitalCode"),
                    "userId": this.mes.userIdNum,
                    "content": this.visitForm.content,
                    "result": "",
                    "planDate": this.visitForm.dateInit.formatDate( "yyyy-MM-dd" ),
                    "factDate": '',
                }
                this.AddVisit(obj)
            },
            resetForm(formName){
                // this.$refs[formName].resetFields();
                this.visit = false
                this.visitForm = {
                    dateInit:"",
                    date:"",
                    content:"",
                }
                this.saveLoading = false
            },
            async AddVisit(params){
                this.saveLoading = true
                let res = await appVisitAdd(params)
                if (res.status) {
                    this.$message({message: '添加成功',type: 'success'});
                    this.visit = false
                    this.$emit("close",true)
                } else {
                    this.$message.error('添加失败');
                }
                this.saveLoading = false
            },
            save(){
                
                this.UpdateVisit({
                    "id": this.mes.id||'',
                    'userId':this.mes.userIdNum,
                    "result": this.newRecord,
                    "satisfied":Number(this.Satisfied),
                    "CreateUserId": getCookie("userId"),
                    "CreateBy": getCookie("userName")
                })
            },
            creat(){
                this.visitForm.dateInit = new Date()
                this.visit = true
            },
            cancel(){
                this.$emit("close",false)
            }
        }
    };
</script>

<style lang="less" scoped>
.mes{
    background: rgba(238, 241, 246, 1);
    padding: 10px 15px;
    .mes_left{
        width: 60%;
        float: left;
        .column{
            line-height: 26px;
            span{
                display: inline-block
            }
            .wt100{
                width: 100px;
            }
            .wt200{
                width: 200px;
            }
            .wt150{
                width: 150px
            }
            .wt300{
                width: 303px
            }
        }
    }
    .mes_right{
        width: 39%;
        float: left;
        .column{
            line-height: 26px;
            .ipt_lab{
                display:block;
                float: left;
            }
        }
    }
}
    .tabs{
        display: inline-block;
        width: 80px;
        height: 30px;
        line-height: 30px;text-align: center;
        border: 1px solid #6a6d78;
        border-right: none;
        cursor: pointer
    }
    .tabs:last-child{
        border: 1px solid #6a6d78;
        border-radius: 0 3px 3px 0
    }
    .tabs:first-child{
        border-radius: 3px 0 0 3px
    }
    .tabs.active{
        background: #6a6d78;
        color: #fff
    }
    .form_footer{
        text-align: center
    }

</style>


