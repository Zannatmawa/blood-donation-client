// Services.jsx
import {
    FaUserPlus,
    FaSearch,
    FaHospital,
    FaHandsHelping,
} from "react-icons/fa";

const services = [
    {
        title: "Donor Registration",
        description:
            "Register as a blood donor and become part of our life-saving community.",
        icon: <FaUserPlus />,
    },
    {
        title: "Search Blood Donors",
        description:
            "Find nearby blood donors quickly based on blood group and location.",
        icon: <FaSearch />,
    },
    {
        title: "Emergency Blood Requests",
        description:
            "Post urgent blood requests and get immediate support from volunteers.",
        icon: <FaHospital />,
    },
    {
        title: "Volunteer Support",
        description:
            "Join our volunteer network and help manage blood donation drives.",
        icon: <FaHandsHelping />,
    },
];

const Services = () => {
    return (
        <section className="py-20 my-10 bg-base-200">
            <div className="max-w-7xl mx-auto px-6">

                {/* Section Header */}
                <div className="text-center mb-14">
                    <h2
                        className="text-3xl md:text-4xl font-bold"
                        style={{ color: "#D32F2F" }}
                    >
                        Our Services
                    </h2>
                    <p className="mt-3 text-base-content/70 max-w-2xl mx-auto">
                        We provide essential services to connect blood donors, patients, and hospitals efficiently.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="card bg-base-100 shadow-md hover:shadow-xl transition"
                        >
                            <div className="card-body text-center items-center">

                                {/* Icon */}
                                <div
                                    className="w-16 h-16 flex items-center justify-center rounded-full text-white mb-4"
                                    style={{ backgroundColor: "#D32F2F" }}
                                >
                                    <span className="text-2xl">{service.icon}</span>
                                </div>

                                {/* Content */}
                                <h3 className="text-lg font-semibold">
                                    {service.title}
                                </h3>
                                <p className="text-sm text-base-content/70">
                                    {service.description}
                                </p>

                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Services;
