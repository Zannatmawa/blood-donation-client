// Testimonials.jsx
const testimonials = [
    {
        name: "Ayesha Rahman",
        role: "Blood Recipient",
        message:
            "Thanks to CareNest, my mother received blood on time during an emergency. This platform truly saves lives.",
        image: "https://i.pravatar.cc/150?img=47",
    },
    {
        name: "Tanvir Ahmed",
        role: "Regular Blood Donor",
        message:
            "The process is simple and well-organized. I feel proud knowing my donation can help people in need.",
        image: "https://i.pravatar.cc/150?img=12",
    },
    {
        name: "Nusrat Jahan",
        role: "Volunteer",
        message:
            "Being part of this community is rewarding. The platform connects donors and patients efficiently.",
        image: "https://i.pravatar.cc/150?img=32",
    },
];

const Testimonials = () => {
    return (
        <section className="py-20 my-10 bg-base-200">
            <div className="max-w-7xl mx-auto px-6">

                {/* Section Header */}
                <div className="text-center mb-14">
                    <h2
                        className="text-3xl md:text-4xl font-bold"
                        style={{ color: "#D32F2F" }}
                    >
                        What People Say
                    </h2>
                    <p className="mt-3 text-base-content/70 max-w-2xl mx-auto">
                        Real experiences from donors, recipients, and volunteers in our community.
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <div
                            key={index}
                            className="card bg-base-100 shadow-md hover:shadow-lg transition"
                        >
                            <div className="card-body">

                                {/* User Info */}
                                <div className="flex items-center gap-4 mb-4">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-14 h-14 rounded-full object-cover"
                                    />
                                    <div>
                                        <h3 className="font-semibold">{item.name}</h3>
                                        <p className="text-sm text-base-content/60">
                                            {item.role}
                                        </p>
                                    </div>
                                </div>

                                {/* Message */}
                                <p className="text-sm text-base-content/80 leading-relaxed">
                                    “{item.message}”
                                </p>

                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Testimonials;
