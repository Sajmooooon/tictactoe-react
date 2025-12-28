
import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log"
import { useState } from "react"

import { WINNING_COMBINATIONS } from "./winning-combinations"
import GameOver from "./components/GameOver"

function deriveActivePlayer(gameTurns) {
let currentPlayer = 'X'
      if (gameTurns?.length > 0 &&  gameTurns[0].player ==='X') {
        currentPlayer = 'O'
      }
  return currentPlayer
}

const PLAYERS = {
    'X': 'Player 1',
    'O': 'Player 2'
}

const INITIAL_GAME_B = [
  [null, null, null],
  [null, null, null],
  [null,null,null]
]


function deriveGameboard (gameTurns) {
  let gameBoard = [...INITIAL_GAME_B.map(i=> [...i])]

    for (const turn of gameTurns) {
    const {square, player } = turn
    const {row, col} = square

    gameBoard[row][col] = player
  }

  return gameBoard
}

function deriveWinner(gameBoard, players) {
    let winner = null



  for (const combination of WINNING_COMBINATIONS) {
    const firstSqaresSymbbol = gameBoard[combination[0].row][combination[0].column]
    const secondSqaresSymbbol = gameBoard[combination[1].row][combination[1].column]
    const thirSqaresSymbbol = gameBoard[combination[2].row][combination[2].column]

    if (firstSqaresSymbbol && firstSqaresSymbbol === secondSqaresSymbbol && firstSqaresSymbbol === thirSqaresSymbbol) {
      winner = players[firstSqaresSymbbol]
    }
  }
  return winner
}


function App() {
  /*   const [activePlayer, setActivePlayer] = useState('X')
  */  
  const [players, setPlayers] = useState(PLAYERS)

  const [gameTurns, setGameTurns] = useState([])
  const currentPlayer = deriveActivePlayer(gameTurns)
  const gameBoard = deriveGameboard(gameTurns)
  let winner = deriveWinner(gameBoard, players)

  const hasDraw = gameTurns?.length === 9 && !winner
      
  function handleSelectSquare(rowIndex, colIndex) {
/*     setActivePlayer((curractivePlayer)=> curractivePlayer === 'X' ? 'O': 'X' )
 */    setGameTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns)
      const updtatedTurns = [{square: {row: rowIndex, col: colIndex}, player: currentPlayer},...prevTurns]
      
      return updtatedTurns
    })
  }

  function handlePlayerName (symbol, newName) {
    setPlayers(oldState=> 
      {
        return {
          ...oldState,
          [symbol]: newName
        }
      }
    )
  }


  function handleRestart () {
    setGameTurns([])
    winner = null
  }

  return (
    <>
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">

          <Player isActive={currentPlayer === 'X'} initialName={PLAYERS.X} symbol="X" onChangeName={handlePlayerName}/>
          <Player isActive={currentPlayer === 'O'} initialName={PLAYERS.O}  symbol="O"onChangeName={handlePlayerName}/>

        </ol>
        <div>
          {(winner || hasDraw) &&<GameOver winner={winner} onRestart={handleRestart}/>}
        </div>
        <GameBoard board={gameBoard} onSelectSquare={handleSelectSquare}/>
      
      </div>

      <Log turns={gameTurns}/>
    </main>
    </>
  )
}

export default App
