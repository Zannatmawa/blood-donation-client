import React from 'react'
import useAuth from '../../../hooks/useAuth'
import useAxios from '../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router';
import { FaEye, FaUserCheck } from 'react-icons/fa';
import { FaTrashCan } from 'react-icons/fa6';
import { RiEditBoxLine } from "react-icons/ri";
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
                                    {
                                        r.status === 'inprogress' && <>
                                            <button className='btn btn-sm '>done</button>
                                            <button className='btn btn-sm '>cancel</button>
                                        </>
                                    }
                                    <button
                                        onClick={() => navigate(`/dashboard/edit-donation-request/${r._id}`)}
                                        className="btn btn-sm"
                                    >
                                        <RiEditBoxLine />
                                    </button>
                                    <button
                                        onClick={() => deleteDonationReq(r._id)}
                                        className="btn btn-sm"
                                    >
                                        <FaTrashCan />
                                    </button>
                                    <Link to={`/dashboard/view-donation-req/${r._id}`} className='btn btn-sm '><FaEye /></Link>


                                </th>
                            </tr>)
                    }

                </tbody>
            </table>
        </div>
    )
}

export default MyDontationRequest