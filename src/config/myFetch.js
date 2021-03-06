import { xmxUrl } from './env'
import {getCookie} from "./mUtils"
import md5 from 'js-md5'
import { Message } from 'element-ui';

export default async(url = '', data = {}, type = 'GET', ContentType = 'application/x-www-form-urlencoded;charset=utf-8', method = 'fetch') => {
    type = type.toUpperCase();
    
    if(url.length==0){
        url = "http://pv.sohu.com/cityjson?ie=utf-8"
    }else{
        url = xmxUrl + url;
    }
    let dataStr = ''; //数据拼接字符串
    Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&';
    })
    if (dataStr !== '') {
        dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
    }
    if (type == 'GET') {
        url = url + '?' + dataStr;
    }

    // if(!getCookie("userId")){//登录过期提示 一天
    //     Message.error({
    //         message:  "请重新登录",
    //     })
    // }
    let obj = {
        timestamp:new Date().getTime(),
        nonce:Math.round(Math.random() * 1000),
        token : getCookie("token"),
        userid:getCookie("userId")
    };

    for(var p in data){
        obj[p] = data[p]
    }

    let sig = md5(encode(normalize(obj))).toUpperCase()

    if (window.fetch && method == 'fetch') {
        let requestConfig = {
            //credentials: 'include',
            method: type,
            headers: {
                //'Accept': 'application/json',
                "Content-Type": ContentType,
            },
            mode: "cors",
            // cache: "force-cache"
        }
        if(getCookie("userId")&&getCookie("token")){
            requestConfig.headers.userid =  obj.userid+""
            requestConfig.headers.timestamp =  obj.timestamp+""
            requestConfig.headers.nonce =  obj.nonce+""
            requestConfig.headers.signature =  sig+""
        }
        if (type == 'POST') {
            if (ContentType == "application/json") {
                Object.defineProperty(requestConfig, 'body', {
                    value: JSON.stringify(data)
                })
            } else {
                Object.defineProperty(requestConfig, 'body', {
                    value: dataStr
                })
            }
        }

        try {
            const response = await fetch(url, requestConfig);
            const responseJson = await response.json();
            console.log('url', url)
            console.log('data', data)
            console.log('response', responseJson)
            if(responseJson.errorCode&&responseJson.errorCode!='200'){
                if(responseJson.errorCode == '403'){
                    Message.error({
                        message:  responseJson.errorMessage+",请重新登录",
                    })
                }else{
                   /* Message.error({
                        message:  responseJson.errorMessage,
                    })*/
                }
            }
            return responseJson
        } catch (error) {
            console.log('url', url)
            console.log('data', data)
            console.log('error', error)
            if(error.errorMessage){
                Message.error(response.errorMessage)
            }
            // throw new Error(error)

        }
    } else {
        return new Promise((resolve, reject) => {
            let requestObj;
            if (window.XMLHttpRequest) {
                requestObj = new XMLHttpRequest();
            } else {
                requestObj = new ActiveXObject;
            }

            let sendData = '';
            if (type == 'POST') {
                if (ContentType == 'application/json') sendData = data
                else sendData = dataStr
            }

            requestObj.open(type, url, true)
            requestObj.setRequestHeader("Content-type", ContentType)
            if(getCookie("userId")&&getCookie("token")){
                requestObj.setRequestHeader("userid", obj.userid+"")
                requestObj.setRequestHeader("timestamp", obj.timestamp+"")
                requestObj.setRequestHeader("nonce", obj.nonce+"")
                requestObj.setRequestHeader("signature", sig+"")
            }
            requestObj.send(sendData)

            requestObj.onreadystatechange = () => {
                if (requestObj.readyState == 4) {
                    if (requestObj.status == 200) {
                        let obj = requestObj.response
                        if (typeof obj !== 'object') {
                            obj = JSON.parse(obj);
                        }
                        resolve(obj)
                        console.log('url', url)
                        console.log('data', JSON.stringify(data))
                        console.log('result', obj)
                    } else {
                        reject(requestObj)
                        console.log('url', url)
                        console.log('data', JSON.stringify(data))
                        console.log('error', requestObj)
                    }
                }
            }
        })
    }
}

function normalize(params) {
    var list = [];
    var keys = Object.keys(params).sort(function(s, t){
        var a = s.toLowerCase();
        var b = t.toLowerCase();
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    })
    for (let i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = params[key];
        if (Array.isArray(value)) {
            repeatList(list, key, value);
        } else {
            list.push([encode(key), encode(value)]); //push []
        }
    }
    return canonicalize(list);
}

function canonicalize(normalized) {
    var fields = [];
    for (var i = 0; i < normalized.length; i++) {
        var [key, value] = normalized[i];
        fields.push(key + '=' + value);
    }
    return fields.join('&');
}

function encode(str) {
    if(typeof(str)=== "string"){
        str=htmlDecode(str)
    }

    var result = encodeURIComponent(str);
    return result.replace(/\!/g, '%21')
        .replace(/\'/g, '%27')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29')
        .replace(/\*/g, '%2A');
}
function htmlDecode(htmlstr) {
    var s = "";
    if (htmlstr.length == 0) return "";
    s = htmlstr.replace(/%26amp;/g, "&")
     .replace(/%26lt;/g, "&lt;")
     .replace(/%26gt;/g, "&gt;")
     .replace(/%26nbsp;/g, "&nbsp;")
     .replace(/%26#39;/g, "&#39;")
     .replace(/%26quot;/g, "&quot;");
    return s;
}
function repeatList(list, key, repeat) {
    for (var i = 0; i < repeat.length; i++) {
        var item = repeat[i];
        var prefix = `${key}.${i + 1}`;
        list.push([encode(prefix), encode(item)]);
    }
    var ss = ''
    for(var i=0;i<10000;i++){
        ss+=i
    }
    console.log(new Date().getTime())
    var arr = ss.split(""),arr1 = [],len = arr.length
    for(var b=0;b<len;b++){
        if(arr1.indexOf(arr[b])<0){
            arr1.push(arr[b])
        }
    }
    console.log(new Date().getTime())
    console.log(arr1)


    var ss = ''
    for(var i=0;i<10000;i++){
        ss+=i
    }
    console.log(new Date().getTime())
    var arr = ss.split(""),arr1 = [],len = arr.length
    var arr1 = ss.replace(/(.)(?=.*\1)/g,"");
    console.log(new Date().getTime())
    console.log(arr1)
}



