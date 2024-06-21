import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Profile from "./pages/Profile.tsx";
import Root from "./pages/Root.tsx";
import Todos from "./pages/Todos.tsx";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import AppLayout from "./AppLayout.tsx";
import AuthLayout from "./components/AuthLayout.tsx";
import { Provider } from 'react-redux';
import store from "./context/store.tsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Root />,

      },
      {
        path: "/profile/:id",
        element: (
          <AuthLayout authentication={false}>
            <Profile />
          </AuthLayout>
        ),

      },
      {
        path: "/todos",
        element: (
          <AuthLayout authentication={false}>
            <Todos />
          </AuthLayout>
        ),

      },
      {
        path: "/signin",
        element: <SignIn />,

      },
      {
        path: "/signup",
        element: <SignUp />,

      },
    ],
  },
]);





ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>

  </React.StrictMode>
);
