import fetch from '@/config/myFetch'
import { cpus } from 'os';

//------------------------------袁权------------------------

/**
 * 用户
 */
export const getAllUser = () => fetch('/UserCenter/GetUserAll')
export const getUserInfoByPage = data => fetch('/UserCenter/GetUserAllByPage', data, "get")
export const addUser = data => fetch('/UserCenter/AddUser', data, "post")
export const updateUser = data => fetch('/UserCenter/UpdateUser', data, "post")
export const deleteUser = id => fetch('/UserCenter/DeleteUser', { "id": id })
export const existsUser = userName => fetch('/UserCenter/ExistsUser', { "userName": userName }) //验证用户名是否可以添加， 1.可以添加用户  0.不可以
export const UpdateUserPassword = data => fetch('/UserCenter/UpdateUserPassword', data, "post")
export const GetToken = data => fetch('/Service/GetToken', data)
/**
 * 角色
 */
export const getRoleAll = () => fetch('/UserCenter/GetRoleAll')
export const GetRoleByPage = data => fetch('/UserCenter/GetRoleByPage',data)

export const addRole = (data) => fetch('/UserCenter/AddRole', data, "post")
export const updateRole = (data) => fetch('/UserCenter/UpdateRole', data, "post")
export const deleteRole = (id) => fetch('/UserCenter/DeleteRole', { "id": id })

/**
 * 菜单
 */
export const getModuleAll = () => fetch('/UserCenter/GetModuleAll')
export const addModule = (data) => fetch('/UserCenter/AddModule', data, "post")
export const updateModule = data => fetch('/UserCenter/UpdateModule', data, "post")
export const deleteModule = id => fetch('/UserCenter/DeleteModule', { "Id": id })
/**
 * 用户 ----角色 关联
 */
export const getUserRoleByUserId = id => fetch('/UserCenter/GetUserRoleByUserId', { "UserId": id }) //根据用户 ID 获取角色
export const getBaseUserRole = id => fetch('/UserCenter/GetBaseUserRole', { "RoleId": id }) //根据角色ID 获取用户
export const addUserRole = data => fetch('/UserCenter/AddUserRole', { "jsonStr": data }, "post") //增加角色 用户 关系
export const GetMenuByUserId = id => fetch('/UserCenter/GetModuleListByUserId', { "UserId": id }) //通过 UserId 获取菜单
export const AddMenuByUserRole = data => fetch('/UserCenter/AddPermissionModule', { "jsonStr": data }, "post") //添加菜单  ---- 角色，用户 通用
export const GetMenuByRoleId = id => fetch('/UserCenter/GetModuleListByRoleId', { "RoleId": id }) //通过 roleId 获取 菜单
/**
 * 供方
 */
export const upLoadImg = fs => fetch('/image/UploadImg?op=goods', fs, "post")
export const getSupplierByPage = data => fetch('/BaseSupplier/GetSupplierAllByPage', data, "post")
export const addSupplier = data => fetch('/BaseSupplier/AddSupplier', data, "post")
export const updateSupplier = data => fetch('/BaseSupplier/UpdateSupplier', data, "post")
export const deleteSupplier = id => fetch('/BaseSupplier/DeleteSuplier', { 'id': id })
export const getSupplierBySupType = data => fetch('/BaseSupplier/GetSupplierBySupType', { 'supType': data })
export const getSupplierById = id => fetch('/BaseSupplier/GetSupplierById', { 'id': id }) //根据供方ID获取详细信息
export const GetHospitalAccountByCode = data => fetch('/BaseSupplier/GetHospitalAccountByCode',data)
/**
 * 服务者，医生
 */
export const addServiceMan = data => fetch('/BaseServiceMan/AddServiceMan', data, "post") //添加服务者
export const updateServiceMan = data => fetch('/BaseServiceMan/UpdateServiceMan', data, "post") //修改服务者信息
export const deleteServiceMan = id => fetch('/BaseServiceMan/DeleteServiceMan', { id: id }) //删除服务者
export const getServiceManAll = data => fetch('/BaseServiceMan/GetServiceManAll', data) //获取所有服务者 列表
export const GetServiceManList = data => fetch('/BaseServiceMan/GetServiceManList', data) //获取所有服务者 列表
export const getServiceManAllByPage = data => fetch('/BaseServiceMan/GetServiceManAllByPage', data, "post") //分页条件获取 服务者列表
/**
 * 卡券
 */
export const getProjectCount = () => fetch('/basegoods/GetProjectCount', { 'columncode': '100' })
export const getProjectAll = data => fetch('/basegoods/GetProjectAll', data) //获取所有项目
export const getAllTicket = data => fetch('/Branch/GetBaseTicketsInfoAll',data,'GET') //获取所有项目
export const addCoupon = data => fetch('/Branch/AddBaseTicketsInfo', data, "post") //添加卡券
export const getTicketsInfoByPage = data => fetch('/Branch/GetTicketsInfoByCondtions', data, "post") //获取卡券列表，条件包括分页，等等
export const delTicket = id => fetch('/Branch/DeleteBaseTicketsInfo', { id }) //删除卡券
export const updateTicket = data => fetch('/Branch/UpdateBaseTicketsInfo', data, "post") //修改卡券
export const getTicketsInfoByTicketCode = data => fetch('/Branch/GetTicketsInfoByTicketCode', data) // 通过发售的券号 获取  券类型信息
export const getTicketsApplySubAll = applyCode => fetch('/Branch/GetTicketsApplySubAll', { 'ReceiptCode': applyCode }) // 通过申请编号，获取已经 录入 的券号
export const getTicketsInfo = code => fetch('/Branch/GetTicketsInfo', { 'ticketinfocode': code }) // 根据券种编号获取券种信息
export const UpdateTicketsInfoOnSale = data => fetch('/Branch/UpdateTicketsInfoOnSale', data) // 根据券种编号获取券种信息
export const ModifyScortCode = data => fetch('/Branch/ModifyScortCode', data)

//删除券号
export const DeleteTicketsApplySub = data => fetch('/Branch/DeleteTicketsApplySub', data) //添加卡券
export const DeleteTicketApply = data => fetch('/Branch/DeleteTicketApply', data)

//修改卡券激活 状态
export const activeTicket = (id, state, userId) => fetch('/Branch/UpdateTicketsInfoState', {
    id: id,
    checkResult: state,
    checkUserCode: userId
}, "post")
export const getTicketsApply = data => fetch('/Branch/GetTicketsApplyByCondtions', data, "post") //获取卡券申请列表
export const addTicketsApply = data => fetch('/Branch/AddTicketsApply', data, "post") //添加卡券申请
export const updateCheckState = data => fetch('/Branch/UpdateTicketsCheckState', data, "post") //改变卡券申请状态
export const updateApplyState = data => fetch('/Branch/UpdateApplyState', data) //改变卡券上下架状态(0)
export const addTicketsApplySub = data => fetch('/Branch/AddTicketsApplySub', { jsonStr: data }, "post") //单次录入，未完成
export const addTicketsApplySubFinished = data => fetch('/Branch/AddTicketsApplySubFinished', { jsonStr: data }, "post") //录入并保存卡券【完成录入】
export const ModifyTicketsApplySub = data => fetch('/Branch/ModifyTicketsApplySub',data)

// ----------------报单管理
export const AddProofOrder = data => fetch('/ProofOrder/AddProofOrder', data, "post") //添加报单
export const UpdateProofOrder = data => fetch('/ProofOrder/UpdateProofOrder', data, "post") //添加报单
export const getProofOrderDetail = fxcode => fetch('/ProofOrder/GetProofOrderDetail', { 'fxcode': fxcode }) //获取报单详情

export const UpdateApplySubIsUsed = fxcode => fetch('/Branch/UpdateApplySubIsUsed', { 'ticketsCode': ticketCode, 'isUsed': isUsed }) //修改消费券使用状态， 编辑报单，删除消费券时候，用到
//获取用户积分
export const GetUserAccountByCode = data => fetch('/UserAccount/GetUserAccountByCode', data )
export const GetBranchAccountAll = data => fetch('/UserAccount/GetBranchAccountAll', data )
export const GetBranchTicketDetail = data => fetch('/UserAccount/GetBranchTicketDetail', data )

export const UpdateProofOrderPay = data => fetch('/ProofOrderPay/UpdateProofOrderPay', data, "POST")
export const OrderRefundReturn = data => fetch('/ProofOrder/OrderRefundReturn', data)

export const Get98order = data => fetch('/ProofOrder/Get98order', data)//首页chart图
export const Getapponlineorder = data => fetch('/ProofOrder/Getapponlineorder', data)//首页chart图

//---------------报单执行
export const addCommandOrder = data => fetch('/CommandOrder/AddCommandOrder', data, "post") //添加报单执行项
export const UpdateOrderCommand = data => fetch('/CommandOrder/UpdateOrderCommand', data,"POST")
export const GetGoodsByCode = projectId => fetch('/BaseGoods/GetGoodsByCode', { 'code': projectId })
export const GetPackageByCode = code => fetch('/Branch/GetConsumerPackageOrderByCode', { 'branchCode': code })
export const RevokeOrderCommand = data => fetch('/CommandOrder/RevokeOrderCommand', data)
export const GetCustomerLeastDate = data => fetch('/CommandOrder/GetCustomerLeastDate', data)

