webpackJsonp([157],{1046:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s(66),o=s.n(a),n=s(102),l=s.n(n),r=s(100),c=s.n(r),i=s(99),u=s.n(i),d=s(37),m=s.n(d),p=s(65),h=(s.n(p),s(436)),f=s.n(h),g=s(64);s(22);e.default={data:function(){return{date1:"",detLoading:!1,dialogVisible:!1,putDialog:!1,currentIndex:0,formInline:{startTime:"",endTime:"",keywords:"",name:"",rec:"",customer:"",hospital:"",branch:"",status:""},tableData:[],currentPage:1,size:10,total:0,hospitalList:[],branchList:[],allData:[],sumdata:{realAmount:0,usedAmount:0},viewData:{},detData:[],detAllData:[],detPageIndex:0,detPageSize:10,detTotal:0}},computed:{tHeader:function(){return["会员","客户等级","手机号","最近代理商","累计收益","手续费","已提现","未提现"]},filterVal:function(){return["benefitName","typeCode","mobile","branchName","realAmount","extFee","usedAmount","transAmount"]},tableData1:function(){var e=this,t=JSON.parse(m()(this.allData));return t.forEach(function(t){t.typeCode=e.getStatus(t.typeCode)}),t},name:function(){return"订单收益"}},filters:{filterFun:function(t){switch(t){case"02":return"代理商";case"04":return"会员";case"06":return"线上app会员"}}},mounted:function(){this.getHospital()},methods:{getStatus:function(){switch(val){case"02":return"代理商";case"04":return"会员";case"06":return"线上app会员"}},GetCashApplyListByUser:function(){var a=this;return u()(c.a.mark(function t(){var e;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s.i(g._536)({benefitId:a.viewData.benefitId,applyStatus:a.viewData.status});case 2:e=t.sent,a.detLoading=!1,a.detAllData=e.data,a.detTotal=e.count,a.getPageData();case 7:case"end":return t.stop()}},t,a)}))()},getSummaries:function(){return["总合计：","","","",this.sumdata.realAmount,this.sumdata.extFee,this.sumdata.usedAmount,this.sumdata.transAmount]},viewDet:function(t,e,a){this.detPageIndex=1,this.detPageSize=10,this.detTotal=0,this.detData=[],this.detAllData=[],this.viewData=t,this.viewData.status=a,this.detLoading=!0,1==e?(this.putDialog=!0,this.GetCashApplyListByUser()):(this.dialogVisible=!0,this.getDetData())},getDetData:function(){var a=this;return u()(c.a.mark(function t(){var e;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s.i(g._537)({pageIndex:a.detPageIndex,pageSize:a.detPageSize,topBranchCode:a.formInline.branch,benefitId:a.viewData.benefitId,Keyword:a.formInline.keywords,startDate:a.formInline.startTime,endDate:a.formInline.endTime});case 2:e=t.sent,a.detLoading=!1,a.detAllData=e.data,a.detTotal=e.count,a.getPageData();case 7:case"end":return t.stop()}},t,a)}))()},getPageData:function(){this.detData=this.detAllData.slice((this.detPageIndex-1)*this.detPageSize,this.detPageIndex*this.detPageSize)},approveStatus:function(a){var n=this;return u()(c.a.mark(function t(){var e;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s.i(g._538)(a);case 2:(e=t.sent).status?(n.$message({message:"操作成功",type:"success"}),n.search()):n.$message.error("操作失败!"+e.errorMessage);case 4:case"end":return t.stop()}},t,n)}))()},exportData:function(){this.GetMemberConsume({pageIndex:1,pageSize:this.total,topBranchCode:this.formInline.branch,benefitId:"",Keyword:this.formInline.keywords,startDate:this.formInline.startTime,endDate:this.formInline.endTime},1)},getHospital:function(){var i=this;return u()(c.a.mark(function t(){var e,a,n,r;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.a.all([s.i(g.d)({typeId:1}),s.i(g.d)({typeId:2})]);case 2:e=t.sent,a=l()(e,2),n=a[0],r=a[1],i.hospitalList=n.data,i.formInline.hospital=i.hospitalList[0].code,i.branchList=r.data,i.formInline.branch=i.branchList[0].code;case 10:case"end":return t.stop()}},t,i)}))()},closeReport:function(t){this.dialogVisible=!1,t&&this.search()},OnlineOrderRefund:function(a){var n=this;return u()(c.a.mark(function t(){var e;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,ConfirmRefund(a);case 3:(e=t.sent).status?(n.$message({message:"退款成功",type:"success"}),n.search()):n.$message.error("退款失败!"+e.errorMessage),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),n.$message.error("退款失败");case 10:case"end":return t.stop()}},t,n,[[0,7]])}))()},submit:function(){this.pageIndex=1,this.search()},GetMemberConsume:function(a,n){var r=this;return u()(c.a.mark(function t(){var e;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,s.i(g._539)(a);case 3:e=t.sent,n?(r.allData=e.data,r.$refs.exportCom.handleDownload()):(r.total=e.count,r.tableData=e.data,r.sumdata=e.sumdata[0]),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.log(t.t0);case 10:case"end":return t.stop()}},t,r,[[0,7]])}))()},dateForm1:function(t){t?(t=t.formatDates(),this.formInline.startTime=t.substring(0,10),this.formInline.endTime=t.substring(13)):(this.formInline.startTime="",this.formInline.endTime=""),this.onSubmit()},onSubmit:function(){this.currentPage=1,this.search()},search:function(){this.GetMemberConsume({topBranchCode:this.formInline.branch,benefitId:"",pageIndex:this.currentPage,pageSize:this.size,keywords:this.formInline.keywords,startDate:this.formInline.startTime,endDate:this.formInline.endTime})},handleSizeChange:function(t){console.log("每页 "+t+" 条"),this.size=t,this.search()},handleCurrentChange:function(t){console.log("当前页: "+t),this.currentPage=t,this.search()},handleSizeChange1:function(t){console.log("每页 "+t+" 条"),this.detPageSize=t,this.getPageData()},handleCurrentChange1:function(t){console.log("当前页: "+t),this.detPageIndex=t,this.getPageData()}},components:{Export:f.a}}},1230:function(t,e,a){(t.exports=a(215)(!1)).push([t.i,"",""])},1655:function(t,e,a){var n=a(1230);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a(216)("c702c27c",n,!0)},2126:function(t,e){t.exports={render:function(){var a=this,t=a.$createElement,n=a._self._c||t;return n("div",{staticClass:"selCommon projectOrder"},[n("el-form",{staticClass:"demo-form-inline form_search",attrs:{inline:!0,model:a.formInline,"label-width":"80px"}},[n("el-form-item",{staticClass:"form_item_mt10 ",attrs:{label:"申请时间："}},[n("el-date-picker",{staticClass:"form_item_ipt220",attrs:{type:"daterange",placeholder:"选择日期范围"},on:{change:a.dateForm1},model:{value:a.date1,callback:function(t){a.date1=t},expression:"date1"}})],1),a._v(" "),n("el-form-item",{staticClass:"form_item_mt10 form_item_wh280",attrs:{label:"关键字："}},[n("el-input",{staticClass:"form_item_ipt220",attrs:{placeholder:"APP昵称/手机号",maxlength:1e4},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&a._k(t.keyCode,"enter",13,t.key,"Enter")?null:a.onSubmit(t)}},model:{value:a.formInline.keywords,callback:function(t){a.$set(a.formInline,"keywords",t)},expression:"formInline.keywords"}})],1),a._v(" "),n("el-form-item",{staticClass:"form_item_mt10 form_item_wh280",attrs:{label:"销售公司："}},[n("el-select",{staticStyle:{width:"200px"},attrs:{placeholder:""},on:{change:a.submit},model:{value:a.formInline.branch,callback:function(t){a.$set(a.formInline,"branch",t)},expression:"formInline.branch"}},a._l(a.branchList,function(t){return n("el-option",{key:t.branchName,attrs:{label:t.branchName,value:t.code}})}),1)],1),a._v(" "),n("br"),a._v(" "),n("el-form-item",{staticClass:"form_item_mt10 form_item_wh280",attrs:{label:" "}},[n("el-button",{staticClass:"searchBtn",attrs:{type:"primary"},on:{click:a.onSubmit}},[a._v("查询")]),a._v(" "),n("Export",{ref:"exportCom",staticStyle:{display:"none"},attrs:{tHeader:a.tHeader,filterVal:a.filterVal,tableData1:a.tableData1,name:a.name}}),a._v(" "),n("el-button",{staticClass:"searchBtn",on:{click:a.exportData}},[a._v("导出报表")])],1)],1),a._v(" "),n("el-table",{staticClass:"min_table",staticStyle:{width:"100%","margin-top":"15px","margin-bottom":"10px"},attrs:{data:a.tableData,border:"","max-height":"600px","summary-method":a.getSummaries,"show-summary":""}},[n("el-table-column",{attrs:{prop:"benefitName",label:"APP昵称","min-width":"90"}}),a._v(" "),n("el-table-column",{attrs:{prop:"benefitGradeName",label:"客户等级","min-width":"90"},scopedSlots:a._u([{key:"default",fn:function(t){return[n("span",[a._v(a._s(a._f("filterFun")(t.row.typeCode)))])]}}])}),a._v(" "),n("el-table-column",{attrs:{prop:"mobile",label:"手机号","min-width":"80"}}),a._v(" "),n("el-table-column",{attrs:{prop:"branchName",label:"最近代理商","min-width":"80"}}),a._v(" "),n("el-table-column",{attrs:{prop:"realAmount",label:"累计收益","min-width":"80",align:"right"}}),a._v(" "),n("el-table-column",{attrs:{prop:"extFee",label:"手续费","min-width":"80",align:"right"}}),a._v(" "),n("el-table-column",{attrs:{prop:"usedAmount",label:"已提现","min-width":"80",align:"right"},scopedSlots:a._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(t){return a.viewDet(e.row,1,2)}}},[a._v(" "+a._s(e.row.usedAmount?e.row.usedAmount:""))])]}}])}),a._v(" "),n("el-table-column",{attrs:{prop:"transAmount",label:"待提现","min-width":"80",align:"right"},scopedSlots:a._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(t){return a.viewDet(e.row,1,1)}}},[a._v(" "+a._s(e.row.transAmount?e.row.transAmount:""))])]}}])}),a._v(" "),n("el-table-column",{attrs:{prop:"grade",label:"操作","min-width":"100",align:"center"},scopedSlots:a._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){return a.viewDet(e.row,2)}}},[a._v(" 查看收益明细")])]}}])})],1),a._v(" "),n("div",{staticClass:"block"},[n("el-pagination",{attrs:{"current-page":a.currentPage,"page-sizes":[10,20,30,40],"page-size":a.size,layout:"total, sizes, prev, pager, next, jumper",total:a.total},on:{"size-change":a.handleSizeChange,"current-change":a.handleCurrentChange}})],1),a._v(" "),n("el-dialog",{attrs:{size:"",visible:a.dialogVisible,title:"收益记录",top:"20%"},on:{"update:visible":function(t){a.dialogVisible=t}}},[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:a.detLoading,expression:"detLoading"}],staticClass:"min_table",staticStyle:{width:"900px","margin-top":"15px","margin-bottom":"10px"},attrs:{data:a.detData,border:""}},[n("el-table-column",{attrs:{prop:"customerName",label:"客户","min-width":"90"}}),a._v(" "),n("el-table-column",{attrs:{prop:"subOrderCode",label:"订单编号","min-width":"80",align:"center"}}),a._v(" "),n("el-table-column",{attrs:{prop:"createDate",label:"订单日期","min-width":"100","show-overflow-tooltip":""}}),a._v(" "),n("el-table-column",{attrs:{prop:"goodsName",label:"项目名称","min-width":"150","show-overflow-tooltip":""}}),a._v(" "),n("el-table-column",{attrs:{prop:"price",label:"订单金额","min-width":"80",align:"right"}}),a._v(" "),n("el-table-column",{attrs:{prop:"realAmount",label:"奖励金额","min-width":"80",align:"right"}}),a._v(" "),n("el-table-column",{attrs:{prop:"status",label:"发放状态","min-width":"80",align:"right"}})],1),a._v(" "),n("div",{staticClass:"block",staticStyle:{"margin-bottom":"20px"}},[n("el-pagination",{attrs:{"current-page":a.detPageIndex,"page-sizes":[10,20,30,40],"page-size":a.detPageSize,layout:"total, sizes, prev, pager, next, jumper",total:a.detTotal},on:{"size-change":a.handleSizeChange1,"current-change":a.handleCurrentChange1}})],1)],1),a._v(" "),n("el-dialog",{attrs:{size:"",visible:a.putDialog,title:"申请记录",top:"20%"},on:{"update:visible":function(t){a.putDialog=t}}},[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:a.detLoading,expression:"detLoading"}],staticClass:"min_table",staticStyle:{width:"1000px","margin-top":"15px","margin-bottom":"10px"},attrs:{data:a.detData,border:""}},[n("el-table-column",{attrs:{prop:"createOn",label:"申请日期","min-width":"110"},scopedSlots:a._u([{key:"default",fn:function(t){return[t.row.createOn?n("span",[a._v(a._s(t.row.createOn.substring(0,10)))]):a._e()]}}])}),a._v(" "),n("el-table-column",{attrs:{prop:"realName",label:"申请人","min-width":"100"}}),a._v(" "),n("el-table-column",{attrs:{prop:"mobile",label:"手机号","min-width":"100"}}),a._v(" "),n("el-table-column",{attrs:{prop:"applyAmount",label:"申请提现金额","min-width":"100"}}),a._v(" "),n("el-table-column",{attrs:{prop:"extFee",label:"手续费","min-width":"100"}}),a._v(" "),n("el-table-column",{attrs:{prop:"recevieAmount",label:"到账金额","min-width":"100"}}),a._v(" "),n("el-table-column",{attrs:{prop:"status",label:"状态","min-width":"100",align:"center"},scopedSlots:a._u([{key:"default",fn:function(t){return[1==t.row.applyStatus?n("el-tag",{attrs:{type:"gray"}},[a._v("未审核")]):a._e(),a._v(" "),2==t.row.applyStatus?n("el-tag",{attrs:{type:"success"}},[a._v("已审核")]):a._e(),a._v(" "),3==t.row.applyStatus?n("el-tag",{attrs:{type:"danger"}},[a._v("拒绝")]):a._e()]}}])}),a._v(" "),n("el-table-column",{attrs:{prop:"modifiedOn",label:"审核时间","min-width":"100"},scopedSlots:a._u([{key:"default",fn:function(t){return[n("span",[a._v(a._s(t.row.modifiedOn==t.row.createOn?"":t.row.modifiedOn))])]}}])}),a._v(" "),n("el-table-column",{attrs:{prop:"memo",label:"备注","min-width":"150","show-overflow-tooltip":""}})],1),a._v(" "),n("div",{staticClass:"block",staticStyle:{"margin-bottom":"20px"}},[n("el-pagination",{attrs:{"current-page":a.detPageIndex,"page-sizes":[10,20,30,40],"page-size":a.detPageSize,layout:"total, sizes, prev, pager, next, jumper",total:a.detTotal},on:{"size-change":a.handleSizeChange1,"current-change":a.handleCurrentChange1}})],1)],1)],1)},staticRenderFns:[]}},327:function(t,e,a){a(1655);var n=a(98)(a(1046),a(2126),"data-v-074bac24",null);t.exports=n.exports},436:function(t,e,a){a(439);var n=a(98)(a(437),a(440),"data-v-6c47323e",null);t.exports=n.exports},437:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{tHeader:{},filterVal:{},tableData1:{type:Array},name:""},watch:{tableData1:{handler:function(t){this.otData=t},deep:!0}},data:function(){return{otData:[]}},methods:{handleDownload:function(){var a=this;n.e(220).then(function(){var t=n(448).export_json_to_excel,e=[];e=0!=a.otData.length?a.formatJson(a.filterVal,a.otData):a.formatJson(a.filterVal,a.tableData1),t(a.tHeader,e,a.name)}.bind(null,n)).catch(n.oe)},formatJson:function(t,e){return e.map(function(e){return t.map(function(t){return e[t]})})}}}},438:function(t,e,a){(t.exports=a(215)(!1)).push([t.i,".exportBtn[data-v-6c47323e]{background:#fff;border:1px solid #d6d4d4;font-size:14px;color:#666;border-radius:4px}",""])},439:function(t,e,a){var n=a(438);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a(216)("fdf4f478",n,!0)},440:function(t,e){t.exports={render:function(){var t=this.$createElement;return(this._self._c||t)("el-button",{staticClass:"exportBtn",attrs:{type:"primary"},on:{click:this.handleDownload}},[this._v("导出报表")])},staticRenderFns:[]}}});