import React from "react";
import ReactDOM from "react-dom";

import "./bootstrap.min.css";

import Offline from "./Off";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(<Offline />, document.getElementById("offline-root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
