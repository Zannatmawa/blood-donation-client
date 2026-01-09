import { useState } from "react";

export default function PaginationDots({ totalPages, currentPage, onPageChange }) {
    const [selected, setSelected] = useState(currentPage || 1);

    const handleSelect = (page) => {
        setSelected(page);
        onPageChange(page);
    };

    return (
        <div className="join mt-5 mb-5 flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
                <input
                    key={i}
                    type="radio"
                    name="pagination"
                    aria-label={`Page ${i + 1}`}
                    className="join-item btn btn-square border-[#D32F2F] checked:bg-[#D32F2F] checked:text-white"
                    checked={selected === i + 1}
                    onChange={() => handleSelect(i + 1)}
                />
            ))}
        </div>
    );
}
