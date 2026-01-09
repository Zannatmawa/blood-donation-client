import { Users, HandHeart, Droplets } from "lucide-react";
import useRole from "../../../hooks/useRole";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

export default function AdminDashboardHome() {
    const { role } = useRole();
    const { user } = useAuth();
    const axiosSecure = useAxios();
    const { data: allUsersInfo = [] } = useQuery({
        queryKey: ['myDonationRequest', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-users`);
            return res.data;
        }
    })
    const { data: donationRequest = [] } = useQuery({
        queryKey: ['allDonationRequest', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-blood-donation-request`);
            return res.data;
        }
    })
    return (
        <div className="p-6 md:p-10 bg-gray-100 min-h-screen">

            {/* Welcome Section */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-10 border-l-4 border-red-600">
                <h1 className="text-3xl font-bold text-gray-800">
                    Welcome Back, {role} 👋
                </h1>
                <p className="text-gray-600 mt-2">
                    Here’s an overview of Blood Bridge platform activity.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Total Donors */}
                <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-6 hover:shadow-lg transition">
                    <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
                        <Users className="text-red-600" size={28} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-800">{allUsersInfo.length}</h3>
                        <p className="text-gray-600">Total Donors</p>
                    </div>
                </div>

                {/* Total Blood Donations */}
                <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-6 hover:shadow-lg transition">
                    <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
                        <Droplets className="text-red-600" size={28} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-800">{donationRequest.length}</h3>
                        <p className="text-gray-600">Blood Donations</p>
                    </div>
                </div>

                {/* Total Funding */}
                <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-6 hover:shadow-lg transition">
                    <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
                        <HandHeart className="text-red-600" size={28} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-800">৳ 52,000</h3>
                        <p className="text-gray-600">Total Funding</p>
                    </div>
                </div>

            </div>

        </div>
    );
}
