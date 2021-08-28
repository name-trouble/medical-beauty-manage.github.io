<template>
    <div class="menu_item" style="">
        <div v-for="(item,index) in data" :key="index">
            <template v-if="!item.childs">
                <el-menu-item :index="item.index" @click='select(item)'>
                    <i :class="'icon iconfont icon-' + item.icon" style="vertical-align: middle"></i>
                    <span v-html="item.text" :style="{color:styles.color}" style="vertical-align: middle"></span>
                </el-menu-item>
            </template>
            <template v-else>
                  <el-submenu :index="item.index" >
                    <template slot="title">
                        <i :class="'icon iconfont icon-' + item.icon" style="vertical-align: middle"></i>
                        <span v-html="item.text"></span>
                    </template>
                    <treeitem :data="item.childs" :styles="{color:'#96a2b5 '}" :selectitem="select">
                    </treeitem>
                </el-submenu>
            </template>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
import {tabsLen} from "@/config/common"
import { setSStore,getSStore } from '@/config/mUtils'
export default {
    name: "treeitem",
    mounted() {
        if (this.data && this.data.length > 0) {
            this.isShow = true
        }
    },
    data() {
        return {
            index: '',
            isShow: false,
            curMenus:[],
        }
    },
    props: {
        data: Array,
        selectitem: Function,
        styles: {},
        selectMes:{
            type:Object
        }
    },
   
    computed: {
        pages() {
            return this.$store.state.SavePages
        },
        
    },
    methods: {
        getMenu(){
            if(getSStore('tabs')){
               this.curMenus = JSON.parse(getSStore('tabs'))
            }else{
                return []
            }
        },
        select(item) {
            this.getMenu()
            this.selectitem && this.selectitem(item)
            this.index = item.code
            if (this.curMenus.length === 0) {
                this.curMenus.push(item)
            } else {
                for (let i = 0; i < this.curMenus.length; i++) {
                    if (this.curMenus[i].text === item.text) { break }
                    else {
                        if (i >= this.curMenus.length - 1) {
                            this.curMenus.push(item)
                        }
                    }
                }
            }
            // 控制选项卡显示的个数 tabsLen为个数（可直接修改）
            if (this.curMenus.length >= tabsLen) {
                this.curMenus.splice(0, 1);
            }
            setSStore('index', ''+this.index)
            let arr = []
            this.curMenus.forEach(row=>{
                arr.push({
                    code: row.code,
                    index: row.index,
                    parentCode: row.parentCode,
                    text: row.text,
                })
            })
            setSStore('tabs',JSON.stringify(arr))
            this.$emit('cookieChange',item)
            setSStore('lastPage', item)
        },
    }
}
</script>

<style scoped>
/*  导入所需要的文字图标样式**/
</style>
