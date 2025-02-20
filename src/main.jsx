import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const detectMeta = document.createElement("meta");
detectMeta.httpEquiv = "origin-trial";
detectMeta.content = import.meta.env.VITE_DETECTOR_TOKEN;
document.head.append(detectMeta);

const transMeta = document.createElement("meta");
transMeta.httpEquiv = "origin-trial";
transMeta.content = import.meta.env.VITE_TRANSLATION_TOKEN;
document.head.append(transMeta);

const sumMeta = document.createElement("meta");
sumMeta.httpEquiv = "origin-trial";
sumMeta.content = import.meta.env.VITE_SUMMARIZER_TOKEN;
document.head.append(sumMeta);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
