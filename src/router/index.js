import Vue from 'vue'
import VueRouter from 'vue-Router'
import store from '@/store/index'
import { getCookie, delCookie } from '@/config/mUtils'
Vue.use(VueRouter)

const login = r => require.ensure([], () => r(require('@/components/login')), 'login');
const index = r => require.ensure([], () => r(require('@/components/index')), 'index');
const NotFoundComponent = r => require.ensure([], () => r(require('@/components/page404')), 'NotFoundComponent');
const menu = r => require.ensure([], () => r(require('@/components/MenuTree/menu.vue')), 'menu');

// 商城中心
const goodsClassification = r => require.ensure([], () => r(require('@/page/MallCenter/commodity/goodsClassification')), 'goodsClassification');
const goodClassy = r => require.ensure([], () => r(require('@/page/MallCenter/commodity/goodClassy')), 'goodClassy');
const addGoods = r => require.ensure([], () => r(require('@/page/MallCenter/commodity/addGoods')), 'addGoods');
const goodsList = r => require.ensure([], () => r(require('@/page/MallCenter/commodity/goodsList')), 'goodsList');
const goodsUpDown = r => require.ensure([], () => r(require('@/page/MallCenter/commodity/goodsUpDown')), 'goodsUpDown');
const commodityAudit = r => require.ensure([], () => r(require('@/page/MallCenter/commodity/commodityAudit')), 'commodityAudit');
const productEditor = r => require.ensure([], () => r(require('@/page/MallCenter/commodity/productEditor')), 'productEditor');
const AttributeList = r => require.ensure([], () => r(require('@/page/MallCenter/commodity/AttributeList')), 'AttributeList');
const couponSale = r => require.ensure([], () => r(require('@/page/MallCenter/Coupon/couponSale')), 'couponSale'); //卡券上下架
const productAcc = r => require.ensure([], () => r(require('@/page/MallCenter/productAccount/productAcc')), 'productAcc');
const productOutDet = r => require.ensure([], () => r(require('@/page/MallCenter/productAccount/productOutDet')), 'productOutDet');
const projectOrder = r => require.ensure([], () => r(require('@/page/MallCenter/orderManage/projectOrder')), 'projectOrder');
const payCount = r => require.ensure([], () => r(require('@/page/MallCenter/orderManage/payCount')), 'payCount');
const putForward = r => require.ensure([], () => r(require('@/page/MallCenter/orderManage/putForward')), 'putForward');
const orderProfit = r => require.ensure([], () => r(require('@/page/MallCenter/orderManage/orderProfit')), 'orderProfit');
const orderTrans = r => require.ensure([], () => r(require('@/page/MallCenter/orderManage/orderTrans')), 'orderTrans');
const activeTrans = r => require.ensure([], () => r(require('@/page/MallCenter/orderManage/activeTrans')), 'activeTrans');
const projectItem = r => require.ensure([], () => r(require('@/page/MallCenter/orderManage/projectItem')), 'projectItem');
const onlineTeam = r => require.ensure([], () => r(require('@/page/MallCenter/orderManage/onlineTeam')), 'onlineTeam');

//财务中心
//----- 报单管理
const reportManage = r => require.ensure([], () => r(require('@/page/FinanceManage/ReportManage/reportManage')), 'reportManage');
const addReportNew = r => require.ensure([], () => r(require('@/page/FinanceManage/ReportManage/addReportNew')), 'addReportNew');
const addReport = r => require.ensure([], () => r(require('@/page/FinanceManage/ReportManage/addReport')), 'addReport');
const payReport = r => require.ensure([], () => r(require('@/page/FinanceManage/ReportManage/payReport')), 'payReport');
const reportList = r => require.ensure([], () => r(require('@/page/FinanceManage/ReportManage/reportList')), 'reportList');
const closeReport = r => require.ensure([], () => r(require('@/page/FinanceManage/ReportManage/closeReport')), 'closeReport');
const closePS = r => require.ensure([], () => r(require('@/page/FinanceManage/ReportManage/closePS')), 'closePS');
const crossRP = r => require.ensure([], () => r(require('@/page/FinanceManage/ReportManage/crossRP')), 'crossRP');

const command = r => require.ensure([], () => r(require('@/page/FinanceManage/ReportManage/command')), 'command');
const commandEdit = r => require.ensure([], () => r(require('@/page/FinanceManage/ReportManage/commandEdit')), 'commandEdit');
const reportCheck = r => require.ensure([], () => r(require('@/page/FinanceManage/ReportManage/reportCheck')), 'reportCheck');
const reportError = r => require.ensure([], () => r(require('@/page/FinanceManage/ReportManage/reportError')), 'reportError');
const errorReport = r => require.ensure([], () => r(require('@/page/FinanceManage/ReportManage/errorReport')), 'errorReport');

const customerDetail = r => require.ensure([], () => r(require('@/page/FinanceManage/ReportManage/com/customerDetail')), 'customerDetail');

// 产品单
const ordonnance = r => require.ensure([], () => r(require('@/page/FinanceManage/Ordonnance/ordonnance')), 'ordonnance');
const disposalSheet = r => require.ensure([], () => r(require('@/page/FinanceManage/Ordonnance/disposalSheet')), 'disposalSheet');
const proPay = r => require.ensure([], () => r(require('@/page/FinanceManage/Ordonnance/proPay')), 'proPay');
const template = r => require.ensure([], () => r(require('@/page/FinanceManage/Ordonnance/template')), 'template');
const delOrdon = r => require.ensure([], () => r(require('@/page/FinanceManage/Ordonnance/delOrdon')), 'delOrdon');

//财务
const crossSettled = r => require.ensure([], () => r(require('@/page/FinanceManage/Settlement/crossSettled')), 'crossSettled');
const hospitalInDet = r => require.ensure([], () => r(require('@/page/FinanceManage/Settlement/hospitalInDet')), 'hospitalInDet');
const branchInDet = r => require.ensure([], () => r(require('@/page/FinanceManage/Settlement/branchInDet')), 'branchInDet');
const hosSettle = r => require.ensure([], () => r(require('@/page/FinanceManage/Settlement/hosSettle')), 'hosSettle');
const serviceSettle = r => require.ensure([], () => r(require('@/page/FinanceManage/Settlement/serviceSettle')), 'serviceSettle');
const serviceSetHis = r => require.ensure([], () => r(require('@/page/FinanceManage/Settlement/serviceSetHis')), 'serviceSetHis');
const branchSettle= r => require.ensure([], () => r(require('@/page/FinanceManage/Settlement/branchSettle')), 'branchSettle');

