<template>
    <div class="awx_payment_v2">
        <div class="title_box">
            <span class="back com" @click="handleExit()"
                ><img :src="backIcon" alt=""
            /></span>
            <span class="title com">{{ pageTitle }}</span>
            <span class="com"></span>
        </div>
        <div class="empty"></div>
        <div>
            <!-- 未支付过时卡信息 -->
            <div v-show="isInputPay" class="card_info">
                <span class="title">Credit Card/ Debit Card</span>
                <div id="cardNumber" class="air_card_number"></div>
                <span class="cvv_expiry">
                    <div id="expiry" class="air_expiry"></div>
                    <div id="cvc" class="air_cvc"></div>
                </span>
            </div>
            <!-- 使用卡支付过时信息 -->
            <div v-show="!isInputPay" class="card_info">
                <span class="title">Credit Card/ Debit Card</span>
                <span class="edit_card" @click="handleInputNewCard">Edit</span>
                <span v-if="paymentmethods.length" class="last_card">
                    <img class="card_icon" :src="cardIcon" alt="">
                    <span class="card_text">{{paymentmethods[0]['brand']+"("+'尾号'+paymentmethods[0]['last4']+")"}}</span>
                    <img class="card_pick" :src="pickIcon" alt="">
                </span>
            </div>
        </div>
        <div class="empty"></div>
        <!-- 用户信息 -->
        <div class="card_info card_info_second">
            <span class="title">Billing Address</span>
            <!-- {{provincesAndCitiesOptions}}<br>
            {{countryCascaderValue}}<br>
            {{provincesAndCitiesCascaderValue}} -->
            <div class="first_last_name line_block">
                <van-field
                    :disabled="isFormdisabled"
                    @blur="usernameBlur"
                    class="itp_border_gray itp_border_short"
                    v-model="first_name"
                    placeholder="First Name"
                />
                <van-field
                    :disabled="isFormdisabled"
                    @blur="usernameBlur"
                    class="itp_border_gray itp_border_short"
                    v-model="last_name"
                    placeholder="Last Name"
                />
            </div>
            <van-field
                :disabled="isFormdisabled"
                @blur="usernameBlur"
                class="itp_border_gray line_block"
                v-model="country_code"
                is-link
                readonly
                name="picker"
                placeholder="Country / Region"
                @click="!isFormdisabled ? countryPicker = true : ''"
            />
            <van-field
                :disabled="isFormdisabled"
                @blur="usernameBlur"
                class="itp_border_gray line_block"
                v-model="street"
                placeholder="Address 1: Street address, P.O box, c/o"
            />
            <van-field
                :disabled="isFormdisabled"
                @blur="usernameBlur"
                class="itp_border_gray line_block"
                v-model="apartmentinfo"
                placeholder="Address 2: Apt, suite, unit, buiding, floor, etc."
            />
            <van-field
                :disabled="isFormdisabled"
                @blur="usernameBlur"
                class="itp_border_gray line_block"
                v-model="city"
                placeholder="City"
            />
            <van-field
                :disabled="isFormdisabled"
                @blur="usernameBlur"
                class="itp_border_gray line_block"
                v-model="state"
                is-link
                readonly
                name="picker"
                placeholder="State / Province / Region"
                @click="!isFormdisabled ? provincesAndCitiesPicker = true : ''"
            />
            <van-field
                :disabled="isFormdisabled"
                @blur="usernameBlur"
                class="itp_border_gray line_block"
                v-model="postcode"
                placeholder="Zip / Postal code"
            />
            <div class="phone line_block">
                <van-field
                    :disabled="true"
                    class="itp_border_gray ipt_mini"
                    v-model="countryCode"
                    placeholder="+1"
                />
                <van-field
                    :disabled="isFormdisabled"
                    @blur="usernameBlur"
                    class="itp_border_gray ipt_long"
                    v-model="phone_number"
                    placeholder="Phone Number"
                />
            </div>
        </div>
        <!-- 国家选择器 -->
        <van-popup class="country_ca_box" v-model:show="countryPicker" position="bottom">
            <van-cascader
                :closeable="false"
                v-model="countryCascaderValue"
                title="Please Select"
                active-color="#F5333F"
                :options="countryOptions"
                @close="countryCascaderShow = false"
                @finish="onCountryFinish"
                :placeholder="'Please Select'"
            />
        </van-popup>

        <!-- 省市选择器 -->
        <van-popup class="pro_city_ca_box" v-model:show="provincesAndCitiesPicker" position="bottom" :style="{ height: '80%' }">
            <van-cascader
                :closeable="false"
                v-model="provincesAndCitiesCascaderValue"
                title="Please Select"
                active-color="#F5333F"
                :options="provincesAndCitiesOptions"
                @close="provincesAndCitiesCascaderShow = false"
                @finish="onProvincesAndCitiesFinish"
                @change="onProvincesAndCitiesChange"
                :placeholder="'Please Select'"
            />
        </van-popup>

        <!-- 输入cvv -->
        <van-popup class="sub_popup_card" v-model:show="inputCVVPicker" position="bottom">
            <cvvSubmit
                :paymentmethods="paymentmethods[0]"
                :payment_method="payment_method"
                :id="id"
                :clientsecret="clientsecret"
                @canclePop="cancle"
                @pickCardPay="pickCardPay"
            >
            </cvvSubmit>
        </van-popup>
        <!-- 提交 -->
        <div
            @click.stop="handleClick"
            class="btn_submit_v2"
            :class="submitClass"
        >
            <div id="submit">{{ submitName }}</div>
        </div>
    </div>
