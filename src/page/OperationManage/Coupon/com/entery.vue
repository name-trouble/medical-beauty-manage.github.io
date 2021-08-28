<template>
    <div>
        <div class="com-box">
            <div class="flex-box" style="padding:20px;">
                <div class="flex-item">券编号：{{data.TickInfoCode}}</div>
                <div class="flex-item">券名称：{{ data.TickName}}</div>
                <div class="flex-item">申请人：{{data.ApplyUserName}}[{{data.BranchCode}}]</div>
                <div class="flex-item">申请数量: {{data.ApplyNum}}</div>
            </div>
        </div>

        <div style="margin-top:20px;font-size:15px;">
            <!-- <span>最后一次录入编号：{{ state }} </span> -->
            <span>已录入{{ entryCodes.length }} 条</span>

            <el-button style="margin-left:10px" size="small" @click="showCode=true">查看所有券号</el-button>

            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="逐条录入" name="first">
                    <div class="tab-box">
                        <span style="color:red">多个编号换行间隔。例如：Q91;Q92;Q93</span>
                        <el-input type="textarea" v-model="txtStr" :rows="13"></el-input>
                    </div>
                    <div class="btn-box">
                        <el-button type="info" @click="addTicket()" :loading="btnLoad1"> 仅保存</el-button>
                        <el-button @click="addTicketFinished()" :loading="btnLoad2">保存并完成录入</el-button>
                        <el-button @click="cancel()">取消</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="Excel导入" name="second">
                    <div class="tab-box flex-box">
                        <div class="flex-item" style="flex:0 30%">
                            <div>
                                <el-button style="width:100%" @click="download">Excel模板下载</el-button>
                            </div>

                            <el-upload class="upload-demo" ref="upload" accept=".xls,.xlsx" :action="uploadUrl"
                                       :on-preview="handlePreview" :show-file-list="true" :auto-upload="false"
                                       :on-success="onSuccess" :file-list="fileList" :on-error="onError">
                                <el-button slot="trigger" size="big" style="width:200px;" type="primary">选取文件
                                </el-button>
                            </el-upload>
                        </div>
                        <div class="flex-item" style="flex:0 10%"></div>
                        <div class="flex-item" style="flex:0 50%">
                            <p>上传结果</p>
                            <el-input type="textarea" v-model="loadStr" :rows="13"></el-input>
                        </div>
                    </div>
                    <div class="btn-box">
                        <el-button type="info" @click="submitUpload(0)" :loading="btnLoad"> 仅保存</el-button>
                        <el-button @click="submitUpload(1)">保存并完成录入</el-button>
                        <el-button @click="cancel()">取消</el-button>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>

        <el-dialog title="已录入券号" :visible.sync="showCode" :modal='false' size="">
            <ul style="width:483px;height: 300px;overflow-y:auto">
                <el-tag v-for="(tag,index) in entryCodes" :key="tag.name" :closable="true" :type="tag.type" @close="handleClose(tag,index)" style="margin:5px 5px 0 0;width: 150px" class="right_tag">
                    {{tag.TicketsCode}}
                </el-tag>
            </ul>
        </el-dialog>

    </div>
</template>

