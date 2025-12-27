
import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import { useState } from "react"
function App() {
  const [activePlayer, setActivePlayer] = useState('X')

  function handleSelectSquare() {
    setActivePlayer((curractivePlayer)=> curractivePlayer === 'X' ? 'O': 'X' )
  }

  return (
    <>
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">

          <Player isActive={activePlayer === 'X'} initialName="Player 1" symbol="X"/>
          <Player isActive={activePlayer === 'O'} initialName="Player 2" symbol="O"/>

        </ol>

        <GameBoard activePlayer={activePlayer} activePlayerSymbol={activePlayer} onSelectSquare={handleSelectSquare}/>
      </div>
    </main>
    </>
  )
}

export default App
