import {TetritType} from "../typing";

export const WIDTH: number = 7
export const HEIGHT: number = 12


export const TETRIT: TetritType = {
    0: {
        shape: [[0]],
        className: "red"
    },
    I: {
        shape: [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
        ],
        className: "green"
    },
    J: {
        shape: [
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 0],
        ],
        className: "green"
    },
    L: {
        shape: [
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 1],
        ],
        className: "green"
    },
    O: {
        shape: [
            [1, 1],
            [1, 1]
        ],
        className: "green"
    },
    S: {
        shape: [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0]
        ],
        className: "green"
    },
    T: {
        shape: [
            [1, 1, 1],
            [0, 1, 0],
            [0, 0, 0]
        ],
        className: "green"
    },
    Z: {
        shape: [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0]
        ],
        className: "green"
    }
}


export const takeRandom = () => {
    const _arr = "IJLOSTZ"
    const num = Math.floor(Math.random() * _arr.length)
    return TETRIT[_arr[num]]
}
