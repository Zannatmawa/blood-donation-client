// HowItWorks.jsx
import { FaUserPlus, FaSearch, FaHandHoldingHeart, FaHeartbeat } from "react-icons/fa";

const steps = [
    {
        title: "Register as Donor",
        description:
            "Sign up by providing basic details like blood group, location, and contact information.",
        icon: <FaUserPlus className="text-3xl text-primary" />,
    },
    {
        title: "Find Blood Request",
        description:
            "Browse active blood requests or get notified when your blood group is needed.",
        icon: <FaSearch className="text-3xl text-secondary" />,
    },
    {
        title: "Donate Blood",
        description:
            "Visit the nearby hospital or donation center and donate blood safely.",
        icon: <FaHandHoldingHeart className="text-3xl text-accent" />,
    },
    {
        title: "Save Lives",
        description:
            "Your donation helps patients in emergencies, surgeries, and critical care.",
        icon: <FaHeartbeat className="text-3xl text-error" />,
    },
];

const HowItWorks = () => {
    return (
        <section className="py-20 my-10 bg-base-100">
            <div className="max-w-7xl mx-auto px-6">

                {/* Section Header */}
                <div className="text-center mb-14">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        How It Works
                    </h2>
                    <p className="mt-3 text-base-content/70 max-w-2xl mx-auto">
                        A simple and transparent process to connect blood donors with patients in need.
                    </p>
                </div>

                {/* Steps */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="card bg-base-200 shadow-md hover:shadow-lg transition"
                        >
                            <div className="card-body text-center items-center">

                                {/* Step Number */}
                                <div className="badge badge-outline mb-4">
                                    Step {index + 1}
                                </div>

                                {/* Icon */}
                                <div className="mb-4">
                                    {step.icon}
                                </div>

                                {/* Content */}
                                <h3 className="text-lg font-semibold">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-base-content/70">
                                    {step.description}
                                </p>

                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default HowItWorks;
