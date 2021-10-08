import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { StateProvider } from "./components/common/stateProvider";
import reducer, { initialState } from "./components/common/reducer";


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <StateProvider initialState={initialState} reducer={reducer}>
        <App />
      </StateProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);


