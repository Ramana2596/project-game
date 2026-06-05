// src/pages/UserFeedback/UserFeedback.jsx
import React, { useState }       from 'react';
import {
    Box, Typography, Chip, Fade,
    TextField, Rating, Collapse,
    IconButton, Tooltip,
} from '@mui/material';
import SendIcon               from '@mui/icons-material/Send';
import CloseIcon              from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import FeedbackOutlinedIcon   from '@mui/icons-material/FeedbackOutlined';
import { useLocation }        from 'react-router-dom';
import { useUser }            from '../../core/access/userContext.jsx';
import { useFeedback }        from './hooks/useFeedback.js';
import FeedbackOptions        from './FeedbackOptions.jsx';

// Map route path to UI_Id
const resolveUiId = (pathname) => {
    const map = {
        '/operationGame/demo'             : '0_Demo',
        '/operationGame/welcomeOmtp'      : '0_Welcome',
        '/operationGame/initialisation'   : '1_Initialisation',
        '/operationGame/launchStrategy'   : '2_Launch_Strategy',
        '/operationGame/strategyPlan'     : '3_Strategy_Plan',
        '/operationGame/marketFactor'     : '4_Market_Factor',
        '/operationGame/operationDecision': '5_Operation_Decision',
        '/operationGame/operations'       : '6_Operations',
        '/operationGame/financeResults'   : '7_Finance_Results',
        '/operationGame/periodClosure'    : '8_Period_Closure',
        '/operationGame/cycleCompletion'  : '9_Cycle_Completion',
        '/login'                          : 'Login',
    };
    if (map[pathname]) return map[pathname];
    const key = Object.keys(map).find(k => pathname.startsWith(k));
    return key ? map[key] : pathname.replace('/operationGame/', '') || 'Unknown';
};

// Full-width feedback bar — 3 blocks: Feedback | Widgets+X | Options
const UserFeedback = () => {
    const { pathname } = useLocation();
    const { userInfo } = useUser();

    const userId = userInfo?.User_Id || null;
    const uiId   = resolveUiId(pathname);

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

    const canSubmit = !!selectedWidget && !!selectedOption && status !== 'submitting';
    const isOther   = selectedWidget?.Widget === 'Other';
    const showOptions = !!selectedWidget;

    // Close options block and reset selections
    const handleCloseOptions = () => {
        handleWidgetSelect(null);
        setSelectedOption(null);
        setComment('');
        setRating(0);
    };

    // Send then reset to original
    const handleSend = async () => {
        await handleSubmit();
    };

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
                height       : 52,
            }}
        >
            {/* Success flash */}
            {status === 'success' ? (
                <Fade in>
                    <Box sx={{
                        display       : 'flex',
                        alignItems    : 'center',
                        justifyContent: 'center',
                        gap           : 1.5,
                        height        : '100%',
                        bgcolor       : '#F0FDF4',
                        borderTop     : '2px solid #BBF7D0',
                    }}>
                        <CheckCircleOutlineIcon sx={{ fontSize: 22, color: '#1D9E75' }} />
                        <Typography sx={{ fontSize: 14, color: '#085041', fontWeight: 600 }}>
                            Thank you for your feedback!
                        </Typography>
                    </Box>
                </Fade>
            ) : (
                <Box sx={{
                    display   : 'flex',
                    alignItems: 'center',
                    height    : '100%',
                    overflow  : 'hidden',
                }}>
                    {/* ── Block 1: Feedback label — fixed, never moves ── */}
                    <Box sx={{
                        display    : 'flex',
                        alignItems : 'center',
                        gap        : 0.75,
                        px         : 2,
                        height     : '100%',
                        borderRight: '2px solid rgba(103,58,183,0.2)',
                        flexShrink : 0,
                        bgcolor    : '#DDD6FE',
                    }}>
                        <FeedbackOutlinedIcon sx={{ fontSize: 20, color: '#5B21B6' }} />
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

                        {/* X — always at end of widget block */}
                        <Tooltip title="Close" placement="top" arrow>
                            <IconButton
                                onClick={handleCloseOptions}
                                size="small"
                                sx={{
                                    color      : showOptions ? '#5B21B6' : '#B0A8D4',
                                    ml         : 0.5,
                                    '&:hover'  : { color: '#3B1FA3' },
                                }}
                            >
                                <CloseIcon sx={{ fontSize: 18 }} />
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
                            height    : 52,
                            whiteSpace: 'nowrap',
                        }}>
                            {/* Other — text input */}
                            {isOther ? (
                                <TextField
                                    size="small"
                                    placeholder="Describe your feedback…"
                                    value={comment}
                                    onChange={e => setComment(e.target.value)}
                                    sx={{
                                        width: 280,
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
                            ) : (
                                /* Option chips — horizontal, max 5 */
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
                                                    height     : 30,
                                                    '&:hover'  : { bgcolor: isSel ? '#6D28D9' : 'rgba(124,58,237,0.1)' },
                                                }}
                                            />
                                        );
                                    })}
                                </Box>
                            )}

                            {/* Star rating — Appreciation only */}
                            {selectedWidget?.Widget_Id === 4 && (
                                <>
                                    <Box sx={{ width: 1, height: 28, bgcolor: 'rgba(103,58,183,0.2)', mx: 0.5 }} />
                                    <Rating
                                        value={rating}
                                        onChange={(_, val) => setRating(val)}
                                        size="small"
                                        sx={{ color: '#388E3C' }}
                                    />
                                </>
                            )}

                            {/* Divider before Send */}
                            <Box sx={{ width: 1, height: 28, bgcolor: 'rgba(103,58,183,0.2)', mx: 0.5 }} />

                            {/* Send */}
                            <Chip
                                label={status === 'submitting' ? 'Sending…' : 'Send'}
                                icon={<SendIcon style={{ fontSize: 13 }} />}
                                onClick={handleSend}
                                disabled={!canSubmit}
                                size="medium"
                                sx={{
                                    bgcolor          : '#7C3AED',
                                    color            : '#fff',
                                    fontWeight       : 600,
                                    fontSize         : 13,
                                    height           : 34,
                                    cursor           : 'pointer',
                                    flexShrink       : 0,
                                    '&:hover'        : { bgcolor: '#6D28D9' },
                                    '&.Mui-disabled' : { bgcolor: '#C4B5F4', color: '#fff' },
                                    '& .MuiChip-icon': { color: '#fff' },
                                }}
                            />

                            {/* Error */}
                            {status === 'error' && (
                                <Typography sx={{ fontSize: 12, color: '#E24B4A', whiteSpace: 'nowrap' }}>
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