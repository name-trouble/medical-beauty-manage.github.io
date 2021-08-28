<template>
    <div class="selCommon addGoods">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="医美" name="first" :disabled="activeName != 'first'">
                <hospital :hospitalMes="hospitalMes" v-if="activeName==='first'" :type="activeName" :from="from"></hospital>
            </el-tab-pane>
            <el-tab-pane label="商城" name="second" :disabled="activeName != 'second'">
                <mall :mall="mall" v-if="activeName==='second'"  :type="activeName"></mall>
            </el-tab-pane>
            <el-tab-pane label="商户" name="third" :disabled="activeName != 'third'">
                <mall :mall="mall" v-if="activeName==='third'" :type="activeName"></mall>
            </el-tab-pane>
            <el-tab-pane label="产品" name="four" :disabled="activeName != 'four'">
                <mall :mall="mall" v-if="activeName==='four'" :type="activeName"></mall>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script type="text/ecmascript-6">
    import '@/page/FinanceManage/ReportManage/lib/report.less';
    import '@/style/selfCommon.less';
    import mall from "../addGoods/editMall.vue"
    import hospital from "../addGoods/editHospital.vue"
    import { getStore} from '@/config/mUtils'
    import {GetCatelogByColumnCode,GetColumnAll,GetGoodsById,} from "@/api/myData"
    export default {
        // name: 'addGoods',
        data() {
            return {
                EditId: "",
                column: [{}, {}],
//                当前column index值据此筛选添加商品所属columnId
                columnIndex: "",
//                存放所有分类
                catelog: "",
                activeName:'',
                mall: {},
                hospitalMes: {},
                from:'',
            };
        },
        beforeRouteLeave (to, from, next) {
            this.$destroy()
            next()
        },
        mounted: function () {
          
        },
 
        created(){
            this.from = this.$route.query.from
            this.EditId = this.$route.query.id
            // this.EditId = getStore("editId")
            this.getColumn()
        },
        methods: {
//            获取所有栏目
            async getColumn(){
                try {
                    this.column = await GetColumnAll();
                    let res = await GetGoodsById({id: this.EditId});
                    this.columnClassify(res)
                } catch (err) {
                    console.log('获取数据失败', err);
                }
            },
            columnClassify(data){
                
                if (data.GoodsEntity.ColumnCode == 100) {
                    this.activeName = "first"
                    setTimeout(()=>{
                        this.hospitalMes = data
                    },50)
                }
                if(data.GoodsEntity.ColumnCode == 101){
                    this.activeName = "second"
                    setTimeout(()=> {
                        this.mall = data
                    }, 50)
                }
                if(data.GoodsEntity.ColumnCode == 102){
                    this.activeName = "third"
                    setTimeout(()=> {
                        this.mall = data
                    }, 50)
                }
                if(data.GoodsEntity.ColumnCode == 103){
                    this.activeName = "four"
                    setTimeout(()=> {
                        this.mall = data
                    }, 50)
                }
            },
            //            选项卡切换
            handleClick(tab, event) {
                this.getCatelog({code: this.column[tab.index].CloumnCode})
                this.columnIndex = tab.index
            },
        },
        components: {
            mall,
            hospital
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
