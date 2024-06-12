import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/error-page";
import Todos from "../pages/Todos";
import Home from "../pages/Home";
import Layout from "../components/shared/layout";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // { path: "/", element: <App /> },
      { path: "/home", element: <Home /> },
      { path: "/todos", element: <Todos /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);
