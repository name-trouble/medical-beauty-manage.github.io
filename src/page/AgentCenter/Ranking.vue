<template>
    <div class="Ranking">
        <!-- 查询信息 -->
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px">
            <el-form-item label="时间范围" style='margin-bottom:10px;font-size:12px !important;'>
                <el-date-picker v-model="formInline.date1" type="daterange" style='width:200px;'
                                placeholder="选择日期范围"></el-date-picker>
            </el-form-item>
            <el-form-item label="排名区间" class="form_item_mt10">
                <el-input v-model="formInline.phone" placeholder="" style="width: 92px;"></el-input>
                <span style="display:inline-block;float:left;margin-right:5px;">-</span>
                <el-input v-model="formInline.phone" placeholder="" style="width: 92px;"></el-input>
            </el-form-item>
            <el-form-item label="业绩区间" class="form_item_mt10">
                <el-input v-model="formInline.phone" placeholder="" style="width: 92px;"></el-input>
                <span style="display:inline-block;float:left;margin-right:5px;">-</span>
                <el-input v-model="formInline.phone" placeholder="" style="width: 92px;"></el-input>
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
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;"  :summary-method="getSummaries" show-summary max-height="460">
            <el-table-column
                type="index"
                label="排名"
                width="50">
            </el-table-column>
            <el-table-column
                prop="date"
                label="代理人"
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
                label="团队总人数"
                width="120">
            </el-table-column>
            <el-table-column
                prop="grade"
                label="消费业绩"
                width="120">
            </el-table-column>
            <el-table-column
                prop="num"
                label="推荐业绩"
                width="100">
            </el-table-column>
            <el-table-column
                prop="grade"
                sortable
                label="合计"
                width="100">
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
        // name: 'Ranking',
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
                    grade: '10',
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
                return ['排名','代理人', '代理等级', '区域', '省份', '城市', '直推代理数', '团队总人数','消费业绩','推荐业绩','合计']
            },
            filterVal(){
                return ['date', 'user', 'address', 'region', 'grade']
            },
            tableData1(){
                return this.tableData
            },
            name(){
                return '总排名'
            },
            /*导出报表参数 tHeader,filterVal,tableData1*/
        },
        created: function () {
            
        },
        methods: {
            // 条件查询
            onSubmit() {
               
                // 时间格式转化
                var date1 = this.formatDate(this.formInline.date1[0])
                var date2 = this.formatDate(this.formInline.date1[1])
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
                if(!isNaN(this.form.money)&&this.form.money != ""){
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
            },
//            合计
            getSummaries(param) {
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                    sums[index] = '总价';
                    return;
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr);
                    if (!isNaN(value)) {
                        return prev.add(curr) ;
                    } else {
                        return prev;
                    }
                }, 0);
                    sums[index] = sums[index].toQFW() ;
                } else {
                    sums[index] = '';
                }
            });
                return sums;
            }
        },
        components: {
            Export
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .Ranking {
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
