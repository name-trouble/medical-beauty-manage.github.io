webpackJsonp([156],{1049:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=r(100),i=r.n(a),n=r(66),l=r.n(n),o=r(102),s=r.n(o),c=r(99),u=r.n(c),m=r(37),d=r.n(m),p=r(65),f=(r.n(p),r(436)),h=r.n(f),b=r(64);r(22);e.default={data:function(){return{date1:"",formInline:{startTime:"",endTime:"",fxCode:"",name:"",rec:"",customer:"",hospital:"",branch:"",payType:"",status:[],statusMes:"全部"},tableData:[],currentPage:1,size:10,total:0,hospitalList:[],allData:[]}},computed:{tHeader:function(){return["项目","咨询人数","成交人数","未成交人数","成交率","客单价","合计成交业绩","初诊人数","复诊","复查人数","再消费","其他"]},filterVal:function(){return["projectName","consultingCount","dealCount","noDealCount","dealRate","customerPrice","orderAmount","firstCount","secondCount","checkCount","consumeCount","otherCount"]},tableData1:function(){var e=this,t=JSON.parse(d()(this.allData));return t.forEach(function(t){t.activityTypes=e.getTypeName(t.activityTypes),t.status=e.getStatus(t.status)}),t},name:function(){return"品项"}},mounted:function(){var t=new Date;t.setDate("01"),this.date1=[t,new Date],this.getHospital()},methods:{exportData:function(){this.OrderProjectReport({pageIndex:1,pageSize:this.total,startDate:this.formInline.startTime,endDate:this.formInline.endTime,HospitalCode:this.formInline.hospital,Keyword:this.formInline.fxCode},1)},getHospital:function(){var o=this;return u()(i.a.mark(function t(){var e,a,n;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,l.a.all([r.i(b.d)({typeId:1})]);case 2:e=t.sent,a=s()(e,2),n=a[0],a[1],o.hospitalList=n.data,o.formInline.hospital=o.hospitalList[0].code;case 8:case"end":return t.stop()}},t,o)}))()},dateForm1:function(t){t?(t=t.formatDates(),this.formInline.startTime=t.substring(0,10),this.formInline.endTime=t.substring(13)):(this.formInline.startTime="",this.formInline.endTime=""),this.onSubmit()},onSubmit:function(){this.currentPage=1,this.search()},search:function(){this.OrderProjectReport({startDate:this.formInline.startTime,endDate:this.formInline.endTime,HospitalCode:this.formInline.hospital,pageIndex:this.currentPage,pageSize:this.size,Keyword:this.formInline.fxCode})},OrderProjectReport:function(a,n){var o=this;return u()(i.a.mark(function t(){var e;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,r.i(b._532)(a);case 2:e=t.sent,n?(o.allData=o.dealData(e.data),o.$refs.exportCom.handleDownload()):(o.total=e.count,o.tableData=o.dealData(e.data));case 4:case"end":return t.stop()}},t,o)}))()},dealData:function(t){return t.forEach(function(t){t.noDealCount=t.consultingCount-t.dealCount,t.dealRate=String(t.dealCount.div(t.consultingCount).mul(100)).substring(0,5)+"%",t.customerPrice=Math.round(t.orderAmount.div(t.consultingCount))}),t},handleSizeChange:function(t){console.log("每页 "+t+" 条"),this.size=t,this.search()},handleCurrentChange:function(t){console.log("当前页: "+t),this.currentPage=t,this.search()}},components:{Export:h.a}}},1261:function(t,e,a){(t.exports=a(215)(!1)).push([t.i,".front_ipt[data-v-18d75484]{opacity:0;z-index:2}.back_ipt[data-v-18d75484]{margin-left:-220px;z-index:1}",""])},1686:function(t,e,a){var n=a(1261);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a(216)("7a6060b8",n,!0)},2158:function(t,e){t.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"selCommon projectOrder"},[a("el-form",{staticClass:"demo-form-inline form_search",attrs:{inline:!0,model:e.formInline,"label-width":"80px"}},[a("el-form-item",{staticClass:"form_item_mt10 ",attrs:{label:"订单时间："}},[a("el-date-picker",{staticClass:"form_item_ipt220",attrs:{type:"daterange",placeholder:"选择日期范围"},on:{change:e.dateForm1},model:{value:e.date1,callback:function(t){e.date1=t},expression:"date1"}})],1),e._v(" "),a("el-form-item",{staticClass:"form_item_mt10 form_item_wh280",attrs:{label:"关键字："}},[a("el-input",{staticClass:"form_item_ipt220",attrs:{placeholder:"",maxlength:1e4},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.onSubmit(t)}},model:{value:e.formInline.fxCode,callback:function(t){e.$set(e.formInline,"fxCode",t)},expression:"formInline.fxCode"}})],1),e._v(" "),a("el-form-item",{staticClass:"form_item_mt10 form_item_wh280",attrs:{label:"医院："}},[a("el-select",{staticClass:"form_item_ipt220",on:{change:e.onSubmit},model:{value:e.formInline.hospital,callback:function(t){e.$set(e.formInline,"hospital",t)},expression:"formInline.hospital"}},e._l(e.hospitalList,function(t,e){return a("el-option",{key:e,attrs:{label:t.supplierName,value:t.code}})}),1)],1),e._v(" "),a("el-form-item",{staticClass:"form_item_mt10 form_item_wh280",attrs:{label:" "}},[a("el-button",{staticClass:"searchBtn",attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),a("Export",{ref:"exportCom",staticStyle:{display:"none"},attrs:{tHeader:e.tHeader,filterVal:e.filterVal,tableData1:e.tableData1,name:e.name}}),e._v(" "),a("el-button",{staticClass:"searchBtn",on:{click:e.exportData}},[e._v("导出报表")])],1)],1),e._v(" "),a("el-table",{staticClass:"min_table smt",staticStyle:{width:"100%","margin-top":"15px","margin-bottom":"10px"},attrs:{data:e.tableData,border:"","max-height":"500","show-summary":""}},[a("el-table-column",{attrs:{prop:"projectName",label:"项目","min-width":"100"}}),e._v(" "),a("el-table-column",{attrs:{prop:"consultingCount",label:"咨询人数","min-width":"100"}}),e._v(" "),a("el-table-column",{attrs:{prop:"dealCount",label:"成交人数","min-width":"100"}}),e._v(" "),a("el-table-column",{attrs:{prop:"noDealCount",label:"未成交人数","min-width":"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.noDealCount))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"projectName",label:"成交率","min-width":"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.dealRate))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"projectName",label:"成交客单价","min-width":"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.customerPrice))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"orderAmount",label:"合计成交业绩","min-width":"80"}}),e._v(" "),a("el-table-column",{attrs:{prop:"firstCount",label:"初诊人数","min-width":"80"}}),e._v(" "),a("el-table-column",{attrs:{prop:"secondCount",label:"复诊人数","min-width":"80"}}),e._v(" "),a("el-table-column",{attrs:{prop:"checkCount",label:"复查人数","min-width":"80"}}),e._v(" "),a("el-table-column",{attrs:{prop:"consumeCount",label:"再消费人数","min-width":"80"}}),e._v(" "),a("el-table-column",{attrs:{prop:"otherCount",label:"其他","min-width":"80"}})],1)],1)},staticRenderFns:[]}},330:function(t,e,a){a(1686);var n=a(98)(a(1049),a(2158),"data-v-18d75484",null);t.exports=n.exports},436:function(t,e,a){a(439);var n=a(98)(a(437),a(440),"data-v-6c47323e",null);t.exports=n.exports},437:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{tHeader:{},filterVal:{},tableData1:{type:Array},name:""},watch:{tableData1:{handler:function(t){this.otData=t},deep:!0}},data:function(){return{otData:[]}},methods:{handleDownload:function(){var a=this;n.e(220).then(function(){var t=n(448).export_json_to_excel,e=[];e=0!=a.otData.length?a.formatJson(a.filterVal,a.otData):a.formatJson(a.filterVal,a.tableData1),t(a.tHeader,e,a.name)}.bind(null,n)).catch(n.oe)},formatJson:function(t,e){return e.map(function(e){return t.map(function(t){return e[t]})})}}}},438:function(t,e,a){(t.exports=a(215)(!1)).push([t.i,".exportBtn[data-v-6c47323e]{background:#fff;border:1px solid #d6d4d4;font-size:14px;color:#666;border-radius:4px}",""])},439:function(t,e,a){var n=a(438);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a(216)("fdf4f478",n,!0)},440:function(t,e){t.exports={render:function(){var t=this.$createElement;return(this._self._c||t)("el-button",{staticClass:"exportBtn",attrs:{type:"primary"},on:{click:this.handleDownload}},[this._v("导出报表")])},staticRenderFns:[]}}});