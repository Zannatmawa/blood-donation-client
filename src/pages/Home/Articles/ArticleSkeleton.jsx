export default function FeaturedArticlesSkeleton() {
    return (
        <section className="bg-[#FFF9F6] py-20">
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-12">
                    <div className="h-8 w-56 bg-gray-200 rounded mx-auto mb-3 animate-pulse"></div>
                    <div className="h-4 w-72 bg-gray-200 rounded mx-auto animate-pulse"></div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[...Array(4)].map((_, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-md overflow-hidden"
                        >
                            <div className="w-full h-48 bg-gray-200 animate-pulse"></div>

                            <div className="p-6 space-y-3">
                                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-5 w-full bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-5 w-4/5 bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
