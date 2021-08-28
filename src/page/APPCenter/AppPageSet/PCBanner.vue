<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="banner轮播" name="first">
                <bannerS :type="999" active="first"></bannerS>
            </el-tab-pane>
            <el-tab-pane label="导航" name="second">
                <bannerS :type="998" active="second"></bannerS>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import bannerS from './com/pcset'
export default {
    components: { bannerS },
    props: {
        // data: Object
    },

    created() {
       
    },

    data() {
        return {
          activeName: 'second'
        }
    },

    methods: {
        handleClick(tab, event) {
            
        }
    },
}
</script>

<style lang="less" scoped>

</style>
