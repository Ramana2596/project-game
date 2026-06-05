// src/pages/UserFeedback/hooks/useFeedback.js
import { useState, useCallback, useEffect } from 'react';
import { getFeedbackConfig, submitFeedback } from '../services/service';

// Manages all feedback widget state and API interactions
export function useFeedback(userId, uiId) {

    // Config state — widgets and options loaded from DB
    const [widgets, setWidgets]           = useState([]);
    const [allOptions, setAllOptions]     = useState([]);

    // Selection state
    const [selectedWidget, setSelectedWidget] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [comment, setComment]               = useState('');
    const [rating, setRating]                 = useState(0);

    // UI state
    const [status, setStatus]     = useState('idle');
    const [errorMsg, setErrorMsg] = useState('');

    // Options filtered for the currently selected widget
    const filteredOptions = selectedWidget
        ? allOptions.filter(o => o.Widget_Id === selectedWidget.Widget_Id)
        : [];

    // Load config once on mount — no longer tied to open/close
    useEffect(() => {
        const loadConfig = async () => {
            try {
                const res = await getFeedbackConfig();
                setWidgets(res.data.widgets  || []);
                setAllOptions(res.data.options || []);
            } catch {
                // Silent fail — panel still shows, empty gracefully
            }
        };
        loadConfig();
    }, []); // runs once on mount

    // Select widget — reset option and rating on change
    const handleWidgetSelect = useCallback((widget) => {
        setSelectedWidget(widget);
        setSelectedOption(null);
        setRating(0);
    }, []);

    // Reset all selections after submit
    const handleReset = useCallback(() => {
        setTimeout(() => {
            setSelectedWidget(null);
            setSelectedOption(null);
            setComment('');
            setRating(0);
            setStatus('idle');
            setErrorMsg('');
        }, 300);
    }, []);

    // Submit feedback to API
    const handleSubmit = useCallback(async () => {
        if (!selectedWidget || !selectedOption) return;
        setStatus('submitting');
        try {
            await submitFeedback({
                userId          : userId,
                uiId            : uiId,
                feedbackWidgetId: selectedWidget.Widget_Id,
                feedbackOptionId: selectedOption.Feedback_Option_Id,
                feedback        : comment.trim() || null,
                rating          : selectedWidget.Widget_Id === 4 ? rating || null : null,
            });
            setStatus('success');
            setTimeout(handleReset, 2000);
        } catch (err) {
            setStatus('error');
            setErrorMsg(err?.response?.data?.message || 'Could not save feedback. Please try again.');
        }
    }, [selectedWidget, selectedOption, comment, rating, userId, uiId, handleReset]);

    return {
        // State
        widgets, filteredOptions,
        selectedWidget, selectedOption,
        comment, rating,
        status, errorMsg,
        // Handlers
        handleWidgetSelect,
        setSelectedOption,
        setComment,
        setRating,
        handleSubmit,
    };
}