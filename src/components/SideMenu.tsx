import {FC, memo, useEffect, useState} from 'react';

interface Props {
    handlerSelector: (str: string) => void
    handleRest: () => void
    winner: string | null
}


const SideMenu:FC<Props> = ({handlerSelector, handleRest, winner}) => {
    const [value,setValue] = useState("x")
    const [score, setScore] = useState<{x:number, o:number}>({x: 0, o: 0})


    useEffect(() => {
        if (!winner || score.x === 5 || score.o === 5) return
        setScore((prev) => {
            switch (winner) {
                case "x":
                    return  {...prev, x: prev.x  + 1}
                case "o":
                    return  {...prev, o: prev.o  + 1}
                default:
                    return prev
            }
        })
    },[winner])


    return (
        <aside className="side-box">
            <div className="score">
                {(score.x <= 5 ) ? (
                       <>
                           <small>
                               {[...new Array(score.x)].map((_, index) => (
                                   <span key={index} style={{
                                       bottom: `${index * 20}px`,
                                       background: "greenyellow"
                                   }} />
                               ))}
                           </small>
                           <small>
                               {[...new Array(score.o)].map((_, index) => (
                                   <span key={index} style={{
                                       bottom: `${index * 20}px`,
                                       background: "#ffd500"
                                   }} />
                               ))}
                           </small>
                       </>
                ) : null}
            </div>
            <select
                name="user"
                className="custom-select"
                aria-labelledby="choose"
                value={value}
                onChange={(e) => {
                    setValue(e.target.value)
                    handleRest()
                    handlerSelector(e.target.value)
                }}
            >
                <option hidden>{value}</option>
                <option value="x">x</option>
                <option value="o">o</option>
            </select>
            <button onClick={() => {
                setValue("x")
                handleRest()
            }}>Next match</button>
            <button onClick={() => {
                setScore({x: 0,o: 0})
                setValue("x")
                handleRest()
            }}>New Game</button>
        </aside>
    );
};

export default memo(SideMenu);
