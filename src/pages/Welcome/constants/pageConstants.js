import { Typography, Box } from '@mui/material';

export const pageConstants = {
    toolBarSections: [
        {
            key: 'aboutSimulation',
            title: 'Welcome to OMG',
            content: <Typography variant="h6" sx={{ textAlign: 'center' }}>Experience the Real World of Business Operations</Typography>
        },
        {
            key: 'aboutUs',
            title: 'About Us',
            content: (
                <Typography variant="body1" paragraph>
                    We are a team of experienced management professionals and industry veterans educated from globally recognized institutions.
                    With years of expertise in managing operations across both manufacturing and service industries, we bring practical insights into this game.
                    Some of us are currently teaching in reputable universities across Asia and serve as Operations consultants to leading companies.
                    <br /><br />
                    Our mission is to bridge the gap between theory and real-world application through this game where you will feel the challenges of running a real business operation.
                </Typography>
            )
        },
        {
            key: 'aboutApp',
            title: 'What is OMG',
            content: (
                <Box>
                    <Typography variant="body1" paragraph>
                        The Operations Management Game is an immersive learning platform designed to put you in the driver’s seat of managing a manufacturing or service-based business.
                    </Typography>
                    <Typography variant="h6">Through this interactive game, you will:</Typography>
                    <ul>
                        <li>Make critical strategic and operational decisions that affect business performance.</li>
                        <li>Analyse financial statements to see the real impact of your choices.</li>
                        <li>Face simulated real-world challenges like supply chain disruptions, demand fluctuations, and workforce constraints.</li>
                        <li>Experience the effects of long-term strategies, trading off short-term costs against long-term benefits.</li>
                        <li>Gain hands-on experience in business operations, from process efficiency to financial planning.</li>
                    </ul>
                </Box>
            )
        },
        {
            key: 'forWhom',
            title: 'For Whom is OMG',
            content: (
                <Typography variant="body1" paragraph>
                    This game is ideal for students, professionals, entrepreneurs, and industry practitioners looking to sharpen their decision-making skills
                    and understand the cause-and-effect relationship between operations and financial performance.
                    <br /><br />
                    <b>The only pre-requisite is your attitude to win.</b>
                </Typography>
            )
        },
        {
            key: 'howItWorks',
            title: 'How It Works',
            content: (
                <Box>
                    <Typography variant="h6">Step-by-step process:</Typography>
                    <ul>
                        <li>Log in with a unique Team ID assigned by the administrator.</li>
                        <li>Take charge of a small business and make strategic and operational decisions.</li>
                        <li>Monitor financial statements, including:
                            <ul>
                                <li>Income Statement</li>
                                <li>Balance Sheet</li>
                                <li>Cash Flow Statement</li>
                            </ul>
                        </li>
                    </ul>
                </Box>
            )
        },
        {
            key: 'benefits',
            title: 'Learning Outcome',
            content: (
                <Box>
                    <Typography variant="h6">By the end of this game, you will:</Typography>
                    <ul>
                        <li>Understand the fundamentals of operations management.</li>
                        <li>Develop decision-making skills that impact efficiency, profitability, and sustainability.</li>
                        <li>Learn to balance operational trade-offs and optimize business performance.</li>
                        <li>Gain real-world insights into financial implications of operational choices.</li>
                        <li>Enhance your professional expertise with a hands-on, practical approach.</li>
                    </ul>
                </Box>
            )
        }
    ]
};
