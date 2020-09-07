var fs = require("fs");

const https = {
  key: fs.readFileSync("src/ssl/cert.key"),
  cert: fs.readFileSync("src/ssl/cert.crt"),
};

//process.env.NODE_ENV === 'production'
module.exports = {
  publicPath: '/',
  devServer: {
    host: 'localhost',
    hotOnly: true,
    https: https,
    compress: false,
    port: 80,
    disableHostCheck: true,
  },
  transpileDependencies: ["vuetify"],
  pwa: {
    name: "MockPWA",
    themeColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black", // 'default','black-translucent',
    iconPaths: {
      favicon32: "img/icons/favicon-32x32.png",
      favicon16: "img/icons/favicon-16x16.png",
      appleTouchIcon: "img/icons/apple-touch-icon.png",
      msTileImage: "img/icons/mstile-150x150.png",
      maskIcon: "img/icons/safari-pinned-tab.svg",
    },
  },
};
