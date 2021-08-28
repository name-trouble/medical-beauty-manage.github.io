<template>
    <div class="newNotice selCommon">
        <el-form :model="formInline" class="demo-form-inline" label-width="100px" :rules="rules" ref="formInline">
            <el-form-item label="消息标题："  class="form_item_mt10">
                <el-input placeholder="请在这里输入推送内容！"  v-model="formInline.title"></el-input>
            </el-form-item>
            <el-form-item label="消息内容："  class="form_item_mt10">
                <el-input  type="textarea" :rows="2" placeholder="请在这里输入推送内容！"  v-model="formInline.textarea"></el-input>
            </el-form-item>
            <el-form-item label="推送对象："  class="form_item_mt10">
                <el-checkbox-group v-model="formInline.platform">
                    <el-checkbox label="ios"></el-checkbox>
                    <el-checkbox label="android" ></el-checkbox>
                    <el-checkbox label="winphone"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            
            <el-form-item label="目标人群："  class="form_item_mt10">
                <el-radio class="radio" v-model="formInline.audience" label="1">广播（所有人）</el-radio>
                <el-radio class="radio" v-model="formInline.audience" label="2">别名 </el-radio>
                <div v-if="formInline.audience == 1">将向应用所有的注册用户推送此消息</div>
                <div v-else>
                    <el-tag  :key="tag"  v-for="tag in registration_id"  :closable="true"  :close-transition="false"  @close="handleClose(tag)">{{tag}}</el-tag>
                    <el-input  class="input-new-tag"  v-if="inputVisible"  v-model="inputValue"  ref="saveTagInput"  size="mini"  @keyup.enter.native="handleInputConfirm"  @blur="handleInputConfirm"></el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加别名</el-button>
                    <div>添加别名,并按enter键添加"</div>
                </div>
            </el-form-item>
            <el-form-item label="发送时间："  class="form_item_mt10">
                <div>
                    <el-radio class="radio" v-model="formInline.isTiming" label="1">立即</el-radio>
                    <el-radio class="radio" v-model="formInline.isTiming" label="2">定时</el-radio>
                    <el-radio class="radio" v-model="formInline.isTiming" label="3">重复推送</el-radio>
                </div>
                <div v-if="formInline.isTiming == 2">
                    <el-date-picker v-model="formInline.timingDate" style="width:120px"  type="date" placeholder="选择日期" :picker-options="pickerOptions0"></el-date-picker>
                    <el-time-picker v-model="formInline.timing1"  style="width:120px" placeholder="任意时间点"></el-time-picker>
                </div>
                <div v-if="formInline.isTiming == 3">
                    <el-form-item label="选择日期范围"  class="form_item_mt10">
                        <el-date-picker v-model="formInline.timingDate2" style="width:290px" type="datetimerange" placeholder="选择时间范围"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="时间单位："  class="form_item_mt10">
                        <el-select v-model="formInline.time_unit" style="width:120px" placeholder="定期单位" @change="unitChange">
                            <el-option v-for="item in time_unitList" :key="item.name"  :label="item.name" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="" class="form_item_mt10">
                        <el-checkbox-group v-model="formInline.point" @change="pointChange">
                            <el-checkbox v-for="(item,index) in pointList" :key="index" :label="item"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    
                    <el-form-item label="发送间隔："  class="form_item_mt10">
                        <el-input-number style="width:200px" v-model="formInline.frequency" :step="1" :max="100"></el-input-number><br/>
                        <div>
                            如 时间单位 为 day，发送间隔 为 2，则表示每两天触发一次推送，最大值为 100。
                        </div>
                    </el-form-item>
                    <el-form-item label="发送具体时间"  class="form_item_mt10">
                        <el-time-picker v-model="formInline.timing2"  style="width:120px;float:none" placeholder="任意时间点"></el-time-picker>
                    </el-form-item>
                </div>
            </el-form-item>
            <el-form-item label="自定义字段："  class="form_item_mt10">
                <div v-for="(item,index) in fieldList" :key="index">
                    <el-input placeholder="key" v-model="item.key" style="float:none;width:120px"></el-input>：<el-input  style="float:none;width:120px" placeholder="value" v-model="item.value"></el-input>
                    <el-button type="text" size="small" icon="delete" @click="deleteFiled(index)"></el-button>
                </div>
                <el-button type="primary" size="small" @click="addField"> + 添加</el-button>
            </el-form-item>
            <el-form-item label="自定义图片："  class="form_item_mt10">
                <div style="color:red;line-height:36px">（添加图片后会自动在自定义字段添加图片路径信息）</div>
                <el-upload
                    class="avatar-uploader"
                    :action="uploadUrl"
                    :acceptImage='acceptImage'
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess">
                    <img v-if="formInline.imgUrl" :src="baseImgPath+formInline.imgUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: center">
            <el-button type="primary" @click="sure('formInline')" :loading="saveLoading">确 定</el-button>
            <el-button @click="cancel('formInline')">取 消</el-button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import { xmxUrl, baseImgPath } from '@/config/env'
    import { imgApi, acceptImage,pageSetList } from '@/config/common'
    let uploadUrl = xmxUrl + imgApi + '?op=alertad'
    import { getCookie, delCookie } from '@/config/mUtils'
    import {getTopBranch,CreateScheduleTask,AddExecutePush,GetCIdList,UpdateScheduleTask,DelImg} from "@/api/myData"
    import  "../../../style/selfCommon.less"
    export default {
        // name:"newNotice",
        data () {
            return {
                baseImgPath,
                uploadUrl,
                acceptImage,

                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                isTiming:'1',
                registration_id: [],
                inputVisible: false,
                inputValue: '',
                saveLoading:false,
                formInline:{
                    title:'',
                    textarea:'',
                    platform:[],
                    audience:'1',
                    isTiming:'',
                    timingDate:'',
                    timingDate2:'',
                    timing1:new Date(2012,10,10,0,0),
                    time_unit:'',
                    frequency:1,
                    point:[],
                    timing2:new Date(2012,10,10,0,0),
                    imgUrl:'',
                },
                fieldList:[],
                time_unitList:[
                    {name:'天',value:'day'},
                    {name:'周',value:'week',list:["MON","TUE","WED","THU","FRI","SAT","SUN"]},
                    {name:'月',value:'month',list:[]}],
                pointList:[],
                rules:{
                    name2:[
                        { required: true, message: '请填写接收人', trigger: 'change' }
                    ]
                }
            }
        },

        watch:{

        },

        props:{
            editMes:{
                type:Object,
                default:{},
            }
        },

        mounted(){
            for(let i =1;i<32;i++){
                this.time_unitList[2].list.push(i>9?''+i:'0'+i)
            }
            if(this.editMes.schedule_id){
                this.copyData(this.editMes)
            }
        },

        methods:{
            handleAvatarSuccess(res, file){
                
                if(this.formInline.imgUrl!=''){
                    this.DelImg(this.formInline.imgUrl)
                }
                this.formInline.imgUrl = res
                // if(this.fieldList.length==0){
                //     this.fieldList.push({
                //         key:'imgUrl',
                //         value:res
                //     })
                // }else{
                    
                // }

                let flg = false
                this.fieldList.forEach((row,index)=>{//如果fieldList存在imgUrl，修改value值，没有则新加一条数据赋值
                    if(row.key == 'imgUrl'){
                        row.value = res
                        flg = true
                        return true
                    }
                })
                if(!flg){
                    this.fieldList.push({
                        key:'imgUrl',
                        value:res
                    })
                }else this.fieldList.push()
            },
             
            async DelImg(filepath){// 删除原图片/视频
                let res = await DelImg({filepath:filepath})
                if(!res.status){        
                    this.$message({message: '原图片删除失败！'+res.errorMessage,type: 'warning'});
                }
            },

            deleteFiled(index){
                if(this.fieldList[index].key == 'imgUrl'){
                    this.DelImg(this.fieldList[index].value)
                    this.formInline.imgUrl = ''
                }
                this.fieldList.splice(index,1)
            },
            copyData(data){
                let date = data.trigger.single.time?data.trigger.single.time:'',
                start = data.trigger.periodical.start?data.trigger.periodical.start:'',
                end = data.trigger.periodical.end?data.trigger.periodical.end:'',
                time = data.trigger.periodical.time?data.trigger.periodical.time:''
                this.formInline ={
                    title:data.name,
                    textarea:data.push.message.msg_content,
                    platform:data.push.platform,
                    audience:data.push.audience == 'all'?'1':'2',
                    isTiming:data.trigger.single.time?'2':'3',
                    timingDate:date? new Date(date.substring(0,4),date.substring(5,7),date.substring(8,10)):'',
                    timingDate2:start?[new Date(start.substring(0,4),start.substring(5,7),start.substring(8,10),start.substring(11,13),start.substring(14,16),start.substring(17,19)),
                    new Date(end.substring(0,4),end.substring(5,7),end.substring(8,10),end.substring(11,13),end.substring(14,16),end.substring(17,19))]:[],
                    timing1:date?new Date(2012,1,1,date.substring(11,13),date.substring(14,16),date.substring(17,19)):'',
                    time_unit:start?data.trigger.periodical.time_unit:'',
                    frequency:start?data.trigger.periodical.frequency:'',
                    point:start?JSON.parse(JSON.stringify(data.trigger.periodical.point).toLocaleUpperCase()):[],
                    timing2:start?new Date(2012,1,1,time.substring(0,2),time.substring(3,5),time.substring(6,8)):'',
                }
                if(start){
                    this.unitChange(data.trigger.periodical.time_unit)
                }
                if(data.push.message.extras){
                    let extra = data.push.message.extras,arr = []
                    for(let key in extra){
                        this.fieldList.push({
                            key:key,
                            value:extra[key],
                        })
                        if(key == 'imgUrl'){
                            this.formInline.imgUrl = extra[key]
                        }
                    }
                }
                this.registration_id = data.push.audience == 'all'?[]:data.push.audience.alias
            },
            pointChange(){
                this.formInline.point
            },
            addField(){
                this.fieldList.push({
                    key:'',
                    value:'',
                })
            },
            async AddExecutePush(params,isTime){
                let res,cid
                if(isTime){//定时
                    cid = await GetCIdList({count:1,type:'schedule'})
                    params.cid = JSON.parse(cid.content).cidlist[0]
                    res = await CreateScheduleTask({
                        jsonstr:JSON.stringify(params)
                    })
                }else{//
                    cid = await GetCIdList({count:1,type:'push'})
                    params.cid = JSON.parse(cid.content).cidlist[0]
                    res = await AddExecutePush({
                        jsonstr:JSON.stringify(params)
                    })
                }
                if (res.statusCode == '200') {
                    this.$message({ message: '添加成功', type: 'success' });
                    this.$emit("close",true)
                } else {
                    this.$message.error('添加失败');
                }
            },
            async UpdateScheduleTask(params){
                let res = await UpdateScheduleTask({jsonstr:JSON.stringify(params)})
                if (res.statusCode == '200') {
                    this.$message({ message: '编辑成功', type: 'success' });
                    this.$emit("close",true)
                } else {
                    this.$message.error('编辑失败');
                }
            },
            unitChange(val){
                
                if(val == 'day'){
                    this.pointList = []
                }else{
                    this.time_unitList.forEach(row=>{
                        if(row.value == val&&row.list){
                            this.pointList = row.list
                            return true
                        }
                    })
                }
            },
            sure(formName){
                
                let _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        
                        let options = {}
                        _this.fieldList.forEach(row=>{//附加字段参数转换为obj对象
                            if(row.key){
                                options[row.key] = row.value
                            }
                        })
                        if(_this.formInline.isTiming == 1){
                            _this.AddExecutePush({
                                "cid": '',
                                "platform": _this.formInline.platform,
                                "audience": _this.formInline.audience == 1?'all':{alias:_this.registration_id},
                                "message": {
                                    "content": _this.formInline.textarea,
                                    "title": this.formInline.title,
                                    "type": "text",
                                    "extras":options,
                                },
                            },0)
                        }else{
                            let obj = {
                                "taskName": this.formInline.title,
                                "enabled": true,
                                "cid": '',
                                "pushPL": {
                                    "platform": _this.formInline.platform,
                                    "audience": _this.formInline.audience == 1?'all':{alias:_this.registration_id},
                                    "message": {
                                        "content":_this.formInline.textarea,
                                        "extras":options,
                                    },
                                },
                            }
                            if(_this.formInline.isTiming == 2){
                                obj.triggeringTime = _this.formInline.timingDate.formatDate("yyyy-MM-dd")+ ' '+ _this.formInline.timing1.formatDate("hh:mm:ss")  //YYYY-MM-DD HH:MM:SS
                            }else{
                                obj.trigger = {
                                    "startDate":_this.formInline.timingDate2[0].formatDate('yyyy-MM-dd hh:mm:ss'),
                                    "endDate": _this.formInline.timingDate2[1].formatDate('yyyy-MM-dd hh:mm:ss'),
                                    "TriggerTime": _this.formInline.timing2.formatDate("hh:mm:ss"), 
                                    "timeunit": _this.formInline.time_unit,   //month, week, day, 大小写不敏感
                                    "frequency": this.formInline.frequency,
                                    "timeList": _this.formInline.point
                                }
                                if(_this.formInline.time_unit == 'day'){
                                    delete obj.point
                                }
                            }
                            if(this.editMes.schedule_id){// 定时/重复推送 编辑
                                obj.scheduleId = this.editMes.schedule_id
                                obj.pushPayload = obj.pushPL
                                delete obj.pushPL
                                
                                this.UpdateScheduleTask(obj)
                            }else{
                                _this.AddExecutePush(obj,1)
                            }
                        }
                    }
                })
            },

            cancel(formName){
                this.$emit("close",false)
            },

            handleClose(tag) {
                this.registration_id.splice(this.registration_id.indexOf(tag), 1);
            },

            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                this.registration_id.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
        },
        components: {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
  .sel-uploader-icon {
    font-size: 20px;
    color: #8c939d;
    width: 120px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: #ecf3fc;
    cursor: pointer;
}
</style>
