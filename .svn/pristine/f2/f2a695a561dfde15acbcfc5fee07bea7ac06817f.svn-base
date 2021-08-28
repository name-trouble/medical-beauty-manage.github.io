<template>
    <div v-if="data.id||data.id==0">
        <div class="head"></div>
        <part-head :img="baseImgPath+data.image|| ''" :text="data.name"></part-head>
        <div class="flex-box">
            <div class="flex-item" v-for="(item,$index) in list" :key="$index">
                
                <img :src="baseImgPath + item.pictureUrl">
                <div class="word">{{ item.name.substring(0,5) }}</div>
            </div>
        </div>
    </div>
</template>

<script>
// 推荐商家
import PartHead from './partHead'
import { baseImgPath } from '@/config/env'
export default {
    components: { PartHead },
    props: {
        data: Object
    },
    //  created() {
    // },
    data() {
        return {
            list: this.data.widgets,
            baseImgPath,
        }
    },
    // methods: {
    //     titleSub()
    //     {
    //         this.title.substring(0,6);
    //     },
        
    // }
}
</script>

<style lang="less" scoped>
.flex-box {
    justify-content: space-between;
    padding-bottom:10px;
}
.head {
    border: 5px solid #f8f8f8;
}

.flex-item {
    margin-bottom: 20px; 
    width: 80px;
    height: 80px;
    text-align: center;
    .word {
        text-align: left;
        padding-left: 10px;
        padding-bottom: 3px;
    }
    img {
        width: 90%;
        height: 90%;
    }
}
</style>
