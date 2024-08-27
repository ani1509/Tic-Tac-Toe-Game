import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log"
import { WINNING_COMBINATIONS } from "./winning-combinations"
import GameOver from "./components/GameOver"

const PLAYERS = {
  X:'Player 1',
  O:'Player 2',
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

// below is the helper function we are deriving outside the app bcz we dont need any state or data from the app

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X'

  if (gameTurns.length > 0 && gameTurns[0].player === 'X')   //[0] it will be the always the latest turn
  {
    currentPlayer = 'O'
  }
  return currentPlayer;
}

function derivedGameBoard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])]  // this makes brand new array

  for (const turn of gameTurns)  // below we destructuring the turns which we get fromm app components 'updatedTurns'
  {
    const { square, player } = turn
    const { row, col } = square

    // below we are over riding some inner element in a nested array in another array with the symbol of the player
    // since array r refernce datatype ... t.f. below we are editing the same object or array t.f. its make handleRematch Useless ****
    // t.f. we ll make DEEP COPY of gameBoard *****  ABOVE
    gameBoard[row][col] = player
  }

  return gameBoard
}

function derivedWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondtSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

    if (firstSquareSymbol && firstSquareSymbol === secondtSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol] /// this lines HOWS THE NAME OF THE PLAYER WHO WON ******
    }
  }

  return winner;
}

function App() {

  const [players, setPlayers] = useState(PLAYERS)

  const [gameTurns, setGameTurns] = useState([])
  // here above  is used bcz we need the info abt which button is clicked t.f. lifted state up to app component

  // const[hasWinner, setHasWinner]=useState(false);     WE ALSO DONT NEED EXRA STATE FOR WINNER V LL DERIVE IT... AS APP WILL execute AFTER EVERY SELECT SQUARE
  
  // we ll remove this player state bcz we dont need another state to update the UI
  // t.f. we ll DERIVE THE STATE ****.... below also -----
  // const [activePlayer, setActivePlayer] = useState("X")    instead use bwlow line-->
  const activePlayer = deriveActivePlayer(gameTurns)

  const gameBoard=derivedGameBoard(gameTurns)
  
  const winner = derivedWinner(gameBoard, players)

  const hasDraw = gameTurns.length === 9 && !winner

  function handleSelectSquare(rowIndex, colIndex) {   // this fun will be triggered whenever a square is selected

    // ----------here in the next below line.
    // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? "O" : "X")

    // below used to update turns bcz new turns array depend on old turns arary
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns)

      // new object is being added to turns array to identify the latest turn & whcih player clicks whcih square
      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer },
      ...prevTurns]  /// updating existing 

      return updatedTurns  // it has the new value as updated turns array

    })
  }

  function handleRestart() {
    setGameTurns([])
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange} />
          <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />   {/** HERE SEE HOW WE PASSED YHE HANDLESELECTSQUARE******** */}
      </div>
      {/* <Log turns={gameTurns} /> */}
    </main>
  )
}

export default App
