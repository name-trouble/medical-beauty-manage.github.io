webpackJsonp([146],{1168:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=o(100),r=o.n(a),n=o(99),s=o.n(n),i=(o(22),o(64)),l=o(436),u=o.n(l);e.default={data:function(){return{date:"",loading:!1,total:0,size:10,currentPage:1,formInline:{startDate:"",endDate:"",keywords:"",typeCode:"",hospitalCode:"",wareHouse:""},tableData:[],hospitalList:[],supplierList:[],whList:[],sum:{orderCount:0,drugOutAmount:0,wholesaleAmount:0,saleAmount:0},allData:[]}},computed:{tHeader:function(){return["药品领用类别","领用科室","张数","进价金额","批价金额","零售金额"]},filterVal:function(){return["drugCateName","deptName","orderCount","drugOutAmount","wholesaleAmount","saleAmount"]},tableData1:function(){return this.allData},name:function(){return"科室领用汇总"}},mounted:function(){this.date=[new Date,new Date],this.GetDropDownPermission()},methods:{getSummaries:function(){return["总合计",this.sum.orderCount,this.sum.drugOutAmount,Math.round(this.sum.wholesaleAmount),Math.round(this.sum.saleAmount)]},dateChange:function(t){t?(t=t.formatDates(),this.formInline.startDate=t.substring(0,10),this.formInline.endDate=t.substring(13)):(this.formInline.startDate="",this.formInline.endDate="")},GetDropDownPermission:function(){var n=this;return s()(r.a.mark(function t(){var e,a;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.i(i.d)({typeId:1});case 2:return e=t.sent,n.hospitalList=e.data,t.next=6,o.i(i.e)({hospitalCode:"",pageIndex:1,pageSize:100,keywords:""});case 6:a=t.sent,n.whList=a.data;case 8:case"end":return t.stop()}},t,n)}))()},GetStockDeptOutRep:function(a){var n=this;return s()(r.a.mark(function t(){var e;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,n.loading=!0,t.next=4,o.i(i.V)(a);case 4:(e=t.sent).status?(n.allData=e.data,n.GetTotal(e.data),n.getPage(e.data),n.total=e.count):n.$message.error("查询失败"+e.errorMessage),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),console.log(t.t0);case 11:case"end":return t.stop()}},t,n,[[0,8]])}))()},onSubmit:function(){this.sum={orderCount:0,drugOutAmount:0,wholesaleAmount:0,saleAmount:0},this.currentPage=1,this.search()},search:function(){this.GetStockDeptOutRep({keywords:this.formInline.keywords.removeSP(),startDate:this.formInline.startDate,endDate:this.formInline.endDate,hospitalCode:this.formInline.hospitalCode})},handleSizeChange:function(t){this.size=t,this.getPage()},handleCurrentChange:function(t){this.currentPage=t,this.getPage()},GetTotal:function(t){var e=this;t.forEach(function(t){e.sum.orderCount=e.sum.orderCount.add(t.orderCount),e.sum.drugOutAmount=e.sum.drugOutAmount.add(t.drugOutAmount),e.sum.wholesaleAmount=e.sum.wholesaleAmount.add(t.wholesaleAmount),e.sum.saleAmount=e.sum.saleAmount.add(t.saleAmount)})},getPage:function(){var t=this;this.loading=!0,this.tableData=this.allData.slice((this.currentPage-1)*this.size,this.currentPage*this.size),setTimeout(function(){t.loading=!1},500)}},components:{Export:u.a}}},1402:function(t,e,a){(t.exports=a(215)(!1)).push([t.i,".block[data-v-5b96364d]{float:right}",""])},1827:function(t,e,a){var n=a(1402);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a(216)("1d6f27bc",n,!0)},2300:function(t,e){t.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"tag selCommon"},[a("el-form",{staticClass:"demo-form-inline form_search",attrs:{inline:!0,model:e.formInline,"label-width":"80px"}},[a("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"医院："}},[a("el-select",{staticStyle:{width:"200px"},model:{value:e.formInline.hospitalCode,callback:function(t){e.$set(e.formInline,"hospitalCode",t)},expression:"formInline.hospitalCode"}},e._l(e.hospitalList,function(t,e){return a("el-option",{key:e,attrs:{label:t.supplierName,value:t.code}})}),1)],1),e._v(" "),a("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"日期范围："}},[a("el-date-picker",{attrs:{type:"daterange",placeholder:"选择日期"},on:{change:e.dateChange},model:{value:e.date,callback:function(t){e.date=t},expression:"date"}})],1),e._v(" "),a("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"关键字："}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.onSubmit(t)}},model:{value:e.formInline.keywords,callback:function(t){e.$set(e.formInline,"keywords",t)},expression:"formInline.keywords"}})],1),e._v(" "),a("el-form-item",{staticClass:"form_item_mt10",attrs:{label:" "}},[a("el-button",{staticClass:"searchBtn",attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),a("Export",{ref:"exportTable",attrs:{tHeader:e.tHeader,filterVal:e.filterVal,tableData1:e.tableData1,name:e.name}})],1)],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"smt min_table",staticStyle:{width:"100%","margin-top":"15px","margin-bottom":"10px"},attrs:{data:e.tableData,border:"","show-summary":"","max-height":"560","summary-method":e.getSummaries}},[a("el-table-column",{attrs:{prop:"deptName",label:"领用科室","min-width":"90"}}),e._v(" "),a("el-table-column",{attrs:{prop:"orderCount",label:"张数","min-width":"90"}}),e._v(" "),a("el-table-column",{attrs:{prop:"drugOutAmount",label:"进价金额","min-width":"90"}}),e._v(" "),a("el-table-column",{attrs:{prop:"wholesaleAmount",label:"批价金额","min-width":"90"}}),e._v(" "),a("el-table-column",{attrs:{prop:"saleAmount",label:"零售金额","min-width":"90"}})],1),e._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,20,30,40],"page-size":e.size,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},staticRenderFns:[]}},413:function(t,e,a){a(1827);var n=a(98)(a(1168),a(2300),"data-v-5b96364d",null);t.exports=n.exports},436:function(t,e,a){a(439);var n=a(98)(a(437),a(440),"data-v-6c47323e",null);t.exports=n.exports},437:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{tHeader:{},filterVal:{},tableData1:{type:Array},name:""},watch:{tableData1:{handler:function(t){this.otData=t},deep:!0}},data:function(){return{otData:[]}},methods:{handleDownload:function(){var a=this;n.e(220).then(function(){var t=n(448).export_json_to_excel,e=[];e=0!=a.otData.length?a.formatJson(a.filterVal,a.otData):a.formatJson(a.filterVal,a.tableData1),t(a.tHeader,e,a.name)}.bind(null,n)).catch(n.oe)},formatJson:function(t,e){return e.map(function(e){return t.map(function(t){return e[t]})})}}}},438:function(t,e,a){(t.exports=a(215)(!1)).push([t.i,".exportBtn[data-v-6c47323e]{background:#fff;border:1px solid #d6d4d4;font-size:14px;color:#666;border-radius:4px}",""])},439:function(t,e,a){var n=a(438);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a(216)("fdf4f478",n,!0)},440:function(t,e){t.exports={render:function(){var t=this.$createElement;return(this._self._c||t)("el-button",{staticClass:"exportBtn",attrs:{type:"primary"},on:{click:this.handleDownload}},[this._v("导出报表")])},staticRenderFns:[]}}});