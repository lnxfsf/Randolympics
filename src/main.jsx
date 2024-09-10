import React from "react";
import ReactDOM from "react-dom/client";

import { hydrate, render } from "react-dom";

import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import { App } from "./App";
import "./index.css";

import '@mui/material/styles/styled';



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
}


/* before  installing  react-snap (for SEO)

this is in: package.json:
"postbuild": "react-snap",

/ ----- 


ReactDOM.createRoot(document.getElementById("root")).render(

  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
); 
 */