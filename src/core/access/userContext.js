import React, { createContext, useState, useContext, useEffect } from 'react';
import { componentList } from "../../constants/globalConstants.js";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ role: null });
    const [userInfo, setGameInfo] = useState({ gameId: null, gameBatch: null, gameTeam: null, isGameLeader: null });
    const [userAccessablePageIds, setUserAccessablePageIds] = useState(null);
    const [userAccessiblePages, setUserAccessiblePages] = useState(null);


    const login = (role) => {
        setUser({ role });
    };

    const setUserInfo = (userInfo) => {
        setGameInfo({
            gameId: userInfo?.Game_id,
            gameBatch: userInfo?.Game_Batch,
            gameTeam: userInfo?.Game_Team,
            isGameLeader: userInfo?.Team_Leader,
            loginId: userInfo?.User_Login,
            userId: userInfo?.User_Id,
            learnMode: userInfo?.Learn_Mode ? userInfo?.Learn_Mode : 'Class_Room',
        });
    };

    const setAccessablePageIds = ((accessablePageIdList) => {
        if (accessablePageIdList && accessablePageIdList.length > 0) {
            const tempArray = accessablePageIdList?.map((accessablePageIdObj) => accessablePageIdObj?.uiId);
            setUserAccessablePageIds(tempArray);
        }
    });

    const filterComponents = (list, ids) => {
        return list
            .filter(item => ids.includes(item.id))
            .map(item => ({
                ...item,
                children: item.children ? filterComponents(item.children, ids) : [],
            }));
    };

    useEffect(() => {
        if (userAccessablePageIds && userAccessablePageIds.length > 0) {
            const filteredArray = filterComponents(componentList, userAccessablePageIds);
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
        <UserContext.Provider value={{ user, userInfo, userAccessiblePages, login, logout, hasPermission, setAccessablePageIds, setUserInfo }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
