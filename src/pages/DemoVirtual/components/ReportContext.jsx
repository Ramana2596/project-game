// ============================================================
// Component: ReportContext
// Module: DemoVirtual
// Purpose: Provide simulation context metadata across report drawer tree
// AI Tags: report-context, simulation-metadata, react-context
// ============================================================

import React, { createContext, useContext } from "react";

// Create context instance for report metadata storage.
const ReportContext = createContext(null);

// Provide simulation data context to child components.
export const ReportProvider = ({ data, children }) => {
  return (
    <ReportContext.Provider value={data}>
      {children}
    </ReportContext.Provider>
  );
};

// Custom hook to consume report context values.
export const useReport = () => useContext(ReportContext);