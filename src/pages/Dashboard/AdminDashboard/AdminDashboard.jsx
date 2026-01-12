import { Users, HandHeart, Droplets } from "lucide-react";
import useRole from "../../../hooks/useRole";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
const colors = ['#D32F2F', '#FF5252', '#FF8A80', '#B71C1C', '#FFCDD2']; // shades of red


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
    const bloodData = donationRequest.reduce((acc, curr) => {
        const found = acc.find(item => item.name === curr.bloodGroup);
        if (found) {
            found.value += 1;
        } else {
            acc.push({ name: curr.bloodGroup, value: 1 });
        }
        return acc;
    }, []);
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
            {/* pie charts */}
            <div className="bg-white p-5 rounded-xl shadow">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Blood Group Requests</h2>

                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={bloodData}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={120}
                            label
                        >
                            {bloodData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>


        </div>
    );
}
