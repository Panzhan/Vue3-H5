import "./utils/inject";
import Mixins from "./utils/mixins";
import { createApp, h } from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";
import FastClick from "fastclick"; // 引入插件
import Vant from "vant";
import { 
    Toast, 
    Popup, 
    Step, 
    Steps, 
    Field, 
    CellGroup,
    Cascader,
    Swipe,
    SwipeItem,
} from "vant";
import filters from "./utils/filters";
import MetaInfo from "vue-meta-info";
import { ShareApi } from "@/apis";

import videoPlay from "vue3-video-play"; // 引入组件
import "vue3-video-play/dist/style.css"; // 引入css
import vuePicturePreview from 'vue-picture-preview'
// import ico from './components/base/Ico'
// import Empty from './components/base/Empty'

FastClick.attach(document.body);

import vhCheck from "vh-check";
vhCheck("browser-address-bar");

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});
router.beforeEach((to, from, next) => {
  console.log(to);
  if (to.path === "/share/index") {
    sessionStorage.setItem("isShare", true);
    sessionStorage.setItem("shareId", to.query.id);
    ShareApi.getIdentify({ id: sessionStorage.getItem("shareId") }).then(
        (res) => {
          if (res.images.length) {
            var shareImg = res.images[0].checkurl;
            sessionStorage.setItem("shareImg", shareImg.value);
            console.log(shareImg);
          }
        }
      );
    next();
  } else {
    next();
  }
});

const app = createApp({
  data() {
    return {
      ipx: false,
      isShare: false,
    };
  },
  render: () => h(App),
  beforeCreate() {
    // 微信环境下引入微信jssdk
    if (ENV.wx) {
      var wxJsSdk = document.createElement("script");
      wxJsSdk.id = "_wx_js_sdk";
      wxJsSdk.src = "//res.wx.qq.com/open/js/jweixin-1.2.0.js";
      document.head.appendChild(wxJsSdk);
    }
  },
  mounted() {
    let dw = window.screen.width;
    let dh = window.screen.height;
    this.ipx = (dw === 375 && dh === 812) || (dw === 414 && dh === 896);
    document.dispatchEvent(new Event("render-event"));

  },
  watch: {
    isShare() {},
  },
});
app.config.globalProperties.$filters = filters;
app.config.globalProperties.toast = Toast;
// app.component('ico', ico)
// app.component('empty', Empty)
app.use(videoPlay);
app.use(MetaInfo);
app.use(vuePicturePreview)
app
  .mixin(Mixins)
  .use(router)
  .use(store)
  .use(Vant)
  .use(Toast)
  .use(Field)
  .use(Step)
  .use(Steps)
  .use(Popup)
  .use(CellGroup)
  .use(Cascader)
  .use(Swipe)
  .use(SwipeItem)
  .mount("#app")
  
export default app;
