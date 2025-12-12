import React, { useState } from 'react'
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { MdBlock } from "react-icons/md";

const AllUsersInfo = () => {
    const { user } = useAuth();
    const { status, setStatus } = useState()
    const axiosSecure = useAxios();
    const { data: allUsersInfo = [] } = useQuery({
        queryKey: ['myDonationRequest', user?.email],
        queryFn: async () => {
            //http://localhost:3000/my-donation-req/
            const res = await axiosSecure.get(`/all-users`);
            return res.data;
        }
    })
    const handleBlock = () => {

    }
    return (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
            <h2>All users:{allUsersInfo.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th> User avatar</th>
                            <th>User email</th>
                            <th> User name</th>
                            <th>User role</th>
                            <th>status</th>
                            <th> button</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            allUsersInfo.map(user =>
                                <tr>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={user.photoURL}
                                                        alt={user.displayName} />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{user.email}</td>
                                    <td>{user.displayName}</td>
                                    <td>{user.role}</td>
                                    <td className=' text-green-600 font-bold '>{user.status}</td>
                                    <th>
                                        <button onClick={handleBlock} className="btn btn-ghost text-white btn-sm bg-red-600">
                                            <MdBlock />
                                        </button>
                                    </th>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AllUsersInfo