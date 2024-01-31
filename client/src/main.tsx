import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import AppAdmin from "./AppAdmin.tsx";
import LoginUser from "./components/Login.tsx";
import CreateUser from "./components/CreateUser.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: <AppAdmin />,
  },
  {
    path: "/login",
    element: <LoginUser />,
  },
  {
    path: "/newuser",
    element: <CreateUser />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
