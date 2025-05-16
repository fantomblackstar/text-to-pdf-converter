import React from "react";
import { PageLayout } from "@/shared/ui/layout";
import { TextConverter } from "@/widgets/text-converter/ui/text-converter";

const HomePage: React.FC = () => {
  return (
    <PageLayout>
      <TextConverter />
    </PageLayout>
  );
};

export default HomePage;
