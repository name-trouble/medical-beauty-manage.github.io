webpackJsonp([203],{1039:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a(37),n=a.n(i),s=a(100),r=a.n(s),o=a(99),c=a.n(o),l=a(65),d=(a.n(l),a(64));e.default={data:function(){return{path:"",selectItem:{},searMes:"",dialogFormVisible0:!1,dialogFormVisible1:!1,formLabelWidth:"80px",form:{},formList:[],column:[],addIndex:"",editIndex:"",index0:"",index1:"",index2:"",index3:"",currentIndex0:"",currentIndex1:"",currentIndex2:"",currentIndex3:"",item1:[],item2:[],item3:[],data:[],tableData3:[],multipleSelection:[]}},mounted:function(){this.getColumn()},computed:{},watch:{searMes:function(){this.search()}},methods:{getColumn:function(){var i=this;return c()(r.a.mark(function t(){var e;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,a.i(d._553)();case 3:e=t.sent,i.column=e,i.getProperty({keywords:""}),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),console.log("获取数据失败",t.t0);case 11:case"end":return t.stop()}},t,i,[[0,8]])}))()},editCatalog:function(e,i,n){var s=this;return c()(r.a.mark(function t(){return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,a.i(d._563)(e);case 3:t.sent,s.getList(i,n),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.log("获取数据失败",t.t0);case 10:case"end":return t.stop()}},t,s,[[0,7]])}))()},getall:function(t,i){var n=this;return c()(r.a.mark(function t(){var e;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,a.i(d._207)({code:n.column[n.currentIndex0].CloumnCode});case 3:e=t.sent,n.data=e.data,0==i&&(n.item1=n.parentCode("")),1==i&&(n.item2=n.parentCode(n.item1[n.currentIndex1].code)),2==i&&(n.item3=n.parentCode(n.item2[n.currentIndex2].code)),t.next=13;break;case 10:t.prev=10,t.t0=t.catch(0),console.log("获取数据失败",t.t0);case 13:case"end":return t.stop()}},t,n,[[0,10]])}))()},DeleteCatelog:function(e,i,n){var s=this;return c()(r.a.mark(function t(){return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,a.i(d._564)(e);case 3:t.sent,i.splice(n,1),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.log("获取数据失败",t.t0);case 10:case"end":return t.stop()}},t,s,[[0,7]])}))()},AddCatalog:function(e,i,n){var s=this;return c()(r.a.mark(function t(){return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,a.i(d._562)(e);case 3:t.sent,s.getList(i,n),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.log("获取数据失败",t.t0);case 10:case"end":return t.stop()}},t,s,[[0,7]])}))()},getProperty:function(n){var s=this;return c()(r.a.mark(function t(){var e,i;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,a.i(d._550)(n);case 3:e=t.sent,s.tableData3=e,i=s,setTimeout(function(){i.check()},200),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(0),console.log("添加数据数据失败",t.t0);case 12:case"end":return t.stop()}},t,s,[[0,9]])}))()},batchSaveCatalog:function(e){var i=this;return c()(r.a.mark(function t(){return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,a.i(d._565)({JsonStr:n()(e)});case 3:0!=t.sent.success&&i.$alert("添加成功","提示",{confirmButtonText:"确定",type:"success"}),t.next=11;break;case 7:t.prev=7,t.t0=t.catch(0),console.log("添加数据数据失败",t.t0),i.$alert("添加失败","提示",{confirmButtonText:"确定",type:"warning"});case 11:case"end":return t.stop()}},t,i,[[0,7]])}))()},select:function(t,e,i){0===e&&(this.currentIndex0=i,this.getall({code:this.column[i].CloumnCode},e),this.currentIndex1="",this.currentIndex2="",this.currentIndex3="",this.item2=[],this.item3=[],this.dataBind(t,0,i)),1===e&&(this.currentIndex1=i,this.getall({code:this.column[this.currentIndex0].CloumnCode},e),this.item3=[],this.currentIndex2="",this.currentIndex3="",this.dataBind(t,1,i)),2===e&&(this.currentIndex3="",this.currentIndex2=i,this.getall({code:this.column[this.currentIndex0].CloumnCode},e),this.dataBind(t,2,i)),3===e&&(this.currentIndex3=i,this.dataBind(t,3,i)),(this.selectItem=t).CatalogPath?this.path=t.catalogPath:this.path="",this.search()},edit:function(t){this.editIndex=t;var e=0;this.form=={}||(1===t&&this.item1[this.currentIndex1]&&(this.form=JSON.parse(n()(this.item1[this.currentIndex1])),e=1),2===t&&this.item2[this.currentIndex2]&&(this.form=JSON.parse(n()(this.item2[this.currentIndex2])),e=1),3===t&&this.item3[this.currentIndex3]&&(this.form=JSON.parse(n()(this.item3[this.currentIndex3])),e=1),1==e?this.dialogFormVisible1=!0:this.$alert("请选择分类","提示",{confirmButtonText:"确定",type:"warning"}))},del:function(t){if(1===t&&""!=this.item1){this.item2="",this.item3="";var e=this.item1[this.currentIndex1].id,i=this.currentIndex1,n=this.item1;this.form1="",this.DeleteCatelog({id:e},n,i),this.currentIndex1=""}if(2===t&&""!=this.item2){this.item3="";e=this.item2[this.currentIndex2].id,i=this.currentIndex2,n=this.item2;this.form2="",this.DeleteCatelog({id:e},n,i),this.currentIndex2=""}if(3===t&&""!=this.item3){e=this.item3[this.currentIndex3].id,i=this.currentIndex3,n=this.item3;this.form3="",this.DeleteCatelog({id:e},n,i),this.currentIndex3=""}},add:function(t){var e=0;1==t&&0!=String(this.currentIndex0).length&&(e=1),2==t&&0!=String(this.currentIndex1).length&&(e=1),3==t&&0!=String(this.currentIndex2).length&&(e=1),1==e?(this.addIndex=t,this.form={},this.dialogFormVisible0=!0):this.$alert("请先选择上一分类","提示",{confirmButtonText:"确定",type:"warning"})},addSure:function(){var t=this.column[this.currentIndex0].CloumnCode,e=this.form.name,i="";if(1==this.addIndex){var n=this.column[this.currentIndex0].Name;s="",this.AddCatalog({cloumnCode:t,cloumnName:n,name:e,catalogPath:""},s,1)}if(2==this.addIndex){var s=this.item1[this.currentIndex1].code;n=this.item1[this.currentIndex1].name;i="|"+this.item1[this.currentIndex1].code+"|",this.AddCatalog({cloumnCode:t,parentCode:s,cloumnName:n,name:e,catalogPath:i},s,2)}if(3==this.addIndex){s=this.item2[this.currentIndex2].code,n=this.item2[this.currentIndex2].name;i="|"+this.item1[this.currentIndex1].code+"|"+this.item2[this.currentIndex2].code+"|",this.AddCatalog({cloumnCode:t,parentCode:s,cloumnName:n,name:e,catalogPath:this.path},s,3)}this.dialogFormVisible0=!1},editSure:function(){var t=this.form.name;if(1==this.editIndex){var e=this.item1[this.currentIndex1].code,i=this.item1[this.currentIndex1].id;this.editCatalog({id:i,name:t},"",this.editIndex)}if(2==this.editIndex){i=this.item2[this.currentIndex2].id,e=this.item2[this.currentIndex2].parentCode;this.editCatalog({id:i,name:t},e,this.editIndex)}if(3==this.editIndex){i=this.item3[this.currentIndex3].id,e=this.item3[this.currentIndex3].parentCode;this.editCatalog({id:i,name:t},e,this.editIndex)}this.dialogFormVisible1=!1},dataBind:function(t,e,i){1===e&&(this.form1=t,this.index1=i),2===e&&(this.form2=t,this.index2=i),3===e&&(this.form3=t,this.index3=i)},getList:function(i,n){var s=this;return c()(r.a.mark(function t(){var e;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,s.data=[],t.next=4,a.i(d._207)({code:s.column[s.currentIndex0].CloumnCode});case 4:e=t.sent,s.data=e.data,1==n&&(s.item1=s.parentCode("")),2==n&&(s.item2=s.parentCode(i)),3==n&&(s.item3=s.parentCode(i)),t.next=14;break;case 11:t.prev=11,t.t0=t.catch(0),console.log("获取数据失败",t.t0);case 14:case"end":return t.stop()}},t,s,[[0,11]])}))()},handleSelectionChange:function(t){this.multipleSelection=t},toggleSelection:function(t){var e=this;t?t.forEach(function(t){e.$refs.multipleTable.toggleRowSelection(t)}):this.$refs.multipleTable.clearSelection()},down:function(t){13==t.keyCode&&this.search()},search:function(){var t="",e="";this.selectItem=={}?Catelogccode=t="":(t=this.selectItem.cloumnCode,e=this.selectItem.code?this.selectItem.code:""),this.getProperty({keywords:this.searMes.removeSP(),columncode:t,catelogcode:e})},addAttributes:function(){if(0==this.parentCode(this.selectItem.code).length){for(var t=[],e=0;e<this.multipleSelection.length;e++)t.push({columnCode:this.selectItem.cloumnCode,catalogCode:this.selectItem.code,propertyCode:this.multipleSelection[e].code,propertyName:this.multipleSelection[e].name});this.batchSaveCatalog(JSON.parse(n()(t)))}else this.$alert("请选择最终节点","提示",{confirmButtonText:"确定",callback:function(){}})},handleCurrentChange:function(t){this.currentRow=t},parentCode:function(t){for(var e=[],i=0;i<this.data.length;i++)t==this.data[i].parentCode&&e.push(this.data[i]);return e},check:function(){var e=[];this.tableData3.forEach(function(t){1==t.IsChecked&&e.push(t)}),this.toggleSelection(e)}}}},1285:function(t,e,i){(t.exports=i(215)(!1)).push([t.i,".classification[data-v-22e36f28]{display:block;float:left;width:240px;position:relative;margin-top:60px;border:1px solid #dedede;border-right:none;height:560px}.classification[data-v-22e36f28]:nth-child(4){border:1px solid #dedede}.classify-tittle[data-v-22e36f28]{position:absolute;top:-40px;width:100%;height:40px;color:#666;text-align:center;line-height:40px;font-size:16px}.classification .classify-list[data-v-22e36f28]{cursor:pointer;width:100%;height:32px;line-height:32px;font-size:14px;text-indent:21px;color:#666}.classify_container[data-v-22e36f28]{height:513px;overflow:auto}.classify-footer[data-v-22e36f28]{position:absolute;bottom:0;width:100%;height:47px;background-color:#f2f2f2;line-height:48px;text-indent:110px}.edit-btn[data-v-22e36f28]{margin-left:0}.classify-list.active[data-v-22e36f28]{background:#cda382;color:#fff}.el-button--primary[data-v-22e36f28]{color:#fff;background-color:#cda382;border-color:#cda382}.clear[data-v-22e36f28]{clear:both;margin-left:20px}",""])},1710:function(t,e,i){var n=i(1285);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);i(216)("68c575e3",n,!0)},2182:function(t,e){t.exports={render:function(){var n=this,t=n.$createElement,s=n._self._c||t;return s("div",{staticClass:"selCommon"},[s("div",{staticStyle:{"margin-left":"20px"}},[s("div",{staticClass:"classification"},[s("div",{staticClass:"classify-tittle"},[n._v("栏目")]),n._v(" "),s("ul",{staticClass:"classify_container"},n._l(n.column,function(e,i){return s("li",{key:i,staticClass:"classify-list",class:{active:n.currentIndex0===i},on:{click:function(t){return n.select(e,0,i)}}},[n._v(n._s(e.Name)+"\n                    ")])}),0),n._v(" "),s("div",{staticClass:"classify-footer"})]),n._v(" "),s("div",{staticClass:"classification"},[s("div",{staticClass:"classify-tittle"},[n._v("大类")]),n._v(" "),s("ul",{staticClass:"classify_container"},n._l(n.item1,function(e,i){return s("li",{key:i,staticClass:"classify-list",class:{active:n.currentIndex1===i},on:{click:function(t){return n.select(e,1,i)}}},[n._v(n._s(e.name)+"\n                    ")])}),0),n._v(" "),s("div",{staticClass:"classify-footer"},[s("el-button",{staticClass:"edit-btn",attrs:{type:"primary",size:"small",icon:"el-icon-plus"},on:{click:function(t){return n.add(1)}}}),n._v(" "),s("el-button",{staticClass:"edit-btn",attrs:{type:"primary",size:"small",icon:"el-icon-edit"},on:{click:function(t){return n.edit(1)}}}),n._v(" "),s("el-popconfirm",{staticClass:"danger-action",attrs:{"confirm-button-text":"确认","cancel-button-text":"取消",icon:"el-icon-warning","icon-color":"red",title:"确认删除 ？"},on:{confirm:function(t){return n.del(1)}}},[s("el-button",{staticClass:"edit-btn",attrs:{slot:"reference",type:"primary",size:"small",icon:"el-icon-delete"},slot:"reference"})],1)],1)]),n._v(" "),s("div",{staticClass:"classification"},[s("div",{staticClass:"classify-tittle"},[n._v("中类")]),n._v(" "),s("ul",{staticClass:"classify_container"},n._l(n.item2,function(e,i){return s("li",{key:i,staticClass:"classify-list",class:{active:n.currentIndex2===i},on:{click:function(t){return n.select(e,2,i)}}},[n._v(n._s(e.name)+"\n                    ")])}),0),n._v(" "),s("div",{staticClass:"classify-footer"},[s("el-button",{staticClass:"edit-btn",attrs:{type:"primary",size:"small",icon:"el-icon-plus"},on:{click:function(t){return n.add(2)}}}),n._v(" "),s("el-button",{staticClass:"edit-btn",attrs:{type:"primary",size:"small",icon:"el-icon-edit"},on:{click:function(t){return n.edit(2)}}}),n._v(" "),s("el-popconfirm",{staticClass:"danger-action",attrs:{"confirm-button-text":"确认","cancel-button-text":"取消",icon:"el-icon-warning","icon-color":"red",title:"确认删除 ？"},on:{confirm:function(t){return n.del(2)}}},[s("el-button",{staticClass:"edit-btn",attrs:{slot:"reference",type:"primary",size:"small",icon:"el-icon-delete"},slot:"reference"})],1)],1)]),n._v(" "),s("div",{staticClass:"classification"},[s("div",{staticClass:"classify-tittle"},[n._v("小类")]),n._v(" "),s("ul",n._l(n.item3,function(e,i){return s("li",{key:i,staticClass:"classify-list",class:{active:n.currentIndex3===i},on:{click:function(t){return n.select(e,3,i)}}},[n._v(n._s(e.name)+"\n                    ")])}),0),n._v(" "),s("div",{staticClass:"classify-footer"},[s("el-button",{staticClass:"edit-btn",attrs:{type:"primary",size:"small",icon:"el-icon-plus"},on:{click:function(t){return n.add(3)}}}),n._v(" "),s("el-button",{staticClass:"edit-btn",attrs:{type:"primary",size:"small",icon:"el-icon-edit"},on:{click:function(t){return n.edit(3)}}}),n._v(" "),s("el-popconfirm",{staticClass:"danger-action",attrs:{"confirm-button-text":"确认","cancel-button-text":"取消",icon:"el-icon-warning","icon-color":"red",title:"确认删除 ？"},on:{confirm:function(t){return n.del(3)}}},[s("el-button",{staticClass:"edit-btn",attrs:{slot:"reference",type:"primary",size:"small",icon:"el-icon-delete"},slot:"reference"})],1)],1)])]),n._v(" "),s("el-dialog",{attrs:{title:"添加：",visible:n.dialogFormVisible0,size:""},on:{"update:visible":function(t){n.dialogFormVisible0=t}}},[s("el-form",{staticStyle:{width:"320px"},attrs:{model:n.form,inline:!0}},[s("el-form-item",{attrs:{label:"名称","label-width":n.formLabelWidth}},[s("el-input",{staticStyle:{width:"200px"},attrs:{"auto-complete":"off"},model:{value:n.form.name,callback:function(t){n.$set(n.form,"name",t)},expression:"form.name"}})],1)],1),n._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{type:"primary"},on:{click:n.addSure}},[n._v("确 定")]),n._v(" "),s("el-button",{on:{click:function(t){n.dialogFormVisible0=!1}}},[n._v("取 消")])],1)],1),n._v(" "),s("el-dialog",{attrs:{title:"编辑",visible:n.dialogFormVisible1,size:""},on:{"update:visible":function(t){n.dialogFormVisible1=t}}},[s("el-form",{staticStyle:{width:"320px"},attrs:{model:n.form,inline:!0}},[s("el-form-item",{attrs:{label:"名称：","label-width":n.formLabelWidth}},[s("el-input",{staticStyle:{width:"200px"},attrs:{"auto-complete":"off"},model:{value:n.form.name,callback:function(t){n.$set(n.form,"name",t)},expression:"form.name"}})],1)],1),n._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{type:"primary"},on:{click:function(t){return n.editSure()}}},[n._v("确 定")]),n._v(" "),s("el-button",{on:{click:function(t){n.dialogFormVisible1=!1}}},[n._v("取 消")])],1)],1),n._v(" "),s("div",{staticClass:"clear"},[s("p",{staticStyle:{"line-height":"36px",display:"inline-block","margin-top":"20px"}},[n._v("当前已选分类：“"+n._s(n.selectItem.name)+"”,请选择属性：")]),n._v(" "),s("div",{staticStyle:{display:"inline-block","margin-top":"20px"}},[s("input",{directives:[{name:"model",rawName:"v-model",value:n.searMes,expression:"searMes"}],staticClass:"self_ipt",staticStyle:{"margin-bottom":"10px"},attrs:{type:"text",placeholder:"搜索"},domProps:{value:n.searMes},on:{keyup:function(t){return!t.type.indexOf("key")&&n._k(t.keyCode,"enter",13,t.key,"Enter")?null:n.down(t)},input:function(t){t.target.composing||(n.searMes=t.target.value)}}}),n._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:n.search}},[n._v("搜索")]),n._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:n.addAttributes}},[n._v("确认添加")])],1),n._v(" "),s("el-table",{ref:"multipleTable",staticStyle:{width:"100%","margin-bottom":"20px"},attrs:{data:n.tableData3,border:"","tooltip-effect":"dark","min-height":"400px","max-height":"500px","highlight-current-row":""},on:{"current-change":n.handleCurrentChange,"selection-change":n.handleSelectionChange}},[s("el-table-column",{attrs:{type:"selection",align:"center",width:"55"}}),n._v(" "),s("el-table-column",{attrs:{prop:"Code",label:"编号",width:"65"}}),n._v(" "),s("el-table-column",{attrs:{label:"属性名称","min-width":"120"},scopedSlots:n._u([{key:"default",fn:function(t){return[n._v(n._s(t.row.Name))]}}])}),n._v(" "),s("el-table-column",{attrs:{prop:"EnterWay",label:"属性值的录入方式","min-width":"120",align:"center"},scopedSlots:n._u([{key:"default",fn:function(t){return[1==t.row.EnterWay?s("span",[n._v("文本框")]):n._e(),n._v(" "),2==t.row.EnterWay?s("span",[n._v("下拉框")]):n._e(),n._v(" "),3==t.row.EnterWay?s("span",[n._v("多选")]):n._e()]}}])}),n._v(" "),s("el-table-column",{attrs:{prop:"TextValue","min-width":"300",label:"可选值列表"},scopedSlots:n._u([{key:"default",fn:function(t){return[s("span",[n._v(n._s(t.row.TextValue))])]}}])}),n._v(" "),s("el-table-column",{attrs:{type:"index",width:"70"}})],1)],1)],1)},staticRenderFns:[]}},321:function(t,e,i){i(1710);var n=i(98)(i(1039),i(2182),"data-v-22e36f28",null);t.exports=n.exports}});