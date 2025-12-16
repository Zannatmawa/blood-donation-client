import React from 'react'
import useRole from '../../hooks/useRole'
import DonorDashboard from './DonorDashboard/DonorDashboard';
import AdminDashboardHome from './AdminDashboard/AdminDashboard';

const Dashboard = () => {
    const { role } = useRole();

    if (role === 'admin') {
        return <AdminDashboardHome />
    }
    if (role === 'volunteer') {
        return <AdminDashboardHome />
    }
    if (role === 'donor') {
        return <DonorDashboard />

    }
    return (

        <div>

        </div>
    )
}

export default Dashboard
//zannatulmawa@gmail.com
//@Marufa362
//zannatul mawa marufa