const getVendorEntry = isProduction => {
    const vendors = ['react', 'react-dom', 'prop-types'];
    return {
        vendor: isProduction ? vendors : vendors.unshift('babel-polyfill')
    };
};
const getAppEntries = (path, rootPath) => ({
    app: path.join(rootPath, 'app/components/root/app.client.js')
});

const getServerEntries = (path, rootPath) => ({
    server: path.join(rootPath, 'app/server/server.js')
});

const getEntries = (isProduction, path, rootPath) => ({
    ...getVendorEntry(isProduction),
    ...getAppEntries(path, rootPath)
});

export { getEntries, getAppEntries, getVendorEntry, getServerEntries };
