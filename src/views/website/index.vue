<template>
  <div class="website">
    <header>
      <img src="./../../assets/img/logo_n.png" alt="LOGO" />
      <a class='authenticate' href="javascript:;">Authenticate</a>
      <a class='supply' href="https://supply.solestage.com/">Supply</a>
    </header>
    <div class="prefer">
      <img class="backUrl" src="./../../assets/img/Group1487.png" alt="background-image" />
      <h3>The Preferred APP for Authentication</h3>
      <p class="text">Real-expert legit check for fashion brands</p>
      <div class="phone">
          <div class="phone_container"> 
            <img src="./../../assets/img/phone.png" alt="phone" />
            <!-- <img class="inner_img" src="../../assets/img/video_img_new2.png" alt="showApp"> -->
          </div>
      </div>
      <div>
        <!-- <video
          class="video"
          src="./../../assets/video/4.mp4"
          autoplay
          loop
        ></video> -->
        <video class="video" autoplay loop muted>
          <source src="./../../assets/video/4.mp4" type="video/mp4" />
        </video>
        <!-- <videoPlay class="video" v-bind="options" /> -->
      </div>
      <div class="download">
        <div class="left">
          <img @click="handleJumpToStore('apple')" src="./../../assets/img/button-app-store.png" alt="apple" />
          <img @click="handleJumpToStore('google')" src="./../../assets/img/button-google-play.png" alt="google" />
        </div>
        <div class="right">
          <img src="./../../assets/img/ss_download_img.png" alt="" />
        </div>
      </div>
    </div>
    <div class="howMany">
      <div class="title">
        <!-- <img src="./../../assets/img/Group1493.png" alt="" /> -->
        <img src="./../../assets/img/Vector.png" alt="" />
        <p class="titleTil">How Many</p>
        <p class="titleTxt">items we have authenticated?</p>
      </div>
      <div class="content">
          <div class="img_container">
            <img src="./../../assets/img/manyOne.png" alt="Pairs of Sneakers We've Checked" />
            <span class="num">217,843</span>
            <span class="text">Pairs of Sneakers We've Checked</span>
          </div>
        <div class="img_container">
            <img src="./../../assets/img/manySecond.png" alt="Pieces of Clothes We've Checked" />
            <span class="num">326,813</span>
            <span class="text">Pieces of Clothes We've Checked</span>
        </div>
        <div class="img_container">
            <img src="./../../assets/img/manyThird.png" alt="Pieces of Watches We've Checked" />
            <span class="num">186,943</span>
            <span class="text">Pieces of Watches We've Checked</span>
        </div>
        
      </div>
    </div>
    <div>
      <img class="topIcon" src="./../../assets/img/Group1533.png" alt="SOLESTAGE_icon" />
    </div>
    <h3 style="height: 60 * $px;background: rgb(249, 249, 249);color:rgb(249, 249, 249);display:block">SOLESTAGE</h3>
    <div class="soleStage">
      <!-- <div class="shoe">
        <img src="./../../assets/img/image6.png" alt="" />
      </div> -->
      <div class="title">
        <!-- <img src="./../../assets/img/Group1494.png" alt="" /> -->
        <img src="./../../assets/img/Vector.png" alt="01" />
        <p class="titleTil">Why SOLESTAGE?</p>
        <p class="titleTxt">our 4 advantages</p>
      </div>
      <div class="detail">
        <div class="content">
          <img class="num" src="./../../assets/img/01.png" alt="" />
          <p class="tile">Convenient</p>
          <p class="text">
            Upload your product images anywhere &anytime, and the whole process
            will be completed online.
          </p>
          <div class="imgBox">
            <img src="./../../assets/img/Group1495.png" alt="Convenient" />
          </div>
        </div>
        <div class="content">
          <img class="num" src="./../../assets/img/02.png" alt="02" />
          <p class="tile">Speedy Results</p>
          <p class="text">
            Submit your check requests and get your results within as fast as 30
            minutes.
          </p>
          <div class="imgBox">
            <img src="./../../assets/img/pass_check_img.png" alt="Speedy Results" />
          </div>
        </div>
        <div class="content">
          <img class="num" src="./../../assets/img/03.png" alt="03" />
          <p class="tile">Profession Team</p>
          <p class="text">
            Our trained experts have strong experience background, and can help
            authenticate or detect replicas by reviewing your photos.
          </p>
          <div class="imgBox">
            <img src="./../../assets/img/Group1499.png" alt="Profession Team" />
          </div>
        </div>
        <div class="content">
          <img class="num" src="./../../assets/img/04.png" alt="04" />
          <p class="tile">24/7 Service</p>
          <p class="text">
            Our team is available 24/7 so you can legit check anytime and
            anywhere, saving trips to the consignment store.
          </p>
          <div class="imgBox">
            <img src="./../../assets/img/Group1500.png" alt="Service" />
          </div>
        </div>
      </div>
    </div>
    <div>
      <img class="botIcon" src="./../../assets/img/Group1534.png" alt="bottom_icon" />
    </div>
    <span style="height: 60 * $px;background: white;color:white;display:block;">SOLESTAGE</span><br>
    <div class="brand">
      <div class="title">
        <img src="./../../assets/img/Vector.png" alt="SOLESTAGE" />
        <p class="titleTil">Brands</p>
        <p class="titleTxt">the categories and brands we support</p>
      </div>
      <Brand />
    </div>
    <div class="botDownload">
        <div class="left">
          <img @click="handleJumpToStore('apple')" src="./../../assets/img/button-app-store.png" alt="apple" />
          <img @click="handleJumpToStore('google')" src="./../../assets/img/button-google-play.png" alt="google" />
        </div>
        <div class="right">
          <img src="./../../assets/img/ss_download_img.png" alt="" />
        </div>
      </div>
    <Footer />
  </div>
