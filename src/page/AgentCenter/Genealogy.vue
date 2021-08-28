<template>
    <div class="Genealogy">
        <!-- 查询信息 -->
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px">
            <el-form-item label="时间范围" style='margin-bottom:10px;font-size:12px !important;'>
                <el-date-picker v-model="formInline.date1" type="daterange" style='width:200px;'
                                placeholder="选择日期范围"></el-date-picker>
            </el-form-item>
            <el-form-item label="代理人" class="form_item_mt10">
                <el-input v-model="formInline.user" placeholder="" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item label="代理等级" class="form_item_mt10">
                <el-select v-model="formInline.region" placeholder="请选择" style='width:200px;'>
                    <el-option label="一级" value="一级"></el-option>
                    <el-option label="二级" value="二级"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="区域" class="form_item_mt10">
                <el-select v-model="formInline.region" placeholder="请选择" style='width:200px;'>
                    <el-option label="一级" value="一级"></el-option>
                    <el-option label="二级" value="二级"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="省份" class="form_item_mt10">
                <el-select v-model="formInline.region" placeholder="请选择" style='width:200px;'>
                    <el-option label="一级" value="一级"></el-option>
                    <el-option label="二级" value="二级"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="城市" class="form_item_mt10">
                <el-select v-model="formInline.region" placeholder="请选择" style='width:200px;'>
                    <el-option label="一级" value="一级"></el-option>
                    <el-option label="二级" value="二级"></el-option>
                </el-select>
            </el-form-item>
            <br/>
            <el-form-item label="    " class="form_item_mt10">
                <el-button type="primary" @click="onSubmit" style='background:#cda382;
border-radius:2px;color:#fff;border-color:#d6d4d4'>查询
                </el-button>
                <Export :tHeader="tHeader" :filterVal=' filterVal' :tableData1='tableData1' :name='name'></Export>
            </el-form-item>
        </el-form>
        <!-- 查询信息 -->

        <!-- 信息表 -->
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" max-height="460">
            <el-table-column
                prop="date"
                label="代理编号"
                min-width="120">
            </el-table-column>
            <el-table-column
                prop="date"
                label="姓名"
                min-width="120">
            </el-table-column>
            <el-table-column
                prop="name"
                label="代理等级"
                min-width="120">
            </el-table-column>
            <el-table-column
                prop="phone"
                label="区域"
                min-width="100">
            </el-table-column>
            <el-table-column
                prop="grade"
                label="省份"
                width="120">
            </el-table-column>
            <el-table-column
                prop="grade"
                label="城市"
                min-width="100">
            </el-table-column>
            <el-table-column
                prop="grade"
                label="直推代理数"
                width="80">
            </el-table-column>
            <el-table-column
                prop="grade"
                label="注册时间"
                width="120">
            </el-table-column>
            <el-table-column
                prop="grade"
                label="最近一次提成时间"
                width="120">
            </el-table-column>
            <el-table-column
                prop="grade"
                label="基金卡余额"
                width="100">
            </el-table-column>
            <el-table-column
                prop="grade"
                label="消费券余量"
                width="100">
            </el-table-column>
            <el-table-column
                prop="grade"
                label="提成未取额"
                width="100">
            </el-table-column>
            <el-table-column
                prop="grade"
                label="联系电话"
                width="120">
            </el-table-column>
        </el-table>
        <!-- 信息表 -->

        <!-- 分页 -->
        <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
        <!-- 分页 -->

    </div>
</template>

<script>
    import Export from '../../components/excel-export'

    export default {
        // name: 'Genealogy',
        data() {
            return {
                currentIndex: 1,
                currentPage4: 1,
                formLabelWidth: '90px',
                total: 4000,
                size: 100,
                formInline: {
                    date1: '',
                    date2: '',
                    user: '',
                    grade: '',
                    phone: '',
                    province: '',
                    resource: '全部'
                },
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    region: '招商会',
                    grade: '三级代理',
                    phone: '波士邦女',
                    IDcard: '12345',
                    num:'10'
                }, {
                    date: '2016-05-04',
                    name: '王大虎',
                    address: '上海市普陀区金沙江路 1517 弄',
                    num:'10'
                }, {
                    date: '2016-05-01',
                    name: '王二虎',
                    address: '上海市普陀区金沙江路 1519 弄',
                    num:'10'
                }, {
                    date: '2016-05-03',
                    name: '王三虎',
                    address: '上海市普陀区金沙江路 1516 弄',
                    num:'10'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
            }
        },
        computed: {
            /* 导出报表参数 tHeader,filterVal,tableData1*/
            tHeader(){
                return ['代理编号','姓名', '代理等级', '区域', '省份', '城市', '直推代理数', '注册时间','最近一次提成时间','基金卡余额','消费券余量','提成未取额','联系电话']
            },
            filterVal(){
                return ['date', 'user', 'address', 'region', 'grade']
            },
            tableData1(){
                return this.tableData
            },
            name(){
                return '代理系谱'
            },
            /*导出报表参数 tHeader,filterVal,tableData1*/
        },
        created: function () {
            // console.log(this)
        },
        methods: {
            // 条件查询
            onSubmit() {
                console.log('submit!');
                // 时间格式转化
                var date1 = this.formatDate(this.formInline.date1[0])
                var date2 = this.formatDate(this.formInline.date1[1])

                console.log(date1, date2, this.formInline.user, this.formInline.grade, this.formInline.phone, this.formInline.province, this.formInline.resource)
            },

            // 分页页面展示数据条数改变触发事件
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },

            // 分页当前页码改变触发事件
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },

            // 打开修改窗口
            handleClick (index,tableData) {
                this.dialogFormVisible = true
                this.form = JSON.parse(JSON.stringify(tableData[index]))
                this.form.money=""
            },

            // 弹框确定
            sure (){
                // console.log(this.form1.radio)
                if(!isNaN(this.form.money)&&this.form.money != ""){
//                    console.log(typeof this.form.money)
                    this.dialogFormVisible = false
                    this.dialogFormVisible1 = true
                }else{
                    if (this.form.money == ""){
                        var mes = "充值金额不能为空"
                    }else{
                        var mes = "充值金额必须为数字"
                    }
                    this.$alert(mes, '提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    });
                }
            },
            sure1(){
                this.dialogFormVisible1 = false
                this.formReset(this.form)
            },
//            取消
            cancel () {
                this.dialogFormVisible = false
                this.dialogFormVisible1 = false
                this.formReset(this.form)
            },
            // 时间格式转化
            formatTen (num) {
                return num > 9 ? (num + "") : ("0" + num)
            },

            formatDate(date) {
                if (date === '') {
                    return ''
                } else {
                    var year = date.getFullYear();
                    var month = date.getMonth() + 1;
                    var day = date.getDate();
                    // var hour = date.getHours();
                    // var minute = date.getMinutes();
                    // var second = date.getSeconds();
                    return year + "-" + this.formatTen(month) + "-" + this.formatTen(day);
                }
            },
            formReset (formName) {
                for (var p in formName) {
                    formName[p] = ""
                }
            }
        },
        components: {
            Export
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .Genealogy {
        font-size: 12px;
    }

    .block {
        float: right;
    }

    .inventory {
        margin-bottom: 10px;
    }
    .mt10{
        margin-bottom: 10px;
    }
    .mt0{
        margin-bottom: 0px;
    }
</style>
