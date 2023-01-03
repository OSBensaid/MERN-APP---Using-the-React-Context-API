import React from "react";
import ReactDOM from "react-dom/client";
import { BudgetsContextProvider } from "./context/BudgetsContext";

import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BudgetsContextProvider>
      <App />
    </BudgetsContextProvider>
  </React.StrictMode>
);