</template>
<script>
import { ref, onMounted, onBeforeUnmount, getCurrentInstance, reactive } from "vue";
import Brand from "./components/brand";
import Footer from "./components/footer";
// import "vue3-video-play/dist/style.css";
// import { videoPlay } from "vue-video-player";
export default {
  name: "website",
  components: {
    Brand,
    // videoPlay,
    Footer
  },
  metaInfo: {
    title: 'SOLESTAGE',
    meta: [
      {
        name: 'keywords',
        content: '关键字1,关键字2,关键字3'
      },
      {
        name: 'description',
        content: '这是一段网页的描述'
      },
     
    ]
  },
  setup() {
    const options = ref({
      color: "#409eff", //主题色
      muted: false, //静音
      webFullScreen: false,
      autoPlay: true, //自动播放
      canplaythrough: true,
      loop: true, //循环播放
      mirror: false, //镜像画面
      ligthOff: false, //关灯模式
      volume: 0.3, //默认音量大小
      control: false, //是否显示控制器
      title: "cat", //视频名称
      src: require("./../../assets/video/cat.mp4"), //视频源
      poster: "", //封面
    });
    const handleJumpToStore = (val)=>{
        switch(val){
            case 'apple':
                window.location.href = 'https://apps.apple.com/app/id1586981419'
                break 
            case 'google':
                window.location.href = 'https://play.google.com/store/apps/details?id=com.sneaker.solestage'
                break 
            default:
                console.log('default')
                break
        }
    }
    onMounted(() => {
       document.querySelector("body").setAttribute("class", "pad-0");
    });
    onBeforeUnmount(() => {
      document.querySelector("body").setAttribute("class", "pad-15");
    })
    return {
      options,
      handleJumpToStore
    };
  },
  data() {
    return {};
  },
  watch: {
    $route (to, from) {
        if(to.name !== "website" || "share") {
          console.log(1111111)
            document.querySelector("body").setAttribute("class", "pad-15");
        }
    }
  },
  // mounted() {
  //   document.querySelector("body").setAttribute("class", "pad-0");
  // },
  // destroyed() {
  //   console.log('destroyed')
  //   document.querySelector("body").setAttribute("class", "pad-15");
  // },
  // beforeRouteLeave(to, from, next) {
  //   alert(111111111);
  //   document.querySelector("body").setAttribute("class", "pad-15");
  //   next(false);
  // },
};
</script>
<style lang="scss" scope>
@import './style/website.scss';

</style>