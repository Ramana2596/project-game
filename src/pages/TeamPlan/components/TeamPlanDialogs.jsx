
// ============================================================
// Component: TeamPlanDialogs
// Module: TeamPlan
// Purpose: Confirmations for Cancel and for changing tab with unsaved data
// ============================================================

import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { colors, buttonStyle, masterTypo } from "../../../ux/styles";
import { CATEGORY_ICON } from "../constants/categoryIcon.js";

// Destructive action styles
const DANGER_SX = {
  ...buttonStyle.primary,
  ...buttonStyle.compact,
  background: colors.error,
  boxShadow: "none",
  "&:hover": {
    background: colors.error,
    boxShadow: "none",
  },
};

const DANGER_TEXT_SX = {
  ...buttonStyle.text,
  color: colors.error,
  "&:hover": {
    background: "transparent",
    color: colors.error,
  },
};

const TITLE_SX = { ...masterTypo.h5, color: colors.title };
const TEXT_SX = { ...masterTypo.body2, color: colors.body };

const tabLabel = (key) => CATEGORY_ICON?.[key]?.label || key;

// dialog: Cancel, edit, Discard, Save, Continue
export default function TeamPlanDialogs({
  dialog,
  currentTab,
  saving,
  calculating,
  onClose,
  onConfirmCancel,
  onDiscardAndContinue,
  onSaveAndContinue,
}) {
  return (
    <>
      {/* Cancel confirmation */}
      <Dialog
        open={dialog?.type === "cancel"}
        onClose={onClose}
        aria-labelledby="cancel-dialog-title"
      >
        <DialogTitle id="cancel-dialog-title" sx={TITLE_SX}>
          Discard unsaved changes?
        </DialogTitle>

        <DialogContent>
          <DialogContentText sx={TEXT_SX}>
            Your edits on {tabLabel(currentTab)} will be lost and the last saved values
            restored.
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} sx={buttonStyle.text}>
            Keep editing
          </Button>

          <Button onClick={onConfirmCancel} variant="contained" sx={DANGER_SX}>
            Discard
          </Button>
        </DialogActions>
      </Dialog>

      {/* Tab change with unsaved changes */}
      <Dialog
        open={dialog?.type === "tab"}
        onClose={saving ? undefined : onClose}
        aria-labelledby="tab-dialog-title"
      >
        <DialogTitle id="tab-dialog-title" sx={TITLE_SX}>
          Unsaved changes
        </DialogTitle>

        <DialogContent>
          <DialogContentText sx={TEXT_SX}>
            {tabLabel(currentTab)} has unsaved changes. Save them before opening{" "}
            {tabLabel(dialog?.tab)}?
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} disabled={saving} sx={buttonStyle.text}>
            Stay
          </Button>

          <Button
            onClick={onDiscardAndContinue}
            disabled={saving}
            sx={DANGER_TEXT_SX}
          >
            Discard and continue
          </Button>

          <Button
            onClick={onSaveAndContinue}
            disabled={saving || calculating}
            variant="contained"
            sx={{ ...buttonStyle.primary, ...buttonStyle.compact }}
          >
            {saving ? "Saving…" : "Save and continue"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
