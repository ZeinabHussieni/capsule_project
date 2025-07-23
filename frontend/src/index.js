import React from "react";
import ReactDOM from "react-dom/client";
import "./Styles/index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from './ThemeContext';


const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <BrowserRouter>
   <ThemeProvider>
      <App />
   </ThemeProvider>
  </BrowserRouter>
);
