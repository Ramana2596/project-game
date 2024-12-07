// UserContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { roles } from '../../constants/userRoleConstants';
import { componentList } from "../../constants/globalConstants";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ role: null });
    const [userAccessiblePages, setUserAccessiblePages] = useState(null);


    const login = (role) => {
        setUser({ role });
    };

    useEffect(() => {
        if (user?.role) {
            const filteredArray = componentList.filter(item => roles[user.role]?.includes(item.id));
            setUserAccessiblePages(filteredArray);
        }
    }, [user?.role]);

    const logout = () => {
        setUser({ role: null });
        setUserAccessiblePages(null);
    };

    const hasPermission = (permission) => {
        return roles[user.role]?.includes(permission);
    };

    return (
        <UserContext.Provider value={{ user, userAccessiblePages, login, logout, hasPermission }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
