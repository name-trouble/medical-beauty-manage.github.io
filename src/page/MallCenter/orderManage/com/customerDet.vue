<template>
    <div>
        <div class="mes">
            <div class="mes_left">
                <div class="column">
                    <span class="wt150">姓名：{{customer.realname}}</span>
                    <span class="wt150">卡号：{{customer.cardNO}}</span>
                    <span class="wt150">年龄：{{customer.age}}</span>
                    <span class="wt150">编号：{{customer.code}}</span>
                </div>
                <div class="column">
                    <span class="wt150">性别：{{customer.sex?'男':'女'}}</span>
                      <span class="wt150">生日：{{customer.birthday}}</span>
                    <span class="wt200">联系方式：{{customer.mobile}}</span>
                    <span class="wt300">推荐人：{{customer.referrerName}}[{{customer.referrerCode}}]</span>
                </div>
                <div class="column">
                    <span>地址：{{customer.address}}</span>
                </div>
                <div class="column">
                    <span>标签：{{customer.memberTags}}</span>
                </div>
            </div>
            <div style="clear: both;"></div>
        </div>
        <ul style="margin-top:20px;display:inline-block">
            <li class="tabs"  v-for="(item,index) in list" :class="{'active':currentIndex == item.state}" :key="index" @click="select(index,item.state)">{{item.name}}</li>
        </ul>
        <div v-loading="loading">
            <!-- 会费 -->
            <el-table :data="tableDataList[0]" border style="width: 100%;margin-top:20px" v-show="currentIndex == 0" class="min_table smt" max-height="500">
                <el-table-column prop="fxCode" label="支付方式" min-width="90">
                   <template slot-scope="scope">
                       <span v-if="scope.row.orderDate">{{scope.row.orderDate.substring(0,10)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="orderDate" label="支付日期" min-width="90">
                    <template slot-scope="scope">
                        <span v-if="scope.row.orderDate">{{scope.row.orderDate.substring(0,10)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="orderType" label="收款账户" min-width="100">
                    <template slot-scope="scope">
                        <el-tag type="success" v-text="scope.row.orderType==1?'app订单':'线下订单'"></el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="projectName" label="手续费" min-width="120"> </el-table-column>
                <el-table-column prop="goodsUnitName" label="来源" min-width="80"></el-table-column>
                <el-table-column prop="commandState" label="备注" min-width="90" show-overflow-tooltip></el-table-column>
                <el-table-column prop="course" label="实际金额" min-width="70">
                    <template slot-scope="scope">
                        <span v-if="scope.row.currentCourse">{{scope.row.currentCourse}} /</span>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 线上订单 -->
            <el-table :data="tableDataList[1]" border style="width: 100%;margin-top:20px" v-show="currentIndex == 1" class="min_table smt" max-height="500">
                <el-table-column prop="orderCode" label="合并订单号" min-width="100"></el-table-column>
                <el-table-column prop="subOrderCode" label="订单编号" min-width="100"></el-table-column>
                <el-table-column prop="branchName" label="消费商" min-width="80"></el-table-column>
                <el-table-column prop="createDate" label="订单时间" min-width="120">
                    <template slot-scope="scope">
                        <span v-if="scope.row.createDate">{{scope.row.createDate}}</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="offlineDate" label="线下开单日期" min-width="80" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span v-if="scope.row.offlineDate">{{scope.row.offlineDate}}</span>
                    </template>
                </el-table-column> -->
                <el-table-column prop="source" label="来源" min-width="80" show-overflow-tooltip></el-table-column>
                <el-table-column prop="payType" label="支付方式" min-width="80" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span v-if="scope.row.payType == 1">支付宝</span>
                        <span v-if="scope.row.payType == 2">微信</span>
                    </template>
                </el-table-column>
                <el-table-column prop="activityTypes" label="类型" min-width="80" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span v-if="scope.row.activityTypes == 1">限时秒杀</span>
                        <span v-if="scope.row.activityTypes == 2">体验专区</span>
                        <span v-if="scope.row.activityTypes == 3">特惠项目</span>
                        <span v-if="scope.row.activityTypes == 4">量贩专区</span>
                        <span v-if="scope.row.activityTypes == 5">398特惠</span>
                        <span v-if="scope.row.activityTypes == null||scope.row.activityTypes == 0">原价</span>
                    </template>
                </el-table-column>
                <el-table-column prop="goodsName" label="商品名称" min-width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="price" label="价格" min-width="80" align="right">
                    <template slot-scope="scope">
                        {{scope.row.price}}
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="pay" label="最低支付金额" min-width="100" align="right"></el-table-column>
                <el-table-column prop="points" label="最高可抵扣积分" min-width="100" align="right"></el-table-column> -->
                <el-table-column prop="deposit" label="订金" min-width="90"  align="right">
                    <template slot-scope="scope">
                        <span v-if="scope.row.deposit"> {{scope.row.deposit}}</span>
                        <span v-else>0</span>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态" min-width="80" align="center">
                    <template slot-scope="scope">
                        <el-tag type="gray" v-if="scope.row.status == 0">待付款</el-tag>
                        <el-tag type="success" v-if="scope.row.status == 1">已付款</el-tag>
                        <el-tag type="success" v-if="scope.row.status == 2">已确认</el-tag>
                        <el-tag type="success" v-if="scope.row.status == 3">待评价</el-tag>
                        <el-tag type="danger" v-if="scope.row.status == 4">已关闭</el-tag>
                        <el-tag type="danger" v-if="scope.row.status == 5">已退款</el-tag>
                        <el-tag type="danger" v-if="scope.row.status == 6">已取消</el-tag>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 订单情况 -->
            <el-table :data="tableDataList[2]" border style="width: 100%;margin-top:20px" v-show="currentIndex == 2" class="min_table smt" max-height="500">
                <el-table-column prop="fxCode" label="订单编号" min-width="90">
                   <template slot-scope="scope">
                        <el-button type="text" @click="newReport(scope.row)" v-if="mes.reportAdd&&serTypeCode!='001'&&serTypeCode!='003'">{{scope.row.fxCode}}</el-button>
                        <span v-else>{{scope.row.fxCode}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="orderDate" label="订单日期" min-width="90">
                    <template slot-scope="scope">
                        <span v-if="scope.row.orderDate">{{scope.row.orderDate.substring(0,10)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="orderType" label="订单类型" min-width="100">
                    <template slot-scope="scope">
                        <el-tag type="success" v-text="scope.row.orderType==1?'app订单':'线下订单'"></el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="projectName" label="执行项目" min-width="120" show-overflow-tooltip> </el-table-column>

                <el-table-column prop="goodsUnitName" label="规格" min-width="80" show-overflow-tooltip></el-table-column>
                <el-table-column prop="OrderAmount" label="订单金额" min-width="85" align="right">
                    <template slot-scope="scope">
                        <span v-if="scope.row.orderAmount">￥{{scope.row.orderAmount.toQFW()}}</span>
                        <span v-else>￥0</span>
                    </template>
                </el-table-column>
                <el-table-column prop="isPayOff" label="付款状态" min-width="80">
                    <template slot-scope="scope">
                        <el-tag type="success" v-if="scope.row.isPayOff == true">已付清</el-tag>
                    <el-tag type="danger" v-if="scope.row.isPayOff == false">未付清</el-tag>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="commandState" label="执行状态" min-width="90">
                    <template slot-scope="scope">
                        <el-tag type="gray" v-if="scope.row.commandState == 0">未执行</el-tag>
                        <el-tag type="warning" v-if="scope.row.commandState == 1">执行中</el-tag>
                        <el-tag type="success" v-if="scope.row.commandState == 2">执行完毕</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="course" label="疗程" min-width="70">
                    <template slot-scope="scope">
                        <span v-if="scope.row.currentCourse">{{scope.row.currentCourse}} /</span>
                        <span v-if="!scope.row.currentCourse">0 /</span>
                        <span v-if="scope.row.course">{{scope.row.course}}</span>
                    </template>
                </el-table-column> -->
                <el-table-column prop="CommandState" label="执行状态" min-width="150">
                    <template slot-scope="scope">
                        <div style="width: 80px;float: left">
                            <el-tag type="gray" v-if="scope.row.commandState == 0">未执行</el-tag>
                            <el-tag type="warning" v-if="scope.row.commandState == 1">执行中</el-tag>
                            <el-tag type="success" v-if="scope.row.commandState == 2">执行完毕</el-tag>
                        </div>
                        <div style="float: left" v-if="scope.row.isPayOff==true">
                            <span v-if="scope.row.currentCourse">{{scope.row.currentCourse}}</span>
                            <span v-else>0</span>
                            <span v-if="scope.row.course">/{{scope.row.course}}</span>
                        </div>
                    </template>
                </el-table-column>
                
                <el-table-column prop="approveState" label="订单状态" min-width="90">
                    <template slot-scope="scope">
                        <el-tag type="warning" v-if="scope.row.approveState==0||scope.row.approveState==null">未审核</el-tag>
                        <el-tag v-if="scope.row.approveState==1">部分审核</el-tag>
                        <el-tag type="success" v-if="scope.row.approveState==2">审核完毕</el-tag>
                        <el-tag type="danger" v-if="scope.row.approveState==6">已退款</el-tag>
                        <el-tag type="danger" v-if="scope.row.approveState == 10">已关闭</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="createBy" label="登记人" min-width="80"> </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { xmxUrl, baseImgPath } from "@/config/env";
import {GetUserAllByKeywords,getBaseDataByCode,GetOnlineTeamConsumeDetail,} from "@/api/myData";
import { getCookie } from "@/config/mUtils";
var _this;
export default {
  props: {
    mes: {
      type: Object
    },
    startDate:'',
    endDate:''
  },
  data() {
    return {
      loading: false,
      customer: {},
      currentIndex: 0,
      tableDataList:[[],[],[]],
      list: [{ name: "会费", state: 0 },{ name: "线上订单", state: 1 },{ name: "线下订单", state: 2 }],
      tableData: [],
      total: 0,
      customerCode: "",
    };
  },

  mounted() {
    this.serTypeCode
    _this = this;
    this.customerCode = this.mes.customerId;
    this.GetUserAllByKeywords();
  },
  methods: {

    newReport(data,ope) {
      let mes = {fxCode:data.fxCode}
      this.$emit("openReport",mes,ope);
    },

    async GetUserAllByKeywords(isEditAddr) {
      let [payWays,message] = await Promise.all([getBaseDataByCode("0006"),GetOnlineTeamConsumeDetail({"mobile":this.customerCode,"startDate":this.startDate,"endDate":this.endDate})]);
        this.tableDataList[1] = message.data.listOnline 
        this.tableDataList[2] = message.data.listoffline
        this.tableDataList[0] = message.data.listfee
        this.customer = message.data.listuser[0]
    //   this.payWays =payWays
    //   if (res.length > 0) {
    //     let customer = res[0];
    //     for (var p in customer) {
    //       if (customer[p] == null || customer[p] == undefined) {
    //         customer[p] = "";
    //       }
    //     }
    //     customer["Address"] = customer["Province"] + customer["City"] + customer["Area"] + customer["Address"].split(",").join("");
    //     if (customer["Sex"] == "0") {
    //       customer["Sex"] = "女";
    //     }
    //     if (customer["Sex"] == "1") {
    //       customer["Sex"] = "男";
    //     }
    //     customer["Age"] =
    //       customer.Birthday.length > 0
    //         ? Number(customer.Birthday.substring(0, 4)).red(
    //             new Date().getFullYear()
    //           )
    //         : "";
    //     this.customer = customer;
    //   }
    //   if(!isEditAddr){
    //     this.select(0, 0);
    //   }
      
    },
    select(index, state) {
      this.currentIndex = state;
      this.tableData = [];
      this.tableData = this.tableDataList[state]
    },
  },
  components: {}
};
</script>

<style lang="less" scoped>
.mes {
  background: rgba(238, 241, 246, 1);
  padding: 10px 15px;
  .mes_left {
    // width: 60%;
    float: left;
    .column {
      line-height: 26px;
      span {
        display: inline-block;
      }
      .wt100 {
        width: 100px;
      }
      .wt200 {
        width: 200px;
      }
      .wt150 {
        width: 150px;
      }
      .wt300 {
        width: 303px;
      }
    }
  }
  .mes_right {
    // width: 39%;
    float: left;
    .column {
      line-height: 26px;
      .ipt_lab {
        display: block;
        float: left;
      }
    }
  }
}
.tabs {
  display: inline-block;
  width: 80px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border: 1px solid #6a6d78;
  border-right: none;
  cursor: pointer;
}
.tabs:last-child {
  border: 1px solid #6a6d78;
  border-radius: 0 3px 3px 0;
}
.tabs:first-child {
  border-radius: 3px 0 0 3px;
}
.tabs.active {
  background: #6a6d78;
  color: #fff;
}
.form_footer {
  text-align: center;
}
.imgContainer {
  display: inline-block;
  width: 100px;
  height: 100px;
  overflow: hidden;
}
.form_select{
  width: 150px;
}
</style>


