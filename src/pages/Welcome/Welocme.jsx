import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import operationalGameIcon from '../../assets/operational-management-icon.png';
import '../Welcome/styles/pageStyle.css';

const WelcomePage = () => {
    return (
        <Box>
            <AppBar position="static" sx={{ backgroundImage: 'radial-gradient(ellipse at 50% 100%, hsl(213, 100%, 87%), hsl(0, 0%, 100%))', backgroundColor: 'white', color: 'black', boxShadow: 'none' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Strategic Operations Research Management
                    </Typography>
                    <Button
                        sx={{ backgroundColor: '#00008B', color: 'white', marginRight: 1 }}
                        component={Link}
                        to="/register"
                    >
                        Register
                    </Button>
                    <Button sx={{ border: '1px solid black' }} color="inherit" component={Link} to="/signIn">
                        Sign In
                    </Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Box sx={{ my: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center' }}>
                        Welcome to Operations Management Simulation System
                    </Typography>
                    <Typography variant="body1" paragraph sx={{ textAlign: 'center' }}>
                        Operations Management Simulation System is a web-enabled Application Software Package.
                        It is as a teaching tool in learning Operations Management of a typical manufacturing
                        company. It provides hands-on learning opportunity to academia, management professionals,
                        Industry practitioners and Students Community.
                    </Typography>
                    <Box className="middle-left-container">
                        <Typography variant="h5" component="h1" gutterBottom sx={{ textAlign: 'center' }}>
                            System Concept
                        </Typography>
                        <img src={operationalGameIcon} alt="Description" className="middle-left-image" />
                        <Typography variant="body1" paragraph>
                            <div style={{ textAlign: 'center' }}>
                                Operations Management Simulation System, a web-based Application Software Package, is
                                administered by a Faculty to participants, grouped into teams (say 50 in 5/10 teams -typical), in
                                interactive sessions over web / online connectivity – in class-rooms in persona and / or remotely.
                            </div>
                            <br />
                            <Divider />
                            <div style={{ textAlign: 'center' }}>
                                It provides for one-to-many access-controlled configuration over web connectivity with Server – many
                                PCs / Mobile Devices and flexibility in Game facilitation - by way of number of learning batches,
                                participants, teams, interactive sessions and session duration as well as Simulation time-periods.
                            </div>
                            <br />
                            <Divider />
                            <div style={{ textAlign: 'center' }}>
                                It addresses Product Administration Control & User Management, Game Features Management and
                                System Flow of the S/w Package through various business processes – Managerial, Business / Market
                                Scenario, Operational and the Financial Outcome / Report – in Operations Management.
                            </div>
                            <br />
                            <Divider />
                            <div style={{ textAlign: 'center' }}>
                                This document presents in detail the System Flow of Operations Management, starting from Strategy
                                Scenario, deciding on Strategy Plan, Market Factors / scenario, Operational decisions, Operational
                                transactions from Customer Order, Design, Production Plan, Procurement, Manufacturing and delivery
                                of finished products to customers and the Financial Outcome.
                            </div>
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default WelcomePage;
