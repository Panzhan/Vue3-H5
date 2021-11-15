<template>
    <div class="payment">
        <div class="title_box">
            <span class="back com" @click="handleBackOrExit">Cancel</span>
            <span class="title com">{{pageTitle}}</span>
            <span class="com"></span>
        </div>
        <div class="top_card">
            <img :src="payCardImg" alt="" />
        </div>

        <!-- 添加卡 & 第一次付款 -->
        <div v-show="isInputCardPay" class="card_number">
            <div id="cardRecurring"></div>
        </div>

        <!-- 已有卡信息 -->
        <span v-show="!isInputCardPay">
            <ul class="ui_card">
                <li class="card_item" v-for="(it, idx) in paymentmethods" :key="idx">
                    <hr color="#F5F5F5" size="1"/>
                    <span @click="handlePick(it,idx)" class="card_flex">
                        <span class="pick_img">
                            <img v-if="it.picked" :src="picked" alt="">
                            <img v-else :src="notPicked" alt="">
                        </span>
                        <span class="card_img">
                            <img v-if="it.brand == 'visa'" :src="visaCardImg" alt="" />
                            <img v-else :src="masterCardIMg" alt="" />
                        </span>
                        <span class="card_num">{{ `${it.bin.slice(0, 4)} **** **** ${it.last4}` }}</span>
                        <div v-show="it.picked" class="cvc_ipt" :id="setId(idx)"></div>
                    </span>
                    
                </li>
                <hr color="#F5F5F5" size="1"/>
            </ul>

            <!-- 新增卡 -->
            <div @click="handleAddCard" class="add_container">
                + Add  new  Credit  or Debit Card
            </div>
        </span>

        <!-- 支付 -->
        <div @click.stop="handleClick" class="btn_submit" :class="!isCVCcomplete ? 'pay_disabled' : ''">
            <button id="submitCardRecurring">Pay ${{ amount }}</button>
        </div>
    </div>
</template>
  
