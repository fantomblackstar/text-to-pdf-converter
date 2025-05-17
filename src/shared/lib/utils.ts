import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatDate = (date: string) => {
  const parsedDate = dayjs(date);
  return parsedDate.format("DD.MM.YYYY HH:mm:ss");
};
