// ============================================================
// Component : ScreenAdapter
// Module    : Shared UI
// Purpose   : Lets one UI screen run both standalone and inside
//             ReportDrawer without duplicating headings or wrappers.
// Usage     : Host (ReportDrawer) wraps screens in ScreenHostProvider.
//             Screens use ScreenAdapter and ScreenTitle.
// ============================================================

import React, { createContext, useContext } from "react";
import { Box, Typography } from "@mui/material";
import { colors, layoutStyle, masterTypo } from "../ux/styles";

// True only when a host (e.g. ReportDrawer) already shows the header.
const ScreenHostContext = createContext(false);

// Host marker: wrap the rendered screen in the host component.
export function ScreenHostProvider({ children }) {
  return (
    <ScreenHostContext.Provider value={true}>
      {children}
    </ScreenHostContext.Provider>
  );
}

// Screen wrapper: full-page layout when standalone; Plain full-width container,when hosted
export function ScreenAdapter({ children }) {
  const hosted = useContext(ScreenHostContext);

  if (hosted) {
    return <Box sx={{ width: "100%" }}>{children}</Box>;
  }

  return (
    <Box sx={layoutStyle.root}>
      <Box sx={layoutStyle.pageContainer}>{children}</Box>
    </Box>
  );
}

// Screen title: shown standalone, hidden when the host already shows a header.
export function ScreenTitle({ title, subtitle }) {
  const hosted = useContext(ScreenHostContext);

  if (hosted) return null;

  return (
    <>
      <Typography
        component="h2"
        sx={{
          ...masterTypo.h3,
          color: colors.title,
          lineHeight: 1.2,
        }}
      >
        {title}
      </Typography>

      {subtitle && (
        <Typography
          sx={{
            ...masterTypo.body1,
            color: colors.subtitle,
            lineHeight: 1.3,
          }}
        >
          {subtitle}
        </Typography>
      )}
    </>
  );
}