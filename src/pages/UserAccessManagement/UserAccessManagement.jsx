import React, { useState, useEffect } from 'react';
import { fetchEmails, fetchRoles } from '../UserAccessManagement/services/userAccessManagementService';
import { Container, Typography, FormControl, InputLabel, Select, MenuItem, FormGroup, FormControlLabel, Checkbox } from '@mui/material';

const UserAccessManagement = () => {
    const [emails, setEmails] = useState([]);
    const [roles, setRoles] = useState([]);
    const [selectedEmail, setSelectedEmail] = useState('');
    const [selectedRoles, setSelectedRoles] = useState([]);

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
        const role = event.target.value;
        setSelectedRoles((prevSelectedRoles) =>
            prevSelectedRoles.includes(role)
                ? prevSelectedRoles.filter((r) => r !== role)
                : [...prevSelectedRoles, role]
        );
    };

    return (
        <Container>
            <FormControl margin="normal" required sx={{ flexGrow: 1, width: "100%", maxWidth: 220 }}>
                <InputLabel id="emailSelectLabel">Select Email ID</InputLabel>
                <Select
                    labelId="emailSelectLabel"
                    id="emailSelect"
                    value={selectedEmail}
                    onChange={handleEmailChange}
                    label="Select Email ID"
                >
                    <MenuItem value="">
                        <em>Select an email</em>
                    </MenuItem>
                    {emails.map((email) => (
                        <MenuItem key={email} value={email}>
                            {email}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Typography variant="h6" gutterBottom>
                Name: {selectedEmail}
            </Typography>
            <Typography variant="h6" gutterBottom>
                Select Roles
            </Typography>
            <FormGroup>
                {roles.map((role) => (
                    <FormControlLabel
                        key={role}
                        control={
                            <Checkbox
                                checked={selectedRoles.includes(role)}
                                onChange={handleRoleChange}
                                value={role}
                            />
                        }
                        label={role}
                    />
                ))}
            </FormGroup>
        </Container>
    );
};

export default UserAccessManagement;
