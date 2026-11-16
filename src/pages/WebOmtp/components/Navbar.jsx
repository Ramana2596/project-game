// ==========================================================
// Component Name : Navbar
// Module         : WebOmtp (Landing)
// Purpose        : Sticky top navigation with Demo and Get Started actions
// Author/Version : UXLab V1.3 / v1.0
// AI Tags        : landing, navbar, navigation, tabs, cta
// ==========================================================

// Imports
import React, { useState } from "react";
import { Box, Typography, Button, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { colors, layoutStyle, buttonStyle, masterTypo } from "../../../ux/styles";
import { NAV_ITEMS } from "../constants/nav.js";

// Constants: paired colours - selected tab keeps white text on dark background, also on hover
const ACTIVE_TAB = {
  ...buttonStyle.tabActive,
  "&:hover": { background: colors.primaryDark, color: colors.onPrimary },
};
// Constants: selected menu item pairs soft-purple background with dark-purple text
const MENU_ITEM = {
  color: colors.onPrimarySoft,
  "&:hover": { background: colors.primarySoft, color: colors.onPrimarySoft },
  "&.Mui-selected": { background: colors.primarySelected, color: colors.onPrimarySoft },
  "&.Mui-selected:hover": { background: colors.primarySelected, color: colors.onPrimarySoft },
};

const Navbar = ({ activeId, onNav, onDemo, onStart }) => {
  // State: anchor for the mobile menu
  const [anchor, setAnchor] = useState(null);

  // Event handler: choose a section from the mobile menu
  const handleMenuPick = (id) => {
    setAnchor(null);
    onNav(id);
  };

  // AI Extension Hook (placeholder): Facilitator Assistant entry point
  // const aiAssistant = useAiFacilitator(); // future

  // Render
  return (
    <Box component="header" sx={{ position: "sticky", top: 0, zIndex: 20, background: colors.paper, borderBottom: `1px solid ${colors.border}` }}>
      <Box sx={{ ...layoutStyle.pageContainer, ...layoutStyle.flexRow, px: { xs: 2, md: 4 }, py: 1.25, flexWrap: "nowrap" }}>
        {/* Brand wordmark */}
        <Box component="a" href="#overview" onClick={(e) => { e.preventDefault(); onNav("overview"); }} sx={{ textDecoration: "none" }}>
          <Typography sx={{ ...masterTypo.h4, color: colors.primaryDark, lineHeight: 1 }}>OMTP</Typography>
          <Typography sx={{ ...masterTypo.caption, color: colors.subtitle, display: { xs: "none", xl: "block" } }}>
            Operations Management Training Platform
          </Typography>
        </Box>

        {/* Section tabs */}
        <Box component="nav" aria-label="Main" sx={{ display: { xs: "none", lg: "flex" }, gap: 0.5 }}>
          {NAV_ITEMS.map((n) => (
            <Button key={n.id} onClick={() => onNav(n.id)} aria-current={activeId === n.id ? "true" : undefined}
              sx={{ ...buttonStyle.tab, px: 1.5, ...(activeId === n.id && ACTIVE_TAB) }}>
              {n.label}
            </Button>
          ))}
        </Box>

        {/* Actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button onClick={onDemo} startIcon={<PlayCircleOutlineIcon />} sx={{ ...buttonStyle.secondary, display: { xs: "none", sm: "inline-flex" } }}>
            Try the Demo
          </Button>
          <Button onClick={onStart} sx={buttonStyle.primary}>Get Started</Button>
          <IconButton aria-label="Open menu" onClick={(e) => setAnchor(e.currentTarget)} sx={{ ...buttonStyle.icon, display: { lg: "none" } }}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Mobile menu */}
      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}>
        {NAV_ITEMS.map((n) => (
          <MenuItem key={n.id} selected={activeId === n.id} onClick={() => handleMenuPick(n.id)} sx={MENU_ITEM}>
            {n.label}
          </MenuItem>
        ))}
        <MenuItem onClick={() => { setAnchor(null); onDemo(); }} sx={MENU_ITEM}>Try the Demo</MenuItem>
      </Menu>
    </Box>
  );
};

export default Navbar;