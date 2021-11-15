<template>
    <div class="home">
        <div class="img_app_name">
            <img :src="dLogo" alt="download Logo" />
            <span class="app_name">
                SOLESTAGE
            </span>
        </div>
        <div v-if="isIOS" class="home_text" @click="toAppStore(1)">Download on the App Store</div>
        <div v-if="isAndroid" class="home_text" @click="toAppStore(2)">Get it on Google Play</div>
        <div v-if="isAndroid" class="second_and" @click="toAppStore(3)">Download via the third-party browser</div>
    </div>
</template>
  <script>
import { getCurrentInstance, ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
export default {
    name: "Home",
    components: {},
    setup(props, context) {
        const instance = getCurrentInstance();
        const {
            ctx,
            ctx: { $router },
        } = instance;
        const dLogo = ref('')
        const isAndroid = ref(false)
        const isIOS = ref(false)
        // const store = useStore()
        // router的使用
        const router = useRouter();
        // router.push(`/list/${type}`);

        // route当前页面路由
        // const route = useRoute();
        // route.params.id;

        const toAppStore = (val) => {
            switch(val){
                case 1:
                    window.location.href = 'https://apps.apple.com/app/id1586981419'
                    break
                case 2:
                    window.location.href = 'https://play.google.com/store/apps/details?id=com.sneaker.solestage'
                    break
                case 3:
                    window.location.href = 'https://static.solestagesupply.com/solestage/solestage.apk'
                    break
                default:
                    break
            }
        };

        onMounted(() => {
            dLogo.value = require('../../assets/img/download_app_logo.png')
            if(ENV.android){
                isAndroid.value = true
            }
            if(ENV.ios){
                isIOS.value = true
            }
            console.log('ENV', ENV)
        });
        const title_changed = (val) => {};
        return { toAppStore, title_changed,dLogo,isIOS,isAndroid };
    },
};
</script>
  <style scoped lang="scss">
.home {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .img_app_name{
        text-align: center;
        img{
            border-radius: 10 * $px;
            width: 58 * $px;
            height: 58 * $px;
        }
        .app_name{
            color: #000000;
            font-size: 20 * $px;
            font-family: RobotoBold;
            display: block;
            margin-top: 12 * $px;
        }
    }

    .home_text {
        border-radius: 4 * $px;
        width: 230 * $px;
        height: 40 * $px;
        line-height: 40 * $px;
        text-align: center;
        border-radius: 6 * $px;
        background: linear-gradient(0deg, #F5333F, #F5333F);
        color: #FFFFFF;
        font-size: 16 * $px;
        font-family: RobotoBold;
        font-weight: bold;
        margin: 50 * $px 0 0 0;
        white-space: nowrap;
    }
    .second_and{
        margin-top: 20 * $px;
        font-size: 12*$px;
        color: #000;
        text-decoration: underline;
        line-height: 20*$px;
    }
}
</style>