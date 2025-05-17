import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { generatePdf } from "./actions";
import { toast } from "react-toastify";

export const useGeneratePDFMutation = (
  options?: UseMutationOptions<string, unknown, string, unknown>
) => {
  return useMutation({
    mutationFn: generatePdf,
    mutationKey: ["generatePdf"],
    onError: (error) => {
      console.error(error);
      toast.error("Помилка при конвертації тексту. Спробуйте ще раз.");
    },
    ...options,
  });
};
