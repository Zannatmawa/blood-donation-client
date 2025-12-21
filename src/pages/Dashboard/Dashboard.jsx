import React, { useEffect } from 'react'
import useRole from '../../hooks/useRole'
import DonorDashboard from './DonorDashboard/DonorDashboard';
import AdminDashboardHome from './AdminDashboard/AdminDashboard';

const Dashboard = () => {
    const { role } = useRole();
    useEffect(() => {
        if (role === "admin") document.title = "Admin Dashboard | Blood Bridge";
        if (role === "volunteer") document.title = "Volunteer Dashboard | Blood Bridge";
        if (role === "donor") document.title = "Donor Dashboard | Blood Bridge";
    }, [role]);



    if (role === 'admin') {
        return <AdminDashboardHome />
    }
    else if (role === 'volunteer') {
        return <AdminDashboardHome />
    }
    else (role === 'donor')
    return <DonorDashboard />


}

export default Dashboard
