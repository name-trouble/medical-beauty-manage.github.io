<template>
    <div class="selCommon addGoods">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="医美" name="first">
                    <hospital v-if="columnIndex == 0"></hospital>
            </el-tab-pane>
            <el-tab-pane label="商城" name="second">
                    <mall v-if="columnIndex == 1" :type="columnIndex"></mall>
            </el-tab-pane>
            <el-tab-pane label="商户产品" name="third">
                    <mall v-if="columnIndex == 2" :type="columnIndex"></mall>
            </el-tab-pane>
             <el-tab-pane label="产品" name="four">
                    <mall v-if="columnIndex == 3" :type="columnIndex"></mall>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script type="text/ecmascript-6">
// C:\Users\Administrator\Desktop\xinban\src\page\FinanceManage\ReportManage\lib\report.less
    import '@/page/FinanceManage/ReportManage/lib/report.less';
    import '@/style/selfCommon.less';
    import mall from "../addGoods/mall"
    import hospital from "../addGoods/hospital"
    import {GetCatelogByColumnCode,GetColumnAll} from "@/api/myData"
    export default {
        // name: 'addGoods',
        data() {
            return {
                column:[{},{}],
//                当前column index值据此筛选添加商品所属columnId
                columnIndex:0,
//                存放所有分类
                catelog:0,
                activeName: 'first',
            };
        },
        computed: {

        },
        watch: {
        },
        beforeRouteLeave (to, from, next) {
            this.$destroy()
            next()
        },
        mounted: function () {
            
        },
        created(){
            this.getColumn()
        },
        methods: {
//            获取所有栏目
            async getColumn(){
                try{
                    let column = await GetColumnAll();
                    this.column = column
                    this.getCatelog({code:this.column[0].CloumnCode})
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },

    //  选项卡切换
            handleClick(tab, event) {
                this.columnIndex = tab.index
            },
        },
        components: {
            mall,
            hospital
        }
    ,
    }
</script>

<style scoped>
    .pic-tit {
        line-height: 40px;
        display: block;
        border-bottom: 1px dotted rgb(242, 242, 242);
        margin-bottom: 5px;
    }

    .main {
        height: 200px;
        overflow: hidden;
    }
    .addCap{
        margin-left: 60px;cursor: pointer;
    }
    .addCap:hover,.delete:hover{
        color: #cda382;
    }

    .delete {
        cursor: pointer;
    }

    .check-ipt {
        float: none;
        width: 30px;
        height: 30px;
        border: 1px solid #bfcbd9;
        border-radius: 4px;
        margin-left: 5px;
        padding: 0 3px;;
    }
</style>
