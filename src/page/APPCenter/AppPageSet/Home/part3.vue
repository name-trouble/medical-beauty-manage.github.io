<template>
    <div v-if="data.id||data.id==0">
        <div class="head"></div>
        <part-head :img="baseImgPath+data.image|| ''" :text="data.name"></part-head>

        <div class="flex-box content">
            <div class="left">
                <img :src="baseImgPath + list[0].pictureUrl">
            </div>

            <div class="right">
                <div class="flex-item" v-for="i in 4" :key="i">
                    <img :src="baseImgPath+list[i].pictureUrl">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 专家
import PartHead from './partHead'
import { baseImgPath } from '@/config/env'
export default {
    components: { PartHead },
    props: {
        data: Object
    },
    data() {
        return {
            list: this.data.widgets,
            baseImgPath,
        }
    }
}
</script>

<style scoped lang="less">
.head {
    border: 5px solid #f8f8f8;
}

.content {
    height: 200px;
    border-top: 1px solid #efefef;
}

.left {
    width: 43%;
    img {
        height: 100%;
        width: 100%;
    }
}

.right {
    position: relative;
    border-left: 1px solid #efefef;
    width: 53%;
    display: flex;
    display: -webkit-flex;
    /* Safari */
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: start;
    .flex-item {
        position: relative;
        width: 49.7%;
        img {
            right: 0;
            position: absolute;
            width: 100%;
            height: 100%;
            float: right;
        }
    }

    .flex-item:first-child {
        border-right: 1px solid #efefef;
        border-bottom: 1px solid#efefef;
    }


    .flex-item:nth-child(2) {
        border-bottom: 1px solid #DDDDDD;
    }
    .flex-item:last-child {
        border-left: 1px solid #DDDDDD;
    }
}
</style>
