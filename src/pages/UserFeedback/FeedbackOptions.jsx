// src/pages/UserFeedback/FeedbackOptions.jsx
import React            from 'react';
import { Box, Tooltip } from '@mui/material';
import ThumbDownIcon    from '@mui/icons-material/ThumbDown';
import LightbulbIcon    from '@mui/icons-material/Lightbulb';
import StarIcon         from '@mui/icons-material/Star';
import ThumbUpIcon      from '@mui/icons-material/ThumbUp';
import HelpIcon         from '@mui/icons-material/Help';

// Map DB Widget_Icon values to MUI icon components
const ICON_MAP = {
    ThumbDown : ThumbDownIcon,
    Lightbulb : LightbulbIcon,
    Star      : StarIcon,
    ThumbUp   : ThumbUpIcon,
    Help      : HelpIcon,
};

// Distinct color per widget position
const WIDGET_COLORS = ['#D32F2F', '#F57C00', '#1976D2', '#388E3C', '#7B1FA2'];

// Icon-only widget strip — tooltip shows label on hover
const FeedbackOptions = ({ widgets, selectedWidget, onWidgetSelect }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {widgets.map((widget, idx) => {
                const color      = WIDGET_COLORS[idx] || '#555';
                const isSelected = selectedWidget?.Widget_Id === widget.Widget_Id;
                const IconComp   = ICON_MAP[widget.Widget_Icon] || HelpIcon;

                return (
                    <Tooltip key={widget.Widget_Id} title={widget.Widget} placement="top" arrow>
                        <Box
                            onClick={() => onWidgetSelect(isSelected ? null : widget)}
                            sx={{
                                display       : 'flex',
                                alignItems    : 'center',
                                justifyContent: 'center',
                                cursor        : 'pointer',
                                width         : 38,
                                height        : 38,
                                borderRadius  : 2,
                                border        : '1.5px solid',
                                borderColor   : isSelected ? color : 'rgba(103,58,183,0.2)',
                                bgcolor       : isSelected ? `${color}20` : 'rgba(255,255,255,0.7)',
                                boxShadow     : isSelected ? `0 0 0 2px ${color}30` : 'none',
                                transition    : 'all 0.15s',
                                '&:hover'     : { bgcolor: `${color}15`, borderColor: color },
                            }}
                        >
                            <IconComp sx={{ fontSize: 22, color: isSelected ? color : '#888' }} />
                        </Box>
                    </Tooltip>
                );
            })}
        </Box>
    );
};

export default FeedbackOptions;