/* 代理*/
export const getTopBranch = () => fetch('/Branch/GetTopBranch') //获取  【总】  代理
export const TicketIsUsed = data => fetch('/Branch/TicketIsUsed', data)
export const GetUserAllByKeywords = data => fetch('/Branch/GetUserAllByKeywords', data);
export const GetUserAllByKeywords2 = data => fetch('/Branch/GetUserAllByKeywords2', data);

//-------------------------------公用-------------------------------------

//获取 辅助表数据  通过code    {学历：0001， 0002：行业，0003：代理来源 0004：银行 ,0005 交易类型，0006支付方式 ,0007券载体,
// 0008 销售方式, 0009券类型 , 0010医院等级 , 0011医生职称  002等级属性  0013供方类型  0014服务者类型   0015认证标签  0024剂型
export const getBaseDataByCode = code => fetch('/BaseDataDic/GetBaseDataByBusinessCode', { "businesscode": code })
export const getUserById = userId => fetch('/UserCenter/GetUserById', { "id": userId }) //通过用户ID获取 信息
export const login = (id, password) => fetch('/UserCenter/LogOnPC', { "userName": id, "userPassWord": password }, "post") //登录
export const getMenuByUserId = (userId) => fetch('/UserCenter/GetModuleListByUserId', { "UserId": userId }) //获取用户菜单权限
//基础信息
export const GetBaseDataAll = data => fetch('/basedatadic/GetBaseDataAll', data)
//APP 页面配置
export const getAppHome = data => fetch('/AppHome', { 'agentId': data })
export const AppHome = data => fetch('/AppHome',  data )
export const getMedicalBeauty = data => fetch('/PCMedicalBeauty', { 'agentId': data })
export const AppWidgetListEdit = data => fetch('/WidgetListEdit', {jsonstr:JSON.stringify(data)}, 'post', 'application/json')
export const WidgetDelete = data => fetch('/WidgetDelete', data, 'GET')
export const widgetlist = id => fetch('/widgetlist', { 'partId': id }) //根据 id获取各个模块  【完整】 数据，轮播图需要用
export const PagePartEdit = data=>fetch('/PagePartEdit',JSON.stringify(data), 'post', 'application/json')

//------------------------------胡宏亮--------------------------------------------
/**
 * 商品
 * */
export const GetColumnAll = () => fetch('/BaseGoods/GetColumnAll');
export const GetCatelogByColumnCode = data => fetch('/BaseGoods/GetCatelogByColumnCode', data);/* 获取栏目下所有分类*/
export const GetCatelogChildrensByCode = data => fetch('/BaseGoods/GetCatelogChildrensByCode', data);//获取子类
export const UpdateCatalog = data => fetch('/BaseGoods/UpdateCatalog', data, "POST");//更新分类
export const BatchSaveCatalogProperty = data => fetch('/BaseGoods/BatchSaveCatalogProperty', data, "POST");//分类添加属性
export const AddCatalog = data => fetch('/BaseGoods/AddCatalog', data, "POST");//添加分类
export const DeleteCatelogById = data => fetch('/BaseGoods/DeleteCatelogById', data);//删除分类
export const GetPropertyByKeywords = data => fetch('/BaseGoods/GetPropertyByKeywords', data);//商品分类属性添加模糊搜索
export const AddProperty = data => fetch('/BaseGoods/AddProperty', data, "POST");//添加属性
export const DeletePropertyById = data => fetch('/BaseGoods/DeletePropertyById/', data);//删除属性
export const UpdateProperty = data => fetch('/BaseGoods/UpdateProperty', data, "POST");//更新属性
export const AddGoods = data => fetch('/BaseGoods/AddGoods', data, "POST");//添加商品
export const GetGoodsByConditions = data => fetch('/BaseGoods/GetGoodsByConditions', data, "POST");//商品列表
export const GetGoodsById = data => fetch('/BaseGoods/GetGoodsById', data);//Id取商品
export const UpdateGoods = data => fetch('/BaseGoods/UpdateGoods', data, "POST");//更新商品
export const UpdateGoodsState = data => fetch('/BaseGoods/UpdateGoodsState', data);//商品上下架
export const ModifyGoodScortCode = data => fetch('/BaseGoods/ModifyScortCode', data);//商品排序
export const BatchModifyGoodsState = data => fetch('/BaseGoods/BatchModifyGoodsState', data, 'post');//商品批量上下架
export const GetSupplierBySupTypeCode = data => fetch('/BaseSupplier/GetSupplierBySupTypeCode', data);//获取医院
export const GetServiceManByHspCode = data => fetch('/BaseServiceMan/GetServiceManByHspCode', data);//获取医生
export const GetGoodsByKeywords = data => fetch('/BaseGoods/GetGoodsByKeywords', data);//关键字获取商品
export const GetGoodsByKeywords2 = data => fetch('/BaseGoods/GetGoodsByKeywords2', data);
export const DeleteGoodsById = data => fetch('/BaseGoods/DeleteGoodsById', data);
/**
 * 规则中心
*/
export const AddBaranchGrade = data => fetch('/Branch/AddBaranchGrade', data, "POST");//等级注册
export const UpdateBaranchGrade = data => fetch('/Branch/UpdateBaranchGrade', data, "POST");//更新等级
export const GetBranchGradeAll = data => fetch('/Branch/GetBranchGradeAll', data);//获取所有等级
export const DeleteBaranchGrade = data => fetch('/Branch/DeleteBaranchGrade', data);//删除等级
export const GetbaseTicketsInfoAll = data => fetch('/Branch/GetbaseTicketsInfoAll', data);//获取所有卡券
export const AddConsumerPackage = data => fetch('/Branch/AddConsumerPackage', data, "POST");//添加套餐
export const TransferPackage = data => fetch('/Branch/TransferConsumerPackage', data, "GET");//转移套餐券
export const UpdateConsumerPackage = data => fetch('/Branch/UpdateConsumerPackage', data, "POST");//更新套餐
export const DeleteConsumerPackage = data => fetch('/Branch/DeleteConsumerPackage', data);//删除套餐
export const GetConsumerPackageAll = data => fetch('/Branch/GetConsumerPackageAll', data);//获取所有套餐
export const GetGradeFareSet = data => fetch('/Branch/GetGradeFareSet', data, "POST");//获取所有代理会费
export const AddBranchFareSet = data => fetch('/Branch/AddBranchFareSet', data, "POST");//保存代理默认会费
export const UpdateBranchFareSet = data => fetch('/Branch/UpdateBranchFareSet', data, "POST");//更新代理会费折扣
export const GetGoodsDiscount = data => fetch('/Branch/GetGoodsDiscount', data, "POST");//默认折扣
export const AddBranchGoodsDiscount = data => fetch('/Branch/AddBranchGoodsDiscount', data, "POST");//保存代理进货折扣表
export const UpdateGoodsDiscount = data => fetch('/Branch/UpdatebranchGoodsDiscount', data, "POST");//更新代理进货折扣
export const GetPackageSubByConPacCode = data => fetch('/Branch/GetConsumerPackageSubByConPacCode', data);//根据编号获取套餐详情
export const GetLeastBranchCode = data => fetch('/Branch/GetLeastBranchCode', data);//
export const DeleteMember = data => fetch('/Branch/DeleteMember', data);
export const GetLeastReferrerCode = data => fetch('/Branch/GetLeastReferrerCode', data);//
export const RevokeBranch = data => fetch('/Branch/RevokeBranch', data);
//添加套餐详情
export const AddConsumerPackageSub = data => fetch('/Branch/AddConsumerPackageSub', data, "POST");
export const AddConsumerPackageOrder = data => fetch('/Branch/AddConsumerPackageOrder', data, "POST");
export const UpdateConsumerPackageOrder = data => fetch('/Branch/UpdateConsumerPackageOrder', data, "POST");
export const GetBranchByConditions = data => fetch('/Branch/GetBranchByConditions', data, "POST");//条件获取代理商集合
export const DeleteBranch = data => fetch('/Branch/DeleteBranch', data);//条件获取代理商集合
export const GetChangeLog = data => fetch('/Branch/GetBranchChangeLog', data);//代理迁移记录
export const BranchChange = data => fetch('/Branch/BranchChange', data, "POST");//代理迁移
export const GetGradeList = data => fetch('/Share/GetGradeList', data);//等级列表
export const AddNewGrade = data => fetch('/Share/AddNewGrade', data,'POST');//添加等级
export const ModifyGrade = data => fetch('/Share/ModifyGrade', data,'POST');//修改等级
export const DeleteGrade = data => fetch('/Share/DeleteGrade', data);//修改等级
export const ModifyUserGrade = data => fetch('/Share/SetUserGrade', data,'POST');//修改用户等级
export const GetShareConfirmList = data => fetch('/Share/ShareConfirmList', data);//客户
export const ConfirmShared = data => fetch('/Share/ConfirmShared', data,'POST');//客户
export const GetUserOnlineOrderReport = data => fetch('/Share/GetUserOnlineOrderReport', data,'POST');//客户
// 会员
export const GetMembersByKeywords = data => fetch('/Branch/GetMembersByKeywords', data);
export const AddMembers = data => fetch('/Branch/AddMembers', data, "POST");//添加会员
export const CheckPhoneNumber = data => fetch('/Branch/CheckPhoneNumber', data);
export const UpdateMembers = data => fetch('/Branch/UpdateMembers', data, "POST");//更新会员
export const GetMembers = data => fetch('/Branch/GetMembers', data, "POST");//获取会员列表
export const UpdateIsAuth = data => fetch('/Branch/UpdateIsAuth', data);//会员认证
export const UserRegister = data => fetch('/UserCenter/UserRegister', data, "POST");//注册会员用户
export const MemberPrint = data => fetch('/Branch/MemberPrint', data,'GET')//客户腕带打印
// 消费商
export const GetBranchByKeywords = data => fetch('/Branch/GetBranchByKeywords', data);
export const GetPackageOrderNumAll = data => fetch('/Branch/GetConsumerPackageOrderNumAll', data);//获取套惨（等级）
export const AddBranch = data => fetch('/Branch/AddBranch', data, "POST");//添加代理商
export const ApproveBranch = data => fetch('/Branch/ApproveBranch', data);// 审核
export const UpdateBranch = data => fetch('/Branch/UpdateBranch', data, "POST");//更新代理商
export const GetTicketsAll = data => fetch('/Branch/GetTicketsAll', data);//获取所有的套餐以内券
export const GetBranchByCode = data => fetch('/Branch/GetBranchByCode', data);//获取单个代理商
export const LogoutBranch = data => fetch('/Branch/LogoutBranch', data);//删除代理
export const UpgradeBranch = data => fetch('/Branch/UpgradeBranch', data, "POST");//升级代理商
export const DowngradeBranch = data => fetch('/Branch/DowngradeBranch', data,'GET')//消费商降级
export const EnableBranch = data => fetch('/Branch/EnableBranch', data);//启用代理
export const DeleteBranchUpgradeApply = data => fetch('/BranchUpgradeApply/DeleteBranchUpgradeApply', data);// 升级删除
export const RefundUpgradeApply = data => fetch('/BranchUpgradeApply/RefundUpgradeApply', data);// 升级
export const GetBranchGradeFee = data => fetch('/Branch/GetBranchGradeFee', data);//注册代理费用
export const GetBranchGradeByCode = data => fetch('/Branch/GetBranchGradeByCode', data);//注册代理费用
export const GetBranchTeamList = data => fetch('/Branch/GetBranchTeamList', data, "POST");//代理团队系谱
export const GetBranchTeamDetailList = data => fetch('/Branch/GetBranchTeamDetailList', data);// 代理团队详情
export const GetBranchChangeLogList = data => fetch('/Branch/GetBranchChangeLogList', data);// 团队迁移记录
export const PreRecomConsume = data => fetch('/Branch/PreRecomConsume', data);//推荐提成 预览
export const GetTicketsReport = data => fetch('/Branch/GetTicketsInfoReport', data);//消费券报单
export const TicketsDetailReport = data => fetch('/Branch/GetTicketsInfoDetailReport', data);//消费券报单详情
export const GetTicketDetail = data => fetch('/Branch/GetProofOrderTicketDetail', data);//消费券报单
export const GetTicketsInfoByCode = data => fetch('/Branch/GetTicketsInfoByCode', data);// 消费券详情
export const GetBranchTicketPay = data => fetch('/Branch/GetBranchTicketPay', data,"POST");
export const GetBranchTicketPayDetail = data => fetch('/BranchOrderPay/GetBranchTicketPayDetail', data);
export const ApprovePortraitureState = data => fetch('/Branch/ApprovePortraitureState',data,'GET');/// 肖像权
export const ModifyBranchMemo = data => fetch('/Branch/ModifyBranchMemo',data,'GET');/// 修改备注

