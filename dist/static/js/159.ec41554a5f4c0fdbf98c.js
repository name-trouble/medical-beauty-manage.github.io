webpackJsonp([159],{1400:function(t,e,a){(t.exports=a(215)(!1)).push([t.i,".block[data-v-5b1cbbfb]{margin-top:20px}",""])},1825:function(t,e,a){var n=a(1400);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a(216)("14018227",n,!0)},2298:function(t,e){t.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"tag selCommon"},[a("el-form",{staticClass:"demo-form-inline form_search",attrs:{inline:!0,"label-width":"80px"}},[a("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"截止日期："}},[a("el-date-picker",{attrs:{type:"daterange",placeholder:"选择日期"},on:{change:e.dateChange},model:{value:e.date,callback:function(t){e.date=t},expression:"date"}})],1),e._v(" "),a("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"医院："}},[a("el-select",{staticStyle:{width:"200px"},on:{change:e.onSubmit},model:{value:e.formInline.hospitalCode,callback:function(t){e.$set(e.formInline,"hospitalCode",t)},expression:"formInline.hospitalCode"}},e._l(e.hospitalList,function(t,e){return a("el-option",{key:e,attrs:{label:t.supplierName,value:t.code}})}),1)],1),e._v(" "),a("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"关键字："}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:""},model:{value:e.formInline.Keywords,callback:function(t){e.$set(e.formInline,"Keywords",t)},expression:"formInline.Keywords"}})],1),e._v(" "),a("el-form-item",{staticClass:"form_item_mt10",attrs:{label:" "}},[a("el-button",{staticClass:"searchBtn",attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),a("Export",{attrs:{tHeader:e.tHeader,filterVal:e.filterVal,tableData1:e.tableData1,name:e.name}})],1)],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"min_table",staticStyle:{width:"100%","margin-top":"20px"},attrs:{data:e.tableData,border:"","max-height":"560","summary-method":e.getSummaries,"show-summary":""}},[a("el-table-column",{attrs:{prop:"refrenceBranchName",label:"店家","min-width":"80",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"phoneNumber",label:"电话","min-width":"80"}}),e._v(" "),a("el-table-column",{attrs:{prop:"shopName",label:"店铺","min-width":"80"}}),e._v(" "),a("el-table-column",{attrs:{prop:"hospitalName",label:"医院","min-width":"80"}}),e._v(" "),a("el-table-column",{attrs:{prop:"orderAmount",label:"总消费金额","min-width":"80",align:"right"}}),e._v(" "),a("el-table-column",{attrs:{prop:"commissionAmount",label:"总提成金额","min-width":"80",align:"right"}})],1),e._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,20,30,40],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),a("el-dialog",{attrs:{title:"编辑",visible:e.dialogView,top:"10%",size:"","close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogView=t}}},[e.dialogView?a("updateDialog",{staticStyle:{width:"450px"},attrs:{editMes:e.editMes},on:{close:e.editClose}}):e._e()],1)],1)},staticRenderFns:[]}},257:function(t,e,a){a(1825);var n=a(98)(a(953),a(2298),"data-v-5b1cbbfb",null);t.exports=n.exports},436:function(t,e,a){a(439);var n=a(98)(a(437),a(440),"data-v-6c47323e",null);t.exports=n.exports},437:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{tHeader:{},filterVal:{},tableData1:{type:Array},name:""},watch:{tableData1:{handler:function(t){this.otData=t},deep:!0}},data:function(){return{otData:[]}},methods:{handleDownload:function(){var a=this;n.e(220).then(function(){var t=n(448).export_json_to_excel,e=[];e=0!=a.otData.length?a.formatJson(a.filterVal,a.otData):a.formatJson(a.filterVal,a.tableData1),t(a.tHeader,e,a.name)}.bind(null,n)).catch(n.oe)},formatJson:function(t,e){return e.map(function(e){return t.map(function(t){return e[t]})})}}}},438:function(t,e,a){(t.exports=a(215)(!1)).push([t.i,".exportBtn[data-v-6c47323e]{background:#fff;border:1px solid #d6d4d4;font-size:14px;color:#666;border-radius:4px}",""])},439:function(t,e,a){var n=a(438);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a(216)("fdf4f478",n,!0)},440:function(t,e){t.exports={render:function(){var t=this.$createElement;return(this._self._c||t)("el-button",{staticClass:"exportBtn",attrs:{type:"primary"},on:{click:this.handleDownload}},[this._v("导出报表")])},staticRenderFns:[]}},953:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=o(100),i=o.n(a),n=o(99),r=o.n(n),s=o(65),l=(o.n(s),o(436)),c=o.n(l),u=(o(22),o(64));e.default={data:function(){return{dialogView:!1,allLoading:!1,loading:!1,date:"",currentPage:1,total:0,pageSize:10,branch:"",formInline:{BranchCode:"",startDate:"",endDate:"",hospitalCode:"",Keywords:""},tableData:[],allData:[],customerList:[],editMes:{},hospitalList:[],sum:{orderAmount:0,commissionAmount:0}}},computed:{tHeader:function(){return["店家","电话","店铺","医院","总消费金额","总提成金额"]},filterVal:function(){return["refrenceBranchName","phoneNumber","shopName","hospitalName","orderAmount","commissionAmount"]},tableData1:function(){return this.allData},name:function(){return"设计师"}},mounted:function(){var t=new Date;t.setDate("1"),this.date=[t,new Date],this.GetDropDownPermission()},methods:{getSummaries:function(){return["总计：","","","",this.sum.orderAmount,this.sum.commissionAmount]},GetDropDownPermission:function(){var a=this;return r()(i.a.mark(function t(){var e;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.i(u.d)({typeId:1});case 2:e=t.sent,a.hospitalList=e.data,a.hospitalCode=e.data[0].code;case 5:case"end":return t.stop()}},t,a)}))()},dateChange:function(t){t?(t=t.formatDates(),this.formInline.startDate=t.substring(0,10),this.formInline.endDate=t.substring(13)):(this.formInline.startDate="",this.formInline.endDate="")},handleSizeChange:function(t){this.pageSize=t,this.getPage()},handleCurrentChange:function(t){this.currentPage=t,this.getPage()},getSumdate:function(){var e=this;this.allData.forEach(function(t){e.sum.orderAmount+=t.orderAmount,e.sum.commissionAmount+=t.commissionAmount})},getPage:function(){this.tableData=this.allData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)},GetBranchShopAmount:function(a){var n=this;return r()(i.a.mark(function t(){var e;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.i(u._288)(a);case 2:(e=t.sent).status&&(n.total=e.data.length,n.allData=e.data,n.getPage(),n.getSumdate());case 4:case"end":return t.stop()}},t,n)}))()},onSubmit:function(){this.currentPage=1,this.search()},search:function(){this.GetBranchShopAmount({HospitalCode:this.formInline.hospitalCode,StartDate:this.formInline.startDate,EndDate:this.formInline.endDate,Keywords:this.formInline.Keywords})}},components:{Export:c.a}}}});