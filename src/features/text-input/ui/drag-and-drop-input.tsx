import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib";
import { FileIcon } from "./file-icon";

interface DragAndDropInputProps {
  onDrop: (acceptedFiles: File[]) => void;
}

const DragAndDropInput: React.FC<DragAndDropInputProps> = ({ onDrop }) => {
  const onDropCallback = useCallback(
    (acceptedFiles: File[]) => {
      onDrop(acceptedFiles);
    },
    [onDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "text/plain": [".txt"],
    },
    onDrop: onDropCallback,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        `flex flex-col gap-2 lg:gap-4 items-center justify-center p-4 md:p-8 border-2 border-dashed rounded-lg transition-colors duration-200 opacity-70 text-gray-100 py-8 md:py-4 mb-3 lg:mb-5 min-w-max md:w-1/3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`,
        isDragActive ? "border-white bg-blue-500" : "border-gray-50"
      )}
    >
      <input {...getInputProps()} />
      <FileIcon className="size-10" />
      <p className="text-sm sm:text-base text-center">
        Перетягніть .txt файл сюди
      </p>
      <Button className="bg-gray-100 hover:bg-white/75 text-gray-700 cursor-pointer">
        Вибрати файл
      </Button>
    </div>
  );
};

export { DragAndDropInput };
