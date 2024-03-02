import React from "react";
import { RecoilRoot } from 'recoil';
import ReactDOM from "react-dom/client";
import App from "./App";
import "./tailwind.css";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <RecoilRoot>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </RecoilRoot>
);
