import axios from 'axios'
import {
    Toast
} from 'vant';
// import Bus from './bus'
const version = process.env.VUE_APP_VERSION
console.log('process.env', process.env)
// 请求实例
const http = axios.create({
    baseURL: process.env.VUE_APP_DOMAIN,
    timeout: 8000
})
// 请求拦截器
http.interceptors.request.use(conf => {
    //   Bus.$emit('Loading', true)
    if (conf.loading)
        Toast.loading({
            message: 'Loading...',
            forbidClick: true,
        });

    conf.headers = {
        ...conf.headers,
        'Content-Type': 'application/json',
        Authorization: '',
        os: ENV.os,
        deviceid: 'h5',
        version
    }
    const token = window.localStorage.getItem('currentUser') || ''
    conf.headers.Authorization = token
    console.log('confconf', conf)
    return conf
}, err => {
    Toast.clear()
    return Promise.reject(err)
})

/**
 * 响应结果异常处理
 * @param {Object} e 异常响应结果的响应体
 */
const responseReject = e => {
    e = e.response || e
    console.error('--->response error', {
        ...e
    })
    let {
        data,
        status,
        statusText
    } = e
    let res = {
        code: 0,
        msg: 'Network connection error, try again later.'
    }
    if (status) {
        data = data || {}
        res.code = status === 200 ? (data.code || -1) : status
        res.msg = res.code === -1 ? (data.msg + (data.data ? (',' + data.data) : '')) : (data.msg || data.message || statusText || JSON.stringify(e))
        res.msg = res.code === 10721 ? (data.msg + (data.data ? (',' + data.data) : '')) : (data.msg || data.message || statusText || JSON.stringify(e))

    }
    if (data.code == 1511401) {
        Toast(data.msg)
    }
    Toast.clear()
    return Promise.reject(res)
}

// 响应结果拦截器
http.interceptors.response.use(res => {
        console.log('-->response', res)
        if (res.status === 200) {
            if (res.data && res.data.code === 1511200) {
                Toast.clear()
                let data = res.data.data || res.data
                return data
            } else {
                Toast(res.data.msg)
            }
        }
        return responseReject(res)
    }, err => {
        console.log('-->error', err);
        responseReject(err)
    }

)

/**
 * 处理请求地址(mock处理)
 * @param {String} url 请求地址
 */
const dealUrl = url => {
    const mockPre = '/mock'
    // 使用mock数据时，需在请求地址前增加前缀 '/mock' 由基础请求处理掉
    let baseURL = ''
    if (!/http/i.test(url) && url.indexOf(mockPre) === 0) {
        url = url.replace(mockPre, '')
        baseURL = process.env.VUE_APP_MOCKDOMAIN || ''
    }
    return {
        realUrl: url,
        baseURL
    }
}

/**
 * HttpGet请求
 * @param {String} url 请求地址
 * @param {Object?} params 请求参数
 */
const GET = (url, params = {}) => {
    let config = {
        params
    }
    let {
        realUrl,
        baseURL
    } = dealUrl(url)
    if (baseURL) config.baseURL = baseURL
    return http.get(realUrl, config)
}

/**
 * HttpPost请求
 * @param {String} url 请求地址
 * @param {Object?} params 请求参数
 */
const POST = (url, params = {}, loading = 1) => {
    let config = {
        loading
    }
    let {
        realUrl,
        baseURL
    } = dealUrl(url)
    if (baseURL) config.baseURL = baseURL
    return http.post(realUrl, params, config)
}

export {
    GET,
    POST
}