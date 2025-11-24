import * as React from 'react';
import { useState } from 'react';
import { useLoading } from '../../hooks/loadingIndicatorContext.jsx';
import ToastMessage from '../../components/ToastMessage.jsx';
import { pageConstants } from './constants/pageConstants.js';
import { Box } from "@mui/material";
import CustomizedAccordions from '../../components/CustomizedAccordian.jsx';

function FeatureManagement() {
    const { setIsLoading } = useLoading();
    const [alertData, setAlertData] = useState({
        severity: '',
        message: '',
        isVisible: false,
    });

    return (
        <Box sx={{ flexGrow: 1, padding: '10px' }}>
            <CustomizedAccordions accordianList={pageConstants.accordianList}></CustomizedAccordions>
            <ToastMessage
                open={alertData.isVisible}
                severity={alertData.severity}
                message={alertData.message}
            />
        </Box>
    );
}

export default FeatureManagement;
