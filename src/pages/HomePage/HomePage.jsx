import * as React from 'react';
import { useState } from 'react';
import { Grid2 } from '@mui/material';
import { useLoading } from '../../hooks/loadingIndicatorContext.js';
import ToastMessage from '../../components/ToastMessage.jsx';
import { Box } from "@mui/material";

function HomePage() {
    const { setIsLoading } = useLoading();
    const [alertData, setAlertData] = useState({
        severity: '',
        message: '',
        isVisible: false,
    });

    return (
        <Box sx={{ flexGrow: 1, padding: 20 }}>
            <Grid2 container spacing={2}>
                Test
            </Grid2>
            <ToastMessage
                open={alertData.isVisible}
                severity={alertData.severity}
                message={alertData.message}
            />
        </Box>
    );
}

export default HomePage;
