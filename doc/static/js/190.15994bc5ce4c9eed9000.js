webpackJsonp([190],{1129:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i(37),r=i.n(a),s=i(100),d=i.n(s),n=i(99),o=i.n(n),l=i(65),g=(i.n(l),i(22),i(64));e.default={data:function(){return{tableData:[],nodeData:["0","1","2","3","4","5","6"],gradeStrategyList:[],gradeStrategyModel:{},gradeStrategySettings:{method:"",visible:!1,editId:"",detailIndex:-1},gradeStrategySubList:[],gradeStrategySubModel:{},gradeStrategySubSettings:{method:"",visible:!1,editId:""}}},watch:{},computed:{},mounted:function(){this.GetGradeStrategy(),this.getBranchGradeAll()},methods:{getBranchGradeAll:function(){var a=this;return o()(d.a.mark(function t(){var e;return d.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,i.i(g._319)();case 3:e=t.sent,a.tableData=a.numOrder(e),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.log(t.t0);case 10:case"end":return t.stop()}},t,a,[[0,7]])}))()},AddGradeStrategy:function(e){var a=this;return o()(d.a.mark(function t(){return d.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,i.i(g._324)(e);case 3:t.sent.status?(a.$message({message:"添加成功",type:"success"}),a.gradeStrategyCancelAction(),a.GetGradeStrategy()):a.$message.error("添加失败"),t.next=11;break;case 7:t.prev=7,t.t0=t.catch(0),console.log(t.t0),a.$message.error("添加失败");case 11:case"end":return t.stop()}},t,a,[[0,7]])}))()},UpdateGradeStrategy:function(e){var a=this;return o()(d.a.mark(function t(){return d.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,i.i(g._325)(e);case 3:t.sent.status?(a.$message({message:"编辑成功",type:"success"}),a.gradeStrategyCancelAction(),a.GetGradeStrategy()):a.$message.error("编辑失败"),t.next=11;break;case 7:t.prev=7,t.t0=t.catch(0),console.log(t.t0),a.$message.error("编辑失败");case 11:case"end":return t.stop()}},t,a,[[0,7]])}))()},GetGradeStrategy:function(){var a=this;return o()(d.a.mark(function t(){var e;return d.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,i.i(g._326)();case 3:(e=t.sent).status?a.gradeStrategyList=e.data:a.$message.error("获取列表失败"),t.next=11;break;case 7:t.prev=7,t.t0=t.catch(0),console.log(t.t0),a.$message.error("获取列表失败");case 11:case"end":return t.stop()}},t,a,[[0,7]])}))()},GetGradeStrategyDetailById:function(s){var n=this;return o()(d.a.mark(function t(){var e,a,r;return d.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(-1===s)return t.abrupt("return");t.next=2;break;case 2:return t.prev=2,e=n.gradeStrategyList[s],a={id:e.id,typeId:e.typeId},t.next=7,i.i(g._327)(a);case 7:(r=t.sent).status?n.gradeStrategySubList=r.data.strategysSubEntitys:n.$message.error("获取列表失败"),t.next=15;break;case 11:t.prev=11,t.t0=t.catch(2),console.log(t.t0),n.$message.error("获取列表失败");case 15:case"end":return t.stop()}},t,n,[[2,11]])}))()},DeleteGradeStrategy:function(e){var a=this;return o()(d.a.mark(function t(){return d.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,i.i(g._328)(e);case 3:t.sent.status?(a.$message({message:"删除成功",type:"success"}),a.GetGradeStrategy()):a.$message.error("删除失败"),t.next=11;break;case 7:t.prev=7,t.t0=t.catch(0),console.log(t.t0),a.$message.error("删除失败");case 11:case"end":return t.stop()}},t,a,[[0,7]])}))()},AUGradeStrategySub:function(e){var a=this;return o()(d.a.mark(function t(){return d.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,i.i(g._329)(e);case 3:t.sent.status?(a.$message({message:"成功",type:"success"}),a.GetGradeStrategyDetailById(a.gradeStrategySettings.detailIndex),a.gradeStrategySubCancelAction()):a.$message.error("失败"),t.next=11;break;case 7:t.prev=7,t.t0=t.catch(0),console.log(t.t0),a.$message.error("失败");case 11:case"end":return t.stop()}},t,a,[[0,7]])}))()},numOrder:function(t){for(var e=t.length,a=0;a<e-1;a++)for(var r=a+1;r<e;r++)if(t[a].OrderNum>t[r].OrderNum){var s=t[a];t[a]=t[r],t[r]=s}return t},gradeStrategyAddAction:function(){this.gradeStrategySettings.method="NEW",this.gradeStrategySettings.visible=!0},gradeStrategyIssueAction:function(){console.log(this.gradeStrategyModel),"NEW"===this.gradeStrategySettings.method?this.AddGradeStrategy(this.gradeStrategyModel):"EDIT"===this.gradeStrategySettings.method&&(this.gradeStrategyModel.id=this.gradeStrategySettings.editId,this.UpdateGradeStrategy(this.gradeStrategyModel))},gradeStrategyCancelAction:function(){this.$refs.gradeStrategyModel.resetFields(),this.gradeStrategyModel={},this.gradeStrategySettings.visible=!1},gradeStrategyEdit:function(t){this.gradeStrategySettings.method="EDIT",this.gradeStrategySettings.editId=this.gradeStrategyList[t].id,this.gradeStrategyModel=this.gradeStrategyList[t],this.gradeStrategySettings.visible=!0},gradeStrategyDelete:function(t){this.DeleteGradeStrategy({id:this.gradeStrategyList[t].id})},gradeStrategyDetail:function(t){this.gradeStrategySettings.detailIndex=t,this.GetGradeStrategyDetailById(t)},gradeStrategySubAddAction:function(){this.gradeStrategySubSettings.method="NEW";var t=this.gradeStrategyList[this.gradeStrategySettings.detailIndex];this.gradeStrategySubModel.typeId=t.typeId,this.gradeStrategySubModel.typeName=t.typeName,this.gradeStrategySubSettings.visible=!0},gradeStrategySubIssueAction:function(){console.log(this.gradeStrategySubModel),"NEW"===this.gradeStrategySubSettings.method?(this.gradeStrategySubModel.jsonStr=r()(this.gradeStrategySubModel),this.AUGradeStrategySub(this.gradeStrategySubModel)):"EDIT"===this.gradeStrategySubSettings.method&&(this.gradeStrategySubModel.id=this.gradeStrategySubSettings.editId,this.gradeStrategySubModel.jsonStr=r()(this.gradeStrategySubModel),this.AUGradeStrategySub(this.gradeStrategySubModel))},gradeStrategySubCancelAction:function(){this.$refs.gradeStrategySubModel.resetFields(),this.gradeStrategySubModel={},this.gradeStrategySubSettings.visible=!1},gradeStrategySubEdit:function(t){this.gradeStrategySubSettings.method="EDIT",this.gradeStrategySubSettings.editId=this.gradeStrategySubList[t].id,this.gradeStrategySubModel=this.gradeStrategySubList[t],this.gradeStrategySubSettings.visible=!0},gradeStrategySubDelete:function(t){this.AUGradeStrategySub({id:this.gradeStrategySubList[t].id})}},components:{}}},1412:function(t,e,a){(t.exports=a(215)(!1)).push([t.i,".dialog-footer[data-v-60460690]{text-align:center}.table_container[data-v-60460690]{width:100%;margin-top:20px}.demo-ruleForm[data-v-60460690]{min-width:400px;max-width:600px}.form_item[data-v-60460690]{width:200px}",""])},1837:function(t,e,a){var r=a(1412);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a(216)("70146046",r,!0)},2310:function(t,e){t.exports={render:function(){var a=this,t=a.$createElement,r=a._self._c||t;return r("div",{staticClass:"gradeStrategy selCommon"},[r("div",{staticClass:"table_container"},[r("el-table",{ref:"gradeStrategyListTable",staticStyle:{width:"100%"},attrs:{data:a.gradeStrategyList,"max-height":"450",border:""}},[r("el-table-column",{attrs:{prop:"",label:"类型Id","min-width":"100"},scopedSlots:a._u([{key:"default",fn:function(t){return[r("span",[a._v(a._s(t.row.typeId))])]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"",label:"类型名称","min-width":"100"},scopedSlots:a._u([{key:"default",fn:function(t){return[r("span",[a._v(a._s(t.row.typeName))])]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"",label:"佣金层次","min-width":"100"},scopedSlots:a._u([{key:"default",fn:function(t){return[r("span",[a._v(a._s(t.row.nodes))])]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"",label:"操作","min-width":"170"},scopedSlots:a._u([{key:"default",fn:function(e){return[r("el-button",{attrs:{size:"small",type:"primary",icon:"edit"},on:{click:function(t){return a.gradeStrategyEdit(e.$index)}}},[a._v("编辑")]),a._v(" "),a.gradeStrategySettings.detailIndex===e.$index?r("el-button",{attrs:{size:"small",type:"info"},on:{click:function(t){return a.gradeStrategyDetail(e.$index)}}},[a._v("子策略")]):a._e(),a._v(" "),a.gradeStrategySettings.detailIndex!==e.$index?r("el-button",{attrs:{size:"small",type:"info",plain:""},on:{click:function(t){return a.gradeStrategyDetail(e.$index)}}},[a._v("子策略")]):a._e()]}}])})],1),a._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:a.gradeStrategyAddAction}},[a._v("添加")])],1),a._v(" "),r("el-dialog",{attrs:{title:"NEW"===a.gradeStrategySettings.method?"添加":"编辑",visible:a.gradeStrategySettings.visible,size:""},on:{"update:visible":function(t){return a.$set(a.gradeStrategySettings,"visible",t)}}},[a.gradeStrategySettings.visible?r("el-form",{ref:"gradeStrategyModel",staticClass:"demo-ruleForm",attrs:{model:a.gradeStrategyModel,"label-width":"110px"}},[r("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"类型Id："}},[r("el-input",{staticClass:"form_item",attrs:{type:"number"},model:{value:a.gradeStrategyModel.typeId,callback:function(t){a.$set(a.gradeStrategyModel,"typeId",t)},expression:"gradeStrategyModel.typeId"}})],1),a._v(" "),r("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"类型名称："}},[r("el-input",{staticClass:"form_item",attrs:{maxlength:"20"},model:{value:a.gradeStrategyModel.typeName,callback:function(t){a.$set(a.gradeStrategyModel,"typeName",t)},expression:"gradeStrategyModel.typeName"}})],1),a._v(" "),r("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"佣金层次："}},[r("el-input",{staticClass:"form_item",attrs:{type:"number"},model:{value:a.gradeStrategyModel.nodes,callback:function(t){a.$set(a.gradeStrategyModel,"nodes",t)},expression:"gradeStrategyModel.nodes"}})],1)],1):a._e(),a._v(" "),r("div",{staticClass:"el-dialog__footer "},[r("el-button",{attrs:{type:"primary"},on:{click:function(t){return a.gradeStrategyIssueAction()}}},[a._v("确定")]),a._v(" "),r("el-button",{on:{click:function(t){return a.gradeStrategyCancelAction()}}},[a._v("取消")])],1)],1),a._v(" "),-1!==a.gradeStrategySettings.detailIndex?r("div",{staticClass:"table_container",staticStyle:{"margin-bottom":"40px"}},[r("el-table",{ref:"gradeStrategySubListTable",staticStyle:{width:"100%"},attrs:{data:a.gradeStrategySubList,"max-height":"450",border:""}},[r("el-table-column",{attrs:{prop:"",label:"类型名称","min-width":"100"},scopedSlots:a._u([{key:"default",fn:function(t){return[r("span",[a._v(a._s(t.row.typeName))])]}}],null,!1,249855033)}),a._v(" "),r("el-table-column",{attrs:{prop:"",label:"节点次序","min-width":"100"},scopedSlots:a._u([{key:"default",fn:function(t){return[r("span",[a._v(a._s(t.row.nodeNumber))])]}}],null,!1,1775801925)}),a._v(" "),r("el-table-column",{attrs:{prop:"",label:"节点等级","min-width":"100"},scopedSlots:a._u([{key:"default",fn:function(t){return[r("span",[a._v(a._s(t.row.branchGradeName))])]}}],null,!1,4181211232)}),a._v(" "),r("el-table-column",{attrs:{prop:"",label:"等级顺序","min-width":"100"},scopedSlots:a._u([{key:"default",fn:function(t){return[r("span",[a._v(a._s(t.row.restrictionBranchOrderNum))])]}}],null,!1,727391070)}),a._v(" "),r("el-table-column",{attrs:{prop:"",label:"佣金","min-width":"100"},scopedSlots:a._u([{key:"default",fn:function(t){return[r("span",[a._v(a._s(t.row.reward)+"%")])]}}],null,!1,3913469279)}),a._v(" "),r("el-table-column",{attrs:{prop:"",label:"操作","min-width":"170"},scopedSlots:a._u([{key:"default",fn:function(e){return[r("el-button",{attrs:{size:"small",type:"primary",icon:"edit"},on:{click:function(t){return a.gradeStrategySubEdit(e.$index)}}},[a._v("编辑")]),a._v(" "),r("el-button",{attrs:{size:"small",icon:"delete"},on:{click:function(t){return a.gradeStrategySubDelete(e.$index)}}},[a._v("删除")])]}}],null,!1,3607647217)})],1),a._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:a.gradeStrategySubAddAction}},[a._v("添加")])],1):a._e(),a._v(" "),r("el-dialog",{attrs:{title:"NEW"===a.gradeStrategySubSettings.method?"添加":"编辑",visible:a.gradeStrategySubSettings.visible,size:""},on:{"update:visible":function(t){return a.$set(a.gradeStrategySubSettings,"visible",t)}}},[a.gradeStrategySubSettings.visible?r("el-form",{ref:"gradeStrategySubModel",staticClass:"demo-ruleForm",attrs:{model:a.gradeStrategySubModel,"label-width":"110px"}},[r("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"类型名称："}},[r("el-input",{staticClass:"form_item",attrs:{disabled:""},model:{value:a.gradeStrategySubModel.typeName,callback:function(t){a.$set(a.gradeStrategySubModel,"typeName",t)},expression:"gradeStrategySubModel.typeName"}})],1),a._v(" "),r("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"节点次序："}},[r("el-select",{staticClass:"form_item",model:{value:a.gradeStrategySubModel.nodeNumber,callback:function(t){a.$set(a.gradeStrategySubModel,"nodeNumber",t)},expression:"gradeStrategySubModel.nodeNumber"}},a._l(a.nodeData,function(t){return r("el-option",{key:t,attrs:{label:t,value:t}})}),1)],1),a._v(" "),r("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"节点等级："}},[r("el-select",{staticClass:"form_item",model:{value:a.gradeStrategySubModel.gradeCode,callback:function(t){a.$set(a.gradeStrategySubModel,"gradeCode",t)},expression:"gradeStrategySubModel.gradeCode"}},a._l(a.tableData,function(t){return r("el-option",{key:t.Id,attrs:{label:t.BranchGradeName,value:t.Code}})}),1)],1),a._v(" "),r("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"等级顺序："}},[r("el-input",{staticClass:"form_item",attrs:{type:"number"},model:{value:a.gradeStrategySubModel.restrictionBranchOrderNum,callback:function(t){a.$set(a.gradeStrategySubModel,"restrictionBranchOrderNum",t)},expression:"gradeStrategySubModel.restrictionBranchOrderNum"}})],1),a._v(" "),r("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"佣金："}},[r("el-input",{staticClass:"form_item",attrs:{type:"number"},model:{value:a.gradeStrategySubModel.reward,callback:function(t){a.$set(a.gradeStrategySubModel,"reward",t)},expression:"gradeStrategySubModel.reward"}},[r("template",{slot:"append"},[a._v("%")])],2)],1)],1):a._e(),a._v(" "),r("div",{staticClass:"el-dialog__footer "},[r("el-button",{attrs:{type:"primary"},on:{click:function(t){return a.gradeStrategySubIssueAction()}}},[a._v("确定")]),a._v(" "),r("el-button",{on:{click:function(t){return a.gradeStrategySubCancelAction()}}},[a._v("取消")])],1)],1)],1)},staticRenderFns:[]}},385:function(t,e,a){a(1837);var r=a(98)(a(1129),a(2310),"data-v-60460690",null);t.exports=r.exports}});