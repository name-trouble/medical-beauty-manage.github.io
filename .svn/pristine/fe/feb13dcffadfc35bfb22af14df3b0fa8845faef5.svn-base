<template>
  <div class="flex-box" v-if="data.length>0">
    <div class="flex-item" v-for="(item,$index) in list" :key="$index" style="flex:0 25%;margin-top:15px;text-align:center">
      <img :src="baseImgPath + item.pictureUrl" style="width:48px;height:48px;border-radius:50%">
      <p>{{ item.name }}</p>
    </div>
  </div>
</template>

<script>
// 菜单
import { baseImgPath } from '@/config/env'
export default {
  props: {
    data: Array
  },

  data() {
    return {
      baseImgPath,
      list:this.data
    }
  },

  created() {

  },

  methods: {

  },

  watch: {
    data: {
      handler(val, oldVal) {
        this.list=[]
         for(let item of val){
           this.list.push(item)
         }
      },
      deep: true
    }
  }
}
</script>
