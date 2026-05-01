// File: src/authHub/AuthForm.jsx
// Purpose: Controlled manual registration/login form

import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { registerUser } from "./authService.js";

const AuthForm = ({ onSuccess }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser({ name, email });
      if (res.success) {
        onSuccess(res.userId);
      }
    } catch {
      console.error("Registration failed");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField label="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <TextField label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Button type="submit" variant="contained" color="success">Register</Button>
    </Box>
  );
};

export default AuthForm;
