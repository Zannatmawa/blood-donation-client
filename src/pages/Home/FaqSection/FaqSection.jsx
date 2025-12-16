import { useState } from "react";

const faqs = [
    {
        question: "Who can donate blood?",
        answer:
            "Any healthy person aged between 18 and 60 years and weighing at least 50kg can donate blood."
    },
    {
        question: "How often can I donate blood?",
        answer:
            "Men can donate every 3 months and women every 4 months, depending on health conditions."
    },
    {
        question: "Is blood donation safe?",
        answer:
            "Yes. Blood donation is completely safe. New, sterile equipment is used for every donor."
    },
    {
        question: "How long does the donation process take?",
        answer:
            "The entire process usually takes 30–45 minutes, including registration and rest time."
    },
    {
        question: "Can I donate blood while taking medication?",
        answer:
            "Some medications may restrict donation. It is best to consult a doctor before donating."
    }
];

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <section className="bg-red-50 py-20">
            <div className="max-w-4xl mx-auto px-6">

                {/* Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Everything you need to know about blood donation
                    </p>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-md"
                        >
                            <button
                                onClick={() =>
                                    setActiveIndex(activeIndex === index ? null : index)
                                }
                                className="w-full flex justify-between items-center p-5 text-left"
                            >
                                <span className="font-semibold text-gray-800">
                                    {faq.question}
                                </span>
                                <span className="text-red-600 text-xl">
                                    {activeIndex === index ? "−" : "+"}
                                </span>
                            </button>

                            {activeIndex === index && (
                                <div className="px-5 pb-5 text-gray-600">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
