import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import useAxios from '../../../hooks/useAxios';

const Search = () => {
    const { register, handleSubmit } = useForm();

    const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    const allDistricts = useLoaderData();
    const districts = allDistricts[0].data;
    const axiosSecure = useAxios();

    const [matchedDonors, setMatchedDonors] = useState([]);
    const [districtId, setDistrictId] = useState("");
    const [upazillas, setUpazillas] = useState([]);

    useEffect(() => {
        fetch('/upazilla.json')
            .then(res => res.json())
            .then(data => {
                setUpazillas(data[0].data)
            });
    }, []);

    const { data: donationRequest = [] } = useQuery({
        queryKey: ['allDonationRequest', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-blood-donation-request`);
            return res.data;
        }
    })

    console.log(donationRequest)
    const handleSearchDonor = (data) => {
        const bgroup = data.blood;
        const district = data.district;
        const upazilla = data.upazilla;

        const req = donationRequest.filter(req => req.bloodGroup === bgroup && req.recipientDistrict === district && req.recipientUpazilla === upazilla);

        console.log('matched', req);

        setMatchedDonors(req)


    }

    return (
        <>
            <div className='w-full max-w-md mx-auto my-10 bg-white shadow-xl rounded-xl p-8 border border-red-200'>
                <div>
                    <h2 className='text-red-600 font-bold text-3xl text-center'>Search Donor</h2>
                </div>
                <div>
                    <form onSubmit={handleSubmit(handleSearchDonor)}>
                        {/* blood grp */}
                        <fieldset className="fieldset">
                            <label class="text-gray-700 font-medium">Blood Group</label>
                            <select
                                name="bloodGroup"
                                className="select select-bordered w-full"
                                {...register('blood')}
                            >
                                <option value="">Select Blood Group</option>
                                {bloodGroups.map(bg => (
                                    <option key={bg} value={bg}>{bg}</option>
                                ))}
                            </select>
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend ">Select a District </legend>
                            <select
                                {...register('district')}
                                onChange={(e) => setDistrictId(e.target.value)}
                                defaultValue="" className="select w-full ">
                                <option value="" disabled>Pick a District</option>
                                {districts.map(d => (
                                    <option key={d.id} value={d.id}>
                                        {d.name}
                                    </option>
                                ))}
                            </select>
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Select a Upazilla</legend>
                            <select
                                {...register('upazilla')}
                                defaultValue="" className="select w-full">
                                <option value="" disabled>Pick a Upazilla</option>
                                {upazillas
                                    .filter(u => u.district_id == districtId)
                                    .map(u => (
                                        <option key={u.id} value={u.name}>{u.name}</option>
                                    ))
                                }
                            </select>
                        </fieldset>
                        <button type='submit' className='bg-red-600  btn text-white my-5'>Search</button>
                    </form>
                </div>
            </div>
            <div className="mt-8">
                {matchedDonors.length === 0 ? (
                    <p className="text-gray-500">No donors found</p>
                ) : (
                    <div className="grid md:grid-cols-3 gap-4 m-5">
                        {matchedDonors.map(donor => (
                            <div
                                key={donor._id}
                                className="border p-4 rounded-lg shadow-sm"
                            >
                                <h3 className="font-semibold text-lg">
                                    Donor Name: {donor.recipientName}
                                </h3>
                                <p>Blood Group: {donor.bloodGroup}</p>
                                <p>District: {donor.recipientDistrict}</p>
                                <p>Upazilla: {donor.recipientUpazilla}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </>


    )
}

export default Search