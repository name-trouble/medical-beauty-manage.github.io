
            
<template>
        <div style="width:500px;padding:0 20px">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="hosChecked" @change="handleCheckedCitiesChange">
                    <el-checkbox class="checkBox" v-for="(hos,index) in hosList" :label="hos" :key="index">{{hos.SupplierName}}</el-checkbox>
                </el-checkbox-group>
                <div style="text-align:center;padding-top:10px">
                    <el-button type="primary" @click="sure">确定</el-button>
                    <el-button @click="cancel">取消</el-button>
                </div>
            </div>
</template>

<script type="text/ecmascript-6">
import { GetSupplierBySupTypeCode,GetServiceManHospital,AddServiceManHospital} from '../../../api/myData'
import {getStore,getCookie} from "@/config/mUtils"
export default {
    props:{
        onFinish:Function
    },
    data() {
        return {
            hosList:[],
            hosChecked:[],
            checkAll:false,
            hosList:[],
            isIndeterminate: false,
        }
    },

    watch:{
        
    },

    props:{
        userInfo:{},
    },

    mounted(){
        this.getData()
    },

    methods: {
        async getData(){
            this.hosList = await GetSupplierBySupTypeCode({SupTypeCode:"001,002,003"});
            this.GetServiceManHospital({
                ServiceManCode:this.userInfo.Id
            })
        },
        handleCheckAllChange(val) {
            if( val.target.checked){
                this.hosChecked = this.hosList
            }else{
                this.hosChecked = []
            }
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.hosList.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.hosList.length;
        },
        sure(){
            let arr = []
            this.hosChecked.forEach(ele=>{
                arr.push({
                    ServiceManCode:this.userInfo.Id,
                    ServiceManName:this.userInfo.ServiceManName,
                    hospitalCode:ele.Code,
                    hospitalName:ele.SupplierName,
                    createUserId:getCookie('userId'),
                    createUserName:getCookie("userName")
                })
            })
            this.AddServiceManHospital({
                jsonStr:JSON.stringify(arr),
                code:this.userInfo.Id
            })
        },
        cancel(){
            this.serviceHos = false
            this.hosChecked = []
            this.checkAll = false
            this.$emit("dialogClose",false)
        },
        async AddServiceManHospital(params){
            let res = await AddServiceManHospital(params)
            if(res.status){
                 this.$message({type: 'success',message: '保存成功!'})
                 this.$emit("dialogClose",true)
            }else{
                this.$message({type: 'error',message: '保存失败!'})
            }
            this.serviceHos = false
        },
        async GetServiceManHospital(params){
            this.hosChecked = []
            let res = await GetServiceManHospital(params)
            res.data.forEach(ele=>{
                this.hosList.forEach(hos=>{
                    if(ele.hospitalCode == hos.Code){
                        this.hosChecked.push(hos)
                    }
                })
            })
            if(this.hosChecked.length == this.hosList.length){
                this.checkAll = true
                this.isIndeterminate = false
            }
            if(this.hosChecked.length == 0){
                this.isIndeterminate = false;
            }
        }

    }
}
</script>
