// ============================================================
// Component : RulesDialog (Refactored)
// Purpose   : Display stage-specific business rules using dynamic array
// ============================================================

import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import { colors } from "../../../ux/styles";

export default function RulesDialog({ open, onClose, currentStageName }) {
  // Define rules in an array
  const rules = [
    "Maximum budget allocation cannot exceed current available cash reserves.",
    "Decisions are final once submitted and cannot be reversed after period advancement.",
    "All required input fields must be populated to mark the stage complete.",
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1,
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 800,
          fontSize: "1.1rem",
          color: colors.primary,
        }}
      >
        {currentStageName ? `${currentStageName} Rules` : "Stage Rules & Limits"}
      </DialogTitle>
      <DialogContent dividers>
        <List disablePadding>
          {rules.map((rule, idx) => (
            <ListItem key={idx} sx={{ px: 0 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <InfoOutlined
                  sx={{
                    color: colors.primary,
                    fontSize: 20,
                  }}
                />
              </ListItemIcon>
              <ListItemText primary={rule} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            textTransform: "none",
            borderRadius: 2,
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

RulesDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  currentStageName: PropTypes.string,
};
