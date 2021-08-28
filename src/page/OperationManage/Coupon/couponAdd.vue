<template>
    <div class="couponAdd">
        <div>
            <h5>基础信息</h5>
            <div class="flex-box">
                <div class="flex-item">
                    <el-form label-position="right" label-width="140px" :model="formData" ref="formAdd1">
                        <el-form-item label="券种编号：" prop="code" :rules="[ { required: true, message: '不能为空'}]">
                            <el-input v-model="formData.code" :disabled="true"></el-input>
                        </el-form-item>

                        <el-form-item label="券类型：" prop="TicketsType" :rules="[ { required: true, message: '不能为空'}]">
                            <el-radio-group v-model="formData.TicketsType">
                                <el-radio label="1">折扣券</el-radio>
                                <el-radio label="2">现金券</el-radio>
                                <el-radio label="3">门票</el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item label="原价：" prop="OldPrice" :rules="[ { required: true, message: '不能为空'}]">
                            <el-input placeholder="请输入内容" v-model="formData.OldPrice">
                                <template slot="prepend">￥</template>
                            </el-input>
                        </el-form-item>

                        <el-form-item label="销售方式：" :rules="[ { required: true, message: '不能为空'}]" prop="SaleMode">
                            <el-radio-group v-model="formData.SaleMode">
                                <el-radio label="1">套餐</el-radio>
                                <el-radio label="2">零售</el-radio>
                                <el-radio label="3">不限</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-form>
                </div>

                <div class="flex-item">
                    <el-form label-position="right" label-width="140px" :model="formData" ref="formAdd2">
                        <el-form-item label="券名称：" prop="TickName" :rules="[ { required: true, message: '不能为空'}]">
                            <el-input v-model="formData.TickName"></el-input>
                        </el-form-item>

                        <el-form-item label="副标题：" prop="TickSubTitle" :rules="[ { required: true, message: '不能为空'}]">
                            <el-input v-model="formData.TickSubTitle"></el-input>
                        </el-form-item>

                        <el-form-item v-if="formData.TicketsType=='1'" label="折扣：" prop="Discount" :rules="[ { required: true, message: '不能为空'}]">
                            <el-input v-model="formData.Discount" placeholder="0.00">
                                <template slot="append">%</template>
                            </el-input>
                        </el-form-item>

                        <el-form-item v-if="formData.TicketsType=='2'" label="券面额：" prop="FaceValue" :rules="[ { required: true, message: '不能为空'}]">
                            <el-input v-model="formData.FaceValue" placeholder="0.00">
                                <template slot="prepend">￥</template>
                            </el-input>
                        </el-form-item>

                        <el-form-item v-if="formData.TicketsType=='3'" label=" ">
                            <input type="text" style="visibility:hidden;">
                         </el-form-item>

                        <el-form-item label="售价：" prop="Price" :rules="[ { required: true, message: '不能为空'}]">
                            <el-input v-model="formData.Price">
                                <template slot="prepend">￥</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="积分抵扣金额：" prop="PrefixCode">
                            <el-radio-group v-model="formData.isLimit" @change="limitCh">
                                <el-radio :label="0">不限</el-radio>
                                <el-radio :label="1">限额</el-radio>
                            </el-radio-group>
                            <el-input-number :controls="false"  v-model="formData.usePoints" v-if="formData.isLimit==1"></el-input-number>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>

        <div>
            <h5>限制信息</h5>
            <div class="flex-box">
                <div class="flex-item">
                    <el-form label-position="right" label-width="140px" :model="formData" ref="formAdd3">
                        <el-form-item label="适用项目：" prop="ProjCodes" :rules="[ { required: true, message: '不能为空'}]">
                            <el-radio v-model="formData.IsAllProject" label="1">全部</el-radio>
                            <el-radio v-model="formData.IsAllProject" label="0">部分</el-radio>
                            <el-input v-model="formData.ProjCodes" v-show="false"></el-input><br/>
                            <!-- <el-tag v-for="tag in projects" :key="tag.Name" type="success">
                                {{tag.Name}}
                            </el-tag> -->
                            <div v-if="formData.IsAllProject==0">已选择项目: <span style="color:#20a0ff">{{projects.length}}</span> 个</div>
                            <el-button type="text" icon="plus" @click="showProject=true" v-if="formData.IsAllProject==0">选择项目</el-button>
                        </el-form-item>
                        <el-form-item label="适用商户：" :rules="[ { required: true, message: '不能为空'}]">
                            <el-radio-group v-model="formData.IsPublic">
                                <el-radio label="1">不限 </el-radio>
                                <el-radio label="0">部分商户</el-radio>
                            </el-radio-group>
                            <agent v-show="formData.IsPublic=='0'" :call-back="getAgent"></agent>
                        </el-form-item>
                        <el-form-item label="有效期：" :rules="[ { required: true, message: '不能为空'}]">
                            <el-radio-group v-model="isShowDate">
                                <el-radio label='1'>售后 </el-radio>
                                <el-radio label='0'>特定区间</el-radio>
                            </el-radio-group>

                            <div v-if="isShowDate=='1'">
                                <el-input-number v-model="formData.PrdOfVal" :min="1"></el-input-number> 天
                            </div>

                            <div v-else>
                                <el-date-picker type="daterange" :editable='false' format="yyyy-MM-dd" placeholder="开始日期" v-model="dates" @change="changeDate">
                                </el-date-picker>
                            </div>

                        </el-form-item>

                        <el-form-item v-if="false" label="是否可退" prop="IsReturn" :rules="[ { required: true, message: '不能为空'}]">
                            <el-checkbox v-model="formData.IsReturn" true-label="1" false-label="0"></el-checkbox>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="flex-item">
                    <el-form label-position="right" label-width="140px" :model="formData" ref="formAdd4">
                        <el-form-item label="适用分类：" prop="" :rules="[ { required: true, message: '不能为空'}]">
                            <!-- <el-tag v-for="tag in projects" :key="tag.Name" type="success">
                                {{tag.Name}}
                            </el-tag> -->
                            <div>已选择分类: <span style="color:#20a0ff">{{classList.length}}</span> 个</div>
                            <el-button type="text" icon="plus" @click=" classShow">选择分类</el-button>
                        </el-form-item>
                        <el-form-item label="适用医院：" prop="HospitalCodes" :rules="[ { required: true, message: '不能为空'}]">
                            <el-input v-model="formData.HospitalCodes" v-show="false"></el-input>
                            <!-- <el-tag v-for="tag in hospitals" :key="tag.SupplierName" type="success">
                                {{tag.SupplierName}}
                            </el-tag> -->
                            <div >已选择医院: <span style="color:#20a0ff">{{hospitals.length}}</span> 个</div>
                            <el-button type="text" icon="plus" @click="showHospital=true">选择医院</el-button>
                        </el-form-item>
                        <el-form-item label="使用人限制" prop="isUserLimit">
                            <el-radio-group v-model="formData.isUserLimit">
                                <el-radio label="1">不限</el-radio>
                                <el-radio label="0">仅本人</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="可用次数：" :required="true">
                            <el-input-number v-model="formData.useCount" :min="1"></el-input-number>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>

        <div>
            <h5>附加信息</h5>
            <div class="foot-div">
                <el-form label-position="right" label-width="140px" :model="formData" ref="formAdd5">
                    <!-- <el-form-item label="券内容：">
                        <el-input v-model="formData.Descript" type="textarea" :rows="2"> </el-input>
                    </el-form-item>
                    <el-form-item label="备注说明：">
                        <el-input v-model="formData.Remark" type="textarea" :rows="2"></el-input>
                    </el-form-item> -->
                    <el-form-item label="券图片：" required>

                        <span style="color:red">(请上传750*312px图片，小于1M)</span>
                        <div class="flex-box img-box">
                            <div style="margin-right:100px;">
                                <P>券正面</P>
                                <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :accept="acceptImage" :on-success="successA" :before-upload="beforeUpload">
                                    <img v-if="formData.FrontPicUrl" :src="baseImgPath+formData.FrontPicUrl" class="avatar" width="100%" height="auto">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <span style="color:red" v-show="isImgA"> 此图片必填！</span>
                            </div>
                            <div style="margin-right:100px;">
                                <P>券反面</P>
                                <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :accept="acceptImage" :on-success="successB" :before-upload="beforeUpload">
                                    <img v-if="formData.BackPicUrl" :src="baseImgPath+formData.BackPicUrl" class="avatar" width="100%" height="auto">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <span style="color:red" v-show="isImgB"> 此图片必填！</span>
                            </div>
                            <div>
                                <P>券封面</P>
                                <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :accept="acceptImage" :on-success="successC" :before-upload="beforeUpload">
                                    <img v-if="formData.MainPicUrl" :src="baseImgPath+formData.MainPicUrl" class="avatar" width="100%" height="auto">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <span style="color:red" v-show="isImgC"> 此图片必填！</span>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="富文本：">
                        <VueEditor height="200px" v-model="formData.RichTextOri" useCustomImageHandler @image-added="handleImageAdded"></VueEditor>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div style="text-align:center;margin:10px 20px 80px 20px">
            <el-button type="info" style="width:100px" @click="submit" :loading="subLoad">保存</el-button>
            <el-button style="width:100px" @click="reset">重置</el-button>
        </div>

        <el-dialog title="选择项目" :visible.sync="showProject" size="">
            <project :get-project="getProject" style="width:700px;"></project>
        </el-dialog>

          <el-dialog title="选择分类" :visible.sync="showClass" size="">
            <classSelect :get-project="getProject" style="width:700px;" :flg="flg" @selectClass="selectClass" v-if="flg"></classSelect>
        </el-dialog>

        <el-dialog title="选择医院" :visible.sync="showHospital" size="">
            <hospital :get-hospital="getHospital" :data="hospitals" style="width:700px;"></hospital>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'
