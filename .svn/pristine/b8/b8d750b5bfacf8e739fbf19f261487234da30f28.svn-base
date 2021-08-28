<template>
    <div style="margin-top:-5px;" v-if="data.id||data.id==0">
        <div class="head"></div>
        <part-head :img="baseImgPath+data.image|| ''" :text="data.name"></part-head>
        <div v-for="(item ,$index) in list" :key="$index">
            <div class="flex-box">
                <div class="flex-item left">
                    <img :src="getImg(item.pictureUrl,0)">
                    <span>Before</span>
                </div>

                <div class="flex-item right">
                    <img :src="getImg(item.pictureUrl,1)">
                    <span>After</span>
                </div>
                <div class="head-word">
                    <span>{{ item.describe }}</span>
                    <div class="hd-foot">
                        <img src="../lib/anli.png">
                        <span>{{ item.tab }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 案例
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
    },

    methods: {
        getImg(str, i) {
            if (!str) return
            let ars = str.split('#')
            return baseImgPath + ars[i]
        }
    },
}
</script>

<style lang="less" scoped>
.flex-box {
    justify-content: center;
    margin: 0;
    margin-bottom: 5px;
    padding-top: 5px;
}

.head {
    border: 5px solid #f8f8f8;
}

.right,
.left {
    flex: 0 50%;
    position: relative;
    img {
        height: 99%;
        width: 99%;
    }
    span {
        position: absolute;
        left: 10px;
        bottom: 12px;
        background: #000000;
        opacity: 0.5;
        color: #E8E8E8;
        letter-spacing: 0;
        font-size: 12px;
        border-radius: 5px;
        padding: 1px 6px;
    }
}

.head-word {
    margin: 5px 0;
    width: 100%;
    text-align: left;
    span {

        width: 100%;
        text-align: left;
        color: #666666;
    }
}

.hd-foot {
    width: 100%;
    text-align: left;
    line-height: 25px;
    img {
        vertical-align: middle;
        width: 20px;
    }
    span {
        vertical-align: middle;
        color: #FF664F;
    }
}
</style>
