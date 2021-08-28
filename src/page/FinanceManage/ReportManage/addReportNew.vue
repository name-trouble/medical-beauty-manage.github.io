<template>
  <div class="selCommon addRP totalWrap">
    <div class="flex-start-start mainWrap">
      <div class="leftPart">

          <div style="margin-bottom: 8px">
              <el-date-picker type="daterange" start-placeholder="起始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" v-model="rpDate" @change="search()"></el-date-picker>
          </div>

        <div>
          <el-input type="text" size="small" icon="search" v-model="keywords" @keyup.native.enter="search()" placeholder="请输入预约客户"></el-input>
        </div>
        <div class="listWrap">
          <div class="listItem pointer" v-for="(item,index) in listData1" :key="index">
            <p>
              <span class="customerName">{{item.customerName}}</span>
              <span class="customerTel">{{`[${item.customerCode}]`}}</span>
            </p>
            <p class="mgt10">
              <span class="orderDate">{{`预约日期：${item.reservationDate.substring(0,10)} ${item.startTime}-${item.endTime}`}}</span>
            </p>
            <p class="mgt6">
              <span class="orderType">预约医生：{{item.doctorName}}</span>
            </p>
            <p class="mgt6">
              <span class="orderName">项目详情：{{item.projectName}}</span>
            </p>
              <div style="text-align: right">
                  <el-button type="primary" size="mini" @click="onAdd(item.id)">开单</el-button>
                  <el-button type="primary" plain size="mini" @click="addCn(item.id)">未成交</el-button>
              </div>
          </div>
        </div>
      </div>
      <div class="rightPart">
        <!-- <reportSearch
          :searchCondition="searchCondition"
          ref="search"
          :filter-back="filter"
          :on-add="onAdd"
        ></reportSearch> -->
        <el-form
          :model="jsonObject"
          ref="formRef"
          size="small"
          inline
          label-width="80px">
            <el-form-item label="起止日期：">
                <el-date-picker type="daterange" start-placeholder="起始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" v-model="orderDate"></el-date-picker>
            </el-form-item>
          <el-form-item label="订单号：">
            <el-input
              v-model="jsonObject.num"
              placeholder="请输入纸质单号"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="关键字：">
            <el-input
              v-model="jsonObject.customer"
              placeholder="客户姓名/基金卡号/手机号"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="付款状态：">
            <el-select v-model="jsonObject.IsPayOff" size="small">
              <el-option label="全部" value=""></el-option>
              <el-option label="未付清" value="0"></el-option>
              <el-option label="已付定金" value="2"></el-option>
              <el-option label="已付清" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="执行状态：" v-if="type == 0">
            <el-select v-model="jsonObject.CommandState" size="small">
              <el-option label="全部" value=""></el-option>
              <el-option label="未执行" value="0"></el-option>
              <el-option label="执行中" value="1"></el-option>
              <el-option label="执行完毕" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="getList()"
              size="small"
              class="mgl20"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
        <div class="customerList">
          <div class="customerItem" v-for="(item,index) in tableData" :key="index">
            <div class="infoWrap">
              <div class="titleRow flex-start-center">
                <div class="customerInfo" @click="view(index,tableData)">
                  <span class="customerName">{{item.CustomerName}}</span>
                  <span class="customerTel">{{`[${item.PhoneNumber}]`}}</span>
                </div>
                <div class="growItem"></div>
                <div class="price" @click="read(index)">
                  <span>{{`￥${item.RealPrice}`}}</span>
                </div>
              </div>
              <div class="orderName mgt10 ellipsis">
                <span :title="item.ProjectName">项目名称：{{item.ProjectName}}</span>
              </div>
              <div class="doctor mgt6">
                <span>设计师：{{item.DesignerName||''}}</span>
              </div>
              <div class="flex-start-center mgt6">
                <div class="progress">
                  <span>执行进度：</span>
                  <span v-show="item.CommandState==0" class="red">未执行</span>
                  <span v-show="item.CommandState==1" class="yellow">'执行中</span>
                  <span v-show="item.CommandState!==0&&item.CommandState!==1" class="green">执行完毕</span>
                </div>
                <div class="payInfo mgl10">
                  <span>支付情况：</span>
                  <span v-show="item.ApproveState !=6&&item.ApproveState!=10&&item.IsPayOff" class="green">已付清</span>
                  <span v-show="item.ApproveState !=6&&item.ApproveState!=10&&!item.IsPayOff" class="red">未付清</span>
                  <!-- <span>{{item.ApproveState !=6&&item.ApproveState!=10?(item.IsPayOff?'已付清':'未付清'):''}}</span> -->
                </div>
              </div>
            </div>
            <div class="btnArea flex-around-center">
              <div>
                <span class="pointer" :class="{'disableClick':item.IsPayOff}" @click="!item.IsPayOff&&edit(index)">编辑报单</span>
              </div>
              <div class="vline"></div>
              <div>
                <span class="pointer"  @click="editType(index,tableData)">修改类型</span>
              </div>
              <div class="vline"></div>
              <div>
                <span class="pointer"  @click="addComplaint(item)">客户投诉</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 分页 -->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
    </div>

    <el-dialog
      ref="pay"
      title="新增报单"
      :visible.sync="ispopAdd"
      top="5%"
      @close="ispopAdd = false"
      size=""
      :close-on-click-modal="false">
      <pop-add
        v-if="ispopAdd"
        @popAddClose="addFinish"
        :reservationId="reservationId"
        style="width: 1000px"></pop-add>
    </el-dialog>

      <el-dialog title="添加咨询" :visible.sync="dialogTableVisible" size="">
          <add style="width: 650px" v-if="dialogTableVisible" @close="closeCn" :editMes="editMes" :reservationId="reservationId"></add>
      </el-dialog>

    <el-dialog
      ref="pay"
      title="编辑报单"
      :visible.sync="ispopEdit"
      top="5%"
      @close="ispopEdit = false"
      size=""
      :close-on-click-modal="false">
      <pop-edit
        v-if="ispopEdit"
        :ope="ope"
        @popAddClose="editFinish"
        :data="selectData"
        style="width: 1000px"></pop-edit>
    </el-dialog>

    <el-dialog
      ref="pay"
      title="查看详情"
      :visible.sync="ispopRead"
      top="5%"
      @close="ispopRead = false"
      size="">
      <pop-read
        v-if="ispopRead"
        :data="selectData"
        style="width: 1100px"></pop-read>
    </el-dialog>

    <el-dialog
      title="客户详情"
      :visible.sync="dialogView"
      top="5%"
      size=""
      :close-on-click-modal="false">
      <CustomerView
        :mes="cusMes"
        style="width: 1100px"
        v-if="dialogView"></CustomerView>
    </el-dialog>
    <el-dialog
      title="修改类型"
      :visible.sync="typeView"
      top="30%"
      size=""
      :close-on-click-modal="false">
      <el-tabs v-model="activeName" style="width: 400px">
        <el-tab-pane label="规则类型" name="first">
          <el-form class="demo-form-inline" label-width="80px">
            <el-form-item label="规则类型：" class="form_item_mt0">
              <el-select v-model="type" style="margin-bottom: 20px">
                <el-option
                  v-for="(item, index) in mConsumeList"
                  :key="index"
                  :value="item.DataCode"
                  :label="item.DataName"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="支付类型："
              class="form_item_mt0"
              v-if="type == '6'">
              <el-select v-model="payType" style="margin-bottom: 20px">
                <el-option value="" label="无"></el-option>
                <el-option
                  v-for="(item, index) in medicalList"
                  :key="index"
                  :value="item.DataCode"
                  :label="item.DataName"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="项目类型" name="second">
          <el-form class="demo-form-inline" label-width="80px">
            <el-form-item label="项目类型：" class="form_item_mt0">
              <el-select v-model="ProjectType" style="margin-bottom: 20px">
                <el-option label="年卡/疗程" value="0"></el-option>
                <el-option label="单次" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>

      <div class="form_footer">
        <el-button @click="typeS" type="primary">确定</el-button>
        <el-button @click="typeView = false">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      ref="pay"
      title="客户投诉"
      :visible.sync="complaintDialog"
      top="5%"
      @close="ispopAdd = false"
      size=""
      :close-on-click-modal="false"
    >
      <addComplaint
        @close="close"
        :editMes="{}"
        :reportMes="reportMes"
        v-if="complaintDialog"
        style="width: 700px"
      ></addComplaint>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import addComplaint from "@/page/HospiatalManage/com/addComplaint.vue";
