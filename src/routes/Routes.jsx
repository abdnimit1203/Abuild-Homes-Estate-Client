import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/UserPages/Home";
import ErrorPage from "../pages/UserPages/ErrorPage";
import MainLayout from "../layouts/MainLayout";
import AllProperties from "../pages/UserPages/AllProperties";
import DashboardLayout from "../layouts/DashboardLayout";
import Login from "../pages/UserPages/Login";
import SignUp from "../pages/UserPages/SignUp";
import PrivateRoute from './PrivateRoute';
import PropertyDetails from "../pages/UserPages/PropertyDetails";

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
        element:<PrivateRoute><AllProperties /></PrivateRoute> ,
      },
      {
        path: "/properties/:id",
        element:<PrivateRoute><PropertyDetails/></PrivateRoute> ,
        loader: ({params})=> fetch(`http://localhost:3000/api/v1/properties/${params.id}`)
      },
    ],
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/sign-up",
    element: <SignUp/>
  },
  {
    path:'/dashboard',
    element: <DashboardLayout/>
  }
]);
