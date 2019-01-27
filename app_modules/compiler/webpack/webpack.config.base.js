import webpack, { DefinePlugin } from 'webpack';
import merge from 'webpack-merge';
import path from 'path';
import fs from 'fs';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import getDevModeConfig from './webpack.config.dev-server';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const defineEnvPlugin = IS_PRODUCTION
    ? [new DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } })]
    : [new DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('development') } })];

const commonPlugins = IS_PRODUCTION
    ? defineEnvPlugin.concat([
          new MiniCssExtractPlugin({
              // Options similar to the same options in webpackOptions.output
              // both options are optional
              filename: !IS_PRODUCTION ? '[name].css' : '[name].[hash].css',
              chunkFilename: !IS_PRODUCTION ? '[id].css' : '[id].[hash].css'
          })
      ])
    : defineEnvPlugin.concat([]);

let configuration = {
    mode: IS_PRODUCTION ? 'production' : 'development',
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: !IS_PRODUCTION
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: commonPlugins,
    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.css', '.png'],
        alias: {
            config: path.resolve(__dirname, '../../../app/config')
        }
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    !IS_PRODUCTION ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            }
        ]
    }
};

if (!IS_PRODUCTION) {
    const devServerConfig = getDevModeConfig({ path, webpack });
    configuration = merge(configuration, devServerConfig);
}
const baseConfig = configuration;
export { baseConfig, path, fs, webpack, IS_PRODUCTION };
