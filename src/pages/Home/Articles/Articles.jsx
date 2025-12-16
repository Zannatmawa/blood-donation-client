const articles = [
    {
        id: 1,
        title: "Why Blood Donation Saves Lives",
        date: "Sep 10, 2025",
        image: "https://i.ibb.co/9rPZB7J/blood-donation.jpg",
    },
    {
        id: 2,
        title: "Who Can Donate Blood? Eligibility Explained",
        date: "Sep 09, 2025",
        image: "https://i.ibb.co/7yC1p3M/blood-test.jpg",
    },
    {
        id: 3,
        title: "Common Myths About Blood Donation",
        date: "Sep 08, 2025",
        image: "https://i.ibb.co/jZzF2QK/blood-bank.jpg",
    },
];

export default function FeaturedArticles() {
    return (
        <section className="bg-[#FFF9F6] py-20">
            <div className="max-w-6xl mx-auto px-6">

                {/* Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Featured Articles
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Learn more about blood donation and saving lives
                    </p>
                </div>

                {/* Articles */}
                <div className="grid md:grid-cols-3 gap-8">
                    {articles.map((article) => (
                        <div
                            key={article.id}
                            className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
                        >
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-48 object-cover"
                            />

                            <div className="p-6">
                                <p className="text-sm text-gray-500 mb-2">
                                    {article.date}
                                </p>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {article.title}
                                </h3>

                                <button className="mt-4 text-red-600 font-semibold hover:underline">
                                    Read More →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
