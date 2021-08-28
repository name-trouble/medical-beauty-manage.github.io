<template>
    <div class="useStatus selCommon">
        <div class="mes_top">
            <span class="mes_top_sp">券名称：{{form.TickName}}</span>
            <span class="mes_top_sp">券种编号：{{form.TickInfoCode}}</span>
        </div>
        <el-form :inline="true" class="demo-form-inline" label-width="60px" style='padding-top:10px;'>
            <el-form-item label="申请人：" class="form_item_mt10 form_item_wh280">
                <el-input v-model="apply" placeholder="" style="width: 120px;" v-if="flg.length==0"></el-input>
                <span v-if="flg.length!=0">{{flg}}</span>
            </el-form-item>
            <el-form-item label="使用人：" class="form_item_mt10 form_item_wh280">
                <el-input v-model="member" placeholder="" style="width: 120px;"></el-input>
            </el-form-item>
            <el-form-item label="状态：" class="form_item_mt10 form_item_wh280">
                <el-select v-model="status" style="width: 120px;">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="已领" value="已领"></el-option>
                    <el-option label="已使用" value="已使用"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="" class="form_item_mt10 form_item_wh280">
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <div class="table_container">
            <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" max-height="460">
                <el-table-column prop="TickInfoCode" label="券编号" min-width="100"></el-table-column>
                <el-table-column prop="ApplyUserName" label="申请人" min-width="100"></el-table-column>
                <el-table-column prop="MemberName" label="会员" min-width="100"></el-table-column>
                <el-table-column prop="ObtainDate" label="领取时间" min-width="120"></el-table-column>
                <el-table-column prop="UsedDate" label="使用时间" min-width="120"></el-table-column>
                <el-table-column prop="FxCode" label="报单详情" min-width="80"></el-table-column>
                <el-table-column prop="State" label="状态" min-width="80">
                    <template slot-scope="scope">
                        <span v-if="scope.row.State == 1">已使用</span>
                        <span  v-if="scope.row.State == 2">已领券</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        总共：{{total}}条记录
    </div>
</template>

<script type="text/ecmascript-6">
    import {TicketsDetailReport} from "@/api/myData"
    export default {
        // name:"useStatus",
        props:{
            mes:{
                type:Object
            },
            flg:""
        },
        watch:{
            "mes":{
                handler(curVal,oldVal){
                    this.form = this.mes
                    this.onSubmit()
                },
                deep:true
            }
        },
        mounted(){
            this.form = this.mes
            this.onSubmit()
        },
        data () {
            return {
                total:0,
                member:"",
                apply:"",
                status:"",
                form:{},
                tableData:[]
            }
        },
        methods: {
            async getMes(params){
                try{
                    let res = await TicketsDetailReport(params)
                    this.total=res.length
                    this.tableData = res
                }catch(err){
                    console.log(err)
                }
            },
            onSubmit(){
                let name = ""
                if(this.flg.length!=0){
                    name = this.flg
                }else{
                    name = this.apply
                }
                this.getMes({
                    TickInfoCode: this.form.TickInfoCode,
                    TicketsType:this.form.TicketsType,
                    ApplyUserName:name,
                    MemberName:this.member,
                    Status:this.status
                })
            },
        },
        components: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mes_top{
    line-height: 36px;
    border-bottom: 1px solid #EEF1F6;
}
    .mes_top_sp{
        padding:0 10px 0 0
    }
</style>
