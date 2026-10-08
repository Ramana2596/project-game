
// Component: ArComparison
// Module: AnnualReport
// Purpose: Provide a UX-ready extension point for cross-team financial comparison
// Author/Version: OpsMgt UXLab V1.3
// AI Tags: annual-report, comparison, cross-team, financial-analysis, uxlab

import React from "react";
import { Box, Button, Typography } from "@mui/material";
import CompareArrowsOutlinedIcon from "@mui/icons-material/CompareArrowsOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { buttonStyle, cardStyle, colors, layoutStyle, masterTypo } from "../../../ux/styles";

const ArComparison = ({
  enabled = true,
  active = false,
  teams = [],
  ratiosByTeam = {},
  onCompare,
}) => {
  // Hide the comparison plug-in when comparison is disabled by configuration.
  if (!enabled) {
    return null;
  }

  // Keep the comparison area compact until cross-team comparison is activated.
  if (!active) {
    return (
      <Box sx={{ ...layoutStyle.section, px: 2 }}>
        <Box
          sx={{
            ...cardStyle.primary,
            p: 2,
            background: colors.panel,
          }}
        >
          <Box sx={layoutStyle.flexRow}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                minWidth: 0,
              }}
            >
              <Box sx={cardStyle.statIconCircle(colors.accentBlue)}>
                <CompareArrowsOutlinedIcon />
              </Box>

              <Box sx={{ minWidth: 0 }}>
                <Typography
                  sx={{
                    ...masterTypo.h6,
                    color: colors.title,
                  }}
                >
                  Cross-Team Performance
                </Typography>

                <Typography
                  sx={{
                    ...masterTypo.body2,
                    color: colors.subtitle,
                  }}
                >
                  Compare financial ratios and performance trends across teams.
                </Typography>
              </Box>
            </Box>

            <Button
              variant="contained"
              startIcon={<GroupsOutlinedIcon />}
              onClick={onCompare}
              disabled={!onCompare}
              sx={{
                ...buttonStyle.secondary,
                ...buttonStyle.compact,
                flexShrink: 0,
              }}
            >
              Compare Teams
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }

  // Define the core ratio set used when the comparison plug-in is populated.
  const comparisonRatios = [
    { key: "revenueGrowth", label: "Revenue Growth", unit: "%" },
    { key: "grossMargin", label: "Gross Margin", unit: "%" },
    { key: "ebitMargin", label: "EBIT Margin", unit: "%" },
    { key: "netMargin", label: "Net Margin", unit: "%" },
    { key: "roe", label: "ROE", unit: "%" },
    { key: "debtEquity", label: "Debt / Equity", unit: "x" },
  ];

  // Format comparison values consistently with the Annual Report analytical layer.
  const formatValue = (value, unit) => {
    if (
      value === null ||
      value === undefined ||
      !Number.isFinite(Number(value))
    ) {
      return "—";
    }

    const number = Number(value);

    if (unit === "%") {
      return `${number.toFixed(1)}%`;
    }

    if (unit === "x") {
      return `${number.toFixed(2)}x`;
    }

    return number.toLocaleString();
  };

  // Render the populated cross-team comparison grid supplied by the parent.
  return (
    <Box sx={{ ...layoutStyle.section, px: 2 }}>
      <Box sx={layoutStyle.sectionHeader}>
        <Box>
          <Typography sx={{ ...masterTypo.h5, color: colors.title }}>
            Cross-Team Performance
          </Typography>
          <Typography sx={{ ...masterTypo.caption, color: colors.subtitle }}>
            Core financial ratios across selected teams
          </Typography>
        </Box>

        <Box sx={cardStyle.badge(colors.accentBlue)}>
          {teams.length} {teams.length === 1 ? "Team" : "Teams"}
        </Box>
      </Box>

      {!teams.length ? (
        <Box
          sx={{
            ...cardStyle.banner,
            background: colors.panel,
            borderColor: colors.border,
          }}
        >
          <Box
            sx={{
              ...cardStyle.bannerIconCircle,
              background: colors.primarySoft,
              "& svg": {
                color: colors.primary,
              },
            }}
          >
            <GroupsOutlinedIcon />
          </Box>

          <Box>
            <Typography sx={{ ...masterTypo.h6, color: colors.title }}>
              Select teams to compare
            </Typography>
            <Typography sx={{ ...masterTypo.body2, color: colors.body }}>
              Cross-team results will appear here when comparison selections
              are available.
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            ...cardStyle.primary,
            overflowX: "auto",
          }}
        >
          <Box
            sx={{
              minWidth: 720,
              display: "grid",
              gridTemplateColumns: "minmax(180px, 1.4fr) repeat(auto-fit, minmax(120px, 1fr))",
            }}
          >
            <Box
              sx={{
                p: 1.5,
                background: colors.panel,
                borderBottom: `1px solid ${colors.divider}`,
              }}
            >
              <Typography
                sx={{
                  ...masterTypo.columnHeader,
                  color: colors.heading,
                }}
              >
                Ratio
              </Typography>
            </Box>

            {teams.map((team) => (
              <Box
                key={team}
                sx={{
                  p: 1.5,
                  textAlign: "right",
                  background: colors.panel,
                  borderBottom: `1px solid ${colors.divider}`,
                }}
              >
                <Typography
                  sx={{
                    ...masterTypo.columnHeader,
                    color: colors.heading,
                  }}
                >
                  {team}
                </Typography>
              </Box>
            ))}

            {comparisonRatios.map((ratio) => (
              <React.Fragment key={ratio.key}>
                <Box
                  sx={{
                    p: 1.5,
                    borderBottom: `1px solid ${colors.divider}`,
                  }}
                >
                  <Typography
                    sx={{
                      ...masterTypo.body2,
                      color: colors.body,
                    }}
                  >
                    {ratio.label}
                  </Typography>
                </Box>

                {teams.map((team) => (
                  <Box
                    key={`${team}-${ratio.key}`}
                    sx={{
                      p: 1.5,
                      textAlign: "right",
                      borderBottom: `1px solid ${colors.divider}`,
                    }}
                  >
                    <Typography
                      sx={{
                        ...masterTypo.body2,
                        fontWeight: 600,
                        color: colors.title,
                      }}
                    >
                      {formatValue(
                        ratiosByTeam?.[team]?.[ratio.key],
                        ratio.unit
                      )}
                    </Typography>
                  </Box>
                ))}
              </React.Fragment>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ArComparison;
