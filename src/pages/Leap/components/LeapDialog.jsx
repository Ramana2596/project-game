// ============================================================
// LEAP V1.1
// File : LeapDialog.jsx
// Purpose : Premium LEAP dialog container
// ============================================================

import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  Alert,
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { colors, semanticTypo } from "../../../ux/styles";
import useLeap from "../hooks/useLeap";
import LeapHeader from "./LeapHeader";
import LeapPanel from "./LeapPanel";
import LeapToolbar from "./LeapToolbar";

// ============================================================
// Component
// ============================================================

export default function LeapDialog({
  open,
  onClose,
  stageId,
  title = "LEAP",
}) {

  const {
    loading,
    error,
    grouped,
    availableTypes,
  } = useLeap(stageId);

  // Selected LEAP content type
  const [selectedType, setSelectedType] = useState("ALL");

  // Filter grouped content
  const filteredGrouped = useMemo(() => (
    selectedType === "ALL"
      ? grouped
      : {
          [selectedType]: grouped[selectedType] || [],
        }
  ), [grouped, selectedType]);

  // Check whether content exists
  const hasContent = Object.values(filteredGrouped)
    .some((items) => items?.length > 0);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: "hidden",
          minHeight: "72vh",
          maxHeight: "88vh",
          boxShadow: 12,
        },
      }}
    >

      {/* LEAP Header */}
      <LeapHeader
        title={title}
        stageName="Company Profile"
        stageDescription="Understand your company before making business decisions."
        onClose={onClose}
      />

      {/* LEAP Toolbar */}
      <LeapToolbar
        selectedType={selectedType}
        availableTypes={availableTypes}
        onTypeChange={setSelectedType}
      />

      {/* LEAP Content */}
      <DialogContent
        dividers
        sx={{
          p: 3,
          bgcolor: colors.backgroundDefault,
          overflowY: "auto",
        }}
      >

        {/* Loading */}
        {loading && (
          <Stack
            spacing={2}
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: 260 }}
          >
            <CircularProgress size={32} />
            <Typography sx={semanticTypo.bodyMedium}>
              Loading learning resources...
            </Typography>
          </Stack>
        )}

        {/* Error */}
        {!loading && error && (
          <Alert
            severity="error"
            sx={{ borderRadius: 2 }}
          >
            {error}
          </Alert>
        )}

        {/* Empty */}
        {!loading && !error && !hasContent && (
          <Paper
            elevation={0}
            sx={{
              p: 5,
              textAlign: "center",
              borderRadius: 3,
              border: `1px dashed ${colors.border}`,
              bgcolor: colors.backgroundPaper,
            }}
          >
            <Typography
              sx={{
                fontSize: 42,
                mb: 1,
              }}
            >
              📭
            </Typography>

            <Typography sx={semanticTypo.sectionTitle}>
              No learning resources available
            </Typography>

            <Typography
              sx={{
                ...semanticTypo.bodyMedium,
                mt: 1,
                color: colors.textSecondary,
              }}
            >
              Learning content has not yet been published for this stage.
            </Typography>
          </Paper>
        )}

        {/* Content */}
        {!loading && !error && hasContent && (
          <Box>
            <LeapPanel
              grouped={filteredGrouped}
              selectedType={selectedType}
            />
          </Box>
        )}

      </DialogContent>

    </Dialog>
  );
}

// ============================================================
// Component Props
// ============================================================

LeapDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  stageId: PropTypes.number.isRequired,
  title: PropTypes.string,
};