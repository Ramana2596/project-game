// src/pages/UserFeedback/FeedbackOptions.jsx
import React from 'react';
import { Box, Tooltip } from '@mui/material';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import StarIcon from '@mui/icons-material/Star';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import HelpIcon from '@mui/icons-material/Help';

// Map DB Widget_Icon values to MUI icon components
const ICON_MAP = {
    ThumbDown: ThumbDownIcon,
    Lightbulb: LightbulbIcon,
    Star: StarIcon,
    ThumbUp: ThumbUpIcon,
    Help: HelpIcon,
};

// Distinct color per widget position
const WIDGET_COLORS = [
    '#EF4444', // 👎 Problem
    '#F59E0B', // 💡 Suggestion
    '#FACC15', // ⭐ Appreciation
    '#22C55E', // 👍 Like
    '#3B82F6', // ❓ Question
];

// Icon-only widget strip — tooltip shows label on hover
const FeedbackOptions = ({ widgets, selectedWidget, onWidgetSelect }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {widgets.map((widget, idx) => {
                const color = WIDGET_COLORS[idx] || '#555';
                const isSelected = selectedWidget?.Widget_Id === widget.Widget_Id;
                const IconComp = ICON_MAP[widget.Widget_Icon] || HelpIcon;

                return (
                    <Tooltip key={widget.Widget_Id} title={widget.Widget} placement="top" arrow>
                        <Box
                            onClick={() => onWidgetSelect(isSelected ? null : widget)}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 36,
                                height: 36,
                                flexShrink: 0,
                                cursor: 'pointer',
                                borderRadius: 2,
                                border: '1px solid',
                                borderColor: isSelected
                                    ? '#7C3AED'
                                    : '#D8D9E5',

                                bgcolor: isSelected
                                    ? '#DDD6FE'
                                    : '#FFFFFF',

                                boxShadow: isSelected
                                    ? '0 3px 10px rgba(124,58,237,.25)'
                                    : '0 1px 2px rgba(0,0,0,.06)',

                                transform: isSelected
                                    ? 'scale(1.05)'
                                    : 'scale(1)',

                                transition: 'all .18s ease',
                                '&:hover': {
                                    bgcolor: isSelected
                                        ? '#EDE9FE'
                                        : '#F8F6FF',
                                    borderColor: '#7C3AED',
                                    transform: 'translateY(-1px)',
                                    boxShadow: '0 3px 8px rgba(0,0,0,.10)',
                                },

                                '&:active': {
                                    transform: 'scale(.96)',
                                },
                            }}
                        >
                            <IconComp sx={{ fontSize: 21, color, transition: 'transform .15s ease', }} />
                        </Box>
                    </Tooltip>
                );
            })}
        </Box>
    );
};

export default FeedbackOptions;