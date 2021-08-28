<template>
    <div class="selCommon editRegister">
        <div v-if="ope">
            <div style="min-height:250px;max-height:400px;overflow:auto">
                <el-tag v-for="(tag,index) in dynamicTags" :key="index"  
                :closable="true"
                class="tag"
                :close-transition="false"
                @close="handleClose(tag)"
                type="success" >{{tag}} </el-tag>
            </div>
            <div class='form_footer'>
                <el-button type="primary" @click="onSubmit">确定修改</el-button>
                <el-button>取消</el-button>
            </div>
        </div>
        <div v-else>
            <div style="min-height:250px;">
                <el-tag v-for="(tag,index) in dynamicTags" :key="index"  class="tag"
                type="success" >{{tag.ticketCode}} </el-tag>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import { getCookie, delCookie } from '@/config/mUtils'
    import Vue from "vue"
    export default {
        props:{
            viewData:Array,
            ope:Boolean,
        },
        data () {
            return {
               dynamicTags:[],
            }
        },
        mounted(){
            this.dynamicTags = []
            this.dynamicTags = this.viewData
            this.dynamicTags.push()
        },
        watch:{
            
        },
        methods: {
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },
            onSubmit(){
                this.$emit("changeCodeArr",this.dynamicTags)
            },
        },
        components: {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tag{
    margin: 5px;
}
.form_footer{
    padding-top: 15px;
}
</style>
