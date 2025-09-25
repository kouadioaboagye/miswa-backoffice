import React from 'react';

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    className = ''
}) => {
    const getVisiblePages = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];

        for (
            let i = Math.max(2, currentPage - delta);
            i <= Math.min(totalPages - 1, currentPage + delta);
            i++
        ) {
            range.push(i);
        }

        if (currentPage - delta > 2) {
            rangeWithDots.push(1, '...');
        } else {
            rangeWithDots.push(1);
        }

        rangeWithDots.push(...range);

        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push('...', totalPages);
        } else if (totalPages > 1) {
            rangeWithDots.push(totalPages);
        }

        return rangeWithDots;
    };

    return (
        <div
            className={`flex items-center justify-center space-x-2 ${className}`}
        >
            {/* Bouton Précédent */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center justify-center w-10 h-10 rounded-full text-gray-600 hover:text-[#1EA64A] hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            </button>

            {/* Numéros de page */}
            {getVisiblePages().map((page, index) => (
                <React.Fragment key={index}>
                    {page === '...' ? (
                        <span className="px-2 text-gray-500">...</span>
                    ) : (
                        <button
                            onClick={() => onPageChange(page as number)}
                            className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${
                                currentPage === page
                                    ? 'bg-[#1EA64A] text-white'
                                    : 'text-gray-600 hover:text-[#1EA64A] hover:bg-gray-100'
                            }`}
                        >
                            {page}
                        </button>
                    )}
                </React.Fragment>
            ))}

            {/* Bouton Suivant */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center justify-center w-10 h-10 rounded-full text-gray-600 hover:text-[#1EA64A] hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </button>
        </div>
    );
};

export default Pagination;
