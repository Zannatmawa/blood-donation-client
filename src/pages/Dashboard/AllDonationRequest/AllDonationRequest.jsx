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
import { useNavigate } from 'react-router';
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
                    Notiflix.Notify.success(`Rider status updated to "${status}"!`);
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
                                    {role === 'volunteer' ? <button onClick={() => handleInProgress(r)} className='btn'>
                                        inprogress
                                    </button> : <>
                                        <button onClick={() => handleInProgress(r)} className='btn'>
                                            inprogress
                                        </button>
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
                                        <button className='btn btn-sm '>
                                            <FaEye />
                                        </button>
                                    </>}

                                </th>
                            </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AllDonationRequest

