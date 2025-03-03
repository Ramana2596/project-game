import GameTeamPlay from "../components/GameTeamPlay";

export const pageConstants = {
    accordianList: [
        {
            headerValue: 'Game Team Play',
            contentValue: <GameTeamPlay />,
            isExpanded: false
        }
    ],
    gameFlagButtonLabel: 'Flag-Off',
    gameTeamPlayButtonLabel: 'Play',
    gameTeamPlayRollBack: 'Roll Back',
    teamPlayConfirmation: 'By clicking on the Play button, the team play will be reset for current month. If you want to proceed =>',
    teamPlayRollBackConfirmation: 'By clicking on the Roll Back button, the team play will be rolled back for current month. If you want to proceed =>',
}