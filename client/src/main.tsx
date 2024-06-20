import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import Profile from "./pages/Profile.tsx";
import Todos from "./pages/Todos.tsx";
import Root from "./pages/Root.tsx";
import ErrorPage from "./pages/Error-page.tsx";
import { SignIn } from "./pages/SignIn.tsx";
import { SignUp } from "./pages/SignUp.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/todos",
        element: <Todos />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/signIn",
        element: <SignIn />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <App />
  </React.StrictMode>
);
