import React, { useState } from 'react'

export default function Player({initialName, symbol, isActive, onChangeName}) {

  // we ll not LIFT playerName bcz it actually used to update the input field ON EVERY KEY STROKE 
  // and iff we move it out to app then whole app comp will update in every key stroke .. t.f. WHOLE GAME BOARD will reevalute
  // and also we used player comp twice in the ap comp
    const [playerName, setPlayerName] = useState(initialName)
    const [isEditing, setIsEditing] = useState(false)
    

    function handleEditClick()
    {
        setIsEditing(prev=>!prev)

        if(isEditing){   // as we want onchange fn to be triggered when we start editiing
          onChangeName(symbol,playerName)
        }
    }

    function handleChange(e){
        setPlayerName(e.target.value)
    }
    
    let editablePlayerName = <span className='player-name'>{playerName}</span>

    if(isEditing)
        editablePlayerName = <input type="text" required value={playerName} onChange={handleChange}/>
    
  return (
    <li className={isActive? 'active': undefined}>
        <span className='player'>
              {editablePlayerName}
            <span className='player-symbol'>{symbol}</span>
        </span>
          <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  )
}
