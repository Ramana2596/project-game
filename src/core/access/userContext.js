// UserContext.js
import React, { createContext, useState, useContext } from 'react';
import { roles } from '../../constants/userRoleConstants';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ role: 'faculty' });

    const login = (role) => {
        setUser({ role });
    };

    const logout = () => {
        setUser({ role: 'faculty' });
    };

    const hasPermission = (permission) => {
        return roles[user.role]?.includes(permission);
    };

    return (
        <UserContext.Provider value={{ user, login, logout, hasPermission }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
