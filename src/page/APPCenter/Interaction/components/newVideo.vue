<template>
    <div class="newVideo selCommon">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm">
            <el-form-item label="标题：" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="标签：">
                <el-tag :key="tag" type="primary" v-for="tag in dynamicTags" :closable="true" :close-transition="false" @close="handleClose(tag)">{{tag}}</el-tag>
                <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="mini" @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"></el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加新标签</el-button>
            </el-form-item>
            <el-form-item label="视频分类：" prop="module">
                <el-radio class="radio" v-model="ruleForm.typeId" label="1">品牌宣传</el-radio>
                <el-radio class="radio" v-model="ruleForm.typeId" label="2">项目导购</el-radio>
            </el-form-item>
            <el-form-item label="商品：">
                <el-tag :key="tag"  v-for="tag in goodsTags" :closable="true" :close-transition="false" @close="handleClose(tag)">{{tag}}</el-tag>
                <el-select v-model="ruleForm.goods" filterable remote style="width: 400px"  @change="selProject" placeholder="请输入关键词" :remote-method="remoteMethod" :loading="loading1">
                    <el-option v-for="(item,index) in options" :key="index" :label="item.Name" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="视频：" prop="videoUrl">
                <el-progress type="circle" :percentage="percentage" v-if="loading"></el-progress>
                <div v-if="videoUrl" style="color: #00a0e9" element-loading-text="上传中">{{videoName}}
                    <!-- <br/>视频大小：{{videoSize}}M -->
                </div>
                <el-upload
                    :action="action"
                    accept="video/*"
                    :show-file-list="false"
                    :on-success="handleVideoSuccess"
                    :on-progress="progress"
                    :before-upload="beforeVideoUpload">
                    <el-button type="primary" :disabled="disable">上传
                        <i class="el-icon-upload el-icon--right"></i>
                    </el-button>
                    <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                </el-upload>
                <video v-if="videourl" :src="videourl" controls="controls" id="aa" ref="video" width="300px"></video>
            </el-form-item>
            <el-form-item label="视频封面：" prop="pic">
                <span>(请上传800*800已上的图片，小于1M)</span>
                <el-upload class="avatar-uploader" :action="action" :accept="acceptImage" :show-file-list="false" :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="onSubmit('ruleForm')" :loading="saveLoading">确定</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import { baseImgPath } from "@/config/env";
    import { acceptImage } from '@/config/common'
    import "@/style/selfCommon.less";
    import { getCookie,delCookie } from "@/config/mUtils";
    import { GetGoodsByKeywords, CreateVideo,DelImg } from "@/api/myData";
    export default {
        data() {
            var checkFile = (rule, value, callback) => {
                if (this.imageUrl.length == 0) {
                    return callback(new Error("请上传图片"));
                } else {
                    callback();
                }
            };
            var checkVideo = (rule, value, callback) => {
                if (this.videoUrl.length == 0) {
                    return callback(new Error("请上传视频"));
                } else {
                    callback();
                }
            };
            return {
                goodsTags:[],
                saveLoading:false,
                projectList:[],
                disable: false,
                loading: false,
                loading1: false,
                acceptImage: "",
                action: "",
                imageUrl: "",
                options: [],
                ruleForm: {
                    title: "",
                    goods: "",
                    imgUrl: "",
                    typeId:'1',
                    status:1,
                },
                rules: {
                    title: [{
                        required: true,
                        message: "请填写标题",
                        trigger: "blur"
                    }],
                    pic: [{
                        validator: checkFile,
                        trigger: "change"
                    }],
                    videoUrl: [{
                        validator: checkVideo
                    }]
                },
                dynamicTags: [],
                goodsList:[],
                inputVisible: false,
                inputValue: "",
                videoUrl: "",
                videoName: "",
                videoSize: "",
                percentage: 0,
                videoLength: "",
                videourl: "",
                projectList:[],
            };
        },
        watch: {
            //  限制选择商品个数小于10
            "ruleForm.goods": {
                handler(curVal, oldVal) {
                    if (curVal.length > 10) {
                        this.ruleForm.goods.splice(0, 1);
                    }
                },
                deep: true
            }
        },
        props:{
            videoMes:{}
        },
        mounted() {
            this.action = baseImgPath + "/api/Image/UploadImg?op=video";
            this.acceptImage = acceptImage;
            if(this.videoMes.id){
                this.copyWorth(this.videoMes)
            }
        },
        methods: {
            copyWorth(data){
                for(let key in data){
                    if(data[key] == null){
                        data[key] = ''
                    }
                }
                this.ruleForm.title = data.title
                this.ruleForm.typeId = data.typeId
                this.ruleForm.status = data.status
                this.ruleForm.imgUrl = data.picture
                this.imageUrl = data.picture?baseImgPath+data.picture:''
                this.videoUrl = data.videoUrl
                this.videourl = data.videoUrl
                this.dynamicTags = data.tab.split(",")
            },
            selProject(){
                if(this.ruleForm.goods.Name){
                    
                    this.goodsTags.push(this.ruleForm.goods.Name)
                    this.goodsList.push(this.ruleForm.goods)
                    this.ruleForm.goods = ""
                }
            },
            handleClose(tag) {
                this.goodsTags.splice(this.goodsTags.indexOf(tag), 1);
                this.goodsList.splice(this.goodsTags.indexOf(tag), 1)
            },

            async getGoodsByKeywords(params) {
                try {
                    let res = await GetGoodsByKeywords(params);
                    let vm = this;
                    setTimeout(() => {
                        vm.loading1 = false;
                        if (res instanceof Array && res.length > 0) {
                            for (let item of res) {
                                this.options.push({
                                    value: '(' + item["GoodsEntity"]["Code"] + ')' + item["GoodsEntity"]["GoodsAlias"],
                                    code: item["GoodsEntity"]["Code"],
                                    Name: item["GoodsEntity"]["Name"],
                                    GoodsAlias:item["GoodsEntity"]["GoodsAlias"],
                                    ServiceMan: item["GoodsEntity"]['ServiceMan'],
                                    ServiceManName: item["GoodsEntity"]['ServiceManName'],

                                    price: item["GoodsEntity"]['PriceSale'],
                                    FarePercent: item["GoodsEntity"]['FarePercent'],

                                    SupplierCode: item["GoodsEntity"]['SupplierCode'],
                                    SupplierName: item["GoodsEntity"]['SupplierName'],
                                    GUList: item["GUList"]
                                })
                            }
                        }
                    }, 200)
                } catch (err) {
                    console.log(err);
                }
            },
            async createVideo(params) {
                try {
                    this.saveLoading = true
                    let res = await CreateVideo(params);
                    if (res.status == true) {
                        this.$message({
                            message: "创建成功",
                            type: "success"
                        });
                        this.$emit("close", false);
                    } else {
                        this.$message.error("创建失败");
                    }
                    this.saveLoading = false
                } catch (err) {
                    console.log(err);
                }
            },
            onSubmit(formName) {
                let arr = [];
                this.goodsList.forEach(row => {
                    arr.push({
                        id: row.code
                    });
                });
                
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.createVideo({
                            title: this.ruleForm.title,
                            videoUrl: this.videoUrl,
                            picture: this.ruleForm.imgUrl,
                            createDate: new Date().formatDate("yyyy-MM-dd"),
                            tab: this.dynamicTags.join(","),
                            goodsList: arr,
                            userName: getCookie("userName"),
                            userId: getCookie("userId"),
                            videoSize: this.videoSize + "M",
                            videoLength: this.videoLength,
                            status: 1,
                            typeId:this.ruleForm.typeId
                        });
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.$emit("close", false);
            },
            handleAvatarSuccess(res, file) {
                if(this.ruleForm.imgUrl!=''){
                    this.DelImg(this.ruleForm.imgUrl)
                }
                this.imageUrl = baseImgPath + file.response;
                this.ruleForm.imgUrl = file.response;
            },
            handleVideoSuccess(res, file) {
                this.loading = false;
                this.disable = false;
                if(this.videoUrl!=''){
                    this.DelImg(this.videoUrl)
                }
                this.videoUrl = file.response;
                this.videourl = baseImgPath + file.response;
                this.videoName = file.name;
                this.videoSize = this.toDecimal(file.size / 1024 / 1024);
            },
            // 删除原图片/视频
            async DelImg(filepath){
                let res = await DelImg({filepath:filepath})
                if(!res.status){        
                this.$message({message: '原图片删除失败！'+res.errorMessage,type: 'warning'});
                }
            },
            beforeAvatarUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 1;
                if (!isLt2M) {
                    this.$message.error("上传图片大小不能超过 1MB!");
                }
                return isLt2M;
            },
            beforeVideoUpload(file) {
                this.loading = true;
                this.disable = true;
            },
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },
            progress(event, file, fileList) {
                console.log(file);
                this.percentage = Math.floor(file.percentage);
                this.videoName = file.name;
                this.videoSize = this.toDecimal(file.size / 1024 / 1024);
            },
            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.dynamicTags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = "";
            },
            toDecimal(x) {
                var f = parseFloat(x);
                if (isNaN(f)) {
                    return;
                }
                f = Math.round(x * 100) / 100;
                return f;
            },
            remoteMethod(query) {
                
                if (query !== "") {
                    this.loading1 = true;
                    this.getGoodsByKeywords({
                        keywords: query.removeSP(),
                        IsMall: 0
                    });
                } else {
                    this.options = [];
                }
            },
            getTimeLength(time) {
                if (time < 60) {
                    return Math.floor(time) + "秒";
                }
                if (3600 > time > 60) {
                    return parseInt(time / 60) + "分钟" + Math.floor(time % 60) + "秒";
                }
            }
        },
        components: {}
    };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
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
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
        background-color: #fbfdff;
        border: 1px dashed #c0ccda;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .dialog-footer {
        text-align: center;
    }
    .my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}

</style>
