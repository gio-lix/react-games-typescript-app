import React, {KeyboardEvent} from 'react';
import {usePlayer} from "../hooks/usePlayer";
import {useBoard} from "../hooks/useBoard";
import {checkCollision} from "../helpers/gameHelper";


const Tetris = () => {
    const {player, updatePosition, resetPlayer, playerRotate} = usePlayer()
    const {board} = useBoard(player)

    const drop = (pos: number) => {
        if (!checkCollision(player, board, {x: 0, y: 1})) {
            updatePosition({y: pos})
        } else {
            if (player.pos.y < 1) {
                console.log("Game Over")
            }
            updatePosition({x:0, y:0, collied: true})
            if (player.collided) {
                resetPlayer()
            }
        }
    }
    const movePosition = (dir: number) => {
        if (!checkCollision(player, board, {x: dir, y: 0})) {
            updatePosition({x: dir})
        }
    }


    const move = (e: KeyboardEvent<HTMLDivElement>) => {
        switch (e.keyCode) {
            case 37:
                return movePosition( -1)
            case 39:
                return movePosition( 1)
            case 40:
                return drop(1)
            case 38:
                return playerRotate(board, 1)
            default:
                return;
        }
    }


    return (
        <div style={{display: "flex"}}>
            <div
                style={{outline: "none"}}
                tabIndex={0}
                onKeyDown={move}
            >
                {board.map((col, index) => (
                    <div style={{display: "flex"}} key={index}>
                        {col.map((cell, idx) => {
                            return (
                                <div
                                    style={{
                                        background: `${cell.value === 1 ? "green" : ""}`,
                                        width: "50px",
                                        height: "50px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        border: "1px solid gray"
                                    }} key={idx}>
                                    {cell.value}
                                </div>
                            )
                        })}
                    </div>
                ))}
            </div>
            <button
                style={{width: "200px", height: "50px", marginLeft: "50px", cursor: "pointer"}}
                onClick={resetPlayer}>
                RESET
            </button>
        </div>
    );
};

export default Tetris;


