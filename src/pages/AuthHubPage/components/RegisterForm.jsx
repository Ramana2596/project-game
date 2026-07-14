// File: RegisterForm.jsx
// Purpose: Step 1 of enterprise registration flow (Identity Capture Only - no credentials in this stage)

import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Typography,
  InputAdornment
} from "@mui/material";
import { Email, Person } from "@mui/icons-material";
import {
  fetchCountry,
  fetchProfession,
} from "../services/authApiService.js";

const RegisterForm = ({ onSuccess, oauthContext = null }) => {
  const [loading, setLoading] = useState(false);

  // LOV state
  const [professions, setProfessions] = useState([]);
  const [countries, setCountries] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");

  // FORM STATE (User Info - NO PASSWORDS)
  const [formData, setFormData] = useState({
    userName: oauthContext?.name || "",
    email: oauthContext?.email || "",
    professionId: "",
    countryId: ""
  });

  // Load dropdown values
  useEffect(() => {
    fetchProfession({ gameId: "OpsMgt" })
      .then((res) => setProfessions(res.data || []))
      .catch((err) => console.error("Profession fetch failed", err));

    fetchCountry({ gameId: "OpsMgt" })
      .then((res) => setCountries(res.data || []))
      .catch((err) => console.error("Country fetch failed", err));
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setErrorMessage("");
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Validate registration form
  const validateForm = () => {

    // Validate user name
    if (!formData.userName.trim()) {
      setErrorMessage("Full Name is required.");
      return false;
    }

    // Validate email format
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }

    // Validate profession
    if (!formData.professionId) {
      setErrorMessage("Please select a Profession.");
      return false;
    }

    // Validate country
    if (!formData.countryId) {
      setErrorMessage("Please select a Country.");
      return false;
    }

    return true;
  };

  // Submit User Info collect only, no DB write)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateForm()) return;

    setLoading(true);

    try {

      // Resolve selected profession
      const selectedProf = professions.find(
        (p) => p.PF_Id === formData.professionId
      );

      // Resolve selected country
      const selectedCountry = countries.find(
        (c) => c.Country_Id === formData.countryId
      );

      // Pass collected user context to password step
      onSuccess({
        userName: formData.userName,
        email: formData.email,
        professionId: formData.professionId,
        countryId: formData.countryId,
        profession: selectedProf?.Profession || "",
        country: selectedCountry?.Country || ""
      });

    } finally {
      setLoading(false);
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

      {/* Anti-autofill decoy */}
      <input
        type="text"
        name="fake_field"
        autoComplete="off"
        style={{ display: "none" }}
      />

      {/* User name input */}
      <TextField
        fullWidth
        label="Full Name"
        name="userName"
        size="small"
        value={formData.userName}
        onChange={handleChange}
        InputProps={{
          readOnly: oauthContext?.oauth,
          startAdornment: (
            <InputAdornment position="start">
              <Person fontSize="small" />
            </InputAdornment>
          )
        }}
      />

      {/* Email input */}
      <TextField
        fullWidth
        label="Email Address"
        name="email"
        type="email"
        size="small"
        value={formData.email}
        onChange={handleChange}
        InputProps={{
          readOnly: oauthContext?.oauth,
          startAdornment: (
            <InputAdornment position="start">
              <Email fontSize="small" />
            </InputAdornment>
          )
        }}
      />
 
      {/* Profession dropdown */}
      <TextField
        fullWidth
        select
        label="Profession"
        name="professionId"
        value={formData.professionId}
        onChange={handleChange}
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

      {/* Country dropdown */}
      <TextField
        fullWidth
        select
        label="Country"
        name="countryId"
        value={formData.countryId}
        onChange={handleChange}
        size="small"
        disabled={!countries.length || loading}
      >
        <MenuItem value="">Select Country</MenuItem>
        {countries.map((c) => (
          <MenuItem key={c.Country_Id} value={c.Country_Id}>
            {c.Country}
          </MenuItem>
        ))}
      </TextField>

      {/* Error message */}
      {errorMessage && (
        <Typography color="error" variant="body2">
          {errorMessage}
        </Typography>
      )}

      {/* Continue button */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disabled={loading} // future-safe
        sx={{
          mt: 1.5,
          py: 1.3,
          fontWeight: 600,
          textTransform: "none",
          borderRadius: 2
        }}
      >
        {loading ? "Loading..." : "Continue"} {/* future-safe */}
      </Button>

    </Box>
  );
};

export default RegisterForm;