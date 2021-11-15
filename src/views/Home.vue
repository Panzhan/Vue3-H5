<template>
  <div class="home">
    <div class="home_text" @click="toHome">
      <span>Home Page!</span><br />
      <span>Go To Default Page</span>
    </div>
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

    // const store = useStore()
    // router的使用
    const router = useRouter();
    // router.push(`/list/${type}`);

    // route当前页面路由
    // const route = useRoute();
    // route.params.id;

    let toHome = () => {
      router.push("/help/index");
    };

    onMounted(() => {});
    const title_changed = (val) => {};
    return { toHome, title_changed };
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