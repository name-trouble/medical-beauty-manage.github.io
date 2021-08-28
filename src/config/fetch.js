import { xmxUrl } from './env'
import {getCookie} from "./mUtils"

export default async(url = '', data = {}, type = 'GET', ContentType = 'application/x-www-form-urlencoded;charset=utf-8', method = 'fetch') => {
    type = type.toUpperCase();
    url = "http://192.168.0.156/api" + url;
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
        if (type == 'POST') {
            if (ContentType == "application/json") {
                Object.defineProperty(requestConfig, 'body', {
                    value: data
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
            console.log('data', JSON.stringify(data))
            console.log('response', responseJson)
            return responseJson
        } catch (error) {
            console.log('url', url)
            console.log('data', JSON.stringify(data))
            console.log('error', error)
            throw new Error(error)
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
                sendData = JSON.stringify(data) //JSON.stringify(data);
            }

            requestObj.open(type, url, true)
            requestObj.setRequestHeader("Content-type", ContentType)
            requestObj.send(sendData)

            requestObj.onreadystatechange = () => {
                if (requestObj.readyState == 4) {
                    if (requestObj.status == 200) {
                        let obj = requestObj.response
                        if (typeof obj !== 'object') {
                            obj = JSON.parse(obj);
                        }
                        resolve(obj)
                    } else {
                        reject(requestObj)
                    }
                }
            }
        })
    }
}
