import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import App from '../components/root/app';
import generateHtml from './dashboard.html';

const sheet = new ServerStyleSheet();

const body = renderToString(
    <StyleSheetManager sheet={sheet.instance}>
        <App />
    </StyleSheetManager>
);

const styleTags = sheet.getStyleTags();
const scripts = `<script src='/app.min.js'></script>`;
const title = 'Server side Rendering CSS in JS';

const html = generateHtml({
    body,
    title,
    styleTags,
    scripts
});
export default html;
