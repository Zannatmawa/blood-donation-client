import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import useAuth from '../../../hooks/useAuth'
import axios from 'axios';
import { Link, useLoaderData, useLocation, useNavigate } from 'react-router';
import useAxios from '../../../hooks/useAxios';

const EditBloodDonationRequest = () => {
    const { user } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosSecure = useAxios()
    // const location = useLocation();
    // const navigate = useNavigate();

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
        console.log(data)
        axiosSecure.post('/my-donation-requests', data)
            .then(res => console.log(res))
            .catch(error => console.log(error))
    }

    return (
        <div>
            <h2 className='text-5xl font-bold'>Create Donation Request</h2>

            <form onSubmit={handleSubmit(handleDonationReq)} className='mt-12 p-4'>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 my-8'>

                    <fieldset className="fieldset">
                        <label className="label">Requester Name</label>
                        <input
                            type="text"
                            defaultValue={user?.displayName}
                            readOnly
                            className="input w-full bg-gray-100"
                            {...register("requesterName")}
                        />
                    </fieldset>

                    <fieldset className="fieldset">
                        <label className="label">Requester Email</label>
                        <input
                            type="email"
                            defaultValue={user?.email}
                            readOnly
                            className="input w-full bg-gray-100"
                            {...register("requesterEmail")}
                        />
                    </fieldset>

                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 my-8'>

                    <fieldset className="fieldset">
                        <label className="label">Recipient Name</label>
                        <input
                            type="text"
                            className="input w-full"
                            placeholder="Recipient Name"
                            {...register("recipientName")}
                        />
                    </fieldset>

                    <fieldset className="fieldset">
                        <label className="label">Recipient District</label>
                        <select
                            className="select w-full"
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

                <fieldset className="fieldset">
                    <label className="label">Recipient Upazilla</label>
                    <select
                        className="select w-full"
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

                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 my-8'>

                    <fieldset className="fieldset">
                        <label className="label">Hospital Name</label>
                        <input
                            type="text"
                            className="input w-full"
                            placeholder="Dhaka Medical College Hospital"
                            {...register("hospitalName")}
                        />
                    </fieldset>

                    <fieldset className="fieldset">
                        <label className="label">Full Address</label>
                        <input
                            type="text"
                            className="input w-full"
                            placeholder="Zahir Raihan Rd, Dhaka"
                            {...register("fullAddress")}
                        />
                    </fieldset>

                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 my-8'>

                    <fieldset className="fieldset">
                        <label className="label">Blood Group</label>
                        <select className="select w-full" {...register("bloodGroup")}>
                            <option value="">Select Blood Group</option>
                            {bloodGroups.map(bg => (
                                <option key={bg} value={bg}>{bg}</option>
                            ))}
                        </select>
                    </fieldset>

                    <fieldset className="fieldset">
                        <label className="label">Donation Date</label>
                        <input
                            type="date"
                            className="input w-full"
                            {...register("donationDate")}
                        />
                    </fieldset>

                </div>

                <fieldset className="fieldset">
                    <label className="label">Donation Time</label>
                    <input
                        type="time"
                        className="input w-full"
                        {...register("donationTime")}
                    />
                </fieldset>

                <fieldset className="fieldset mt-8">
                    <label className="label">Request Message</label>
                    <textarea
                        className="textarea w-full"
                        rows="4"
                        placeholder="Explain why you need blood..."
                        {...register("requestMessage")}
                    ></textarea>
                </fieldset>

                <button type='submit' className='btn btn-primary text-white mt-6'>
                    Request
                </button>

            </form>
        </div>
    )
}

export default EditBloodDonationRequest



