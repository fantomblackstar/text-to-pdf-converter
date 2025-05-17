import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import type { PdfFile } from "@/entities/pdfFile";
import { PdfPreview } from "@/features/pdf-preview";

interface PreviewDialogProps {
  pdfFile: PdfFile | null;
  onClose: () => void;
}

const PreviewDialog: React.FC<PreviewDialogProps> = ({ pdfFile, onClose }) => {
  if (!pdfFile) return null;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogHeader>
        <DialogTitle>Попередній перегляд</DialogTitle>
      </DialogHeader>
      <DialogContent className="sm:w-max sm:max-w-max pt-10 overflow-auto">
        <PdfPreview pdfDoc={pdfFile.base64} />
      </DialogContent>
    </Dialog>
  );
};

export { PreviewDialog };
