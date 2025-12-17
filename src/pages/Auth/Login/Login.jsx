import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router'
import Logo from '../../../components/Logo/Logo';
import useAuth from '../../../hooks/useAuth';

const Login = () => {
    const { loginUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleLogin = (data) => {
        console.log(data);
        loginUser(data.email, data.password)
            .then(res => {
                navigate(location?.state || '/');
                console.log(res.user);
            })
            .catch(errors => {
                console.log(errors)
            })

    }
    return (
        <div class="min-h-screen bg-linear-to-br from-red-500 to-red-700 flex items-center justify-center px-4">
            <div class="w-full max-w-md bg-white shadow-xl rounded-xl p-8 border border-red-200">
                {/* <!-- Icon --> */}
                <div class="flex justify-center mb-6">
                    <div class="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center">
                        <Logo />
                    </div>
                </div>
                {/* <!-- Title --> */}
                <h2 class="text-center text-2xl font-semibold text-gray-800 mb-6">
                    Log in to Blood Bridge
                </h2>

                {/* <!-- Form --> */}
                <form onSubmit={handleSubmit(handleLogin)} class="space-y-4">
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

                    {/* <!-- Password --> */}
                    <div>
                        <label class="text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            {...register('password', {
                                required: true,
                                minLength: 8,
                            })}
                            class="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                            placeholder="Enter your password"
                        />
                        {errors.password?.type === 'required' && <p className='text-red-600'>Password is required</p>}
                        {errors.password?.type === 'minLength' && <p className='text-red-600'>Password must be 6 character!</p>}
                    </div>

                    {/* <!-- Remember --> */}
                    <div class="flex items-center gap-2">
                        <input type="checkbox" class="h-4 w-4 text-red-600 rounded" />
                        <span class="text-gray-700 text-sm">Remember me</span>
                    </div>

                    {/* <!-- Login Button --> */}
                    <button
                        type="submit"
                        class="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition">
                        Continue
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
                    New to Blood Bridge?
                    <Link state={location.state} to="/register" class="text-red-600 font-semibold hover:underline">Create account</Link>
                </p>

            </div>
        </div>

    )
}

export default Login