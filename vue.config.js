const { defineConfig } = require('@vue/cli-service')
const TerserPlugin = require('terser-webpack-plugin');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vege_smoothie/' // REPO_NAME을 저장소 이름으로 변경
    : '/',
  configureWebpack: {
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin({
        terserOptions: {
          compress: true,
          mangle: true,
          output: {
            comments: false,
          },
        },
      })],
    },
  },
  productionSourceMap: false, // 프로덕션 빌드 시 소스 맵 생성 안 함
});
