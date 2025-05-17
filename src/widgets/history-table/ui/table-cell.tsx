import React from "react";
import { cn } from "@/shared/lib";

interface TableCellProps {
  children: React.ReactNode;
  className?: string;
}

const TableCell: React.FC<TableCellProps> = ({ children, className }) => {
  return (
    <td className={cn("px-4 py-2 border-b h-9", className)}>{children}</td>
  );
};

export { TableCell };
