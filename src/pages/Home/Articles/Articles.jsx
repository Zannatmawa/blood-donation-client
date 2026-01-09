import { Link } from "react-router";
import FeaturedArticlesSkeleton from "./ArticleSkeleton";

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
    {
        id: 4,
        title: "How Blood Donation Helps Emergency Patients",
        date: "Sep 07, 2025",
        image: "https://images.pexels.com/photos/7653095/pexels-photo-7653095.jpeg",
    },
];

export default function FeaturedArticles() {
    const loading = false; // change to true to test skeleton

    if (loading) return <FeaturedArticlesSkeleton />;

    return (
        <section className="bg-[#FFF9F6] py-20 my-10">
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Featured Articles
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Learn more about blood donation and saving lives
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
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

                                <Link
                                    to={`/articleDetails/${article.id}`}
                                    className="inline-block mt-4 text-[#D32F2F] font-semibold hover:underline"
                                >
                                    Read More →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
