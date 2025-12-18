import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Loading from "../components/Loading";
import Forbidden from "../components/Forbidden";

const AdminVolunteerRoute = ({ children }) => {
    const { loading } = useAuth();
    const { role, roleLoading } = useRole();

    if (loading || roleLoading) return <Loading />;

    if (role !== "admin" && role !== "volunteer") {
        return <Forbidden />;
    }

    return children;
};

export default AdminVolunteerRoute;
