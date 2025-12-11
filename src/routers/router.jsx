import { createBrowserRouter } from "react-router";
import RootLayouts from "../layouts/RootLayouts";
import Home from "../pages/Home/Home";
import AuthLayouts from "../layouts/AuthLayouts";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Donor from "../pages/Donor/Donor";
import DashboardLayouts from "../layouts/DashboardLayouts";
import createDontaionRequest from "../pages/Dashboard/createDontaionRequest/createDontaionRequest";
import MyDontationRequest from "../pages/Dashboard/MyDontationRequest/MyDontationRequest";
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";



export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayouts,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'beADonor',
                element: <PrivateRoute><Donor /></PrivateRoute>
            },
            {
                path: 'donation-requests',
                element: <PrivateRoute><Donor /></PrivateRoute>
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayouts,
        children: [
            {
                path: '/login',
                Component: Login,
            },
            {
                path: '/register',
                Component: Register,
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><DashboardLayouts /></PrivateRoute>,
        children: [
            {
                path: 'create-dontaion-req',
                Component: createDontaionRequest
            },
            {
                path: 'my-dontaion-req',
                Component: MyDontationRequest
            },
            {
                path: 'my-profile',
                Component: MyProfile
            },
        ]
    }
]);
