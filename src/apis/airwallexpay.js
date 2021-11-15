// 账号管理页面的所有接口
import {
    POST,
    GET,
} from '@/utils/http'
const AircheckpayApi = {
    // https://www.tapd.cn/68250976/markdown_wikis/show/#1168250976001000234
    clientsecret: (params = {}) => {
        return GET('/api/checkservice/pay/getclientsecret', params)
    },
    aircheckpay: (params = {}) => {
        return POST('/api/checkservice/pay/aircheckpay', params)
    },
    // airwallex 2.0查询airwallex 支付密钥
    waxV2clientsecret: (params = {}) => {
        return GET('/api/accountservice/airwallexpay/getclientsecret', params)
    },
    // airwallex 2.0airwallex 创建支付商城订单
    waxV2aircheckpay: (params = {}) => {
        return POST('/api/accountservice/airwallexpay/aircheckpay', params)
    },
    // airwallex 2.0获取国家接口,区号
    getcountry: (params = {}) => {
        return GET('/api/accountservice/useraddr/getcountryconfig', params)
    },
    // airwallex 2.0获取省
    getProvince: (params = {}) => {
        return GET('/api/accountservice/useraddr/getstate', params)
    },
    // airwallex 2.0获取市
    getCitys: (params = {}) => {
        return GET('/api/accountservice/useraddr/getcounty', params)
    },
    // airwallex 2.0新增账单地址
    saveOrderAddress: (params = {}) => {
        return POST('/api/accountservice/useraddr/add', params)
    },
    // airwallex 2.0更新账单地址
    updateOrderAddress: (params = {}) => {
        return POST('/api/accountservice/useraddr/update', params)
    },
    // airwallex 2.0获取账单地址
    getUserOrderAddress: (params = {}) => {
        return GET('/api/accountservice/useraddr/findone', params)
    }, 
}
export default AircheckpayApi