import { VueEditor } from 'vue2-editor'
import './lib/coupon.less'
import { xmxUrl, baseImgPath } from '@/config/env'
import { imgApi, acceptImage } from '@/config/common'
let uploadUrl = xmxUrl + imgApi + '?op=card'
import { addCoupon,DelImg } from '@/api/myData'
import Project from './com/ProjectTree'
import Hospital from './com/hospital'
import Agent from './com/agent'
import classSelect from "./com/classSelect"

import { getCookie } from '@/config/mUtils'
export default {
    data() {
        return {
            formData: {
                TickName: "",  //券名称
                TickSubTitle:'',
                code: "KQ123456",
                OldPrice: "",//原价
                Price: "", //售价
                TicketsType: "1", //	消费券类型（1折扣券，2现金券）
                FaceValue: "",	//消费券面值（代金券）
                //PointLimit: "",	//积分限额
                Discount: "",	//消费券折扣（折扣券，70 ==》70%  七折）
                SaleMode: "3",	//消费券销售方式(1套餐,2零售,3套餐、零售皆可）
                HospitalCodes: "",	//可使用的医院code(数组)
                IsReturn: "0",	//是否可退 (1可以退，0不能退)
                ReturnPrd: "",	//退货期限  没用到
                useCount: "1",//可用次数

                IsPublic: "1",	//是否对所有总代（代理商）公开销售(0不公开，1公开)
                BranchCodes: "", //使用商户 (数组)
                ProjCodes: "#",	//适用项目code(数组)

                isUserLimit: "1", //使用人限制(0仅自己，1所有人)
                StartDate: "",//	有效开始日期
                EndDate: "",//	有效结束日期
                PrdOfVal: "1",//	售后有效时长
                Descript: "",  //	描述
                Remark: "",   //	备注
                FrontPicUrl: "", // 券正面
                BackPicUrl: "",  //	券反面
                MainPicUrl:'',//主图
                IsAllProject:"1",
                ItemTypeList:[],
                isLimit:0,
                usePoints:0,
                RichTextOri:'',
                // PrefixCode:"",
            },
            OldPrice: "",
            Price: "",
            showClass:false,

            showHospital: false,
            showProject: false,
            isImgA: false,
            isImgB: false,
            isImgC:false,
            subLoad: false,

            uploadUrl,
            baseImgPath,//配置文件读取路径
            acceptImage,
            isShowDate: '1',
            projects: [],
            hospitals: [],
            dates: [],
            classList:[],
            flg:true,//清空项目分类标志
            // isLimit: "0",//是否限制积分，默认不限制
        }
    },
    components: {
        Project, Hospital, Agent,classSelect,VueEditor
    },

    methods: {
        
        htmlEncode (str) {
                var s = "";
                if (str.length == 0) return "";
                s = str.replace(/&/g, "%26amp;");
                s = s.replace(/</g, "%26lt;");
                s = s.replace(/>/g, "%26gt;");
                s = s.replace(/ /g, "%26nbsp;");
                s = s.replace(/\'/g, "%26#39;");
                s = s.replace(/\"/g, "%26quot;");
                return s;
            },
        handleImageAdded(file, Editor, cursorLocation) {
            var formData = new FormData();
            formData.append('image', file)
            axios({
                url: uploadUrl, method: 'POST', headers: { 'Content-Type': 'multipart/form-data' }, data: formData
            }).then((result) => {
                let url = result.data
                Editor.insertEmbed(cursorLocation, 'image', baseImgPath + url);
            }).catch((err) => {
                console.log(err);
            })
        },
        limitCh(){
            this.formData.UsePoints = 0
        },
        changeDate(val) {
            this.formData.StartDate = val.slice(0, 10)
            this.formData.EndDate = val.slice(-10)
        },

        //通过回调获取项目
        getProject(arr) {
            this.showProject = false
            this.projects = arr?arr:[]
            
            this.formData.ProjCodes = ""
            if (arr && arr.length > 0) {
                let strs = []
                arr.forEach(item => {
                    strs.push(item["Code"])
                })
                this.formData.ProjCodes = strs.join(',')

                
            }
        },
// 回调获取分类
        selectClass(val,ope){
            // if(ope == 0){

            // }
            if(ope == 1){
                
                this.classList = val
                this.formData.ItemTypeList = JSON.stringify(val)
            }
            this.showClass = false
        },

        getHospital(state, arr) {
            this.showHospital = false
            if (state === 0) { return }
            this.hospitals = arr
            this.formData.HospitalCodes = ""
            if (arr && arr.length > 0) {
                let strs = []
                arr.forEach(item => {
                    strs.push(item["Code"])
                })
                this.formData.HospitalCodes = strs.join(',')
            }
        },

        getAgent(arr) {

            this.formData.BranchCodes = ""
            this.formData.BranchCodes = arr.join(',')

        },

        submit() {
            let okNum = 0
            for (let i = 1; i <= 5; i++) {
                this.$refs["formAdd" + i].validate((valid) => {
                    if (valid) okNum++
                    else {
                        this.$message({ type: 'info', message: '请填写完整信息!' })
                        return false;
                    }
                })
            }
            if (this.formData.FrontPicUrl == "") this.isImgA = true
            else okNum++
            if (this.formData.BackPicUrl == "") this.isImgB = true
            else okNum++
            if (this.formData.MainPicUrl == "") this.isImgC = true
            else okNum++
            if (okNum == 8) this.addData()
            else {
                this.$message({ type: 'info', message: '请填写完整信息!' })
            }
        },

        async addData() {
            
            let _this = this
            //信息转化
            this.formData.RichText = this.htmlEncode(this.formData.RichTextOri)
            this.formData.IsPublic = this.formData.IsPublic == '1' ? true : false
            this.formData.IsReturn = this.formData.IsReturn == '1' ? true : false
            this.formData.isUserLimit = this.formData.isUserLimit == '1' ? true : false
            this.formData.BranchCodes = this.formData.IsPublic === true ? "" : this.formData.BranchCodes
            this.formData.CreateUserId = getCookie("userId")
            this.formData.CreateBy = getCookie("userName")
            if(this.formData.IsAllProject == 1){
                this.formData.IsAllProject = true
                this.formData.ProjCodes = ""
            }else{
                this.formData.IsAllProject = false
            }
            //this.formData.EndDate = getCookie("userName")
            this.subLoad = true
            try {
                let res = await addCoupon(this.formData)
                if (res && res.success && res.success >= 0) {
                    this.$message({ type: 'success', message: '添加成功!' })
                    this.reset()
                }
                else
                    this.$message({ type: 'warning', message: '添加失败!' })
                this.subLoad = false
            }
            catch (ex) {
                this.subLoad = false
                this.$message({ type: 'warning', message: JSON.stringify(ex) })
            }
        },

        classShow(){
            this.flg = true
            this.showClass=true
        },
        

        reset() {
            this.$confirm('是否重置', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.init()
                for (let i = 1; i <= 5; i++) {
                    this.$refs['formAdd' + i].resetFields();
                }
                this.flg = false
                this.formData.ProjCodes = "#"
                this.classList = []
            });
        },

        init() {
            this.projects = []
            this.hospitals = []
            this.formData.BackPicUrl = ""
            this.formData.FrontPicUrl = ""
            this.formData.MainPicUrl = ""
            this.isImgA = false
            this.isImgB = false
            this.isImgC = false
            this.isLimit = "0"
        },


        beforeUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 1;
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 1MB!');
            }
            return isLt2M;
        },

        successA(res, file) {
            if(this.formData.FrontPicUrl!=''){
                this.DelImg(this.formData.FrontPicUrl)
            }
            this.formData.FrontPicUrl = res
            this.isImgA = false
        },

        // 删除原图片/视频
        async DelImg(filepath){
            let res = await DelImg({filepath:filepath})
            if(!res.status){        
                this.$message({message: '原图片删除失败！'+res.errorMessage,type: 'warning'});
            }
            
        },

        successB(res, file) {
            if(this.formData.BackPicUrl!=''){
                this.DelImg(this.formData.BackPicUrl)
            }
            this.formData.BackPicUrl = res
            this.isImgB = false
        },
        successC(res, file) {
            if(this.formData.MainPicUrl!=''){
                this.DelImg(this.formData.MainPicUrl)
            }
            this.formData.MainPicUrl = res
            this.isImgC = false
        }
    },

    watch: {
        'formData.OldPrice': {
            handler(newValue, oldValue) {
                let _this = this
                clearTimeout(this.timeOut)
                this.timeOut = setTimeout(function() {
                    let res = parseFloat(newValue.toString().replace(/[^\d.]/g, ""))
                    _this.formData.OldPrice = res.toString() == 'NaN' ? '' : res + ""
                }, 300)
            },
            deep: true
        },

        'formData.Price': {
            handler(newValue, oldValue) {
                let _this = this
                clearTimeout(this.timeOut)
                this.timeOut = setTimeout(function() {
                    let res = parseFloat(newValue.toString().replace(/[^\d.]/g, ""))
                    _this.formData.Price = res.toString() == 'NaN' ? '' : res + ""
                }, 300)
            },
            deep: true
        },

        'formData.Discount': {
            handler(newValue, oldValue) {
                let _this = this
                clearTimeout(this.timeOut)
                this.timeOut = setTimeout(function() {
                    let res = parseFloat(newValue.toString().replace(/[^\d.]/g, ""))
                    _this.formData.Discount = res.toString() == 'NaN' ? '' : res + ""
                }, 300)
            },
            deep: true
        },

        'formData.FaceValue': {
            handler(newValue, oldValue) {
                let _this = this
                clearTimeout(this.timeOut)
                this.timeOut = setTimeout(function() {
                    let res = parseFloat(newValue.toString().replace(/[^\d.]/g, ""))
                    _this.formData.FaceValue = res.toString() == 'NaN' ? '' : res + ""
                }, 300)
            },
            deep: true
        },

        isShowDate() {
            if (this.isShowDate == '1') {
                this.formData.StartDate = ""
                this.formData.EndDate = ""
            }
            else {
                this.formData.PrdOfVal = ""
            }
        },
         "formData.IsAllProject":{
            handler(curVal,oldVal){
                
                if(curVal == 1){
                    this.projects = []
                    // 占位
                    this.formData.ProjCodes = "#"
                }
            },
            deep:true
        }
    },
}
</script>

