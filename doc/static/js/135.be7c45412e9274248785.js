webpackJsonp([135],{1316:function(e,t,a){(e.exports=a(215)(!1)).push([e.i,".form_footer[data-v-2f6ea005]{text-align:center}.form_item_ipt153[data-v-2f6ea005]{width:153px}.form_item_wt255[data-v-2f6ea005]{width:253px}",""])},1411:function(e,t,a){(e.exports=a(215)(!1)).push([e.i,"",""])},1741:function(e,t,a){var r=a(1316);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a(216)("c155ccfc",r,!0)},1836:function(e,t,a){var r=a(1411);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a(216)("5fe4e9bb",r,!0)},2042:function(e,t,a){a(1741);var r=a(98)(a(944),a(2213),"data-v-2f6ea005",null);e.exports=r.exports},2213:function(e,t){e.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{},[a("el-form",{ref:"ruleForm",attrs:{model:t.ruleForm,rules:t.rules,"label-width":"110px"}},[a("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"消费商：",prop:"BranchCode",required:""}},[a("el-autocomplete",{staticStyle:{width:"250px"},attrs:{"fetch-suggestions":t.queryCus,placeholder:"请输入内容","trigger-on-focus":!1},on:{select:t.selectCus},scopedSlots:t._u([{key:"default",fn:function(e){var t=e.item;return[a("my-item-extraMember",{attrs:{item:t}})]}}]),model:{value:t.branch,callback:function(e){t.branch=e},expression:"branch"}})],1),t._v(" "),a("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"支付方式：",prop:"type"}},[a("el-select",{staticStyle:{width:"250px"},on:{change:t.paySelect},model:{value:t.ruleForm.type,callback:function(e){t.$set(t.ruleForm,"type",e)},expression:"ruleForm.type"}},t._l(t.payWayList,function(e,t){return a("el-option",{key:t,attrs:{label:e.name,value:e.name+"|"+e.value}})}),1)],1),t._v(" "),a("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"实际支付金额：",prop:"RealAmount"}},[a("el-input-number",{staticStyle:{width:"250px"},attrs:{debounce:t.debounce,controls:!1},model:{value:t.ruleForm.RealAmount,callback:function(e){t.$set(t.ruleForm,"RealAmount",e)},expression:"ruleForm.RealAmount"}})],1),t._v(" "),"018"==t.ruleForm.PayType?a("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"预付款余额："}},[a("span",[t._v(t._s(t.RemainAmount))])]):t._e(),t._v(" "),a("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"手续费："}},[a("el-input-number",{staticStyle:{width:"250px"},attrs:{debounce:t.debounce,controls:!1},model:{value:t.ruleForm.ProcFee,callback:function(e){t.$set(t.ruleForm,"ProcFee",e)},expression:"ruleForm.ProcFee"}})],1),t._v(" "),a("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"收款时间："}},[a("el-date-picker",{staticStyle:{width:"250px"},attrs:{type:"date",placeholder:"选择日期"},model:{value:t.payDate,callback:function(e){t.payDate=e},expression:"payDate"}})],1),t._v(" "),a("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"销售公司：",prop:"topBranch"}},[a("el-select",{staticStyle:{width:"250px"},attrs:{filterable:"",placeholder:"请选择"},on:{change:t.selBranch},model:{value:t.ruleForm.topBranch,callback:function(e){t.$set(t.ruleForm,"topBranch",e)},expression:"ruleForm.topBranch"}},t._l(t.topBranchList,function(e,t){return a("el-option",{key:t,attrs:{label:e.branchName,value:e.branchName+"|"+e.code}})}),1)],1),t._v(" "),"001"!=t.ruleForm.PayType&&"018"!=t.ruleForm.PayType?a("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"收款账户：",prop:"ReceiveAccount"}},[a("el-select",{staticStyle:{width:"250px"},attrs:{filterable:"",placeholder:"请选择"},model:{value:t.ruleForm.ReceiveAccount,callback:function(e){t.$set(t.ruleForm,"ReceiveAccount",e)},expression:"ruleForm.ReceiveAccount"}},t._l(t.accountList,function(e,t){return a("el-option",{key:t,attrs:{label:e.shortName,value:e.shortName}})}),1)],1):t._e(),t._v(" "),a("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"备注："}},[a("el-input",{staticStyle:{width:"250px"},attrs:{type:"textarea"},model:{value:t.ruleForm.Memo,callback:function(e){t.$set(t.ruleForm,"Memo",e)},expression:"ruleForm.Memo"}})],1),t._v(" "),a("el-form-item",{staticClass:"form_item_mt10",attrs:{label:""}},[a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.submitForm("ruleForm")}}},[t._v("确定")]),t._v(" "),a("el-button",{on:{click:function(e){return t.resetForm("ruleForm")}}},[t._v("取消")])],1)],1)],1)},staticRenderFns:[]}},2309:function(e,t){e.exports={render:function(){var a=this,e=a.$createElement,r=a._self._c||e;return r("div",{staticClass:"tag selCommon"},[r("el-form",{staticClass:"demo-form-inline form_search",attrs:{inline:!0,"label-width":"80px"}},[r("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"消费商："}},[r("el-autocomplete",{staticStyle:{width:"250px"},attrs:{"fetch-suggestions":a.queryCus,placeholder:"请输入内容","trigger-on-focus":!1},on:{select:a.selectCus},scopedSlots:a._u([{key:"default",fn:function(e){var t=e.item;return[r("my-item-extraMember",{attrs:{item:t}})]}}]),model:{value:a.branch,callback:function(e){a.branch=e},expression:"branch"}})],1),a._v(" "),r("el-form-item",{staticClass:"form_item_mt10",attrs:{label:" "}},[r("el-button",{staticClass:"searchBtn",attrs:{type:"primary"},on:{click:a.onSubmit}},[a._v("查询")])],1)],1),a._v(" "),r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:a.loading,expression:"loading"}],staticClass:"min_table",staticStyle:{width:"100%","margin-top":"20px"},attrs:{data:a.tableData,border:"","max-height":"560"}},[r("el-table-column",{attrs:{prop:"payDate",label:"日期","min-width":"80",align:"center"},scopedSlots:a._u([{key:"default",fn:function(e){return[e.row.payDate?r("span",[a._v(a._s(e.row.payDate.substring(0,10)))]):a._e()]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"branchName",label:"消费商","min-width":"80"}}),a._v(" "),r("el-table-column",{attrs:{prop:"payTypeName",label:"支付方式","min-width":"80"}}),a._v(" "),r("el-table-column",{attrs:{prop:"realAmount",label:"支付金额","min-width":"80"}}),a._v(" "),r("el-table-column",{attrs:{prop:"receiveBranchName",label:"销售公司","min-width":"90"}}),a._v(" "),r("el-table-column",{attrs:{prop:"receiveAccount",label:"收款账户","min-width":"80"}}),a._v(" "),r("el-table-column",{attrs:{prop:"memo",label:"备注","min-width":"150","show-overflow-tooltip":""}}),a._v(" "),r("el-table-column",{attrs:{prop:"customerName",label:"操作","min-width":"80"},scopedSlots:a._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(e){return a.upDate(t.row)}}},[a._v("编辑")]),a._v(" "),r("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(e){return a.del(t.row)}}},[a._v("删除")])]}}])})],1),a._v(" "),r("div",{staticClass:"block"},[r("el-pagination",{attrs:{"current-page":a.currentPage,"page-sizes":[10,20,30,40],"page-size":a.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:a.total},on:{"size-change":a.handleSizeChange,"current-change":a.handleCurrentChange}})],1),a._v(" "),r("el-dialog",{attrs:{title:"编辑",visible:a.dialogView,top:"10%",size:"","close-on-click-modal":!1},on:{"update:visible":function(e){a.dialogView=e}}},[a.dialogView?r("updateDialog",{staticStyle:{width:"450px"},attrs:{editMes:a.editMes},on:{close:a.editClose}}):a._e()],1)],1)},staticRenderFns:[]}},256:function(e,t,a){a(1836);var r=a(98)(a(952),a(2309),"data-v-5fd72778",null);e.exports=r.exports},944:function(e,t,m){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=m(37),o=m.n(a),r=m(100),p=m.n(r),n=m(103),h=m.n(n),s=m(99),i=m.n(s),c=m(22),d=m(64);m(1).default.component("my-item-extraMember",{functional:!0,render:function(e,t){var a=t.props.item;return e("div",t.data,[e("p",{attrs:{class:"select_name"+a.Type,title:a.name}},["名字："+a.name]),e("p",{attrs:{class:"select_name"+a.Type,title:a.name}},["编号："+a.code]),e("p",{attrs:{class:"select_name"+a.Type,title:a.name}},["手机号："+a.phone])])},props:{item:{type:Object,required:!0}}}),t.default={data:function(){return{branch:"",debounce:1e3,payWayList:[],accountList:[],hosAccount:[],payDate:new Date,ruleForm:{BranchCode:"",PayDate:new Date,type:"",PayTypeName:"",PayType:"",Memo:"",RealAmount:0,ReceiveAccount:"",ProcFee:0,topBranch:"",ReceiveBranchCode:"",ReceiveBranchName:"",ItemType:5,ItemDetail:"额外费用",createUserId:m.i(c.b)("userId"),createBy:m.i(c.b)("userName")},customerList:[],isEdit:!0,topBranchList:[],RemainAmount:0,rules:{topBranch:[{required:!0,message:"请选择",trigger:"change"}],RealAmount:[{required:!0,type:"number",message:"请填写实付金额",trigger:"blur"}],ReceiveAccount:[{required:!0,message:"请填写收款账户",trigger:"change"}],BranchCode:[{required:!0,message:"请选择支付方式",trigger:"change"}],type:[{required:!0,message:"请选择消费商",trigger:"change"}]}}},props:{editMes:{}},watch:{},mounted:function(){this.copyData(this.editMes),this.getPayWay()},methods:{copyData:function(e){for(var t in e)null==e[t]&&(e[t]="");this.branch=e.branchName,this.ruleForm={BranchCode:e.branchCode,PayDate:e.payDate,type:e.payTypeName+"|"+e.payType,PayTypeName:e.payTypeName,PayType:e.payType,Memo:e.memo,RealAmount:e.realAmount,ReceiveAccount:e.receiveAccount||"",ProcFee:e.procFee,topBranch:e.receiveBranchName+"|"+e.receiveBranchCode,ReceiveBranchCode:e.receiveBranchCode,ReceiveBranchName:e.receiveBranchName},this.payDate=new Date(e.payDate.substring(0,4),e.payDate.substring(5,7)-1,e.payDate.substring(8,10))},queryCus:function(e,t){this.customerList=[],(this.ruleForm.BranchCode="")!==e&&null!=e&&this.getBranchByKeywords({keywords:e.removeSP()});var a=this;clearTimeout(this.timeout),this.timeout=setTimeout(function(){t(a.customerList)},1e3*Math.random())},selectCus:function(e){this.ruleForm.BranchCode=e.code?e.code:""},getBranchByKeywords:function(l){var u=this;return i()(p.a.mark(function e(){var t,a,r,n,o,s,i,c;return p.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,m.i(d._60)(l);case 3:if(!((t=e.sent)instanceof Array&&0<t.length)){e.next=24;break}for(r=!(a=!0),n=void 0,e.prev=8,o=h()(t);!(a=(s=o.next()).done);a=!0)i=s.value,(c="")!=i.BranchTags&&null!=i.BranchTags&&null!=i.BranchTags&&(c="("+i.BranchTags+")"),u.customerList.push({value:i.BranchName+c,phone:i.PhoneNumber,code:i.Code,name:i.BranchName+c,hospitalCode:i.HospitalCode,hospitalName:i.HospitalName});e.next=16;break;case 12:e.prev=12,e.t0=e.catch(8),r=!0,n=e.t0;case 16:e.prev=16,e.prev=17,!a&&o.return&&o.return();case 19:if(e.prev=19,r)throw n;e.next=22;break;case 22:return e.finish(19);case 23:return e.finish(16);case 24:u.loading1=!1,e.next=30;break;case 27:e.prev=27,e.t1=e.catch(0),console.log(e.t1);case 30:case"end":return e.stop()}},e,u,[[0,27],[8,12,16,24],[17,,19,23]])}))()},GetBaseBranchAccount:function(a){var r=this;return i()(p.a.mark(function e(){var t;return p.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.i(d.k)(a);case 2:t=e.sent,r.accountList=t.data;case 4:case"end":return e.stop()}},e,r)}))()},GetHospitalAccountByCode:function(a){var r=this;return i()(p.a.mark(function e(){var t;return p.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.i(d._31)({hospitalCode:a});case 2:t=e.sent,r.hosAccount=t.data,r.accountList=t.data;case 5:case"end":return e.stop()}},e,r)}))()},paySelect:function(){this.ruleForm.PayTypeName=this.ruleForm.type.split("|")[0],this.ruleForm.PayType=this.ruleForm.type.split("|")[1]},selBranch:function(){0<this.ruleForm.topBranch.length?(this.ruleForm.ReceiveBranchCode=this.ruleForm.topBranch.split("|")[1],this.ruleForm.ReceiveBranchName=this.ruleForm.topBranch.split("|")[0],this.GetBaseBranchAccount({keywords:this.ruleForm.ReceiveBranchCode})):(this.ruleForm.ReceiveBranchCode="",this.ruleForm.ReceiveBranchName="")},getPayWay:function(){var n=this;return i()(p.a.mark(function e(){var t,a,r;return p.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.i(d._32)({branchcode:n.code});case 2:return t=e.sent,n.RemainAmount=t.RemainAmount,e.next=6,m.i(d.d)({typeId:n.isHos?"1":"2"});case 6:return a=e.sent,n.topBranchList=a.data,""==a.data[0].code&&n.topBranchList.splice(0,1),e.next=11,m.i(d.l)("0006");case 11:(r=e.sent).constructor==Array&&r.forEach(function(e){"008"!=e.DataCode&&"009"!=e.DataCode&&"010"!=e.DataCode&&"011"!=e.DataCode&&n.payWayList.push({name:e.DataName,value:e.DataCode})});case 13:case"end":return e.stop()}},e,n)}))()},submitForm:function(e){var r=this,n=this;this.$refs[e].validate(function(e){if(e){n.payDate.formatDate("yyyy-MM-dd")==n.editMes.payDate.substring(0,10)||(n.ruleForm.PayDate=r.payDate.formatDate("yyyy-MM-dd hh:mm:ss"));var t=JSON.parse(o()(r.editMes));for(var a in t)null==t[a]&&(t[a]="");t.branchCode=n.ruleForm.BranchCode,t.payDate=n.ruleForm.PayDate,t.payTypeName=n.ruleForm.PayTypeName,t.payType=n.ruleForm.PayType,t.memo=n.ruleForm.Memo,t.receiveAccount=n.ruleForm.ReceiveAccount,t.procFee=n.ruleForm.ProcFee,t.receiveBranchCode=n.ruleForm.ReceiveBranchCode,t.receiveBranchName=n.ruleForm.ReceiveBranchName,t.realAmount=n.ruleForm.RealAmount,t.modifiedBy=m.i(c.b)("userName"),t.modifiedUserId=m.i(c.b)("userId"),r.UpdateBranchOrderPayExt(t)}})},resetForm:function(){this.$emit("close",!1)},UpdateBranchOrderPayExt:function(a){var r=this;return i()(p.a.mark(function e(){var t;return p.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.i(d._291)(a);case 2:(t=e.sent).status?(r.$message({type:"success",message:"编辑成功"}),r.$emit("close",!0)):r.$message({type:"warning",message:"编辑失败!"+t.errorMessage});case 4:case"end":return e.stop()}},e,r)}))()}}}},952:function(e,t,m){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=m(37),r=m.n(a),n=m(100),p=m.n(n),o=m(103),h=m.n(o),s=m(99),i=m.n(s),c=m(65),l=(m.n(c),m(2042)),u=m.n(l),d=(m(22),m(64));m(1).default.component("my-item-extraMember",{functional:!0,render:function(e,t){var a=t.props.item;return e("div",t.data,[e("p",{attrs:{class:"select_name"+a.Type,title:a.name}},["名字："+a.name]),e("p",{attrs:{class:"select_name"+a.Type,title:a.name}},["编号："+a.code]),e("p",{attrs:{class:"select_name"+a.Type,title:a.name}},["手机号："+a.phone])])},props:{item:{type:Object,required:!0}}}),t.default={data:function(){return{dialogView:!1,allLoading:!1,loading:!1,date:new Date,currentPage:1,total:0,pageSize:10,branch:"",formInline:{BranchCode:""},tableData:[],customerList:[],editMes:{}}},computed:{},mounted:function(){this.onSubmit()},methods:{queryCus:function(e,t){this.customerList=[],(this.formInline.BranchCode="")!==e&&null!=e&&this.getBranchByKeywords({keywords:e.removeSP()});var a=this;clearTimeout(this.timeout),this.timeout=setTimeout(function(){t(a.customerList)},1e3)},selectCus:function(e){this.formInline.BranchCode=e.code?e.code:""},getBranchByKeywords:function(l){var u=this;return i()(p.a.mark(function e(){var t,a,r,n,o,s,i,c;return p.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,m.i(d._60)(l);case 3:if(!((t=e.sent)instanceof Array&&0<t.length)){e.next=24;break}for(r=!(a=!0),n=void 0,e.prev=8,o=h()(t);!(a=(s=o.next()).done);a=!0)i=s.value,(c="")!=i.BranchTags&&null!=i.BranchTags&&null!=i.BranchTags&&(c="("+i.BranchTags+")"),u.customerList.push({value:i.BranchName+c,phone:i.PhoneNumber,code:i.Code,name:i.BranchName+c,hospitalCode:i.HospitalCode,hospitalName:i.HospitalName});e.next=16;break;case 12:e.prev=12,e.t0=e.catch(8),r=!0,n=e.t0;case 16:e.prev=16,e.prev=17,!a&&o.return&&o.return();case 19:if(e.prev=19,r)throw n;e.next=22;break;case 22:return e.finish(19);case 23:return e.finish(16);case 24:u.loading1=!1,e.next=30;break;case 27:e.prev=27,e.t1=e.catch(0),console.log(e.t1);case 30:case"end":return e.stop()}},e,u,[[0,27],[8,12,16,24],[17,,19,23]])}))()},handleSizeChange:function(e){this.pageSize=e,this.search()},handleCurrentChange:function(e){this.currentPage=e,this.search()},GetBranchOrderPayExt:function(a){var r=this;return i()(p.a.mark(function e(){var t;return p.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.i(d._289)(a);case 2:(t=e.sent).status&&(r.total=t.count,r.tableData=t.data);case 4:case"end":return e.stop()}},e,r)}))()},onSubmit:function(){this.currentPage=1,this.search()},search:function(){this.GetBranchOrderPayExt({BranchCode:this.formInline.BranchCode,pageIndex:this.currentPage,pageSize:this.pageSize})},editClose:function(e){this.dialogView=!1,e&&this.search()},upDate:function(e){this.editMes=JSON.parse(r()(e)),this.dialogView=!0},del:function(e){var t=this;this.$confirm("是否确定删除该数据?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.DeleteBranchOrderPayExt({id:e.id})})},DeleteBranchOrderPayExt:function(a){var r=this;return i()(p.a.mark(function e(){var t;return p.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.i(d._290)(a);case 2:(t=e.sent).status?(r.$message({type:"success",message:"删除成功"}),r.search()):r.$message({type:"warning",message:"删除失败!"+t.errorMessage});case 4:case"end":return e.stop()}},e,r)}))()}},components:{updateDialog:u.a}}}});