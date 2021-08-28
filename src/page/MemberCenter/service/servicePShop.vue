<template>
    <div class="selCommon MemberManage">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="85px">
            <el-form-item label="注册时间：" class="form_item_mt10">
                <el-date-picker
                    v-model="date"
                    type="daterange"
                    class="form_sear_ipt"
                    @change="dateSelect"
                    placeholder="选择日期范围">
                </el-date-picker>
            </el-form-item>
           
            <el-form-item label="启用状态：" class="form_item_mt10">
               <el-select v-model="formInline.isEnable"  class="form_sear_ipt" @change="onSubmit">
                   <el-option label="全部" value=""></el-option>
                   <el-option label="未启用" value="0"></el-option>
                   <el-option label="已启用" value="1"></el-option>
               </el-select>
            </el-form-item>
             <el-form-item label="支付状态：" class="form_item_mt10">
               <el-select v-model="formInline.isPayOff"  class="form_sear_ipt" @change="onSubmit">
                   <el-option label="全部" value=""></el-option>
                   <el-option label="未付清" value="0"></el-option>
                   <el-option label="已付清" value="1"></el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="医院：" class="form_item_mt10">
                <el-select v-model="formInline.hospital" class="form_sear_ipt" @change="onSubmit">
                    <el-option v-for="(item,index) in hospitalList" :key="index" :label="item.supplierName" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="关键字：" class="form_item_mt10">
                <el-input v-model="formInline.keywords" placeholder="" class="form_sear_ipt"  v-on:keyup.enter.native="onSubmit"></el-input>
            </el-form-item><br/>
            <el-form-item label=" " class="form_item_mt10">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
            </el-form-item>
        </el-form>
        <!-- 信息表 -->
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px" class="smt min_table"  v-loading="loading">
            <el-table-column prop="code" width="120" label="服务商编号" >
                <template slot-scope="scope">
                    <el-button type="text" @click="det(scope.row)">{{scope.row.code}}</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="registDate" width="100" label="注册日期" >
                <template slot-scope="scope">
                    <span v-if="scope.row.registDate">
                        {{scope.row.registDate.substring(0,10)}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="serviceInfoName" label="服务商" min-width="80"> </el-table-column>
            <el-table-column prop="serviceGrade" label="等级" min-width="70">
                <template slot-scope="scope">
                    <span v-if="scope.row.serviceGrade == 1">总监</span>
                    <span v-if="scope.row.serviceGrade == 2">经理</span>
                    <span v-if="scope.row.serviceGrade == 3">科长</span>
                    <span v-if="scope.row.serviceGrade == 4">组长</span>
                    <span v-if="scope.row.serviceGrade == 5">美导</span>
                </template>
            </el-table-column>
            <el-table-column prop="phoneNumber" label="手机号" min-width="120">
                <template slot-scope="scope">
                    <span v-if="scope.row.phoneNumber">{{scope.row.phoneNumber.substring(0,3)+'****'+scope.row.phoneNumber.substring(7)}}</span>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="IDCard" label="身份证号" min-width="100"></el-table-column> -->
            <el-table-column prop="birthday" label="生日" min-width="100"></el-table-column>
            <el-table-column prop="sex" label="性别" min-width="70">
                <template slot-scope="scope">
                    <span v-if="scope.row.sex == 1">男</span>
                    <span v-if="scope.row.sex == 0">女</span>
                </template>
            </el-table-column>
            <el-table-column prop="referrerName" label="推荐人" min-width="180">
                <template slot-scope="scope">
                    {{scope.row.referrerName}} [{{scope.row.referrerCode}}]
                </template>
            </el-table-column>
            <el-table-column prop="hospitalName" label="医院" min-width="150"></el-table-column>
            <el-table-column prop="IsAuth" label="支付状态" min-width="100">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.isPayOff==0?'danger':'success'" v-text="scope.row.isPayOff==0?'未付清':'已付清'"></el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="isEnable" label="启用状态" min-width="100">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.isEnable==2?'danger':'success'" v-text="scope.row.isEnable==2?'退会':'启用'"></el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="createBy" label="创建人" min-width="100"></el-table-column>
            <el-table-column prop="IsAuth" label="操作" min-width="120" align="center">
                <template slot-scope="scope">
                    <!-- <el-button @click="register(scope.row,'服务商编辑')" type="primary" size="small">编辑</el-button>
                    <el-button @click="del(scope.row,1)" type="primary" size="small">删除</el-button>
                    <el-button @click="del(scope.row,0)" type="primary" size="small" :disabled="scope.row.isEnable==2">退会</el-button> -->
                    <el-button @click="serviceObj(scope.row)" type="primary" size="small">服务店家配置</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 信息表 -->

        <!-- 分页 -->
        <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
        <!-- 分页 -->

      <!--注册弹窗-->
        <el-dialog :title="title" :visible.sync="dialogTableVisible" size="" :close-on-click-modal="false" top="5%">
            <register style="width: 900px" @close="close" v-if="dialogTableVisible" :mes="mes"></register>
        </el-dialog>
        <el-dialog title="服务商详情" :visible.sync="dialogTableVisibleD" size="" :close-on-click-modal="false" top="20%">
            <det style="width: 800px" v-if="dialogTableVisibleD" :mes="mes"></det>
        </el-dialog>

        <el-dialog title="选择服务店家" :visible.sync="selectDialog" size="" :close-on-click-modal="false" top="5%">
            <shopSelect style="width: 1000px" v-if="selectDialog" :mes="mes" @selectShopCallback='selectShopCallback' :selectShopData="selectShopData"></shopSelect>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import  "../../../style/selfCommon.less"
    import { xmxUrl } from '@/config/env'
    import shopSelect from './com/shopSelect'
    import register from "./com/register.vue"
    // import editRegister from "./com/editRigster.vue"
    import det from "./com/memberDet"
    import {GetDropDownPermission,GetServiceInfo,DeleteServiceInfo,GetServiceShop,SignOutServiceInfo} from "@/api/myData"
    import { getStore } from '@/config/mUtils';
    export default {
        data () {
            return {
                selectDialog:false,
                xmxUrl,
                title:'',
                typeCode:getStore('typeCode'),
                loading:true,
                mes:{},
                dialogTableVisible:false,
                dialogTableVisible1:false,
                dialogTableVisibleD:false,
                total:10,
                size:10,
                currentPage:1,
                hospitalList:[],
                date:"",
                formInline:{
                    date1:"",
                    date2:"",
                    hospital:'',
                    keywords:'',
                    isEnable:'',
                    isPayOff:'',
                },
                tableData:[],
                selectShopData:[],//已选择的商户
            }
        },
        computed: {
            /* 导出报表参数 tHeader,filterVal,tableData1*/
            // tHeader(){
            //     return ['会员编号','注册日期', '会员', '手机号', '身份证号', '生日', '性别', '推荐人','推荐人等级','医院','认证状态']
            // },
            // filterVal(){
            //     return ['Code', 'CreateOn', 'MemberName', 'PhoneNumber', 'IDCard','Birthday','Sex','ReferrerName','grade','grade','IsAuth']
            // },
            // tableData1(){
            //     return this.tableData
            // },
            // name(){
            //     return '会员管理'
            // },
            /*导出报表参数 tHeader,filterVal,tableData1*/
        },
        
        mounted(){
           this.getHospital()
        },
        methods:{
            async SignOutServiceInfo(params){
                let res = await SignOutServiceInfo(params)
                if(res.status){
                        this.$message({message: '操作成功', type: 'success'})
                        this.search()
                    }else{
                        this.$message.error('操作失败')
                    }
            },
            del(data,ope){
                let message = ope == 1?'删除':'修改'
                this.$confirm('此操作将'+message+'该服务商信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if(ope == 1){
                        this.DeleteServiceInfo({id:data.id})
                    }else{
                        this.SignOutServiceInfo(data)
                    }
                })
            },
            async DeleteServiceInfo(params){
                let res = await DeleteServiceInfo(params)
                if(res.status){
                        this.$message({message: '删除成功', type: 'success'})
                        this.search()
                    }else{
                        this.$message.error('删除失败')
                    }
            },


            async getHospital(params){
                try {
                    let [res1] = await Promise.all([GetDropDownPermission({typeId: 1})])
                    this.hospitalList = res1.data
                    this.formInline.hospital = this.hospitalList[0].code
                    this.search()
                } catch (err) {
                    console.log(err)
                }
            },
//            获取会员
            async GetServiceInfo(params){
                try {
                    let res = await GetServiceInfo(params)
                    this.loading = false
                    this.total = res.count
                    this.tableData = res.data
                } catch (err) {
                    console.log(err)
                }
            },

            onSubmit(){
                this.currentPage = 1
                this.search()
            },
           
            search(){
                this.loading = true
                this.GetServiceInfo({
                    pageIndex:this.currentPage,
                    pageSize:this.size,
                    startDate:this.formInline.date1,
                    endDate:this.formInline.date2,
                    hospitalCode:this.formInline.hospital,
                    "isEnable": this.formInline.isEnable,
                    "isPayOff": this.formInline.isPayOff,
                    "keywords": this.formInline.keywords,
                })
            },
            dateSelect(val){
                if(val){
                    val = val.formatDates()
                    this.formInline.date1 = val.substring(0,10)
                    this.formInline.date2 = val.substring(13)
                }else{
                    this.formInline.date1 = ""
                    this.formInline.date2 = ""
                }
                this.onSubmit()
            },

            edit(index,data){
                this.mes=data[index]
                this.dialogTableVisible1 = true
            },
       
            handleSizeChange(val) {
                this.size = val
                this.search()
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.search()
            },

            register(data,title){
                this.title = title
                if(data){this.mes = JSON.parse(JSON.stringify(data))}
                else{
                    this.mes = {}
                }
                this.dialogTableVisible = true
            },
            
            close(val){
                this.dialogTableVisible = false
                if(val){
                    this.search()
                }
            },
            det(data){
                this.dialogTableVisibleD = true
                this.mes = data
            },
            async serviceObj(data){
                this.mes = data
                this.selectDialog = true
                let res = await GetServiceShop({
                    ServiceCode:data.code
                })
                
                this.selectShopData = res.data
            },
            selectShopCallback(val){
                if(val){
                    this.search()
                }
                this.selectDialog = false
            },
        },
        components: {
            register,
            det,shopSelect
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
