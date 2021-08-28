webpackJsonp([150],{1163:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i(100),r=i.n(a),n=i(37),o=i.n(n),l=i(99),s=i.n(l),u=i(22),c=i(64),p=i(436),m=i.n(p);e.default={data:function(){return{typeList:["报增入库","调拨入库","盘盈入库","其他入库","退货入库","退药入库","外购入库","在用物资科室间调拨","自制入库"],date:"",loading:!1,total:0,size:10,currentPage:1,formInline:{startDate:"",endDate:"",keywords:"",typeCode:"",hospitalCode:"",wareHouse:"",bookQuantity:"",stockSupplierCode:"",inType:""},tableData:[],hospitalList:[],supplierList:[],allSupplierList:[],whList:[],allWhList:[],allData:[],sum:{salePriceA:0,diffA:0,quantity:0,totalAmount:0}}},computed:{tHeader:function(){return["入库编号","药品编号","药品名称","规格","入库类别","供应商","剂型","单位","批号","有效期","生产厂家","进货数量","进货单价","进货金额","销售单价","销售金额","进销差额","入库时间","入库方式","入库仓库"]},filterVal:function(){return["drugInCode","drugId","drugName","unitName","drugInType","stockSupplierName","jiType","dwName","batchNumber","effectiveDate","manufacturer","quantity","realPrice","totalAmount","salePrice","salePriceA","diffA","createOn","drugInType","warehouseInName"]},tableData1:function(){return this.allData},name:function(){return"入库明细"}},mounted:function(){this.GetDropDownPermission()},methods:{hosSelect:function(e){var a=this;this.formInline.wareHouse="",this.whList=[],this.allWhList.forEach(function(t){t.hospitalCode==e&&(a.whList.push(t),a.formInline.wareHouse=t.id)}),this.formInline.stockSupplierCode="",this.supplierList=[],this.allSupplierList.forEach(function(t){t.hospitalCode==e&&(a.supplierList.push(t),a.formInline.stockSupplierCode=t.stockSupplierCode)})},getSummaries:function(){return["总合计","","","","","","","","","","",Math.round(this.sum.quantity),"",Math.round(this.sum.totalAmount),"",Math.round(this.sum.salePriceA),Math.round(this.sum.diffA)]},dateChange:function(t){t?(t=t.formatDates(),this.formInline.startDate=t.substring(0,10),this.formInline.endDate=t.substring(13)):(this.formInline.startDate="",this.formInline.endDate="")},GetDropDownPermission:function(){var l=this;return s()(r.a.mark(function t(){var e,a,n;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.i(c.d)({typeId:1});case 2:return e=t.sent,l.hospitalList=e.data,t.next=6,i.i(c.e)({hospitalCode:"",pageIndex:1,pageSize:100,keywords:"",typeId:1});case 6:return a=t.sent,l.allWhList=JSON.parse(o()(a.data)),t.next=10,i.i(c.N)({hospitalCode:i.i(u.b)("hospitalCode"),pageIndex:1,pageSize:1e3,keywords:""});case 10:n=t.sent,l.supplierList=n.data,l.allSupplierList=n.data,l.formInline.hospitalCode=e.data[0].code;case 14:case"end":return t.stop()}},t,l)}))()},GetStockManageInStock:function(a){var n=this;return s()(r.a.mark(function t(){var e;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,n.loading=!0,t.next=4,i.i(c.P)(a);case 4:(e=t.sent).status?(n.allData=n.GetTotal(e.data),n.getPage(e.data),n.total=e.count):n.$message.error("查询失败"+e.errorMessage),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),console.log(t.t0);case 11:case"end":return t.stop()}},t,n,[[0,8]])}))()},onSubmit:function(){this.sum={salePriceA:0,diffA:0,quantity:0,totalAmount:0},this.currentPage=1,this.search()},search:function(){this.GetStockManageInStock({startDate:this.formInline.startDate,endDate:this.formInline.endDate,bookQuantity:this.formInline.bookQuantity,keywords:this.formInline.keywords.removeSP(),warehouseId:this.formInline.wareHouse,hospitalCode:this.formInline.hospitalCode,stockSupplierCode:this.formInline.stockSupplierCode,drugOutType:this.formInline.inType})},handleSizeChange:function(t){this.size=t,this.getPage()},handleCurrentChange:function(t){this.currentPage=t,this.getPage()},GetTotal:function(t){var e=this;return t.forEach(function(t){t.salePriceA=t.salePrice.mul(t.quantity),t.totalAmount=t.realPrice.mul(t.quantity),e.sum.salePriceA=e.sum.salePriceA.add(t.salePriceA),t.diffA=t.totalAmount.red(t.salePriceA),e.sum.diffA=e.sum.diffA.add(t.diffA),e.sum.quantity=e.sum.quantity.add(t.quantity),e.sum.totalAmount=e.sum.totalAmount.add(t.totalAmount)}),t},getPage:function(){var t=this;this.loading=!0,this.tableData=this.allData.slice((this.currentPage-1)*this.size,this.currentPage*this.size),setTimeout(function(){t.loading=!1},50)}},components:{Export:m.a}}},1268:function(t,e,a){(t.exports=a(215)(!1)).push([t.i,".block[data-v-1bc44371]{float:right}",""])},1693:function(t,e,a){var n=a(1268);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a(216)("0e2f4626",n,!0)},2165:function(t,e){t.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"tag selCommon"},[a("el-form",{staticClass:"demo-form-inline form_search",attrs:{inline:!0,model:e.formInline,"label-width":"80px"}},[a("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"医院："}},[a("el-select",{staticStyle:{width:"200px"},on:{change:e.hosSelect},model:{value:e.formInline.hospitalCode,callback:function(t){e.$set(e.formInline,"hospitalCode",t)},expression:"formInline.hospitalCode"}},e._l(e.hospitalList,function(t,e){return a("el-option",{key:e,attrs:{label:t.supplierName,value:t.code}})}),1)],1),e._v(" "),a("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"仓库："}},[a("el-select",{staticStyle:{width:"200px"},model:{value:e.formInline.wareHouse,callback:function(t){e.$set(e.formInline,"wareHouse",t)},expression:"formInline.wareHouse"}},[a("el-option",{attrs:{label:"全部",value:""}}),e._v(" "),e._l(e.whList,function(t,e){return a("el-option",{key:e,attrs:{label:t.warehouseName,value:t.id}})})],2)],1),e._v(" "),a("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"供应商："}},[a("el-select",{staticStyle:{width:"200px"},model:{value:e.formInline.stockSupplierCode,callback:function(t){e.$set(e.formInline,"stockSupplierCode",t)},expression:"formInline.stockSupplierCode"}},[a("el-option",{attrs:{label:"全部",value:""}}),e._v(" "),e._l(e.supplierList,function(t,e){return a("el-option",{key:e,attrs:{label:t.stockSupplierName,value:t.stockSupplierCode}})})],2)],1),e._v(" "),a("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"日期："}},[a("el-date-picker",{staticStyle:{width:"200px"},attrs:{type:"daterange",placeholder:"选择日期"},on:{change:e.dateChange},model:{value:e.date,callback:function(t){e.date=t},expression:"date"}})],1),e._v(" "),a("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"关键字："}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.onSubmit(t)}},model:{value:e.formInline.keywords,callback:function(t){e.$set(e.formInline,"keywords",t)},expression:"formInline.keywords"}})],1),e._v(" "),a("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"入库类别："}},[a("el-select",{staticStyle:{width:"200px"},model:{value:e.formInline.inType,callback:function(t){e.$set(e.formInline,"inType",t)},expression:"formInline.inType"}},[a("el-option",{attrs:{label:"全部",value:""}}),e._v(" "),e._l(e.typeList,function(t,e){return a("el-option",{key:e,attrs:{label:t,value:t}})})],2)],1),e._v(" "),a("el-form-item",{staticClass:"form_item_mt10",attrs:{label:" "}},[a("el-button",{staticClass:"searchBtn",attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),a("Export",{ref:"exportTable",attrs:{tHeader:e.tHeader,filterVal:e.filterVal,tableData1:e.tableData1,name:e.name}})],1)],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"smt min_table",staticStyle:{width:"100%","margin-top":"15px","margin-bottom":"10px"},attrs:{data:e.tableData,border:"","max-height":"560","show-summary":"","summary-method":e.getSummaries}},[a("el-table-column",{attrs:{prop:"drugInCode",label:"入库编号","min-width":"80"}}),e._v(" "),a("el-table-column",{attrs:{prop:"drugId",label:"药品编号","min-width":"80"}}),e._v(" "),a("el-table-column",{attrs:{prop:"drugName",label:"药品名称","min-width":"80"}}),e._v(" "),a("el-table-column",{attrs:{prop:"unitName",label:"规格","min-width":"80"}}),e._v(" "),a("el-table-column",{attrs:{prop:"drugInType",label:"入库类别","min-width":"80"}}),e._v(" "),a("el-table-column",{attrs:{prop:"stockSupplierName",label:"供应商","min-width":"80","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"jiType",label:"剂型","min-width":"80"}}),e._v(" "),a("el-table-column",{attrs:{prop:"dwName",label:"单位","min-width":"80"}}),e._v(" "),a("el-table-column",{attrs:{prop:"batchNumber",label:"批号","min-width":"80"}}),e._v(" "),a("el-table-column",{attrs:{prop:"effectiveDate",label:"有效期","min-width":"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.effectiveDate?a("span",[e._v(e._s(t.row.effectiveDate.substring(0,10)))]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"manufacturer",label:"生产厂家","min-width":"80","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"quantity",label:"进货数量","min-width":"80"}}),e._v(" "),a("el-table-column",{attrs:{prop:"realPrice",label:"进货单价","min-width":"80"}}),e._v(" "),a("el-table-column",{attrs:{prop:"totalAmount",label:"进货金额","min-width":"80"}}),e._v(" "),a("el-table-column",{attrs:{prop:"salePrice",label:"销售单价","min-width":"80"}}),e._v(" "),a("el-table-column",{attrs:{prop:"salePriceA",label:"销售金额","min-width":"80"}}),e._v(" "),a("el-table-column",{attrs:{prop:"diffA",label:"进销差额","min-width":"80"}}),e._v(" "),a("el-table-column",{attrs:{prop:"drugInDate",label:"入库时间","min-width":"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.drugInDate?a("span",[e._v(e._s(t.row.drugInDate.substring(0,10)))]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"drugInType",label:"入库方式","min-width":"80"}}),e._v(" "),a("el-table-column",{attrs:{prop:"warehouseInName",label:"入库仓库","min-width":"80"}})],1),e._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,20,30,40],"page-size":e.size,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},staticRenderFns:[]}},408:function(t,e,a){a(1693);var n=a(98)(a(1163),a(2165),"data-v-1bc44371",null);t.exports=n.exports},436:function(t,e,a){a(439);var n=a(98)(a(437),a(440),"data-v-6c47323e",null);t.exports=n.exports},437:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{tHeader:{},filterVal:{},tableData1:{type:Array},name:""},watch:{tableData1:{handler:function(t){this.otData=t},deep:!0}},data:function(){return{otData:[]}},methods:{handleDownload:function(){var a=this;n.e(220).then(function(){var t=n(448).export_json_to_excel,e=[];e=0!=a.otData.length?a.formatJson(a.filterVal,a.otData):a.formatJson(a.filterVal,a.tableData1),t(a.tHeader,e,a.name)}.bind(null,n)).catch(n.oe)},formatJson:function(t,e){return e.map(function(e){return t.map(function(t){return e[t]})})}}}},438:function(t,e,a){(t.exports=a(215)(!1)).push([t.i,".exportBtn[data-v-6c47323e]{background:#fff;border:1px solid #d6d4d4;font-size:14px;color:#666;border-radius:4px}",""])},439:function(t,e,a){var n=a(438);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a(216)("fdf4f478",n,!0)},440:function(t,e){t.exports={render:function(){var t=this.$createElement;return(this._self._c||t)("el-button",{staticClass:"exportBtn",attrs:{type:"primary"},on:{click:this.handleDownload}},[this._v("导出报表")])},staticRenderFns:[]}}});