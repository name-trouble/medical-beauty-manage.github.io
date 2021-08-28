<template>
    <div>
        <div class="head">
            <span>编辑二级导航</span>
        </div>

        <div class="el-card content">
            <div class="title flex-box">
                <div class="">
                    <span>板块图标</span>
                </div>
                <el-upload class="avatar-uploader" :action="uploadUrl" :accept="acceptImage" :show-file-list="false" :on-success="successA">
                    <img :src="baseImgPath + part.image" v-if="part.image">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <div class="flex-item">
                    <span>建议尺寸140 * 140</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { xmxUrl, baseImgPath} from '@/config/env'
import { imgApi, pageSetList, acceptImage } from '@/config/common'

import { AppWidgetListEdit,DelImg } from '@/api/myData'
export default {
    props: {
        data: Object
    },

    data() {
        return {
            part: {
                id: '',
                name: "sample string 1",
                sort: 1,
                agentId: '',
                //"pageId": 1,
                //"layoutStyle": 1,
                image: "",
                isShowName: true,

                modifiedUserId: "",
                modifiedBy: "",
                modifiedOn: ""
            },
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
        async DelImg(filepath){
            let res = await DelImg({filepath:filepath})
            if(!res.status){        
               this.$message({message: '原图片删除失败！'+res.errorMessage,type: 'warning'});
            }
            
        },
        successA(res, file) {
            if(this.list[this.imgIndex].pictureUrl!=''){
                this.DelImg(this.list[this.imgIndex].pictureUrl)
            }
            this.part.image = res
            this.list[this.imgIndex].pictureUrl = res
        },
    },
}
</script>

<style lang="less" scoped>
@img-height:80px;  
.flex-box {
    display: flex;
    display: -webkit-flex;
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

.title {
    margin: 5px;
    span {
        display: inline-block;
        height: 10px;
    }
}

.avatar-uploader {
    border: 1px dashed #d9d9d9;
    display: inline-block; // width: 100px;
    height:@img-height;
    border-radius: 50%;
    img {
        border-radius: 50%;
        width: @img-height;
        height:@img-height;
    }
}

.avatar-uploader .el-upload {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
}

.avatar-uploader-icon {

    font-size: 28px;
    color: #8c939d;
    width:@img-height;
    height:@img-height;
    line-height: @img-height;
    text-align: center;
}

.avatar {
    width: @img-height;
    height:@img-height;
    display: block;
}
</style>
