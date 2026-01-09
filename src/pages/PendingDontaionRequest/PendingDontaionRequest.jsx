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
            <h2 className='my-5 underline text-center text-3xl font-bold text-red-600'>Donation Requests</h2>
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
                <div className="m-10  overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
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
                </div> :
                <div className="m-10  overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
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
                                search.map(r =>
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
                </div>}
        </>

    )
}

export default PendingDontaionRequest



