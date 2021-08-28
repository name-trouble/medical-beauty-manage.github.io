<template>
    <div>
        <div class="head">
            <span>编辑直播</span>
        </div>

        <div class="el-card content" >
            <div class="title flex-box">
                <div class="" style="margin-top:30px;margin-right:10px">
                    <span>板块图标</span>
                </div>
                <el-upload class="avatar-uploader" :action="uploadUrl" :accept="acceptImage" :show-file-list="false" :on-success="success">
                    <img :src="baseImgPath + part.image" v-if="part.image">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <div class="flex-item" style="margin-top:30px;margin-left:10px">
                    <span>建议尺寸140 * 140</span>
                </div>
            </div>
            <div class="flex-box" style="margin-top:15px;">
                <span style="padding:5px;">板块名称：</span>
                <el-input style="width:40%;" v-model="part.name" size="small"></el-input>
                  <el-checkbox style="padding:5px;" type="checkbox" v-model="part.isShowName">显示板块图标和板块名称</el-checkbox>
            </div>

            <div class="flex-box" style="margin-top:15px;">
                 <div style="margin-top:10px;">
                    <span>选择：</span>
                </div>
                <div class="flex-box" style="width:550px;">

                <div style="margin:5px;width:120px;height:135px;" v-for="(item,$index) in list" :key="$index">
                <div class="avatar-photo" style="width:120px;height:120px;" @click="showSelectList($index)">
                        <img style="width:120px;height:auto;border-radius:0px;" :src="baseImgPath + item.pictureUrl" v-if="item.pictureUrl">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                       <span  class="nameInput">{{item.name}}</span>
                </div>
                 
                <div>
                      <el-button  size="mini" icon="delete" @click="unSelect($index)">取消选择</el-button>
                </div>
                </div>
                </div>
               
            </div>

            <div class="foot" style="margin-bottom:15px;margin-top:50px;">
                <el-button size="small" type="success" @click="submit" style="width:70px;height:30px;">保存</el-button>
                <el-button size="small" style="width:70px;height:30px;" @click="cancel">取消</el-button>
            </div>
        </div>
            <!-- 活动列表选择 -->
        <el-dialog title="直播"  :visible.sync="popShow" top="10%" size="">
            <live-list @LiveSelectInfo="LiveSelectInfo"  style="width:800px;"></live-list>
        </el-dialog>
    </div>
</template>

<script>
import { xmxUrl, baseImgPath } from '@/config/env'
import { imgApi, pageSetList, acceptImage } from '@/config/common'
import { AppWidgetListEdit,PagePartEdit ,widgetlist} from '@/api/myData'

export default {
    components: { },
    props: {
        data: Object
    },

    created() {
        this.getData()
    },
    data() {
        return {
            popShow : false,
            caseIndex:0,
            part: {
                id: this.data.id,
                name: this.data.name,
                sort: this.data.sort,
                agentId: this.data.agentId,
                pageId: this.data.pageId,
                layoutStyle: this.data.layoutStyle,
                image: this.data.image,
                isShowName: this.data.isShowName,

                createUserId : this.data.createUserId,
                createOn : this.data.createOn,
                createBy : this.data.createBy,

                modifiedUserId: this.data.modifiedUserId,
                modifiedBy: this.data.modifiedBy,
                modifiedOn: this.data.modifiedOn
            },
            list: this.data.widgets,
            star: 5,
            baseImgPath,
            acceptImage,
            uploadUrl: xmxUrl + imgApi + '?op=appset',
            imgIndex: "",
            pageSetList,  //页面 配置  { name: "网页", linkType: "0", linkUrl: "" },
            OrderIndex: -1,  //当前顺序
            testimg:"",
        }

        
    },

    // created:function ()  {

    // },

    methods: {

        async getData() {
             ;
            let res = await widgetlist(this.data.id)
            this.list = res.data
        },
        success(res, file) {
            this.part.image = res
        },

        successA(res, file) {
            // this.part.image = res
            this.list[this.imgIndex].pictureUrl = res
        },

        showSelectList(index){
            this.caseIndex = index;
            this.popShow = true
        },
        submit() {
            this.$confirm('确认修改吗？', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' })
                .then(() => {
                    this.saveData()
                }).catch(() => {
                    //this.$message({ type: 'info', message: '已取消！' })
                })
        },
        async saveData() {
            let res2 = await PagePartEdit(this.part);
            let res = await AppWidgetListEdit(this.list)
            if (res2.status && res2.status === true && res.status && res.status === true) {
                this.$message({ type: 'success', message: '保存成功！' })
                this.$emit('update', { data: this.list, index: 3 })
            }
            else {
                this.$message({ type: 'error', message: '保存失败！' })
            }
        },
        cancel() {
            this.$emit('update', { 'data': [], 'index': 0 })
        },
        LiveSelectInfo(id,img,name,sawCount)
        {
            this.list[this.caseIndex].linkUrl = id;
            this.list[this.caseIndex].name = name;
            this.list[this.caseIndex].pictureUrl = img;
            this.list[this.caseIndex].level = sawCount;
            this.popShow = false;
            
        },

        unSelect(caseIndex)
        {
            this.list[caseIndex].linkUrl = null;
            this.list[caseIndex].name = null;
            this.list[caseIndex].pictureUrl = null;
        }
    },
}
</script>

<style lang="less" scoped>
@img-height:80px;  

.nameInput{
    border-style: hidden;
    height: 15px;
}
.content{
    width:660px;
    margin-bottom:20px;
     padding-top:20px;
    padding-left: 30px
}
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
    background-color:azure;
    img {
        border-radius: 50%;
        width: @img-height;
        height:@img-height;
    }
}

.avatar-photo {
    border: 1px dashed #d9d9d9;
    display: inline-block; // width: 100px;
    height:@img-height;
   background-color:azure;
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

.foot {
    margin: 20px;
    margin-left:70px; 
}
</style>
