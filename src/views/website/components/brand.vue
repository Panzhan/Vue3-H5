<template>
  <div id="tab">
    <div class="tab-bar clearfix">
      <span
        class="tabTit"
        @click="tab(index)"
        v-for="(item, index) in items"
        :key="index"
        :class="{ active: index === curId }"
        >{{ item.item }}</span
      >
    </div>
    <div class="tab-con">
      <div class='logoBox'
        v-show="index === curId"
        v-for="(item, index) in contents"
        :key="index"
      >
        <div class='logo' v-for="(i, j) in item" :key="j">
          <img class="sportImg" :src="i.url" alt="logo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      curId: 0,
      items: [
        { item: "Sports Brand" },
        { item: "Luxury" },
        { item: "Street Fashion" },
      ],
      contents: [
        [
          { url: require("@/assets/img/sportImg/brand1.png") },
          { url: require("@/assets/img/sportImg/brand2.png") },
          { url: require("@/assets/img/sportImg/brand3.png") },
          { url: require("@/assets/img/sportImg/brand4.png") },
          { url: require("@/assets/img/sportImg/brand5.png") },
          { url: require("@/assets/img/sportImg/brand6.png") },
          { url: require("@/assets/img/sportImg/brand7.png") },
          { url: require("@/assets/img/sportImg/brand8.png") },
          { url: require("@/assets/img/sportImg/brand9.png") },
          { url: require("@/assets/img/sportImg/brand10.png") },
          { url: require("@/assets/img/sportImg/brand11.png") },
          { url: require("@/assets/img/sportImg/brand12.png") },
          { url: require("@/assets/img/sportImg/brand13.png") },
          { url: require("@/assets/img/sportImg/brand14.png") },

        ],
        [
          { url: require("@/assets/img/sportImg/Luxury1.png") },
          { url: require("@/assets/img/sportImg/Luxury2.png") },
          { url: require("@/assets/img/sportImg/Luxury3.png") },
          { url: require("@/assets/img/sportImg/Luxury4.png") },
          { url: require("@/assets/img/sportImg/Luxury5.png") },
          { url: require("@/assets/img/sportImg/Luxury6.png") },
          { url: require("@/assets/img/sportImg/Luxury7.png") },
          { url: require("@/assets/img/sportImg/Luxury8.png") },
          { url: require("@/assets/img/sportImg/Luxury9.png") },
          { url: require("@/assets/img/sportImg/Luxury10.png") },
          { url: require("@/assets/img/sportImg/Luxury11.png") },
          { url: require("@/assets/img/sportImg/Luxury12.png") },
          { url: require("@/assets/img/sportImg/Luxury13.png") },
          { url: require("@/assets/img/sportImg/Luxury14.png") },
          { url: require("@/assets/img/sportImg/Luxury15.png") },
        ],
        [
          { url: require("@/assets/img/sportImg/street1.png") },
          { url: require("@/assets/img/sportImg/street2.png") },
          { url: require("@/assets/img/sportImg/street3.png") },
          { url: require("@/assets/img/sportImg/street4.png") },
          { url: require("@/assets/img/sportImg/street5.png") },
          { url: require("@/assets/img/sportImg/street6.png") },
          { url: require("@/assets/img/sportImg/street7.png") },
          { url: require("@/assets/img/sportImg/street8.png") },
        ],
      ],
    };
  },

  methods: {
    tab(index) {
      this.curId = index;
    },
  },
};
</script>

<style lang="scss" scope>
#tab {
  width: 100%;
}
.tab-bar {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.tab-bar span {
  font-family: RobotoRegular;
  font-weight: 500;
  font-size: 16 * $px;
  line-height: 19 * $px;
  color: #969696;
  margin-left: 30 * $px;
}
.tabTit{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 4px;
}
.tabTit:first-of-type {
  margin-left: 0;
}
.tab-bar .active {
  font-family: RobotoBold;
  font-weight: bold;
  font-size: 16 * $px;
  line-height: 19 * $px;
  color: #232323;
  padding-top: 4px;
}
.active:after{
  content: '';
  width: 40px;
  margin-top: 5px;
  border-bottom: 4px solid rgba(245, 51, 63, 1);
  border-radius: 4px;
}
.tab-con {
    width: 100%;
    padding: 0 25*$px;
    margin-top: 30*$px;
}
.tab-con .logoBox {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 80*$px;
}
.logo{
  width: 70*$px;
  display: inline-block;
  margin:6px 1.5%;
}
.sportImg {
  background: #c4c4c4;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  width: 70 * $px;
}
</style>
