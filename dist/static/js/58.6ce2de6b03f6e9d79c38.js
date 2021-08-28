webpackJsonp([58,142],{1178:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(436),o=a.n(n),i=a(65);a.n(i);e.default={data:function(){return{date:"",loading:!1,total:0,size:10,currentPage:1,tableData:[],allData:[]}},watch:{dialogData:{handler:function(){this.allData=this.dialogData,this.total=this.dialogData.length,this.pageChange(),this.loading=!1},deep:!0}},computed:{tHeader:function(){return["药品名称","批号","规格","进价","有效期","产地","剂型","盘点日期","盘点仓库","账面金额","账面数量","盘点金额","盘点数量","差异金额","差异数量","盘点人"]},filterVal:function(){return["drugName","batchNumber","unitName","price","effectiveDate","originAddress","jiType","createOn","warehouseName","bookAmount","bookQuantity","inventoryAmount","inventoryQuantity","profitLossAmount","profitLossQuantity","createBy"]},tableData1:function(){return this.allData},name:function(){return"盘点详情"}},props:{dialogData:Array,propMonth:"",propYear:"",propHospitalCode:""},mounted:function(){this.loading=!0,this.allData=this.dialogData,this.total=this.dialogData.length,this.pageChange()},methods:{handleSizeChange:function(t){this.size=t,this.pageChange()},handleCurrentChange:function(t){this.currentPage=t,this.pageChange()},pageChange:function(){this.tableData=this.allData.slice((this.currentPage-1)*this.size,this.currentPage*this.size)},print:function(){var t=document.location.protocol+"//"+document.location.hostname+(80==document.location.port||""==document.location.port?"":":"+document.location.port)+"/";window.open(t+"print/printInv.html?date="+this.propYear+"-"+this.propMonth+"&hospitalCode="+this.propHospitalCode+"&type=2")}},components:{Export:o.a}}},1183:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a,n=i(443),o=i.n(n),r=i(37),l=i.n(r),s=i(100),u=i.n(s),c=i(99),p=i.n(c),d=i(218),m=i.n(d),h=i(2103),f=i.n(h),v=(i(101),i(65)),b=(i.n(v),i(22),i(64)),g=i(436),y=i.n(g);e.default={data:function(){return{date:"",loading:!1,isInvent:!1,total:0,size:10,currentPage:1,formInline:{year:"",month:"",date:""},invDialog:!1,yearList:[],monthList:[],tableData:[],allData:[],hospitalList:[],dialogData:[],viewHospitalCode:""}},computed:{tHeader:function(){return["药品名称","批号","规格","产地","剂型","盘点日期","盘点仓库","医院","账面金额","账面数量","盘点金额","盘点数量","差异金额","差异数量","盘点人"]},filterVal:function(){return["drugName","batchNumber","unitName","originAddress","jiType","createOn","warehouseName","hospitalName","bookAmount","bookQuantity","inventoryAmount","inventoryQuantity","profitLossAmount","profitLossQuantity","createBy"]},tableData1:function(){return this.allData},name:function(){return"盘点"}},mounted:function(){this.GetDropDownPermission(),this.date=new Date},methods:(a={monthChange:function(t){t?this.formInline.date=t:this.date=new Date},viewDet:function(t){this.dialogData=[],this.invDialog=!0,this.viewHospitalCode=t.hospitalCode,this.GetInventoryDetailList({date:t.inventoryDate,hospitalCode:t.hospitalCode,type:2},2)},GetDropDownPermission:function(){var a=this;return p()(u.a.mark(function t(){var e;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.i(b.d)({typeId:1});case 2:e=t.sent,a.hospitalList=e.data,a.formInline.hospitalCode=e.data[0].code;case 5:case"end":return t.stop()}},t,a)}))()},invent:function(){this.isInvent=!0},selSure:function(t){this.isInvent=!0,t&&this.search()},GetInventoryDetailList:function(a,n){var o=this;return p()(u.a.mark(function t(){var e;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,i.i(b._18)(a);case 3:e=t.sent,n?o.dialogData=e.data:(o.allData=JSON.parse(l()(e.data)),o.pageChange(),o.total=e.count),o.loading=!1,t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),console.log(t.t0);case 11:case"end":return t.stop()}},t,o,[[0,8]])}))()},onSubmit:function(){this.currentPage=1,this.search()},search:function(){this.loading=!0,this.GetInventoryDetailList({date:this.formInline.date,hospitalCode:this.formInline.hospitalCode,type:1})},handleSizeChange:function(t){this.size=t,this.pageChange()},handleCurrentChange:function(t){this.currentPage=t,this.pageChange()},addTag:function(t,e,a){this.tag=!0,this.title=t,a&&(this.editMes=JSON.parse(l()(a[e])))},deleteRow:function(t,e){var a=this;this.$confirm("此操作将删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){a.DeleteInventoryById({id:e[t].id})}).catch(function(){})},approve:function(){},account:function(){},pay:function(){},addDrug:function(t){this.isDrug=!0,this.searchMes=t}},o()(a,"selSure",function(t,e){t&&this.$refs.addS.addTable(e),this.isDrug=!1}),o()(a,"addClose",function(t){this.tag=!1,t&&this.search()}),o()(a,"print",function(){var t=document.location.protocol+"//"+document.location.hostname+(80==document.location.port||""==document.location.port?"":":"+document.location.port)+"/";window.open(t+"print/printInv.html?date="+this.formInline.date)}),o()(a,"pageChange",function(){this.tableData=this.allData.slice((this.currentPage-1)*this.size,this.currentPage*this.size)}),a),components:{Export:y.a,dialogDet:f.a,dialogInv:m.a}}},1264:function(t,e,a){(t.exports=a(215)(!1)).push([t.i,".block[data-v-1a166f70]{margin-bottom:10px}",""])},1321:function(t,e,a){(t.exports=a(215)(!1)).push([t.i,"",""])},1689:function(t,e,a){var n=a(1264);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a(216)("0c26e7e0",n,!0)},1746:function(t,e,a){var n=a(1321);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a(216)("219ac826",n,!0)},2103:function(t,e,a){a(1689);var n=a(98)(a(1178),a(2161),"data-v-1a166f70",null);t.exports=n.exports},2161:function(t,e){t.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"tag selCommon"},[a("Export",{ref:"exportTable",attrs:{tHeader:e.tHeader,filterVal:e.filterVal,tableData1:e.tableData1,name:e.name}}),e._v(" "),a("el-button",{staticClass:"searchBtn",attrs:{type:"primary",disabled:0==e.tableData.length},on:{click:e.print}},[e._v("盘点打印")]),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"smt min_table",staticStyle:{width:"100%","margin-top":"15px","margin-bottom":"10px"},attrs:{data:e.tableData,border:"",height:"400"}},[a("el-table-column",{attrs:{prop:"drugName",label:"药品名称","min-width":"80"}}),e._v(" "),a("el-table-column",{attrs:{prop:"batchNumber",label:"批号","min-width":"80"}}),e._v(" "),a("el-table-column",{attrs:{prop:"unitName",label:"规格","min-width":"80"}}),e._v(" "),a("el-table-column",{attrs:{prop:"effectiveDate",label:"有效期","min-width":"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.effectiveDate?a("span",[e._v(e._s(t.row.effectiveDate.substring(0,10)))]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"originAddress",label:"产地","min-width":"80","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"jiType",label:"剂型","min-width":"70"}}),e._v(" "),a("el-table-column",{attrs:{prop:"createOn",label:"盘点日期","min-width":"90"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.createOn?a("span",[e._v(e._s(t.row.createOn.substring(0,10)))]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"warehouseName",label:"盘点仓库","min-width":"90"}}),e._v(" "),a("el-table-column",{attrs:{prop:"bookAmount",label:"账面金额","min-width":"80"}}),e._v(" "),a("el-table-column",{attrs:{prop:"bookQuantity",label:"账面数量","min-width":"80"}}),e._v(" "),a("el-table-column",{attrs:{prop:"inventoryAmount",label:"盘点金额","min-width":"80"}}),e._v(" "),a("el-table-column",{attrs:{prop:"inventoryQuantity",label:"盘点数量","min-width":"80"}}),e._v(" "),a("el-table-column",{attrs:{prop:"profitLossAmount",label:"差异金额","min-width":"80"}}),e._v(" "),a("el-table-column",{attrs:{prop:"profitLossQuantity",label:"差异数量","min-width":"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                "+e._s(t.row.profitLossQuantity)+"\n            ")]}}])})],1),e._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,20,30,40],"page-size":e.size,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},staticRenderFns:[]}},218:function(t,e,a){a(758);var n=a(98)(a(699),a(800),"data-v-9293216e",null);t.exports=n.exports},2218:function(t,e){t.exports={render:function(){var a=this,t=a.$createElement,n=a._self._c||t;return n("div",{staticClass:"tag selCommon"},[n("el-form",{staticClass:"demo-form-inline form_search",attrs:{inline:!0,model:a.formInline,"label-width":"80px"}},[n("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"盘点月份："}},[n("el-date-picker",{staticStyle:{width:"200px"},attrs:{type:"month",placeholder:"选择月"},on:{change:a.monthChange},model:{value:a.date,callback:function(t){a.date=t},expression:"date"}})],1),a._v(" "),n("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"医院："}},[n("el-select",{staticStyle:{width:"200px"},model:{value:a.formInline.hospitalCode,callback:function(t){a.$set(a.formInline,"hospitalCode",t)},expression:"formInline.hospitalCode"}},a._l(a.hospitalList,function(t,e){return n("el-option",{key:e,attrs:{label:t.supplierName,value:t.code}})}),1)],1),a._v(" "),n("el-form-item",{staticClass:"form_item_mt10",attrs:{label:" "}},[n("el-button",{staticClass:"searchBtn",attrs:{type:"primary"},on:{click:a.onSubmit}},[a._v("查询")]),a._v(" "),n("el-button",{staticClass:"searchBtn",attrs:{type:"primary"},on:{click:a.invent}},[a._v("盘点")])],1)],1),a._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:a.loading,expression:"loading"}],staticClass:"smt min_table",staticStyle:{width:"100%","margin-top":"15px","margin-bottom":"10px"},attrs:{data:a.tableData,border:"","max-height":"560"}},[n("el-table-column",{attrs:{prop:"inventoryDate",label:"盘点日期","min-width":"90"},scopedSlots:a._u([{key:"default",fn:function(t){return[t.row.inventoryDate?n("span",[a._v(a._s(t.row.inventoryDate.substring(0,10)))]):a._e()]}}])}),a._v(" "),n("el-table-column",{attrs:{prop:"warehouseName",label:"盘点仓库","min-width":"90"}}),a._v(" "),n("el-table-column",{attrs:{prop:"hospitalName",label:"医院","min-width":"90"}}),a._v(" "),n("el-table-column",{attrs:{prop:"bookAmount",label:"盘点前总金额","min-width":"80"}}),a._v(" "),n("el-table-column",{attrs:{prop:"profitLossAmount",label:"差异金额","min-width":"80"},scopedSlots:a._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"text"},on:{click:function(t){return a.viewDet(e.row)}}},[a._v(a._s(e.row.profitLossAmount))])]}}])})],1),a._v(" "),n("div",{staticClass:"block"},[n("el-pagination",{attrs:{"current-page":a.currentPage,"page-sizes":[10,20,30,40],"page-size":a.size,layout:"total, sizes, prev, pager, next, jumper",total:a.total},on:{"size-change":a.handleSizeChange,"current-change":a.handleCurrentChange}})],1),a._v(" "),n("el-dialog",{attrs:{title:"盘点",visible:a.isInvent,size:"",top:"10%"},on:{"update:visible":function(t){a.isInvent=t}}},[a.isInvent?n("dialogInv",{staticStyle:{width:"1200px"},on:{selSure:a.selSure}}):a._e()],1),a._v(" "),n("el-dialog",{attrs:{title:"详情",visible:a.invDialog,size:""},on:{"update:visible":function(t){a.invDialog=t}}},[a.invDialog?n("dialogDet",{staticStyle:{width:"1200px"},attrs:{propHospitalCode:a.viewHospitalCode,propYear:a.formInline.year,propMonth:a.formInline.month,dialogData:a.dialogData}}):a._e()],1)],1)},staticRenderFns:[]}},419:function(t,e,a){a(1746);var n=a(98)(a(1183),a(2218),"data-v-327c728c",null);t.exports=n.exports},436:function(t,e,a){a(439);var n=a(98)(a(437),a(440),"data-v-6c47323e",null);t.exports=n.exports},437:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{tHeader:{},filterVal:{},tableData1:{type:Array},name:""},watch:{tableData1:{handler:function(t){this.otData=t},deep:!0}},data:function(){return{otData:[]}},methods:{handleDownload:function(){var a=this;n.e(220).then(function(){var t=n(448).export_json_to_excel,e=[];e=0!=a.otData.length?a.formatJson(a.filterVal,a.otData):a.formatJson(a.filterVal,a.tableData1),t(a.tHeader,e,a.name)}.bind(null,n)).catch(n.oe)},formatJson:function(t,e){return e.map(function(e){return t.map(function(t){return e[t]})})}}}},438:function(t,e,a){(t.exports=a(215)(!1)).push([t.i,".exportBtn[data-v-6c47323e]{background:#fff;border:1px solid #d6d4d4;font-size:14px;color:#666;border-radius:4px}",""])},439:function(t,e,a){var n=a(438);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a(216)("fdf4f478",n,!0)},440:function(t,e){t.exports={render:function(){var t=this.$createElement;return(this._self._c||t)("el-button",{staticClass:"exportBtn",attrs:{type:"primary"},on:{click:this.handleDownload}},[this._v("导出报表")])},staticRenderFns:[]}},443:function(t,e,a){"use strict";e.__esModule=!0;var n,o=a(444),i=(n=o)&&n.__esModule?n:{default:n};e.default=function(t,e,a){return e in t?(0,i.default)(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}},444:function(t,e,a){t.exports={default:a(445),__esModule:!0}},445:function(t,e,a){a(446);var n=a(2).Object;t.exports=function(t,e,a){return n.defineProperty(t,e,a)}},446:function(t,e,a){var n=a(9);n(n.S+n.F*!a(10),"Object",{defineProperty:a(11).f})},699:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=o(100),i=o.n(a),n=o(37),r=o.n(n),l=o(99),s=o.n(l),u=(o(101),o(65)),c=(o.n(u),o(22)),p=o(64),d=o(436),m=o.n(d);e.default={data:function(){return{IsSpecial:o.i(c.b)("isSpecial"),date:"",editMes:[],loading:!1,title:"",total:0,size:50,currentPage:1,checked:!1,remainNum:!1,formInline:{startDate:"",endDate:"",keywords:"",typeCode:"",hospitalCode:"",wareHouse:"",goodsType:""},tableData:[],hospitalList:[],supplierList:[],whList:[],allWhList:[],allData:[],loadingBtn:!1}},computed:{tHeader:function(){return["仓库","药品名称","批号","规格","厂家","剂型","有效期","账面金额","账面数量","盘点金额","盘点数量","差异金额","差异数量"]},filterVal:function(){return["warehouseName","drugName","batchNumber","unitName","manufacturer","jiType","effectiveDate","bookAmount","bookQuantity","inventoryAmount","inventoryQuantity","profitLossAmount","profitLossQuantity"]},tableData1:function(){return this.allData},name:function(){return"盘点"}},mounted:function(){this.date=[new Date,new Date],this.GetDropDownPermission()},methods:{print:function(){var t={keywords:this.formInline.keywords.removeSP(),warehouseId:this.formInline.wareHouse,hospitalCode:this.formInline.hospitalCode,goodsType:this.formInline.goodsType,IsShowZero:this.remainNum?1:0},e=document.location.protocol+"//"+document.location.hostname+(80==document.location.port||""==document.location.port?"":":"+document.location.port)+"/",a=[];for(var n in t)a.push(n+"="+t[n]);window.open(e+"print/printInvPre.html?"+a.join("&"))},booKchange:function(t){var e=this;setTimeout(function(){e.tableData[t].inventoryAmount=e.tableData[t].inventoryQuantity.mul(e.tableData[t].realPrice),e.tableData[t].profitLossQuantity=e.tableData[t].remainingCount.red(e.tableData[t].inventoryQuantity),e.tableData[t].profitLossAmount=e.tableData[t].bookAmount.red(e.tableData[t].inventoryAmount),e.tableData.push()},50)},hosSelect:function(){var e=this;this.onSubmit(),this.formInline.wareHouse="",this.whList=[],this.allWhList.forEach(function(t){t.hospitalCode==e.formInline.hospitalCode&&e.whList.push(t)})},AddStockInventoryDetail:function(){var e=this;return s()(i.a.mark(function t(){return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.loadingBtn=!0,t.next=3,o.i(p.W)({jsonStr:r()(e.allData)});case 3:t.sent.status?(e.$message({message:"操作成功",type:"success"}),e.onSubmit()):e.$message.error("操作失败"),e.loadingBtn=!1;case 6:case"end":return t.stop()}},t,e)}))()},dateChange:function(t){t?(t=t.formatDates(),this.formInline.startDate=t.substring(0,10),this.formInline.endDate=t.substring(13)):(this.formInline.startDate="",this.formInline.endDate="")},GetDropDownPermission:function(){var n=this;return s()(i.a.mark(function t(){var e,a;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.i(p.e)({hospitalCode:"",pageIndex:1,pageSize:100,keywords:"",typeId:1});case 2:return e=t.sent,o.i(c.b)("hospitalCode")?(e.data.forEach(function(t){o.i(c.b)("hospitalCode")==t.hospitalCode&&n.whList.push(t)}),n.allWhList=JSON.parse(r()(n.whList))):n.allWhList=JSON.parse(r()(e.data)),t.next=6,o.i(p.d)({typeId:1});case 6:a=t.sent,n.hospitalList=a.data,n.formInline.hospitalCode=a.data[0].code;case 9:case"end":return t.stop()}},t,n)}))()},GetStockDrugForInventory:function(a){var n=this;return s()(i.a.mark(function t(){var e;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,n.loading=!0,t.next=4,o.i(p.X)(a);case 4:e=t.sent,n.total=e.count,n.allData=e.data,n.loading=!1,n.allData.forEach(function(t){t.bookQuantity=t.remainingCount,t.bookAmount=t.remainingCount.mul(t.realPrice),t.inventoryAmount=t.remainingCount.mul(t.realPrice),t.profitLossQuantity=0,t.profitLossAmount=0,t.inventoryQuantity=t.remainingCount}),n.pageChange(),t.next=15;break;case 12:t.prev=12,t.t0=t.catch(0),console.log(t.t0);case 15:case"end":return t.stop()}},t,n,[[0,12]])}))()},onSubmit:function(){this.currentPage=1,this.search()},search:function(){this.sum={quantityIn:0,quantityOut:0,remainCount:0,totalAmountOut:0},this.GetStockDrugForInventory({keywords:this.formInline.keywords.removeSP(),warehouseId:this.formInline.wareHouse,hospitalCode:this.formInline.hospitalCode,goodsType:this.formInline.goodsType,IsShowZero:this.remainNum?1:0})},handleSizeChange:function(t){this.size=t,this.pageChange()},handleCurrentChange:function(t){this.currentPage=t,this.pageChange()},saveData:function(){this.pageChange()},checkC:function(){this.search()},pageChange:function(){this.tableData=this.allData.slice((this.currentPage-1)*this.size,this.currentPage*this.size)}},components:{Export:m.a}}},724:function(t,e,a){(t.exports=a(215)(!1)).push([t.i,".warning[data-v-9293216e]{color:red}",""])},758:function(t,e,a){var n=a(724);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a(216)("934710aa",n,!0)},800:function(t,e){t.exports={render:function(){var a=this,t=a.$createElement,n=a._self._c||t;return n("div",{staticClass:"tag selCommon"},[n("el-form",{staticClass:"demo-form-inline form_search",attrs:{inline:!0,model:a.formInline,"label-width":"80px"}},[n("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"医院："}},[n("el-select",{staticStyle:{width:"200px"},on:{change:a.hosSelect},model:{value:a.formInline.hospitalCode,callback:function(t){a.$set(a.formInline,"hospitalCode",t)},expression:"formInline.hospitalCode"}},a._l(a.hospitalList,function(t,e){return n("el-option",{key:e,attrs:{label:t.supplierName,value:t.code}})}),1)],1),a._v(" "),n("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"仓库："}},[n("el-select",{staticStyle:{width:"200px"},on:{change:a.onSubmit},model:{value:a.formInline.wareHouse,callback:function(t){a.$set(a.formInline,"wareHouse",t)},expression:"formInline.wareHouse"}},[n("el-option",{attrs:{label:"全部",value:""}}),a._v(" "),a._l(a.whList,function(t,e){return n("el-option",{key:e,attrs:{label:t.warehouseName,value:t.id}})})],2)],1),a._v(" "),n("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"类型："}},[n("el-select",{staticStyle:{width:"200px"},on:{change:a.onSubmit},model:{value:a.formInline.goodsType,callback:function(t){a.$set(a.formInline,"goodsType",t)},expression:"formInline.goodsType"}},[n("el-option",{attrs:{label:"全部",value:""}}),a._v(" "),n("el-option",{attrs:{label:"药品",value:"1"}}),a._v(" "),n("el-option",{attrs:{label:"物资",value:"2"}}),a._v(" "),1==a.IsSpecial?n("el-option",{attrs:{label:"特殊",value:"3"}}):a._e(),a._v(" "),n("el-option",{attrs:{label:"产品",value:"4"}})],1)],1),a._v(" "),n("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"关键字："}},[n("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&a._k(t.keyCode,"enter",13,t.key,"Enter")?null:a.onSubmit(t)}},model:{value:a.formInline.keywords,callback:function(t){a.$set(a.formInline,"keywords",t)},expression:"formInline.keywords"}})],1),a._v(" "),n("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"零库存："}},[n("el-checkbox",{on:{change:a.checkC},model:{value:a.remainNum,callback:function(t){a.remainNum=t},expression:"remainNum"}})],1),a._v(" "),n("el-form-item",{staticClass:"form_item_mt10",attrs:{label:""}},[n("el-button",{staticClass:"searchBtn",attrs:{type:"primary"},on:{click:a.onSubmit}},[a._v("查询")]),a._v(" "),n("el-button",{staticClass:"searchBtn",attrs:{type:"primary",disabled:0==a.allData.length},on:{click:a.print}},[a._v("盘点打印")]),a._v(" "),n("Export",{ref:"exportTable",attrs:{tHeader:a.tHeader,filterVal:a.filterVal,tableData1:a.tableData1,name:a.name}})],1)],1),a._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:a.loading,expression:"loading"}],staticClass:"smt min_table",staticStyle:{width:"100%","margin-top":"15px","margin-bottom":"10px"},attrs:{data:a.tableData,border:"","max-height":"560"}},[n("el-table-column",{attrs:{prop:"warehouseName",label:"仓库","min-width":"70"}}),a._v(" "),n("el-table-column",{attrs:{prop:"batchNumber",label:"批号","min-width":"90"}}),a._v(" "),n("el-table-column",{attrs:{prop:"drugName",label:"药品名称","min-width":"90"}}),a._v(" "),n("el-table-column",{attrs:{prop:"manufacturer",label:"厂家","min-width":"90"}}),a._v(" "),n("el-table-column",{attrs:{prop:"unitName",label:"规格","min-width":"90"}}),a._v(" "),n("el-table-column",{attrs:{prop:"jiType",label:"剂型","min-width":"70"}}),a._v(" "),n("el-table-column",{attrs:{prop:"effectiveDate",label:"有效期","min-width":"90"},scopedSlots:a._u([{key:"default",fn:function(t){return[t.row.effectiveDate?n("span",[a._v(a._s(t.row.effectiveDate.substring(0,10)))]):a._e()]}}])}),a._v(" "),n("el-table-column",{attrs:{prop:"remainingCount",label:"账面数量","min-width":"80"}}),a._v(" "),n("el-table-column",{attrs:{prop:"bookAmount",label:"账面金额","min-width":"80"}}),a._v(" "),n("el-table-column",{attrs:{prop:"inventoryQuantity",label:"盘点数量","min-width":"80"},scopedSlots:a._u([{key:"default",fn:function(e){return[n("el-input-number",{staticStyle:{width:"90%"},attrs:{debounce:1e3,controls:!1,min:0},on:{change:function(t){return a.booKchange(e.$index)}},model:{value:e.row.inventoryQuantity,callback:function(t){a.$set(e.row,"inventoryQuantity",t)},expression:"scope.row.inventoryQuantity"}})]}}])}),a._v(" "),n("el-table-column",{attrs:{prop:"inventoryAmount",label:"盘点金额","min-width":"80"}}),a._v(" "),n("el-table-column",{attrs:{prop:"profitLossQuantity",label:"盈亏数量","min-width":"80"},scopedSlots:a._u([{key:"default",fn:function(t){return[n("span",[a._v(a._s(t.row.profitLossQuantity))])]}}])}),a._v(" "),n("el-table-column",{attrs:{prop:"profitLossAmount",label:"盈亏金额","min-width":"80"},scopedSlots:a._u([{key:"default",fn:function(t){return[n("span",[a._v(a._s(t.row.profitLossAmount))])]}}])})],1),a._v(" "),n("div",{staticClass:"warning"},[a._v("（确认后修改信息将更新库存，请谨慎操作）")]),a._v(" "),n("el-button",{attrs:{type:"primary",loading:a.loadingBtn},on:{click:a.AddStockInventoryDetail}},[a._v("确认盘点")]),a._v(" "),n("div",{staticClass:"block"},[n("el-pagination",{attrs:{"current-page":a.currentPage,"page-sizes":[50,100],"page-size":a.size,layout:"total, sizes, prev, pager, next, jumper",total:a.total},on:{"size-change":a.handleSizeChange,"current-change":a.handleCurrentChange}})],1)],1)},staticRenderFns:[]}}});