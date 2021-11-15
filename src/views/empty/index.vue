<template>
    <div class="home">
    </div>
</template>
  <script>
import { getCurrentInstance, ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { Toast } from "vant";
export default {
    name: "Home",
    components: {},
    setup(props, context) {
        const router = useRouter();
        onMounted(() => {
            Toast.loading({
                message: 'Loading...',
                forbidClick: true,
                duration:0,
            });
            // document.documentElement.style.padding = '15px'
            var _this = this
            var timer = setInterval(function () {
                // 判断文档和所有子资源(图片、音视频等)已完成加载
                if (document.readyState === 'complete') {
                    //执行方法
                    Toast.clear()
                    window.clearInterval(timer)
                    router.push('/website');
                }
            }, 500)

        });
        return {};
    },
};
</script>
  <style scoped lang="scss">
.home {
    //   height: calc(100vh - 30 * $px);
    display: flex;
    align-items: center;
    justify-content: center;
    .home_text {
        border: 1px solid #3270f5;
        text-align: center;
        color: #3270f5;
        border-radius: 6 * $px;
        padding: 10 * $px;
    }
}
</style>