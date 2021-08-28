<template>
    <div>
        <div class="hosbox">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkall" @change="allChange">
                全选
            </el-checkbox>
            <el-checkbox-group v-model="checkList" @change="change" class="flex-box">
                <el-checkbox v-for="(item,$index) in list" :label="$index" :key="$index" class="flex-item">{{item.SupplierName}}</el-checkbox>
            </el-checkbox-group>
        </div>

        <div style="float:right;margin:10px 20px;">
            <el-button type="info" style="width:100px" @click="save(1)">保存</el-button>
            <el-button style="width:100px" @click="save(0)">取消</el-button>
        </div>
    </div>
</template>

<script>
import { getSupplierBySupType } from '@/api/myData'

export default {
    data() {
        return {
            checkall: false,
            isIndeterminate: false,
            checkList: [],
            list: [],
            valueList: [],
        };
    },

    mounted() {
        this.getData()
    },

    props: {
        data: Array,
        getHospital: Function
    },

    watch: {
        data:{
            handler(curVal, oldVal) {
            },
            deep: true
        },

    },
    methods: {
        allChange(event) {
            this.checkList = event.target.checked ? this.valueList : [];
            this.isIndeterminate = false;
        },
        change(value) {
            let checkedCount = value.length;
            this.checkall = checkedCount === this.list.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.list.length;
        },

        save(val) {
            if (val == 1) {
                let dt = []
                let _this = this
                this.checkList.forEach(item => {
                    dt.push(_this.list[item])
                })
                this.getHospital && this.getHospital(1,dt)
            }
            else {
                this.getHospital && this.getHospital(0)
            }
          //  this.checkall = []
           // this.checkList = []
           // this.isIndeterminate = false
        },

        async getData() {
            this.list = await getSupplierBySupType("001")
            for (let i = 0; i < this.list.length; i++) {
                this.valueList.push(i)
            }
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
    margin: 10px;
}

.hosbox {
    position: relative;
    height: 500px;
    overflow: auto;
    border: 1px solid #a2b5c4;
    padding: 10px 20px;
}
</style>
