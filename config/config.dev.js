const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '../', dir);
}

module.exports = {
  devServer: {
    port: 8080,
    inline: true,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      '/api': {
        target: 'http://202.100.247.175:32569',
        changeOrigin: true,
        pathRewrite: {
          '/api': '/api'
        },
        secure: true
      }
    }
  },
  pages: {
    index: {
      // 修改项目的入口文件
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  outputDir: 'lib',
  // 扩展 webpack 配置，使 packages 加入编译
  chainWebpack: config => {
    config.resolve.alias.set('@', path.resolve('packages/yxt-ui/src'))
    config.resolve.alias.set('@yxtui', path.resolve('packages/yxt-ui'))
    config.resolve.alias.set('@assets', path.resolve('packages/assets'))
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');
    config.module
      .rule('svg')
      .exclude.add(resolve('packages/yxt-ui/packages/yxt-svg-icon/svgs'))
      .end()
    config.module
      .rule('svgs')
      .test(/\.svg$/)
      .include.add(resolve('packages/yxt-ui/packages/yxt-svg-icon/svgs'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end();
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      })
      .end();

    config
      .when(
        process.env.NODE_ENV === 'development',
        cfg => cfg.devtool('cheap-source-map')
      );
  }
};
