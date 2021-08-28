<template>
    <div class="AppPageSet">

        <div class="app">
            <el-select v-model="selectBrach" placeholder="请选择">
                <el-option label="平台默认" value=""></el-option>
                <el-option v-for="(item,$index) in brachList" :key="$index" :label="item.BranchName" :value="item.Code">
                </el-option>
            </el-select>

            <div class="search"> <img src="./lib/home_head.png" style="width:100%"></div>
            <div class="content" v-loading="isLoad">
                <div class="part" @click="setModel(1)">
                    <div class="model" v-show="seIndex===1"></div>
                    <transition name="el-fade-in">
                        <part1 :data="partData1" v-if="!isLoad"></part1>
                    </transition>
                </div>

                <div class="part" @click="setModel(2)">
                    <div class="model" v-show="seIndex===2"></div>
                    <part2 :data="partData2" v-if="!isLoad"></part2>
                </div>

                <div class="part" @click="setModel(3)">
                    <div class="model" v-show="seIndex===3"></div>
                    <part3 :data="partData3" v-if="!isLoad"></part3>
                </div>

                <div class="part" @click="setModel(4)">
                    <div class="model" v-show="seIndex===4"></div>
                    <part4 :data="partData4" v-if="!isLoad"></part4>
                </div>

                <!-- <div class="part" @click="setModel(5)">
                    <div class="model" v-show="seIndex===5"></div>
                    <part5 :data="partData5" v-if="!isLoad"></part5>
                </div>

                <div class="part" @click="setModel(6)">
                    <div class="model" v-show="seIndex===6"></div>
                    <part6 :data="partData6" v-if="!isLoad"></part6>
                </div> -->

            </div>
        </div>
        <div style="flex:0 3%"></div>
        <div class="edit-body">
            <div v-bind:style="topStyle"></div>
            <component v-bind:is="currentView" :data="selectData" @update="update">
                <!-- 组件在 vm.currentview 变化时改变！ -->
            </component>
        </div>
    </div>
</template>

<script>

//app 展示组件
import part1 from './MedicalBeauty/part1'
import part2 from './MedicalBeauty/part2'
import part3 from './MedicalBeauty/part3'
import part4 from './MedicalBeauty/part4'
// import part5 from './Home/part5'
// import part6 from './Home/part6'
//import part7 from './Home/part7'

//app 编辑组件
import edit1 from './MedicalBeauty/edit1'
import edit2 from './MedicalBeauty/edit2'
import edit3 from './MedicalBeauty/edit3'
import edit4 from './MedicalBeauty/edit4'
// import edit5 from './Home/edit5'
// import edit6 from './Home/edit6'
// import edit7 from './Home/edit7'


import { baseImgPath } from '@/config/env'
import '@/style/yqCom.less'
import { getTopBranch, getMedicalBeauty } from '@/api/myData'
export default {
    components: {
        part1, part2,part3,part4,
        edit1, edit2,edit3,edit4,
    },
    data() {
        return {
            brachList: [],
            selectBrach: "",
            appData: "",

            //各个模块 数据
            partData1: [],
            partData2: "",
            partData3: "",
            partData4: "",
            // partData5: "",
            // partData6: "",
            // partData7: "",

            baseImgPath,
            seIndex: -1,
            isLoad: true,
            currentView: "",
            viewList: ['edit1', 'edit2','edit3','edit4'],
            selectData: "",
            topStyle: {
                width: '100%',
                height: '0'
            },

        }
    },

    created() {
        this.getBrach()
    },

    mounted() {
        this.getMedicalBeauty()
    },

    methods: {
        async getBrach() {
            this.brachList = await getTopBranch()
        },

        //深拷贝
        deepCopy(val,index) {
            if(val){
                let str = JSON.stringify(val)
                return JSON.parse(str)
            }else{
                 
                if(index>0){
                    return {}
                }else{
                    return []
                }
            }
            
        },

        async getMedicalBeauty() {
            ;
            this.appData = await getMedicalBeauty(this.selectBrach)
            if (this.appData.status === false) return
            this.partData1 = []
            this.partData2 = ""
            this.partData3 = ""
            this.partData4 = ""
            // this.partData5 = ""
            // this.partData6 = ""
            // this.partData7 = ""

            // for (let item of this.appData.data.parts[0].widgets) {
            //     this.partData1.push(this.baseImgPath + item.pictureUrl)
            // }

            //for (let item of this.appData.data.parts[1].widgets) {
            this.partData1 = this.appData.data.parts[0]?this.deepCopy(this.appData.data.parts[0].widgets,0):[]
            this.partData2 =  this.deepCopy(this.appData.data.parts[1],1)
            //({ 'pictureUrl': this.baseImgPath + item.pictureUrl, 'name': item.name })
//}
            this.partData3 =  this.deepCopy(this.appData.data.parts[2],2)
            this.partData4 = this. deepCopy(this.appData.data.parts[3],3)
            // this.partData5 =  this.deepCopy(this.appData.data.parts[4])
            // this.partData6 =  this.deepCopy(this.appData.data.parts[5])
            // this.partData7 =  this.deepCopy(this.appData.data.parts[6])

            let _this = this
            setTimeout(function() { _this.isLoad = false }, 500)
        },



        setModel(index) {
            this.seIndex = index
            this.currentView = this.viewList[index - 1]
            this.selectData = this.appData.data.parts[index - 1]
            let height = ""
            //调整 编辑页面 显示的高度
            switch (index) {
                case 1:
                    height = "100px"
                    break
                case 2:
                    height = "230px"
                    break
                case 3:
                    height = "410px"
                    break

                case 4:
                    height = "570px"
                    break
                // case 5:
                //     height = "1000px"
                //     break
                // case 6:
                //     height = "1300px"
                //     break
                // case 7:
                //     height = "0"
                //     break
            }
            this.topStyle.height = height
        },

        update(data) {

            this.currentView = ""
            if (data.index === 0) return
            this["partData" + data.index] = data.data

        },
    }
}
</script>

<style scoped>
.app {
    min-width: 375px;
    width: 375px;
    flex: 0 auto;
}

.AppPageSet {
    display: -webkit-flex;
    display: flex;
    /* flex-wrap: wrap; */
    justify-content: flex-start;
    overflow: auto;
}

.model {
    z-index: 6;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #000;
    opacity: 0.5;
    text-align: center;
    border: 2px dashed red;
}

.edit-body {
    min-width: 500px;
    flex: 0 40%;
}

.part {
    cursor: pointer;
    margin: 1px;
    position: relative;
}

.content {
    min-height: 800px;
}
</style>
