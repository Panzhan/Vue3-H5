<template>
    <div class="good_detail">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item
                v-for="(item, index) in imgurls"
                :key="index"
            >
                <img :src="item" alt="">
            </van-swipe-item>
        </van-swipe>
        <div class="bg_fff goods_price">
            <span class="g_price">
                {{product.minprice || '--'}}
            </span>
            <span class="g_text">
                {{product.name || '--'}}
            </span>
        </div>
        <img class="label_url" :src="product.labelurl" alt="">
        <div class="product_information bg_fff">
            <h1 class="h1_btm">Product Information</h1>
            <div v-for="(item, index) in sizeexplain" :key="index">
                <div class="sizeexplain_item">
                    <div class="name_content name">
                        {{item.name}}
                    </div>
                    <div class="name_content content">
                        {{item.content || '--'}}
                    </div>
                </div>
            </div>
        </div>
        <div class="size_chart bg_fff">
            <h1>Size Chart</h1>
            <div class="max_th">Size Chart</div>
            <table cellspacing="0" cellpadding="10">
                <tr>
                    <th class="th_style" :class="index != 0 ? 'border_left' : ''" v-for="(item,index) in sizesThs" :key="item">{{item}}</th>
                </tr>
                <tr :class="index%2 != 0 ? 'bg_fa' : ''" v-for="(item,index) in sizes" :key="index">
                    <td :class="idx != 0 ? 'border_left' : ''" v-for="(it,idx) in item" :key="idx">{{item[idx]}}</td>
                </tr>
            </table>
        </div>      
        <div class="rich_text bg_fff">
            <span v-html="product.productdescribe"></span>
        </div>  
    </div>
</template>
  
<script>
import { GoodsdetailApi } from "@/apis";
import { Toast } from "vant";
import { useRouter, useRoute } from "vue-router";
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
export default defineComponent ({
    name: "",
    components: {
    },
    setup() {
        const state = reactive({
            id: '', // 商品ID
            product: {}, // 商品详情
            sizes: [], // 尺码
            sizesThs: [], //尺码头
            imgurls: [], // 轮播图
            sizeexplain: [], // 商品描述
            defaultAtt: [
                'sku',
                'color',
                'brandname',
                'saleprice', // 可空
                'saletime', // 可空
            ]
        });
        const { ctx } = getCurrentInstance();
        const route = useRoute();
        const router = useRouter();
        watch(()=>state.product, (newValue, oldValue) => {
            if(newValue){
                console.log('newValue', newValue)
            }
        });
        onMounted(() => {
            initPage();
        });
        const getGoods = () =>{
            return new Promise((resolve, reject)=>{
                return GoodsdetailApi
                    .findproductinfo({id: state.id})
                        .then((res)=>{
                            resolve(res)
                        })
                        .catch((err)=>{
                            reject(err)
                        })
            })
        }
        const getSizeThs = (arr)=>{
            if(!arr.length) return []
            return Object.keys(arr[0])
        }
        // 页面初始化
        const initPage = async () => {
            document.querySelector("body").setAttribute("class", "bg-e5");
            const initToast = Toast.loading({
                message: "Loading...",
                forbidClick: true,
                duration: 0,
            });
            // app内调用，设置头
            const {
                id = '', // 65597
            } = route.query || {};
            state.id = id
            try {
                const {
                    product: {
                        imgurls = '',
                        sizeexplain = ''
                    },
                    product = {},
                    sizes = []
                } = await getGoods() || {}
                state.product = product
                state.sizes = sizes
                state.imgurls = imgurls ? imgurls.split('|') : []
                state.sizeexplain = sizeexplain && JSON.parse(sizeexplain) || []
                state.defaultAtt.forEach((it,idx)=>{
                    if(product[it]){
                        state.sizeexplain.push({
                            name: it,
                            content: product[it]
                        })
                    }
                })
                state.sizesThs = getSizeThs(sizes)
                initToast.clear()
            } catch (err) {
                initToast.clear()
            }
        };
        return {
            ...toRefs(state),
            getGoods,
            initPage,
            getSizeThs,
        };
    },
    // 定义属性
    watch: {},
});
</script>
  
<style lang="scss">
@import "./style/goodsDetails.scss";
</style>