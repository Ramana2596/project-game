import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Card, CardContent } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { getUserProfile, registerUser } from "./services/service.js";
import ToastMessage from '../../components/ToastMessage.jsx';
import { useLoading } from "../../hooks/loadingIndicatorContext.js";
import RegistrationForm from './RegistrationForm.jsx';
import { API_STATUS, API_STATUS_MAP } from '../../utils/statusCodes.js';
import EnrollUserDialog from './EnrollUserDialog.jsx';

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
  const { setIsLoading } = useLoading();
  const routeHistory = useNavigate();

  // 🔹 Validate email input while typing
  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);

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

  // 🔹 Auto-hide the toast after 5 seconds
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
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await registerUser({
        name,
        email,
        pfId: profession,
        learnMode: learningMode,
        cmdLine: 'Add_User',
      });

      const { returnValue, userId, message } = res.data;
            console.log("Reg User Id: ", userId);
      const { severity, defaultMsg } =
        API_STATUS_MAP[returnValue] || API_STATUS_MAP[API_STATUS.SYSTEM_ERROR];

      setAlertData({
        severity,
        message: message || defaultMsg,
        isVisible: true,
      });

      // 🔹 On success → save userId and open EnrollUserDialog
      if (returnValue === API_STATUS.SUCCESS) {
         console.log("✅ RegisterPage: Received userId from API:", userId); //
        setRegisteredUserId(userId || null);
        setShowEnrollDialog(true);
      }

    } catch (err) {
      console.error('Unhandled error:', err);
      setAlertData({
        severity: 'error',
        message: 'Unhandled error ! Please try again',
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

      {/* 🔹 Enroll User Dialog Component */}
      console.log("✅ RegisterPage: Passing userId to EnrollUserDialog:", registeredUserId);

      <EnrollUserDialog
        open={showEnrollDialog}
        onClose={() => setShowEnrollDialog(false)}
        userId={registeredUserId}
        learnMode={learningMode}   // If null, "Class_Room"
        onResult={(alert) => setAlertData({ ...alert, isVisible: true })}
      />

      {/* 🔹 Toast message for feedback */}
      <ToastMessage
        open={alertData.isVisible}
        severity={alertData.severity}
        message={alertData.message}
      />         
    </Container>
  );
};

export default Register;
