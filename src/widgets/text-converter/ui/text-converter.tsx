import React, { useState } from "react";
import { TextInput } from "@/features/text-input";
import { Button } from "@/shared/ui/button";
import { useGeneratePDFMutation } from "../api/generate-pdf-mutation";
import { PdfPreview } from "@/features/pdf-preview";
import { cn } from "@/shared/lib";

const TextConverter: React.FC = () => {
  const [text, setText] = useState("");

  const { data: pdfDoc, isPending, mutate } = useGeneratePDFMutation();

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
      {pdfDoc && <PdfPreview pdfDoc={pdfDoc} />}
    </section>
  );
};

export { TextConverter };
