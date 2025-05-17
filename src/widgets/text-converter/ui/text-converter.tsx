import React, { useState } from "react";
import { TextInput } from "@/features/text-input";
import { Button } from "@/shared/ui/button";
import { useGeneratePDFMutation } from "../api/generate-pdf-mutation";
import { PdfPreview } from "@/features/pdf-preview";
import { cn } from "@/shared/lib";
import { toast } from "react-toastify";
import { useConvertingHistory } from "@/entities/pdfFile";

const TextConverter: React.FC = () => {
  const [text, setText] = useState("");
  const { saveFile } = useConvertingHistory();

  const {
    data: pdfDoc,
    isPending,
    mutate,
  } = useGeneratePDFMutation({
    onSuccess: (pdfFile: string) => {
      toast.success("Текст успішно конвертовано!");
      saveFile(pdfFile, text);
      setText("");
    },
  });

  const onConvertToPDFClick = () => {
    mutate(text);
  };

  const isButtonDisabled = isPending || !text.trim();

  return (
    <section>
      <TextInput onTextChange={setText} text={text} />
      <Button
        onClick={onConvertToPDFClick}
        disabled={isButtonDisabled}
        size="lg"
        className={cn(
          "mx-auto my-2 block lg:my-4 bg-rose-600 hover:bg-rose-700 text-white ",
          isButtonDisabled ? "cursor-not-allowed" : "cursor-pointer"
        )}
      >
        Конвертувати в PDF
      </Button>
      {pdfDoc && (
        <>
          <h2 className="text-lg text-center font-semibold my-3">
            Ваш файл доступний до перегляду:
          </h2>
          <PdfPreview pdfDoc={pdfDoc} />
        </>
      )}
    </section>
  );
};

export { TextConverter };
