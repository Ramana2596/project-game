// file: ResetPasswordPage.jsx
// Directory: D:\Git_OpsMgt\project-game\src\pages\AuthHubPage\components\ResetPasswordPage.jsx

import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../../services/authApiService'; // Paths set to resolve to src/services/authApiService

export default function ResetPasswordPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Automatically capture query parameters from the email link URL string
    const token = searchParams.get('token') || '';
    const email = searchParams.get('email') || '';
    const gameId = searchParams.get('gameId') || '';

    // Form input state trackers
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Status tracking states
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);

        // Client-side validation checks
        if (!token || !email || !gameId) {
            setIsError(true);
            setMessage('Invalid reset link configuration parameters.');
            return;
        }

        if (!newPassword.trim() || !confirmPassword.trim()) {
            setIsError(true);
            setMessage('Please fill in all password fields.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setIsError(true);
            setMessage('Passwords do not match. Please verify.');
            return;
        }

        try {
            setLoading(true);

            // Structure the payload for the backend API
            const payload = {
                gameId: gameId,
                email: email,
                token: token,
                newPassword: newPassword
            };

            const response = await resetPassword(payload);

            if (response.data && response.data.sucValue === 0) {
                setIsError(false);
                setMessage('Your password has been reset successfully! Redirecting to login...');
                
                // Route user to login page after a 3-second delay
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                setIsError(true);
                setMessage(response.data?.message || 'Failed to update password.');
            }
        } catch (err) {
            setIsError(true);
            setMessage(err.response?.data?.message || `A communication error occurred: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '400px', margin: '50px auto', padding: '30px', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', backgroundColor: '#ffffff' }}>
            <h2 style={{ textAlign: 'center', marginTop: 0, marginBottom: '20px', color: '#222' }}>Reset Your Password</h2>
            
            <p style={{ fontSize: '13px', color: '#666', textAlign: 'center', marginBottom: '25px' }}>
                Please enter a secure new password for your account setup.
            </p>

            {message && (
                <div style={{ padding: '12px', borderRadius: '4px', marginBottom: '20px', fontSize: '14px', backgroundColor: isError ? '#fff3f3' : '#e6f4ea', color: isError ? '#dc3545' : '#137333', border: `1px solid ${isError ? '#fadbd8' : '#c6efce'}` }}>
                    {message}
                </div>
            )}

            {!(message && !isError) && (
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>New Password</label>
                        <input 
                            type="password" 
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                            disabled={loading}
                            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc', fontSize: '14px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '25px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Confirm Password</label>
                        <input 
                            type="password" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Retype your new password"
                            disabled={loading}
                            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc', fontSize: '14px' }}
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        style={{ width: '100%', padding: '12px', backgroundColor: loading ? '#b3d7ff' : '#007bff', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '15px', cursor: loading ? 'not-allowed' : 'pointer' }}
                    >
                        {loading ? 'Updating...' : 'Save New Password'}
                    </button>
                </form>
            )}
        </div>
    );
}