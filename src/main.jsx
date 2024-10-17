import React from "react";
import ReactDOM from "react-dom/client";

import { hydrate, render } from "react-dom";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import { App } from "./App";
import "./index.css";

import "@mui/material/styles/styled";
import { HelmetProvider } from "react-helmet-async";

import "../i18n";

/* 
const app = (
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
);


const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(app, rootElement);
} else {
  render(app, rootElement);
} */

/* before  installing  react-snap (for SEO)

this is in: package.json:
"postbuild": "react-snap",

/ ----- 

*/
ReactDOM.createRoot(document.getElementById("root")).render(
  <PayPalScriptProvider
    options={{
      "client-id":
        "AXQFMEsIDIdD1SJoHxSbaXVkUrzqbjutokXps4mHOG4IfPwngqs7t_WLzxv7kEbDCcJ9alo03JrtbjMd",
    }}
  >
    <Router>
      <HelmetProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </HelmetProvider>
    </Router>
  </PayPalScriptProvider>
);
