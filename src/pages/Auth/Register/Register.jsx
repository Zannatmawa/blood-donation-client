import React from 'react'
import { useForm } from 'react-hook-form'
import useAuth from '../../../hooks/useAuth'
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router';

const Register = () => {
    const { registerUser, updateUserProfile } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation();
    const navigate = useNavigate();
    // const bloodGroup = ["A+", "A-", "B+", "B-", "AB+", "AB-", O +, O -]
    const handleRegistration = (data) => {
        console.log(data);
        const profileImg = data.photo[0];

        registerUser(data.email, data.password)
            .then(res => {
                console.log(res.user)
                //store the image and get the url from img bb
                const formData = new FormData();
                formData.append('image', profileImg);
                //send the photo to store
                const image_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`
                axios.post(image_URL, formData)
                    .then(res => {
                        console.log(res.data);
                        //update user profile to firebase
                        const userProfile = {
                            displayName: data.name,
                            photoURL: res.data.data.url
                        }
                        updateUserProfile(userProfile)
                            .then()
                            .catch(error => {
                                console.log(error);
                                navigate(location.state || '/');
                            })
                    })
            })
            .catch(error => {
                console.log(error)
            })

    }
    return (
        <div class="min-h-screen bg-linear-to-br from-red-500 to-red-700 flex items-center justify-center px-4">
            <div class="w-full max-w-md bg-white shadow-xl rounded-xl p-8 border border-red-200">
                {/* <!-- Icon --> */}
                <div class="flex justify-center mb-6">
                    <div class="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c1.657 0 3-1.567 3-3.5S13.657 4 12 4 9 5.567 9 7.5 10.343 11 12 11z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.5 21a10.4 10.4 0 0113 0M21 12l-1.5 1.5M3 12l1.5 1.5" />
                        </svg>
                    </div>
                </div>
                {/* <!-- Title --> */}
                <h2 class="text-center text-2xl font-semibold text-gray-800 mb-6">
                    Register in to Blood Bridge
                </h2>

                {/* <!-- Form --> */}
                <form onSubmit={handleSubmit(handleRegistration)} class="space-y-4">
                    {/* <!-- Email --> */}
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
                    {/* <!-- name --> */}
                    <div>
                        <label class="text-gray-700 font-medium">Full Name</label>
                        <input
                            type="text"
                            {...register('name',
                                { required: true })}
                            class="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                            placeholder="Enter your Name"
                        />
                    </div>
                    {/* <!-- image --> */}
                    <div>
                        <label class="text-gray-700 font-medium">Photo</label>
                        <input
                            type="file"
                            {...register('photo',
                                { required: true })}
                            class="file-input w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                            placeholder="Enter your Photo Url"
                        />
                        {errors.photo?.type === 'required' && <p className='text-red-600'>Photo is required</p>}

                    </div>
                    {/* options */}
                    {/* distric */}
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Select a District </legend>
                        {/* <select {...register('senderDistrict')} defaultValue="Pick a browser" className="select">
                            <option disabled={true}>Pick a District</option>
                            {districtByRegion(senderRegion).map((region, i) => <option key={i} value={region}>{region}</option>)}

                        </select> */}
                        <span className="label">Optional</span>
                    </fieldset>
                    {/* region/upazila */}
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Select a Region</legend>
                        {/* <select {...register('senderRegion')} defaultValue="Pick a browser" className="select">
                            <option disabled={true}>Pick a region</option>
                            {regions.map((region, i) => <option key={i} value={region}>{region}</option>)}
                        </select> */}
                        <span className="label">Optional</span>
                    </fieldset>

                    {/* blood group */}
                    {/* <fieldset className="fieldset">
                        <legend className="fieldset-legend">Select a Blood Group</legend>
                        <select {...register('senderRegion')} defaultValue="Pick a Blood Group" className="select">
                            <option disabled={true}>Pick a region</option>
                            {bloodGroup.map((group, i) => <option key={i} value={group}>{group}</option>)}
                        </select>
                        <span className="label">Optional</span>
                    </fieldset> */}
                    {/* <!-- Password --> */}
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
                    {/* confirm pass */}
                    <label class="text-gray-700 font-medium">Confirm Password</label>
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


                    {/* <!-- Remember --> */}
                    <div class="flex items-center gap-2">
                        <input type="checkbox" class="h-4 w-4 text-red-600 rounded" />
                        <span class="text-gray-700 text-sm">Remember me</span>
                    </div>

                    {/* <!-- Login Button --> */}
                    <button
                        type="submit"
                        class="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                    >
                        Submit
                    </button>

                    {/* <!-- or divider --> */}
                    <div class="flex items-center">
                        <div class="flex-1 border-t border-gray-300"></div>
                        <span class="px-3 text-gray-500 text-sm">or</span>
                        <div class="flex-1 border-t border-gray-300"></div>
                    </div>
                </form>

                {/* <!-- Footer --> */}
                <p class="text-center text-gray-600 text-sm mt-6">
                    Alreay registered to Blood Bridge?
                    <Link state={location.state} to="/login" class="text-red-600 font-semibold hover:underline">Login</Link>
                </p>

            </div>
        </div>
    )
}

export default Register