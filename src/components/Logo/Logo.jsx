import React from 'react'

const Logo = () => {
    return (
        <div className='flex items-center gap-2 cursor-pointer'>
            <div className='bg-red-600 p-2 rounded-full shadow-md flex items-center justify-center'>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 11c1.657 0 3-1.567 3-3.5S13.657 4 12 4 9 5.567 9 7.5 10.343 11 12 11z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5.5 21a10.4 10.4 0 0113 0M21 12l-1.5 1.5M3 12l1.5 1.5"
                    />
                </svg>
            </div>

            <div className='flex flex-col'>
                <span className='text-red-600 font-bold text-xl'>Blood</span>
                <span className='text-gray-700 font-medium text-sm'>Bridge</span>
            </div>
        </div>
    )
}

export default Logo
