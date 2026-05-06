// File: RegisterForm.jsx
// Purpose: Handles new user registration using SP: UI_User_Profile_Trans with Add_User command.

import React, { useState, useEffect } from "react";
import { TextField, Button, Box, MenuItem } from "@mui/material";
// ✅ Services for registration and fetching profession metadata
import { registerUser, getUserProfile } from "../services/authApiService.js";

const RegisterForm = ({ onSuccess }) => {
  const [professions, setProfessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    professionId: "" // Maps to @PF_Id in SP
  });

  // ✅ Fetch profession metadata on mount
  useEffect(() => {
    getUserProfile({ cmdLine: "Get_Professions", gameId: "OpsMgt" })
      .then((res) => setProfessions(res.data || []))
      .catch((err) => console.error("Metadata fetch failed", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Submit handler for new registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // ✅ Call service (maps to SP: UI_User_Profile_Trans @CMD_Line='Add_User')
      const res = await registerUser({
        ...formData,
        gameId: "OpsMgt"
      });

      if (res.data && res.data.User_Id) {
        // ✅ New users are not enrolled by default
        onSuccess({
          userId: res.data.User_Id,
          profession: professions.find(p => p.PF_Id === formData.professionId)?.PF_Name,
          isEnrolled: false
        });
      }
    } catch (err) {
      console.error("Registration Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        fullWidth
        label="Full Name"
        name="userName"
        margin="normal"
        required
        onChange={handleChange}
      />
      <TextField
        fullWidth
        label="Email Address"
        name="email"
        type="email"
        margin="normal"
        required
        onChange={handleChange}
      />
      <TextField
        fullWidth
        label="Password"
        name="password"
        type="password"
        margin="normal"
        required
        onChange={handleChange}
      />
      {/* ✅ Profession Selector required for Enrollment Rule check */}
      <TextField
        fullWidth
        select
        label="Profession"
        name="professionId"
        margin="normal"
        required
        value={formData.professionId}
        onChange={handleChange}
      >
        {professions.map((option) => (
          <MenuItem key={option.PF_Id} value={option.PF_Id}>
            {option.PF_Name}
          </MenuItem>
        ))}
      </TextField>
      
      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disabled={loading}
        sx={{ mt: 3, py: 1.5, fontWeight: 600, textTransform: "none", borderRadius: 2 }}
      >
        {loading ? "Creating account..." : "Create account"}
      </Button>
    </Box>
  );
};

export default RegisterForm;