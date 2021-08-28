<template>
    <el-form label-width="100px" ref="dataForm" :model="data" class="demo-dynamic dilog_body" :rules="rules">
        <el-form-item label="权限名称：" prop="Realname">
            <el-input v-model="data.Realname" size="small"></el-input>
        </el-form-item>

         <el-form-item label="是否有效：">
            <el-switch v-model="data.Enabled" on-text="有效" off-text="无效" :on-value='1'  :off-value='0'  :width="60">
            </el-switch>
        </el-form-item>

        <el-form-item label="组织机构：" v-if="typeCode == '01'">
           <el-select v-model="data.organize">
               <el-option v-for="(item,index) in organize" :key="index" :value="item" :label="item.name"></el-option>
           </el-select>
            <el-select v-model="data.organizeName" v-if="data.organize['value'] != '02'">
                <el-option v-for="item in data.organize['sub']" :key="item.value" :value="item.value" :label="item.name"></el-option>
            </el-select>
            <el-select v-model="data.organizeName" filterable remote placeholder="请输入关键词" v-if="data.organize['value'] == '02'"
                       :remote-method="remoteMethod" :loading="loading">
                <el-option v-for="item in UserList" :key="item.Code" :value="item.Code" :label="item.BranchName+'|'+item.PhoneNumber"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="描述：">
            <el-input type="textarea" v-model="data.Description"></el-input>
        </el-form-item>

        <el-form-item style="padding-left:20%">
            <el-button type="primary" @click="Submit()" :loading="saveLoading">提交</el-button>
            <el-button @click="Reset()">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script type="text/ecmascript-6">
import { addRole ,GetBranchByKeywords,getSupplierByPage} from '../../../api/myData'
import {getStore,getCookie} from "@/config/mUtils"
export default {
    props:{
        onFinish:Function
    },
    data() {
        return {
            saveLoading:false,
            typeCode:getStore('typeCode'),
            loading:false,
            data: {
                Realname: "",
                Enabled: 1,
                Description: "",
                organize:{},
                organizeName:"",
                "createUserId": getCookie("userId"),
                "createBy": getCookie("userName"),
            },
            rules: {
                UserName: [
                    { required: true, message: '请输入编号', trigger: 'blur' },
                    { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
                ],
                Realname: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                ]
            },
            UserList:[],
            organize: [
                {name: "平台", value: "01", sub: [{name: "平台", value: "1"}]},
                {name: "代理商", value: "02", sub: []},
                {name: "医院", value: "03", sub: []},
            ],
        }
    },

    watch:{
      "data.organize":{
          handler(curVal,oldVal){
              this.data.organizeName = ""
              
          },
          deep:true
      }
    },

    mounted(){
        
        this.typeCode = getStore('typeCode')
        this.organizeInfo()
    },

    methods: {

        async organizeInfo(){
            
            if(getStore('typeCode') == '01'){
                let data = {
                    startdate: "",
                    enddate: "",
                    suppliername: "",
                    suptypecode: "",
                    phonenumber: "",
                    pageindex: 1,
                    pagesize: 999,
                }
                let _this = this
                let supply = await getSupplierByPage(data)
                if (supply instanceof Array && supply.length > 0) {
                    supply.forEach(item => {
                        _this.organize[2].sub.push({name: item.SupplierName, value: item.SupTypeCode})
                    })
                }
//                let branch = await GetBranchByKeywords({keyWords:""})
            }
        },

        async GetBranchByKeywords(params){
            try{
                let branch = await GetBranchByKeywords(params)
                if(getCookie("hospitalCode")){
                    this.UserList = branch.filter(row=>{
                    return row.HospitalCode == getCookie("hospitalCode")
                })
                }else this.UserList = branch
                this.loading = false;
            }catch(err){
                console.log(err)
            }
        },

        remoteMethod(query) {
            
            if (query !== '') {
                this.loading = true;
                this.GetBranchByKeywords({
                    keyWords:query.removeSP()
                })
            } else {

            }
        },

        Reset() {
            this.$refs["dataForm"].resetFields();
            this.data.Description=""
            this.data.Enabled=1
            this.organize={}
            this.organizeName=""
        },
        Submit() {
            this.$refs["dataForm"].validate((valid) => {
                if (valid) this.addRole()
                else return false;
            })
        },

        async addRole() {
            let data = {
                typeCode:this.data.organize.value,
                branchCode:this.data.organizeName,
                Realname:this.data.Realname,
                Enabled: this.data.Enabled,
                Description: this.data.Description,
            }
            try {
                this.saveLoading = true
                let res = await addRole(data)
                if (res > 0) {
                    this.$message({ type: 'success', message: '提交成功!' })
                }
                this.saveLoading = false
                this.Reset()
                this.onFinish && this.onFinish(res)
            }
            catch (err) {
                this.Reset()
                this.onFinish && this.onFinish('')
                this.$message({ type: 'warning',message: '提交失败!'})

            }
        },

    }
}
</script>
