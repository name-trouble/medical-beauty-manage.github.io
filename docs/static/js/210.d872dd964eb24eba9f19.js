webpackJsonp([210],{1337:function(t,e,a){(t.exports=a(215)(!1)).push([t.i,".table_container[data-v-3c14c0fe]{width:100%;margin-top:20px}",""])},1762:function(t,e,a){var n=a(1337);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a(216)("25d60be6",n,!0)},2234:function(t,e){t.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"monthReport selCommon"},[a("el-form",{staticClass:"demo-form-inline form_search",attrs:{inline:!0,"label-width":"80px"}},[a("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"提成日期："}},[a("el-date-picker",{staticStyle:{width:"200px"},attrs:{"value-format":"yyyy-MM-dd",type:"daterange",placeholder:"选择日期"},model:{value:e.date,callback:function(t){e.date=t},expression:"date"}})],1),e._v(" "),a("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"业绩区间："}},[a("el-input",{staticClass:"form_item",staticStyle:{width:"100px"},attrs:{type:"number"},model:{value:e.paginationModel.StartRangeAmount,callback:function(t){e.$set(e.paginationModel,"StartRangeAmount",t)},expression:"paginationModel.StartRangeAmount"}}),e._v("\n            -\n            "),a("el-input",{staticClass:"form_item",staticStyle:{width:"100px"},attrs:{type:"number"},model:{value:e.paginationModel.EndRangeAmount,callback:function(t){e.$set(e.paginationModel,"EndRangeAmount",t)},expression:"paginationModel.EndRangeAmount"}})],1),e._v(" "),a("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"提成比例："}},[a("el-input",{staticClass:"form_item",staticStyle:{width:"200px"},attrs:{type:"number"},model:{value:e.paginationModel.ConsumeReward,callback:function(t){e.$set(e.paginationModel,"ConsumeReward",t)},expression:"paginationModel.ConsumeReward"}},[a("template",{slot:"append"},[e._v("%")])],2)],1),e._v(" "),a("el-form-item",{staticClass:"form_item_mt10",attrs:{label:" "}},[a("el-button",{staticClass:"searchBtn",attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("查询")])],1)],1),e._v(" "),a("div",{staticClass:"table_container"},[a("el-table",{ref:"reportTable",staticStyle:{width:"100%"},attrs:{data:e.reportData,border:""}},[a("el-table-column",{attrs:{prop:"",label:"代理编号","min-width":"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.Code))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"",label:"代理姓名","min-width":"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.BranchName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"",label:"代理等级","min-width":"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.BranchGradeCode))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"",label:"账户","min-width":"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.BankCardId))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"",label:"账户名","min-width":"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.BankCardHolder))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"",label:"团队总业绩","min-width":"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.TotalConsume))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"",label:"提成业绩","min-width":"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.ConsumeAmount))])]}}])})],1),e._v(" "),a("el-pagination",{attrs:{"current-page":e.paginationModel.PageIndex,"page-sizes":[10,20,30],"page-size":e.paginationModel.PageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.paginationModel.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},staticRenderFns:[]}},270:function(t,e,a){a(1762);var n=a(98)(a(966),a(2234),"data-v-3c14c0fe",null);t.exports=n.exports},966:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=o(100),l=o.n(a),n=o(99),i=o.n(n),r=o(65),s=(o.n(r),o(22),o(64));e.default={data:function(){return{reportData:[],date:null,paginationModel:{PageIndex:1,PageSize:10,total:0,StartRangeAmount:0,EndRangeAmount:3e5,ConsumeReward:1}}},mounted:function(){},methods:{MonthlyRewardConsume:function(){var n=this;return i()(l.a.mark(function t(){var e,a;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,(e=n.date)&&1<e.length&&(n.paginationModel.StartDate=e[0],n.paginationModel.EndDate=e[1]),t.next=5,o.i(s._467)(n.paginationModel);case 5:a=t.sent,n.reportData=a.data,n.paginationModel.total=a.count,0===a.count&&n.$message.success("查询结束，无奖励"),t.next=14;break;case 11:t.prev=11,t.t0=t.catch(0),console.log(t.t0);case 14:case"end":return t.stop()}},t,n,[[0,11]])}))()},onSubmit:function(){this.MonthlyRewardConsume()},handleSizeChange:function(t){t!==this.paginationModel.PageSize&&(this.paginationModel.PageSize=t,this.MonthlyRewardConsume())},handleCurrentChange:function(t){t!==this.paginationModel.PageIndex&&(this.paginationModel.PageIndex=t,this.MonthlyRewardConsume())}},components:{}}}});