</template>
  
<script>
import { AircheckpayApi } from "@/apis";
import { Toast } from "vant";
import { useRouter, useRoute } from "vue-router";
import cvvSubmit from './components/cvvSubmit.vue'
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
    name: "",
    components: {
        cvvSubmit
    },
    setup() {
        const state = reactive({
            first_name: "", // 名，必填
            last_name: "",// 姓 必填
            phone_number: '', // 手机号，必填
            countryPicker: false,
            provincesAndCitiesPicker: false,
            countryCascaderValue: "",
            provincesAndCitiesCascaderValue: "",
            countryCascaderShow: false,
            provincesAndCitiesCascaderShow: false,
            inputCVVPicker: false,
            country_code: "", // 国家，必填
            countryid: '',
            city: "", // 市，必填
            state: "", // 省，必填
            street: '', // 街，必填
            mobilecode: '', // 电话code
            apartmentinfo: '',//公寓信息
            postcode: '',// postcode，必填
            countryOptions: [],
            provincesAndCitiesOptions: [],
            backIcon: "",
            countryCode: '',
            airwallexid: '',
            clientsecret:'',
            orderno: '',
            paymentmethods:[{
                brand: 'visa',
                last4: '1111'
            }],
            id:'',
            templateid: '',
            amount: '',
            isInputPay: true,
            cardIcon: "https://static.solestagesupply.com/solestage/9cbc750c55484994aece8a8be84f2479.png",
            pickIcon: "https://static.solestagesupply.com/solestage/f2a0ae5504f34794ba758bf45993d52c.png",
            awxPopClose: require('../../assets/img/awx_pop_close.png'),
            isSelectCVCcomplete: false,
            inputCardNumberComplete: false,
            inputExpiryComplete: false,
            inputcvcComplete: false,
            cardEle: null,
            userid: '',
            payment_method:{},
            userAddress: {},
        });
        const { ctx } = getCurrentInstance();
        const route = useRoute();
        const router = useRouter();
        watch(()=>state.country_code, (newValue, oldValue) => {
            if(newValue && state.countryOptions.length){
                state.countryOptions.forEach(it=>{
                    if(it.text == newValue){
                        state.countryCode = it.code
                        getProvince(it.value)
                    }
                })
            }
        });
        watch(()=>state.provincesAndCitiesCascaderValue, (newValue, oldValue) => {
            if(newValue && state.provincesAndCitiesOptions.length){
                state.provincesAndCitiesOptions.forEach(it=>{
                    if(it.text == newValue){
                        state.state = newValue
                    }else{
                        it.children && it.children.forEach((item)=>{
                            if(item.text == newValue){
                                state.city = newValue
                            }
                        })
                    }
                })
            }
        });
        state.backIcon = require("../../assets/img/back_icon.png");
        onMounted(() => {
            // TODO:修改vue.config文件
            // TODO:修改vue.config文件
            // TODO:修改vue.config文件
            initPage();
        });
        // 页面初始化
        const initPage = async () => {
            document.querySelector("body").setAttribute("class", "bg-e5 pad-0");
            const initToast = Toast.loading({
                message: "Loading...",
                forbidClick: true,
                duration: 0,
            });
            // app内调用，设置头
            if (ENV.app) {
                setAPPTitle();
                const { userid = '41', amount = 0, param = {}, templateid='', orderno = '905557627805630464' } = route.query || {};
                console.log('route.query', route.query)
                const {
                    token = "",
                    os = "",
                    version = "",
                } = (param && Object.keys(param).length && JSON.parse(param)) || {};
                state.orderno = orderno
                state.amount = amount
                state.templateid = templateid
                state.userid = userid
                localStorage.setItem("currentUser", token);
            }else{
                // 浏览器mock数据
                const browserParams = {
                    amount: 2.29,
                    userid: '41',
                    templateid: '1',
                    orderno: '905557627805630464',
                    param: {
                        version: '',
                        uid: '',
                        token: 'eyJpZCI6NDEsInVzZXJuYW1lIjoiZmVpemlzaGl4aWFveGlhbnl1IiwiaGVhZGltZ3VybCI6bnVsbCwicGFzc3dvcmQiOiI4MWZmZDljMzA0NjEwZTcwOTE0ZTJmZDAxNTRmNmQ1NyIsImVtYWlsIjoiZmVpemlzaGl4aWFveGlhbnl1QHNvbGVzdGFnZWNuLmNvbSIsImdvbGRjb2lucyI6MTQuNjAsIm15aW52aXRlY29kZSI6IjEwcnVFcFFsIiwiaW52aXRlY29kZSI6IkxJR0FOMDAzIiwic3RhdHVzIjowLCJjcmVhdGV0aW1lIjoxNjMyNTU5NzQxMDAwLCJ1cGRhdGV0aW1lIjoxNjMyNTU5NzQxMDAwLCJyZWdpc3RlcnR5cGUiOjEsInJlZ2lzdGVyc291cmNlIjoxLCJwdXNodG9rZW4iOiJkV1BSa08xLV9rUGdybXUyVDV0a3NkOkFQQTkxYkZjalg0eDJ0a0xPcUE4aGt3M2VqbU1kRlBjT0RCN1VXblNPVngtSDZCUzI5UFRXQWNLaEpwRE9ZNGZsNGZlNmJ4dG04ekVxVndVTjNSUm11U1NsXzJVb3hCdXRqRWZid1c2RGdYR2FrbXlvblM3WDJTOEx0MGcyQkdDMm9HYzZXZ0UxU3NsIiwiYXBwbGVpZCI6bnVsbCwiZ29vZ2xlaWQiOm51bGwsImZhY2Vib29raWQiOm51bGwsInR5cGUiOjB9',
                        os: 'ios'
                    }
                }
                const { amount = 0, param = {}, templateid='', orderno="", userid = ''  } = browserParams || {};
                const {
                    token = "",
                    os = "",
                    version = "",
                } = param || {};
                state.orderno = orderno
                state.amount = amount
                state.templateid = templateid
                state.userid = userid
                localStorage.setItem("currentUser", token);
            }
            try {
                const countryList = await getCountry() || [];
                state.countryOptions = countryList.map((it) => {
                    return {
                        text: it.value,
                        value: it.id,
                        code: it.code
                    };
                });
                // 国家默认选中美国
                state.country_code = "US";
                state.countryCascaderValue = 1
                const {airwallexid = '', clientsecret='', paymentmethods = []} = await getClientsecret() || {}
                const userAddress = await getUserAddress(
                    {
                        userid: state.userid,
                        type: 3
                    }
                ) || {}
                console.log('userAddress',userAddress)
                if(userAddress && Object.keys(userAddress).length){
                    state.userAddress = userAddress
                    state.first_name = userAddress.firstname
                    state.last_name = userAddress.lastname
                    state.phone_number = userAddress.mobile
                    // 用户有国家信息则更新用户国家信息
                    if(userAddress.country){
                        state.country_code = userAddress.country
                    }
                    state.state = userAddress.state
                    state.city = userAddress.city
                    state.street = userAddress.streetaddress
                    state.postcode = userAddress.postalcode
                    state.countryid = userAddress.countryid
                    state.apartmentinfo = userAddress.apartmentinfo
                    state.mobilecode = userAddress.mobilecode
                    const initProvince = await getProvince(userAddress.countryid)
                    // const initCitys= await getCitys(userAddress.state)
                    state.provincesAndCitiesCascaderValue = userAddress.city
                }
                const { id = '' } = await getAircheckpay({
                    type: 1,
                    orderno: state.orderno,
                    templateid: state.templateid, // 客户端 templateid token 金额 os
                    airwallexid: airwallexid
                })
                state.airwallexid = airwallexid
                state.clientsecret = clientsecret
                state.paymentmethods = paymentmethods
                if(state.paymentmethods.length){
                    state.isInputPay = false
                }
                state.id = id
            } catch (err) {
                console.log("api err", JSON.stringify(err));
            }
            // 加载airwallex组件loading
            const AIRWALLEX_ENV =
                process.env.VUE_APP_ENV == "development" ? "demo" : "prod";
            Airwallex.init({
                origin: window.location.origin,
                // TODO: 测试环境:demo,线上:prod
                env: AIRWALLEX_ENV,
                locale: "en",
            });
            const cardNumber = Airwallex.createElement("cardNumber", {
                placeholder: "Card Number",
            });
            state.cardEle = cardNumber
            const expiry = Airwallex.createElement("expiry", {
                placeholder: "DATE",
            });
            const cvc = Airwallex.createElement("cvc", {
                placeholder: "CVV",
            });
            cardNumber.mount("cardNumber");
            expiry.mount("expiry");
            cvc.mount("cvc");
            setTimeout(()=>{
                // 卡号
                document
                    .getElementById('cardNumber')
                    .addEventListener('onChange', (event) => {
                        const { complete } = event.detail;
                        console.log('cardNumbercardNumber',event, complete)
                        state.inputCardNumberComplete = complete
                    });
                // 日期
                document
                    .getElementById('expiry')
                    .addEventListener('onChange', (event) => {
                        const { complete } = event.detail;
                        console.log('expiryexpiry',event,complete)
                        state.inputExpiryComplete = complete
                    });
                // cvv
                document
                    .getElementById('cvc')
                    .addEventListener('onChange', (event) => {
                        const { complete } = event.detail;
                        console.log('cvccvc',event, complete)
                        state.inputcvcComplete = complete
                    });
                nextTick(()=>{
                    initToast.clear();
                })
            })
        };
        const cancle = () =>{
            state.inputCVVPicker = false
        }
        const submitClass = computed(() => {
            if(!isAllElementInput()){
                return 'pay_disabled_v2'
            }
            return ''
        })
        const isFormdisabled = computed(()=>{
            return !state.isInputPay
        })
        const submitName = computed(() => {
            return 'Next'
        })
        const pageTitle = computed(() =>{
            if(!state.paymentmethods.length){
                return 'Add Paymen Method'
            }
            if(state.paymentmethods.length && !state.isInputPay){
                return 'Add Paymen Method'
            }
            if(state.paymentmethods.length && state.isInputPay){
                return 'Edit Card'
            }
        })
        const handleInputNewCard = () => {
            state.isInputPay = true
        }
        // 首次输入卡号支付
        const inputAwxPay = (params) => {
            Toast.loading({
                duration:0,
                message: 'Payment in progress...',
                forbidClick: true,
            });
            saveOrUpdateOrderAddress()
            console.log('输入卡号支付参数', params)
            Airwallex.createPaymentConsent(params)
                .then((response) => {
                    Toast.clear()
                    console.log('createPaymentConsent Response', response)
                    if(response && Object.keys(response).length){
                        backToApp(2)
                    }
                })
                .catch((error) => {
                    Toast.clear()
                    console.log("payByInputCard error", error);
                    Toast('Oops, something went wrong. Please try again.')
                    setTimeout(()=>{
                        backToApp(1)
                    },500)
                });
        }
        // 选择已有卡支付
        const pickCardPay = (params) => {
            Toast.loading({
                duration:0,
                message: 'Payment in progress...',
                forbidClick: true,
            });
            saveOrUpdateOrderAddress()
            Airwallex
                .confirmPaymentIntent(params)
                .then((response) => {
                    Toast.clear()
                    if(response && response.status === PAY_RESULT_MAP['2']){
                        backToApp(2)
                    }
                    console.log('payBySelectCard response：',response)
                })
                .catch((error)=>{
                    Toast.clear()
                    console.log('payBySelectCard response：',error)
                    Toast('Oops, something went wrong. Please try again.') 
                    setTimeout(()=>{
                        backToApp(1)
                    },500)
                })
        }
        // 获取国家列表
        const getCountry = () => {
            return new Promise((resolve, reject) => {
                return AircheckpayApi.getcountry()
                    .then((res) => {
                        console.log('getCountry', res)
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        };
        // 获取省列表
        const getProvince = (params) =>{
            return new Promise((resolve, reject)=>{
                return AircheckpayApi.getProvince({countryid: params})
                    .then((res) => {
                        console.log('getProvince', res)
                        state.provincesAndCitiesOptions = res.map((it)=>{
                            return {
                                text: it,
                                value: it,
                                code: it
                            }
                        })
                        resolve(state.provincesAndCitiesOptions)
                    })
                    .catch((err) => {
                        console.log(err)
                        reject(err)
                    });
            })

        }
        // 获取市列表
        const getCitys = (params) =>{
            // return new Promise((resolve, reject)=>{
            //     return AircheckpayApi.getCitys({state: params})
            //         .then((res) => {
            //             console.log('getCitys', res)
            //             if(res && res.length){
            //                 const rescitys = res.map((it)=>{
            //                     return {
            //                         text: it,
            //                         value: it,
            //                     } 
            //                 })
            //                 state.provincesAndCitiesOptions.forEach((it,idx)=>{
            //                     if(params == it.value){
            //                         state.provincesAndCitiesOptions[idx].children = rescitys
            //                     }
            //                 })
            //                 console.log('provincesAndCitiesOptionsprovincesAndCitiesOptions', state.provincesAndCitiesOptions)
            //                 resolve(state.provincesAndCitiesOptions)
            //             } 
            //         })
            //         .catch((err) => {
            //             console.log(err)
            //             reject(err)
            //         });
            // })
        }
        // 接口数据第一个接口
        const getClientsecret = () => {
            return new Promise((resolve, reject) => {
                return AircheckpayApi.waxV2clientsecret()
                    .then((res) => {
                        if (!res) {
                            Toast("Network connection error, try again later.");
                            reject();
                        }
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        }
        const getUserAddress = (params) => {
            return new Promise((resolve, reject) => {
                return AircheckpayApi.getUserOrderAddress(params)
                    .then((res) => {
                        if (!res) {
                            Toast("Network connection error, try again later.");
                            reject();
                        }
                        console.log('resresres', res)
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        }
        // 接口数据第二个接口
        const getAircheckpay = (params) => {
            return new Promise((resolve, reject) => {
                return AircheckpayApi.waxV2aircheckpay({
                    orderno: state.orderno,
                    airwallexid: params.airwallexid,
                })
                    .then((res) => {
                        if (!res) {
                            Toast("Network connection error, try again later.");
                            reject();
                        }
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        }
        // 用户保存地址
        const saveOrUpdateOrderAddress = () => {
            const params = {
                type: 3,
                countryid: state.countryid,
                state: state.state,
                city: state.city,
                postalcode: state.postcode,
                streetaddress: state.street,
                apartmentinfo: state.apartmentinfo,
                firstname: state.first_name,
                lastname: state.last_name,
                mobilecode: state.countryCode,
                mobile: state.phone_number,
                userid: state.userid,
            }
            if(state.userAddress && Object.keys(state.userAddress).length){
                AircheckpayApi.updateOrderAddress({...params, id:state.userAddress.id})
                    .then(()=>{
                        console.log(res)
                    })
            }else{
                AircheckpayApi.saveOrderAddress(params)
                    .then((res)=>{
                        console.log(res)
                    })
            }
        }
        // 支付接口回调，返回app页面
        const backToApp = (payStutus) => {
            ctx.callApp({
                name: "PayResult",
                acBody: {
                    // 0:取消，1:失败，2:成功
                    result: payStutus,
                },
            });
        };
        // 省市变化
        const onProvincesAndCitiesChange = ({ value }) => {
            state.city = ''
            getCitys(value)
        };
        // 国家选择完成
        const onCountryFinish = ({ selectedOptions }) => {
            state.city = ''
            state.state = ''
            state.countryPicker = false;
            state.country_code = selectedOptions
                .map((option) => option.text)
                .join("/");
        };
        // 省市选择完成
        const onProvincesAndCitiesFinish = ({ selectedOptions }) => {
            if(selectedOptions.length>1){
                state.provincesAndCitiesPicker = false;
            }
        };
        // 输入
        const usernameBlur = () => {};
        const handleClick = () => {
            const inputPayParams = {
                intent_id: state.id, // intent id(Optional). Specify a intent id when there is an initial payment.
                customer_id: state.airwallexid, // airwallexid airwallex id
                client_secret: state.clientsecret, // clientsecret 密钥
                currency: "USD",
                element: state.cardEle, // either the card element or card number element depends on the element you integrate,
                next_triggered_by: "merchant", // 'merchant' for MIT and 'customer' for CIT
                payment_method:{
                    billing: {
                        first_name: state.first_name,
                        last_name: state.last_name,
                        phone_number: state.phone_number,
                        address: {
                            country_code: state.country_code,
                            state: state.state,
                            city: state.city,
                            street: state.street,
                            postcode: state.postcode
                        }
                    }
                }
            };
            if(!state.isInputPay){
                state.payment_method = inputPayParams.payment_method
                state.inputCVVPicker = true 
            }else{
                if(isAllElementInput()){
                    console.log('inputPayParams', inputPayParams)
                    inputAwxPay(inputPayParams)
                }
            }
        };
        const isAllElementInput = () => {
            const inputParamsPass = [
                'first_name',
                'last_name',
                'country_code',
                'phone_number',
                'city',
                'state',
                'postcode',
                'street',
                'inputCardNumberComplete', // 输入卡号支付才校验
                'inputExpiryComplete',// 输入卡号支付才校验
                'inputcvcComplete',// 输入卡号支付才校验
                'apartmentinfo'
            ]
            const pickParamsPass = [
                'first_name',
                'last_name',
                'country_code',
                'phone_number',
                'city',
                'state',
                'postcode',
                'street',
                'apartmentinfo'
            ]
            if(state.isInputPay){
                return inputParamsPass.every((it) =>{
                    return state[it] || state[it]===0
                })
            }else{
                return pickParamsPass.every((it) =>{
                    return state[it] || state[it]===0
                })
            }
        } 
        // 返回app
        const handleExit = () => {
            if(state.paymentmethods.length && state.isInputPay){
                state.isInputPay = false
            }else{
                backToApp(0);
            }
        };
        onBeforeUnmount(() => {
            document.querySelector("body").setAttribute("class", "pad-15");
        });
        //app原生导航栏是否隐藏，默认显示
        const setAPPTitle = () => {
            ctx.callApp({
                name: "SetTitleStyle",
                acBody: {
                    style: {
                        hidden: true,
                    },
                },
            });
        };
        return {
            ...toRefs(state),
            backToApp,
            setAPPTitle,
            onCountryFinish,
            onProvincesAndCitiesFinish,
            usernameBlur,
            handleClick,
            initPage,
            handleExit,
            onProvincesAndCitiesChange,
            getClientsecret,
            getUserAddress,
            inputAwxPay,
            pickCardPay,
            handleInputNewCard,
            submitClass,
            pageTitle,
            submitName,
            cancle,
            isAllElementInput,
            saveOrUpdateOrderAddress,
            isFormdisabled,
        };
    },
    // 定义属性
    watch: {},
});
</script>
  
<style lang="scss">
@import "./style/airwallexv2.scss";
</style>