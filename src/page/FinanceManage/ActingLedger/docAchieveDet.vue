<template>
    <div class="actingLedger selCommon">

        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px">
            <el-form-item label="执行日期：" class="form_item_mt10 form_item_wh280">
                <el-date-picker
                    v-model="date"
                    type="daterange"
                    style="width: 200px;"
                    @change="dateSelect"
                    placeholder="选择日期范围">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="关键字："  class="form_item_mt10 form_item_wh280">
                <el-input v-model="formInline.keywords" placeholder="客户/消费商/医护人员" style="width: 200px;" v-on:keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            <el-form-item label="项目："  class="form_item_mt10 form_item_wh280">
                <el-input v-model="formInline.projectName" placeholder="" style="width: 200px;" v-on:keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            <el-form-item label="医院:" class="form_item_mt10">
                <el-select v-model="formInline.hospitalId"  style='width:200px;' @change="selHos">
                    <el-option v-for="(item,index) in hospitalList" :key="index" :label="item.supplierName" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="科室:" class="form_item_mt10">
                <el-select v-model="formInline.deptCode"  style='width:200px;'>
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="(item,index) in deptList" :key="index" :label="item.deptName" :value="item.deptCode"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="项目类型:" class="form_item_mt10">
                <el-select v-model="formInline.type"  style='width:200px;'  @change="onSubmit">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="手术" value="2"></el-option>
                    <el-option label="微整" value="1"></el-option>
                    <el-option label="无痕眼袋" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="执行状态："  class="form_item_mt10 form_item_wh280">
                <el-select v-model="formInline.status" placeholder="" style="width: 200px;" @change="onSubmit">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="未执行" value="0"></el-option>
                    <el-option label="执行中" value="1"></el-option>
                    <el-option label="执行完毕" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label=" " class="form_item_mt10 form_item_wh280">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
                <Export :tHeader="tHeader" :filterVal=' filterVal' :tableData1='tableData1' :name='name'></Export>
            </el-form-item>
        </el-form>

         <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" v-loading.body="loading"  max-height="560" class="expec min_table smt" 
         :summary-method="getSummaries"  show-summary>
            <el-table-column prop="execDate" label="执行日期" width="85" >
                <template slot-scope="scope">
                    <span v-if="scope.row.execDate">{{scope.row.execDate.substring(0,10)}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="orderDate" label="订单日期" width="85" >
                <template slot-scope="scope">
                    <span v-if="scope.row.orderDate">{{scope.row.orderDate.substring(0,10)}}</span>
                </template>
            </el-table-column>
             <el-table-column prop="customerName" label="客户" min-width="68"></el-table-column>
            <el-table-column prop="refrenceBranchName" label="消费商" min-width="68"></el-table-column>
            <el-table-column prop="marketConsultantName" label="咨询师" min-width="68"></el-table-column>
            <el-table-column prop="designerName" label="设计师" min-width="68"></el-table-column>
            <el-table-column prop="designerAssistName" label="设计师助理" min-width="80"></el-table-column>
            <el-table-column prop="doctorName" label="医生" min-width="68"></el-table-column>
            <el-table-column prop="nurseName" label="护士" min-width="68"></el-table-column>
            <el-table-column prop="itemTypeName" label="项目类型" min-width="70">
                <template slot-scope="scope">
                    <span v-if="scope.row.itemType == 1">微整</span>
                    <span v-if="scope.row.itemType == 2">手术</span>
                    <span v-if="scope.row.itemType == 3">无痕眼袋</span>
                </template>
            </el-table-column>
            <el-table-column prop="projectName" label="项目明细" min-width="150" show-overflow-tooltip>
                <!-- <template slot-scope="scope">
                     <div v-if="scope.row.projectName">
                          <el-tooltip class="item" effect="dark" :enterable='false' :content="scope.row.projectName" placement="top" v-if="scope.row.projectName.length>7">
                            <el-button type="text" @click="rowClick(scope.$index,tableData)">{{scope.row.projectName.substring(0,7)}}...</el-button>
                        </el-tooltip>
                        <el-button type="text" v-else style="color:#20a0ff" @click="rowClick(scope.$index,tableData)">
                            {{scope.row.projectName}}
                        </el-button>
                    </div>
                </template> -->
            </el-table-column>
            <el-table-column prop="deptName" label="科室" min-width="70"></el-table-column>
            <!-- <el-table-column prop="orderAmount" label="订单金额" min-width="80" align="right">
                <template slot-scope="scope">
                   {{scope.row.orderAmount.toQFW()}}
                </template>
            </el-table-column> -->
            <el-table-column prop="execCount" label="执行次数" min-width="65" align="right"></el-table-column>
            <!-- <el-table-column prop="execAmount" label="当日执行" min-width="85" align="right"></el-table-column>
            <el-table-column prop="expectAmount" label="已执行" min-width="85" align="right">
                <template slot-scope="scope">
                   {{scope.row.expectAmount.toQFW()}}
                </template>
            </el-table-column>
            <el-table-column prop="unExpectAmount" label="未执行" min-width="80" align="right">
                <template slot-scope="scope">
                   {{scope.row.unExpectAmount.toQFW()}}
                </template>
            </el-table-column> -->
             <!-- <el-table-column prop="serviceAmount" label="附加费" min-width="75" align="right">
                 <template slot-scope="scope">
                   {{scope.row.serviceAmount.toQFW()}}
                </template>
             </el-table-column> -->
            <el-table-column prop="commandStateName" label="执行状态" min-width="75">
                <template slot-scope="scope">
                    <el-tag type="danger" v-if="scope.row.commandState == 0">未执行</el-tag>
                    <el-tag type="warning" v-if="scope.row.commandState == 1">执行中</el-tag>
                    <el-tag type="success" v-if="scope.row.commandState == 2">执行完毕</el-tag>
                </template>
            </el-table-column> 
          </el-table>  
          <div class="block">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
                    :current-page="currentPage" :page-sizes="[50, 100, 200]" :page-size="size"
                    layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
          <!-- <div>共计：{{total}}条数据</div> -->
        <el-dialog ref="read" title="查看详情" :visible.sync="ispopRead" top="5%" @close="ispopRead=false" size="">
            <pop-read v-if="ispopRead" :data="selectData" style="width:950px"></pop-read>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import "@/style/selfCommon.less"
    import PopRead from "@/page/FinanceManage/ReportManage/com/reportRead.vue"
    import Export from '@/components/export'
    import {GetAllPerformance,GetDropDownPermission,GetDeptAllByHospitalCode} from "@/api/myData"
    export default {
        // name:"actingLedger",
        data () {
            return {
                ispopRead:false,
                date:"",
                agentList:[],
                tableData:[],
                formInline:{
                    startDate:"",
                    endDate:"",
                    keywords:"",
                    status:"",
                    hospitalId:"",
                    type:"",
                    timeType:"0",
                    projectName:"",
                    deptCode:"",
                },
                currentPage:1,
                size:50,
                total:0,
                deptList:[],
                hospitalList:[],

                sum:{
                    sum1:0,
                    sum2:0,
                    sum3:0,
                    sum4:0,
                     sum5:0,
                     sum7:0,
                     sum6:0,
                     expectAmount:0,
                     unExpectAmount:0,
                     orderAmount:0,
                },
                time:1,
                loading:false,
                allData:[],
                maxScroll:0,
                mult:1,
                maxHt:0,
                selectData:{},
            }
        },
        computed: {
            /* 导出报表参数 tHeader,filterVal,tableData1*/
            tHeader(){
                return ['执行日期','订单日期', '客户', '消费商', '咨询师', '设计师', '设计师助理', '医生','护士', '项目类型', '项目明细','科室',
                    '订单金额','执行次数','附加费','执行状态']
            },
            filterVal(){
                return ['execDate','orderDate', 'customerName', 'refrenceBranchName', 'marketConsultantName', 'designerName', 'designerAssistName', 'doctorName','nurseName', 'itemTypeName', 'projectName',
                    'deptName','orderAmount','execCount','serviceAmount','commandState']
            },
            tableData1(){
                let arr = JSON.parse(JSON.stringify(this.allData))
                arr.forEach(row=>{
                    row.commandState = row.commandState == 1?"执行中":"执行完毕"
                })
                return arr
            },
            name(){
                return '业绩明细'
            },
            /*导出报表参数 tHeader,filterVal,tableData1*/
        },
      
        mounted(){
            // this.getTop()
            let date = new Date()
            date.setDate("01")
            this.date = [date,new Date()]
            this.GetDropDownPermission()
        },
        methods: {
            async selHos(){
                this.formInline.deptCode = ""
                if(this.formInline.hospitalId.length>0){
                    let resDep = await GetDeptAllByHospitalCode({
                        HospitalCode:this.formInline.hospitalId
                    })
                    this.deptList = resDep.data
                }
            },
            rowClick(index, data){
                this.ispopRead = true
                this.selectData = data[index]
            },
            getTop(){
                let _this = this
                let ov = document.getElementsByClassName("expec")[0].childNodes[2]
                let so = document.getElementsByClassName("el-table__body")[0]
                ov.scrollTop = 0
                // ov.addEventListener("scroll",function(){
                //    if(ov.scrollTop>_this.maxScroll){
                //        _this.maxScroll = ov.scrollTop
                //        if(ov.scrollTop/3200>_this.mult&&(ov.scrollTop>_this.maxHt||_this.maxHt == 0)){
                //            _this.mult++
                //         if(_this.allData.length/100>_this.time){
                //             _this.tableData = _this.tableData.concat(_this.allData.slice(_this.time*100,(_this.time+1)*100))
                //             _this.maxHt = (800).red(_this.tableData.length*40)
                //             _this.time++
                //         }
                //     }
                //    }else{}
                // }); 
            },
            getSummaries(param) {
                return ["总合计",'','','','','','','','','',"","",this.sum.orderAmount.toQFW(),'',this.sum.sum7.toQFW()];
            },
            dateSelect(val){
                if(val == undefined){
                    val = ""
                }
                if(val.length>0){
                    val = val.formatDates()
                    this.formInline.startDate = val.substring(0,10)
                    this.formInline.endDate = val.substring(13)
                }else{
                    this.formInline.startDate = ""
                    this.formInline.endDate = ""
                }
                // this.onSubmit()
            },
            async GetAllPerformance(params){
                let res =await GetAllPerformance(params)
                if(res.status){
                    this.allData = this.deal(res.data)
                     this.loading = false
                    this.tableData = this.allData.slice(0,this.size)
                    // this.pushData(data)
                    this.total = res.count
                }
            },

            deal(data){
                let did = 0,udid = 0
                data.forEach(row=>{
                    for(var p in row){
                        if(row[p] === ""||row[p] == null){
                            row[p] = undefined
                        }
                    }
                    row.arrears = Number(row.realAmount.red(row.orderAmount))
                    row.itemTypeName = this.getTypeName(row.itemType)
                    row.commandStateName = this.getState(row.commandState)
                    this.sum.sum1 =(this.sum.sum1).add(Number(row.orderAmount))
                    this.sum.sum6 = (this.sum.sum6).add(Number(row.execAmount))
                    this.sum.sum7 =  (this.sum.sum7).add(Number(row.serviceAmount))
                    this.sum.expectAmount = (this.sum.expectAmount).add(Number(row.expectAmount))
                    this.sum.unExpectAmount = (this.sum.unExpectAmount).add(Number(row.unExpectAmount)) 
                    did+=Number(row.expectAmount)
                    udid += Number(row.unExpectAmount)
                    this.sum.orderAmount = (this.sum.orderAmount).add(Number(row.orderAmount))
                })
                
                return data
            },

            handleSizeChange(val) {
                this.size = val
                this.getPage()
                this.getTop()
            },

            handleCurrentChange(val) {
                this.currentPage = val
                this.getPage()
                this.getTop()
            },

            getPage(){
                this.tableData = this.allData.slice((this.currentPage-1)*this.size,this.currentPage*this.size)
            },

            getTypeName(code){
                switch(code){
                    case 1:return "微整";
                    case 2:return "手术";
                    case 3:return "无痕眼袋"
                }
            },
            getState(code){
                switch(code){
                    case 0:return "未执行";
                    case 1:return "执行中";
                    case 2:return "执行完毕"
                }
            },
             
            async GetDropDownPermission(){
                try {
                    let res1 = await GetDropDownPermission({typeId: 1});
                    this.hospitalList = res1.data
                    this.formInline.hospitalId = this.hospitalList[0].code
                } catch (err) {

                    console.log(err)
                }
            },
            onSubmit(){
                this.currentPage = 1
                this.search()
            },
            search(){
                this.maxHt = 0
                window.clearTimeout()
                this.time = 1
                this.tableData = []
                this.loading = true
                this.sum = {
                    sum1 : 0,
                    sum2 : 0,
                    sum3 : 0,
                    sum4 : 0,
                    sum5:0,
                    sum7:0,
                    sum6:0,
                    expectAmount:0,
                    unExpectAmount:0,
                    orderAmount:0,
                }
                this.maxScroll = 0
                this.time = 1
                this.mult = 1
                this.GetAllPerformance({
                    Keywords:this.formInline.keywords.removeSP(),
                    CommandState:this.formInline.status,
                    HospitalId:this.formInline.hospitalId,
                    StartDate:this.formInline.startDate,
                    EndDate:this.formInline.endDate,
                    "pageIndex": this.currentPage,
                    "pageSize": this.size,
                    itemType:this.formInline.type,
                    typeId:1,
                     projectName:this.formInline.projectName.removeSP(),
                     DeptCode:this.formInline.deptCode
                    // commandState:this.formInline.timeType
                })
            },
        },
        components: {
            Export,
            PopRead
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
