import { useConvertingHistory } from "@/entities/pdfFile";
import { formatDate } from "@/shared/lib";
import { Button } from "@/shared/ui/button";
import { Download, Eye } from "lucide-react";
import React, { useState } from "react";
import type { PdfFile } from "@/entities/pdfFile";
import { PreviewDialog } from "./preview-dialog";
import { TableCell } from "./table-cell";

interface HistoryTableProps {
  maxFilesToShow?: number;
}

const HistoryTable: React.FC<HistoryTableProps> = ({
  maxFilesToShow = Number.MAX_SAFE_INTEGER,
}) => {
  const { files } = useConvertingHistory();
  const [previewFile, setPreviewFile] = useState<PdfFile | null>(null);

  const onClosePreview = () => {
    setPreviewFile(null);
  };

  const filesToDisplay = [...files].reverse().slice(0, maxFilesToShow);

  return (
    <section>
      <h2 className="text-lg font-semibold my-3">Історія конвертацій</h2>
      <div className="overflow-x-auto w-full">
        <table className="w-full border-collapse table-auto">
          <thead>
            <tr className="bg-gray-100">
              <TableCell className="w-10">#</TableCell>
              <TableCell>Текст</TableCell>
              <TableCell>Дата Конвертації</TableCell>
              <TableCell className="text-right">Дії</TableCell>
            </tr>
          </thead>
          <tbody>
            {filesToDisplay.map((pdfFile, indx) => (
              <tr
                key={`HistoryRow ${indx}`}
                className="odd:bg-white even:bg-gray-100 text-base"
              >
                <TableCell className="w-max">{files.length - indx}</TableCell>
                <TableCell className="w-max">{pdfFile.shortText}...</TableCell>
                <TableCell>{formatDate(pdfFile.createdAt)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      className="h-full px-3"
                      onClick={() => setPreviewFile(pdfFile)}
                      title="Перегляд"
                    >
                      <Eye />
                    </Button>
                    <Button
                      asChild
                      className="text-sm h-full px-3 bg-blue-500"
                      title="Завантажити"
                    >
                      <a
                        href={pdfFile.base64}
                        download
                        className="flex items-center"
                      >
                        <Download />
                      </a>
                    </Button>
                  </div>
                </TableCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {files.length > maxFilesToShow && (
        <p className="text-center text-sm text-gray-500 mt-2">
          Перегляньте усю історію конвертацій{" "}
          <a href="#" className="text-blue-500 underline">
            тут
          </a>
        </p>
      )}
      <PreviewDialog pdfFile={previewFile} onClose={onClosePreview} />
    </section>
  );
};

export { HistoryTable };
