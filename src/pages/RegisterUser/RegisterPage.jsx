import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Box, Typography, Card, CardContent, FormControl, InputLabel, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { getUserProfile, registerUser, enrollUser } from "./services/service.js"; // <-- updated import
import ToastMessage from '../../components/ToastMessage.jsx';
import { useLoading } from "../../hooks/loadingIndicatorContext.js";
import RegistrationForm from './RegistrationForm.jsx';
import { API_STATUS, API_STATUS_MAP } from '../../utils/statusCodes.js';
import EnrollDialog from './EnrollDialog.jsx';

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
    API_STATUS_MAP[returnValue] ||
    API_STATUS_MAP[API_STATUS.SYSTEM_ERROR];

        // Display an alert with the chosen severity and message
        setAlertData({
        severity,
        message: message || defaultMsg,
        isVisible: true,
        });

        // On success, save the new userId and open the enroll dialog
        if (returnValue === API_STATUS.SUCCESS) {
        setRegisteredUserId(userId || null);
        setShowEnrollDialog(true);
        }

    } catch (err) {
        // Handle network failures or unexpected exceptions
        console.error('Unhandled error:', err);

        // Show a generic error alert for unexpected failures
        setAlertData({
        severity: 'error',
        message: 'Unhandled error ! Please try again',
        isVisible: true,
        });

    } finally {
        // Always hide the loading spinner and log completion
        setIsLoading(false);
        console.log('Registration flow completed. Loading stopped.');
    }
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
        API_STATUS_MAP[returnValue] || API_STATUS_MAP[API_STATUS.SYSTEM_ERROR];

        // Display an alert with the chosen severity and message
        setAlertData({
        severity,
        message: message || defaultMsg,
        isVisible: true,
        });

        console.log(`Enrollment result: ${severity}`);
    } catch (err) {
        // Handle network failures or unexpected exceptions
        console.error('Unhandled error:', err);

        // Show a generic error alert for unexpected failures
        setAlertData({
        severity: 'error',
        message: 'Unhandled error ! Please try again.',
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
                        <RegistrationForm
                            name={name}
                            email={email}
                            profession={profession}
                            learningMode={learningMode}
                            professionInfo={professionInfo}
                            learningModes={learningModes}
                            error={error}
                            onNameChange={(e) => setName(e.target.value)}
                            onEmailChange={handleChange}
                            onProfessionChange={(e) => setProfession(e.target.value)}
                            onLearningModeChange={(e) => setLearningMode(e.target.value)}
                            onSubmit={handleSubmit}
                            onBack={() => routeHistory("/")}
                            />
                    </CardContent>
                </Card>
            </Box>
//  Enroll User Daialog 
            <EnrollDialog
                open={showEnrollDialog}
                onClose={() => setShowEnrollDialog(false)}
                onEnroll={handleEnroll}
            />
            <ToastMessage
                open={alertData.isVisible}
                severity={alertData.severity}
                message={alertData.message}
            />         
        </Container>
    );

};

export default Register;
