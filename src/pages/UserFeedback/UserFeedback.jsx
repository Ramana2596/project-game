// src/pages/UserFeedback/UserFeedback.jsx
import React, { useState }       from 'react';
import {
    Box, Typography, Chip, Fade,
    TextField, Rating, Collapse,
    IconButton, Tooltip, useMediaQuery, useTheme,
} from '@mui/material';
import SendIcon               from '@mui/icons-material/Send';
import CloseIcon              from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import FeedbackOutlinedIcon   from '@mui/icons-material/FeedbackOutlined';
import { useLocation }        from 'react-router-dom';
import { useUser }            from '../../core/access/userContext.jsx';
import { useFeedback }        from './hooks/useFeedback.js';
import FeedbackOptions        from './FeedbackOptions.jsx';

const flattenPages = (list) =>
    list.reduce((acc, item) => {
        acc.push(item);
        if (item.children?.length) acc.push(...flattenPages(item.children));
        return acc;
    }, []);

const resolveUiId = (pathname, userAccessiblePages) => {
    if (!userAccessiblePages?.length) return 'AppRoute';
    const flat  = flattenPages(userAccessiblePages);
    const lower = pathname.toLowerCase();
    const match =
        flat.find(p => p.href && lower === p.href.toLowerCase()) ||
        flat.find(p => p.href && lower.startsWith(p.href.toLowerCase()));
    return match?.id || 'AppRoute';
};

// ── Shared constants ──────────────────────────────────────────────────────────
const FAB_SIZE   = 40;   // px — diameter of the circular trigger button
const FAB_BOTTOM = 0;    // px — flush with viewport bottom
const FAB_LEFT   = 0;    // px — flush with viewport left

