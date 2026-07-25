// ============================================================
// Component : RulesDialog
// Module    : Demo Virtual Simulation
// Purpose   : Display stage-specific business rules and
//             decision constraints for the current stage.
//
// AI Tags:
// - Business Rules
// - Decision Guidance
// - Enterprise Dialog
// - Learning Assistance
// ============================================================

import React from "react";
import PropTypes from "prop-types";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    Typography,
} from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import { colors } from "../../../ux/styles";

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------

export default function RulesDialog({ open, onClose, currentStageName }) {
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
                <Stack spacing={2}>
                    <Box
                        sx={{
                            display: "flex",
                            gap: 1.5,
                            alignItems: "flex-start",
                        }}
                    >
                        <InfoOutlined
                            sx={{
                                color: colors.primary,
                                fontSize: 20,
                                mt: 0.2,
                            }}
                        />
                        <Typography
                            sx={{
                                fontSize: "0.88rem",
                                color: colors.body,
                            }}
                        >
                            Maximum budget allocation cannot exceed current available cash reserves.
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            gap: 1.5,
                            alignItems: "flex-start",
                        }}
                    >
                        <InfoOutlined
                            sx={{
                                color: colors.primary,
                                fontSize: 20,
                                mt: 0.2,
                            }}
                        />
                        <Typography
                            sx={{
                                fontSize: "0.88rem",
                                color: colors.body,
                            }}
                        >
                            Decisions are final once submitted and cannot be reversed after period advancement.
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            gap: 1.5,
                            alignItems: "flex-start",
                        }}
                    >
                        <InfoOutlined
                            sx={{
                                color: colors.primary,
                                fontSize: 20,
                                mt: 0.2,
                            }}
                        />
                        <Typography
                            sx={{
                                fontSize: "0.88rem",
                                color: colors.body,
                            }}
                        >
                            All required input fields must be populated to mark the stage complete.
                        </Typography>
                    </Box>
                </Stack>
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