const bSHistory = r => require.ensure([], () => r(require('@/page/FinanceManage/BonusGrading/bSHistory')), 'bSHistory');
const hSHistory = r => require.ensure([], () => r(require('@/page/FinanceManage/BonusGrading/hSHistory')), 'hSHistory');
const sSconHistory = r => require.ensure([], () => r(require('@/page/FinanceManage/BonusGrading/sSconHistory')), 'sSconHistory');
const sSRefHistory = r => require.ensure([], () => r(require('@/page/FinanceManage/BonusGrading/sSRefHistory')), 'sSRefHistory');
const weekReport = r => require.ensure([], () => r(require('@/page/FinanceManage/BonusGrading/weekReport')), 'weekReport');
const monthReport = r => require.ensure([], () => r(require('@/page/FinanceManage/BonusGrading/monthReport')), 'monthReport');


const actingLedger = r => require.ensure([], () => r(require('@/page/FinanceManage/ActingLedger/actingLedger')), 'actingLedger');
const payFormList = r => require.ensure([], () => r(require('@/page/FinanceManage/Settlement/payFormList')), 'payFormList');
const addPayForm = r => require.ensure([], () => r(require('@/page/FinanceManage/Settlement/addPayForm')), 'addPayForm');
const docAchieve = r => require.ensure([], () => r(require('@/page/FinanceManage/Achievement/docAchieve')), 'docAchieve');
const desAchieve = r => require.ensure([], () => r(require('@/page/FinanceManage/Achievement/desAchieve')), 'desAchieve');
const conAchieve = r => require.ensure([], () => r(require('@/page/FinanceManage/Achievement/conAchieve')), 'conAchieve');
const desAssist = r => require.ensure([], () => r(require('@/page/FinanceManage/Achievement/desAssist')), 'desAssist');
const hosRecDetail = r => require.ensure([], () => r(require('@/page/FinanceManage/Achievement/hosRecDetail')), 'hosRecDetail');
const hosRecSum = r => require.ensure([], () => r(require('@/page/FinanceManage/Achievement/hosRecSum')), 'hosRecSum');

//扣款
const debitNote = r => require.ensure([], () => r(require('@/page/FinanceManage/Debit/debitNote')), 'debitNote');
const debitList = r => require.ensure([], () => r(require('@/page/FinanceManage/Debit/debitList')), 'debitList');
const refund = r => require.ensure([], () => r(require('@/page/FinanceManage/Debit/refund')), 'refund');
const receivables = r => require.ensure([], () => r(require('@/page/FinanceManage/Debit/receivables')), 'receivables');

const achievement = r => require.ensure([], () => r(require('@/page/FinanceManage/ActingLedger/achievement')), 'achievement');
const achievementD = r => require.ensure([], () => r(require('@/page/FinanceManage/ActingLedger/achievementD')), 'achievementD');
const commandDet = r => require.ensure([], () => r(require('@/page/FinanceManage/ActingLedger/commandDet')), 'commandDet');
const crossAchieve = r => require.ensure([], () => r(require('@/page/FinanceManage/ActingLedger/crossAchieve')), 'crossAchieve');
const docAchieveDet = r => require.ensure([], () => r(require('@/page/FinanceManage/ActingLedger/docAchieveDet')), 'docAchieveDet');


//运营中心
//卡券
const couponAdd = r => require.ensure([], () => r(require('@/page/OperationManage/Coupon/couponAdd')), 'couponAdd');
const couponList = r => require.ensure([], () => r(require('@/page/OperationManage/Coupon/couponList')), 'couponList');
const couponApply = r => require.ensure([], () => r(require('@/page/OperationManage/Coupon/couponApply')), 'couponApply');
const couponCheck = r => require.ensure([], () => r(require('@/page/OperationManage/Coupon/couponCheck')), 'couponCheck');
const couponOut = r => require.ensure([], () => r(require('@/page/OperationManage/Coupon/couponOut')), 'couponOut');
const couponEntery = r => require.ensure([], () => r(require('@/page/OperationManage/Coupon/couponEntery')), 'couponEntery');
const couponConsume = r => require.ensure([], () => r(require('@/page/OperationManage/Coupon/couponConsume')), 'couponConsume');
const couponDetail = r => require.ensure([], () => r(require('@/page/OperationManage/Coupon/couponDetail')), 'couponDetail');
const applyCoupon = r => require.ensure([], () => r(require('@/page/OperationManage/Coupon/applyCoupon')), 'applyCoupon')
//营销
const redPackets = r => require.ensure([], () => r(require('@/page/OperationManage/MarketActivities/redPackets')), 'redPackets');
const rebates = r => require.ensure([], () => r(require('@/page/OperationManage/MarketActivities/rebates')), 'rebates');

//代理
const AgentGeneal = r => require.ensure([], () => r(require('@/page/OperationManage/AgentManage/AgentGeneal')), 'AgentGeneal');
const AgentManage = r => require.ensure([], () => r(require('@/page/OperationManage/AgentManage/AgentManage')), 'AgentManage');
const agentCheck = r => require.ensure([], () => r(require('@/page/OperationManage/AgentManage/agentCheck')), 'agentCheck');
const open = r => require.ensure([], () => r(require('@/page/OperationManage/AgentManage/open')), 'open');
const branchPerformance = r => require.ensure([], () => r(require('@/page/OperationManage/AgentManage/branchPerformance')), 'branchPerformance');

const rechargeList = r => require.ensure([], () => r(require('@/page/OperationManage/AgentManage/rechargeList')), 'rechargeList');
const Embroidery = r => require.ensure([], () => r(require('@/page/OperationManage/AgentManage/Embroidery')), 'Embroidery');
const integralTransfer = r => require.ensure([], () => r(require('@/page/OperationManage/AgentManage/integralTransfer')), 'integralTransfer');
const customerDet = r => require.ensure([], () => r(require('@/page/OperationManage/AgentManage/customerDet')), 'customerDet');
const agentPackEdit = r => require.ensure([], () => r(require('@/page/OperationManage/AgentManage/agentPackEdit')), 'agentPackEdit');
const account = r => require.ensure([], () => r(require('@/page/OperationManage/AgentManage/account')), 'account');
const fundList = r => require.ensure([], () => r(require('@/page/OperationManage/AgentManage/fundList')), 'fundList');
const accountList = r => require.ensure([], () => r(require('@/page/OperationManage/AgentManage/accountList')), 'accountList');

const upGradeCheck = r => require.ensure([], () => r(require('@/page/OperationManage/AgentManage/upGradeCheck')), 'upGradeCheck');
const upGradeOpen = r => require.ensure([], () => r(require('@/page/OperationManage/AgentManage/upGradeOpen')), 'upGradeOpen');
const fixeMes = r => require.ensure([], () => r(require('@/page/OperationManage/AgentManage/fixeMes')), 'fixeMes');
const opeLog = r => require.ensure([], () => r(require('@/page/MemberCenter/opeLog')), 'opeLog');
const appPoints = r => require.ensure([], () => r(require('@/page/OperationManage/AgentManage/appPoints')), 'appPoints');
const shopMes = r => require.ensure([], () => r(require('@/page/OperationManage/AgentManage/shopMes')), 'shopMes');

