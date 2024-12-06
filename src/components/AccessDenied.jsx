import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SecurityIcon from '@mui/icons-material/Security';

const AccessDenied = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/operationGame/gameDashBoard');
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <SecurityIcon color="error" sx={{ fontSize: 40 }} />
                <Typography component="h1" variant="h5" sx={{ marginTop: 2 }}>
                    Access Denied
                </Typography>
                <Typography variant="body1" align="center" sx={{ marginTop: 2 }}>
                    You do not have permission to view this page.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleGoBack}
                    sx={{ marginTop: 3 }}
                >
                    Go Back to Home
                </Button>
            </Box>
        </Container>
    );
};

export default AccessDenied;
