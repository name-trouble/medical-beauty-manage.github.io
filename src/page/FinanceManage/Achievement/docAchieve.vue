<template>
    <div class=" selCommon ">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px"  >
            <el-form-item label="执行时间："  class="form_item_mt10 form_item_wh280">
                <el-date-picker
                    v-model="formInline.date"
                    type="daterange"
                    @change="dateChange"
                    placeholder="选择日期范围">
                </el-date-picker>
            </el-form-item>
             <el-form-item label="医院:" class="form_item_mt10">
                <el-select v-model="formInline.hospital"  style='width:200px;' @change="selHos">
                    <el-option v-for="(item,index) in hospitalList" :key="index" :label="item.supplierName" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="科室:" class="form_item_mt10">
                <el-select v-model="formInline.deptCode"  style='width:200px;'>
                    <el-option v-for="(item,index) in deptList" :key="index" :label="item.deptName" :value="item.deptCode"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label=" " class="form_item_mt10 ">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
                <!-- <Export :tHeader="tHeader" :filterVal='filterVal'
                        :tableData1='tableData1' :name='name'></Export> -->
            </el-form-item>
        </el-form>
        <!-- 信息表 -->
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" max-height="600" v-loading.body="loading"
         show-summary class="min_table" :summary-method="getSummaries">
            <el-table-column prop="serviceName" label="医生" width="70">
                <template slot-scope="scope">
                    <span>{{scope.row.serviceName}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="country" label="国籍" width="80"></el-table-column>
            <el-table-column prop="" label="手术" min-width="50"  align="center">
                <el-table-column prop="sS_RealPrice" label="消费金额" min-width="85" align="right">
                    <template slot-scope="scope">
                        <el-button type="text"  v-if="scope.row.sS_RealPrice>0" @click="MShow(scope.row,1,2)">{{scope.row.sS_RealPrice.toQFW()}}</el-button>
                        <span v-else>0</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="sS_RealPriceWu" label="无" min-width="85" align="right">
                    <template slot-scope="scope">
                        <span v-if="scope.row.sS_RealPriceWu == null">0</span>
                        <span v-else>
                            {{scope.row.sS_RealPriceWu.toQFW()}}
                        </span>
                    </template>
                </el-table-column>    -->
                <el-table-column prop="sS_RealPriceJiFen" label="积分" min-width="85" align="right">
                    <template slot-scope="scope">
                         <el-button type="text"  v-if="scope.row.sS_RealPriceJiFen>0" @click="MShow(scope.row,2,2)">{{scope.row.sS_RealPriceJiFen.toQFW()}}</el-button>
                        <span v-else>0</span>
                    </template>
                </el-table-column>   
                
                <el-table-column prop="sS_RealPriceZhuan" label="消转代" min-width="85" align="right">
                   <template slot-scope="scope">
                       <el-button type="text"  v-if="scope.row.sS_RealPriceZhuan>0" @click="MShow(scope.row,3,2)">{{scope.row.sS_RealPriceZhuan.toQFW()}}</el-button>
                        <span v-else>0</span>
                    </template>
                </el-table-column>
                 <el-table-column prop="sS_RealPrice6" label="6折" min-width="80" align="right">
                   <template slot-scope="scope">
                       <el-button type="text"  v-if="scope.row.sS_RealPrice6>0" @click="MShow(scope.row,4,2)">{{scope.row.sS_RealPrice6.toQFW()}}</el-button>
                        <span v-else>0</span>
                    </template>
                </el-table-column>
                <el-table-column prop="sS_RealPrice4" label="4折" min-width="80" align="right">
                   <template slot-scope="scope">
                        <el-button type="text"  v-if="scope.row.sS_RealPrice4>0" @click="MShow(scope.row,5,2)">{{scope.row.sS_RealPrice4.toQFW()}}</el-button>
                        <span v-else>0</span>
                    </template>
                </el-table-column>
                  <el-table-column prop="sS_RealPrice2_5" label="2.5折" min-width="80" align="right">
                   <template slot-scope="scope">
                       <el-button type="text"  v-if="scope.row.sS_RealPrice2_5>0" @click="MShow(scope.row,6,2)">{{scope.row.sS_RealPrice2_5.toQFW()}}</el-button>
                        <span v-else>0</span>
                    </template>
                </el-table-column>
                <el-table-column prop="sS_MPCount" label="门票" min-width="60" align="right">
                   
                </el-table-column>
            </el-table-column>
            <el-table-column prop="" label="微整" align="center" min-width="50">
               <el-table-column prop="wZ_RealPrice" label="消费金额" min-width="85" align="right">
                   <template slot-scope="scope">
                       <el-button type="text"  v-if="scope.row.wZ_RealPrice>0" @click="MShow(scope.row,1,1)">{{scope.row.wZ_RealPrice.toQFW()}}</el-button>
                        <span v-else>0</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="wZ_RealPriceWu" label="无" min-width="85" align="right">
                    <template slot-scope="scope">
                        <span v-if="scope.row.wZ_RealPriceWu == null">0</span>
                        <span v-else>
                            {{scope.row.wZ_RealPriceWu.toQFW()}}
                        </span>
                    </template>
                </el-table-column>  -->
                <el-table-column prop="wZ_RealPriceJiFen" label="积分" min-width="85" align="right">
                   <template slot-scope="scope">
                       <el-button type="text"  v-if="scope.row.wZ_RealPriceJiFen>0" @click="MShow(scope.row,2,1)">{{scope.row.wZ_RealPriceJiFen.toQFW()}}</el-button>
                        <span v-else>0</span>
                    </template>
                </el-table-column>
                <el-table-column prop="wZ_RealPriceZhuan" label="消转代" min-width="85" align="right">
                   <template slot-scope="scope">
                       <el-button type="text"  v-if="scope.row.wZ_RealPriceZhuan>0" @click="MShow(scope.row,3,1)">{{scope.row.wZ_RealPriceZhuan.toQFW()}}</el-button>
                        <span v-else>0</span>
                    </template>
                </el-table-column>
                 <el-table-column prop="wZ_RealPrice6" label="6折" min-width="80" align="right">
                   <template slot-scope="scope">
                       <el-button type="text"  v-if="scope.row.wZ_RealPrice6>0" @click="MShow(scope.row,4,1)">{{scope.row.wZ_RealPrice6.toQFW()}}</el-button>
                        <span v-else>0</span>
                    </template>
                </el-table-column>
                <el-table-column prop="wZ_RealPrice4" label="4折" min-width="80" align="right">
                   <template slot-scope="scope">
                       <el-button type="text"  v-if="scope.row.wZ_RealPrice4>0" @click="MShow(scope.row,5,1)">{{scope.row.wZ_RealPrice4.toQFW()}}</el-button>
                        <span v-else>0</span>
                    </template>
                </el-table-column>
                  <el-table-column prop="wZ_RealPrice2_5" label="2.5折" min-width="80" align="right">
                   <template slot-scope="scope">
                       <el-button type="text"  v-if="scope.row.wZ_RealPrice2_5>0" @click="MShow(scope.row,6,1)">{{scope.row.wZ_RealPrice2_5.toQFW()}}</el-button>
                        <span v-else>0</span>
                    </template>
                </el-table-column>
                 <el-table-column prop="wZ_MPCount" label="门票" min-width="60" align="right">
                   
                </el-table-column>
            </el-table-column>
            <el-table-column prop="whAmount" label="无痕眼袋" min-width="85" align="right">
                <template slot-scope="scope">
                    <el-button type="text" @click="WHshow(scope.row)" v-if="scope.row.whAmount > 0">
                        {{scope.row.whAmount.toQFW()}}
                    </el-button>
                    <span v-else>0</span>
                </template>
            </el-table-column>
            <el-table-column prop="realPrice_Card" label="卡券返款" min-width="85" align="right">
                <template slot-scope="scope">
                    <el-button type="text"  v-if="scope.row.realPrice_Card>0" @click="MShow(scope.row,7,1)">{{scope.row.realPrice_Card.toQFW()}}</el-button>
                        <span v-else>0</span>
                </template>
            </el-table-column>
            <el-table-column prop="amount" label="合计" min-width="110" align="right">
                <template slot-scope="scope">
                    {{Math.round(scope.row.amount).toQFW()}}
                </template>
            </el-table-column>
        </el-table>
        <!-- 信息表 -->
        <span style="color:red">（合计数据已四舍五入）</span>
        <el-dialog title="无痕眼袋" :visible.sync="dialogView"  top="30%"  size="" :close-on-click-modal="false">
            <table v-if="dialogView">
                <tr>
                    <th>消费金额</th><th>积分</th><th>消转代</th><th>6折</th><th>4折</th><th>2.5折</th><th>门票</th>
                </tr>
                <tr>
                    <td>{{form.wH_RealPrice.toQFW()}}</td><td>{{form.wH_RealPriceJiFen.toQFW()}}</td><td>{{form.wH_RealPriceZhuan.toQFW()}}</td>
                    <td>{{form.wH_RealPrice6.toQFW()}}</td><td>{{form.wH_RealPrice4.toQFW()}}</td><td>{{form.wH_RealPrice2_5.toQFW()}}</td><td>{{form.wH_MPCount.toQFW()}}</td>
                </tr>
            </table>
        </el-dialog>
        <el-dialog title="详情" :visible.sync="detDialog" border  top="30%"  size="" :close-on-click-modal="false">
            <el-table :data="detTable" style="width: 100%" max-height="400" border>
                <el-table-column prop="fxCode" label="单号" width="180">
                    <template slot-scope="scope">
                        <el-button type="text" @click="openRP(scope.row)">{{scope.row.fxCode}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="customerName" label="客户" width="100"> </el-table-column>
                <el-table-column prop="refrenceBranchName" label="推荐人" width="100"> </el-table-column>
                <el-table-column prop="projectName" label="项目" width="180"> </el-table-column>
                <el-table-column prop="realPrice" label="价格"> </el-table-column>
            </el-table>
        </el-dialog>
        <el-dialog title="订单详情" :visible.sync="ispopRead" top="5%" size="">
            <report style="width:900px" v-if="ispopRead" :data="selectData" ></report>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import "./lib/achieve.less"
    import "@/style/selfCommon.less"
    import report from "@/page/FinanceManage/ReportManage/com/reportRead"
    // import Export from '@/components/export'
    import {countryList} from "@/config/common.js"
    import {GetDoctorPerformance,GetDropDownPermission,GetDeptAllByHospitalCode,GetDoctorDetail} from "@/api/myData"
    export default {
        // name:"actingLedger",
        data () {
            return {
                ispopRead:false,
                selectData:{},
                detTable:[],
                detDialog:false,
                dialogView:false,
                loading:false,
                tableData:[],
                hospitalList:[],
                formInline:{
                    hospital:"",
                    date:"",
                    startDate:"",
                    endDate:"",
                    deptCode:"",
                },
                form:{

                },
                deptList:[],
            }
        },
        computed: {
            /* 导出报表参数 tHeader,filterVal,tableData1*/
            // tHeader(){
            //     return ['医生', '国籍', '（手术）消费金额', '（手术）积分', '（手术）消转代', '（手术）6折', '（手术）4折', '（手术）2.5折', '（手术）门票',
            //      '（微整）消费金额', '（微整）积分', '（微整）消转代', '（微整）6折', '（微整）4折', '（微整）2.5折', '（微整）门票',
            //         '无痕眼袋','合计']
            // },
            // filterVal(){
            //     return ['serviceName', 'country', 'sS_RealPrice', 'sS_RealPriceJiFen', 'sS_RealPriceZhuan','sS_RealPrice6','sS_RealPrice4','sS_RealPrice2_5','sS_MPCount',
            //        'wZ_RealPrice', 'wZ_RealPriceJiFen', 'wZ_RealPriceZhuan', 'wZ_RealPrice6', 'wZ_RealPrice4', 'wZ_RealPrice2_5.5折', 'wZ_MPCount',
            //         'wH_RealPrice','amount']
            // },
            // tableData1(){
            //     let data = JSON.parse(JSON.stringify(this.tableData))
            //     // data.forEach(row=>{
                    
            //     // })
            //     return data
            // },
            // name(){
            //     return '医生'
            // },
            /*导出报表参数 tHeader,filterVal,tableData1*/
        },
        mounted(){
            let date = new Date()
            date.setDate("1")
            this.formInline.date = [date,new Date()]
            this.GetDropDownPermission()
        },
        methods: {
            WHshow(data){
                this.dialogView = true
                this.form = JSON.parse(JSON.stringify(data))
            },
            async selHos(){
                this.formInline.deptCode = ""
                if(this.formInline.hospital.length>0){
                    let resDep = await GetDeptAllByHospitalCode({
                        HospitalCode:this.formInline.hospital
                    })
                    this.deptList = resDep.data
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
                                return prev.add(curr) ;
                            } else {
                                return prev;
                            }
                        }, 0);
                        sums[index] =Math.round(sums[index]).toQFW();
                    } else {
                        sums[index] = '';
                    }
                });

                return sums;
            },
            async GetDoctorPerformance(params){
                let res = await GetDoctorPerformance(params)
                if(res.status){
                    this.tableData = this.getAmount(res.data)
                }else{
                    this.$message({ type: 'warning', message: '查询失败!'+res.errorMessage })
                }
                this.loading = false
            },
            getAmount(data){
                data.forEach(row => {
                    
                    row.sS_RealPrice = row.sS_RealPrice.add(row.sS_RealPriceWu)
                    row.wZ_RealPrice = row.wZ_RealPrice.add(row.wZ_RealPriceWu)
                    row.wH_RealPrice = row.wH_RealPrice.add(row.wH_RealPriceWu)
                    row.whAmount = row.wH_RealPrice+row.wH_RealPrice2_5+row.wH_RealPrice4+row.wH_RealPrice6+row.wH_RealPriceJiFen+row.wH_RealPriceZhuan
                    row.amount = row.sS_RealPriceJiFen  + row.sS_RealPriceZhuan + row.sS_RealPrice6 + row.sS_RealPrice4 + row.sS_RealPrice2_5+row.sS_RealPrice+
                    row.wZ_RealPriceJiFen + row.wZ_RealPriceZhuan + row.wZ_RealPrice6 + row.wZ_RealPrice4 + row.wZ_RealPrice2_5+row.wH_RealPrice+row.wZ_RealPrice
                    +row.wH_RealPrice2_5+row.wH_RealPrice4+row.wH_RealPrice6+row.wH_RealPriceJiFen+row.wH_RealPriceZhuan+row.realPrice_Card
                    countryList.forEach(ele=>{
                        if(row.country == ele.value){
                            row.country = ele.name
                            return 
                        }
                    })
                });
                return data
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
            async GetDropDownPermission(){
                let res = await GetDropDownPermission({typeId: 1})
                this.hospitalList = res.data
                this.formInline.hospital = res.data[0].code
            },
            onSubmit(){
                this.currentPage = 1
                this.search()
            },
            search(){
                this.loading = true
                this.GetDoctorPerformance({
                    HospitalId:this.formInline.hospital,
                    StartDate:this.formInline.startDate,
                    endDate:this.formInline.endDate,
                    deptCode:this.formInline.deptCode
                })
            },
            MShow(data,TypeId,ItemType){
                this.detDialog = true
                this.GetDoctorDetail({
                    HospitalId:data.hospitalCode,
                    StartDate:this.formInline.startDate,
                    EndDate:this.formInline.endDate,
                    ServiceManCode:data.code,
                    TypeId:TypeId,
                    ItemType:ItemType,
                })
            },
            async GetDoctorDetail(params){
                let res = await GetDoctorDetail(params)
                if(res.status){
                    this.detTable = res.data
                }
            },
             openRP(val){
                this.selectData = val
                this.ispopRead = true
            },

        },

        components: {
            // Export
            report
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.whSpan{
    display: inline-block;
    width:90px;
    text-align: center;
    line-height: 36px
}
table{
    width: 700px;
    border-collapse: collapse;
    /* text-align: left; */
}
table tr th, table tr td { 
    border:1px solid #dfe6ec;width: 90px;font-size: 12px;line-height: 40px;
    padding: 0 5px;
    box-sizing: border-box
 }
tr:first-child{
    background: #eef1f6
}
</style>
