import express from 'express';
import DashboardHtml from '../html/dashboard';
import { PORT, ROOT_PATH } from '../config/server-config';
import themes from '../config/themes';

const serverOutputPath = 'gen';
const clientOuputPath = '../proj';
const path = require('path');
const ejs = require('ejs');

const server = express();
server.use(express.static(`${serverOutputPath}`));
server.use(express.static(`${clientOuputPath}`));

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
