import express from 'express';
import DashboardHtml from '../html/dashboard';
import { PORT, ROOT_PATH } from '../config/server-config';
import themes from '../config/themes';

const path = require('path');

const server = express();
server.use(express.static('gen'));

server.get('/', (req, res) => {
    res.send(DashboardHtml);
});

async function getDataAsync(sourcePath) {
    let html = '';
    try {
        html = await import(`${sourcePath}`).default;
    } catch (error) {
        console('error caught', error);
    }

    return html ? html() : '';
}

server.get('/:theme/:lang/:page', (req, res) => {
    const themeName = req.params.theme;
    const source = req.params.page;

    const themeDetails = themes.find(_theme => _theme.name === themeName);

    const pageSource = themeDetails ? themeDetails.pageSource.find(pageSrc => pageSrc.name === source) : null;
    let sourceHtml = '';

    if (pageSource) {
        sourceHtml = getDataAsync(`${path.join(ROOT_PATH, pageSource.source)}`);
    }
    res.send(sourceHtml);
});

server.listen(PORT);
// eslint-disable-next-line no-console
console.log(`Serving running at http://localhost:${PORT}`);
