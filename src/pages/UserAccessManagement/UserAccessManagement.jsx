import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import '../UserAccessManagement/user-access-mgmt.css'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    // padding: theme.spacing(1),
    // textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));

function UserAccessManagement() {
    return (<div class="page-container">
        <h1>User Access Management</h1>
        <Item>
            <div className='user-access-content-container'>
                <div>
                    <h2>
                        User Details
                    </h2>
                </div>
                <div class="user-details-container">
                    <div>User Name</div>
                    <div>Test</div>
                    <div>User Id</div>
                    <div>test</div>
                    <div>User Role</div>
                    <div>Student</div>
                </div>
                <div>
                    <h2>Access</h2>
                    <p>current</p>
                </div>
            </div>
        </Item>

    </div>)
}

export default UserAccessManagement