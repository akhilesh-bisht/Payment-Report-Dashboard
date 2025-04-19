"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "./Icons";

function PaginationUI() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // Total number of pages, can be dynamic as needed

  const generatePagination = () => {
    let pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // If total pages are less than or equal to 5, show all pages
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      // Show first 5 pages and last page, with ellipses in between
      if (currentPage <= 3) {
        pages = [1, 2, 3, 4, 5, "...", totalPages];
      } else if (currentPage >= totalPages - 2) {
        pages = [
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else {
        pages = [
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        ];
      }
    }
    return pages;
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="flex items-start justify-start gap-2">
      {/* Previous Button */}
      <button
        className="p-1 rounded border disabled:opacity-50"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <ChevronLeft className="w-5 h-5 text-gray-500" />
      </button>

      {/* Page Numbers */}
      {generatePagination().map((page, index) => (
        <span key={index} className="flex items-start">
          {page === "..." ? (
            <span className="px-2 text-sm">...</span>
          ) : (
            <button
              className={`w-8 h-8 text-sm rounded ${
                currentPage === page
                  ? " text-red-400 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          )}
        </span>
      ))}

      {/* Next Button */}
      <button
        className="p-1 rounded border disabled:opacity-50"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <ChevronRight className="w-5 h-5 text-gray-500" />
      </button>
    </div>
  );
}

export default PaginationUI;
