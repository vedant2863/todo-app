import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/error-page";
import Todos from "../pages/Todos";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import { App } from "../App";

export const router = createBrowserRouter([
    path: "/",
    element: <App />,
    children: [
  {path: "/home",element: <Home />,},
  { path: "/todos", element: <Todos /> },
  { path: "/profile/:id", element: <Profile  /> },
  { path: "*", element: <ErrorPage /> },]
]);
