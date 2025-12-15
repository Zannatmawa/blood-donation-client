export default function Loading() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-red-500 to-red-700">

            {/* Spinner */}
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-6"></div>

            {/* Text */}
            <h2 className="text-white text-2xl font-semibold tracking-wide">
                Blood Bridge
            </h2>
            <p className="text-red-100 mt-2">
                Loading, please wait...
            </p>

        </div>
    );
}
