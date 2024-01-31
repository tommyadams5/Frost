import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import AppAdmin from "./AppAdmin.tsx";
import LoginUser from "./components/Login.tsx";
import CreateUser from "./components/CreateUser.tsx";
import axios from "axios";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";

const loader = async () => {
  try {
    await axios.get("/server/userid");
    return null;
  } catch (err) {
    return redirect("/login");
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: loader,
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
