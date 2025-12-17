import { useForm } from 'react-hook-form'
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import Notiflix from 'notiflix';

const MyProfile = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { user } = useAuth();
    const axiosSecure = useAxios();
    const allDistricts = useLoaderData();

    const districts = allDistricts[0].data;
    const [districtId, setDistrictId] = useState("");
    const [upazillas, setUpazillas] = useState([]);
    const [isEditing, setIsEditing] = useState(false);


    const { refetch, data: allUsersInfo = [] } = useQuery({
        queryKey: ['myDonationRequest', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-users`);
            return res.data;
        }
    })
    useEffect(() => {
        fetch('/upazilla.json')
            .then(res => res.json())
            .then(data => {
                setUpazillas(data[0].data)
            });
    }, []);
    const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    const handleEditProfile = () => {
        setIsEditing(true)
        reset();
    }
    // const profileImg = data.photo[0]

    const handleUpdateProfile = (data) => {
        console.log(data);
        axiosSecure.patch(`/all-users/${user.email}`, data)
            .then(res => {
                refetch();
                if (res.data.modifiedCount) {
                    Notiflix.Notify.success('Operation successful!');
                    Notiflix.Confirm.show(
                        'Confirm',
                        'Are you sure?',
                        'Yes',
                        'No',
                        () => console.log('Confirmed'),
                    );
                }
            })
    }

    return (
        <div className="max-w-3xl mx-auto p-6 shadow rounded bg-white">
            <button onClick={handleEditProfile} className="btn btn-primary  text-black">
                Edit
            </button>
            <h2 className="text-4xl font-bold text-center mb-6">My Profile</h2>

            {/* Avatar Preview */}
            <div className="flex justify-center mb-6">
                <img
                    src={user?.photoURL || "https://i.ibb.co/Y2q5FJr/default-avatar.png"}
                    alt="Avatar"
                    defaultValue={user?.photoURL}
                    className="w-24 h-24 rounded-full border"
                />
            </div>

            <form onSubmit={handleSubmit(handleUpdateProfile)} className="space-y-6">
                {/* Full Name */}
                <div>
                    <label className="label font-semibold">Full Name</label>
                    <input
                        type="text"
                        disabled={!isEditing}
                        defaultValue={user?.displayName}
                        {...register("name")}
                        className="input w-full border p-2 rounded"
                        placeholder="Your Name"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="label font-semibold">Email</label>
                    <input
                        type="email"
                        defaultValue={user?.email}
                        {...register("email")}
                        className="input w-full border p-2 rounded"
                        placeholder="Your Email"
                        readOnly
                    />
                    <p className="text-sm text-gray-500">Email cannot be changed</p>
                </div>

                {/* Avatar URL */}
                <div>
                    <label class="text-gray-700 font-medium">Photo</label>
                    <input
                        type="file"
                        // defaultValue={user?.photoURL}
                        {...register('photo')}
                        class="file-input w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                    {errors.photo?.type === 'required' && <p className='text-red-600'>Photo is required</p>}
                </div>
                {/* blood grp */}
                <fieldset className="fieldset">
                    <label class="text-gray-700 font-medium">Blood Group</label>
                    <select
                        name="bloodGroup"
                        disabled={!isEditing}
                        defaultValue={user?.photoURL}
                        className="select select-bordered w-full"
                        {...register('blood')}
                    >
                        <option value="">Select Blood Group</option>
                        {bloodGroups.map(bg => (
                            <option key={bg} value={bg}>{bg}</option>
                        ))}
                    </select>
                </fieldset>
                {/* District */}

                <fieldset className="fieldset">
                    <legend className="fieldset-legend ">Select a District </legend>
                    <select {...register('district')} disabled={!isEditing}
                        onChange={(e) => setDistrictId(e.target.value)} defaultValue="" className="select w-full ">
                        <option value="" disabled>Pick a District</option>
                        {districts.map(d => (
                            <option key={d.id} value={d.id}>
                                {d.name}
                            </option>
                        ))}
                    </select>
                </fieldset>
                {/* Upazila */}
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Select a Upazilla</legend>
                    <select {...register('upazilla')} disabled={!isEditing}
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
                {/* Submit */}

                <button type='submit' className="btn bg-green-600  text-black">
                    Save
                </button>
            </form>
        </div>
    )
}

export default MyProfile