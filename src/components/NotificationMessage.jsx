import React from "react";
import { Box, Typography } from "@mui/material";

const NotificationMessage = ({ message = "No data available" }) => {
    return (
        <Box
            sx={{
                border: "2px solid #2196F3",
                backgroundColor: "rgba(33, 150, 243, 0.1)",
                backdropFilter: "blur(10px)",
                padding: "16px",
                borderRadius: "8px",
                display: "inline-block",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Typography variant="h6" align="center" color="textSecondary">
                {message}
            </Typography>
        </Box>
    );
};

export default NotificationMessage;
