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

// ── Flatten nested page tree into single array ────────────────────────
const flattenPages = (list) =>
    list.reduce((acc, item) => {
        acc.push(item);
        if (item.children?.length) acc.push(...flattenPages(item.children));
        return acc;
    }, []);

// ── Resolve UI_Id from pathname using accessible pages ────────────────
// Returns matched UI_Id, or 'AppRoute' for app-level screens not in navigation
const resolveUiId = (pathname, userAccessiblePages) => {
    if (!userAccessiblePages?.length) return 'AppRoute';

    const flat  = flattenPages(userAccessiblePages);
    const lower = pathname.toLowerCase();

    // Exact match first, then startsWith for nested routes
    const match =
        flat.find(p => p.href && lower === p.href.toLowerCase()) ||
        flat.find(p => p.href && lower.startsWith(p.href.toLowerCase()));

    return match?.id || 'AppRoute';
};

// ── Full-width feedback bar — responsive: horizontal desktop, bottom sheet mobile ─
const UserFeedback = () => {
    const theme                             = useTheme();
    const isMobile                          = useMediaQuery(theme.breakpoints.down('md'));
    const { pathname }                      = useLocation();
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

    // Mobile bottom sheet expanded state
    const [mobileOpen, setMobileOpen] = useState(false);

    // Derived state
    const isOther     = selectedOption?.Feedback_Option === 'Other';
    const showOptions = !!selectedWidget;
    const canSubmit   = !!selectedWidget && !!selectedOption && status !== 'submitting';

    // Close options block and reset all selections
    const handleCloseOptions = () => {
        handleWidgetSelect(null);
        setSelectedOption(null);
        setComment('');
        setRating(0);
        if (isMobile) setMobileOpen(false);
    };

    // ── Success flash — shared between mobile and desktop ──
    const SuccessFlash = () => (
        <Fade in>
            <Box sx={{
                display       : 'flex',
                alignItems    : 'center',
                justifyContent: 'center',
                gap           : 1.5,
                height        : '100%',
                bgcolor       : '#F0FDF4',
                borderTop     : '2px solid #BBF7D0',
                minHeight     : 40,
            }}>
                <CheckCircleOutlineIcon sx={{ fontSize: 20, color: '#1D9E75' }} />
                <Typography sx={{ fontSize: 13, color: '#085041', fontWeight: 600 }}>
                    Thank you for your feedback!
                </Typography>
            </Box>
        </Fade>
    );

    // ── MOBILE LAYOUT ─────────────────────────────────────────────────
    if (isMobile) {
        return (
            <Box
                sx={{
                    position     : 'fixed',
                    bottom       : 0,
                    left         : 0,
                    right        : 0,
                    zIndex       : 1300,
                    bgcolor      : '#EDE9FE',
                    borderTop    : '2px solid rgba(103,58,183,0.3)',
                    boxShadow    : '0 -2px 16px rgba(103,58,183,0.15)',
                    pointerEvents: 'auto',
                }}
            >
                {status === 'success' ? <SuccessFlash /> : (
                    <>
                        {/* Mobile trigger bar — always visible */}
                        <Box
                            onClick={() => setMobileOpen(prev => !prev)}
                            sx={{
                                display        : 'flex',
                                alignItems     : 'center',
                                justifyContent : 'space-between',
                                px             : 2,
                                height         : 44,
                                cursor         : 'pointer',
                                bgcolor        : '#DDD6FE',
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <FeedbackOutlinedIcon sx={{ fontSize: 18, color: '#5B21B6' }} />
                                <Typography sx={{ fontSize: 14, fontWeight: 800, color: '#3B1FA3' }}>
                                    Feedback
                                </Typography>
                                <Typography sx={{ fontSize: 10, color: '#7C6FAE' }}>
                                    · {uiId}
                                </Typography>
                            </Box>
                            <CloseIcon
                                sx={{
                                    fontSize  : 18,
                                    color     : '#9E93C8',
                                    transform : mobileOpen ? 'rotate(0deg)' : 'rotate(45deg)',
                                    transition: 'transform 0.2s',
                                }}
                            />
                        </Box>

                        {/* Mobile expanded bottom sheet */}
                        <Collapse in={mobileOpen} unmountOnExit>
                            <Box sx={{ px: 2, pt: 1.5, pb: 2, bgcolor: '#F5F3FF' }}>

                                {/* Widget icons row */}
                                <Typography sx={{ fontSize: 11, fontWeight: 600, color: '#4A3880', mb: 1 }}>
                                    What type of feedback?
                                </Typography>
                                <FeedbackOptions
                                    widgets={widgets}
                                    selectedWidget={selectedWidget}
                                    onWidgetSelect={handleWidgetSelect}
                                />

                                {/* Options chips */}
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
                                                            fontSize   : 13,
                                                            fontWeight : isSel ? 600 : 400,
                                                            bgcolor    : isSel ? '#7C3AED' : 'rgba(255,255,255,0.9)',
                                                            color      : isSel ? '#fff'    : '#4A3880',
                                                            border     : '1px solid',
                                                            borderColor: isSel ? '#7C3AED' : 'rgba(103,58,183,0.3)',
                                                            cursor     : 'pointer',
                                                            height     : 36,
                                                            '&:hover'  : { bgcolor: isSel ? '#6D28D9' : 'rgba(124,58,237,0.1)' },
                                                        }}
                                                    />
                                                );
                                            })}
                                        </Box>
                                    </Box>
                                )}

                                {/* Other — text input */}
                                {isOther && (
                                    <TextField
                                        autoFocus
                                        fullWidth
                                        size="small"
                                        placeholder="Your comment…"
                                        value={comment}
                                        onChange={e => setComment(e.target.value)}
                                        sx={{
                                            mt: 1.5,
                                            '& .MuiOutlinedInput-root': {
                                                fontSize    : 13,
                                                borderRadius: 2,
                                                bgcolor     : '#fff',
                                                '& fieldset'             : { borderColor: 'rgba(103,58,183,0.3)' },
                                                '&:hover fieldset'       : { borderColor: '#7C3AED' },
                                                '&.Mui-focused fieldset' : { borderColor: '#7C3AED' },
                                            },
                                        }}
                                    />
                                )}

                                {/* Star rating — Appreciation only */}
                                {selectedWidget?.Widget_Id === 4 && (
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1.5 }}>
                                        <Typography sx={{ fontSize: 12, color: '#4A3880', fontWeight: 600 }}>Rate:</Typography>
                                        <Rating
                                            value={rating}
                                            onChange={(_, val) => setRating(val)}
                                            size="large"
                                            sx={{ color: '#388E3C' }}
                                        />
                                    </Box>
                                )}

                                {/* Error message */}
                                {status === 'error' && (
                                    <Typography sx={{ fontSize: 12, color: '#E24B4A', mt: 1 }}>
                                        {errorMsg}
                                    </Typography>
                                )}

                                {/* Action row — Cancel + Send */}
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
                                    <Chip
                                        label="Cancel"
                                        icon={<CloseIcon style={{ fontSize: 14 }} />}
                                        onClick={handleCloseOptions}
                                        size="medium"
                                        sx={{
                                            fontSize         : 13,
                                            bgcolor          : 'rgba(103,58,183,0.1)',
                                            color            : '#4A3880',
                                            border           : '1px solid rgba(103,58,183,0.2)',
                                            cursor           : 'pointer',
                                            height           : 36,
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
                                            fontSize         : 13,
                                            fontWeight       : 600,
                                            bgcolor          : '#7C3AED',
                                            color            : '#fff',
                                            cursor           : 'pointer',
                                            height           : 36,
                                            '&:hover'        : { bgcolor: '#6D28D9' },
                                            '&.Mui-disabled' : { bgcolor: '#C4B5F4', color: '#fff' },
                                            '& .MuiChip-icon': { color: '#fff' },
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Collapse>
                    </>
                )}
            </Box>
        );
    }

    // ── DESKTOP LAYOUT ────────────────────────────────────────────────
    return (
        <Box
            sx={{
                position     : 'fixed',
                bottom       : 0,
                left         : 0,
                right        : 0,
                zIndex       : 1300,
                bgcolor      : '#EDE9FE',
                borderTop    : '2px solid rgba(103,58,183,0.3)',
                boxShadow    : '0 -2px 16px rgba(103,58,183,0.15)',
                pointerEvents: 'auto',
                height       : 40,          // ← reduced from 52
            }}
        >
            {/* Success flash */}
            {status === 'success' ? <SuccessFlash /> : (
                <Box sx={{
                    display   : 'flex',
                    alignItems: 'center',
                    height    : '100%',
                    overflow  : 'hidden',
                }}>

                    {/* ── Block 1: Feedback label — icon removed, text only ── */}
                    <Box sx={{
                        display    : 'flex',
                        alignItems : 'center',
                        px         : 2,
                        height     : '100%',
                        borderRight: '2px solid rgba(103,58,183,0.2)',
                        flexShrink : 0,
                        bgcolor    : '#DDD6FE',
                    }}>
                        <Box>
                            <Typography sx={{ fontSize: 15, fontWeight: 800, color: '#3B1FA3', lineHeight: 1.2 }}>
                                Feedback
                            </Typography>
                            <Typography sx={{ fontSize: 10, color: '#7C6FAE', lineHeight: 1 }}>
                                {uiId}
                            </Typography>
                        </Box>
                    </Box>

                    {/* ── Block 2: Widget icons + X — always visible ── */}
                    <Box sx={{
                        display    : 'flex',
                        alignItems : 'center',
                        gap        : 1,
                        px         : 1.5,
                        height     : '100%',
                        borderRight: showOptions ? '2px solid rgba(103,58,183,0.2)' : 'none',
                        flexShrink : 0,
                    }}>
                        <FeedbackOptions
                            widgets={widgets}
                            selectedWidget={selectedWidget}
                            onWidgetSelect={handleWidgetSelect}
                        />

                        {/* X — resets all, always at end of widget block */}
                        <Tooltip title="Close" placement="top" arrow>
                            <IconButton
                                onClick={handleCloseOptions}
                                size="small"
                                sx={{
                                    color    : showOptions ? '#5B21B6' : '#B0A8D4',
                                    ml       : 0.5,
                                    '&:hover': { color: '#3B1FA3' },
                                }}
                            >
                                <CloseIcon sx={{ fontSize: 16 }} />
                            </IconButton>
                        </Tooltip>
                    </Box>

                    {/* ── Block 3: Options — slides in when widget selected ── */}
                    <Collapse in={showOptions} orientation="horizontal" unmountOnExit>
                        <Box sx={{
                            display   : 'flex',
                            alignItems: 'center',
                            gap       : 1,
                            px        : 1.5,
                            height    : 40,         // ← reduced from 52
                            whiteSpace: 'nowrap',
                        }}>

                            {/* Option chips — max 5 */}
                            <Box sx={{ display: 'flex', gap: 0.75, alignItems: 'center' }}>
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
                            </Box>

                            {/* Other selected — text input for comment */}
                            {isOther && (
                                <>
                                    <Box sx={{ width: '1px', height: 24, bgcolor: 'rgba(103,58,183,0.3)', mx: 0.5 }} />
                                    <TextField
                                        autoFocus
                                        size="small"
                                        placeholder="Your comment…"
                                        value={comment}
                                        onChange={e => setComment(e.target.value)}
                                        sx={{
                                            width: 400,
                                            '& .MuiOutlinedInput-root': {
                                                fontSize    : 12,
                                                borderRadius: 2,
                                                bgcolor     : '#fff',
                                                '& fieldset'             : { borderColor: 'rgba(103,58,183,0.3)' },
                                                '&:hover fieldset'       : { borderColor: '#7C3AED' },
                                                '&.Mui-focused fieldset' : { borderColor: '#7C3AED' },
                                            },
                                        }}
                                    />
                                </>
                            )}

                            {/* Star rating — Appreciation widget only */}
                            {selectedWidget?.Widget_Id === 4 && (
                                <>
                                    <Box sx={{ width: '1px', height: 24, bgcolor: 'rgba(103,58,183,0.3)', mx: 0.5 }} />
                                    <Rating
                                        value={rating}
                                        onChange={(_, val) => setRating(val)}
                                        size="small"
                                        sx={{ color: '#388E3C' }}
                                    />
                                </>
                            )}

                            {/* Divider before Send */}
                            <Box sx={{ width: '1px', height: 24, bgcolor: 'rgba(103,58,183,0.3)', mx: 0.5 }} />

                            {/* Send — enabled only when option selected */}
                            <Chip
                                label={status === 'submitting' ? 'Sending…' : 'Send'}
                                icon={<SendIcon style={{ fontSize: 12 }} />}
                                onClick={handleSubmit}
                                disabled={!canSubmit}
                                size="small"
                                sx={{
                                    bgcolor          : '#7C3AED',
                                    color            : '#fff',
                                    fontWeight       : 600,
                                    fontSize         : 12,
                                    height           : 28,
                                    cursor           : 'pointer',
                                    flexShrink       : 0,
                                    '&:hover'        : { bgcolor: '#6D28D9' },
                                    '&.Mui-disabled' : { bgcolor: '#C4B5F4', color: '#fff' },
                                    '& .MuiChip-icon': { color: '#fff' },
                                }}
                            />

                            {/* Error message */}
                            {status === 'error' && (
                                <Typography sx={{ fontSize: 11, color: '#E24B4A', whiteSpace: 'nowrap' }}>
                                    {errorMsg}
                                </Typography>
                            )}

                        </Box>
                    </Collapse>
                </Box>
            )}
        </Box>
    );
};

export default UserFeedback;