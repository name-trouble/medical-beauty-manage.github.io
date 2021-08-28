<template>
    <div>
        <div class="head">
            <span>编辑二级导航</span>
        </div>
         <!-- <div>
            <span class="switch">是否显示：<el-switch on-text="" off-text="" v-model="show" on-color="#13ce66" off-color="#ff4949"></el-switch></span> 
        </div> -->
        <div class="el-card content">
            <div class="item" v-for="(item,$index) in list" :key="$index">
                <!-- <div > -->
                <el-button type="success" size="small" @click="changeOrder($index)" v-show="OrderIndex!==$index && OrderIndex!==-1" class="close-btn"> 点击交换</el-button>
                <!-- </div> -->

                <el-upload class="avatar-uploader" :action="uploadUrl" :accept="acceptImage" :show-file-list="false" :on-success="success">
                    <img src="../lib/img_add.png" @click="imgIndex=$index" v-if="item.pictureUrl==''">
                    <img :src="baseImgPath+item.pictureUrl" @click="imgIndex=$index" v-else>
                </el-upload>
                <div class="">
                    <div style="margin-bottom:10px">
                        <span>导航名称：</span>
                        <el-input style="width:60%;" v-model="item.name" size="small"></el-input>
                    </div>
                    <div  style="margin-bottom:10px">
                        <span>链接类型：</span>
                        <el-select v-model="item.linkName" placeholder="请选择" @change="selectUrl(item.linkName,$index)" style="width:60%" size="small">
                            <el-option v-for="(item2,seIndex) in pageSetList" :key="seIndex" :label="item2.name" :value="item2.name">
                            </el-option>
                        </el-select>
                    </div>
                    <div  style="margin-bottom:10px">
                        <span> 链接地址： </span>
                        <el-input style="width:60%" v-model="item.linkUrl" size="small"></el-input>
                    </div>

                    <div v-if="item.linkType == '0'"  style="margin-bottom:10px">
                        <span> 小程序链接地址： </span>
                        <el-input style="width:60%" v-model="item.linkWeixin" size="small"></el-input>
                    </div>

                    <div  style="margin-bottom:10px">
                        <span> 位置序号： </span>
                        <div style="width:60%;display:inline-block;text-align:left;">
                            <el-tag type="danger" style="width:30px;text-align:center">{{ item.sort }}</el-tag>
                            <el-button type="text" size="small" v-show="OrderIndex==-1" @click="OrderIndex=$index">交换顺序</el-button>
                            <el-button type="text" size="small" v-show="OrderIndex==$index" @click="OrderIndex=-1">取消</el-button>
                        </div>
                    </div>
                </div>
                
            </div>

            <div class="foot">
                <el-button size="large" type="success" @click="submit" style="width:160px">保存</el-button>
                <el-button size="large" style="width:160px" @click="cancel">取消</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { xmxUrl, baseImgPath } from '@/config/env'
import {  imgApi, pageSetList, acceptImage } from '@/config/common'

import { AppWidgetListEdit } from '@/api/myData'
export default {
    props: {
        data: Object
    },

    data() {
        return {
            show:true,
            list: this.data.widgets,
            star: 5,
            baseImgPath,
            acceptImage,
            uploadUrl: xmxUrl + imgApi + '?op=appset',
            imgIndex: "",
            pageSetList,  //页面 配置  { name: "网页", linkType: "0", linkUrl: "" },
            OrderIndex: -1,  //当前顺序
        }
    },

    methods: {
        success(res, file) {
            this.list[this.imgIndex].pictureUrl = res
        },

        selectUrl(linkName, index) {
            for (let item of this.pageSetList) {
                
                if (item.name == linkName) {
                    this.list[index]["linkType"] = item.linkType
                    this.list[index]["linkUrl"] = item.linkUrl
                }
            }
        },

        changeOrder(index2) {
                    let index1 = this.OrderIndex
                    // 交换两边  sort值  ，用于传入数据库
                    let sort = this.list[index1].sort
                    this.list[index1].sort = this.list[index2].sort
                    this.list[index2].sort = sort

                    // 交换两边  数组item的值  ，用于web视图更新
                    let temp = this.list[index1]
                    this.list[index1] = this.list[index2]
                    this.list[index2] = temp
                    this.OrderIndex = -1
        },

        submit() {
            this.$confirm('确认修改吗？', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' })
                .then(() => {
                    ;
                    this.saveData()
                }).catch(() => {
                    //this.$message({ type: 'info', message: '已取消！' })
                })
        },

        async saveData() {
            ;
            // let res2 = await PagePartEdit(this.part);
            let res = await AppWidgetListEdit(this.list)
            if (res.status && res.status === true) {
                this.$message({ type: 'success', message: '保存成功！' })
                this.$emit('update', { data: this.list, index: 2 })
            }
            else {
                this.$message({ type: 'error', message: '保存失败！' })
            }
        },
        cancel() {
            this.$emit('update', { 'data': [], 'index': 0 })
        },
    },
}
</script>

<style lang="less" scoped>
.content {
    // text-align: center;
    display: flex;
    display: -webkit-flex;
    flex-wrap: wrap;

    justify-content: center; //flex-end | center | space-between | space-around;
}

.head {
    line-height: 40px;
    vertical-align: middle;
    background: #f2f2f2;

    span {
        margin-left: 10px;
        letter-spacing: 2px;
        font-size: 14px;
    }
}

.item {
    position: relative; //left: 50%;
    //transform: translateX(-50%);
    flex: 0 40%;
    padding: 10px 0;
    border: 1px solid #ddd;
    margin: 10px;
    .close-btn {
        padding-right: 10px;
        position: absolute;
        right: 1px;
    }

    img {
        width: 100px;
        height: 100px;
    }
}


.avatar-uploader .el-upload {
    border: none;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
}

.avatar-uploader-icon {
    font-size: 20px;
    color: #8c939d;
    width: 375px;
    height: 120px;
    line-height: 120px;
    text-align: center;
    background-color: #ecf3fc;
}

.url-box {
    div {
        margin-top: 5px;
    }
    span {
        margin-right: 5px;
    }
}

.foot {
    margin: 10px;
}
.switch{
    display: block;
    padding: 10px 0;
    text-indent: 10px;
}
.avatar-uploader{
    text-align: center
}
</style>
