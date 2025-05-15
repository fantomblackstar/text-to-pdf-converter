import React from "react";
import pdfIcon from "../../../shared/assets/pdf-icon.svg";

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg py-4">
      <div className="container flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src={pdfIcon} alt="PDF Icon" className="size-10" />
          <h1 className="text-white text-2xl font-bold">Text to PDF</h1>
        </div>
        <p className="text-white text-sm font-light italic">by VasylV</p>
      </div>
    </header>
  );
};

export { Header };
