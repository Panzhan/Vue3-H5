// 账号管理页面的所有接口
import {
    POST,
    GET,
} from '@/utils/http'
const ShareApi = {
    // 获取单个鉴定单信息
    getIdentify: (params = {}) => {
        return GET('/api/checkservice/open/queryone', params)
    },
}
export default ShareApi
