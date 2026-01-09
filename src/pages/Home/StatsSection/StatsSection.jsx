// BloodStats.jsx
const bloodData = [
    { group: "A+", status: "Available" },
    { group: "B+", status: "Available" },
    { group: "O+", status: "Urgent" },
    { group: "AB+", status: "Available" },
    { group: "A-", status: "Urgent" },
    { group: "O-", status: "Urgent" },
];

const BloodStats = () => {
    return (
        <section className="py-20 bg-base-200">
            <div className="max-w-7xl mx-auto px-6">

                {/* Section Title */}
                <div className="text-center mb-12">
                    <h2
                        className="text-3xl md:text-4xl font-bold"
                        style={{ color: "#D32F2F" }}
                    >
                        Blood Availability Status
                    </h2>
                    <p className="mt-3 text-base-content/70">
                        Real-time blood group availability across our network
                    </p>
                </div>

                {/* Blood Groups */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
                    {bloodData.map((blood, index) => (
                        <div key={index} className="card bg-base-100 shadow-md">
                            <div className="card-body items-center text-center">
                                <h3 className="text-3xl font-bold text-red-500">
                                    {blood.group}
                                </h3>
                                <span
                                    className={`badge mt-2 ${blood.status === "Urgent"
                                        ? "badge-error"
                                        : "badge-success"
                                        }`}
                                >
                                    {blood.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats */}
                <div className="grid sm:grid-cols-3 gap-6">
                    <div className="stat bg-base-100 shadow rounded-box">
                        <div className="stat-title">Total Registered Donors</div>
                        <div className="stat-value text-primary">1,250+</div>
                    </div>

                    <div className="stat bg-base-100 shadow rounded-box">
                        <div className="stat-title">Successful Donations</div>
                        <div className="stat-value text-primary">980+</div>
                    </div>

                    <div className="stat bg-base-100 shadow rounded-box">
                        <div className="stat-title">Lives Saved</div>
                        <div className="stat-value text-primary">2,900+</div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default BloodStats;
