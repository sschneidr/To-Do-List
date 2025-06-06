import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./App.css";

createRoot(document.getElementById("body")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
