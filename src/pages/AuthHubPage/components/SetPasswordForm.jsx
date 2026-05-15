// File: src/pages/AuthHubPage/components/SetPasswordForm.jsx
// collect password and create complete user profile

import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
  IconButton,
  Divider
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { registerUser } from "../services/authApiService.js";

const SetPasswordForm = ({ userContext, onSuccess, onBack }) => {

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Password form state
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  });

  // Handle form input change
  const handleChange = (e) => {
    setErrorMessage("");
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Validate password form
  const validateForm = () => {

    // Validate registration context exists
    if (!userContext) {
      setErrorMessage("Registration session expired. Please register again.");
      return false;
    }

    // Validate password required
    if (!formData.password) {
      setErrorMessage("Password is required.");
      return false;
    }

    // Lightweight validation to reduce browser warnings
    if (formData.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return false;
    }

    // Validate password confirmation
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return false;
    }

    return true;
  };

  // Submit full registration with password
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateForm()) return;

    setLoading(true);

    try {

      // Create full user only after password is provided
      const res = await registerUser({
        name: userContext.userName,
        email: userContext.email,
        password: formData.password,
        pfId: userContext.professionId,
        countryId: userContext.countryId,
        learnMode: "",
        cmdLine: "Add_User"
      });

      // Validate API success response
      if (res.data && res.data.returnValue === 0) {

        onSuccess({
          userId: res.data.userId,
          email: userContext.email,
          status: "ACTIVE"
        });

      } else {
        setErrorMessage(
          res.data?.message ||
          "Failed to create account. Please try again."
        );
      }

    } catch (err) {
      console.error("Password Setup Error:", err);

      setErrorMessage(
        err?.response?.data?.message ||
        "Unable to create account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Guard against invalid navigation
  if (!userContext) {
    return (
      <Box sx={{ mt: 2 }}>
        <Typography color="error" variant="body2">
          Registration session expired. Please restart registration.
        </Typography>

        <Button
          fullWidth
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={onBack}
        >
          Back
        </Button>
      </Box>
    );
  }

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

      {/* Password setup heading */}
      <Typography variant="subtitle1" fontWeight={600}>
        Set Your Password
      </Typography>

      {/* Account display */}
      <Typography variant="body2" color="text.secondary">
        Account: {userContext.email}
      </Typography>

      <Divider sx={{ my: 1 }} />

      {/* Password input */}
      <TextField
        fullWidth
        label="Password"
        name="password"
        type={showPassword ? "text" : "password"}
        size="small"
        value={formData.password}
        onChange={handleChange}
        autoComplete="new-password"
        helperText="Minimum 6 characters"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />

      {/* Confirm password input */}
      <TextField
        fullWidth
        label="Confirm Password"
        name="confirmPassword"
        type={showConfirmPassword ? "text" : "password"}
        size="small"
        value={formData.confirmPassword}
        onChange={handleChange}
        autoComplete="new-password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />

      {/* Error message */}
      {errorMessage && (
        <Typography color="error" variant="body2">
          {errorMessage}
        </Typography>
      )}

      {/* Action buttons */}
      <Box sx={{ display: "flex", gap: 1, mt: 1 }}>

        <Button
          fullWidth
          variant="outlined"
          onClick={onBack}
          disabled={loading}
        >
          Cancel
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
          {loading ? "Creating..." : "Set Password"}
        </Button>

      </Box>

    </Box>
  );
};

export default SetPasswordForm;