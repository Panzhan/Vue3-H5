<template>
    <div class="cvv_submit">
        <img @click.stop="cancleCVVSubmit" class="close_icon" :src="awxPopClose" alt="">
        <span class="p_card_info">
            <img class="card_icon" :src="cardIcon" alt="">
            <span v-if="Object.keys(paymentmethods).length" class="card_text">{{paymentmethods.brand+"("+'尾号'+paymentmethods.last4+")"}}</span>
        </span>
        <div class="cvv_box">
            <div id="subCvc" class="submit_cvc"></div>
        </div>
        <div class="submit_click_disabled" :class="isSelectCVCcomplete ? 'submit_click_complete' : ''" @click="handlePopupAwxSubmit">{{ 'Confirm' }}</div>
    </div>
</template>
  
<script>
import { AircheckpayApi } from "@/apis";
import { Toast } from "vant";
import { useRouter, useRoute } from "vue-router";
import {
    toRefs,
    reactive,
    onMounted,
    getCurrentInstance,
    onBeforeUnmount,
    watch,
    computed,
    nextTick,
    defineComponent,
} from "vue";
const PAY_RESULT_MAP = {
    2: "SUCCEEDED",
};
export default defineComponent ({
    props: {
        paymentmethods: {
            type: Object,
            default: {}
        },
        id:{
            type: String,
            default: ''
        },
        clientsecret: {
            type: String ,
            default: ''
        },
        payment_method: {
            type: Object,
            default: {}
        }
    },
    name: "cvvSubmit",
    setup(props, {emit}) {
        const state = reactive({
            cardIcon: "https://static.solestagesupply.com/solestage/9cbc750c55484994aece8a8be84f2479.png",
            awxPopClose: require('../../../assets/img/awx_pop_close.png'),
            isSelectCVCcomplete: false,
            ele: null
        });
        const { ctx } = getCurrentInstance();
        const route = useRoute();
        const router = useRouter();
        onMounted(() => {
            // TODO:修改vue.config文件
            // TODO:修改vue.config文件
            // TODO:修改vue.config文件
            console.log('props',props, emit)
            initPage();
        });
        // 页面初始化
        const initPage = async () => {
            // 加载airwallex组件loading
            const AIRWALLEX_ENV =
                process.env.VUE_APP_ENV == "development" ? "demo" : "prod";
            Airwallex.init({
                origin: window.location.origin,
                // TODO: 测试环境:demo,线上:prod
                env: AIRWALLEX_ENV,
                locale: "en",
            });
            const subCvc = Airwallex.createElement("cvc", {
                placeholder: "Enter CVV",
            });
            subCvc.mount("subCvc");
            state.ele = subCvc
            setTimeout(()=>{
                // TODO:参数拼接
                document
                    .getElementById('subCvc')
                    .addEventListener('onChange', (event) => {
                        console.log('cvc_cvc_',event)
                        const { complete } = event.detail;
                        state.isSelectCVCcomplete = complete
                    });
            })
            // 防止 js未加载完
            window.addEventListener("load", () => {

            });
        };
        const handlePopupAwxSubmit = () => {
            const pickCardPayParams = {
                id: props.id, 
                client_secret: props.clientsecret, 
                // TODO: 更换ELEMENT
                element: state.ele, 
                payment_consent_id: props.paymentmethods.cst_id,
                // payment_method:props.payment_method
            }
            console.log('子组件传递参数pickCardPayParams', pickCardPayParams)
            emit('pickCardPay', pickCardPayParams)
        }
        const cancleCVVSubmit = () =>{
            emit('canclePop')
        }
        return {
            ...toRefs(state),
            initPage,
            handlePopupAwxSubmit,
            cancleCVVSubmit,
        };
    },
    // 定义属性
    watch: {},
});
</script>
  
<style lang="scss">
@import "../style/cvvsubmit.scss";
</style>