webpackJsonp([152],{1125:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=o(100),r=o.n(a),s=o(99),n=o.n(s),i=(o(101),o(65)),l=(o.n(i),o(22)),c=o(64),m=o(436),f=o.n(m);e.default={data:function(){return{saveLoading:!1,loading:!1,title:"",tag:!1,total:0,size:10,currentPage:1,hospitalList:[],allHos:[],fClassList:[],sClassList:[],tClassList:[],catelogList:[],formInline:{keywords:"",hospital:""},form:{hospitalName:"",hospitalCode:"",hospital:{},fClass:"",sClass:"",tClass:"",isEnabled:"0",catalogName:"",catalogCode:"",catalogPath:"",memo:""},tableData:[]}},computed:{tHeader:function(){return["封面","主题","发布人","标签","视频大小","发布时间","浏览人次","平均浏览时长","分享","销售额","商品提成"]},filterVal:function(){return["picture","title","userName","tab","videoSize","createDate","views","grade","grade","ReferrerName"]},tableData1:function(){return this.tableData},name:function(){return"视频管理"}},mounted:function(){this.GetDropDownPermission(),this.onSubmit()},methods:{selHos:function(){0<this.form.hospital.length?(this.form.hospitalName=this.form.hospital.split("|")[0],this.form.hospitalCode=this.form.hospital.split("|")[1]):(this.form.hospitalName="",this.form.hospitalCode="")},fChange:function(){this.form.sClass="",this.setdata(this.form.fClass.value,this.form.fClass.catalogPath),this.sClassList=this.parentCode(this.form.fClass.value)},sChange:function(){this.form.tClass="",this.setdata(this.form.sClass.value,this.form.sClass.catalogPath),this.tClassList=this.parentCode(this.form.sClass.value)},tChange:function(){this.setdata(this.form.tClass.value,this.form.tClass.catalogPath)},setdata:function(t,e){this.form.catalogCode=t,this.form.catalogPath=e},parentCode:function(t){for(var e=[],a=0;a<this.catelogList.length;a++)this.catelogList[a].parentCode==t&&e.push({name:this.catelogList[a].name,value:this.catelogList[a].code,catalogPath:this.catelogList[a].catalogPath});return e},GetDropDownPermission:function(){var s=this;return n()(r.a.mark(function t(){var e,a;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.i(c._207)({code:100});case 2:return e=t.sent,s.catelogList=e.data,s.fClassList=s.parentCode(""),t.next=7,o.i(c.d)({typeId:1});case 7:a=t.sent,s.allHos=a.data,""==a.data[0].code?s.hospitalList=a.data.slice(1):s.hospitalList=a.data;case 10:case"end":return t.stop()}},t,s)}))()},AddExpertParamSet:function(e){var a=this;return n()(r.a.mark(function t(){return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,a.saveLoading=!0,t.next=4,o.i(c._284)(e);case 4:t.sent.status?(a.$message({message:"添加成功",type:"success"}),a.search(),a.tag=!1):a.$message.error("添加失败"),a.saveLoading=!1,t.next=13;break;case 9:t.prev=9,t.t0=t.catch(0),console.log(t.t0),a.$message.error("添加失败");case 13:case"end":return t.stop()}},t,a,[[0,9]])}))()},DeleteExpertSetByIdEX:function(e){var a=this;return n()(r.a.mark(function t(){return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,o.i(c._285)(e);case 3:t.sent.status?(a.$message({message:"删除成功",type:"success"}),a.search()):a.$message.error("删除失败"),t.next=11;break;case 7:t.prev=7,t.t0=t.catch(0),console.log(t.t0),a.$message.error("删除失败");case 11:case"end":return t.stop()}},t,a,[[0,7]])}))()},GetExpertParamSet:function(a){var s=this;return n()(r.a.mark(function t(){var e;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,s.loading=!0,t.next=4,o.i(c._286)(a);case 4:e=t.sent,s.tableData=e.data,s.total=e.count,s.loading=!1,t.next=13;break;case 10:t.prev=10,t.t0=t.catch(0),console.log(t.t0);case 13:case"end":return t.stop()}},t,s,[[0,10]])}))()},UpdateExpertSetEX:function(e){var a=this;return n()(r.a.mark(function t(){return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,a.saveLoading=!0,t.next=4,o.i(c._287)(e);case 4:t.sent.status?(a.$message({message:"编辑成功",type:"success"}),a.search(),a.tag=!1):a.$message.error("编辑失败"),a.saveLoading=!1,t.next=13;break;case 9:t.prev=9,t.t0=t.catch(0),console.log(t.t0),a.$message.error("编辑失败");case 13:case"end":return t.stop()}},t,a,[[0,9]])}))()},onSubmit:function(){this.currentPage=1,this.search()},search:function(){this.GetExpertParamSet({hospitalCode:this.formInline.hospital,keywords:this.formInline.keywords.removeSP()})},handleSizeChange:function(t){console.log("每页 "+t+" 条"),this.size=t,this.search()},handleCurrentChange:function(t){console.log("当前页: "+t),this.currentPage=t,this.search()},sure:function(){var t="";this.form.fClass.name&&(t+=this.form.fClass.name),this.form.sClass.name&&(t+=this.form.sClass.name),this.form.tClass.name&&(t+=this.form.tClass.name),this.form.catalogName=t,"编辑"==this.title?(this.form.modifiedBy=o.i(l.b)("userName"),this.form.modifiedUserId=o.i(l.b)("userId"),this.form.id=this.editMes.id,this.UpdateExpertSetEX(this.form)):(this.form.createBy=o.i(l.b)("userName"),this.form.createUserId=o.i(l.b)("userId"),this.AddExpertParamSet(this.form))},cancel:function(){this.tag=!1},addTag:function(t,e,a){this.reset(),this.tag=!0,this.title=t,a&&this.initData(a[e])},initData:function(t){var e=this;this.editMes=t,this.form.hospital=t.hospitalName?t.hospitalName+"|"+t.hospitalCode:"",this.form.hospitalCode=t.hospitalCode||"",this.form.hospitalName=t.hospitalName||"",this.form.memo=t.memo;var a=t.catalogPath.replace(/^\|+|\|+$/g,"").split("|");this.form.isEnabled=t.isEnabled+"";var s=this;a[0]&&this.fClassList.forEach(function(t){if(a[0]==t.value)return e.form.fClass=t,e.$set(e.form,"fClass",t),void e.fChange()}),setTimeout(function(){a[1]&&s.sClassList.forEach(function(t){if(a[1]==t.value)return s.form.sClass=t,s.$set(e.form,"sClass",t),void e.sChange()})},100),setTimeout(function(){a[2]&&s.tClassList.forEach(function(t){if(a[2]==t.value)return s.$set(e.form,"tClass",t),void e.tChange()})},100)},deleteRow:function(t,e){var a=this;this.$confirm("此操作将删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){a.DeleteExpertSetByIdEX({id:e[t].id})}).catch(function(){})},reset:function(){this.form={hospital:"",hospitalName:"",hospitalCode:"",fClass:"",sClass:"",tClass:"",isEnabled:"0",catalogName:"",catalogCode:"",catalogPath:"",memo:""}}},components:{Export:f.a}}},1352:function(t,e,a){(t.exports=a(215)(!1)).push([t.i,"",""])},1777:function(t,e,a){var s=a(1352);"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);a(216)("4df692d8",s,!0)},2249:function(t,e){t.exports={render:function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("div",{staticClass:"tag selCommon"},[s("el-form",{staticClass:"demo-form-inline form_search",attrs:{inline:!0,model:a.formInline,"label-width":"80px"}},[s("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"关键字："}},[s("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&a._k(t.keyCode,"enter",13,t.key,"Enter")?null:a.onSubmit(t)}},model:{value:a.formInline.keywords,callback:function(t){a.$set(a.formInline,"keywords",t)},expression:"formInline.keywords"}})],1),a._v(" "),s("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"医院："}},[s("el-select",{staticStyle:{width:"200px"},on:{change:a.selHos},model:{value:a.formInline.hospital,callback:function(t){a.$set(a.formInline,"hospital",t)},expression:"formInline.hospital"}},a._l(a.allHos,function(t,e){return s("el-option",{key:e,attrs:{label:t.supplierName,value:t.code}})}),1)],1),a._v(" "),s("el-form-item",{staticClass:"form_item_mt10",attrs:{label:" "}},[s("el-button",{staticClass:"searchBtn",attrs:{type:"primary"},on:{click:a.onSubmit}},[a._v("查询")]),a._v(" "),s("el-button",{staticClass:"searchBtn",attrs:{type:"primary"},on:{click:function(t){return a.addTag("添加")}}},[a._v("添加排除项")])],1)],1),a._v(" "),s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:a.loading,expression:"loading"}],staticClass:"smt min_table",staticStyle:{width:"100%","margin-top":"15px","margin-bottom":"10px"},attrs:{data:a.tableData,border:"","max-height":"560"}},[s("el-table-column",{attrs:{prop:"hospitalName",label:"医院","min-width":"150"}}),a._v(" "),s("el-table-column",{attrs:{prop:"createOn",label:"创建时间","min-width":"120"},scopedSlots:a._u([{key:"default",fn:function(t){return[t.row.createOn?s("span",[a._v(a._s(t.row.createOn.substring(0,10)))]):a._e()]}}])}),a._v(" "),s("el-table-column",{attrs:{prop:"catalogName",label:"分类","min-width":"150"}}),a._v(" "),s("el-table-column",{attrs:{prop:"catalogName",label:"启用状态","min-width":"150"},scopedSlots:a._u([{key:"default",fn:function(t){return[1==t.row.isEnabled?s("el-tag",{attrs:{type:"success"}},[a._v("启用")]):a._e(),a._v(" "),0==t.row.isEnabled?s("el-tag",{attrs:{type:"gray"}},[a._v("未启用 ")]):a._e()]}}])}),a._v(" "),s("el-table-column",{attrs:{prop:"memo",label:"备注","min-width":"150"}}),a._v(" "),s("el-table-column",{attrs:{prop:"status",label:"操作",width:"150"},scopedSlots:a._u([{key:"default",fn:function(e){return[s("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){return a.addTag("编辑",e.$index,a.tableData)}}},[a._v("编辑")]),a._v(" "),s("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){return a.deleteRow(e.$index,a.tableData)}}},[a._v("删除")])]}}])})],1),a._v(" "),s("div",{staticClass:"block"},[s("el-pagination",{attrs:{"current-page":a.currentPage,"page-sizes":[10,20,30,40],"page-size":a.size,layout:"total, sizes, prev, pager, next, jumper",total:a.total},on:{"size-change":a.handleSizeChange,"current-change":a.handleCurrentChange}})],1),a._v(" "),s("el-dialog",{attrs:{title:a.title,visible:a.tag,size:""},on:{"update:visible":function(t){a.tag=t}}},[s("el-form",{staticStyle:{width:"600px"},attrs:{model:a.form,"label-width":"80px"}},[s("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"医院："}},[s("el-select",{staticStyle:{width:"200px"},on:{change:a.selHos},model:{value:a.form.hospital,callback:function(t){a.$set(a.form,"hospital",t)},expression:"form.hospital"}},a._l(a.hospitalList,function(t,e){return s("el-option",{key:e,attrs:{label:t.supplierName,value:t.supplierName+"|"+t.code}})}),1)],1),a._v(" "),s("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"分类："}},[s("el-select",{staticStyle:{width:"150px"},attrs:{placeholder:"请选择"},on:{change:a.fChange},model:{value:a.form.fClass,callback:function(t){a.$set(a.form,"fClass",t)},expression:"form.fClass"}},a._l(a.fClassList,function(t){return s("el-option",{key:t.code,attrs:{label:t.name,value:t}})}),1),a._v(" "),s("el-select",{staticStyle:{width:"150px"},attrs:{placeholder:"请选择"},on:{change:a.sChange},model:{value:a.form.sClass,callback:function(t){a.$set(a.form,"sClass",t)},expression:"form.sClass"}},a._l(a.sClassList,function(t){return s("el-option",{key:t.code,attrs:{label:t.name,value:t}})}),1),a._v(" "),s("el-select",{staticStyle:{width:"150px"},attrs:{placeholder:"请选择"},on:{change:a.tChange},model:{value:a.form.tClass,callback:function(t){a.$set(a.form,"tClass",t)},expression:"form.tClass"}},a._l(a.tClassList,function(t){return s("el-option",{key:t.code,attrs:{label:t.name,value:t}})}),1)],1),a._v(" "),s("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"是否启用："}},[s("el-radio",{staticClass:"radio",attrs:{label:"1"},model:{value:a.form.isEnabled,callback:function(t){a.$set(a.form,"isEnabled",t)},expression:"form.isEnabled"}},[a._v("是")]),a._v(" "),s("el-radio",{staticClass:"radio",attrs:{label:"0"},model:{value:a.form.isEnabled,callback:function(t){a.$set(a.form,"isEnabled",t)},expression:"form.isEnabled"}},[a._v("否")])],1),a._v(" "),s("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"备注："}},[s("el-input",{attrs:{type:"textarea",rows:4},model:{value:a.form.memo,callback:function(t){a.$set(a.form,"memo",t)},expression:"form.memo"}})],1)],1),a._v(" "),s("div",{staticClass:"footer_ope"},[s("el-button",{attrs:{type:"primary",loading:a.saveLoading},on:{click:a.sure}},[a._v("确定")]),a._v(" "),s("el-button",{on:{click:a.cancel}},[a._v("取消")])],1)],1)],1)},staticRenderFns:[]}},381:function(t,e,a){a(1777);var s=a(98)(a(1125),a(2249),"data-v-43ea7114",null);t.exports=s.exports},436:function(t,e,a){a(439);var s=a(98)(a(437),a(440),"data-v-6c47323e",null);t.exports=s.exports},437:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{tHeader:{},filterVal:{},tableData1:{type:Array},name:""},watch:{tableData1:{handler:function(t){this.otData=t},deep:!0}},data:function(){return{otData:[]}},methods:{handleDownload:function(){var a=this;s.e(220).then(function(){var t=s(448).export_json_to_excel,e=[];e=0!=a.otData.length?a.formatJson(a.filterVal,a.otData):a.formatJson(a.filterVal,a.tableData1),t(a.tHeader,e,a.name)}.bind(null,s)).catch(s.oe)},formatJson:function(t,e){return e.map(function(e){return t.map(function(t){return e[t]})})}}}},438:function(t,e,a){(t.exports=a(215)(!1)).push([t.i,".exportBtn[data-v-6c47323e]{background:#fff;border:1px solid #d6d4d4;font-size:14px;color:#666;border-radius:4px}",""])},439:function(t,e,a){var s=a(438);"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);a(216)("fdf4f478",s,!0)},440:function(t,e){t.exports={render:function(){var t=this.$createElement;return(this._self._c||t)("el-button",{staticClass:"exportBtn",attrs:{type:"primary"},on:{click:this.handleDownload}},[this._v("导出报表")])},staticRenderFns:[]}}});