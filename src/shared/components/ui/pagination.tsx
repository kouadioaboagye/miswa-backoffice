'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  isLoading = false 
}: PaginationProps) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); 
         i++) {
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

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2 py-4">
      {/* Flèche gauche */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        className="flex items-center justify-center p-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      
      {/* Pages */}
      <div className="flex items-center space-x-1">
        {getVisiblePages().map((page, index) => {
          if (page === '...') {
            return (
              <span key={index} className="px-2 text-gray-600">
                ...
              </span>
            );
          }
          
          const pageNumber = page as number;
          const isActive = pageNumber === currentPage;
          const isLastPage = pageNumber === totalPages && totalPages > 1;
          
          return (
            <button
              key={index}
              onClick={() => onPageChange(pageNumber)}
              disabled={isLoading}
              className={`
                flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium
                transition-colors duration-200
                ${isActive 
                  ? 'bg-green-500 text-white' 
                  : isLastPage 
                    ? 'bg-gray-100 border border-gray-300 text-gray-600 hover:bg-gray-200' 
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      
      {/* Flèche droite */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        className="flex items-center justify-center p-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Pagination;