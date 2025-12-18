import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { Link } from "react-router";

const PaymentSuccess = () => {
    const { user } = useAuth();
    const axiosSecure = useAxios();

    useEffect(() => {
        if (user?.email) {
            axiosSecure.post("/save-funding", {
                name: user?.displayName,
                email: user.email,
                amount: 500,
                method: "Stripe",
            });
        }
    }, [user]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-50">
            <div className="bg-white p-8 rounded-xl shadow text-center">
                <h2 className="text-3xl font-bold text-green-600">
                    Payment Successful
                </h2>
                <p className="mt-3 text-gray-600">
                    Thank you for supporting Blood Bridge
                </p>
                <Link to="/funding" className="border mt-3 bg-red-600 text-white mx-4 px-6 py-3 rounded-md font-semibold">
                    Go Back</Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;
