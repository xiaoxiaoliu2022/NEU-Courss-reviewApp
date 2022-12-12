import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
// uncomment below if using microsoft login api
// import { PublicClientApplication } from "@azure/msal-browser";
// import { MsalProvider } from "@azure/msal-react";
// import { msalConfig } from "./Config";
// const msalInstance = new PublicClientApplication(msalConfig);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
        {/* <MsalProvider instance={msalInstance}> */}
            <App />
        {/* </MsalProvider> */}
  </BrowserRouter>,
);


