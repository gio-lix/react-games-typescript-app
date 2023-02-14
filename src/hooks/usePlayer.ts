import {useCallback, useState} from "react";
import {BordType, PlayerType} from "../typing";
import {takeRandom} from "../helpers/tetrominos";
import {checkCollision} from "../helpers/gameHelper";


interface ReturnType {
    player: PlayerType
    updatePosition: (dir: {x?: number, y?: number, collied?: boolean }) => void
    resetPlayer: () => void
    playerRotate: (matrix: BordType[][], dir: any) => void
}


export const usePlayer = ():ReturnType => {
    const [player, setPlayer] = useState<PlayerType>({
        pos: {x: 0, y: 0},
        tetromino: takeRandom().shape,
        collided: false
    })


    const resetPlayer = useCallback(() => {
        setPlayer({
            pos: {x: 2, y: 0,},
            tetromino: takeRandom().shape,
            collided: false
        })
    },[])

    const rotate = (matrix: (number | string)[][], dir: any) => {
        const rotateTetro = matrix.map((_,index: number) =>
            matrix.map((col: any) => col[index])
        )
        if (dir > 0) return rotateTetro.map((row: any) => row.reverse())
        return  rotateTetro.reverse()
    }
    const playerRotate = (matrix:BordType[][], dir: any) => {
        const clonePlayer:PlayerType = JSON.parse(JSON.stringify(player))
        clonePlayer.tetromino = rotate(clonePlayer.tetromino, dir)

        let pos = clonePlayer.pos.x
        let offset = 1
        while (checkCollision(clonePlayer, matrix, {x: 0,y: 0})) {
            clonePlayer.pos.x += offset
            offset = -(offset + (offset > 0 ? 1 : -1))
            if (offset > clonePlayer.tetromino[0].length) {
                rotate(clonePlayer.tetromino, -dir)
                clonePlayer.pos.x = pos
                return
            }
        }

        setPlayer(clonePlayer)
    }

    const updatePosition = (dir: { x?:number, y?:number,collied?: boolean }) => {
        const {x,y,collied} = dir

        setPlayer(prev => ({
            ...prev,
            pos: {x: (prev.pos.x += x ? x : 0), y: (prev.pos.y += y ? y : 0)},
            collided: collied ? collied : player.collided
        }))
    }

    return {
        updatePosition,
        playerRotate,
        resetPlayer,
        player
    }
}
