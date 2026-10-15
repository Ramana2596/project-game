// ============================================================
// Component : ChecklistDialog (Refactored)
// Purpose   : Display pre-submission checklist using dynamic array
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
import { CheckCircleOutline } from "@mui/icons-material";
import { colors } from "../../../ux/styles";

export default function ChecklistDialog({ open, onClose }) {
  // Checklist items in an array
  const checklistItems = [
    "Verify production volume target matches forecast.",
    "Confirm unit selling price is set within allowed range.",
    "Check raw material inventory buffer levels.",
    "Ensure team consensus on submitted values.",
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
        Pre-Submission Checklist
      </DialogTitle>
      <DialogContent dividers>
        <List disablePadding>
          {checklistItems.map((item, idx) => (
            <ListItem key={idx} sx={{ px: 0 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <CheckCircleOutline
                  sx={{
                    color: colors.success,
                    fontSize: 20,
                  }}
                />
              </ListItemIcon>
              <ListItemText primary={item} />
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
          Got It
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ChecklistDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
