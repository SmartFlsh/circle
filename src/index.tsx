// index.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import DATA from '../info.json'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <>
    <App numberPoint={6} DATA={DATA}/>
    <App numberPoint={3} DATA={DATA}/>
  </>
);