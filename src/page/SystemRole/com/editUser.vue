<template>
    <div class="dilog_body system-role">

        <el-form label-width="100px" ref="dataForm" :model="dataForm" class="demo-dynamic" :rules="rules">

            <el-form-item label="头像：" class="form_item_mt10">
                <el-upload
                    class="avatar-uploader"
                    :action="action"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess2"
                    :acceptImage="acceptImage"
                    :before-upload="beforeAvatarUpload2">
                    <img v-if="ImgUrl" :src="ImgUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>

            <el-form-item label="用户名：" class="form_item_mt10">
                <el-input v-model="dataForm.UserName" size="small"></el-input>
            </el-form-item>

            <el-form-item label="姓名：" prop="Realname" class="form_item_mt10">
                <el-input v-model="dataForm.Realname" size="small"></el-input>
            </el-form-item>
            <!--[ { required: true, message: '请选择组织机构', trigger: 'blur' }]-->
            <el-form-item label="组织机构：" class="form_item_mt10">
                <el-form-item style="float: left" >
                    <el-select v-model="branch" placeholder="请选择" value-key="value" @change='branchCha'>
                        <el-option v-for="(item,$index) in organize" :key="$index" :label="item.name" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <!--prop="selHos" :rules="[ { required: true, message: '请选择', trigger: 'blur' }]" -->
                <el-form-item prop="selHos" style="float: left" v-if="branch.value == '01'||branch.value == '03'">
                    <el-select v-model="branchChild" placeholder="请选择" class="area" value-key="value" @change="hosSelect">
                        <el-option v-for="(item,$index) in orgChild" :key="$index" :label="item.name" :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- prop="BRNAME" :rules="[ { required: true, message: '请选择', trigger: 'blur' }]" -->
                <el-form-item prop="BRNAME"  style="float: left"  v-if="branch.value == '02'||branch.value == '04'">
                    <el-select v-model="branchChild" filterable  @change="selBranch" remote placeholder="请输入关键词" :remote-method="remoteMethod"   :loading="loading">
                        <el-option  v-for="(item,index) in childList" :key="index" :label="item.name+'|'+item.value" :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                 <!-- prop="ServiceManCode" :rules="[ { required: true, message: '请选择', trigger: 'blur' }]" -->
                <el-form-item prop="ServiceManCode" style="float: left"  v-if="branch.value == '03'">
                    <el-select v-model="service" placeholder="请选择" filterable  @change="serChange">
                        <el-option v-for="(item,$index) in serviceList" :key="$index" :label="item.text" :value="item"></el-option>
                    </el-select>
                </el-form-item>
            </el-form-item>

            <el-form-item label="性别：" class="form_item_mt10">
                <el-radio class="radio" v-model="dataForm.Gender" label="男">男</el-radio>
                <el-radio class="radio" v-model="dataForm.Gender" label="女">女</el-radio>
            </el-form-item>

            <el-form-item label="手机号码：" class="form_item_mt10">
                <el-input v-model="dataForm.Mobile" size="small"></el-input>
            </el-form-item>

            <el-form-item prop="Email" label="邮箱：" class="form_item_mt10">
                <el-input v-model="dataForm.Email" size="small"></el-input>
            </el-form-item>

            <el-form-item label="是否有效：" class="form_item_mt10">
                <el-switch v-model="dataForm.Enabled" on-text="有效" off-text="无效" :on-value='1' :off-value='0' :width="60"></el-switch>
            </el-form-item>

            <el-form-item label="是否管理员：" class="form_item_mt10">
                <el-switch v-model="dataForm.IsAdministrator" on-text="是" off-text="否" :on-value='true' :off-value='false' :width="60"></el-switch>
            </el-form-item>
            <el-form-item label="是否查看特殊：" class="form_item_mt10">
                <el-switch v-model="spec" on-text="是" off-text="否" :on-value='true' :off-value='false' :width="60"></el-switch>
            </el-form-item>

            <el-form-item label="用户角色：" class="form_item_mt10">
                <el-tag :key="tag" v-for="tag in roleTags" :hit="true" :closable="true" :close-transition="false" type="success" @close="handleClose(tag)">
                    {{tag}}
                </el-tag>
                <el-button type="success" icon="plus" size="mini" @click="showRole=true">添加角色</el-button>
            </el-form-item>

            <el-form-item label="密码：" prop="pass" class="form_item_mt10">
                <el-input type="password" v-model="dataForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码：" prop="checkPass" class="form_item_mt10">
                <el-input type="password" v-model="dataForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="描述：" class="form_item_mt10">
                <el-input type="textarea" v-model="dataForm.Description"></el-input>
            </el-form-item>
        </el-form>
        <div style="padding-left:20%">
            <el-button type="primary" @click="Submit()" :loading="saveLoading">保存</el-button>
            <el-button @click="Cancel">取消</el-button>
        </div>

        <el-dialog ref="updateDialog" title=" " :visible.sync="showRole" size="large" top="10%" :modal="false">
            <role-select :add-click="addRole" :dataForm="roleSelectData"></role-select>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import { acceptImage } from '@/config/common'
    import { baseImgPath } from '@/config/env'
    import { updateUser, getUserRoleByUserId, addUserRole, existsUser, getTopBranch ,GetDropDownPermission,GetBranchByKeywords,DelImg,
    GetMembersByKeywords,GetServiceManList} from '../../../api/myData'
    import roleSelect from './role_select'
    import { getStore,getCookie} from '@/config/mUtils'
    export default {
        props: {
            dataEdit: Object,
        },
        components: {
            roleSelect
        },
        mounted() {
            if(getStore("typeCode") != '01'){
                    this.organize = this.allOrganize.slice(1)
                }else{
                    this.organize = this.allOrganize
                }
            this.dataForm = JSON.parse(JSON.stringify(this.dataEdit))
            this.spec = this.dataEdit.IsSpecial == 1?true:false
            this.getRole()
            this.organizeInfo()
        },

        data() {
            // var checkMobile = (rule, value, callback) => {
            //     if (!value) callback()
            //     else{
            //         if (!isNaN(value) && value.length === 11 && !value.startsWith(0)) callback()
            //         else return callback(new Error('请输入有效的手机号'))
            //     }
            // };

            // var checkBranch = (rule, value, callback) => {
            //     if (value) callback()
            //     else return callback(new Error('请选择组织机构'));
            // };

            return {
                action:baseImgPath + "/api/Image/UploadImg?op=goods",
                acceptImage,
                ImgUrl:'',
                spec:false,
                saveLoading:false,
                serviceList:[],
                allService:[],
                service:{},
                dataForm:{
                    service:''
                },
                loading:false,
                roleSelectData: [],
                showRole: false,
                roleTags: [],
                roleIds: [],
                childList:[],
                selectedMes:[],
                rules: {
                    UserName: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    Realname: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                    ],

                    // Mobile: [
                    //     { validator: checkMobile, trigger: 'blur' }
                    // ],
                    Email: [
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
                    ],

                    pass: [
                        { validator: this.validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: this.validatePassCheck, trigger: 'blur' }
                    ]

                },
                allOrganize:[
                    { name: "平台", value: "01", sub: [{ name: "平台", value: "" }] },
                    { name: "代理商", value: "02", sub: [] },
                    { name: "医院", value: "03", sub: [] },
                    {name: "会员", value: "04", sub: []},
                    {name: "平台客服", value: "05", sub: []},
                    {name: "线上app会员", value: "06", sub: []},
                    {name: "服务商", value: "07", sub: []},
                ],
                organize: [],
                Btime:0,//branch首次赋值标志位
                Stime:0,//医护人员首次赋值标志位
                orgChild: [],
                branch: "",//组织机构
                branchChild: {}   // 二级组织机构
            }
        },


        watch: {
            dataEdit: {
                handler(newValue, oldValue) {
                    this.dataForm = JSON.parse(JSON.stringify(this.dataEdit))
                    this.init()
                },
                deep: true
            },
            branch: {
                handler(newValue, oldValue) {
                    if(this.Btime == 0){
                        this.Btime = 1
                    }else{
                        this.branchChild = ""
                        this.childList = []
                    }
                this.organize.forEach(row=>{
                    if(newValue.value == row.value){
                        this.orgChild = row.sub
                    }
                })
                },
                deep: true
            },
        },

        methods: {
            selBranch(val){
                this.dataForm.BRNAME = val.name
            },
            branchCha(val){
                this.dataForm.platformName = val.name
                this.dataForm.BRNAME = null
                this.dataForm.selHos = null
                this.dataForm.ServiceManCode = null
            },
            async GetBranchByKeywords(params){
                try{
                    let branch = await GetBranchByKeywords(params)

                    this.loading = false;
                    let len = branch.length>=30?30:branch.length
                    for(var i=0;i<len;i++){
                        this.childList.push({name: branch[i].BranchName, value: branch[i].Code,hospitalName:branch[i].HospitalName,
                            hospitalCode:branch[i].HospitalCode,
                            PhoneNumber:branch[i].PhoneNumber
                        })
                    }
                }catch(err){}
            },

            async GetMembersByKeywords(params){
                try{
                    let branch = await GetMembersByKeywords(params)
                    this.loading = false;
                    if(getCookie("hospitalCode")){
                        branch = branch.filter(row=>{
                            return row.HospitalCode == getCookie("hospitalCode")
                        })
                    }
                    let len = branch.length>=30?30:branch.length
                    for(var i=0;i<len;i++){
                    this.childList.push({name: branch[i].MemberName, value: branch[i].Code})
                    }
                }catch(err){}
            },

            hosSelect(val){

                this.dataForm.selHos = val.name
                    if(this.branch.value == "03"){
                        let arr = []
                        this.service = {}
                        for (let item of this.allService) {
                            let hosCodes = item.hospitalCode.split(",")//多权限筛选
                            if (hosCodes.indexOf(this.branchChild.value)>=0) {
                                arr.push({
                                    value: item["code"],
                                    name: item["serviceName"],
                                    text: item["serviceName"] + "(" + item["code"] + ")",
                                    serTypeCode:item["serTypeCode"]
                                });
                            }
                            if(this.dataForm.ServiceManCode == item["code"]&&this.Stime == 0){
                                this.service = {
                                    value: item["code"],
                                    name: item["serviceName"],
                                    text: item["serviceName"] + "(" + item["code"] + ")",
                                    serTypeCode:item["serTypeCode"]
                                }
                                this.Stime = 1
                            }
                        }
                        this.serviceList = arr
                    }
                },
            serChange(){
                if(this.service != ""){
                    this.dataForm.ServiceManCode = this.service.value
                    this.dataForm.ServiceManName = this.service.name
                    this.dataForm.SerTypeCode = this.service.serTypeCode
                }
            },
            remoteMethod(query) {
                this.childList = []
                if (query !== '') {
                    this.loading = true;
                    if(this.branch.value == "02"){
                        this.GetBranchByKeywords({
                            keyWords:query.removeSP()
                        })
                    }else{
                        this.GetMembersByKeywords({
                            keyWords:query.removeSP()
                        })
                    }
                } else {

                }
            },

            Cancel() {
                this.$refs["dataForm"].$parent.$parent.$parent.ispopEdit = false
            },
            Submit() {
                this.$refs["dataForm"].validate((valid) => {
                    // valid organization by hand
                    let org = true;
                    if (!this.dataForm.platformName) {
                        org = false
                    }
                    if (this.branch.value == '01' && !this.dataForm.selHos) {
                        org = false
                    }
                    if ((this.branch.value == '02' || this.branch.value == '04') && !this.dataForm.BRNAME) {
                        org = false
                    }
                    if (this.branch.value == '03' && (!this.dataForm.selHos||!this.dataForm.ServiceManCode)) {
                        org = false
                    }
                    if (!org) {
                        this.$message({ type: 'warning', message: '组织机构填写不完整!' })
                        return
                    }

                    if (valid) {
                        this.updateUser()
                    }
                })
            },

            init() {
                this.ImgUrl = this.dataForm.ImgUrl?baseImgPath+this.dataForm.ImgUrl:''
                // this.dataForm.pass = ''
                // this.dataForm.checkPass = ''
                // this.dataForm.Realname = '';
                let res = this.dataForm,index = 0
                if(getStore("typeCode") == '01'){
                        index = 2
                    }else index = 1
                this.branch = {
                    name: this.dataForm.TypeName,
                    value: this.dataForm.TypeCode,
                    // sub:[{ name: "平台", value: "" }]
                }
                this.branchCha(this.branch)

                setTimeout(()=>{
                    if(this.dataForm.TypeCode == '01'){
                        this.branchChild =this.organize[0].sub[0]
                        this.hosSelect(this.branchChild)
                    }
                    if(this.dataForm.TypeCode == '02'){
                        this.branchChild ={name: res.BranchName, value: res.BranchCode,hospitalName:res.HospitalName,hospitalCode:res.HospitalCode}
                        this.childList.push(this.branchChild)
                        this.selBranch(this.branchChild)
                    }
                    if(this.dataForm.TypeCode == '04'){
                        this.branchChild ={name: res.BranchName, value: res.BranchCode}
                        this.childList.push(this.branchChild)
                        this.selBranch(this.branchChild)
                    }
                    if(this.dataForm.TypeCode == '03'){
                        this.organize[index].sub.forEach(row=>{
                            if(row.value == this.dataForm.HospitalCode){
                                this.branchChild =row
                                this.hosSelect(this.branchChild)
                            }
                        })
                    }
                },50)
            },

            addRole(data) {
                this.showRole = false
                this.roleTags = []
                this.roleIds = []
                let _this = this
                setTimeout(function() {
                    data.forEach((item, index) => {
                        _this.roleTags.push(item["Realname"]);
                        _this.roleIds.push(item["Id"])
                    })
                }, (300))
            },
            async setRole() {
                let param = []
                let userId = this.dataForm["Id"]
                this.roleIds.forEach(function(roleId) {
                    param.push({ "UserId": userId, "RoleId": roleId })
                })
                this.saveLoading = true
                let res = await addUserRole(JSON.stringify(param))
                this.saveLoading = false
                if (res > 0) this.$message({ type: 'success', message: '保存成功!' })
                else this.$message({ type: 'warning', message: '权限保存失败!' })
                this.$refs["dataForm"].$parent.$parent.$parent.ispopEdit = false
            },

            handleClose(tag) {
                this.roleTags.splice(this.roleTags.indexOf(tag), 1);
            },

            async organizeInfo() {

                let supply = await GetDropDownPermission({typeId: 1})
                let _this = this,index = 0
                if(getStore("typeCode") == '01'){
                        index = 2
                    }else index = 1
                if (supply.data instanceof Array && supply.data.length > 0) {
                    supply.data.forEach(item => {
                        if(item.code !=""){
                            _this.organize[index].sub.push({ name: item.supplierName, value: item.code })
                        }
                    })
                }
                let ser = await GetServiceManList();
                this.allService = ser.data
                this.init()
            },

            async updateUser() {

                this.dataForm.IsSpecial = this.spec?1:0
                this.dataForm["TypeCode"] = this.branch.value || ""
                this.dataForm["BranchCode"] = this.branchChild.value || ""
                if (this.dataForm.pass == this.dataForm.checkPass) this.dataForm["UserPassword"] = this.dataForm.pass
                else this.$message({ type: 'info', message: '密码不一致!' })
                if(this.dataForm.TypeCode == '03'||this.dataForm.TypeCode == '02'){
                    if(this.dataForm.TypeCode == '03'){
                        this.dataForm["HospitalName"] = this.branchChild.name || ""
                        this.dataForm["HospitalCode"] = this.branchChild.value || ""
                    }else{
                        this.dataForm["HospitalName"] = this.branchChild.hospitalName || ""
                        this.dataForm["HospitalCode"] = this.branchChild.hospitalCode || ""
                    }
                }else{
                    this.dataForm["HospitalName"] = ""
                    this.dataForm["HospitalCode"] = ""
                }
                if(this.dataForm.TypeCode == '04'||this.dataForm.TypeCode == '02'){
                    this.dataForm["BranchCode"] = this.branchChild.value||''
                    this.dataForm["BranchName"] = this.branchChild.name?this.branchChild.name.split("|")[0]:''
                }else{
                    this.dataForm["BranchCode"] = ""
                    this.dataForm["BranchName"] = ""
                }
                for(var p in this.dataForm){
                    if(this.dataForm[p] == null){
                        this.dataForm[p] = ""
                    }
                }
                this.dataForm.modifiedUserId = getCookie("userId")
                this.dataForm.modifiedUserName = getCookie("userName")
                try {
                    // 去除用户名首尾空格
                    this.dataForm.UserName = this.dataForm.UserName.replace(/(^\s*)|(\s*$)/g, "")
                    let res = await updateUser(this.dataForm)

                    if (res.status) {
                        if (this.roleIds.length == 0) {
                            this.$message({ type: 'success', message: '保存成功!' })
                            this.$refs["dataForm"].$parent.$parent.$parent.ispopEdit = false
                        }
                        else this.setRole()
                    }
                    else this.$message({ type: 'warning', message: '保存失败!'+res.errorMessage})
                }
                catch (err) {
                    console.log(err)
                    this.$message({ type: 'warning', message: '保存失败!' })
                }
            },

            async getRole() {
                let res = await getUserRoleByUserId(this.dataForm["Id"])

                this.roleTags = []
                let _this = this
                if (res.length == 0) return
                res.forEach(function(item) {
                    _this.roleTags.push(item["RoleName"])
                    _this.roleSelectData.push(item["RoleId"])
                })
            },

            validatePass(rule, value, callback) {
                if (this.dataForm.checkPass !== '') {
                    this.$refs.dataForm.validateField('checkPass')
                }
                callback();
            },

            validatePassCheck(rule, value, callback) {
                if (this.dataForm.pass !== '') {
                    if (value === '') callback(new Error('请再次输入密码'))
                    else if (value !== this.dataForm.pass) callback(new Error('两次输入密码不一致!'))
                    else callback();
                }
                else {
                    if (value !== '') callback(new Error('两次输入密码不一致!'))
                    else callback();
                }
                callback();
            },
            handleAvatarSuccess2(res, file) {
                if(this.dataForm.ImgUrl){//图片更换成功后删除原图片
                    this.DelImg(this.dataForm.ImgUrl)
                }
                this.ImgUrl = URL.createObjectURL(file.raw);
                this.dataForm.ImgUrl = res
            },
            beforeAvatarUpload2(file) {
                const isLt2M = file.size / 1024 / 1024 < 1;
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 1MB!');
                }
                return isLt2M;
            },
            async DelImg(){
                let res = await DelImg({filepath:filepath})
                if(!res.status){
                    this.$message({message: '原图片删除失败！'+res.errorMessage,type: 'warning'});
                }
            },
        }
    }
</script>
<style lang="less" scoped>
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
