import React from "react";
import { Header } from "./header";
import { cn } from "@/shared/lib";

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, className }) => {
  return (
    <>
      <Header />
      <main className={cn("container py-10 lg:py-20", className)}>
        {children}
      </main>
    </>
  );
};

export { PageLayout };