<script>
import { AircheckpayApi } from "@/apis";
import { Toast } from "vant";
import {
    getCurrentInstance,
} from "vue";
const PAY_RESULT_MAP = {
    2:'SUCCEEDED',
}
export default {
    name: "",
    // 定义属性
    data() {
        return {
            resaClientsecret: {},
            resAircheckpay: {},
            isInputCardPay: true,
            amount: '',
            cst_id: '', // 选中卡id
            payCardImg: require("../../assets/img/pay_card.png"),
            visaCardImg: require("../../assets/img/visa_card.png"),
            masterCardIMg: require("../../assets/img/master_card.png"),
            picked: require('../../assets/img/card_picked.png'),
            notPicked: require('../../assets/img/card_not_picked.png'),
            paymentmethods: [],
            pickcvcindex: 0,
            inputCVCElement: null,
            isInputCVCcomplete: false,
            selectCVCElement: null,
            isSelectCVCcomplete: false,
        };
    },
    watch:{
    },
    computed:{
        setId(){
            return (index)=>{
                return `cvc_${index}`
            }
        },
        pageTitle(){
            return this.isInputCardPay ? 'Add a Card' : 'Select Your Bank Card'
        },
        isCVCcomplete(){
            return (this.isInputCVCcomplete && this.isInputCardPay) || (this.isSelectCVCcomplete && !this.isInputCardPay)
        }
    },
    created(){
        
    },
    mounted() {
        document.querySelector("body").setAttribute("class", "pad-15");
        Toast.loading({
            message: 'Loading...',
            forbidClick: true,
            duration:0,
        });
        this.initPage(Toast)

    },
    methods: {
        async initPage(Toast){
            // // 获取app信息
            this.setAPPTitle()
            let appInfos = this.$route.query
            console.log('appInfosappInfos', appInfos)
            const { amount, param, templateid } = appInfos || {}
            const { token, os, version, uid } = Object.keys(param).length && JSON.parse(param) || {}
            localStorage.setItem('currentUser', token)
            this.resaClientsecret = await this.getClientsecret()
            console.log('resaClientsecret', this.resaClientsecret)
            if(!this.resaClientsecret || !Object.keys(this.resaClientsecret).length) {
                Toast.clear()
                return false
            }
            this.paymentmethods = this.resaClientsecret.paymentmethods || []
            this.resAircheckpay = await this.getAircheckpay({
                type: 1,
                templateid: templateid || '', // 客户端 templateid token 金额 os
                airwallexid: this.resaClientsecret.airwallexid
            })
            this.amount = amount
            if(!this.resAircheckpay) {
                Toast.clear()
                return false
            }
            Toast.clear()

            // 有卡
            if(this.paymentmethods.length){
                this.paymentmethods[0].picked = true
                this.cst_id = this.paymentmethods[0].cst_id
                this.isInputCardPay = false
            }
            // 防止 js未加载完
            setTimeout(()=>{
                let that = this
                const AIRWALLEX_ENV = process.env.VUE_APP_ENV == 'development' ? 'demo' : 'prod'
                console.log('AIRWALLEX_ENV', AIRWALLEX_ENV)
                Airwallex.init({
                    origin: window.location.origin,
                    // TODO:测试环境:demo,线上:prod
                    env: AIRWALLEX_ENV,
                    locale: 'en'
                });
                const cardRecurring = Airwallex.createElement("card");
                cardRecurring.mount("cardRecurring");
                // 默认挂载第一个cvc
                that.selectCVCElement = Airwallex.createElement("cvc", { placeholder: "CVC" });
                that.selectCVCElement.mount('cvc_0')
                // 添加卡支付，判断是否输入完成
                document
                    .getElementById('cardRecurring')
                    .addEventListener('onChange', (event) => {
                        const { complete } = event.detail;
                        console.log('cardRecurring',event)
                        that.isInputCVCcomplete = complete
                    });
                // 选卡支付，判断是否输入完成
                if(!that.isInputCardPay){
                    document
                    .getElementById(`cvc_${that.pickcvcindex}`)
                    .addEventListener('onChange', (event) => {
                        console.log('cvc_cvc_',event)
                        const { complete } = event.detail;
                        that.isSelectCVCcomplete = complete
                    });
                }
                document
                    .getElementById("submitCardRecurring")
                    .addEventListener("click", (e) => {
                        if(!that.isCVCcomplete) return false
                        Toast.loading({
                            duration:0,
                            message: 'Payment in progress...',
                            forbidClick: true,
                        });
                        if(that.isInputCardPay){
                            that.payByInputCard(cardRecurring, Toast)
                        }else{
                            that.payBySelectCard(that.selectCVCElement, Toast)
                        }
                    });
            })
        },
        // 让页面恢复
        handleClick(){
            setTimeout(function () {
                // 获取原来的滚动距离
                var scrollHeight =
                    document.documentElement.scrollTop ||
                    document.body.scrollTop ||
                    0;
                window.scrollTo(0, Math.max(scrollHeight - 1, 0));
            }, 0);
        },
        backToApp(payStutus){
            this.callApp({
                name: "PayResult",
                acBody:{
                    // 0:取消，1:失败，2:成功
                    result: payStutus
                }
            });
        },
        handleBackOrExit(){
            if(this.isInputCardPay){
                this.isInputCardPay = false
            }else{
                this.backToApp(0)
            }
        },
        setAPPTitle(){
            this.callApp({
                name: "SetTitleStyle",
                acBody:{
                    style: {
                        hidden: true,    //app原生导航栏是否隐藏，默认显示
                    },
                }
            });
        },
        // 输入卡号支付
        payByInputCard(cardRecurring, Toast){
            const params = {
                intent_id: this.resAircheckpay && this.resAircheckpay.id || "", // intent id(Optional). Specify a intent id when there is an initial payment.
                customer_id: this.resaClientsecret.airwallexid || "", // airwallexid airwallex id
                client_secret: this.resaClientsecret.clientsecret || "", // clientsecret 密钥
                currency: "USD",
                element: cardRecurring || "", // either the card element or card number element depends on the element you integrate,
                next_triggered_by: "merchant", // 'merchant' for MIT and 'customer' for CIT
            };
            console.log("cardRecurring", params);
            // 输入卡号交易
            Airwallex.createPaymentConsent(params)
                .then((response) => {
                    Toast.clear()
                    console.log('responseresponse', response)
                    if(response && Object.keys(response).length){
                        this.backToApp(2)
                    }
                })
                .catch((error) => {
                    Toast.clear()
                    console.log("payByInputCard error", error);
                    // Toast('Oops, something went wrong. Please try again.')
                    setTimeout(()=>{
                        this.backToApp(1)
                    },500)
                });
        },
        // 选择已有卡号支付
        payBySelectCard(cvc, Toast){
            const params = {
                element: cvc || "", // Provide the cvc element
                id:  this.resAircheckpay && this.resAircheckpay.id || "", // Payment Intent ID
                client_secret: this.resaClientsecret.clientsecret, //resaClientsecret.clientsecret, // Client Secret
                payment_consent_id: this.cst_id, // Payment Consent id of the payment consent the customer had selected
            };
            console.log("cvc", params);
            Airwallex
                .confirmPaymentIntent(params)
                .then((response) => {
                    Toast.clear()
                    if(response && response.status === PAY_RESULT_MAP['2']){
                        this.backToApp(2)
                    }
                    console.log('payBySelectCard response：',response)
                })
                .catch((error)=>{
                    Toast.clear()
                    console.log('payBySelectCard response：',error)
                    // Toast('Oops, something went wrong. Please try again.') 
                    setTimeout(()=>{
                        this.backToApp(1)
                    },500)
                })
        },
        handleAddCard(){
            this.isInputCardPay = !this.isInputCardPay
        },
        handlePick(item,index){
            this.pickcvcindex = index
            this.isSelectCVCcomplete = false
            this.selectCVCElement = Airwallex.createElement("cvc", { placeholder: "CVC" });
            this.selectCVCElement.mount(`cvc_${index}`);
            this.cst_id = item.cst_id || ''
            return this.paymentmethods.reduce((prev, cur, idx, arr)=>{
                arr.map((it, midx)=>{
                    if(midx != index) {
                        it.picked = false
                    }
                })
                cur.picked = index == idx ? true : false
                return prev
            }, [])
        },
        getClientsecret() {
            return new Promise((resolve, reject) => {
                return AircheckpayApi.clientsecret()
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
        },
        getAircheckpay(params) {
            return new Promise((resolve, reject) => {
                return AircheckpayApi.aircheckpay({
                    type: 1,
                    templateid: params.templateid || "",
                    airwallexid: params.airwallexid || "",
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
        },
    },
};
</script>
  
<style lang="scss" scoped>
.pad-15 {
    padding: 10*$px 15*$px 15*$px 15*$px;
}
.payment {
    width: 100%;
    padding-bottom: 145 * $px;
    .title_box{
        margin: 20 * $px 0  50 * $px;
        height: 21 * $px;
        line-height: 21 * $px;
        color: #232323;
        font-family: RobotoBold;
        font-style: normal;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        .com{
            flex: 1;
        }
        .back{
            font-size: 14 * $px;
        }
        .title{
            font-size: 18 * $px;
            text-align: center;
            flex: 4;
        }
    }
    .top_card {
        margin: auto;
        width: 150 * $px;
        height: 94 * $px;
        img {
            width: inherit;
            height: inherit;
        }
    }
    .card_number,
    .ui_card{
        margin-top: 50 * $px;
    }
    .card_item{
        height: 72 * $px;
        .card_flex{
            height: inherit;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            .pick_img{
                margin: 0 15 * $px 0 0;
                img{
                    width: 18 * $px;
                    height: 18 * $px;
                }
            }
            .card_img{
                margin: 0 15 * $px 0 0;
                img{
                    width: 50 * $px;
                    height: 30 * $px;
                }
            }
            .card_num{
                font-family: RobotoBold;
                font-style: normal;
                font-weight: bold;
                font-size: 16 * $px;
                line-height: 19 * $px;
                color: #232323;
            }
        }
    }
    .add_container{
        width: 100%;
        height: 56 * $px;
        background: #F5F5F5;
        border-radius: 4px;
        line-height: 56 * $px;
        text-align: left;
        font-family: RobotoBold;
        font-style: normal;
        font-weight: bold;
        font-size: 12 * $px;
        color: #646464;
        padding-left: 20 * $px;
    }
    .btn_submit{
        position: fixed;
        height: 85 * $px;
        bottom: 0;
        // border: 1px solid red;
        opacity: 1;
        background: #ffffff;
        #submitCardRecurring {
            width: 345 * $px;
            height: 48 * $px;
            background: linear-gradient(0deg, #f5333f, #f5333f);
            border-radius: 4px;
            color: #ffffff;
            font-family: RobotoBold;
            font-style: normal;
            font-weight: bold;
            font-size: 16 * $px;
        }
    }
    .pay_disabled{
        color: black;
        #submitCardRecurring {
            width: 345 * $px;
            height: 48 * $px;
            background: linear-gradient(0deg, rgba(245, 51, 63, 0.5), rgba(245, 51, 63, 0.5));
            border-radius: 4px;
            color: #ffffff;
            font-family: RobotoBold;
            font-style: normal;
            font-weight: bold;
            font-size: 16 * $px;
        }
    }
}
.ipx{
    padding-top: 25 * $px;
}
.cvc_ipt{
    margin: 0 0 0 10 * $px;
    border: 1px solid #EFEFEF;
    width: 70 * $px;
    min-height: 27 * $px;
    box-sizing: border-box;
    border-radius: 4 * $px; 
}

@supports ((height: constant(safe-area-inset-top)) or (height: env(safe-area-inset-top))) and (-webkit-overflow-scrolling: touch) {
  .payment {
    /* 适配齐刘海 */
    // padding-top: 0;
    // padding-top: constant(safe-area-inset-top);
    // padding-top: env(safe-area-inset-top);
    padding-top: 25 * $px;
  }
}
</style>