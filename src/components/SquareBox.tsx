import {FC} from 'react';
import Square from "./Square";
import {WinnerType} from "../App";

interface Props {
    win: WinnerType
    handleClick: (index: number) => void
    state: string[]

}

const SquareBox: FC<Props> = ({win,state,handleClick}) => {
    let classes: string | null = win.winnerArray.length
        ? win.win === "x" ? "active-winner-green" : "active-winner-yellow" : null

    return (
        <div className="player-grid-box">
            {win.win && <span className="layover"/>}
            {state.map((player: any, index: number) => (
                <Square
                    key={index}
                    index={index}
                    handler={() => handleClick(index)}
                    {...{player}}
                    classes={win.winnerArray.includes(index) ? classes : null}
                />
            ))}
        </div>
    );
};

export default SquareBox;
