import dmch from "../../../assets/partners/dh.png";
import redCrescent from "../../../assets/partners/red.jpg";
import squareHospital from "../../../assets/partners/square.png";
import brac from "../../../assets/partners/dh.png";

const partners = [
    {
        name: "Dhaka Medical College Hospital",
        logo: dmch,
    },
    {
        name: "Bangladesh Red Crescent Society",
        logo: redCrescent,
    },
    {
        name: "Square Hospital",
        logo: squareHospital,
    },
    {
        name: "BRAC Health Program",
        logo: brac,
    },
];

const Partners = () => {
    return (
        <section className="py-20 my-10 bg-[#FFF9F6]">
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-14">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#D32F2F]">
                        Our Trusted Partners
                    </h2>
                    <p className="mt-3 text-gray-600 max-w-xl mx-auto">
                        Collaborating with leading hospitals and organizations to save lives.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
                    {partners.map((partner, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-md hover:shadow-xl transition hover:ring-2 hover:ring-[#D32F2F]/40"
                        >
                            <div className="w-full h-24 flex items-center justify-center mb-4">
                                <img
                                    src={partner.logo}
                                    alt={partner.name}
                                    className="h-20 object-contain"
                                />
                            </div>

                            <h3 className="font-semibold text-sm text-gray-700">
                                {partner.name}
                            </h3>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Partners;
