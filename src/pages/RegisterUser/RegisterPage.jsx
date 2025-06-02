import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Box, Typography, Card, CardContent, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { getProfessionInfo, registerUser } from "./services/service.js";
import ToastMessage from '../../components/ToastMessage.jsx';
import { useLoading } from "../../hooks/loadingIndicatorContext.js"; // <-- Use shared loading context

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [profession, setProfession] = useState('');
    const [learningMode, setLearningMode] = useState('');
    const [error, setError] = useState(false);
    const [professionInfo, setProfessionData] = useState([]);
    const [alertData, setAlertData] = useState({
        severity: "",
        message: "",
        isVisible: false,
    });
    const { setIsLoading } = useLoading(); // <-- Use loading context

    let registerUserPayload = {
        name: name,
        email: email,
        pfId: profession,
        learnMode: learningMode
    };

    const routeHistory = useNavigate();

    const handleChange = (e) => {
        const value = e.target.value;
        setEmail(value);

        // Regular expression to validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setError(!emailRegex.test(value));
    };

    useEffect(() => {
        setIsLoading(true);
        getProfessionInfo().then((response) => {
            if (response) {
                setProfessionData(response.data);
            }
            setIsLoading(false);
        }).catch(() => setIsLoading(false));
    }, [setIsLoading]);

    // Auto-hide the toast after 5 seconds
    useEffect(() => {
        if (alertData.isVisible) {
            const timer = setTimeout(() => {
                setAlertData((prev) => ({ ...prev, isVisible: false }));
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [alertData.isVisible]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await registerUser({ ...registerUserPayload, cmdLine: 'Add_User' });
            if (response) {
                setAlertData({
                    severity: "success",
                    message: "User registered successfully!",
                    isVisible: true,
                });
            }
        } catch (err) {
            setAlertData({
                severity: "error",
                message: "Failed to register user.",
                isVisible: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <Card sx={{ boxShadow: 3, width: 500, maxWidth: 800, padding: 2 }}>
                    <CardContent>
                        <Typography variant="h4" component="h1" gutterBottom className='standard-title-color'>
                            Register
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Box sx={{ mb: 2 }}>
                                <TextField
                                    label="Name"
                                    variant="outlined"
                                    fullWidth
                                    value={name}
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    value={email}
                                    required
                                    onChange={handleChange}
                                    error={error}
                                    helperText={error ? "Please enter a valid email address" : ""}
                                />
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <FormControl fullWidth variant="outlined" required>
                                    <InputLabel>Profession</InputLabel>
                                    <Select
                                        value={profession}
                                        onChange={(e) => setProfession(e.target.value)}
                                        label="Profession"
                                    >
                                        {professionInfo.map((prof) => (
                                            <MenuItem key={prof.profession} value={prof.PF_Id}>
                                                {prof.Profession}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <FormControl fullWidth variant="outlined" required>
                                    <InputLabel>Learning Mode</InputLabel>
                                    <Select
                                        value={learningMode}
                                        onChange={(e) => setLearningMode(e.target.value)}
                                        label="Learning Mode"
                                    >
                                        <MenuItem value="class_room">class_room</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>

                            <Button type="submit" className='standard-button-primary-button' color="primary">
                                Register
                            </Button>
                            <Button sx={{ marginLeft: 5 }} className='standard-button-secondary-button' onClick={() => routeHistory("/")}>
                                Go Back to Welcome
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Box>
            <ToastMessage
                open={alertData.isVisible}
                severity={alertData.severity}
                message={alertData.message}
            />
        </Container>
    );
};

export default Register;
