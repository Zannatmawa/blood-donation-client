import React from 'react'
import useAuth from '../../../hooks/useAuth'
import useAxios from '../../../hooks/useAxios';
import { FaEye, FaUserCheck } from 'react-icons/fa';
// import { IoPersonRemoveSharp } from 'react-icons/io5';
import { FaTrashCan } from 'react-icons/fa6';
import { RiEditBoxLine } from "react-icons/ri";
import { RiProgress1Line } from "react-icons/ri";


import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query'
import { Link } from 'lucide-react';

const AllDonationRequest = () => {
    const { user } = useAuth();
    const axiosSecure = useAxios();
    const { refetch, data: donationRequest = [] } = useQuery({
        queryKey: ['allDonationRequest', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-blood-donation-request`);
            return res.data;
        }
    })
    const handleUpdateStatus = (donation, status) => {
        const updateInfo = { status: status }
        console.log(status)
        axiosSecure.patch(`/all-blood-donation-request/${donation._id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: "success",
                        title: `Rider has been approved ${status}!`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }
    const handleInProgress = (donation) => {
        handleUpdateStatus(donation, 'inprogress')
    }
    return (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
            <h2>All reqy:{donationRequest.length}</h2>
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th> Recipient name</th>
                        <th>Location</th>
                        <th>Blood group</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>View button</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {
                        donationRequest.map(r =>
                            <tr key={r._id}>
                                <th>{r.recipientName}</th>
                                <th>{r.fullAddress}</th>
                                <th>{r.bloodGroup}</th>
                                <th>{r.donationDate}</th>
                                <th>{r.donationTime}</th>
                                <th className={`${r.status === 'inprogress' ? ' text-yellow-500' : 'text-red-600'}`}>{r.status}</th>
                                <th className='text-red-600'>
                                    <button onClick={() => handleInProgress(r)} className='btn'>
                                        <RiEditBoxLine />
                                    </button>
                                    <button className='btn'>
                                        <FaTrashCan />
                                    </button>
                                    <button className='btn'>
                                        <FaEye />
                                    </button>
                                </th>
                            </tr>)
                    }

                </tbody>

            </table>
        </div>
    )
}

export default AllDonationRequest

