import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { green } from 'chalk';
import App from '../components/root/app';
import Html from '../html/dashboard';
import PORT from '../config/server-config';

const server = express();

server.get('/', (req, res) => {
    const body = renderToString(<App />);
    const title = 'Server side Rendering with Styled Components';

    res.send(
        Html({
            body,
            title
        })
    );
});

server.listen(PORT);
green(`Serving running at http://localhost:${PORT}`);