<script type="text/ecmascript-6">
    import '../lib/coupon.less'
    const excelUrl = "/template/ImportCardNum.xlsx"
    import { baseImgPath } from '@/config/env'
    import {getCookie} from "@/config/mUtils"
    import { addTicketsApplySub, addTicketsApplySubFinished, getTicketsApplySubAll,DeleteTicketsApplySub} from '@/api/myData'
    export default {
        props: {
            data: Object,
            onFinish: Function
        },
        data() {
            return {
                activeName: "first",
                txtStr: "",
                loadStr: "",
                btnLoad: false,
                btnLoad1: false,
                btnLoad2: false,

                uploadUrl: "",
                fileList: [],
                state: "未录入", //录入状态
                entryCodes: [],//已录入券号

                values: "",

                showCode: false,
                execel:0
            }
        },

        mounted() {
            this.getFinishCode()
        },

        methods: {
            handleClick() {
            },

            handlePreview(file) {
            },
            download() {
                window.location = baseImgPath + excelUrl;
            },
            async DeleteTicketsApplySub(params,index){
                try{
                    let res =await DeleteTicketsApplySub(params)
                    if(res.success){
                        this.$message({message: '删除成功', type: 'success'});
                        this.entryCodes.splice(index,1)
                    }else{
                        this.$message.error(''+res);
                    }
                }catch(err){
                    console.log(err)
                }
            },
            async getFinishCode(){
                this.entryCodes = []
                let res = await getTicketsApplySubAll(this.data.ReceiptCode)
                
                if (res.length == 0) return
                if (res.length > 0 && res.length < this.data.ApplyNum) this.state = "录入中"
                if (res.length >= this.data.ApplyNum) this.state = "录入完成"
                for (let item of res) {
                    this.entryCodes.push(item.TicketsCode)
                }
                
               this.entryCodes = res
               this.values = this.entryCodes.join('\n')
            },
            async addTicket(){
                
                let _this = this
               
                let arr = this.txtStr.split("\n")
                let len = arr.length
                let ars = []
                arr.forEach(row=>{
                    ars.push(row.replace(/(^\s*)|(\s*$)/g, "")) 
                })

                if(ars[ars.length-1]==""){
                    len = ars.length-1
                }
                if (!this.checkCode(ars.join(''))) return
                this.btnLoad1 = true
                setTimeout(function () {
                    _this.btnLoad1 = false
                }, 500)

                this.$confirm('申请数量：'+this.data.ApplyNum+';已录入：'+this.entryCodes.length+'；当前录入：'+len +'；是否确定录入', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        let param = []
                        let uniArs = ars.minus(this.entryCodes)  //原型扩展方法  求差， 去重复
                        
                        if (uniArs.length > 0) {
                            uniArs.forEach(item => {
                                if (item != '')param.push({"ReceiptCode": this.data.ReceiptCode, "TicketsCode": item,createBy:getCookie("userName"),CreateUserId:getCookie("userId")})
                            })
                        }
                        else {
                            this.$notify.warning({title: '信息', message: '券号已存在！'})
                            return
                        }
                        
                        this.addTickApply(JSON.stringify(param))
                    }).catch(() => {       
                });
            },

            async addTickApply(param){
                let arr = JSON.parse(param)
                let res = await addTicketsApplySub(param)
                if (res.success) {
                    this.$message({ message: '录入成功',type: 'success'});
                    this.entryCodes = this.entryCodes.concat(arr)
                    this.values = this.entryCodes.join('\n')
                } else this.$message.error(`录入失败${res.error}`)
            },

            cancel(){
                this.onFinish && this.onFinish()
            },

            checkCode(str){
                // var Regx = /^[A-Za-z0-9]*$/
                // if (Regx.test(str)) return true
                // else {
                //     this.$notify.warning({title: '信息', message: '券号只能为数字和字母'})
                //     return false
                // }
                return true
            },

            async addTicketFinished(){
                let _this = this
                let arr = this.txtStr.split("\n")
                let ars = []
                arr.forEach(row=>{
                    ars.push(row.replace(/(^\s*)|(\s*$)/g, "")) 
                })
                if (!this.checkCode(ars.join(''))) return
                this.btnLoad2 = true
                setTimeout(function () {
                    _this.btnLoad2 = false
                }, 500)
                let param = []
                if (ars.length > 0) {
                    ars.forEach(item => {
                        if (item != '') param.push({"ReceiptCode": this.data.ReceiptCode, "TicketsCode": item})
                    })
                }
                let res = await
                    addTicketsApplySubFinished(JSON.stringify(param))
                if (res.success > 0) {
                    this.$notify.success({title: '信息', message: '录入成功'})
                    
                     this.cancel()
                }
                else this.$notify.success({title: '信息', message: response.error})
            },

            onSuccess(response, file){
                
                this.btnLoad = false
                if (response instanceof Array && response.length > 0) {
                    this.$notify.success({title: '信息', message: '已成功录入' + response.length + '张', offset: 100});
                    let arr = []
                    response.forEach(row=>{
                         arr.push(row.ticketcode)
                    })
                    this.loadStr = arr.join('\r\n')
                    if(this.execel == 1){
                        this.execel = 0
                        this.cancel()
                    }
                }
                else {
                    this.$notify.error({title: '信息', message: JSON.stringify(response.errorMsg)});
                }
            },


            onError(response){
                this.btnLoad = false
                this.$message({type: 'warning', message: '录入失败'})
            },

            init(){
                this.loadStr = ""
                this.txtStr = ""
                this.activeName = "first"
                this.fileList = []
            },

            submitUpload(val){
                this.btnLoad = true
                this.execel = val
                this.uploadUrl = baseImgPath + '/api/branch/ImportTickets?ReceiptCode=' + this.data.ReceiptCode + '&InputState=' + val
                let _this = this
                setTimeout(function () {
                    _this.$refs.upload.submit();
                }, 500)
            },
            handleClose(data,index){
                
                this.DeleteTicketsApplySub({
                    TicketsCode:data.TicketsCode,
                    ReceiptCode:data.ReceiptCode,
                },index)
            }
        },

        watch: {
            data: {
                handler(newValue, oldValue)
                {
                    if (newValue.ApplyId != oldValue.ApplyId) {
                        this.init()
                        this.getFinishCode()
                    }
                }
                ,
                deep: true
            }
            ,
        }
    }
</script>

<style scoped lang="less">
    .flex-box {
        display: flex;
        flex-wrap: wrap;
        width: 100%;

    .flex-item {
        flex: 0 50%;
        margin-top: 5px;
        font-size: 14px;
    }

    }

    .tab-box {
        margin-bottom: 20px;

    div {
        margin-top: 20px;
    }

    }

    .com-box {
        background: rgb(249, 249, 249);
    }
</style>
