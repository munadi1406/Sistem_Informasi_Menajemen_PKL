import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HashRouter } from "react-router-dom";
// import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "@/context";
import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      
        <MaterialTailwindControllerProvider>
          <App />
        </MaterialTailwindControllerProvider>
     
    </HashRouter>
  </React.StrictMode>
);
