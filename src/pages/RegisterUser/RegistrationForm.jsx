import React from 'react';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

// 🔹 RegistrationForm component: Controlled form for Name, Email, Profession, Learning Mode
const RegistrationForm = ({
  name,
  email,
  profession,
  learningMode,
  professionInfo,
  learningModes,
  error,
  onNameChange,
  onEmailChange,
  onProfessionChange,
  onLearningModeChange,
  onSubmit,
  onBack
}) => (
  <form onSubmit={onSubmit}>
    
    {/* 🔹 Name Input */}
    <Box sx={{ mb: 2 }}>
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        value={name}
        required
        onChange={onNameChange}
      />
    </Box>

    {/* 🔹 Email Input with validation */}
    <Box sx={{ mb: 2 }}>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        value={email}
        required
        onChange={onEmailChange}
        error={error}
        helperText={error ? "Please enter a valid email address" : ""}
      />
    </Box>

    {/* 🔹 Profession Dropdown */}
    <Box sx={{ mb: 2 }}>
      <FormControl fullWidth variant="outlined" required>
        <InputLabel>Profession</InputLabel>
        <Select
          value={profession}
          onChange={onProfessionChange}
          label="Profession"
        >
          {professionInfo.map((prof) => (
            <MenuItem key={prof.PF_Id} value={prof.PF_Id}>
              {prof.Profession}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>

    {/* 🔹 Learning Mode Dropdown */}
    <Box sx={{ mb: 2 }}>
      <FormControl fullWidth variant="outlined" required>
        <InputLabel>Learning Mode</InputLabel>
        <Select
          value={learningMode}
          onChange={onLearningModeChange}
          label="Learning Mode"
        >
          {learningModes.map((mode) => (
            <MenuItem key={mode.Learn_Mode} value={mode.Learn_Mode}>
              {mode.Learn_Mode}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>

    {/* 🔹 Action Buttons */}
    <Button type="submit" className="standard-button-primary-button" color="primary">
      Register
    </Button>
    <Button
      sx={{ marginLeft: 30 }}
      className="standard-button-secondary-button"
      onClick={onBack}
    >
      Back
    </Button>

  </form>
);

export default RegistrationForm;
