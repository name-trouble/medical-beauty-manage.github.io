<template>
    <div class="selCommon editRegister">
        <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="编号区间" name="first">
                <span style="float:left;line-height:36px;">输入编号区间：</span>
                
            </el-tab-pane>
            <el-tab-pane label="扫码出库" name="second">
                <div>
                    <el-tag :key="tag" type="success" v-for="tag in dynamicTags" class="tag"  :closable="true"  :close-transition="false"  @close="handleClose(tag)">{{tag}}</el-tag>
                </div>
                <input type="text" v-model="inputValue" class="el-input__inner" placeholder="点击文框准备扫描卡券" @keydown="change($event)">
                <div style="color:red">(扫码时请切换至英文输入法，中文输入可能导致无法正确扫码！)</div>
            </el-tab-pane>
        </el-tabs> -->
        <div>
            <div style="width:600px;float:none;height:40px">
                <span style="float:left;line-height:36px;">输入编号区间：</span>
                <span style="float:left;line-height:36px;color:red">（生成券号包含区间的初始、结束值，如1-10，包含hz00001-hz00010）</span>
            </div>
            <el-row :gutter="24">
                <el-col :span="12"><div class="grid-content bg-purple">
                    <div v-for="(item,index) in space" :key="index" style="width:500px;float:none;height:40px">
                        <el-input v-model.number="item.startNum" placeholder="请输入初始值" :controls="false"  style="width:100px;float:left"></el-input>
                        <div style="float:left;line-height:36px;width:20px;text-align:center"> - </div>
                        <el-input v-model.number="item.endNum" placeholder="请输入结束值"  @blur="endnumBlur(index)"  style="width:100px;float:left"></el-input>
                        <el-button size="small" icon="delete" @click="redSpace(index)" v-if="space.length>0" type="text" style="margin-left:5px;line-height:26px;"></el-button>
                    </div>
                    <el-button size="small" icon="plus" @click="addSpace" type="primary">添加区间</el-button></div>
                </el-col>
                <el-col :span="12" v-if="ope">
                    <el-input type="textarea" :rows="10" v-model="ticketCodes" placeholder="请输入完整券号,多个券号用回车或者英文逗号分隔" ></el-input>
                </el-col>
            </el-row>
        </div>
        <div class="form_footer">
            <el-button type="primary" @click="scan(1)">保存</el-button>
            <el-button @click="scan(0)">取消</el-button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import { getCookie, delCookie } from '@/config/mUtils'
    import Vue from "vue"
    export default {
        data () {
            return {
                activeName: 'first',
                dynamicTags:[],
                inputValue:"",
                ticket:"",
                customer:"",
                scanIndex:"",
                space:[],
                ticketCodes:'',
            }
        },
        mounted(){
           
        },
        watch:{
          
        },
        props:{
            digit:Number,
            ope:'',
        },
        methods: {
            endnumBlur(index){
                let _this = this
                setTimeout(()=>{
                    if(Number(_this.space[index].endNum)<Number(_this.space[index].startNum)){
                        _this.space[index].endNum = _this.space[index].startNum
                        _this.$alert('区间结束号必须大于等于开始值！','提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                return false
                            }
                        });
                    }
                },20)
            },
            addSpace(){
                this.space.push({
                    startNum:1,
                    endNum:1,
                })
            },
            redSpace(index){
                this.space.splice(index,1)
            },
             handleClick(tab, event) {
            },
            viewData(val){
                if(val.activeName){//未存本条数据是通过区间还是文本添加方式，取startNum是否存在判断
                    let arr = []
                    val.space.forEach(row => {
                        if(row.startNum){
                            arr.push(row)
                        }else{
                            this.ticketCodes = row.ticketCodes
                        }
                    });
                    this.space = arr
                }
            },
            // 扫描确认
            scan(val){
                let obj
                if(this.activeName == 'first'){
                    let ticketCodes = this.ticketCodes.replace(/(\r\n)|(\n)/g,',').replace(/(,*$)/g, "");//回车替换逗号
                    if(ticketCodes){
                        this.space.push({
                            ticketCodes : ticketCodes,
                            startNum:'',
                            endNum:'',
                        })
                    }
                    
                    obj = {activeName:1,space:this.space}
                }else{
                    obj = {activeName:2,dynamicTags:this.dynamicTags}
                }
                this.$emit("scanTick",val,obj)
            },
            change(event){
                var evt = event || window.event || arguments.callee.caller.arguments[0];
                let _this = this
                if(evt.code == 'Enter'){
                    setTimeout(()=>{//手动输入和扫码判断处理
                        let value = _this.inputValue.split('&').pop().split("code=")
                        _this.inputValue = value[1]?value[1]:value[0]
                        _this.handleInputConfirm()
                    },50)
                }
           },
            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.dynamicTags.push(inputValue);
                }0
                this.inputValue = '';
            },
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },
        },
        components: {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tag{
    margin: 5px;
}
.input-new-tag{
width:200px;float:none;margin: 10px 0;
}
.form_footer{
    padding: 20px 0 10px 0;
}
.el-input__inner{
    width: 200px;
}
</style>
