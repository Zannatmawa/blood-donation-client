import { createBrowserRouter } from "react-router";
import RootLayouts from "../layouts/RootLayouts";
import Home from "../pages/Home/Home";
import AuthLayouts from "../layouts/AuthLayouts";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayouts from "../layouts/DashboardLayouts";
import MyDontationRequest from "../pages/Dashboard/MyDontationRequest/MyDontationRequest";
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";
import PendingDontaionRequest from "../pages/PendingDontaionRequest/PendingDontaionRequest";
import AllDonationRequest from "../pages/Dashboard/AllDonationRequest/AllDonationRequest";
import AllUsersInfo from "../pages/Dashboard/AllUsersInfo/AllUsersInfo";
import CreateDonationRequest from "../pages/Dashboard/CreateDonationRequest/CreateDonationRequest";
import AdminRoute from "./AdminRoute";
import Dashboard from "../pages/Dashboard/Dashboard";
import EditBloodDonationRequest from "../pages/Dashboard/EditBloodDonationRequest/EditBloodDonationRequest";
import Search from "../pages/Home/Search/Search";
import ViewDonationReq from "../pages/Dashboard/ViewDonationReq/ViewDonationReq";
import Funding from "../pages/Funding/Funding";
import PaymentSuccess from "../pages/Dashboard/Payments/PaymentSuccess";
import AdminVolunteerRoute from "./VolunteerRoute";



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
                // element: <Donor />
            },
            {
                path: 'pending-donation-requests',
                element: <PendingDontaionRequest />
            },
            {
                path: "/dashboard/payment-success",
                element: <PaymentSuccess />
            },

            {
                path: '/search',
                element: <Search />,
                loader: () => fetch('/districts.json').then(res => res.json())

            },
            {
                path: '/funding',
                element: <PrivateRoute><Funding /></PrivateRoute>
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
                loader: () => fetch('/districts.json').then(res => res.json())
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><DashboardLayouts /></PrivateRoute>,
        children: [
            {
                path: '/dashboard',
                Component: Dashboard
            },
            {
                path: '/dashboard/view-donation-req/:id',
                Component: ViewDonationReq
            },
            {
                path: 'my-profile',
                Component: MyProfile,
                loader: () => fetch('/districts.json').then(res => res.json())
            },
            {
                path: 'create-donation-req',
                Component: CreateDonationRequest,
                loader: () => fetch('/districts.json').then(res => res.json())

            },
            {
                path: 'edit-donation-request/:id',
                Component: EditBloodDonationRequest,
                loader: () => fetch('/districts.json').then(res => res.json())
            },
            {
                path: 'my-dontaion-req',
                Component: MyDontationRequest
            },
            {
                path: "all-donation-req",
                element: <AdminVolunteerRoute>
                    <AllDonationRequest />
                </AdminVolunteerRoute>,
            },

            // {
            //     path: 'all-donation-req',
            //     element: <AdminRoute><AllDonationRequest /></AdminRoute>
            // },
            {
                path: 'all-users-info',
                element: <AdminRoute><AllUsersInfo /></AdminRoute>
            },
        ]
    },
    {
        hydrateFallbackElement: (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        ),
    }
]);
