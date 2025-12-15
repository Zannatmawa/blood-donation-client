import React from 'react'
import useAuth from '../hooks/useAuth'
import useRole from '../hooks/useRole';
import Loading from '../components/Loading';
import Forbidden from '../components/Forbidden';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useRole();

    if (loading || roleLoading) {
        return <Loading />
    }
    if (role !== 'adming') {
        return <Forbidden />
    }
    return children
}

export default AdminRoute