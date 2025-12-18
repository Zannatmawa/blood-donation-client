const articles = [
    {
        id: 1,
        title: "Why Blood Donation Saves Lives",
        date: "Sep 10, 2025",
        image: "https://images.pexels.com/photos/12193105/pexels-photo-12193105.jpeg",
    },
    {
        id: 2,
        title: "Who Can Donate Blood? Eligibility Explained",
        date: "Sep 09, 2025",
        image: "https://images.pexels.com/photos/4531306/pexels-photo-4531306.jpeg",
    },
    {
        id: 3,
        title: "Common Myths About Blood Donation",
        date: "Sep 08, 2025",
        image: "https://images.pexels.com/photos/5340267/pexels-photo-5340267.jpeg",
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
