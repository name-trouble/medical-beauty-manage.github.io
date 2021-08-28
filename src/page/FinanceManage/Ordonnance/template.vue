<template>
    <div>
         <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px" >
            <el-form-item label="模板名称：" class="form_item_mt10">
                <el-input v-model="formInline.keywords" style="width: 200px;" placeholder="编号/客户/服务者/卡号" v-on:keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            
           <el-form-item label="医院:" class="form_item_mt10">
                <el-select v-model="formInline.hospital"  style='width:200px;'>
                    <el-option v-for="(item,index) in hospitalList" :key="index" :label="item.supplierName" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <br/>
            <el-form-item label=" " class="form_item_mt10">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
                <el-button type="primary" @click="add" class="searchBtn">添加模板</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" border style="width: 100%;margin-top:20px" class="min_table4 smt"  v-loading="loading">
             <el-table-column prop="templatName" label="模板名称" min-width="120"> </el-table-column>
             <el-table-column prop="hospitalName" label="医院" min-width="100"> </el-table-column>
            <el-table-column  prop="address"  label="操作" min-width="100">
                 <template slot-scope="scope">
                     <el-button type="primary" size="small" @click="viewTemplate(scope.$index,scope.row)">查看模板</el-button>
                    <el-button type="primary" size="small" @click="edit(scope.$index,scope.row)">编辑模板</el-button>
                    <el-button type="primary" size="small" @click="teplateDrug(scope.$index,scope.row)">选择药品</el-button>
                    <el-button type="primary" size="small"  @click="print(scope.row.id,1)">打印</el-button>
                    <el-button type="danger" size="small"  @click="del(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
       
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

        <!-- 添加产品单弹框 -->
        <el-dialog title="添加产品单" :visible.sync="dialogFormVisible" :close-on-click-modal="false" size="" top="10%">
            <ordonnance @addClose="addClose" ref="addOrd" v-if="dialogFormVisible" style="width:950px" @openSelDrug='openSelDrug' :editMes='editMes'></ordonnance>
        </el-dialog>
        <!-- 添加产品单 -->

        <el-dialog title="查看" :visible.sync="readDialog" :close-on-click-modal="false" size="">
            <!-- <views v-if="readDialog" :mesCode="mesCode" style="width:900px"></views> -->
        </el-dialog>

        <!-- 编辑弹框  -->
        <el-dialog title="编辑" :visible.sync="editDialog" size="" top="10%">
            <edit @addClose="addClose" ref="editOrd" :mesCode="mesCode" :id="mesId" :payMesShow="payMesShow" v-if="editDialog" style="width:950px" @openSelDrug='openSelDrug'></edit>
        </el-dialog>

        <el-dialog title="选择药品" :visible.sync="dialogSelDrug"  top="20%"  size="" :close-on-click-modal="false">
            <selDrug :mes="condition" style="width: 640px" @addDrug="addDrug" v-if="dialogSelDrug"></selDrug>
        </el-dialog>

        <el-dialog title="添加模板" :visible.sync="moduleDialog" :close-on-click-modal="false" size="">
            <el-form :model="ruleForm" ref="ruleForm" label-width="90px" class="">
                <el-form-item label="模板名称：" prop="templateName" :rules="[ { required: true, message: '请选择', trigger: 'blur' }]" class="form_item_mt10">
                    <el-input v-model="ruleForm.templateName" style="width:260px"></el-input>
                </el-form-item>
                <el-form-item label="医院：" prop="hospital" :rules="[ { required: true, message: '请选择', trigger: 'change' }]" class="form_item_mt10">
                    <el-select v-model="ruleForm.hospital" style="width:260px;">
                        <el-option v-if="item.code!=''" v-for="(item,index) in hospitalList" :key="index" :label="item.supplierName" :value="item.code+'|'+item.supplierName"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div class="form_footer">
                <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                <el-button @click="resetForm('ruleForm')">取消</el-button>
            </div>
        </el-dialog>
        <!-- 打印区域 -->
         <!-- <div id="print" style="margin:0;padding:0">
            <p style="margin:0;padding:0">
                <img :src="url" alt="" :width="width" height="auto">
            </p>
        </div> -->
    </div>
