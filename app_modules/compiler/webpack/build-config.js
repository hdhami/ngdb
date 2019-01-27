const config = () => {
    return {
        paths: {
            rootPathRelativeToCompiler: '../../../',
            outputBasePath: '../../../gen/',
            publicPath: '/',
            componentsPathFromRoot: '/app/components/'
        },
        PORT: 9000
    };
};

export default config;
