// File: src/pages/AuthHubPage/components/ForgotPasswordForm.jsx
// Collect user email to trigger password recovery sequence

import React, { useState, useEffect, useRef } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Divider
} from "@mui/material";
import { requestPasswordReset } from "../services/authApiService.js"; 

// InitialEmail prop (email) payload from the parent
const ForgotPasswordForm = ({ initialEmail, onSuccess, onBack }) => {

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState(initialEmail || "");

  // LIFECYCLE CONTROLLER
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleChange = (e) => {
    setErrorMessage("");
    setEmail(e.target.value);
  };

  const validateForm = () => {
    if (!email) {
      setErrorMessage("Email address is required.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      // API call to send the recovery payload
      const res = await requestPasswordReset({ 
        gameId: "OpsMgt", 
        email: email,
//        cmdLine: "Reset_Password_Request" 
      });

      if (res.data && res.data.returnValue === 0) {
        if (isMounted.current) {
          onSuccess(res.data.message || "Reset link sent successfully.");
        }
      } else {
        if (isMounted.current) {
          setErrorMessage(
            res.data?.message || 
            "Unable to request password reset. Please try again."
          );
        }
      }

    } catch (err) {
      console.error("Forgot Password Error:", err);
      
      if (isMounted.current) {
        setErrorMessage(
          err?.response?.data?.message ||
          "Network error occurred. Please verify your connection."
        );
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      autoComplete="off"
      sx={{
        mt: 1,
        display: "flex",
        flexDirection: "column",
        gap: 1
      }}
    >
      <Typography variant="subtitle1" fontWeight={600}>
        Reset Your Password
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Enter the email address associated with your account to receive confirmation recovery details.
      </Typography>

      <Divider sx={{ my: 1 }} />

      <Box>
        <TextField
          fullWidth
          label="Email Address"
          name="email"
          type="email"
          size="small"
          value={email}
          onChange={handleChange}
          disabled={loading}
          placeholder="example@domain.com"
        />
      </Box>

      {errorMessage && (
        <Typography color="error" variant="body2" sx={{ mt: 0.5 }}>
          {errorMessage}
        </Typography>
      )}

      <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={onBack}
          disabled={loading}
        >
          Back
        </Button>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
          sx={{
            fontWeight: 600,
            textTransform: "none",
            borderRadius: 2
          }}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>
      </Box>
    </Box>
  );
};

export default ForgotPasswordForm;