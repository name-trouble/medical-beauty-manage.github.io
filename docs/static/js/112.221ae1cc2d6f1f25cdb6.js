webpackJsonp([112],{1487:function(e,t,a){(e.exports=a(215)(!1)).push([e.i,".form_item_mt10[data-v-aee9787a]{margin-right:0}",""])},1912:function(e,t,a){var r=a(1487);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a(216)("765a2077",r,!0)},2387:function(e,t){e.exports={render:function(){var a=this,e=a.$createElement,r=a._self._c||e;return r("div",{staticClass:" selCommon"},[r("el-form",{staticClass:"demo-form-inline form_search",attrs:{inline:!0,model:a.formInline,"label-width":"80px"}},[r("el-form-item",{staticClass:"form_item_mt10 form_item_wh280",attrs:{label:"执行时间："}},[r("el-date-picker",{attrs:{type:"daterange",placeholder:"选择日期范围"},on:{change:a.dateChange},model:{value:a.formInline.date,callback:function(e){a.$set(a.formInline,"date",e)},expression:"formInline.date"}})],1),a._v(" "),r("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"医院:"}},[r("el-select",{staticStyle:{width:"200px"},on:{change:a.selHos},model:{value:a.formInline.hospital,callback:function(e){a.$set(a.formInline,"hospital",e)},expression:"formInline.hospital"}},a._l(a.hospitalList,function(e,t){return r("el-option",{key:t,attrs:{label:e.supplierName,value:e.code}})}),1)],1),a._v(" "),r("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"科室:"}},[r("el-select",{staticStyle:{width:"200px"},model:{value:a.formInline.deptCode,callback:function(e){a.$set(a.formInline,"deptCode",e)},expression:"formInline.deptCode"}},a._l(a.deptList,function(e,t){return r("el-option",{key:t,attrs:{label:e.deptName,value:e.deptCode}})}),1)],1),a._v(" "),r("el-form-item",{staticClass:"form_item_mt10 ",attrs:{label:" "}},[r("el-button",{staticClass:"searchBtn",attrs:{type:"primary"},on:{click:a.onSubmit}},[a._v("查询")])],1)],1),a._v(" "),r("el-table",{directives:[{name:"loading",rawName:"v-loading.body",value:a.loading,expression:"loading",modifiers:{body:!0}}],staticClass:"min_table",staticStyle:{width:"100%","margin-top":"15px","margin-bottom":"10px"},attrs:{data:a.tableData,border:"","show-summary":"","summary-method":a.getSummaries}},[r("el-table-column",{attrs:{prop:"serviceName",label:"设计师","min-width":"100"}}),a._v(" "),r("el-table-column",{attrs:{prop:"supplierName",label:"医院","min-width":"150"}}),a._v(" "),r("el-table-column",{attrs:{prop:"realPrice",label:"消费金额","min-width":"120",align:"right"},scopedSlots:a._u([{key:"default",fn:function(t){return[0<t.row.realPrice?r("el-button",{attrs:{type:"text"},on:{click:function(e){return a.MShow(t.row,1)}}},[a._v(a._s(t.row.realPrice.toQFW()))]):r("span",[a._v("0")])]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"realPriceJiFen",label:"积分","min-width":"120",align:"right"},scopedSlots:a._u([{key:"default",fn:function(t){return[0<t.row.realPriceJiFen?r("el-button",{attrs:{type:"text"},on:{click:function(e){return a.MShow(t.row,2)}}},[a._v(a._s(t.row.realPriceJiFen.toQFW()))]):r("span",[a._v("0")])]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"realPriceZhuan",label:"消转代","min-width":"120",align:"right"},scopedSlots:a._u([{key:"default",fn:function(t){return[0<t.row.realPriceZhuan?r("el-button",{attrs:{type:"text"},on:{click:function(e){return a.MShow(t.row,3)}}},[a._v(a._s(t.row.realPriceZhuan.toQFW()))]):r("span",[a._v("0")])]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"realPrice6",label:"6折","min-width":"120",align:"right"},scopedSlots:a._u([{key:"default",fn:function(t){return[0<t.row.realPrice6?r("el-button",{attrs:{type:"text"},on:{click:function(e){return a.MShow(t.row,4)}}},[a._v(a._s(t.row.realPrice6.toQFW()))]):r("span",[a._v("0")])]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"realPrice4",label:"4折","min-width":"120",align:"right"},scopedSlots:a._u([{key:"default",fn:function(t){return[0<t.row.realPrice4?r("el-button",{attrs:{type:"text"},on:{click:function(e){return a.MShow(t.row,5)}}},[a._v(a._s(t.row.realPrice4.toQFW()))]):r("span",[a._v("0")])]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"realPrice2_5",label:"2.5折","min-width":"120",align:"right"},scopedSlots:a._u([{key:"default",fn:function(t){return[0<t.row.realPrice2_5?r("el-button",{attrs:{type:"text"},on:{click:function(e){return a.MShow(t.row,6)}}},[a._v(a._s(t.row.realPrice2_5.toQFW()))]):r("span",[a._v("0")])]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"realPrice_Card",label:"卡券返款","min-width":"85",align:"right"},scopedSlots:a._u([{key:"default",fn:function(t){return[0<t.row.realPrice_Card?r("el-button",{attrs:{type:"text"},on:{click:function(e){return a.MShow(t.row,7)}}},[a._v(a._s(t.row.realPrice_Card.toQFW()))]):r("span",[a._v("0")])]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"amount",label:"合计",align:"right","min-width":"130"},scopedSlots:a._u([{key:"default",fn:function(e){return[a._v("\n                    "+a._s(Math.round(e.row.amount).toQFW())+"\n                ")]}}])})],1),a._v(" "),r("span",{staticStyle:{color:"red"}},[a._v("（合计数据已四舍五入）")]),a._v(" "),r("el-dialog",{attrs:{title:"详情",visible:a.detDialog,top:"30%",size:"","close-on-click-modal":!1},on:{"update:visible":function(e){a.detDialog=e}}},[r("el-table",{staticStyle:{width:"100%"},attrs:{data:a.detTable,"max-height":"400",border:""}},[r("el-table-column",{attrs:{prop:"fxCode",label:"单号",width:"180"},scopedSlots:a._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{type:"text"},on:{click:function(e){return a.openRP(t.row)}}},[a._v(a._s(t.row.fxCode))])]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"projectName",label:"项目",width:"180"}}),a._v(" "),r("el-table-column",{attrs:{prop:"customerName",label:"客户",width:"100"}}),a._v(" "),r("el-table-column",{attrs:{prop:"refrenceBranchName",label:"推荐人",width:"100"}}),a._v(" "),r("el-table-column",{attrs:{prop:"realPrice",label:"价格"}})],1)],1),a._v(" "),r("el-dialog",{attrs:{title:"订单详情",visible:a.ispopRead,top:"5%",size:""},on:{"update:visible":function(e){a.ispopRead=e}}},[a.ispopRead?r("report",{staticStyle:{width:"900px"},attrs:{data:a.selectData}}):a._e()],1)],1)},staticRenderFns:[]}},250:function(e,t,a){a(1912);var r=a(98)(a(946),a(2387),"data-v-aee9787a",null);e.exports=r.exports},449:function(e,t,D){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=D(100),N=D.n(a),r=D(103),I=D.n(r),o=D(66),P=D.n(o),n=D(102),k=D.n(n),s=D(99),i=D.n(s),T=D(101),S=D(64),l=D(22);t.default={props:{data:Object},data:function(){return{fileList:[],formData:{MedicalTypeId:"",OrderDate:"",formNO:"",customerId:"",customerName:"",refrenceBranchCode:"",refrenceBranchName:"",projectId:"",projectName:"",goodsUnitId:"",goodsUnitName:"",OrderAmount:0,hospitalId:"",hospitalName:"",serviceManId:"",serviceManName:"",designer:"",designerName:"",designerAssist:"",designerAssistName:"",doctorAssist:"",doctorAssistName:"",price:"",course:"",serviceFare:"",Memo:"",RealAmount:"",ConsumeTypeId:"",ConsumeTypeName:"",RefrenceHospitalName:""},baseImgPath:T.b,attachList:[],payInfoList:[],commandList:[],errorList:[],refundList:[],backList:[],MedicalTypeList:[],typeList:[],imgList:[],dialogImg:"",photoDialog:!1,serTypeCode:D.i(l.b)("serTypeCode")}},created:function(){var e="";e=this.data.FxCode?this.data.FxCode:this.data.fxCode,this.getDetail(e)},computed:{Retainage:function(){var t=this.formData.OrderAmount;return 0<this.payInfoList.length&&this.payInfoList.forEach(function(e){t=Number(e.RealAmount).red(Number(t))}),t}},filters:{filterTypeId:function(e){switch(e){case 2:return"医院积分";case 3:return"纹绣积分";case 4:return"皮肤科积分"}}},methods:{viewPhoto:function(e){this.dialogImg=e,this.photoDialog=!0},getDetail:function(x){var C=this;return i()(N.a.mark(function e(){var t,a,r,o,n,s,i,l,m,c,p,d,f,u,_,v,h,b,w,g,y;return N.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,P.a.all([D.i(S._152)({fxCode:x}),D.i(S._62)(),D.i(S._153)(x),D.i(S._154)({fxcode:x}),D.i(S._155)({fxcode:x})]);case 2:if(t=e.sent,a=k()(t,5),r=a[0],o=a[1],n=a[2],s=a[3],i=a[4],C.errorList=r.data,l=[],o.forEach(function(e){"0017"==e.BusinessCode&&C.typeList.push(e),"0022"==e.BusinessCode&&C.MedicalTypeList.push(e),"0006"==e.BusinessCode&&l.push(e)}),i.status&&(C.backList=i.data),s.status&&(C.refundList=s.data.orderCashOutList),C.initAll(n.ProofOrder),(m=["ImgUrl1","ImgUrl2","ImgUrl3","ImgUrl4","ImgUrl5"]).forEach(function(e,t){n.ProofOrder[m[t]]&&C.imgList.push(T.b+n.ProofOrder[m[t]])}),console.log(C.imgList),C.commandList=n.OrderCommandList,n.ProofOrderExtList&&0<n.ProofOrderExtList.length&&(C.attachList=n.ProofOrderExtList),!(n.ProofOrderPayList&&0<n.ProofOrderPayList.length)){e.next=65;break}p=!(c=!0),d=void 0,e.prev=24,f=I()(n.ProofOrderPayList);case 26:if(c=(u=f.next()).done){e.next=50;break}for(_=u.value,h=!(v=!0),b=void 0,e.prev=31,w=I()(l);!(v=(g=w.next()).done);v=!0)y=g.value,_.PayType===y.DataCode&&(_.PayTypeName=y.DataName);e.next=39;break;case 35:e.prev=35,e.t0=e.catch(31),h=!0,b=e.t0;case 39:e.prev=39,e.prev=40,!v&&w.return&&w.return();case 42:if(e.prev=42,h)throw b;e.next=45;break;case 45:return e.finish(42);case 46:return e.finish(39);case 47:c=!0,e.next=26;break;case 50:e.next=56;break;case 52:e.prev=52,e.t1=e.catch(24),p=!0,d=e.t1;case 56:e.prev=56,e.prev=57,!c&&f.return&&f.return();case 59:if(e.prev=59,p)throw d;e.next=62;break;case 62:return e.finish(59);case 63:return e.finish(56);case 64:C.payInfoList=n.ProofOrderPayList;case 65:case"end":return e.stop()}},e,C,[[24,52,56,64],[31,35,39,47],[40,,42,46],[57,,59,63]])}))()},getName:function(e,t){var a=!0,r=!1,o=void 0;try{for(var n,s=I()(t);!(a=(n=s.next()).done);a=!0){var i=n.value;if(i.DataCode==e)return i.DataName}}catch(e){r=!0,o=e}finally{try{!a&&s.return&&s.return()}finally{if(r)throw o}}},initAll:function(e){var t=e;this.formData={projectType:t.ProjectType,OrderDate:t.OrderDate,fxCode:t.FxCode,Id:t.Id,ConsumeTypeId:t.ConsumeTypeId,ConsumeTypeName:this.getName(t.ConsumeTypeId,this.typeList),MedicalTypeName:this.getName(t.MedicalTypeId,this.MedicalTypeList),formNO:t.FormNO,customerId:t.CustomerId,customerName:t.CustomerName,refrenceBranchCode:t.RefrenceBranchCode?t.RefrenceBranchCode:"",refrenceBranchName:t.RefrenceBranchName?t.RefrenceBranchName:"",RefrenceBranchTags:t.RefrenceBranchTags?t.RefrenceBranchTags:"",projectId:t.ProjectId,projectName:t.ProjectName,hospitalId:t.HospitalId,hospitalName:t.HospitalName,serviceManId:t.ServiceManId,serviceManName:t.ServiceManName,designer:t.Designer||"",OrderAmount:t.OrderAmount,designerName:t.DesignerName||"",designerAssist:t.DesignerAssist||"",designerAssistName:t.DesignerAssistName||"",doctorAssist:t.DoctorAssist||"",doctorAssistName:t.DoctorAssistName||"",price:t.Price,course:t.Course,goodsUnitId:t.GoodsUnitId+"",goodsUnitName:t.GoodsUnitName,serviceFare:t.ServiceFare+"",Memo:t.Memo||"",RealAmount:t.RealAmount,MarketConsultantName:t.MarketConsultantName,MarketConsultantCode:t.MarketConsultantCode,RealPrice:t.RealPrice,RefrenceHospitalName:"",orderType:t.OrderType};for(var a=1;a<=5;a++)if(t["ImgUrl"+a]&&""!==t["ImgUrl"+a]){var r={name:"ImgUrl"+a,url:T.b+t["ImgUrl"+a]};this.fileList.push(r)}this.GetBranchByCode(t.RefrenceBranchCode)},GetBranchByCode:function(a){var r=this;return i()(N.a.mark(function e(){var t;return N.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,D.i(S._51)({branchcode:a});case 2:t=e.sent,r.formData.RefrenceHospitalName=t.Branch.HospitalName?t.Branch.HospitalName:"";case 4:case"end":return e.stop()}},e,r)}))()}}}},450:function(e,t,a){(e.exports=a(215)(!1)).push([e.i,".flex-box[data-v-22b52a7a]{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;width:100%;margin-bottom:5px;background:#f9f9f9}.flex-box .flex-item[data-v-22b52a7a]{-webkit-box-flex:0;-ms-flex:0 50%;flex:0 50%;margin-top:10px}.foot-div[data-v-22b52a7a]{background:#f9f9f9}.reportManage[data-v-22b52a7a]{font-size:12px;position:relative;margin:0;padding:0;overflow:auto}",""])},451:function(e,t,a){var r=a(450);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a(216)("203f4032",r,!0)},452:function(e,t,a){a(451);var r=a(98)(a(449),a(453),"data-v-22b52a7a",null);e.exports=r.exports},453:function(e,t){e.exports={render:function(){var a=this,e=a.$createElement,r=a._self._c||e;return r("div",{staticClass:"reportManage"},[r("div",[r("p",{staticStyle:{"font-size":"16px","font-weight":"bold"}},[a._v("项目信息")]),a._v(" "),r("div",{staticClass:"flex-box"},[r("div",{staticClass:"flex-item"},[r("el-form",{ref:"formAdd1",attrs:{"label-position":"right","label-width":"120px",model:a.formData}},[r("el-form-item",{staticClass:"form_item_mt0",attrs:{label:"订单日期："}},[r("span",[a._v(a._s(a.formData.OrderDate.substring(0,10))+" ")])]),a._v(" "),r("el-form-item",{staticClass:"form_item_mt0",attrs:{label:"类型："}},[r("span",[a._v(a._s(a.formData.ConsumeTypeName))])]),a._v(" "),r("el-form-item",{staticClass:"form_item_mt0",attrs:{label:"客户："}},[r("span",[a._v(a._s(a.formData.customerName)+"["+a._s(a.formData.customerId)+"]")])]),a._v(" "),r("el-form-item",{staticClass:"form_item_mt0",attrs:{label:"项目："}},[r("span",[a._v(a._s(a.formData.projectName))])]),a._v(" "),r("el-form-item",{staticClass:"form_item_mt0",attrs:{label:"项目类型："}},[0==a.formData.projectType?r("span",[a._v("年卡/疗程")]):a._e(),a._v(" "),1==a.formData.projectType?r("span",[a._v("单次")]):a._e()]),a._v(" "),r("el-form-item",{staticClass:"form_item_mt0",attrs:{label:"疗程：",prop:"refrenceBranchCode"}},[r("span",[a._v(a._s(a.formData.course))])]),a._v(" "),r("el-form-item",{staticClass:"form_item_mt0",attrs:{label:"医院：",prop:"hospitalName"}},[r("span",[a._v(a._s(a.formData.hospitalName))])]),a._v(" "),r("el-form-item",{staticClass:"form_item_mt0",attrs:{label:"咨询师："}},[r("span",[a._v(a._s(a.formData.MarketConsultantName))]),a._v(" "),a.formData.MarketConsultantCode?r("span",[a._v("["+a._s(a.formData.MarketConsultantCode)+"]")]):a._e()]),a._v(" "),r("el-form-item",{staticClass:"form_item_mt0",attrs:{label:"设计师：",prop:"refrenceBranchCode"}},[r("span",[a._v(a._s(a.formData.designerName))])]),a._v(" "),"001"!=a.serTypeCode&&"003"!=a.serTypeCode?r("el-form-item",{staticClass:"form_item_mt10",attrs:{label:"实际价格：",prop:"refrenceBranchCode"}},[r("span",[a._v(a._s(a.formData.RealPrice))])]):a._e()],1)],1),a._v(" "),r("div",{staticClass:"flex-item"},[r("el-form",{ref:"formAdd2",attrs:{"label-position":"right","label-width":"120px",model:a.formData}},[r("el-form-item",{staticClass:"form_item_mt0",attrs:{label:"订单编号"}},[r("span",[a._v(a._s(a.formData.fxCode))])]),a._v(" "),r("el-form-item",{staticClass:"form_item_mt0",attrs:{label:"支付类型："}},[r("span",[a._v(a._s(a.formData.MedicalTypeName))])]),a._v(" "),r("el-form-item",{staticClass:"form_item_mt0",attrs:{label:"纸质单号：",prop:"formNO"}},[r("span",[a._v(a._s(a.formData.formNO))])]),a._v(" "),r("el-form-item",{staticClass:"form_item_mt0",attrs:{label:"推荐人：",prop:"refrenceBranchCode"}},[r("div",{directives:[{name:"show",rawName:"v-show",value:""!==a.formData.refrenceBranchCode,expression:"formData.refrenceBranchCode!==''"}]},[a._v(a._s(a.formData.refrenceBranchName+"["+a.formData.refrenceBranchCode+"]")+"\n                            "),a.formData.RefrenceBranchTags?r("span",[a._v("("+a._s(a.formData.RefrenceBranchTags)+")")]):a._e()]),a._v(" "),r("div",[a._v("医院："+a._s(a.formData.RefrenceHospitalName))])]),a._v(" "),r("el-form-item",{staticClass:"form_item_mt0",attrs:{label:"规格："}},[r("span",[a._v(a._s(a.formData.goodsUnitName))])]),a._v(" "),r("el-form-item",{staticClass:"form_item_mt0",attrs:{label:"项目价格：",prop:"price"}},[r("span",{directives:[{name:"show",rawName:"v-show",value:""!=a.formData.price,expression:"formData.price!=''"}]},[r("span",{staticStyle:{"font-size":"15px",color:"black"}},[a._v("￥")]),a._v(a._s(a.formData.price))])]),a._v(" "),r("el-form-item",{staticClass:"form_item_mt0",attrs:{label:"专家费：",prop:"serviceFare"}},[r("span",{directives:[{name:"show",rawName:"v-show",value:""!=a.formData.serviceFare,expression:"formData.serviceFare!=''"}]},[a._v(a._s(a.formData.serviceFare)+"元")])]),a._v(" "),r("el-form-item",{staticClass:"form_item_mt0",attrs:{label:"医生助理：",prop:"doctorAssist"}},[r("span",[a._v(a._s(a.formData.doctorAssistName))])]),a._v(" "),r("el-form-item",{staticClass:"form_item_mt0",attrs:{label:"设计师助理：",prop:"designerAssist"}},[r("span",[a._v(a._s(a.formData.designerAssistName))])]),a._v(" "),r("el-form-item",{staticClass:"form_item_mt0",attrs:{label:"订单来源：",prop:"designerAssist"}},[r("span",{domProps:{textContent:a._s(1==a.formData.orderType?"app订单":"线下订单")}})])],1)],1)])]),a._v(" "),"001"!=a.serTypeCode&&"003"!=a.serTypeCode?r("div",{staticClass:"flex-box",staticStyle:{"margin-top":"-30px"}},[r("div",{staticClass:"flex-item",staticStyle:{margin:"20px 0px 0 30px","padding-left":"30px",flex:"0 100%"}},[r("el-table",{attrs:{data:a.attachList,border:"","min-width":"500"}},[r("el-table-column",{attrs:{type:"index",label:"序号",width:"70"}}),a._v(" "),r("el-table-column",{attrs:{prop:"ProofDesc",label:"附加项名称","min-width":"60"}}),a._v(" "),r("el-table-column",{attrs:{prop:"TypeName",label:"费用类型","min-width":"60"}}),a._v(" "),r("el-table-column",{attrs:{prop:"Amount",label:"单价","min-width":"60"}},[a._v("\n                    ￥"+a._s(a.formData.Amount)+"\n                ")]),a._v(" "),r("el-table-column",{attrs:{prop:"Quantity",label:"数量","min-width":"60"}}),a._v(" "),r("el-table-column",{attrs:{prop:"Course",label:"总期数","min-width":"65"}}),a._v(" "),r("el-table-column",{attrs:{prop:"CurrentCourse",label:"支付期数","min-width":"65"}}),a._v(" "),r("el-table-column",{attrs:{prop:"SubTotal",label:"总额","min-width":"65"}},[a._v("\n                        ￥"+a._s(a.formData.SubTotal)+"\n                    ")]),a._v(" "),r("el-table-column",{attrs:{prop:"StageAmount",label:"分期总额","min-width":"65"}}),a._v(" "),r("el-table-column",{attrs:{prop:"IsEffective",label:"是否提成"},scopedSlots:a._u([{key:"default",fn:function(e){return[e.row.IsEffective?r("span",[a._v("是")]):r("span",[a._v("否")])]}}],null,!1,910863426)})],1),a._v(" "),""!=a.formData.OrderAmount?r("p",{staticStyle:{margin:"10px 0"}},[a._v("订单金额: ￥"+a._s(a.formData.OrderAmount)+" ")]):a._e()],1)]):a._e(),a._v(" "),"001"!=a.serTypeCode&&"003"!=a.serTypeCode?r("div",[r("p",{staticStyle:{"font-size":"16px","font-weight":"bold"}},[a._v("支付信息")]),a._v(" "),r("div",{staticClass:"flex-box"},[r("div",{staticClass:"flex-item",staticStyle:{margin:"10px 0px 0 30px","padding-left":"30px",flex:"0 100%"}},[r("el-table",{attrs:{data:a.payInfoList,border:"","min-width":"500"}},[r("el-table-column",{attrs:{type:"index",label:"序号",width:"70"}}),a._v(" "),r("el-table-column",{attrs:{prop:"PayTypeName",label:"支付方式","min-width":"100"},scopedSlots:a._u([{key:"default",fn:function(e){return[r("span",[a._v(a._s(e.row.PayTypeName))]),a._v(" "),"009"==e.row.PayType?r("span",[a._v(a._s(a._f("filterTypeId")(e.row.TypeId)))]):a._e()]}}],null,!1,3806112968)}),a._v(" "),r("el-table-column",{attrs:{prop:"OnlineOrderCode",label:"app订单号","min-width":"80"}}),a._v(" "),r("el-table-column",{attrs:{prop:"PayDate",label:"支付日期","min-width":"110"},scopedSlots:a._u([{key:"default",fn:function(e){return[e.row.PayDate?r("span",[a._v(a._s(e.row.PayDate.substring(0,10))+" "+a._s(e.row.PayDate.substring(11,19)))]):a._e()]}}],null,!1,435555505)}),a._v(" "),r("el-table-column",{attrs:{prop:"TicketsCode",label:"券号","min-width":"110"}}),a._v(" "),r("el-table-column",{attrs:{prop:"ReceiveAccount",label:"收款账户","min-width":"110"}}),a._v(" "),r("el-table-column",{attrs:{prop:"RealAmount",label:"支付金额","min-width":"120"},scopedSlots:a._u([{key:"default",fn:function(e){return[e.row.RealAmount?r("span",[a._v("\n                                "+a._s(e.row.RealAmount.toQFW())+"\n                            ")]):a._e()]}}],null,!1,1674943245)}),a._v(" "),r("el-table-column",{attrs:{prop:"Memo",label:"备注","min-width":"120","show-overflow-tooltip":""}})],1),a._v(" "),r("div",{staticStyle:{margin:"5px"}},[a._v("\n                    尾款金额："+a._s(a.Retainage)+"\n                ")])],1)])]):a._e(),a._v(" "),r("div",[r("p",{staticStyle:{"font-size":"16px","font-weight":"bold"}},[a._v("执行信息")]),a._v(" "),r("div",{staticClass:"flex-box"},[r("div",{staticClass:"flex-item",staticStyle:{margin:"10px 0px 0 30px","padding-left":"30px",flex:"0 100%"}},[r("el-table",{attrs:{data:a.commandList,border:"","min-width":"500"}},[r("el-table-column",{attrs:{type:"index",label:"序号",width:"70"}}),a._v(" "),r("el-table-column",{attrs:{prop:"DoctorName",label:"执行医生","min-width":"100"}}),a._v(" "),r("el-table-column",{attrs:{prop:"NurseName",label:"执行护士","min-width":"100"}}),a._v(" "),r("el-table-column",{attrs:{prop:"DoctorAssistName",label:"医生助理","min-width":"100"}}),a._v(" "),r("el-table-column",{attrs:{prop:"ExecDate",label:"执行时间","min-width":"100"},scopedSlots:a._u([{key:"default",fn:function(e){return[e.row.ExecDate?r("span",[a._v("\n                                "+a._s(e.row.ExecDate.substring(0,10))+"\n                            ")]):a._e()]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"Memo",label:"备注","min-width":"170","show-overflow-tooltip":""}})],1)],1)])]),a._v(" "),"7"==a.formData.ConsumeTypeId?r("div",[r("p",{staticStyle:{"font-size":"16px","font-weight":"bold"}},[a._v("返款信息")]),a._v(" "),r("div",{staticClass:"flex-box"},[r("div",{staticClass:"flex-item",staticStyle:{margin:"10px 0px 0 30px","padding-left":"30px",flex:"0 100%"}},[r("el-table",{attrs:{data:a.refundList,border:"","min-width":"500"}},[r("el-table-column",{attrs:{type:"createOn",label:"返款时间","min-width":"100"},scopedSlots:a._u([{key:"default",fn:function(e){return[e.row.createOn?r("span",[a._v(a._s(e.row.createOn.substring(0,10)))]):a._e()]}}],null,!1,2995543066)}),a._v(" "),r("el-table-column",{attrs:{prop:"payType",label:"返款方式","min-width":"100"},scopedSlots:a._u([{key:"default",fn:function(e){return["001"==e.row.payType?r("span",[a._v("现金")]):a._e(),a._v(" "),"009"==e.row.payType?r("span",[a._v("积分")]):a._e(),a._v(" "),"008"==e.row.payType?r("span",[a._v("卡券")]):a._e(),a._v(" "),"018"==e.row.payType?r("span",[a._v("预付款")]):a._e()]}}],null,!1,1690063530)}),a._v(" "),r("el-table-column",{attrs:{prop:"worthAmount",label:"返款金额","min-width":"100"}}),a._v(" "),r("el-table-column",{attrs:{prop:"pointAmount",label:"返款积分","min-width":"100"}}),a._v(" "),r("el-table-column",{attrs:{prop:"ticketsCode",label:"返款券号","min-width":"100"}}),a._v(" "),r("el-table-column",{attrs:{prop:"createBy",label:"操作人","min-width":"100"}}),a._v(" "),r("el-table-column",{attrs:{prop:"memo",label:"备注","min-width":"150","show-overflow-tooltip":""}})],1)],1)])]):a._e(),a._v(" "),"001"!=a.serTypeCode&&"003"!=a.serTypeCode?r("div",[r("p",{staticStyle:{"font-size":"16px","font-weight":"bold"}},[a._v("退款信息")]),a._v(" "),r("div",{staticClass:"flex-box"},[r("div",{staticClass:"flex-item",staticStyle:{margin:"10px 0px 0 30px","padding-left":"30px",flex:"0 100%"}},[r("el-table",{attrs:{data:a.backList,border:"","min-width":"500"}},[r("el-table-column",{attrs:{type:"createOn",label:"退款时间","min-width":"100"},scopedSlots:a._u([{key:"default",fn:function(e){return[e.row.createOn?r("span",[a._v(a._s(e.row.createOn.substring(0,10)))]):a._e()]}}],null,!1,2995543066)}),a._v(" "),r("el-table-column",{attrs:{prop:"payType",label:"退款方式","min-width":"110"},scopedSlots:a._u([{key:"default",fn:function(e){return["001"==e.row.payType?r("span",[a._v("现金")]):a._e(),a._v(" "),"009"==e.row.payType?r("span",[a._v("积分")]):a._e(),a._v(" "),"008"==e.row.payType?r("span",[a._v("卡券")]):a._e(),a._v(" "),"018"==e.row.payType?r("span",[a._v("预付款")]):a._e()]}}],null,!1,1690063530)}),a._v(" "),r("el-table-column",{attrs:{prop:"ticketsCode",label:"退款券号","min-width":"110"}}),a._v(" "),r("el-table-column",{attrs:{prop:"refundAmount",label:"退款金额","min-width":"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"createBy",label:"操作人","min-width":"110"}}),a._v(" "),r("el-table-column",{attrs:{prop:"memo",label:"备注","min-width":"200","show-overflow-tooltip":""}})],1)],1)])]):a._e(),a._v(" "),r("div",[r("p",{staticStyle:{"font-size":"16px","font-weight":"bold"}},[a._v("其它信息")]),a._v(" "),r("div",{staticClass:"foot-div"},[r("el-form",{ref:"formAdd3",attrs:{"label-position":"right","label-width":"120px",model:a.formData}},[r("el-form-item",{staticClass:" form_item_mt10",attrs:{label:"错误信息："}},[r("el-table",{attrs:{data:a.errorList,border:"","min-width":"500"}},[r("el-table-column",{attrs:{type:"index",label:"","min-width":"70"}}),a._v(" "),r("el-table-column",{attrs:{prop:"recordName",label:"录单人","min-width":"110"}}),a._v(" "),r("el-table-column",{attrs:{prop:"errorReason",label:"错误原因","min-width":"110"}}),a._v(" "),r("el-table-column",{attrs:{prop:"approverName",label:"审核人","min-width":"110"}}),a._v(" "),r("el-table-column",{attrs:{prop:"approverDate",label:"审核时间","min-width":"110"},scopedSlots:a._u([{key:"default",fn:function(e){return[e.row.approverDate?r("span",[a._v("\n                               "+a._s(e.row.approverDate.substring(0,10))+"\n                             ")]):a._e()]}}])})],1)],1),a._v(" "),r("el-form-item",{attrs:{label:"备注："}},[r("el-input",{attrs:{disabled:!0,type:"textarea",rows:2},model:{value:a.formData.Memo,callback:function(e){a.$set(a.formData,"Memo",e)},expression:"formData.Memo"}})],1),a._v(" "),r("el-form-item",{attrs:{label:"图片"}},a._l(a.fileList,function(t,e){return r("img",{key:e,attrs:{width:"100",height:"",src:t.url},on:{click:function(e){return a.viewPhoto(t.url)}}})}),0)],1)],1)]),a._v(" "),r("el-dialog",{attrs:{title:"查看图片",visible:a.photoDialog,modal:!1,size:"",top:"40%"},on:{"update:visible":function(e){a.photoDialog=e}}},[r("img",{attrs:{src:a.dialogImg,width:"600",alt:""}})])],1)},staticRenderFns:[]}},582:function(e,t,a){(e.exports=a(215)(!1)).push([e.i,".el-table__footer{font-weight:700}.conAchieve .el-table__body .cell{padding-left:0!important;padding-right:0!important;box-sizing:border-box;text-overflow:ellipsis}.conAchieve .cell .append{padding-left:13px;padding-right:13px;border-bottom:1px solid #eef1f6;line-height:40px}.conAchieve .cell .append:last-child{border-bottom:none}.desAssist .el-table .cell,.el-table th>div{padding-left:5px;padding-right:5px;box-sizing:border-box;text-overflow:ellipsis}",""])},597:function(e,t,a){var r=a(582);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a(216)("267e92e5",r,!0)},946:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=o(100),n=o.n(a),r=o(99),s=o.n(r),i=o(597),l=(o.n(i),o(65)),m=(o.n(l),o(452)),c=o.n(m),p=o(64);t.default={data:function(){return{ispopRead:!1,selectData:{},detDialog:!1,detTable:!1,loading:!1,tableData:[],hospitalList:[],formInline:{hospital:"",date:"",startDate:"",endDate:"",command:"",deptCode:""},deptList:[]}},computed:{},mounted:function(){var e=new Date;e.setDate("1"),this.formInline.date=[e,new Date],this.GetDropDownPermission()},methods:{selHos:function(){var a=this;return s()(n.a.mark(function e(){var t;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(a.formInline.deptCode="",0<a.formInline.hospital.length)return e.next=4,o.i(p.t)({HospitalCode:a.formInline.hospital});e.next=6;break;case 4:t=e.sent,a.deptList=t.data;case 6:case"end":return e.stop()}},e,a)}))()},getSummaries:function(e){var t=e.columns,r=e.data,o=[];return t.forEach(function(t,e){if(0!==e){var a=r.map(function(e){return Number(e[t.property])});a.every(function(e){return isNaN(e)})?o[e]="":(o[e]=a.reduce(function(e,t){var a=Number(t);return isNaN(a)?e:e.add(t)},0),o[e]=o[e].toQFW())}else o[e]="合计"}),o},dateChange:function(e){e?(e=e.formatDates(),this.formInline.startDate=e.substring(0,10),this.formInline.endDate=e.substring(13)):(this.formInline.startDate="",this.formInline.endDate="")},GetDropDownPermission:function(){var a=this;return s()(n.a.mark(function e(){var t;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.i(p.d)({typeId:1});case 2:t=e.sent,a.hospitalList=t.data,a.formInline.hospital=t.data[0].code;case 5:case"end":return e.stop()}},e,a)}))()},onSubmit:function(){this.currentPage=1,this.search()},search:function(){this.loading=!0,this.GetDesignerPerformance({HospitalId:this.formInline.hospital,StartDate:this.formInline.startDate,endDate:this.formInline.endDate,commandState:this.formInline.command,deptCode:this.formInline.deptCode})},GetDesignerPerformance:function(a){var r=this;return s()(n.a.mark(function e(){var t;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.i(p._458)(a);case 2:t=e.sent,r.loading=!1,t.status?r.tableData=r.getAmount(t.data):r.$message({type:"warning",message:"查询失败!"+t.errorMessage});case 5:case"end":return e.stop()}},e,r)}))()},getAmount:function(e){return e.forEach(function(e){e.realPrice=e.realPrice.add(e.realPriceWu),e.amount=e.realPriceJiFen+e.realPriceZhuan+e.realPrice6+e.realPrice4+e.realPrice2_5+e.realPrice+e.realPrice_Card}),e},MShow:function(e,t){this.detDialog=!0,this.GetDesignerDetail({HospitalId:e.hospitalCode,StartDate:this.formInline.startDate,EndDate:this.formInline.endDate,ServiceManCode:e.code,TypeId:t})},GetDesignerDetail:function(a){var r=this;return s()(n.a.mark(function e(){var t;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.i(p._459)(a);case 2:(t=e.sent).status&&(r.detTable=t.data);case 4:case"end":return e.stop()}},e,r)}))()},openRP:function(e){this.selectData=e,this.ispopRead=!0}},components:{report:c.a}}}});