// ============================================================
// LEAP V1.0
// File : leapContentTypes.js
// Purpose : Define display properties for LEAP content types
// SEO    : LEAP Content Types, Learn Help Metadata, Content Registry
// ============================================================

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";

import { colors } from "../../../ux/styles";

// ============================================================
// LEAP Content Type Registry
// ============================================================

export const LEAP_CONTENT_TYPES = {

  INFO: {
    title: "Overview",
    color: colors.primary,
    borderColor: colors.primary,
    icon: InfoOutlinedIcon,
  },

  CHECKLIST: {
    title: "Checklist",
    color: colors.success,
    borderColor: colors.success,
    icon: ChecklistOutlinedIcon,
  },

  LEARNING_OBJECTIVE: {
    title: "Learning Objectives",
    color: colors.secondary,
    borderColor: colors.secondary,
    icon: SchoolOutlinedIcon,
  },

  BUSINESS_RULE: {
    title: "Business Rules",
    color: colors.warning,
    borderColor: colors.warning,
    icon: GavelOutlinedIcon,
  },

  HINT: {
    title: "Hints",
    color: colors.info,
    borderColor: colors.info,
    icon: LightbulbOutlinedIcon,
  },

  FAQ: {
    title: "Frequently Asked Questions",
    color: colors.primary,
    borderColor: colors.primary,
    icon: QuizOutlinedIcon,
  },

  REFERENCE: {
    title: "References",
    color: colors.textSecondary,
    borderColor: colors.textSecondary,
    icon: MenuBookOutlinedIcon,
  },

  VIDEO: {
    title: "Videos",
    color: colors.error,
    borderColor: colors.error,
    icon: PlayCircleOutlineOutlinedIcon,
  },

};

// ============================================================
// Helper : Get content type metadata
// ============================================================

export function getContentType(type) {
  return (
    LEAP_CONTENT_TYPES[type] || {
      title: type,
      color: colors.textPrimary,
      borderColor: colors.primary,
      icon: InfoOutlinedIcon,
    }
  );
}