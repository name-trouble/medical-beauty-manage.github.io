webpackJsonp([91],{1050:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=o(66),i=o.n(a),r=o(102),l=o.n(r),s=o(100),c=o.n(s),n=o(99),m=o.n(n),f=o(37),u=o.n(f),p=o(65),_=(o.n(p),o(436)),d=o.n(_),v=o(657),h=o.n(v),b=o(64),y=o(22);e.default={data:function(){return{loading:!1,date1:"",typeCode:o.i(y.d)("typeCode"),IsRefund:!1,dialogVisible:!1,dialogVisible1:!1,currentIndex:0,formInline:{startTime:"",endTime:"",fxCode:"",name:"",rec:"",customer:"",hospital:"",branch:"",payType:"",status:[],statusMes:"全部"},status:[],statusList:[{label:"全部",value:""},{label:"待付款",value:"0"},{label:"已付款",value:"1"},{label:"已确认",value:"2"},{label:"已评价",value:"3"},{label:"已关闭",value:"4"},{label:"已退款",value:"5"},{label:"已取消",value:"6"}],tableData:[],currentPage:1,size:10,total:0,form:{createDate:""},hospitalList:[],branchList:[],viewFxCode:"",allData:[]}},computed:{tHeader:function(){return["合并订单号","订单编号","客户","手机号","消费商","订单时间","来源","类型","商品名称","价格","最低支付金额","最高可抵扣积分","订金","状态"]},filterVal:function(){return["orderCode","subOrderCode","contactName","contactPhone","branchName","createDate","source","activityTypes","goodsName","price","pay","points","deposit","status"]},tableData1:function(){var e=this,t=JSON.parse(u()(this.allData));return t.forEach(function(t){t.activityTypes=e.getTypeName(t.activityTypes),t.status=e.getStatus(t.status)}),t},name:function(){return"订单审核"}},watch:{"formInline.status":{handler:function(t){var a=this,r="";0==t.length&&(r="全部"),t.forEach(function(e){if(""===e)return r="全部",a.formInline.status=[],!0;a.statusList.forEach(function(t){e==t.value&&(r+=t.label)})}),this.formInline.statusMes=r},deep:!0}},mounted:function(){this.getHospital()},methods:{translate:function(t){var e=this;this.$confirm("此操作将修改订单受益人，是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.GeneratorMemberConsume({SubOrderCode:t.subOrderCode})})},GeneratorMemberConsume:function(a){var r=this;return m()(c.a.mark(function t(){var e;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.i(b._545)(a);case 2:(e=t.sent).status?(r.$message({message:"转移成功",type:"success"}),r.search()):r.$message.error("转移失败!"+e.errorMessage);case 4:case"end":return t.stop()}},t,r)}))()},getTypeName:function(t){switch(t){case null:return"限时秒杀";case 1:return"体验专区";case 2:return"特惠项目";case 3:return"量贩专区";case 4:return"原价"}},getStatus:function(t){switch(t){case 0:return"待付款";case 1:return"已付款";case 2:return"已确认";case 3:return"已评价";case 4:return"已关闭";case 5:return"已退款";case 6:return"已取消"}},exportData:function(){this.getProofOrder({pageIndex:1,pageSize:this.total,CreateDate1:this.formInline.startTime,CreateDate2:this.formInline.endTime,HospitalCode:this.formInline.hospital,branchCode:this.formInline.branch,Keyword:this.formInline.fxCode,status:this.formInline.status.join(","),userId:o.i(y.b)("userId"),UserBranchCode:o.i(y.b)("BranchCode"),ReportClass:o.i(y.b)("reportClass"),payType:this.formInline.payType},1)},getHospital:function(){var n=this;return m()(c.a.mark(function t(){var e,a,r,s;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.a.all([o.i(b.d)({typeId:1}),o.i(b.d)({typeId:2})]);case 2:e=t.sent,a=l()(e,2),r=a[0],s=a[1],n.hospitalList=r.data,n.formInline.hospital=n.hospitalList[0].code,n.branchList=s.data,"03"==n.typeCode&&n.branchList.unshift({branchName:"全部",code:""}),n.formInline.branch=n.branchList[0].code;case 11:case"end":return t.stop()}},t,n)}))()},closeReport:function(t){this.dialogVisible=!1,t&&this.search()},OnlineOrderRefund:function(a){var r=this;return m()(c.a.mark(function t(){var e;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,o.i(b._147)(a);case 3:(e=t.sent).status?(r.$message({message:"退款成功",type:"success"}),r.search()):r.$message.error("退款失败!"+e.errorMessage),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),r.$message.error("退款失败");case 10:case"end":return t.stop()}},t,r,[[0,7]])}))()},submit:function(){this.pageIndex=1,this.search()},getProofOrder:function(a,r){var s=this;return m()(c.a.mark(function t(){var e;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,o.i(b._546)(a);case 3:e=t.sent,r?(s.allData=s.dealData(e.data),s.$refs.exportCom.handleDownload()):(s.total=e.count,s.tableData=s.dealData(e.data)),s.loading=!1,t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),console.log(t.t0);case 11:case"end":return t.stop()}},t,s,[[0,8]])}))()},dealData:function(t){return t.forEach(function(t){t.Surplus=t.OrderAmount-t.RealAmount}),t},dateForm1:function(t){t?(t=t.formatDates(),this.formInline.startTime=t.substring(0,10),this.formInline.endTime=t.substring(13)):(this.formInline.startTime="",this.formInline.endTime=""),this.onSubmit()},onSubmit:function(){this.currentPage=1,this.search()},search:function(){this.loading=!0,this.getProofOrder({pageIndex:this.currentPage,pageSize:this.size,CreateDate1:this.formInline.startTime,CreateDate2:this.formInline.endTime,HospitalCode:this.formInline.hospital,branchCode:this.formInline.branch,Keyword:this.formInline.fxCode,status:this.formInline.status.join(","),userId:o.i(y.b)("userId"),UserBranchCode:o.i(y.b)("BranchCode"),ReportClass:o.i(y.b)("reportClass"),payType:this.formInline.payType})},handleSizeChange:function(t){console.log("每页 "+t+" 条"),this.size=t,this.search()},handleCurrentChange:function(t){console.log("当前页: "+t),this.currentPage=t,this.search()},view:function(t){this.viewFxCode=t,this.dialogVisible=!0,this.IsRefund=!1},refund:function(t,e){this.viewFxCode=e[t].subOrderCode,this.form=e[t],this.IsRefund=!0,this.dialogVisible=!0},editSure:function(){this.dialogVisible=!1,this.OnlineOrderRefund({code:this.form.subOrderCode})},editCancel:function(t){"refund"==t?this.dialogVisible=!1:(this.dialogVisible1=!1,this.$refs.form.resetFields())},makeSure:function(t){var e=this;this.$confirm("是否确认该订单状态?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.ConfirmReach(t)})},ConfirmReach:function(a){var r=this;return m()(c.a.mark(function t(){var e;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.i(b._544)({code:a.subOrderCode,userId:o.i(y.b)("userId")});case 2:(e=t.sent).status?(r.$message({message:"确认成功",type:"success"}),r.onSubmit()):r.$message.error("确认失败!"+e.errorMessage);case 4:case"end":return t.stop()}},t,r)}))()}},components:{orderDet:h.a,Export:d.a}}},1310:function(t,e,a){(t.exports=a(215)(!1)).push([t.i,".front_ipt[data-v-2c41a89a]{opacity:0;z-index:2}.back_ipt[data-v-2c41a89a]{margin-left:-220px;z-index:1}",""])},1735:function(t,e,a){var r=a(1310);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a(216)("1eee5a92",r,!0)},2207:function(t,e){t.exports={render:function(){var a=this,t=a.$createElement,r=a._self._c||t;return r("div",{staticClass:"selCommon projectOrder"},[r("el-form",{staticClass:"demo-form-inline form_search",attrs:{inline:!0,model:a.formInline,"label-width":"80px"}},[r("el-form-item",{staticClass:"form_item_mt10 ",attrs:{label:"订单时间："}},[r("el-date-picker",{staticClass:"form_item_ipt220",attrs:{type:"daterange",placeholder:"选择日期范围"},on:{change:a.dateForm1},model:{value:a.date1,callback:function(t){a.date1=t},expression:"date1"}})],1),a._v(" "),r("el-form-item",{staticClass:"form_item_mt10 form_item_wh280",attrs:{label:"关键字："}},[r("el-input",{staticClass:"form_item_ipt220",attrs:{placeholder:"订单编号/客户/商品名称/代理商/手机号",maxlength:1e4},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&a._k(t.keyCode,"enter",13,t.key,"Enter")?null:a.onSubmit(t)}},model:{value:a.formInline.fxCode,callback:function(t){a.$set(a.formInline,"fxCode",t)},expression:"formInline.fxCode"}})],1),a._v(" "),r("el-form-item",{staticClass:"form_item_mt10 form_item_wh280",attrs:{label:"医院："}},[r("el-select",{staticClass:"form_item_ipt220",on:{change:a.onSubmit},model:{value:a.formInline.hospital,callback:function(t){a.$set(a.formInline,"hospital",t)},expression:"formInline.hospital"}},a._l(a.hospitalList,function(t,e){return r("el-option",{key:e,attrs:{label:t.supplierName,value:t.code}})}),1)],1),a._v(" "),r("el-form-item",{staticClass:"form_item_mt10 form_item_wh280",attrs:{label:"销售公司："}},[r("el-select",{staticClass:"form_item_ipt220",on:{change:a.onSubmit},model:{value:a.formInline.branch,callback:function(t){a.$set(a.formInline,"branch",t)},expression:"formInline.branch"}},a._l(a.branchList,function(t,e){return r("el-option",{key:e,attrs:{label:t.branchName,value:t.code}})}),1)],1),a._v(" "),r("el-form-item",{staticClass:"form_item_mt10 form_item_wh280",attrs:{label:"支付方式："}},[r("el-select",{staticClass:"form_item_ipt220",on:{change:a.onSubmit},model:{value:a.formInline.payType,callback:function(t){a.$set(a.formInline,"payType",t)},expression:"formInline.payType"}},[r("el-option",{attrs:{label:"全部",value:""}}),a._v(" "),r("el-option",{attrs:{label:"支付宝",value:"1"}}),a._v(" "),r("el-option",{attrs:{label:"微信",value:"2"}}),a._v(" "),r("el-option",{attrs:{label:"余额支付",value:"3"}})],1)],1),a._v(" "),r("el-form-item",{staticClass:"form_item_mt10 form_item_wh280",attrs:{label:"状态："}},[r("el-select",{staticClass:"form_item_ipt220 front_ipt",attrs:{multiple:""},model:{value:a.formInline.status,callback:function(t){a.$set(a.formInline,"status",t)},expression:"formInline.status"}},a._l(a.statusList,function(t){return r("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1),a._v(" "),r("el-input",{staticClass:"form_item_ipt220 back_ipt",attrs:{placeholder:"请选择"},model:{value:a.formInline.statusMes,callback:function(t){a.$set(a.formInline,"statusMes",t)},expression:"formInline.statusMes"}})],1),a._v(" "),r("br"),a._v(" "),r("el-form-item",{staticClass:"form_item_mt10 form_item_wh280",attrs:{label:" "}},[r("el-button",{staticClass:"searchBtn",attrs:{type:"primary"},on:{click:a.onSubmit}},[a._v("查询")]),a._v(" "),r("Export",{ref:"exportCom",staticStyle:{display:"none"},attrs:{tHeader:a.tHeader,filterVal:a.filterVal,tableData1:a.tableData1,name:a.name}}),a._v(" "),r("el-button",{staticClass:"searchBtn",on:{click:a.exportData}},[a._v("导出报表")])],1)],1),a._v(" "),r("el-table",{staticClass:"min_table",staticStyle:{width:"100%","margin-top":"15px","margin-bottom":"10px"},attrs:{data:a.tableData,border:"",loading:a.loading}},[r("el-table-column",{attrs:{prop:"orderCode",label:"合并订单号","min-width":"100"}}),a._v(" "),r("el-table-column",{attrs:{prop:"subOrderCode",label:"订单编号","min-width":"100"},scopedSlots:a._u([{key:"default",fn:function(e){return[r("el-button",{attrs:{type:"text"},on:{click:function(t){return a.view(e.row.subOrderCode)}}},[a._v(a._s(e.row.subOrderCode))])]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"contactName",label:"客户","min-width":"100"},scopedSlots:a._u([{key:"default",fn:function(t){return[r("span",{style:{color:t.row.isBranch?"black":"red"}},[a._v(a._s(t.row.contactName))])]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"branchName",label:"消费商","min-width":"80"}}),a._v(" "),r("el-table-column",{attrs:{prop:"createDate",label:"订单时间","min-width":"120"},scopedSlots:a._u([{key:"default",fn:function(t){return[t.row.createDate?r("span",[a._v(a._s(t.row.createDate))]):a._e()]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"offlineDate",label:"线下开单日期","min-width":"80","show-overflow-tooltip":""},scopedSlots:a._u([{key:"default",fn:function(t){return[t.row.offlineDate?r("span",[a._v(a._s(t.row.offlineDate))]):a._e()]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"source",label:"来源","min-width":"80","show-overflow-tooltip":""}}),a._v(" "),r("el-table-column",{attrs:{prop:"payType",label:"支付方式","min-width":"80","show-overflow-tooltip":""},scopedSlots:a._u([{key:"default",fn:function(t){return[1==t.row.payType?r("span",[a._v("支付宝")]):a._e(),a._v(" "),2==t.row.payType?r("span",[a._v("微信")]):a._e(),a._v(" "),3==t.row.payType?r("span",[a._v("余额支付")]):a._e()]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"activityTypes",label:"类型","min-width":"80","show-overflow-tooltip":""},scopedSlots:a._u([{key:"default",fn:function(t){return[1==t.row.activityTypes?r("span",[a._v("限时秒杀")]):a._e(),a._v(" "),2==t.row.activityTypes?r("span",[a._v("体验专区")]):a._e(),a._v(" "),3==t.row.activityTypes?r("span",[a._v("特惠项目")]):a._e(),a._v(" "),4==t.row.activityTypes?r("span",[a._v("量贩专区")]):a._e(),a._v(" "),5==t.row.activityTypes?r("span",[a._v("398特惠")]):a._e(),a._v(" "),null==t.row.activityTypes||0==t.row.activityTypes?r("span",[a._v("原价")]):a._e()]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"goodsName",label:"商品名称","min-width":"150","show-overflow-tooltip":""}}),a._v(" "),r("el-table-column",{attrs:{prop:"price",label:"价格","min-width":"80",align:"right"},scopedSlots:a._u([{key:"default",fn:function(t){return[a._v("\n                "+a._s(t.row.price)+"\n            ")]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"pay",label:"最低支付金额","min-width":"100",align:"right"}}),a._v(" "),r("el-table-column",{attrs:{prop:"points",label:"最高可抵扣积分","min-width":"100",align:"right"}}),a._v(" "),r("el-table-column",{attrs:{prop:"deposit",label:"订金","min-width":"90",align:"right"},scopedSlots:a._u([{key:"default",fn:function(t){return[t.row.deposit?r("span",[a._v(" "+a._s(t.row.deposit))]):r("span",[a._v("0")])]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"status",label:"状态","min-width":"80",align:"center"},scopedSlots:a._u([{key:"default",fn:function(t){return[0==t.row.status?r("el-tag",{attrs:{type:"gray"}},[a._v("待付款")]):a._e(),a._v(" "),1==t.row.status?r("el-tag",{attrs:{type:"success"}},[a._v("已付款")]):a._e(),a._v(" "),2==t.row.status?r("el-tag",{attrs:{type:"success"}},[a._v("已确认")]):a._e(),a._v(" "),3==t.row.status?r("el-tag",{attrs:{type:"success"}},[a._v("待评价")]):a._e(),a._v(" "),4==t.row.status?r("el-tag",{attrs:{type:"danger"}},[a._v("已关闭")]):a._e(),a._v(" "),5==t.row.status?r("el-tag",{attrs:{type:"danger"}},[a._v("已退款")]):a._e(),a._v(" "),6==t.row.status?r("el-tag",{attrs:{type:"danger"}},[a._v("已取消")]):a._e()]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"grade",label:"操作","min-width":"170"},scopedSlots:a._u([{key:"default",fn:function(e){return[6!=e.row.status?r("el-button",{attrs:{type:"primary",disabled:1!=e.row.status&&2!=e.row.status,size:"small"},on:{click:function(t){return a.refund(e.$index,a.tableData)}}},[a._v("退款")]):a._e(),a._v(" "),r("el-button",{attrs:{type:"primary",size:"small",disabled:1!=e.row.status},on:{click:function(t){return a.makeSure(e.row)}}},[a._v("确认")]),a._v(" "),r("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){return a.translate(e.row)}}},[a._v("订单转移")])]}}])})],1),a._v(" "),r("div",{staticClass:"block"},[r("el-pagination",{attrs:{"current-page":a.currentPage,"page-sizes":[10,20,30,40],"page-size":a.size,layout:"total, sizes, prev, pager, next, jumper",total:a.total},on:{"size-change":a.handleSizeChange,"current-change":a.handleCurrentChange}})],1),a._v(" "),r("el-dialog",{attrs:{size:"",visible:a.dialogVisible,title:"订单详情"},on:{"update:visible":function(t){a.dialogVisible=t}}},[a.dialogVisible?r("orderDet",{attrs:{code:a.viewFxCode,isRefund:a.IsRefund},on:{close:a.closeReport}}):a._e()],1)],1)},staticRenderFns:[]}},331:function(t,e,a){a(1735);var r=a(98)(a(1050),a(2207),"data-v-2c41a89a",null);t.exports=r.exports},436:function(t,e,a){a(439);var r=a(98)(a(437),a(440),"data-v-6c47323e",null);t.exports=r.exports},437:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{tHeader:{},filterVal:{},tableData1:{type:Array},name:""},watch:{tableData1:{handler:function(t){this.otData=t},deep:!0}},data:function(){return{otData:[]}},methods:{handleDownload:function(){var a=this;r.e(220).then(function(){var t=r(448).export_json_to_excel,e=[];e=0!=a.otData.length?a.formatJson(a.filterVal,a.otData):a.formatJson(a.filterVal,a.tableData1),t(a.tHeader,e,a.name)}.bind(null,r)).catch(r.oe)},formatJson:function(t,e){return e.map(function(e){return t.map(function(t){return e[t]})})}}}},438:function(t,e,a){(t.exports=a(215)(!1)).push([t.i,".exportBtn[data-v-6c47323e]{background:#fff;border:1px solid #d6d4d4;font-size:14px;color:#666;border-radius:4px}",""])},439:function(t,e,a){var r=a(438);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a(216)("fdf4f478",r,!0)},440:function(t,e){t.exports={render:function(){var t=this.$createElement;return(this._self._c||t)("el-button",{staticClass:"exportBtn",attrs:{type:"primary"},on:{click:this.handleDownload}},[this._v("导出报表")])},staticRenderFns:[]}},635:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s(100),n=s.n(a),r=s(99),o=s.n(r),i=s(64);e.default={data:function(){return{form:{createDate:"",onlinePrice:0,deposit:0}}},computed:{},props:{isRefund:{type:Boolean,default:!1},code:{},phoneNum:""},mounted:function(){this.GetOnlineOrderInfo()},methods:{OnlineOrderRefund:function(a){var r=this;return o()(n.a.mark(function t(){var e;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,s.i(i._147)(a);case 3:(e=t.sent).status?(r.$message({message:"退款成功",type:"success"}),r.$emit("close",!0)):r.$message.error("退款失败!"+e.errorMessage),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),r.$message.error("退款失败");case 10:case"end":return t.stop()}},t,r,[[0,7]])}))()},GetOrderInfoByCode:function(){var a=this;return o()(n.a.mark(function t(){var e;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s.i(i._148)({code:a.code});case 2:(e=t.sent).status?(a.form=e.data,a.form.realName=e.data.contactName):a.$message.error(""+e.errorMessage);case 4:case"end":return t.stop()}},t,a)}))()},GetOnlineOrderInfo:function(){var a=this;return o()(n.a.mark(function t(){var e;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s.i(i._149)({code:a.code});case 2:(e=t.sent).status?(a.form=e.data,a.form.realName=e.data.combineOrderInfo.contactName,a.form.branchUser=e.data.branchUserInfo.realname,a.form.invitUser=e.data.invitedUserInfo.realname,a.form.projectType=e.data.productMaxClassInfo?e.data.productMaxClassInfo.name:"",a.form.contactPhone=e.data.combineOrderInfo.contactPhone):a.$message.error(""+e.errorMessage);case 4:case"end":return t.stop()}},t,a)}))()},editSure:function(){this.dialogVisible=!1,this.OnlineOrderRefund({code:this.form.subOrderCode})},editCancel:function(){this.$emit("close",!1)}},components:{}}},642:function(t,e,a){(t.exports=a(215)(!1)).push([t.i,".form_footer[data-v-e226789e]{margin:10px 0 0}",""])},652:function(t,e,a){var r=a(642);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a(216)("0440018d",r,!0)},657:function(t,e,a){a(652);var r=a(98)(a(635),a(664),"data-v-e226789e",null);t.exports=r.exports},664:function(t,e){t.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"selCommon projectOrder"},[a("el-form",{ref:"form",staticStyle:{width:"600px"},attrs:{model:e.form,"label-width":"100px",inline:!0}},[a("el-col",{attrs:{span:24}},[a("span",{staticStyle:{"font-size":"16px"}},[e._v("订单信息：")])]),e._v(" "),a("el-col",{staticClass:"form_item_mt10",staticStyle:{background:"rgb(249, 249, 249)"},attrs:{span:24}},[a("el-form-item",{staticClass:"form_item_mt0 form_item_half",attrs:{label:"用户："}},[a("span",[e._v(e._s(e.form.realName))])]),e._v(" "),a("el-form-item",{staticClass:"form_item_mt0 form_item_half",attrs:{label:"手机号"}},[a("span",[e._v(e._s(e.form.contactPhone))])]),e._v(" "),a("el-form-item",{staticClass:"form_item_mt0 form_item_half",attrs:{label:"订单编号："}},[a("span",[e._v(e._s(e.form.subOrderCode))])]),e._v(" "),a("el-form-item",{staticClass:"form_item_half form_item_mt0",attrs:{label:"订单日期："}},[e.form.createDate?a("span",[e._v(e._s(e.form.createDate.substring(0,10)))]):e._e()]),e._v(" "),a("el-form-item",{staticClass:"form_item_half form_item_mt0",attrs:{label:"订单状态："}},[0==e.form.status?a("el-tag",{attrs:{type:"gray"}},[e._v("待付款")]):e._e(),e._v(" "),1==e.form.status?a("el-tag",{attrs:{type:"success"}},[e._v("已付款")]):e._e(),e._v(" "),2==e.form.status?a("el-tag",{attrs:{type:"success"}},[e._v("已确认")]):e._e(),e._v(" "),3==e.form.status?a("el-tag",{attrs:{type:"success"}},[e._v("待评价")]):e._e(),e._v(" "),4==e.form.status?a("el-tag",{attrs:{type:"danger"}},[e._v("已关闭")]):e._e()],1),e._v(" "),a("el-form-item",{staticClass:"form_item_half form_item_mt0",attrs:{label:"项目类型："}},[a("span",[e._v(e._s(e.form.projectType))])]),e._v(" "),a("el-form-item",{staticClass:"form_item_half form_item_mt0",attrs:{label:"项目名称："}},[a("div",{staticStyle:{width:"170px"}},[e._v("\n                        "+e._s(e.form.goodsName)+"\n                    ")])]),e._v(" "),a("el-form-item",{staticClass:"form_item_half form_item_mt0",attrs:{label:"订金："}},[a("span",[e._v(e._s(e.form.deposit))])]),e._v(" "),a("el-form-item",{staticClass:"form_item_half form_item_mt0",attrs:{label:"线上价格："}},[a("span",[e._v(e._s(e.form.onlinePrice))])]),e._v(" "),a("el-form-item",{staticClass:"form_item_half form_item_mt0",attrs:{label:"线下需支付："}},[a("span",[e._v(e._s(e.form.deposit.red(e.form.onlinePrice)))])]),e._v(" "),a("el-form-item",{staticClass:"form_item_half form_item_mt0",attrs:{label:"确认时间："}}),e._v(" "),a("el-form-item",{staticClass:"form_item_half form_item_mt0",attrs:{label:"操作人："}})],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("span",{staticStyle:{"font-size":"16px"}},[e._v("客户关系：")])]),e._v(" "),a("el-col",{staticClass:"form_item_mt10",staticStyle:{background:"rgb(249, 249, 249)"},attrs:{span:24}},[a("el-form-item",{staticClass:"form_item_mt0 form_item_half",attrs:{label:"介绍客户："}},[a("span",[e._v(e._s(e.form.invitUser))])]),e._v(" "),a("el-form-item",{staticClass:"form_item_mt0 form_item_half",attrs:{label:"介绍会员："}},[a("div",[e._v("\n                        "+e._s(e.form.branchUser)+"\n                        "),e.form.branchUserInfo?a("span",[e._v("("+e._s(e.form.branchUserInfo.mobile)+")")]):e._e()])])],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("span",{staticStyle:{"font-size":"16px"}},[e._v("付款情况：")])]),e._v(" "),a("el-col",{staticStyle:{background:"rgb(249, 249, 249)"},attrs:{span:24}},[a("el-form-item",{staticClass:"form_item_mt0 form_item_half",attrs:{label:"现金："}},[a("span",[e._v(e._s(Math.round(e.form.deposit-e.form.pointAmount-e.form.redPacketCount)))])]),e._v(" "),a("el-form-item",{staticClass:"form_item_mt0 form_item_half",attrs:{label:"积分支付："}},[a("span",[e._v(e._s(e.form.pointAmount))])]),e._v(" "),a("el-form-item",{staticClass:"form_item_mt0 form_item_half",attrs:{label:"红包："}},[a("span",[e._v(e._s(e.form.redPacketCount))])])],1),e._v(" "),e.isRefund?e._e():a("el-col",{staticClass:"form_item_mt10",staticStyle:{background:"rgb(249, 249, 249)"},attrs:{span:24}},[a("el-form-item",{staticClass:"form_item_mt0 form_item_half",attrs:{label:"付款时间："}},[a("span",[e._v(e._s(e.form.abstract))])]),e._v(" "),a("el-form-item",{staticClass:"form_item_mt0 form_item_half",attrs:{label:"退款时间："}},[a("span",[e._v(e._s(e.form.abstract))])]),e._v(" "),a("el-form-item",{staticClass:"form_item_mt0 form_item_half",attrs:{label:"退款金额："}},[a("span",[e._v(e._s(e.form.abstract))])])],1),e._v(" "),a("el-form-item",{staticClass:"form_item_mt0 form_item_full",attrs:{label:"客户备注："}},[a("el-input",{staticStyle:{width:"400px"},attrs:{type:"textarea"},model:{value:e.form.Memo,callback:function(t){e.$set(e.form,"Memo",t)},expression:"form.Memo"}})],1)],1),e._v(" "),e.isRefund?a("div",{staticClass:"form_footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.editSure("refund")}}},[e._v("确 定")]),e._v(" "),a("el-button",{on:{click:function(t){return e.editCancel("refund")}}},[e._v("取 消")])],1):e._e()],1)},staticRenderFns:[]}}});