export const AddExpendOrder = data => fetch('/ExpendOrder/AddExpendOrder', data, "POST");//支付单
export const GetExpendOrderAll = data => fetch('/ExpendOrder/GetExpendOrderAll', data);//支付单列表
export const DeleteExpendOrderById = data => fetch('/ExpendOrder/DeleteExpendOrderById', data);//删除支付单
export const UpdateExpendOrder = data => fetch('/ExpendOrder/UpdateExpendOrder', data, "POST");//编辑支付单
export const AddAccount = data => fetch('/UserAccount/UserAccountCharge', data, "POST");//充值
export const GetUserAccount = data => fetch('/UserAccount/GetUserAccount', data);//搜索充值列表
export const ModifyUserAccountImgUrl = data => fetch('/UserAccount/ModifyUserAccountImgUrl', data,'POST');//修改流水凭证
export const GetAccountDetail = data => fetch('/UserAccount/GetUserAccountDetail', data);//充值流水
export const SetUserAccountFrozen = data => fetch('/UserAccount/SetUserAccountFrozen', data);//积分冻结
// 订单
export const GetProofOrder = data => fetch('/ProofOrder/GetProofOrder', data, "POST");//获取报单列表
export const ApproveProofOrder = data => fetch('/ProofOrder/ApproveProofOrder', data);//审核
export const RevokeApprove = data => fetch('/ProofOrder/RevokeApprove', data);
export const RevokeApprove2 = data => fetch('/Consume/XuanMeiRevokeApprove', data);
export const CancelOrRejectOrder = data => fetch('/ProofOrder/CancelOrRejectOrder', data);//驳回状态
export const GetProofOrderDetail = data => fetch('/ProofOrder/GetProofOrderDetail', data);//fxcode获取报单详情
export const GetOnLineOrders = data => fetch('/Order/GetOnLineOrders', data, "GET");//订单查询
export const GetOrderInfoByCode = data => fetch('/Order/GetOrderInfoByCode', data, "Get");
// export const GetOnlineOrder = data => fetch('/ProofOrder/GetOnlineOrder', data, "POST");
export const GetPoints = data => fetch('/Order/GetPoints', data, "Get");//线上积分
export const ConfirmReach = data => fetch('/Order/ConfirmReach', data, "POST");//确定订单
export const ConfirmRefund = data => fetch('/Order/ConfirmRefund', data, "POST");//确定退款
export const GetOnlineOrderInfo = data => fetch('/Order/GetOnlineOrderInfo', data, "GET");//查询订单包含子订单
export const ApproveCashApply = data => fetch('/AppAccount/ApproveCashApply', data, "POST");//提现审核
export const ConfirmPayStatus = data => fetch('/AppAccount/ConfirmPayStatus', data);
export const ReverseApproveCashApply = data => fetch('/AppAccount/ReverseApproveCashApply', data,'POST');//发放失败
export const CashApplyList = data => fetch('/AppAccount/CashApplyList', data, "POST");//提现查询
export const GetCashApplyListByUser = data => fetch('/AppAccount/GetCashApplyListByUser', data, "GET");//提现查询
export const GetSubOrdersListByMobile = data => fetch('/Order/GetSubOrdersListByMobile', data, "GET");

export const GetMemberConsume = data => fetch('/MemberConsume/GetMemberConsume', data, "POST");//查询所有APP用户提成汇总数据(PC)
export const GetMemberConsumeDetail = data => fetch('/MemberConsume/GetMemberConsumeDetail', data, "POST");//查询用户提成汇总数据详细信息(PC)
export const GeneratorMemberConsume = data => fetch('/MemberConsume/GeneratorMemberConsume', data, "GET");
export const ChangeUserRefrence = data => fetch('/UserCenter/ChangeUserRefrence', data, "POST");

export const PreConsumeOrder = data => fetch('/ProofOrder/PreConsumeOrder', data);//消费提成预览
export const ProofOrderRefund = data => fetch('/ProofOrder/ProofOrderRefund', data,'POST');//退款
export const ProofOrderClose = data => fetch('/ProofOrder/ProofOrderClose', data);
export const UpdateIsFeedback = data => fetch('/ProofOrder/UpdateIsFeedback', data);
export const GetProofOrderClose = data => fetch('/ProofOrder/GetProofOrderClose', data, "POST");
// 财务结算
export const GetSettlementAll = data => fetch('/Consume/GetSettlementAll', data, "POST");//结算
export const GetRecConDetail = data => fetch('/Consume/GetRecomConsumeDetail', data, "POST");//结算推荐奖详情
export const GetConsumeDetail = data => fetch('/Consume/GetOrderConsumeDetail', data, "POST");//结算消费提成
export const GetGradeAchieve = data => fetch('/Consume/GetGradeAchievementReport', data, "POST");//业绩提成按等级
export const GetBranchAchieve = data => fetch('/Consume/GetBranchAchievementReport', data, "POST");//业绩提成按代理
export const PreUpgradeRecomConsume = data => fetch('/Branch/PreUpgradeRecomConsume', data);//升级分成计算
export const SettlementOrder = data => fetch('/Consume/SettlementOrder', data, "POST");//结算
export const AddDebitOrder = data => fetch('/DebitOrder/AddDebitOrder', data, "POST");//添加扣款单
export const GetDebitOrder = data => fetch('/DebitOrder/GetDebitOrder', data, "POST");//获取扣款列表
export const UpdateDebitOrder = data => fetch('/DebitOrder/UpdateDebitOrder', data, "POST");//编辑
export const DeleteDebitById = data => fetch('/DebitOrder/DeleteDebitById', data);//删除扣款单
/*app中心*/
export const Case = data => fetch('/backgroud/getcase', data, "POST");//获取案例
export const Audit = data => fetch('/backgroud/Audit', data, "GET");//获取案例
export const CaseComment = data => fetch('/caseIncludeComment', data);//获取记录和回复
export const GetPost = data => fetch('/backgroud/getpost', data, "POST");//获取帖子
export const SetStick = data => fetch('/backgroud/case/setStatus', data, "POST");//案例置顶操作
export const SetPostStick = data => fetch('/backgroud/post/setStatus', data, "POST");//帖子置顶
export const Getreply = data => fetch('/backgroud/getreply', data, "POST");//获取回复
export const GetRoles = data => fetch('/backgroud/roles', data, "POST");//获取评论角色
export const caseDelete = data => fetch('/caseDelete', data, "GET");//获取评论角色
export const CreateActive = data => fetch('/backgroud/active/Create', data, "POST");//APP创建活动
//APP获取活动列表
export const GetActive = data => fetch('/backgroud/getActive', data, "POST");//(已发布)
export const GetCancelActive = data => fetch('/backgroud/getCancelActive', data, "POST");//已撤回
export const ActiveSetStick = data => fetch('/backgroud/active/setStick', data, "POST");//活动置顶操作//（置顶）
export const ActiveCancelStick = data => fetch('/backgroud/active/CancelStick', data, "POST");//取消置顶
//活动发布操作
export const SetActiveNormal = data => fetch('/backgroud/active/SetNormal', data, "POST");//(重新发布)
export const SetActiveClose = data => fetch('/backgroud/active/SetClose', data, "POST");//撤回
export const CreateVideo = data => fetch('/backgroud/video/Create', data, "POST");//创建新视频
export const GetVideo = data => fetch('/backgroud/video', data, "POST");//获取视频列表
export const AuditVideo = data => fetch('/PCVideo/AuditVideo', data, "GET");//视频审核
export const AuditVideoType = data => fetch('/PCVideo/AuditVideoType', data, "GET");//视频类型

