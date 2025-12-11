import { useState } from "react";
import {
    Home,
    User,
    HeartPulse,
    ClipboardList,
    Settings,
    LogOut,
    Menu
} from "lucide-react";
import { Link } from "react-router";
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";
import useAuth from "../hooks/useAuth";

export default function Sidebar() {
    const [open, setOpen] = useState(true);
    const { user } = useAuth();

    return (
        <div className="flex">

            {/* Sidebar */}
            <div className={`${open ? "w-64" : "w-20"} bg-red-600 min-h-screen p-5 pt-8 transition-all duration-300 text-white relative`}>

                {/* Toggle Button */}
                <button
                    onClick={() => setOpen(!open)}
                    className="absolute -right-3 top-9 bg-white text-red-600 rounded-full p-1 shadow-md"
                >
                    <Menu size={20} />
                </button>

                {/* Brand */}
                <h1 className={`${open ? "text-2xl" : "text-xl"} font-bold text-white mb-10`}>
                    {open ? <Link to="/">Blood Bridge</Link> : "BB"}
                </h1>

                {/* Menu List */}
                <ul className="space-y-4 text-sm">

                    <li className="flex items-center gap-4 hover:bg-red-500 p-2 rounded-lg cursor-pointer">
                        <Home size={20} /> <span className={open ? "block" : "hidden"}>Dashboard</span>
                    </li>

                    <li className="flex items-center gap-4 hover:bg-red-500 p-2 rounded-lg cursor-pointer">
                        <User size={20} /> <span className={open ? "block" : "hidden"}><Link to='/dashboard/my-profile'>My Profile</Link></span>
                    </li>

                    <li className="flex items-center gap-4 hover:bg-red-500 p-2 rounded-lg cursor-pointer">
                        <HeartPulse size={20} />
                        <span className={open ? "block" : "hidden"}>Blood Requests</span>
                    </li>

                    <li className="flex items-center gap-4 hover:bg-red-500 p-2 rounded-lg cursor-pointer">
                        <ClipboardList size={20} />
                        <span className={open ? "block" : "hidden"}>Donation History</span>
                    </li>

                    <li className="flex items-center gap-4 hover:bg-red-500 p-2 rounded-lg cursor-pointer">
                        <Settings size={20} />
                        <span className={open ? "block" : "hidden"}>Settings</span>
                    </li>

                </ul>

                {/* Logout */}
                <div className="absolute bottom-8 w-full">
                    <div className="flex items-center gap-4 hover:bg-red-500 p-2 rounded-lg cursor-pointer">
                        <LogOut size={20} />
                        <span className={open ? "block" : "hidden"}>Logout</span>
                    </div>
                </div>

            </div>

            {/* Dashboard Content Area */}
            <div className="flex-1 p-8 bg-gray-100">
                <h1 className="text-3xl font-semibold">Welcome {user.displayName} !</h1>
                <MyProfile />
            </div>

        </div>
    );
}
