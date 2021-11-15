<template>
    <footer>
        <div class='icon'>
            <div class="external" v-for="item in linkList" :key="item.id">
                <a :href="item.href">
                    <img class="app_img" :src="item.url" alt="" />
                </a>
            </div>
        </div>
        <div>
            <div class="concat">
                Contact：service@solestage.com
            </div>
            <div class='reserve'>
                Copyright © 2001 - 2021 SoleStage Inc. All Rights Reserved
            </div>
            <div class='link'>
                <router-link class='linkto' :to="{name:'terms'}">Terms of Use</router-link> <span>|</span> 
                <router-link class='linkto' :to="{name:'legal'}">Legal</router-link>
            </div>
        </div>
    </footer>
</template>
<script>
import { ref, onMounted, getCurrentInstance } from "vue";

export default {
      setup() {
    const linkList = ref([
      {
        id: 1,
        url: require("@/assets/img/instagram_n.png"),
        href: 'https://www.instagram.com/solestage/?hl=en',
      },
      {
        id: 2,
        url: require("@/assets/img/twitter_n.png"),
        href: 'https://twitter.com/SoleStage',
      },
      {
        id: 3,
        url: require("@/assets/img/facebook_n.png"),
        href: 'https://www.facebook.com/pages/category/Footwear-Store/Solestage-485958524768091/'
      },
      {
        id: 4,
        url: require("@/assets/img/tiktok_n.png"),
        href: 'https://www.tiktok.com/@solestage?'
      },
      {
        id: 5,
        url: require("@/assets/img/youtobe_n.png"),
        href: 'https://www.youtube.com/channel/UCDGPg_tCgllsJmrH5vXuyYA/featured'
      },
    ]);
    return {
      linkList,
    };
  },
}
</script>
<style lang="scss" scoped>
.icon{
    margin: 0 50*$px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.app_img{
    width: 20 * $px;
    height: 20 * $px;
}
.concat{
    width: 100%;
    text-align: center;
    font-size: 12 * $px;
    color: #232323;
    line-height: 14 * $px;
    padding: 25*$px 0 5*$px 0;
    font-family: RobotoRegular;
}
.reserve{
    width: 100%;
    padding: 0 0 5*$px 0;
    font-family: RobotoRegular;
    font-size: 12 * $px;
    line-height: 14 * $px;
    text-align: center;
    color: #232323;
}
.link{
    width: 100%;
    text-align: center;
    padding-bottom: 80*$px;
    font-size: 12 * $px;
    line-height: 14 * $px;
    .linkto{
        font-family: RobotoRegular;
        color: #232323;
        pointer-events: none;
    }
    span{
        margin: 0 10*$px ;
    }
}
</style>