module.exports = {
    plugins: [
        require('postcss-import'),
        require('postcss-nested'),
        require('postcss-pxtorem')({
            rootValue: 16,
            unitPrecision: 4,
            propList: ['*']
        }),
        require('postcss-preset-env')({
            features: {
                rem: false
            }
        })
    ]
};
