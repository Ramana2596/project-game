import React, { createContext, useState, useContext, useEffect } from 'react';
import { componentList } from "../../constants/globalConstants.js";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ role: null });
    const [userAccessablePageIds, setUserAccessablePageIds] = useState(null);
    const [userAccessiblePages, setUserAccessiblePages] = useState(null);


    const login = (role) => {
        setUser({ role });
    };

    const setAccessablePageIds = ((accessablePageIdList) => {
        if(accessablePageIdList && accessablePageIdList.length > 0) {
            const tempArray = accessablePageIdList?.map((accessablePageIdObj) => accessablePageIdObj?.uiId);
            setUserAccessablePageIds(tempArray);
        }
    })

    useEffect(() => {
        if (userAccessablePageIds && userAccessablePageIds.length > 0) {
            const filteredArray = componentList.filter(item => userAccessablePageIds?.includes(item.id));
            setUserAccessiblePages(filteredArray);
        }
    }, [userAccessablePageIds]);

    const logout = () => {
        setUser({ role: null });
        setUserAccessiblePages(null);
    };

    const hasPermission = (permission) => {
        return userAccessablePageIds?.includes(permission);
    };

    return (
        <UserContext.Provider value={{ user, userAccessiblePages, login, logout, hasPermission, setAccessablePageIds }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
