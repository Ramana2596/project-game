// === HelpCenterCard | Demo Virtual Simulation ===
// Purpose: Display context-sensitive help actions for the current simulation stage.
// Tags: Help Center, Learning Assistance, Enterprise Dashboard, Context Aware Support

import React from "react";
import PropTypes from "prop-types";
import { Paper, Stack, Typography, Button } from "@mui/material";
import { HelpCenterOutlined } from "@mui/icons-material";
import { buttonStyle, cardStyle, colors } from "../../../ux/styles";

export default function HelpCenterCard({ helpCenterActions, onHelpActionClick }) {
  return (
    <Paper elevation={0} sx={{ ...cardStyle.primary, p: 2.5, height: "auto" }}>
      {/* Heading */}
      <Stack direction="row" alignItems="center" spacing={1} mb={1.5}>
        <HelpCenterOutlined sx={{ fontSize: 18, color: colors.subtitle }} />
        <Typography
          sx={{
            fontSize: "0.80rem",
            fontWeight: 800,
            letterSpacing: "0.05em",
            color: colors.subtitle,
            textTransform: "uppercase",
          }}
        >
          Help Center
        </Typography>
      </Stack>
      {/* Actions */}
      <Stack spacing={1.25}>
        {helpCenterActions.map((action) => {
          const IconComp = action.icon;
          return (
            <Button
              key={action.key}
              fullWidth
              startIcon={<IconComp sx={{ fontSize: 18 }} />}
              onClick={() => onHelpActionClick(action.key)}
              sx={{
                ...buttonStyle.secondary,
                justifyContent: "flex-start",
                borderRadius: 2,
                height: 38,
                px: 2,
                fontSize: "0.85rem",
                fontWeight: 700,
              }}
            >
              {action.label}
            </Button>
          );
        })}
      </Stack>
    </Paper>
  );
}

HelpCenterCard.propTypes = {
  helpCenterActions: PropTypes.array.isRequired,
  onHelpActionClick: PropTypes.func.isRequired,
};
