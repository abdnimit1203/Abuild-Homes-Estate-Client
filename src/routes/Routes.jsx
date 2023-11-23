import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/UserPages/Home";
import ErrorPage from "../pages/UserPages/ErrorPage";
import MainLayout from "../layouts/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);
