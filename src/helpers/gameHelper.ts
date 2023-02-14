import {BordType, PlayerType} from "../typing";

interface CheckCollision {
    x: number
    y: number
}
export const checkCollision = (player: PlayerType, board: BordType[][], {x:moveX, y:moveY}: CheckCollision) => {
    for (let y = 0; y < player.tetromino.length; y += 1) {
        for (let x = 0; x < player.tetromino[y].length; x +=1) {
            if (player.tetromino[y][x] !== 0) {
                if (
                    !board[y + player.pos.y + moveY]
                    || !board[y + player.pos.y + moveY][x + player.pos.x + moveX]
                    || board[y + player.pos.y + moveY][x + player.pos.x + moveX].text !== "clear"
                ) {
                    return true
                }
            }
        }
    }
}
