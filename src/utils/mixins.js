
import CallApp from '@/utils/callapp'
import dealParams from './dealAppParams'

/**
 * 全局混入
 */
const Mixin = {
    methods: {
        /**
         * 
         * @param {*} hint // 蒙层
         * @param {*} customParams  // 自定义参数
         */
        callApp(customParams = {}, hint = true,) {
            let callparam = dealParams(customParams)
            
            CallApp(callparam, hint, document.getElementById('goAppHint'))
        }
    }
}

export default Mixin

