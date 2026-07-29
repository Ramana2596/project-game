// ============================================================
// Component : LeapCenter
// Module    : Demo Virtual
// Purpose   : Display LEAP learning content in right-side panel
// ============================================================

import React, { useState } from "react";
import PropTypes from "prop-types";

import {
  Paper,
  Stack,
  Typography,
  Chip,
  CircularProgress,
} from "@mui/material";

import {
  SchoolOutlined,
} from "@mui/icons-material";

import {
  cardStyle,
  colors,
} from "../../../ux/styles";

import LeapHeader from "./LeapHeader";
import LeapSection from "./LeapSection";
import useLeap from "../hooks/useLeap"; 

// ============================================================

export default function LeapCenter({
  stageNo,
  stageTitle,
  stagePurpose,
}) {

  // ----------------------------------------------------------
  // Load LEAP content directly here
  // ----------------------------------------------------------
  const {
    grouped,
    availableTypes,
    loading,
    error,
  } = useLeap(stageNo);

  // ----------------------------------------------------------
  // Selected LEAP Topic
  // ----------------------------------------------------------
  const [selectedType, setSelectedType] = useState(null);

  return (
    <Paper
      elevation={0}
      sx={{
        ...cardStyle.primary,
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >

      {/* -------------------------------------------------- */}
      {/* Header */}
      {/* -------------------------------------------------- */}

      <LeapHeader
        title="Learn & Help"
        stageName={stageTitle}
        icon={SchoolOutlined}
        onBack={
          selectedType
            ? () => setSelectedType(null)
            : null
        }
      />

      {/* -------------------------------------------------- */}
      {/* Loading */}
      {/* -------------------------------------------------- */}

      {loading && (
        <Stack alignItems="center" py={4}>
          <CircularProgress size={28} />
        </Stack>
      )}

      {/* -------------------------------------------------- */}
      {/* Error */}
      {/* -------------------------------------------------- */}

      {!loading && error && (
        <Typography
          color="error"
          variant="body2"
        >
          {error}
        </Typography>
      )}

      {/* -------------------------------------------------- */}
      {/* Topic Selection */}
      {/* -------------------------------------------------- */}

      {!loading &&
        !error &&
        selectedType === null &&
        availableTypes.length > 0 && (

          <Stack spacing={1}>

            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 700,
                color: colors.subtitle,
              }}
            >
              Select a Topic
            </Typography>

            <Stack
              direction="column"
              spacing={1}
            >
              {availableTypes.map(type => (
                <Chip
                  key={type}
                  label={type}
                  clickable
                  color="primary"
                  variant="outlined"
                  onClick={() => setSelectedType(type)}
                  sx={{ justifyContent: "flex-start", width: "fit-content" }}
                />
              ))}
            </Stack>

          </Stack>

        )}

      {/* -------------------------------------------------- */}
      {/* Selected Topic */}
      {/* -------------------------------------------------- */}

      {!loading &&
        !error &&
        selectedType && (

          <Stack spacing={2}>

            <LeapSection
              infoType={selectedType}
              items={grouped[selectedType]}
              showHeading={true}
            />

          </Stack>

        )}

      {/* -------------------------------------------------- */}
      {/* Empty */}
      {/* -------------------------------------------------- */}

      {!loading &&
        !error &&
        availableTypes.length === 0 && (

          <Stack
            spacing={1}
            alignItems="center"
            py={4}
          >

            <SchoolOutlined
              sx={{
                color: colors.subtitle,
                fontSize: 32,
              }}
            />

            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
            >
              No LEAP information is available for this stage.
            </Typography>

          </Stack>

        )}

    </Paper>
  );
}

// ============================================================

LeapCenter.propTypes = {
  stageNo: PropTypes.number.isRequired,
  stageTitle: PropTypes.string,
  stagePurpose: PropTypes.string,
};