const UserFeedback = () => {
    const theme                                 = useTheme();
    const isMobile                              = useMediaQuery(theme.breakpoints.down('md'));
    const { pathname }                          = useLocation();
    const { userInfo, userAccessiblePages } = useUser();

    const userId = userInfo?.userId         || null;
    const uiId   = resolveUiId(pathname, userAccessiblePages);

    const {
        widgets, filteredOptions,
        selectedWidget, selectedOption,
        comment, rating,
        status, errorMsg,
        handleWidgetSelect,
        setSelectedOption,
        setComment,
        setRating,
        handleSubmit,
    } = useFeedback(userId, uiId);

    const [open, setOpen] = useState(false);

    const isOther     = selectedOption?.Feedback_Option === 'Other';
    const showOptions = !!selectedWidget;
    const canSubmit   = !!selectedWidget && !!selectedOption && status !== 'submitting';

    const handleCloseOptions = () => {
        handleWidgetSelect(null);
        setSelectedOption(null);
        setComment('');
        setRating(0);
    };

    const handleToggle = () => {
        setOpen(prev => !prev);
        if (open) handleCloseOptions();
    };

    // ── Shared success flash ──────────────────────────────────────────────────
    const SuccessFlash = ({ inline = false }) => (
        <Fade in>
            <Box sx={{
                display       : 'flex',
                alignItems    : 'center',
                gap           : 1,
                px            : 2,
                py            : inline ? 0 : 1,
                bgcolor       : '#F0FDF4',
                borderRadius  : inline ? 2 : 0,
                border        : inline ? '1px solid #BBF7D0' : 'none',
                borderTop     : inline ? 'none' : '2px solid #BBF7D0',
            }}>
                <CheckCircleOutlineIcon sx={{ fontSize: 16, color: '#1D9E75' }} />
                <Typography sx={{ fontSize: 12, color: '#085041', fontWeight: 600, whiteSpace: 'nowrap' }}>
                    Thank you for your feedback!
                </Typography>
            </Box>
        </Fade>
    );

    // ── Shared floating Circle FAB ────────────────────────────────────────────
    const FeedbackFab = () => (
        <Tooltip title={open ? 'Close feedback' : 'Give feedback'} placement="right" arrow>
            <Box
                onClick={handleToggle}
                sx={{
                    width: FAB_SIZE,
                    height: FAB_SIZE,
                    minWidth: FAB_SIZE,
                    borderRadius: open
                        ? `${FAB_SIZE / 2}px 0 0 ${FAB_SIZE / 2}px`
                        : '50%', display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',

                    p: 0,
                    bgcolor: '#673AB7',
                    color: '#fff',

                    boxShadow: open
                        ? 'none'
                        : '0 10px 28px rgba(103,58,183,.30)', transition:
                        'transform .18s ease, box-shadow .25s ease, background-color .25s ease',

                    '&:hover': {
                        bgcolor: '#7C3AED',
                        transform: 'translateY(-2px) scale(1.05)',
                        boxShadow: '0 14px 34px rgba(103,58,183,.42)',
                    },

                    '&:active': {
                        transform: 'scale(.95)',
                    },
                }}
            >
                {open
                    ? <CloseIcon sx={{ fontSize: 20 }} />
                    : <FeedbackOutlinedIcon sx={{ fontSize: 20 }} />
                }
            </Box>
        </Tooltip>
    );

    // ── MOBILE LAYOUT ─────────────────────────────────────────────────────────
    if (isMobile) {
        return (
            <Box sx={{ position: 'fixed', bottom: FAB_BOTTOM, left: FAB_LEFT, zIndex: 1300 }}>
                <FeedbackFab />
                <Collapse in={open} unmountOnExit>
                    <Box sx={{
                        position  : 'fixed',
                        bottom    : FAB_SIZE + 8,
                        left      : FAB_LEFT,
                        zIndex    : 1299,
                        width     : 'calc(100vw - 32px)',
                        maxWidth  : 420,
                        bgcolor   : '#EDE9FE',
                        paddingLeft: 0,         
                        border    : '1.5px solid rgba(103,58,183,0.3)',
                        borderRadius: 3,
                        boxShadow : '0 8px 24px rgba(103,58,183,0.18)',
                        overflow  : 'hidden',
                    }}>
                        {status === 'success' ? (
                            <Box sx={{ p: 2 }}>
                                <SuccessFlash />
                            </Box>
                        ) : (
                            <Box sx={{ px: 2, pt: 1.5, pb: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                                        <FeedbackOutlinedIcon sx={{ fontSize: 16, color: '#3B1FA3' }} />
                                        <Typography sx={{ fontSize: 13, fontWeight: 800, color: '#3B1FA3' }}>
                                            Feedback
                                        </Typography>
                                    </Box>
                                </Box>

                                <Typography sx={{ fontSize: 11, fontWeight: 600, color: '#4A3880', mb: 1 }}>
                                    What type of feedback?
                                </Typography>
                                <FeedbackOptions
                                    widgets={widgets}
                                    selectedWidget={selectedWidget}
                                    onWidgetSelect={handleWidgetSelect}
                                />

                                {showOptions && (
                                    <Box sx={{ mt: 1.5 }}>
                                        <Typography sx={{ fontSize: 11, fontWeight: 600, color: '#4A3880', mb: 1 }}>
                                            Select an option
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                                            {filteredOptions.slice(0, 5).map(opt => {
                                                const isSel = selectedOption?.Feedback_Option_Id === opt.Feedback_Option_Id;
                                                return (
                                                    <Chip
                                                        key={opt.Feedback_Option_Id}
                                                        label={opt.Feedback_Option}
                                                        onClick={() => setSelectedOption(isSel ? null : opt)}
                                                        size="medium"
                                                        sx={{
                                                            fontSize: 12,

                                                            fontWeight: isSel ? 600 : 400,

                                                            bgcolor: isSel ? '#7C3AED' : 'rgba(255,255,255,.95)',

                                                            color: isSel ? '#fff' : '#4A3880',

                                                            border: '1px solid',

                                                            borderColor: isSel ? '#7C3AED' : 'rgba(103,58,183,.30)',

                                                            cursor: 'pointer',

                                                            height: 28,

                                                            transition: 'all .22s ease',

                                                            '&:hover': {
                                                                bgcolor: isSel ? '#6D28D9' : 'rgba(124,58,237,.10)',
                                                                transform: 'translateY(-1px)',
                                                            },

                                                            '&:active': {
                                                                transform: 'scale(.96)',
                                                            },
                                                        }} />
                                                );
                                            })}
                                            </Box>
                                        </Box>
                                    )}

                                    {isOther && (
                                        <TextField
                                            autoFocus fullWidth size="small"
                                            placeholder="Your comment…"
                                            value={comment}
                                            onChange={e => setComment(e.target.value)}
                                            sx={{
                                            mt: 1.5,
                                            '& .MuiOutlinedInput-root': {
                                                fontSize: 13, borderRadius: 2, bgcolor: '#fff',
                                                '& fieldset'            : { borderColor: 'rgba(103,58,183,0.3)' },
                                                '&:hover fieldset'      : { borderColor: '#7C3AED' },
                                                '&.Mui-focused fieldset': { borderColor: '#7C3AED' },
                                            },
                                        }}
                                    />
                                )}

                                {selectedWidget?.Widget_Id === 4 && (
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1.5 }}>
                                        <Typography sx={{ fontSize: 12, color: '#4A3880', fontWeight: 600 }}>Rate:</Typography>
                                        <Rating value={rating} onChange={(_, val) => setRating(val)} size="large" sx={{ color: '#388E3C' }} />
                                    </Box>
                                )}

                                {status === 'error' && (
                                    <Typography sx={{ fontSize: 12, color: '#E24B4A', mt: 1 }}>{errorMsg}</Typography>
                                )}

                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
                                    <Chip
                                        label="Cancel"
                                        icon={<CloseIcon style={{ fontSize: 14 }} />}
                                        onClick={handleCloseOptions}
                                        size="medium"
                                        sx={{
                                            fontSize: 13, bgcolor: 'rgba(103,58,183,0.1)', color: '#4A3880',
                                            border: '1px solid rgba(103,58,183,0.2)', cursor: 'pointer', height: 36,
                                            '& .MuiChip-icon': { color: '#4A3880' },
                                        }}
                                    />
                                    <Chip
                                        label={status === 'submitting' ? 'Sending…' : 'Send'}
                                        icon={<SendIcon style={{ fontSize: 14 }} />}
                                        onClick={handleSubmit}
                                        disabled={!canSubmit}
                                        size="medium"
                                        sx={{
                                            fontSize: 13, fontWeight: 600, bgcolor: '#7C3AED', color: '#fff',
                                            cursor: 'pointer', height: 36,
                                            '&:hover'       : { bgcolor: '#6D28D9' },
                                            '&.Mui-disabled': { bgcolor: '#C4B5F4', color: '#fff' },
                                            '& .MuiChip-icon': { color: '#fff' },
                                        }}
                                    />
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Collapse>
            </Box>
        );
    }

    // ── DESKTOP LAYOUT ────────────────────────────────────────────────────────
    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: FAB_BOTTOM,
                left: FAB_LEFT,
                zIndex: 1300,
                display: 'flex',
                alignItems: 'center',
                height: FAB_SIZE,
                overflow: 'visible',
            }}
        >
            <FeedbackFab />

            <Collapse
                in={open}
                orientation="horizontal"
                timeout={320}
                easing={{
                    enter: 'cubic-bezier(.22,1,.36,1)',
                    exit: 'cubic-bezier(.22,1,.36,1)',
                }}
                unmountOnExit
            >
                <Box
                    sx={{
                        ml: '-1px',              // <-- removes visible gap
                        height: FAB_SIZE,
                        bgcolor: '#EDE9FE',
                        border: '1.5px solid rgba(103,58,183,0.3)',
                        borderLeft: 'none',
                        borderBottom: 'none',
                        borderRadius: `0 ${FAB_SIZE / 2}px ${FAB_SIZE / 2}px 0`,
                        boxShadow: '0 4px 16px rgba(103,58,183,0.18)',
                        display: 'flex',
                        alignItems: 'center',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {status === 'success' ? (
                        <SuccessFlash inline />
                    ) : (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                height: '100%',
                                px: .5,
                                width: '100%',

                                opacity: open ? 1 : 0,

                                transform: open
                                    ? 'translateX(0)'
                                    : 'translateX(-12px)',

                                transition:
                                    'opacity .22s ease .10s, transform .30s cubic-bezier(.22,1,.36,1)',
                            }}
                        >
                                {/* Label — Cleaner seamless transition background */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',

                                        px: 2,

                                        height: '100%',

                                        bgcolor: '#673AB7',

                                        color: '#fff',

                                        flexShrink: 0,
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: 13,
                                            fontWeight: 700,
                                            color: '#fff',
                                            lineHeight: 1,
                                        }}
                                    >
                                        Feedback
                                    </Typography>
                                </Box>

                            {/* Widget icons */}
                            <Box sx={{
                                display    : 'flex',
                                alignItems : 'center',
                                gap        : 0.5,
                                px         : 1,
                                height     : '100%',
                                flexShrink : 0,
                            }}>
                                <FeedbackOptions
                                    widgets={widgets}
                                    selectedWidget={selectedWidget}
                                    onWidgetSelect={handleWidgetSelect}
                                />
                                {showOptions && (
                                    <Tooltip title="Clear" placement="top" arrow>
                                        <IconButton
                                            onClick={handleCloseOptions}
                                            size="small"
                                            sx={{ color: '#9E93C8', '&:hover': { color: '#3B1FA3' } }}
                                        >
                                            <CloseIcon sx={{ fontSize: 14 }} />
                                        </IconButton>
                                    </Tooltip>
                                )}
                                </Box>

                                {/* Options pills & Dynamic Text Field */}
                                <Collapse
                                    in={showOptions}
                                    orientation="horizontal"
                                    timeout={220}
                                    easing={{
                                        enter: 'cubic-bezier(.22,1,.36,1)',
                                        exit: 'cubic-bezier(.22,1,.36,1)',
                                    }}
                                    unmountOnExit
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, px: 1, height: FAB_SIZE }}>
                                        {filteredOptions.slice(0, 5).map(opt => {
                                            const isSel = selectedOption?.Feedback_Option_Id === opt.Feedback_Option_Id;
                                        return (
                                            <Chip
                                                key={opt.Feedback_Option_Id}
                                                label={opt.Feedback_Option}
                                                onClick={() => setSelectedOption(isSel ? null : opt)}
                                                size="small"
                                                sx={{
                                                    fontSize   : 12,
                                                    fontWeight : isSel ? 600 : 400,
                                                    bgcolor    : isSel ? '#7C3AED' : 'rgba(255,255,255,0.9)',
                                                    color      : isSel ? '#fff'    : '#4A3880',
                                                    border     : '1px solid',
                                                    borderColor: isSel ? '#7C3AED' : 'rgba(103,58,183,0.3)',
                                                    cursor     : 'pointer',
                                                    height     : 28,
                                                    '&:hover'  : { bgcolor: isSel ? '#6D28D9' : 'rgba(124,58,237,0.1)' },
                                                }}
                                            />
                                        );
                                    })}

                                    {/* Expanded Clean Comment Input Field */}
                                    {isOther && (
                                        <TextField
                                            autoFocus size="small"
                                            placeholder="Your comment…"
                                            value={comment}
                                            onChange={e => setComment(e.target.value)}
                                            sx={{
                                                minWidth: 320, // Offers spacious room for inputs visually
                                                '& .MuiOutlinedInput-root': {
                                                    fontSize: 12, borderRadius: 2, bgcolor: '#fff',
                                                    height: 28,
                                                    '& fieldset'            : { borderColor: 'rgba(103,58,183,0.3)' },
                                                    '&:hover fieldset'      : { borderColor: '#7C3AED' },
                                                    '&.Mui-focused fieldset': { borderColor: '#7C3AED' },
                                                },
                                            }}
                                        />
                                    )}

                                    {/* Star rating for Widget 4 */}
                                    {selectedWidget?.Widget_Id === 4 && (
                                        <Rating value={rating} onChange={(_, val) => setRating(val)} size="small" sx={{ color: '#388E3C', mx: 0.5 }} />
                                    )}

                                    {/* Send Button */}
                                    <Chip
                                        label={status === 'submitting' ? 'Sending…' : 'Send'}
                                        icon={<SendIcon style={{ fontSize: 12 }} />}
                                        onClick={handleSubmit}
                                        disabled={!canSubmit}
                                        size="small"
                                        sx={{
                                            bgcolor : '#7C3AED', color: '#fff',
                                            fontWeight: 600, fontSize: 12, height: 28,
                                            cursor  : 'pointer', flexShrink: 0,
                                            '&:hover'       : { bgcolor: '#6D28D9' },
                                            '&.Mui-disabled': { bgcolor: '#C4B5F4', color: '#fff' },
                                            '& .MuiChip-icon': { color: '#fff' },
                                        }}
                                    />

                                    {status === 'error' && (
                                        <Typography sx={{ fontSize: 11, color: '#E24B4A' }}>{errorMsg}</Typography>
                                    )}
                                    </Box>
                                </Collapse>

                                {/* Inline close button at bar edge */}
                                <Tooltip title="Close" placement="top" arrow>
                                    <IconButton
                                        onClick={handleToggle}
                                        size="small"
                                        sx={{
                                            mx: .5,

                                            color: '#9E93C8',

                                            flexShrink: 0,

                                            transition: '.25s',

                                            '&:hover': {
                                                color: '#3B1FA3',
                                                transform: 'rotate(90deg)',
                                            },
                                        }}                                >
                                        <CloseIcon sx={{ fontSize: 14 }} />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                    )}
                </Box>
            </Collapse>
        </Box>
    );
};

export default UserFeedback;