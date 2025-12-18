import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { useNavigate } from "react-router";
// import swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import { FaEye, FaUserCheck } from 'react-icons/fa';
import { FaTrashCan } from 'react-icons/fa6';
import { RiEditBoxLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";


const DonorDashboard = () => {
    const { user } = useAuth();
    console.log(user)
    const navigate = useNavigate();
    const axiosSecure = useAxios();
    const { refetch, data: donationRequest = [] } = useQuery({
        queryKey: ['myDonationRequest', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-donation-requests?email=${user.email}`);
            return res.data.slice(0, 3);
        }
    })

    const { data: donorInfo = [] } = useQuery({
        queryKey: ['donorInfo'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donor-collections`);
            return res.data;
        }
    })
    const req = donationRequest.map(r => r._id)
    console.log(req)
    const DonorInfo = donorInfo.filter(i => i._id === donationRequest._id)
    console.log(DonorInfo)




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
        <div>
            <h1 className="text-3xl font-semibold">Welcome {user.displayName} !</h1>
            <h2 className='m-5'>Your recent request:{donationRequest.length}</h2>
            {donationRequest.length > 0 && <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
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
                                                <div className="dropdown dropdown-end">
                                                    <div tabIndex={0} role="button" className="btn btn-ghost rounded-field"><BsThreeDotsVertical /></div>
                                                    <ul
                                                        tabIndex="-1"
                                                        className="menu dropdown-content bg-red-600 rounded-box z-1 mt-5 w-52 p-5 shadow-sm">
                                                        <button className="border mt-10 border-red-600  px-6 py-3 rounded-md font-semibold" onClick={() => document.getElementById('my_modal_1').showModal()}>donor Info</button>
                                                        <dialog id="my_modal_1" className="modal">
                                                            <div className="modal-box">
                                                                <p>marufa</p>
                                                            </div>
                                                        </dialog>
                                                        <button className='btn btn-sm '>done</button>
                                                        <button className='btn btn-sm '>cancel</button>
                                                    </ul>
                                                </div>

                                            </>
                                        }
                                        <td>
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

                                    </th>
                                </tr>)
                        }

                    </tbody>
                </table>
            </div>}
            <Link to="/dashboard/my-dontaion-req" className='btn bg-blue-300 m-10'>view my all request</Link>
        </div >
    )
}

export default DonorDashboard