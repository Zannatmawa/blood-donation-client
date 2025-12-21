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

            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">

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
                                    <td>
                                        {
                                            r.status === 'inprogress' && <>
                                                <div className="dropdown dropdown-end">
                                                    <div tabIndex={0} role="button" className="btn btn-ghost rounded-field"><BsThreeDotsVertical /></div>
                                                    <ul
                                                        tabIndex="-1"
                                                        className="menu dropdown-content bg-base-200 rounded-box z-1 mt-5 w-52 p-5 shadow-sm">
                                                        <button className="border mt-10 border-red-600  px-6 py-3 rounded-md font-semibold" onClick={() => document.getElementById('my_modal_1').showModal()}>donor Info</button>
                                                        <dialog id="my_modal_1" className="modal">
                                                            <div className="modal-box">
                                                                <p>marufa</p>
                                                            </div>
                                                        </dialog>
                                                        <button className='btn btn-sm  mb-2 mt-2'>done</button>
                                                        <button className='btn btn-sm mb-2 '>cancel</button>
                                                    </ul>
                                                </div>

                                            </>
                                        }
                                        <button
                                            onClick={() => navigate(`/dashboard/edit-donation-request/${r._id}`)}
                                            className="btn btn-sm mr-2"
                                        >
                                            <RiEditBoxLine />
                                        </button>
                                        <button
                                            onClick={() => deleteDonationReq(r._id)}
                                            className="btn btn-sm mr-2"
                                        >
                                            <FaTrashCan />
                                        </button>
                                        <Link to={`/dashboard/view-donation-req/${r._id}`} className='btn btn-sm  mr-2'><FaEye /></Link>
                                    </td>
                                </tr>)
                        }

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