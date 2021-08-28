<template>
    <div class="debitList selCommon">
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px" >
            <el-form-item label="单据时间：" class="form_item_mt10 ">
                <el-date-picker v-model="formInline.date1" @change="dateForm1" type="daterange" placeholder="选择日期范围" class="wt200"></el-date-picker>
            </el-form-item>
            <el-form-item label="关键字：" class="form_item_mt10 form_item_wh280">
                <el-input v-model="formInline.keywords" placeholder="" style="width: 200px;"  v-on:keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            <el-form-item label="医院:" class="form_item_mt10">
                <el-select v-model="formInline.hospitalCode"  style='width:200px;' @change="search">
                    <el-option v-for="(item,index) in HospitalList" :key="index" :label="item.supplierName" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label=" " class="form_item_mt10 form_item_wh280">
                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
                <el-button type="primary" @click="addReport" class="searchBtn">添加收款单</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" class="min_table smt" v-loading="loading"  ref="multipleTable" >
            <el-table-column type="index" label="序号" min-width="65"></el-table-column>
            <el-table-column prop="branchName" label="付款人" min-width="80"></el-table-column>
            <el-table-column prop="hospitalName" label="收款医院" min-width="80"></el-table-column>
                            <el-table-column prop="payTypeName" label="支付方式" min-width="80">
                                <template slot-scope="scope">
                                    <span>{{scope.row.payType|filterFun}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="realAmount" label="支付金额" min-width="80">
                                <template slot-scope="scope">
                                    {{scope.row.realAmount}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="receiveAccount" label="收款账户" min-width="80"></el-table-column>
                             <el-table-column prop="memo" label="备注" min-width="100" show-overflow-tooltip></el-table-column>
                             <el-table-column prop="payDate" label="支付时间" min-width="80" >
                               <template slot-scope="scope">
                                 <span v-if="scope.row.PayDate">
                                   {{scope.row.payDate.substring(0,10)}} {{scope.row.payDate.substring(11,19)}}
                                 </span>
                                </template>
                             </el-table-column>
            <el-table-column prop="sawCount" label="操作" min-width="80">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="edit(scope.row)">编辑</el-button>
                    <el-button type="primary" size="small" @click="deleteRow(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <el-dialog title="支付" :visible.sync="payDialog" :close-on-click-modal="false" size="">
            <pay v-if="payDialog" @payOpe="payOpe" style="width:450px" :editMes="editMes"></pay>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
import pay from "./components/pay";
import "@/style/selfCommon.less";
import {
  GetChargePay,
  DeleteChargePay,
  GetDropDownPermission,getBaseDataByCode
} from "@/api/myData";
var _this 
export default {
  // name: "debitList",
  computed: {
    /* 导出报表参数 tHeader,filterVal,tableData1*/
    // tHeader() {
    //     return ["单据编号", '单据日期', '被扣款人', '扣款事项', '关联单据', '扣款原因', "扣款额度", "备注", "提交人", "状态"]
    // },
    // filterVal() {
    //     return ['DebitNO', 'CreateOn', 'BranchName', 'DebitTypeName', 'FxCode', 'DebitReason', 'DebitAmount', 'Memo', 'CreateBy', 'IsFinished']
    // },
    // name() {
    //     return '扣款单'
    // },
    // tableData1() {
    //     return this.tableData
    // }
    /*导出报表参数 tHeader,filterVal,tableData1*/
  },
  data() {
    return {
      payDialog: false,
      loading: false,
      total: 0,
      size: 10,
      currentPage: 1,
      formInline: {
        date1: "",
        startTime: "",
        endTime: "",
        keywords: "",
        hospitalCode: ""
      },
      tableData: [],
      form: {},
      editMes: {},
      HospitalList: [],
      payTypeList:[],
    };
  },
  filters:{
      filterFun(val){
          let payTypeName = ''
          _this.payTypeList.forEach(ele=>{
              if(ele.DataCode == val){
                    payTypeName = ele.DataName
              }
          })
        return payTypeName
      }
  },
  mounted() {
    _this = this
    this.getHospital();
  },
  methods: {
    async getHospital() {
      let [res,payType ]= await Promise.all([GetDropDownPermission({ typeId: 1 }),getBaseDataByCode('0006')]) ;
      this.formInline.hospitalCode = res.data[0].code;
      this.HospitalList = res.data;
      this.payTypeList = payType
      this.onSubmit();
    },
    payOpe(val) {
      if (val) {
        this.search();
      }
      this.payDialog = false;
    },

    // 删除单据
    async DeleteChargePay(params) {
      try {
        let res = await DeleteChargePay(params);
        if (res.success) {
          this.$message({ message: "删除成功", type: "success" });
          this.search();
        } else {
          this.$message.error("删除失败");
        }
      } catch (err) {
        console.log(err);
      }
    },
    async GetChargePay(params) {
      try {
        this.loading = true;
        let res = await GetChargePay(params);
        this.loading = false;
        if (res.status) {
          this.total = res.count;
          this.tableData = res.data;
        } else {
          this.$message.error("获取数据失败");
        }
      } catch (err) {
        console.log(err);
      }
    },
    dateForm1(val) {
      if (val) {
                    val = val.formatDates()
        this.formInline.startTime = val.substring(0, 10);
        this.formInline.endTime = val.substring(13);
      } else {
        this.formInline.startTime = "";
        this.formInline.endTime = "";
      }
      this.onSubmit();
    },
    onSubmit() {
      this.currentPage = 1;
      this.search();
    },
    search() {
      this.GetChargePay({
        startDate: this.formInline.startTime,
        endDate: this.formInline.endTime,
        pageIndex: this.currentPage,
        pageSize: this.size,
        keywords: this.formInline.keywords,
        hospitalcode: this.formInline.hospitalCode
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.size = val
      this.search();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val
      this.search();
    },
    deleteRow( data) {
      this.$confirm("是否删除该条数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          this.DeleteChargePay({
            id: data.id
          });
        })
    },
    addReport() {
      this.payDialog = true;
    },
    edit(data) {
      this.editMes = JSON.parse(JSON.stringify(data));
      this.payDialog = true;
    }
  },
  components: {
    pay
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
