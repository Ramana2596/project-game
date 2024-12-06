// ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useUser } from '../../core/access/userContext';

const ProtectedRoute = ({ component: Component, permission, ...rest }) => {
    const { hasPermission } = useUser();

    if (!hasPermission(permission)) {
        return <Navigate to="/" />;
    }
    return Component;
};

export default ProtectedRoute;
