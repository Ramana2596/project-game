// File: RegisterForm.jsx
// Purpose: New user registration with enterprise-grade UX, compact spacing, validation clarity, and responsive form behavior.

import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Typography,
  InputAdornment,
  IconButton,
  Divider
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Person
} from "@mui/icons-material";
import {
  fetchCountries,
  fetchProfessions,
  registerUser
} from "../services/authApiService.js";

const RegisterForm = ({ onSuccess }) => {
  // Loading states
  const [loading, setLoading] = useState(false);

  // LOV state
  const [professions, setProfessions] = useState([]);
  const [countries, setCountries] = useState([]);

  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Visible UX error message
  const [errorMessage, setErrorMessage] = useState("");

  // Maintain registration form state
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    professionId: "",
    countryId: ""
  });

  // Fetch LOV metadata for Professions and Countries
  useEffect(() => {
    // Fetch Profession LOV
    fetchProfessions({ gameId: "OpsMgt" })
      .then((res) => setProfessions(res.data || []))
      .catch((err) => console.error("Profession fetch failed", err));

    // Fetch Country LOV
    fetchCountries({ gameId: "OpsMgt" })
      .then((res) => {
        const countryData = res.data || [];
        setCountries(countryData);
      })
      .catch((err) => console.error("Country fetch failed", err));
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    setErrorMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form before registration
  const validateForm = () => {
    if (!formData.userName.trim()) {
      setErrorMessage("Full Name is required.");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }

    if (!formData.password) {
      setErrorMessage("Password is required.");
      return false;
    }

    if (formData.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return false;
    }

    if (!formData.professionId) {
      setErrorMessage("Please select a Profession.");
      return false;
    }

    if (!formData.countryId) {
      setErrorMessage("Please select a Country.");
      return false;
    }

    return true;
  };

  // Submit handler for new registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Validate before API call
    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await registerUser({
        name: formData.userName,
        email: formData.email,
        password: formData.password,
        pfId: formData.professionId,
        countryId: formData.countryId,
        learnMode: "",
        cmdLine: "Add_User"
      });

      if (res.data && res.data.userId) {
        const selectedProf = professions.find(
          (p) => p.PF_Id === formData.professionId
        );

        const selectedCountry = countries.find(
          (c) => c.Country_Id === formData.countryId
        );

        onSuccess({
          userId: res.data.userId,
          profession: selectedProf?.Profession || "",
          country: selectedCountry?.Country || "",
          isEnrolled: false,
          userEmail: formData.email
        });
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Registration Error:", err);
      setErrorMessage(
        err?.response?.data?.message ||
          "Unable to create account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Render registration form UI
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mt: 1,
        display: "flex",
        flexDirection: "column",
        gap: 1
      }}
    >
      {/* IDENTITY SECTION */}
      <TextField
        fullWidth
        label="Full Name"
        name="userName"
        size="small"
        required
        autoComplete="name"
        value={formData.userName}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person fontSize="small" />
            </InputAdornment>
          )
        }}
      />

      <TextField
        fullWidth
        label="Email Address"
        name="email"
        type="email"
        size="small"
        required
        autoComplete="email"
        value={formData.email}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email fontSize="small" />
            </InputAdornment>
          )
        }}
      />

      <Divider sx={{ my: 0.5 }} />

      {/* SECURITY SECTION */}
      <TextField
        fullWidth
        label="Password"
        name="password"
        type={showPassword ? "text" : "password"}
        size="small"
        required
        autoComplete="new-password"
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
          )
        }}
      />

      <TextField
        fullWidth
        label="Confirm Password"
        name="confirmPassword"
        type={showConfirmPassword ? "text" : "password"}
        size="small"
        required
        autoComplete="new-password"
        value={formData.confirmPassword}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                edge="end"
              >
                {showConfirmPassword ? (
                  <VisibilityOff />
                ) : (
                  <Visibility />
                )}
              </IconButton>
            </InputAdornment>
          )
        }}
      />

      <Divider sx={{ my: 0.5 }} />

      {/* PROFILE SECTION */}
      <TextField
        fullWidth
        select
        label="Profession"
        name="professionId"
        value={formData.professionId}
        onChange={handleChange}
        required
        size="small"
        disabled={!professions.length || loading}
      >
        <MenuItem value="">Select Profession</MenuItem>
        {professions.map((option) => (
          <MenuItem key={option.PF_Id} value={option.PF_Id}>
            {option.Profession}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        select
        label="Country"
        name="countryId"
        value={formData.countryId}
        onChange={handleChange}
        required
        size="small"
        disabled={!countries.length || loading}
        helperText=" "
      >
        <MenuItem value="">Select Country</MenuItem>
        {countries.map((c) => (
          <MenuItem key={c.Country_Id} value={c.Country_Id}>
            {c.Country}
          </MenuItem>
        ))}
      </TextField>

      {/* ERROR MESSAGE */}
      {errorMessage && (
        <Typography color="error" variant="body2">
          {errorMessage}
        </Typography>
      )}

      {/* SUBMIT BUTTON */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disabled={loading}
        disableElevation
        sx={{
          mt: 1.5,
          py: 1.3,
          fontWeight: 600,
          textTransform: "none",
          borderRadius: 2
        }}
      >
        {loading ? "Creating Account..." : "Create Account"}
      </Button>
    </Box>
  );
};

export default RegisterForm;