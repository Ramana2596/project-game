// src/pages/UserRole/UserRole.jsx
// Purpose: Manage Mutually Exclusive User Roles

import React, { useEffect, useState } from "react";
import {
  Box,
  Select,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";
import {
  getUserList,
  getUserValidRole,
  updateUserRole,
} from "./services/service";

const UserRole = () => {
  const gameId = "OpsMgt";

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");

  // Load User List Page Load
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await getUserList({ gameId });
        setUsers(response.data || []);
      } catch (err) {
        console.error("Failed to load users", err);
      }
    };
    loadUsers();
  }, []);

  // Handle User role
  const handleUserChange = async (userId) => {
    setSelectedUser(userId);

    try {
      const response = await getUserValidRole({ gameId, userId });
      const data = response.data;

      // Set current role and allowed list
      setSelectedRole(data?.user?.current_RL_Id || ""); 
      setRoles(data?.roles || []); 
    } catch (err) {
      console.error("Failed to load roles", err);
    }
  };

  // Handle Role Change
  const handleRoleChange = (roleId) => {
    setSelectedRole(roleId);
  };

  // Update Role
  const handleUpdate = async () => {
    try {
      await updateUserRole({
        gameId,
        userId: selectedUser,
        roleId: selectedRole,
      });

      alert("Role updated successfully");
    } catch (err) {
      alert("Error updating role");
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h6">User Role Management</Typography>

      {/* User Selection */}
      <Box mt={2}>
        <Select
          fullWidth
          value={selectedUser}
          onChange={(e) => handleUserChange(e.target.value)}
          displayEmpty
        >
          <MenuItem value="">
            <em>Select User</em>
          </MenuItem>

          {users.map((u) => (
            <MenuItem key={u.User_Id} value={u.User_Id}>
              {u.User_Name} ({u.Profession})
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Role Selection */}
      <Box mt={2}>
        <Select
          fullWidth
          value={selectedRole}
          onChange={(e) => handleRoleChange(e.target.value)}
          disabled={!selectedUser}
        >
          {roles.map((r) => (
            <MenuItem key={r.RL_Id} value={r.RL_Id}>
              {r.Role}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Update Button */}
      <Box mt={2}>
        <Button
          variant="contained"
          onClick={handleUpdate}
          disabled={!selectedUser || !selectedRole}
        >
          Update Role
        </Button>
      </Box>
    </Box>
  );
};

export default UserRole;