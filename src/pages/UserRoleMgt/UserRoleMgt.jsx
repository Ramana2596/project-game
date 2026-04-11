// src/pages/UserRoleMgt/UserRoleMgt.jsx
// User Role Management Page

import { useState, useEffect } from 'react';
import { fetchAvailableUsers, fetchRoles, updateUserRole, fetchApprovedRoles } from './services/service.js';
import { Container, Grid, Typography, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Box, Button } from '@mui/material';
import ToastMessage from '../../components/ToastMessage.jsx';
import { useUser } from "../../core/access/userContext.jsx";
import { useLoading } from "../../hooks/loadingIndicatorContext.jsx";

// Manage User Role Assignment
const UserRoleMgt = () => {
    const { userInfo } = useUser();
    const gameId = userInfo?.gameId;
    const { setIsLoading } = useLoading();

    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [initialRoles, setInitialRoles] = useState([]);

    const [alertData, setAlertData] = useState({
        severity: "",
        message: "",
        isVisible: false,
    });

    // Fetch users and roles on initial load
    useEffect(() => {
        let isMounted = true;

        const fetchAll = async () => {
            setIsLoading(true);
            try {
                const [userData, allRoleData] = await Promise.all([
                    fetchAvailableUsers({ gameId }),
                    fetchRoles({ gameId }),
                ]);

                if (isMounted) {
                    setUsers(userData?.data?.Data || []);
                }
            } catch (error) {
                if (isMounted) {
                    setAlertData({
                        severity: "error",
                        message: "Failed to load data.",
                        isVisible: true,
                    });
                }
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        if (gameId) fetchAll();
        return () => { isMounted = false; };
    }, [gameId, setIsLoading]);

    // Handle user selection and fetch roles + approved roles
    const handleUserChange = async (event) => {
        const user = users.find(u => u.User_Email === event.target.value);
        setSelectedUser(user || null);

        if (user) {
            setIsLoading(true);
            try {
                // Fetch roles for selected user's profession
                const roleData = await fetchRoles({ gameId: userInfo.gameId, pfId: user.PF_Id });
                const rolesList = roleData?.data?.Data || [];
                setRoles(rolesList);

                // Fetch approved roles for selected user
                const approvedRolesRes = await fetchApprovedRoles({ gameId: userInfo.gameId, userId: user.User_Id });
                const approvedRoles = approvedRolesRes?.data?.Data || [];

                // Compute checked roles from approved roles
                let checkedRoles = [];
                if (approvedRoles.length > 0) {
                    const approvedRoleIds = approvedRoles.map(r => String(r.RL_Id));
                    checkedRoles = rolesList
                        .filter(role => approvedRoleIds.includes(String(role.RL_Id)))
                        .map(role => String(role.RL_Id));
                }

                setSelectedRoles(checkedRoles);
                setInitialRoles(checkedRoles);

            } catch (error) {
                setAlertData({
                    severity: "error",
                    message: "Failed to load user roles.",
                    isVisible: true,
                });
                setRoles([]);
                setSelectedRoles([]);
                setInitialRoles([]);
            } finally {
                setIsLoading(false);
            }
        } else {
            setRoles([]);
            setSelectedRoles([]);
            setInitialRoles([]);
        }
    };

    // Handle checkbox selection toggle for roles
    const handleRoleChange = (event) => {
        const value = event.target.value;

        setSelectedRoles((prev) =>
            prev.includes(value)
                ? prev.filter((roleId) => roleId !== value)
                : [...prev, value]
        );
    };

    // Detect changes by No of rows and roles
    const isChanged =
        selectedRoles.length !== initialRoles.length ||
        selectedRoles.some(r => !initialRoles.includes(r));

    // Handle approve action with delta role updates (Add/Delete)
    const handleApprove = async () => {
        if (selectedUser && isChanged) {
            setIsLoading(true);
            try {
                // Identify added and removed roles
                const addedRoles = selectedRoles.filter(r => !initialRoles.includes(r));
                const removedRoles = initialRoles.filter(r => !selectedRoles.includes(r));

                // Build payload with roles list
                const userRoleList = [
                    ...addedRoles.map(roleId => ({
                        gameId,
                        userId: selectedUser.User_Id,
                        roleId,
                        cmdLine: 'Add_Role'
                    })),
                    ...removedRoles.map(roleId => ({
                        gameId,
                        userId: selectedUser.User_Id,
                        roleId,
                        cmdLine: 'Delete_Role'
                    }))
                ];

                if (userRoleList.length === 0) return;

                const response = await updateUserRole(userRoleList);

                if (response) {
                    setAlertData({
                        severity: "success",
                        message: "User role updated successfully!",
                        isVisible: true,
                    });
                } else {
                    setAlertData({
                        severity: "error",
                        message: response?.error || "Failed to update user role.",
                        isVisible: true,
                    });
                }

                // Reset baseline after update
                setInitialRoles([...selectedRoles]);

            } catch (error) {
                setAlertData({
                    severity: "error",
                    message: `Code: ${error?.response?.status} - ${error?.response?.data?.Message}`,
                    isVisible: true,
                });
            } finally {
                setIsLoading(false);
            }
        }
    };

    // Auto-hide toast message after display
    useEffect(() => {
        if (alertData.isVisible) {
            const timer = setTimeout(() => {
                setAlertData((prev) => ({ ...prev, isVisible: false }));
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [alertData.isVisible]);

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

                {/* Left Section - User Selection */}
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
                            <Select
                                value={selectedUser ? selectedUser.User_Email : ""}
                                onChange={handleUserChange}
                                sx={{ backgroundColor: '#f0f0f0', borderRadius: 2 }}
                            >
                                <MenuItem value=""><em>Select an email</em></MenuItem>
                                {users.map((user) => (
                                    <MenuItem key={user.User_Id} value={user.User_Email}>
                                        {user.User_Email}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Typography className='standard-title-color' variant="h6" sx={{ mt: 2, color: 'blue' }}>
                            Name: <span className='standard-text-color'>{selectedUser ? selectedUser.User_Name : "Not selected"}</span>
                        </Typography>
                        <Typography className='standard-title-color' variant="h6" sx={{ mt: 1, color: 'blue' }}>
                            Profession: <span className='standard-text-color'>{selectedUser ? selectedUser.Profession : "Not selected"}</span>
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
                            {roles.length === 0 && (
                                <Typography variant="body2" color="text.secondary">
                                    No roles available for this profession.
                                </Typography>
                            )}

                            {roles.map((role) => (
                                <FormControlLabel
                                    key={role.RL_Id}
                                    control={
                                        <Checkbox
                                            checked={selectedRoles.includes(String(role.RL_Id))}
                                            onChange={handleRoleChange}
                                            value={String(role.RL_Id)}
                                            sx={{ color: 'primary.main' }}
                                        />
                                    }
                                    label={role.Role}
                                />
                            ))}
                        </FormControl>

                        {/* Approve button enabled only when valid changes exist */}
                        <Button
                            fullWidth
                            className="standard-button-primary-button"
                            disabled={!selectedUser || roles.length === 0 || !isChanged}
                            onClick={handleApprove}
                        >
                            Approve
                        </Button>

                    </Box>
                </Grid>

            </Grid>

            <ToastMessage
                open={alertData.isVisible}
                severity={alertData.severity}
                message={alertData.message}
            />
        </Container>
    );
};

export default UserRoleMgt;