<template>
    <div class="settled selCommon">
        <el-form :inline="true" :model="form" class="demo-form-inline form_search" label-width="80px">               
            <el-form-item label="有效时间："  class="form_item_mt10 ">
                <el-date-picker
                    v-model="date"
                    type="daterange"
                    @change="dateChange"
                    style='width:200px;'
                    placeholder="选择日期范围">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="组合名称：" class="form_item_mt10">
                <el-input v-model="form.name" style='width:200px;'></el-input>
            </el-form-item>
            <el-form-item label="上架状态：" class="form_item_mt10">
                <el-select v-model="form.status"  style='width:200px;'>
                    <el-option label="全部" value=""></el-option>
                    <el-option label="未上架" value="0"></el-option>
                    <el-option label="已上架" value="1"></el-option>
                    <el-option label="已过期" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label=" " class="form_item_mt10 form_item_wh280">
                <el-button type="primary" @click="search" class="searchBtn" icon="search">查询</el-button>
                <el-button type="primary" @click="add" class="searchBtn" icon="plus">添加</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" height="350"  v-loading="loading">
            <el-table-column prop="sequences" label="排序" min-width="100"></el-table-column>
            <el-table-column prop="groupName" label="组合名称" min-width="100"  ></el-table-column>
            <el-table-column prop="groupTheme" label="主题" min-width="100"  ></el-table-column>
            <!-- <el-table-column prop="goodsCount" label="组合商品" min-width="100" >
                <template slot-scope="scope">
                    <el-button type="text" @click="proView(scope.row)">{{scope.row.goodsCount}}</el-button>
                </template>
            </el-table-column> -->
            <el-table-column prop="customerName" label="有效时间" min-width="150" >
                <template slot-scope="scope">
                      <span v-if="scope.row.validDate1">{{scope.row.validDate1.substring(0,10)+' 至 '+ scope.row.validDate2.substring(0,10)}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="itemDetail" label="状态" min-width="100" >
                <template slot-scope="scope">
                    <el-tag type="gray" v-if="scope.row.addedStatus == 3">过期</el-tag>
                    <el-tag type="danger" v-if="scope.row.addedStatus == 2">已下架</el-tag>
                    <el-tag type="success" v-if="scope.row.addedStatus == 1">已上架</el-tag>
                    <el-tag type="warning" v-if="scope.row.addedStatus == 0">未上架</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="amount" label="操作" min-width="150" align="center" >
                <template slot-scope="scope">
                    <el-button type="primary" @click="edit(scope.row,1)" size="small" v-if="scope.row.addedStatus == 1||scope.row.addedStatus == 0">编辑</el-button>
                    <el-button type="primary" size="small" v-if="scope.row.addedStatus == 3" @click="edit(scope.row,2)">查看详情</el-button>
                    <el-button type="primary" size="small" v-if="scope.row.addedStatus == 0||scope.row.addedStatus == 2" @click="SetStatusDesignGroups(scope.row,1)">上架</el-button>
                    <el-button type="danger" size="small" v-if="scope.row.addedStatus == 1"  @click="SetStatusDesignGroups(scope.row,0)">下架</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="项目" :visible.sync="dialogPro"  top="20%"  size="" :close-on-click-modal="false" :modal="false">
            <ul style="width:400px;">
                <span>{{projectList.split("#").join(" , ")}}</span>
            </ul>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import {GetdesGroup,SetStatusDesignGroups} from "@/api/myData"
    export default {
        props:{
            mes:Object,
        },
        data () {
            return {
                dialogPro:false,
                projectList:'',
                tableData:[],
                loading:false,
                date:"",
                pageSize:10,
                currentPage:1,
                form:{
                    startDate:'',
                    endDate:'',
                    status:"",
                    name:"",
                }
            }
        },
        computed: {
            
        },
       
        mounted(){
            this.GetdesGroup()
        },
        methods: {
            dateChange(val){
                if(val){
                    val = val.formatDates()
                    this.form.startDate = val.substring(0,10)
                    this.form.endDate = val.substring(13)
                }else{
                    this.form.startDate = ""
                    this.form.endDate = ""
                }
            },
            search(){
                this.currentPage = 1
                this.GetdesGroup()
                this.loading = true
            },
            
            add(){
                this.$emit('addComb',0,)
            },
            proView(data){
                this.projectList = data.goodsAliases
                this.dialogPro = true
            },
            async GetdesGroup(){
                let res = await GetdesGroup({
                    "pageSize": this.pageSize,
                    "pageIndex": this.currentPage,
                    "orderBy": "",
                    "groupName": this.form.name,
                    "addedStatus": this.form.status,
                    "validDate1": this.form.startDate,
                    "validDate2": this.form.endDate,
                    DesignId:this.mes.id,
                })
                if(res.status){
                    this.tableData = res.data
                    this.loading = false
                }else{
                    this.$message.error('查询失败'+res.errorMessage);
                }
            },
            // 编辑1 查看2
            edit(data,status){
                this.$emit('addComb',status,data)
            },
            
            async SetStatusDesignGroups(data,status){
                let res = await SetStatusDesignGroups({
                    id:data.id,
                    status:status,
                })
                if(res.status){
                    this.$message({ message: '操作成功', type: 'success' });
                    this.GetdesGroup()
                }else{
                    this.$message.error('操作失败');
                }
            }
        },
        components: {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
