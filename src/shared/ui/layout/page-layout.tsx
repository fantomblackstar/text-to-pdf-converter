import React from "react";
import { Header } from "./header";
import { cn } from "@/shared/lib";

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, className }) => {
  return (
    <div className="min-h-screen pb-28 relative">
      <Header />
      <main className={cn("container pt-10 lg:pt-20", className)}>
        {children}
      </main>
      <footer className="container absolute bottom-0 left-0 right-0 flex items-center justify-between p-4">
        <p className="text-lg">@2025</p>
        <a
          href="https://github.com/fantomblackstar"
          className="text-lg ml-auto font-light italic"
        >
          by VasylV
        </a>
      </footer>
    </div>
  );
};

export { PageLayout };
