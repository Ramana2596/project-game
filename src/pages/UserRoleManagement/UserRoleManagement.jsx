import React, { useState, useEffect } from 'react';
import { fetchEmails, fetchRoles, approveUserRole } from './services/userRoleManagementService';
import { Container, Grid, Typography, FormControl, InputLabel, Select, MenuItem, RadioGroup, FormControlLabel, Radio, Box, Button } from '@mui/material';

const UserRoleManagement = () => {
    const [emails, setEmails] = useState([]);
    const [roles, setRoles] = useState([]);
    const [selectedEmail, setSelectedEmail] = useState('');
    const [selectedRoles, setSelectedRoles] = useState('');

    useEffect(() => {
        loadEmails();
        loadRoles();
    }, []);

    const loadEmails = async () => {
        try {
            const emailData = await fetchEmails();
            setEmails(emailData);
        } catch (error) {
            console.error('Failed to load emails:', error);
        }
    };

    const loadRoles = async () => {
        try {
            const roleData = await fetchRoles();
            setRoles(roleData);
        } catch (error) {
            console.error('Failed to load roles:', error);
        }
    };

    const handleEmailChange = (event) => {
        setSelectedEmail(event.target.value);
    };

    const handleRoleChange = (event) => {
        setSelectedRoles(event.target.value);
    };

    const handleApprove = async () => {
        if (selectedEmail && selectedRoles) {
            try {
                await approveUserRole({ userId: selectedEmail, selectedRole: selectedRoles });
                alert('User role approved successfully!');
            } catch (error) {
                console.error('Approval failed:', error);
                alert('Failed to approve user role.');
            }
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Grid
                container
                spacing={3}
                sx={{
                    backgroundColor: '#f9f9f9',
                    p: 3,
                    borderRadius: 2,
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: 3,
                }}
            >

                {/* Left Section - Email Selection */}
                <Grid xs={12} sm={6} sx={{
                    backgroundColor: '#f9f9f9',
                    p: 2,
                    borderRadius: 2,
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: 2,
                }}>
                    <Box sx={{ p: 2, backgroundColor: '#fff', borderRadius: 2, boxShadow: '0px 2px 6px rgba(0,0,0,0.1)', width: '100%' }}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Select Email ID</InputLabel>
                            <Select value={selectedEmail} onChange={handleEmailChange} sx={{ backgroundColor: '#f0f0f0', borderRadius: 2 }}>
                                <MenuItem value=""><em>Select an email</em></MenuItem>
                                {emails.map((email) => <MenuItem key={email} value={email}>{email}</MenuItem>)}
                            </Select>
                        </FormControl>

                        <Typography className='standard-title-color' variant="h6" sx={{ mt: 2, color: 'blue' }}>
                            Name: <span className='standard-text-color'>{selectedEmail || "Not selected"}</span>
                        </Typography>
                        <Typography className='standard-title-color' variant="h6" sx={{ mt: 1, color: 'blue' }}>
                            Profession: <span className='standard-text-color'>{selectedEmail || "Not selected"}</span>
                        </Typography>
                    </Box>
                </Grid>

                {/* Right Section - Role Selection & Approve Button */}
                <Grid xs={12} sm={6} sx={{
                    backgroundColor: '#f9f9f9',
                    p: 2,
                    borderRadius: 2,
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: 2,
                }}>
                    <Box sx={{ p: 2, backgroundColor: '#fff', borderRadius: 2, boxShadow: '0px 2px 6px rgba(0,0,0,0.1)', width: '100%' }}>
                        <Typography className='standard-title-color' variant="h6" sx={{ mb: 2, color: 'blue' }}>
                            Select Role
                        </Typography>
                        <FormControl component="fieldset">
                            <RadioGroup value={selectedRoles} onChange={handleRoleChange}>
                                {roles.map((role) => (
                                    <FormControlLabel key={role} value={role} control={<Radio sx={{ color: 'primary.main' }} />} label={role} />
                                ))}
                            </RadioGroup>
                        </FormControl>

                        {/* Approve Button */}
                        <Button
                            fullWidth
                            className="standard-button-primary-button"
                            disabled={!selectedEmail || !selectedRoles}
                            onClick={handleApprove}
                        >
                            Approve
                        </Button>

                    </Box>
                </Grid>

            </Grid>
        </Container>
    );
};

export default UserRoleManagement;
