import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "antd/dist/reset.css";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import Home from "./components/Home";
import store from "./state/store";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/cryptocurrencies",
        lazy: async () => {
          let { CryptoCurrencies } = await import("./components");
          return { Component: CryptoCurrencies };
        }
      },
      {
        path: "/crypto/:coinId",
        lazy: async () => {
          let { CryptoDetails } = await import("./components");
          return { Component: CryptoDetails };
        }
      }
    ]
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

if (root) {
  root.render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
