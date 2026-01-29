// File: userContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';
import { componentList } from "../../constants/globalConstants.js";

// Create a context to share user state across the app
const UserContext = createContext();

export const UserProvider = ({ children }) => {
    // Define user identity state (used for RBAC and login info)
    const [user, setUser] = useState({
        userId: null,
        loginId: null,
        rlId: null,
        role: null
    });

    // Define participation/game context state (used for learning session info)
    const [userInfo, setGameInfo] = useState({
        gameId: 'OpsMgt',
        gameBatch: null,
        gameTeam: null,
        isGameLeader: null,
        userId: null,
        loginId: null,
        learnMode: 'Class_Room'
    });

    // Store list of accessible page IDs for the user
    const [userAccessablePageIds, setUserAccessablePageIds] = useState(null);

    // Store filtered list of accessible pages/components for rendering
    const [userAccessiblePages, setUserAccessiblePages] = useState(null);
    
    // Store list of RBAC screens for the user (all fields from backend response)
    const [userRbacScreens, setUserRbacScreens] = useState([]);

    // Handle login: Update user state with backend response
    const login = (loginResponse) => {
        setUser(prev => ({
            ...prev,
            userId: loginResponse?.User_Id,
            loginId: loginResponse?.User_Login,
            rlId: loginResponse?.RL_Id,
            role: loginResponse?.Role
        }));
    };

    // Update game/participation info state with backend response
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
/*
    // Extract accessible page IDs from backend response and store them
    const setAccessablePageIds = (accessablePageIdList) => {
        if (accessablePageIdList && accessablePageIdList.length > 0) {
            const tempArray = accessablePageIdList.map(
                (accessablePageIdObj) => accessablePageIdObj?.uiId
            );
            setUserAccessablePageIds(tempArray);
        }
    };
*/
// Extract API Call data and accessible page IDs from backend response and store them
    const setAccessablePageIds = (accessablePageIdList) => {
        if (accessablePageIdList && accessablePageIdList.length > 0) {
            // Normalize backend fields (Snake_Case) → frontend camelCase
            const normalizedList = accessablePageIdList.map(obj => ({
                uiId: obj.UI_Id,          // convert to camelCase
                shortName: obj.Short_Name // convert to camelCase
            }));

            // Store full RBAC objects in camelCase
            setUserRbacScreens(normalizedList);

            // Extract just the uiIds for filtering
            const tempArray = normalizedList.map(obj => obj.uiId);
            setUserAccessablePageIds(tempArray);
        }
    };



    // Recursively filter component list to include only accessible pages
    const filterComponents = (list, ids) => {
        return list
            .filter(item => ids.includes(item.id))
            .map(item => ({
                ...item,
                children: item.children ? filterComponents(item.children, ids) : [],
            }));
    };

    // Whenever accessible page IDs change, update the accessible pages list
    useEffect(() => {
        if (userAccessablePageIds && userAccessablePageIds.length > 0) {
            const filteredArray = filterComponents(componentList, userAccessablePageIds);
            setUserAccessiblePages(filteredArray);
        }
    }, [userAccessablePageIds]);

    // Handle logout by clearing user state and accessible pages
    const logout = () => {
        setUser({
            userId: null,
            loginId: null,
            rlId: null,
            role: null
        });
        setUserAccessiblePages(null);
        setUserAccessablePageIds(null);   // added
        setUserRbacScreens([]);          // added
    };

    // Check if user has permission for a specific page ID
    const hasPermission = (permission) => {
        return userAccessablePageIds?.includes(permission);
    };

    // Provide user state and helper functions to the rest of the app
    return (
        <UserContext.Provider
            value={{
                user,
                userInfo,
                userAccessiblePages,
                userRbacScreens, // DB response for RBAC screens
                login,
                logout,
                hasPermission,
                setAccessablePageIds,
                setUserInfo
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to easily access user context in components
export const useUser = () => useContext(UserContext);
