<template>
    <div class="print_container">
        <div class="top_container">
            <div class="img_text">
                <img class="over_icon" :src="overIcon" alt="" />
                <span class="top_title">已生成物流面单</span>
            </div>
        </div>
        <div class="step">
            <div class="send">发货流程</div>
            <img class="step_icon" :src="stepIcon" alt="" />
            <img class="good_icon" :src="goodIcon" alt="" />
            <span class="tips">注意事项：</span><br>
            <span class="tips">1. 物流面单下载会有 <span class="tips_bold">1-2分钟延迟</span>。</span><br>
            <span class="tips">2. 您也可以在待鉴定订单列表，下载物流面单。</span>
        </div>
    </div>
</template>
  
<script>
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

import { useRouter, useRoute } from "vue-router";
export default {
    name: "printindex",
    setup() {
        const { ctx } = getCurrentInstance();
        const state = reactive({
            overIcon:
                "https://images.weserv.nl/?url=https://static.solestagesupply.com/solestage/88e6cdb13f654a8da082908ae2a0d88c.png",
            stepIcon:
                "https://images.weserv.nl/?url=https://static.solestagesupply.com/solestage/7042d57fcd7d4d26a936c29335ea951d.png",
            goodIcon:
                "https://images.weserv.nl/?url=https://static.solestagesupply.com/solestage/9d53b919f9ee49cea651fb2f9f6d5b79.png",
        });
        const initPage = () => {
            document.querySelector("body").setAttribute("class", "bg-e5 pad-0");
        };
        onMounted(() => {
            initPage();
        });
        return {
            ...toRefs(state),
            initPage,
        };
    },
};
</script>
  
<style lang="scss">
.pad-0 {
    padding: 0;
}
.bg-e5 {
    background: #e5e5e5;
}
.print_container {
    height: 160 * $px;
    background: #35b97a;
    .top_container {
        display: flex;
        height: inherit;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        padding-top: 34 * $px;
        .img_text {
            height: 30 * $px;
            display: flex;
            justify-content: center;
            width: 100%;
            .over_icon {
                width: 30 * $px;
                height: inherit;
                margin-right: 10 * $px;
            }
            .top_title {
                font-family: RobotoBold;
                font-size: 20px;
                color: #ffffff;
                font-weight: bold;
                margin: auto 0;
            }
        }
    }
    .step {
        width: 345 * $px;
        height: 500 * $px;
        // border: 1px solid red;
        margin: 0 auto;
        position: relative;
        top: -62 * $px;
        background: #ffffff;
        border-radius: 4 * $px;
        padding: 15 * $px;
        .send {
            font-family: RobotoBold;
            font-style: normal;
            font-weight: bold;
            font-size: 18 * $px;
            color: #232323;
            width: 345 * $px;
            height: 62 * $px;
            padding-top: 10 * $px;
        }
        .step_icon {
            width: 117 * $px;
            height: 177 * $px;
        }
        .good_icon {
            width: 205 * $px;
            height: 139 * $px;
            margin: 0 auto;
            display: block;
        }
        .tips{
            font-family: RobotoRegular;
            font-size: 14 * $px;
            color: #232323;
            margin-top: 10 * $px;
            display: inline-block;
            .tips_bold{
                font-family: RobotoBold;
                font-weight: bold;
            }
        }
    }
}
</style>