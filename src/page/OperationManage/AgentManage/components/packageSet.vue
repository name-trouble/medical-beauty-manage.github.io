<template>
    <div class="packageSet">
        <el-form :label-position="labelPosition" label-width="60px" :model="formLabelAlign">
            <el-form-item label="卡券：">
                <div>
                    <el-table ref="multipleTable" :data="ticketData" max-height="450" border style="width: 100%" v-loading="loading" @selection-change="handleSelectionChange">
                        <el-table-column type="selection"   align="center" width="55"></el-table-column>
                        <el-table-column prop="TickInfoCode" label="券种编号" width="min-120"></el-table-column>
                        <el-table-column prop="TickName" label="券名称" min-width="120"></el-table-column>
                        <el-table-column prop="FaceValue" label="面值" min-width="80"></el-table-column>
                        <el-table-column prop="EndDate" label="有效期" min-width="120">
                            <template slot-scope="scope">
                                <span v-if="scope.row.PrdOfVal!='' && scope.row.PrdOfVal!=null "> {{ '售后'+ scope.row.PrdOfVal +'天'}}</span>
                                <div v-else>
                                    <p>开始：{{ scope.row.StartDate&&scope.row.StartDate.substr(0,10) }} </p>
                                    <p>结束：{{ scope.row.EndDate&&scope.row.EndDate.substr(0,10) }} </p>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="UseCount" label="可用次数" min-width="80"></el-table-column>
                       <el-table-column prop="TicNum" label="数量" width="100">
                            <template slot-scope="scope">
                                <el-input-number size="small" :min="1"  v-model="scope.row.TicNum" :controls="false" style="width: 100%"></el-input-number>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="sure">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import "@/style/selfCommon.less"
    import { getCookie, delCookie } from '@/config/mUtils'
    import {GetbaseTicketsInfoAll,UpdateConsumerPackage,AddConsumerPackageOrder,getTicketsInfoByPage} from "@/api/myData"
    export default {
        // name:"packageSet",
        props:{
            packSub:{
                type:Array,
                
            },
            branchCode:"",
        },
        data () {
            return {
                packData:[],
                ticketData:[],
                labelPosition: 'right',
                formLabelAlign: {},
                multipleSelection: [],
                loading:false,
            }
        },
        mounted(){
            this.GetbaseTicketsInfoAll()
        },
        methods: {
            async GetbaseTicketsInfoAll(){
                this.loading = true
                let res = await GetbaseTicketsInfoAll()
                this.loading = false
                this.ticketData = res
            },
            async addPackageSub(params){
                try{
                    let res = await AddConsumerPackageOrder(params)
                    if(res.status){
                        this.$message({message: '编辑成功', type: 'success'});
                        this.packData = []
                        this.$refs.multipleTable.clearSelection();
                        this.$emit("close",true)
                        this.packData = []
                        this.ticketData = []
                    }else{
                        this.$message.error('编辑失败');
                    }
                }catch(err){
                    console.log(err)
                    this.$message.error('编辑失败');
                }
            },
            sure(){
                
                let arr = this.attrSplit(this.multipleSelection)
                this.addPackageSub({
                    code:this.branchCode,
                    jsonStr: JSON.stringify(arr)
                })
            },
            cancel(){
                this.$emit("close",true)
                this.$refs.multipleTable.clearSelection();
                this.packData = []
                this.ticketData = []
            },
            selectSure(){
                this.packData = this.multipleSelection
            },
            handleSelectionChange(val) {

             /*   if(val.TicNum<1){
                    val.TicNum = 1
                }*/
//                this.ticketData.push()
                this.multipleSelection = val;
            },
            attrSplit(data){
                
                let arr = []
                data.forEach(row=>{
                    arr.push({
                        receiptCode:this.branchCode,
                        ConPacCode :"CP100000",
                        ConPacName :"套餐",
                        TickInfoCode:row.TickInfoCode,
                        TickInfoName:row.TickName,
                        TicNum:row.TicNum,
                        UseCount:row.UseCount.mul(row.TicNum),
                        CreateUserId:getCookie("userId"),
                        CreateBy:getCookie("userName"),
                    })
                })
                return arr
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            select(){

            }
        },
        components: {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dialog-footer{
    text-align: center;
}
</style>
