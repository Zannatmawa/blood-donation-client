import { useParams } from "react-router";

const articles = [
    {
        id: 1,
        title: "Why Blood Donation Saves Lives",
        date: "Sep 10, 2025",
        image: "https://images.pexels.com/photos/12193105/pexels-photo-12193105.jpeg",
        content: [
            "Blood donation is one of the most powerful acts of humanity. Every year, millions of patients depend on donated blood for survival during surgeries, accidents, childbirth, and chronic illnesses.",
            "A single blood donation can save up to three lives. Donated blood is separated into red cells, plasma, and platelets, each serving different medical purposes.",
            "In emergency situations such as road accidents or natural disasters, having readily available blood can mean the difference between life and death.",
            "Regular blood donation helps maintain a stable blood supply and ensures hospitals are prepared for unexpected emergencies.",
            "By donating blood, you become part of a life-saving chain that connects donors, healthcare professionals, and patients in need."
        ]
    },
    {
        id: 2,
        title: "Who Can Donate Blood? Eligibility Explained",
        date: "Sep 09, 2025",
        image: "https://images.pexels.com/photos/4531306/pexels-photo-4531306.jpeg",
        content: [
            "Most healthy adults are eligible to donate blood, but there are certain criteria to ensure safety for both donors and recipients.",
            "Generally, donors must be between 18 and 60 years old, weigh at least 50 kilograms, and be in good physical health.",
            "You should not donate blood if you have active infections, severe anemia, or certain chronic medical conditions.",
            "Before donating, medical staff will check your hemoglobin level, blood pressure, and overall health condition.",
            "If you are unsure about your eligibility, consulting a healthcare professional is always recommended."
        ]
    },
    {
        id: 3,
        title: "Common Myths About Blood Donation",
        date: "Sep 08, 2025",
        image: "https://images.pexels.com/photos/5340267/pexels-photo-5340267.jpeg",
        content: [
            "Many people avoid blood donation due to myths and misinformation that are not scientifically true.",
            "One common myth is that blood donation causes weakness. In reality, the human body replaces donated blood within a few weeks.",
            "Another misconception is that blood donation is painful. Most donors experience only a brief pinprick sensation.",
            "Blood donation does not cause long-term health problems when done according to medical guidelines.",
            "Understanding the facts helps remove fear and encourages more people to donate blood."
        ]
    },
    {
        id: 4,
        title: "How Blood Donation Helps Emergency Patients",
        date: "Sep 07, 2025",
        image: "https://images.pexels.com/photos/7653095/pexels-photo-7653095.jpeg",
        content: [
            "Emergency patients often require blood immediately due to accidents, surgeries, or internal bleeding.",
            "In such situations, there is no time to find family donors, making voluntary blood donation essential.",
            "Hospitals rely on blood banks and donation centers to provide life-saving blood within minutes.",
            "Rare blood groups are especially critical during emergencies, highlighting the importance of diverse donors.",
            "Your voluntary donation ensures that emergency patients receive timely treatment and a chance to survive."
        ]
    }
];

export default function ArticleDetails() {
    const { id } = useParams();
    const article = articles.find(a => a.id === Number(id));

    if (!article) return null;

    return (
        <section className="py-20 max-w-4xl mx-auto px-6">
            <img
                src={article.image}
                alt={article.title}
                className="w-full h-80 object-cover rounded-xl mb-6"
            />

            <p className="text-sm text-gray-500 mb-2">{article.date}</p>
            <h1 className="text-3xl font-bold mb-6">{article.title}</h1>

            <div className="space-y-4 text-gray-700 leading-relaxed">
                {article.content.map((para, index) => (
                    <p key={index}>{para}</p>
                ))}
            </div>
        </section>
    );
}
