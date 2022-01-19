import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
      // Loogelised sulud impordi juures tähendavad, et ei võeta kõike kaasa
      // kust imporditakse
import { BrowserRouter } from 'react-router-dom';

// BrowserRouter võimaldab URLi muuta ehk localhost:3000/midagi-muud
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
