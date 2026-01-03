import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from "react-router-dom";
import { SellerProvider } from "./context/SellerContext";
import { StoreProvider } from "./context/StoreContext";
import "./styles/overrides.css";
import "./styles/global.css";
import "./i18n";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SellerProvider>
        <StoreProvider>
        <App />
        </StoreProvider>
      </SellerProvider>
    </BrowserRouter>
  </React.StrictMode>
);




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
