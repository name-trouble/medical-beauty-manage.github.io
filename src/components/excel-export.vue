<template>
<span></span>
<!-- <el-button type="primary" style='background:#ffffff;border:1px solid #d6d4d4;font-size:14px;
      color:#666666;border-radius:4px;' @click='handleDownload'>导出报表</el-button> -->

</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            /******* 需要传递的数据，数据格式在下方  tableData1是json数据*****/
            tHeader: {},
            filterVal: {},
            tableData1: {
                type:Array
            },
            name: '',
        },
        watch: {
            "tableData1":{
                handler(curVal,oldVal){
                    this.otData = curVal
                },
                deep:true
            }
        },
        data () {
            return {
                otData: []
            }
        },
        methods: {
            handleDownload() {
                require.ensure([], () => {
                    const { export_json_to_excel } = require('../config/vendor/Export2Excel');
                    /* const tHeader = ['日期', '姓名', '电话', '代理等级', '团队人数','推荐人','邮箱','身份证号','来源渠道','银行卡号','开户行','开户人'];
                     const filterVal = ['date', 'user', 'address', 'region', 'grade'];
                     const list = this.tableData;*/
                    let data=[]
                    if(this.otData.length!=0){
                         data = this.formatJson(this.filterVal, this.otData);
                    }else{
                         data = this.formatJson(this.filterVal, this.tableData1);
                    }
                    export_json_to_excel(this.tHeader, data, this.name);
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
