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

/* import "../i18n"; */

import i18n, { i18nPromise } from "../i18n";
import { useState, useEffect } from "react";

// analytics
import { PostHogProvider } from "posthog-js/react";
import posthog from "posthog-js";

const VITE_PUBLIC_POSTHOG_HOST =
  import.meta.env.VITE_PUBLIC_POSTHOG_HOST ||
  process.env.VITE_PUBLIC_POSTHOG_HOST;

const VITE_PUBLIC_POSTHOG_KEY =
  import.meta.env.VITE_PUBLIC_POSTHOG_KEY ||
  process.env.VITE_PUBLIC_POSTHOG_KEY;

/* const options = {
  api_host: VITE_PUBLIC_POSTHOG_HOST,
}  */

posthog.init(VITE_PUBLIC_POSTHOG_KEY, {
  api_host: VITE_PUBLIC_POSTHOG_HOST,
  person_profiles: "always", // or 'always' to create profiles for anonymous users as well
});


/* 
import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL; */

const Root = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait for i18nPromise to resolve before rendering the app
    i18nPromise.then(() => setLoading(false));
  }, []);

  if (loading) {
    return <div></div>;
  }

  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AXQFMEsIDIdD1SJoHxSbaXVkUrzqbjutokXps4mHOG4IfPwngqs7t_WLzxv7kEbDCcJ9alo03JrtbjMd",
      }}
    >
      <Router>
        <HelmetProvider>
          <AuthProvider>
            <PostHogProvider client={posthog}>
              <App />
            </PostHogProvider>
          </AuthProvider>
        </HelmetProvider>
      </Router>
    </PayPalScriptProvider>
  );
};

// Render the Root Component
ReactDOM.createRoot(document.getElementById("root")).render(<Root />);

// try to make it i18n, init before any render so it can be used
/* ReactDOM.createRoot(document.getElementById("root")).render(
  <PayPalScriptProvider
    options={{
      "client-id":
        "AXQFMEsIDIdD1SJoHxSbaXVkUrzqbjutokXps4mHOG4IfPwngqs7t_WLzxv7kEbDCcJ9alo03JrtbjMd",
    }}
  >
    <Router>
      <HelmetProvider>
        <AuthProvider>
          <PostHogProvider client={posthog}>
            <App />
          </PostHogProvider>
        </AuthProvider>
      </HelmetProvider>
    </Router>
  </PayPalScriptProvider>
); */
