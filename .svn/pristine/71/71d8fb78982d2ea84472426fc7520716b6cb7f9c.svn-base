<template>
   <div class="">
         <el-input v-model="searMes" style="width: 200px;margin-right:5px;"></el-input>
        <el-button @click="dialogSear" type="primary">搜索</el-button> <span>(双击选中)</span>
        <el-table :data="gridData" style="width: 500px;margin-top: 10px" highlight-current-row
                  @row-dblclick="handleCurrentChange" ref="singleTable" height="300" v-loading="MemberLoading">
            <el-table-column prop="MemberName" label="姓名" width="150"></el-table-column>
            <el-table-column prop="Code" label="编号" width="200"></el-table-column>
            <el-table-column prop="PhoneNumber" label="手机号"></el-table-column>
        </el-table>
       <div style="line-height:36px;">最大显示 50 条数据</div>
   </div>
</template>

<script>

import { getCookie } from "@/config/mUtils";
import {GetMembersByKeywords} from "@/api/myData"
export default {
    props:{},
    data() {
        return {
            MemberLoading:false,
            gridData:[],
            searMes:"",
        };
    },
    watch:{
       
    },
    mounted(){
       
    },
    methods: {
        dialogSear(){
            this.MemberLoading = true
            this.getMembersByKeywords({
                keywords: this.searMes.removeSP()
            })
        },
        //            搜索会员
        async getMembersByKeywords(params, index){
            try {
                this.gridData = []
                let res = await GetMembersByKeywords(params)
                this.gridData = res.length>50?res.splice(0,50):res
                this.MemberLoading = false
            } catch (err) {
                console.log(err)
            }
        },
        handleCurrentChange(val){
            this.$emit("handleCurrentChange",val)
        }
    }
}
</script>

<style scoped>

</style>

