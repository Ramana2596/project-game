// ============================================================
// Component: ReportWriter
// Module: DemoVirtual
// Purpose: Resolve and render registered UI/UX report components with props
// ============================================================

import React from "react";
import { componentList } from "../../../constants/globalConstants";

// Find registered component recursively by UI/UX ID.
function findComponentById(list, id) {
  for (const item of list) {
    if (item.id === id) return item.routeElement;
    if (item.children) {
      const found = findComponentById(item.children, id);
      if (found) return found;
    }
  }
  return null;
}

// Report writer component definition.
export default function ReportWriter({ uiId, reportContext = {} }) {
// Find the registered component by UI/UX ID.
  const selectedElement = findComponentById(componentList, uiId);
// Render the selected component with the provided report context as props.
  if (selectedElement) {
    return React.cloneElement(selectedElement, {
      ...reportContext,
      hideHeader: true,
      hideNavigation: true,
    });
  }

  return null;
}