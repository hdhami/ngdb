import { PORT } from '../../../app/config/server-config';
import buildConfig from './build-config';

const getDevModeConfig = ({ path, webpack }) => {
    const {
        paths: { outputBasePath }
    } = buildConfig;
    return {
        devtool: 'sourcemap',
        devServer: {
            hot: true,
            open: true,
            inline: true,
            compress: true,
            host: 'localhost', // Defaults to localhost
            openPage: 'html',
            port: buildConfig.PORT,
            contentBase: path.join(__dirname, outputBasePath),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
            },
            proxy: {
                '/anyRoute': {
                    target: `http://localhost:${PORT}/`,
                    secure: false
                }
            }
        },
        module: {
            rules: [
                {
                    test: /\.html$/,
                    loader: 'html-loader'
                }
            ]
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin({
                multiStep: false
            })
        ]
    };
};

export default getDevModeConfig;
