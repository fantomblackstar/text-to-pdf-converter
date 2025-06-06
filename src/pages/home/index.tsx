import React from "react";
import { PageLayout } from "@/shared/ui/layout";

import { HistoryTable } from "@/widgets/history-table";
import { TextConverter } from "@/widgets/text-converter";

const HomePage: React.FC = () => {
  return (
    <PageLayout>
      <TextConverter />
      <HistoryTable maxFilesToShow={5} />
    </PageLayout>
  );
};

export default HomePage;