export const DeleteVideo = data => fetch('/backgroud/video/Delete', data, "POST");//删除视频
export const SetVideo = data => fetch('/backgroud/video/setStatus', data, "POST");//视频列表置顶
export const KnowledgeAdd = data => fetch('/backstage/KnowledgeAdd', data, "POST");//添加医美知识
export const getKnowledgeList = data => fetch('/backstage/getKnowledgeList', data, "POST");//医美列表
export const KnowledgeEdit = data => fetch('/backstage/KnowledgeEdit', data, "POST");//编辑知识
export const KnowledgeDelete = data => fetch('/backstage/KnowledgeDelete', data, "POST");//删除
export const getQuestionList = data => fetch('/backstage/getQuestionList', data, "POST");//问答列表
export const setQuestionStick = data => fetch('/backstage/setQuestionStick', data, "POST");//问答置顶
export const setAnswerStick = data => fetch('/backstage/setAnswerStick', data, "POST");
export const GetRedpackets = data => fetch('/Order/GetRedPackets', data, "GET");//红包列表
export const AddRedpacket = data => fetch('/Order/AddNewRedPacket', data, "POST",'application/json');//添加红包
export const EditRedpacket = data => fetch('/Order/ModifyRedPacket',data, "POST",'application/json');//编辑红包
export const DeleteRedpacket = data => fetch('/Order/DeleteRedPacket', data, "POST");//删除红包
export const GetRedPacket = data => fetch('/Order/GetRedPacket', data, "GET");//红包详情
export const SetRedPacketStatus = data => fetch('/Order/SetRedPacketStatus', data, "POST");//修改红包状态
export const SetRedPacketUserRule = data => fetch('/Order/SetRedPacketUserRule', data, "POST");//设置用户规则
export const GetRedPacketUserRule = data => fetch('/Order/GetRedPacketUserRule', data, "GET");//修改红包状态
export const AddReturnPointRule = data => fetch('/backstage/AddReturnPointRule',JSON.stringify(data), "POST",'application/json');//添加返现
export const GetReturnPointRuleList = data => fetch('/backstage/GetReturnPointRuleList', data, "POST");//获取返现列表
export const GetReturnPointRule = data => fetch('/backstage/GetReturnPointRule', data, "POST");//返现详情
export const CloseReturnPoint = data => fetch('/backstage/CloseReturnPoint', data, "POST");//关闭活动
export const EditReturnPointRule = data => fetch('/backstage/EditReturnPointRule',JSON.stringify(data), "POST",'application/json');//编辑活动
export const DeleteReturnPointRule = data => fetch('/backstage/DeleteReturnPointRule', data, "POST");//删除活动
export const GetNameExpendSet = data => fetch('/Branch/GetNameExpendSet', data);//获取消费提成设置里所有总代的名称
export const AddExpendSet = data => fetch('/Branch/AddExpendSet', data, "POST");//添加消费提成设置
export const GetExpendSetByCode = data => fetch('/Branch/GetExpendSetByCode', data);//列表
export const UpdateExpendSet = data => fetch('/Branch/UpdateExpendSet', data, "POST");//修改消费设置
export const DeleteExpendSet = data => fetch('/Branch/DeleteExpendSet', data);
export const GetNameRecomSet = data => fetch('/Branch/GetNameExpendSet', data);//获取推荐提成设置里所有总代的名称
export const AddRecomSet = data => fetch('/Branch/AddRecomSet', data, "POST");//添加推荐提成设置
export const GetRecomSetByCode = data => fetch('/Branch/GetRecomSetByCode', data);//列表
export const UpdateRecomSet = data => fetch('/Branch/UpdateRecomSet', data, "POST");//修改推荐设置
export const DeleteRecomSet = data => fetch('/Branch/DeleteRecomSet', data);
/*
商户
*/
export const GetTagByPage = data => fetch('/BaseGoods/GetTagByPage', data);//标签
export const AddTags = data => fetch('/BaseGoods/AddTags', data,"post");//添加标签
export const UpdateTags = data => fetch('/BaseGoods/UpdateTags', data,"post");//编辑
export const DeleteTagsById = data => fetch('/BaseGoods/DeleteTagsById',data);//删除
export const AddBranchShop = data => fetch('/BranchShop/AddBranchShop', data,"post");//添加商户
export const UpdateBranchShop = data => fetch('/BranchShop/UpdateBranchShop', data,"post");//更新商户
export const DeleteShopById = data => fetch('/BranchShop/DeleteShopById',data);//删除
export const GetShopByPage = data => fetch('/BranchShop/GetShopByPage',data);//查询
/*
//跨院比例配置
*/
export const AddHospitalSet = data => fetch('/HospitalSet/AddHospitalSet',data,"post");//添加
export const UpdateHospitalSet = data => fetch('/HospitalSet/UpdateHospitalSet',data,"post");//更新
export const DeleteHospitalSet = data => fetch('/HospitalSet/DeleteHospitalSetById',data);//删除
export const GetHospitalSet = data => fetch('/HospitalSet/GetHospitalSetByPage',data);//搜索

// 医院收益
export const GetHospitalRecomOrder = data => fetch('/HospitalFinance/GetHospitalRecomOrder',data);//医院推荐收益明细
export const GetHospitalConsumeOrder = data => fetch('/HospitalFinance/GetHospitalConsumeOrder',data);//医院消费收益明细
export const GetCrossHospitalDetail = data => fetch('/HospitalFinance/GetCrossHospitalDetail',data);//跨院消费收益
export const GetHospitalIncomeReport = data => fetch('/HospitalFinance/GetHospitalIncomeReport',data);//医院收益统计
export const GetCompanyConsumeDetailSummary = data => fetch('/HospitalFinance/GetCompanyConsumeDetailSummary',data);//代理收益分配
export const GetCompanyConsumeDetail = data => fetch('/HospitalFinance/GetCompanyConsumeDetail',data);
export const GetCompanyRecomOrderOut = data => fetch('/HospitalFinance/GetCompanyRecomOrderOut',data);
//结算及历史记录
export const SettlementHospital = data => fetch('/HospitalFinance/SettlementHospital',data);
export const GetHospitalOut = data => fetch('/HospitalFinance/GetHospitalOut',data);
export const GetHospitalIn = data => fetch('/HospitalFinance/GetHospitalIn',data);
export const GetCompanyOut = data => fetch('/HospitalFinance/GetCompanyOut',data);
export const GetCompanyIn = data => fetch('/HospitalFinance/GetCompanyIn',data);
export const HosOutSettle= data => fetch('/HospitalFinance/HospitalOutSettlement',data);
export const ComOutSettle= data => fetch('/HospitalFinance/CompanyOutSettlement',data);
export const GetCompanyOutDetail= data => fetch('/HospitalFinance/GetCompanyOutDetail',data);
export const GetHospitalInDetail= data => fetch('/HospitalFinance/GetHospitalInDetail',data);
export const GetCompanyInDetail= data => fetch('/HospitalFinance/GetCompanyInDetail',data);
export const GetHospitalOutDetail= data => fetch('/HospitalFinance/GetHospitalOutDetail',data);
export const GetDropDownPermission = data => fetch('/HospitalFinance/GetDropDownPermission',data);//医院（销售公司）查询（带权限）

export const GetHospitalOut2 = data => fetch('/Consume/GetHospitalOut',data);
export const GetHospitalOutDetail2 = data => fetch('/Consume/GetHospitalOutDetail',data);
export const HosOutSettle2= data => fetch('/Consume/XuanMeiHospitalOutSettlement',data);

