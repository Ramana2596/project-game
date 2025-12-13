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
    <Box sx={{ mb: 2.5 }}>
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        value={name}
        required
        onChange={onNameChange}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            fontSize: '15px',
            padding: '10px 14px',
            '&:hover fieldset': {
              borderColor: '#7b1fa2',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#7b1fa2',
            },
          },
          '& .MuiInputLabel-root': {
            fontSize: '14px',
          },
        }}
      />
    </Box>

    {/* 🔹 Email Input with validation */}
    <Box sx={{ mb: 2.5 }}>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        value={email}
        required
        onChange={onEmailChange}
        error={error}
        helperText={error ? "Please enter a valid email address" : ""}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            fontSize: '15px',
            padding: '10px 14px',
            '&:hover fieldset': {
              borderColor: '#7b1fa2',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#7b1fa2',
            },
          },
          '& .MuiInputLabel-root': {
            fontSize: '14px',
          },
        }}
      />
    </Box>

    {/* 🔹 Profession Dropdown */}
    <Box sx={{ mb: 2.5 }}>
      <FormControl fullWidth variant="outlined" required>
        <InputLabel sx={{ fontSize: '14px' }}>Profession</InputLabel>
        <Select
          value={profession}
          onChange={onProfessionChange}
          label="Profession"
          sx={{
            borderRadius: '12px',
            fontSize: '15px',
            padding: '10px 14px',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#7b1fa2',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#7b1fa2',
            },
          }}
        >
          {professionInfo.map((prof) => (
            <MenuItem key={prof.PF_Id} value={prof.PF_Id} sx={{ fontSize: '14px' }}>
              {prof.Profession}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>

    {/* 🔹 Learning Mode Dropdown */}
    <Box sx={{ mb: 2.5 }}>
      <FormControl fullWidth variant="outlined" required>
        <InputLabel sx={{ fontSize: '14px' }}>Learning Mode</InputLabel>
        <Select
          value={learningMode}
          onChange={onLearningModeChange}
          label="Learning Mode"
          sx={{
            borderRadius: '12px',
            fontSize: '15px',
            padding: '10px 14px',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#7b1fa2',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#7b1fa2',
            },
          }}
        >
          {learningModes.map((mode) => (
            <MenuItem key={mode.Learn_Mode} value={mode.Learn_Mode} sx={{ fontSize: '14px' }}>
              {mode.Learn_Mode}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>

    {/* 🔹 Action Buttons */}
    <Box sx={{ display: 'flex', gap: 2, mt: 3, justifyContent: 'flex-end' }}>
      <Button
        className="standard-button-secondary-button"
        onClick={onBack}
      >
        Back
      </Button>
      <Button type="submit" className="standard-button-primary-button" color="primary">
        Register
      </Button>
    </Box>

  </form>
);

export default RegistrationForm;
