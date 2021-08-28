<template>
    <div class="editRegister">
        <el-form :model="ruleForm" :rules="rules" :inline="true" ref="ruleForm" label-width="110px"
                 class="demo-ruleForm">
            <el-form-item style="width: 100%;margin-bottom: 0px" label="" lanel-width="70px">
                <span style="font-size: 16px;font-weight: bold">基础信息</span>
            </el-form-item>
            <el-col :span="24" style="background: #F2F2F2;padding-top: 10px">
                <el-form-item label="注册日期：" class="form_item">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date"
                                    style="width: 260px;" :disabled="typeCode!='01'"></el-date-picker>
                </el-form-item>
                <el-form-item label="注册等级：" class="form_item">
                    <el-select v-model="ruleForm.grade" placeholder="请选择等级" class="form_select_2" >
                        <el-option v-for="item in gradeList" :label="item.BranchGradeName" :value="item.Code"
                                   :key="item.Code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="医院：" prop="" class="form_item">
                    <div style="width: 260px">
                        <span v-if="!show">{{ruleForm.Hospital}}</span>
                        <el-select v-model="ruleForm.Hospital" class="form_ipt" v-if="show">
                            <el-option v-for="(item,index) in supplyList" :label="item.SupplierName"
                                       :value="item.Code+'|'+item.SupplierName" :key="index"></el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="支付会费：" class="form_item">
                    <el-input-number class="form_ipt" v-model="ruleForm.PayAmount" :min="0" :controls="false"></el-input-number>
                </el-form-item>
                <el-form-item label="代理编号：" class="form_item">
                    <span>{{ruleForm.code}}</span>
                </el-form-item>

                <el-form-item label="标签：" prop="" class="form_item">
                    <el-select v-model="ruleForm.BranchTags" placeholder="请选择" style="width: 260px">
                        <el-option label="空" value=""></el-option>
                        <el-option v-for="(item,index) in tagsList" :label="item.tagName" :value="item.tagName" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="代理类型：" prop="" class="form_item">
                    <el-select v-model="ruleForm.BranchType" placeholder="请选择" style="width: 260px"
                               @change="typeChange">
                        <el-option label="个人" value="1"></el-option>
                        <el-option label="店铺" value="2"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="店铺面积：" prop="" class="form_item" v-if="ruleForm.BranchType == 2">
                    <el-input-number v-model="ruleForm.ShopArea" :min="0" :debounce='10' :controls="false"
                                     style="width: 260px;float: left"></el-input-number>
                    <span style="float: left">m²</span>
                </el-form-item>
                <el-form-item label="店铺名称：" prop="" class="form_item" v-if="ruleForm.BranchType == 2">
                    <el-input v-model="ruleForm.shopName" style="width: 260px;float: left"></el-input>
                </el-form-item>
                <el-form-item label="店铺名称：" prop="" class="form_item" v-if="ruleForm.BranchType == 2">
                    <el-input v-model="ruleForm.businessType" style="width: 260px;float: left"></el-input>
                </el-form-item>

                <el-form-item label="店家凭证：" prop="" class="form_item" v-if="ruleForm.BranchType == 2">
                    <el-button @click="uploadImg" type="primary">编辑图片</el-button>
                </el-form-item>
                <el-form-item label="专家日提成：" class="form_item" prop="" v-if="ruleForm.BranchType == 2">
                    <el-radio v-model="ruleForm.IsExpert" label="0">无</el-radio>
                    <el-radio v-model="ruleForm.IsExpert" label="1">有</el-radio>
                </el-form-item>
                <el-form-item label="生效时间：" class="form_item" v-if="ruleForm.IsExpert == 1">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.enableDate"
                                    style="width: 260px;"></el-date-picker>
                </el-form-item>
                <el-form-item label="专家日提成比例：" class="form_item"
                              v-if="ruleForm.IsExpert == 1&&ruleForm.BranchType == 2">
                    <el-input v-model="ruleForm.ExpertRate" class="form_ipt"></el-input>
                    <span style="float: left">%</span>
                </el-form-item>
                <el-form-item label="消费商卡号：" prop="" class="form_item">
                    <el-input v-model="ruleForm.cardNO" style="width: 260px;float: left" ></el-input>
                </el-form-item>
                <el-form-item label="姓名：" prop="name" class="form_item">
                    <el-input class="form_ipt" v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="联系电话：" prop="Tel" class="form_item">
                    <el-input class="form_ipt" v-model="ruleForm.Tel"></el-input>
                </el-form-item>
                <el-form-item label="性别：" prop="Sex" class="form_item">
                    <el-radio class="radio" v-model="ruleForm.Sex" label="1">男</el-radio>
                    <el-radio class="radio" v-model="ruleForm.Sex" label="0">女</el-radio>
                </el-form-item>
                <el-form-item label="邮箱：" prop="email" class="form_item">
                    <el-input class="form_ipt" v-model="ruleForm.email"></el-input>
                </el-form-item>
                <el-form-item label="来源渠道：" prop="region" class="form_item">
                    <el-select v-model="ruleForm.region" placeholder="请选择等级" class="form_select_2">
                        <el-option v-for="item in origionList" :label="item.DataName" :value="item.DataName"
                                   :key="item.DataCode"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="地区：" class="form_item">
                    <el-select v-model="ruleForm.province" placeholder="请选择" class="form_select" filterable>
                        <el-option v-for="item in detAddr" :label="item.name" :value="item.name"
                                   :key="item.name"></el-option>
                    </el-select>
                    <el-select v-model="ruleForm.city" placeholder="请选择" class="form_select" filterable>
                        <el-option v-for="item in cityList" :label="item.name" :value="item.name"
                                   :key="item.name"></el-option>
                    </el-select>
                    <el-select v-model="ruleForm.area" placeholder="请选择" class="form_select" filterable>
                        <el-option v-for="item in areaList" :label="item.name" :value="item.name"
                                   :key="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="详细地址：" prop="address" class="form_item">
                    <el-input class="form_ipt" v-model="ruleForm.address"></el-input>
                </el-form-item>
                <el-form-item label="身份证号码：" class="form_item">
                    <el-input class="form_ipt" v-model="ruleForm.IdCard"></el-input>
                </el-form-item>
                <el-form-item label="生日：" class="form_item">
                    <el-select v-model="ruleForm.year" style="width:90px" @change="yearChange" filterable>
                        <el-option v-for="(item,index) in yearList" :key="index" :label="item"
                                   :value="item"></el-option>
                    </el-select>
                    <el-select v-model="ruleForm.month" style="width:90px" @change="mouChange" filterable>
                        <el-option v-for="(item,index) in monthList" :key="index" :label="item"
                                   :value="item"></el-option>
                    </el-select>
                    <el-select v-model="ruleForm.day" style="width:90px" filterable>
                        <el-option v-for="(item,index) in dayList" :key="index" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="推荐人：" prop="Recommender" class="form_item" filterable  v-if="ruleForm.BranchGradeCode !='G100000'">
                    <el-select v-model="ruleForm.Recommender" :disabled="typeCode == '02'" filterable remote placeholder="请输入关键词" @change="selectRef" :remote-method="remoteMethod" :loading="loading" style="width: 260px" >
                        <el-option
                            v-for="(item,index) in referList"
                            :key="index" :label="item.name+'('+item.PhoneNumber+')'"
                            :value="item.value+'|'+item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="公司名称：" class="form_item" v-if="show">
                    <el-input class="form_ipt" v-model="ruleForm.company"></el-input>
                </el-form-item>
                <!--<el-form-item label="推荐提成策略：" prop="identityType" class="form_item">-->
                    <!--<el-select v-model="ruleForm.identityType" placeholder="请选择"  @change="identityTypeC" class="form_select_2">-->
                        <!--<el-option label="新策略" value="1"></el-option>-->
                        <!--<el-option label="老策略" value="2"></el-option>-->
                    <!--</el-select>-->
                <!--</el-form-item>-->
                <el-form-item label="咨询师：" class="form_item">
                    <el-select v-model="ruleForm.consult" filterable placeholder="请选择" class="form_select_2"
                               @change="conSelect">
                        <el-option label="空" value=""></el-option>
                        <el-option v-for="(item,index) in consultList" :key="index" :label="item.name"
                                   :value="item.name+'|'+item.code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="消费订单：" class="form_item" v-if="ruleForm.order">
                    <el-checkbox v-model="ruleForm.order"></el-checkbox>
                    <span v-if="ruleForm.order">支付金额：{{reportPay}}</span>
                </el-form-item>
                <el-form-item label="消费客户：" class="form_item" v-if="transCustomer.length>0">
                    <span v-if="ruleForm.order">{{transCustomer}}</span>
                </el-form-item>
                <el-form-item label="订单编号：" class="form_item" prop="formNum" v-if="ruleForm.order">
                    <el-input v-model="ruleForm.formNum" class="form_ipt"></el-input>
                </el-form-item>
                <el-form-item label="订单：" style="width:100%"  v-if="ruleForm.order">
                    <el-table ref="multipleTable" :data="multipleTable" border style="width: 780px"  @selection-change="handleSelectionChange">
                        <el-table-column type="selection"   align="center" width="55"></el-table-column>
                        <el-table-column prop="fxCode" min-width="100" label="订单号">
                            <template slot-scope="scope">
                                <el-button @click="getRP(scope.row)" type="text">{{scope.row.fxCode}}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="price" label="订单类型" min-width="100">
                            <template slot-scope="scope">
                                <el-tag type="success">{{scope.row.consumeTypeId|filFun}}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column prop="orderAmount" label="订单金额" min-width="100"></el-table-column>
                        <el-table-column prop="ReceiveAccount" label="付款状态" min-width="100">
                            <template slot-scope="scope">
                                <el-tag v-if="scope.row.isPayOff" type="success">已付清</el-tag>
                                <el-tag v-else  type="danger">未付清</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column prop="realAmount" label="支付金额" min-width="100"></el-table-column>
                        <el-table-column prop="projectName" label="项目名称" min-width="100" show-overflow-tooltip=""></el-table-column>
                    </el-table>
                </el-form-item>
            </el-col>
            <el-form-item style="width: 100%;margin-bottom: 0px" label="" label-width="70px">
                <span style="font-size: 16px;font-weight: bold">支付信息</span>
            </el-form-item>
            <el-col :span="24" style="background: #F2F2F2;padding-top: 10px">
                <el-form-item label=" " style="width: 100%;margin-bottom: 10px" label-width="10px">
                    <el-table ref="singleTable" :data="payTable" border style="width: 900px">
                        <el-table-column prop="PayTypeName" min-width="90" label="支付方式"></el-table-column>
                        <el-table-column prop="ReceiveAccount" label="收款账户" min-width="90"></el-table-column>
                        <el-table-column prop="RealAmount" label="实际金额" min-width="90">
                            <template slot-scope="scope">
                                {{scope.row.RealAmount.toQFW()}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="ProcFee" label="手续费" min-width="80"></el-table-column>
                        <el-table-column prop="ReceiveBranchName" label="销售公司" min-width="90"></el-table-column>
                        <el-table-column prop="PayDate" label="收款时间" min-width="120">
                            <template slot-scope="scope">
                                <span v-if="scope.row.PayDate">
                                    {{scope.row.PayDate.substring(0,10)}} {{scope.row.PayDate.substring(11,19)}}
                                </span>
                            </template>
                        </el-table-column>

                        <el-table-column prop="ItemDetail" label="来源" min-width="80"></el-table-column>
                        <el-table-column prop="Memo" label="备注" min-width="100" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="" label="操作" min-width="100">
                            <template slot-scope="scope">
                                <!-- 升级费4 额外费5 -->
                                <el-button size="small" type="primary" @click="deleteRow(scope.$index,payTable,'编辑')" :disabled="scope.row.ItemType == 4">编辑</el-button>
                                <el-button size="small" type="warning" @click="deleteRow(scope.$index,payTable,'删除')" :disabled="scope.row.ItemType == 4">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button type="success" @click="add" style="margin-top: 10px">添加支付信息</el-button>
                </el-form-item>
            </el-col>
            <el-form-item style="width: 100%;margin-bottom: 0px" label="">
                <span style="font-size: 16px;font-weight: bold">银行信息</span>
            </el-form-item>
            <el-col :span="24" style="background: #F2F2F2;padding-top: 10px">
                <el-form-item label="银行：" class="form_item">
                    <el-select v-model="ruleForm.bank" placeholder="请选择" class="form_select_2">
                        <el-option v-for="item in bankList" :label="item.DataName" :value="item.DataName"
                                   :key="item.DataCode"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开户行支行：" class="form_item">
                    <el-input class="form_ipt" v-model="ruleForm.BankName"></el-input>
                </el-form-item>
                <el-form-item label="银行卡号：" class="form_item">
                    <el-input class="form_ipt" v-model="ruleForm.BankCard" @change="checkStr"></el-input>
                </el-form-item>
                <el-form-item label="开户人：" class="form_item">
                    <el-input class="form_ipt" v-model="ruleForm.person"></el-input>
                </el-form-item>
            </el-col>
            <!-- <el-form-item style="width: 100%;margin-bottom: 0px" label="">
                <span style="font-size: 16px;font-weight: bold">附加信息</span>
            </el-form-item>
            <el-col :span="24" style="background: #F2F2F2;padding-top: 10px">
                <el-form-item label="学历：" class="form_item">
                    <el-select v-model="ruleForm.edu" placeholder="请选择" class="form_select_2">
                        <el-option v-for="item in eduList" :label="item.DataName" :value="item.DataName"
                                   :key="item.DataCode"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="行业：" class="form_item">
                    <el-select v-model="ruleForm.industry" placeholder="请选择" c4lass="form_select_2">
                        <el-option v-for="item in industryList" :label="item.DataName" :value="item.DataName"
                                   :key="item.DataCode"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="年收入：" class="form_item">
                    <el-input v-model="ruleForm.income" class="form_select_2"></el-input>
                </el-form-item>
            </el-col> -->
            <el-form-item style="width: 100%;margin-bottom: 0px" label="">
                <span style="font-size: 16px;font-weight: bold">套餐信息</span>
            </el-form-item>
            <el-col :span="24" style="background: #F2F2F2;padding-top: 10px">
                <el-form-item label="选择套餐组合：" style="margin-bottom: 0px">
                    <el-row>
                        <el-col v-for="(items,index) in packageList" :key="index" style="width: 150px">
                            <el-select v-model="packageVal[index].code" form placeholder="请选择" @change="selPAC" :disabled="ruleForm.isEnable==1&&tableData.length>0">
                                <el-option label="请选择" value=""></el-option>
                                <el-option v-for="item in items" :label="item.ConPacName"
                                           :value="item.ConPacCode" :key="item.ConPacCode"></el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="卡券：" style="width: 100%;margin-bottom: 0px">
                    <el-table ref="singleTable" :data="tableData" border
                              highlight-current-row style="width: 800px">
                        <el-table-column type="index" width="60" label="序号"></el-table-column>
                        <el-table-column prop="ConPacName" label="套餐名称" min-width="100"></el-table-column>
                        <el-table-column prop="TickInfoCode" label="券种编号" min-width="100"></el-table-column>
                        <el-table-column prop="TickName" label="券名称" min-width="120"></el-table-column>
                        <el-table-column prop="Price" label="面值" min-width="80"></el-table-column>
                        <el-table-column prop="TicNum" label="数量" min-width="80"></el-table-column>
                        <el-table-column prop="EndDate" label="有效期" min-width="120">
                            <template slot-scope="scope">
                                <span v-if="scope.row.PrdOfVal!='' && scope.row.PrdOfVal!=null "> {{ '售后'+ scope.row.PrdOfVal +'天'}}</span>
                                <div v-else>
                                    <p>开始：{{ scope.row.StartDate&&scope.row.StartDate.substr(0,10) }} </p>
                                    <p>结束：{{ scope.row.EndDate&&scope.row.EndDate.substr(0,10) }} </p>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
                <el-form-item label="积分：" class="form_item">
                    <span>{{integral}}</span>
                </el-form-item>
                <el-form-item style="width: 100%;margin: 10px 0" label="备注：">
                    <el-input type="textarea" v-model="ruleForm.memo" style="width:500px" :rows="4"></el-input>
                </el-form-item>
                <el-form-item style="width: 100%;margin: 10px 0" label="上传图片：" >
                    <el-upload
                        :action="action"
                        list-type="picture-card"
                        :acceptImage="acceptImage"
                        :on-success="success"
                        :fileList="fileList"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
            </el-col>
            <el-form-item style="width: 100%;text-align: center;margin-top: 20px">
                <el-button type="primary" @click="submitForm('ruleForm')" :loading="saveLoading">保存</el-button>
                <el-button @click="resetForm('ruleForm')">取消</el-button>
            </el-form-item>
        </el-form>
        <el-dialog title="添加支付信息" :visible.sync="dialogTableVisible1" :modal="body" size="">
            <payInfo @payOpe="payOpe" style="width: 380px" :code="ruleForm.code" :editMes="editMes" :dialogTableVisible1="dialogTableVisible1" :isHos="true"></payInfo>
        </el-dialog>
        <el-dialog title="凭证图片" :visible.sync="dialogImg" :modal="body" size="">
                <span style="color:red">(请上传 1M以内图片, 最多6张)</span>
                <upload @onSuccess="onSuccess3" :fileList="fileListImg3" @onRemove="onRemove3" @imgView="imgView" :action="action" style="width:660px"></upload>
                <div style="text-align:center;margin-top:10px">
                    <el-button @click="dialogImg = false" type="primary">确认</el-button>
                    <el-button @click="dialogImg = false">取消</el-button>
                </div>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import upload from '@/components/upload'
    import { xmxUrl, baseImgPath } from '@/config/env'
    import { imgApi, acceptImage } from '@/config/common'
    let uploadUrl = xmxUrl + imgApi + '?op=branchshop'
    import {GetBaseDataAll,GetBranchGradeAll,GetConsumerPackageAll,GetPackageOrderNumAll,
    getBaseDataByCode,GetBranchGradeFee,GetOrderCommandByCus2,GetOrderPayAmount,GetTagByPage,DelImg,
        getSupplierByPage,getServiceManAll,GetBranchByKeywords,UpdateBranch,GetTicketsAll,GetBranchByCode} from "../../../../api/myData";
    import payInfo from "./pay.vue"
    import addr from "../../../../../static/addresss.json";
    import { getCookie, delCookie,getStore } from "@/config/mUtils";
    var _this
    export default {
        // name: "editRegister",
        props: {
            editCode: "",
            editEnable: Number
        },
        data() {
            var idCard = (rule, value, callback) => {
                let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                if (!value) {
                    // return callback(new Error('请填写身份证号码'));
                    callback();
                }
                if (reg.test(value) == false) {
                    callback(new Error("请检查身份证号码"));
                } else {
                    callback();
                }
            };
            var email = (rule, value, callback) => {

                let reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                if (!value) {
                    callback();
                } else {
                    if (value.length != 0 && reg.test(value) == false) {
                        callback(new Error("请检查邮箱"));
                    } else {
                        callback();
                    }
                }
            };
            var bankCard = (rule, value, callback) => {

                let reg = /^\d{19}$/g; // 以19位数字开头，以19位数字结尾
                if (!reg.test(value)) {
                    callback(new Error("请检查卡号"));
                } else {
                    callback();
                }
            };
            return {
                acceptImage,
                fileListImg3:[],
                action:uploadUrl,
                baseImgPath,
                dialogImg:false,
                typeCode:getStore("typeCode"),//平台账户可修改注册日期 01
                tagsList:[],
                transCustomer:"",
                saveLoading:false,
                editMes:{},
                editIndex:"",
                supplyList: [],
                accountList: [], //医院账户
                dialogTableVisible1: false,
                payTable: [],
                form: {
                    payDate: new Date(),
                    type: "",
                    PayTypeName: "",
                    PayType: "",
                    Memo: "",
                    RealAmount: 0,
                    ReceiveAccount: "",
                    sxf: 0
                },
                consultList: [],
                loading: false,
                referList: [],
                allMes: "",
                detAddr: [],
                body: false,
                currentRow: null,
                ticketsList: [],
                packageList: [],
                packageVal: [{}],
                packageAll: [],
                bankList: [], //004
                eduList: [], //001
                industryList: [], //002
                origionList: [], //003来源
                gradeList: [],
                allGrade:[],
                provinceList: [],
                cityList: [],
                areaList: [],
                integral: 0,
                yearList: [],
                monthList: [],
                dayList: [],
                ruleForm: {
                    BranchTags:"",
                    enableDate:"",
                    year: new Date().getFullYear() + "",
                    month: "",
                    day: "",
                    order: false,
                    formNum: "",
                    Hospital: "",
                    Pledge: 0,
                    BranchType: "",
                    ShopArea: "",
                    shopName: "",
                    BranchGradeCode: "",
                    date: "",
                    grade: "",
                    ReferrerCode: "",
                    name: "",
                    Tel: "",
                    Sex: "1",
                    email: "",
                    region: "",
                    province: "",
                    city: "",
                    area: "",
                    address: "",
                    IdCard: "",
                    BirthDay: "",
                    Recommender: "",
                    company: "",
                    bank: "",
                    BankName: "",
                    BankCard: "",
                    person: "",
                    edu: "",
                    industry: "",
                    income: "",
                    identityType: "",
                    PayAmount: "",
                    cardNO: "",
                    memo: "",
                    consult: "",
                    MarketConsultantCode: "",
                    MarketConsultantName: "",
                    IsExpert: "0",
                    ExpertRate: 0,
                    businessType:'',
                },
                consumeList:[],
                time:0,
                reportPay:0,
                disabled: false,
                payWayList: [],
                serviceAll: [],
                rules: {
                    identityType: [{required: true, message: "请选择", trigger: "change"}],
                    name: [{required: true, message: "请输入姓名", trigger: "blur"}],
                    Sex: [{required: true, message: "请选择性别", trigger: "change"}],
                    Tel: [{required: true, message: "请输入电话", trigger: "blur"}],
                    region: [{required: true, message: "请选择来源渠道", trigger: "change"}],
                    IdCard: [{validator: idCard, trigger: "blur"}],
                    Recommender: [{required: true, message: "请填写推荐人", trigger: "blur"}],
                    email: [{validator: email, trigger: "blur"}],
                    BankCard: [{validator: bankCard, trigger: "blur"}],
                    company: [{required: true, message: "请填写推荐人", trigger: "blur"}],
                    ReceiveAccount: [
                        {required: true, message: "请填写收款账户", trigger: "blur"}
                    ]
                },
                packSelect: [],
                tableData: [],
                multipleTable:[],//订单表
                multipleSelection:[],
                fileList:[],
            };
        },
        computed: {
            show() {
                let show = false;
                this.gradeList.forEach(data => {
                    // 排除
                    if (data.Code == this.ruleForm.grade) {
                        if (data.GradeProperty == "终结") {
                            show = true;
                        }
                    }
                });
                return show;
            }
        },
        filters:{
            filFun(val){
                let len = _this.consumeList.length
                let list =  _this.consumeList
                for(var i = 0;i<len;i++){
                    if(val == list[i].DataCode){
                        return list[i].DataName
                    }
                }
            }
        },
        watch: {
            "ruleForm.province": {
                handler(curVal, oldVal) {
                    this.cityList = [];
                    this.ruleForm.city = "";
                    let len = this.detAddr.length;
                    this.detAddr.forEach(data => {
                        if (data.name == curVal) {
                            this.cityList = data.sub;
                        }
                    });
                },
                deep: true
            },
            "ruleForm.city": {
                handler(curVal, oldVal) {
                    this.ruleForm.area = "";
                    this.areaList = [];
                    let len = this.cityList.length;
                    this.cityList.forEach(data => {
                        if (data.name == curVal) {
                            this.areaList = data.sub;
                        }
                    });
                },
                deep: true
            },
            "ruleForm.grade": {
                handler(curVal, oldVal) {
                    let grade = "";
                    // 排除
                    this.gradeList.forEach(data => {
                        if (data.Code == curVal) {
                            grade = data.OrderNum;
                        }
                    });

                    //  排除初次等级赋值对会费以及套餐的影响
                    if (oldVal === "") {
                        // 启用后首次加载带出套餐信息
                        this.packGradeSelect(grade);
                    } else {
                        if (grade != this.ruleForm.OrderNum) {
                            this.getBranchGradeFee({
                                MemberCode: this.ruleForm.code,
                                MemberGradeCode: curVal,
                                BranchCode: this.allMes.Branch.ReferrerCode
                            })
                        } else {
                            this.ruleForm.PayAmount = this.allMes.Branch.PayAmount
                        }
                        // 启用后等级只能同级变动，不在关联套餐
                        if(!this.editEnable){
                            this.packGradeSelect(grade);
                        }
                    }
                },
                deep: true
            },
            packageVal: {
                handler(curVal, oldVal) {
                    this.getTickSplit(curVal);
                },
                deep: true
            },
            editCode: {
                handler(curVal, oldVal) {
                    if (curVal.length != 0) {
                        this.GetBaseDataAll();
                    }
                },
                deep: true
            },
            'ruleForm.order':{
                handler(curVal, oldVal){
                    if(curVal){
                        this.getOrder()
                    }
                },
                deep: true
            },
            'ruleForm.formNum':{
                handler(curVal, oldVal){
                    if(curVal.length>0){
                        this.GetOrderPayAmount()
                    }else{
                        this.reportPay = 0
                    }
                },
                deep: true
            },
        },
        mounted() {
            _this = this
            this.GetBaseDataAll();
            this.getBirthMes();
            this.detAddr = addr.area;
        },
        methods: {
            success(response, file, fileList){

                this.fileList = fileList
            },
            handleRemove(file, fileList) {
                this.fileList = fileList
            },
            imgView(url){
                this.$emit("photoShow",url)
            },
            onSuccess3(fileList){
                this.fileListImg3 = fileList
            },
            onRemove3(file,fileList){

                this.DelImg(file.url)
                this.fileListImg3 = fileList
            },
            // 删除原图片/视频
            async DelImg(filepath){
                let res = await DelImg({filepath:filepath})
                if(!res.status){
                this.$message({message: '原图片删除失败！'+res.errorMessage,type: 'warning'});
                }

            },
            uploadImg(){this.dialogImg = true},
            urlSplit(data){
                data.forEach(ele=>{//转换成upoload组件需要的格式
                    ele.localUrl = baseImgPath+ele.ImgUrl
                    ele.url = ele.ImgUrl
                    this.fileListImg3.push(ele)
                })
            },
            identityTypeC(val){
                if(val == 1){this.ruleForm.order = true}
            },
            async GetOrderPayAmount(){
                let res = await GetOrderPayAmount({fxcodes:this.ruleForm.formNum})
                this.reportPay = res.data.realAmount
            },
            getRP(data){this.$emit("reportD",data)},
            async getOrder(){
                // 判断显示订单所属本人还是授权人
                let code = this.transCustomer.length>0&&this.ruleForm.order?this.transCustomer.split("|")[0]:this.ruleForm.code
                let res = await GetOrderCommandByCus2({customerCode:code})
                let arr = []
                res.data.forEach(row=>{
                    if(row.approveState !=6&&row.approveState !=10&&row.consumeTypeId == 5){
                        arr.push(row)
                    }
                })
                this.multipleTable = arr
                setTimeout(() => {
                    this.setSelectData(this.ruleForm.formNum)
                }, 50);
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                let NS = ""
                this.multipleSelection.forEach(row=>{
                    NS +=","+row.fxCode
                })
                this.ruleForm.formNum = NS.replace(/(^\,*)|(\,*$)/g, "")
            },
            selPAC(){
                if(this.ruleForm.identityType == 1){
                    if(this.time == 0){
                        this.$alert('当前为新策略,请谨慎选择套餐','警告', {
                        confirmButtonText: '确定',
                        type:"warning",
                        callback: action => {
                            }
                        });
                    }
                    this.time = 1
                }
            },
            async getBranchGradeFee(params){
                try {
                    let res = await GetBranchGradeFee(params)
                    this.ruleForm.PayAmount = res.price
                    this.ruleForm.Pledge = res.pledge
                } catch (err) {
                    console.log(err)
                }
            },
            payOpe(val,ope){
                if(ope){
                    this.payTable[this.editIndex] = JSON.parse(JSON.stringify(val))
                    this.payTable.push()
                }else{
                    if (val.PayType) {
                        this.payTable.push(JSON.parse(JSON.stringify(val)))
                    }
                }
                this.dialogTableVisible1 = false
            },
            selectRef() {
                this.referList.forEach(row => {

                    if (row.value == this.ruleForm.Recommender.split("|")[0]) {
                        this.ruleForm.Hospital = row.hospitalCode + "|" + row.hospitalName;
                    }
                });
                // this.ruleForm.Hospital =
            },
            //  搜索代理
            async getBranchByKeywords(params, index) {
                try {
                    let res = await GetBranchByKeywords(params);
                    this.referList = [];
                    this.loading = false;
                    if (res instanceof Array && res.length > 0) {
                        this.referList = [];
                        res.forEach(item => {
                            let tagName = ""
                            if(item["BranchTags"] != ''&&item["BranchTags"] != null&&item["BranchTags"] != undefined){
                                tagName = '('+item["BranchTags"]+')'
                            }
                            this.referList.push({
                                name: item.BranchName+tagName,
                                value: item.Code,
                                hospitalName: item.HospitalName,
                                hospitalCode: item.HospitalCode,
                                PhoneNumber: item.PhoneNumber
                            });
                        });
                    }

                } catch (err) {
                    console.log(err);
                }
            },
            //            远程搜索推荐人
            remoteMethod(query) {
                if (query !== "") {

                    this.loading = true;
                    this.getBranchByKeywords({
                        keywords: query.removeSP()
                    });
                } else {
                    this.referList = [];
                }
            },

            getBirthMes() {
                let year = new Date().getFullYear();
                let arr = [],
                    arr1 = [];
                for (let i = 0; i < 80; i++) {
                    arr.push(year - i + "");
                }
                this.yearList = arr;
                for (let j = 1; j < 13; j++) {
                    if (j < 10) {
                        arr1.push("0" + j);
                    } else {
                        arr1.push(j + "");
                    }
                }
                this.monthList = arr1;
            },
            yearChange() {
                this.mouChange();
            },
            mouChange() {
                let arr = ["01", "03", "05", "07", "08", "10", "12"],
                    arr2 = ["04", "06", "09", "11"];
                let day = [];
                for (let i = 1; i < 32; i++) {
                    if (i < 10) {
                        day.push("0" + i);
                    } else {
                        day.push(i + "");
                    }
                }
                this.dayList = [];

                if (this.ruleForm.month == "02") {

                    if (this.isLeapYear(Number(this.ruleForm.year))) {
                        this.dayList = day.slice(0, day.length - 3);
                    } else {
                        this.dayList = day.slice(0, day.length - 2);
                    }
                }
                if (arr.indexOf(this.ruleForm.month) >= 0) {
                    this.dayList = day;
                }
                if (arr2.indexOf(this.ruleForm.month) >= 0) {
                    this.dayList = day.slice(0, day.length - 1);
                }
            },
            // 闰年判断
            isLeapYear(year) {
                return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
            },
            typeChange() {
                this.ruleForm.IsExpert = "0";
                this.ruleForm.ExpertRate = 0;
            },
            paySelect() {
                this.form.PayTypeName = this.form.type.name;
                this.form.PayType = this.form.type.value;
            },
            conSelect() {
                if (this.ruleForm.consult.length > 0) {
                    this.ruleForm.MarketConsultantCode = this.ruleForm.consult.split("|")[1];
                    this.ruleForm.MarketConsultantName = this.ruleForm.consult.split("|")[0];
                } else {
                    this.ruleForm.MarketConsultantCode = "";
                    this.ruleForm.MarketConsultantName = "";
                }
            },
            //            获取单个代理商详情
            // async getBranchByCode(params) {
            //     try {
            //         let res = await GetBranchByCode(params);
            //         this.allMes = res;
            //         this.copyWorth(res);
            //     } catch (err) {
            //         console.log(err);
            //     }
            // },
            //            等级套餐
            // async getPackageOrderNumAll() {
            //     try {
            //         let res = await GetPackageOrderNumAll();
            //         this.packageAll = res;
            //         this.GetTicketsAll();
            //     } catch (err) {
            //         console.log(err);
            //     }
            // },
            //            获取所有等级
            async getBranchGradeAll() {
                try {
                    let [res,ticketsGrade,ticketsList]  = await Promise.all([GetBranchGradeAll(),GetPackageOrderNumAll(),GetTicketsAll()])
                    // let res = await GetBranchGradeAll();
                    this.gradeList = this.filter(res);
                    this.allGrade = JSON.parse(JSON.stringify(this.gradeList))
                    this.packageAll = ticketsGrade
                    this.ticketsList = ticketsList;
                    let branchMes = await GetBranchByCode({branchcode: this.editCode});
                    this.allMes = branchMes;
                    this.copyWorth(branchMes);
                } catch (err) {
                    console.log(err);
                }
            },
            filter(data){
                let arr = []
                data.forEach(row=>{
                    if(row.Code != "G100000"){
                        arr.push(row)
                    }
                })
                return arr
            },
            //            获取基础信息
            async GetBaseDataAll() {
                try {
                    let data = {startdate: "",enddate: "",suppliername: "",suptypecode: "",phonenumber: "",pageindex: 1,pagesize: 999};
                    let [tags,baseDataList,supplyList,serviceAll] = await Promise.all([GetTagByPage({TypeCode:"7", pageIndex:1, pageSize:100, keywords:""}),GetBaseDataAll(),
                    await getSupplierByPage(data),getServiceManAll()])
                    this.tagsList = tags.data
                    this.supplyList = supplyList
                    this.serviceAll = serviceAll
                    this.baseMesSplit(baseDataList);
                    this.getBranchGradeAll();
                } catch (err) {
                    console.log(err);
                }
            },
            //            更新代理
            async updateBranch(params) {
                try {
                    let res = await UpdateBranch(params);
                    if (res.success) {
                        this.$message({message: "编辑成功", type: "success"});
                        this.$emit("closeEdit", true);
                    } else {
                        this.$message.error("编辑失败" + res.error);
                    }
                    this.saveLoading = false
                } catch (err) {
                    console.log(err);
                    this.$message.error("编辑失败");
                }
            },
            // async GetTicketsAll() {
            //     try {
            //         let res = await GetTicketsAll();
            //         this.ticketsList = res;
            //         this.getBranchByCode({
            //             branchcode: this.editCode
            //         });
            //     } catch (err) {
            //         console.log(err);
            //     }
            // },
            checkStr() {
                let vm = this;
                setTimeout(() => {
                    vm.ruleForm.BankCard = vm.ruleForm.BankCard.replace(/\D/g, "");
                }, 10);
            },
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.saveLoading = true
                        this.payTable.forEach(row => {
                            row.BranchCode = this.ruleForm.ReferrerCode;
                        });
                        let hospitalcode, hospitalname;
                        if (this.ruleForm.Hospital != "") {
                            hospitalcode = this.ruleForm.Hospital.split("|")[0];
                            hospitalname = this.ruleForm.Hospital.split("|")[1];
                        }
                        let obj = {
                            ShopEffectiveDate:String(this.ruleForm.enableDate).length>0?this.ruleForm.enableDate.formatDate("yyyy-MM-dd"):"",
                            hospitalCode: hospitalcode.removeSP(),
                            hospitalName: hospitalname.removeSP(),
                            Pledge: this.ruleForm.Pledge,
                            BranchType: this.ruleForm.BranchType,
                            ShopArea: this.ruleForm.ShopArea,
                            branchOrderPayList: JSON.stringify(this.payTable),
                            payAmount: this.ruleForm.PayAmount,
                            id: this.ruleForm.id,
                            code: this.ruleForm.code,
                            branchName: this.ruleForm.name.removeSP(),
                            branchGradeCode: this.ruleForm.grade,
                            ReferrerCode: this.ruleForm.Recommender.split("|")[0],
                            referrerName: this.ruleForm.Recommender.split("|")[1] ? this.ruleForm.Recommender.split("|")[1] : "",
                            OldReferrerName:this.ruleForm.OldReferrerName,
                            OldReferrerCode:this.ruleForm.OldReferrerCode,
                            idCard: this.ruleForm.IdCard,
                            bankCardId: this.ruleForm.BankCard,
                            openBankCode: this.ruleForm.bank,
                            openBankName: this.ruleForm.BankName,
                            bankCardHolder: this.ruleForm.person,
                            registDate: String(this.ruleForm.date).length > 0 ? this.ruleForm.date.formatDate("yyyy-MM-dd") : "",
                            sex: this.ruleForm.Sex,
                            birthday: this.ruleForm.year + "-" + this.ruleForm.month + "-" + this.ruleForm.day,
                            phoneNumber: this.ruleForm.Tel,
                            email: this.ruleForm.email,
                            income: this.ruleForm.income,
                            professionCode: this.ruleForm.industry,
                            education: this.ruleForm.edu,
                            province:_this.ruleForm.province,
                            city:this.ruleForm.city,
                            area:this.ruleForm.area,
                            address: this.ruleForm.address,
                            sourcWayeCode: this.ruleForm.region,
                            ModifiedUserId: getCookie("userId"),
                            ModifiedBy: getCookie("userName"),
                            CompanyName: this.ruleForm.company,
                            conPackage: this.conPackSplit(this.packageVal),
                            comPakageOrderList: JSON.stringify(this.packageTurn(this.tableData)),
                            identityType: this.ruleForm.identityType,
                            BranchPoints: this.integral,
                            isPayOff: this.ruleForm.isPayOff,
                            isEnable: this.ruleForm.isEnable,
                            cardNO: this.ruleForm.cardNO.removeSP(),
                            memo: this.ruleForm.memo,
                            shopName: this.ruleForm.shopName,
                            MarketConsultantCode: this.ruleForm.MarketConsultantCode,
                            MarketConsultantName: this.ruleForm.MarketConsultantName,
                            ExpertRate: Number(this.ruleForm.ExpertRate).div(100),
                            IsExpert: this.ruleForm.IsExpert,
                            modifiedUserId: getCookie("userId"),
                            modifiedBy: getCookie("userName"),
                            formNO:this.ruleForm.formNum.removeSP(),
                            AuthCustomer:this.transCustomer,
                            BranchTags:this.ruleForm.BranchTags,
                            CommonPhotoList:this.getImgMes(this.fileListImg3),
                            imageUrl:this.getImg(this.fileList)
                        };
                        this.updateBranch(obj);
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            },
            getImg(data){
                let arr = []
                data.forEach(row=>{
                    arr.push(row.response)
                })
                return arr.join("#")
            },
            getImgMes(data){
                let arr = []
                data.forEach(ele=>{
                    if(ele.id){//老数据不变动
                        arr.push(ele)
                    }else{
                        arr.push({//新数据重新组合
                            typeId:1,
                            refCode:this.ruleForm.code,
                            imgUrl:ele.url,
                            createBy:getCookie("userName"),
                            createUserId:getCookie("userId"),
                        })
                    }
                })
                return JSON.stringify(arr)
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.$emit("closeEdit", false);
            },
            //            基础信息
            baseMesSplit(data) {
                data.forEach(row => {
                    if (row.BusinessCode == "0001") {this.eduList.push(row);}
                    if (row.BusinessCode == "0002") {this.industryList.push(row);}
                    if (row.BusinessCode == "0003") {this.origionList.push(row);}
                    if (row.BusinessCode == "0004") {this.bankList.push(row);}
                    if (row.BusinessCode == "0006") {
                        if (row.DataCode != "008" &&row.DataCode != "009" &&row.DataCode != "010" &&row.DataCode != "011") {
                            this.payWayList.push({
                                name: row.DataName,
                                value: row.DataCode
                            });
                        }
                    }
                    if (row.BusinessCode == "0017") {this.consumeList.push(row);}
                    if (row.BusinessCode == "0019") {this.accountList.push(row);}
                });
            },
            packGradeSelect(grade) {//   获取所有套餐筛选等级
                let arr = [];
                this.allGrade.forEach(data => {
                    if (data.OrderNum >= grade) {arr.push(data.OrderNum);}
                });
                arr = this.removeDup(arr);
            },
            removeDup(data) {// 去重
                let arr = [];
                let len = data.length;
                data.sort();
                for (let i = 0; i < len; i++) {
                    if (data[i] != data[i + 1]) {
                        arr.push(data[i]);
                    } else {
                        if (i >= len - 1) {
                            arr.push(data[i + 1]);
                        }
                    }
                }
                this.packageSelect(arr, this.packageAll);
            },
            packageSelect(numList, dataList) {//套餐筛选组合
                this.packageList = [];
                this.packageVal = [];
                for (let i = 0; i < numList.length; i++) {
                    for (let j = 0; j < dataList.length; j++) {
                        if (numList[i] == dataList[j].OrderNum) {

                            if (!this.packageList[i]) {
                                this.packageList.push([]);
                                /*this.packageVal.push({code:""})*/
                            }
                            this.packageList[this.packageList.length - 1].push(dataList[j]);
                        }
                    }
                }

                if (this.allMes.Branch.ConPackage.length == 0) {
                    this.packageList.forEach(data => {
                        this.packageVal.push({code: ""});
                    });
                } else {
                    this.packageVal = this.getPackListCode(this.allMes.Branch.ConPackage);

                }
            },
            getPackListCode(data) {
                let arr1 = [];
                if (data) {
                    let len = this.packageList.length;
                    let arr = data.split(",");
                    for (let i = 0; i < len; i++) {
                        if (arr[i] != "null" &&arr[i] != undefined &&arr[i] != "undefined" &&arr[i] != null) {
                            arr1.push({code: arr[i]});
                        } else {
                            arr1.push({code: ""});
                        }
                    }
                } else {
                    arr1 = [{code: ""}];
                }
                return arr1;
            },
            getTickSplit(data) {
                let arr = [];
                if (this.ticketsList.length != 0) {
                    for (let i = 0; i < data.length; i++) {
                        for (let j = 0; j < this.ticketsList.length; j++) {
                            if (
                                data[i].code.length != 0 &&
                                data[i].code == this.ticketsList[j].ConPacCode
                            ) {
                                this.ticketsList[j].TicketCode = "";
                                arr.push(this.ticketsList[j]);
                            }
                        }
                    }
                }
                this.tableData = this.removeDu(arr);
                this.tableData.push();
                this.integral = this.recharge();
            },
            removeDu(data) {
                let arr = [];
                let pack = JSON.parse(JSON.stringify(data));
                for (var i = 0; i < data.length - 1; i++) {
                    for (var j = i + 1; j < data.length; j++) {
                        if (data[i].TickInfoCode == data[j].TickInfoCode) {
                            pack[j].TicNum += pack[i].TicNum;
                            pack[i].dul = true;
                            break;
                        }
                    }
                }
                pack.forEach(row => {
                    if (!row.dul) {arr.push(row);}
                });
                return arr;
            },
            recharge() {
                let arr = [];
                let num = 0;
                this.packageVal.forEach(row => {
                    for (let i = 0; i < this.packageAll.length; i++) {
                        if (row.code == this.packageAll[i].ConPacCode) {
                            num += Number(this.packageAll[i].JifenRecharge);
                            break;
                        }
                    }
                });
                return num;
            },
            packageTurn(data) {
                let arr = [];
                data.forEach(row => {
                    arr.push({
                        ConPacCode: row.ConPacCode,
                        ConPacName: row.ConPacName,
                        createUserId: getCookie("userId"),
                        createBy: getCookie("userName"),
                        TickInfoCode: row.TickInfoCode,
                        TicketCode: row.TicketCode,
                        TicketsType: row.TicketsType,
                        ProjCodes: row.ProjCodes,
                        UseCount: row.UseCount,
                        TicNum: row.TicNum,
                        ProjCodesNames: row.ProjCodesNames
                    });
                });
                return arr;
            },
            conPackSplit(data) {
                let arr = [];
                data.forEach(row => {
                    arr.push(row.code);
                });
                return arr.join(",");
            },
            // 复制操作
            copyWorth(data) {
                for (let p in data.Branch) {
                    if (data.Branch[p] == null ||data.Branch[p] == "null" ||data.Branch[p] == undefined) {
                        data.Branch[p] = "";
                    }
                }
                if (data.Branch.HospitalCode) {
                    this.ruleForm.Hospital =
                        data.Branch.HospitalCode + "|" + data.Branch.HospitalName;
                } else {
                    this.ruleForm.Hospital = "";
                }
                this.ruleForm.BranchTags = data.Branch.BranchTags
                this.transCustomer = data.Branch.AuthCustomer.length>1?data.Branch.AuthCustomer:''
                this.ruleForm.enableDate = data.Branch.ShopEffectiveDate.length>0?new Date(data.Branch.ShopEffectiveDate.substring(0,4),
                data.Branch.ShopEffectiveDate.substring(5,7)-1,data.Branch.ShopEffectiveDate.substring(8,10)):""
                let rigDate = data.Branch.RegistDate;
                let birth = data.Branch.Birthday;
                this.ruleForm.order = data.Branch.FormNO.length > 0 ? true : false;
                this.ruleForm.formNum = data.Branch.FormNO || "";
                this.ruleForm.isPayOff = data.Branch.IsPayOff;
                this.ruleForm.isEnable = data.Branch.IsEnable;
                this.ruleForm.Pledge = data.Branch.Pledge,
                this.ruleForm.BranchType = data.Branch.BranchType + "";
                this.ruleForm.ShopArea = data.Branch.ShopArea;
                this.ruleForm.shopName = data.Branch.ShopName;
                this.payTable = data.BranchOrderPayList.filter(row=>{
                    if(row.ItemType == 1||row.ItemType == 4){
                        return row
                    }
                })

                this.ruleForm.id = data.Branch.Id;
                this.ruleForm.code = data.Branch.Code;
                this.ruleForm.date =rigDate.length > 0? new Date(rigDate.substring(0, 4),Number(rigDate.substring(5, 7)) - 1,rigDate.substring(8, 10)): "",
                this.ruleForm.BranchGradeCode = data.Branch.BranchGradeCode;
                this.ruleForm.name = data.Branch.BranchName;
                this.ruleForm.RecCode = data.Branch.ReferrerCode;
                this.ruleForm.Tel = data.Branch.PhoneNumber;
                this.ruleForm.email = data.Branch.Email;
                this.ruleForm.Sex = data.Branch.Sex;
                this.ruleForm.region = data.Branch.SourcWayeCode;
                this.ruleForm.IdCard = data.Branch.IDCard;
                if (birth.length > 0) {
                    this.ruleForm.year = birth.split('-')[0];
                    this.ruleForm.month = birth.split('-')[1];
                    this.ruleForm.day = birth.split('-')[2];
                }
                this.ruleForm.Recommender = data.Branch.ReferrerCode.length > 0 ? data.Branch.ReferrerCode + "|" + data.Branch.ReferrerName : "";
                this.ruleForm.identityType = data.Branch.IdentityType;
                this.ruleForm.ReferrerCode = data.Branch.ReferrerCode;
                this.ruleForm.bank = data.Branch.OpenBankCode;
                this.ruleForm.BankName = data.Branch.OpenBankName;
                this.ruleForm.BankCard = data.Branch.BankCardId;
                this.ruleForm.person = data.Branch.BankCardHolder;
                this.ruleForm.edu = data.Branch.Education;
                this.ruleForm.income = data.Branch.Income;
                this.ruleForm.PayAmount = data.Branch.PayAmount;
                this.ruleForm.industry = data.Branch.ProfessionCode;
                this.ruleForm.company = data.Branch.CompanyName;
                this.ruleForm.cardNO = data.Branch.CardNO;
                this.ruleForm.memo = data.Branch.Memo;
                this.ruleForm.OldReferrerName = data.Branch.OldReferrerName
                this.ruleForm.OldReferrerCode = data.Branch.OldReferrerCode
                this.ruleForm.consult =data.Branch.MarketConsultantCode.length > 0 ? data.Branch.MarketConsultantName + "|" + data.Branch.MarketConsultantCode : "";
                if(data.Branch.ImageUrl){
                    data.Branch.ImageUrl.split("#").filter(row=>{
                        this.fileList.push({
                            url:this.baseImgPath+row,
                            response:row
                        })
                    })
                }
                this.ruleForm.province = data.Branch.Province
                // 延时赋值 避免筛选下级时清空下级值
                setTimeout(() => {this.ruleForm.city = data.Branch.City}, 20);
                setTimeout(() => {this.ruleForm.area = data.Branch.Area}, 30);
                setTimeout(() => { this.ruleForm.address = data.Branch.Address}, 40);
                setTimeout(() => {
                    this.ruleForm.IsExpert = data.Branch.IsExpert + "";
                    this.ruleForm.ExpertRate = Number(data.Branch.ExpertRate).mul(100);
                    this.tableData = data.CPOList;
                    this.disabled = data.CPOList.length > 0 ? true : false
                }, 50);

                if (data.Branch.IsEnable == 1) {
                    this.disabled = data.CPOList.length > 0 ? true : false
                }
                this.serviceAll.forEach(item => {
                    if (item.SerTypeCode == "004") {
                        this.consultList.push({
                            code: item["Code"],
                            name: item["ServiceName"],
                            text: item["ServiceName"] + "(" + item["Code"] + ")"
                        });
                    }
                });
                this.getPackGrade(this.allMes.Branch.BranchGradeCode);
                this.urlSplit(data.CommonPhotoList)
            },
            setSelectData(data){
                if(data.length>0){
                    let arr = data.split(",")
                    this.multipleTable.forEach(row=>{
                        if(arr.indexOf(row.fxCode)>=0){
                                this.$refs.multipleTable.toggleRowSelection(row);
                        }
                    })
                }
            },
            getPackGrade(data) {

                let arr = []
                this.allGrade.forEach(row => {
                    if (row.Code == data) {
                        this.ruleForm.grade = data;
                        this.ruleForm.OrderNum = row.OrderNum
                        this.ruleForm.gradeName = row.BranchGradeName;
                    }
                });
                if(this.editEnable){
                    this.gradeList.forEach(row=>{
                        if(row.OrderNum == this.ruleForm.OrderNum){
                            arr.push(row)
                        }
                    })
                    this.gradeList = arr
                }
            },

            // 添加支付信息
            add() {
                this.editMes = {}
                this.dialogTableVisible1 = true;
                this.form = {
                    payDate: new Date(),
                    type: "",
                    PayTypeName: "",
                    PayType: "",
                    Memo: "",
                    RealAmount: 0,
                    ReceiveAccount: "",
                    sxf: 0
                };
            },
            paySure(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.payTable.push({
                            // ItemType: 1,//1买套餐
                            PayType: this.form.PayType,
                            PayTypeName: this.form.PayTypeName,
                            Memo: this.form.Memo,
                            RealAmount: this.form.RealAmount,
                            ReceiveAccount: this.form.ReceiveAccount,
                            ProcFee: this.form.sxf,
                            PayDate: String(this.form.payDate).length > 0 ? this.form.payDate.formatDate("yyyy-MM-dd") : ""
                        });
                        this.dialogTableVisible1 = false;
                    } else {
                        return false;
                    }
                });
            },
            payCancel() {
                this.dialogTableVisible1 = false;
            },
            deleteRow(index, data,ope) {
                this.editIndex = index
                this.title = "ope"
                if(ope == '编辑'){
                    let obj =JSON.parse(JSON.stringify(data[index]))
                    obj.random = Math.random()
                    this.editMes = obj

                    this.dialogTableVisible1 = true;
                }else{
                    this.editMes = {}
                    data.splice(index, 1);
                }
            }
        },
        components: {payInfo,upload}
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .demo-ruleForm {
        height: 750px;
        overflow-y: auto;
        overflow-x: hidden;
    }
    .form_item {
        width: 48%;
        margin-bottom: 10px;
    }
    .form_select {
        width: 100px;
    }
    .form_ipt {
        width: 260px;
    }
    .form_select_2 {
        width: 260px;
    }
</style>