// 医院咨询
export const AddConsulting = data => fetch('/BaseConsulting/AddConsulting',data,"POST");
export const UpdateConsulting = data => fetch('/BaseConsulting/UpdateConsulting',data,"POST");
export const GetConsulting = data => fetch('/BaseConsulting/GetConsulting',data,"POST");
export const DeleteConsulting = data => fetch('/BaseConsulting/DeleteConsulting',data);
export const GetConsultingHistory = data => fetch('/BaseConsulting/GetConsultingHistory',data);
// 预约
export const GetReservation = data => fetch('/BaseReservation/GetReservation',data,"POST");
export const AddReservation = data => fetch('/BaseReservation/AddReservation',data,"POST");
export const UpdateReservation = data => fetch('/BaseReservation/UpdateReservation',data,"POST");
export const DeleteReservation = data => fetch('/BaseReservation/DeleteReservation',data);
// 获取科室
export const GetDeptAllByHospitalCode = data => fetch('/BaseDept/GetDeptAllByHospitalCode',data);
// 回访
export const GetVisit = data => fetch('/BaseVisit/GetVisit',data,'POST');
export const AddVisit = data => fetch('/BaseVisit/AddVisit',data,'POST');
export const UpdateVisit = data => fetch('/BaseVisit/UpdateVisit',data,'POST');
// 回访曲线
export const GetCurveSet = data => fetch('/BaseVisit/GetCurveSet',data);
export const CurveSet = data => fetch('/BaseVisit/CurveSet',data,"POST");
// 回访-》执行情况
export const GetOrderCommandByCus = data => fetch('/CommandOrder/GetOrderCommandByCustomerCode',data);
export const GetOrderCommandByCus2 = data => fetch('/CommandOrder/GetOrderCommandByCustomerCode2',data);
export const zhixing= data => fetch('/ZhiLiaoZhiXingList',data,"POST");
// 回访-》咨询
export const GetZiXunList = data => fetch('/GetZiXunList',data,"POST");
export const GetConsultingByCustomerCode = data => fetch('/BaseConsulting/GetConsultingByCustomerCode',data);
// 回访-》预约
export const GetReservationByCustomerCode = data => fetch('/BaseReservation/GetReservationByCustomerCode',data);
export const YuYueList = data => fetch('/YuYueList',data,"POST");
// 回访-》回访记录
export const GetVisitByCus = data => fetch('/BaseVisit/GetVisitByCustomerCode',data);
export const HuiFangList = data => fetch('/HuiFangList',data,"POST");
// 回访--》支付
export const GetZhiFuList = data => fetch('/GetZhiFuList',data,"POST");
export const GetPayAllByCustomeId = data => fetch('/ProofOrder/GetPayAllByCustomeId',data);
export const updateExec = data => fetch('/updateExec',data);
export const AddCashOut = data => fetch('/CashOut/AddCashOut',data,'post');
export const ModifyCashOutImgUrl = data => fetch('/CashOut/ModifyCashOutImgUrl',data,'POST');
export const UpdateReservationStatus = data => fetch('/BaseReservation/UpdateReservationStatus',data);
// 处方单
export const GetChuFangList = data => fetch('/GetChuFangList',data,"POST");
export const GetOrderProductByCus = data => fetch('/ProofOrderProduct/GetProofOrderProductDetailByCustomerCode',data);
// 医务人员业绩
export const GetDoctorPerformance = data => fetch('/ServiceManPerformance/GetDoctorPerformance',data);
export const GetDesignerPerformance = data => fetch('/ServiceManPerformance/GetDesignerPerformance',data);
export const GetConsultingPerformance = data => fetch('/ServiceManPerformance/GetConsultingPerformance',data);
export const GetDesAssistPerform = data => fetch('/ServiceManPerformance/GetDesignerAssistPerformance',data);
export const GetAllPerformance = data => fetch('/ServiceManPerformance/GetAllPerformance',data,"POST");
export const GetEveryDayPayAmount = data => fetch('/ServiceManPerformance/GetEveryDayPayAmount',data,"POST");
export const GetEveryDayPayAmountDetail = data => fetch('/ServiceManPerformance/GetEveryDayPayAmountDetail',data);
export const GetProofOrderApprove = data => fetch('/ServiceManPerformance/GetProofOrderApprove',data,'POST');
export const GetDoctorDetail = data => fetch('/ServiceManPerformance/GetDoctorPerformanceDetail',data);
export const GetDesignerDetail = data => fetch('/ServiceManPerformance/GetDesignerPerformanceDetail',data);
export const GetConsultDetail = data => fetch('/ServiceManPerformance/GetConsultingPerformanceDetail',data);
export const GetPayTypeDetail = data => fetch('/ServiceManPerformance/GetPayTypeDetail',data);
export const GetEveryDayPayAmountExport = data => fetch('/ServiceManPerformance/GetEveryDayPayAmountExport',data,'POST')
export const GetBranchShopAmount = data => fetch('/ServiceManPerformance/GetBranchShopAmount',data,'GET')
export const OrderProjectReport = data => fetch('/ServiceManPerformance/OrderProjectReport',data,'POST')
// 护士配置
export const AddNurseSet = data => fetch('/BaseNurseSet/AddNurseSet',data,"POST");
export const UpdateNurseSet = data => fetch('/BaseNurseSet/UpdateNurseSet',data,"POST");
export const GetNurseSet = data => fetch('/BaseNurseSet/GetNurseSet',data);
export const DeleteNurseSet = data => fetch('/BaseNurseSet/DeleteNurseSet',data);
// 产品单
export const AddProofOrderProduct = data => fetch('/ProofOrderProduct/AddProofOrderProduct',data,"POST");// 添加产品单
export const UpdateProofOrderProduct = data => fetch('/ProofOrderProduct/UpdateProofOrderProduct',data,"POST");
export const ProofOrderProductPay = data => fetch('/ProofOrderProduct/ProofOrderProductPay',data,"POST");
export const GetProofOrderProduct = data => fetch('/ProofOrderProduct/GetProofOrderProduct',data,"POST");
export const GetProofOrderProDet = data => fetch('/ProofOrderProduct/GetProofOrderProduct',data);
export const DeleteProofOrderProduct = data => fetch('/ProofOrderProduct/DeleteProofOrderProduct',data);
export const GetProofOrderProductDetail = data => fetch('/ProofOrderProduct/GetProofOrderProductDetail',data);
export const BatchCloseProductOrder = data => fetch('/ProofOrderProduct/BatchCloseProductOrder',data,'GET');
// 专家日设置
export const AddExpertSet = data => fetch('/ExpertSet/AddExpertSet',data,"POST");
export const UpdateExpertSet = data => fetch('/ExpertSet/UpdateExpertSet',data,"POST");
export const DeleteExpertSetById = data => fetch('/ExpertSet/DeleteExpertSetById',data);
export const GetExpertSet = data => fetch('/ExpertSet/GetExpertSet',data);
// 错误单
export const AddProofOrderError = data => fetch('/ProofOrderError/AddProofOrderError',data,"POST");
export const UpdateProofOrderError = data => fetch('/ProofOrderError/UpdateProofOrderError',data,"POST");
export const GetProofOrderErrorByFxCode = data => fetch('/ProofOrderError/GetProofOrderErrorByFxCode',data);
export const GetProofOrderErrorAll = data => fetch('/ProofOrderError/GetProofOrderErrorAll',data);
// 处置单
export const DisposalPrint = data => fetch('/ProofOrderProduct/DisposalPrint',data);
export const TreatmentPrint = data => fetch('/ProofOrderProduct/TreatmentPrint',data);
export const GetOrderProductEveryDay = data => fetch('/ServiceManPerformance/GetOrderProductEveryDay',data,"POST");
// 专家日
export const GetExpertReport = data => fetch('/ServiceManPerformance/GetExpertReport',data);
export const GetExpertReportDetail = data => fetch('/ServiceManPerformance/GetExpertReportDetail',data);
export const GetExpertSummaryReport = data => fetch('/ServiceManPerformance/GetExpertSummaryReport',data);
export const TicketsPay = data => fetch('/Branch/TicketsPay',data,"POST");
export const GetTicketsPay = data => fetch('/Branch/GetTicketsPay',data);
export const GetTicketsPayByOutId = data => fetch('/Branch/GetTicketsPayByOutId',data);
export const AddBranchTicketRefund = data => fetch('/BranchTicketRefund/AddBranchTicketRefund',data,"POST");
export const GetTicketsNotUsed = data => fetch('/BranchTicketRefund/GetTicketsNotUsed',data);
export const AddBaseBranchAccount = data => fetch('/BaseBranchAccount/AddBaseBranchAccount',data,"POST");
export const GetBaseBranchAccount = data => fetch('/BaseBranchAccount/GetBaseBranchAccount',data);
export const DeleteBaseBranchAccount = data => fetch('/BaseBranchAccount/DeleteBaseBranchAccount',data);
export const UpdateBaseBranchAccount = data => fetch('/BaseBranchAccount/UpdateBaseBranchAccount',data,"POST");
export const GetBranchReceiveList = data => fetch('/Branch/GetBranchReceiveList',data,"POST");
export const UpdateExpertIsFinished = data => fetch('/ServiceManPerformance/UpdateExpertIsFinished',data,"POST");
export const ModifyConsumeTypeId = data => fetch('/ProofOrder/ModifyConsumeTypeId',data);
export const GeneratorExpertConsume = data => fetch('/ServiceManPerformance/GeneratorExpertConsume',data);
export const AddBranchUpgradeApply = data => fetch('/BranchUpgradeApply/AddBranchUpgradeApply',data,"POST");
export const GetBranchUpgradeApply = data => fetch('/BranchUpgradeApply/GetBranchUpgradeApply',data);
export const EnableBranchUpgradeApply = data => fetch('/BranchUpgradeApply/EnableBranchUpgradeApply',data,"POST");
export const GetBranchUpgradeApplyById = data => fetch('/BranchUpgradeApply/GetBranchUpgradeApplyById',data);
export const ApproveBranchUpgradeApply = data => fetch('/Branch/ApproveBranchUpgradeApply',data);
export const UpdateBranchUpgradeApply = data => fetch('/BranchUpgradeApply/UpdateBranchUpgradeApply',data,'POST');
export const UpdateExpertByIds = data => fetch('/ServiceManPerformance/UpdateExpertByIds',data);
// 返款详情
export const GetCashOutList = data => fetch('/CashOut/GetCashOutList',data);
export const UpdateCashOut = data => fetch('/CashOut/UpdateCashOut',data,'POST');

