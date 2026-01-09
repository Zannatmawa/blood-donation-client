import React, { useState } from 'react'

// import { IoPersonRemoveSharp } from 'react-icons/io5';
import { FaEye, FaUserCheck } from 'react-icons/fa';
import { FaTrashCan } from 'react-icons/fa6';
import { RiEditBoxLine } from "react-icons/ri";
import { RiProgress1Line } from "react-icons/ri";


import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router';
import useAxios from '../../hooks/useAxios';
// import useRole from '../../hooks/useRole';
import useTitle from '../../components/UseTitle';

const PendingDontaionRequest = () => {
    useTitle("Blood Dontaion request");
    // const { role } = useRole();
    const [search, setSearch] = useState('');
    const axiosSecure = useAxios();
    const { data: donationRequest = [] } = useQuery({
        queryKey: ['allDonationRequest', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-blood-donation-request`);
            return res.data;
        }
    })
    const pendingReq = donationRequest.filter(req => req.status === 'pending')

    const handleReqChange = event => {
        const searchText = event.target.value;
        if (searchText) {
            const matchedReq = pendingReq.filter(req => req.fullAddress.toLowerCase().includes(searchText.toLowerCase()) || req.bloodGroup.toLowerCase().includes(searchText.toLowerCase()) || req.recipientName.toLowerCase().includes(searchText.toLowerCase()));
            setSearch(matchedReq)
        } else {
            console.log(searchText);
        }
    }
    return (
        <>
            <h2 className='my-5  text-center text-3xl font-bold text-red-600'>Donation Requests</h2>
            <label className="input ml-10">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input onChange={handleReqChange} type="search" required placeholder="Search by address or blood group or name" />
            </label>
            {search === '' ?
                <div className="m-10 overflow-x-auto rounded-2xl border border-[#D32F2F]/20 bg-white shadow-lg">
                    <table className="table w-full min-w-[800px]">
                        <thead className="bg-[#D32F2F] text-white">
                            <tr>
                                <th className="py-3 px-4 rounded-tl-2xl">Recipient Name</th>
                                <th className="py-3 px-4">Location</th>
                                <th className="py-3 px-4">Blood Group</th>
                                <th className="py-3 px-4">Date</th>
                                <th className="py-3 px-4">Time</th>
                                <th className="py-3 px-4">Status</th>
                                <th className="py-3 px-4 rounded-tr-2xl">View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingReq.map((r) => (
                                <tr
                                    key={r._id}
                                    className="hover:bg-[#D32F2F]/10 transition-colors"
                                >
                                    <td className="py-3 px-4 font-medium">{r.recipientName}</td>
                                    <td className="py-3 px-4">{r.fullAddress}</td>
                                    <td className="py-3 px-4 font-semibold">{r.bloodGroup}</td>
                                    <td className="py-3 px-4">{r.donationDate}</td>
                                    <td className="py-3 px-4">{r.donationTime}</td>
                                    <td className="py-3 px-4">
                                        <span
                                            className={`px-2 py-1 rounded-full text-sm font-semibold ${r.status === "inprogress"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : r.status === "completed"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-600"
                                                }`}
                                        >
                                            {r.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <Link
                                            to={`/dashboard/view-donation-req/${r._id}`}
                                            className="btn btn-sm bg-[#D32F2F] border-none hover:bg-red-700 text-white"
                                        >
                                            <FaEye />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div> :
                <div className="m-10 overflow-x-auto rounded-2xl border border-[#D32F2F]/20 bg-white shadow-lg">
                    <table className="table w-full min-w-[800px]">
                        <thead className="bg-[#D32F2F] text-white">
                            <tr>
                                <th className="py-3 px-4 rounded-tl-2xl">Recipient Name</th>
                                <th className="py-3 px-4">Location</th>
                                <th className="py-3 px-4">Blood Group</th>
                                <th className="py-3 px-4">Date</th>
                                <th className="py-3 px-4">Time</th>
                                <th className="py-3 px-4">Status</th>
                                <th className="py-3 px-4 rounded-tr-2xl">View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {search.map((r) => (
                                <tr
                                    key={r._id}
                                    className="hover:bg-[#D32F2F]/10 transition-colors"
                                >
                                    <td className="py-3 px-4 font-medium">{r.recipientName}</td>
                                    <td className="py-3 px-4">{r.fullAddress}</td>
                                    <td className="py-3 px-4 font-semibold">{r.bloodGroup}</td>
                                    <td className="py-3 px-4">{r.donationDate}</td>
                                    <td className="py-3 px-4">{r.donationTime}</td>
                                    <td className="py-3 px-4">
                                        <span
                                            className={`px-2 py-1 rounded-full text-sm font-semibold ${r.status === "inprogress"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : r.status === "completed"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-600"
                                                }`}
                                        >
                                            {r.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <Link
                                            to={`/dashboard/view-donation-req/${r._id}`}
                                            className="btn btn-sm bg-[#D32F2F] border-none hover:bg-red-700 text-white"
                                        >
                                            <FaEye />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>}

            <div className="join mt-5 mb-5 flex justify-center gap-2">
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

export default PendingDontaionRequest



