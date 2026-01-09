import React from 'react'
import Notiflix from "notiflix";
import useAxios from '../../../hooks/useAxios';
// import { IoPersonRemoveSharp } from 'react-icons/io5';
import { FaEye, FaUserCheck } from 'react-icons/fa';
import { FaTrashCan } from 'react-icons/fa6';
import { RiEditBoxLine } from "react-icons/ri";
import { RiProgress1Line } from "react-icons/ri";


import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router';
import useRole from '../../../hooks/useRole';

const AllDonationRequest = () => {
    // const { user } = useAuth();
    const { role } = useRole();
    const axiosSecure = useAxios();
    const navigate = useNavigate();
    const { refetch, data: donationRequest = [] } = useQuery({
        queryKey: ['allDonationRequest', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-blood-donation-request`);
            return res.data;
        }
    })

    const handleUpdateStatus = (donation, status) => {
        const updateInfo = { status: status };
        console.log(status);

        axiosSecure.patch(`/all-blood-donation-request/${donation._id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Notiflix.Notify.success(`Donar status updated to "${status}"!`);
                } else {
                    Notiflix.Notify.warning(`No changes made to the status.`);
                }
            })
            .catch(error => {
                Notiflix.Notify.failure("Failed to update the status!", error);
            });
    }

    const handleInProgress = (donation) => {
        handleUpdateStatus(donation, 'inprogress')
    }

    const deleteDonationReq = (id) => {
        axiosSecure.delete(`/my-donation-requests/${id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    Notiflix.Notify.success("Donation request deleted successfully!");
                    refetch();
                } else {
                    Notiflix.Notify.warning("No donation request was deleted!");
                }
            })
            .catch(error => {
                Notiflix.Notify.failure("Failed to delete donation request!", error);
            });
    }

    return (
        <>
            <h2 className='text-3xl font-bold mb-5'>All Donation Request</h2>
            <div className="overflow-x-auto rounded-xl border border-[#D32F2F]/20 bg-white shadow-lg">
                <table className="table w-full">
                    <thead className="bg-[#D32F2F] text-white">
                        <tr>
                            <th className="rounded-tl-xl">Recipient Name</th>
                            <th>Location</th>
                            <th>Blood Group</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
                            <th className="rounded-tr-xl">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {donationRequest.map(r => (
                            <tr key={r._id} className="hover:bg-[#FFF1F1] transition">
                                <td className="font-semibold text-gray-800">
                                    {r.recipientName}
                                </td>

                                <td className="text-gray-600">
                                    {r.fullAddress}
                                </td>

                                <td>
                                    <span className="px-3 py-1 rounded-full text-sm font-bold bg-[#D32F2F]/10 text-[#D32F2F]">
                                        {r.bloodGroup}
                                    </span>
                                </td>

                                <td className="text-gray-600">
                                    {r.donationDate}
                                </td>

                                <td className="text-gray-600">
                                    {r.donationTime}
                                </td>

                                <td>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${r.status === 'inprogress'
                                        ? 'bg-yellow-100 text-yellow-600'
                                        : 'bg-red-100 text-red-600'
                                        }`}>
                                        {r.status}
                                    </span>
                                </td>

                                <td className="flex flex-wrap gap-2">
                                    {role === 'volunteer' ? (
                                        <button
                                            onClick={() => handleInProgress(r)}
                                            className="btn btn-sm bg-[#D32F2F] text-white"
                                        >
                                            In Progress
                                        </button>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => handleInProgress(r)}
                                                className="btn btn-sm bg-[#D32F2F] text-white"
                                            >
                                                In Progress
                                            </button>

                                            <button
                                                onClick={() => navigate(`/dashboard/edit-donation-request/${r._id}`)}
                                                className="btn btn-sm bg-blue-500 text-white"
                                            >
                                                <RiEditBoxLine />
                                            </button>

                                            <button
                                                onClick={() => deleteDonationReq(r._id)}
                                                className="btn btn-sm bg-red-600 text-white"
                                            >
                                                <FaTrashCan />
                                            </button>

                                            <Link
                                                to={`/dashboard/view-donation-req/${r._id}`}
                                                className="btn btn-sm bg-gray-800 text-white"
                                            >
                                                <FaEye />
                                            </Link>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AllDonationRequest

