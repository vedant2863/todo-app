import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/error-page";
import Profile from "../pages/Profile";
import Todos from "../pages/Todos";
import Home from "../pages/Home";

export const router = createBrowserRouter([
  {path: "/",element: <Home />,},
  { path: "/todos", element: <Todos /> },
  { path: "/profile/:id", element: <Profile /> },
  { path: "*", element: <ErrorPage /> },
]);
