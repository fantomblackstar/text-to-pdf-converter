import React, { useState } from "react";
import { TextInput } from "@/features/text-input";

const TextConverter: React.FC = () => {
  const [text, setText] = useState("");

  const onTextChange = (text: string) => {
    setText(text);
  };

  return (
    <section className="pt-10 lg:pt-20">
      <TextInput onTextChange={onTextChange} text={text} />
    </section>
  );
};

export { TextConverter };
