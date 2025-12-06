import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../core/access/userContext.jsx'; // Adjust the import path

const SignOutButton = () => {
    const { logout } = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Clear user data
        navigate('/'); // Redirect to login page
    };

    return (
        <Button color="secondary" type="reset" className='standard-button-secondary-button' onClick={handleLogout}>
            Sign Out
        </Button>
    );
};

export default SignOutButton;
