import express from 'express';
import DashboardHtml from '../html/dashboard';
import { PORT } from '../config/server-config';

const server = express();

server.get('/', (req, res) => {
    res.send(DashboardHtml);
});

server.listen(PORT);
// eslint-disable-next-line no-console
console.log(`Serving running at http://localhost:${PORT}`);
