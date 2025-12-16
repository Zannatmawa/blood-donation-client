export default function ContactSection() {
    return (
        <section className="bg-base-300 py-16">
            <div className="max-w-6xl mx-auto px-6">
                {/* bg-linear-to-r from-red-900 to-red-900 */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>
                    <p className="text-gray-600 mt-2">
                        Have questions or need help? Get in touch with us.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">

                    {/* Contact Form */}
                    <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
                        <form className="space-y-5">

                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Message
                                </label>
                                <textarea
                                    rows="4"
                                    placeholder="Write your message"
                                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="bg-red-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-red-700 transition"
                            >
                                Send Message
                            </button>

                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col justify-center gap-6">
                        <div>
                            <h4 className="text-xl font-semibold text-gray-800">
                                Get in Touch
                            </h4>
                            <p className="text-gray-600 mt-2">
                                We are here to help and answer any questions you might have.
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-700 font-medium">📞 Phone</p>
                            <p className="text-gray-600">+880 1234-567890</p>
                        </div>

                        <div>
                            <p className="text-gray-700 font-medium">📧 Email</p>
                            <p className="text-gray-600">support@bloodbridge.com</p>
                        </div>

                        <div>
                            <p className="text-gray-700 font-medium">📍 Address</p>
                            <p className="text-gray-600">
                                Dhaka, Bangladesh
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