import reportSearch from "./com/reportSeach.vue";
import {
  GetProofOrder,
  getBaseDataByCode,
  ModifyConsumeTypeId,
  ModifyProjectType,
  GetReservation
} from "@/api/myData";
import PopAdd from "./com/addReport.vue";
import PopEdit from "./com/reportEdit.vue";
import PopRead from "./com/reportRead.vue";
import { getCookie } from "@/config/mUtils";
import CustomerView from "./com/customerDetail.vue";
import Add from "../../HospiatalManage/com/addConsult"
var _this;
// import "@/style/selfCommon.less";
export default {
  components: {
    reportSearch,
    PopAdd,
    PopRead,
    PopEdit,
    CustomerView,
    addComplaint,
      Add
  },
  data() {
    return {
      keywords:'',
      listData1:[],
        orderDate: null,
      jsonObject: {
        num: "",
        customer: "",
        IsPayOff: "",
        CommandState: "",
      },
      // listData2:[],
      reportMes: {},
      complaintDialog: false,
      activeName: "first",
      loading: false,
      cusMes: {},
      dialogView: false,
      typeView: false,
      currentIndex: 0,
      size: 10,
      total: 0,
      currentPage: 1,
      tableData: [],
      addShow: "1",
        rpDate: null,
      searchCondition: {
        label: "更新时间",
        type: "0",
        tHeader: [
          "订单编号",
          "订单日期",
          "纸质单号",
          "客户",
          "推荐人",
          "项目名称",
          "订单金额",
          "已支付",
          "付款状态",
          "疗程",
          "已执行",
          "执行状态",
          "订单类型",
        ],
        filterVal: [
          "FxCode",
          "CreateOn",
          "FormNO",
          "CustomerName",
          "RefrenceBranchName",
          "ProjectName",
          "OrderAmount",
          "RealAmount",
          "IsPayOff",
          "Course",
          "CurrentCourse",
          "CommandState",
          "OrderType",
        ],
        tableData1: [],
        name: "报单管理",
      },
      ispopAdd: false,
      ispopEdit: false,
      ispopRead: false,
      selectData: [],
      reservationId: '',
      fxCode: "", //当前选中的 fxCode
      ope: true,
      consumeList: [], //提成类型
      medicalList: [],
      mConsumeList: [], //限制后几种类型
      type: "",
      payType: "",
      ProjectType: "",
        dialogTableVisible:false,
        editMes:{},
    };
  },
  filters: {
    filFun(val) {
      let len = _this.consumeList.length;
      let list = _this.consumeList;
      for (var i = 0; i < len; i++) {
        if (val == list[i].DataCode) {
          return list[i].DataName;
        }
      }
    },
    filFunM(val) {
      let len = _this.medicalList.length;
      let list = _this.medicalList;
      for (var i = 0; i < len; i++) {
        if (val == list[i].DataCode) {
          return list[i].DataName;
        }
      }
    },
  },
  created(){
    this.search();
    this.getList()
  },
  mounted() {
    _this = this;
    this.getType();
  },
  methods: {
    getList(pageIndex){
        if (this.orderDate && this.orderDate.length === 2) {
            this.jsonObject.startTimeF = this.orderDate[0]
            this.jsonObject.endTimeF = this.orderDate[1]
        }
      this.filter(JSON.parse(JSON.stringify(this.jsonObject)),pageIndex)
    },
    search() {
        let searchDate = ['',''];
        if (this.rpDate && this.rpDate.length === 2) {
            searchDate = this.rpDate
        }
      this.loading = true;
      this.GetReservation({
        customerName: this.keywords,
        doctorCode: '',
        reservationStatus: '',
        startDate: searchDate[0],
        endDate: searchDate[1],
        pageIndex: 1,
        pageSize: 100,
      });
    },
    async GetReservation(params) {
      let res = await GetReservation(params);
      this.loading = false;
      if (res.status) {
        this.total = res.count;
        this.listData1 = res.data;
      } else {
        console.log(res);
      }
    },
    close(val) {
      this.complaintDialog = false;
      if (val) {
        this.getList();
      }
    },
    addComplaint(data) {
      this.reportMes = data;
      this.complaintDialog = true;
    },
    view(index, data) {
      this.cusMes = data[index];
      this.dialogView = true;
    },
    async getProofOrder(params, index) {
      this.loading = true;
      try {
        let res = await GetProofOrder(params);
        if (res.status) {
          this.total = res.count;
          this.tableData = res.data;
          this.searchCondition.tableData1 = this.dealData(res.data);
        } else {
          this.$message({
            type: "error",
            message: "获取数据失败!" + res.errorMessage,
          });
        }
        this.loading = false;
      } catch (err) {}
    },
    async getType() {
      this.consumeList = await getBaseDataByCode("0017");
      this.consumeList.forEach((row) => {
        if (row.DataCode <= 8) {
          this.mConsumeList.push(row);
        } else {
        }
      });
      this.medicalList = await getBaseDataByCode("0022");
    },

    dealData(data) {
      let arr = JSON.parse(JSON.stringify(this.tableData));
      arr.forEach((row) => {
        row.CommandState = this.getStep(row.CommandState);
        row.OrderType = row.OrderType == "1" ? "线上" : "线下";
      });
      return arr;
    },

    getStep(step) {
      switch (step) {
        case 0:
          return "未执行";
        case 1:
          return "执行中";
        case 2:
          return "执行完毕";
      }
    },

    addFinish() {
      this.ispopAdd = false;
      this.getList();
    },

    editFinish() {
      this.ispopEdit = false;
      this.getList();
    },

    filter(val, setPageIndex) {
      //  搜索获取条件
      if (setPageIndex) {
        this.currentPage = 1;
      }
      this.getProofOrder({
        startDate: val.startTimeF||'',
        endDate: val.endTimeF||'',
        mStartDate: val.startTimeS||'',
        mEndDate: val.endTimeS||'',
        fxCode: val.bill||'',
        formNO: val.num||'',
        projectName: val.projectName||'',
        isPayOff: val.IsPayOff||'',
        commandState: val.CommandState||'',
        orderType: val.OrderType||'',
        customerName: val.customer||'',
        referrerName: val.rec||'',
        ApproveState: val.ApproveState||'',
        SettState: val.SettState||'',
        pageIndex: this.currentPage||'',
        pageSize: this.size||'',
        hospitalCode: val.hospital||'',
        ConsumeTypeId: val.ConsumeTypeId||'', //提成类型
        IsFeedback: val.IsFeedback||'',
        MedicalTypeId: val.MedicalTypeId||'', //支付类型
      });
    },
    handleSizeChange(val) {
      this.size = val;
      this.getList();
    },

    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },

    onAdd(id) {
      //添加
      this.reservationId = id;
      this.ispopAdd = true;
    },

    edit(index) {
      //            编辑
      this.selectData = this.tableData[index];
      this.ispopEdit = true;
    },

    read(index) {
      //            查看
      this.selectData = this.tableData[index];
      this.ispopRead = true;
    },

      addCn(id){
        this.reservationId = id;
          this.dialogTableVisible = true
      },
      closeCn(val){
          this.dialogTableVisible = false
          if(val){
              this.search()
          }
      },

    dateChange(val) {
      if (val) {
        this.visitForm.date = val;
      } else {
        this.visitForm.date = "";
      }
    },
    editType(index, data) {
      this.typeView = true;
      this.fxCode = this.tableData[index]["FxCode"];
      this.type = data[index].ConsumeTypeId + "";
      this.payType =
        data[index].MedicalTypeId == null ? "" : data[index].MedicalTypeId + "";
      this.ProjectType =
        data[index].ProjectType || data[index].ProjectType == 0
          ? data[index].ProjectType + ""
          : "";
    },
    typeS() {
      if (this.activeName == "first") {
        this.ModifyConsumeTypeId();
      } else {
        this.ModifyProjectType();
      }
    },
    async ModifyConsumeTypeId(index, data) {
      let res = await ModifyConsumeTypeId({
        FxCode: this.fxCode,
        ConsumeTypeId: this.type,
        MedicalTypeId: this.payType,
      });
      if (res.status) {
        this.$message({ message: "修改成功", type: "success" });
        this.typeView = false;
        this.getList();
      } else {
        this.$message.error("修改失败");
      }
    },
    async ModifyProjectType() {
      let res = await ModifyProjectType({
        FxCode: this.fxCode,
        ProjectType: this.ProjectType,
      });
      if (res.status) {
        this.$message({ message: "修改成功", type: "success" });
        this.typeView = false;
        this.activeName = "first";
        this.getList();
      } else {
        this.$message.error("修改失败");
      }
    },
  },
};
</script>

