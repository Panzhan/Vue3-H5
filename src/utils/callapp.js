const appStore = 'https://apps.apple.com/cn/app/id1542947022' // https://sj.qq.com/myapp/detail.htm?apkName=com.etechs.eyee
const loadUrl = '' // https://a.app.qq.com/o/simple.jsp?pkgname=com.etechs.eyee
const schemeUrl = 'solestage://'
const redirectLink = 'solestage/h5?param='

const tryDelay = 400
const showHintDelay = 700
const skipLoadDelay = 1300

var skipLoadTimer = null

function clearSkipLoad() {
    if (skipLoadTimer) clearTimeout(skipLoadTimer)
}
document.onvisibilitychange = document.webkitvisibilitychange = function () {
    let tag = document.hidden || document.webkitHidden
    if (tag) clearSkipLoad()
}
window.onpagehide = function () {
    clearSkipLoad()
}

function tryCall(url, callback = () => {}) {
    var isCalled = false
    var frame = null

    setTimeout(function () {
        isCalled = true
        frame = document.createElement('iframe')
        frame.hidden = true
        frame.style.display = 'none'
        frame.src = url
        document.body.append(frame)
        if (ENV.ios) window.location.href = url // window.open(url, '_new')
    }, tryDelay)

    setTimeout(() => {
        callback(isCalled)
        if (frame) {
            document.body.removeChild(frame)
            frame = null
        }
    }, showHintDelay)
}

var settedClick = false
/**
 * 唤起APP或下载App
 * @param {Boolean} istry 是否是尝试唤起
 * @param {Object} callparam 唤起页面的参数
 * @param {Boolean} hint 是否必须显示蒙层提示
 * @param {Element} $hint 提示使用浏览器打开的DOM元素
 */
function CallApp(callparam, hint = true, $hint) {
    console.log('ENVENVENV', ENV)
    // return
    // 内嵌app 交互
    if (ENV.app || ENV.ios || ENV.android) { 
        _JSB(callparam)
    } else {
        // 浏览器打开app
        console.log('mixin callApp: ', callparam)
        let url = schemeUrl // + redirectLink
        if (callparam && !isNaN(callparam.pagetype)) {
            url = url + redirectLink + JSON.stringify(callparam)
        } else if (!ENV.ios) {
            url = url + redirectLink
        }
        if (hint && $hint && !settedClick) {
            settedClick = true
            $hint.onclick = function () {
                $hint.style.display = 'none'
            }
        }
        const calledBack = function (isCalled) {
            let inHint = ENV.wx || ENV.qq || ENV.weibo
            if (ENV.mobile && inHint && hint) {
                $hint.style.display = 'block'
            }
            if (!inHint) {
                skipLoadTimer = setTimeout(() => {
                    // ENV.ios ? window.open(appStore, '_new') : window.location.href = loadUrl
                    window.location.href = ENV.ios ? appStore : loadUrl
                }, skipLoadDelay)
            }
        }
        tryCall(url, calledBack)
    }
}
function geParams(val){
    const {
        acBody,
        actiontype,
    } = val
    let params = {}
    if (actiontype == 2) {
         params = {
            actiontype
        }
    }
    if(actiontype == 3){
        // 设置app title
        params = {
            actiontype,
            actionbody: {
                ...acBody,
            },
        }
    } 
    if(actiontype == 4){
        // 支付回调
        params = {
            actiontype,
            actionbody: {
                ...acBody
            },
        }
    }
    return params
}

// 内嵌app 交互
function _JSB(val) {
    if (!(ENV.app || ENV.ios || ENV.android)) return
    let params = geParams(val)
    if (ENV.ios) {
        console.log(' -> ios bridge params:', params)
        window.webkit.messageHandlers.h5ActionMessage.postMessage(params);
    } 
    if(ENV.android) {
        console.log(' -> android bridge params:', params)
        android.h5ActionMessage(JSON.stringify(params))
    }
}


export default CallApp