const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');

// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      new ImageminPlugin({
        disable: process.env.NODE_ENV !== 'production',
        plugins: [
          imageminPngquant({ quality: [0.5, 0.5] }),
          imageminMozjpeg({ quality: 90 }),
        ],
      }),
    ],
  },
};
