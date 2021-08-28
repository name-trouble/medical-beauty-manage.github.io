/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * baseImgPath: 图片存放地址
 *
 */
let xmxUrl,baseImgPath
if (process.env.NODE_ENV == 'development') {
    xmxUrl='https://www.xuanmei.pro:777/api';
    // xmxUrl='https://www.xuanmei.pro:777/api';
    baseImgPath = 'https://www.xuanmei.pro:777';
} else {
    xmxUrl='https://www.xuanmei.pro:777/api';
    baseImgPath = 'https://www.xuanmei.pro:777';
}
export {
    baseImgPath,
    xmxUrl,
}

