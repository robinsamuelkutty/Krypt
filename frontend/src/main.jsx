import React from "react";
import ReactDOM from "react-dom/client"; 
import App from "./App";
import { TransactionProvider } from "./context/TransactionContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <TransactionProvider>
    <App />
  </TransactionProvider>
);
