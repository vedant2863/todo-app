import React from "react";
import ReactDOM from "react-dom/client";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';


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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>

);
