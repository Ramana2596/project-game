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
        // Reset selection state when closing
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

    // ── Shared floating FAB ───────────────────────────────────────────────────
    const FeedbackFab = () => (
        <Tooltip title={open ? 'Close feedback' : 'Give feedback'} placement="right" arrow>
            <Box
                onClick={handleToggle}
                sx={{
                    position      : 'fixed',
                    bottom        : FAB_BOTTOM,
                    left          : FAB_LEFT,
                    zIndex        : 1300,
                    width         : FAB_SIZE,
                    height        : FAB_SIZE,
                    borderRadius  : '0 50% 0 0',  // only top-right curves; other corners flush with viewport edges
                    bgcolor       : open ? '#5B21B6' : '#7C3AED',
                    color         : '#fff',
                    display       : 'flex',
                    alignItems    : 'center',
                    justifyContent: 'center',
                    cursor        : 'pointer',
                    boxShadow     : '0 4px 14px rgba(103,58,183,0.45)',
                    transition    : 'background-color 0.2s, transform 0.2s, box-shadow 0.2s',
                    '&:hover'     : {
                        bgcolor  : '#6D28D9',
                        transform: 'scale(1.08)',
                        boxShadow: '0 6px 18px rgba(103,58,183,0.55)',
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
            <>
                <FeedbackFab />

                {/* Bottom sheet — appears above FAB when open */}
                <Collapse in={open} unmountOnExit>
                    <Box sx={{
                        position  : 'fixed',
                        bottom    : FAB_SIZE + 8,                  // sit just above the FAB
                        left      : FAB_LEFT,
                        zIndex    : 1299,
                        width     : 'calc(100vw - 32px)',
                        maxWidth  : 420,
                        bgcolor   : '#EDE9FE',
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
                                {/* Header */}
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                                        <FeedbackOutlinedIcon sx={{ fontSize: 16, color: '#5B21B6' }} />
                                        <Typography sx={{ fontSize: 13, fontWeight: 800, color: '#3B1FA3' }}>
                                            Page Feedback
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Widget selection */}
                                <Typography sx={{ fontSize: 11, fontWeight: 600, color: '#4A3880', mb: 1 }}>
                                    What type of feedback?
                                </Typography>
                                <FeedbackOptions
                                    widgets={widgets}
                                    selectedWidget={selectedWidget}
                                    onWidgetSelect={handleWidgetSelect}
                                />

                                {/* Options */}
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

                                {/* Actions */}
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
            </>
        );
    }

    // ── DESKTOP LAYOUT ────────────────────────────────────────────────────────
    // The feedback bar slides out to the RIGHT of the FAB, keeping both
    // anchored at the same vertical position (FAB_BOTTOM from the bottom).
    return (
        <>
            <FeedbackFab />

            {/* Feedback bar — positioned to start right where the FAB ends */}
            <Collapse in={open} orientation="horizontal" unmountOnExit>
                <Box
                    sx={{
                        position    : 'fixed',
                        bottom      : FAB_BOTTOM,
                        left        : FAB_LEFT + FAB_SIZE,        // start right at FAB's right edge, no gap
                        zIndex      : 1299,
                        height      : FAB_SIZE,
                        bgcolor     : '#EDE9FE',
                        border      : '1.5px solid rgba(103,58,183,0.3)',
                        borderTop   : '1.5px solid rgba(103,58,183,0.3)',
                        borderBottom: 'none',                     // flush with viewport bottom
                        borderRadius: `0 ${FAB_SIZE / 2}px ${FAB_SIZE / 2}px 0`,  // right side pills, left flush
                        boxShadow   : '0 4px 16px rgba(103,58,183,0.18)',
                        display     : 'flex',
                        alignItems  : 'center',
                        overflow    : 'hidden',
                        whiteSpace  : 'nowrap',
                    }}
                >
                    {status === 'success' ? (
                        <SuccessFlash inline />
                    ) : (
                        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', px: 0.5 }}>

                            {/* Label */}
                            <Box sx={{
                                display    : 'flex',
                                alignItems : 'center',
                                px         : 1.5,
                                height     : '100%',
                                borderRight: '1.5px solid rgba(103,58,183,0.2)',
                                flexShrink : 0,
                                bgcolor    : '#DDD6FE',
                            }}>
                                <Box>
                                    <Typography sx={{ fontSize: 13, fontWeight: 800, color: '#3B1FA3', lineHeight: 1 }}>
                                        Page Feedback
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Widget icons */}
                            <Box sx={{
                                display    : 'flex',
                                alignItems : 'center',
                                gap        : 0.5,
                                px         : 1,
                                height     : '100%',
                                borderRight: showOptions ? '1.5px solid rgba(103,58,183,0.2)' : 'none',
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
                                            sx={{ color: '#9E93C8', '&:hover': { color: '#5B21B6' } }}
                                        >
                                            <CloseIcon sx={{ fontSize: 14 }} />
                                        </IconButton>
                                    </Tooltip>
                                )}
                            </Box>

                            {/* Options pills */}
                            <Collapse in={showOptions} orientation="horizontal" unmountOnExit>
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

                                    {/* Comment field for "Other" */}
                                    {isOther && (
                                        <>
                                            <Box sx={{ width: 1, height: 20, bgcolor: 'rgba(103,58,183,0.25)', mx: 0.25 }} />
                                            <TextField
                                                autoFocus size="small"
                                                placeholder="Your comment…"
                                                value={comment}
                                                onChange={e => setComment(e.target.value)}
                                                sx={{
                                                    width: 260,
                                                    '& .MuiOutlinedInput-root': {
                                                        fontSize: 12, borderRadius: 2, bgcolor: '#fff',
                                                        '& fieldset'            : { borderColor: 'rgba(103,58,183,0.3)' },
                                                        '&:hover fieldset'      : { borderColor: '#7C3AED' },
                                                        '&.Mui-focused fieldset': { borderColor: '#7C3AED' },
                                                    },
                                                }}
                                            />
                                        </>
                                    )}

                                    {/* Star rating for Widget 4 */}
                                    {selectedWidget?.Widget_Id === 4 && (
                                        <>
                                            <Box sx={{ width: 1, height: 20, bgcolor: 'rgba(103,58,183,0.25)', mx: 0.25 }} />
                                            <Rating value={rating} onChange={(_, val) => setRating(val)} size="small" sx={{ color: '#388E3C' }} />
                                        </>
                                    )}

                                    <Box sx={{ width: 1, height: 20, bgcolor: 'rgba(103,58,183,0.25)', mx: 0.25 }} />

                                    {/* Send */}
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

                            {/* Inline close — always visible at bar's trailing edge */}
                            <Tooltip title="Close" placement="top" arrow>
                                <IconButton
                                    onClick={handleToggle}
                                    size="small"
                                    sx={{ mx: 0.5, color: '#9E93C8', flexShrink: 0, '&:hover': { color: '#5B21B6' } }}
                                >
                                    <CloseIcon sx={{ fontSize: 14 }} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    )}
                </Box>
            </Collapse>
        </>
    );
};

export default UserFeedback;