<style scoped lang="less">
/deep/ .el-form-item {
  margin-bottom: 15px;
}
.totalWrap {
  height: calc(~"100% - 110px");
  width: 100%;
}
.mainWrap {
  width: 100%;
  height: 100%;
  .leftPart {
    //   border:1px solid
    flex-shrink: 0;
    width: 270px;
    height: 100%;
    padding: 10px;
    background-color: #f9f9f9;
    .listWrap {
      height: calc(~"100% - 40px");
      overflow: auto;
      .listItem {
        border: 1px solid #ccc;
        border-radius: 2px;
        padding: 15px;
        margin-top: 10px;
        font-size: 14px;
        color: #666;
        &:hover {
          border: 1px solid rgb(148, 148, 214);
          background-color: rgb(205, 205, 214);
        }
        .customerName {
          font-size: 16px;
          font-weight: bold;
          color: #000;
        }
        .customerTel {
          font-size: 16px;
        }
        .orderDate {
          color: #000;
        }
      }
    }
  }
  .rightPart {
    flex-grow: 1;
    height: 100%;
    margin-left: 20px;
    padding: 10px;
    background-color: #f9f9f9;
    display: flex;
    flex-direction: column;
    .customerList {
      /*height:600px;*/
      overflow: auto;
      flex: 1;
      .customerItem {
        float: left;
        margin-right:20px;
        margin-bottom:20px;
        width: 260px;
        height: 147px;
        border: 1px solid #ccc;
        border-radius: 2px;
        .infoWrap {
          padding: 15px 15px 10px 15px;
          .titleRow {
            span {
              font-size: 16px;
            }
            .customerName {
              color: #000;
              font-weight: bold;
            }
            .price {
              color: rgb(108, 152, 255);
            }
          }
          .orderName {
            color: #000;
          }
          .red{
            color:red;
          }
          .yellow{
            color:rgb(255, 218, 173);
          }
          .green{
            color:lightgreen;
          }
        }
        .btnArea {
          width: 100%;
          padding-top: 8px;
          border-top: 1px solid #ccc;
          .vline {
            width: 1px;
            height: 10px;
            background-color: #ccc;
          }
          .disableClick{
            color:#999;
          }
        }
      }
    }
  }
}
.customerInfo {cursor: pointer; white-space: nowrap; text-overflow: ellipsis; overflow: hidden}
.customerInfo:hover {opacity: .78}
.price {cursor: pointer}
.price:hover {opacity: .78}
</style>
