//*** IMP COMPONENT BCZ TO RECORD WHICH TURN IS TAKEN BY WHICH PLAYER  */

import React from 'react'

export default function Log({ turns }) {
  return (
    <ol id='log'>
      {
        turns.map((turn) => (
          // beloe in key v made the STRING using `` to make UNIQUE that single block using row and column
          <li key={`${turn.square.row}${turn.square.col}`}>   
            {turn.player} selected {turn.square.row},{turn.square.col}</li>  //*********** */ it ll show which square has been selected *****
        ))
      }
    </ol>
  )
}
