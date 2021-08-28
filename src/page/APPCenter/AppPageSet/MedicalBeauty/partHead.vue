<template>
    <div class="flex-box">
        <div class="before"> </div>
        <div class="center">
            <img :src="img">
            <span>{{ text }}</span>
        </div>

        <div class="more">
            <span>更多</span>
            <i class="el-icon-arrow-right"></i>
        </div>
    </div>
</template>

<script>
// import icon from '../lib/home_doctor.png'
export default {

    props: {
        img: { type: String },
        text: String
    }
}
</script>

<style scoped lang="less">
.flex-box {
    display: flex;
    display: -webkit-flex;
    margin: 10px 0;
    width: 100%;
}

.before,
.more {
    flex: 0 25%;
}

.more {
    text-align: right;

    span {
        font-size: 12px;
        color: #ddd;
        line-height: 25px;
    }
    i {
        color: #ddd;
        padding-right: 25px;
    }
}

.center {
    flex: 0 50%;
    text-align: center;
    img {
        width: 25px;
        height: 25px;
    }

    span {
        font-size: 16px;
        font-weight: 600;
        letter-spacing: 4px;
    }
}


* {
    vertical-align: middle;
}
</style>