//团队迁移
const teamMigrate = r => require.ensure([], () => r(require('@/page/OperationManage/Team/teamMigrate')), 'teamMigrate');
const searchMigrate = r => require.ensure([], () => r(require('@/page/OperationManage/Team/searchMigrate')), 'searchMigrate');

//退会
const exit = r => require.ensure([], () => r(require('@/page/OperationManage/Exit/exit')), 'exit');

//规则中心
const PackageSet = r => require.ensure([], () => r(require('@/page/RuleManage/PackageSet')), 'PackageSet');
const GradeSet = r => require.ensure([], () => r(require('@/page/RuleManage/GradeSet')), 'GradeSet');
const DuesDiscount = r => require.ensure([], () => r(require('@/page/RuleManage/DuesDiscount')), 'DuesDiscount');
const ConsumeDiscount = r => require.ensure([], () => r(require('@/page/RuleManage/ConsumeDiscount')), 'ConsumeDiscount');
const royaltyAllocate = r => require.ensure([], () => r(require('@/page/RuleManage/royaltyAllocate')), 'royaltyAllocate');
const gradeStrategy = r => require.ensure([], () => r(require('@/page/RuleManage/gradeStrategy')), 'gradeStrategy');
const specialStrategy = r => require.ensure([], () => r(require('@/page/RuleManage/specialStrategy')), 'specialStrategy');
const recAllocation = r => require.ensure([], () => r(require('@/page/RuleManage/RecAllocation')), 'RecAllocation');
const propAllocate = r => require.ensure([], () => r(require('@/page/RuleManage/propAllocate')), 'propAllocate');
const nurseSet = r => require.ensure([], () => r(require('@/page/RuleManage/nurseSet')), 'nurseSet');
const expertSet = r => require.ensure([], () => r(require('@/page/RuleManage/expertSet')), 'expertSet');
const expertAcc = r => require.ensure([], () => r(require('@/page/FinanceManage/Achievement/expertAcc')), 'expertAcc');
const serviceAcc = r => require.ensure([], () => r(require('@/page/FinanceManage/Achievement/serviceAcc')), 'serviceAcc');
const serviceAccRef = r => require.ensure([], () => r(require('@/page/FinanceManage/Achievement/serviceAccRef')), 'serviceAccRef');


const extraFee = r => require.ensure([], () => r(require('@/page/FinanceManage/Achievement/extraFee')), 'extraFee');
const extraFeeList = r => require.ensure([], () => r(require('@/page/FinanceManage/Achievement/extraFeeList')), 'extraFeeList');
const guestCount = r => require.ensure([], () => r(require('@/page/FinanceManage/Achievement/guestCount')), 'guestCount');

const expertExclude = r => require.ensure([], () => r(require('@/page/RuleManage/expertExclude')), 'expertExclude');
const warehouse = r => require.ensure([], () => r(require('@/page/RuleManage/warehouse')), 'warehouse');
const partMent = r => require.ensure([], () => r(require('@/page/RuleManage/partMent/partMent')), 'partMent');
const supplierM = r => require.ensure([], () => r(require('@/page/RuleManage/partMent/supplierM')), 'supplierM');


const expectIncome = r => require.ensure([], () => r(require('@/page/FinanceManage/Achievement/expectIncome')), 'expectIncome');
const branchIncDet = r => require.ensure([], () => r(require('@/page/FinanceManage/Achievement/branchIncDet')), 'branchIncDet');
const branchOutDet = r => require.ensure([], () => r(require('@/page/FinanceManage/Achievement/branchOutDet')), 'branchOutDet');

//供方管理
const ServantAdd = r => require.ensure([], () => r(require('@/page/SupplierManage/ServantAdd')), 'ServantAdd');
const ServantList = r => require.ensure([], () => r(require('@/page/SupplierManage/ServantList')), 'ServantList');
const SupplyInfo = r => require.ensure([], () => r(require('@/page/SupplierManage/SupplyInfo')), 'SupplyInfo');
const SupplyAdd = r => require.ensure([], () => r(require('@/page/SupplierManage/SupplyAdd')), 'SupplyAdd');
const test = r => require.ensure([], () => r(require('@/page/SupplierManage/test')), 'test');
//系统权限
const UserInfo = r => require.ensure([], () => r(require('@/page/SystemRole/UserInfo')), 'UserInfo');
const RoleInfo = r => require.ensure([], () => r(require('@/page/SystemRole/RoleInfo')), 'RoleInfo');
const MenuInfo = r => require.ensure([], () => r(require('@/page/SystemRole/MenuInfo')), 'MenuInfo');
const MenuRole = r => require.ensure([], () => r(require('@/page/SystemRole/MenuRole')), 'MenuRole');
const MenuUser = r => require.ensure([], () => r(require('@/page/SystemRole/MenuUser')), 'MenuUser');

//APP中心
const PostManage = r => require.ensure([], () => r(require('@/page/APPCenter/Interaction/PostManage')), 'PostManage');
const VideoManage = r => require.ensure([], () => r(require('@/page/APPCenter/Interaction/VideoManage')), 'VideoManage');
const CaseManage = r => require.ensure([], () => r(require('@/page/APPCenter/Interaction/CaseManage')), 'CaseManage');
const CommentManage = r => require.ensure([], () => r(require('@/page/APPCenter/Interaction/CommentManage')), 'CommentManage');
const Activity = r => require.ensure([], () => r(require('@/page/APPCenter/Activity')), 'Activity');

const AppNotice = r => require.ensure([], () => r(require('@/page/APPCenter/AppNotice')), 'AppNotice');
const QAManage = r => require.ensure([], () => r(require('@/page/APPCenter/Interaction/QAManage')), 'QAManage');
const projectKnowledge = r => require.ensure([], () => r(require('@/page/APPCenter/Interaction/projectKnowledge')), 'projectKnowledge');
const advertisement = r => require.ensure([], () => r(require('@/page/APPCenter/advertisement')), 'advertisement');

    //APP中心 ---页面配置
