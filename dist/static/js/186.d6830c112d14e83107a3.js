webpackJsonp([186],{1135:function(e,a,r){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var t=r(100),s=r.n(t),i=r(99),l=r.n(i),n=r(65),d=(r.n(n),r(22),r(64));a.default={data:function(){return{tableData:[],catelogData:[],nodeData:["0","1","2","3","4","5","6"],gradeSpecialRewardsList:[],gradeSpecialRewardsModel:{},gradeSpecialRewardsSettings:{method:"",visible:!1,editId:""},gradeSpecialRewardsPage:{total:0,current:1,size:10}}},watch:{},computed:{},mounted:function(){this.getBranchGradeAll(),this.GetCatelogByColumnCode(),this.GetGradeSpecialRewards()},methods:{getBranchGradeAll:function(){var t=this;return l()(s.a.mark(function e(){var a;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.i(d._319)();case 3:a=e.sent,t.tableData=t.numOrder(a),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}},e,t,[[0,7]])}))()},AddGradeSpecialRewards:function(a){var t=this;return l()(s.a.mark(function e(){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.i(d._320)(a);case 3:e.sent.status?(t.$message({message:"添加成功",type:"success"}),t.gradeSpecialRewardsCancelAction(),t.GetGradeSpecialRewards()):t.$message.error("添加失败"),e.next=11;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0),t.$message.error("添加失败");case 11:case"end":return e.stop()}},e,t,[[0,7]])}))()},UpdateGradeSpecialRewards:function(a){var t=this;return l()(s.a.mark(function e(){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.i(d._321)(a);case 3:e.sent.status?(t.$message({message:"编辑成功",type:"success"}),t.gradeSpecialRewardsCancelAction(),t.GetGradeSpecialRewards()):t.$message.error("编辑失败"),e.next=11;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0),t.$message.error("编辑失败");case 11:case"end":return e.stop()}},e,t,[[0,7]])}))()},GetGradeSpecialRewards:function(){var t=this;return l()(s.a.mark(function e(){var a;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.i(d._322)({pageIndex:t.gradeSpecialRewardsPage.current,pageSize:t.gradeSpecialRewardsPage.size});case 3:(a=e.sent).status?(t.gradeSpecialRewardsList=a.data,t.gradeSpecialRewardsPage.total=a.count):t.$message.error("获取列表失败"),e.next=11;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0),t.$message.error("获取列表失败");case 11:case"end":return e.stop()}},e,t,[[0,7]])}))()},DeleteGradeSpecialRewards:function(a){var t=this;return l()(s.a.mark(function e(){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.i(d._323)(a);case 3:e.sent.status?(t.$message({message:"删除成功",type:"success"}),t.GetGradeSpecialRewards()):t.$message.error("删除失败"),e.next=11;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0),t.$message.error("删除失败");case 11:case"end":return e.stop()}},e,t,[[0,7]])}))()},GetCatelogByColumnCode:function(){var t=this;return l()(s.a.mark(function e(){var a;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.i(d._207)({code:100});case 3:a=e.sent,t.catelogData=a.data,e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}},e,t,[[0,7]])}))()},numOrder:function(e){for(var a=e.length,t=0;t<a-1;t++)for(var r=t+1;r<a;r++)if(e[t].OrderNum>e[r].OrderNum){var s=e[t];e[t]=e[r],e[r]=s}return e},gradeSpecialRewardsAddAction:function(){this.gradeSpecialRewardsSettings.method="NEW",this.gradeSpecialRewardsSettings.visible=!0},gradeSpecialRewardsIssueAction:function(){console.log(this.gradeSpecialRewardsModel),"NEW"===this.gradeSpecialRewardsSettings.method?this.AddGradeSpecialRewards(this.gradeSpecialRewardsModel):"EDIT"===this.gradeSpecialRewardsSettings.method&&(this.gradeSpecialRewardsModel.id=this.gradeSpecialRewardsSettings.editId,this.UpdateGradeSpecialRewards(this.gradeSpecialRewardsModel))},gradeSpecialRewardsCancelAction:function(){this.$refs.gradeSpecialRewardsModel.resetFields(),this.gradeSpecialRewardsModel={},this.gradeSpecialRewardsSettings.visible=!1},gradeSpecialRewardsEdit:function(e){this.gradeSpecialRewardsSettings.method="EDIT",this.gradeSpecialRewardsSettings.editId=this.gradeSpecialRewardsList[e].id,this.gradeSpecialRewardsModel=this.gradeSpecialRewardsList[e],this.gradeSpecialRewardsSettings.visible=!0},gradeSpecialRewardsDelete:function(e){this.DeleteGradeSpecialRewards({id:this.gradeSpecialRewardsList[e].id})},handleSizeChange:function(e){e!==this.gradeSpecialRewardsPage.size&&(this.gradeSpecialRewardsPage.size=e,this.GetGradeSpecialRewards())},handleCurrentChange:function(e){e!==this.gradeSpecialRewardsPage.current&&(this.gradeSpecialRewardsPage.current=e,this.GetGradeSpecialRewards())}},components:{}}},1504:function(e,a,t){(e.exports=t(215)(!1)).push([e.i,".dialog-footer[data-v-ca534e1c]{text-align:center}.table_container[data-v-ca534e1c]{width:100%;margin-top:20px}.demo-ruleForm[data-v-ca534e1c]{min-width:400px;max-width:600px}.form_item[data-v-ca534e1c]{width:200px}",""])},1929:function(e,a,t){var r=t(1504);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);t(216)("304737d5",r,!0)},2404:function(e,a){e.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"gradeStrategy selCommon"},[r("div",{staticClass:"table_container"},[r("el-table",{ref:"gradeSpecialRewardsListTable",staticStyle:{width:"100%"},attrs:{data:t.gradeSpecialRewardsList,"max-height":"450",border:""}},[r("el-table-column",{attrs:{prop:"",label:"规则类型","min-width":"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("span",[t._v(t._s(e.row.catalogName))])]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"",label:"节点名称","min-width":"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("span",[t._v(t._s(e.row.nodeNumber))])]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"",label:"等级名称","min-width":"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("span",[t._v(t._s(e.row.branchGradeName))])]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"",label:"等级顺序","min-width":"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("span",[t._v(t._s(e.row.restrictionBranchOrderNum))])]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"",label:"佣金","min-width":"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("span",[t._v(t._s(e.row.reward)+"%")])]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"",label:"操作","min-width":"170"},scopedSlots:t._u([{key:"default",fn:function(a){return[r("el-button",{attrs:{size:"small",type:"primary",icon:"edit"},on:{click:function(e){return t.gradeSpecialRewardsEdit(a.$index)}}},[t._v("编辑")]),t._v(" "),r("el-button",{attrs:{size:"small",icon:"delete"},on:{click:function(e){return t.gradeSpecialRewardsDelete(a.$index)}}},[t._v("删除")])]}}])})],1),t._v(" "),r("el-pagination",{attrs:{"current-page":t.gradeSpecialRewardsPage.current,"page-sizes":[10,20,30],"page-size":t.gradeSpecialRewardsPage.size,layout:"total, sizes, prev, pager, next, jumper",total:t.gradeSpecialRewardsPage.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}}),t._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:t.gradeSpecialRewardsAddAction}},[t._v("添加")])],1),t._v(" "),r("el-dialog",{attrs:{title:"NEW"===t.gradeSpecialRewardsSettings.method?"添加":"编辑",visible:t.gradeSpecialRewardsSettings.visible,size:""},on:{"update:visible":function(e){return t.$set(t.gradeSpecialRewardsSettings,"visible",e)}}},[t.gradeSpecialRewardsSettings.visible?r("el-form",{ref:"gradeSpecialRewardsModel",staticClass:"demo-ruleForm",attrs:{model:t.gradeSpecialRewardsModel,"label-width":"110px"}},[r("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"规则类型："}},[r("el-select",{attrs:{filterable:"",placeholder:"请选择"},model:{value:t.gradeSpecialRewardsModel.code,callback:function(e){t.$set(t.gradeSpecialRewardsModel,"code",e)},expression:"gradeSpecialRewardsModel.code"}},t._l(t.catelogData,function(e){return r("el-option",{key:e.catalogPath,attrs:{label:e.name,value:e.catalogPath}})}),1)],1),t._v(" "),r("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"节点名称："}},[r("el-select",{staticClass:"form_item",model:{value:t.gradeSpecialRewardsModel.nodeNumber,callback:function(e){t.$set(t.gradeSpecialRewardsModel,"nodeNumber",e)},expression:"gradeSpecialRewardsModel.nodeNumber"}},t._l(t.nodeData,function(e){return r("el-option",{key:e,attrs:{label:e,value:e}})}),1)],1),t._v(" "),r("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"等级名称："}},[r("el-select",{staticClass:"form_item",model:{value:t.gradeSpecialRewardsModel.gradeCode,callback:function(e){t.$set(t.gradeSpecialRewardsModel,"gradeCode",e)},expression:"gradeSpecialRewardsModel.gradeCode"}},t._l(t.tableData,function(e){return r("el-option",{key:e.Id,attrs:{label:e.BranchGradeName,value:e.Code}})}),1)],1),t._v(" "),r("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"等级顺序："}},[r("el-input",{staticClass:"form_item",attrs:{type:"number"},model:{value:t.gradeSpecialRewardsModel.restrictionBranchOrderNum,callback:function(e){t.$set(t.gradeSpecialRewardsModel,"restrictionBranchOrderNum",e)},expression:"gradeSpecialRewardsModel.restrictionBranchOrderNum"}})],1),t._v(" "),r("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"佣金："}},[r("el-input",{staticClass:"form_item",attrs:{type:"number"},model:{value:t.gradeSpecialRewardsModel.reward,callback:function(e){t.$set(t.gradeSpecialRewardsModel,"reward",e)},expression:"gradeSpecialRewardsModel.reward"}},[r("template",{slot:"append"},[t._v("%")])],2)],1)],1):t._e(),t._v(" "),r("div",{staticClass:"el-dialog__footer "},[r("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.gradeSpecialRewardsIssueAction()}}},[t._v("确定")]),t._v(" "),r("el-button",{on:{click:function(e){return t.gradeSpecialRewardsCancelAction()}}},[t._v("取消")])],1)],1)],1)},staticRenderFns:[]}},391:function(e,a,t){t(1929);var r=t(98)(t(1135),t(2404),"data-v-ca534e1c",null);e.exports=r.exports}});