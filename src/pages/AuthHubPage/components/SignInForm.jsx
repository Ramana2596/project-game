// File: SignInForm.jsx
// User login and retrieves profile status for routing.

import React, { useState, useEffect, useRef } from "react"; 
import {
  TextField,
  Button,
  Box,
  InputAdornment,
  IconButton,
  Alert,
  Typography, 
} from "@mui/material";
import { Visibility, VisibilityOff, Email } from "@mui/icons-material";
import { loginUser } from "../services/authApiService.js";

const SignInForm = ({ onSuccess, onForgotPassword }) => { 
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //Monitor component mount & Unmount state to block downstream memory
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setErrorMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Manual login processing array data and field casing normalization
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      // API Call
      const res = await loginUser({
        ...formData,
        cmdLine: "Login_User",
      });
      // map the DB Snake_Case keys to camelCase for frontend consistency
      if (Array.isArray(res.data) && res.data.length > 0) {
        const dbUser = res.data[0];
        
        if (isMounted.current) { 
          onSuccess({
            userId: dbUser.User_Id,
            profession: dbUser.Profession,
            isEnrolled: dbUser.Is_Enrolled,
            userEmail: dbUser.User_Email,
          });
        }
      } else {
        if (isMounted.current) {
          setErrorMessage(
            res.data?.message || "Invalid email or password."
          );
        }
      }
    } catch (err) {
      console.error("Login Error:", err);
      if (isMounted.current) {
        setErrorMessage(
          err?.response?.data?.message ||
            "Unable to sign in. Please try again."
        );
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      {/* login error alert */}
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}

      {/* Labels and icons */}
      <TextField
        fullWidth
        label="Email Address"
        name="email"
        type="email"
        variant="outlined"
        margin="normal"
        required
        value={formData.email}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email fontSize="small" />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        fullWidth
        label="Password"
        name="password"
        type={showPassword ? "text" : "password"}
        variant="outlined"
        margin="normal"
        required
        value={formData.password}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* FORGOT PASSWORD TRIGGER LINK */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 0.5, mb: 1 }}>
        <Typography
          variant="caption"
          color="primary"
          sx={{
            cursor: "pointer",
            fontWeight: 500,
            "&:hover": { textDecoration: "underline" },
          }}
          onClick={() => onForgotPassword(formData.email)}
        >
          Forgot Password?
        </Typography>
      </Box>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disabled={loading}
        sx={{
          mt: 2,
          py: 1.5,
          fontWeight: 600,
          textTransform: "none",
          borderRadius: 2,
        }}
      >
        {loading ? "Signing in..." : "Sign in"}
      </Button>
    </Box>
  );
};

export default SignInForm;