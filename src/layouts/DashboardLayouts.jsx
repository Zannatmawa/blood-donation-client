import { useState } from "react";
import {
    Home,
    User,
    HeartPulse,
    UserCircle,
    PlusCircle,
    Users,
    Settings2,
    ClipboardList,
    Settings,
    LogOut,
    Menu
} from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router";
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

export default function Sidebar() {
    const { role } = useRole();
    const [open, setOpen] = useState(true);
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(res => {
                navigate('/login')
            })
            .catch(error => {
            })
    }

    return (
        <div className="flex">

            <div className={`${open ? "w-64" : "w-20"} bg-red-600 min-h-screen p-5 pt-8 transition-all duration-300 text-white relative`}>

                <button
                    onClick={() => setOpen(!open)}
                    className="absolute -right-3 top-9 bg-white text-red-600 rounded-full p-1 shadow-md"
                >
                    <Menu size={20} />
                </button>

                <h1 className={`${open ? "text-2xl" : "text-xl"} font-bold text-white mb-10`}>
                    {open ? <Link to="/">Blood Bridge</Link> : "BB"}
                </h1>

                <ul className="space-y-4 text-sm">

                    <li className="flex items-center gap-4 hover:bg-red-500 p-2 rounded-lg cursor-pointer">
                        <Home size={20} /> <span className={open ? "block" : "hidden"}><Link to="/dashboard">Dashboard</Link></span>
                    </li>

                    <li className="flex items-center gap-4 hover:bg-red-500 p-2 rounded-lg cursor-pointer">
                        <UserCircle size={20} /> <span className={open ? "block" : "hidden"}><Link to='/dashboard/my-profile'>My Profile</Link></span>
                    </li>

                    <li className="flex items-center gap-4 hover:bg-red-500 p-2 rounded-lg cursor-pointer">
                        <PlusCircle size={20} /> <span className={open ? "block" : "hidden"}><Link to='/dashboard/create-donation-req'>Create Donation Request</Link></span>
                    </li>

                    <li className="flex items-center gap-4 hover:bg-red-500 p-2 rounded-lg cursor-pointer">
                        <ClipboardList size={20} /> <span className={open ? "block" : "hidden"}><Link to='/dashboard/my-dontaion-req'>My Donation Requests</Link></span>
                    </li>

                    {role === 'admin' && <>
                        <li className="flex items-center gap-4 hover:bg-red-500 p-2 rounded-lg cursor-pointer">
                            <Users size={20} /> <span className={open ? "block" : "hidden"}><Link to='/dashboard/all-users-info'>All Users Info</Link></span>
                        </li>

                        <li className="flex items-center gap-4 hover:bg-red-500 p-2 rounded-lg cursor-pointer">
                            <HeartPulse size={20} /> <span className={open ? "block" : "hidden"}><Link to='/dashboard/all-donation-req'>All Blood Donation Requests</Link></span>
                        </li>
                    </>}

                    {role === 'volunteer' &&
                        <li className="flex items-center gap-4 hover:bg-red-500 p-2 rounded-lg cursor-pointer">
                            <HeartPulse size={20} /> <span className={open ? "block" : "hidden"}><Link to='/dashboard/all-donation-req'>All Blood Donation Requests</Link></span>
                        </li>
                    }

                    <li className="flex items-center gap-4 hover:bg-red-500 p-2 rounded-lg cursor-pointer">
                        <Settings2 size={20} /> <span className={open ? "block" : "hidden"}>Settings</span>
                    </li>

                </ul>

                <div className="absolute bottom-8 w-full">
                    <div className="flex items-center gap-4 hover:bg-red-500 p-2 rounded-lg cursor-pointer">
                        <LogOut size={20} />
                        <button
                            onClick={handleLogOut}
                            className={`bg-red-600 text-white px-3 py-1 rounded ${open ? "block" : "hidden"}`}
                        >
                            Logout
                        </button>
                    </div>
                </div>

            </div>

            {/* Dashboard Content Area */}
            <div className="flex-1 p-8 bg-gray-100">
                <Outlet></Outlet>
            </div>

        </div >
    );
}
