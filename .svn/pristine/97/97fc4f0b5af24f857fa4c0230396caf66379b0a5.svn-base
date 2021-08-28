<template>
    <div class="attr">
        <el-row style="width: 900px">
            <el-col :span="10" v-for="(item,index) in calculateCap" :key="item.propertyCode">
                <!--input-->
                <el-form-item :label="item.Name" v-if="item.EnterWay == 1" label-width="120px">
                    <el-input v-model="item.propertyValue" style="width: 60%"></el-input>
                </el-form-item>
                <!--select-->
                <el-form-item :label="item.Name" v-if="item.EnterWay == 2" label-width="120px">
                    <el-select v-model="item.propertyValue" placeholder="请选择" style="width: 60%">
                        <el-option v-for="(item,index) in item.TextValue" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <!--checkbox-->
                <el-form-item :label="item.Name" v-if="item.EnterWay == 3" label-width="120px">
                    <el-checkbox-group v-model="item.propertyValue">
                        <el-checkbox v-for="(item,index) in item.TextValue" :label="item" :key="item"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        // name:"attr",
        props:{
            cap:"",
        },
        data () {
            return {
                capCheck:[],
                calculateCap:[]
            }
        },
        computed:{
        },
        watch:{
            cap:{
                handler(curVal,oldVal){
                    this.capCheck = this.getChecked(this.cap)
                    this.calculateCap = []
                    this.capsTurn()
                },
                deep:true
            },
            calculateCap:{
                handler(curVal,oldVal){
                    this.$emit("attrChange",this.calculateCap)
                },
                deep:true
            },
        },
     
        methods:{
            capsTurn(data){
                let len = this.capCheck.length
                for(let i = 0 ;i < len; i++){
                    this.calculateCap.push({
                        propertyCode:this.capCheck[i].Code,
                        TextValue:this.arrTurn(this.capCheck[i].TextValue),
                        EnterWay:this.capCheck[i].EnterWay,
                        propertyValue:this.checkTurn(this.capCheck[i].EnterWay),
                        Name:this.capCheck[i].Name
                    })
                }
            },
            arrTurn(data){

                if(data == ""||!data){
                    return ""
                }else{
                    return data.split(",")
                }
            },
            checkTurn(num){
                if(num == 3){
                    return []
                }else{
                    return ""
                }
            },
            getChecked(data){
                let arr=[]
                for (let i = 0;i<data.length;i++){
                    if(data[i].IsChecked == 1){
                        arr.push(data[i])
                    }
                }
                return arr
            }
        },
        components: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
