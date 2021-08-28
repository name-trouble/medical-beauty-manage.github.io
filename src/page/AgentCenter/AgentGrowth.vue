<template>
    <div class="AgentGrowth">
        <!-- 查询信息 -->
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px">
            <el-form-item label="时间范围：" style='margin-bottom:10px;font-size:12px !important;'>
                <el-date-picker v-model="formInline.date1" type="daterange" style='width:200px;'
                                placeholder="选择日期范围"></el-date-picker>
            </el-form-item>
            <el-form-item label="代理人：" class="form_item_mt10">
                <el-input v-model="formInline.user" placeholder="" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item label="代理等级：" class="form_item_mt10">
                <el-select v-model="formInline.user" placeholder="请选择" style='width:200px;'>
                    <el-option label="一级" value="一级"></el-option>
                    <el-option label="二级" value="二级"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="总业绩：" class="form_item_mt10">
                <el-input v-model="formInline.phone" placeholder="" style="width: 92px;"></el-input>
                <span style="display:inline-block;float:left;margin-right:5px;">-</span>
                <el-input v-model="formInline.phone" placeholder="" style="width: 92px;"></el-input>
            </el-form-item>
            <el-form-item label="区域：" class="form_item_mt10">
                <el-select v-model="formInline.region" placeholder="请选择" style='width:200px;'>
                    <el-option label="一级" value="一级"></el-option>
                    <el-option label="二级" value="二级"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="省份：" class="form_item_mt10">
                <el-select v-model="formInline.region" placeholder="请选择" style='width:200px;'>
                    <el-option label="一级" value="一级"></el-option>
                    <el-option label="二级" value="二级"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="城市：" class="form_item_mt10">
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
                <Export :tHeader="tHeader" :filterVal=' filterVal' :tableData1='DataExport' :name='name'></Export>
            </el-form-item>
        </el-form>
        <!-- 查询信息 -->

        <!-- 信息表 -->
        <ul>
            <li class="shelve" v-for="(item,index) in tab" :key="item" :class="{'active':currentIndex===index}" @click="select(index)">
                {{item}}
            </li>
        </ul>
        <!-- 全部信息表 -->
        <div v-show='currentIndex === 0 '>
            <el-table :data="tableData" border ref="multipleTable"
                      style="width: 100%;margin-top:10px;margin-bottom:10px;float: left" max-height="470">
                <el-table-column prop="date" label="代理" min-width="150"></el-table-column>
                <el-table-column prop="date" label="代理等级" min-width="150"></el-table-column>
                <el-table-column prop="date" label="地区" min-width="150"></el-table-column>
                <el-table-column prop="user" label="总业绩" min-width="150"></el-table-column>
                <el-table-column prop="phone" label="消费业绩" min-width="150"></el-table-column>
                <el-table-column prop="grade" label="推荐业绩" min-width="150"></el-table-column>
                <el-table-column prop="count" label="各渠道业绩" min-width="100"></el-table-column>
                <el-table-column prop="count" label="直播" min-width="100"></el-table-column>
                <el-table-column prop="count" label="微信" l-table-column></el-table-column>
                <el-table-column prop="count" label="微博" min-width="100"></el-table-column>
                <el-table-column prop="count" label="招商会" min-width="100"></el-table-column>
                <el-table-column prop="count" label="其他" min-width="100"></el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage4"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="4000">
                </el-pagination>
            </div>
        </div>

        <!-- 累计业绩与人数对比信息表 -->
        <div v-show="currentIndex == 1" style="width: 100%">
            <el-table :data="tableData1" border ref="multipleTable" style="width: 460px;margin-top:10px;margin-bottom:10px;float: left" height="470">
                <el-table-column prop="date" label="提交日期" min-width="150"></el-table-column>
                <el-table-column prop="date" label="累计业绩" min-width="150"></el-table-column>
                <el-table-column prop="date" label="代理人数" min-width="150"></el-table-column>
            </el-table>
            <div style=";width:50%;min-width: 500px;float: left;margin-left: 20px">
                <!--<div class="mes-tit">累计业绩与人数对比趋势图</div>-->
                <ECharts :options="polar" ref="chart" style="height: 400px;"></ECharts>
            </div>
        </div>


        <!-- 业绩类型对比信息表 -->
        <div v-show="currentIndex == 2">
            <el-table :data="tableData2" border ref="multipleTable" style="width: 610px;margin-top:10px;margin-bottom:10px;float: left" height="470">
                <el-table-column prop="date" label="提交日期" min-width="150"></el-table-column>
                <el-table-column prop="date" label="总业绩" min-width="150"></el-table-column>
                <el-table-column prop="date" label="消费业绩" min-width="150"></el-table-column>
                <el-table-column prop="date" label="推荐业绩" min-width="150"></el-table-column>
            </el-table>
            <div style="width: 720px;float: left;margin:10px 0 0 20px">
                <!--<div class="mes-tit">累计业绩与人数对比趋势图</div>-->
                <div class="chart_container" style="width: 600px;float: left;">
                    <ECharts :options="polar1" ref="chart" style="height: 430px;float: left"></ECharts>
                </div>
                <el-select  class="chart_select" v-model="value" placeholder="选择条件">
                    <el-option label="日" value="日"></el-option>
                    <el-option label="月" value="月"></el-option>
                </el-select>
            </div>
        </div>
        <!-- 信息表 -->

        <!--渠道业绩对比-->
        <div v-show="currentIndex == 3">
            <div style="width: 760px;float: left;margin:10px 0 0 0">
                <div class="chart_container" style="width: 680px;float: left;">
                    <ECharts :options="polar2" ref="chart" style="width:680px;height: 330px;float: left"></ECharts>
                </div>
                <el-select class="chart_select" v-model="value" placeholder="选择条件">
                    <el-option label="日" value="日"></el-option>
                    <el-option label="月" value="月"></el-option>
                </el-select>
            </div>
            <div style="width: 420px;float: left;margin:10px 0 0 0">
                <div class="chart_container" style="width: 380px;float: left;">
                    <ECharts :options="polar3" ref="chart" style="width:380px;height: 330px;float: left"></ECharts>
                </div>
            </div>
            <el-table :data="tableData3" border ref="multipleTable" style="width:900px;margin-top:10px;margin-bottom:10px;float: left" max-height="470">
                <el-table-column prop="date" label="提交日期" min-width="120"></el-table-column>
                <el-table-column prop="date" label="总业绩" min-width="120"></el-table-column>
                <el-table-column prop="date" label="直播" min-width="120"></el-table-column>
                <el-table-column prop="date" label="微博" min-width="120"></el-table-column>
                <el-table-column prop="date" label="微信" min-width="120"></el-table-column>
                <el-table-column prop="date" label="招商会" min-width="120"></el-table-column>
                <el-table-column prop="date" label="其他" min-width="120"></el-table-column>
            </el-table>
        </div>
        <!--渠道业绩对比-->
    </div>
