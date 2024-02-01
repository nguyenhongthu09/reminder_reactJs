import React from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./components/App.tsx";

import "./styles/style.css";

const root: HTMLElement | null = document.getElementById("root");
if (root) {
  const reactRoot = createRoot(root);
  reactRoot.render(<App />);
}
