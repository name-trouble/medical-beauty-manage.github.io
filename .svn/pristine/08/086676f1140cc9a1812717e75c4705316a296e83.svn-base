<template>
    <div class="ProxyPortrait">
        <!-- 查询信息 -->
        <el-form :inline="true" :model="formInline" class="demo-form-inline form_search" label-width="80px" >
            <el-form-item label="时间范围" style='margin-bottom:10px;font-size:12px !important;'>
                <el-date-picker v-model="formInline.date1" type="daterange" style='width:200px;'
                                placeholder="选择日期范围"></el-date-picker>
            </el-form-item>
            <el-form-item label="代理人" class="form_item_mt10">
                <el-input v-model="formInline.user" placeholder="" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item label="总业绩" class="form_item_mt10">
                <el-input v-model="formInline.phone" placeholder="" style="width: 92px;"></el-input>
                <span style="display:inline-block;float:left;margin-right:5px;">-</span>
                <el-input v-model="formInline.phone" placeholder="" style="width: 92px;"></el-input>
            </el-form-item>
            <el-form-item label="代理等级" class="form_item_mt10">
                <el-select v-model="formInline.user" placeholder="请选择" style='width:200px;'>
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
                <!--<Export :tHeader="tHeader" :filterVal=' filterVal' :tableData1='tableData1' :name='name'></Export>-->
            </el-form-item>
        </el-form>
        <!-- 查询信息 -->
        <!-- <div>工查询出{{}}人</div> -->
    <!--     信息表
        <el-table :data="tableData" border style="width: 100%;margin-top:15px;margin-bottom:10px;" max-height="460">
            <el-table-column
                prop="date"
                label="代理人"
                min-width="120">
            </el-table-column>
            <el-table-column
                prop="代理等级"
                label="姓名"
                min-width="120">
            </el-table-column>
            <el-table-column
                prop="name"
                label="直推代理数"
                min-width="120">
            </el-table-column>
            <el-table-column
                prop="phone"
                label="团队总人数"
                min-width="100">
            </el-table-column>
            <el-table-column
                prop="grade"
                label="注册时间"
                width="120">
            </el-table-column>
            <el-table-column
                prop="grade"
                label="最近产生业绩时间"
                min-width="100">
            </el-table-column>
            <el-table-column
                prop="grade"
                label="历史业绩累计"
                width="80">
            </el-table-column>
            <el-table-column
                prop="grade"
                label="联系电话"
                width="120">
            </el-table-column>
            <el-table-column
                prop="grade"
                label="推荐人"
                width="120">
            </el-table-column>
        </el-table>
         信息表 -->
        <el-row :gutter="10">
            <el-col :xs="24" :sm="24" :md="10" :lg="10">
                <div class="chart_container">
                    <div style="width: 380px;margin: 0 auto">
                        <ECharts :options="polar" ref="chart" style="width:380px;height: 330px;"></ECharts>
                    </div>
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="14" :lg="12">
                <div class="chart_container">
                    <div style="width: 580px;margin: 0 auto">
                        <EChartsart :options="polar3" ref="chart" style="width:580px;height: 330px;"></EChartsart>
                    </div>
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="22">
                <div class="chart_container" >
                    <div style="width: 580px;margin: 0 auto">
                        <ECharts :options="polar2" ref="chart" style="width:580px;height: 330px;"></ECharts>
                    </div>
                    <ul>
                        li
                    </ul>
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="10" :lg="10">
                <div class="chart_container">
                    <div style="width: 380px;margin: 0 auto">
                        <ECharts :options="polar1" ref="chart" style="width:380px;height: 330px;"></ECharts>
                    </div>
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="10" :lg="12">
                <div class="chart_container" >
                    <div style="width: 480px;margin: 0 auto">
                        <ECharts :options="polar4" ref="chart" style="width:480px;height: 330px;"></ECharts>
                    </div>
                </div>
            </el-col>
        </el-row>
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
        // name: 'ProxyPortrait',
        data() {
            return {
                province: [
                    {name: '北京', value: this.randomData()},
                    {name: '天津', value: this.randomData()},
                    {name: '上海', value: this.randomData()},
                    {name: '重庆', value: this.randomData()},
                    {name: '河北', value: this.randomData()},
                    {name: '河南', value: this.randomData()},
                    {name: '云南', value: this.randomData()},
                    {name: '辽宁', value: this.randomData()},
                    {name: '黑龙江', value: this.randomData()},
                    {name: '湖南', value: this.randomData()},
                    {name: '安徽', value: this.randomData()},
                    {name: '山东', value: this.randomData()},
                    {name: '新疆', value: this.randomData()},
                    {name: '江苏', value: this.randomData()},
                    {name: '浙江', value: this.randomData()},
                    {name: '江西', value: this.randomData()},
                    {name: '湖北', value: this.randomData()},
                    {name: '广西', value: this.randomData()},
                    {name: '甘肃', value: this.randomData()},
                    {name: '山西', value: this.randomData()},
                    {name: '内蒙古', value: this.randomData()},
                    {name: '陕西', value: this.randomData()},
                    {name: '吉林', value: this.randomData()},
                    {name: '福建', value: this.randomData()},
                    {name: '贵州', value: this.randomData()},
                    {name: '广东', value: this.randomData()},
                    {name: '青海', value: this.randomData()},
                    {name: '西藏', value: this.randomData()},
                    {name: '四川', value: this.randomData()},
                    {name: '宁夏', value: this.randomData()},
                    {name: '海南', value: this.randomData()},
                    {name: '台湾', value: this.randomData()},
                    {name: '香港', value: this.randomData()},
                    {name: '澳门', value: this.randomData()}
                ],
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
                polar: {
                    title: {
                        text: '代理来源占比',
                        x: 'left'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        right: 'right',
                        data: ['项目', '招商会', '推荐']
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: ['40%', '70%'],
                            center: ['50%', '60%'],
                            data: [
                                {value: 335, name: '项目'},
                                {value: 135, name: '招商会'},
                                {value: 1548, name: '推荐'}
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
                },
                polar1: {
                    title: {
                        text: '年龄分布',
                        x: 'left'
                    },
                    color: ['#3398DB'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
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
                            splitNumber: 2,
                            scale: true,
                            splitLine: {
                                show: false
                            },
                            type: 'category',
                            data: ['18~22', '22~26', '26~30', '30~35', '35~40', '40已上'],
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            show: false,
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '人数',
                            type: 'bar',
                            barWidth: '60%',
                            data: [10, 52, 200, 334, 390, 330]
                        }
                    ]
                },
                polar2: {
                    title: {
                        text: '地域分布',
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b}<br/>{c}'
                    },
                    toolbox: {
                        show: true,
                        orient: 'vertical',
                        left: 'right',
                        top: 'center',
                        feature: {
                            dataView: {readOnly: false},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    visualMap: {
                        min: 0,
                        max: 2500,
                        left: 'left',
                        top: 'bottom',
                        text: ['高', '低'],           // 文本，默认为数值文本
                        calculable: true,
                        inRange: {
                            color: ['lightskyblue', 'yellow', 'orangered']
                        }
                    },
                    series: [
                        {
                            name: '地域分布',
                            type: 'map',
                            mapType: 'china', // 自定义扩展图表类型
                            itemStyle: {
//                                normal:{label:{show:true}},
//                                emphasis:{label:{show:true}}
                            },
                            data: [
                                {name: '北京', value: this.randomData()},
                                {name: '天津', value: this.randomData()},
                                {name: '上海', value: this.randomData()},
                                {name: '重庆', value: this.randomData()},
                                {name: '河北', value: this.randomData()},
                                {name: '河南', value: this.randomData()},
                                {name: '云南', value: this.randomData()},
                                {name: '辽宁', value: this.randomData()},
                                {name: '黑龙江', value: this.randomData()},
                                {name: '湖南', value: this.randomData()},
                                {name: '安徽', value: this.randomData()},
                                {name: '山东', value: this.randomData()},
                                {name: '新疆', value: this.randomData()},
                                {name: '江苏', value: this.randomData()},
                                {name: '浙江', value: this.randomData()},
                                {name: '江西', value: this.randomData()},
                                {name: '湖北', value: this.randomData()},
                                {name: '广西', value: this.randomData()},
                                {name: '甘肃', value: this.randomData()},
                                {name: '山西', value: this.randomData()},
                                {name: '内蒙古', value: this.randomData()},
                                {name: '陕西', value: this.randomData()},
                                {name: '吉林', value: this.randomData()},
                                {name: '福建', value: this.randomData()},
                                {name: '贵州', value: this.randomData()},
                                {name: '广东', value: this.randomData()},
                                {name: '青海', value: this.randomData()},
                                {name: '西藏', value: this.randomData()},
                                {name: '四川', value: this.randomData()},
                                {name: '宁夏', value: this.randomData()},
                                {name: '海南', value: this.randomData()},
                                {name: '台湾', value: this.randomData()},
                                {name: '香港', value: this.randomData()},
                                {name: '澳门', value: this.randomData()}
                            ],
                            // 自定义名称映射
//                            nameMap: {
//                                'Central and Western': '中西区',
//                                'Eastern': '东区',
//                                'Islands': '离岛',
//                                'Kowloon City': '九龙城',
//                                'Kwai Tsing': '葵青',
//                                'Kwun Tong': '观塘',
//                                'North': '北区',
//                                'Sai Kung': '西贡',
//                                'Sha Tin': '沙田',
//                                'Sham Shui Po': '深水埗',
//                                'Southern': '南区',
//                                'Tai Po': '大埔',
//                                'Tsuen Wan': '荃湾',
//                                'Tuen Mun': '屯门',
//                                'Wan Chai': '湾仔',
//                                'Wong Tai Sin': '黄大仙',
//                                'Yau Tsim Mong': '油尖旺',
//                                'Yuen Long': '元朗'
//                            }
                        }
                    ]
                },
                polar3:  {
                    title: {
                        text: '业绩分布',
                    },
                    color: ['#3398DB'],

                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },

                    grid: { // 控制图的大小，调整下面这些值就可以，
                        x: 40,
                        x2: 120,
                        y2: 50,// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
                    },
                    xAxis : [
                        {
                            name:"业绩（万元）",
                            type : 'category',
                            data: ['0', '0-50', '50-100', '100-150', '150-200', '20以已上'],
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis : [
                        {
                            name:"代理人数(人)",
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'直接访问',
                            type:'bar',
                            barWidth: '40%',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'outside'
                                }
                            },
                            data:[10, 52, 200, 334, 390, 330]
                        }
                    ]
                },
                polar4: {
                    title: {
                        text: '学历分布',
                    },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        x : 'center',
                        y : 'bottom',
                        data: ['未知', '初中','高中','本科','硕士',"博士"]
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis:  {
                        show:false,
                        type: 'value'
                    },
                    yAxis: {
                        show:false,
                        type: 'category',
                        data: []
                    },
                    grid: { // 控制图的大小，调整下面这些值就可以，
                        x: 10,
                        x2: 0,
                        y:150,
                        y2: 250,// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
                    },
                    series: [
                        {
                            name: '未知',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: [320]
                        },
                        {
                            name: '初中',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: [120]
                        },
                        {
                            name: '高中',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: [220]
                        },
                        {
                            name: '本科',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: [150]
                        },
                        {
                            name: '硕士',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: [820]
                        },
                        {
                            name: '博士',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: [820]
                        }
                    ]
                }
            }
        },
        computed: {

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
            randomData() {
                return Math.round(Math.random()*2500);
            }
        },
        components: {
            Export,
            ECharts
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .ProxyPortrait {
        font-size: 12px;
    }

    .ProxyPortrait .chart_container {
        width: 100%;
        border: 1px solid #E1E1E1;
        margin-top: 20px;
        padding: 20px;
        box-sizing: border-box;
    }
</style>
