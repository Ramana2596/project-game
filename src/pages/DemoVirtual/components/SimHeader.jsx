// Component: SimHeader
// Module: OMTP Simulation
// Purpose: Display enterprise page header

import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Stack,
  Typography,
  Paper,
  Button,
  Chip,
  Menu,
  MenuItem,
} from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import { colors, semanticTypo } from "../../../ux/styles";

export default function SimHeader({
  title = "Business Simulation Control Centre",
  userInfo,
  handleExit
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const userMenuOpen = Boolean(anchorEl);
  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleExitClick = () => {
    handleMenuClose();
    handleExit();
  };

  return (
    <Paper
      square
      elevation={0}
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1100,
        background: colors.heroGradient,
        color: colors.white,
        px: { xs: 2.5, md: 4 },
        py: 1.75,
        mb: 3,
        borderBottom: "1px solid rgba(255,255,255,0.12)",
        boxShadow: `0 4px 16px ${colors.shadowColor}`,
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          columnGap: 2,
        }}
      >
        <Box sx={{ justifySelf: "start" }}>
          <Chip
            label="OMTP"
            variant="filled"
            sx={{
              ...semanticTypo.cardH5,
              bgcolor: colors.white,
              color: colors.primary,
              letterSpacing: 0.5,
              height: 34,
              px: 1,
            }}
          />
        </Box>

        <Typography
          noWrap
          sx={{
            ...semanticTypo.pageH4,
            justifySelf: "center",
            textAlign: "center",
            color: colors.white,
            fontWeight: 700,
            maxWidth: { xs: 220, sm: 420, md: 640 },
          }}
          title={title}
        >
          {title}
        </Typography>

        <Stack direction="row" alignItems="center" sx={{ justifySelf: "end" }}>
          <Button
            variant="outlined"
            onClick={handleMenuClick}
            endIcon={<KeyboardArrowDown />}
            sx={{
              textTransform: "none",
              color: colors.white,
              borderColor: "rgba(255,255,255,0.5)",
              "&:hover": {
                borderColor: colors.white,
                bgcolor: "rgba(255,255,255,0.12)",
              },
            }}
          >
            {userInfo?.gameTeam || "Team 1"}
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={userMenuOpen}
            onClose={handleMenuClose}
            PaperProps={{ sx: { borderRadius: 2, mt: 1, minWidth: 180 } }}
          >
            <MenuItem
              onClick={handleExitClick}
              sx={{ color: colors.error, fontWeight: 700, py: 1.25 }}
            >
              Exit Control Centre
            </MenuItem>
          </Menu>
        </Stack>
      </Box>
    </Paper>
  );
}

SimHeader.propTypes = {
  title: PropTypes.string,
  userInfo: PropTypes.object,
  handleExit: PropTypes.func,
};