import React from "react";
import pdfIcon from "../../../shared/assets/pdf-icon.svg";
import { Link } from "react-router-dom";
import { ROUTES_PATHS } from "@/shared/configs";

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg py-4">
      <div className="container flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src={pdfIcon} alt="PDF Icon" className="size-10" />
          <Link
            to={ROUTES_PATHS.HOME}
            className="text-white text-2xl font-bold"
          >
            Text to PDF
          </Link>
        </div>
        <Link
          to={ROUTES_PATHS.HISTORY}
          className="text-white text-lg font-light italic"
        >
          Історія
        </Link>
      </div>
    </header>
  );
};

export { Header };
