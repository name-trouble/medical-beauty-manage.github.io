<template>
    <div class="selCommon editRegister">
        <div>
            <div style="min-height:250px;">
                <el-tag v-for="tag in dynamicTags" :key="tag.id" class="tag"
                type="success" >{{tag.ticketCode}} </el-tag>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    // import { getCookie, delCookie } from '@/config/mUtils'
    import Vue from "vue"
    export default {
        props:{
            viewData:[],
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
            // handleClose(tag) {
            //     this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            // },
            // onSubmit(){
            //     this.$emit("changeCodeArr",this.dynamicTags)
            // },
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
