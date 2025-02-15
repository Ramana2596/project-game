import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography, Card, CardContent } from '@mui/material';
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const routeHistory = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the form submission logic here
        console.log('First Name:', firstName);
        console.log('Last Name:', lastName);
        console.log('Email:', email);
    };

    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <Card sx={{ boxShadow: 3, width: 500, maxWidth: 800, padding: 2 }}>
                    <CardContent>
                        <Typography variant="h4" component="h1" gutterBottom>
                            Register
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Box sx={{ mb: 2 }}>
                                <TextField
                                    label="First Name"
                                    variant="outlined"
                                    fullWidth
                                    value={firstName}
                                    required
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <TextField
                                    label="Last Name"
                                    variant="outlined"
                                    fullWidth
                                    value={lastName}
                                    required
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    value={email}
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Box>
                            <Button type="submit" variant="contained" color="primary">
                                Register
                            </Button>
                            <Button sx={{ marginLeft: 5 }} variant="contained" color="white" onClick={() => routeHistory("/")}>
                                Go Back to Welcome
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

export default Register;
