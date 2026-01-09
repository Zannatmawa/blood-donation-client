// Partners.jsx
const partners = [
    {
        name: "Dhaka Medical College Hospital",
        logo: "https://i.ibb.co/6Jj9QYk/hospital.png",
    },
    {
        name: "Bangladesh Red Crescent",
        logo: "https://i.ibb.co/9Z8F5jR/red-crescent.png",
    },
    {
        name: "Square Hospital",
        logo: "https://i.ibb.co/7JXhYJQ/hospital-2.png",
    },
    {
        name: "BRAC Health Program",
        logo: "https://i.ibb.co/jJpK6PZ/brac.png",
    },
];

const Partners = () => {
    return (
        <section className="py-20 bg-base-100">
            <div className="max-w-7xl mx-auto px-6">

                {/* Section Title */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Our Trusted Partners
                    </h2>
                    <p className="mt-3 text-base-content/70">
                        Working together with hospitals and organizations to save lives
                    </p>
                </div>

                {/* Partners Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
                    {partners.map((partner, index) => (
                        <div
                            key={index}
                            className="card bg-base-200 shadow hover:shadow-lg transition"
                        >
                            <div className="card-body items-center text-center">
                                <img
                                    src={partner.logo}
                                    alt={partner.name}
                                    className="h-16 object-contain mb-4"
                                />
                                <h3 className="font-semibold text-sm">
                                    {partner.name}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Partners;
