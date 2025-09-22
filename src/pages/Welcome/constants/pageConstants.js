import { Typography, Box } from '@mui/material';

export const pageConstants = {
    toolBarSections: [
        {
            key: 'aboutSimulation',
            title: 'Welcome to Operations Management Game  ( O M G )',
            content: (<><Typography variant="h6" sx={{ textAlign: 'center' }}>Experience the Real World of Business Operations</Typography><Typography variant="body1" paragraph>The Operations Management Game is an immersive learning platform designed to put you in the driver’s seat of managing a manufacturing or service-based business. Whether you’re overseeing a production line or managing service delivery, this game provides a real-world experience where every operational and strategic decision directly impacts your company’s financial health. It provides a learning platform to young business students, entrepreneurs, young professionals, consultants and Academia who are teaching operations management</Typography><Typography variant="body1" paragraph>Through this interactive Game, you will:</Typography><ul>
                <li>Make critical strategic and operational decisions that affect business performance.</li>
                <li>Analyse financial statements to see the real impact of your choices.</li>
                <li>Face simulated real-world challenges like supply chain disruptions, demand fluctuations, and workforce constraints.</li>
                <li>Experience the effects of long-term strategies, trading off short-term costs against long-term benefits.</li>
                <li>Gain hands-on experience in business operations, from process efficiency to financial planning.</li>
            </ul></>)
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
            title: 'What is OMG ?',
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
                    <ul>
                        <li>The Game administrator will let you and your team to log in to the game with a unique Team ID for you. You just log in and Step into the role of an operations management team and take charge of a small business. Your goal is to grow this operation profitable by Making strategic and operational decisions</li>
                        <li><b>Strategic Decisions –</b> There are several strategic decisions available at your disposal to implement. You should understand that while they require investment today, they bring long-term benefits. It is up to you to choose which ones do you think is good for your operation. For example, one team may feel a quarterly cost reduction to customer is a good decision to keep the customer happy and maintain market share. However, another team may feel that such a decision will erode your margin, and they may prefer to invest on acquiring the competition which can enhance their market share and bargaining power over the customer.</li>
                        <li><b>Operational Decisions –</b> You will be required to make several operational decisions monthly such as what do you think is the sales forecast, what should be the production plan and how much you are preparing to sell for the month. You will need to order raw materials for the next month based on current Inventory on hand and the next month forecast. You need to check if you have enough capacities for your production plan and if not, you will be need to either expand capacity or forego the opportunity to capture the full demand. The true demand for the next month is set by the game administrator after you have entered all your decisions for the current month</li>
                        <li>Monitor financial statements are published every month to assess the impact of your decisions. As soon as you entered your decisions, you can view the month’s financial statement in the dashboard. The 3 important statements that are instantly available are:
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
