webpackJsonp([202],{1041:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(66),o=r.n(n),a=r(102),i=r.n(a),l=r(100),c=r.n(l),s=r(99),u=r.n(s),m=r(65),p=(r.n(m),r(101)),d=r(64),f=r(22);t.default={data:function(){return{shelveList:["未上架","已上架","已下架"],ispopEdit:!1,tabloading:!1,loading:!1,shopList:[],doctorList:[],currentIndex:0,baseUrl:p.b,column:"",class1:"",class2:"",class3:"",catLog:"",hospitalList:"",supplierList:"",currentPage:1,pageSize:10,totalPage:0,dialogTableVisible:!1,dialogFormVisible:!1,form:{},formLabelWidth:"80px",formInline:{column:"",class1:"",class2:"",class3:"",startPrice:"",endPrice:"",hospital:"",supplier:"",doctor:"",name:"",shop:"",sortCode:""},tableData:[],multipleSelection:[]}},computed:{},watch:{"formInline.supplier":{handler:function(e){this.formInline.doctor="",this.GetServiceManByHspCode({hospitalCode:e})},deep:!0}},mounted:function(){this.getColumn()},methods:{sortCode:function(e){this.ispopEdit=!0,this.sortId=e.id,this.formInline.sortCode=e.sortCode?e.sortCode:""},sure:function(){var t=this;return u()(c.a.mark(function e(){return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r.i(d._559)({id:t.sortId,SortCode:t.formInline.sortCode});case 2:e.sent.status?(t.$message({message:"操作成功",type:"success"}),t.ispopEdit=!1,t.search()):t.$message.error("操作失败");case 4:case"end":return e.stop()}},e,t)}))()},onSubmit:function(){this.currentPage[this.currentIndex]=1,this.search()},handleSizeChange:function(e){console.log("每页 "+e+" 条"),this.pageSize=e,this.search()},handleCurrentChange:function(e){console.log("当前页: "+e),this.currentPage=e,this.search()},GetShopByPage:function(n){var a=this;return u()(c.a.mark(function e(){var t;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.i(d._110)(n);case 3:t=e.sent,a.shopList=t.data,a.loading=!1,e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}},e,a,[[0,8]])}))()},remoteMethod:function(e){""!==e?(this.loading=!0,this.GetShopByPage({pageIndex:1,pageSize:20,keywords:e.removeSP()})):this.options4=[]},handleClick:function(e,t){this.updateState({id:e.id,state:t,op:0,createUserCode:r.i(f.b)("userId")})},columnChange:function(){this.formInline.class1="",this.getCatelog({code:this.formInline.column})},classChange:function(){this.formInline.class2="",this.class2=this.parentCode(this.formInline.class1)},class2Change:function(){this.formInline.class3="",this.class3=this.parentCode(this.formInline.class2)},getClass:function(){this.class1=this.parentCode("")},getGoods:function(n){var a=this;return u()(c.a.mark(function e(){var t;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a.tabloading=!0,e.prev=1,e.next=4,r.i(d._163)(n);case 4:t=e.sent,a.tableDataCopy(t.data),a.totalPage=t.count,a.tabloading=!1,e.next=13;break;case 10:e.prev=10,e.t0=e.catch(1),console.log(e.t0);case 13:case"end":return e.stop()}},e,a,[[1,10]])}))()},batchModifyState:function(t){var n=this;return u()(c.a.mark(function e(){return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.i(d._560)(t);case 3:e.sent.success?(n.$message({message:"操作成功",type:"success"}),n.search()):n.$message.error("操作失败"),e.next=11;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0),n.$message.error("操作失败");case 11:case"end":return e.stop()}},e,n,[[0,7]])}))()},getColumn:function(){var s=this;return u()(c.a.mark(function e(){var t,n,a,l;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,o.a.all([r.i(d._553)(),r.i(d.d)({typeId:1})]);case 3:t=e.sent,n=i()(t,2),a=n[0],l=n[1],s.column=a,s.supplierList=l.data,s.formInline.supplier=l.data[0].code,s.search(),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(0),console.log(e.t0);case 16:case"end":return e.stop()}},e,s,[[0,13]])}))()},getCatelog:function(n){var a=this;return u()(c.a.mark(function e(){var t;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.i(d._207)(n);case 3:t=e.sent,a.catelog=t.data,a.getClass(),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}},e,a,[[0,8]])}))()},updateState:function(t){var n=this;return u()(c.a.mark(function e(){return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.i(d._558)(t);case 3:1==e.sent.success?(n.$message({message:"操作成功",type:"success"}),n.search()):n.$message.error("操作失败"),e.next=11;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0),n.$message.error("操作失败");case 11:case"end":return e.stop()}},e,n,[[0,7]])}))()},parentCode:function(e){for(var t=[],n=0;n<this.catelog.length;n++)this.catelog[n].parentCode==e&&t.push(this.catelog[n]);return t},search:function(){var e="";e=0!=this.formInline.class3.length?this.formInline.class3:0!=this.formInline.class2.length?this.formInline.class2:this.formInline.class1,this.getGoods({columnCode:this.formInline.column,catalogCode:e,startPrice:this.formInline.startPrice,endPrice:this.formInline.endPrice,supplierCode:this.formInline.supplier,serviceMan:this.formInline.doctor,state:this.currentIndex,keyWords:this.formInline.name.removeSP(),pageSize:this.pageSize,pageIndex:this.currentPage})},select:function(e){this.currentIndex=e,this.multipleSelection=[],this.currentPage=1,this.pageSize=10,this.totalPage=0,this.search()},handleSelectionChange:function(e){this.multipleSelection=e},tableDataCopy:function(e){var t=this.splitUrl(e);this.tableData=t},batchState:function(){var t=[];this.multipleSelection.forEach(function(e){t.push(e.id)});var e=0;e=1==this.currentIndex?2:1,this.batchModifyState({ids:t.join(","),state:e})},GetServiceManByHspCode:function(n){var a=this;return u()(c.a.mark(function e(){var t;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.i(d._555)(n);case 3:t=e.sent,a.doctorList=t,e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log("获取数据失败",e.t0);case 10:case"end":return e.stop()}},e,a,[[0,7]])}))()},splitUrl:function(e){return e.forEach(function(e){e.ImgMainUrl=p.b+e.imgMainUrl,e.class=e.cloumnName+"/"+e.catalogName}),e}},components:{}}},1216:function(e,t,n){(e.exports=n(215)(!1)).push([e.i,"",""])},1641:function(e,t,n){var a=n(1216);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);n(216)("727b904d",a,!0)},2112:function(e,t){e.exports={render:function(){var n=this,e=n.$createElement,a=n._self._c||e;return a("div",{staticClass:"goodsUpDown selCommon"},[a("el-form",{staticClass:"demo-form-inline form_search",attrs:{inline:!0,model:n.formInline,"label-width":"80px"}},[a("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"栏目："}},[a("el-select",{staticStyle:{width:"200px"},attrs:{placeholder:"请选择"},on:{change:n.columnChange},model:{value:n.formInline.column,callback:function(e){n.$set(n.formInline,"column",e)},expression:"formInline.column"}},[a("el-option",{attrs:{label:"全部",value:""}}),n._v(" "),n._l(n.column,function(e){return a("el-option",{key:e.Code,attrs:{label:e.Name,value:e.CloumnCode}})})],2)],1),n._v(" "),a("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"大类："}},[a("el-select",{staticStyle:{width:"200px"},attrs:{placeholder:"请选择"},on:{change:n.classChange},model:{value:n.formInline.class1,callback:function(e){n.$set(n.formInline,"class1",e)},expression:"formInline.class1"}},[a("el-option",{attrs:{label:"全部",value:""}}),n._v(" "),n._l(n.class1,function(e){return a("el-option",{key:e.code,attrs:{label:e.name,value:e.code}})})],2)],1),n._v(" "),a("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"中类："}},[a("el-select",{staticStyle:{width:"200px"},attrs:{placeholder:"请选择"},on:{change:n.class2Change},model:{value:n.formInline.class2,callback:function(e){n.$set(n.formInline,"class2",e)},expression:"formInline.class2"}},[a("el-option",{attrs:{label:"全部",value:""}}),n._v(" "),n._l(n.class2,function(e){return a("el-option",{key:e.code,attrs:{label:e.name,value:e.code}})})],2)],1),n._v(" "),a("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"小类："}},[a("el-select",{staticStyle:{width:"200px"},attrs:{placeholder:"请选择"},model:{value:n.formInline.class3,callback:function(e){n.$set(n.formInline,"class3",e)},expression:"formInline.class3"}},[a("el-option",{attrs:{label:"全部",value:""}}),n._v(" "),n._l(n.class3,function(e){return a("el-option",{key:e.code,attrs:{label:e.name,value:e.code}})})],2)],1),n._v(" "),a("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"价格区间："}},[a("el-input",{staticStyle:{width:"82px"},attrs:{placeholder:""},model:{value:n.formInline.startPrice,callback:function(e){n.$set(n.formInline,"startPrice",e)},expression:"formInline.startPrice"}}),n._v(" "),a("span",{staticStyle:{display:"inline-block",float:"left","margin-right":"5px"}},[n._v("-")]),n._v(" "),a("el-input",{staticStyle:{width:"82px"},attrs:{placeholder:""},model:{value:n.formInline.endPrice,callback:function(e){n.$set(n.formInline,"endPrice",e)},expression:"formInline.endPrice"}})],1),n._v(" "),a("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"医院："}},[a("el-select",{staticStyle:{width:"200px"},attrs:{placeholder:"请选择",filterable:""},model:{value:n.formInline.supplier,callback:function(e){n.$set(n.formInline,"supplier",e)},expression:"formInline.supplier"}},n._l(n.supplierList,function(e){return a("el-option",{key:e.code,attrs:{label:e.supplierName,value:e.code}})}),1)],1),n._v(" "),a("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"医生："}},[a("el-select",{staticStyle:{width:"200px"},attrs:{placeholder:"请选择"},model:{value:n.formInline.doctor,callback:function(e){n.$set(n.formInline,"doctor",e)},expression:"formInline.doctor"}},[a("el-option",{attrs:{label:"全部",value:""}}),n._v(" "),n._l(n.doctorList,function(e){return a("el-option",{key:e.Code,attrs:{label:e.ServiceName,value:e.Code}})})],2)],1),n._v(" "),a("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"商户："}},[a("el-select",{staticStyle:{width:"200px"},attrs:{filterable:"",remote:"",placeholder:"请输入关键词","remote-method":n.remoteMethod,loading:n.loading},model:{value:n.formInline.shop,callback:function(e){n.$set(n.formInline,"shop",e)},expression:"formInline.shop"}},n._l(n.shopList,function(e){return a("el-option",{key:e.value,attrs:{label:e.ShopName,value:e.ShopCode}})}),1)],1),n._v(" "),a("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"商品名称："}},[a("el-input",{staticStyle:{width:"200px"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&n._k(e.keyCode,"enter",13,e.key,"Enter")?null:n.search(e)}},model:{value:n.formInline.name,callback:function(e){n.$set(n.formInline,"name",e)},expression:"formInline.name"}})],1),n._v(" "),a("br"),n._v(" "),a("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"    "}},[a("el-button",{staticClass:"searchBtn",attrs:{type:"primary"},on:{click:n.onSubmit}},[n._v("查询")])],1)],1),n._v(" "),a("ul",n._l(n.shelveList,function(e,t){return a("li",{key:t,staticClass:"shelve",class:{active:n.currentIndex===t},on:{click:function(e){return n.select(t)}}},[n._v(n._s(e))])}),0),n._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:n.tabloading,expression:"tabloading"}],ref:"multipleTable",staticClass:"min_table smt",staticStyle:{width:"100%","margin-top":"10px","margin-bottom":"10px"},attrs:{data:n.tableData,border:"","max-height":"470"},on:{"selection-change":n.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),n._v(" "),a("el-table-column",{attrs:{prop:"ImgMainUrl",label:"图片","min-width":"70"},scopedSlots:n._u([{key:"default",fn:function(e){return[a("img",{staticStyle:{"vertical-align":"middle"},attrs:{width:"50px",height:"50px",src:e.row.ImgMainUrl,alt:""}})]}}])}),n._v(" "),a("el-table-column",{attrs:{prop:"goodsCode",label:"商品编号","min-width":"150"}}),n._v(" "),a("el-table-column",{attrs:{prop:"name",label:"商品名称","min-width":"270"}}),n._v(" "),a("el-table-column",{attrs:{prop:"keyWords",label:"搜索关键字","min-width":"150","show-overflow-tooltip":""}}),n._v(" "),a("el-table-column",{attrs:{prop:"grade",label:"分类","min-width":"150"},scopedSlots:n._u([{key:"default",fn:function(e){return[n._v("\n                    "+n._s(e.row.cloumnName)+"/"+n._s(e.row.catalogName)+"\n                ")]}}])}),n._v(" "),a("el-table-column",{attrs:{prop:"supplierName",label:"医院/供方","min-width":"150"}}),n._v(" "),a("el-table-column",{attrs:{prop:"priceRange",label:"售价","min-width":"120"}}),n._v(" "),a("el-table-column",{attrs:{prop:"limitAmount",label:"积分抵现","min-width":"100"}}),n._v(" "),a("el-table-column",{attrs:{prop:"sortCode",label:"排序","min-width":"100"}}),n._v(" "),a("el-table-column",{attrs:{fixed:"right",prop:"grade",label:"操作","min-width":"100"},scopedSlots:n._u([{key:"default",fn:function(t){return[1==t.row.state?a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){return n.handleClick(t.row,2)}}},[n._v("下架")]):a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){return n.handleClick(t.row,1)}}},[n._v("上架")]),n._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){return n.sortCode(t.row)}}},[n._v("排序")])]}}])})],1),n._v(" "),a("el-button",{attrs:{type:"primary"},domProps:{textContent:n._s(1==n.currentIndex?"批量下架":"批量上架")},on:{click:n.batchState}}),n._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":n.currentPage,"page-sizes":[10,20,30,40],"page-size":n.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:n.totalPage},on:{"size-change":n.handleSizeChange,"current-change":n.handleCurrentChange}})],1),n._v(" "),a("el-dialog",{attrs:{title:"消费券排序",visible:n.ispopEdit,size:""},on:{"update:visible":function(e){n.ispopEdit=e}}},[a("el-form",{staticClass:"demo-form-inline",attrs:{"label-width":"80px"},model:{value:n.formInline,callback:function(e){n.formInline=e},expression:"formInline"}},[a("el-form-item",{staticClass:"form_item_mt0",attrs:{label:"排序："}},[a("el-input",{staticStyle:{width:"220px"},attrs:{placeholder:""},model:{value:n.formInline.sortCode,callback:function(e){n.$set(n.formInline,"sortCode",n._n(e))},expression:"formInline.sortCode"}})],1),n._v(" "),a("el-form-item",{staticClass:"form_item_mt10",attrs:{label:""}},[a("span",{staticStyle:{color:"red"}},[n._v("默认为0，数字越大排序越靠前")])]),n._v(" "),a("el-form-item",{staticStyle:{"text-align":"center"},attrs:{label:"","label-width":"0px"}},[a("el-button",{attrs:{type:"primary"},on:{click:n.sure}},[n._v("确定")]),n._v(" "),a("el-button",{on:{click:function(e){n.ispopEdit=!1}}},[n._v("取消")])],1)],1)],1)],1)},staticRenderFns:[]}},323:function(e,t,n){n(1641);var a=n(98)(n(1041),n(2112),"data-v-00ced8c2",null);e.exports=a.exports}});