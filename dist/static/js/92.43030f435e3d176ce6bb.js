webpackJsonp([92],{1048:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=o(100),i=o.n(a),r=o(66),l=o.n(r),s=o(102),m=o.n(s),n=o(99),c=o.n(n),f=o(65),u=(o.n(f),o(436)),d=o.n(u),_=o(657),p=o.n(_),h=o(64),v=o(22);e.default={data:function(){return{date1:"",typeCode:o.i(v.d)("typeCode"),IsRefund:!1,dialogVisible:!1,dialogVisible1:!1,currentIndex:0,formInline:{startTime:"",endTime:"",fxCode:"",name:"",rec:"",customer:"",hospital:"",branch:"",status:""},tableData:[],currentPage:1,size:10,total:0,form:{createDate:""},hospitalList:[],branchList:[],viewFxCode:"",allData:[],sum:{minPayAmount:0,onlineOrderCount:0,offlineOrderCount:0,realAmount:0}}},computed:{tHeader:function(){return["商品名称","最低支付","线上订单数","线下订单数","开单金额"]},filterVal:function(){return["goodsName","minPayAmount","onlineOrderCount","offlineOrderCount","realAmount"]},tableData1:function(){return this.allData},name:function(){return"医美订单"}},mounted:function(){this.getHospital()},methods:{getSummaries:function(){return["总合计",this.sum.minPayAmount.toQFW(),this.sum.onlineOrderCount.toQFW(),this.sum.offlineOrderCount.toQFW(),this.sum.realAmount.toQFW()]},exportData:function(){this.getProofOrder({},1)},getHospital:function(){var n=this;return c()(i.a.mark(function t(){var e,a,r,s;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,l.a.all([o.i(h.d)({typeId:1}),o.i(h.d)({typeId:2})]);case 2:e=t.sent,a=m()(e,2),r=a[0],s=a[1],n.hospitalList=r.data,n.formInline.hospital=n.hospitalList[0].code,n.branchList=s.data,"03"==n.typeCode&&n.branchList.unshift({branchName:"全部",code:""}),n.formInline.branch=n.branchList[0].code;case 11:case"end":return t.stop()}},t,n)}))()},closeReport:function(t){this.dialogVisible=!1,t&&this.search()},OnlineOrderRefund:function(a){var r=this;return c()(i.a.mark(function t(){var e;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,o.i(h._147)(a);case 3:(e=t.sent).status?(r.$message({message:"退款成功",type:"success"}),r.search()):r.$message.error("退款失败!"+e.errorMessage),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),r.$message.error("退款失败");case 10:case"end":return t.stop()}},t,r,[[0,7]])}))()},submit:function(){this.pageIndex=1,this.search()},getProofOrder:function(a,r){var s=this;return c()(i.a.mark(function t(){var e;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,o.i(h._543)(a);case 3:e=t.sent,r?(s.allData=e.data,s.$refs.exportCom.handleDownload()):(s.total=e.count,s.allData=e.data,s.getPageData(e.data),s.sumData(e.data)),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.log(t.t0);case 10:case"end":return t.stop()}},t,s,[[0,7]])}))()},dateForm1:function(t){t?(t=t.formatDates(),this.formInline.startTime=t.substring(0,10),this.formInline.endTime=t.substring(13)):(this.formInline.startTime="",this.formInline.endTime=""),this.onSubmit()},onSubmit:function(){this.currentPage=1,this.search()},search:function(){this.getProofOrder({})},handleSizeChange:function(t){console.log("每页 "+t+" 条"),this.size=t,this.getPageData()},handleCurrentChange:function(t){console.log("当前页: "+t),this.currentPage=t,this.getPageData()},view:function(t){this.viewFxCode=t,this.dialogVisible=!0,this.IsRefund=!1},refund:function(t,e){this.viewFxCode=e[t].subOrderCode,this.form=e[t],this.IsRefund=!0,this.dialogVisible=!0},editSure:function(){this.dialogVisible=!1,this.OnlineOrderRefund({code:this.form.subOrderCode})},editCancel:function(t){"refund"==t?this.dialogVisible=!1:(this.dialogVisible1=!1,this.$refs.form.resetFields())},makeSure:function(t){var e=this;this.$confirm("是否确认该订单状态?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.ConfirmReach(t)})},ConfirmReach:function(a){var r=this;return c()(i.a.mark(function t(){var e;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.i(h._544)({code:a.subOrderCode,userId:o.i(v.b)("userId")});case 2:(e=t.sent).status?(r.$message({message:"确认成功",type:"success"}),r.onSubmit()):r.$message.error("确认失败!"+e.errorMessage);case 4:case"end":return t.stop()}},t,r)}))()},sumData:function(t){var e=this;this.sum={minPayAmount:0,onlineOrderCount:0,offlineOrderCount:0,realAmount:0},t.forEach(function(t){e.sum.minPayAmount=e.sum.minPayAmount.add(t.minPayAmount),e.sum.onlineOrderCount=e.sum.onlineOrderCount.add(t.onlineOrderCount),e.sum.offlineOrderCount=e.sum.offlineOrderCount.add(t.offlineOrderCount),e.sum.realAmount=e.sum.realAmount.add(t.realAmount)})},getPageData:function(){this.tableData=this.allData.slice((this.currentPage-1)*this.size,this.currentPage*this.size)}},components:{orderDet:p.a,Export:d.a}}},1423:function(t,e,a){(t.exports=a(215)(!1)).push([t.i,"",""])},1848:function(t,e,a){var r=a(1423);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a(216)("737c340b",r,!0)},2321:function(t,e){t.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"selCommon projectOrder"},[a("el-form",{staticClass:"demo-form-inline form_search",attrs:{inline:!0,model:e.formInline,"label-width":"80px"}},[a("el-form-item",{staticClass:"form_item_mt10 form_item_wh280",attrs:{label:""}},[a("el-button",{staticClass:"searchBtn",attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),a("Export",{ref:"exportCom",staticStyle:{display:"none"},attrs:{tHeader:e.tHeader,filterVal:e.filterVal,tableData1:e.tableData1,name:e.name}}),e._v(" "),a("el-button",{staticClass:"searchBtn",on:{click:e.exportData}},[e._v("导出报表")])],1)],1),e._v(" "),a("el-table",{staticClass:"min_table",staticStyle:{width:"100%","margin-top":"15px","margin-bottom":"10px"},attrs:{data:e.tableData,border:"","show-summary":"","summary-method":e.getSummaries}},[a("el-table-column",{attrs:{prop:"goodsName",label:"商品名称","min-width":"150","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"minPayAmount",label:"最低支付","min-width":"100",align:"right"}}),e._v(" "),a("el-table-column",{attrs:{prop:"onlineOrderCount",label:"线上订单数","min-width":"100",align:"right"}}),e._v(" "),a("el-table-column",{attrs:{prop:"offlineOrderCount",label:"线下订单数","min-width":"100",align:"right"}}),e._v(" "),a("el-table-column",{attrs:{prop:"realAmount",label:"开单金额","min-width":"100",align:"right"}})],1),e._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,20,30,40],"page-size":e.size,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),a("el-dialog",{attrs:{size:"",visible:e.dialogVisible,title:"订单详情"},on:{"update:visible":function(t){e.dialogVisible=t}}},[e.dialogVisible?a("orderDet",{attrs:{code:e.viewFxCode,isRefund:e.IsRefund},on:{close:e.closeReport}}):e._e()],1)],1)},staticRenderFns:[]}},329:function(t,e,a){a(1848);var r=a(98)(a(1048),a(2321),"data-v-66fa7b45",null);t.exports=r.exports},436:function(t,e,a){a(439);var r=a(98)(a(437),a(440),"data-v-6c47323e",null);t.exports=r.exports},437:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{tHeader:{},filterVal:{},tableData1:{type:Array},name:""},watch:{tableData1:{handler:function(t){this.otData=t},deep:!0}},data:function(){return{otData:[]}},methods:{handleDownload:function(){var a=this;r.e(220).then(function(){var t=r(448).export_json_to_excel,e=[];e=0!=a.otData.length?a.formatJson(a.filterVal,a.otData):a.formatJson(a.filterVal,a.tableData1),t(a.tHeader,e,a.name)}.bind(null,r)).catch(r.oe)},formatJson:function(t,e){return e.map(function(e){return t.map(function(t){return e[t]})})}}}},438:function(t,e,a){(t.exports=a(215)(!1)).push([t.i,".exportBtn[data-v-6c47323e]{background:#fff;border:1px solid #d6d4d4;font-size:14px;color:#666;border-radius:4px}",""])},439:function(t,e,a){var r=a(438);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a(216)("fdf4f478",r,!0)},440:function(t,e){t.exports={render:function(){var t=this.$createElement;return(this._self._c||t)("el-button",{staticClass:"exportBtn",attrs:{type:"primary"},on:{click:this.handleDownload}},[this._v("导出报表")])},staticRenderFns:[]}},635:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s(100),n=s.n(a),r=s(99),o=s.n(r),i=s(64);e.default={data:function(){return{form:{createDate:"",onlinePrice:0,deposit:0}}},computed:{},props:{isRefund:{type:Boolean,default:!1},code:{},phoneNum:""},mounted:function(){this.GetOnlineOrderInfo()},methods:{OnlineOrderRefund:function(a){var r=this;return o()(n.a.mark(function t(){var e;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,s.i(i._147)(a);case 3:(e=t.sent).status?(r.$message({message:"退款成功",type:"success"}),r.$emit("close",!0)):r.$message.error("退款失败!"+e.errorMessage),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),r.$message.error("退款失败");case 10:case"end":return t.stop()}},t,r,[[0,7]])}))()},GetOrderInfoByCode:function(){var a=this;return o()(n.a.mark(function t(){var e;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s.i(i._148)({code:a.code});case 2:(e=t.sent).status?(a.form=e.data,a.form.realName=e.data.contactName):a.$message.error(""+e.errorMessage);case 4:case"end":return t.stop()}},t,a)}))()},GetOnlineOrderInfo:function(){var a=this;return o()(n.a.mark(function t(){var e;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s.i(i._149)({code:a.code});case 2:(e=t.sent).status?(a.form=e.data,a.form.realName=e.data.combineOrderInfo.contactName,a.form.branchUser=e.data.branchUserInfo.realname,a.form.invitUser=e.data.invitedUserInfo.realname,a.form.projectType=e.data.productMaxClassInfo?e.data.productMaxClassInfo.name:"",a.form.contactPhone=e.data.combineOrderInfo.contactPhone):a.$message.error(""+e.errorMessage);case 4:case"end":return t.stop()}},t,a)}))()},editSure:function(){this.dialogVisible=!1,this.OnlineOrderRefund({code:this.form.subOrderCode})},editCancel:function(){this.$emit("close",!1)}},components:{}}},642:function(t,e,a){(t.exports=a(215)(!1)).push([t.i,".form_footer[data-v-e226789e]{margin:10px 0 0}",""])},652:function(t,e,a){var r=a(642);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a(216)("0440018d",r,!0)},657:function(t,e,a){a(652);var r=a(98)(a(635),a(664),"data-v-e226789e",null);t.exports=r.exports},664:function(t,e){t.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"selCommon projectOrder"},[a("el-form",{ref:"form",staticStyle:{width:"600px"},attrs:{model:e.form,"label-width":"100px",inline:!0}},[a("el-col",{attrs:{span:24}},[a("span",{staticStyle:{"font-size":"16px"}},[e._v("订单信息：")])]),e._v(" "),a("el-col",{staticClass:"form_item_mt10",staticStyle:{background:"rgb(249, 249, 249)"},attrs:{span:24}},[a("el-form-item",{staticClass:"form_item_mt0 form_item_half",attrs:{label:"用户："}},[a("span",[e._v(e._s(e.form.realName))])]),e._v(" "),a("el-form-item",{staticClass:"form_item_mt0 form_item_half",attrs:{label:"手机号"}},[a("span",[e._v(e._s(e.form.contactPhone))])]),e._v(" "),a("el-form-item",{staticClass:"form_item_mt0 form_item_half",attrs:{label:"订单编号："}},[a("span",[e._v(e._s(e.form.subOrderCode))])]),e._v(" "),a("el-form-item",{staticClass:"form_item_half form_item_mt0",attrs:{label:"订单日期："}},[e.form.createDate?a("span",[e._v(e._s(e.form.createDate.substring(0,10)))]):e._e()]),e._v(" "),a("el-form-item",{staticClass:"form_item_half form_item_mt0",attrs:{label:"订单状态："}},[0==e.form.status?a("el-tag",{attrs:{type:"gray"}},[e._v("待付款")]):e._e(),e._v(" "),1==e.form.status?a("el-tag",{attrs:{type:"success"}},[e._v("已付款")]):e._e(),e._v(" "),2==e.form.status?a("el-tag",{attrs:{type:"success"}},[e._v("已确认")]):e._e(),e._v(" "),3==e.form.status?a("el-tag",{attrs:{type:"success"}},[e._v("待评价")]):e._e(),e._v(" "),4==e.form.status?a("el-tag",{attrs:{type:"danger"}},[e._v("已关闭")]):e._e()],1),e._v(" "),a("el-form-item",{staticClass:"form_item_half form_item_mt0",attrs:{label:"项目类型："}},[a("span",[e._v(e._s(e.form.projectType))])]),e._v(" "),a("el-form-item",{staticClass:"form_item_half form_item_mt0",attrs:{label:"项目名称："}},[a("div",{staticStyle:{width:"170px"}},[e._v("\n                        "+e._s(e.form.goodsName)+"\n                    ")])]),e._v(" "),a("el-form-item",{staticClass:"form_item_half form_item_mt0",attrs:{label:"订金："}},[a("span",[e._v(e._s(e.form.deposit))])]),e._v(" "),a("el-form-item",{staticClass:"form_item_half form_item_mt0",attrs:{label:"线上价格："}},[a("span",[e._v(e._s(e.form.onlinePrice))])]),e._v(" "),a("el-form-item",{staticClass:"form_item_half form_item_mt0",attrs:{label:"线下需支付："}},[a("span",[e._v(e._s(e.form.deposit.red(e.form.onlinePrice)))])]),e._v(" "),a("el-form-item",{staticClass:"form_item_half form_item_mt0",attrs:{label:"确认时间："}}),e._v(" "),a("el-form-item",{staticClass:"form_item_half form_item_mt0",attrs:{label:"操作人："}})],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("span",{staticStyle:{"font-size":"16px"}},[e._v("客户关系：")])]),e._v(" "),a("el-col",{staticClass:"form_item_mt10",staticStyle:{background:"rgb(249, 249, 249)"},attrs:{span:24}},[a("el-form-item",{staticClass:"form_item_mt0 form_item_half",attrs:{label:"介绍客户："}},[a("span",[e._v(e._s(e.form.invitUser))])]),e._v(" "),a("el-form-item",{staticClass:"form_item_mt0 form_item_half",attrs:{label:"介绍会员："}},[a("div",[e._v("\n                        "+e._s(e.form.branchUser)+"\n                        "),e.form.branchUserInfo?a("span",[e._v("("+e._s(e.form.branchUserInfo.mobile)+")")]):e._e()])])],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("span",{staticStyle:{"font-size":"16px"}},[e._v("付款情况：")])]),e._v(" "),a("el-col",{staticStyle:{background:"rgb(249, 249, 249)"},attrs:{span:24}},[a("el-form-item",{staticClass:"form_item_mt0 form_item_half",attrs:{label:"现金："}},[a("span",[e._v(e._s(Math.round(e.form.deposit-e.form.pointAmount-e.form.redPacketCount)))])]),e._v(" "),a("el-form-item",{staticClass:"form_item_mt0 form_item_half",attrs:{label:"积分支付："}},[a("span",[e._v(e._s(e.form.pointAmount))])]),e._v(" "),a("el-form-item",{staticClass:"form_item_mt0 form_item_half",attrs:{label:"红包："}},[a("span",[e._v(e._s(e.form.redPacketCount))])])],1),e._v(" "),e.isRefund?e._e():a("el-col",{staticClass:"form_item_mt10",staticStyle:{background:"rgb(249, 249, 249)"},attrs:{span:24}},[a("el-form-item",{staticClass:"form_item_mt0 form_item_half",attrs:{label:"付款时间："}},[a("span",[e._v(e._s(e.form.abstract))])]),e._v(" "),a("el-form-item",{staticClass:"form_item_mt0 form_item_half",attrs:{label:"退款时间："}},[a("span",[e._v(e._s(e.form.abstract))])]),e._v(" "),a("el-form-item",{staticClass:"form_item_mt0 form_item_half",attrs:{label:"退款金额："}},[a("span",[e._v(e._s(e.form.abstract))])])],1),e._v(" "),a("el-form-item",{staticClass:"form_item_mt0 form_item_full",attrs:{label:"客户备注："}},[a("el-input",{staticStyle:{width:"400px"},attrs:{type:"textarea"},model:{value:e.form.Memo,callback:function(t){e.$set(e.form,"Memo",t)},expression:"form.Memo"}})],1)],1),e._v(" "),e.isRefund?a("div",{staticClass:"form_footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.editSure("refund")}}},[e._v("确 定")]),e._v(" "),a("el-button",{on:{click:function(t){return e.editCancel("refund")}}},[e._v("取 消")])],1):e._e()],1)},staticRenderFns:[]}}});