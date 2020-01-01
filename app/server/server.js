import express from 'express';
// import expressStaticGzip from 'express-static-gzip';
import DashboardHtml from '../html/dashboard';
import { PORT, ROOT_PATH } from '../config/server-config';
import themes from '../config/themes';

const serverOutputPath = 'gen';
const clientOuputPath = '../proj';
const path = require('path');
const ejs = require('ejs');
const compression = require('compression');
// const shrinkRay = require('shrink-ray');

const server = express();
server.use(express.static(`${serverOutputPath}`));
server.use(express.static(`${clientOuputPath}`));
server.use(compression());
// server.use(shrinkRay());
// server.use(
//     `${serverOutputPath}`,
//     expressStaticGzip(`${serverOutputPath}`, {
//         enableBrotli: true,
//         orderPreference: ['br', 'gz']
//     })
// );
// server.use(
//     `${clientOuputPath}`,
//     expressStaticGzip(`${clientOuputPath}`, {
//         enableBrotli: true,
//         orderPreference: ['br', 'gz']
//     })
// );
// view engine setup
server.engine('ejs', ejs.renderFile);
server.set('view engine', 'ejs');

server.get('/', (req, res) => {
    res.send(DashboardHtml);
});

server.get('/:theme/:lang/:page', (req, res) => {
    const themeName = req.params.theme;
    const source = req.params.page;

    const themeDetails = themes.find(_theme => _theme.name === themeName);

    const pageSource = themeDetails ? themeDetails.pageSource.find(pageSrc => pageSrc.name === source) : null;

    if (pageSource) {
        const filePath = path.join(`${ROOT_PATH}`, `${pageSource.source}`);
        res.render(path.resolve(filePath), {
            themeDetails,
            pageSource
        });
    }
});

server.listen(PORT);
// eslint-disable-next-line no-console
console.log(`Serving running at http://localhost:${PORT}`);
