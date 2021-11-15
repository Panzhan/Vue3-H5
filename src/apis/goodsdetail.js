// 账号管理页面的所有接口
import {
    POST,
    GET,
} from '@/utils/http'
const GoodsdetailApi = {
    // 获取商品详情
    // https://www.tapd.cn/68250976/markdown_wikis/show/#1168250976001000357
    findproductinfo: (params = {}) => {
        return GET('/api/productservice/open/findproductinfo', params)
    },
}
export default GoodsdetailApi
