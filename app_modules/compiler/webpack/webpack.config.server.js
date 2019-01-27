import { baseConfiguraton, path, IS_PRODUCTION, merge } from './webpack.config.base';
import getConfig from './build-config';
import { getEntries } from './entry-builder';

const config = getConfig();

const serverConfiguration = merge(baseConfiguraton, {
    entry: getEntries(IS_PRODUCTION, path, path.join(__dirname, config.paths.rootPathRelativeToCompiler)),
    output: {
        path: path.join(__dirname, config.paths.outputBasePath),
        publicPath: IS_PRODUCTION ? config.paths.publicPath : '/',
        chunkFilename: IS_PRODUCTION ? 'chunks/[name].[hash].min.js' : 'chunks/[name].[hash].js',
        filename: IS_PRODUCTION ? '[name].min.js' : '[name].js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.css', '.png'],
        alias: {
            components: path.join(
                __dirname,
                config.paths.rootPathRelativeToCompiler,
                config.paths.componentsPathFromRoot
            )
        }
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /.js?$/,
                exclude: /node_modules|abcd/,
                use: [
                    {
                        loader: 'eslint-loader',
                        options: {
                            ignorePath: '.eslintignore'
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
            }
        ]
    }
});
module.exports = serverConfiguration;
