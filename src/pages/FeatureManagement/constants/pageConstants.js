import GameTeamPlay from "../components/GameTeamPlay";

export const pageConstants = {
    accordianList: [
        {
            headerValue: 'Operation Management- Simulation Game',
            contentValue: <GameTeamPlay />,
            isExpanded: false
        }
    ],
    gameFlagButtonLabel: 'Flag-Off',
    gameTeamPlayButtonLabel: 'Play',
    gameTeamPlayRollBack: 'Revert Back',
    teamPlayConfirmation: 'To STEP through Simulation,  Click =>',
    teamPlayRollBackConfirmation: 'To Revert back to Previous Period,      Click =>',
}