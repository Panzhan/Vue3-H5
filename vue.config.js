const path = require("path");
const updeta = require("./build/upload");
const isProd = process.env.NODE_ENV === "production";
const assetsDir = "static";
const baseUrl = process.env.baseUrl;
// const PrerenderSPAPlugin = require("prerender-spa-plugin");
// const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
module.exports = {
  publicPath: "/", // 部署应用时的根路径(默认'/'),也可用相对路径(存在使用限制)
  outputDir: "dist", // 运行时生成的生产环境构建文件的目录(默认''dist''，构建之前会被清除)
  assetsDir: "", //放置生成的静态资源(s、css、img、fonts)的(相对于 outputDir 的)目录(默认'')
  indexPath: "index.html", //指定生成的 index.html 的输出路径(相对于 outputDir)也可以是一个绝对路径。
  pages: {
    //pages 里配置的路径和文件名在你的文档目录必须存在 否则启动服务会报错
    index: {
      //除了 entry 之外都是可选的
      entry: "./src/main.js", // page 的入口,每个“page”应该有一个对应的 JavaScript 入口文件
      template: "public/index.html", // 模板来源
      filename: "index.html", // 在 dist/index.html 的输出
      title: "V3H5", // 当使用 title 选项时,在 template 中使用：<title><%= htmlWebpackPlugin.options.title %></title>
      chunks: ["chunk-vendors", "chunk-common", "index"], // 在这个页面中包含的块，默认情况下会包含,提取出来的通用 chunk 和 vendor chunk
      // chunks: ['manifest','chunk-common', 'chunk-vendors', 'vendor', 'index'],
      // chunksSortMode: 'manual',
    },
    // subpage: 'src/subpage/main.js'//官方解释：当使用只有入口的字符串格式时,模板会被推导为'public/subpage.html',若找不到就回退到'public/index.html',输出文件名会被推导为'subpage.html'
  },

  configureWebpack: (config) => {
    // if (process.env.NODE_ENV == 'development' ) return ;
    return {
      plugins: [
        // new PrerenderSPAPlugin({
        //   // 生成文件的路径，也可以与webpakc打包的一致。
        //   // 下面这句话非常重要！！！
        //   // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
        //   staticDir: path.join(__dirname, "/dist"),
        //   // 对应自己的路由文件，比如a有参数，就需要写成 /a/param1。
        //   routes: ["/website/index", "/share/index"],
        //   // 这个很重要，如果没有配置这段，也不会进行预编译
        //   renderer: new Renderer({
        //     ignoreJSErrors: true,
        //     inject: {
        //       foo: "bar",
        //     },
        //     headless: false,
        //     // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
        //     // renderAfterDocumentEvent: "render-event",
        //     captureAfterTime: 5000,
        //     maxAttempts: 10,
        //   }),
        // }),
      ],
      performance: {
        hints: false,
      },
    };
  },
  lintOnSave: false, // 是否在保存的时候检查
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      sass: {
        data: `$baseUrl: "${baseUrl}";
                @import '~@/assets/css/vars.scss';
                @import '~@/assets/css/mixins.scss';
                @import "~@/assets/css/sprite.scss";`,
      },
    },
    // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: false,
  },
  devServer: {
    host: "0.0.0.0",
    port: 9101,
    https: false,
    hotOnly: false,
    open: true,
    hot: true,
    // proxy: {}, // 设置代理
    // before: app => { updeta.load() },
    after: function(app, server, compiler) {
      // console.log(123, updeta)
      updeta.load();
    },
  },
  pluginOptions: {
    // 第三方插件配置
    // ...
  },
//   configureWebpack: {
//     performance: {
//       hints: false,
//     },
//   },
  chainWebpack: (config) => {
    config.productionGzip = true;
    config
      .mode("production")
      .output.filename(assetsDir + "/js/[name].[hash].js")
      .chunkFilename(assetsDir + "/js/[name].[hash].js");

    config.plugin("extract-css").use(require("mini-css-extract-plugin"), [
      {
        filename: assetsDir + "/css/[name].[contenthash:3].css",
        chunkFilename: assetsDir + "/css/[name].[contenthash:3].css",
      },
    ]);
    // 展示构建进度
    config
      .plugin("progressBarWebpackPlugin")
      .use(require("progress-bar-webpack-plugin"));
    // config.plugin('webpackDashboard').use(require('webpack-dashboard'))

    if (isProd) {
      if (process.env.ANALAYZ_PORT) {
        config
          .plugin("webpack-bundle-analyzer")
          .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin);
      }
    } else {
      // mutate for development...
      config.plugin("html").use(require("html-webpack-plugin"), [
        {
          title: "V3H5",
          // url: path.resolve(__dirname, 'public/favicon.ico'),
          filename: "index.html",
          template: path.resolve(__dirname, "public/index.html"),
          cdnInject: `
                  <script src="//files.eyee.com/mcdn/3rd/vconsole.min.js"> </script>
                  <script>var vConsole = new VConsole()</script>`,
        },
      ]);
    }
    config.externals({
      vue: "Vue",
      "vue-router": "VueRouter",
      "vue@nex": "vue@nex",
      "vue-router@next": "vue-router@next",
    });

    // 雪碧图
    config.plugin("spritesmith").use(require("webpack-spritesmith"), [
      {
        src: {
          cwd: path.resolve(__dirname, "src/assets/img/ico"),
          glob: "*.png",
        },
        target: {
          image: path.resolve(__dirname, "src/assets/img/sprite.png"),
          css: [
            [
              path.resolve(__dirname, "src/assets/css/sprite.scss"),
              {
                format: "function_based_template",
              },
            ],
          ],
        },
        customTemplates: {
          function_based_template: path.resolve(
            __dirname,
            "src/assets/sprite_handlebars_template.handlebars"
          ),
        },
        apiOptions: {
          cssImageRef: "https://files.eyee.com/eyeeh5/img/sprite.png",
        },
        spritesmithOptions: {
          algorithm: "top-down",
          // algorithm: 'binary-tree',
          padding: 10,
        },
      },
    ]);

    config.module
      .rule("images")
      .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
      .use("url-loader")
      .loader("file-loader")
      .options({
        name: assetsDir + "/img/[name].[ext]",
      });
    // 路径别名
    config.resolve.alias
      .set("comps", path.resolve(__dirname, "src/components"))
      .set("api", path.resolve(__dirname, "src/apis/index.js"))
      .set("@", path.resolve(__dirname, "src"));
  },
};
