// ============================================================
// constants/helpCenterActions.js
// Dynamic Help Center / Helpline Configuration
// ============================================================

import {
  AssignmentTurnedInOutlined,
  GavelOutlined,
  DescriptionOutlined,
  HelpOutline,
  SupportAgentOutlined,
} from "@mui/icons-material";

export const HELP_ACTION_KEYS = {
  CHECKLIST: "CHECKLIST",
  RULES: "RULES",
  REPORT_GUIDE: "REPORT_GUIDE",
  HELPLINE_CONTACT: "HELPLINE_CONTACT",
  GENERAL_HELP: "GENERAL_HELP",
};

export const HELP_CENTER_MASTER = [
  {
    key: HELP_ACTION_KEYS.CHECKLIST,
    label: "Submission Checklist",
    icon: AssignmentTurnedInOutlined,
  },
  {
    key: HELP_ACTION_KEYS.RULES,
    label: "Stage Rules & Limits",
    icon: GavelOutlined,
  },
  {
    key: HELP_ACTION_KEYS.REPORT_GUIDE,
    label: "View Reports Guide",
    icon: DescriptionOutlined,
  },
  {
    key: HELP_ACTION_KEYS.HELPLINE_CONTACT,
    label: "Support Helpline",
    icon: SupportAgentOutlined,
  },
  {
    key: HELP_ACTION_KEYS.GENERAL_HELP,
    label: "Simulation Help",
    icon: HelpOutline,
  },
];

/**
 * Returns dynamic Help Center items based on state
 */
export const getHelpCenterActions = ({ isSimulationEnd, currentStageNo }) => {
  if (isSimulationEnd) {
    return HELP_CENTER_MASTER.filter(
      (item) => item.key !== HELP_ACTION_KEYS.CHECKLIST
    );
  }

  return HELP_CENTER_MASTER.map((item) => {
    if (item.key === HELP_ACTION_KEYS.RULES && currentStageNo) {
      return {
        ...item,
        label: `Stage ${currentStageNo} Rules`,
      };
    }
    return item;
  });
};