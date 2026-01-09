import { FaTint, FaHandHoldingHeart, FaUserPlus, FaMoneyBillWave, FaNewspaper, FaHandsHelping } from "react-icons/fa";
import { Link } from "react-router";

const categories = [
    {
        id: 1,
        title: "Blood Donation",
        desc: "View and respond to blood donation requests.",
        icon: <FaTint />,
        link: "/pending-donation-requests"
    },
    {
        id: 2,
        title: "Emergency Requests",
        desc: "Urgent blood needs that require immediate attention.",
        icon: <FaHandHoldingHeart />,
        link: "/pending-donation-requests"
    },
    {
        id: 3,
        title: "Become a Donor",
        desc: "Register yourself as a blood donor today.",
        icon: <FaUserPlus />,
        link: "/register"
    },
    {
        id: 4,
        title: "Funding & Support",
        desc: "Support patients by contributing funds.",
        icon: <FaMoneyBillWave />,
        link: "/funding"
    },
    {
        id: 5,
        title: "Articles & Awareness",
        desc: "Read articles to spread awareness about blood donation.",
        icon: <FaNewspaper />,
        link: "/articles"
    },
    {
        id: 6,
        title: "Our Services",
        desc: "Explore the services we provide to the community.",
        icon: <FaHandsHelping />,
        link: "/services"
    }
];

const Categories = () => {
    return (
        <section className="py-16 bg-base-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-[#D32F2F]">
                        Explore Categories
                    </h2>
                    <p className="mt-3 text-gray-500 max-w-xl mx-auto">
                        Choose a category to explore blood donation requests, services, and community support.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map(cat => (
                        <Link
                            key={cat.id}
                            to={cat.link}
                            className="group p-8 rounded-2xl border border-base-300 bg-base-100 shadow-sm hover:shadow-xl transition"
                        >
                            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#D32F2F]/10 text-[#D32F2F] text-2xl mb-6 group-hover:bg-[#D32F2F] group-hover:text-white transition">
                                {cat.icon}
                            </div>

                            <h3 className="text-xl font-semibold mb-2">
                                {cat.title}
                            </h3>
                            <p className="text-gray-500 text-sm">
                                {cat.desc}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
