import {FC} from 'react';

interface Props {
    player?: string
    index: number
    handler: () => void
    classes?: string | null
}

const Square:FC<Props> = ({player,handler,index,classes}) => {
    let style = player === "x" ? "green" : "yellow"
    let borderStyle = {borderRadius: player === "o" ? "12px" : ""  }

    return (
        <div
            data-call-index={index}
            onClick={handler}
            style={borderStyle}
            className={`player-box color-${style} ${classes} `}
        >
            {player}
        </div>
    );
};

export default Square;
