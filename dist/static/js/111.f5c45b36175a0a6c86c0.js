webpackJsonp([111],{1093:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r(100),i=r.n(a),n=r(99),s=r.n(n),l=r(64),o=r(101);t.default={props:{},data:function(){return{baseImgPath:o.b,selectId:"",selectCode:"",tableData:[],Data:[],dataCount_user:0,dataCount_branch:0,currentPage:1,pageSize:10,states:[{text:"服务者",code:"2"},{text:"代理商",code:"1"}],state:["2"],branchList:[],realName:"",keyWord:"",currentIndex:0,loading:!1}},created:function(){this.getUserInfo()},methods:{getUserInfo:function(){var a=this;return s()(i.a.mark(function e(){var t;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t={pageIndex:a.currentPage,pageSize:a.pageSize,serviceName:a.keyWord},e.next=3,r.i(l.w)(t);case 3:a.tableData=e.sent,a.loading=!1,a.dataCount_user=parseInt(a.tableData[0].RecordCount);case 6:case"end":return e.stop()}},e,a)}))()},selectState:function(e,t){this.currentIndex=t,this.state=[],this.state.push(e),"1"===e&&0===this.branchList.length&&(this.currentPage=1,this.pageSize=10,this.keyWord="",this.getBranch())},getBranch:function(){var a=this;return s()(i.a.mark(function e(){var t;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t={pageIndex:a.currentPage,pageSize:a.pageSize,branchName:a.keyWord},e.next=3,r.i(l.y)(t);case 3:a.branchList=e.sent,a.loading=!1,a.dataCount_branch=parseInt(a.branchList[0].RecordCount);case 6:case"end":return e.stop()}},e,a)}))()},rowClick:function(e){this.selectId=e.Id,this.selectCode=e.Code,this.realName=e.ServiceName||e.BranchName},pageIndexChange:function(){this.getData()},pageSizeChange:function(e){this.pageSize=e,this.getData()},init:function(){this.currentPage=1,this.getData()},getData:function(){this.loading=!0,1==this.state?this.getBranch():this.getUserInfo()},finish:function(e){this.$emit("onFinish",{code:this.selectCode,name:this.realName,type:this.state[0]},e)},search:function(){this.currentPage=1,this.pageSize=10,this.getData()}}}},1103:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i(100),n=i.n(a),r=i(99),s=i.n(r),l=i(64),o=i(535),c=(i.n(o),i(2076)),u=i.n(c),p=i(22);t.default={components:{PopUser:u.a},data:function(){return{saveLoading:!1,ruleForm:{ticketCode:"",value1:"",memo:"",realName:"",applyNum:"",price:0,salePrice:0},value1:"",startDate:"",memo:"",popUser:!1,ticketCode:"",applyNum:1,realName:"",branchCode:"",typeId:"",TicketOptions:[],tickets:{},price:0,salePrice:0}},mounted:function(){this.getTicket()},methods:{change:function(e){this.ruleForm.startDate=e||""},getTicket:function(){var a=this;return s()(n.a.mark(function e(){var t;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.i(l.c)();case 2:(t=e.sent).forEach(function(e){e.name=e.TickName,e.value=e.TickInfoCode}),a.TicketOptions=t;case 5:case"end":return e.stop()}},e,a)}))()},selectUser:function(){this.popUser=!0},finish:function(e,t){this.popUser=!1,1===t&&(this.ruleForm.realName=e.name,this.ruleForm.branchCode=e.code,this.typeId=e.type)},apply:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;t.saveLoading=!0,t.addTicketsApply()})},addTicketsApply:function(){var r=this;return s()(n.a.mark(function e(){var t,a;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t={applyNum:r.ruleForm.applyNum,applyType:2,checkResult:1,ticketsKindCode:r.ruleForm.ticketCode,typeId:r.typeId,branchCode:r.ruleForm.branchCode,ApplyOn:r.ruleForm.value1.formatDate("yyyy-MM-dd"),createBy:i.i(p.b)("userName"),createUserId:i.i(p.b)("userId"),memo:r.ruleForm.memo,price:r.ruleForm.price,realPrice:r.ruleForm.salePrice},e.next=3,i.i(l._415)(t);case 3:(a=e.sent).success&&0<a.success?(r.currentData="",r.isPopApply=!1,r.$message({type:"success",message:"申请成功!"})):r.$message({type:"warning",message:"申请失败!"}),r.saveLoading=!1;case 6:case"end":return e.stop()}},e,r)}))()},reset:function(){this.ruleForm.ticketCode="",this.ruleForm.applyNum="",this.value1="",this.ruleForm.startDate="",this.ruleForm.memo=""},ticketS:function(){this.ruleForm.ticketCode=this.tickets.value,this.ruleForm.salePrice=this.tickets.Price,this.ruleForm.price=this.tickets.Price},resetForm:function(e){this.$refs[e].resetFields(),this.tickets={},this.value1=""}}}},1277:function(e,t,a){(e.exports=a(215)(!1)).push([e.i,".title[data-v-1e69adf6]{font-size:16px;font-weight:700;margin-left:10px}.item-box[data-v-1e69adf6]{width:60%;background:#f9f9f9;margin:10px;padding:10px}.item-box div[data-v-1e69adf6]{font-size:14px;margin:5px 15px}.btn-box[data-v-1e69adf6]{text-align:left;margin:10px}.btn-box button[data-v-1e69adf6]{width:120px}.btn-box2[data-v-1e69adf6]{text-align:center;width:100%;margin:15px}.btn-box2 button[data-v-1e69adf6]{width:120px}.el-checkbox-button__inner[data-v-1e69adf6]{width:150px}.block[data-v-1e69adf6]{float:right;margin-right:10px;padding-right:0!important}",""])},1470:function(e,t,a){(e.exports=a(215)(!1)).push([e.i,".block[data-v-8fa42012]{text-align:right;display:inline-block}.btn-box[data-v-8fa42012]{text-align:center}",""])},1702:function(e,t,a){var r=a(1277);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a(216)("6b4d1ed0",r,!0)},1895:function(e,t,a){var r=a(1470);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a(216)("6e7a186d",r,!0)},2076:function(e,t,a){a(1895);var r=a(98)(a(1093),a(2370),"data-v-8fa42012",null);e.exports=r.exports},2174:function(e,t){e.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-form",{ref:"ruleForm",attrs:{"label-width":"140px",model:t.ruleForm}},[a("span",{staticClass:"title"},[t._v("出库信息")]),t._v(" "),a("el-form-item",{attrs:{label:"券种编号：",prop:"ticketCode",rules:[{required:!0,message:"不能为空"}]}},[a("el-select",{staticStyle:{width:"250px"},attrs:{filterable:"",placeholder:"搜索"},on:{change:t.ticketS},model:{value:t.tickets,callback:function(e){t.tickets=e},expression:"tickets"}},t._l(t.TicketOptions,function(e){return a("el-option",{key:e.TickInfoCode,attrs:{label:e.name,value:e}})}),1)],1),t._v(" "),a("el-form-item",{attrs:{label:"申请数量：",prop:"applyNum",rules:[{required:!0,message:"不能为空"}]}},[a("el-input-number",{staticStyle:{width:"250px"},attrs:{min:1},model:{value:t.ruleForm.applyNum,callback:function(e){t.$set(t.ruleForm,"applyNum",e)},expression:"ruleForm.applyNum"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"原价："}},[a("span",[t._v(" "+t._s(t.ruleForm.price))])]),t._v(" "),a("el-form-item",{attrs:{label:"售价：",prop:"salePrice",rules:[{required:!0,message:"不能为空"}]}},[a("el-input-number",{staticStyle:{width:"250px"},attrs:{min:0},model:{value:t.ruleForm.salePrice,callback:function(e){t.$set(t.ruleForm,"salePrice",e)},expression:"ruleForm.salePrice"}})],1),t._v(" "),a("span",{staticClass:"title"},[t._v("申请人")]),t._v(" "),a("el-form-item",{attrs:{label:"选择申请人：",prop:"realName",rules:[{required:!0,message:"不能为空"}]}},[a("el-button",{attrs:{type:"success",icon:"plus",size:"small"},on:{click:t.selectUser}},[t._v("选择申请人")]),t._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:""!=t.ruleForm.realName,expression:"ruleForm.realName!=''"}]},[t._v(" 已选择："),a("el-tag",{staticStyle:{"font-size":"14px"},attrs:{type:"success"}},[t._v(t._s(t.ruleForm.realName))])],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"备注："}},[a("el-input",{staticStyle:{width:"500px"},attrs:{type:"textarea"},model:{value:t.ruleForm.memo,callback:function(e){t.$set(t.ruleForm,"memo",e)},expression:"ruleForm.memo"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"时间：",prop:"value1",rules:[{type:"date",required:!0,message:"不能为空"}]}},[a("el-date-picker",{attrs:{type:"date",placeholder:"选择日期"},on:{change:t.change},model:{value:t.ruleForm.value1,callback:function(e){t.$set(t.ruleForm,"value1",e)},expression:"ruleForm.value1"}})],1),t._v(" "),a("el-form-item",{attrs:{label:" "}},[a("div",{staticClass:"btn-box"},[a("el-button",{attrs:{type:"primary",loading:t.saveLoading},on:{click:function(e){return t.apply("ruleForm")}}},[t._v("确定")]),t._v(" "),a("el-button",{on:{click:function(e){return t.resetForm("ruleForm")}}},[t._v("取消")])],1)])],1),t._v(" "),a("el-dialog",{attrs:{title:"选择申请人",visible:t.popUser,size:"",top:"10%","close-on-click-modal":!1},on:{"update:visible":function(e){t.popUser=e}}},[a("pop-user",{staticStyle:{width:"850px"},on:{onFinish:t.finish}})],1)],1)},staticRenderFns:[]}},2370:function(e,t){e.exports={render:function(){var r=this,e=r.$createElement,i=r._self._c||e;return i("div",[i("el-checkbox-group",{staticStyle:{"margin-bottom":"10px"},attrs:{size:"large",min:1,max:1},model:{value:r.state,callback:function(e){r.state=e},expression:"state"}},[i("ul",{staticStyle:{display:"inline-block"}},r._l(r.states,function(t,a){return i("li",{key:a,staticClass:"shelve",class:{active:r.currentIndex===a},on:{click:function(e){return r.selectState(t.code,a)}}},[r._v(r._s(t.text))])}),0),r._v(" "),i("div",{staticStyle:{display:"inline-block"}},[i("span",{staticStyle:{margin:"0 10px"}},[r._v("关键字:")]),r._v(" "),i("el-input",{staticStyle:{width:"300px"},attrs:{placeholder:"用户名/手机号码/真是姓名"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&r._k(e.keyCode,"enter",13,e.key,"Enter")?null:r.search(e)}},model:{value:r.keyWord,callback:function(e){r.keyWord=e},expression:"keyWord"}}),r._v(" "),i("el-button",{staticClass:"searchBtn",attrs:{icon:"search"},on:{click:r.search}},[r._v("查询")])],1)]),r._v(" "),i("el-table",{directives:[{name:"show",rawName:"v-show",value:1==r.state,expression:"state==1"},{name:"loading",rawName:"v-loading",value:r.loading,expression:"loading"}],ref:"multipleTable",staticClass:"min_table smt",staticStyle:{margin:"10px 0",width:"820px"},attrs:{data:r.branchList,"max-height":"500",border:"","row-key":"id","highlight-current-row":""},on:{"row-click":r.rowClick}},[i("el-table-column",{attrs:{prop:"realName",label:"状态","min-width":"70"},scopedSlots:r._u([{key:"default",fn:function(e){return[i("input",{attrs:{type:"checkbox"},domProps:{checked:e.row.Id==r.selectId}})]}}])}),r._v(" "),i("el-table-column",{attrs:{prop:"Code",label:"编号","min-width":"100"}}),r._v(" "),i("el-table-column",{attrs:{prop:"BranchName",label:"名称","min-width":"120"}}),r._v(" "),i("el-table-column",{attrs:{prop:"BranchGradeName",label:"代理等级","min-width":"120"}}),r._v(" "),i("el-table-column",{attrs:{label:"性别","min-width":"120"},scopedSlots:r._u([{key:"default",fn:function(e){return[r._v("\n                "+r._s(1==e.row.Sex?"男":"女")+"\n            ")]}}])}),r._v(" "),i("el-table-column",{attrs:{prop:"PhoneNumber",label:"联系方式","min-width":"120"}})],1),r._v(" "),i("el-table",{directives:[{name:"show",rawName:"v-show",value:2==r.state,expression:"state==2"}],ref:"multipleTable",staticClass:"min_table smt",staticStyle:{margin:"10px 0",width:"100%"},attrs:{data:r.tableData,"max-height":"500",border:"","row-key":"id","highlight-current-row":""},on:{"row-click":r.rowClick}},[i("el-table-column",{attrs:{prop:"realName",label:"状态","min-width":"70"},scopedSlots:r._u([{key:"default",fn:function(e){return[i("input",{attrs:{type:"checkbox"},domProps:{checked:e.row.Id==r.selectId}})]}}])}),r._v(" "),i("el-table-column",{attrs:{prop:"realName",label:"头像","min-width":"100"},scopedSlots:r._u([{key:"default",fn:function(e){return[i("img",{staticStyle:{"margin-top":"5px",height:"50px",width:"50px"},attrs:{src:r.baseImgPath+e.row.ImgUrl}})]}}])}),r._v(" "),i("el-table-column",{attrs:{prop:"Code",label:"编号","min-width":"100"}}),r._v(" "),i("el-table-column",{attrs:{prop:"ServiceName",label:"姓名","min-width":"120"}}),r._v(" "),i("el-table-column",{attrs:{prop:"HospitalName",label:"所属医院","min-width":"170"}}),r._v(" "),i("el-table-column",{attrs:{prop:"SerTypeName",label:"职位","min-width":"120"}}),r._v(" "),i("el-table-column",{attrs:{prop:"TitleName",label:"职称","min-width":"120"}})],1),r._v(" "),i("div",{staticClass:"block"},[i("el-pagination",{attrs:{total:1==r.state?r.dataCount_branch:r.dataCount_user,"current-page":r.currentPage,"page-size":r.pageSize,"row-class-name":"tbRow","page-sizes":[10,20,50],layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":r.pageSizeChange,"current-change":r.pageIndexChange,"update:currentPage":function(e){r.currentPage=e},"update:current-page":function(e){r.currentPage=e}}})],1),r._v(" "),i("div",{staticClass:"btn-box"},[i("el-button",{staticStyle:{width:"120px"},attrs:{type:"info"},on:{click:function(e){return r.finish(1)}}},[r._v("确认")]),r._v(" "),i("el-button",{staticStyle:{width:"120px"},on:{click:function(e){return r.finish(0)}}},[r._v("取消")])],1)],1)},staticRenderFns:[]}},368:function(e,t,a){a(1702);var r=a(98)(a(1103),a(2174),"data-v-1e69adf6",null);e.exports=r.exports},535:function(e,t,a){var r=a(545);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a(216)("3ea3e0b0",r,!0)},545:function(e,t,a){(e.exports=a(215)(!1)).push([e.i,".el-dialog__body{padding:10px 20px}.el-checkbox-button__inner{width:120px;height:35px}.el-checkbox-button:first-child .el-checkbox-button__inner,.el-checkbox-button:last-child .el-checkbox-button__inner{border-radius:0}.el-dialog__title{font-weight:0}.el-dialog__header{text-align:center}.el-table__row{cursor:pointer}",""])}});