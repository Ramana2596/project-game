import { Button, Grid2 } from "@mui/material";
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
        updateGameTeamPlay({ gameId: userInfo.gameId, gameBatch: userInfo.gameBatch, gameTeam: userInfo.gameTeam })
            .then(() => {
                setAlertData({
                    severity: "success",
                    message: "Team Play Reset successfully",
                    isVisible: true,
                });
            })
            .catch((error) => {
                setAlertData({
                    severity: "error",
                    message:
                        "Error in reset" +
                        error?.response?.data?.error,
                    isVisible: true,
                });
            });
    }

    const onRollBackButtonClick = () => {
        rollBackPeriod({ gameId: userInfo.gameId, gameBatch: userInfo.gameBatch, gameTeam: userInfo.gameTeam })
            .then(() => {
                setAlertData({
                    severity: "success",
                    message: "Roll back period successfull",
                    isVisible: true,
                });
            })
            .catch((error) => {
                setAlertData({
                    severity: "error",
                    message:
                        "Error in Roll back period" +
                        error?.response?.data?.error,
                    isVisible: true,
                });
            });
    }

    return (
        <div>
            <Grid2 container spacing={{ xs: 2, md: 3 }} size={{ xs: 0, sm: 2, md: 2 }} justifyContent="center" alignItems="center">
                <Button onClick={onPlayButtonClick} variant="contained">
                    {pageConstants?.gameTeamPlayButtonLabel}
                </Button>
                <Button onClick={onRollBackButtonClick} variant="outlined">
                    {pageConstants?.gameTeamPlayRollBack}
                </Button>
            </Grid2>
            <ToastMessage
                open={alertData.isVisible}
                severity={alertData.severity}
                message={alertData.message}
            />
        </div>
    );
}