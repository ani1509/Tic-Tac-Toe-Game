import React from 'react'


export default function GameBoard({ onSelectSquare, board }) {

    // const [gameBoard, setGameBoard] = useState(initialGameBoard)

    // function handleSelectSquare(rowIndex,colIndex){
    //     setGameBoard((prevGameBoard)=>{
    //         //**** below UPDATING THE STATE IN IMMUTABLE WAY */
    //         const updatedBoard=[...prevGameBoard.map(innerArray=> [...innerArray])]  // *** copiying ARRAY OF ARRAYS ***// IMP bcz here v r dealing with the REFERENCE VALUE (obj or arrqy) 

    //         updatedBoard[rowIndex][colIndex] =  activePlayerSymbol 
    //         return updatedBoard
    //     })
    //  onSelectSquare();   // it shows the changes in turn   
    // }

    // let gameBoard = initialGameBoard

    //**** BELOW inside for WE DONT NEED TO MANAGE ANY STATE HERE V JUST DERIVED IT
    // IT LL BE BEST TO USE AS LESS AS USE STATE... AND SHOULD USE MORE DERIVED STATE

    // BELOW CMT SENT TO APP JS **** 
    // for (const turn of turns)  // below we destructuring the turns which we get fromm app components 'updatedTurns'
    // {
    //     const { square, player } = turn
    //     const { row, col } = square

    //     gameBoard[row][col] = player
    // }


    return (
        <ol id="game-board">

            {board.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) => (

                            <li key={colIndex}>
                                {/** HERE SEE HOW WE USED THE VALUE WHICH WE PASSED FROM APP HANDLESELECTSQUARE ******** */}
                                <button
                                    onClick={() => onSelectSquare(rowIndex, colIndex)}
                                    disabled={playerSymbol!==null}  // so that every button only be clicked once
                                >{playerSymbol}
                                </button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    )
}
