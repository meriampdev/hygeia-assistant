import React from 'react'
import './hygeia.scss'

export default function HygeiaMessageGroup(props) {
  return (
    <div className='hygeia-message-group'>
      {props.children}
    </div>
    
  )
}