import { Routing } from "../pages";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import AppProvider from "./providers";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename="/text-to-pdf-converter">
      <AppProvider>
        <Routing />
      </AppProvider>
    </BrowserRouter>
  </StrictMode>
);
