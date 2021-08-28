<template>
    <div class="flex-box home-live" v-if="data.id||data.id==0">
        <div class="left flex-box">
            <img src="../../../assets/image/red.png">
            <div class="word">
                <p>禾长青</p>
                <p>无痕祛眼袋之父</p>
            </div>
        </div>

        <div class="right">
            <div class="mark">
                <span>专家座谈会</span>
            </div>
            <p>83465人看过</p>
        </div>
        <div class="live-info">
            <img class="live-img" src="../../../assets/image/purple.png">
            <div class="live-icon">
                <img src="../lib/img/home_icon_live.png">
                <span>波士邦直播</span>
            </div>

            <span class="foot-word">这里是直播名称</span>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.home-live {
    margin: 0.25rem 0.4rem 0 0.4rem;
}

.left {
    flex: 1;
    img {
        width: 1.07rem;
        height: 1.07rem;
        border-radius: 50%;
    }
    .word {
        margin: 0 0.25rem;
    }
}

.right {
    flex: 1;
    text-align: right;
    .mark {
        margin-top: -0.25rem;
        margin-bottom: 0.25rem;
        span {
            margin-top: -60px;
            padding: 0.05rem 0.15rem;
            background: rgba(253, 220, 202, 0.50);
            font-size: 0.27rem;
            color: #DAA589;
        }
    }

    p {
        color: #999999;
        font-size: 0.32rem;
    }
}

.live-info {
    width: 100%;
    margin: 0.25rem 0;
    position: relative;
    text-align: center;
    .live-img {
        height: 4.8rem;
        width: 100%;
    }

    .live-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2; //  width: 1.34rem;
        img {
            width: 1.33rem;
            height: 0.83rem;
        }

        span {
            display: block;
            font-size: 0.37rem;
            color: #FFFFFF;
            letter-spacing: 2px;
        }
    }


    .foot-word {
        position: absolute;
        z-index: 2;
        letter-spacing: 1px;
        bottom: 0.35rem;
        left: 0.4rem;
        font-size: 0.32rem;
        color: #FFFFFF;
    }
}
</style>
