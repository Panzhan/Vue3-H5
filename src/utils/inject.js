const ua = navigator.userAgent
const ua2 = ua.toLowerCase()
console.log('uauaua', ua)
console.log('ua2ua2ua2', ua2)
window.ENV = {
    mobile: !!ua.match(/AppleWebKit.*Mobile.*/) || !!ua.match(/AppleWebKit/),

    ios: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    android: ua.indexOf('Android') > -1,

    // 判断是否内嵌app
    app: ua2.indexOf('V3H5') !== -1,

    wx: /micromessenger/.test(ua2),
    qq: /(iPad|iPhone|iPod).*? (IPad)?QQ\/([\d\.]+)/.test(ua2) || /\bV1_AND_SQI?_([\d\.]+)(.*? QQ\/([\d\.]+))?/.test(ua2), // /qq/.test(ua2),
    weibo: /weibo/.test(ua2),
    alipay: /alipayclient/.test(ua2),
    // 请求接口判断os
    os: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ? "ios" : (ua.indexOf('Android') > -1 ? 'android' : '')
}
console.log('global env: ', ENV)
