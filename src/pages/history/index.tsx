import React from "react";
import { PageLayout } from "@/shared/ui/layout";

import { HistoryTable } from "@/widgets/history-table";

const HistoryPage: React.FC = () => {
  return (
    <PageLayout>
      <HistoryTable />
    </PageLayout>
  );
};

export default HistoryPage;
