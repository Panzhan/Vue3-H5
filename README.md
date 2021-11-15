环境


安装脚手架：


npm install -g @vue/cli


安装依赖:


yarn install


本地运行(端口号: 15301):


yarn run serve



rem使用规则


以 1倍像素值 的设计稿为准, px值除以100乘以2得到对应rem值(rem = px / 100 * 2);


示例：设计稿尺寸为 14px, 则对应rem值为 0.28rem
14/50 px


sass中, 直接用 1倍像素值 的设计稿的px值乘以 $px 变量即可


示例：设计稿尺寸为 14px, 则对应sass中为 14 * $px






§命名约定



css类名 使用 kebab-case;

.vue 的文件名使用 PascalCase, 文件中 的 name 与文件名同名;

router 中, component 定义变量名使用 PascalCase, 路由的 name 命名使用 camelCase, 路由定义中的 webpackChunkName 使用 camelCase;



- 公共组件中( components 文件夹下)的所有 单一单词 命名的组件中的根级类名需加上 com- 前缀。如: Attitude.vue 中的根级类名为 com-attitude;


通用说明


- 基础组件的自动全局注册, 需将基础组件放置 src/components/base/* 路径下;


测试环境地址：http://testh5.sneakerburgers.com/
正式环境地址： http://m.sneakerburgers.com/
# Check-H5

鉴定H5项目
