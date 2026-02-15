// src/core/access/userContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';
import { componentList } from "../../constants/globalConstants.js";

// Create context to share user, RBAC, and game session across app
const UserContext = createContext();

export const UserProvider = ({ children }) => {

    // Store basic login identity and role information
    const [user, setUser] = useState({
        userId: null,
        loginId: null,
        rlId: null,
        role: null
    });

    // Store current game/session participation info for the user
    const [userInfo, setGameInfo] = useState({
        gameId: 'OpsMgt',
        gameBatch: null,
        gameTeam: null,
        isGameLeader: null,
        userId: null,
        loginId: null,
        learnMode: 'Class_Room'
    });

    // Store list of UI IDs user has access to (RBAC)
    const [userAccessiblePageIds, setUserAccessiblePageIds] = useState(null);

    // Store filtered component list based on RBAC for menu/navigation
    const [userAccessiblePages, setUserAccessiblePages] = useState(null);

    // Update login identity after successful authentication
    const login = (loginResponse) => {
        setUser(prev => ({
            ...prev,
            userId: loginResponse?.User_Id,
            loginId: loginResponse?.User_Login,
            rlId: loginResponse?.RL_Id,
            role: loginResponse?.Role
        }));
    };

    // Update game/team participation info after team selection
    const setUserInfo = (userInfo) => {
        setGameInfo({
            gameId: userInfo?.Game_Id,
            gameBatch: userInfo?.Game_Batch,
            gameTeam: userInfo?.Game_Team,
            isGameLeader: userInfo?.Team_Leader,
            loginId: userInfo?.User_Login,
            userId: userInfo?.User_Id,
            learnMode: userInfo?.Learn_Mode ? userInfo?.Learn_Mode : 'Class_Room',
        });
    };

    // Convert backend Snake_Case RBAC response into frontend camelCase structure
    const setAccessiblePageIds = (accessiblePageIdList) => {
        if (accessiblePageIdList && accessiblePageIdList.length > 0) {

            const normalizedList = accessiblePageIdList.map(obj => ({
                uiId: obj.UI_Id,
                shortName: obj.Short_Name
            }));

            setUserAccessiblePageIds(normalizedList); 
        }
    };

    // Recursively filter componentList to keep only RBAC allowed pages
    const filterComponents = (list, accessList) => {
        return list
            .filter(item => accessList.some(accessObj => accessObj.uiId === item.id))
            .map(item => ({
                ...item,
                children: item.children ? filterComponents(item.children, accessList) : [],
            }));
    };

    // Whenever RBAC list changes, recompute accessible menu/pages
    useEffect(() => {
        if (userAccessiblePageIds && userAccessiblePageIds.length > 0) {
            const filteredArray = filterComponents(componentList, userAccessiblePageIds);
            setUserAccessiblePages(filteredArray);
        }
    }, [userAccessiblePageIds]);

    // Clear all user, RBAC, and session info on logout
    const logout = () => {
        setUser({
            userId: null,
            loginId: null,
            rlId: null,
            role: null
        });
        setUserAccessiblePages(null);
        setUserAccessiblePageIds(null);
    };

    // Check if user has permission to access a given UI screen
    const hasPermission = (permission) => {
        return userAccessiblePageIds?.some(accessObj => accessObj.uiId === permission);
    };

    // Provide user, RBAC, and helper functions to entire app (with alias for old spelling)
    return (
        <UserContext.Provider
            value={{
                user,
                userInfo,
                userAccessiblePageIds, // Correct name
                userAccessablePageIds: userAccessiblePageIds, //Alias: OLD (misspelt)/ correct name 
                userAccessiblePages,
                login,
                logout,
                hasPermission,
                setAccessiblePageIds, // Correct function name
                setAccessablePageIds: setAccessiblePageIds, // Alias function: OLD (misspelt)/ correct name
                setUserInfo
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

// Custom hook for easy access to UserContext anywhere in the app
export const useUser = () => useContext(UserContext);
