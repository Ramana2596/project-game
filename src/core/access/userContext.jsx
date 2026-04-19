// src/core/access/UserContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';
import { componentList } from "../../constants/globalConstants.js";
import { saveToStorage, loadFromStorage, clearStorage } from "../../utils/storage.js";

// Context: share user, RBAC, and Learning session across app
const UserContext = createContext();

export const UserProvider = ({ children }) => {

    //State: login and role info from memory
    const [user, setUser] = useState(() =>
        loadFromStorage("user", {
            userId: null,
            loginId: null,
            rlId: null,
            role: null
        }));

    //State: Learning session info (from memory)
    const [userInfo, setGameInfo] = useState(() =>
        loadFromStorage("userInfo", {
            gameId: 'OpsMgt',
            gameBatch: null,
            gameTeam: null,
            isGameLeader: null,
            userId: null,
            loginId: null,
            learnMode: 'Class_Room'
        }));

    // State: RBAC page IDs (from memory)
    const [userAccessiblePageIds, setUserAccessiblePageIds] = useState(() =>
        loadFromStorage("userAccessiblePageIds", null));

    // State: filtered component list for navigation
    const [userAccessiblePages, setUserAccessiblePages] = useState(null);

    // Store info in memory
    useEffect(() => { saveToStorage("user", user); }, [user]);
    useEffect(() => { saveToStorage("userInfo", userInfo); }, [userInfo]);
    useEffect(() => { saveToStorage("userAccessiblePageIds", userAccessiblePageIds); }, [userAccessiblePageIds]);

    // Function: update login identity after authentication
    const login = (loginResponse) => {
        setUser(prev => ({
            ...prev,
            userId: loginResponse?.User_Id,
            loginId: loginResponse?.User_Login,
            rlId: loginResponse?.RL_Id,
            role: loginResponse?.Role
        }));
    };

    // Function: update Learning session info
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

    // Function: normalize UI_Id & name: backend Vs RBAC
    const setAccessiblePageIds = (accessiblePageIdList) => {
        if (accessiblePageIdList && accessiblePageIdList.length > 0) {
            const normalizedList = accessiblePageIdList.map(obj => ({
                uiId: obj.UI_Id,
                shortName: obj.Short_Name
            }));
            setUserAccessiblePageIds(normalizedList); 
        }
    };

    // Function: recursively filter components based on RBAC
    const filterComponents = (list, accessList) => {
        return list
            .filter(item => accessList.some(accessObj => accessObj.uiId === item.id))
            .map(item => ({
                ...item,
                children: item.children ? filterComponents(item.children, accessList) : [],
            }));
    };

    // Recompute accessible pages when RBAC list changes
    useEffect(() => {
        if (userAccessiblePageIds && userAccessiblePageIds.length > 0) {
            const filteredArray = filterComponents(componentList, userAccessiblePageIds);
            setUserAccessiblePages(filteredArray);
        }
    }, [userAccessiblePageIds]);

    // Function: clear all user, RBAC, and session info on logout
    const logout = () => {
        setUser({ userId: null, loginId: null, rlId: null, role: null });
        setGameInfo({ gameId: 'OpsMgt', gameBatch: null, gameTeam: null, isGameLeader: null, userId: null, loginId: null, learnMode: 'Class_Room' });
        setUserAccessiblePages(null);
        setUserAccessiblePageIds(null);

        //  Clear memory from storage
        clearStorage("user");
        clearStorage("userInfo");
        clearStorage("userAccessiblePageIds");
    };

    // Function: check user-permission for a given UI screen
    const hasPermission = (permission) => {
        return userAccessiblePageIds?.some(accessObj => accessObj.uiId === permission);
    };

    // Provider: user, RBAC, and helper functions to app
    return (
        <UserContext.Provider
            value={{
                user,
                userInfo,
                userAccessiblePageIds,
                userAccessablePageIds: userAccessiblePageIds, // Alias (kept for backward compatibility)
                userAccessiblePages,
                login,
                logout,
                hasPermission,
                setAccessiblePageIds,
                setAccessablePageIds: setAccessiblePageIds, // Alias (kept for backward compatibility)
                setUserInfo
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

// Hook: easy access to UserContext anywhere in the app
export const useUser = () => useContext(UserContext);
