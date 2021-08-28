<template>
    <div class="settled selCommon">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px"  >
            <el-form-item label="支付日期："  class="form_item_mt10 ">
                <el-date-picker
                    v-model="date"
                    type="daterange"
                    @change="dateChange"
                    
                    placeholder="选择日期范围">
                </el-date-picker>
            </el-form-item>
          
            <el-form-item label="项目类型："  class="form_item_mt10 form_item_wh280">
                <el-select v-model="formInline.itemType" placeholder="" style="width: 200px;">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="代理费" value="1"></el-option>
                    <el-option label="券" value="2"></el-option>
                    <el-option label="充值" value="3"></el-option>
                    <el-option label="升级" value="4"></el-option>
                    <el-option label="额外费" value="5"></el-option>
                    <el-option label="服务商注册费" value="6"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="项目明细："  class="form_item_mt10 form_item_wh280">
                <el-select v-model="formInline.itemDetail" placeholder="" style="width: 200px;">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="买套餐" value="买套餐"></el-option>
                    <el-option label="卡券" value="卡券"></el-option>
                    <el-option label="充值" value="充值"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="医院:" class="form_item_mt10">
                <el-select v-model="formInline.Hospital"  style='width:200px;'>
                    <el-option v-for="(item,index) in HospitalList" :key="index" :label="item.supplierName" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="销售公司："  class="form_item_mt10 form_item_wh280">
                <el-select v-model="formInline.branch" placeholder="" style="width: 200px;">
                    <el-option v-for="item in branchList" :key="item.branchName" :label="item.branchName" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label=" " class="form_item_mt10 form_item_wh280">
                <el-button type="primary" @click="search" class="searchBtn">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" border ref="sort"  style="width: 100%;margin-top:15px;margin-bottom:10px;" max-height="640" :summary-method="getSummaries"
        show-summary  class="min_table smt" v-loading="loading" :default-sort = "{prop: 'payDate', order: 'descending'}">
            <el-table-column prop="payDate" label="支付日期" width="90">
                <template slot-scope="scope">
                      <span v-if="scope.row.payDate">
                          {{scope.row.payDate.substring(0,10)}}
                      </span>
                </template>
            </el-table-column>
            <el-table-column prop="realAmount1" label="现金" min-width="75" align="right" :sortable="sortable" >
                <template slot-scope="scope">
                      <el-button type="text" @click="viewDet(scope.row,'001',scope.row.realAmount1,'现金')" v-if="scope.row.realAmount1>0">
                        {{scope.row.realAmount1.toQFW()}}
                    </el-button>
                      <span style="float: right" v-else>
                          {{scope.row.realAmount1.toQFW()}}
                      </span>
                </template>
            </el-table-column>
            <el-table-column prop="realAmount2" label="网银" min-width="75" align="right" :sortable="sortable" >
                <template slot-scope="scope">
                      <el-button type="text" @click="viewDet(scope.row,'002',scope.row.realAmount2,'网银')" v-if="scope.row.realAmount2>0">
                        {{scope.row.realAmount2.toQFW()}}
                    </el-button>
                      <span style="float: right" v-else>
                          {{scope.row.realAmount2.toQFW()}}
                      </span>
                </template>
            </el-table-column>
            <el-table-column prop="realAmount3" label="支付宝" min-width="75" align="right" :sortable="sortable" >
                <template slot-scope="scope">
                     <el-button type="text" @click="viewDet(scope.row,'003',scope.row.realAmount3,'支付宝')" v-if="scope.row.realAmount3>0">
                        {{scope.row.realAmount3.toQFW()}}
                    </el-button>
                      <span style="float: right" v-else>
                          {{scope.row.realAmount3.toQFW()}}
                      </span>
                </template>
            </el-table-column>
            <el-table-column prop="realAmount4" label="微信" min-width="75" align="right" :sortable="sortable" >
                <template slot-scope="scope">
                    <el-button type="text" @click="viewDet(scope.row,'004',scope.row.realAmount4,'微信')" v-if="scope.row.realAmount4>0">
                        {{scope.row.realAmount4.toQFW()}}
                    </el-button>
                      <span style="float: right" v-else>
                          {{scope.row.realAmount4.toQFW()}}
                      </span>
                </template>
            </el-table-column>
            <el-table-column prop="realAmount5" label="银联借记卡" min-width="100" align="right" :sortable="sortable" > 
                <template slot-scope="scope">
                      <el-button type="text" @click="viewDet(scope.row,'005',scope.row.realAmount5,'银联借记卡')" v-if="scope.row.realAmount5>0">
                        {{scope.row.realAmount5.toQFW()}}
                    </el-button>
                      <span style="float: right" v-else>
                          {{scope.row.realAmount5.toQFW()}}
                      </span>
                </template>
            </el-table-column>
            <el-table-column prop="realAmount6" label="银联信用卡" min-width="100" align="right" :sortable="sortable" >
                <template slot-scope="scope">
                    <el-button type="text" @click="viewDet(scope.row,'006',scope.row.realAmount6,'银联信用卡')" v-if="scope.row.realAmount6>0">
                        {{scope.row.realAmount6.toQFW()}}
                    </el-button>
                    <span style="float: right" v-else>
                          {{scope.row.realAmount6.toQFW()}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="realAmount7" label="分期贷" min-width="80" align="right" :sortable="sortable" >
                <template slot-scope="scope">
                    <el-button type="text" @click="viewDet(scope.row,'007',scope.row.realAmount7,'分期贷')" v-if="scope.row.realAmount7>0">
                        {{scope.row.realAmount7.toQFW()}}
                    </el-button>
                    <span style="float: right" v-else>
                          {{scope.row.realAmount7.toQFW()}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="realAmount12" label="么么贷" min-width="80" align="right" :sortable="sortable" >
                <template slot-scope="scope">
                    <el-button type="text" @click="viewDet(scope.row,'012',scope.row.realAmount12,'么么贷')" v-if="scope.row.realAmount12>0">
                        {{scope.row.realAmount12.toQFW()}}
                    </el-button>
                    <span style="float: right" v-else>
                          {{scope.row.realAmount12.toQFW()}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="realAmount13" label="即分期" min-width="80" align="right" :sortable="sortable" >
                <template slot-scope="scope">
                    <el-button type="text" @click="viewDet(scope.row,'013',scope.row.realAmount13,'即分期')" v-if="scope.row.realAmount13>0">
                        {{scope.row.realAmount13.toQFW()}}
                    </el-button>
                    <span style="float: right" v-else>
                          {{scope.row.realAmount13.toQFW()}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="realAmount14" label="马上分期" min-width="80" align="right" :sortable="sortable" >
                <template slot-scope="scope">
                    <el-button type="text" @click="viewDet(scope.row,'014',scope.row.realAmount14,'马上分期')" v-if="scope.row.realAmount14>0">
                        {{scope.row.realAmount14.toQFW()}}
                    </el-button>
                    <span style="float: right" v-else>
                          {{scope.row.realAmount14.toQFW()}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="realAmount15" label="即有分期" min-width="80" align="right" :sortable="sortable" >
                <template slot-scope="scope">
                    <el-button type="text" @click="viewDet(scope.row,'015',scope.row.realAmount15,'即有分期')" v-if="scope.row.realAmount15>0">
                        {{scope.row.realAmount15.toQFW()}}
                    </el-button>
                    <span style="float: right" v-else>
                          {{scope.row.realAmount15.toQFW()}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="realAmount16" label="丽人贷" min-width="80" align="right" :sortable="sortable" >
                <template slot-scope="scope">
                    <el-button type="text" @click="viewDet(scope.row,'016',scope.row.realAmount16,'丽人贷')" v-if="scope.row.realAmount16>0">
                        {{scope.row.realAmount16.toQFW()}}
                    </el-button>
                    <span style="float: right" v-else>
                          {{scope.row.realAmount16.toQFW()}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="realAmount17" label="任买" min-width="80" align="right" :sortable="sortable" >
                <template slot-scope="scope">
                    <el-button type="text" @click="viewDet(scope.row,'017',scope.row.realAmount17,'任买')" v-if="scope.row.realAmount17>0">
                        {{scope.row.realAmount17.toQFW()}}
                    </el-button>
                    <span style="float: right" v-else>
                          {{scope.row.realAmount17.toQFW()}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="realAmount18" label="预付款" min-width="80" align="right">
                <template slot-scope="scope">
                    <el-button type="text" @click="viewDet(scope.row,'018',scope.row.realAmount18,'预付款')" v-if="scope.row.realAmount18>0" style="float: right;">
                        {{scope.row.realAmount18.toQFW()}}
                    </el-button>
                    <span style="float: right;" v-else>
                          {{scope.row.realAmount18.toQFW()}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="amount" label="合计" min-width="100" align="right" >
                <template slot-scope="scope">
                      <span style="float: right">
                          {{scope.row.amount.toQFW()}}
                      </span>
                </template>
            </el-table-column>
           
        </el-table>
        <!-- 分页 -->
        <!-- <div class="">
            <el-pagination
                 @size-change="handleSizeChange"
                 @current-change="handleCurrentChange"
                 :current-page="currentPage"
                 :page-sizes="[10, 30, 50, 100]"
                 :page-size="size"
                 layout="total, sizes, prev, pager, next, jumper"
                 :total="total">
             </el-pagination> -->
            <!-- 共{{total}}条数据 -->
        <!-- </div> -->

        <el-dialog :title="title" :visible.sync="dialogView"  top="5%"  size="" :close-on-click-modal="false">
             <Det :detDate="detDate" v-if="dialogView" :propTotal="propTotal" :selAccount="selAccount" :from="from"></Det>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import Det from "./com/det.vue"
    import {GetDropDownPermission,GetBranchTicketPayDetail,GetBranchTicketPay} from "@/api/myData"
    import "@/style/selfCommon.less"
    export default {
        data () {
            return {
                date:"",
                mes:{},
                dialogView:false,
                total:0,
                size:10,
                currentPage:1,
                HospitalList:[],
                branchList:[],
                allBranch:[],
                formInline: {
                    branch:"",
                    Hospital:"",
                    startDate:"",
                    endDate:"",
                    itemType:"",
                    itemDetail:"",
                },
                sortable:true,
                title:"",
                tableData:[],
                detDate:[],
                loading:false,
                selAccount:false,
                propTotal:"",
                from:false,
            }
        },
        computed: {
            /* 导出报表参数 tHeader,filterVal,tableData1*/
            // tHeader(){
            //     return ['日期','现金', '网银', '支付宝', '微信','银联借记卡','银联信用卡','分期贷','卡券','积分','套餐','门票','么么贷','即分期','马上分期','即有分期','丽人贷','任买','预付款']
            // },
            // filterVal(){
            //     return ['orderDate','realAmount1', 'realAmount2', 'realAmount3', 'realAmount4', 'realAmount5', 'realAmount6', 'realAmount7', 'realAmount8', 'realAmount9', 'realAmount10'
            //     , 'realAmount11', 'realAmount12', 'realAmount13', 'realAmount14', 'realAmount15', 'realAmount16', 'realAmount17', 'realAmount18','amount']
            // },
            // name(){
            //     return '医院收款明细'
            // },
            // reportData(){
            //     
            //     let arr = JSON.parse(JSON.stringify(this.tableData))
            //     // if(this.tableData.length>0){
            //     //     let sum = JSON.parse(JSON.stringify(arr[0]))
            //     //     for(var p in sum){
            //     //         sum[p] = 0
            //     //     }
            //     //     sum.orderDate = "合计"
            //     //     arr.forEach(row=>{
            //     //         for(var i=1;i<19;i++){
            //     //             
            //     //             sum["realAmount"+i] = sum["realAmount"+i].add(row["realAmount"+i])
            //     //         }
            //     //         sum["amount"] = sum["amount"].add(row["amount"])
            //     //     })
            //     //      arr.push(sum)
            //     // }
            //     return arr
            // },
        },
       
        mounted(){
            let date1 = new Date()
            date1.setDate(1)
            this.date = [date1,new Date()]
            this.getSupplierByPage()
        },
        methods: {
            resetSortable() {
                
            },
            selBranch(){
                this.formInline.branch = ""
                if(this.formInline.Hospital == ""){
                    this.branchList = JSON.parse(JSON.stringify(this.allBranch))
                }else{
                    this.branchList = [{branchName:"全部",code:"",hospitalCode:"",hospitalName:""}]
                    this.allBranch.forEach(row=>{
                        if(row.hospitalCode == this.formInline.Hospital){
                            this.branchList.push(row)
                        }
                    })
                }
            },
            getSummaries(param) {
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '合计';
                    return;
                }
                const values = data.map(item => Number(item[column.property]));

                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                    const value = Number(curr);
                    if (!isNaN(value)) {
                        return prev.add(curr);
                    } else {
                        return prev;
                    }
                    }, 0);
                    sums[index] = sums[index].toQFW();
                } else {
                    // sums[index] = 'N/A';
                }
                });
                return sums;
            },
            
            colClick(column, event){
                
            },
            dateChange(val){
                if(val){
                    val = val.formatDates()
                    this.formInline.startDate = val.substring(0,10)
                    this.formInline.endDate = val.substring(13)
                }else{
                    this.formInline.startDate = ""
                    this.formInline.endDate = ""
                }
                
            },
            async GetBranchTicketPay(params){
                try {
                    this.loading = true
                    let res = await GetBranchTicketPay(params)
                    this.loading = false
                    if(res.status){
                        this.total = res.count
                        res.data.forEach(row=>{
                            row.amount = row.realAmount1+row.realAmount2+row.realAmount3+row.realAmount4+
                            row.realAmount5+row.realAmount6+row.realAmount7+row.realAmount12+row.realAmount13+
                            row.realAmount14+row.realAmount15+row.realAmount16+row.realAmount17+row.realAmount18
                        })
                        this.tableData = res.data
                    }else{
                        this.$message({ type: 'error', message: '查询失败!'+res.errorMessage })
                    }
                    this.sortable = true
                } catch (err) {
                    console.log(err)
                }
            },
            async getSupplierByPage(){
                let res0 = await GetDropDownPermission({typeId:2})
                this.branchList = res0.data
                this.allBranch = res0.data
                this.formInline.branch = res0.data[0].code
                let res = await GetDropDownPermission({typeId:1})
                this.formInline.Hospital = res.data[0].code
                this.HospitalList = res.data
                // this.submit()
            },
            search(){
                this.detDate = []
                this.currentPage = 1
                this.submit()
            },
            submit(){
                this.loading = true
                this.sortable = 'custom'
                this.GetBranchTicketPay({
                    startDate :this.formInline.startDate,
                    endDate:this.formInline.endDate,
                    // pageIndex:this.currentPage,
                    // pageSize:this.size,
                    branchCode:this.formInline.branch,
                    itemType:this.formInline.itemType,
                    itemDetail:this.formInline.itemDetail,
                    hospitalCode:this.formInline.Hospital
                })
            },

            async GetDetail(params){
                let res = await GetBranchTicketPayDetail(params)
                this.detDate = res.data
                this.dialogView = true
            },

            handleSizeChange(val) {
                this.size = val
                this.submit()
             },
             handleCurrentChange(val) {
                this.currentPage = val
                this.submit()
             },
             viewDet(data,status,total,ope){
                 this.title = ope
                 this.propTotal = total
                 this.selAccount = status == "005"?true:false
                 this.GetDetail({
                     BranchCode:this.formInline.branch,
                     PayType:status,
                     PayDate:data.payDate.substring(0,10),
                     itemType:this.formInline.itemType,
                    itemDetail:this.formInline.itemDetail,
                 })
             }
        },
        components: {
            Det
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