export const GetProofOrderRefundList = data => fetch('/ProofOrder/GetProofOrderRefundList',data);
export const ModifyProjectType = data => fetch('/ProofOrder/ModifyProjectType',data);
export const GetBranchChargePay = data => fetch('/UserAccount/GetBranchChargePay',data);
export const GetHospitalChargePay = data => fetch('/UserAccount/GetHospitalChargePay',data);
export const BatchApproveProofOrder = data => fetch('/ProofOrder/BatchApproveProofOrder',data);
export const GetHospitalOutDetailHis = data => fetch('/HospitalFinance/GetHospitalOutDetailHis',data);
export const GetCompanyOutDetailHis = data => fetch('/HospitalFinance/GetCompanyOutDetailHis',data);
export const GetCompanyOutHis = data => fetch('/HospitalFinance/GetCompanyOutHis',data);
export const AddExpertParamSet = data => fetch('/ExpertParamSet/AddExpertParamSet',data,'POST');
export const UpdateExpertSetEX = data => fetch('/ExpertParamSet/UpdateExpertSet',data,'POST');
export const DeleteExpertSetByIdEX = data => fetch('/ExpertParamSet/DeleteExpertSetById',data);
export const GetExpertParamSet = data => fetch('/ExpertParamSet/GetExpertParamSet',data);
export const GetBranchFinanceSummary = data => fetch('/HospitalFinance/GetBranchFinanceSummary',data);
export const GetProofOrderCross = data => fetch('/ProofOrder/GetProofOrderCross',data,'POST');
export const GetHospitalOutHis = data => fetch('/HospitalFinance/GetHospitalOutHis',data);
export const GetOrderPayAmount = data => fetch('/ProofOrderPay/GetProofOrderPayCommissionAmount',data);
// 进销存
export const AddStock = data => fetch('/StockWarehouse/AddStockWarehouse',data,'POST');
export const UpdateStock = data => fetch('/StockWarehouse/UpdateStockWarehouse',data,'POST');
export const DeleteWarehouse = data => fetch('/StockWarehouse/DeleteWarehouseById',data,);
export const GetWarehouse = data => fetch('/StockWarehouse/GetWarehouse',data,'POST');
// 添加供应商
export const AddStockSupplier = data => fetch('/StockSupplier/AddStockSupplier',data,'POST');
export const UpdateStockSupplier = data => fetch('/StockSupplier/UpdateStockSupplier',data,'POST');
export const DeleteSupplierById = data => fetch('/StockSupplier/DeleteSupplierById',data);
export const GetSupplier = data => fetch('/StockSupplier/GetSupplier',data,'POST');
// 部门
export const AddDept = data => fetch('/BaseDept/AddDept',data,'POST');
export const UpdateDept = data => fetch('/BaseDept/UpdateDept',data,'POST');
// 入库
export const AddStockDrugIn = data => fetch('/StockDrugIn/AddStockDrugIn',data,'POST');
export const UpdateStockDrugIn = data => fetch('/StockDrugIn/UpdateStockDrugIn',data,'POST');
export const DeleteDrugInById = data => fetch('/StockDrugIn/DeleteDrugInById',data);
export const GetDrugIn = data => fetch('/StockDrugIn/GetDrugIn',data,'POST');
export const GetDrugInDetail = data => fetch('/StockDrugIn/GetDrugInDetail',data);
// 出库
export const AddStockDrugOut = data => fetch('/StockDrugOut/AddStockDrugOut',data,'POST');
export const UpdateStockDrugOut = data => fetch('/StockDrugOut/UpdateStockDrugOut',data,'POST');
export const GetDrugOutDetail = data => fetch('/StockDrugOut/GetDrugOutDetail',data);
export const DeleteDrugOutById = data => fetch('/StockDrugOut/DeleteDrugOutById',data);
export const GetDrugOut = data => fetch('/StockDrugOut/GetDrugOut',data,'POST');
// 盘点
export const AddStockInventory = data => fetch('/StockInventory/AddStockInventory',data,'POST');
export const UpdateStockInventory = data => fetch('/StockInventory/UpdateStockInventory',data,'POST');
export const DeleteInventoryById = data => fetch('/StockInventory/DeleteInventoryById',data);
export const GetInventory = data => fetch('/StockInventory/GetInventory',data,'POST');
export const GetInventoryDetail = data => fetch('/StockInventory/GetInventoryDetail',data);
export const GetStockDrug = data => fetch('/StockDrug/GetStockDrug',data,'POST');
export const GetPhotoByFxCode = data => fetch('/CustomerPhoto/GetCustomerPhotoByFxCode',data);
export const AddFxPhoto = data => fetch('/CustomerPhoto/AddFxCustomerPhoto',data,'POST');
export const GetStockDrugByKeywords = data => fetch('/StockDrug/GetStockDrugByKeywords',data);
export const GetShopByConsultantCode = data => fetch('/Branch/GetShopByConsultantCode',data);
// 报表
export const GetStockPurchaseOrderRep = data => fetch('/StockReport/GetStockPurchaseOrderRep',data,'POST');
export const GetStockDrugInTypeRep = data => fetch('/StockReport/GetStockDrugInTypeRep',data,'POST');
export const GetStockDeptOutRep = data => fetch('/StockReport/GetStockDeptOutRep',data,'POST');
export const GetStockDrugInRep = data => fetch('/StockReport/GetStockDrugInRep',data,'POST');
export const GetStockConsumptionRep = data => fetch('/StockReport/GetStockConsumptionRep',data,'POST');
export const GetStockDrugRep = data => fetch('/StockReport/GetStockDrugRep',data,'POST');
// 医院详情结算
export const HospitalDetailSettlement = data => fetch('/HospitalFinance/HospitalOutDetailSettlement',data);
export const HospitalDetailSettlement2 = data => fetch('/Consume/XuanMeiHospitalOutDetailSettlement',data);
// 库存管理报表
export const GetStockManageInStock = data => fetch('/StockManageReport/GetStockManageInStock',data,'POST');
export const GetStockManageOutStock = data => fetch('/StockManageReport/GetStockManageOutStock',data,'POST');
export const GetStockManageStockDetail = data => fetch('/StockManageReport/GetStockManageStockDetail',data,'POST');
export const GetStockManageStockInOutDetail = data => fetch('/StockManageReport/GetStockManageStockInOutDetail',data,'POST');
export const GetStockManageStockInOutSum = data => fetch('/StockManageReport/GetStockManageStockInOutSum',data,'POST');

// 添加额外费
export const AddBranchOrderPay = data => fetch('/BranchOrderPay/AddBranchOrderPay',data,'POST');
export const GetBranchOrderPayExt = data => fetch('/BranchOrderPay/GetBranchOrderPayExt',data,'GET');
export const DeleteBranchOrderPayExt = data => fetch('/BranchOrderPay/DeleteBranchOrderPayExt',data,'GET');
export const UpdateBranchOrderPayExt = data => fetch('/BranchOrderPay/UpdateBranchOrderPayExt',data,'POST');

export const GetCrossHosPerformance = data => fetch('/ServiceManPerformance/GetCrossHosPerformance',data,'POST');
export const StageProofOrderPay = data => fetch('/ProofOrderPay/StageProofOrderPay',data,'POST');// 服务费分期支付
export const GetDrugPay = data => fetch('/StockDrugPay/GetDrugPay',data,'POST');// 入库付款
export const UpdateDrugPayFinished = data => fetch('/StockDrugPay/UpdateDrugPayFinished',data);
export const UpdateDrugPayApproved = data => fetch('/StockDrugPay/UpdateDrugPayApproved',data);
// 积分转赠
export const GetUserAccountTransfer = data => fetch('/UserAccount/GetUserAccountTransfer',data);
export const GetOnlinePoints = data => fetch('/Order/GetOnlinePoints',data);//查询线上积分
export const GetOnlinePointsRecords = data => fetch('/Order/GetOnlinePointsRecords',data);//查询线上积分流水

// 药品单退款
export const RefundDrug = data => fetch('/ProofOrderProduct/RefundDrug',data,'POST');
// 预警
export const GetStockWarning = data => fetch('/StockReport/GetStockWarning',data,'POST');
export const AddServiceManHospital = data => fetch('/BaseServiceMan/AddServiceManHospital',data,'POST');
export const GetServiceManHospital = data => fetch('/BaseServiceMan/GetServiceManHospital',data);
// 库存详情
export const GetStockInOutRecord = data => fetch( '/StockDrug/GetStockInOutRecord', data, 'get')
export const GetInventoryDetailList = data => fetch( '/StockInventory/GetInventoryDetailList', data, 'get')
export const GetStockDrugForInventory = data => fetch( '/StockDrug/GetStockDrugForInventory', data, 'get')
export const AddStockInventoryDetail = data => fetch( '/StockInventory/AddStockInventoryDetail', data, 'POST')

