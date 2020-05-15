import React from 'react'
import './user-message.scss'
import Button from 'react-md/lib/Buttons/Button'

export default function UserInputMessage({ handChangeAnswer, children }) {
  return (
    <div data-padding="symmetrical" className="tpl-response">
    	<div className="user-response-wrapper">
        <div data-type="user" className="tpl-text-response-wrapper">
          <div className="anchors tpl-text-response" style={{background: 'var(--primary-color)', color: 'rgb(255, 255, 255)'}}>
            {children}
          </div>
        </div>
        <Button onClick={handChangeAnswer} icon secondary>edit</Button>
      </div>
    </div>
  )
}