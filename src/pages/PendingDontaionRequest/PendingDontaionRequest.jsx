import React from 'react'

// import { IoPersonRemoveSharp } from 'react-icons/io5';
import { FaEye, FaUserCheck } from 'react-icons/fa';
import { FaTrashCan } from 'react-icons/fa6';
import { RiEditBoxLine } from "react-icons/ri";
import { RiProgress1Line } from "react-icons/ri";


import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router';
import useAxios from '../../hooks/useAxios';
import useRole from '../../hooks/useRole';
import useTitle from '../../components/UseTitle';

const PendingDontaionRequest = () => {
    useTitle("Blood Dontaion request");
    const { role } = useRole();
    const axiosSecure = useAxios();
    const { data: donationRequest = [] } = useQuery({
        queryKey: ['allDonationRequest', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-blood-donation-request`);
            return res.data;
        }
    })
    const pendingReq = donationRequest.filter(req => req.status === 'pending')
    return (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
            <h2>All pending request:{donationRequest.length}</h2>
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
                        pendingReq.map(r =>
                            <tr key={r._id}>
                                <th>{r.recipientName}</th>
                                <th>{r.fullAddress}</th>
                                <th>{r.bloodGroup}</th>
                                <th>{r.donationDate}</th>
                                <th>{r.donationTime}</th>
                                <th className={`${r.status === 'inprogress' ? ' text-yellow-500' : 'text-red-600'}`}>{r.status}</th>
                                <th>
                                    <Link to={`/dashboard/view-donation-req/${r._id}`} className='btn btn-sm '><FaEye /></Link>
                                </th>

                            </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default PendingDontaionRequest



