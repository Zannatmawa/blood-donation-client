import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import useAuth from '../../../hooks/useAuth'
import Notiflix from "notiflix";
import { Link, useLoaderData } from 'react-router';
import useAxios from '../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

const CreateDonationRequest = () => {
    const { user } = useAuth();
    const { register, handleSubmit } = useForm();
    const axiosSecure = useAxios();
    const { data: allUsers = [] } = useQuery({
        queryKey: ['userProfile', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-users')
            return res.data
        },
        enabled: !!user?.email
    })
    const filteringBlockedUser = allUsers.filter(f => f.status === 'blocked')


    const allDistricts = useLoaderData();
    const districts = allDistricts[0].data;

    const [districtId, setDistrictId] = useState("");
    const [upazillas, setUpazillas] = useState([]);

    useEffect(() => {
        fetch('/upazilla.json')
            .then(res => res.json())
            .then(data => {
                setUpazillas(data[0].data)
            });
    }, []);
    const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];


    const handleDonationReq = (data) => {
        if (filteringBlockedUser) {
            Notiflix.Notify.failure("You are blocked!");
        } else {
            axiosSecure.post('/my-donation-requests', data)
                .then(res => {
                    Notiflix.Notify.success("Donation request sent successfully!");
                    console.log(res.data);
                })
                .catch(error => {
                    Notiflix.Notify.failure("Something went wrong!");
                    console.log(error);
                });
            console.log(data);
        }
    };


    return (
        <div className="bg-white shadow-xl rounded-2xl p-8 max-w-5xl mx-auto my-10 border border-red-200">
            <h2 className='text-3xl font-bold text-red-600 mb-6'>Create Donation Request</h2>

            <form onSubmit={handleSubmit(handleDonationReq)} className='space-y-8'>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                    <fieldset className="flex flex-col">
                        <label className="label text-gray-700 font-semibold mb-2">Requester Name</label>
                        <input
                            type="text"
                            defaultValue={user?.displayName}
                            readOnly
                            className="input w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                            {...register("requesterName")}
                        />
                    </fieldset>

                    <fieldset className="flex flex-col">
                        <label className="label text-gray-700 font-semibold mb-2">Requester Email</label>
                        <input
                            type="email"
                            defaultValue={user?.email}
                            readOnly
                            className="input w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                            {...register("requesterEmail")}
                        />
                    </fieldset>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                    <fieldset className="flex flex-col">
                        <label className="label text-gray-700 font-semibold mb-2">Recipient Name</label>
                        <input
                            type="text"
                            className="input w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                            placeholder="Recipient Name"
                            {...register("recipientName")}
                        />
                    </fieldset>

                    <fieldset className="flex flex-col">
                        <label className="label text-gray-700 font-semibold mb-2">Recipient District</label>
                        <select
                            className="select w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                            {...register("recipientDistrict")}
                            onChange={(e) => setDistrictId(e.target.value)}
                        >
                            <option value="">Pick a District</option>
                            {districts.map(d => (
                                <option key={d.id} value={d.id}>{d.name}</option>
                            ))}
                        </select>
                    </fieldset>
                </div>

                <fieldset className="flex flex-col">
                    <label className="label text-gray-700 font-semibold mb-2">Recipient Upazilla</label>
                    <select
                        className="select w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                        {...register("recipientUpazilla")}
                    >
                        <option value="">Pick an Upazilla</option>
                        {upazillas
                            .filter(u => u.district_id == districtId)
                            .map(u => (
                                <option key={u.id} value={u.name}>{u.name}</option>
                            ))}
                    </select>
                </fieldset>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                    <fieldset className="flex flex-col">
                        <label className="label text-gray-700 font-semibold mb-2">Hospital Name</label>
                        <input
                            type="text"
                            className="input w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                            placeholder="Dhaka Medical College Hospital"
                            {...register("hospitalName")}
                        />
                    </fieldset>

                    <fieldset className="flex flex-col">
                        <label className="label text-gray-700 font-semibold mb-2">Full Address</label>
                        <input
                            type="text"
                            className="input w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                            placeholder="Zahir Raihan Rd, Dhaka"
                            {...register("fullAddress")}
                        />
                    </fieldset>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                    <fieldset className="flex flex-col">
                        <label className="label text-gray-700 font-semibold mb-2">Blood Group</label>
                        <select className="select w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none" {...register("bloodGroup")}>
                            <option value="">Select Blood Group</option>
                            {bloodGroups.map(bg => (
                                <option key={bg} value={bg}>{bg}</option>
                            ))}
                        </select>
                    </fieldset>

                    <fieldset className="flex flex-col">
                        <label className="label text-gray-700 font-semibold mb-2">Donation Date</label>
                        <input
                            type="date"
                            className="input w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                            {...register("donationDate")}
                        />
                    </fieldset>
                </div>

                <fieldset className="flex flex-col">
                    <label className="label text-gray-700 font-semibold mb-2">Donation Time</label>
                    <input
                        type="time"
                        className="input w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                        {...register("donationTime")}
                    />
                </fieldset>

                <fieldset className="flex flex-col">
                    <label className="label text-gray-700 font-semibold mb-2">Request Message</label>
                    <textarea
                        className="textarea w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                        rows="4"
                        placeholder="Explain why you need blood..."
                        {...register("requestMessage")}
                    ></textarea>
                </fieldset>

                <button type='submit' className='btn w-full bg-red-600 hover:bg-red-700 text-white font-semibold mt-6 py-3 rounded-lg transition'>
                    Request
                </button>

            </form>
        </div>

    )
}

export default CreateDonationRequest

