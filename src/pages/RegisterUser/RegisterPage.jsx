import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Box, Typography, Card, CardContent, FormControl, InputLabel, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { getUserProfile, registerUser, enrollUser } from "./services/service.js"; // <-- updated import
import ToastMessage from '../../components/ToastMessage.jsx';
import { useLoading } from "../../hooks/loadingIndicatorContext.js";

const Register = () => {

    // 🔹 Local state for user inputs
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [profession, setProfession] = useState('');
    const [learningMode, setLearningMode] = useState('');
    
    // 🔹 Dropdown options from backend
    const [learningModes, setLearningModes] = useState([]);
    const [professionInfo, setProfessionData] = useState([]);

   // 🔹 Validation and feedback
    const [error, setError] = useState(false);
    const [alertData, setAlertData] = useState({
        severity: "",
        message: "",
        isVisible: false,
    });

    // 🔹 State for enrollment dialog
    const [showEnrollDialog, setShowEnrollDialog] = useState(false);
    const [registeredUserId, setRegisteredUserId] = useState(null);
    
    // 🔹 Hook for showing global loading spinner
    const { setIsLoading } = useLoading(); // <-- Use loading context

    // 🔹 Prepare payload for register API
    let registerUserPayload = {
        name: name,
        email: email,
        pfId: profession,
        learnMode: learningMode
    };

    const routeHistory = useNavigate();

    // 🔹 Validate email input while typing
    const handleChange = (e) => {
        const value = e.target.value;
        setEmail(value);

        // Regular expression to validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setError(!emailRegex.test(value));
    };

    // 🔹 On mount → fetch Profession and Learn Mode options
    useEffect(() => {
        setIsLoading(true);
        Promise.all([
            getUserProfile({ cmdLine: 'Profession', gameId: 'OpsMgt' }),
            getUserProfile({ cmdLine: 'Learn_Mode', gameId: 'OpsMgt' })
        ]).then(([profResponse, learnModeResponse]) => {
        //    console.log("Professions API:", profResponse);      // 🔹 Check what is returned
        //    console.log("Learn Modes API:", learnModeResponse); // 🔹 Just to confirm
            if (profResponse) {
                setProfessionData(profResponse.data);
            }
            if (learnModeResponse) {
                setLearningModes(learnModeResponse.data);
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
 
// REGISTER USER
    // Named codes for registerUser return values
    const REGISTER_STATUS = {
    SUCCESS: 0,
    BUSINESS_ERROR: 1,
    SYSTEM_ERROR: -1,
    };

    // Map each return code to its alert severity and default message
    const REGISTER_STATUS_MAP = {
    [REGISTER_STATUS.SUCCESS]: {
        severity: 'success',
        defaultMsg: 'User registered successfully!',
    },
    [REGISTER_STATUS.BUSINESS_ERROR]: {
        severity: 'warning',
        defaultMsg: 'Email already used.',
    },
    [REGISTER_STATUS.SYSTEM_ERROR]: {
        severity: 'error',
        defaultMsg: 'System error while registering!',
    },
    };

    // 🔹 Submit form → Call API to register user
    const handleSubmit = async (e) => {
    // Prevent the browser’s default form submission
    e.preventDefault();

    // Show a loading spinner
    setIsLoading(true);

    try {
        // Call the registerUser API and grab the full response
        const res = await registerUser({
        ...registerUserPayload,
        cmdLine: 'Add_User',
        });

        // Extract returnValue, userId, and message from the API’s data
        const { returnValue, userId, message } = res.data;

        // Lookup severity and default message, fallback to system error mapping
        const { severity, defaultMsg } =
        REGISTER_STATUS_MAP[returnValue] ||
        REGISTER_STATUS_MAP[REGISTER_STATUS.SYSTEM_ERROR];

        // Display an alert with the chosen severity and message
        setAlertData({
        severity,
        message: message || defaultMsg,
        isVisible: true,
        });

        // On success, save the new userId and open the enroll dialog
        if (returnValue === REGISTER_STATUS.SUCCESS) {
        setRegisteredUserId(userId || null);
        setShowEnrollDialog(true);
        }

    } catch (err) {
        // Handle network failures or unexpected exceptions
        console.error('Registration error:', err);

        // Show a generic error alert for unexpected failures
        setAlertData({
        severity: 'error',
        message: 'Unexpected error while registering! Please try again.',
        isVisible: true,
        });

    } finally {
        // Always hide the loading spinner and log completion
        setIsLoading(false);
        console.log('Registration flow completed. Loading stopped.');
    }
    };

// ENROLL USER
    // Define named codes for API return values
    const ENROLL_STATUS = {
    SUCCESS: 0,
    BUSINESS_ERROR: 1,
    SYSTEM_ERROR: -1,
    };

    // Map each return code to its alert severity and default message
    const STATUS_MAP = {
    [ENROLL_STATUS.SUCCESS]: {
        severity: 'success',
        defaultMsg: 'User enrolled successfully!',
    },
    [ENROLL_STATUS.BUSINESS_ERROR]: {
        severity: 'warning',
        defaultMsg: 'Enrollment failed – check your Learn Mode!',
    },
    [ENROLL_STATUS.SYSTEM_ERROR]: {
        severity: 'error',
        defaultMsg: 'System error while enrolling!',
    },
    };

    // 🔹 Submit → Call API to register user
    const handleEnroll = async () => {
    setShowEnrollDialog(false);
    if (!registeredUserId) return;
    setIsLoading(true);

    try {
        // Call the enrollUser API and grab the full response
        const res = await enrollUser({
        gameId: 'OpsMgt',
        userId: registeredUserId,
        learnMode: learningMode,
        });

        // Extract the API’s returnValue code and optional message
        const { returnValue, message } = res.data;

        // Lookup severity and default message, fallback to system error
        const { severity, defaultMsg } =
        STATUS_MAP[returnValue] || STATUS_MAP[ENROLL_STATUS.SYSTEM_ERROR];

        // Display an alert with the chosen severity and message
        setAlertData({
        severity,
        message: message || defaultMsg,
        isVisible: true,
        });

        console.log(`Enrollment result: ${severity}`);
    } catch (err) {
        // Handle network failures or unexpected exceptions
        console.error('Enrollment error:', err);

        // Show a generic error alert for unexpected failures
        setAlertData({
        severity: 'error',
        message: 'Unexpected error while enrolling! Please try again.',
        isVisible: true,
        });
    } finally {
        // Always hide the loading spinner and log completion
        setIsLoading(false);
        console.log('Enrollment flow completed.');
    }
    };


    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <Card sx={{ boxShadow: 3, width: 500, maxWidth: 800, padding: 2 }}>
                    <CardContent>
                        <Typography variant="h4" component="h1" gutterBottom className='standard-title-color'>
                            Register User Profile
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
                                            <MenuItem key={prof.PF_Id} value={prof.PF_Id}>
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
                                        {learningModes.map((mode) => (
                                            <MenuItem key={mode.Learn_Mode} value={mode.Learn_Mode}>
                                                {mode.Learn_Mode}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>

                            <Button type="submit" className='standard-button-primary-button' color="primary">
                                Register
                            </Button>
                            <Button sx={{ marginLeft: 30 }} className='standard-button-secondary-button' onClick={() => routeHistory("/")}>
                                Back
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Box>
            <Dialog open={showEnrollDialog} onClose={() => setShowEnrollDialog(false)}>
                <DialogTitle>Alert</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Do you want to enroll for the game?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowEnrollDialog(false)} color="secondary">
                        No
                    </Button>
                    <Button onClick={handleEnroll} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
            <ToastMessage
                open={alertData.isVisible}
                severity={alertData.severity}
                message={alertData.message}
            />
        </Container>
    );
};

export default Register;
