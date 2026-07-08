// ============================================================
// OpsMgt UX Lab V1.0
// Component : PageBackground
// Purpose   : Standard page container and responsive background
// ============================================================

import React from "react";
import { Box } from "@mui/material";
import { colors, pageStyle } from "../styles";

const PageBackground = ({
    children,
    maxWidth = 1400,
    paddingX = pageStyle.root.px,
    paddingY = pageStyle.root.py,
}) => {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100%",
                background: colors.pageGradient,
                px: paddingX,
                py: paddingY,
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth,
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default PageBackground;