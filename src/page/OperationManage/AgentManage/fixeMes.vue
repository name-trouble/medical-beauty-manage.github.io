4<template>
    <div class="selCommon AgentManage">
        <!-- 查询信息 -->
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="90px">
            <el-form-item label="医院：" class="form_item_mt10">
                <el-select v-model="formInline.hospital"  style='width:200px;' @change="onSubmit">
                    <el-option v-for="(item,index) in hospitalList" :key="index" :label="item.supplierName" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="关键字：" class="form_item_mt10">
                <el-input v-model="formInline.branchName" placeholder="店家/咨询师/联系电话/标签" style="width: 200px;" v-on:keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            <!-- <el-form-item label="咨询师状态：" class="form_item_mt10">
                <el-select v-model="formInline.IsEnable"  style='width:200px;' @change="onSubmit">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="离职" value="0"></el-option>
                    <el-option label="在职" value="1"></el-option>
                </el-select>
            </el-form-item> -->
            <!-- <el-form-item label="标签："  class="form_item_mt10" >
                <el-select style="width:200px" v-model="formInline.branchTag"  filterable placeholder="请选择">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="(item,index) in tagsList" :label="item.tagName" :value="item.tagName" :key="index"></el-option></el-select>
            </el-form-item> -->
            <el-form-item label="服务商：" class="form_item_mt10">
                <el-input v-model="formInline.serviceName" placeholder="" style="width: 200px;" v-on:keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            <el-form-item label="销售公司："  class="form_item_mt10" >
                <el-select style="width:200px" v-model="formInline.topBranch"  filterable placeholder="请选择">
                    <el-option v-for="(item,index) in topBranchList" :label="item.branchName" :value="item.code" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label=" " class="form_item_mt10">
                <el-button type="primary" @click="onSubmit"  class="searchBtn">查询</el-button>
                <Export ref="exportCom" :tHeader="tHeader" :filterVal=' filterVal' :tableData1='tableData1' :name='name' style="display:none"></Export>
                <el-button @click="getAllData" class="searchBtn" :loading="exportLoading" :disabled="tableData.length == 0" v-if="userId=='10006416'||userId=='10005323'||userId=='10006413'">导出报表</el-button>
            </el-form-item>
        </el-form>
        <!-- 查询信息 -->

        <!-- 信息表 -->
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" class="min_table smt" v-loading="loading"  max-height="660">
            <el-table-column prop="registDate" label="注册日期" min-width="90" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.registDate">
                         {{scope.row.registDate.substring(0,10)}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="Code" label="店家名称" min-width="90">
                <template slot-scope="scope">
                     <div @click="DetailMes(scope.$index,tableData)">
                        <span  class="table_btn">{{scope.row.branchName}}</span>
                        <span v-if="scope.row.branchTags">({{scope.row.branchTags}})</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="shopName" label="店铺名称" min-width="120" show-overflow-tooltip></el-table-column>
             <el-table-column prop="Code" label="地址" min-width="100" show-overflow-tooltip>
                <template slot-scope="scope">
                    <span v-if="scope.row.province">{{scope.row.province}}</span>
                    <span v-if="scope.row.city">{{scope.row.city}}</span>
                </template>
            </el-table-column>
            
            <el-table-column prop="hospitalName" label="医院" min-width="140" show-overflow-tooltip></el-table-column>
            <el-table-column prop="referrerName" label="推荐人" min-width="80">
                <template slot-scope="scope">
                    <span v-if="scope.row.referrerName">{{scope.row.referrerName}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="topBranchName" label="所属销售公司" min-width="100"></el-table-column>
            <el-table-column prop="isEnable" label="店家状态" min-width="80" align="center">
                <template slot-scope="scope">
                    <el-tag type="warning" v-if="scope.row.isEnable==0">未启用</el-tag>
                    <el-tag type="success" v-if="scope.row.isEnable==1">启用</el-tag>
                     <el-tag type="danger" v-if="scope.row.isEnable==2">退会</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="branchGradeName" label="店家等级" min-width="90">
                <template slot-scope="scope">
                    <span>{{scope.row.branchGradeName.indexOf('VIP')>=0?'VIP':'普通'}}</span>
                </template>
            </el-table-column>
             <!-- <el-table-column prop="marketConsultantName" label="咨询师" min-width="80">
                <template slot-scope="scope">
                    <span v-if="scope.row.marketConsultantName">{{scope.row.marketConsultantName}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="consultantState" label="咨询师状态" min-width="90" align="center">
                <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.consultantState == 1">在职</el-tag>
                    <el-tag type="danger" v-if="scope.row.consultantState == 0">离职</el-tag>
                </template>
            </el-table-column> -->
            <el-table-column prop="serviceName" label="服务商" min-width="90"></el-table-column>
            <el-table-column prop="cardNO" label="店家分类" min-width="80">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.shopTag" @change="tagChange(scope.row)">
                        <el-option label="A" value="A"></el-option>
                        <el-option label="B" value="B"></el-option>
                        <el-option label="C" value="C"></el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column prop="isPayOff" label="是否结清" min-width="80" align="center">
                <template slot-scope="scope">
                    <el-tag type="warning" v-if="scope.row.isPayOff == false">未结清</el-tag>
                    <el-tag type="success" v-if="scope.row.isPayOff == true">已结清</el-tag>
                </template>
            </el-table-column>
           <el-table-column prop="memo" label="备注" min-width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="grade" label="操作" width="240" fixed="right">
                <template slot-scope="scope">
                    <!-- <el-button size="small" @click="editMes(scope.row,'修改咨询师')" type="primary">修改咨询师</el-button> -->
                    <el-button size="small" @click="editAddr(scope.row,'修改地址')" type="primary">修改地址</el-button>
                    <el-button size="small" @click="editMemo(scope.row,'修改备注')" type="primary">修改备注</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 信息表 -->
        <!-- 分页 -->
        <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
        <!-- 分页 -->

        <el-dialog title="代理详情" :visible.sync="dialogFormVisible" size='' :close-on-click-modal="false"  top="5%">
            <agentDetail ref="detail" style="width: 920px" :detailCode="detailCode"></agentDetail>
        </el-dialog>
        <!-- <el-dialog :title="ope" :visible.sync="editDialog" size='' :close-on-click-modal="false"  top="20%">
            <el-form :model="form"  ref="ruleForm" label-width="80px" class="demo-ruleForm">
                <el-form-item label="咨询师：">
                    <el-select v-model="consult">
                        <el-option label="空" value=""></el-option>
                        <el-option v-for="(item,index) in consultList" :key="index" :label="item.serviceName" :value="item.code+'|'+item.serviceName"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div class="form_footer">
                <el-button type="primary" @click="sure">确定</el-button>
                <el-button  @click="cancel">取消</el-button>
            </div>
        </el-dialog> -->
        <el-dialog :title="ope" :visible.sync="editAddrDialog" size='' :close-on-click-modal="false"  top="20%">
            <el-form :model="form"  ref="ruleForm" label-width="80px" class="demo-ruleForm">
                <el-form-item label="省：">
                    <el-select v-model="form.province" style="width: 200px;" filterable>
                        <el-option v-for="item in detAddr" :label="item.name" :value="item.name"
                                   :key="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="市：">
                    <el-select v-model="form.city" style="width: 200px;" filterable>
                        <el-option v-for="item in cityList" :label="item.name" :value="item.name"
                                   :key="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="区：">
                    <el-select v-model="form.area" style="width: 200px;" filterable>
                        <el-option v-for="item in areaList" :label="item.name" :value="item.name"
                                   :key="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="详细地址：">
                    <el-input v-model="form.address" placeholder="" style="width: 250px;"></el-input>
                </el-form-item>
            </el-form>
            <div class="form_footer">
                <el-button type="primary" @click="addrSure">确定</el-button>
                <el-button  @click="cancel">取消</el-button>
            </div>
        </el-dialog>
        <el-dialog title="备注" :visible.sync="dailogEditMemo" size='' :close-on-click-modal="false"  top="20%">
            <el-form :model="form"  ref="ruleForm" label-width="80px" class="demo-ruleForm">
                <el-form-item label="备注：">
                    <el-input style="width:300px;" v-model="form.memo" type="textarea" :rows="4"></el-input>
                </el-form-item>
            </el-form>
            <div class="form_footer">
                <el-button type="primary" @click="editMemoSure">确定</el-button>
                <el-button  @click="dailogEditMemo=false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import "@/style/selfCommon.less"
    import Export from '@/components/export'
    import agentDetail from "./components/agentDetail.vue"
    import {GetBranchByConditions,GetBaseDataAll,GetBranchGradeAll,GetDropDownPermission,GetServiceManList,GetBranchShopList,ModifyShopTag,ModifyBranchMemo,
    ModifyMarketConsultant,ModifyBranchShopAddress} from "@/api/myData"
    import addr from '../../../../static/addresss.json'
    import { getCookie } from '../../../config/mUtils';
    export default {
        data() {
            return {
                exportLoading:false,
                userId:getCookie("userId"),
                ope:"修改咨询师",
                consult:'',
                hospitalList:"",
                loading:false,
                editDialog:false,
                editAddrDialog:false,
                dailogEditMemo:false,
                currentPage: 1,
                detailCode:"",
                dialogFormVisible: false,
                form: {
                    name:'',
                    region:'',
                    province:"",
                    city:"",
                    area:"",
                    address:"",
                    memo:'',
                },
                detAddr: [],
                cityList: [],
                areaList: [],
                total: 0,
                size: 10,
                date:"",
                formInline: {
                    branchName:'',
                    IsEnable:"",
                    hospital:'',
                    topBranch:'',
                    serviceName:'',
                },
                topBranchList:[],
                serviceList:[],
                consultList:[],//004
                tableData: [],
                allData:[],
                // tagsList:[],
            }
        },
        computed: {
            /* 导出报表参数 tHeader,filterVal,tableData1*/
            tHeader(){
                return ['店家编号', '店家名称','标签','店铺名称','店铺面积', '地址', '注册日期', '医院', '联系电话', '推荐人','所属销售公司', '店家状态','店家等级','服务商','是否结清','提成比例','备注']
            },
            filterVal(){
                return ['code', 'branchName' , 'branchTags','shopName','shopArea','address', 'registDate', 'hospitalName','phoneNumber','referrerName','topBranchName','isEnable','branchGradeName',
                'serviceName','isPayOff','expertRate','memo']
            },
            tableData1(){
                this.allData.forEach(ele=>{
                    ele.province = ele.province||''
                    ele.city = ele.city||''
                    ele.area = ele.area||''
                    ele.address = ele.address||''
                    ele.address = ele.province+ele.city+ele.area+ele.address
                    // ele.isEnable = ele.isEnable?'启用':'未启用'
                    // ele.consultantState = ele.consultantState?"在职":"离职"
                    ele.isPayOff = ele.isPayOff?'已结清':"未结清"
                })
                return this.allData
            },
            name(){
                return '分配店家'
            },
            /*导出报表参数 tHeader,filterVal,tableData1*/
        },
        mounted: function () {
           this.getBranchGradeAll()
           this.detAddr = addr.area
        },
        watch:{
            'form.province': {
                handler(curVal, oldVal){
                    this.cityList = []
                    this.form.city = ""
                    let len = this.detAddr.length
                    this.detAddr.forEach(data=> {
                        if (data.name == curVal) {
                            this.cityList = data.sub
                        }
                    })
                },
                deep: true
            },
            'form.city': {
                handler(curVal, oldVal){
                    this.form.area = ""
                    this.areaList = []
                    let len = this.cityList.length
                    this.cityList.forEach(data=> {
                        if (data.name == curVal) {
                            this.areaList = data.sub
                        }
                    })
                },
                deep: true
            },
        },

        methods: {
            editMemo(data,ope){
                this.ope = ope
                this.detailCode = data.id
                this.dailogEditMemo = true
            },
            async editMemoSure(){
                let res = await ModifyBranchMemo({
                    id:this.detailCode,
                    memo:this.form.memo
                })
                if(res.status){
                    this.$message({message: '修改成功', type: 'success'});
                    this.dailogEditMemo = false
                    this.getTableDate()
                    
                }else{
                    this.$message.error('修改失败'+res.errorMessage);
                }
            },
            tagChange(val){//修改店铺消费类型
                if(val.shopTag != val.tag){
                    this.$confirm('此操作将修改店家分类, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.ModifyShopTag({
                            Id:val.id,
                            ShopTag:val.shopTag
                        })
                    })
                }
            },
            async ModifyShopTag(params){
                let res = await ModifyShopTag(params)
                if(res.status){
                    this.$message({message: '修改成功', type: 'success'});
                    this.tableData.forEach(row=>{
                        row.tag = row.shopTag
                    })
                    this.tableData.push()
                }else{
                    this.$message.error('修改失败'+res.errorMessage);
                }
            },
            getAllData(){
                this.exportLoading = true
                this.GetBranchShopList({
                    Keywords: this.formInline.branchName.removeSP(),
                    pageIndex: 1,
                    pageSize: this.total,
                    IsEnabled:this.formInline.IsEnable,
                    TopBranchCode:this.formInline.topBranch,
                    hospitalCode:this.formInline.hospital,
                    serviceName:this.formInline.serviceName
                },'1')
            },
            editAddr(data,ope){
                this.ope = ope
                this.setForm(JSON.parse(JSON.stringify(data)))
                this.editAddrDialog = true
            },
            setForm(data){
                for(var key in data){
                    if(data[key] == null){
                        data[key] = ""
                    }
                }
                this.form.id = data.id
                setTimeout(()=>{this.form.province = data.province},20)
                setTimeout(()=>{this.form.city = data.city},40)
                setTimeout(()=>{this.form.area = data.area},60)
                // 处理数据库错乱的数据  
                let addr = data.address.split(",")
                if(addr.length<=1){
                    this.form.address = addr[0]
                }else{
                    this.form.address = addr[4]?addr[4]:''
                }
            },
            addrSure(){
                this.ModifyBranchShopAddress({
                    id:this.form.id,
                    province:this.form.province,
                    city:this.form.city,
                    area:this.form.area,
                    address:this.form.address
                })
            },

            // editMes(data,ope){
            //     this.ope = ope
            //     this.detailCode = data.code
            //     this.consultList = []
            //     this.serviceList.forEach(ele=>{
            //         if(ele.serTypeCode == '004'){
            //             this.consultList.push(ele)
            //         }
            //     })
            //     this.editDialog = true
            // },
            // 修改咨询师
            // async ModifyMarketConsultant(params){
            //     let res = await ModifyMarketConsultant(params)
            //     if(res.status){
            //         this.$message({message: '修改成功', type: 'success'});
            //         this.editDialog = false
            //         this.GetBranchShopList()
            //     }else{
            //         this.$message.error('修改失败'+res.errorMessage);
            //     }
            // },
            // 修改地址
            async ModifyBranchShopAddress(params){
                let res = await ModifyBranchShopAddress(params)
                if(res.status){
                    this.$message({message: '修改成功', type: 'success'});
                    this.editAddrDialog = false
                    this.GetBranchShopList()
                }else{
                    this.$message.error('修改失败'+res.errorMessage);
                }
            },
            sure(){
                this.ModifyMarketConsultant({
                    BranchCode:this.detailCode,
                    MarketConsultantCode:this.consult.length>0?this.consult.split("|")[0]:'',
                    MarketConsultantName:this.consult.length>0?this.consult.split("|")[1]:'',
                })
            },
            cancel(){
                this.editDialog = false
                this.editAddrDialog = false
            },
//            获取所有代理等级
            async getBranchGradeAll(){
                try{
                    let [res1,con,branchList] = await Promise.all([GetDropDownPermission({typeId: 1}),GetServiceManList(),GetDropDownPermission({typeId:"2"})])
                    this.topBranchList = branchList.data
                    this.formInline.topBranch = branchList.data[0].code
                    this.serviceList = con.data
                    this.hospitalList = res1.data
                    this.formInline.hospital = this.hospitalList[0].code
                }catch(err){
                    console.log(err)
                }
            },
//            条件查询
            async GetBranchShopList(params,ope){
                try{
                    let res = await GetBranchShopList(params)
                    if(ope){
                        this.allData = res.data
                        this.$refs.exportCom.handleDownload()
                        this.exportLoading = false
                    }else{
                        res.data.forEach(row=>{//用来规避翻页时 未修改标签tagChange事件自动触发 标签修改后需作同样处理
                            row.tag = row.shopTag
                        })
                        this.tableData = res.data
                    }
                    this.loading = false
                    this.total = res.count
                }catch(err){
                    console.log(err)
                }
            },

            dateSelect(val){
                if(val.length){
                    val = val.formatDates()
                    this.formInline.date1 = val.substring(0,10)
                    this.formInline.date2 = val.substring(13)
                }else{
                    this.formInline.date1 = ""
                    this.formInline.date2 = ""
                }
                this.onSubmit()
            },
            // 条件查询
            onSubmit() {
                console.log('submit!');
                this.currentPage = 1
                this.getTableDate()
            },

            // 分页页面展示数据条数改变触发事件
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.size = val
                this.getTableDate()
            },

            // 分页当前页码改变触发事件
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val
                this.getTableDate()
            },

            dialogOpe(index,status,isGet){
                this.dialogFormVisible[index] = status
                this.dialogFormVisible.push()
                if(isGet){
                    this.getTableDate()
                }
            },
         
            DetailMes(index,data){
                this.detailCode = data[index].code
                this.dialogFormVisible = true
            },

            getTableDate(index){
                this.loading = true
                
                this.GetBranchShopList({
                    Keywords: this.formInline.branchName.removeSP(),
                    pageIndex: this.currentPage,
                    pageSize: this.size,
                    IsEnabled:this.formInline.IsEnable,
                    hospitalCode:this.formInline.hospital,
                    TopBranchCode:this.formInline.topBranch,
                    serviceName:this.formInline.serviceName
                })
            },
        },
        components: {
            Export,
            // reportRead,
            agentDetail
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form_footer{
    margin-top: 10px;
}
</style>
