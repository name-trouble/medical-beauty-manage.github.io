webpackJsonp([165],{1085:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(66),o=r.n(n),i=r(102),s=r.n(i),l=r(37),a=r.n(l),c=r(100),m=r.n(c),p=r(99),u=r.n(p),d=r(101),f=r(441),h=r(65),g=(r.n(h),r(485)),k=(r.n(g),r(64)),b=r(22),v=d.a+f.a+"?op=branchshop";t.default={data:function(){return{uploadUrl:v,acceptImage:f.b,baseImgPath:d.b,userId:r.i(b.b)("userId"),consult:"",hospitalList:"",imgDialog:!1,loading:!1,dialogVisible:!1,currentPage:1,dialogImageUrl:"",form:{},total:0,size:10,formInline:{branchName:"",IsEnable:"",hospital:"",topBranch:"",serviceName:""},topBranchList:[],fileList1:[],fileList2:[],fileList3:[],tableData:[]}},computed:{},mounted:function(){this.getBranchGradeAll()},watch:{},methods:{onSuccess:function(e,t,n){this.fileList1=n},onSuccess2:function(e,t,n){this.fileList2=n},onSuccess3:function(e,t,n){this.fileList3=n},beforeUpload:function(e){var t=e.size/1024/1024<2;return t||this.$message.error("上传图片大小不能超过 2MB!"),t},AddBaseCommonPhoto:function(n){var i=this;return u()(m.a.mark(function e(){var t;return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r.i(k._356)(n);case 2:(t=e.sent).status?(i.$message({message:"保存成功",type:"success"}),i.imgDialog=!1):i.$message.error("保存失败"+t.errorMessage);case 4:case"end":return e.stop()}},e,i)}))()},GetBaseCommonPhoto:function(t){var n=this;return u()(m.a.mark(function e(){return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r.i(k._357)(t);case 2:e.sent.data.forEach(function(e){1==e.photoDesc?n.fileList1.push({url:n.baseImgPath+e.imgUrl,response:e.imgUrl}):2==e.photoDesc?n.fileList2.push({url:n.baseImgPath+e.imgUrl,response:e.imgUrl}):3==e.photoDesc&&n.fileList3.push({url:n.baseImgPath+e.imgUrl,response:e.imgUrl})});case 4:case"end":return e.stop()}},e,n)}))()},handleRemove:function(e,t){this.DelImg(e.response),console.log(e,t)},DelImg:function(n){var i=this;return u()(m.a.mark(function e(){var t;return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r.i(k._73)({filepath:n});case 2:(t=e.sent).status||i.$message({message:"原图片删除失败！"+t.errorMessage,type:"warning"});case 4:case"end":return e.stop()}},e,i)}))()},handlePictureCardPreview:function(e){this.dialogImageUrl=e.url,this.dialogVisible=!0},sure:function(){this.AddBaseCommonPhoto({jsonStr:this.getImgMes(),code:this.form.code})},cancel:function(){},getImgMes:function(){var t=this,n=[];return this.fileList1.forEach(function(e){e.index=1}),this.fileList2.forEach(function(e){e.index=2}),this.fileList3.forEach(function(e){e.index=3}),this.fileList1.concat(this.fileList2).concat(this.fileList3).forEach(function(e){n.push({typeId:2,refCode:t.form.code,PhotoDesc:e.index,imgUrl:e.response,createBy:r.i(b.b)("userName"),createUserId:r.i(b.b)("userId")})}),a()(n)},openImgDialog:function(e){this.GetBaseCommonPhoto({RefCode:e.code}),this.form=e,this.imgDialog=!0},getBranchGradeAll:function(){var a=this;return u()(m.a.mark(function e(){var t,n,i,l;return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,o.a.all([r.i(k.d)({typeId:1}),r.i(k.d)({typeId:"2"})]);case 3:t=e.sent,n=s()(t,2),i=n[0],l=n[1],a.topBranchList=l.data,a.formInline.topBranch=l.data[0].code,a.hospitalList=i.data,a.formInline.hospital=a.hospitalList[0].code,e.next=16;break;case 13:e.prev=13,e.t0=e.catch(0),console.log(e.t0);case 16:case"end":return e.stop()}},e,a,[[0,13]])}))()},GetBranchShopList:function(n){var i=this;return u()(m.a.mark(function e(){var t;return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.i(k._122)(n);case 3:t=e.sent,i.tableData=t.data,i.loading=!1,i.total=t.count,e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0);case 12:case"end":return e.stop()}},e,i,[[0,9]])}))()},onSubmit:function(){console.log("submit!"),this.currentPage=1,this.getTableDate()},handleSizeChange:function(e){console.log("每页 "+e+" 条"),this.size=e,this.getTableDate()},handleCurrentChange:function(e){console.log("当前页: "+e),this.currentPage=e,this.getTableDate()},getTableDate:function(){this.loading=!0,this.GetBranchShopList({Keywords:this.formInline.branchName.removeSP(),pageIndex:this.currentPage,pageSize:this.size,IsEnabled:this.formInline.IsEnable,hospitalCode:this.formInline.hospital,TopBranchCode:this.formInline.topBranch,serviceName:this.formInline.serviceName})}},components:{}}},1434:function(e,t,n){(e.exports=n(215)(!1)).push([e.i,".form_footer[data-v-6fa2ccb9]{margin-top:10px}",""])},1859:function(e,t,n){var i=n(1434);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);n(216)("097408ce",i,!0)},2332:function(e,t){e.exports={render:function(){var n=this,e=n.$createElement,i=n._self._c||e;return i("div",{staticClass:"selCommon AgentManage"},[i("el-form",{staticClass:"demo-form-inline  form_search",attrs:{inline:!0,model:n.formInline,"label-width":"90px"}},[i("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"医院："}},[i("el-select",{staticStyle:{width:"200px"},on:{change:n.onSubmit},model:{value:n.formInline.hospital,callback:function(e){n.$set(n.formInline,"hospital",e)},expression:"formInline.hospital"}},n._l(n.hospitalList,function(e,t){return i("el-option",{key:t,attrs:{label:e.supplierName,value:e.code}})}),1)],1),n._v(" "),i("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"关键字："}},[i("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"店家/联系电话"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&n._k(e.keyCode,"enter",13,e.key,"Enter")?null:n.onSubmit(e)}},model:{value:n.formInline.branchName,callback:function(e){n.$set(n.formInline,"branchName",e)},expression:"formInline.branchName"}})],1),n._v(" "),i("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"服务商："}},[i("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:""},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&n._k(e.keyCode,"enter",13,e.key,"Enter")?null:n.onSubmit(e)}},model:{value:n.formInline.serviceName,callback:function(e){n.$set(n.formInline,"serviceName",e)},expression:"formInline.serviceName"}})],1),n._v(" "),i("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"销售公司："}},[i("el-select",{staticStyle:{width:"200px"},attrs:{filterable:"",placeholder:"请选择"},model:{value:n.formInline.topBranch,callback:function(e){n.$set(n.formInline,"topBranch",e)},expression:"formInline.topBranch"}},n._l(n.topBranchList,function(e,t){return i("el-option",{key:t,attrs:{label:e.branchName,value:e.code}})}),1)],1),n._v(" "),i("el-form-item",{staticClass:"form_item_mt10",attrs:{label:" "}},[i("el-button",{staticClass:"searchBtn",attrs:{type:"primary"},on:{click:n.onSubmit}},[n._v("查询")])],1)],1),n._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:n.loading,expression:"loading"}],staticClass:"min_table smt",staticStyle:{width:"100%","margin-top":"15px","margin-bottom":"10px"},attrs:{data:n.tableData,border:"","max-height":"660"}},[i("el-table-column",{attrs:{prop:"branchName",label:"店家名称","min-width":"100"}}),n._v(" "),i("el-table-column",{attrs:{prop:"phoneNumber",label:"手机号码","min-width":"100"}}),n._v(" "),i("el-table-column",{attrs:{prop:"serviceName",label:"所属服务商","min-width":"100"}}),n._v(" "),i("el-table-column",{attrs:{prop:"shopName",label:"店铺名称","min-width":"120"}}),n._v(" "),i("el-table-column",{attrs:{prop:"businessTypeName",label:"经营类型","min-width":"90"}}),n._v(" "),i("el-table-column",{attrs:{prop:"popularity",label:"人气","min-width":"90"}}),n._v(" "),i("el-table-column",{attrs:{prop:"Code",label:"地址","min-width":"120","show-overflow-tooltip":""},scopedSlots:n._u([{key:"default",fn:function(e){return[e.row.province?i("span",[n._v(n._s(e.row.province))]):n._e(),n._v(" "),e.row.city?i("span",[n._v(n._s(e.row.city))]):n._e()]}}])}),n._v(" "),i("el-table-column",{attrs:{prop:"hospitalName",label:"医院","min-width":"140","show-overflow-tooltip":""}}),n._v(" "),i("el-table-column",{attrs:{prop:"grade",label:"操作",width:"180"},scopedSlots:n._u([{key:"default",fn:function(t){return[i("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){return n.openImgDialog(t.row)}}},[n._v("上传图片")])]}}])})],1),n._v(" "),i("div",{staticClass:"block"},[i("el-pagination",{attrs:{"current-page":n.currentPage,"page-sizes":[10,20,30,40],"page-size":n.size,layout:"total, sizes, prev, pager, next, jumper",total:n.total},on:{"size-change":n.handleSizeChange,"current-change":n.handleCurrentChange}})],1),n._v(" "),i("el-dialog",{attrs:{title:"上传图片",visible:n.imgDialog,size:"","close-on-click-modal":!1,top:"20%"},on:{"update:visible":function(e){n.imgDialog=e}}},[i("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",staticStyle:{width:"600px"},attrs:{model:n.form,"label-width":"80px"}},[i("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"店家姓名："}},[i("span",[n._v(n._s(n.form.branchName))])]),n._v(" "),i("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"手机号码："}},[i("span",[n._v(n._s(n.form.phoneNumber))])]),n._v(" "),i("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"门头照片："}},[i("el-upload",{attrs:{action:n.uploadUrl,acceptImage:n.acceptImage,"file-list":n.fileList1,multiple:!0,"list-type":"picture-card","on-success":n.onSuccess,"before-upload":n.beforeUpload,"on-preview":n.handlePictureCardPreview,"on-remove":n.handleRemove}},[i("i",{staticClass:"el-icon-plus"})])],1),n._v(" "),i("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"大厅照片："}},[i("el-upload",{attrs:{action:n.uploadUrl,acceptImage:n.acceptImage,"list-type":"picture-card","file-list":n.fileList2,multiple:!0,"on-success":n.onSuccess2,"before-upload":n.beforeUpload,"on-preview":n.handlePictureCardPreview,"on-remove":n.handleRemove}},[i("i",{staticClass:"el-icon-plus"})])],1),n._v(" "),i("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"院内环境："}},[i("el-upload",{attrs:{action:n.uploadUrl,acceptImage:n.acceptImage,"list-type":"picture-card","file-list":n.fileList3,multiple:!0,"before-upload":n.beforeUpload,"on-success":n.onSuccess3,"on-preview":n.handlePictureCardPreview,"on-remove":n.handleRemove}},[i("i",{staticClass:"el-icon-plus"})])],1)],1),n._v(" "),i("div",{staticClass:"form_footer"},[i("el-button",{attrs:{type:"primary"},on:{click:n.sure}},[n._v("确定")]),n._v(" "),i("el-button",{on:{click:n.cancel}},[n._v("取消")])],1)],1),n._v(" "),i("el-dialog",{attrs:{size:"tiny"},model:{value:n.dialogVisible,callback:function(e){n.dialogVisible=e},expression:"dialogVisible"}},[i("img",{attrs:{width:"100%",src:n.dialogImageUrl,alt:""}})])],1)},staticRenderFns:[]}},357:function(e,t,n){n(1859);var i=n(98)(n(1085),n(2332),"data-v-6fa2ccb9",null);e.exports=i.exports},441:function(e,t,n){"use strict";n.d(t,"a",function(){return l}),n.d(t,"b",function(){return i}),n.d(t,"d",function(){return r}),n.d(t,"e",function(){return a}),n.d(t,"c",function(){return o});var i="image/gif,image/jpeg,image/jpg,image/png,image/svg",l="/Image/UploadImg",a="9",r=[{name:"中国",value:"01"},{name:"中国台湾",value:"02"},{name:"韩国",value:"03"},{name:"美国",value:"04"}],o=[{name:"网页",linkType:"0",linkUrl:""},{name:"热门",linkType:"1",linkUrl:"0"},{name:"直播",linkType:"1",linkUrl:"1"},{name:"视频",linkType:"1",linkUrl:"2"},{name:"问答",linkType:"1",linkUrl:"4"},{name:"精选案例",linkType:"2",linkUrl:"0"},{name:"最新案例",linkType:"2",linkUrl:"1"},{name:"附近案例",linkType:"2",linkUrl:"2"},{name:"医院详情",linkType:"3",linkUrl:""},{name:"医生详情",linkType:"4",linkUrl:""},{name:"项目详情",linkType:"5",linkUrl:""},{name:"商品详情",linkType:"6",linkUrl:""},{name:"案例详情",linkType:"7",linkUrl:""},{name:"卡券详情",linkType:"8",linkUrl:""},{name:"活动详情",linkType:"9",linkUrl:""},{name:"问答详情",linkType:"10",linkUrl:""},{name:"视频详情",linkType:"11",linkUrl:""},{name:"直播详情",linkType:"12",linkUrl:""},{name:"医美百科",linkType:"13",linkUrl:""},{name:"金牌设计",linkType:"14",linkUrl:""},{name:"抽奖中心",linkType:"15",linkUrl:""},{name:"红包专区",linkType:"16",linkUrl:""},{name:"html扩展页面",linkType:"17",linkUrl:""},{name:"医院列表",linkType:"18",linkUrl:""},{name:"项目列表",linkType:"19",linkUrl:""},{name:"卡券列表",linkType:"20",linkUrl:""},{name:"医生列表",linkType:"21",linkUrl:""},{name:"活动列表",linkType:"22",linkUrl:""},{name:"商家列表",linkType:"23",linkUrl:""},{name:"商家商品列表",linkType:"24",linkUrl:""},{name:"商家详情",linkType:"25",linkUrl:""},{name:"商家商品详情",linkType:"26",linkUrl:""},{name:"我的-订单",linkType:"27",linkUrl:"0"},{name:"我的-邀请好友",linkType:"27",linkUrl:"1"},{name:"我的-我的消息",linkType:"27",linkUrl:"2"},{name:"我的-我的收藏",linkType:"27",linkUrl:"3"},{name:"我的-身份认证",linkType:"27",linkUrl:"4"},{name:"我的-我的财富",linkType:"27",linkUrl:"5"},{name:"我的-关于我们",linkType:"27",linkUrl:"6"},{name:"我的-联系我们",linkType:"27",linkUrl:"7"},{name:"我的-信息咨询",linkType:"27",linkUrl:"8"},{name:"医院中心",linkType:"28",linkUrl:"0"},{name:"销售公司",linkType:"28",linkUrl:"1"},{name:"消费商",linkType:"28",linkUrl:"2"},{name:"商家中心",linkType:"28",linkUrl:"3"}]},485:function(e,t,n){var i=n(487);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);n(216)("c305eb94",i,!0)},487:function(e,t,n){(e.exports=n(215)(!1)).push([e.i,".el-autocomplete-suggestion li{line-height:20px;padding:10px;border-bottom:1px solid #eef1f6}.el-autocomplete-suggestion li .select_namered{color:red}.el-autocomplete-suggestion li .select_nameblack{color:#000}.reportManage .el-form-item__error{color:#ff4949;font-size:12px;padding-top:4px;position:static!important;top:100%;left:0}.el-upload--picture-card,.el-upload-list--picture-card .el-upload-list__item{width:100px!important;height:100px!important}.el-upload--picture-card{background-color:#fbfdff;border:1px dashed #c0ccda;border-radius:6px;box-sizing:border-box;cursor:pointer;line-height:100px;vertical-align:top}.addRP .el-table__fixed-right{bottom:0!important}.el-upload-list .el-progress{width:100px!important}.el-upload-list .el-progress-circle{width:100px!important;height:100px!important}",""])}});