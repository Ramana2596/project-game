// ==========================================================
// Component Name : ShotFrame
// Module         : WebOmtp (Landing)
// Purpose        : Shared holder for OMTP app screenshots with loading and fallback states
// Author/Version : UXLab V1.3 / v1.1 (fix: image no longer hidden with display:none + lazy)
// AI Tags        : landing, screenshot, image, shared, skeleton
// ==========================================================

// Imports
import React, { useState, useRef, useEffect } from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import { colors, layoutStyle, masterTypo } from "../../../ux/styles";

// Constants: frame styles - plain border, or branded device frame for hero use
const FRAMES = {
  plain: { borderRadius: 2, border: `1px solid ${colors.border}`, background: colors.paper },
  device: { p: 1.5, borderRadius: 4, background: colors.heroGradient, boxShadow: `0 20px 40px ${colors.primary}33` },
};

const ShotFrame = ({ src, alt, frame = "plain", ratio = "16 / 9" }) => {
  // State: image load status (loading | ready | failed)
  const [status, setStatus] = useState("loading");
  const imgRef = useRef(null);

  // Effect: reset on a new image; handle images that finished loading before React attached handlers
  useEffect(() => {
    setStatus("loading");
    const img = imgRef.current;
    if (img && img.complete) setStatus(img.naturalWidth > 0 ? "ready" : "failed");
  }, [src]);

  // Derived: image stays in layout (never display:none) so the browser always loads it
  const isReady = status === "ready";

  // Render: skeleton or message overlays the image until it is ready
  return (
    <Box sx={{ ...FRAMES[frame], overflow: "hidden", position: "relative" }}>
      <Box
        component="img" ref={imgRef} src={src} alt={alt}
        onLoad={() => setStatus("ready")} onError={() => setStatus("failed")}
        sx={{ width: "100%", display: "block", borderRadius: frame === "device" ? 2 : 0, opacity: isReady ? 1 : 0, minHeight: isReady ? 0 : 120 }}
      />
      {status === "loading" && (
        <Skeleton variant="rectangular" sx={{ position: "absolute", inset: 0, height: "100%" }} />
      )}
      {status === "failed" && (
        <Box sx={{ ...layoutStyle.flexCenter, position: "absolute", inset: 0, background: colors.panel }}>
          <Typography sx={{ ...masterTypo.body2, color: colors.subtitle }}>Screenshot unavailable</Typography>
        </Box>
      )}
    </Box>
  );
};

export default ShotFrame;