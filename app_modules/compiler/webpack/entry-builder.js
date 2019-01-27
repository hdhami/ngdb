const getVendorEntry = isProduction => {
    const vendors = ['react', 'react-dom', 'prop-types', 'mobx', 'mobx-react', 'axios', 'moment'];
    return {
        vendor: isProduction ? vendors : vendors.unshift('babel-polyfill')
    };
};
const getAppEntries = (path, rootPath) => {
    return {
        server: path.join(rootPath, 'app/server/server.js')
    };
};

const getEntries = (isProduction, path, rootPath) => {
    return {
        ...getVendorEntry(isProduction),
        ...getAppEntries(path, rootPath)
    };
};

export { getEntries, getAppEntries, getVendorEntry };
