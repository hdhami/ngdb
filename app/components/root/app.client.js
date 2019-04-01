import React from 'react';
import { hydrate } from 'react-dom';
import App from './app';

const node = document.getElementById('root');
hydrate(<App />, node);
