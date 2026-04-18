// src/pages/UserRoleMgt/UserRoleMgt.jsx
// User Role Management Page

import { useState, useEffect } from 'react';
import { fetchUsers, fetchRoles, updateUserRole, fetchApprovedRoles } from './services/service.js';
import { Container, Grid, Typography, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Box, Button } from '@mui/material';
import ToastMessage from '../../components/ToastMessage.jsx';
import { useUser } from "../../core/access/userContext.jsx";
import { useLoading } from "../../hooks/loadingIndicatorContext.jsx";
import { create } from 'canvas-confetti';

// Manage User Role Assignment
const UserRoleMgt = () => {

    // Approver
    const { user, userInfo } = useUser();
    const approvedByUserId = user?.userId;   // approver
    const gameId = userInfo?.gameId;

    const { setIsLoading } = useLoading();

    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [initialRoles, setInitialRoles] = useState([]);
    const [roleConflictMap, setRoleConflictMap] = useState({}); // Role conflict map

    const [alertData, setAlertData] = useState({
        severity: "",
        message: "",
        isVisible: false,
    });

    // Fetch initial user list
    useEffect(() => {
        let isMounted = true;

        const fetchAll = async () => {
            setIsLoading(true);
            try {
                const userData = await fetchUsers({ gameId });
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

    // Loads roles, conflicts, and existing approvals of selected user
    const handleUserChange = async (event) => {

        // User by email selection
        const selectedUserObj = users.find(u => u.User_Email === event.target.value);
        setSelectedUser(selectedUserObj || null);
        if (!selectedUserObj) {
            setRoles([]);
            setSelectedRoles([]);
            setInitialRoles([]);
            setRoleConflictMap({});
            return;
        }
        setIsLoading(true);

        try {
            const roleData = await fetchRoles({
                gameId: gameId,
                pfId: selectedUserObj.PF_Id
            });
            const rolesList = roleData?.data?.Data || [];

            // Map Conflicting_Id
            const conflictMap = {};

            rolesList.forEach(row => {
                const id = String(row.RL_Id);
                if (row.Conflicting_Id) {
                    conflictMap[id] = String(row.Conflicting_Id)
                        .split(',')
                        .map(x => x.trim())
                        .filter(Boolean);
                } else {
                    conflictMap[id] = [];
                }
            });

            setRoles(rolesList);
            setRoleConflictMap(conflictMap);

            // Fetch Approved Roles (ACTIVE Only from VIEW)
            const approvedRolesRes = await fetchApprovedRoles({
                gameId: gameId,
                userId: selectedUserObj.User_Id
            });

            const approvedRoles = approvedRolesRes?.data?.Data || [];

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
            setRoleConflictMap({});
        } finally {
            setIsLoading(false);
        }
    };

    // Handles mutual exclusivity /checkbox toggling
    const handleRoleChange = (event) => {

        const roleId = String(event.target.value);
        const isChecking = event.target.checked;

        setSelectedRoles(prev => {
            if (isChecking) {
                // Remove conflicts from selected Roles
                const conflicts = roleConflictMap[roleId] || [];
                const filteredRoles = prev.filter(id => !conflicts.includes(id));
                return [...filteredRoles, roleId];
            } else {
                return prev.filter(id => id !== roleId);
            }
        });
    };

    // Detects changes between initial and current role
    const isChanged =
        selectedRoles.length !== initialRoles.length ||
        selectedRoles.some(r => !initialRoles.includes(r));

    // Processes role changes: Add/Revoke commands
    const handleApprove = async () => {

        if (!selectedUser || !isChanged) return;

        setIsLoading(true);

        try {
            // Process finalized roles and calculate deltas
            const currentRoles = [...selectedRoles];
            const previousRoles = [...initialRoles];

            // Delta changes as Add and Revoke payloads
            const addedRoles = currentRoles.filter(r => !previousRoles.includes(r));
            const revokedRoles = previousRoles.filter(r => !currentRoles.includes(r));

            // Prioritize Revokes before Add to avoid uniqueness conflicts
            const userRoleList = [
                ...revokedRoles.map(roleId => ({
                    gameId,
                    userId: selectedUser.User_Id,
                    roleId: roleId,
                    approvedBy: approvedByUserId,
                    cmdLine: 'Revoke_Role'
                })),
                ...addedRoles.map(roleId => ({
                    gameId,
                    userId: selectedUser.User_Id,
                    roleId: roleId,
                    approvedBy: approvedByUserId,
                    cmdLine: 'Add_Role'
                }))
            ];

            if (userRoleList.length === 0) return;

            const response = await updateUserRole(userRoleList);

            setAlertData({
                severity: response ? "success" : "error",
                message: response
                    ? "User role updated successfully!"
                    : (response?.error || "Failed to update user role."),
                isVisible: true,
            });

            // Update initial state after successful update 
            setInitialRoles([...currentRoles]);

        } catch (error) {

            setAlertData({
                severity: "error",
                message: `Code: ${error?.response?.status} - ${error?.response?.data?.Message}`,
                isVisible: true,
            });

        } finally {
            setIsLoading(false);
        }
    };

    // Toast Message auto-hide effect
    useEffect(() => {
        if (!alertData.isVisible) return;

        const timer = setTimeout(() => {
            setAlertData(prev => ({ ...prev, isVisible: false }));
        }, 5000);

        return () => clearTimeout(timer);

    }, [alertData.isVisible]);

    // Render user selection and role checkbox interface
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

                {/* Left Section: User Selection & No Self-Selection */}
                <Grid item xs={12} sm={6} sx={{ p: 2 }}>
                    <Box sx={{ p: 2, backgroundColor: '#fff', borderRadius: 2 }}>

                        <FormControl fullWidth margin="normal">
                            <InputLabel>Select Email ID</InputLabel>

                            <Select
                                value={selectedUser ? selectedUser.User_Email : ""}
                                onChange={handleUserChange}
                                sx={{ backgroundColor: '#f0f0f0', borderRadius: 2 }}
                            >
                                <MenuItem value=""><em>Select an email</em></MenuItem>

                                {users.map(u => (
                                    <MenuItem
                                        key={u.User_Id}
                                        value={u.User_Email}
                                        disabled={u.User_Id === approvedByUserId}   // No self-selection
                                    >
                                        {u.User_Email}
                                    </MenuItem>
                                ))}
                            </Select>

                        </FormControl>

                        <Typography sx={{ mt: 2, color: 'blue' }}>
                            Name: <span>{selectedUser ? selectedUser.User_Name : "Not selected"}</span>
                        </Typography>

                        <Typography sx={{ mt: 1, color: 'blue' }}>
                            Profession: <span>{selectedUser ? selectedUser.Profession : "Not selected"}</span>
                        </Typography>

                    </Box>
                </Grid>

                {/* Right Section: Role Selection */}
                <Grid item xs={12} sm={6} sx={{ p: 2 }}>
                    <Box sx={{ p: 2, backgroundColor: '#fff', borderRadius: 2 }}>

                        <Typography variant="h6" sx={{ mb: 2, color: 'blue' }}>
                            Select Role
                        </Typography>

                        <FormControl component="fieldset">

                            {roles.length === 0 && (
                                <Typography variant="body2" color="text.secondary">
                                    No roles available for this profession.
                                </Typography>
                            )}

                            {roles.map(role => (
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

                        <Button
                            fullWidth
                            className="standard-button-primary-button"
                            disabled={
                                !selectedUser ||
                                roles.length === 0 ||
                                !isChanged ||
                                selectedUser?.User_Id === approvedByUserId   // No self-approve
}
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