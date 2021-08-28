<template>
    <div>
        <el-date-picker v-model="date1" type="date" placeholder="选择日期" style='width:150px;'  @change="starTimeChang" :picker-options="pickerOptionsStart"></el-date-picker>
        <el-date-picker v-model="date2" type="date" placeholder="选择日期" style='width:150px;'  @change="endTimeChang" :picker-options="pickerOptionsOver"></el-date-picker>
    </div>
</template>

<script>
    export default {
        // name:"DateLinkage",
        props:{
            date:""
        },
        data () {
            return {
                date1:"",
                date2:"",
                pickerOptionsStart: {
                    disabledDate (time) {}
                },
                pickerOptionsOver: {
                    disabledDate (time) {}
                }
            }
        },
        watch:{
            "date":{
                handler(curVal,oldVal){
                    this.copyWorth()
                },
                deep:true
            }
        },
        mounted(){

        },
        methods:{
            copyWorth(){
                if(this.date.length!=0){
                    this.date1 = this.date.substring(0,10)
                    this.date2 = this.date.substring(13)
                }
            },
            getDate (strDate) {
                let st = strDate
                let a = st.split(' ')
                let b = a[0].split('-')
                let date = new Date(b[0], b[1] - 1, b[2])

                return date
            },
            // 开始时间禁止晚于结束时间；
            starTimeChang (val) {
                let starTime
                if(val){
                     starTime = this.getDate(val)
                }else{
                     starTime = ""
                }
                this.pickerOptionsOver = {
                    disabledDate (time) {
                        return time.getTime() < starTime
                    }
                }
                this.$emit("getDate",this.date1,this.date2)
            },
            // 结束时间禁止早于开始时间
            endTimeChang (val) {
                let endTime
                if(val){
                     endTime = this.getDate(val)
                }else{
                     endTime = ""
                }
              /*  let endTime = this.getDate(val)*/
                this.pickerOptionsStart = {
                    disabledDate (time) {
                        return  time.getTime() >= endTime
                    }
                }
                this.$emit("getDate",this.date1,this.date2)
            }
        },
        components: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
<!--使用方法-->
<!--<DateLinkage @getDate="getDate"></DateLinkage>-->
<!--getDate(val1,val2)-->
