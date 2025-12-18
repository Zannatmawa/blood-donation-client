import React from 'react'
import useAuth from '../hooks/useAuth'
import useRole from '../hooks/useRole';
import Loading from '../components/Loading';
import Forbidden from '../components/Forbidden';
import AllDonationRequest from '../pages/Dashboard/AllDonationRequest/AllDonationRequest';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useRole();

    if (loading || roleLoading) {
        return <Loading />
    }

    if (role !== 'admin') {
        return <Forbidden />
    }
    return children
}

export default AdminRoute