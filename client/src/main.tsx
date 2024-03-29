import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./pages/App/App.tsx";
import LoginUser from "./pages/Login/Login.tsx";
import CreateUser from "./pages/CreateUser/CreateUser.tsx";
import axios from "axios";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";

const loader = async () => {
  try {
    await axios.get("/server/verify");
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
    path: "/login",
    element: <LoginUser />,
  },
  {
    path: "/newuser",
    element: <CreateUser />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </QueryClientProvider>
);
