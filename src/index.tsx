import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import "./index.css";
import { BrowserTracing } from "@sentry/tracing";
import App from "./App";

if (process.env.REACT_APP_SENTRY_DSN) {
  Sentry.init({
    dsn: "https://753200a0eedf4048b6a86f622e43bdaa@o1202989.ingest.sentry.io/6328590",
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
