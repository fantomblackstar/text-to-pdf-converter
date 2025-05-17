import { useState, useEffect } from "react";

import type { PdfFile } from "../model/pdfFile";

const LOCAL_STORAGE_KEY = "convertingHistory";

let globalFiles: PdfFile[] = [];
type ListenerFunction = (files: PdfFile[]) => void;
let listeners: ListenerFunction[] = [];

const notifyListeners = () => {
  listeners.forEach((listener) => listener(globalFiles));
};

const useConvertingHistory = () => {
  const [files, setFiles] = useState<PdfFile[]>(() => {
    if (globalFiles.length > 0) {
      return globalFiles;
    }

    const storedFiles = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedFiles) {
      const parsedFiles = JSON.parse(storedFiles);
      globalFiles = parsedFiles || [];
      return globalFiles;
    }
    return [];
  });

  useEffect(() => {
    const listener = (newFiles: PdfFile[]) => {
      setFiles([...newFiles]);
    };

    listeners.push(listener);

    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }, []);

  const saveFile = (fileBase64: string, text: string) => {
    if (!fileBase64) return;

    const newFileToSave: PdfFile = {
      createdAt: new Date().toISOString(),
      base64: fileBase64,
      shortText: text.substring(0, 10).trim(),
    };

    const filesToSave =
      globalFiles.length > 20
        ? [...globalFiles.slice(1), newFileToSave]
        : [...globalFiles, newFileToSave];

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filesToSave));
    globalFiles = filesToSave;
    notifyListeners();
  };

  return { files, saveFile };
};

export { useConvertingHistory };
