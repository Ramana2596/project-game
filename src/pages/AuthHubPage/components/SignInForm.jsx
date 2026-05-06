// File: SignInForm.jsx
// Purpose: Handles manual user login and retrieves profile status for routing.

import React, { useState } from "react";
import { TextField, Button, Box, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff, Email } from "@mui/icons-material";
// ✅ Service handles the API call to UI_User_Profile_Trans
import { loginUser } from "../services/authApiService.js";

const SignInForm = ({ onSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Submit handler for manual login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // ✅ Call service (maps to SP: UI_User_Profile_Trans)
      const res = await loginUser(formData);
      
      if (res.data && res.data.User_Id) {
        // ✅ Return essential routing data to AuthHubPage
        onSuccess({
          userId: res.data.User_Id,
          profession: res.data.Profession,
          isEnrolled: res.data.Is_Enrolled
        });
      }
    } catch (err) {
      console.error("Login Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      {/* ✅ Enterprise Standard: Clear labels and icons */}
      <TextField
        fullWidth
        label="Email Address"
        name="email"
        variant="outlined"
        margin="normal"
        required
        value={formData.email}
        onChange={handleChange}
        InputProps={{
          startAdornment: <InputAdornment position="start"><Email fontSize="small" /></InputAdornment>,
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
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
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
        sx={{ mt: 3, py: 1.5, fontWeight: 600, textTransform: "none", borderRadius: 2 }}
      >
        {loading ? "Signing in..." : "Sign in"}
      </Button>
    </Box>
  );
};

export default SignInForm;