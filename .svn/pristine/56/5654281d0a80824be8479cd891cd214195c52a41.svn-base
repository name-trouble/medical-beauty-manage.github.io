<template>
    <div class="check-box">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkall" @change="allChange">
            全选
        </el-checkbox>
        <el-checkbox-group v-model="checkList" @change="change" class="flex-box">
            <el-checkbox v-for="(item,$index) in list" :label="$index" :key="$index" class="flex-item">{{item.BranchName}}</el-checkbox>
        </el-checkbox-group>
    </div>
</template>

<script>
import { getTopBranch } from '@/api/myData'

export default {
    data() {
        return {
            checkall: false,
            isIndeterminate: false,
            checkList: [],
            list: [],
            valueList: []
        }
    },

    mounted() {
        this.getData()
    },

    props: {
        callBack: Function
    },
    methods: {
        allChange(event) {
            this.checkList = event.target.checked ? this.valueList : [];
            this.isIndeterminate = false;
            this.back()
        },
        change(value) {
            let checkedCount = value.length;
            this.checkall = checkedCount === this.list.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.list.length;
            this.back()
        },

        async getData() {
            this.list = await getTopBranch()
            for (let i = 0; i < this.list.length; i++){
                this.valueList.push(i)
            }
        },

        back() {
            let _this = this
            let arr = []
            this.checkList.forEach(item => {
                arr.push(_this.list[item]["Code"])
            })
             this.callBack && this.callBack(arr)
        },
    }
}
</script>

<style scoped lang="less">
.flex-box {
    display: -webkit-flex;
    /* Safari */
    display: flex;
    flex-wrap: wrap;
}

.flex-item {
    flex: 1 50%;
    margin: 0;
    height: 26px;
}

.check-box {
    position: relative;
    height: 150px;
    overflow: auto;
    border: 1px solid #a2b5c4;
    padding: 2px 20px;
    min-width: 300px;
}
</style>
