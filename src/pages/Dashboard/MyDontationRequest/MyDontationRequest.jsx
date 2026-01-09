import React from 'react'
import useAuth from '../../../hooks/useAuth'
import useAxios from '../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router';
import { FaEye, FaUserCheck } from 'react-icons/fa';
import { FaTrashCan } from 'react-icons/fa6';
import { RiEditBoxLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";


const MyDontationRequest = () => {
    const { user } = useAuth();
    const axiosSecure = useAxios();
    const navigate = useNavigate();

    const { refetch, data: donationRequest = [] } = useQuery({
        queryKey: ['myDonationRequest', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-donation-requests?email=${user.email}`);
            return res.data;
        }
    })
    const deleteDonationReq = (id) => {
        axiosSecure.delete(`/my-donation-requests/${id}`,)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    alert('deleted')
                    // swal.fire("Deleted!", "Donation request removed", "success");
                    refetch(); // or navigate
                }
            });
    }
    return (
        <>
            <h2 className='text-3xl font-bold mb-5'>My Donation Request</h2>

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
                            <tr
                                key={r._id}
                                className="hover:bg-[#FFF1F1] transition"
                            >
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
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold
                            ${r.status === 'inprogress'
                                                ? 'bg-yellow-100 text-yellow-600'
                                                : 'bg-red-100 text-red-600'
                                            }`}
                                    >
                                        {r.status}
                                    </span>
                                </td>

                                <td className="flex flex-wrap gap-2">
                                    {r.status === 'inprogress' && (
                                        <div className="dropdown dropdown-end">
                                            <div tabIndex={0} role="button" className="btn btn-sm btn-ghost">
                                                <BsThreeDotsVertical />
                                            </div>
                                            <ul
                                                tabIndex="-1"
                                                className="menu dropdown-content bg-white rounded-xl w-52 p-4 shadow-xl border border-[#D32F2F]/20"
                                            >
                                                <button
                                                    className="w-full mb-2 bg-[#D32F2F] text-white py-2 rounded-md font-semibold"
                                                    onClick={() => document.getElementById('my_modal_1').showModal()}
                                                >
                                                    Donor Info
                                                </button>

                                                <dialog id="my_modal_1" className="modal">
                                                    <div className="modal-box">
                                                        <p>marufa</p>
                                                    </div>
                                                </dialog>

                                                <button className="btn btn-sm mb-2 bg-green-500 text-white">
                                                    Done
                                                </button>

                                                <button className="btn btn-sm bg-red-500 text-white">
                                                    Cancel
                                                </button>
                                            </ul>
                                        </div>
                                    )}

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
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="join mt-5">
                <input
                    className="join-item btn btn-square"
                    type="radio"
                    name="options"
                    aria-label="1"
                    checked="checked" />
                <input className="join-item btn btn-square" type="radio" name="options" aria-label="2" />
                <input className="join-item btn btn-square" type="radio" name="options" aria-label="3" />
                <input className="join-item btn btn-square" type="radio" name="options" aria-label="4" />
            </div>
        </>
    )
}

export default MyDontationRequest