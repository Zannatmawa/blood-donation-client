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

            {filterUser.length === 0 ?
                <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
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
                                    <th> others</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {
                                    allUsersInfo.map(user =>
                                        <tr key={user._id}>
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
                                            <td className={`${user.role === 'volunteer' ? "text-green-600 font-bold " : " text-black font-bold "}`}>{user.role}</td>
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
                                            <td>
                                                <div className="dropdown dropdown-end">
                                                    <div tabIndex={0} role="button" className="btn btn-ghost rounded-field"><BsThreeDotsVertical /></div>
                                                    <ul
                                                        tabIndex="-1"
                                                        className="menu dropdown-content bg-red-600 rounded-box z-1 mt-5 w-52 p-5 shadow-sm">
                                                        <button onClick={() => handleMakeVolunter(user)} className='btn btn-sm mb-3'>Make Volunteer</button>
                                                        <button onClick={() => handleMakeAdmin(user)} className='btn btn-sm'>Make Admin</button>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }

                            </tbody>
                        </table>
                    </div>
                </div > :
                <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
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
                                    <th> others</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {
                                    filterUser.map(user =>
                                        <tr key={user._id}>
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
                                            <td className={`${user.role === 'volunteer' ? "text-green-600 font-bold " : " text-black font-bold "}`}>{user.role}</td>
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
                                            <td>
                                                <div className="dropdown dropdown-end">
                                                    <div tabIndex={0} role="button" className="btn btn-ghost rounded-field"><BsThreeDotsVertical /></div>
                                                    <ul
                                                        tabIndex="-1"
                                                        className="menu dropdown-content bg-red-600 rounded-box z-1 mt-5 w-52 p-5 shadow-sm">
                                                        <button onClick={() => handleMakeVolunter(user)} className='btn btn-sm mb-3'>Make Volunteer</button>
                                                        <button onClick={() => handleMakeAdmin(user)} className='btn btn-sm'>Make Admin</button>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }

                            </tbody>
                        </table>
                    </div>
                </div >}
        </>
    )
}

export default AllUsersInfo