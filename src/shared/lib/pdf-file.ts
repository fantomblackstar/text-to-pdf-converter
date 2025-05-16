export const streamToBlob = async (
  stream: ReadableStream<Uint8Array>
): Promise<Blob> => {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  let done = false;

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    if (value) {
      chunks.push(value);
    }
    done = doneReading;
  }

  return new Blob(chunks, { type: "application/pdf" });
};

export const blobToBase64 = async (blob: Blob): Promise<string> => {
  const base64url: string = await new Promise((r) => {
    const reader = new FileReader();
    reader.onload = () => r(reader.result as string);
    reader.readAsDataURL(blob);
  });

  return base64url;
};

export const formatISODate = (isoDate: string): string => {
  const strArray = isoDate.split("T");
  const date = strArray[0].split("-").reverse().join(".");
  const time = strArray[1].substring(0, 8);

  return `${date} ${time}`;
};
