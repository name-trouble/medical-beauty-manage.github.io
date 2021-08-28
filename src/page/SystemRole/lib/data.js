/**
 * 
 * @param {o}  要复制的object对象
 * @param {n}  复制数量
 */
function copyObj(o, n) {
    let objs = []
    let a = JSON.stringify(o)
    for (let i = 0; i < n; i++) {
        let b = JSON.parse(a)
        b["index"] = i
        objs.push(b)
    }
    return objs
}




/**
 * 
 * @param {要改动的style样式}   s
 * @param {挂载的父节点id}  d
 */
function setStyle(s, d) {
    if (document.all) {
        window.style = s
        document.createStyleSheet("javascript:style")
    } else {
        var style = document.createElement('style')
        style.type = 'text/css'
        style.innerHTML = s
            //  document.getElementsByTagName('HEAD').item(0).appendChild(style)
        document.getElementById(d).appendChild(style)
    }
}


/**
 * 
 * @param {原始数组} nodesArray 
 * @param { code 标记 } key 
 * @param { 上级 code标记 } parentkey     parentKey
 * @param { 子节点 集合} childKey 
 */
function ArrayToTree(nodesArray, key, parentKey, childKey) {
    var i, l

    if (!key || key == "" || !nodesArray) return [];

    if (nodesArray instanceof Array) {
        var r = [];
        var tmpMap = {};
        for (i = 0, l = nodesArray.length; i < l; i++) {
            tmpMap[nodesArray[i][key]] = nodesArray[i];
        }
        for (i = 0, l = nodesArray.length; i < l; i++) {
            if (tmpMap[nodesArray[i][parentKey]] && nodesArray[i][key] != nodesArray[i][parentKey]) {
                if (!tmpMap[nodesArray[i][parentKey]][childKey])
                    tmpMap[nodesArray[i][parentKey]][childKey] = [];
                tmpMap[nodesArray[i][parentKey]][childKey].push(nodesArray[i]);
            } else {
                r.push(nodesArray[i]);
            }
        }
        return r;
    } else {
        return nodesArray;
    }
}


export { setStyle, copyObj, ArrayToTree }