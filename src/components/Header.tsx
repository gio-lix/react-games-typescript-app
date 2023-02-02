import React, {FC, memo} from 'react';

interface Props {
    winner: string | null
}

const Header: FC<Props> = ({winner}) => {

    return (
        <article className="header">
            {
                winner && <h1 className="winner">
                    {winner !== "draw" && "Winner: "}
                    <span>{winner}</span>
                </h1>
            }
        </article>
    );
};

export default memo(Header);
