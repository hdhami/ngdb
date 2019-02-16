import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../components/root/app';
import generateHtml from './dashboard.html';

const body = renderToString(<App />);
const title = 'Server side Rendering with Styled Components';

const html = generateHtml({
    body,
    title
});
export default html;
