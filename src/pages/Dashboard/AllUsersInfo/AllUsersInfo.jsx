import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { MdBlock } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa";
import { FaUserAltSlash } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import Notiflix from "notiflix";
import { useState } from 'react';


const AllUsersInfo = () => {
    const { user } = useAuth();
    const axiosSecure = useAxios();
    const { refetch, data: allUsersInfo = [] } = useQuery({
        queryKey: ['myDonationRequest', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-users`);
            return res.data;
        }
    })
    const [filterUser, setfilterUser] = useState(allUsersInfo)
    const handleBlock = (user) => {
        const statusInfo = { status: 'blocked' };

        axiosSecure.patch(`/all-users/${user._id}/status`, statusInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Notiflix.Notify.success(`${user.name} has been marked as blocked`);
                }
            })
            .catch(error => {
                Notiflix.Notify.failure("Something went wrong while blocking the user!", error);
            });
    }


    const handleRemoveBlock = (user) => {
        const statusInfo = { status: 'active' };

        axiosSecure.patch(`/all-users/${user._id}/status`, statusInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Notiflix.Notify.success(`${user.name} has been marked as active`);
                }
            })
            .catch(error => {
                Notiflix.Notify.failure("Something went wrong while activating the user!", error);
            });
    }



    const handleMakeVolunter = (user) => {
        const roleInfo = { role: 'volunteer' };

        axiosSecure.patch(`/all-users/${user._id}/role`, roleInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Notiflix.Notify.success(`${user.name} has been marked as Volunteer`);
                }
            })
            .catch(error => {
                Notiflix.Notify.failure("Something went wrong!", error);
            });
    }

    //handleMakeAdmin
    const handleMakeAdmin = (user) => {
        const roleInfo = { role: 'admin' };

        axiosSecure.patch(`/all-users/${user._id}/role`, roleInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Notiflix.Notify.success(`${user.name} has been marked as Admin`);
                }
            })
            .catch(error => {
                Notiflix.Notify.failure("Something went wrong!", error);
            });
    }
    const handleFilteringActive = () => {
        const filterActive = allUsersInfo.filter(f => f.status === 'active')
        setfilterUser(filterActive);
    }
    const handleFilteringBlocked = () => {
        const blockedUsers = allUsersInfo.filter(user => user.status === 'blocked');
        setfilterUser(blockedUsers);
    }
    const handleAllUser = () => {
        setfilterUser(allUsersInfo)
    }
    return (
        <>
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost rounded-field bg-red-600 my-5 text-white" >Filter</div>
                <ul
                    tabIndex="-1"
                    className="menu dropdown-content bg-base-200 rounded-box z-1 mt-4 w-52 p-2 shadow-sm">
                    <li><button onClick={handleFilteringActive} className='mb-2'>Acitve</button></li>
                    <li><button onClick={handleFilteringBlocked} className='mb-2'>Blocked</button></li>
                    <li><button onClick={handleAllUser} className='mb-2'>All</button></li>
                </ul>
            </div>

            {filterUser.length === 0 ? (
                <div className="overflow-x-auto rounded-xl border border-[#D32F2F]/20 bg-white shadow-lg">
                    <table className="table w-full">
                        <thead className="bg-[#D32F2F] text-white">
                            <tr>
                                <th className="rounded-tl-xl">User Avatar</th>
                                <th>User Email</th>
                                <th>User Name</th>
                                <th>User Role</th>
                                <th>Status</th>
                                <th>Action</th>
                                <th className="rounded-tr-xl">Others</th>
                            </tr>
                        </thead>

                        <tbody>
                            {allUsersInfo.map(user => (
                                <tr key={user._id} className="hover:bg-[#FFF1F1] transition">
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img src={user.photoURL} alt={user.displayName} />
                                            </div>
                                        </div>
                                    </td>

                                    <td className="text-gray-700">{user.email}</td>
                                    <td className="font-semibold">{user.displayName}</td>

                                    <td>
                                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${user.role === 'volunteer'
                                                ? 'bg-green-100 text-green-600'
                                                : 'bg-gray-200 text-gray-800'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>

                                    <td>
                                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${user.status === 'blocked'
                                                ? 'bg-red-100 text-red-600'
                                                : 'bg-green-100 text-green-600'
                                            }`}>
                                            {user.status}
                                        </span>
                                    </td>

                                    <td>
                                        {user.status === 'active' ? (
                                            <button onClick={() => handleBlock(user)} className="btn btn-sm bg-red-600 text-white">
                                                <FaUserAltSlash />
                                            </button>
                                        ) : (
                                            <button onClick={() => handleRemoveBlock(user)} className="btn btn-sm bg-green-600 text-white">
                                                <FaUserCheck />
                                            </button>
                                        )}
                                    </td>

                                    <td>
                                        <div className="dropdown dropdown-end">
                                            <div tabIndex={0} role="button" className="btn btn-sm btn-ghost">
                                                <BsThreeDotsVertical />
                                            </div>
                                            <ul className="menu dropdown-content bg-white rounded-xl w-52 p-4 shadow-xl border border-[#D32F2F]/20">
                                                <button onClick={() => handleMakeVolunter(user)} className="btn btn-sm mb-2 bg-[#D32F2F] text-white">
                                                    Make Volunteer
                                                </button>
                                                <button onClick={() => handleMakeAdmin(user)} className="btn btn-sm bg-gray-800 text-white">
                                                    Make Admin
                                                </button>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-[#D32F2F]/20 bg-white shadow-lg">
                    <table className="table w-full">
                        <thead className="bg-[#D32F2F] text-white">
                            <tr>
                                <th className="rounded-tl-xl">User Avatar</th>
                                <th>User Email</th>
                                <th>User Name</th>
                                <th>User Role</th>
                                <th>Status</th>
                                <th>Action</th>
                                <th className="rounded-tr-xl">Others</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filterUser.map(user => (
                                <tr key={user._id} className="hover:bg-[#FFF1F1] transition">
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img src={user.photoURL} alt={user.displayName} />
                                            </div>
                                        </div>
                                    </td>

                                    <td className="text-gray-700">{user.email}</td>
                                    <td className="font-semibold">{user.displayName}</td>

                                    <td>
                                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${user.role === 'volunteer'
                                                ? 'bg-green-100 text-green-600'
                                                : 'bg-gray-200 text-gray-800'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>

                                    <td>
                                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${user.status === 'blocked'
                                                ? 'bg-red-100 text-red-600'
                                                : 'bg-green-100 text-green-600'
                                            }`}>
                                            {user.status}
                                        </span>
                                    </td>

                                    <td>
                                        {user.status === 'active' ? (
                                            <button onClick={() => handleBlock(user)} className="btn btn-sm bg-red-600 text-white">
                                                <FaUserAltSlash />
                                            </button>
                                        ) : (
                                            <button onClick={() => handleRemoveBlock(user)} className="btn btn-sm bg-green-600 text-white">
                                                <FaUserCheck />
                                            </button>
                                        )}
                                    </td>

                                    <td>
                                        <div className="dropdown dropdown-end">
                                            <div tabIndex={0} role="button" className="btn btn-sm btn-ghost">
                                                <BsThreeDotsVertical />
                                            </div>
                                            <ul className="menu dropdown-content bg-white rounded-xl w-52 p-4 shadow-xl border border-[#D32F2F]/20">
                                                <button onClick={() => handleMakeVolunter(user)} className="btn btn-sm mb-2 bg-[#D32F2F] text-white">
                                                    Make Volunteer
                                                </button>
                                                <button onClick={() => handleMakeAdmin(user)} className="btn btn-sm bg-gray-800 text-white">
                                                    Make Admin
                                                </button>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

        </>
    )
}

export default AllUsersInfo