import { ShieldAlert } from "lucide-react";
import { Link } from "react-router";

export default function Forbidden() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-500 to-red-700 px-4">

            <div className="bg-white rounded-xl shadow-xl p-10 max-w-md text-center">

                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                        <ShieldAlert className="text-red-600" size={36} />
                    </div>
                </div>

                {/* Text */}
                <h1 className="text-4xl font-extrabold text-red-600 mb-2">403</h1>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Access Forbidden
                </h2>
                <p className="text-gray-600 mb-8">
                    Sorry, you don’t have permission to access this page.
                    Please contact the administrator if you believe this is a mistake.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
                    >
                        Go to Home
                    </Link>

                    <Link
                        to="/dashboard"
                        className="px-6 py-3 border border-red-600 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition"
                    >
                        Dashboard
                    </Link>
                </div>
            </div>

        </div>
    );
}


