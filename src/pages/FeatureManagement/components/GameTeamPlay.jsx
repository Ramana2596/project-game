import { Button, Grid2, Typography } from "@mui/material";
import { pageConstants } from "../constants/pageConstants";
import { rollBackPeriod, updateGameTeamPlay } from "../services/service";
import { useUser } from "../../../core/access/userContext";
import ToastMessage from "../../../components/ToastMessage";
import { useState } from "react";

export default function GameTeamPlay() {
    const { userInfo } = useUser();
    const [alertData, setAlertData] = useState({
        severity: "",
        message: "",
        isVisible: false,
    });

    const onPlayButtonClick = () => {
        updateGameTeamPlay({ 
                gameId: userInfo.gameId, 
                gameBatch: userInfo.gameBatch, 
                gameTeam: userInfo.gameTeam,
                cmdLine: userInfo.cmdLine })
            .then((response) => {
                setAlertData({
                    severity: "success",
                    message: response?.data?.message || " Cheeck logs ?",
                    isVisible: true,
                });
            })
            .catch((error) => {
                setAlertData({
                    severity: "error",
                    message:
                        "Error in Team Play" +
                        error?.response?.data?.error,
                    isVisible: true,
                });
            });
    }

    const onRollBackButtonClick = () => {
        rollBackPeriod({ 
                gameId: userInfo.gameId,
                gameBatch: userInfo.gameBatch,
                gameTeam: userInfo.gameTeam,
                cmdLine: userInfo.cmdLine})
            .then((response) => {
                setAlertData({
                   severity: "success",
                   message: response?.data?.message || " Check logs ?",
                   isVisible: true,
                });
            })
            .catch((error) => {
                setAlertData({
                    severity: "error",
                    message:
                        "Error in Rollback A Period" +
                        error?.response?.data?.error,
                    isVisible: true,
                });
            });
    }

    return (
        <div>
            <Grid2 container spacing={{ xs: 2, md: 0 }} justifyContent="center" alignItems="center" direction="column" style={{ flexGrow: 1, width: '100%' }}>
                <Grid2 container padding={5} spacing={{ xs: 2, md: 3 }} size={{ xs: 0, sm: 2, md: 2 }} justifyContent="center" alignItems="center" style={{ flexGrow: 1, width: '100%' }}>
                    <Typography variant="h6" component="h6">
                        {pageConstants?.teamPlayConfirmation}
                    </Typography>
                    <Button onClick={onPlayButtonClick} variant="contained">
                        {pageConstants?.gameTeamPlayButtonLabel}
                    </Button>
                </Grid2>
                <Grid2 container spacing={{ xs: 2, md: 3 }} size={{ xs: 0, sm: 2, md: 2 }} justifyContent="center" alignItems="center" style={{ flexGrow: 1, width: '100%' }}>
                    <Typography variant="h6" component="h6">
                        {pageConstants?.teamPlayRollBackConfirmation}
                    </Typography>
                    <Button onClick={onRollBackButtonClick} variant="outlined">
                        {pageConstants?.gameTeamPlayRollBack}
                    </Button>
                </Grid2>
            </Grid2>

            <ToastMessage
                open={alertData.isVisible}
                severity={alertData.severity}
                message={alertData.message}
            />
        </div>
    );
}