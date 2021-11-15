import {
    AppPageType
} from './enum'
export default function dealParams(customParams) {
    let callparam = {}
    switch (customParams.name) {
        // 顶部样式title
        case 'SetTitleStyle':
            callparam = {
                acBody: customParams.acBody,
                actiontype: AppPageType.SetTitleStyle
            }
            break
        // 打开原生页面
        case 'OpenAppPage':
            callparam = {
                acBody: customParams.acBody,
                actiontype: AppPageType.OpenAppPage
            }
            break
        // 关闭h5页面
        case 'CloseCurrentPage':
            callparam = {
                acBody: customParams.acBody,
                actiontype: AppPageType.CloseCurrentPage
            }
            break
        // 支付结果
        case 'PayResult':
            callparam = {
                acBody: customParams.acBody,
                actiontype: AppPageType.PayResult
            }
            break
    }
    return callparam
}