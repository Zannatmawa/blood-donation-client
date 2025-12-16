import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router';

const Search = () => {
    const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
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
    return (
        <div className='w-full max-w-md mx-auto my-10 bg-white shadow-xl rounded-xl p-8 border border-red-200'>
            <div>
                <h2 className='text-red-600 font-bold text-3xl text-center'>Search Donor</h2>
            </div>
            <div>
                <form>
                    {/* blood grp */}
                    <fieldset className="fieldset">
                        <label class="text-gray-700 font-medium">Blood Group</label>
                        <select
                            name="bloodGroup"
                            className="select select-bordered w-full"
                        // {...register('blood', { required: true })}
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
                            //  {...register('district')} 
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
                            // {...register('upazilla')} 
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
                </form>
                <button className='bg-red-600  btn text-white my-5'>Search</button>
            </div>
        </div>
    )
}

export default Search