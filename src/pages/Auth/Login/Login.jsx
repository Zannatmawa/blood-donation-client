import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router'
import Logo from '../../../components/Logo/Logo';
import useAuth from '../../../hooks/useAuth';
import Notiflix from "notiflix";


const Login = () => {
    const { loginUser, user, googleLogin } = useAuth();
    const [remember, setRemember] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleLogin = (data) => {
        if (remember) localStorage.setItem("savedEmail", data.email);

        loginUser(data.email, data.password)
            .then(() => navigate(location?.state || '/'))
            .catch(() => Notiflix.Notify.failure("Invalid credentials"));
    };

    useEffect(() => {
        const saved = localStorage.getItem("savedEmail");
        if (saved) setValue("email", saved);
    }, []);


    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                Notiflix.Notify.success(`Welcome ${result.user.displayName}`);
                navigate(location?.state || '/');
            })
            .catch(error => {
                Notiflix.Notify.failure(error.message);
            });
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
                            autoComplete="email"
                            {...register('email', { required: true })}
                            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="Enter your email"
                        />
                        {errors.email?.type === 'required' && <p className='text-red-600 text-sm mt-2'>Email is required!</p>}

                    </div>

                    {/* <!-- Password --> */}
                    <div>
                        <label className="text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            autoComplete="current-password"
                            {...register('password', { required: true, minLength: 8 })}
                            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg"
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
                {/* Google */}
                <button
                    onClick={handleGoogleLogin}
                    className="w-full btn border-red-600 hover:bg-red-700 transition hover:text-white bg-white text-black ">
                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                    Login with Google
                </button>
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