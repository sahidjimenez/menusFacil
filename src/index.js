import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ProductProvider } from './context/dataContext';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    < ProductProvider>
      <App />
    </ProductProvider >
  </React.StrictMode>
);

