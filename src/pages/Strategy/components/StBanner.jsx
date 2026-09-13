// Component: StBanner — compact status banner (info/error/success/warning)
// Purpose: single-line message row using brand tokens, not MUI Alert defaults
// Author/Version: OpsMgt UX Lab / v1.0

import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { colors, masterTypo } from "../../../ux/styles";

const ICONS = {
  info: InfoIcon,
  error: ErrorOutlineIcon,
  success: CheckCircleOutlineIcon,
  warning: WarningAmberIcon,
};

const MESSAGE_WIDTH = 400;
const MESSAGE_HEIGHT = 36;

const StBanner = ({ severity = "info", children }) => {
  const tone = colors[severity] || colors.info;
  const Icon = ICONS[severity] || InfoIcon;

  return (
    <Box
      title={typeof children === "string" ? children : undefined}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.75,
        width: MESSAGE_WIDTH,
        height: MESSAGE_HEIGHT,
        flexShrink: 0,
        borderRadius: 2,
        px: 1.25,
        overflow: "hidden",
        background: `${tone}0D`,
        border: `1px solid ${tone}33`,
      }}
    >
      <Box
        sx={{
          width: 20,
          height: 20,
          minWidth: 20,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `${tone}1A`,
          "& svg": { fontSize: 13, color: tone },
        }}
      >
        <Icon />
      </Box>
      <Typography
        sx={{
          ...masterTypo.body2,
          color: colors.body,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {children}
      </Typography>
    </Box>
  );
};

StBanner.propTypes = {
  severity: PropTypes.oneOf(["info", "error", "success", "warning"]),
  children: PropTypes.node.isRequired,
};

export { MESSAGE_WIDTH, MESSAGE_HEIGHT };

export default StBanner;