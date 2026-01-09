import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router'
import Logo from '../../../components/Logo/Logo';
import useAuth from '../../../hooks/useAuth';

const Login = () => {
    const { loginUser, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleLogin = (data) => {
        loginUser(data.email, data.password)
            .then(res => {
                navigate(location?.state || '/');
            })
            .catch(errors => {
                alert('invalid')
            })

    }
    return (
        <div className="min-h-screen bg-linear-to-br from-red-500 to-red-700 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 border border-red-200">
                {/* <!-- Icon --> */}
                <Link to="/" className="text-red-600 font-semibold hover:underline text-sm">Go Back</Link>

                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c1.657 0 3-1.567 3-3.5S13.657 4 12 4 9 5.567 9 7.5 10.343 11 12 11z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.5 21a10.4 10.4 0 0113 0M21 12l-1.5 1.5M3 12l1.5 1.5" />
                        </svg>
                    </div>
                </div>
                {/* <!-- Title --> */}
                <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">
                    Log in to Blood Bridge
                </h2>

                {/* <!-- Form --> */}
                <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
                    {/* <!-- Email --> */}
                    <div>
                        <label className="text-gray-700 font-medium">Email address</label>
                        <input
                            type="email"
                            {...register('email', { required: true })}
                            defaultValue={user?.email}
                            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                            placeholder="Enter your email"
                        />
                        {errors.email?.type === 'required' && <p className='text-red-600 text-sm mt-2'>Email is required!</p>}

                    </div>

                    {/* <!-- Password --> */}
                    <div>
                        <label className="text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            {...register('password', {
                                required: true,
                                minLength: 8,
                            })}
                            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                            placeholder="Enter your password"
                        />
                        {errors.password?.type === 'required' && <p className='text-red-600 text-sm mt-2'>Password is required</p>}
                        {errors.password?.type === 'minLength' && <p className='text-red-600 text-sm mt-2'>Password must be 6 character!</p>}
                    </div>

                    {/* <!-- Remember --> */}
                    <div className="flex items-center gap-2">
                        <input type="checkbox" className="h-4 w-4 text-red-600 rounded" />
                        <span className="text-gray-700 text-sm">Remember me</span>
                    </div>

                    {/* <!-- Login Button --> */}
                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition">
                        Continue
                    </button>

                    {/* <!-- or divider --> */}
                    <div className="flex items-center">
                        <div className="flex-1 border-t border-gray-300"></div>
                        <span className="px-3 text-gray-500 text-sm">or</span>
                        <div className="flex-1 border-t border-gray-300"></div>
                    </div>
                </form>

                {/* <!-- Footer --> */}
                <p className="text-center text-gray-600 text-sm mt-6">
                    New to Blood Bridge?
                    <Link state={location.state} to="/register" className="text-red-600 font-semibold hover:underline">Create account</Link>
                </p>

            </div>
        </div>

    )
}

export default Login



// const { data: allUsersInfo = [] } = useQuery({
//     queryKey: ['myDonationRequest', user?.email],
//     queryFn: async () => {
//         const res = await axiosSecure.get(`/all-users`);
//         return res.data;
//     }
// })