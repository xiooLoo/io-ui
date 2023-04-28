const path = require('path');
const fs = require('fs');

function resolve(dir) {
  return path.join(__dirname, '../', dir);
}

const join = path.join

function getComponentEntries(_path) {
  let files = fs.readdirSync(resolve(_path));
  const _blackList = [
    'biss', 'biss-portals', 'biss-pages', 'theme-default', 'theme-chalk', 'index'
  ]
  _blackList.forEach(b => {
    const indexFolder = files.find(f => f === b)
    if (indexFolder && indexFolder.indexOf('biss') >= 0) {
      let bissFiles = fs.readdirSync(resolve(`${_path}/${indexFolder}`));
      bissFiles.forEach(bissfile => {
        files.push(`${indexFolder}/${bissfile}`)
      })
    }
  })
  const componentEntries = files.reduce((fileObj, item) => {
    const itemPath = join(_path, item);
    const isDir = fs.statSync(itemPath).isDirectory();
    const [name, suffix] = item.split('.');
    if (isDir && !_blackList.includes(name)) {
      fileObj[item] = resolve(join(itemPath, 'index.js'));
    } else if (suffix === 'js') {
      fileObj[name] = resolve(`${itemPath}`);
    }
    return fileObj;
  }, {});

  return componentEntries;
}

module.exports = {
  parallel: false,
  productionSourceMap: false,
  configureWebpack: {
    entry: {
      ...getComponentEntries('packages/yxt-ui/packages'),
      ...getComponentEntries('packages/element-ui/packages')
    },
    output: {
      filename: '[name]/index.js',
      libraryTarget: 'umd',
      libraryExport: 'default',
      library: 'yxt-ui'
    }
  },
  css: {
    sourceMap: false,
    extract: {
      filename: '[name]/index.css'
    }
  },
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
  outputDir: 'lib/packages',
  // 扩展 webpack 配置，使 packages 加入编译
  chainWebpack: config => {
    config.optimization.delete('splitChunks');
    config.plugins.delete('copy');
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');
    config.plugins.delete('html');
    config.plugins.delete('hmr');
    config.entryPoints.delete('app');

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