const homeSet = r => require.ensure([], () => r(require('@/page/APPCenter/AppPageSet/homeSet')), 'homeSet');
const beautySet = r => require.ensure([], () => r(require('@/page/APPCenter/AppPageSet/beautySet')), 'beautySet');
const PCBanner = r => require.ensure([], () => r(require('@/page/APPCenter/AppPageSet/PCBanner')), 'PCBanner');
const designerSet = r => require.ensure([], () => r(require('@/page/APPCenter/AppPageSet/designerSet')), 'designerSet');
const appActive = r => require.ensure([], () => r(require('@/page/APPCenter/AppPageSet/appActive')), 'appActive');
const caseReview = r => require.ensure([], () => r(require('@/page/APPCenter/caseManage/caseReview')), 'caseReview');
const caseAudit = r => require.ensure([], () => r(require('@/page/APPCenter/caseManage/caseAudit')), 'caseAudit');
const portrait = r => require.ensure([], () => r(require('@/page/APPCenter/caseManage/portrait')), 'portrait');

// 分享用户
const shareCus = r => require.ensure([], () => r(require('@/page/APPCenter/customerManage/shareCus')), 'shareCus');
const verifyReview = r => require.ensure([], () => r(require('@/page/APPCenter/customerManage/verifyReview')), 'verifyReview');
const cusReport = r => require.ensure([], () => r(require('@/page/APPCenter/customerManage/cusReport')), 'cusReport');
const cusVisit = r => require.ensure([], () => r(require('@/page/APPCenter/customerManage/cusVisit')), 'cusVisit');
const achieveAccount = r => require.ensure([], () => r(require('@/page/APPCenter/customerManage/achieveAccount')), 'achieveAccount');
const customer = r => require.ensure([], () => r(require('@/page/APPCenter/customerManage/customer')), 'customer');
const appCustomer = r => require.ensure([], () => r(require('@/page/APPCenter/customerManage/appCustomer')), 'appCustomer');

//会员中心
const memberManage = r => require.ensure([], () => r(require('@/page/MemberCenter/memberManage')), 'memberManage');
const meAuth = r => require.ensure([], () => r(require('@/page/MemberCenter/meAuth')), 'meAuth');
const serviceProvider = r => require.ensure([], () => r(require('@/page/MemberCenter/service/serviceProvider')), 'serviceProvider');
const servicePSearch = r => require.ensure([], () => r(require('@/page/MemberCenter/service/servicePSearch')), 'servicePSearch');
const servicePShop = r => require.ensure([], () => r(require('@/page/MemberCenter/service/servicePShop')), 'servicePShop');
const serviceTransfer = r => require.ensure([], () => r(require('@/page/MemberCenter/service/serviceTransfer')), 'serviceTransfer');

//商户
const addMerchant = r => require.ensure([], () => r(require('@/page/OperationManage/Merchant/addMerchant')), 'addMerchant');
const merchantList = r => require.ensure([], () => r(require('@/page/OperationManage/Merchant/merchantList')), 'merchantList');
const tag = r => require.ensure([], () => r(require('@/page/RuleManage/tag')), 'tag');
const gradeList = r => require.ensure([], () => r(require('@/page/RuleManage/gradeSet/gradeList')), 'gradeList');
const userGrade = r => require.ensure([], () => r(require('@/page/RuleManage/gradeSet/userGrade')), 'userGrade');

// 医院管理
const consultList = r => require.ensure([], () => r(require('@/page/HospiatalManage/consultList')), 'consultList');
const complaint = r => require.ensure([], () => r(require('@/page/HospiatalManage/complaint')), 'complaint');
const consultManage = r => require.ensure([], () => r(require('@/page/HospiatalManage/consultManage')), 'consultManage');
const addConsult = r => require.ensure([], () => r(require('@/page/HospiatalManage/addConsult')), 'addConsult');
const delConsult = r => require.ensure([], () => r(require('@/page/HospiatalManage/delConsult')), 'delConsult');
const coustomerVisit = r => require.ensure([], () => r(require('@/page/HospiatalManage/coustomerVisit')), 'coustomerVisit');
const addAppoint = r => require.ensure([], () => r(require('@/page/HospiatalManage/addAppoint')), 'addAppoint');
const questionF = r => require.ensure([], () => r(require('@/page/HospiatalManage/questionF')), 'questionF');
const revisit = r => require.ensure([], () => r(require('@/page/HospiatalManage/revisit')), 'revisit');
const scheduling = r => require.ensure([], () => r(require('@/page/HospiatalManage/scheduling')), 'scheduling');
const desSchedule = r => require.ensure([], () => r(require('@/page/HospiatalManage/desSchedule')), 'desSchedule');

// 物资
const drugsStorage = r => require.ensure([], () => r(require('@/page/material/storage/drugsStorage')), 'drugsStorage');
const drugInvDet = r => require.ensure([], () => r(require('@/page/material/storage/drugInvDet')), 'drugInvDet');
const drugDelivery = r => require.ensure([], () => r(require('@/page/material/storage/drugDelivery')), 'drugDelivery');
const drugInventory = r => require.ensure([], () => r(require('@/page/material/storage/drugInventory')), 'drugInventory');
const mcloseBill = r => require.ensure([], () => r(require('@/page/material/storage/mcloseBill')), 'mcloseBill');
const totaLStock = r => require.ensure([], () => r(require('@/page/material/storage/totaLStock')), 'totaLStock');
const errorMes = r => require.ensure([], () => r(require('@/page/material/storage/errorMes')), 'errorMes');
const drugPay = r => require.ensure([], () => r(require('@/page/material/storage/drugPay')), 'drugPay');
const drugPayMent = r => require.ensure([], () => r(require('@/page/material/storage/drugPayMent')), 'drugPayMent');
const drugWarning = r => require.ensure([], () => r(require('@/page/material/storage/drugWarning')), 'drugWarning');
const drugInv = r => require.ensure([], () => r(require('@/page/material/storage/drugInv')), 'drugInv');


