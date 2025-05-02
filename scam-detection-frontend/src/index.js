// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// /** @type {import('tailwindcss').Config} */

// export default {
//   content: [
//     "./public/index.html",
//     "./src/**/*.{js,jsx,ts,tsx}",
//     "./src/*.{js,jsx,ts,tsx}",
//     "../node_modules/**",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [
//     require("tailwindcss"),
//     require("autoprefixer"),
//     // require("@tailwindcss/typography"),
//     // require("@tailwindcss/forms"),
//     // require("@tailwindcss/aspect-ratio"),
//     // require("tailwindcss-animatecss"),
//   ],
// };
