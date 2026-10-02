import React from "react";
import { Box, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { masterTypo, colors } from "../../../ux/styles";
import { MR_STAGES } from "../constants/mrConstants";
import { fmtQty } from "../utils/mrFormat";

// Production stages in order; stages with no data are skipped
export function MrFlow({ card }) {
  const stages = MR_STAGES.filter((s) => card[s.key] != null);
  return (
    <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 0.5 }}>
      {stages.map((s, i) => {
        const lost = i > 0 && card[s.key] < card[stages[i - 1].key];
        return (
          <React.Fragment key={s.key}>
            {i > 0 && <ChevronRightIcon sx={{ color: colors.muted, fontSize: 18 }} />}
            <Box sx={{ textAlign: "center", minWidth: 58 }}>
              <Typography sx={{ ...masterTypo.h6, color: lost ? colors.warning : colors.title }}>
                {fmtQty(card[s.key])}
              </Typography>
              <Typography sx={{ ...masterTypo.caption, color: colors.subtitle }}>{s.label}</Typography>
            </Box>
          </React.Fragment>
        );
      })}
    </Box>
  );
}