import {useEffect, useState} from "react";
import {BordType, PlayerType} from "../typing";
import {HEIGHT, WIDTH} from "../helpers/tetrominos";

interface ReturnType {
     board: BordType[][]
}

export const useBoard = (player: PlayerType):ReturnType => {
    const [rowsClear, setRowCleared] = useState<number>(0)
    const [board, setBoard] = useState(() => Array.from({length: HEIGHT}, () =>
        Array.from({length: WIDTH}).fill(
            {value: 0, text: "clear", className: ""}
        )) as BordType[][])



    useEffect(() => {
        setRowCleared(0)
        // const sweepRows = (newStage: any) => {
        //     newStage.reducer((acc: any, row: any) => {
        //         if (row.findIndex((cell: any) => cell[0] === 0) === -1) {
        //             setRowCleared(prev => prev + 1)
        //             acc.unshift(new Array(newStage[0]).fill({
        //                 value: 0,
        //                 text: "clear",
        //                 className: ""
        //             }))
        //             return acc
        //         }
        //         acc.push(row)
        //         return  acc
        //     },[])
        // }
        const handler = (state: BordType[][]) => {
            const newState = state.map((col) =>
                col.map((cell: BordType) =>
                    cell.text === "clear" ? {...cell, value: 0, text: "clear"} : cell)
            )

            player.tetromino.forEach((col, y) => {
                col.forEach((cell, x) => {
                    if (cell !== 0) {
                        newState[y + player.pos.y][x + player.pos.x] = {
                            value: 1,
                            text: player.collided ? "merge" : "clear",
                            className: ""
                        }
                    }
                })
            })
            return newState
        }

        setBoard((prev) => handler(prev))
    }, [player])

    return {board}
}
