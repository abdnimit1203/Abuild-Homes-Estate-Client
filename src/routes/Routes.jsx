import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/UserPages/Home";
import ErrorPage from "../pages/UserPages/ErrorPage";
import MainLayout from "../layouts/MainLayout";
import AllProperties from "../pages/UserPages/AllProperties";
import DashboardLayout from "../layouts/DashboardLayout";
import Login from "../pages/UserPages/Login";

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
      {
        path: "/all-properties",
        element: <AllProperties />,
      },
      
     

    ],
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path:'/dashboard',
    element: <DashboardLayout/>
  }
]);
