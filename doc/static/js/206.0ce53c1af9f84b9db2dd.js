webpackJsonp([206],{1035:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r(37),s=r.n(a),n=r(100),o=r.n(n),i=r(99),l=r.n(i),c=r(65),u=(r.n(c),r(64));t.default={data:function(){return{saveLoading:!1,searMes:"",selectList:[],selectMes:[],attr_radio:"",tittle:"",currentPage4:1,dialogFormVisible:!1,formLabelWidth:"100px",form:{name:"",EnterWay:""},tableData3:[],multipleSelection:[]}},mounted:function(){this.getProperty({keywords:""})},computed:{},watch:{searMes:function(){this.search()},"form.EnterWay":{handler:function(){},deep:!0}},methods:{addProperty:function(a){var s=this;return l()(o.a.mark(function e(){var t;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,s.saveLoading=!0,e.next=4,r.i(u._549)(a);case 4:(t=e.sent).success?(s.$message({message:"添加成功",type:"success"}),s.dialogFormVisible=!1,s.form={},s.getProperty({keywords:""})):s.$message.error("添加失败"+t.errorMessage),s.saveLoading=!1,e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),console.log("添加数据数据失败",e.t0),s.$message.error("添加失败");case 13:case"end":return e.stop()}},e,s,[[0,9]])}))()},getProperty:function(a){var s=this;return l()(o.a.mark(function e(){var t;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.i(u._550)(a);case 3:t=e.sent,s.tableData3=t,e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log("添加数据数据失败",e.t0);case 10:case"end":return e.stop()}},e,s,[[0,7]])}))()},DeleteProperty:function(t){var a=this;return l()(o.a.mark(function e(){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.i(u._551)(t);case 3:e.sent.success&&(a.$message({message:"删除成功",type:"success"}),a.getProperty({keywords:""})),e.next=11;break;case 7:e.prev=7,e.t0=e.catch(0),console.log("添加数据数据失败",e.t0),a.$message.error("删除失败");case 11:case"end":return e.stop()}},e,a,[[0,7]])}))()},updateProperty:function(t){var a=this;return l()(o.a.mark(function e(){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a.saveLoading=!0,e.next=4,r.i(u._552)(t);case 4:e.sent.success&&(a.$message({message:"更新成功",type:"success"}),a.dialogFormVisible=!1,a.getProperty({keywords:""})),a.saveLoading=!1,e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),console.log("添加数据数据失败",e.t0),a.$message.error("更新失败");case 13:case"end":return e.stop()}},e,a,[[0,9]])}))()},search:function(){this.getProperty({keywords:this.searMes.removeSP()})},handleSizeChange:function(e){console.log("每页 "+e+" 条")},handleCurrentChange:function(e){console.log("当前页: "+e)},down:function(e){13==e.keyCode&&this.search()},addAttributes:function(){this.tittle="添加属性",this.selectList=[],this.dialogFormVisible=!0,this.form={name:"",EnterWay:""},this.$refs.multipleTable.setCurrentRow()},handleCurrentChange1:function(e){this.currentRow=e},edit:function(e,t){this.selectMes="",this.tittle="编辑属性",this.selectList=[],this.dialogFormVisible=!0,this.form=JSON.parse(s()(t[e])),t[e].TextValue&&""!=t[e].TextValue&&(this.selectList=t[e].TextValue.split(","))},deleteRow:function(e,t){var a=this;this.$confirm("此操作将删除该属性, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){a.DeleteProperty({id:t[e].Id})}).catch(function(){})},addAttr:function(){this.selectList.push(this.selectMes),this.selectMes=""},deleteAttr:function(e){this.selectList.splice(e,1)},save:function(){if("添加属性"==this.tittle)""==this.selectMes||this.selectList.push(this.selectMes),this.addProperty({name:this.form.Name,textValue:this.selectList,EnterWay:this.form.EnterWay});else{var e="";e=1==this.form.EnterWay?"":this.selectList,this.updateProperty({id:this.form.Id,name:this.form.Name,code:this.form.Code,enterWay:this.form.EnterWay,textValue:e})}},handleRadioChange:function(){}}}},1219:function(e,t,a){(e.exports=a(215)(!1)).push([e.i,".clear[data-v-0312a0f4]{clear:both}.block[data-v-0312a0f4]{float:right}.scale[data-v-0312a0f4]{cursor:pointer;-webkit-transform:scale(.7);transform:scale(.7)}.scale[data-v-0312a0f4]:hover{color:#00a0e9}.select_list[data-v-0312a0f4]{float:left;width:100%;height:30px;border-bottom:1px solid #bfcbd9}.optional_list[data-v-0312a0f4]{min-height:60px;width:300px;padding:10px;background-color:#fff;border-radius:4px;border:1px solid #bfcbd9}",""])},1644:function(e,t,a){var s=a(1219);"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);a(216)("4e8bbd02",s,!0)},2115:function(e,t){e.exports={render:function(){var a=this,e=a.$createElement,s=a._self._c||e;return s("div",{staticClass:"AttributeList selCommon"},[s("div",{staticClass:"clear"},[s("input",{directives:[{name:"model",rawName:"v-model",value:a.searMes,expression:"searMes"}],staticClass:"self_ipt",staticStyle:{"margin-bottom":"10px"},attrs:{type:"text",placeholder:"搜索"},domProps:{value:a.searMes},on:{input:function(e){e.target.composing||(a.searMes=e.target.value)}},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&a._k(e.keyCode,"enter",13,e.key,"Enter")?null:a.search(e)}}}),a._v(" "),s("el-button",{staticClass:"searchBtn",attrs:{type:"primary"},on:{click:a.search}},[a._v("搜索")]),a._v(" "),s("el-button",{staticClass:"searchBtn",attrs:{type:"primary"},on:{click:a.addAttributes}},[a._v("添加属性")]),a._v(" "),s("el-table",{ref:"multipleTable",staticStyle:{width:"100%","margin-bottom":"20px"},attrs:{data:a.tableData3,border:"","tooltip-effect":"dark","max-height":"500px","highlight-current-row":""},on:{"current-change":a.handleCurrentChange1}},[s("el-table-column",{attrs:{type:"index",width:"70"}}),a._v(" "),s("el-table-column",{attrs:{prop:"Code",label:"编号",width:"65"}}),a._v(" "),s("el-table-column",{attrs:{label:"属性名称","min-width":"120"},scopedSlots:a._u([{key:"default",fn:function(e){return[a._v(a._s(e.row.Name))]}}])}),a._v(" "),s("el-table-column",{attrs:{prop:"EnterWay",label:"属性值的录入方式","min-width":"80"},scopedSlots:a._u([{key:"default",fn:function(e){return[1==e.row.EnterWay?s("span",[a._v("文本框")]):a._e(),a._v(" "),2==e.row.EnterWay?s("span",[a._v("下拉框")]):a._e(),a._v(" "),3==e.row.EnterWay?s("span",[a._v("多选")]):a._e()]}}])}),a._v(" "),s("el-table-column",{attrs:{prop:"TextValue","min-width":"300",label:"可选值列表"},scopedSlots:a._u([{key:"default",fn:function(e){return[s("span",[a._v(a._s(e.row.TextValue))])]}}])}),a._v(" "),s("el-table-column",{attrs:{label:"操作","min-width":"120"},scopedSlots:a._u([{key:"default",fn:function(t){return[s("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){return a.edit(t.$index,a.tableData3)}}},[a._v("编辑")]),a._v(" "),s("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){return a.deleteRow(t.$index,a.tableData3)}}},[a._v("删除")])]}}])})],1),a._v(" "),s("el-dialog",{attrs:{title:a.tittle,visible:a.dialogFormVisible,size:""},on:{"update:visible":function(e){a.dialogFormVisible=e}}},[s("el-form",{staticStyle:{width:"550px"},attrs:{model:a.form}},[s("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"属性名称：","label-width":a.formLabelWidth}},[s("el-input",{staticStyle:{width:"300px"},model:{value:a.form.Name,callback:function(e){a.$set(a.form,"Name",e)},expression:"form.Name"}})],1),a._v(" "),s("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"录入方式：","label-width":a.formLabelWidth}},[s("el-radio-group",{on:{change:a.handleRadioChange},model:{value:a.form.EnterWay,callback:function(e){a.$set(a.form,"EnterWay",e)},expression:"form.EnterWay"}},[s("el-radio",{attrs:{label:1}},[a._v("输入框")]),a._v(" "),s("el-radio",{attrs:{label:2}},[a._v("下拉框")]),a._v(" "),s("el-radio",{attrs:{label:3}},[a._v("多选")])],1)],1),a._v(" "),s("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"可选值列表：","label-width":a.formLabelWidth}},[1==a.form.EnterWay?s("div",{staticClass:"optional_list"}):a._e(),a._v(" "),2==a.form.EnterWay?s("div",{staticClass:"optional_list"},[s("ul",a._l(a.selectList,function(e,t){return s("li",{key:t,staticClass:"select_list"},[s("span",{staticStyle:{float:"left"}},[a._v("\n                                    "+a._s(e)+"\n                                ")]),a._v(" "),s("span",{staticStyle:{float:"right"}},[s("i",{staticClass:"el-icon-close scale",on:{click:function(e){return a.deleteAttr(t)}}})])])}),0),a._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:a.selectMes,expression:"selectMes"}],staticStyle:{float:"none",border:"none",width:"100%"},attrs:{placeholder:"请自行添加，点击回车完成单条数据录入"},domProps:{value:a.selectMes},on:{keydown:function(e){return!e.type.indexOf("key")&&a._k(e.keyCode,"enter",13,e.key,"Enter")?null:a.addAttr(e)},input:function(e){e.target.composing||(a.selectMes=e.target.value)}}})]):a._e(),a._v(" "),3==a.form.EnterWay?s("div",{staticClass:"optional_list"},[s("ul",a._l(a.selectList,function(e,t){return s("li",{key:e,staticClass:"select_list"},[s("span",{staticStyle:{float:"left"}},[a._v("\n                                    "+a._s(e)+"\n                                ")]),a._v(" "),s("span",{staticStyle:{float:"right"}},[s("i",{staticClass:"el-icon-close scale",on:{click:function(e){return a.deleteAttr(t)}}})])])}),0),a._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:a.selectMes,expression:"selectMes"}],staticStyle:{float:"none",border:"none",width:"100%"},attrs:{placeholder:"请自行添加，点击回车完成单条数据录入"},domProps:{value:a.selectMes},on:{keydown:function(e){return!e.type.indexOf("key")&&a._k(e.keyCode,"enter",13,e.key,"Enter")?null:a.addAttr(e)},input:function(e){e.target.composing||(a.selectMes=e.target.value)}}})]):a._e()])],1),a._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{type:"primary",loading:a.saveLoading},on:{click:a.save}},[a._v("保 存")]),a._v(" "),s("el-button",{on:{click:function(e){a.dialogFormVisible=!1}}},[a._v("取 消")])],1)],1)],1)])},staticRenderFns:[]}},317:function(e,t,a){a(1644);var s=a(98)(a(1035),a(2115),"data-v-0312a0f4",null);e.exports=s.exports}});