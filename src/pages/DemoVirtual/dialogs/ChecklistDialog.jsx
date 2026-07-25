// ============================================================
// Component : ChecklistDialog
// Module    : Demo Virtual Simulation
// Purpose   : Display the pre-submission checklist before
//             simulation decisions are finalized.
//
// AI Tags:
// - Submission Checklist
// - Learning Guidance
// - Decision Validation
// - Enterprise Dialog
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

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------

export default function ChecklistDialog({ open, onClose }) {
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
                    <ListItem sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircleOutline
                                sx={{
                                    color: colors.success,
                                    fontSize: 20,
                                }}
                            />
                        </ListItemIcon>
                        <ListItemText primary="Verify production volume target matches forecast." />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircleOutline
                                sx={{
                                    color: colors.success,
                                    fontSize: 20,
                                }}
                            />
                        </ListItemIcon>
                        <ListItemText primary="Confirm unit selling price is set within allowed range." />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircleOutline
                                sx={{
                                    color: colors.success,
                                    fontSize: 20,
                                }}
                            />
                        </ListItemIcon>
                        <ListItemText primary="Check raw material inventory buffer levels." />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircleOutline
                                sx={{
                                    color: colors.success,
                                    fontSize: 20,
                                }}
                            />
                        </ListItemIcon>
                        <ListItemText primary="Ensure team consensus on submitted values." />
                    </ListItem>
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