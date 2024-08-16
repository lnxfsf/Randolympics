import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import { App } from "./App";
import "./index.css";

import '@mui/material/styles/styled';


ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
);
