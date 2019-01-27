var merge = require('webpack-merge');
var baseConfigObj = require('./webpack.config.base');
var config = require('./config');
const configGen2 = require('./config.gen2');
var workboxPlugin = require('workbox-webpack-plugin');
var htmlTmplReport = require('eslint/lib/formatters/html');
var fse = require('fs-extra');
var baseConfig = baseConfigObj.config;
var fs = baseConfigObj.fs;
var webpack = baseConfigObj.webpack;
var path = baseConfigObj.path;
var ExtractTextPlugin = baseConfigObj.ExtractTextPlugin;
var clientLibsPath = config.paths.clientLibsPath;
var componentFolder = `${process.cwd()}${config.paths.clientlibsChunks}`;
var entryForClientComponents = {};
var IS_PRODUCTION = baseConfigObj.IS_PRODUCTION;
const prepareGen2ClientlibEntries = require('./helpers/entryBuilder').prepareClientlibEntries;

// Read components directory and create entries based on directory names
fs.readdirSync(componentFolder).forEach(folder => {
  entryForClientComponents[`global/components/${folder}/index`] = [`${componentFolder}${folder}/index.js`];
});

//Clean Dir for webpack lazyloads
fse.remove(`${path.join(__dirname, clientLibsPath, 'lazyloads/resources')}`).then(() => {
  console.log(`removed directory-- ${path.join(__dirname, clientLibsPath, 'lazyloads/resources')}`);
});

var vendors = config.vendors;
!IS_PRODUCTION ? vendors.unshift('babel-polyfill') : '';
var entryForClientBundle = {
    'app/polyfill/polyfills': './src/app/polyfills/babel-polyfill',
    vendor: vendors,
    'app/app': path.resolve(__dirname, '../src/app/index.js'),
    'app/G2Init/G2Init': configGen2.GEN2_INIT_PATH,
    'app/G2Polyfills/G2Polyfills': configGen2.GEN2_POLYFILLS_PATH
};
if (IS_PRODUCTION) {
  entryForClientBundle[`app/G2Init`] = configGen2.GEN2_INIT_PATH;
  entryForClientBundle[`app/G2Polyfills`] = configGen2.GEN2_POLYFILLS_PATH;
}

var entries = Object.assign(
  {},
  entryForClientBundle,
  entryForClientComponents,
  prepareGen2ClientlibEntries(configGen2.CLIENTLIB_CHUNKS_SOURCES)
);
var clientLoaderPlugins = IS_PRODUCTION
  ? [
      new workboxPlugin({
        globDirectory: 'src/server/local/service-worker-precache',
        globPatterns: ['**/*.{png,css}'],
        swDest: path.join(
          '../cms/mgm-experience/src/main/content/jcr_root/apps/mgm-clientlibs/',
          'app/service-worker/resources/service-worker_common.js'
        ),
        clientsClaim: true,
        skipWaiting: true
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.HashedModuleIdsPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        names: 'vendor',
        filename: 'app/vendor/vendor.bundle.min.js'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'app/common/common.bundle'
      }),
      new ExtractTextPlugin({ filename: '[name].min.css', disable: false, allChunks: true })
    ]
  : [
      new workboxPlugin({
        globDirectory: 'src/server/local/service-worker-precache',
        globPatterns: ['**/*.{png,css}'],
        swDest: path.join(
          '../cms/mgm-experience/src/main/content/jcr_root/apps/mgm-clientlibs/',
          'app/service-worker/resources/service-worker_common.js'
        ),
        clientsClaim: true,
        skipWaiting: true
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.HashedModuleIdsPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'app/vendor/vendor.bundle.js'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'app/common/common.bundle'
      }),
      new ExtractTextPlugin({ filename: '[name].css', disable: false, allChunks: true })
    ];

var webConfig = merge(baseConfig, {
  entry: entries,
  output: {
    path: path.join(__dirname, clientLibsPath),
    publicPath: IS_PRODUCTION ? config.paths.publicPath : '/',
    chunkFilename: IS_PRODUCTION ? 'lazyloads/resources/[name].[hash].min.js' : 'lazyloads/resources/[name].[hash].js',
    filename: IS_PRODUCTION ? '[name].min.js' : '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css', '.png'],
    alias: {
      styles: path.resolve(__dirname, '../src/app/styles'),
      utility: path.resolve(__dirname, '../src/app/utility'),
      stores: path.resolve(__dirname, '../src/app/stores')
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /.js?$/,
        exclude: /node_modules|src\/app\/vendor|gen2/,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              ignorePath: '.eslintignore',
              outputReport: {
                filePath: '../../../../../../../../../../../Reports/eslint/report.html',
                formatter: htmlTmplReport
              }
            }
          }
        ]
      },
      {
        test: /.js?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  'env',
                  {
                    modules: false,
                    targets: { browsers: ['last 2 versions', 'safari >= 7', 'ie >= 10'] }
                  }
                ],
                'stage-0',
                'react'
              ],
              plugins: ['transform-decorators-legacy', 'transform-class-properties'],
              comments: true
            }
          }
        ]
      },
      {
        test: /\.(jpe*g|png|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '../images/'
            }
          }
        ]
      }
    ]
  },
  plugins: clientLoaderPlugins
});
module.exports = webConfig;
