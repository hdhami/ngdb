import nodeCompiler from './webpack.config.server';
import webCompiler from './webpack.config.client';

const config = [nodeCompiler, webCompiler];
export default config;
