import React, { useRef, useState } from "react";
import './TicTacToe.css';
const cross_icon = "https://e7.pngegg.com/pngimages/482/392/png-clipart-black-x-mark-tic-tac-toe-oxo-holiday-tic-tac-toe-game-blue-cross-miscellaneous-angle.png";
const circle_icon = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Circle-image.svg/480px-Circle-image.svg.png";

const TicTacToe = () => {
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
    const titleRef = useRef(null);

    const toggle = (num) => {
        if (lock || data[num]) {
            return;
        }

        const newData = [...data];
        if (count % 2 === 0) {
            newData[num] = cross_icon;
        } else {
            newData[num] = circle_icon;
        }

        setData(newData);
        setCount(count + 1);
        checkWin(newData);
    };

    const checkWin = (data) => {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (data[a] && data[a] === data[b] && data[a] === data[c]) {
                won(data[a]);
                return;
            }
        }

        if (data.every(cell => cell !== "")) {
            draw();
        }

    };

    const won = (winner) => {
        setLock(true);
        if (winner === cross_icon) {
            titleRef.current.innerHTML = `Congratulations: <img src="${cross_icon}" alt="cross icon"/> Wins.`;
        } else {
            titleRef.current.innerHTML = `Congratulations: <img src="${circle_icon}" alt="circle icon"/> Wins.`;
        }
    };

    const draw = () => {
        setLock(true);
        titleRef.current.innerHTML = "It's a Draw. Reset the Board."
    }

    const resetGame = () => {
        setData(["", "", "", "", "", "", "", "", ""]);
        setCount(0);
        setLock(false);
        titleRef.current.innerHTML = 'Tic Tac Toe Game in <span>React</span>';
    };

    return (
        <div className="container">
            <h1 className="title" ref={titleRef}>Tic Tac Toe Game in <span>React</span></h1>
            <div className="board">
                {[0, 1, 2].map(row => (
                    <div className={`row${row + 1}`} key={row}>
                        {[0, 1, 2].map(col => {
                            const index = row * 3 + col;
                            return (
                                <div
                                    className="boxes"
                                    key={index}
                                    onClick={() => toggle(index)}
                                >
                                    {data[index] && <img src={data[index]} alt="icon" />}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
            <button className="reset" onClick={resetGame}>Reset</button>
        </div>
    );
};

export default TicTacToe;