// 库存报表
const deptA = r => require.ensure([], () => r(require('@/page/material/stockRP/deptA')), 'deptA');
const drugInA = r => require.ensure([], () => r(require('@/page/material/stockRP/drugInA')), 'drugInA');
const methodA = r => require.ensure([], () => r(require('@/page/material/stockRP/methodA')), 'methodA');
const supplierA = r => require.ensure([], () => r(require('@/page/material/stockRP/supplierA')), 'supplierA');
const useA = r => require.ensure([], () => r(require('@/page/material/stockRP/useA')), 'useA');
// 库存管理
const stockAccount = r => require.ensure([], () => r(require('@/page/material/stockManRP/stockAccount')), 'stockAccount');
const stockAccountS = r => require.ensure([], () => r(require('@/page/material/stockManRP/stockAccountS')), 'stockAccountS');
const stockDet = r => require.ensure([], () => r(require('@/page/material/stockManRP/stockDet')), 'stockDet');
const stockInDet = r => require.ensure([], () => r(require('@/page/material/stockManRP/stockInDet')), 'stockInDet');
const stockOutDet = r => require.ensure([], () => r(require('@/page/material/stockManRP/stockOutDet')), 'stockOutDet');
const stockPlatform = r => require.ensure([], () => r(require('@/page/material/stockManRP/stockPlatform')), 'stockPlatform');
const stockSum = r => require.ensure([], () => r(require('@/page/material/stockManRP/stockSum')), 'stockSum');
const stockSumDet = r => require.ensure([], () => r(require('@/page/material/stockManRP/stockSumDet')), 'stockSumDet');
const stockAccountT = r => require.ensure([], () => r(require('@/page/material/stockManRP/stockAccountT')), 'stockAccountT');
// 券进销存
const tStorageIn = r => require.ensure([], () => r(require('@/page/material/ticketsStorage/tStorageIn')), 'tStorageIn');
const tStorageOut = r => require.ensure([], () => r(require('@/page/material/ticketsStorage/tStorageOut')), 'tStorageOut');
const tTotal = r => require.ensure([], () => r(require('@/page/material/ticketsStorage/tTotal')), 'tTotal');
const tTotalDet = r => require.ensure([], () => r(require('@/page/material/ticketsStorage/tTotalDet')), 'tTotalDet');

const destroyTicket = r => require.ensure([], () => r(require('@/page/material/ticketsStorage/destroyTicket')), 'destroyTicket');

const ticketsInfo = r => require.ensure([], () => r(require('@/page/material/ticketsStorage/ticketsInfo')), 'ticketsInfo');
const ticketCross = r => require.ensure([], () => r(require('@/page/material/ticketsStorage/ticketCross')), 'ticketCross');

