import {useCallback, useEffect, useState} from "react";

import SquareBox from "./components/SquareBox";

import SideMenu from "./components/SideMenu";
import Header from "./components/Header";


export interface WinnerType {
    win: string | null
    winnerArray: number[]
}

const WINNER = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

function App() {

    const [currentPayer, setCurrentPlayer] = useState("x")
    const [win, setWin] = useState<WinnerType>({win: null, winnerArray: []})
    const [state, setState] = useState<string[]>(() => [...new Array(9).fill("")])


    const checkWinner = () => {
        const winnArray = []
        let x: number[] = []
        let o: number[] = []

        state.forEach((el, index) => {
            if (el === "x") {
                x.push(index)
            }
            if (el === "o") {
                o.push(index)
            }
        })
        for (let i = 0; i < WINNER.length; i++) {
            const [a, b, c] = WINNER[i]
            if (x.includes(a) && x.includes(b) && x.includes(c)) {
                setWin({win: "x", winnerArray: [a, b, c]})
                winnArray.push(a, b, c)
            }
            if (o.includes(a) && o.includes(b) && o.includes(c)) {
                setWin({win: "o", winnerArray: [a, b, c]})
                winnArray.push(a, b, c)
            }
        }
    }

    const changePlayer = (board: string[], index: number) => {
        setCurrentPlayer(currentPayer === "x" ? "o" : "x")
        board[index] = currentPayer
        setState(board)
    }

    const handleClick = (index: number) => {
        const _board = [...state]
        const currentValue = _board[index]

        if (currentValue) return
        changePlayer(_board, index)
    }

    const handleRest = useCallback(() => {
        setState([...new Array(9).fill("")])
        setWin({win: null, winnerArray: []})
    }, [])

    useEffect(() => {
        if (state.join("").length === 9 && !win.winnerArray.length) {
            setWin({win: "draw", winnerArray: []})
        }
        checkWinner()
    }, [state, win.win?.length])

    return (
        <>
            <Header winner={win.win}/>
            <main className="main-container">
                <SquareBox
                    handleClick={handleClick}
                    state={state}
                    win={win}
                />
                <SideMenu
                    winner={win.win}
                    handleRest={handleRest}
                    handlerSelector={setCurrentPlayer}
                />
            </main>
        </>
    )
}

export default App
