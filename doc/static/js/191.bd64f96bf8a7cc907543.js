webpackJsonp([191],{1127:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=i(37),a=i.n(r),n=i(100),s=i.n(n),o=i(99),l=i.n(o),c=(i(101),i(65)),u=(i.n(c),i(22)),m=i(64);e.default={data:function(){return{date:"",loading:!1,title:"",addGrade:!1,total:0,size:10,currentPage:1,ruleForm:{gradeName:"",priorities:"",extractRatio:0},tableData:[],edit:!1}},computed:{},mounted:function(){var t=new Date;t=t.setDate(1),this.date=[t,new Date],this.onSubmit()},methods:{submitForm:function(){this.edit?this.AddNewGrade(this.ruleForm):this.AddNewGrade({gradeName:this.ruleForm.gradeName,priorities:this.ruleForm.priorities,extractRatio:this.ruleForm.extractRatio,remark:"",submitUserId:i.i(u.b)("userId"),submitUserName:i.i(u.b)("userName")})},resetForm:function(){this.ruleForm={gradeName:"",priorities:"",extractRatio:0}},dateChange:function(t){t?(t=t.formatDates(),this.formInline.startDate=t.substring(0,10),this.formInline.endDate=t.substring(13)):(this.formInline.startDate="",this.formInline.endDate="")},GetGradeList:function(){var r=this;return l()(s.a.mark(function t(){var e;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,r.loading=!0,t.next=4,i.i(m._95)();case 4:e=t.sent,r.tableData=e.data,r.total=e.count,r.loading=!1,t.next=13;break;case 10:t.prev=10,t.t0=t.catch(0),console.log(t.t0);case 13:case"end":return t.stop()}},t,r,[[0,10]])}))()},AddNewGrade:function(r){var a=this;return l()(s.a.mark(function t(){var e;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e=void 0,a.edit)return t.next=4,i.i(m._103)(r);t.next=8;break;case 4:e=t.sent,a.showMes(e,"编辑"),t.next=12;break;case 8:return t.next=10,i.i(m._104)(r);case 10:e=t.sent,a.showMes(e,"添加");case 12:case"end":return t.stop()}},t,a)}))()},showMes:function(t,e){t.status?(this.$message({message:e+"成功",type:"success"}),this.addGrade=!1,this.search()):this.$message.error(e+"失败"+t.errorMessage)},DeleteGrade:function(r){var a=this;return l()(s.a.mark(function t(){var e;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.i(m._105)({id:r});case 2:e=t.sent,a.showMes(e,"删除");case 4:case"end":return t.stop()}},t,a)}))()},delGrade:function(t){var e=this;this.$confirm("是否删除本条等级数据?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.DeleteGrade(t)})},onSubmit:function(){this.currentPage=1,this.search()},search:function(){this.GetGradeList()},handleSizeChange:function(t){this.size=t,this.search()},handleCurrentChange:function(t){this.currentPage=t,this.search()},changeGrade:function(t,e,r){this.edit=r,this.addGrade=!0,this.title=e,t&&(this.ruleForm=JSON.parse(a()(t)))}},components:{}}},1499:function(t,e,r){(t.exports=r(215)(!1)).push([t.i,"",""])},1924:function(t,e,r){var a=r(1499);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);r(216)("739cf398",a,!0)},2399:function(t,e){t.exports={render:function(){var r=this,t=r.$createElement,a=r._self._c||t;return a("div",{staticClass:"tag selCommon"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:r.loading,expression:"loading"}],staticClass:"smt min_table",staticStyle:{width:"600px","margin-top":"15px","margin-bottom":"10px"},attrs:{data:r.tableData,border:"","max-height":"560"}},[a("el-table-column",{attrs:{prop:"gradeName",label:"等级名称","min-width":"90"}}),r._v(" "),a("el-table-column",{attrs:{prop:"priorities",label:"优先级","min-width":"90"}}),r._v(" "),a("el-table-column",{attrs:{prop:"extractRatio",label:"提成比例%","min-width":"90"}}),r._v(" "),a("el-table-column",{attrs:{prop:"quantityOut",label:"操作","min-width":"120"},scopedSlots:r._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(t){return r.changeGrade(e.row,"修改等级",!0)}}},[r._v("修改等级")]),r._v(" "),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(t){return r.delGrade(e.row.id)}}},[r._v("删除等级")])]}}])})],1),r._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return r.changeGrade("","添加等级",!1)}}},[r._v("添加等级")]),r._v(" "),a("el-dialog",{attrs:{title:r.title,visible:r.addGrade,size:""},on:{"update:visible":function(t){r.addGrade=t}}},[a("el-form",{ref:"ruleForm2",staticClass:"demo-ruleForm",attrs:{model:r.ruleForm,"label-width":"80px"}},[a("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"等级名称",prop:"pass"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{"auto-complete":"off"},model:{value:r.ruleForm.gradeName,callback:function(t){r.$set(r.ruleForm,"gradeName",t)},expression:"ruleForm.gradeName"}})],1),r._v(" "),a("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"优先级",prop:"checkPass"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{"auto-complete":"off"},model:{value:r.ruleForm.priorities,callback:function(t){r.$set(r.ruleForm,"priorities",t)},expression:"ruleForm.priorities"}})],1),r._v(" "),a("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"提成比例",prop:"age"}},[a("el-input",{staticStyle:{width:"200px"},model:{value:r.ruleForm.extractRatio,callback:function(t){r.$set(r.ruleForm,"extractRatio",r._n(t))},expression:"ruleForm.extractRatio"}}),r._v("%\n            ")],1),r._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return r.submitForm("ruleForm")}}},[r._v("提交")]),r._v(" "),a("el-button",{on:{click:function(t){return r.resetForm("ruleForm")}}},[r._v("重置")])],1)],1)],1)],1)},staticRenderFns:[]}},383:function(t,e,r){r(1924);var a=r(98)(r(1127),r(2399),"data-v-bf1cf14a",null);t.exports=a.exports}});