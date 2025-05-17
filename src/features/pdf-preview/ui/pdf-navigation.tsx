import React from "react";
import { twMerge } from "tailwind-merge";

import { ArrowIcon } from "./arrow-icon";
import { Button } from "@/shared/ui/button";

interface PDFNavigationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  pageCount: number;
}

const PdfNavigation: React.FC<PDFNavigationProps> = ({
  currentPage,
  onPageChange,
  pageCount,
}) => {
  const onPrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const onNextClick = () => {
    if (currentPage < pageCount) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center gap-0.5 h-10 flex-wrap">
      <Button
        onClick={onPrevClick}
        disabled={currentPage === 1}
        className="px-1 h-full py-0"
        variant="ghost"
      >
        <ArrowIcon className="rotate-180" />
      </Button>
      {Array.from({ length: pageCount }, (_, index) => (
        <Button
          key={index}
          className={twMerge(
            "px-4 h-full py-0 border border-blue-700 text-blue-700",
            currentPage === index + 1 && "bg-blue-700 text-white"
          )}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </Button>
      ))}
      <Button
        onClick={onNextClick}
        disabled={currentPage === pageCount}
        className="h-full px-1 py-0"
        variant="ghost"
      >
        <ArrowIcon />
      </Button>
    </div>
  );
};

export { PdfNavigation };
