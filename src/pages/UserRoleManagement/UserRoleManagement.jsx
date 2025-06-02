import { useState, useEffect } from 'react';
import { fetchAvailableUsers, fetchRoles, updateUserRole, fetchDefaultRolesForProfession } from './services/userRoleManagementService';
import { Container, Grid, Typography, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Box, Button } from '@mui/material';
import ToastMessage from '../../components/ToastMessage.jsx';
import { useUser } from "../../core/access/userContext.js";
import { useLoading } from "../../hooks/loadingIndicatorContext.js"; // <-- Use shared loading context

const UserRoleManagement = () => {
    const { userInfo } = useUser(); // Get userInfo (contains gameId)
    const gameId = userInfo?.gameId;
    const { setIsLoading } = useLoading(); // <-- Use loading context

    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [professionRoleMap, setProfessionRoleMap] = useState([]); // All profession-role mappings
    const [alertData, setAlertData] = useState({
        severity: "",
        message: "",
        isVisible: false,
    });

    useEffect(() => {
        let isMounted = true;
        const fetchAll = async () => {
            setIsLoading(true);
            try {
                const [userData, roleData, professionRoleData] = await Promise.all([
                    fetchAvailableUsers({ gameId }),
                    fetchRoles({ gameId }),
                    fetchDefaultRolesForProfession({ gameId })
                ]);
                if (isMounted) {
                    setUsers(userData);
                    setRoles(roleData);
                    setProfessionRoleMap(professionRoleData);
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

    // When user changes, set selected user and roles
    const handleUserChange = (event) => {
        const user = users.find(u => u.User_Email === event.target.value);
        setSelectedUser(user || null);

        if (user) {
            // Find all RL_Id for this user's PF_Id in professionRoleMap
            const allowedRoleIds = professionRoleMap
                .filter(pr => String(pr.PF_Id) === String(user.PF_Id))
                .map(pr => String(pr.RL_Id));

            // If user.RL_Id exists, set selectedRoles to the intersection of allowedRoleIds and user.RL_Id (can be array or single value)
            let checkedRoles = [];
            if (user.RL_Id) {
                // RL_Id can be a single value or an array, normalize to array of strings
                const userRoleIds = Array.isArray(user.RL_Id)
                    ? user.RL_Id.map(String)
                    : [String(user.RL_Id)];
                checkedRoles = allowedRoleIds.filter(roleId => userRoleIds.includes(roleId));
            }
            setSelectedRoles(checkedRoles);
        } else {
            setSelectedRoles([]);
        }
    };

    // Handle role checkbox change
    const handleRoleChange = (event) => {
        const value = event.target.value;
        setSelectedRoles((prev) =>
            prev.includes(value)
                ? prev.filter((roleId) => roleId !== value)
                : [...prev, value]
        );
    };

    // Approve handler
    const handleApprove = async () => {
        if (selectedUser && selectedRoles.length > 0) {
            setIsLoading(true);
            try {
                const userRoleList = selectedRoles.map(roleId => ({
                    gameId,
                    userId: selectedUser.User_Id,
                    roleId: roleId
                }));
                const response = await updateUserRole(userRoleList);
                if (response.success) {
                    setAlertData({
                        severity: "success",
                        message: "User role updated successfully!",
                        isVisible: true,
                    });
                } else {
                    setAlertData({
                        severity: "error",
                        message: response.error || "Failed to update user role.",
                        isVisible: true,
                    });
                }
            } catch (error) {
                setAlertData({
                    severity: "error",
                    message: `Code: ${error?.status} - ${error?.response?.data?.message}`,
                    isVisible: true,
                });
            } finally {
                setIsLoading(false);
            }
        }
    };

    // Filter roles to only those applicable for the selected user's profession
    let filteredRoles = [];
    if (selectedUser && selectedUser.PF_Id) {
        const allowedRoleIds = professionRoleMap
            .filter(pr => String(pr.PF_Id) === String(selectedUser.PF_Id))
            .map(pr => String(pr.RL_Id));
        filteredRoles = roles.filter(role => allowedRoleIds.includes(String(role.RL_Id)));
    }

    // Auto-hide the toast after 5 seconds
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
                            {filteredRoles.length === 0 && (
                                <Typography variant="body2" color="text.secondary">
                                    No roles available for this profession.
                                </Typography>
                            )}
                            {filteredRoles.map((role) => (
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

                        {/* Approve Button */}
                        <Button
                            fullWidth
                            className="standard-button-primary-button"
                            disabled={!selectedUser || selectedRoles.length === 0}
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

export default UserRoleManagement;
