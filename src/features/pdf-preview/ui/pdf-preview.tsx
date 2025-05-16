import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";
import { cn } from "@/shared/lib";
import { PdfNavigation } from "./pdf-navigation";

interface PdfPreviewProps {
  pdfDoc: string;
}

const PDF_OPTIONS = {
  cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
  standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts`,
};

const PdfPreview: React.FC<PdfPreviewProps> = ({ pdfDoc }) => {
  const [pagesCount, setPagesCount] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setPagesCount(numPages);
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <h2 className="text-lg font-semibold my-3">
        Ваш файл доступний до перегляду:
      </h2>
      <div
        className={cn("bg-blue-700 rounded-lg p-2 relative w-full md:w-max")}
      >
        <div className="w-full h-[70vh] md:h-[49.5rem] md:w-[38.25rem] overflow-auto">
          <Document
            file={pdfDoc}
            onLoadSuccess={onDocumentLoadSuccess}
            options={PDF_OPTIONS}
            className={"w-max overflow-auto"}
          >
            <Page key={`page_${pageNumber}`} pageNumber={pageNumber} />
          </Document>
        </div>
      </div>
      {pagesCount !== null && pagesCount > 0 && (
        <PdfNavigation
          currentPage={pageNumber}
          pageCount={pagesCount}
          onPageChange={setPageNumber}
        />
      )}
    </div>
  );
};

export { PdfPreview };