</template>
<script>
    import { getCookie } from "@/config/mUtils";
    import "@/style/selfCommon.less"
    import ordonnance from "./com/creatTemplate.vue"
    import views from "./com/view.vue"
    import edit from "./com/edit.vue"
    import selDrug from './com/selDrug'
    import { xmxUrl, baseImgPath } from '@/config/env'
    import { imgApi, acceptImage } from '@/config/common'
    import {GetDropDownPermission,AddPrintTemplat,DeletePrintTemplatById,GetPrintTemplatList,UpdatePrintTemplat} from "@/api/myData"
    export default {
        // name:"",
        data() {
            return {
                moduleDialog:false,
                dialogSelDrug:false,
                loading:false,
                url:"",
                mesId:"",
                mesCode:"",
                size: 10,
                total: 0,
                currentPage: 1,
                date:"",
                width:480,
                dialogFormVisible:false,
                payMesShow:false,
                readDialog:false,
                editDialog:false,
                tableData:[],
                hospitalList:[],
                formInline: {
                    name: '',
                    startDate:"",
                    endDate:"",
                    keywords:"",
                    isPayOff:"",
                    hospital:"",
                    service:"",
                },
                allService:[],
                serviceList:[],
                hrefName:getCookie("userName"),
                condition:{},
                ruleForm:{
                    templateName:'',
                    hospital:'',
                },
                editMes:{}
            };
        },
        mounted(){
            this.url = baseImgPath
            let date = new Date()
            date.setDate("01")
            this.date = [date,new Date()]
            this.GetDropDownPermission()
        },
        methods: {
            viewTemplate(index,data){
                this.editMes = data
                this.editMes.footerShow = false
                this.dialogFormVisible = true
            },
            teplateDrug(index,data){
                this.editMes = data
                this.editMes.footerShow = true
                this.dialogFormVisible = true
            },
            openSelDrug(status,ope,condition){
                
                if(status){//打开选药品窗口
                    this.dialogSelDrug = true
                    this.ope = ope
                    this.condition = condition
                }else{//选择完毕关闭药品窗口
                    this.dialogSelDrug = false
                }
            },
            addDrug(status,obj){
                
                if(status){//选药确认
                    if(this.ope == 'add'){
                        this.$refs.addOrd.addDrugs(obj)
                    }else{
                        this.$refs.editOrd.addDrugs(obj)
                    }
                }else{//取消
                    this.dialogSelDrug = false
                }
            },
            async GetDropDownPermission(){
                let data = {typeId: 1}
                let [res] = await Promise.all([GetDropDownPermission(data)])
                this.hospitalList = res.data
                this.formInline.hospital = getCookie('hospitalCode')?getCookie('hospitalCode'):''
            },
            dateSelect(val){
                if (val) {
                    val = val.formatDates()
                    this.formInline.startDate = val.substring(0, 10)
                    this.formInline.endDate = val.substring(13)
                } else {
                    this.formInline.startDate = ""
                    this.formInline.endDate = ""
                }
                this.onSubmit()
            },
            // 添加完成的回调
            addClose(val){
                if(val){
                    this.search()
                }
                this.dialogFormVisible = false
                this.editDialog = false
            },
            // 添加产品单
            add(){
                this.ruleForm.templateName = ''
                this.ruleForm.hospital = ''
                this.editMes = {}
                this.moduleDialog = true
            },
            onSubmit(){
                this.currentPage = 1
                this.search()
            },
            search(){
                this.GetPrintTemplatList({
                    KeyWords:this.formInline.keywords.removeSP(),
                    PageSize:this.size,
                    PageIndex:this.currentPage,
                    hospitalCode:this.formInline.hospital,
                })
            },
            async GetPrintTemplatList(params){
                this.loading = true
                let res = await GetPrintTemplatList(params)
                if(res.status){
                    this.tableData = res.data
                    this.total = res.count
                }else{
                    this.$message({ type: 'warning', message: '获取数据失败!'+res.errorMessage })
                }
                this.loading = false
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.size = val
                this.search()
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val
                this.search()
            },
            edit(index,data){
                this.ruleForm.hospital = data.hospitalCode+'|'+data.hospitalName
                this.ruleForm.templateName = data.templatName
                
                this.editMes = data
                this.moduleDialog = true
            },
            views(index,data){
                this.mesCode = data[index].orderProductCode
                this.readDialog = true
            },
            print(code,ope){
                let url =  document.location.protocol +"//" + document.location.hostname +(80 == document.location.port || "" == document.location.port ? "": ":" + document.location.port) +"/";
                if (baseImgPath.indexOf("192") >= 0) {
                  let newWin = window.open(url + "print/printOrdonnance.html?code=" + code + "&ope=" + 4);// 1 2 3 已有代表
                } else {
                  let newWin = window.open(url + "print/printOrdonnance.html?code=" + code + "&ope=" + 4);// 1 2 3 已有代表
                }
                    // var newstr = document.all.item('print').innerHTML;
                    // let newWin = window.open(window.location.origin+'/aaa')
                    // newWin.document.write(newstr)
                    // newWin.setTimeout(()=>{
                    //     newWin.print()
                    // },500)
                    // window.location.href=window.location.origin+'/print.html/url='+this.url;
                    // return false;
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let obj = {//产品单数据
                            'hospitalCode':this.ruleForm.hospital.split("|")[0],
                            'hospitalName':this.ruleForm.hospital.split("|")[1],
                            'templatName':this.ruleForm.templateName,
                        }
                        let ope = this.editMes.id?'编辑': '添加'
                        if(this.editMes.id){
                            obj.modifiedUserId = getCookie("userId")
                            obj.modifiedBy = getCookie("userName")
                            obj = Object.assign({},this.editMes,obj)
                        }else{
                            obj.createUserId = getCookie("userId")
                            obj.createBy = getCookie("userName")
                        }
                        this.AddPrintTemplat(obj,ope)
                    }
                });
            },
            resetForm(formName) {
                this.moduleDialog = false
            },
            async AddPrintTemplat(params,ope){
                let res
                if(this.editMes.id){
                    res = await UpdatePrintTemplat(params)
                }else{
                    res = await AddPrintTemplat(params)
                }
                if(res.status){
                    this.$message({ type: 'success', message: ope+'成功!' })
                    this.moduleDialog = false
                    this.search()
                }else{
                    this.$message({ type: 'error', message: ope+'失败!'+res.errorMessage })
                }
            },
            async DeletePrintTemplatById(params){
                let res = await DeletePrintTemplatById(params)
                if(res.status){
                     this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.search()
                }else{
                    this.$message.error('删除失败');
                }
            },
            del(id){
                this.$confirm('此操作将删除该模板, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                   this.DeletePrintTemplatById({
                        id:id
                    })
                }).catch(() => {
                            
                });
                
            },
        },
        components:{
            ordonnance,
            selDrug,
            views,
            edit
        }
    }
</script>
<style scoped>
.block{
    margin-top: 20px;
    float: right
}
#print{
    display: none;
}
</style>

