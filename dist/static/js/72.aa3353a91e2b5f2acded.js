webpackJsonp([72],{1007:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(100),o=n.n(a),r=n(99),s=n.n(r),i=n(37),l=n.n(i),c=n(770),m=n.n(c),u=n(452),p=n.n(u),d=n(436),f=n.n(d),h=n(64),v=n(65);n.n(v);t.default={data:function(){return{batchLoading:!1,selectData:{},ispopRead:!1,loading:!1,mes:{},branchGradeList:[],baseDataList:[],dialogTableVisible:!1,HospitalList:[],formInline:{branchGradeCode:"",consumeSource:"",type:!1},pageDate:null,typeList:[{value:0,key:"未结算"},{value:1,key:"已结算"}],date:[].pushFullMonth(),agentList:[],tableData:[],year:(new Date).getFullYear(),month:"",yearList:[],monthList:[],sum:{consumeAmount:0},total:0,currentPage:0,size:10,allData:[],detData:[]}},computed:{tHeader:function(){return 0<this.detData.length?["提成来源名称","单号","客户","提成受益人","提成等级","比例","提成金额"]:["代理姓名","代理等级名称","开户人","开户行","银行卡号","金额"]},filterVal:function(){return 0<this.detData.length?["consumeSourceName","fxCode","customerName","toName","conLevel","rate","consumeAmount"]:["branchName","branchGradeName","bankCardHolder","openBankName","bankCardId","consumeAmount"]},name:function(){return"医院结算"},reportData:function(){var e=void 0;return 0<this.detData.length?(e=JSON.parse(l()(this.detData))).forEach(function(e){e.rate=e.rate.mul(100)+"%"}):e=JSON.parse(l()(this.allData)),e},totalAmount:function(){var t=0;return this.tableData.forEach(function(e){t=t.add(e.consumeAmount)}),t}},mounted:function(){this.getBranchGradeAll(),this.GetBaseDataDicByCode()},methods:{dialogClose:function(){this.submit(),this.detData=[]},childReportData:function(e){this.detData=e,this.$refs.port.handleDownload()},getSummaries:function(){return["总合计","","","","","￥"+this.sum.consumeAmount.toQFW(),""]},getBranchGradeAll:function(){var a=this;return s()(o.a.mark(function e(){var t;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n.i(h._319)();case 3:t=e.sent,a.branchGradeList=a.numOrder(t),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}},e,a,[[0,7]])}))()},numOrder:function(e){for(var t=e.length,a=0;a<t-1;a++)for(var r=a+1;r<t;r++)if(e[a].OrderNum>e[r].OrderNum){var n=e[a];e[a]=e[r],e[r]=n}return e},GetBaseDataDicByCode:function(){var a=this;return s()(o.a.mark(function e(){var t;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n.i(h._471)({businessCode:"0040"});case 3:t=e.sent,a.baseDataList=t.data,e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}},e,a,[[0,7]])}))()},HosOutSettle:function(t){var a=this;return s()(o.a.mark(function e(){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a.date&&2===a.date.length?(t.startDate=a.date[0],t.endDate=a.date[1]):(t.startDate="",t.endDate=""),a.formInline.consumeSource&&(t.consumeSource=a.formInline.consumeSource),e.next=5,n.i(h._485)(t);case 5:e.sent.status?(a.$message({message:"结算成功",type:"success"}),a.search()):a.$message.error("结算失败"),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0);case 12:case"end":return e.stop()}},e,a,[[0,9]])}))()},detSettle:function(){this.dialogTableVisible=!1,this.search()},GetHospitalOut:function(a){var r=this;return s()(o.a.mark(function e(){var t;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,r.loading=!0,r.date&&2===r.date.length?(a.startDate=r.date[0],a.endDate=r.date[1]):(a.startDate="",a.endDate=""),a.type=a.type?1:0,a.pageIndex=r.currentPage,a.pageSize=r.size,e.next=8,n.i(h._472)(a);case 8:t=e.sent,r.loading=!1,t.status?(r.total=t.count,r.allData=t.data,r.tableData=t.data,r.getTotal()):r.$message.error("获取数据失败"+t.errorMessage),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(0),console.log(e.t0);case 16:case"end":return e.stop()}},e,r,[[0,13]])}))()},submit:function(){this.currentPage=1,this.search()},search:function(){this.sum={consumeAmount:0},this.GetHospitalOut(this.formInline)},settle:function(r,n){var o=this,e=this.$createElement;this.$msgbox({title:"提示",message:e("p",null,[e("span",null,"是否进行结算? ")]),showCancelButton:!0,confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",beforeClose:function(e,t,a){"confirm"===e&&(t.confirmButtonLoading=!0,t.confirmButtonText="执行中...",o.HosOutSettle({branchCode:n[r].branchCode}),t.confirmButtonLoading=!1),a()}}).then(function(e){})},det:function(e,t){this.mes=t[e],this.mes.consumeSource=this.formInline.consumeSource,this.dialogTableVisible=!0},openRP:function(e){this.selectData=e,this.ispopRead=!0},handleSizeChange:function(e){this.size!==e&&(this.size=e,this.search())},handleCurrentChange:function(e){this.currentPage!==e&&(this.currentPage=e,this.search())},getTotal:function(){var t=this;this.allData.forEach(function(e){t.sum.consumeAmount=t.sum.consumeAmount.add(e.consumeAmount)}),this.tableData.forEach(function(e){t.sum.consumeAmount=t.sum.consumeAmount.add(e.consumeAmount)})},batchSet:function(){var e=this;this.date&&2===this.date.length?this.$confirm("此操作将批量审核 "+this.date[0]+" - "+this.date[1]+" 的订单，是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.batchLoading=!0,e.BatchApproveProofOrder()}).catch(function(){}):this.$alert("请选择需要批量审核的日期区间 ！","提示",{confirmButtonText:"确定",type:"warning",callback:function(){}})},BatchApproveProofOrder:function(){var a=this;return s()(o.a.mark(function e(){var t;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.i(h._486)({startDate:a.date[0],endDate:a.date[1]});case 2:(t=e.sent).status?(a.allCheckdialog=!1,a.$message({type:"success",message:"审核成功!"}),a.search()):a.$message({type:"error",message:"审核失败!"+t.errorMessage}),a.batchLoading=!1;case 5:case"end":return e.stop()}},e,a)}))()}},components:{Export:f.a,det:m.a,report:p.a}}},1325:function(e,t,a){(e.exports=a(215)(!1)).push([e.i,"",""])},1750:function(e,t,a){var r=a(1325);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a(216)("29366eab",r,!0)},2222:function(e,t){e.exports={render:function(){var a=this,e=a.$createElement,r=a._self._c||e;return r("div",{staticClass:"settled selCommon"},[r("el-form",{staticClass:"demo-form-inline form_search",attrs:{inline:!0,model:a.formInline,"label-width":"80px"}},[r("el-form-item",{staticClass:"form_item_mt10 ",attrs:{label:"筛选日期："}},[r("el-date-picker",{staticStyle:{width:"200px"},attrs:{type:"daterange","value-format":"yyyy-MM-dd",clearable:!1,placeholder:"选择日期"},model:{value:a.date,callback:function(e){a.date=e},expression:"date"}})],1),a._v(" "),r("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"代理等级："}},[r("el-select",{staticClass:"form_item",model:{value:a.formInline.branchGradeCode,callback:function(e){a.$set(a.formInline,"branchGradeCode",e)},expression:"formInline.branchGradeCode"}},a._l(a.branchGradeList,function(e){return r("el-option",{key:e.Id,attrs:{label:e.BranchGradeName,value:e.Code}})}),1)],1),a._v(" "),r("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"提成来源："}},[r("el-select",{staticClass:"form_item",model:{value:a.formInline.consumeSource,callback:function(e){a.$set(a.formInline,"consumeSource",e)},expression:"formInline.consumeSource"}},a._l(a.baseDataList,function(e){return r("el-option",{key:e.id,attrs:{label:e.dataName,value:e.dataCode}})}),1)],1),a._v(" "),r("el-form-item",{staticClass:"form_item_mt10 form_item_wh280",attrs:{label:" "}},[r("el-button",{staticClass:"searchBtn",attrs:{type:"primary"},on:{click:a.submit}},[a._v("查询")]),a._v(" "),r("Export",{ref:"port",attrs:{tHeader:a.tHeader,filterVal:a.filterVal,tableData1:a.reportData,name:a.name}})],1)],1),a._v(" "),r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:a.loading,expression:"loading"}],staticClass:"min_table smt",staticStyle:{width:"100%","margin-top":"15px","margin-bottom":"10px"},attrs:{data:a.tableData,border:"","max-height":"660","show-summary":"","summary-method":a.getSummaries}},[r("el-table-column",{attrs:{prop:"branchName",label:"代理姓名","min-width":"80",align:"center"}}),a._v(" "),r("el-table-column",{attrs:{prop:"branchGradeName",label:"代理等级名称","min-width":"80"}}),a._v(" "),r("el-table-column",{attrs:{label:"开户人",prop:"toName","min-width":"100"},scopedSlots:a._u([{key:"default",fn:function(e){return[a._v("\n                 "+a._s(e.row.bankCardHolder)+"\n             ")]}}])}),a._v(" "),r("el-table-column",{attrs:{label:"开户行",prop:"toName","min-width":"100"},scopedSlots:a._u([{key:"default",fn:function(e){return[r("span",[a._v(a._s(e.row.openBankName))])]}}])}),a._v(" "),r("el-table-column",{attrs:{label:"银行卡号",prop:"toName","min-width":"100",align:"center"},scopedSlots:a._u([{key:"default",fn:function(e){return[a._v("\n                 "+a._s(e.row.bankCardId)+"\n             ")]}}])}),a._v(" "),r("el-table-column",{staticStyle:{color:"red"},attrs:{label:"金额",prop:"consumeAmount","min-width":"120",align:"right"},scopedSlots:a._u([{key:"default",fn:function(t){return[r("el-button",{staticStyle:{float:"right"},attrs:{type:"text",size:"small"},on:{click:function(e){return a.det(t.$index,a.tableData)}}},[a._v("￥"+a._s(t.row.consumeAmount.toQFW()))])]}}])}),a._v(" "),r("el-table-column",{attrs:{label:"操作",prop:"toName",width:"120",align:"center"},scopedSlots:a._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){return a.settle(t.$index,a.tableData)}}},[a._v("结算")])]}}])})],1),a._v(" "),r("div",{staticStyle:{float:"left"}},[r("el-button",{attrs:{type:"primary",loading:a.batchLoading},on:{click:a.batchSet}},[a._v("一键审核")])],1),a._v(" "),r("div",{staticClass:"block"},[r("el-pagination",{attrs:{"current-page":a.currentPage,"page-sizes":[10,20,30,40],"page-size":a.size,layout:"total, sizes, prev, pager, next, jumper",total:a.total},on:{"size-change":a.handleSizeChange,"current-change":a.handleCurrentChange}})],1),a._v(" "),r("el-dialog",{attrs:{title:"详情",visible:a.dialogTableVisible,size:""},on:{"update:visible":function(e){a.dialogTableVisible=e},close:a.dialogClose}},[a.dialogTableVisible?r("det",{staticStyle:{width:"1100px"},attrs:{mes:a.mes,date:a.date,"is-finished":a.formInline.type},on:{reportData:a.childReportData,detSettle:a.detSettle,openRP:a.openRP}}):a._e()],1),a._v(" "),r("el-dialog",{attrs:{title:"订单详情",visible:a.ispopRead,top:"5%",size:""},on:{"update:visible":function(e){a.ispopRead=e}}},[a.ispopRead?r("report",{staticStyle:{width:"900px"},attrs:{data:a.selectData}}):a._e()],1)],1)},staticRenderFns:[]}},300:function(e,t,a){a(1750);var r=a(98)(a(1007),a(2222),"data-v-3646ef56",null);e.exports=r.exports},436:function(e,t,a){a(439);var r=a(98)(a(437),a(440),"data-v-6c47323e",null);e.exports=r.exports},437:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:{tHeader:{},filterVal:{},tableData1:{type:Array},name:""},watch:{tableData1:{handler:function(e){this.otData=e},deep:!0}},data:function(){return{otData:[]}},methods:{handleDownload:function(){var a=this;r.e(220).then(function(){var e=r(448).export_json_to_excel,t=[];t=0!=a.otData.length?a.formatJson(a.filterVal,a.otData):a.formatJson(a.filterVal,a.tableData1),e(a.tHeader,t,a.name)}.bind(null,r)).catch(r.oe)},formatJson:function(e,t){return t.map(function(t){return e.map(function(e){return t[e]})})}}}},438:function(e,t,a){(e.exports=a(215)(!1)).push([e.i,".exportBtn[data-v-6c47323e]{background:#fff;border:1px solid #d6d4d4;font-size:14px;color:#666;border-radius:4px}",""])},439:function(e,t,a){var r=a(438);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a(216)("fdf4f478",r,!0)},440:function(e,t){e.exports={render:function(){var e=this.$createElement;return(this._self._c||e)("el-button",{staticClass:"exportBtn",attrs:{type:"primary"},on:{click:this.handleDownload}},[this._v("导出报表")])},staticRenderFns:[]}},449:function(e,t,D){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=D(100),S=D.n(a),r=D(103),N=D.n(r),n=D(66),k=D.n(n),o=D(102),T=D.n(o),s=D(99),i=D.n(s),A=D(101),I=D(64),l=D(22);t.default={props:{data:Object},data:function(){return{fileList:[],formData:{MedicalTypeId:"",OrderDate:"",formNO:"",customerId:"",customerName:"",refrenceBranchCode:"",refrenceBranchName:"",projectId:"",projectName:"",goodsUnitId:"",goodsUnitName:"",OrderAmount:0,hospitalId:"",hospitalName:"",serviceManId:"",serviceManName:"",designer:"",designerName:"",designerAssist:"",designerAssistName:"",doctorAssist:"",doctorAssistName:"",price:"",course:"",serviceFare:"",Memo:"",RealAmount:"",ConsumeTypeId:"",ConsumeTypeName:"",RefrenceHospitalName:""},baseImgPath:A.b,attachList:[],payInfoList:[],commandList:[],errorList:[],refundList:[],backList:[],MedicalTypeList:[],typeList:[],imgList:[],dialogImg:"",photoDialog:!1,serTypeCode:D.i(l.b)("serTypeCode")}},created:function(){var e="";e=this.data.FxCode?this.data.FxCode:this.data.fxCode,this.getDetail(e)},computed:{Retainage:function(){var t=this.formData.OrderAmount;return 0<this.payInfoList.length&&this.payInfoList.forEach(function(e){t=Number(e.RealAmount).red(Number(t))}),t}},filters:{filterTypeId:function(e){switch(e){case 2:return"医院积分";case 3:return"纹绣积分";case 4:return"皮肤科积分"}}},methods:{viewPhoto:function(e){this.dialogImg=e,this.photoDialog=!0},getDetail:function(w){var C=this;return i()(S.a.mark(function e(){var t,a,r,n,o,s,i,l,c,m,u,p,d,f,h,v,_,b,g,x,y;return S.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k.a.all([D.i(I._152)({fxCode:w}),D.i(I._62)(),D.i(I._153)(w),D.i(I._154)({fxcode:w}),D.i(I._155)({fxcode:w})]);case 2:if(t=e.sent,a=T()(t,5),r=a[0],n=a[1],o=a[2],s=a[3],i=a[4],C.errorList=r.data,l=[],n.forEach(function(e){"0017"==e.BusinessCode&&C.typeList.push(e),"0022"==e.BusinessCode&&C.MedicalTypeList.push(e),"0006"==e.BusinessCode&&l.push(e)}),i.status&&(C.backList=i.data),s.status&&(C.refundList=s.data.orderCashOutList),C.initAll(o.ProofOrder),(c=["ImgUrl1","ImgUrl2","ImgUrl3","ImgUrl4","ImgUrl5"]).forEach(function(e,t){o.ProofOrder[c[t]]&&C.imgList.push(A.b+o.ProofOrder[c[t]])}),console.log(C.imgList),C.commandList=o.OrderCommandList,o.ProofOrderExtList&&0<o.ProofOrderExtList.length&&(C.attachList=o.ProofOrderExtList),!(o.ProofOrderPayList&&0<o.ProofOrderPayList.length)){e.next=65;break}u=!(m=!0),p=void 0,e.prev=24,d=N()(o.ProofOrderPayList);case 26:if(m=(f=d.next()).done){e.next=50;break}for(h=f.value,_=!(v=!0),b=void 0,e.prev=31,g=N()(l);!(v=(x=g.next()).done);v=!0)y=x.value,h.PayType===y.DataCode&&(h.PayTypeName=y.DataName);e.next=39;break;case 35:e.prev=35,e.t0=e.catch(31),_=!0,b=e.t0;case 39:e.prev=39,e.prev=40,!v&&g.return&&g.return();case 42:if(e.prev=42,_)throw b;e.next=45;break;case 45:return e.finish(42);case 46:return e.finish(39);case 47:m=!0,e.next=26;break;case 50:e.next=56;break;case 52:e.prev=52,e.t1=e.catch(24),u=!0,p=e.t1;case 56:e.prev=56,e.prev=57,!m&&d.return&&d.return();case 59:if(e.prev=59,u)throw p;e.next=62;break;case 62:return e.finish(59);case 63:return e.finish(56);case 64:C.payInfoList=o.ProofOrderPayList;case 65:case"end":return e.stop()}},e,C,[[24,52,56,64],[31,35,39,47],[40,,42,46],[57,,59,63]])}))()},getName:function(e,t){var a=!0,r=!1,n=void 0;try{for(var o,s=N()(t);!(a=(o=s.next()).done);a=!0){var i=o.value;if(i.DataCode==e)return i.DataName}}catch(e){r=!0,n=e}finally{try{!a&&s.return&&s.return()}finally{if(r)throw n}}},initAll:function(e){var t=e;this.formData={projectType:t.ProjectType,OrderDate:t.OrderDate,fxCode:t.FxCode,Id:t.Id,ConsumeTypeId:t.ConsumeTypeId,ConsumeTypeName:this.getName(t.ConsumeTypeId,this.typeList),MedicalTypeName:this.getName(t.MedicalTypeId,this.MedicalTypeList),formNO:t.FormNO,customerId:t.CustomerId,customerName:t.CustomerName,refrenceBranchCode:t.RefrenceBranchCode?t.RefrenceBranchCode:"",refrenceBranchName:t.RefrenceBranchName?t.RefrenceBranchName:"",RefrenceBranchTags:t.RefrenceBranchTags?t.RefrenceBranchTags:"",projectId:t.ProjectId,projectName:t.ProjectName,hospitalId:t.HospitalId,hospitalName:t.HospitalName,serviceManId:t.ServiceManId,serviceManName:t.ServiceManName,designer:t.Designer||"",OrderAmount:t.OrderAmount,designerName:t.DesignerName||"",designerAssist:t.DesignerAssist||"",designerAssistName:t.DesignerAssistName||"",doctorAssist:t.DoctorAssist||"",doctorAssistName:t.DoctorAssistName||"",price:t.Price,course:t.Course,goodsUnitId:t.GoodsUnitId+"",goodsUnitName:t.GoodsUnitName,serviceFare:t.ServiceFare+"",Memo:t.Memo||"",RealAmount:t.RealAmount,MarketConsultantName:t.MarketConsultantName,MarketConsultantCode:t.MarketConsultantCode,RealPrice:t.RealPrice,RefrenceHospitalName:"",orderType:t.OrderType};for(var a=1;a<=5;a++)if(t["ImgUrl"+a]&&""!==t["ImgUrl"+a]){var r={name:"ImgUrl"+a,url:A.b+t["ImgUrl"+a]};this.fileList.push(r)}this.GetBranchByCode(t.RefrenceBranchCode)},GetBranchByCode:function(a){var r=this;return i()(S.a.mark(function e(){var t;return S.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,D.i(I._51)({branchcode:a});case 2:t=e.sent,r.formData.RefrenceHospitalName=t.Branch.HospitalName?t.Branch.HospitalName:"";case 4:case"end":return e.stop()}},e,r)}))()}}}},450:function(e,t,a){(e.exports=a(215)(!1)).push([e.i,".flex-box[data-v-22b52a7a]{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;width:100%;margin-bottom:5px;background:#f9f9f9}.flex-box .flex-item[data-v-22b52a7a]{-webkit-box-flex:0;-ms-flex:0 50%;flex:0 50%;margin-top:10px}.foot-div[data-v-22b52a7a]{background:#f9f9f9}.reportManage[data-v-22b52a7a]{font-size:12px;position:relative;margin:0;padding:0;overflow:auto}",""])},451:function(e,t,a){var r=a(450);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a(216)("203f4032",r,!0)},452:function(e,t,a){a(451);var r=a(98)(a(449),a(453),"data-v-22b52a7a",null);e.exports=r.exports},453:function(e,t){e.exports={render:function(){var a=this,e=a.$createElement,r=a._self._c||e;return r("div",{staticClass:"reportManage"},[r("div",[r("p",{staticStyle:{"font-size":"16px","font-weight":"bold"}},[a._v("项目信息")]),a._v(" "),r("div",{staticClass:"flex-box"},[r("div",{staticClass:"flex-item"},[r("el-form",{ref:"formAdd1",attrs:{"label-position":"right","label-width":"120px",model:a.formData}},[r("el-form-item",{staticClass:"form_item_mt0",attrs:{label:"订单日期："}},[r("span",[a._v(a._s(a.formData.OrderDate.substring(0,10))+" ")])]),a._v(" "),r("el-form-item",{staticClass:"form_item_mt0",attrs:{label:"类型："}},[r("span",[a._v(a._s(a.formData.ConsumeTypeName))])]),a._v(" "),r("el-form-item",{staticClass:"form_item_mt0",attrs:{label:"客户："}},[r("span",[a._v(a._s(a.formData.customerName)+"["+a._s(a.formData.customerId)+"]")])]),a._v(" "),r("el-form-item",{staticClass:"form_item_mt0",attrs:{label:"项目："}},[r("span",[a._v(a._s(a.formData.projectName))])]),a._v(" "),r("el-form-item",{staticClass:"form_item_mt0",attrs:{label:"项目类型："}},[0==a.formData.projectType?r("span",[a._v("年卡/疗程")]):a._e(),a._v(" "),1==a.formData.projectType?r("span",[a._v("单次")]):a._e()]),a._v(" "),r("el-form-item",{staticClass:"form_item_mt0",attrs:{label:"疗程：",prop:"refrenceBranchCode"}},[r("span",[a._v(a._s(a.formData.course))])]),a._v(" "),r("el-form-item",{staticClass:"form_item_mt0",attrs:{label:"医院：",prop:"hospitalName"}},[r("span",[a._v(a._s(a.formData.hospitalName))])]),a._v(" "),r("el-form-item",{staticClass:"form_item_mt0",attrs:{label:"咨询师："}},[r("span",[a._v(a._s(a.formData.MarketConsultantName))]),a._v(" "),a.formData.MarketConsultantCode?r("span",[a._v("["+a._s(a.formData.MarketConsultantCode)+"]")]):a._e()]),a._v(" "),r("el-form-item",{staticClass:"form_item_mt0",attrs:{label:"设计师：",prop:"refrenceBranchCode"}},[r("span",[a._v(a._s(a.formData.designerName))])]),a._v(" "),"001"!=a.serTypeCode&&"003"!=a.serTypeCode?r("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"实际价格：",prop:"refrenceBranchCode"}},[r("span",[a._v(a._s(a.formData.RealPrice))])]):a._e()],1)],1),a._v(" "),r("div",{staticClass:"flex-item"},[r("el-form",{ref:"formAdd2",attrs:{"label-position":"right","label-width":"120px",model:a.formData}},[r("el-form-item",{staticClass:"form_item_mt0",attrs:{label:"订单编号"}},[r("span",[a._v(a._s(a.formData.fxCode))])]),a._v(" "),r("el-form-item",{staticClass:"form_item_mt0",attrs:{label:"支付类型："}},[r("span",[a._v(a._s(a.formData.MedicalTypeName))])]),a._v(" "),r("el-form-item",{staticClass:"form_item_mt0",attrs:{label:"纸质单号：",prop:"formNO"}},[r("span",[a._v(a._s(a.formData.formNO))])]),a._v(" "),r("el-form-item",{staticClass:"form_item_mt0",attrs:{label:"推荐人：",prop:"refrenceBranchCode"}},[r("div",{directives:[{name:"show",rawName:"v-show",value:""!==a.formData.refrenceBranchCode,expression:"formData.refrenceBranchCode!==''"}]},[a._v(a._s(a.formData.refrenceBranchName+"["+a.formData.refrenceBranchCode+"]")+"\n                            "),a.formData.RefrenceBranchTags?r("span",[a._v("("+a._s(a.formData.RefrenceBranchTags)+")")]):a._e()]),a._v(" "),r("div",[a._v("医院："+a._s(a.formData.RefrenceHospitalName))])]),a._v(" "),r("el-form-item",{staticClass:"form_item_mt0",attrs:{label:"规格："}},[r("span",[a._v(a._s(a.formData.goodsUnitName))])]),a._v(" "),r("el-form-item",{staticClass:"form_item_mt0",attrs:{label:"项目价格：",prop:"price"}},[r("span",{directives:[{name:"show",rawName:"v-show",value:""!=a.formData.price,expression:"formData.price!=''"}]},[r("span",{staticStyle:{"font-size":"15px",color:"black"}},[a._v("￥")]),a._v(a._s(a.formData.price))])]),a._v(" "),r("el-form-item",{staticClass:"form_item_mt0",attrs:{label:"专家费：",prop:"serviceFare"}},[r("span",{directives:[{name:"show",rawName:"v-show",value:""!=a.formData.serviceFare,expression:"formData.serviceFare!=''"}]},[a._v(a._s(a.formData.serviceFare)+"元")])]),a._v(" "),r("el-form-item",{staticClass:"form_item_mt0",attrs:{label:"医生助理：",prop:"doctorAssist"}},[r("span",[a._v(a._s(a.formData.doctorAssistName))])]),a._v(" "),r("el-form-item",{staticClass:"form_item_mt0",attrs:{label:"设计师助理：",prop:"designerAssist"}},[r("span",[a._v(a._s(a.formData.designerAssistName))])]),a._v(" "),r("el-form-item",{staticClass:"form_item_mt0",attrs:{label:"订单来源：",prop:"designerAssist"}},[r("span",{domProps:{textContent:a._s(1==a.formData.orderType?"app订单":"线下订单")}})])],1)],1)])]),a._v(" "),"001"!=a.serTypeCode&&"003"!=a.serTypeCode?r("div",{staticClass:"flex-box",staticStyle:{"margin-top":"-30px"}},[r("div",{staticClass:"flex-item",staticStyle:{margin:"20px 0px 0 30px","padding-left":"30px",flex:"0 100%"}},[r("el-table",{attrs:{data:a.attachList,border:"","min-width":"500"}},[r("el-table-column",{attrs:{type:"index",label:"序号",width:"70"}}),a._v(" "),r("el-table-column",{attrs:{prop:"ProofDesc",label:"附加项名称","min-width":"60"}}),a._v(" "),r("el-table-column",{attrs:{prop:"TypeName",label:"费用类型","min-width":"60"}}),a._v(" "),r("el-table-column",{attrs:{prop:"Amount",label:"单价","min-width":"60"}},[a._v("\n                    ￥"+a._s(a.formData.Amount)+"\n                ")]),a._v(" "),r("el-table-column",{attrs:{prop:"Quantity",label:"数量","min-width":"60"}}),a._v(" "),r("el-table-column",{attrs:{prop:"Course",label:"总期数","min-width":"65"}}),a._v(" "),r("el-table-column",{attrs:{prop:"CurrentCourse",label:"支付期数","min-width":"65"}}),a._v(" "),r("el-table-column",{attrs:{prop:"SubTotal",label:"总额","min-width":"65"}},[a._v("\n                        ￥"+a._s(a.formData.SubTotal)+"\n                    ")]),a._v(" "),r("el-table-column",{attrs:{prop:"StageAmount",label:"分期总额","min-width":"65"}}),a._v(" "),r("el-table-column",{attrs:{prop:"IsEffective",label:"是否提成"},scopedSlots:a._u([{key:"default",fn:function(e){return[e.row.IsEffective?r("span",[a._v("是")]):r("span",[a._v("否")])]}}],null,!1,910863426)})],1),a._v(" "),""!=a.formData.OrderAmount?r("p",{staticStyle:{margin:"10px 0"}},[a._v("订单金额: ￥"+a._s(a.formData.OrderAmount)+" ")]):a._e()],1)]):a._e(),a._v(" "),"001"!=a.serTypeCode&&"003"!=a.serTypeCode?r("div",[r("p",{staticStyle:{"font-size":"16px","font-weight":"bold"}},[a._v("支付信息")]),a._v(" "),r("div",{staticClass:"flex-box"},[r("div",{staticClass:"flex-item",staticStyle:{margin:"10px 0px 0 30px","padding-left":"30px",flex:"0 100%"}},[r("el-table",{attrs:{data:a.payInfoList,border:"","min-width":"500"}},[r("el-table-column",{attrs:{type:"index",label:"序号",width:"70"}}),a._v(" "),r("el-table-column",{attrs:{prop:"PayTypeName",label:"支付方式","min-width":"100"},scopedSlots:a._u([{key:"default",fn:function(e){return[r("span",[a._v(a._s(e.row.PayTypeName))]),a._v(" "),"009"==e.row.PayType?r("span",[a._v(a._s(a._f("filterTypeId")(e.row.TypeId)))]):a._e()]}}],null,!1,3806112968)}),a._v(" "),r("el-table-column",{attrs:{prop:"OnlineOrderCode",label:"app订单号","min-width":"80"}}),a._v(" "),r("el-table-column",{attrs:{prop:"PayDate",label:"支付日期","min-width":"110"},scopedSlots:a._u([{key:"default",fn:function(e){return[e.row.PayDate?r("span",[a._v(a._s(e.row.PayDate.substring(0,10))+" "+a._s(e.row.PayDate.substring(11,19)))]):a._e()]}}],null,!1,435555505)}),a._v(" "),r("el-table-column",{attrs:{prop:"TicketsCode",label:"券号","min-width":"110"}}),a._v(" "),r("el-table-column",{attrs:{prop:"ReceiveAccount",label:"收款账户","min-width":"110"}}),a._v(" "),r("el-table-column",{attrs:{prop:"RealAmount",label:"支付金额","min-width":"120"},scopedSlots:a._u([{key:"default",fn:function(e){return[e.row.RealAmount?r("span",[a._v("\n                                "+a._s(e.row.RealAmount.toQFW())+"\n                            ")]):a._e()]}}],null,!1,1674943245)}),a._v(" "),r("el-table-column",{attrs:{prop:"Memo",label:"备注","min-width":"120","show-overflow-tooltip":""}})],1),a._v(" "),r("div",{staticStyle:{margin:"5px"}},[a._v("\n                    尾款金额："+a._s(a.Retainage)+"\n                ")])],1)])]):a._e(),a._v(" "),r("div",[r("p",{staticStyle:{"font-size":"16px","font-weight":"bold"}},[a._v("执行信息")]),a._v(" "),r("div",{staticClass:"flex-box"},[r("div",{staticClass:"flex-item",staticStyle:{margin:"10px 0px 0 30px","padding-left":"30px",flex:"0 100%"}},[r("el-table",{attrs:{data:a.commandList,border:"","min-width":"500"}},[r("el-table-column",{attrs:{type:"index",label:"序号",width:"70"}}),a._v(" "),r("el-table-column",{attrs:{prop:"DoctorName",label:"执行医生","min-width":"100"}}),a._v(" "),r("el-table-column",{attrs:{prop:"NurseName",label:"执行护士","min-width":"100"}}),a._v(" "),r("el-table-column",{attrs:{prop:"DoctorAssistName",label:"医生助理","min-width":"100"}}),a._v(" "),r("el-table-column",{attrs:{prop:"ExecDate",label:"执行时间","min-width":"100"},scopedSlots:a._u([{key:"default",fn:function(e){return[e.row.ExecDate?r("span",[a._v("\n                                "+a._s(e.row.ExecDate.substring(0,10))+"\n                            ")]):a._e()]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"Memo",label:"备注","min-width":"170","show-overflow-tooltip":""}})],1)],1)])]),a._v(" "),"7"==a.formData.ConsumeTypeId?r("div",[r("p",{staticStyle:{"font-size":"16px","font-weight":"bold"}},[a._v("返款信息")]),a._v(" "),r("div",{staticClass:"flex-box"},[r("div",{staticClass:"flex-item",staticStyle:{margin:"10px 0px 0 30px","padding-left":"30px",flex:"0 100%"}},[r("el-table",{attrs:{data:a.refundList,border:"","min-width":"500"}},[r("el-table-column",{attrs:{type:"createOn",label:"返款时间","min-width":"100"},scopedSlots:a._u([{key:"default",fn:function(e){return[e.row.createOn?r("span",[a._v(a._s(e.row.createOn.substring(0,10)))]):a._e()]}}],null,!1,2995543066)}),a._v(" "),r("el-table-column",{attrs:{prop:"payType",label:"返款方式","min-width":"100"},scopedSlots:a._u([{key:"default",fn:function(e){return["001"==e.row.payType?r("span",[a._v("现金")]):a._e(),a._v(" "),"009"==e.row.payType?r("span",[a._v("积分")]):a._e(),a._v(" "),"008"==e.row.payType?r("span",[a._v("卡券")]):a._e(),a._v(" "),"018"==e.row.payType?r("span",[a._v("预付款")]):a._e()]}}],null,!1,1690063530)}),a._v(" "),r("el-table-column",{attrs:{prop:"worthAmount",label:"返款金额","min-width":"100"}}),a._v(" "),r("el-table-column",{attrs:{prop:"pointAmount",label:"返款积分","min-width":"100"}}),a._v(" "),r("el-table-column",{attrs:{prop:"ticketsCode",label:"返款券号","min-width":"100"}}),a._v(" "),r("el-table-column",{attrs:{prop:"createBy",label:"操作人","min-width":"100"}}),a._v(" "),r("el-table-column",{attrs:{prop:"memo",label:"备注","min-width":"150","show-overflow-tooltip":""}})],1)],1)])]):a._e(),a._v(" "),"001"!=a.serTypeCode&&"003"!=a.serTypeCode?r("div",[r("p",{staticStyle:{"font-size":"16px","font-weight":"bold"}},[a._v("退款信息")]),a._v(" "),r("div",{staticClass:"flex-box"},[r("div",{staticClass:"flex-item",staticStyle:{margin:"10px 0px 0 30px","padding-left":"30px",flex:"0 100%"}},[r("el-table",{attrs:{data:a.backList,border:"","min-width":"500"}},[r("el-table-column",{attrs:{type:"createOn",label:"退款时间","min-width":"100"},scopedSlots:a._u([{key:"default",fn:function(e){return[e.row.createOn?r("span",[a._v(a._s(e.row.createOn.substring(0,10)))]):a._e()]}}],null,!1,2995543066)}),a._v(" "),r("el-table-column",{attrs:{prop:"payType",label:"退款方式","min-width":"110"},scopedSlots:a._u([{key:"default",fn:function(e){return["001"==e.row.payType?r("span",[a._v("现金")]):a._e(),a._v(" "),"009"==e.row.payType?r("span",[a._v("积分")]):a._e(),a._v(" "),"008"==e.row.payType?r("span",[a._v("卡券")]):a._e(),a._v(" "),"018"==e.row.payType?r("span",[a._v("预付款")]):a._e()]}}],null,!1,1690063530)}),a._v(" "),r("el-table-column",{attrs:{prop:"ticketsCode",label:"退款券号","min-width":"110"}}),a._v(" "),r("el-table-column",{attrs:{prop:"refundAmount",label:"退款金额","min-width":"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"createBy",label:"操作人","min-width":"110"}}),a._v(" "),r("el-table-column",{attrs:{prop:"memo",label:"备注","min-width":"200","show-overflow-tooltip":""}})],1)],1)])]):a._e(),a._v(" "),r("div",[r("p",{staticStyle:{"font-size":"16px","font-weight":"bold"}},[a._v("其它信息")]),a._v(" "),r("div",{staticClass:"foot-div"},[r("el-form",{ref:"formAdd3",attrs:{"label-position":"right","label-width":"120px",model:a.formData}},[r("el-form-item",{staticClass:" form_item_mt10",attrs:{label:"错误信息："}},[r("el-table",{attrs:{data:a.errorList,border:"","min-width":"500"}},[r("el-table-column",{attrs:{type:"index",label:"","min-width":"70"}}),a._v(" "),r("el-table-column",{attrs:{prop:"recordName",label:"录单人","min-width":"110"}}),a._v(" "),r("el-table-column",{attrs:{prop:"errorReason",label:"错误原因","min-width":"110"}}),a._v(" "),r("el-table-column",{attrs:{prop:"approverName",label:"审核人","min-width":"110"}}),a._v(" "),r("el-table-column",{attrs:{prop:"approverDate",label:"审核时间","min-width":"110"},scopedSlots:a._u([{key:"default",fn:function(e){return[e.row.approverDate?r("span",[a._v("\n                               "+a._s(e.row.approverDate.substring(0,10))+"\n                             ")]):a._e()]}}])})],1)],1),a._v(" "),r("el-form-item",{attrs:{label:"备注："}},[r("el-input",{attrs:{disabled:!0,type:"textarea",rows:2},model:{value:a.formData.Memo,callback:function(e){a.$set(a.formData,"Memo",e)},expression:"formData.Memo"}})],1),a._v(" "),r("el-form-item",{attrs:{label:"图片"}},a._l(a.fileList,function(t,e){return r("img",{key:e,attrs:{width:"100",height:"",src:t.url},on:{click:function(e){return a.viewPhoto(t.url)}}})}),0)],1)],1)]),a._v(" "),r("el-dialog",{attrs:{title:"查看图片",visible:a.photoDialog,modal:!1,size:"",top:"40%"},on:{"update:visible":function(e){a.photoDialog=e}}},[r("img",{attrs:{src:a.dialogImg,width:"600",alt:""}})])],1)},staticRenderFns:[]}},687:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r(100),n=r.n(a),o=r(99),s=r.n(o),i=r(64);t.default={props:{mes:Object,date:null,isFinished:!1},watch:{},computed:{setAmount:function(){var t=0;return this.multipleSelection.forEach(function(e){t=t.add(e.consumeAmount)}),t}},mounted:function(){this.GetHospitalOutDetail()},data:function(){return{loading:!1,branch:{},total:0,multipleTable:[],showMes:{type:"",baseMes:""},multipleSelection:[],tableData:[],pageIndex:1,pageSize:10}},methods:{reportData:function(){this.$emit("reportData",this.tableData)},backOpe:function(t){var a=this;return s()(n.a.mark(function e(){return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:a.$confirm("此操作将修改该单据为未审核状态，是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){a.RevokeApprove({fxCode:t.fxCode||"",customerCode:t.customerCode||"",consumeSource:t.consumeSource||""})}).catch(function(){});case 1:case"end":return e.stop()}},e,a)}))()},RevokeApprove:function(t){var a=this;return s()(n.a.mark(function e(){return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r.i(i._474)(t);case 2:e.sent.status?(a.$message({message:"撤回成功",type:"success"}),a.GetHospitalOutDetail()):a.$message.error("撤回失败");case 4:case"end":return e.stop()}},e,a)}))()},GetHospitalOutDetail:function(){var a=this;return s()(n.a.mark(function e(){var t;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a.loading=!0,e.next=3,r.i(i._475)({branchCode:a.mes.branchCode,consumeSource:a.mes.consumeSource,startDate:(a.date||[])[0]||"",endDate:(a.date||[])[1]||"",type:a.isFinished?1:0,pageIndex:a.pageIndex,pageSize:a.pageSize});case 3:t=e.sent,a.loading=!1,a.tableData=t.data,a.total=t.count;case 7:case"end":return e.stop()}},e,a)}))()},handleSelectionChange:function(e){this.multipleSelection=e},getPD:function(e){this.$emit("openRP",e)},settle:function(){var n=this;this.multipleSelection&&0!==this.multipleSelection.length?this.$confirm("确定进行结算操作？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var t={};n.multipleSelection.forEach(function(e){t[""+e.consumeSource]||(t[""+e.consumeSource]=[]),t[""+e.consumeSource].push(e.id)});var e=[];for(var a in t){var r=t[a].join(",");e.push(a+"@"+r)}n.HospitalDetailSettlement(e.join("|"))}).catch(function(){}):this.$alert("请选择需要结算的单据 !","提示",{confirmButtonText:"确定",type:"warning",callback:function(){}})},HospitalDetailSettlement:function(t){var a=this;return s()(n.a.mark(function e(){return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r.i(i._476)({ids:t});case 2:e.sent.status?(a.$message({message:"结算成功",type:"success"}),a.$emit("detSettle")):a.$message.error("结算失败");case 4:case"end":return e.stop()}},e,a)}))()},handleSizeChange:function(e){this.pageSize!=e&&(this.pageSize=e,this.GetHospitalOutDetail())},handleCurrentChange:function(e){this.pageIndex!=e&&(this.pageIndex=e,this.GetHospitalOutDetail())}},components:{}}},719:function(e,t,a){(e.exports=a(215)(!1)).push([e.i,"",""])},753:function(e,t,a){var r=a(719);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a(216)("e73615c6",r,!0)},770:function(e,t,a){a(753);var r=a(98)(a(687),a(795),"data-v-5de5c2b8",null);e.exports=r.exports},795:function(e,t){e.exports={render:function(){var a=this,e=a.$createElement,r=a._self._c||e;return r("div",{staticClass:"selCommon"},[a.isFinished?a._e():r("div",{staticStyle:{"margin-bottom":"10px"}},[r("span",[a._v("  结算金额："+a._s(a.setAmount))]),a._v(" "),r("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary"},on:{click:a.settle}},[a._v("结算")]),a._v(" "),r("el-button",{staticStyle:{"margin-left":"10px"},on:{click:a.reportData}},[a._v("导出报表")])],1),a._v(" "),r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:a.loading,expression:"loading"}],ref:"multipleTable",staticClass:"min_table smt",staticStyle:{width:"100%"},attrs:{data:a.tableData,border:"","tooltip-effect":"dark","max-height":"560"},on:{"selection-change":a.handleSelectionChange}},[r("el-table-column",{attrs:{type:"selection",align:"center","min-width":"55"}}),a._v(" "),r("el-table-column",{attrs:{label:"提成来源名称","min-width":"100"},scopedSlots:a._u([{key:"default",fn:function(e){return[r("span",[a._v(a._s(e.row.consumeSourceName))])]}}])}),a._v(" "),r("el-table-column",{attrs:{label:"单号","min-width":"100"},scopedSlots:a._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{type:"text"},on:{click:function(e){return a.getPD(t.row)}}},[a._v(a._s(t.row.fxCode))])]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"customerName",label:"客户","min-width":"80"}}),a._v(" "),r("el-table-column",{attrs:{prop:"toName",label:"提成受益人","min-width":"80"},scopedSlots:a._u([{key:"default",fn:function(e){return[r("span",[a._v(a._s(e.row.toName))]),r("br"),a._v(" "),r("span",[a._v(a._s(e.row.toCode))])]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"conLevel",label:"提成等级","min-width":"50"}}),a._v(" "),r("el-table-column",{attrs:{prop:"rate",label:"比例","min-width":"85"},scopedSlots:a._u([{key:"default",fn:function(e){return[a._v("\n                "+a._s(e.row.rate.mul(100))+"%\n            ")]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"consumeAmount",label:"提成金额","min-width":"85",align:"right"},scopedSlots:a._u([{key:"default",fn:function(e){return[e.row.consumeAmount?r("span",[a._v(" ￥"+a._s(e.row.consumeAmount.toQFW()))]):r("span",[a._v(" ￥0")])]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"consumeAmount",label:"操作","min-width":"85",align:"center"},scopedSlots:a._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){return a.backOpe(t.row)}}},[a._v("撤回审核")])]}}])})],1),a._v(" "),r("div",{staticClass:"clear"},[r("div",{staticClass:"block"},[r("el-pagination",{attrs:{"current-page":a.pageIndex,"page-sizes":[10,20,30,40],"page-size":a.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:a.total},on:{"size-change":a.handleSizeChange,"current-change":a.handleCurrentChange}})],1)])],1)},staticRenderFns:[]}}});