import React, { useState } from 'react'
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { MdBlock } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa";
import { FaUserAltSlash } from "react-icons/fa";

import Swal from 'sweetalert2';

const AllUsersInfo = () => {
    const { user } = useAuth();
    const { searchUser, setSearchUser } = useState('')
    const axiosSecure = useAxios();
    const { refetch, data: allUsersInfo = [] } = useQuery({
        queryKey: ['myDonationRequest', user?.email],
        queryFn: async () => {
            //http://localhost:3000/my-donation-req/
            const res = await axiosSecure.get(`/all-users`);
            return res.data;
        }
    })
    const handleBlock = (user) => {
        const statusInfo = { status: 'blocked' }
        axiosSecure.patch(`/all-users/${user._id}/role`, statusInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: "success",
                        title: `donor marked as blocked`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }
    const handleRemoveBlock = (user) => {
        const statusInfo = { status: 'active' }
        axiosSecure.patch(`/all-users/${user._id}/role`, statusInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: "success",
                        title: `donor marked as active`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }
    return (
        <>
            <p>search:{searchUser}</p>
            <label className="input">
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
                <input onChange={(e) => setSearchUser(e.target.value)} type="search" className="grow" placeholder="Search user" />
            </label>
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
                                        <td className={`${user.status === 'blocked' ? "text-red-600 font-bold " : " text-green-600 font-bold "}`}>{user.status}</td>
                                        <th>
                                            {user.status === 'active' ?
                                                <button onClick={() => handleBlock(user)} className="btn btn-ghost text-white btn-sm bg-red-600">
                                                    <FaUserAltSlash />
                                                </button> :
                                                <button onClick={() => handleRemoveBlock(user)} className="btn btn-ghost text-white btn-sm bg-green-600">
                                                    <FaUserCheck />
                                                </button>
                                            }

                                        </th>
                                    </tr>
                                )
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default AllUsersInfo