// 设计师配置
export const GetDesigner = data => fetch('/Activity/GetDesignList',data);//获取设计师实体集合
export const AddNew = data => fetch('/Activity/AddNewDesign',data,'POST');//添加实体
export const Alter = data => fetch('/Activity/ModifyDesign',data,'POST');//修改设计师实体
export const Delete = data => fetch('/Activity/DeleteDesign',data);//删除设计师实体
export const GetdesGroup = data => fetch('/Activity/GetDesignGroups',data);//获取设计师实体下组合集合
export const AddNewDesignGroups = data => fetch('/Activity/AddNewDesignGroup',data,'POST');//设计师实体下添加组合
export const AlterDesignGroups = data => fetch('/Activity/ModifyDesignGroup',data,'POST');//设计师实体下修改组合
export const SetStatusDesigns = data => fetch('/Activity/SetDesignAddedStatus',data);//设计师实体状态
export const SetStatusDesignGroups = data => fetch('/Activity/SetDesignGroupAddedStatus',data);//设计师实体下组合状态
export const GetDesignGroupById = data => fetch('/Activity/GetDesignGroup',data);//获取组合详情
export const GetServiceManById = data => fetch('/BaseServiceMan/GetServiceManById', data, 'get')
//活动配置
export const GetActivitys = data => fetch('/Activity/GetActivities',data);//活动列表
export const AddNewActivitys = data => fetch('/Activity/AddNewActivity',data,'POST');//添加活动
export const DeleteActivitys = data => fetch('/Activity/DeleteActivity',data);//删除活动实体
export const AlterActivitys = data => fetch('/Activity/ModifyActivity',data,'POST');//修改活动实体
export const AddNewActivityItems= data => fetch('/Activity/AddNewActivityItem',data,'POST');//实体添加项目
export const AlterActivityItems= data => fetch('/Activity/ModifyActivityItem',data,'POST');//修改实体内部项目信息
export const DeleteActivityItems = data => fetch('/Activity/DeleteActivityItem',data);//删除实体内部项目
export const GetListByActivityId = data => fetch('/Activity/GetActivityItemsById',data);//获取实体内部项目
export const SetStatusActivitys = data => fetch('/Activity/SetActivityStatus',data);//修改实体状态
export const CopyActivity = data => fetch('/Activity/CopyActivity',data,'POST');//修改实体状态
// 券进销存
export const GetStockTicket = data => fetch('/BaseStockTicket/GetStockTicket',data,'POST');
export const GetStockTicketByKeywords = data => fetch('/BaseStockTicket/GetStockTicketByKeywords',data,'GET');
export const GetTicketInOutRecord = data => fetch('/BaseStockTicket/GetTicketInOutRecord',data);
export const GetRemainTicketCode = data => fetch('/BaseStockTicket/GetRemainTicketCode',data,'GET');
export const GetTicketStockAll = data => fetch('/BaseStockTicket/GetTicketStockAll',data,'GET');
export const AddStockTicketIn = data => fetch('/BaseStockTicketIn/AddStockTicketIn',data,'POST');
export const UpdatestockTicketIn = data => fetch('/BaseStockTicketIn/UpdatestockTicketIn',data,'POST');
export const DeleteStockTicketInById = data => fetch('/BaseStockTicketIn/DeleteStockTicketInById',data);
export const GetTicketIn = data => fetch('/BaseStockTicketIn/GetTicketIn',data,'POST');
export const GetTicketInDetail = data => fetch('/BaseStockTicketIn/GetTicketInDetail',data,'GET');
export const DeleteStockTicketOutById = data => fetch('/BaseStockTicketOut/DeleteStockTicketOutById',data,'GET');
export const GetTicketOut = data => fetch('/BaseStockTicketOut/GetTicketOut',data,'POST');
export const AddStockTicketOut = data => fetch('/BaseStockTicketOut/AddStockTicketOut',data,'POST');
export const UpdatestockTicketOut = data => fetch('/BaseStockTicketOut/UpdatestockTicketOut',data,'POST');
export const GetTicketOutDetail = data => fetch('/BaseStockTicketOut/GetTicketOutDetail',data,'GET');
export const GetStockTicketDetail = data => fetch('/BaseStockTicketDetail/GetStockTicketDetail',data,'GET');
// export const GetLastNumber = data => fetch('/BaseStockTicketIn/GetLastNumber',data,'GET');//券号尾节点

export const GetSummaryList = data => fetch('/Share/GetSummaries',data,'GET');// 用户分享
export const GetViewsList = data => fetch('/Share/GetViews',data,'GET');//分享浏览
export const GetReceivesList = data => fetch('/Share/GetReceives',data,'GET');//领取
export const GetLoginsList = data => fetch('/Share/GetLogins',data,'GET');//登录
export const GetOrdersList = data => fetch('/Share/GetOrders',data,'GET');//下单
export const GetSendsList = data => fetch('/Share/GetSends',data,'GET');//
export const GetPerformances = data => fetch('/Share/GetPerformances',data,'GET');//
export const ApprovePortraitureOrderList = data => fetch('/Portraiture/ApprovePortraitureOrderList',data,'GET');// 案例审核
// 案例
export const DownLoadImg = data => fetch('/Image/DownLoadImg',data,'GET');// 图片下载
export const addCaseRecord = data => fetch('/CaseRecord',data,'POST');
export const delCaseRecord = data => fetch('/delCaseRecord',data,'GET');
export const CaseRecordEdit = data => fetch('/CaseRecordEdit',data,'POST');
export const GetComment = data => fetch('/CaseRecord/GetComment',data,'GET');
export const DeleteComment = data => fetch('/CaseRecord/DeleteComment',data,'GET');
export const addCase = data => fetch('/case',data,'POST');
export const caseEdit = data => fetch('/caseEdit',data,'POST');
export const DelImg = data => fetch('/Image/DelImg',data,'GET');//资源删除

// 发送短信模板
export const GetSpeechTech = data => fetch('/BaseVisit/GetSpeechTech',data,'GET');
export const SendMsg = data => fetch('/BaseVisit/SendMsg',data,'POST');
export const ModifyMarketConsultant = data => fetch('/Branch/ModifyMarketConsultant',data,'GET');
export const GetBranchShopList = data => fetch('/Branch/GetBranchShopList',data,'GET');
export const ModifyBranchShopAddress = data => fetch('/Branch/ModifyBranchShopAddress',data,'POST');
export const GetOperatedLog = data => fetch('/Branch/GetOperatedLog',data,'GET');
export const GetTicketPay = data => fetch('/BaseStockTicketOut/GetTicketPay',data,'POST');
export const UpdateMemo = data => fetch('/BaseStockTicketIn/UpdateMemo',data,'POST');
export const ModifyIsFrozen = data => fetch('/StockDrug/ModifyIsFrozen',data);
// 广告
export const GetEntities = data => fetch('/AlertAdvertise/GetEntities',data);
export const GetEntity = data => fetch('/AlertAdvertise/GetEntity',data);
export const AddNewAdv = data => fetch('/AlertAdvertise/AddNew',data,'POST');
export const ModifyAdv = data => fetch('/AlertAdvertise/Modify',data,'POST');
export const DeleteAdv = data => fetch('/AlertAdvertise/Delete',data);
// 问题反馈 （无人使用  清理垃圾时可考虑删除）
export const AddFeedback = data => fetch('/Feedback/AddFeedback',data,'POST');
export const UpdateFeedback = data => fetch('/Feedback/UpdateFeedback',data,'POST');
export const DeleteFeedback = data => fetch('/Feedback/DeleteFeedback',data,'GET');
export const GetFeedback = data => fetch('/Feedback/GetFeedback',data,'POST');

export const SearchStockException = data => fetch('/StockDrug/SearchStockException',data,'GET');
// 复诊单
export const AddDiagInvitations = data => fetch('/DiagInvitations/AddDiagInvitations', data,'POST')
export const UpdateDiagInvitations = data => fetch('/DiagInvitations/UpdateDiagInvitations', data,'POST')
export const DeleteDiagInvitations = data => fetch('/DiagInvitations/DeleteDiagInvitations', data)
export const GetDiagInvitations = data => fetch('/DiagInvitations/GetDiagInvitations', data,'POST')
export const SetDiagInvitations = data => fetch('/DiagInvitations/SetDiagInvitations', data,'POST')
// 认证
export const VerifyReview = data => fetch('/Verify/VerifyReview', data)
export const GetFullUserVerifyInfo = data => fetch('/Verify/GetFullUserVerifyInfo', data,'POST')
// 投诉
export const AddComplaint = data => fetch('/FxComplaint/AddComplaint', data,'POST')
export const UpdateComplaint = data => fetch('/FxComplaint/UpdateComplaint', data,'POST')
export const DeleteComplaint = data => fetch('/FxComplaint/DeleteComplaint', data)
export const GetComplaint = data => fetch('/FxComplaint/GetComplaint', data,'POST')
// 线上客户回访
export const GetList = data => fetch('/AppVisit/GetList', data,'GET')
export const appVisitAdd = data => fetch('/AppVisit/Add', data,'POST')
export const updateAppVisit = data => fetch('/AppVisit/Update', data,'POST')
export const GetListByUserId = data => fetch('/AppVisit/GetListByUserId', data,'GET')//回访记录 线上客户
export const GetSubOrdersList = data => fetch('/Order/GetSubOrdersList', data,'GET')//线上订单
/*
产品单模板
*/
export const AddPrintTemplat = data => fetch('/PrintTemplat/AddPrintTemplat', data,'POST')
export const DeletePrintTemplatById = data => fetch('/PrintTemplat/DeletePrintTemplatById', data,'GET')
export const GetPrintTemplatList = data => fetch('/PrintTemplat/GetPrintTemplatList', data,'GET')
export const UpdatePrintTemplat = data => fetch('/PrintTemplat/UpdatePrintTemplat', data,'POST')
export const AddPrintDetail = data => fetch('/PrintTemplat/AddPrintDetail', data,'POST')
export const GetPrintDetailList = data => fetch('/PrintTemplat/GetPrintDetailList', data,'GET')

