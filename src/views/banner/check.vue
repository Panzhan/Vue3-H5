<template>
    <div class="banner_check">
        <img :src="bannerImg" alt="">
    </div>
</template>

<script>
const IMG_DATE_MAP = {
    '2021-10-25': 'https://static.solestagesupply.com/solestage/b63677d5e2ff484fac8b1df8d06a95cc.png',
    '2021-10-27': 'https://static.solestagesupply.com/solestage/44a580293f2e4601975e559aa9e41b39.png'

}
export default {
    name: "bannercheck",
    data(){
        return {
            imgMap: IMG_DATE_MAP,
            bannerImg: ''
        }
    },
    mounted() {
        const { keyword } = this.$route.query
        this.bannerImg = this.imgMap[keyword] || ''
        document.querySelector("body").setAttribute("class", "pad");
    },
    beforeUnmount() {
        document.querySelector("body").setAttribute("class", "");
  },
};
</script>

<style lang="scss">
.pad{
   padding: 0;
   margin: 0;
}
.banner_check{
    img{
        width: 100%;
        height: 100%;
    }
}
</style>