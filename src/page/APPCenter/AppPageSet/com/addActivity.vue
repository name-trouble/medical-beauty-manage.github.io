<template>
    <div class="settled selCommon">
        <el-form :model="form" class="demo-form-inline" label-width="100px" ref="form" :rules="rules">
            <el-form-item label="" class="form_item_mt10 " label-width="0px">
                 <span style="font-size:14px;font-weight:bold">类型设置</span>
            </el-form-item>
             <el-form-item label="活动栏目：" class="form_item_mt10 " >
                <el-select v-model="form.column" style="width:300px;">
                    <el-option label="空" value=""></el-option>
                    <el-option v-for="item in columnList" :label="item.DataName" :key="item.DataCode" :value="item.DataName+'|'+item.DataCode"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="活动类型：" class="form_item_mt10 " prop="type">
                <el-select v-model="form.type" style="width:300px;">
                    <el-option label="限时秒杀" value="1"></el-option>
                    <el-option label="体验专区" value="2"></el-option>
                    <el-option label="特惠项目" value="3"></el-option>
                    <el-option label="量贩专区" value="4"></el-option>
                    <el-option label="398特惠" value="5"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="" class="form_item_mt10 " label-width="0px">
                 <span style="font-size:14px;font-weight:bold">活动设置</span>
            </el-form-item>
            
            <el-form-item label="活动名称：" class="form_item_mt10"  prop="name">
                <el-input v-model="form.name" style="width:300px;"></el-input>
            </el-form-item>

            <el-form-item label="排序：" class="form_item_mt10 ">
               <el-input v-model.number="form.sortCode" placeholder="" style='width:300px;'></el-input>
            </el-form-item>

            <el-form-item label="活动主图："  class="form_item_mt10 ">
                <span style="color:red">
                    请控制图片大小在1M以内，图片体积大小将影响用户加载速度
                </span>
                <el-upload
                    class="avatar-uploader"
                    :action="action"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess2"
                    :acceptImage="acceptImage"
                    :before-upload="beforeAvatarUpload2">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
           
            <el-form-item label="有效期："  class="form_item_mt10 " prop="startDate">
                <el-date-picker
                    v-model="date"
                    type="datetimerange"
                    @change="dateChange"
                    style='width:300px;'
                    placeholder="选择日期范围">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="活动标签：" class="form_item_mt10 ">
               <el-input v-model="form.tag" style='width:300px;margin-right:5px;'></el-input> <span> 活动期间展示于商品详情的价格旁边，2至5字</span>
            </el-form-item>
            <el-form-item label="每人限购件数：" class="form_item_mt10 ">
               <el-input-number v-model="form.limitNum" :min="0" :controls="false" style='width:100px;display:inline-block;vertical-align: middle;'></el-input-number> 件
            </el-form-item>
            <el-form-item label="订单取消：" class="form_item_mt10 ">
                <span>卖家</span> <el-input-number v-model="form.limitTime" :min="0" :controls="false" style='width:100px;display:inline-block;vertical-align: middle;'></el-input-number> <span>分钟未支付订单，订单取消</span> 
            </el-form-item>
            <el-form-item label="适用地区：" class="form_item_mt10 ">
               <el-input v-model="form.applyRegion" placeholder="请填写适用地区，不写默认为杭州本地适用" style='width:300px;'></el-input>
            </el-form-item>

            <!-- <el-form-item label="" class="form_item_mt10 " label-width="0px" v-if="mes.id">
                 <span style="font-size:16px;">项目设置</span>
            </el-form-item> -->

            <el-form-item label="页面配置" class="form_item_mt10 " v-if="mes.id">
                <el-radio class="radio" v-model="form.isUrlLink" label="1">项目配置</el-radio>
                <el-radio class="radio" v-model="form.isUrlLink" label="2">URL配置</el-radio>
                <el-radio class="radio" v-model="form.isUrlLink" label="3">卡券</el-radio>
            </el-form-item>
            <el-form-item label="URL地址：" class="form_item_mt10 " v-show="mes.id&&form.isUrlLink == '2'">
               <el-input v-model="form.urlLink" placeholder="请填写的活动网页地址" style='width:300px;'></el-input>
            </el-form-item>
            <el-form-item label="" class="form_item_mt0 " label-width="20px" required v-show="mes.id&&form.isUrlLink == '1'">
                <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" max-height="300">
                    <el-table-column  width="70" align="center" label="序号">
                        <template slot-scope="scope">
                            <el-input-number v-model="scope.row.sortCode" :controls="false" style="width:100%"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column prop="orderDate " label="项目" min-width="150">
                        <template slot-scope="scope">
                            <div class='img left'>
                                <img :src="baseImgPath+scope.row.goodsImage" alt="" width="50" height="50">
                            </div>
                            <div class="proMes left">
                                <span>{{scope.row.goodsName}}</span><br/>
                                <span>编号：{{scope.row.goodsCode}}</span><br/>
                                <span>原价：￥{{scope.row.goodsPrice}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="payDate  " label="项目限制总数" min-width="60">
                        <template slot-scope="scope">
                            <el-input-number v-model="scope.row.limits" :controls="false" :min="1" style="width:90%;"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column prop="hospitalName" label="活动价格" min-width="60">
                        <template slot-scope="scope">
                            <el-input-number v-model="scope.row.salePrice" :controls="false" :min="0" style="width:90%;"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column prop="amount" label="操作" min-width="150">
                        <template slot-scope="scope">
                            <el-button type="primary" size="small" @click="addaddr(scope.row)">地址配置</el-button>
                            <el-button type="primary" size="small" @click="AlterActivityItems(scope.row)">确认修改</el-button>
                            <el-dropdown @command="handleCommand" trigger="click">
                                <el-button type="primary"  size="small" :disabled="scope.row.cloumnName == '产品'">关联商品<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item :command="composeValue(scope.row,1,'添加关联商品')" >添加关联商品</el-dropdown-item>
                                    <el-dropdown-item :command="composeValue(scope.row,2,'添加关联卡券')">添加关联卡券</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                            <el-button type="danger" size="small" @click="DeleteActivityItems(scope.row,scope.$index)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item label="" class="form_item_mt10 "  label-width="20px" v-show="mes.id&&form.isUrlLink == '1'">
               <el-button @click="addPro" type="primary" icon="plus" size="small">添加项目</el-button>
            </el-form-item>
            <el-form-item label="" class="form_item_mt10 form_item_wh280 " label-width="0px" style="text-align:center">
                <el-button type="primary" @click="sure('form')" >确定</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
        <el-dialog title="地址配置" :visible.sync="dialogAddr" top="20%" size="" :modal="false" :close-on-click-modal="false">
              <el-table :data="addRtableData" border style="width: 500px;margin-top:15px;margin-bottom:10px;" max-height="300">
                  <el-table-column prop="skuName" label="SKU名称" min-width="60"  align="center">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.skuName" style="width:95%;"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="address" label="地址" min-width="60"  align="center">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.address" style="width:95%;"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="limitCount" label="限制数量" min-width="60" align="center">
                        <template slot-scope="scope">
                            <el-input-number v-model="scope.row.limitCount" :controls="false" :min="0" style="width:95%;"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column prop="limitCount" label="操作" min-width="60" align="center">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="addRtableData.splice(scope.$index,1)" size="small">删除</el-button>
                        </template>
                    </el-table-column>
              </el-table>
              <el-button @click="addItem" size="small" type="primary">添加配置项</el-button>
              <div style="text-align:center">
                  <el-button type="primary" @click="addItemSure">确定</el-button>
                  <el-button @click="dialogAddr">取消</el-button>
              </div>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import { baseImgPath } from '@/config/env'
    import {AddNewActivitys,AlterActivitys,DeleteActivityItems,AlterActivityItems,
    GetListByActivityId,DelImg,AddItemsAdress,GetItemsAddressList,getBaseDataByCode} from "@/api/myData"
    import { VueEditor } from 'vue2-editor'
    import axios from 'axios'
    import {getStore,getCookie} from "@/config/mUtils"
    import { acceptImage } from '@/config/common'
    import { updateExec } from '../../../../api/myData';
    export default {
        data () {
            return {
                dialogAddr:false,
                addRtableData:[],
                columnList:[],
                date:[],
                tableData:[],
                baseImgPath,
                acceptImage,
                action:'',
                form:{
                    date:"",
                    startDate:"",
                    endDate:"",
                    status:"",
                    type:"",
                    name:"",
                    limitNum:"",
                    tag:"",
                    limitTime:"",
                    imageUrl:'',
                    applyRegion:'',
                    column:'',
                    sortCode:'',
                    isUrlLink:'1',
                    urlLink:'',
                },
                imageUrl:'',
                rules: {
                    type: [
                        { required: true, message: '请选择活动类型', trigger: 'change' }
                    ],
                    startDate: [
                        {  required: true, message: '请选择有效期', trigger: 'change' }
                    ],
                    name: [
                        { required: true, message: '请填写活动名称', trigger: 'blur' }
                    ]
                },
                editMes:{},
            }
        },
        computed: {
            
        },
        props:{
            mes:{}
        },
        mounted(){
            this.getBaseDataByCode()
            this.action = baseImgPath + "/api/Image/UploadImg?op=goods"
            if(this.mes.id){
                this.copyWorth(this.mes)
                this.GetListByActivityId()
            }
        },
        methods: {
            async getBaseDataByCode(){
                this.columnList = await getBaseDataByCode('0026')
            },
            composeValue(item,status,title) {
                return {
                    'data': item,
                    'status': status,
                    'title':title,
                }
            },
            handleCommand(command){
                command.data.typeId = command.status
                this.$emit('addPro',2,command)
            },
            addRelation(data){
                
            },

            async addItemSure(){
                let res = await AddItemsAdress({
                    jsonStr:JSON.stringify(this.addRtableData),
                    code:this.mes.id
                })
                if(res.status){
                    this.$message({  message: '添加成功', type: 'success'});
                    this.dialogAddr = false
                }else{
                    this.$message.error('添加失败'+res.errorMessage);
                }
            },
            addItem(){
                this.addRtableData.push({
                    skuName:'',
                    address :'',
                    limitCount:1,
                    activityItemsId:this.editMes.id,
                    CreateUserId : getCookie('userId'),
                    CreateBy : getCookie('userName'),
                })
            },
            addaddr(data){
                this.editMes = data
                this.addRtableData = []
                this.dialogAddr = true
                this.GetItemsAddressList()
            },
            async GetItemsAddressList(){
                let res = await GetItemsAddressList({
                    activityId:this.mes.id,
                    goodsId:this.editMes.goodsId
                })
                this.addRtableData = res.data
            },
            copyWorth(data){
                for(var key in data){
                    if(data[key] == null||data[key] == 'null'){
                        data[key] = ''
                    }
                }
                
                this.form = {
                    startDate:data.validDate1,
                    endDate:data.validDate2,
                    type:data.types+'',
                    name:data.name,
                    limitNum:data.limits,
                    tag:data.tags,
                    limitTime:data.expireMinutes,
                    applyRegion:data.applyRegion?data.applyRegion:'',

                    isUrlLink:data.isUrlLink?data.isUrlLink+'':'1',
                    urlLink:data.urlLink,
                    sortCode:data.sortCode,
                    column:data.catalogName?data.catalogName+'|'+data.catalogCode:'',
                    imageUrl:data.imgUrl,
                }
                this.imageUrl = data.imgUrl?baseImgPath+data.imgUrl:'',
                this.date = [new Date(data.validDate1.substring(0,4),Number(data.validDate1.substring(5,7))-1,data.validDate1.substring(8,10),data.validDate1.substring(11,13),data.validDate1.substring(14,16),data.validDate1.substring(17,19)),
                new Date(data.validDate2.substring(0,4),Number(data.validDate2.substring(5,7))-1,data.validDate2.substring(8,10),data.validDate2.substring(11,13),data.validDate2.substring(14,16),data.validDate2.substring(17,19))]
            },
            async GetListByActivityId(){
                let res = await GetListByActivityId({id:this.mes.id})
                this.tableData = res.data
            },
            // 添加选中商品方法 由父页面调用
            addTable(val){
                this.tableData.push(val)
            },
            dateChange(val){
                if(val){
                    this.form.startDate = val.substring(0,19)
                    this.form.endDate = val.substring(22)
                }else{
                    this.form.startDate = ""
                    this.form.endDate = ""
                }
            },
            sure(formName){
                let _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // if(this.tableData.length == 0&&this.mes.id){
                        //     this.$message({message: '请至少选择一个项目',type: 'warning'});
                        // }else{
                            let obj = {
                                "name": this.form.name,
                                "types": this.form.type,
                                "validDate1": this.form.startDate,
                                "validDate2": this.form.endDate,
                                "status": "1",
                                "amounts": "",
                                "orders": "",
                                "customers": "",
                                "tags": this.form.tag ,
                                "limits": this.form.limitNum,
                                "expireMinutes": this.form.limitTime,
                                'applyRegion':this.form.applyRegion,
                                'ModifiedUserId':getCookie('userId'),
                                'ModifiedBy':getCookie('userName'),
                                catalogName:this.form.column?this.form.column.split("|")[0]:'',
                                catalogCode:this.form.column?this.form.column.split("|")[1]:'',
                                imgUrl:this.form.imageUrl,
                                isUrlLink:this.form.isUrlLink,
                                urlLink:this.form.urlLink,
                                sortCode:this.form.sortCode,
                            }
                            // 编辑
                            if(this.mes.id){
                                obj.id = this.mes.id
                                obj.status = this.mes.status
                                obj.modifiedUserId = getCookie('userId')
                                obj.modifiedBy = getCookie('userName')
                                this.AlterActivitys(obj)
                            }else{
                                // 新添加
                                obj.CreateUserId = getCookie('userId')
                                obj.CreateBy = getCookie('userName')
                                this.AddNewActivitys(obj)
                            }
                        }
                    // } else {
                        
                    // }
                });
            },
            cancel(){
                this.$emit('addSure',false)
            },
            addPro(){
                this.$emit('addPro',1)
            },
            // 编辑
            async AlterActivitys(params){
                
                let res = await AlterActivitys(params)
                if (res.status == true) {
                    this.$message({ message: '编辑成功', type: 'success' });
                    this.$emit('addSure',true)
                } else {
                    this.$message.error('编辑失败');
                }
            },
            // 添加
            async AddNewActivitys(params){
                let res = await AddNewActivitys(params)
                if (res.status == true) {
                    this.$message({ message: '添加成功', type: 'success' });
                    this.$emit('addSure',true)
                } else {
                    this.$message.error('添加失败');
                }
            },
            // 项目编辑
            async AlterActivityItems(data){
                let obj = JSON.parse(JSON.stringify(data))
                obj.ModifiedUserId = getCookie('userId')
                obj.ModifiedBy = getCookie('userName')
                let res = await AlterActivityItems(obj)
                if (res.status == true) {
                    this.$message({ message: '修改成功', type: 'success' });
                } else {
                    this.$message.error('修改失败');
                }
            },
            // 项目删除
            async DeleteActivityItems(data,index){
                let res = await DeleteActivityItems({id:data.id})
                if (res.status == true) {
                    this.$message({ message: '删除成功', type: 'success' });
                    this.tableData.splice(index,1)
                } else {
                    this.$message.error('删除失败');
                }
            },
            handleAvatarSuccess2(res, file) {
                if(this.form.imageUrl){//图片更换成功后删除原图片
                    this.DelImg(this.form.imageUrl)
                }
                this.imageUrl = URL.createObjectURL(file.raw);
                this.form.imageUrl = res
            },
            beforeAvatarUpload2(file) {
                const isLt2M = file.size / 1024 / 1024 < 1;
                if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 1MB!');
                }
                return isLt2M;
            },
            // async DelImg(filepath){
            //     let res = await DelImg({filepath:filepath})
            //     if(!res.status){
            //         this.$message({message: '原图片删除失败！'+res.errorMessage,type: 'warning'});
            //     }
            // },
            // 删除原图片/视频
            async DelImg(filepath){
                if(this.mes.id){//编辑时修改图片提示
                    this.$confirm('此操作将永久删除该图片,删除后需保存编辑,否则将出现空白图，是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.delImg(filepath)
                    })
                }else{//添加活动 不做提示
                    this.delImg(filepath)
                }
                
            },
            async delImg(){
                let res = await DelImg({filepath:filepath})
                if(!res.status){        
                    this.$message({message: '原图片删除失败！'+res.errorMessage,type: 'warning'});
                }
            },
        },
        components: {
            VueEditor
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.img{
    width:50px;
}
.proMes{
    width:170px;
    line-height: 18px;margin-left: 5px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>
