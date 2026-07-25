// Component: DemoHeader | Module: Demo Virtual Simulation | Purpose: Display enterprise page header
import React, { useState } from "react";
import PropTypes from "prop-types";
import { 
  Box, 
  Stack, 
  Typography, 
  LinearProgress, 
  Paper, 
  Avatar, 
  Button, 
  Divider, 
  Menu, 
  MenuItem 
} from "@mui/material";
import { CalendarToday, KeyboardArrowDown } from "@mui/icons-material";
import { formatDate } from "../../../utils/formatDate";
import { colors } from "../../../ux/styles";
import { UI_STRINGS } from "../constants/labels";

export default function DemoHeader({ 
  userInfo, 
  progressData, 
  progressPercent, 
  teamInitial, 
  handleExit 
}) {
  // Maintain user menu state and actions
  const [anchorEl, setAnchorEl] = useState(null);
  const userMenuOpen = Boolean(anchorEl);
  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleExitClick = () => { handleMenuClose(); handleExit(); };

  return (
    <>
      {/* Render enterprise navigation header bar */}
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
          py: 1.5, 
          mb: 2.5, 
          boxShadow: `0 4px 16px ${colors.shadowColor}` 
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={2.5}>
            <Box 
              sx={{ 
                bgcolor: colors.white, 
                color: colors.primary, 
                px: 1.5, 
                py: 0.5, 
                borderRadius: 1.5, 
                fontWeight: 800, 
                fontSize: "1.25rem", 
                letterSpacing: 0.5 
              }}
            >
              OMTP
            </Box>
            <Divider 
              orientation="vertical" 
              flexItem 
              sx={{ borderColor: "rgba(255,255,255,0.3)", my: 0.5 }} 
            />
            <Typography sx={{ fontSize: "1.15rem", fontWeight: 700, color: colors.white }}>
              Team: {userInfo?.gameBatch} – {userInfo?.gameTeam} {" | "} Business Simulation Control Centre
            </Typography>
          </Stack>
          
          <Stack direction="row" alignItems="center" spacing={2}>
            <Button 
              onClick={handleMenuClick} 
              endIcon={<KeyboardArrowDown sx={{ color: colors.white }} />} 
              sx={{ 
                textTransform: "none", 
                color: colors.white, 
                textAlign: "right", 
                px: 1.5, 
                py: 0.5, 
                borderRadius: 2, 
                "&:hover": { bgcolor: "rgba(255,255,255,0.12)" } 
              }}
            >
              <Box sx={{ mr: 1, textAlign: "right" }}>
                <Typography sx={{ fontSize: "0.90rem", fontWeight: 700, lineHeight: 1.2 }}>
                  {userInfo?.gameBatch || "Sample"}
                </Typography>
                <Typography sx={{ fontSize: "0.80rem", opacity: 0.85, lineHeight: 1.2 }}>
                  {userInfo?.gameTeam || "Team 1"}
                </Typography>
              </Box>
            </Button>

            <Avatar 
              sx={{ 
                width: 38, 
                height: 38, 
                bgcolor: colors.white, 
                color: colors.primary, 
                fontWeight: 800, 
                fontSize: "1rem" 
              }}
            >
              {teamInitial}
            </Avatar>

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
        </Stack>
      </Paper>

      {/* Render simulation progress summary panel */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 2, 
          mb: 3, 
          borderRadius: 2.5, 
          bgcolor: colors.white, 
          border: `1px solid ${colors.border || "#e0e0e0"}`, 
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)" 
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.25}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Typography sx={{ fontSize: "1rem", color: colors.primaryDark, fontWeight: 800 }}>
              {UI_STRINGS.PERIOD_DISPLAY(progressData?.Current_Period_No, progressData?.Total_Period)}
            </Typography>
            <Typography sx={{ fontSize: "0.90rem", color: colors.muted }}>•</Typography>
            <Stack direction="row" spacing={0.75} alignItems="center">
              <CalendarToday sx={{ fontSize: 16, color: colors.primary }} />
              <Typography sx={{ fontSize: "2rem", color: colors.title, fontWeight: 700 }}>
                {progressData?.Is_Simulation_End ? UI_STRINGS.SIM_COMPLETED : formatDate(progressData?.Current_Period)}
              </Typography>
            </Stack>
          </Stack>
          <Typography sx={{ fontSize: "0.95rem", color: colors.primary, fontWeight: 800 }}>
            {progressPercent}% Complete
          </Typography>
        </Stack>

        <LinearProgress 
          variant="determinate" 
          value={progressPercent} 
          sx={{ 
            height: 6, 
            borderRadius: "999px", 
            bgcolor: colors.selected || "#f0f0f0", 
            "& .MuiLinearProgress-bar": { 
              borderRadius: "999px", 
              background: colors.heroGradient 
            } 
          }} 
        />
      </Paper>
    </>
  );
}

DemoHeader.propTypes = {
  userInfo: PropTypes.object,
  progressData: PropTypes.object,
  progressPercent: PropTypes.number,
  teamInitial: PropTypes.string,
  anchorEl: PropTypes.any,
  userMenuOpen: PropTypes.bool,
  handleMenuClick: PropTypes.func,
  handleMenuClose: PropTypes.func,
  handleExit: PropTypes.func,
};