export const GetBranchCommission = data => fetch('/BranchReport/GetBranchCommission', data,'GET')//代理商业绩统计
export const GetOnlineCommission = data => fetch('/Order/GetOnlineCommissionReport', data,'GET')//线上支付统计
// 服务商
export const AddServiceInfo = data => fetch('/ServiceInfo/AddServiceInfo', data,'POST')
export const DeleteServiceInfo = data => fetch('/ServiceInfo/DeleteServiceInfo', data,'GET')
export const UpdateServiceInfo = data => fetch('/ServiceInfo/UpdateServiceInfo', data,'POST')
export const GetServiceInfo = data => fetch('/ServiceInfo/GetServiceInfo', data,'POST')
export const GetServiceInfoDetail = data => fetch('/ServiceInfo/GetServiceInfoDetail', data,'GET')
export const GetServiceInfoByKeywords = data => fetch('/ServiceInfo/GetServiceInfoByKeywords', data,'GET')
export const DeleteServiceConsume = data => fetch('/ServiceInfo/DeleteServiceConsume', data,'GET')

export const ModifyShopTag = data => fetch('/Branch/ModifyShopTag', data,'GET')
export const GetServiceShop = data => fetch('/ServiceShop/GetServiceShop', data,'GET')
export const AddServiceShop = data => fetch('/ServiceShop/AddServiceShop', data,'POST')//添加服务店铺
export const GetServiceChangeLogList = data => fetch('/ServiceLevel/GetServiceChangeLogList', data,'POST')//迁移查询
export const ConfirmServiceChange = data => fetch('/ServiceLevel/ConfirmServiceChange', data,'GET')//迁移确认
export const GetServiceTeamMap = data => fetch('/ServiceLevel/GetServiceTeamMap', data,'GET')//系谱
export const GeneratorServiceFiveConsume = data => fetch('/ServiceLevel/GeneratorServiceFiveConsume', data,'GET')//生成记录
export const GetServiceLevelConsume = data => fetch('/ServiceLevel/GetServiceLevelConsume', data,'GET')//记录查询
export const SettlementServiceCommissionNew = data => fetch('/ServiceLevel/SettlementServiceCommissionNew', data,'GET')//查询详情

// 收款单
export const AddChargePay = data => fetch('/HospitalChargePay/AddFxHospitalChargePay', data,'POST')
export const GetChargePay = data => fetch('/HospitalChargePay/GetFxHospitalChargePay', data,'GET')
export const UpdateChargePay = data => fetch('/HospitalChargePay/UpdateFxHospitalChargePay', data,'POST')
export const DeleteChargePay = data => fetch('/HospitalChargePay/DeleteFxHospitalChargePay', data,'GET')
// 服务商
export const GetSerCommissionList = data => fetch('/ServiceInfo/GetServiceCommissionList', data,'GET')
export const GeneratorSerCommission = data => fetch('/ServiceInfo/GeneratorServiceCommission', data,'GET')
export const GetSerCommissionDetail = data => fetch('/ServiceInfo/GetServiceCommissionDetail', data,'GET')
export const SetSerCommission = data => fetch('/ServiceInfo/SettlementServiceCommission', data,'GET')
export const SetSerCommissionDetail = data => fetch('/ServiceInfo/SettlementServiceCommissionDetail', data,'GET')
export const ModifyBranchAddress = data => fetch('/Branch/ModifyBranchAddress', data,'POST')//客户详情修改地址
export const SignOutServiceInfo = data => fetch('/ServiceInfo/SignOutServiceInfo', data,'POST')
// 卡券作废
export const GetBlackTicketInfo = data => fetch('/BaseBlackTicketInfo/GetBlackTicketInfo', data,'GET')
export const AddBlackTicketInfo = data => fetch('/BaseBlackTicketInfo/AddBlackTicketInfo', data,'POST')
export const DeleteBlackTicketInfo = data => fetch('/BaseBlackTicketInfo/DeleteBlackTicketInfo', data,'GET')
// 商品赠品关联
export const AddGoodsGift = data => fetch('/ActivityGoodsGift/AddGoodsGift', data,'POST')
export const GetGoodsGift = data => fetch('/ActivityGoodsGift/GetGoodsGift', data,'GET')
export const AddItemsAdress = data => fetch('/ActivityItemsAdress/AddItemsAdress', data,'POST')
export const GetItemsAddressList = data => fetch('/ActivityItemsAdress/GetItemsAddressList', data,'GET')
//排诊
export const GetDesignerOnDuty = data => fetch('/BaseScheduling/GetDesignerOnDuty', data,'GET')
export const AddScheduling = data => fetch('/BaseScheduling/AddScheduling', data,'POST')
export const ChangeScheduling = data => fetch('/BaseScheduling/ChangeScheduling', data,'POST')
export const GetSchedulingDetail = data => fetch('/BaseScheduling/GetSchedulingDetail', data,'GET')
export const CancelScheduling = data => fetch('/BaseScheduling/CancelScheduling', data,'GET')
export const GetDesignerRest = data => fetch('/BaseDesignerRest/GetDesignerRest', data,'GET')
export const GetDesignerRestDetail = data => fetch('/BaseDesignerRest/GetDesignerRestDetail', data,'GET')
export const AddDesignerRest = data => fetch('/BaseDesignerRest/AddDesignerRest', data,'POST')
// 店家图片
export const AddBaseCommonPhoto = data => fetch('/BaseCommonPhoto/AddBaseCommonPhoto', data,'POST')
export const GetBaseCommonPhoto = data => fetch('/BaseCommonPhoto/GetBaseCommonPhoto', data,'GET')
// 消息
export const CreateScheduleTask = data => fetch('/JiGuang/CreateScheduleTask', data,'POST')
export const AddExecutePush = data => fetch('/JiGuang/AddExecutePush', data,'POST')
export const GetCIdList = data => fetch('/JiGuang/GetCIdList', data,'GET')
export const GetValidScheduleTasks = data => fetch('/JiGuang/GetValidScheduleTasks', data,'GET')
export const UpdateScheduleTask = data => fetch('/JiGuang/UpdateScheduleTask', data,'POST')
export const DeleteScheduleTask = data => fetch('/JiGuang/DeleteScheduleTask', data,'GET')
export const GetScheduleTask = data => fetch('/JiGuang/GetScheduleTask', data,'GET')
export const GetUserReport = data => fetch('/JiGuang/GetUserReport', data,'GET')
// 订单（活动/商品）转化
export const SearchAppActivityBenefit = data => fetch('/AppActivityBenefit/SearchAppActivityBenefit', data,'POST')
export const AppGoodsConsumeSet = data => fetch('/AppActivityBenefit/AppGoodsConsumeSet', data,'POST')
// 线上团队
export const GetOnlineTeamConsume = data => fetch('/OnlineTeamConsume/GetOnlineTeamConsume', data,'POST')
export const GetOnlineTeamConsumeDetail = data => fetch('/OnlineTeamConsume/GetOnlineTeamConsumeDetail', data,'POST')

export const AddGradeStrategy = data => fetch('/Branch/AddGradeStrategy', data,'POST')
export const UpdateGradeStrategy = data => fetch('/Branch/UpdateGradeStrategy', data,'POST')
export const GetGradeStrategy = data => fetch('/Branch/GetGradeStrategyInfo', data,'GET')
export const GetGradeStrategyDetailById = data => fetch('/Branch/GetGradeStrategyDetailById', data,'GET')
export const DeleteGradeStrategy = data => fetch('/Branch/DeleteGradeStrategy', data,'GET')
export const AUGradeStrategySub = data => fetch('/Branch/AUGradeStrategySub', data,'POST')
export const AddGradeSpecialRewards = data => fetch('/Branch/AddGradeSpecialRewards', data,'POST')
export const UpdateGradeSpecialRewards = data => fetch('/Branch/UpdateGradeSpecialRewards', data,'POST')
export const GetGradeSpecialRewards = data => fetch('/Branch/GetGradeSpecialRewards', data,'GET')
export const DeleteGradeSpecialRewards = data => fetch('/Branch/DeleteGradeSpecialRewards', data,'GET')

export const WeklyRewardConsume = data => fetch('/Consume/WeklyRewardConsume', data,'POST')
export const MonthlyRewardConsume = data => fetch('/Consume/MonthlyRewardConsume', data,'POST')
export const GetBaseDataDicByCode = data => fetch('/BaseDataDic/GetBaseDataDicByCode', data,'GET')
