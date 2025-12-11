import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import useAuth from '../../../hooks/useAuth'
import axios from 'axios';
import { Link, useLoaderData, useLocation, useNavigate } from 'react-router';
import useAxios from '../../../hooks/useAxios';
//@Saima362 @Namm362 na@gmail.com
const Register = () => {
    const axiosSecure = useAxios();
    const { registerUser, updateUserProfile } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation();
    const navigate = useNavigate();

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

    const handleRegistration = (data) => {
        const profileImg = data.photo[0]
        registerUser(data.email, data.password)
            .then(res => {
                //store the ig and get the photo url         
                const formData = new FormData();
                formData.append('image', profileImg);
                const imageAPIURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`
                axios.post(imageAPIURL, formData)
                    .then(res => {
                        // const photoURL = res.data.data.url;
                        //create user int the db
                        const userInfo = {
                            email: data.email,
                            displayName: data.name,
                            photoURL: res.data.data.url,
                            bloodGroup: data.blood,
                            district: data.district,
                            upazilla: data.upazilla,
                        }
                        axiosSecure.post('/all-users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('first')
                                }
                            })
                        //update user profile
                        const userProfile = {
                            displayName: data.name,
                            photoURL: res.data.data.url,
                        }
                        updateUserProfile(userProfile)
                            .then(() => {
                                console.log('first');
                                navigate(location.state || '/')
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    })
            })
            .catch(err => {
                console.log(err)
            })

    }

    return (
        <div class="min-h-screen bg-linear-to-br from-red-500 to-red-700 flex items-center justify-center px-4">
            <div class="w-full max-w-md bg-white shadow-xl rounded-xl p-8 border border-red-200">
                <div class="flex justify-center mb-6">
                    <div class="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c1.657 0 3-1.567 3-3.5S13.657 4 12 4 9 5.567 9 7.5 10.343 11 12 11z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.5 21a10.4 10.4 0 0113 0M21 12l-1.5 1.5M3 12l1.5 1.5" />
                        </svg>
                    </div>
                </div>

                <h2 class="text-center text-2xl font-semibold text-gray-800 mb-6">
                    Register in to Blood Bridge
                </h2>

                <form onSubmit={handleSubmit(handleRegistration)} class="space-y-4">
                    <div>
                        <label class="text-gray-700 font-medium">Email address</label>
                        <input
                            type="email"
                            {...register('email', { required: true })}
                            class="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                            placeholder="Enter your email"
                        />
                        {errors.email?.type === 'required' && <p className='text-red-600'>Email is required</p>}
                    </div>
                    {/* name */}
                    <div>
                        <label class="text-gray-700 font-medium">Full Name</label>
                        <input
                            type="text"
                            {...register('name', { required: true })}
                            class="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                            placeholder="Enter your Name"
                        />
                    </div>

                    <div>
                        <label class="text-gray-700 font-medium">Photo</label>
                        <input
                            type="file"
                            {...register('photo', { required: true })}
                            class="file-input w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                        />
                        {errors.photo?.type === 'required' && <p className='text-red-600'>Photo is required</p>}
                    </div>
                    {/* blood grp */}
                    <fieldset className="fieldset">
                        <label class="text-gray-700 font-medium">Blood Group</label>
                        <select
                            name="bloodGroup"
                            className="select select-bordered w-full"
                            {...register('blood', { required: true })}
                        >
                            <option value="">Select Blood Group</option>
                            {bloodGroups.map(bg => (
                                <option key={bg} value={bg}>{bg}</option>
                            ))}
                        </select>
                    </fieldset>


                    <fieldset className="fieldset">
                        <legend className="fieldset-legend ">Select a District </legend>
                        <select {...register('district')} onChange={(e) => setDistrictId(e.target.value)} defaultValue="" className="select w-full ">
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
                        <select {...register('upazilla')} defaultValue="" className="select w-full">
                            <option value="" disabled>Pick a Upazilla</option>
                            {upazillas
                                .filter(u => u.district_id == districtId)
                                .map(u => (
                                    <option key={u.id} value={u.name}>{u.name}</option>
                                ))
                            }
                        </select>
                    </fieldset>

                    <div>
                        <label class="text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            {...register('password', {
                                required: true,
                                minLength: 8,
                                pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
                            })}
                            class="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                            placeholder="Enter your password"
                        />
                        {errors.password?.type === 'required' && <p className='text-red-600'>Password is required</p>}
                        {errors.password?.type === 'minLength' && <p className='text-red-600'>Password must be 6 character!</p>}
                        {errors.password?.type === 'pattern' && <p className='text-red-500'>must contain at least one uppercase letter. Must contain at least one lowercase letter!</p>}
                    </div>

                    <label class="text-gray-700 font-medium">Confirm Password</label>
                    <input
                        type="password"
                        {...register('passwordConfirm', {
                            required: true,
                        })}
                        class="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                        placeholder="Enter your password"
                    />

                    <div class="flex items-center gap-2">
                        <input type="checkbox" class="h-4 w-4 text-red-600 rounded" />
                        <span class="text-gray-700 text-sm">Remember me</span>
                    </div>

                    <button
                        type="submit"
                        class="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                    >
                        Submit
                    </button>

                    <div class="flex items-center">
                        <div class="flex-1 border-t border-gray-300"></div>
                        <span class="px-3 text-gray-500 text-sm">or</span>
                        <div class="flex-1 border-t border-gray-300"></div>
                    </div>
                </form>

                <p class="text-center text-gray-600 text-sm mt-6">
                    Already registered to Blood Bridge?
                    <Link state={location.state} to="/login" class="text-red-600 font-semibold hover:underline">Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Register
