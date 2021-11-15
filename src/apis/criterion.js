// 账号管理页面的所有接口
import {
    POST,
    GET,
} from '@/utils/http'
const CriterionApi = {
    // 获取单个鉴定单信息
    gettemplate: (params = {}) => {
        return POST('/api/checkservice/open/gettemplate', params)
    },
}
export default CriterionApi
