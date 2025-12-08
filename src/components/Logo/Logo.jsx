import React from 'react'

const Logo = () => {
    return (
        <div className='flex flex-col justify-center items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c1.657 0 3-1.567 3-3.5S13.657 4 12 4 9 5.567 9 7.5 10.343 11 12 11z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.5 21a10.4 10.4 0 0113 0M21 12l-1.5 1.5M3 12l1.5 1.5" />
            </svg>
            <div className='text-red-600 '>
                <span>Blood</span>
                <span>Bridge</span>
            </div>
        </div>
    )
}

export default Logo