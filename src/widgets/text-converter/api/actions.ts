import { blobToBase64, streamToBlob } from "@/shared/lib";
import { ENV_VARIABLES } from "@/shared/configs";

export const postData = async (
  link: string,
  data: object
): Promise<Response> => {
  const body = JSON.stringify(data);

  const response = await fetch(link, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error posting data");
  }

  return response;
};

export const generatePdf = async (text: string): Promise<string> => {
  const postLink = `${ENV_VARIABLES.API_LINK}/create-pdf?apiKey=${ENV_VARIABLES.API_KEY}`;

  const res = await postData(postLink, { text });
  const pdfBblob = await streamToBlob(res.body as ReadableStream<Uint8Array>);
  return await blobToBase64(pdfBblob);
};
