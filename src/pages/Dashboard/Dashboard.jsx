import React from 'react'
import useAuth from '../../hooks/useAuth'
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { useNavigate } from "react-router";

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxios();
    const { data: donationRequest = [] } = useQuery({
        queryKey: ['myDonationRequest', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-donation-requests?email=${user.email}`);
            return res.data.slice(0, 3);
        }
    })
    return (
        <div>
            <h1 className="text-3xl font-semibold">Welcome {user.displayName} !</h1>
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
                                    <th className={`${r.status === 'inprogress' ? 'text-yellow-500' : 'text-red-600'}`}>{r.status}</th>
                                    <th>

                                        <button
                                            onClick={() => navigate(`/dashboard/edit-donation-request/${r._id}`)}
                                            className="btn btn-sm"
                                        >
                                            Edit
                                        </button>
                                        {
                                            r.status === 'inprogress' ? <>
                                                <button className='btn btn-sm '>done</button>
                                                <button className='btn btn-sm '>cancel</button>
                                            </> : <button className='btn btn-sm '>view</button>
                                        }
                                    </th>
                                </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div >
    )
}

export default Dashboard