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
import UserHome from "../pages/DashboardPages/UserDashboard/UserHome";
import OnlyUserRoute from "./OnlyUserRoute";
import OnlyAgentRoutes from "./OnlyAgentRoutes";

import Wishlist from "../pages/DashboardPages/UserDashboard/Wishlist";
import PropertyBought from "../pages/DashboardPages/UserDashboard/PropertyBought";
import MyReviews from "../pages/DashboardPages/UserDashboard/MyReviews";
import AddProperty from "../pages/DashboardPages/AgentDashboard/AddProperty";
import MyAddedProperties from "../pages/DashboardPages/AgentDashboard/MyAddedProperties";
import MySoldProperties from "../pages/DashboardPages/AgentDashboard/MySoldProperties";
import RequestedProperties from "../pages/DashboardPages/AgentDashboard/RequestedProperties";

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
    element: <PrivateRoute><DashboardLayout/></PrivateRoute>,
    children:[
  // user routes
      {
      
       path:"profile",
        element: <UserHome></UserHome>
      },
      {
        path: 'wishlist',
        element: <OnlyUserRoute><Wishlist></Wishlist></OnlyUserRoute>
      },
      {
        path: 'property-bought',
        element: <OnlyUserRoute><PropertyBought></PropertyBought></OnlyUserRoute>
      },
      {
        path: 'my-reviews',
        element: <OnlyUserRoute><MyReviews></MyReviews></OnlyUserRoute>
      },
// agent routes
      {
        path: 'add-property',
        element: <OnlyAgentRoutes><AddProperty></AddProperty></OnlyAgentRoutes>
      },
      {
        path: 'added-properties',
        element: <OnlyAgentRoutes><MyAddedProperties></MyAddedProperties></OnlyAgentRoutes>
      },
      {
        path: 'sold-properties',
        element: <OnlyAgentRoutes><MySoldProperties></MySoldProperties></OnlyAgentRoutes>
      },
      {
        path: 'requested-properties',
        element: <OnlyAgentRoutes><RequestedProperties></RequestedProperties></OnlyAgentRoutes>
      },
//admin routes
    ]
  }
]);
