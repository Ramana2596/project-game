// File: SignInForm.jsx
// Purpose: Handles manual user login and retrieves profile status for routing.

import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff, Email } from "@mui/icons-material";
// ✅ Service handles the API call to UI_User_Profile_Trans
import { loginUser } from "../services/authApiService.js";

const SignInForm = ({ onSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  // ✅ Visible authentication error state
  const [errorMessage, setErrorMessage] = useState("");

  // ✅ Handle input changes
  const handleChange = (e) => {
    // ✅ Clear previous errors when user edits input
    setErrorMessage("");

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Submit handler for manual login
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Clear previous errors before fresh attempt
    setErrorMessage("");
    setLoading(true);

    try {
      // ✅ Call service (maps to SP: UI_User_Profile_Trans)
      const res = await loginUser(formData);

      if (res.data?.success && res.data?.user) {
        // ✅ Return essential routing data to AuthHubPage
        onSuccess({
          userId: res.data.user.userId,
          profession: res.data.user.profession,
          isEnrolled: res.data.user.isEnrolled,
          userEmail: res.data.user.userEmail,
        });
      } else {
        // ✅ Invalid credentials or unexpected API response
        setErrorMessage(
          res.data?.message || "Invalid email or password."
        );
      }
    } catch (err) {
      console.error("Login Error:", err);

      // ✅ Visible network/server error
      setErrorMessage(
        err?.response?.data?.message ||
          "Unable to sign in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      {/* ✅ Visible login error alert */}
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}

      {/* ✅ Enterprise Standard: Clear labels and icons */}
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

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disabled={loading}
        sx={{
          mt: 3,
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