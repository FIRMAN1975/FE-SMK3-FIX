// src/main.jsx — UPDATED (tambahkan import admin.css)
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import "./features/profil/resources/custom.css";
import "./features/admin/resources/admin.css"; // ← tambahkan baris ini
 
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
