import React from 'react'
import useAuth from '../../../hooks/useAuth'
import useAxios from '../../../hooks/useAxios';
import { FaEye, FaUserCheck } from 'react-icons/fa';
// import { IoPersonRemoveSharp } from 'react-icons/io5';
import { FaTrashCan } from 'react-icons/fa6';
import { RiEditBoxLine } from "react-icons/ri";

import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query'
import { Link } from 'lucide-react';

const AllDonationRequest = () => {
    const { user } = useAuth();
    const axiosSecure = useAxios();
    const { data: donationRequest = [] } = useQuery({
        queryKey: ['allDonationRequest', user?.email],
        queryFn: async () => {
            //http://localhost:3000/my-donation-req/
            const res = await axiosSecure.get(`/my-donation-requests`);
            return res.data;
        }
    })
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
                                <th className='text-red-600'>{r.status}</th>

                                {/* <button onClick={() => handleReject(rider)} className='btn'>
                                    <RiEditBoxLine />
                                </button> */}
                                {/* <Link to={"/edit-blood-donation-req"} className='btn'>
                                    <RiEditBoxLine />
                                </Link> */}
                                <button className='btn'>
                                    <FaEye />
                                </button>
                                <button onClick={() => handleApproval(rider)} className='btn'>
                                    <FaUserCheck />
                                </button>
                                {/* <button onClick={() => handleReject(rider)} className='btn'>
                                    <IoPersonRemoveSharp />
                                </button> */}
                                <button className='btn'>
                                    <FaTrashCan />
                                </button>
                            </tr>)
                    }

                </tbody>
            </table>
        </div>
    )
}

export default AllDonationRequest