<style scoped lang="less">
.flex-box {
    display: flex;
    flex-wrap: wrap; //justify-content: center;
    width: 100%; //height: 300px;
    margin-bottom: 30px;
    padding-right: 30px;
    background: rgb(249, 249, 249);
    .flex-item {
        flex: 0 50%;
        margin-top: 20px; //text-align: center;
        //align-self: center;
    }
}

.img-box {
    // justify-content: center;
    margin: 0;
    padding: 0;
}

.foot-div {
    width: 100%;
    margin-bottom: 30px;
    padding: 20px 30px 20px 0;
    background: rgb(249, 249, 249);
}

.couponAdd {
    font-size: 12px;
    position: relative;
    height: 100%;
    left: 10px;
    padding-right: 20%;
}


h5 {
    font-size: 16px;
    margin-bottom: 10px;
}

.my-input {
    display: inline-block;
    position: relative; //width:calc(100% - 21px);  注意less  calc函数使用方法跟 原生有异
    input {
        width: calc(~"80.5% - 20px");
        display: inline-block;
        height: 34px;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #bfcbd9; //outline: 1px solid red;
        font-size: 14px;
        padding-left: 20px;
    }
    input:focus {
        border: 1px solid #4da6ff; //outline: 1px solid red;
    }
}

.xiane {
    margin-left: 10px;
    width: 40%;
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px dashed #d9d9d9;
}

.avatar {
    width: 178px;
    height: auto;
    display: block;
}

.el-tag {
    margin: 0 4px;
}
</style>
