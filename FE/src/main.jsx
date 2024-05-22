import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";

import App from "./App.jsx";
import UserLogin from "./pages/UserLogin.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <UserLogin />,
  },
  {
    path: "/register",
    element: null,
  },
  {
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: null,
        children: [
          {
            path: "/create-pesanan-sampah",
            element: null,
          },
        ],
      },
      {
        path: "/store",
        element: null,
        children: [
          {
            path: ":id",
            element: null,
          },
        ],
      },
      {
        path: "/profile",
        element: null,
      },
    ],
  },
  {
    path: "/admin",
    element: null,
    children: [
      {
        path: "authenticate",
        element: null,
      },
      {
        path: "order-sampah",
        element: null,
      },
      {
        path: "order-sampah/:id",
        element: null,
      },
      {
        path: "order-produk",
        element: null,
      },
      {
        path: "order-produk/:id",
        element: null,
      },
      {
        path: "produk",
        element: null,
      },
      {
        path: "produk/:id",
        element: null,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
