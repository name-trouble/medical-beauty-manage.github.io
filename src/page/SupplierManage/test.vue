<template>
    <div>
        <upload @onSuccess="onSuccess" :fileList="fileList" @onRemove="onRemove"></upload>
    </div>
</template>

<script type="text/ecmascript-6">
import upload from '@/components/upload'
export default {
    // name: '',
    components: {
        upload
    },
    data() {
        return {
            fileList:[],
        }
    },

    computed: {
      
    },

    mounted() {
        
    },

    methods: {
        onSuccess(imgList){
            this.fileList = imgList
        },
        onRemove(img,imgList){
            this.fileList = imgList
        }

    }

}
</script>

<style lang="less" scoped>

</style>
