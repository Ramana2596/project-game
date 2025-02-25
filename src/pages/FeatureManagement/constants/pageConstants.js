import GameFlag from "../components/GameFlag";
import GameTeamPlay from "../components/GameTeamPlay";

export const pageConstants = {
    accordianList: [
        {
            headerValue: 'Game Flag',
            contentValue: <GameFlag />,
            isExpanded: true
        },
        {
            headerValue: 'Game Team Play',
            contentValue: <GameTeamPlay />,
            isExpanded: false
        }
    ],
    gameFlagButtonLabel: 'Flag-Off',
    gameTeamPlayButtonLabel: 'Play',
    gameTeamPlayRollBack: 'Roll Back'
}