const router = new VueRouter({
    //mode: 'history',
    routes: [
        { path: '/', component: login },
        { path: '/login', component: login },
        {
            path: '/menu',
            component: menu,
            name: "",
            children: [
                { path: '/menu/memberManage', component: memberManage,name: 'memberManage', meta: { role: ['', ''] } },
                { path: '/menu/index', component: index, meta: { role: ['', ''] } },
                { path: '/menu/ConsumeDiscount', component: ConsumeDiscount,name: 'ConsumeDiscount', meta: { role: ['', ''] } },
                { path: '/menu/royaltyAllocate', component: royaltyAllocate,name: 'royaltyAllocate', meta: { role: ['', ''] } },
                { path: '/menu/gradeStrategy', component: gradeStrategy,name: 'gradeStrategy', meta: { role: ['', ''] } },
                { path: '/menu/specialStrategy', component: specialStrategy,name: 'specialStrategy', meta: { role: ['', ''] } },
                { path: '/menu/recAllocation', component: recAllocation, name: 'recAllocation',meta: { role: ['', ''] } },
                { path: '/menu/propAllocate', component: propAllocate,name: 'propAllocate', meta: { role: ['', ''] } },
                { path: '/menu/DuesDiscount', component: DuesDiscount, name: 'DuesDiscount',meta: { role: ['', ''] } },
                { path: '/menu/GradeSet', component: GradeSet, name: 'GradeSet',meta: { role: ['', ''] } },
                { path: '/menu/PackageSet', component: PackageSet, name: 'PackageSet',meta: { role: ['', ''] } },
                { path: '/menu/nurseSet', component: nurseSet,name: 'nurseSet', meta: { role: ['', ''] } },
                { path: '/menu/expertSet', component: expertSet,name: 'expertSet', meta: { role: ['', ''] } },
                { path: '/menu/expertAcc', component: expertAcc,name: 'expertAcc', meta: { role: ['', ''] } },
                { path: '/menu/serviceAcc', component: serviceAcc,name: 'serviceAcc', meta: { role: ['', ''] } },
                { path: '/menu/serviceAccRef', component: serviceAccRef,name: 'serviceAccRef', meta: { role: ['', ''] } },

                { path: '/menu/extraFee', component: extraFee,name: 'extraFee', meta: { role: ['', ''] } },
                { path: '/menu/extraFeeList', component: extraFeeList,name: 'extraFeeList', meta: { role: ['', ''] } },
                { path: '/menu/guestCount', component: guestCount,name: 'guestCount', meta: { role: ['', ''] } },


                { path: '/menu/expertExclude', component: expertExclude,name: 'expertExclude', meta: { role: ['', ''] } },
                { path: '/menu/warehouse', component: warehouse,name: 'warehouse', meta: { role: ['', ''] } },
                { path: '/menu/partMent', component: partMent,name: 'partMent', meta: { role: ['', ''] } },
                { path: '/menu/supplierM', component: supplierM,name: 'supplierM', meta: { role: ['', ''] } },


                { path: '/menu/branchOutDet', component: branchOutDet,name: 'branchOutDet', meta: { role: ['', ''] } },
                { path: '/menu/branchIncDet', component: branchIncDet,name: 'branchIncDet', meta: { role: ['', ''] } },

                { path: '/menu/productEditor', component: productEditor,name: 'productEditor', meta: { role: ['', ''] } },
                { path: '/menu/commodityAudit', component: commodityAudit,name: 'commodityAudit', meta: { role: ['', ''] } },
                { path: '/menu/goodsList', component: goodsList, name: 'goodsList',meta: { role: ['', ''] } },
                { path: '/menu/goodsUpDown', component: goodsUpDown, name: 'goodsUpDown',meta: { role: ['', ''] } },
                { path: '/menu/goodsClassification', component: goodsClassification, name: 'goodsClassification',meta: { role: ['', ''] } },
                { path: '/menu/goodClassy', component: goodClassy, name: 'goodClassy',meta: { role: ['', ''] } },

                { path: '/menu/addGoods', component: addGoods, name: 'addGoods',meta: { role: ['', ''] } },
                { path: '/menu/AttributeList', component: AttributeList,name: 'AttributeList', meta: { role: ['', ''] } },
                { path: '/menu/productOutDet', component: productOutDet,name: 'productOutDet', meta: { role: ['', ''] } },
                { path: '/menu/productAcc', component: productAcc,name: 'productAcc', meta: { role: ['', ''] } },

                //营销
                { path: '/menu/redPackets', component: redPackets,name: 'redPackets', meta: { role: ['', ''] } },
                { path: '/menu/rebates', component: rebates,name: 'rebates', meta: { role: ['', ''] } },

                //商户
                { path: '/menu/addMerchant', component: addMerchant,name: 'addMerchant', meta: { role: ['', ''] } },
                { path: '/menu/tag', component: tag,name: 'tag', meta: { role: ['', ''] } },
                { path: '/menu/merchantList', component: merchantList,name: 'merchantList', meta: { role: ['', ''] } },
                { path: '/menu/gradeList', component: gradeList,name: 'gradeList', meta: { role: ['', ''] } },
                { path: '/menu/userGrade', component: userGrade,name: 'userGrade', meta: { role: ['', ''] } },

                //订单
                { path: '/menu/projectOrder', component: projectOrder,name: 'projectOrder', meta: { role: ['', ''] } },
                { path: '/menu/payCount', component: payCount,name: 'payCount', meta: { role: ['', ''] } },
                { path: '/menu/putForward', component: putForward,name: 'putForward', meta: { role: ['', ''] } },
                { path: '/menu/orderProfit', component: orderProfit,name: 'orderProfit', meta: { role: ['', ''] } },
                { path: '/menu/orderTrans', component: orderTrans,name: 'orderTrans', meta: { role: ['', ''] } },
                { path: '/menu/activeTrans', component: activeTrans,name: 'activeTrans', meta: { role: ['', ''] } },
                { path: '/menu/projectItem', component: projectItem,name: 'projectItem', meta: { role: ['', ''] } },
                { path: '/menu/onlineTeam', component: onlineTeam,name: 'onlineTeam', meta: { role: ['', ''] } },

                //代理中心
                { path: '/menu/AgentManage', component: AgentManage, name: 'AgentManage', meta: { role: ['', ''] } },
                { path: '/menu/AgentGeneal', component: AgentGeneal, name: 'AgentGeneal', meta: { role: ['', ''] } },
                { path: '/menu/agentCheck', component: agentCheck, name: 'agentCheck', meta: { role: ['', ''] } },
                { path: '/menu/rechargeList', component: rechargeList, name: 'rechargeList', meta: { role: ['', ''] } },
                { path: '/menu/Embroidery', component: Embroidery, name: 'Embroidery', meta: { role: ['', ''] } },
                { path: '/menu/integralTransfer', component: integralTransfer, name: 'integralTransfer', meta: { role: ['', ''] } },
                { path: '/menu/customerDet', component: customerDet, name: 'customerDet', meta: { role: ['', ''] } },
                { path: '/menu/agentPackEdit', component: agentPackEdit, name: 'agentPackEdit', meta: { role: ['', ''] } },
                { path: '/menu/account', component: account, name: 'account', meta: { role: ['', ''] } },
                { path: '/menu/accountList', component: accountList, name: 'accountList', meta: { role: ['', ''] } },

                { path: '/menu/fundList', component: fundList, name: 'fundList', meta: { role: ['', ''] } },

                { path: '/menu/upGradeCheck', component: upGradeCheck, name: 'upGradeCheck', meta: { role: ['', ''] } },
                { path: '/menu/upGradeOpen', component: upGradeOpen, name: 'upGradeOpen', meta: { role: ['', ''] } },
                { path: '/menu/fixeMes', component: fixeMes, name: 'fixeMes', meta: { role: ['', ''] } },
                { path: '/menu/opeLog', component: opeLog, name: 'opeLog', meta: { role: ['', ''] } },

                //系统权限
                { path: '/menu/UserInfo', component: UserInfo, name: 'UserInfo', meta: { role: ['', ''] } },
                { path: '/menu/RoleInfo', component: RoleInfo, name: 'RoleInfo', meta: { role: ['', ''] } },
                { path: '/menu/MenuInfo', component: MenuInfo, name: 'MenuInfo', meta: { role: ['', ''] } },
                { path: '/menu/MenuRole', component: MenuRole, name: 'MenuRole', meta: { role: ['', ''] } },
                { path: '/menu/MenuUser', component: MenuUser, name: 'MenuUser', meta: { role: ['', ''] } },

                //供方管理
                { path: '/menu/SupplyInfo', component: SupplyInfo, name: 'SupplyInfo', meta: { role: ['', ''] } },
                { path: '/menu/SupplyAdd', component: SupplyAdd, name: 'SupplyAdd', meta: { role: ['', ''] } },
                { path: '/menu/ServantList', component: ServantList, name: 'ServantList', meta: { role: ['', ''] } },
                { path: '/menu/ServantAdd', component: ServantAdd, name: 'ServantAdd', meta: { role: ['', ''] } },
                { path: '/menu/test', component: test, name: 'test', meta: { role: ['', ''] } },


                //卡券
                { path: '/menu/couponAdd', component: couponAdd, name: 'couponAdd', meta: { role: ['', ''] } },
                { path: '/menu/couponList', component: couponList, name: 'couponList', meta: { role: ['', ''] } },
                { path: '/menu/couponApply', component: couponApply, name: 'couponApply', meta: { role: ['', ''] } },
                { path: '/menu/couponCheck', component: couponCheck, name: 'couponCheck', meta: { role: ['', ''] } },
                { path: '/menu/couponOut', component: couponOut, name: 'couponOut', meta: { role: ['', ''] } },
                { path: '/menu/couponEntery', component: couponEntery, name: 'couponEntery', meta: { role: ['', ''] } },
                { path: '/menu/couponSale', component: couponSale, name: 'couponSale', meta: { role: ['', ''] } }, //卡券
                { path: '/menu/couponConsume', component: couponConsume, name: 'couponConsume', meta: { role: ['', ''] } }, //卡券
                { path: '/menu/couponDetail', component: couponDetail, name: 'couponDetail', meta: { role: ['', ''] } }, //卡券
                { path: '/menu/applyCoupon', component: applyCoupon, name: 'applyCoupon', meta: { role: ['', ''] } }, //申请

                //APP管理
                { path: '/menu/PostManage', component: PostManage, name: 'PostManage', meta: { role: ['', ''] } },
                { path: '/menu/VideoManage', component: VideoManage, name: 'VideoManage', meta: { role: ['', ''] } },
                { path: '/menu/CaseManage', component: CaseManage,  name: 'CaseManage',meta: { role: ['', ''] } },
                { path: '/menu/CommentManage', component: CommentManage, name: 'CommentManage', meta: { role: ['', ''] } },
                { path: '/menu/Activity', component: Activity, name: 'Activity', meta: { role: ['', ''] } },

                { path: '/menu/AppNotice', component: AppNotice, name: 'AppNotice', meta: { role: ['', ''] } },
                { path: '/menu/projectKnowledge', component: projectKnowledge,  name: 'projectKnowledge',meta: { role: ['', ''] } },
                { path: '/menu/QAManage', component: QAManage, name: 'QAManage', meta: { role: ['', ''] } },
                { path: '/menu/advertisement', component: advertisement, name: 'advertisement', meta: { role: ['', ''] } },

                //直播管理

                //财务管理
                { path: '/menu/reportManage', component: reportManage, name: 'reportManage', meta: { role: ['', ''] } },
                { path: '/menu/addReportNew', component: addReportNew, name: 'addReportNew', meta: { role: ['', ''] } },
                { path: '/menu/addReport', component: addReport, name: 'addReport', meta: { role: ['', ''] } },
                { path: '/menu/payReport', component: payReport, name: 'payReport', meta: { role: ['', ''] } },
                { path: '/menu/reportList', component: reportList, name: 'reportList', meta: { role: ['', ''] } },
                { path: '/menu/closeReport', component: closeReport, name: 'closeReport', meta: { role: ['', ''] } },
                { path: '/menu/closePS', component: closePS, name: 'closePS', meta: { role: ['', ''] } },
                { path: '/menu/achievement', component: achievement, name: 'achievement', meta: { role: ['', ''] } },
                { path: '/menu/errorReport', component: errorReport,  name: 'errorReport',meta: { role: ['', ''] } },
                { path: '/menu/achievementD', component: achievementD, name: 'achievementD', meta: { role: ['', ''] } },
                { path: '/menu/crossAchieve', component: crossAchieve, name: 'crossAchieve', meta: { role: ['', ''] } },
                { path: '/menu/docAchieveDet', component: docAchieveDet, name: 'docAchieveDet', meta: { role: ['', ''] } },

                { path: '/menu/commandDet', component: commandDet, name: 'commandDet', meta: { role: ['', ''] } },
                { path: '/menu/crossRP', component: crossRP, name: 'crossRP', meta: { role: ['', ''] } },

                { path: '/menu/commandEdit', component: commandEdit, name: 'commandEdit', meta: { role: ['', ''] } },

                // 产品单
                { path: '/menu/ordonnance', component: ordonnance, name: 'ordonnance', meta: { role: ['', ''] } },
                { path: '/menu/disposalSheet', component: disposalSheet, name: 'disposalSheet', meta: { role: ['', ''] } },


                { path: '/menu/proPay', component: proPay,  name: 'proPay',meta: { role: ['', ''] } },
                { path: '/menu/template', component: template,  name: 'template',meta: { role: ['', ''] } },


                { path: '/menu/delOrdon', component: delOrdon, name: 'delOrdon', meta: { role: ['', ''] } },


                { path: '/menu/meAuth', component: meAuth,  name: 'meAuth',meta: { role: ['', ''] } },

                { path: '/menu/serviceProvider', component: serviceProvider,  name: 'serviceProvider',meta: { role: ['', ''] } },
                { path: '/menu/servicePShop', component: servicePShop,  name: 'servicePShop',meta: { role: ['', ''] } },
                { path: '/menu/serviceTransfer', component: serviceTransfer,  name: 'serviceTransfer',meta: { role: ['', ''] } },

                { path: '/menu/servicePSearch', component: servicePSearch,  name: 'servicePSearch',meta: { role: ['', ''] } },

                { path: '/menu/command', component: command, name: 'command', meta: { role: ['', ''] } },
                { path: '/menu/open', component: open, name: 'open', meta: { role: ['', ''] } },
                { path: '/menu/shopMes', component: shopMes, name: 'shopMes', meta: { role: ['', ''] } },

                { path: '/menu/branchPerformance', component: branchPerformance, name: 'branchPerformance', meta: { role: ['', ''] } },

                { path: '/menu/appPoints', component: appPoints, name: 'appPoints', meta: { role: ['', ''] } },

                { path: '/menu/reportCheck', component: reportCheck, name: 'reportCheck', meta: { role: ['', ''] } },
                { path: '/menu/reportError', component: reportError, name: 'reportError', meta: { role: ['', ''] } },
                { path: '/menu/expectIncome', component: expectIncome,  name: 'expectIncome',meta: { role: ['', ''] } },

                { path: '/menu/crossSettled', component: crossSettled, name: 'crossSettled', meta: { role: ['', ''] } },
                { path: '/menu/hospitalInDet', component: hospitalInDet, name: 'hospitalInDet', meta: { role: ['', ''] } },
                { path: '/menu/branchInDet', component: branchInDet, name: 'branchInDet', meta: { role: ['', ''] } },
                { path: '/menu/hosSettle', component: hosSettle,  name: 'hosSettle',meta: { role: ['', ''] } },
                { path: '/menu/serviceSettle', component: serviceSettle,  name: 'serviceSettle',meta: { role: ['', ''] } },
                { path: '/menu/serviceSetHis', component: serviceSetHis,  name: 'serviceSetHis',meta: { role: ['', ''] } },
                { path: '/menu/branchSettle', component: branchSettle,  name: 'branchSettle',meta: { role: ['', ''] } },

                { path: '/menu/hSHistory', component: hSHistory,  name: 'hSHistory',meta: { role: ['', ''] } },
                { path: '/menu/bSHistory', component: bSHistory,  name: 'bSHistory',meta: { role: ['', ''] } },
                { path: '/menu/sSRefHistory', component: sSRefHistory,  name: 'sSRefHistory',meta: { role: ['', ''] } },
                { path: '/menu/weekReport', component: weekReport,  name: 'weekReport',meta: { role: ['', ''] } },
                { path: '/menu/monthReport', component: monthReport,  name: 'monthReport',meta: { role: ['', ''] } },
                { path: '/menu/sSconHistory', component: sSconHistory,  name: 'sSconHistory',meta: { role: ['', ''] } },

                { path: '/menu/actingLedger', component: actingLedger, name: 'actingLedger',  meta: { role: ['', ''] } },
                { path: '/menu/docAchieve', component: docAchieve, name: 'docAchieve', meta: { role: ['', ''] } },
                { path: '/menu/desAchieve', component: desAchieve,  name: 'desAchieve',meta: { role: ['', ''] } },

                { path: '/menu/conAchieve', component: conAchieve,  name: 'conAchieve',meta: { role: ['', ''] } },
                { path: '/menu/desAssist', component: desAssist, name: 'desAssist', meta: { role: ['', ''] } },
                { path: '/menu/hosRecDetail', component: hosRecDetail, name: 'hosRecDetail',meta: { role: ['', ''] } },
                { path: '/menu/hosRecSum', component: hosRecSum, name: 'hosRecSum',meta: { role: ['', ''] } },

                { path: '/menu/debitNote', component: debitNote,  name: 'debitNote',meta: { role: ['', ''] } },
                { path: '/menu/debitList', component: debitList, name: 'debitList', meta: { role: ['', ''] } },
                { path: '/menu/refund', component: refund,  name: 'refund',meta: { role: ['', ''] } },
                { path: '/menu/receivables', component: receivables,  name: 'receivables',meta: { role: ['', ''] } },

                { path: '/menu/teamMigrate', component: teamMigrate, name: 'teamMigrate', meta: { role: ['', ''] } },
                { path: '/menu/searchMigrate', component: searchMigrate, name: 'searchMigrate', meta: { role: ['', ''] } },


                { path: '/menu/exit', component: exit, name: 'exit', meta: { role: ['', ''] } },
                { path: '/menu/addPayForm', component: addPayForm,  name: 'addPayForm',meta: { role: ['', ''] } },
                { path: '/menu/payFormList', component: payFormList, name: 'payFormList', meta: { role: ['', ''] } },

                //-------------APP中心 ——页面配置
                { path: '/menu/homeSet', component: homeSet, name: 'homeSet' },
                { path: '/menu/beautySet', component: beautySet, name: 'beautySet'},
                { path: '/menu/PCBanner', component: PCBanner, name: 'PCBanner'},
                { path: '/menu/designerSet', component: designerSet, name: 'designerSet'},
                { path: '/menu/appActive', component: appActive, name: 'appActive'},
                { path: '/menu/caseReview', component: caseReview, name: 'caseReview'},
                { path: '/menu/caseAudit', component: caseAudit, name: 'caseAudit'},
                { path: '/menu/portrait', component: portrait, name: 'portrait'},

                // 分享用户
                { path: '/menu/shareCus', component: shareCus, name: 'shareCus'},
                { path: '/menu/verifyReview', component: verifyReview, name: 'verifyReview'},
                { path: '/menu/cusVisit', component: cusVisit, name: 'cusVisit'},
                { path: '/menu/cusReport', component: cusReport, name: 'cusReport'},
                { path: '/menu/achieveAccount', component: achieveAccount, name: 'achieveAccount'},
                { path: '/menu/customer', component: customer, name: 'customer'},
                { path: '/menu/appCustomer', component: appCustomer, name: 'appCustomer'},

                // 医院管理
                { path: '/menu/addAppoint', component: addAppoint, name: 'addAppoint'},
                { path: '/menu/coustomerVisit', component: coustomerVisit, name: 'coustomerVisit'},
                { path: '/menu/consultManage', component: consultManage , name: 'consultManage'},
                { path: '/menu/consultList', component: consultList , name: 'consultList'},
                { path: '/menu/complaint', component: complaint , name: 'complaint'},
                { path: '/menu/addConsult', component: addConsult, name: 'addConsult' },
                { path: '/menu/delConsult', component: delConsult , name: 'delConsult'},
                { path: '/menu/NotFoundComponent', component: NotFoundComponent},
                { path: '/menu/questionF', component: questionF , name: 'questionF'},
                { path: '/menu/revisit', component: revisit , name: 'revisit'},
                { path: '/menu/scheduling', component: scheduling , name: 'scheduling'},
                { path: '/menu/desSchedule', component: desSchedule , name: 'desSchedule'},

                // 物资
                { path: '/menu/drugsStorage', component: drugsStorage , name: 'drugsStorage'},
                { path: '/menu/drugInvDet', component: drugInvDet , name: 'drugInvDet'},
                { path: '/menu/drugDelivery', component: drugDelivery , name: 'drugDelivery'},
                { path: '/menu/drugInventory', component: drugInventory , name: 'drugInventory'},
                { path: '/menu/mcloseBill', component: mcloseBill , name: 'mcloseBill'},
                { path: '/menu/drugWarning', component: drugWarning , name: 'drugWarning'},
                { path: '/menu/totaLStock', component: totaLStock , name: 'totaLStock'},
                { path: '/menu/errorMes', component: errorMes , name: 'errorMes'},
                { path: '/menu/drugPay', component: drugPay , name: 'drugPay'},
                { path: '/menu/drugPayMent', component: drugPayMent , name: 'drugPayMent'},
                { path: '/menu/drugInv', component: drugInv , name: 'drugInv'},

                // 库存报表
                { path: '/menu/deptA', component: deptA , name: 'deptA',},
                { path: '/menu/drugInA', component: drugInA , name: 'drugInA',},
                { path: '/menu/methodA', component: methodA , name: 'methodA',},
                { path: '/menu/supplierA', component: supplierA , name: 'supplierA',},
                { path: '/menu/useA', component: useA , name: 'useA',},
                // 库存管理
                { path: '/menu/stockAccount', component: stockAccount , name: 'stockAccount',},
                { path: '/menu/stockAccountS', component: stockAccountS , name: 'stockAccountS',},
                { path: '/menu/stockDet', component: stockDet , name: 'stockDet',},
                { path: '/menu/stockInDet', component: stockInDet , name: 'stockInDet',},
                { path: '/menu/stockOutDet', component: stockOutDet , name: 'stockOutDet',},
                { path: '/menu/stockPlatform', component: stockPlatform , name: 'stockPlatform',},
                { path: '/menu/stockSum', component: stockSum , name: 'stockSum',},
                { path: '/menu/stockSumDet', component: stockSumDet , name: 'stockSumDet',},
                { path: '/menu/stockAccountT', component: stockAccountT , name: 'stockAccountT',},
                // 券进销存
                { path: '/menu/tStorageIn', component: tStorageIn , name: 'tStorageIn'},
                { path: '/menu/tStorageOut', component: tStorageOut , name: 'tStorageOut'},
                { path: '/menu/tTotal', component: tTotal , name: 'tTotal'},
                { path: '/menu/tTotalDet', component: tTotalDet , name: 'tTotalDet'},

                { path: '/menu/destroyTicket', component: destroyTicket , name: 'destroyTicket'},

                { path: '/menu/ticketsInfo', component: ticketsInfo , name: 'ticketsInfo'},
                { path: '/menu/ticketCross', component: ticketCross , name: 'ticketCross'},

                // 通配符
                { path: '*', component: NotFoundComponent, redirect: '/menu/NotFoundComponent' },
            ]
        },
        { path: '*', component: NotFoundComponent, redirect: '/menu/NotFoundComponent' }
    ]
})


//权限验证
router.beforeEach((to, from, next) => {
    if(to.path=="/login"){
        next()
        return
    }
    if(!getCookie("userName")){//过期重新登录
        next({ path: '/login' })
    }
    if (getCookie("isReload") == 'xmxloadpage') {
        next()
        delCookie("isReload")
        return
    }
    let arrs = to.fullPath.split('/')
    let okRouter = ['/menu', '/', '/login', '/menu/NotFoundComponent', '/menu/index','/menu/questionF']
    if (okRouter.indexOf(to.path) >= 0) {
        next()
        return
    }

    if (store && store.state.menus) {
        if (arrs[2].split("?")[0] && store.state.menus.indexOf(arrs[2].split("?")[0]) >= 0) {
            next()
        } else {
            if(arrs[2] == "productEditor"){
                next()
            }else{
                next({ path: '/menu/NotFoundComponent' })
            }
        }
    } else {
        next({ path: '/login' })
    }
})


export default router
