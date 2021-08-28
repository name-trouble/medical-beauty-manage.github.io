<template>
    <div class="attr">
        <el-row style="width: 900px">
            <el-col :span="11" v-for="item in calculateCap" :key="item.propertyCode">
                <!--input-->
                <el-form-item :label="item.Name" v-if="item.EnterWay == 1">
                    <el-input v-model="item.propertyValue" style="width: 60%"></el-input>
                </el-form-item>
                <!--select-->
                <el-form-item :label="item.Name" v-if="item.EnterWay == 2">
                    <el-select v-model="item.propertyValue" placeholder="请选择" style="width: 60%">
                        <el-option v-for="item in item.TextValue" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                    <!--<el-input v-model="item.propertyValue" style="width: 60%"></el-input>-->
                </el-form-item>
                <!--checkbox-->
                <el-form-item :label="item.Name" v-if="item.EnterWay == 3">
                    <el-checkbox-group v-model="item.propertyValue">
                        <el-checkbox v-for="item in item.TextValue" :label="item" :key="item"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        // name:"addAttr",
        props:{
            cap:"",
            getCaps:""
        },
        data () {
            return {
                calculateCap:[]
            }
        },
        computed:{
        },
        watch:{
            cap:{
                handler(curVal,oldVal){
                    this.calculateCap = []
                    this.capsTurn()
                },
                deep:true
            },
            getCaps:{
                handler(curVal,oldVal){
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
        mounted(){
        },
        methods:{
            capsTurn(data){
                let len = this.cap.length
                for(let i = 0 ;i < len; i++){
                    this.calculateCap.push({
                        PropertyCode:this.cap[i].Code,
                        TextValue:this.arrTurn(this.cap[i].TextValue),
                        EnterWay:this.cap[i].EnterWay,
                        propertyValue:this.checkTurn(this.cap[i].EnterWay),
                        Name:this.cap[i].Name
                    })
                }
                this.copyWorth()
            },
            arrTurn(data){
                return data?data.split(","):''
            },
            checkTurn(num){
                return num == 3?[]:''
            },
            copyWorth(data){
                for(let i = 0;i<this.calculateCap.length;i++){
                    for(let j = 0;j<this.getCaps.length;j++){
                        if(this.getCaps[j].PropertyCode == this.calculateCap[i].PropertyCode){
                            this.calculateCap[i].propertyValue = this.typeCheck(this.getCaps[j],this.calculateCap[i].EnterWay)
                            break
                        }
                    }
                }
            },
            typeCheck(data,num){
                return num == 3?data.PropertyValue.split(","):data.PropertyValue
            }
        },
        components: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
