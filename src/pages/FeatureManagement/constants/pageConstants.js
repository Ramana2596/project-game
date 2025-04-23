import GameTeamPlay from "../components/GameTeamPlay";

export const pageConstants = {
    accordianList: [
        {
            headerValue: 'Play Action in Simulation Game',
            contentValue: <GameTeamPlay />,
            isExpanded: false
        }
    ],
    gameFlagButtonLabel: 'Flag-Off',
    gameTeamPlayButtonLabel: 'Play',
    gameTeamPlayRollBack: 'Revert Back',
    teamPlayConfirmation: 'To Step through on your Current Decision,     Click =>',
    teamPlayRollBackConfirmation: 'To Revert back to Previous Period,      Click =>',
}