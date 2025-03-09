import * as React from 'react';
import { useState } from 'react';
import { Typography, Container, Box, Divider } from '@mui/material';
import { useLoading } from '../../hooks/loadingIndicatorContext.js';
import operationalGameIcon from '../../assets/operational-management-icon.png';

function HomePage() {
    const { setIsLoading } = useLoading();
    const [alertData, setAlertData] = useState({
        severity: '',
        message: '',
        isVisible: false,
    });

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Container>
                <Box sx={{ my: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center' }}>
                        Welcome to Operations Management Simulation System
                    </Typography>
                    <Typography variant="h5" component="h1" gutterBottom sx={{ textAlign: 'center' }}>
                        About the Simulation System
                    </Typography>
                    <Typography variant="body1" paragraph sx={{ textAlign: 'center' }}>
                        The Operations Management Simulation System is a learning and teaching aid in Operations Management with simulation of business processes of a typical manufacturing company.
                        It helps in understanding underlying concepts, formulate strategies and process improvement, simulating business scenario / external factors and constraints, use various decision-support techniques & methods, implement operational decisions, have hands-on experience, financial outcome and have holistic understanding on the impact of Strategy & Operational decisions on financial health of company.
                        Overall, it steps us through all business processes at managerial, operational and financial aspects of a company, simulating the conditions in a virtual manufacturing company. It provides a learning platform to young students, entrepreneurs, professionals, consultants and advisors and Academia.
                    </Typography>
                    <Box className="middle-left-container">
                        <Typography variant="h5" component="h1" gutterBottom sx={{ textAlign: 'center' }}>
                            About us
                        </Typography>
                        <img src={operationalGameIcon} alt="Description" className="middle-left-image" />
                        <Typography variant="body1" paragraph>
                            <div style={{ textAlign: 'center' }}>
                                A group of practising management professionals with good academic background from reputed educational institutes of global ranking, and have rich industry-experience & contribution to commercial and aero-defence manufacturing sectors and practising management professionals
                            </div>
                            <br />
                            <Divider />
                            <Typography variant="h5" component="h1" gutterBottom sx={{ textAlign: 'center' }}>
                                What is the App
                            </Typography>
                            <div style={{ textAlign: 'center' }}>
                                It is a web-enabled teaching aid as well as learning platform that gives hands-on DO-IT-YOURSELF learning opportunity in Operations Management of a typical manufacturing company, by simulation - depicting real-life scenario.
                            </div>
                            <br />
                            <Divider />
                            <Typography variant="h5" component="h1" gutterBottom sx={{ textAlign: 'center' }}>
                                What is Learning environment
                            </Typography>
                            <div style={{ textAlign: 'center' }}>
                                It is online – on web. Learning set-up is in environment you like & prefer, from your home, work-desk , class-room, learning forums , peers-group. Learning is fun!
                            </div>
                            <br />
                            <Divider />
                            <Typography variant="h5" component="h1" gutterBottom sx={{ textAlign: 'center' }}>
                                What is pre-requisite
                            </Typography>
                            <div style={{ textAlign: 'center' }}>
                                There is not pre-requisite of any specific course. Learners from all walk of academic and professional pursuit are welcome and go through.
                            </div>
                            <br />
                            <Divider />
                            <Typography variant="h5" component="h1" gutterBottom sx={{ textAlign: 'center' }}>
                                How is the Stage set
                            </Typography>
                            <div style={{ textAlign: 'center' }}>
                                One can learn all by oneself, or team up with cross-functional peers in groups of one to many teams, as you like it to be.

                                The app provides a flexi-content, flexi-time, self-paced schedule and informal learning environment, to one and all.

                                Access-control is enabled over web through Desk tops / Mobile Devices and facilitating Simulation-Game Sessions to participants through batches, teams, interactive sessions, session duration and flexible schedule & time-frames.

                            </div>
                            <br />
                            <Divider />
                            <Typography variant="h5" component="h1" gutterBottom sx={{ textAlign: 'center' }}>
                                How does One go about
                            </Typography>
                            <div style={{ textAlign: 'center' }}>
                                It is administered by a faculty to participants - be it as individuals or groups formed into teams with role-play. It provides for online interactive sessions in class-rooms in persona and / or remotely.
                            </div>
                            <br />
                            <Divider />
                            <Typography variant="h5" component="h1" gutterBottom sx={{ textAlign: 'center' }}>
                                Who are the target audience
                            </Typography>
                            <div style={{ textAlign: 'center' }}>
                                Audience are the learning community of Academia, Management Professionals, Companies, Entrepreneurs, Industry practitioners, and Students.
                            </div>
                            <br />
                            <Divider />
                            <Typography variant="h5" component="h1" gutterBottom sx={{ textAlign: 'center' }}>
                                What are the benefits
                            </Typography>
                            <div style={{ textAlign: 'center' }}>
                                It provides for rich learning experience to students, young professionals, entrepreneurs, imparting practical knowledge.
                                As well as it aids to enrich, fine-tune and improve upon the contents, sharing experiences, experiment the real-life situations and hone Professional expertise
                            </div>
                            <br />
                            <Divider />
                            <Typography variant="h5" component="h1" gutterBottom sx={{ textAlign: 'center' }}>
                                What does one learn
                            </Typography>
                            <div style={{ textAlign: 'center' }}>
                                It is the central medium to learn fundamentals in Operations Management of a company. The learner can apply the techniques & tools as they learn, face Issues & problems as in real-life situations, consult peers, fine-tune decision & response and interact with Practising Professional and Academia.
                                Finally, each participant/ team gets the cardinal feedback on outcome of strategy & decisions on the financial health of a company through Financial Statements and assessment of their learning experience.
                            </div>
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default HomePage;
