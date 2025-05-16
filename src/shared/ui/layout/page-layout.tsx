import React from "react";
import { Header } from "./header";

const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="container py-10 lg:py-20">{children}</main>
    </>
  );
};

export { PageLayout };
