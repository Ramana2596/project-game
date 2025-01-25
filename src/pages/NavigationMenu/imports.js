// imports.js
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import {
    Menu,
    MenuItem,
    Button
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SignOutButton from "../../components/SignOutButton";
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../../core/access/userContext.js';
import { useLoading } from "../../hooks/loadingIndicatorContext.js";
import GameMaster from "../GameMaster";
import GameBatch from "../GameBatch";
import { Routes, Route } from "react-router-dom";
import GameSession from "../GameSession";
import GameDashboard from "../GameDashboard/GameDashboard";
import StrategyLaunched from "../LaunchStrategy/StrategyLaunched";
import StrategyPlanApproval from "../StrategyPlanApproval/StrategyPlanApproval";
import MarketFactorInfo from "../MarketFactorInfo/MarketFactorInfo";
import MarketFactorInfoInput from "../MarketFactorInfoInput/MarketFactorInfoInput";
import OperationalPlanInfo from "../OperationalPlanInfo/OperationalPlanInfo";
import OperationalPlanInfoInput from "../OperationalPlanInfoInput/OperationalPlanInfoInput";
import IncomeStatementInfo from "../IncomeStatementInfo/IncomeStatementInfo.jsx";
import BalanceSheetInfo from "../BalanceSheetInfo/BalanceSheetInfo.jsx";
import { getUserAccessPageIds } from "../NavigationMenu/services/indexService.js";
import { useEffect, useState } from "react";
import { drawerWidth, DrawerHeader, AppBar, Drawer } from "../NavigationMenu/components/drawerStyle.js"


export {
    React,
    styled,
    useTheme,
    Box,
    Menu,
    MenuItem,
    Button,
    AccountCircle,
    SignOutButton,
    MuiDrawer,
    MuiAppBar,
    Toolbar,
    List,
    CssBaseline,
    Typography,
    Divider,
    IconButton,
    ArrowForwardIosIcon,
    ArrowBackIosIcon,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    DashboardIcon,
    HomeIcon,
    Link,
    useUser,
    useLoading,
    GameMaster,
    GameBatch,
    Routes,
    Route,
    GameSession,
    GameDashboard,
    StrategyLaunched,
    StrategyPlanApproval,
    MarketFactorInfo,
    MarketFactorInfoInput,
    OperationalPlanInfo,
    OperationalPlanInfoInput,
    IncomeStatementInfo,
    BalanceSheetInfo,
    getUserAccessPageIds,
    useEffect,
    useState,
    useLocation,
    drawerWidth, DrawerHeader, AppBar, Drawer
};
