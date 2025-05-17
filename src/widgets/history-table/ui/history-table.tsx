import { useConvertingHistory } from "@/entities/pdfFile";
import { formatDate } from "@/shared/lib";
import { Button } from "@/shared/ui/button";
import { Download, Eye } from "lucide-react";
import React, { useState } from "react";
import type { PdfFile } from "@/entities/pdfFile";
import { PreviewDialog } from "./preview-dialog";
import { TableCell } from "./table-cell";
import { ROUTES_PATHS } from "@/shared/configs";
import { Link } from "react-router-dom";

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
    <section className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-primary">
        Історія конвертацій
      </h2>
      <div className="overflow-x-auto w-full">
        <table className="w-full border-collapse table-auto">
          <thead>
            <tr className="bg-blue-50 text-primary font-bold">
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
                className="odd:bg-white even:bg-blue-50 text-base hover:bg-blue-100 transition-colors"
              >
                <TableCell className="w-max">{files.length - indx}</TableCell>
                <TableCell className="w-max">{pdfFile.shortText}...</TableCell>
                <TableCell>{formatDate(pdfFile.createdAt)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-3">
                    <Button
                      className="h-9 px-3 bg-blue-400 hover:bg-blue-500 text-white"
                      onClick={() => setPreviewFile(pdfFile)}
                      title="Перегляд"
                    >
                      <Eye className="size-4" />
                    </Button>
                    <Button
                      asChild
                      className="h-9 px-3 bg-blue-600 hover:bg-blue-500 text-white"
                      title="Завантажити"
                    >
                      <a
                        href={pdfFile.base64}
                        download
                        className="flex items-center"
                      >
                        <Download className="size-4" />
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
        <Link
          to={ROUTES_PATHS.HISTORY}
          className="block w-fit mx-auto mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Переглянути всю історію
        </Link>
      )}
      <PreviewDialog pdfFile={previewFile} onClose={onClosePreview} />
    </section>
  );
};

export { HistoryTable };
