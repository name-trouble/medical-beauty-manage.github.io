webpackJsonp([123],{1121:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r(37),n=r.n(a),o=r(100),i=r.n(o),l=r(99),c=r.n(l),s=r(65),u=(r.n(s),r(22)),d=r(64),m=r(2087),f=r.n(m);t.default={data:function(){return{saveLoading:!1,ConPac:"",packSub:[],gradeList:[],header:!1,show:!1,tableAdd:[],tittle:"",dialogFormVisible:!1,dialogFormVisible1:!1,tableData:[],formLabelAlign:{}}},watch:{tableAdd:{handler:function(e){0==e.length&&(this.show=!1)},deep:!0}},beforeRouteLeave:function(e,t,a){this.$destroy(),a()},filters:{gradeFilter:function(t,e){var a="";return e.forEach(function(e){t==e.Code&&(a=e.BranchGradeName)}),a}},computed:{createUserId:function(){return r.i(u.b)("userId")},createBy:function(){return r.i(u.b)("userName")}},mounted:function(){this.getGradeAll()},methods:{getGradeAll:function(){var a=this;return c()(i.a.mark(function e(){var t;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.i(d._319)();case 3:t=e.sent,a.gradeList=t,a.getPackageAll(),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}},e,a,[[0,8]])}))()},getPackageAll:function(){var a=this;return c()(i.a.mark(function e(){var t;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.i(d._344)();case 3:t=e.sent,a.tableData=t,e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}},e,a,[[0,7]])}))()},AddPackage:function(t,a,n){var o=this;return c()(i.a.mark(function e(){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,o.saveLoading=!0,e.next=4,r.i(d._345)(t);case 4:e.sent.success?(o.$message({message:"添加成功",type:"success"}),o.getPackageAll(),a.splice(n,1)):o.$message.error("添加失败"),o.saveLoading=!1,e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0),o.$message.error("添加失败");case 13:case"end":return e.stop()}},e,o,[[0,9]])}))()},updatePackage:function(t){var a=this;return c()(i.a.mark(function e(){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a.saveLoading=!0,e.next=4,r.i(d._346)(t);case 4:e.sent.success&&(a.$message({message:"更新成功",type:"success"}),a.getPackageAll(),a.dialogFormVisible1=!1),a.saveLoading=!1,e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0),a.$message.error("更新失败");case 13:case"end":return e.stop()}},e,a,[[0,9]])}))()},deletePackage:function(t){var a=this;return c()(i.a.mark(function e(){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.i(d._347)(t);case 3:e.sent.success?(a.$message({message:"删除成功",type:"success"}),a.getPackageAll()):a.$message.error("操作失败"),e.next=11;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0),a.$message.error("操作失败");case 11:case"end":return e.stop()}},e,a,[[0,7]])}))()},getPackageSub:function(a){var n=this;return c()(i.a.mark(function e(){var t;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.i(d._348)(a);case 3:t=e.sent,n.packSub=t,e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}},e,n,[[0,7]])}))()},editPac:function(e,t){this.formLabelAlign=JSON.parse(n()(t[e])),this.tittle=t[e].ConPacName,this.dialogFormVisible1=!0},edit:function(e,t){this.dialogFormVisible=!0,this.tittle=t[e].ConPacName,this.ConPac=t[e],this.getPackageSub({ConPacCode:t[e].ConPacCode})},deleteRow:function(e,t,a){var n=this;0==a?this.$confirm("操作将删除该套餐, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){n.deletePackage({id:t[e].Id})}).catch(function(){}):t.splice(e,1)},save:function(e,t){this.AddPackage({ConPacName:t[e].conPacName,gradeNo:t[e].gradeNo,memo:t[e].memo,createUserId:this.createUserId,createBy:this.createBy,jifenRecharge:t[e].jifenRecharge},t,e)},addPackage:function(){this.show=!0,this.tableAdd.push({num:"保存后编号由系统生成",conPacName:"",gradeNo:"请选择",memo:"",jifenRecharge:"0"})},close:function(){this.dialogFormVisible=!1},editSure:function(){this.updatePackage({id:this.formLabelAlign.Id,conPacCode:this.formLabelAlign.ConPacCode,ConPacName:this.formLabelAlign.ConPacName,gradeNo:this.formLabelAlign.GradeNo,memo:this.formLabelAlign.Memo,createUserId:this.createUserId,createBy:this.createBy,jifenRecharge:this.formLabelAlign.JifenRecharge})},cancel:function(){this.dialogFormVisible1=!1}},components:{packageSet:f.a}}},1124:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(37),o=n.n(a),r=n(100),i=n.n(r),l=n(99),c=n.n(l),s=n(65),u=(n.n(s),n(22)),d=n(64);t.default={props:{packSub:{type:Array},ConPac:""},data:function(){return{saveLoading:!1,packData:[],ticketData:[],labelPosition:"right",formLabelAlign:{},multipleSelection:[]}},watch:{packSub:{handler:function(e){0!=e.length&&this.dataSplit(e)},deep:!0}},computed:{},mounted:function(){},methods:{addPackageSub:function(t){var a=this;return c()(i.a.mark(function e(){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a.saveLoading=!0,e.next=4,n.i(d._349)(t);case 4:e.sent.success?(a.$message({message:"编辑成功",type:"success"}),a.packData=[],a.$refs.multipleTable.clearSelection(),a.$emit("close",!0),a.packData=[],a.ticketData=[]):a.$message.error("编辑失败"),a.saveLoading=!1,e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0),a.$message.error("编辑失败");case 13:case"end":return e.stop()}},e,a,[[0,9]])}))()},sure:function(){var e=this.attrSplit(this.multipleSelection);this.addPackageSub({code:this.ConPac.ConPacCode,jsonStr:o()(e)})},cancel:function(){this.$emit("close",!0),this.$refs.multipleTable.clearSelection(),this.packData=[],this.ticketData=[]},selectSure:function(){this.packData=this.multipleSelection},handleSelectionChange:function(e){this.multipleSelection=e},attrSplit:function(e){var t=this,a=[];return e.forEach(function(e){a.push({ConPacCode:t.ConPac.ConPacCode,ConPacName:t.ConPac.ConPacName,TickInfoCode:e.TickInfoCode,TickInfoName:e.TickName,TicNum:e.TicNum,CreateUserId:n.i(u.b)("userId"),CreateBy:n.i(u.b)("userName")})}),a},dataSplit:function(e){var t=this;this.ticketData=JSON.parse(o()(e)),this.packData=[];this.ticketData&&(this.ticketData.forEach(function(e){1==e.IsChecked&&t.packData.push(e)}),setTimeout(function(){t.toggleSelection(t.packData)},200))},toggleSelection:function(e){var t=this;e?e.forEach(function(e){t.$refs.multipleTable.toggleRowSelection(e)}):this.$refs.multipleTable.clearSelection()},select:function(){}},components:{}}},1279:function(e,t,a){(e.exports=a(215)(!1)).push([e.i,".dialog-footer[data-v-214b717b]{text-align:center}",""])},1410:function(e,t,a){(e.exports=a(215)(!1)).push([e.i,"",""])},1704:function(e,t,a){var n=a(1279);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a(216)("25eefaea",n,!0)},1835:function(e,t,a){var n=a(1410);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a(216)("32e63e63",n,!0)},2087:function(e,t,a){a(1704);var n=a(98)(a(1124),a(2176),"data-v-214b717b",null);e.exports=n.exports},2176:function(e,t){e.exports={render:function(){var a=this,e=a.$createElement,n=a._self._c||e;return n("div",{staticClass:"packageSet"},[n("el-form",{attrs:{"label-position":a.labelPosition,"label-width":"60px",model:a.formLabelAlign}},[n("el-form-item",{attrs:{label:"卡券："}},[n("div",[n("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:a.ticketData,"max-height":"450",border:""},on:{"selection-change":a.handleSelectionChange}},[n("el-table-column",{attrs:{type:"selection",align:"center",width:"55"}}),a._v(" "),n("el-table-column",{attrs:{prop:"TickInfoCode",label:"券种编号",width:"min-120"}}),a._v(" "),n("el-table-column",{attrs:{prop:"TickName",label:"券名称","min-width":"120"}}),a._v(" "),n("el-table-column",{attrs:{prop:"FaceValue",label:"面值","min-width":"80"}}),a._v(" "),n("el-table-column",{attrs:{prop:"EndDate",label:"有效期","min-width":"120"},scopedSlots:a._u([{key:"default",fn:function(e){return[""!=e.row.PrdOfVal&&null!=e.row.PrdOfVal?n("span",[a._v(" "+a._s("售后"+e.row.PrdOfVal+"天"))]):n("div",[n("p",[a._v("开始："+a._s(e.row.StartDate&&e.row.StartDate.substr(0,10))+" ")]),a._v(" "),n("p",[a._v("结束："+a._s(e.row.EndDate&&e.row.EndDate.substr(0,10))+" ")])])]}}])}),a._v(" "),n("el-table-column",{attrs:{prop:"TicNum",label:"数量",width:"150"},scopedSlots:a._u([{key:"default",fn:function(t){return[n("el-input-number",{staticStyle:{width:"100%"},attrs:{size:"small",min:"1",controls:!1},model:{value:t.row.TicNum,callback:function(e){a.$set(t.row,"TicNum",e)},expression:"scope.row.TicNum"}})]}}])})],1)],1)])],1),a._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{type:"primary",loading:a.saveLoading},on:{click:a.sure}},[a._v("确 定")]),a._v(" "),n("el-button",{on:{click:a.cancel}},[a._v("取 消")])],1)],1)},staticRenderFns:[]}},2308:function(e,t){e.exports={render:function(){var a=this,e=a.$createElement,n=a._self._c||e;return n("div",{staticClass:"PackageSet selCommon"},[n("el-table",{staticStyle:{width:"100%"},attrs:{data:a.tableData,border:""}},[n("el-table-column",{attrs:{prop:"ConPacCode",label:"套餐编号","min-width":"150"}}),a._v(" "),n("el-table-column",{attrs:{prop:"ConPacName",label:"套餐名称","min-width":"120"}}),a._v(" "),n("el-table-column",{attrs:{prop:"GradeNo",label:"代理级别","min-width":"150"},scopedSlots:a._u([{key:"default",fn:function(e){return[a._v("\n                "+a._s(a._f("gradeFilter")(e.row.GradeNo,a.gradeList))+"\n            ")]}}])}),a._v(" "),n("el-table-column",{attrs:{prop:"Memo",label:"套餐备注","min-width":"220"}}),a._v(" "),n("el-table-column",{attrs:{prop:"JifenRecharge",label:"积分","min-width":"100"}}),a._v(" "),n("el-table-column",{attrs:{label:"操作","min-width":"200",align:"center"},scopedSlots:a._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){return a.editPac(t.$index,a.tableData)}}},[a._v("编辑")]),a._v(" "),n("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){return a.edit(t.$index,a.tableData)}}},[a._v("选择套餐券")]),a._v(" "),n("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(e){return a.deleteRow(t.$index,a.tableData,0)}}},[a._v("删除")])]}}])})],1),a._v(" "),n("el-table",{directives:[{name:"show",rawName:"v-show",value:a.show,expression:"show"}],staticStyle:{width:"100%"},attrs:{data:a.tableAdd,border:"","show-header":a.header}},[n("el-table-column",{attrs:{prop:"num",label:"套餐编号","min-width":"150"},scopedSlots:a._u([{key:"default",fn:function(e){return[n("span",{staticStyle:{color:"#999"}},[a._v(a._s(e.row.num))])]}}])}),a._v(" "),n("el-table-column",{attrs:{prop:"name",label:"套餐名称","min-width":"120"},scopedSlots:a._u([{key:"default",fn:function(t){return[n("el-input",{attrs:{placeholder:"套餐名称"},model:{value:t.row.conPacName,callback:function(e){a.$set(t.row,"conPacName",e)},expression:"scope.row.conPacName"}})]}}])}),a._v(" "),n("el-table-column",{attrs:{prop:"grade",label:"代理级别","min-width":"150"},scopedSlots:a._u([{key:"default",fn:function(t){return[n("el-select",{model:{value:t.row.gradeNo,callback:function(e){a.$set(t.row,"gradeNo",e)},expression:"scope.row.gradeNo"}},a._l(a.gradeList,function(e){return n("el-option",{key:e.Id,attrs:{label:e.BranchGradeName,value:e.Code}})}),1)]}}])}),a._v(" "),n("el-table-column",{attrs:{prop:"note",label:"套餐备注","min-width":"220"},scopedSlots:a._u([{key:"default",fn:function(t){return[n("el-input",{attrs:{placeholder:"备注"},model:{value:t.row.memo,callback:function(e){a.$set(t.row,"memo",e)},expression:"scope.row.memo"}})]}}])}),a._v(" "),n("el-table-column",{attrs:{prop:"JifenRecharge",label:"积分","min-width":"100"},scopedSlots:a._u([{key:"default",fn:function(t){return[n("el-input",{model:{value:t.row.jifenRecharge,callback:function(e){a.$set(t.row,"jifenRecharge",e)},expression:"scope.row.jifenRecharge"}})]}}])}),a._v(" "),n("el-table-column",{attrs:{label:"操作","min-width":"200",align:"center"},scopedSlots:a._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(e){return a.save(t.$index,a.tableAdd)}}},[a._v("保存")]),a._v(" "),n("el-button",{attrs:{type:"text"},on:{click:function(e){return a.deleteRow(t.$index,a.tableAdd,1)}}},[a._v("取消")])]}}])})],1),a._v(" "),n("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"primary",icon:"plus"},on:{click:function(e){return a.addPackage()}}},[a._v("添加套餐")]),a._v(" "),n("el-dialog",{attrs:{title:a.tittle,visible:a.dialogFormVisible1,size:""},on:{"update:visible":function(e){a.dialogFormVisible1=e}}},[n("el-form",{staticStyle:{width:"300px"},attrs:{"label-position":"right","label-width":"80px",model:a.formLabelAlign}},[n("el-form-item",{staticClass:"form_item_mt0",attrs:{label:"套餐名称："}},[n("el-input",{staticStyle:{width:"200px"},model:{value:a.formLabelAlign.ConPacName,callback:function(e){a.$set(a.formLabelAlign,"ConPacName",e)},expression:"formLabelAlign.ConPacName"}})],1),a._v(" "),n("el-form-item",{staticClass:"form_item_mt0",attrs:{label:"代理级别："}},[n("el-select",{staticStyle:{width:"200px"},model:{value:a.formLabelAlign.GradeNo,callback:function(e){a.$set(a.formLabelAlign,"GradeNo",e)},expression:"formLabelAlign.GradeNo"}},a._l(a.gradeList,function(e){return n("el-option",{key:e.Id,attrs:{label:e.BranchGradeName,value:e.Code}})}),1)],1),a._v(" "),n("el-form-item",{staticClass:"form_item_mt0",attrs:{label:"套餐备注："}},[n("el-input",{staticStyle:{width:"200px"},model:{value:a.formLabelAlign.Memo,callback:function(e){a.$set(a.formLabelAlign,"Memo",e)},expression:"formLabelAlign.Memo"}})],1),a._v(" "),n("el-form-item",{staticClass:"form_item_mt0",attrs:{label:"积分："}},[n("el-input",{staticStyle:{width:"200px"},model:{value:a.formLabelAlign.JifenRecharge,callback:function(e){a.$set(a.formLabelAlign,"JifenRecharge",e)},expression:"formLabelAlign.JifenRecharge"}})],1)],1),a._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{type:"primary",loading:a.saveLoading},on:{click:a.editSure}},[a._v("确 定")]),a._v(" "),n("el-button",{on:{click:a.cancel}},[a._v("取 消")])],1)],1),a._v(" "),n("el-dialog",{attrs:{title:a.tittle,visible:a.dialogFormVisible,size:""},on:{"update:visible":function(e){a.dialogFormVisible=e}}},[n("packageSet",{staticStyle:{width:"800px"},attrs:{packSub:a.packSub,ConPac:a.ConPac},on:{close:a.close}})],1)],1)},staticRenderFns:[]}},379:function(e,t,a){a(1835);var n=a(98)(a(1121),a(2308),"data-v-5eb84526",null);e.exports=n.exports}});