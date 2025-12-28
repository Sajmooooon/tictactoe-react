import { useState } from "react"

export default function Player({initialName, symbol, isActive, onChangeName, ...props}) {
  const [editing, setEdit] = useState(false)

  let [name, setName] = useState(initialName)

  function handleEditClick () {
    setEdit(editing => !editing)
    if (editing) {
      onChangeName(symbol, name)
    }
  }

  let playerName = <span className="player-name">{name}</span>
  let btnCaption = 'Edit'
  
  if (editing) {
    playerName = <input type="textr" onChange={handleChange} required value={name}/>
    btnCaption = "Save"
  }

  function handleChange(e) {
    setName(e.target.value)
  }


  return (
    <>
    <li className={isActive ? 'active': undefined }>
      <span className="player">
        {playerName}
      
      <span className="player-symbol">{symbol} {editing}</span>
      </span>
      <button onClick={handleEditClick}>{btnCaption}</button>
    </li>
    </>
  )
}