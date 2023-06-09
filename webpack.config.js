const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  // 1.开发模式（development）：代码不会压缩
  // 2.生产模式（production）：代码会压缩
  mode: 'production',
  entry: './src/index.js',
  output: {
    // 打包后文件的名字，还可以是 'main.[hash:8].js'
    //  [hash]/[hash:8]：为打包后的文件创建哈希名
    //   + 代码一但被修改，生成的文件名中的哈希值也会变化，有助于强缓存的设置
    filename: 'main.[hash:8].js',
    path: path.resolve(__dirname, './dist'),
  },
  /* 优化项 */
  optimization: {
    // 设置压缩方式
    minimizer: [new CssMinimizerWebpackPlugin(), new TerserPlugin()],
  },
  /** 使用插件 */
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      minify: true,
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: ' main.[hash:8].css',
    }),
  ],
  /**启动本地服务器 */
  devServer: {
    host: '127.0.0.1',
    port: 3000,
    open: true, // 自动打开浏览器
    hot: true, // 热更新
    compress: true, // 开启服务器端的gzip压缩
    /**跨域代理处理 */
    proxy: {
      '/jian': {
        target: 'https://www.jianshu.com/asimov',
        changeOrigin: true, // 修改请求头中的origin源信息
        ws: true, // 支持websocket通信
        pathRewrite: { '^/jian': '' }, // 地址重写
      },
      '/zhi': {
        target: 'https://news-at.zhihu.com/api/4',
        changeOrigin: true, // 修改请求头中的origin源信息
        ws: true, // 支持websocket通信
        pathRewrite: { '^/zhi': '' }, // 地址重写
      },
    },
  },
  /**loader 加载器，执行顺序：从下到上，从右到左 */
  module: {
    rules: [
      /**css loader */
      {
        test: /\.(css|less)$/,
        use: [
          MiniCssExtractPlugin.loader, // 抽离css代码，以外联式link到html
          // 'style-loader', // 将css以内嵌式导入到页面
          'css-loader', // 处理特殊语法
          'postcss-loader', // 配合autoprefixer&browserlist给css3加前缀【兼容】
          'less-loader', // 将less编译为css
        ],
      },
      /**js loader */
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
    ],
  },
};
