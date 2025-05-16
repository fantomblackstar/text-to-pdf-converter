import React, { type ChangeEvent } from "react";
import { DragAndDropInput } from "./drag-and-drop-input";

interface TextInputProps {
  onTextChange: (text: string) => void;
  text: string;
}

const TextInput: React.FC<TextInputProps> = ({ onTextChange, text }) => {
  const onDropFile = (acceptedFiles: File[]) => {
    const file = acceptedFiles?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        onTextChange(text.trim());
      };
      reader.readAsText(file);
    }
  };

  const onTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onTextChange(event.target.value);
  };

  return (
    <div className="h-[60vh] md:h-80 xl:h-[31.25rem] w-full rounded-lg relative bg-blue-600 p-2 lg:p-4 mb-4 lg:mb-8">
      <textarea
        value={text}
        onChange={onTextareaChange}
        className="w-full h-full border-2 border-dashed bg-blue-800 rounded-lg resize-none outline-none text-white p-4 text-lg"
        placeholder="Введіть текст тут..."
      />
      {text.length === 0 && <DragAndDropInput onDrop={onDropFile} />}
    </div>
  );
};

export { TextInput };
