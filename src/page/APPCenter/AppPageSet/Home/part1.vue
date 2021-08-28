<template>
  <div v-if="data.length>0">
    <el-carousel :interval="2000" arrow="never" height="120px" trigger="click" indicator-position="none">
      <el-carousel-item v-for="(item,$index) in data" :key="$index">
        <img :src="baseImgPath+item.pictureUrl" width="100%">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
//轮播图
import { baseImgPath } from '@/config/env'
export default {
  props: {
    data: Array
  },

  data(){
    return{
      baseImgPath
    }
  },
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>