</template>

<script>
    // import ECharts from 'vue-echarts/components/ECharts.vue' //----体积较大，建议挪出去
    // import 'echarts/lib/chart/bar'
    // import 'echarts/lib/chart/line'
    // import 'echarts/lib/chart/pie'
    // import 'echarts/lib/chart/map'
    // import 'echarts/lib/chart/radar'
    // import 'echarts/lib/chart/scatter'
    // import 'echarts/lib/chart/effectScatter'
    // import 'echarts/lib/component/tooltip'
    // import 'echarts/lib/component/polar'
    // import 'echarts/lib/component/geo'
    // import 'echarts/lib/component/legend'
    // import 'echarts/lib/component/title'
    // import 'echarts/map/js/china.js'
    // import 'echarts/lib/component/visualMap'
    import Export from '../../components/excel-export'

    export default {
        // name: 'AgentGrowth',
        data() {
            return {
                options: ["年", "月", "日"],
                value: '',
                tab: ["代理业绩汇总", "累计业绩与人数对比", "业绩类型对比", "渠道业绩对比"],
                currentIndex: 0,
                currentPage4: 1,
                // 查询条件数据绑定
                formInline: {
                    date1: '',
                    date2: '',
                    user: '',
                    grade: '',
                    phone: '',
                    province: '',
                    resource: '全部'
                },
                tableData: [],
                tableData1: [
                    {
                        date: '2016-05-02',
                        user: '旺旺',
                        address: '上海市普陀区金沙江路 1518 弄',
                        region: '招商会',
                        grade: '三级代理',
                        phone: '123456789120',
                        count: '1200',
                        provice: '宇宙省',
                        resource: '招商会',
                        bankCard: '12345678',
                        email: '18348',
                        IDcard: '12345',
                        OpenBankCode: '西湖区文一西路西湖分行'
                    },
                    {
                        date: '2016-05-02',
                        user: '旺旺',
                        address: '上海市普陀区金沙江路 1518 弄',
                        region: '招商会',
                        grade: '三级代理',
                        phone: '123456789120',
                        count: '1200',
                        provice: '宇宙省',
                        resource: '招商会',
                        bankCard: '12345678',
                        email: '18348',
                        IDcard: '12345',
                        OpenBankCode: '西湖区文一西路西湖分行'
                    },
                ],
                tableData2: [
                    {
                        date: '2016-05-02',
                        user: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄',
                        region: '招商会',
                        grade: '三级代理',
                        phone: '123456789120',
                        count: '1200',
                        provice: '宇宙省',
                        resource: '招商会',
                        bankCard: '12345678',
                        email: '18348',
                        IDcard: '12345',
                        OpenBankCode: '西湖区文一西路西湖分行'
                    },
                    {
                        date: '2016-05-02',
                        user: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄',
                        region: '招商会',
                        grade: '三级代理',
                        phone: '123456789120',
                        count: '1200',
                        provice: '宇宙省',
                        resource: '招商会',
                        bankCard: '12345678',
                        email: '18348',
                        IDcard: '12345',
                        OpenBankCode: '西湖区文一西路西湖分行'
                    },
                ],
                tableData3: [
                    {
                        date: '2016-05-02',
                        user: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄',
                        region: '招商会',
                        grade: '三级代理',
                        phone: '123456789120',
                        count: '1200',
                        provice: '宇宙省',
                        resource: '招商会',
                        bankCard: '12345678',
                        email: '18348',
                        IDcard: '12345',
                        OpenBankCode: '西湖区文一西路西湖分行'
                    },
                    {
                        date: '2016-05-02',
                        user: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄',
                        region: '招商会',
                        grade: '三级代理',
                        phone: '123456789120',
                        count: '1200',
                        provice: '宇宙省',
                        resource: '招商会',
                        bankCard: '12345678',
                        email: '18348',
                        IDcard: '12345',
                        OpenBankCode: '西湖区文一西路西湖分行'
                    },
                ],
                polar: {
                    title: {
                        text: '累计业绩与人数对比趋势图',
                        x: 'center',
                        align: 'right'
                    },
                    grid: {
                        bottom: 80
                    },
                    toolbox: {
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            animation: false,
                            label: {
                                backgroundColor: '#505765'
                            }
                        }
                    },
                    legend: {
                        data: ['累计业绩', '代理人数'],
                        x: 'left'
                    },
                    dataZoom: [
                        {
                            show: true,
                            realtime: true,
                            start: 0,
                            end: 100
                        },
                        {
                            type: 'inside',
                            realtime: true,
                            start: 0,
                            end: 100
                        }
                    ],
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            axisLine: {onZero: false},
                            data: [
                                "2014", "2015", "2016",
                                "2017", "2018", "2019"
                            ].map(function (str) {
                                return str.replace(' ', '\n')
                            })
                        }
                    ],
                    yAxis: [
                        {
                            name: '累计业绩（万元）',
                            type: 'value',
                        },
                        {
                            name: '代理人数（人）',
                            nameLocation: 'end',
                            type: 'value',
                            inverse: false
                        }
                    ],
                    series: [
                        {
                            name: '累计业绩',
                            type: 'line',
                            animation: false,
                            smooth: true,
                            lineStyle: {
                                normal: {
                                    width: 1
                                }
                            },

                            data: [
                                600, 500, 540, 480, 600, 530, 700
                            ]
                        },
                        {
                            name: '代理人数',
                            type: 'line',
                            yAxisIndex: 1,
                            smooth: true,
                            animation: false,

                            lineStyle: {
                                normal: {
                                    width: 1
                                }
                            },

                            data: [
                                5, 8, 6, 4, 5, 7,
                            ]
                        }
                    ]
                },
                polar1: {
                    title: {
                        text: '业绩类型对比趋势图',
                        x: "left"
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    legend: {
                        data: ['总业绩', '消费业绩', '推荐业绩'],
                        x: 'center'
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                        }
                    ],
                    yAxis: [
                        {
                            name: '业绩（万元）',
                            type: 'value',
                        }
                    ],
                    series: [
                        {
                            name: '总业绩',
                            type: 'line',
                            stack: '总量',
                            smooth: true,
                            areaStyle: {normal: {}},
                            data: [120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name: '消费业绩',
                            type: 'line',
                            stack: '总量',
                            smooth: true,
                            areaStyle: {normal: {}},
                            data: [220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name: '推荐业绩',
                            type: 'line',
                            stack: '总量',
                            smooth: true,
                            areaStyle: {normal: {}},
                            data: [150, 232, 201, 154, 190, 330, 410]
                        },
                    ]
                },
                polar2: {
                    title: {
                        text: '渠道业绩对比趋势图',
                        x: "left"
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    legend: {
                        data: ['直播', '微博', '微信', "招商会", "其他"],
                        x: 'center'
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                        }
                    ],
                    yAxis: [
                        {
                            name: '累计业绩（万元）',
                            type: 'value',
                        }
                    ],
                    series: [
                        {
                            name: '直播',
                            type: 'line',
                            stack: '总量',
                            smooth: true,
                            data: [120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name: '微博',
                            type: 'line',
                            stack: '总量',
                            smooth: true,
                            data: [220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name: '微信',
                            type: 'line',
                            stack: '总量',
                            smooth: true,
                            data: [150, 232, 201, 154, 190, 330, 410]
                        },
                        {
                            name: '招商会',
                            type: 'line',
                            stack: '总量',
                            smooth: true,
                            data: [452, 325, 412, 512, 324, 330, 526]
                        },
                        {
                            name: '其他',
                            type: 'line',
                            stack: '总量',
                            smooth: true,
                            data: [532, 368, 339, 421, 401, 441, 410]
                        },
                    ]
                },
                polar3: {
                    title: {
                        text: '渠道业绩占比',
                        x: 'left'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'right',
                        data: ['直播', '微博', '微信', '招商会', '其他']
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: [
                                {value: 335, name: '直播'},
                                {value: 310, name: '微博'},
                                {value: 234, name: '微信'},
                                {value: 135, name: '招商会'},
                                {value: 1548, name: '其他'}
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                }
            }
        },
        computed: {
            /* 导出报表参数 tHeader,filterVal,tableData1*/
            tHeader(){
                return ['商品编号', '商品名称', '分类', '供方', '售价', '积分抵现', '提交']
            },
            filterVal(){

                if (this.currentIndex == 1) {
                    return ['date', 'user', 'address', 'region', 'grade']
                }
                if (this.currentIndex == 2) {
                    return ['date', 'user', 'address', 'region', 'grade']
                }
            },
            DataExport(){
                if (this.currentIndex == 1) {
                    return this.tableData2
                }
                if (this.currentIndex == 2) {
                    return this.tableData3
                }

            },
            name(){
                if (this.currentIndex == 1) {
                    return '已上架信息表'
                }
                if (this.currentIndex == 2) {
                    return '未上架信息表'
                }
            }
            /*导出报表参数 tHeader,filterVal,tableData1*/

        },
        created: function () {

        },
        methods: {
            // 条件查询
            onSubmit() {
                // 时间格式转化
                var date1 = this.formatDate(this.formInline.date1)
                var date2 = this.formatDate(this.formInline.date2)
            },
            // 分页页面展示数据条数改变触发事件
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            // 分页当前页码改变触发事件
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },

            // 单个上下架操作
            deleteRow (index, rows, operate) {
                var tit = ""
                var mes = ""
                if (operate === 'down') {
                    // 下架操作
                    tit = "下架"
                    mes = "下架成功！"

                } else {
                    // 上架操作
                    tit = "上架"
                    mes = "上架成功！"
                }
                const h = this.$createElement;
                this.$msgbox({
                        title: tit,
                        message: h('div', null, [
                            h('p', {style: 'line-height: 36px'}, '商品名称：  ' + rows[index].name),
                            h('p', {style: 'line-height: 36px'}, '库存数量： ' + rows[index].date)
                        ]),
                        showCancelButton: true,
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        beforeClose: (action, instance, done) => {
                        if (action === 'confirm')
                {
                    instance.confirmButtonLoading = true;
                    instance.confirmButtonText = '执行中...';
                    setTimeout(() => {
                        done();
                    setTimeout(() => {
                        instance.confirmButtonLoading = false;
                    rows.splice(index, 1);
                    this.$message({
                        type: 'success',
                        message: mes
                    });
                },300);
                },300);
                }
            else{
                    done();
                }
            }
            })
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
            select (num) {
                this.currentIndex = num
                // this.multipleSelection = []
                // 调用借口查询切换信息

            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSelectionChange1(val) {
                this.multipleSelection1 = val;
            },
            //批量上下架
            toggleSelection(ope) {
                if (ope == 'down') {
                    // 下架商品对象集合 this.multipleSelection
                    console.log(this.multipleSelection)
                } else {
                    // 未上架商品对象集合 this.multipleSelection1
                    console.log(this.multipleSelection1)
                }
            },
            view(){

            }
        },
        components: {
            Export,
            ECharts
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .AgentGrowth {
        font-size: 12px;
    }

    .block {
        float: right;
    }

    .shelve {
        display: inline-block;
        width: 132px;
        height: 36px;
        line-height: 36px;
        font-size: 12px;
        color: #333;
        text-align: center;
        cursor: pointer;
        margin-top: 10px;
        border-radius: 3px;
        margin-right: 3px;
    }

    .shelve.active {
        color: #fff;
        background: #20a0ff;
    }

    .shelve:hover {
        color: #fff;
        background: #4db3ff;
    }

    tr:nth-child(1) td:nth-child(12) .rank {
        color: red !important;
    }

    tr:nth-child(2) td:nth-child(12) .rank {
        color: green !important;
    }

    .chart_container {
        float: left;
        margin-left: 20px;
        border: 1px solid #dfe6ec;
        padding: 20px;
    }

    .chart_select {
        z-index: 100;
        width: 100px;
        float: left;
        margin-left: -120px;
        margin-top: 20px
    }
</style>
