<template>
    <div>
        <div class="head"></div>
        <part-head :img="data.image || ''" :text="data.name"></part-head>
        <div class="content flex-box" style="flex-wrap:no-wrap;">
            <div v-for="(item ,$index) in list" :key="$index" class="flex-item">
                <div class="img-content">
                    <img :src="baseImgPath+item.pictureUrl">
                    <span>{{ item.tab }}</span>
                </div>
                <p>{{ item.name.substr(0,6)+'...' }}</p>
                <div class="star">
                    <el-rate v-model="star"></el-rate>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 医院
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
            star: 5,
            baseImgPath,
        }
    },
}
</script>

<style scoped lang="less">
.head {
    margin-top: 15px;
    border: 5px solid #f8f8f8;
}

.content{
    border-top: 1px solid #f8f8f8;
    padding-top: 10px;
}

.flex-item {
    flex: 0 25%;
    text-align: center;
    .img-content {
        position: relative;
        img {
            border-radius: 5px;
            width: 85%;
        }

        span{
          background:#47cbe4;
          color:white;
          position: absolute;
          bottom: 3px;
          left:7.5%;
          //width:35px;
          padding:2px 5px;
          border-radius:3px;
          text-align: center;
          vertical-align: middle;
          line-height: 15px;
        }
    }

    p,
    .star {
        margin-top: 3px;
    }
}
</style>
