import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES_PATHS } from "@/shared/configs";

const HomePage = lazy(() => import("./home"));
const HistoryPage = lazy(() => import("./history"));

export const Routing = () => {
  return (
    <Suspense fallback={<p className="text-center">Loading...</p>}>
      <Routes>
        <Route path={ROUTES_PATHS.HOME} element={<HomePage />} />
        <Route path={ROUTES_PATHS.HISTORY} element={<HistoryPage />} />
        <Route path="*" element={<Navigate to={ROUTES_PATHS.HOME} replace />} />
      </Routes>
    </Suspense>
  );
};
